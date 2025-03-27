# StoryCrafter Email System Troubleshooting

This guide helps you troubleshoot email-related issues with the signup form.

## Common Error Messages

### 1. "Failed to subscribe. Please try again later."

This is a generic error message that can have several causes:

- **SMTP Connection Issues**: The application couldn't connect to the email server
- **Authentication Errors**: Wrong email credentials or app password
- **Rate Limits**: Gmail limits how many emails you can send per day
- **Network Problems**: Server connectivity issues

## Testing Email Configuration

Use the included test script to verify your email settings:

```bash
node test-smtp.js
```

This script will:

1. Try to connect to your SMTP server
2. Verify authentication
3. Send a test email
4. Log detailed debugging information

## Gmail-Specific Setup

If using Gmail, follow these steps:

1. **Enable 2-Factor Authentication** on your Google account
2. **Generate an App Password** at https://myaccount.google.com/apppasswords
3. Use that App Password in your `.env.local` file (not your regular Gmail password)
4. Use the correct SMTP settings:
   ```
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_SECURE=false
   ```

## Checking Logs

When an error occurs, detailed logs are printed to the console. Look for:

- `SMTP verification failed`: Problems connecting to the email server
- `Failed to send notification email`: Issues sending admin notifications
- `Failed to send user confirmation email`: Problems with user welcome emails

## Fallback Mechanisms

The system includes fallbacks to ensure signup data isn't lost:

1. User data is saved to `data/signups.json` even if emails fail
2. The system will attempt to send the admin notification email before the user email
3. If only the user email fails, the signup is still considered partially successful

## Debugging in Production

For production environments:

1. Check server logs for detailed error messages
2. Verify that your environment variables are set correctly
3. Test email delivery with the test script on the production server
4. Consider using a dedicated email service provider like SendGrid, Mailgun, or AWS SES

## Monitoring Email Delivery

- Check your Gmail "Sent" folder to verify emails are being sent
- Look for bounce notifications in your email inbox
- Monitor your email provider's dashboard for sending limits
- Check spam folders if recipients claim they didn't receive emails

## Common Solutions

1. **Gmail Authentication Issues**: Generate a new App Password
2. **Rate Limiting**: Spread out email sending or switch to a dedicated email service
3. **Connection Problems**: Check firewall settings and network connectivity
4. **Timeouts**: Increase timeout values in the email configuration

If problems persist, consider switching to a dedicated email service provider that offers better deliverability and higher sending limits.
