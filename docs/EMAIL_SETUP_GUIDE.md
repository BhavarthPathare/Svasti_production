# Email Integration Setup Guide

## 🎉 Email System Ready!

Your contact form is now configured to send emails via **Resend** - one of the easiest and most reliable email services for developers.

---

## 📝 Quick Setup (5 minutes)

### Step 1: Sign Up for Resend (FREE)

1. Go to: **https://resend.com**
2. Click "Sign Up" (use GitHub or email)
3. Free tier includes: **100 emails/day** and **3,000 emails/month**

### Step 2: Get Your API Key

1. After signing up, go to: **https://resend.com/api-keys**
2. Click "Create API Key"
3. Name it: `Svasti Production Website`
4. Copy the key (starts with `re_...`)

### Step 3: Add API Key to Your Project

Open `.env.local` and replace this line:
```env
RESEND_API_KEY=re_123456789_YOUR_ACTUAL_KEY_HERE
```

With your actual key:
```env
RESEND_API_KEY=re_AbCdEf123456_your_real_key_here
```

### Step 4: Verify Domain (Optional but Recommended)

**For testing (works immediately):**
- Use `onboarding@resend.dev` as sender (already configured)
- Emails work right away!

**For production (professional):**
1. Go to: **https://resend.com/domains**
2. Click "Add Domain"
3. Enter your domain: `svastiproduction.com`
4. Add the DNS records they provide
5. Update `.env.local`:
   ```env
   CONTACT_EMAIL_FROM=bookings@svastiproduction.com
   ```

### Step 5: Test It!

1. Restart your dev server:
   ```bash
   npm run dev
   ```

2. Go to: **http://localhost:3000/contact**

3. Fill out the form and submit

4. Check your email: **bpathare22cs@student.mes.ac.in**

5. You should receive a beautifully formatted email!

---

## ✅ What's Included

### Email Template Features:
- ✨ Professional HTML design
- 📋 All form fields nicely formatted
- 🎨 Svasti Production branding
- 📱 Mobile-responsive layout
- 🔗 Clickable email and phone links
- ⏰ Timestamp of submission

### Fallback Handling:
- ✅ If email fails, form still saves data (logged to console)
- ✅ User always gets success message
- ✅ No errors exposed to user

---

## 📧 Email Preview

Here's what the email looks like:

```
┌─────────────────────────────────────┐
│  New Wedding Inquiry                │
│  Svasti Production                  │
└─────────────────────────────────────┘

Couple Name: Priya & Rahul

Contact Person: Priya Sharma

Email: priya@example.com

Phone: +91 98765 43210

Event Date & Time: 2025-06-15 at 14:00

Location: Mumbai, Maharashtra

Event Style: Traditional Hindu Wedding

Service Requested: Wedding Photography & Videography

Budget Range: ₹2,00,000 - ₹3,00,000

How They Found Us: Instagram

Message:
We are planning our dream wedding and would love
to have Svasti Production capture our special day...

────────────────────────────────────
Submitted on: Jan 12, 2025 at 3:45 PM
```

---

## 🔧 Configuration Options

### Change Recipient Email:
```env
CONTACT_EMAIL_TO=your-email@example.com
```

### Change Sender Email (after domain verification):
```env
CONTACT_EMAIL_FROM=bookings@yourdomain.com
```

### Multiple Recipients:
Edit `app/api/contact/route.ts`:
```typescript
to: ['email1@example.com', 'email2@example.com'],
```

---

## 🐛 Troubleshooting

### Email not arriving?

**1. Check API Key:**
```bash
# In terminal
echo $RESEND_API_KEY
```
Should show your key, not the placeholder.

**2. Check Resend Dashboard:**
- Go to: https://resend.com/emails
- See all sent emails and their status
- Check for errors or bounces

**3. Check Spam Folder:**
First emails sometimes go to spam.

**4. Check Console:**
Open browser dev tools (F12) and check for errors.

### API Key not working?

Make sure:
- ✅ You copied the full key
- ✅ No extra spaces in `.env.local`
- ✅ You restarted the dev server after adding the key

### Still not working?

The form still logs to console, so you won't lose submissions!

```javascript
// Check terminal output
console.log('Contact Form Submission:', formData);
```

---

## 💰 Resend Pricing

| Plan | Price | Emails/Month | Emails/Day |
|------|-------|--------------|------------|
| **Free** | $0 | 3,000 | 100 |
| **Pro** | $20 | 50,000 | 1,667 |
| **Business** | $80 | 100,000 | 3,333 |

**For your use case:** Free plan is perfect! You'll get ~100 inquiries/month max.

---

## 🚀 Alternative Email Services

### If you prefer something else:

#### **SendGrid** (also popular):
```bash
npm install @sendgrid/mail
```

#### **Nodemailer** (SMTP - Gmail):
```bash
npm install nodemailer
```

#### **Postmark** (transactional emails):
```bash
npm install postmark
```

Let me know if you need help setting up an alternative!

---

## 📊 Monitoring

### View Email Logs:
1. Go to: https://resend.com/emails
2. See all sent emails
3. Check delivery status
4. View email content
5. Track opens (Pro plan)

### Set up Webhooks (Optional):
Get notified when emails are delivered, opened, or bounced.

---

## ✨ Next Steps

Once email is working:

1. ✅ Test with a real submission
2. ✅ Check email formatting
3. ✅ Add to production environment variables
4. ✅ Consider setting up auto-replies to clients

---

## 🎯 Current Status

- ✅ Resend package installed
- ✅ Email template created
- ✅ API route configured
- ✅ Error handling in place
- ✅ Environment variables set up
- ⏳ Waiting for your Resend API key

**Add your API key and you're good to go!** 🚀
