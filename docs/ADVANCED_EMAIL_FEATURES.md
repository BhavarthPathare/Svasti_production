# 🚀 Advanced Email Features

Additional features to enhance your email system beyond basic notifications.

## 📎 Email Attachments

Send PDFs, brochures, or price lists with your emails.

### Setup:

1. **Create PDF Generator** (using `jspdf` or `pdfkit`):

```bash
npm install jspdf
```

2. **Generate Price List PDF**:

Create `lib/pdf-generator.ts`:
```typescript
import jsPDF from 'jspdf';

export function generatePriceListPDF(): Buffer {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(20);
  doc.text('Svasti Production - Wedding Packages', 20, 20);
  
  // Content
  doc.setFontSize(12);
  doc.text('Premium Package: ₹5,00,000', 20, 40);
  doc.text('- Full day coverage', 30, 50);
  doc.text('- 2 Videographers + 2 Photographers', 30, 60);
  doc.text('- Same day edit video', 30, 70);
  // ... more content
  
  return Buffer.from(doc.output('arraybuffer'));
}
```

3. **Attach to Email**:

In `lib/notification-service.ts`:
```typescript
import { generatePriceListPDF } from './pdf-generator';

const emailInfo = await transporter.sendMail({
  // ... other fields
  attachments: [
    {
      filename: 'Svasti-Production-Pricing.pdf',
      content: generatePriceListPDF(),
    },
    {
      filename: 'Company-Brochure.pdf',
      path: './public/documents/brochure.pdf', // Or use URL
    },
  ],
});
```

## 📅 Calendar Invites

Send calendar events (.ics files) for consultations.

### Implementation:

```bash
npm install ical-generator
```

Create `lib/calendar-generator.ts`:
```typescript
import ical from 'ical-generator';

export function generateConsultationInvite(formData: any, consultationDate: Date) {
  const calendar = ical({
    name: 'Svasti Production Consultation',
    timezone: 'Asia/Kolkata',
  });

  calendar.createEvent({
    start: consultationDate,
    end: new Date(consultationDate.getTime() + 60 * 60 * 1000), // 1 hour
    summary: `Wedding Consultation - ${formData.coupleName}`,
    description: `Consultation call to discuss your wedding plans for ${formData.eventDate}`,
    location: 'Video Call',
    url: 'https://meet.google.com/your-meeting-link',
    organizer: {
      name: 'Svasti Production',
      email: process.env.CONTACT_EMAIL_FROM!,
    },
    attendees: [
      {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
      },
    ],
  });

  return calendar.toString();
}
```

Attach to email:
```typescript
attachments: [
  {
    filename: 'consultation.ics',
    content: generateConsultationInvite(formData, consultationDate),
  },
]
```

## 🎨 Dynamic Content

Personalize emails based on inquiry details.

### Smart Content Examples:

```typescript
// In lib/email-templates.ts

// Show different content based on budget
function getBudgetMessage(budget: string) {
  const budgetRanges = {
    '1-2L': 'Our Essential package is perfect for your budget!',
    '2-3L': 'Check out our Premium package with additional features!',
    '3-5L': 'Our Luxury package offers comprehensive coverage!',
    '5L+': 'Our Exclusive package provides the ultimate experience!',
  };
  return budgetRanges[budget] || 'We have packages for every budget!';
}

// Show seasonal offers
function getSeasonalOffer(eventDate: string) {
  const month = new Date(eventDate).getMonth();
  
  // Off-season discount (April-October)
  if (month >= 3 && month <= 9) {
    return `
      <div class="offer-box">
        <h3>🎁 Off-Season Special!</h3>
        <p>Book now and save 15% on your wedding package!</p>
      </div>
    `;
  }
  
  // Peak season (November-March)
  return `
    <div class="info-box">
      <h3>⚡ Peak Season Alert</h3>
      <p>Dates are filling up fast! Book soon to secure your date.</p>
    </div>
  `;
}

// Location-specific content
function getLocationContent(location: string) {
  if (location.toLowerCase().includes('goa')) {
    return {
      tip: 'Goa weddings are stunning! We have extensive experience shooting at all major venues in Goa.',
      accommodations: 'We can recommend excellent accommodations for your guests.',
    };
  }
  // Add more locations
  return null;
}
```

## 📊 A/B Testing

Test different email versions to improve conversion.

### Setup:

