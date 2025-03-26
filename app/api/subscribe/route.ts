import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Environment variables should be set in .env.local
// EMAIL_USER=your-email@example.com
// EMAIL_PASS=your-email-password
// NOTIFICATION_EMAIL=your-notification-email@example.com

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

    // Setup email transport - in production, use your actual SMTP service
    // For development, you might use a service like Mailtrap, Sendgrid, etc.
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.example.com",
      port: parseInt(process.env.EMAIL_PORT || "587"),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send notification to yourself
    await transporter.sendMail({
      from: `"StoryCrafter Waitlist" <${process.env.EMAIL_USER}>`,
      to: process.env.NOTIFICATION_EMAIL,
      subject: "New StoryCrafter Waitlist Signup",
      html: `
        <h1>New Signup Alert</h1>
        <p>Someone just signed up for the StoryCrafter waitlist:</p>
        <ul>
          <li><strong>Email:</strong> ${email}</li>
          ${name ? `<li><strong>Name:</strong> ${name}</li>` : ""}
        </ul>
        <p>Timestamp: ${new Date().toLocaleString()}</p>
      `,
    });

    // Send confirmation to the user
    await transporter.sendMail({
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

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to waitlist",
    });
  } catch (error) {
    console.error("Subscription error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe. Please try again later." },
      { status: 500 }
    );
  }
}
