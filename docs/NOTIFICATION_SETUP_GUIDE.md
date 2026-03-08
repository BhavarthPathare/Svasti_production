# 🔔 Multi-Channel Notification Setup Guide

Complete guide for setting up email, SMS, Slack, and other notification channels.

## 📧 Email Notifications (Already Configured!)

Your email notifications are already working with Gmail SMTP. 

### What's Included:
- ✅ Admin notification emails (to business owner)
- ✅ Customer confirmation emails (auto-reply to customers)
- ✅ Follow-up emails (can be automated)

### Current Configuration:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=bhavarth16@gmail.com
SMTP_PASSWORD=yvomsjxldgukfuyw (App Password)
```

## 📱 SMS Notifications (Optional)

Get instant text message alerts when someone submits an inquiry.

### Setup with Twilio:

1. **Create Twilio Account**
   - Go to [twilio.com](https://www.twilio.com)
   - Sign up for a free account ($15.50 trial credit)
   - Verify your phone number

2. **Get Your Credentials**
   - Dashboard → Account Info
   - Copy: Account SID and Auth Token
   - Get a phone number: Phone Numbers → Buy a Number

3. **Install Twilio Package**
   ```bash
   npm install twilio
   ```

4. **Add to .env.local**
   ```env
   TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   TWILIO_AUTH_TOKEN=your_auth_token_here
   TWILIO_PHONE_NUMBER=+1234567890
   ADMIN_PHONE_NUMBER=+919876543210
   ```

5. **Enable SMS in Configuration**
   Edit `lib/email-config.ts`:
   ```typescript
   export const notificationSettings = {
     sendSMS: true,  // Change to true
     // ... other settings
   };
   ```

6. **Activate SMS Code**
   Edit `lib/notification-service.ts` - uncomment the Twilio code:
   ```typescript
   const twilio = require('twilio');
   const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
   
   const message = await client.messages.create({
     body: `New wedding inquiry from ${formData.coupleName} for ${formData.eventDate}. Check your email for details.`,
     from: process.env.TWILIO_PHONE_NUMBER,
     to: process.env.ADMIN_PHONE_NUMBER,
   });
   ```

### Alternative SMS Services:
- **Vonage (formerly Nexmo)**: Good for international SMS
- **AWS SNS**: If using other AWS services
- **TextLocal**: Popular in India
- **MSG91**: Another India-focused option

## 💬 Slack Notifications (Optional)

Get notifications in your Slack workspace for real-time team alerts.

### Setup Slack Webhook:

1. **Create Slack Webhook**
   - Go to [api.slack.com/messaging/webhooks](https://api.slack.com/messaging/webhooks)
   - Click "Create your Slack app"
   - Choose "From scratch"
   - Name your app (e.g., "Svasti Inquiries")
   - Select your workspace

2. **Enable Incoming Webhooks**
   - In your app settings, go to "Incoming Webhooks"
   - Toggle "Activate Incoming Webhooks" to ON
   - Click "Add New Webhook to Workspace"
   - Choose channel (e.g., #sales, #inquiries)
   - Copy the Webhook URL

3. **Add to .env.local**
   ```env
   SLACK_WEBHOOK_URL=https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXX
   ```

4. **Enable Slack in Configuration**
   Edit `lib/email-config.ts`:
   ```typescript
   export const notificationSettings = {
     sendSlackNotification: true,  // Change to true
     // ... other settings
   };
   ```

### Slack Message Features:
- ✅ Formatted inquiry details
- ✅ Quick action buttons
- ✅ Color-coded urgency
- ✅ Direct email reply link

## 📲 WhatsApp Notifications (Advanced)

Send WhatsApp messages using WhatsApp Business API.

### Setup with Twilio WhatsApp:

1. **Enable WhatsApp in Twilio**
   - Same Twilio account as SMS
   - Go to Messaging → Try it out → WhatsApp
   - Follow setup wizard

2. **Add to .env.local**
   ```env
   WHATSAPP_ENABLED=true
   WHATSAPP_FROM=whatsapp:+14155238886
   WHATSAPP_TO=whatsapp:+919876543210
   ```

3. **Create WhatsApp Service**
   Create `lib/whatsapp-service.ts`:
   ```typescript
   const twilio = require('twilio');
   const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

   export async function sendWhatsAppNotification(formData: any) {
     const message = await client.messages.create({
       body: `🎬 New Wedding Inquiry!\n\nCouple: ${formData.coupleName}\nDate: ${formData.eventDate}\nEmail: ${formData.email}\n\nCheck your email for full details.`,
       from: process.env.WHATSAPP_FROM,
       to: process.env.WHATSAPP_TO,
     });
     return message.sid;
   }
   ```

## 📊 Dashboard Notifications (Future Enhancement)

Create a real-time dashboard to see all inquiries.

### Suggested Tech Stack:
- **Database**: Store inquiries in PostgreSQL/MongoDB
- **Real-time**: Use WebSockets or Server-Sent Events
- **Dashboard**: Next.js admin panel with auth

### Quick Implementation:

1. **Install Prisma (ORM)**
   ```bash
   npm install prisma @prisma/client
   npx prisma init
   ```

2. **Create Schema** (`prisma/schema.prisma`):
   ```prisma
   model Inquiry {
     id           String   @id @default(cuid())
     firstName    String
     lastName     String
     email        String
     phone        String
     coupleName   String
     eventDate    String
     eventTime    String
     location     String
     jobType      String
     message      String
     status       String   @default("new")
     createdAt    DateTime @default(now())
   }
   ```

3. **Store Inquiries**
   Add to `app/api/contact/route.ts`:
   ```typescript
   import { PrismaClient } from '@prisma/client';
   const prisma = new PrismaClient();

   // After validation, before sending notifications:
   const inquiry = await prisma.inquiry.create({
     data: {
       firstName: formData.firstName,
       lastName: formData.lastName,
       email: formData.email,
       // ... other fields
     },
   });
   ```

## 🔄 Automatic Follow-ups

Send automated follow-up emails to inquiries that haven't responded.

### Option 1: Simple Delay (Development Only)

Already implemented in `lib/notification-service.ts` - just enable it:

```typescript
// In route.ts, after sending initial notifications:
import { scheduleFollowUpEmail } from '@/lib/notification-service';