Create `lib/email-variants.ts`:
```typescript
export const emailVariants = {
  subject: {
    A: '✨ Thank You for Your Inquiry - Svasti Production',
    B: '🎬 Your Wedding Inquiry - Next Steps Inside',
  },
  
  headerTitle: {
    A: '✨ Thank You for Reaching Out!',
    B: "🎉 We're Excited About Your Wedding!",
  },
  
  cta: {
    A: 'View Our Portfolio',
    B: 'See Our Latest Weddings',
  },
};

// Randomly assign variant
export function getVariant() {
  return Math.random() < 0.5 ? 'A' : 'B';
}

// Track which variant was sent
export function trackEmailVariant(email: string, variant: string) {
  // Store in database for analysis
  console.log(`Email sent to ${email} with variant ${variant}`);
}
```

## 🔄 Email Sequences

Create automated email sequences for better engagement.

### Example Sequence:

1. **Immediate**: Confirmation email (already implemented)
2. **24 hours**: Portfolio showcase email
3. **48 hours**: Follow-up with special offer
4. **7 days**: Last chance reminder
5. **14 days**: Availability update

### Implementation:

Create `lib/email-sequences.ts`:
```typescript
export const emailSequence = [
  {
    delay: 0, // Immediate
    template: 'confirmation',
    subject: '✨ Thank You for Your Inquiry',
  },
  {
    delay: 24, // 24 hours
    template: 'portfolio',
    subject: '🎬 Check Out Our Latest Wedding Films',
  },
  {
    delay: 48, // 48 hours
    template: 'follow-up',
    subject: '💝 Special Offer for Your Wedding',
  },
  {
    delay: 168, // 7 days
    template: 'last-chance',
    subject: '⏰ Your Date May Not Be Available Much Longer',
  },
];

// Schedule all emails in sequence
export async function scheduleEmailSequence(formData: any) {
  for (const email of emailSequence) {
    // Use job queue to schedule
    await scheduleEmail(formData, email.template, email.delay);
  }
}
```

## 🌐 Multi-Language Support

Send emails in customer's preferred language.

### Setup:

1. **Add language field** to contact form:
```typescript
<select name="preferredLanguage">
  <option value="en">English</option>
  <option value="hi">हिंदी (Hindi)</option>
  <option value="mr">मराठी (Marathi)</option>
</select>
```

2. **Create translations**:

Create `lib/email-translations.ts`:
```typescript
export const translations = {
  en: {
    headerTitle: '✨ Thank You for Reaching Out!',
    greeting: (name) => `Dear ${name},`,
    mainMessage: 'Thank you for considering Svasti Production...',
  },
  hi: {
    headerTitle: '✨ हमसे संपर्क करने के लिए धन्यवाद!',
    greeting: (name) => `प्रिय ${name},`,
    mainMessage: 'स्वस्ति प्रोडक्शन पर विचार करने के लिए धन्यवाद...',
  },
  mr: {
    headerTitle: '✨ संपर्क साधल्याबद्दल धन्यवाद!',
    greeting: (name) => `प्रिय ${name},`,
    mainMessage: 'स्वस्ती प्रोडक्शनचा विचार केल्याबद्दल धन्यवाद...',
  },
};

export function getTranslation(lang: string, key: string, ...args: any[]) {
  const translation = translations[lang]?.[key] || translations['en'][key];
  return typeof translation === 'function' ? translation(...args) : translation;
}
```

## 📱 SMS Integration with Email

Send coordinated SMS + Email notifications.

### Example:

```typescript
// In notification-service.ts

export async function sendCoordinatedNotification(formData: any) {
  // Send email with full details
  await sendCustomerConfirmationEmail(formData);
  
  // Send short SMS confirmation
  if (notificationSettings.sendSMS) {
    await sendSMS(
      formData.phone,
      `Hi ${formData.firstName}! Thanks for your inquiry. Check your email (${formData.email}) for details. - Svasti Production`
    );
  }
}
```

## 💳 Payment Links

Include payment/booking links in emails.

### Razorpay Integration:

```bash
npm install razorpay
```

Create `lib/payment-service.ts`:
```typescript
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function generateBookingLink(formData: any, amount: number) {
  const paymentLink = await razorpay.paymentLink.create({
    amount: amount * 100, // Amount in paise
    currency: 'INR',
    description: `Wedding booking deposit for ${formData.coupleName}`,
    customer: {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      contact: formData.phone,
    },
    notify: {
      sms: true,
      email: true,
    },
    callback_url: `${process.env.NEXT_PUBLIC_SITE_URL}/booking/success`,
  });

  return paymentLink.short_url;
}
```

