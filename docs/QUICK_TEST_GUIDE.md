# Quick Test Guide - Contact Form

## Test Now (Without Email)

The form works immediately! You can test it right now:

### 1. Open Contact Page
```
http://localhost:3000/contact
```

### 2. Fill Out Form
Use any test data:
- First Name: Test
- Last Name: User
- Couple Name: Test & Demo
- Email: test@example.com
- Phone: 9876543210
- Event Date: Tomorrow's date
- Event Time: 6:00 PM
- Location: Mumbai
- Style: Traditional
- Job Type: Full Wedding Coverage
- Budget: ₹50,000 - ₹1,00,000
- How did you hear: Google
- Message: This is a test

### 3. Submit & Check Terminal
You'll see in the terminal:
```
Contact Form Submission: {
  timestamp: '2024-...',
  firstName: 'Test',
  lastName: 'User',
  ...
}
⚠️ Gmail SMTP not configured. Email not sent.
📧 To enable email: Add Gmail App Password to .env.local
```

**This is NORMAL!** The form works, it just needs the App Password to send emails.

---

## Test After Adding App Password

### 1. Get App Password
- Go to: https://myaccount.google.com/apppasswords
- Must have 2FA enabled first!
- Create password for "Mail" → "ViyaFilms"
- Copy the 16-character code (like: `abcd efgh ijkl mnop`)

### 2. Add to .env.local
```bash
# Open the file
code viyafilms-clone/.env.local

# Find this line:
SMTP_PASSWORD=YOUR_16_CHARACTER_APP_PASSWORD_HERE

# Replace with your code (no spaces):
SMTP_PASSWORD=abcdefghijklmnop
```

### 3. Restart Server
```bash
# Stop server: Press Ctrl+C
# Start again:
npm run dev
```

### 4. Submit Form Again
Same steps as before, but now check terminal:
```
✅ Email sent successfully via Gmail SMTP!
Message ID: <...@gmail.com>
```

### 5. Check Email
- Open Gmail: `bpathare22cs@student.mes.ac.in`
- Look for: "New Wedding Inquiry"
- Should see beautiful HTML formatted email
- Try clicking "Reply" - should go to the test email

---

## What the Email Looks Like

```
Subject: New Wedding Inquiry: Test & Demo - [Date]

From: ViyaFilms Contact Form <bpathare22cs@student.mes.ac.in>
Reply-To: test@example.com

┌─────────────────────────────┐
│   New Wedding Inquiry       │
│   Svasti Production         │
└─────────────────────────────┘

Couple Name: Test & Demo
Contact Person: Test User
Email: test@example.com (clickable)
Phone: 9876543210 (clickable)
Event Date & Time: [Date] at 6:00 PM
Location: Mumbai
Event Style: Traditional
Service Requested: Full Wedding Coverage
Budget Range: ₹50,000 - ₹1,00,000
How They Found Us: Google
Message: This is a test

Submitted on: [Timestamp]
```

---

## Troubleshooting

### Form Submits But No Success Message
**Check:** Browser console for errors
**Fix:** Make sure all required fields are filled

### "EAUTH" Error in Terminal
**Problem:** Wrong App Password
**Fix:** 
1. Generate new App Password
2. Copy correctly (no spaces)
3. Update .env.local
4. Restart server

### Email Goes to Spam
**Normal:** First few emails might go to spam
**Fix:** 
1. Mark as "Not Spam"
2. Add to safe senders
3. Future emails will go to inbox

### No Email Received
**Check:**
1. Terminal shows "✅ Email sent"?
2. Check spam folder
3. Verify email address in .env.local
4. Wait a few minutes (Gmail can be slow)

---

## Quick Command Reference

```bash
# Start server
npm run dev

# Stop server
Ctrl+C

# Test form
http://localhost:3000/contact

# View logs
# Check your terminal where server is running

# Check email
# Open Gmail in browser
```

---

## Form Validation

Required fields (marked with *):
- ✅ First Name
- ✅ Last Name
- ✅ Couple Name
- ✅ Email
- ✅ Phone
- ✅ Event Date
- ✅ Event Time
- ✅ Location
- ✅ Event Style
- ✅ Job Type
- ✅ How did you hear about us
- ✅ Message

Optional:
- Budget Range

---

## Success Indicators

### ✅ Form Working
- Form submits without errors
- Success message appears
- Data logged to terminal

### ✅ Email Configured
- Terminal shows: "✅ Email sent successfully"
- Email received in inbox
- Email is formatted correctly
- Reply-to works

---

## Next Steps After Testing

Once email is working:
1. ✅ Test from different devices
2. ✅ Share form with team
3. ✅ Add to website navigation
4. ✅ Monitor inquiries daily
5. ✅ Consider adding auto-reply email

---

**Ready to test?** 
1. Open http://localhost:3000/contact
2. Fill out the form
3. Check terminal logs
4. Add App Password if not done
5. Check your email!

🎉 **Your contact form is ready to receive wedding inquiries!**
