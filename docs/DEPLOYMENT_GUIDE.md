# Deployment Guide - Viyafilms Clone

## 🚀 Quick Deploy to Vercel (5 minutes)

### Prerequisites
- GitHub account
- Vercel account (free tier is fine)

### Steps

1. **Push to GitHub**
   ```bash
   cd viyafilms-clone
   git init
   git add .
   git commit -m "Initial commit - Viyafilms clone"
   git branch -M main
   git remote add origin https://github.com/yourusername/viyafilms-clone.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Configure:
     - Framework Preset: **Next.js** (auto-detected)
     - Root Directory: `./` 
     - Build Command: `npm run build`
     - Output Directory: `.next`

3. **Add Environment Variables**
   In Vercel project settings → Environment Variables:
   ```
   NEXT_PUBLIC_DIRECTUS_URL=https://cms.viyafilms.com
   NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your site is live! 🎉

## 🌐 Custom Domain Setup

### On Vercel:
1. Go to Project Settings → Domains
2. Add your domain (e.g., `yourstudio.com`)
3. Follow DNS configuration instructions
4. Add these DNS records at your domain registrar:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

Wait 24-48 hours for DNS propagation.

## 📧 Email Integration (Choose One)

### Option 1: Resend (Recommended)

1. **Sign up**: [resend.com](https://resend.com)
2. **Get API Key**: Dashboard → API Keys → Create
3. **Install package**:
   ```bash
   npm install resend
   ```

4. **Update `app/api/contact/route.ts`**:
   ```typescript
   import { Resend } from 'resend';
   
   const resend = new Resend(process.env.RESEND_API_KEY);
   
   // Inside POST function, replace TODO comment:
   await resend.emails.send({
     from: 'bookings@yourdomain.com',
     to: 'info@yourdomain.com',
     subject: `New Wedding Inquiry - ${formData.coupleName}`,
     html: `
       <h2>New Booking Inquiry</h2>
       <p><strong>Couple:</strong> ${formData.coupleName}</p>
       <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
       <p><strong>Email:</strong> ${formData.email}</p>
       <p><strong>Phone:</strong> ${formData.phone}</p>
       <p><strong>Event Date:</strong> ${formData.eventDate} at ${formData.eventTime}</p>
       <p><strong>Location:</strong> ${formData.eventLocation}</p>
       <p><strong>Style:</strong> ${formData.eventStyle}</p>
       <p><strong>Service:</strong> ${formData.jobType}</p>
       <p><strong>How they found us:</strong> ${formData.hearAbout}</p>
       <hr>
       <p><strong>Message:</strong></p>
       <p>${formData.message}</p>
     `,
   });
   ```

5. **Add env variable to Vercel**:
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   CONTACT_EMAIL=info@yourdomain.com
   ```

6. **Verify domain** in Resend dashboard to send from your domain

### Option 2: SendGrid

1. **Sign up**: [sendgrid.com](https://sendgrid.com)
2. **Get API Key**: Settings → API Keys
3. **Install**:
   ```bash
   npm install @sendgrid/mail
   ```

4. **Implementation**:
   ```typescript
   import sgMail from '@sendgrid/mail';
   
   sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
   
   await sgMail.send({
     to: 'info@yourdomain.com',
     from: 'bookings@yourdomain.com',
     subject: `New Inquiry - ${formData.coupleName}`,
     html: '...',
   });
   ```

### Option 3: Gmail SMTP (Free, but limited)

1. **Install**:
   ```bash
   npm install nodemailer
   ```

2. **Enable 2FA** on your Gmail account
3. **Create App Password**: Google Account → Security → 2-Step Verification → App passwords
4. **Implementation**:
   ```typescript
   import nodemailer from 'nodemailer';
   
   const transporter = nodemailer.createTransport({
     service: 'gmail',
     auth: {
       user: process.env.SMTP_USER,
       pass: process.env.SMTP_PASSWORD,
     },
   });
   
   await transporter.sendMail({
     from: process.env.SMTP_USER,
     to: 'info@yourdomain.com',
     subject: `New Inquiry - ${formData.coupleName}`,
     html: '...',
   });
   ```

5. **Add env variables**:
   ```
   SMTP_USER=youremail@gmail.com
   SMTP_PASSWORD=your_app_password
   ```

## 🎨 Directus CMS Setup

### Self-Hosted (Free)

1. **Requirements**: Docker installed
2. **Start Directus**:
   ```bash
   cd viyafilms-clone/directus
   docker-compose up -d
   ```

3. **Access**: `http://localhost:8055`
4. **First-time setup**:
   - Email: admin@example.com
   - Password: (create strong password)

5. **Create Collections**:

#### Collection: `images`
| Field | Type | Required |
|-------|------|----------|
| id | UUID | Auto |
| image | File | Yes |
| title | String | No |
| status | String | Yes |
| sort_order | Integer | No |

6. **Upload images** via Directus interface

7. **Update env**:
   ```
   NEXT_PUBLIC_DIRECTUS_URL=http://localhost:8055
   ```

### Directus Cloud (Paid)

1. Sign up at [directus.cloud](https://directus.cloud)
2. Create new project
3. Use provided URL in env variables
4. Create collections as above

## 🔒 Security Checklist

Before going live:

- [ ] Change all default passwords
- [ ] Add rate limiting to contact form
- [ ] Enable HTTPS (automatic on Vercel)
- [ ] Add Content Security Policy headers
- [ ] Configure CORS properly
- [ ] Don't expose API keys in client-side code
- [ ] Add honeypot field to contact form (anti-spam)
- [ ] Enable Vercel's DDoS protection

## 📊 Analytics Setup

### Google Analytics 4

1. **Create property**: [analytics.google.com](https://analytics.google.com)
2. **Get Measurement ID**: G-XXXXXXXXXX
3. **Install package**:
   ```bash
   npm install @next/third-parties
   ```

4. **Add to `app/layout.tsx`**:
   ```typescript
   import { GoogleAnalytics } from '@next/third-parties/google'
   
   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           {children}
           <GoogleAnalytics gaId="G-XXXXXXXXXX" />
         </body>
       </html>
     )
   }
   ```

### Plausible Analytics (Privacy-friendly)

1. Sign up at [plausible.io](https://plausible.io)
2. Add to `app/layout.tsx`:
   ```typescript
   <Script
     defer
     data-domain="yourdomain.com"
     src="https://plausible.io/js/script.js"
   />
   ```

## 🧪 Testing Before Launch

### Manual Testing
```bash
# Build production version
npm run build

# Test production build locally
npm start

# Open http://localhost:3000
```

### Checklist:
- [ ] All pages load without errors
- [ ] Images display correctly
- [ ] Contact form submits successfully
- [ ] Navigation works on all pages
- [ ] Mobile menu functions properly
- [ ] Lightbox opens/closes
- [ ] Video modals play
- [ ] No console errors
- [ ] Meta tags are correct (view source)
- [ ] Social share preview looks good

### Tools:
- **Lighthouse**: Check performance, SEO, accessibility
- **PageSpeed Insights**: [pagespeed.web.dev](https://pagespeed.web.dev)
- **Mobile-Friendly Test**: [search.google.com/test/mobile-friendly](https://search.google.com/test/mobile-friendly)

## 🎯 Post-Launch

1. **Submit sitemap** to Google Search Console
2. **Set up social media** profiles
3. **Add Instagram feed** integration
4. **Monitor** form submissions
5. **Check analytics** weekly
6. **Backup** regularly (Vercel auto-backups deployments)
7. **Update content** monthly

## 🆘 Troubleshooting

### Build Fails
- Check Next.js version compatibility
- Verify all dependencies installed
- Check for TypeScript errors: `npm run build`

### Images Not Loading
- Verify Directus URL is correct
- Check `next.config.ts` remote patterns
- Ensure images are published in Directus

### Form Not Working
- Check API route: `/api/contact`
- View browser console for errors
- Check network tab for request status

### Slow Performance
- Optimize images in Directus
- Enable caching headers
- Use Vercel's Edge Network
- Minimize animations on mobile

## 📞 Need Help?

- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Directus Docs**: [docs.directus.io](https://docs.directus.io)

---

**Good luck with your launch! 🚀**