Add to email:
```typescript
const bookingLink = await generateBookingLink(formData, 50000); // ₹50,000 deposit

// In email template:
<a href="${bookingLink}" class="button">
  💳 Pay Booking Deposit (₹50,000)
</a>
```

## 🔐 Secure Email Links

Create secure, expiring links for quotes/proposals.

### Implementation:

```typescript
import crypto from 'crypto';

export function generateSecureToken(email: string, expiryHours: number = 48) {
  const data = {
    email,
    expires: Date.now() + (expiryHours * 60 * 60 * 1000),
  };
  
  const token = crypto
    .createHmac('sha256', process.env.EMAIL_SECRET!)
    .update(JSON.stringify(data))
    .digest('hex');
  
  return Buffer.from(JSON.stringify({ ...data, token })).toString('base64');
}

export function verifySecureToken(encodedToken: string) {
  const data = JSON.parse(Buffer.from(encodedToken, 'base64').toString());
  
  if (Date.now() > data.expires) {
    throw new Error('Link expired');
  }
  
  const expectedToken = crypto
    .createHmac('sha256', process.env.EMAIL_SECRET!)
    .update(JSON.stringify({ email: data.email, expires: data.expires }))
    .digest('hex');
  
  if (data.token !== expectedToken) {
    throw new Error('Invalid token');
  }
  
  return data.email;
}
```

Use in emails:
```typescript
const token = generateSecureToken(formData.email, 48);
const quoteUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/quote/${token}`;

// In email:
<a href="${quoteUrl}" class="button">
  📄 View Your Personalized Quote
</a>
<p style="font-size: 12px; color: #6b7280;">
  This link expires in 48 hours for security.
</p>
```

## 📈 Email Performance Metrics

Track and analyze email performance.

### Metrics to Track:
- Open rate
- Click-through rate
- Response time
- Conversion rate (booking)
- Bounce rate

### Dashboard Implementation:

Create `app/admin/email-analytics/page.tsx`:
```typescript
export default function EmailAnalytics() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Email Analytics</h1>
      
      <div className="grid grid-cols-4 gap-6 mb-8">
        <MetricCard 
          title="Total Sent" 
          value="1,234" 
          change="+12%" 
        />
        <MetricCard 
          title="Open Rate" 
          value="68%" 
          change="+5%" 
        />
        <MetricCard 
          title="Click Rate" 
          value="23%" 
          change="+3%" 
        />
        <MetricCard 
          title="Bookings" 
          value="47" 
          change="+8%" 
        />
      </div>
      
      {/* Charts and graphs */}
    </div>
  );
}
```

## 🎯 Smart Triggers

Send emails based on customer behavior.

### Examples:

1. **Viewed pricing page** → Send pricing PDF
2. **Watched 3+ videos** → Send special offer
3. **Abandoned form** → Send completion reminder
4. **Repeat visitor** → Send personalized message

### Implementation:

```typescript
// Track user behavior
export function trackBehavior(email: string, action: string) {
  // Store in database
  behaviors.push({ email, action, timestamp: Date.now() });
  
  // Check triggers
  checkEmailTriggers(email);
}

// Check if any triggers should fire
async function checkEmailTriggers(email: string) {
  const userBehaviors = await getUserBehaviors(email);
  
  // Trigger: Viewed pricing 2+ times
  if (countAction(userBehaviors, 'viewed_pricing') >= 2) {
    await sendEmail(email, 'pricing-details');
  }
  
  // Trigger: Watched 3+ films
  if (countAction(userBehaviors, 'watched_film') >= 3) {
    await sendEmail(email, 'special-offer');
  }
}
```

## 📋 Implementation Checklist

- [ ] PDF attachments (price lists, brochures)
- [ ] Calendar invites for consultations
- [ ] Dynamic content based on inquiry
- [ ] A/B testing setup
- [ ] Email sequences configured
- [ ] Multi-language support
- [ ] SMS + Email coordination
- [ ] Payment links integration
- [ ] Secure expiring links
- [ ] Analytics tracking
- [ ] Behavior-based triggers

## 🚀 Quick Start

1. Choose 2-3 features to implement first
2. Test with sample data
3. Monitor performance
4. Iterate based on results
5. Add more features gradually

---

**Pro Tip:** Start simple and add features based on actual needs. Don't over-engineer from the start!
