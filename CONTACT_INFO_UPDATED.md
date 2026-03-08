# ✅ Contact Information Updated

## Company Details

- **Company Name**: Svasti Production
- **Owner**: Kunjan Shashikant Wani
- **Email**: svastiproduction2804@gmail.com
- **Phone**: +91 8530838928
- **Location**: Mumbai, India

## Social Media

- **Instagram**: https://www.instagram.com/svasti_production_/
- **YouTube**: https://www.youtube.com/@kunjanwani9108

## Files Updated

### 1. Email Configuration
- ✅ `lib/email-config.ts`
  - Updated support email
  - Updated phone number
  - Updated Instagram & YouTube links
  - Removed Facebook (not provided)

### 2. Footer Component
- ✅ `components/layout/Footer.tsx`
  - Updated contact email
  - Updated phone number
  - Updated Instagram link
  - Updated YouTube link
  - Added email link

### 3. FAQ Page
- ✅ `app/faq/page.tsx`
  - Updated booking email
  - Updated phone number

### 4. Environment Files
- ✅ `.env.local`
  - Updated SMTP_USER to svastiproduction2804@gmail.com
  - Updated CONTACT_EMAIL_TO
  - Updated CONTACT_EMAIL_FROM
  - **⚠️ Need to add Gmail App Password**

- ✅ `.env.local.example`
  - Updated example email

## 🔑 IMPORTANT: Setup Gmail App Password

To enable the contact form to send emails, you need to set up a Gmail App Password:

### Steps:

1. **Go to Google Account Settings**
   - Visit: https://myaccount.google.com/apppasswords
   - Sign in with: **svastiproduction2804@gmail.com**

2. **Enable 2-Step Verification** (if not already enabled)
   - Go to: https://myaccount.google.com/security
   - Enable 2-Step Verification

3. **Generate App Password**
   - Go back to: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Name it: "Svasti Production Website"
   - Click "Generate"
   - Copy the 16-character password

4. **Update .env.local**
   - Open `.env.local` file
   - Replace `YOUR_NEW_APP_PASSWORD_HERE` with the generated password
   - Example: `SMTP_PASSWORD=abcd efgh ijkl mnop` (remove spaces)

5. **Restart Your Server**
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```

## Testing

### Test Contact Form
1. Go to: http://localhost:3000/contact
2. Fill out the form
3. Submit
4. Check your email: svastiproduction2804@gmail.com

### Test Social Links
1. Go to: http://localhost:3000
2. Scroll to footer
3. Click Instagram icon → Should open your Instagram
4. Click YouTube icon → Should open your YouTube channel
5. Click Email icon → Should open email client

## Email Templates

Your emails will now show:
- **Business Name**: Svasti Production
- **Support Email**: svastiproduction2804@gmail.com
- **Phone**: +91 8530838928
- **Instagram**: Link to svasti_production_
- **YouTube**: Link to @kunjanwani9108

## What's Working

✅ All contact information updated across the website
✅ Footer shows correct email and phone
✅ FAQ page shows correct contact details
✅ Social media links point to your accounts
✅ Email configuration ready (needs App Password)

## What You Need to Do

⚠️ **Required**:
1. Generate Gmail App Password (see steps above)
2. Update `.env.local` with the password
3. Test the contact form

🔒 **Security Note**:
- Never commit `.env.local` to git
- Keep your App Password secure
- The old exposed credentials have been removed

## Quick Reference

```env
# Your Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=svastiproduction2804@gmail.com
SMTP_PASSWORD=your_16_char_app_password_here
CONTACT_EMAIL_TO=svastiproduction2804@gmail.com
CONTACT_EMAIL_FROM=svastiproduction2804@gmail.com
```

---

**Status**: ✅ Contact information updated successfully
**Next Step**: Set up Gmail App Password to enable contact form
