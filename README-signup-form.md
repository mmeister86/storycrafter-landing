# StoryCrafter SignUp Form

This document explains how to configure and use the reusable SignUpForm component.

## Setup

### 1. Environment Variables

Configure your email settings in the `.env.local` file:

```
# SMTP server settings
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_SECURE=false

# Authentication credentials
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password

# Email to receive notifications
NOTIFICATION_EMAIL=your-notification-email@example.com
```

For production, you might want to use services like:

- [SendGrid](https://sendgrid.com/)
- [Mailgun](https://www.mailgun.com/)
- [AWS SES](https://aws.amazon.com/ses/)
- [Postmark](https://postmarkapp.com/)

### 2. Using the SignUpForm Component

The SignUpForm component is reusable across your application. Here's how to use it:

```jsx
import { SignUpForm } from "@/components/sign-up-form";

// Basic usage
<SignUpForm />

// With custom props
<SignUpForm
  buttonText="Subscribe Now"
  placeholderText="Your email address"
  includeNameField={true}
  onSuccess={() => console.log("User signed up!")}
  redirectUrl="/thank-you"
  className="my-custom-class"
/>
```

## Component Props

The SignUpForm component accepts the following props:

| Prop               | Type     | Default            | Description                                             |
| ------------------ | -------- | ------------------ | ------------------------------------------------------- |
| `buttonText`       | string   | "Join Waitlist"    | Text displayed on the submit button                     |
| `placeholderText`  | string   | "Enter your email" | Placeholder text for the email input                    |
| `includeNameField` | boolean  | false              | Whether to show a name input field                      |
| `className`        | string   | ""                 | Additional CSS classes for the form container           |
| `onSuccess`        | function | undefined          | Callback function called after successful submission    |
| `redirectUrl`      | string   | ""                 | Optional URL to redirect to after successful submission |

## How it Works

1. User submits the form with their email (and optionally name)
2. The data is sent to the `/api/subscribe` endpoint
3. The API route sends two emails:
   - A notification email to you with the user's details
   - A welcome/confirmation email to the user
4. The form displays a success message

## Customization

### Email Templates

Edit the HTML templates in `app/api/subscribe/route.ts` to customize the email content.

### Form Appearance

Modify the component styling in `components/sign-up-form.tsx` to match your design requirements.

## Troubleshooting

- Check your SMTP settings if emails aren't being sent
- Verify that your environment variables are correctly set
- For development testing, consider using [Mailtrap](https://mailtrap.io/) to capture emails
