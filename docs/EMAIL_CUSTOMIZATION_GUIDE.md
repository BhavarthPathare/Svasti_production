# 📧 Email Customization Guide

Complete guide for customizing your email templates, colors, and content.

## 🎨 Quick Customization

### Change Email Theme/Colors

Edit `lib/email-config.ts` and change the `activeTheme`:

```typescript
// Choose from: purple, elegant, romantic, modern, nature
export const activeTheme = themes.romantic; // Change this line
```

Available themes:
- **purple** (default): Purple/violet gradient - modern and professional
- **elegant**: Black/grey with gold accents - sophisticated
- **romantic**: Pink gradient - warm and loving
- **modern**: Blue gradient - clean and fresh  
- **nature**: Green with gold - organic and natural

### Change Business Information

Edit `lib/email-config.ts` - `emailContent` section:

```typescript
export const emailContent: EmailContent = {
  businessName: 'Svasti Production',           // Your business name
  tagline: 'Capturing Your Perfect Moments',   // Your tagline
  supportEmail: 'info@svastiproduction.com',   // Support email
  supportPhone: '+91 98765 43210',             // Phone number
  websiteUrl: 'https://svastiproduction.com',  // Your website
  socialMedia: {
    instagram: 'https://instagram.com/yourpage',
    facebook: 'https://facebook.com/yourpage',
    youtube: 'https://youtube.com/@yourpage',
  },
};
```

### Change Email Content/Copy

Edit `lib/email-config.ts` - look for these sections:

1. **Admin Email Content** (`adminEmailContent`)
2. **Customer Email Content** (`customerEmailContent`)  
3. **Follow-up Email Content** (`followUpEmailContent`)

Example - changing the customer greeting:

```typescript
export const customerEmailContent = {
  headerTitle: '✨ Thank You for Reaching Out!', // Change this
  headerSubtitle: "We've received your inquiry",  // Change this
  // ... more options
};
```

## 🎨 Advanced Customization

### Create a Custom Theme

Add your own theme in `lib/email-config.ts`:

```typescript
export const themes = {
  // ... existing themes
  
  myCustomTheme: {
    primaryColor: '#FF6B6B',           // Main color
    secondaryColor: '#4ECDC4',         // Secondary color
    accentColor: '#FFE66D',            // Accent/highlight color
    headerGradient: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)',
    fontFamily: 'Arial, sans-serif',   // Font family
  },
};

// Then activate it:
export const activeTheme = themes.myCustomTheme;
```

### Add Your Logo

1. Add logo URL in `lib/email-config.ts`:

```typescript
export const defaultTheme: EmailTheme = {
  // ... other settings
  logoUrl: 'https://yourwebsite.com/logo.png',
};
```

2. Edit `lib/email-templates.ts` - add to header section:

```typescript
<div class="header">
  ${theme.logoUrl ? `<img src="${theme.logoUrl}" alt="Logo" style="max-width: 150px; margin-bottom: 20px;">` : ''}
  <h1>${customerEmailContent.headerTitle}</h1>
  // ... rest of header
</div>
```

### Customize Email Sections

Want to add/remove sections? Edit `lib/email-templates.ts`:

**Add a new section to customer email:**

```typescript
// In generateCustomerConfirmationHTML(), add after features section:
<div class="info-box" style="background: #e0f2fe;">
  <h3>🎁 Special Bonus!</h3>
  <p>Book in the next 7 days and get a free engagement shoot!</p>
</div>
```

**Remove a section:**
Just comment out or delete the section in the template.

## 📱 Notification Settings

Enable/disable different notification channels in `lib/email-config.ts`:

```typescript
export const notificationSettings: NotificationSettings = {
  sendAdminEmail: true,           // Email to business owner
  sendCustomerEmail: true,        // Confirmation to customer
  sendSMS: false,                 // SMS notification (requires Twilio)
  sendSlackNotification: false,   // Slack notification
  sendFollowUpEmail: true,        // Automatic follow-up
  followUpDelayHours: 48,        // Follow-up after 48 hours
};
```

## 🚀 Activate Enhanced System

### Step 1: Update the API Route

Replace the current route with the enhanced version:

```bash
# Backup current route (optional)
cp app/api/contact/route.ts app/api/contact/route.ts.backup

# Copy enhanced route
cp app/api/contact/route-enhanced.ts app/api/contact/route.ts
```

Or manually update `app/api/contact/route.ts`:

```typescript
// At the top, replace the import statements with:
import { sendAllNotifications } from '@/lib/notification-service';

// In the POST function, replace email sending code with:
const notificationResults = await sendAllNotifications(submissionData);
```

### Step 2: Install Dependencies (if needed)

```bash
npm install nodemailer
npm install --save-dev @types/nodemailer
```

### Step 3: Test the System

1. Start your dev server: `npm run dev`
2. Fill out the contact form on your website
3. Check your email inbox for both admin and customer emails
4. Check console logs for notification results

## 🎯 Email Content Best Practices

### Subject Lines
- Keep under 60 characters
- Include relevant details (couple name, date)
- Use emojis sparingly (1-2 per subject)

### Email Body
- Keep paragraphs short (2-3 sentences)
- Use bullet points for lists
- Include clear call-to-action buttons
- Mobile-friendly design (already implemented)

### Tone & Voice
- Professional but warm
- Excited about their special day
- Clear and concise
- Include personality

## 📊 Email Analytics (Advanced)

To track email opens and clicks, implement the tracking API:

1. Create `app/api/track/email-open/route.ts`:

```typescript
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  
  // Log email open
  console.log(`Email opened: ${id}`);
  
  // Store in database
  // await db.emailAnalytics.update({ id, opened: new Date() });
  
  // Return 1x1 transparent pixel
  const pixel = Buffer.from(
    'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    'base64'
  );
  
  return new NextResponse(pixel, {
    headers: {
      'Content-Type': 'image/gif',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  });
}
```

2. Add tracking pixel to emails in `lib/email-templates.ts`:

```typescript
// At end of email body, before </body>:
${generateTrackingPixel(inquiryId)}
```

## 🔧 Troubleshooting

### Emails not sending?
1. Check SMTP credentials in `.env.local`
2. Verify Gmail App Password is correct
3. Check console logs for error messages
4. See `EMAIL_FIX_COMPLETE.md` for Gmail setup

### Styling not working?
1. Email clients have limited CSS support
2. Use inline styles for critical styling
3. Test with multiple email clients (Gmail, Outlook, etc.)
4. Avoid advanced CSS (flexbox, grid work inconsistently)

### Colors not changing?
1. Make sure you saved `lib/email-config.ts`
2. Restart your dev server
3. Clear browser cache
4. Check activeTheme is set correctly

## 📚 Additional Resources

- [Email Design Best Practices](https://www.campaignmonitor.com/resources/guides/email-design/)
- [Gmail HTML Support](https://developers.google.com/gmail/design/reference/supported_css)
- [Email Testing Tools](https://www.emailonacid.com/)

## 🆘 Need Help?

If you need assistance with customization:

1. Check the console logs for error messages
2. Review the code comments in `lib/email-config.ts`
3. Test with simple changes first before complex modifications
4. Keep a backup of working versions

---

**Pro Tip:** Test email changes by sending test inquiries to yourself first before going live!