await scheduleFollowUpEmail(submissionData, 48); // 48 hours
```

⚠️ **Warning**: This only works while server is running. Not suitable for production.

### Option 2: Cron Job (Production)

Use Vercel Cron or external cron service.

**With Vercel Cron:**

1. Create `app/api/cron/follow-up/route.ts`:
   ```typescript
   import { NextResponse } from 'next/server';
   
   export async function GET(request: Request) {
     // Verify cron secret
     const authHeader = request.headers.get('authorization');
     if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
     }

     // Find inquiries from 48 hours ago without follow-up
     // Send follow-up emails
     
     return NextResponse.json({ success: true });
   }
   ```

2. Add to `vercel.json`:
   ```json
   {
     "crons": [{
       "path": "/api/cron/follow-up",
       "schedule": "0 10 * * *"
     }]
   }
   ```

### Option 3: Queue System (Advanced)

Use Bull Queue with Redis:

```bash
npm install bull redis
```

Create job processor for delayed emails.

## 📈 Email Analytics

Track open rates and click rates for your emails.

### Setup Email Tracking:

1. **Create Tracking API**
   Create `app/api/track/email-open/route.ts`:
   ```typescript
   import { NextResponse } from 'next/server';

   export async function GET(req: Request) {
     const { searchParams } = new URL(req.url);
     const id = searchParams.get('id');
     
     // Log to database
     console.log(`Email opened: ${id}`);
     
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

2. **Add Tracking to Emails**
   In `lib/email-templates.ts`, add before `</body>`:
   ```typescript
   <img src="${process.env.NEXT_PUBLIC_SITE_URL}/api/track/email-open?id=${inquiryId}" 
        width="1" height="1" style="display:none;" alt="" />
   ```

## 🧪 Testing Notifications

### Test Email:
```bash
# Use contact form on website
# Or use curl:
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: multipart/form-data" \
  -F "firstName=Test" \
  -F "lastName=User" \
  -F "email=test@example.com" \
  # ... other fields
```

### Test SMS:
Use Twilio console to send test message first.

### Test Slack:
```bash
curl -X POST YOUR_WEBHOOK_URL \
  -H "Content-Type: application/json" \
  -d '{"text": "Test notification"}'
```

## 📋 Notification Checklist

- [ ] Email notifications working
- [ ] Customer confirmation emails sent
- [ ] Admin notifications received
- [ ] SMS setup (optional)
- [ ] Slack integration (optional)
- [ ] Follow-up emails scheduled
- [ ] Error handling in place
- [ ] Test all notification channels
- [ ] Monitor notification logs
- [ ] Set up analytics (optional)

## 🔒 Security Best Practices

1. **Protect API Keys**
   - Never commit `.env.local` to git
   - Use environment variables
   - Rotate keys regularly

2. **Rate Limiting**
   - Add rate limiting to contact form
   - Prevent spam submissions
   - Use CAPTCHA if needed

3. **Webhook Security**
   - Verify webhook signatures
   - Use HTTPS only
   - Implement request validation

## 📊 Cost Estimates

### Email (Gmail)
- **Cost**: FREE for up to 500 emails/day
- **Recommended for**: Small to medium businesses

### SMS (Twilio)
- **Cost**: ~₹0.50-2.00 per SMS (varies by country)
- **Trial Credit**: $15.50 free
- **Monthly**: Depends on inquiry volume

### Slack
- **Cost**: FREE (unlimited messages)
- **Recommended for**: Teams

### WhatsApp (Twilio)
- **Cost**: ~₹0.35 per message
- **Template required**: For marketing messages

## 🆘 Troubleshooting

### Email Issues
- Check SMTP credentials
- Verify App Password
- Check spam folder
- Review EMAIL_FIX_COMPLETE.md

### SMS Not Sending
- Verify Twilio credentials
- Check phone number format (+country code)
- Ensure trial number is verified
- Check Twilio console logs

### Slack Not Working
- Verify webhook URL
- Check channel permissions
- Test webhook in Slack API tester
- Review workspace settings

## 🚀 Next Steps

1. ✅ Emails are already working
2. Choose additional channels (SMS, Slack)
3. Set up chosen channels using guides above
4. Test all notification channels
5. Enable in `lib/email-config.ts`
6. Monitor and adjust settings

---

**Need Help?** Check console logs for detailed error messages and debugging info.
