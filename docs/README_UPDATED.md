# Viyafilms Clone - Premium Wedding Photography Website

A modern, fully-featured wedding photography and cinematography website built with Next.js 16, featuring stunning animations, CMS integration, and a complete booking system.

## 🚀 Features

### ✅ Complete Pages
- **Homepage**: Hero carousel with smooth animations, featured gallery preview, and story section
- **About Us**: Multi-section layout with images and compelling brand story
- **Photo Gallery**: Masonry grid with lightbox functionality
- **Films**: Video showcase with modal player
- **FAQ**: Accordion-style frequently asked questions
- **Contact/Book Us**: Comprehensive booking form with validation

### 🎨 Design Features
- Elegant typography with Playfair Display and Inter fonts
- Smooth Framer Motion animations throughout
- Responsive design (mobile, tablet, desktop)
- Image optimization with Next.js Image component
- Progressive image loading with blur effect
- Custom scrollbar styling

### 🛠 Technical Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **CMS**: Directus SDK integration
- **Forms**: React Hook Form + Zod validation
- **TypeScript**: Full type safety

## 📦 Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit [http://localhost:3000](http://localhost:3000) to view the site.

## 🔧 Configuration

### Directus CMS Setup

1. **Create Collections** in your Directus instance:
   - `images`: For gallery photos
     - Fields: `image_file` (relation), `status`, `sort_order`
   - `films`: For video content (optional)
   - `faqs`: For FAQ content (optional)

2. **Update Environment Variables**:
   ```env
   NEXT_PUBLIC_DIRECTUS_URL=https://your-directus-instance.com
   ```

3. **Upload Images**: Add your wedding photos to the Directus media library and link them to the `images` collection.

### Email Integration (Optional)

To enable contact form emails, integrate one of these services:

#### Option 1: Resend (Recommended)
```bash
npm install resend
```

Update `app/api/contact/route.ts`:
```typescript
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'bookings@yourdomain.com',
  to: 'info@yourdomain.com',
  subject: `New Booking: ${formData.coupleName}`,
  html: `<h1>New Wedding Inquiry</h1>...`,
});
```

#### Option 2: SendGrid
```bash
npm install @sendgrid/mail
```

#### Option 3: Nodemailer (SMTP)
```bash
npm install nodemailer
```

## 📁 Project Structure

```
viyafilms-clone/
├── app/
│   ├── about/page.tsx          # About page
│   ├── contact/page.tsx        # Contact/booking page
│   ├── faq/page.tsx           # FAQ page
│   ├── films/page.tsx         # Films showcase
│   ├── gallery/page.tsx       # Photo gallery
│   ├── api/contact/route.ts   # Contact form API
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Homepage
│   └── globals.css            # Global styles
├── components/
│   ├── common/
│   │   ├── Logo.tsx
│   │   └── ImageWithBlur.tsx
│   ├── contact/
│   │   └── ContactForm.tsx    # Booking form
│   ├── faq/
│   │   └── FAQItem.tsx        # FAQ accordion
│   ├── films/
│   │   └── FilmCard.tsx       # Video card with modal
│   ├── gallery/
│   │   ├── MasonryGrid.tsx
│   │   └── Lightbox.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── GalleryPreview.tsx
│   │   └── StorySection.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   └── ui/
│       └── ImageWithBlur.tsx
├── lib/
│   ├── directus.ts            # CMS client
│   ├── constants.ts
│   └── utils.ts
└── public/
    └── (static assets)
```

## 🎯 Key Components

### Hero Carousel
- 3 rotating images with Ken Burns effect
- Smooth fade transitions
- Responsive text overlays

### Contact Form
- 12 validated fields
- Real-time error handling
- Success/error messaging
- Character counter for message field

### Gallery
- Masonry layout with responsive columns
- Click to open lightbox
- Keyboard navigation support
- Lazy loading images

### Films Section
- Video thumbnails with play buttons
- Modal player with YouTube/Vimeo embeds
- Close on backdrop click or ESC key

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Environment Variables on Vercel
Add these in your Vercel project settings:
- `NEXT_PUBLIC_DIRECTUS_URL`
- `RESEND_API_KEY` (if using email)
- `NEXT_PUBLIC_SITE_URL`

### Other Platforms
- **Netlify**: Works with zero configuration
- **Cloudflare Pages**: Compatible
- **Custom VPS**: Use `npm run build && npm start`

## 📝 Customization Guide

### 1. Update Branding
- Change logo in `components/common/Logo.tsx`
- Update colors in Tailwind classes (search for `gray-900` and replace)
- Modify fonts in `app/layout.tsx`

### 2. Replace Images
- Update hero images in `components/home/Hero.tsx`
- Replace gallery images in `components/home/GalleryPreview.tsx`
- Add your own photos to Directus CMS

### 3. Update Content
- Contact information in `components/layout/Footer.tsx`
- Pricing in `app/contact/page.tsx`
- FAQ answers in `app/faq/page.tsx`
- About page text in `app/about/page.tsx`

### 4. Add Social Links
- Update social media URLs in `components/layout/Footer.tsx`

## 🔍 SEO Optimization

Each page includes:
- Custom metadata (title, description)
- Open Graph tags for social sharing
- Semantic HTML structure
- Optimized images with alt text

To enhance further:
```typescript
// Add to each page.tsx
export const metadata = {
  title: 'Your Page Title',
  description: 'Your description',
  openGraph: {
    images: ['/og-image.jpg'],
  },
};
```

## 🐛 Known Issues & Solutions

### Issue: Images not loading
**Solution**: Ensure remote image domains are configured in `next.config.ts`:
```typescript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: '**.viyafilms.com' },
  ],
},
```

### Issue: Contact form not sending emails
**Solution**: The default implementation only logs to console. Integrate an email service (see Email Integration section).

### Issue: Hydration errors
**Solution**: Ensure `'use client'` directive is added to components using hooks or browser APIs.

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Directus](https://docs.directus.io/)

## 🤝 Contributing

Feel free to fork this project and customize it for your own photography business!

## 📄 License

This project is open source and available for personal and commercial use.

---

**Need Help?** Open an issue or contact the development team.

**Built with ❤️ using Next.js**
