# Gmail SMTP Setup for Contact Form

## Overview
We'll use your Gmail account (`bpathare22cs@student.mes.ac.in`) to send contact form emails using SMTP.

## Step 1: Enable 2-Factor Authentication on Gmail

1. Go to: https://myaccount.google.com/security
2. Find "2-Step Verification"
3. Click "Get Started" and follow the steps
4. **Important:** You MUST enable 2FA to create App Passwords

## Step 2: Create App Password

1. Go to: https://myaccount.google.com/apppasswords
2. Sign in if prompted
3. Under "Select app" → Choose "Mail"
4. Under "Select device" → Choose "Other (Custom name)"
5. Type: "ViyaFilms Contact Form"
6. Click "Generate"
7. **COPY the 16-character password** (looks like: `abcd efgh ijkl mnop`)
   - You'll use this instead of your regular Gmail password
   - Save it securely - you can't see it again!

## Step 3: Install Nodemailer

```bash
cd viyafilms-clone
npm install nodemailer
npm install -D @types/nodemailer
```

## Step 4: Update Environment Variables

I'll update your `.env.local` file with the SMTP configuration.
You'll need to add the App Password from Step 2.

## Step 5: Update API Route

I'll modify the contact form API to use Gmail SMTP instead of Resend.

---

## After Setup, Test By:

1. Go to: http://localhost:3000/contact
2. Fill out the form
3. Submit
4. Check your email: `bpathare22cs@student.mes.ac.in`
5. You should receive the inquiry!

## Benefits of Gmail SMTP

✅ **Free** - No cost for moderate usage
✅ **Reliable** - Gmail's infrastructure
✅ **Easy** - Use your existing account
✅ **500 emails/day** - More than enough for contact forms

## Limitations

⚠️ 500 emails per day limit
⚠️ Gmail might flag as spam initially (add to safe senders)
⚠️ Requires 2FA setup

---

## Ready to Proceed?

I'll now:
1. ✅ Install nodemailer package
2. ✅ Update .env.local file
3. ✅ Rewrite /api/contact/route.ts to use Gmail
4. ✅ Test the setup

You just need to:
1. Enable 2FA on your Gmail (if not already)
2. Generate App Password
3. Provide me the 16-character App Password
4. Test the form!

**Do you have 2FA enabled and an App Password ready?** Or shall I proceed with the setup first and you can add the password later?
