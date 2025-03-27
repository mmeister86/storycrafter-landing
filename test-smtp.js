// Test-Script für SMTP-Konfiguration
require("dotenv").config({ path: ".env.local" });
const nodemailer = require("nodemailer");

async function testSMTP() {
  console.log("=== SMTP Test Tool ===");
  console.log("Testing email configuration from .env.local\n");

  // Zeige Konfiguration
  console.log("Email configuration:");
  console.log(`- HOST: ${process.env.EMAIL_HOST}`);
  console.log(`- PORT: ${process.env.EMAIL_PORT}`);
  console.log(`- SECURE: ${process.env.EMAIL_SECURE}`);
  console.log(`- USER: ${process.env.EMAIL_USER}`);
  console.log(`- NOTIFICATION_EMAIL: ${process.env.NOTIFICATION_EMAIL}`);
  console.log("\nCreating transporter...");

  try {
    // Transport-Konfiguration
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || "587"),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      debug: true,
      logger: true,
    });

    console.log("Verifying SMTP connection...");

    // Verbindung testen
    await transporter.verify();
    console.log("✅ SMTP connection verified successfully!\n");

    // Test-Email senden
    console.log(`Sending test email to: ${process.env.NOTIFICATION_EMAIL}`);

    const result = await transporter.sendMail({
      from: `"SMTP Test" <${process.env.EMAIL_USER}>`,
      to: process.env.NOTIFICATION_EMAIL,
      subject: "SMTP Test Email",
      text: "This is a test email to verify your SMTP configuration.",
      html:
        '<div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">' +
        "<h1>SMTP Test Successful</h1>" +
        "<p>If you received this email, your SMTP configuration is working correctly.</p>" +
        "<p>Date and time: " +
        new Date().toLocaleString() +
        "</p>" +
        "</div>",
    });

    console.log("✅ Test email sent successfully!");
    console.log("Message ID:", result.messageId);
    console.log("\nAll tests passed. Your SMTP configuration is correct.");
  } catch (error) {
    console.error("❌ SMTP Test failed:");
    console.error(error);

    // Detailliertere Fehleranalyse
    if (error.code === "EAUTH") {
      console.error(
        "\nAuthentication Error: Your username or password is incorrect."
      );
      console.error(
        "If using Gmail, make sure you're using an App Password, not your regular password."
      );
      console.error(
        "You can create an App Password at: https://myaccount.google.com/apppasswords"
      );
    } else if (error.code === "ESOCKET") {
      console.error(
        "\nConnection Error: Could not connect to the SMTP server."
      );
      console.error("- Check if your EMAIL_HOST and EMAIL_PORT are correct");
      console.error(
        "- Verify that your network allows connections to this server"
      );
    } else if (error.code === "ETIMEDOUT") {
      console.error(
        "\nTimeout Error: The connection to the SMTP server timed out."
      );
      console.error("- Your network might be blocking the connection");
      console.error("- The SMTP server might be down or not responding");
    }
  }
}

testSMTP().catch(console.error);
