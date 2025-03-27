import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

// Environment variables should be set in .env.local
// EMAIL_USER=your-email@example.com
// EMAIL_PASS=your-email-password
// NOTIFICATION_EMAIL=your-notification-email@example.com

// Function to save signup data to a JSON file
async function saveSignupData(email: string, name?: string) {
  try {
    // Create data directory if it doesn't exist (in the root of the project)
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Create the signups.json file if it doesn't exist
    const signupsFile = path.join(dataDir, "signups.json");
    let signups: any[] = [];

    if (fs.existsSync(signupsFile)) {
      const fileData = fs.readFileSync(signupsFile, "utf8");
      signups = JSON.parse(fileData);
    }

    // Add the new signup with timestamp
    signups.push({
      email,
      name: name || "",
      timestamp: new Date().toISOString(),
    });

    // Save the updated data
    fs.writeFileSync(signupsFile, JSON.stringify(signups, null, 2), "utf8");

    console.log(`Signup data saved to ${signupsFile}`);
    return true;
  } catch (error) {
    console.error("Error saving signup data:", error);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json();

    // Validate email and name
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    // Log email settings for debugging
    console.log("Email configuration:");
    console.log(`- HOST: ${process.env.EMAIL_HOST}`);
    console.log(`- PORT: ${process.env.EMAIL_PORT}`);
    console.log(`- SECURE: ${process.env.EMAIL_SECURE}`);
    console.log(`- USER: ${process.env.EMAIL_USER}`);
    console.log(`- NOTIFICATION_EMAIL: ${process.env.NOTIFICATION_EMAIL}`);

    // Save signup data to file first - this ensures we don't lose signups even if email fails
    // This also reduces the risk of duplicate signups in case of retries
    const dataSaved = await saveSignupData(email, name);
    if (!dataSaved) {
      console.error("Failed to save signup data to file");
      // Continue anyway to try sending emails
    } else {
      console.log("Signup data saved successfully");
    }

    // Setup email transport - using the confirmed working configuration
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.gmail.com",
      port: parseInt(process.env.EMAIL_PORT || "587"),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        // Für Gmail empfohlen: SSL/TLS-Validierung nicht erzwingen
        rejectUnauthorized: false,
      },
      debug: true, // Enable debugging
      logger: true, // Aktiviert detaillierte Logging-Informationen
    });

    let notificationSent = false;
    let userEmailSent = false;

    // Verify the transporter configuration
    try {
      await transporter.verify();
      console.log("SMTP connection verified successfully");
    } catch (verifyError: any) {
      console.error("SMTP verification failed:", verifyError);
      console.error("Error details:", {
        code: verifyError.code,
        command: verifyError.command,
        response: verifyError.response,
        responseCode: verifyError.responseCode,
      });
      throw new Error(`SMTP verification failed: ${verifyError.message}`);
    }

    try {
      // Try to send notification to admin
      console.log(
        `Attempting to send notification email to: ${process.env.NOTIFICATION_EMAIL}`
      );

      // Use different subject line to avoid Gmail's promotional/spam filters
      const notificationResult = await transporter.sendMail({
        from: `"StoryCrafter Notification" <${process.env.EMAIL_USER}>`,
        to: process.env.NOTIFICATION_EMAIL,
        subject: `[ACTION REQUIRED] New Signup: ${email}`,
        html: `
          <h1>New Signup Alert</h1>
          <p>Someone just signed up for the StoryCrafter waitlist:</p>
          <ul>
            <li><strong>Email:</strong> ${email}</li>
            ${name ? `<li><strong>Name:</strong> ${name}</li>` : ""}
          </ul>
          <p>Timestamp: ${new Date().toLocaleString()}</p>
          <p>This information has also been saved to the signups.json file in your project.</p>
        `,
      });
      console.log("Notification email sent successfully:", notificationResult);
      notificationSent = true;
    } catch (notificationError: any) {
      console.error("Failed to send notification email:", notificationError);
      // Continue with user email even if admin notification fails
    }

    try {
      // Send confirmation to the user
      console.log(`Sending confirmation email to user: ${email}`);
      const userEmailResult = await transporter.sendMail({
        from: `"StoryCrafter" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Welcome to StoryCrafter Waitlist",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #e9e9e9; background-color: #0f1521;">
            <h1 style="color: #e6a54c;">Welcome to StoryCrafter!</h1>
            <p>Thank you for joining our waitlist. We're thrilled to have you as part of our growing community.</p>
            <p>We're working hard to create an innovative platform that helps writers, game developers, and content creators build rich, immersive narratives with AI assistance.</p>
            <p>We'll keep you updated on our progress and let you know when early access becomes available.</p>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #2a3042;">
              <p style="font-size: 12px; color: #a7a7a7;">© ${new Date().getFullYear()} StoryCrafter. All rights reserved.</p>
            </div>
          </div>
        `,
      });
      console.log(
        "User confirmation email sent successfully:",
        userEmailResult
      );
      userEmailSent = true;
    } catch (userEmailError: any) {
      console.error("Failed to send user confirmation email:", userEmailError);
      // We can return a partial success if at least the data was saved
      if (dataSaved) {
        return NextResponse.json({
          success: true,
          message: "Subscribed to waitlist but confirmation email failed",
          emailStatus: "failed",
        });
      } else {
        throw userEmailError; // Re-throw if both save and email failed
      }
    }

    // Return success response with status info
    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to waitlist",
      notificationSent,
      userEmailSent,
    });
  } catch (error: any) {
    // Log detailed error information for debugging
    console.error("Subscription error:", error);

    // Log more specific error details if available
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }

    return NextResponse.json(
      { error: "Failed to subscribe. Please try again later." },
      { status: 500 }
    );
  }
}
