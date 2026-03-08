// Email Configuration and Customization
// This file allows easy customization of email templates without touching the main code

export interface EmailTheme {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  headerGradient: string;
  fontFamily: string;
  logoUrl?: string;
}

export interface EmailContent {
  businessName: string;
  tagline: string;
  supportEmail: string;
  supportPhone?: string;
  websiteUrl: string;
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
    twitter?: string;
  };
}

export interface NotificationSettings {
  sendAdminEmail: boolean;
  sendCustomerEmail: boolean;
  sendSMS: boolean;
  sendSlackNotification: boolean;
  sendFollowUpEmail: boolean;
  followUpDelayHours: number;
}

// Default theme - Purple/Violet gradient (current)
export const defaultTheme: EmailTheme = {
  primaryColor: '#667eea',
  secondaryColor: '#764ba2',
  accentColor: '#10b981',
  headerGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
};

// Alternative themes you can switch to
export const themes = {
  purple: defaultTheme,
  
  elegant: {
    primaryColor: '#1f2937',
    secondaryColor: '#4b5563',
    accentColor: '#d4af37',
    headerGradient: 'linear-gradient(135deg, #1f2937 0%, #4b5563 100%)',
    fontFamily: 'Georgia, "Times New Roman", serif',
  },
  
  romantic: {
    primaryColor: '#ec4899',
    secondaryColor: '#be185d',
    accentColor: '#f43f5e',
    headerGradient: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  
  modern: {
    primaryColor: '#3b82f6',
    secondaryColor: '#1e40af',
    accentColor: '#10b981',
    headerGradient: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  
  nature: {
    primaryColor: '#059669',
    secondaryColor: '#047857',
    accentColor: '#fbbf24',
    headerGradient: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
};

// Business information
export const emailContent: EmailContent = {
  businessName: 'Svasti Production',
  tagline: 'Capturing Your Perfect Moments',
  supportEmail: process.env.CONTACT_EMAIL_FROM || 'svastiproduction2804@gmail.com',
  supportPhone: '+91 8530838928',
  websiteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  socialMedia: {
    instagram: 'https://www.instagram.com/svasti_production_/',
    youtube: 'https://www.youtube.com/@kunjanwani9108',
  },
};

// Notification settings
export const notificationSettings: NotificationSettings = {
  sendAdminEmail: true,
  sendCustomerEmail: true,
  sendSMS: false, // SMS disabled - not using Twilio
  sendSlackNotification: false, // Enable when Slack webhook is configured
  sendFollowUpEmail: true,
  followUpDelayHours: 48, // Send follow-up after 48 hours
};

// Email content customization
export const adminEmailContent = {
  subject: (formData: any) => `🎬 New Wedding Inquiry: ${formData.coupleName} - ${formData.eventDate}`,
  headerTitle: '🎬 New Wedding Inquiry',
  headerSubtitle: (businessName: string) => businessName,
  badge: '⚡ Immediate Action Required',
  quickOverviewTitle: '📋 Quick Overview',
  replyButtonText: '📧 Reply to Customer',
  footerTip: '💡 <strong>Tip:</strong> Respond within 24 hours for best customer experience',
};

export const customerEmailContent = {
  subject: '✨ Thank You for Your Inquiry - Svasti Production',
  headerTitle: '✨ Thank You for Reaching Out!',
  headerSubtitle: "We've received your inquiry",
  greeting: (firstName: string) => `Dear ${firstName},`,
  mainMessage: {
    paragraph1: (businessName: string) => 
      `Thank you for considering <strong>${businessName}</strong> for your special day! We're excited to learn about your wedding plans.`,
    paragraph2: 
      "We've received your inquiry and our team will review the details carefully. We understand how important this day is to you, and we're committed to making it absolutely unforgettable.",
  },
  inquiryDetailsTitle: '📋 Your Inquiry Details',
  features: [
    {
      icon: '⚡',
      title: 'Quick Response',
      description: 'Our team will respond within 24-48 hours with pricing, availability, and next steps.',
    },
    {
      icon: '🎥',
      title: 'Professional Service',
      description: 'Award-winning cinematography and photography that captures your unique love story.',
    },
    {
      icon: '💎',
      title: 'Personalized Experience',
      description: "Every wedding is unique. We'll customize our services to match your vision perfectly.",
    },
  ],
  ctaTitle: '🎬 Explore Our Work',
  ctaDescription: "While you wait, take a look at our portfolio and previous weddings we've captured!",
  ctaButtons: [
    { text: 'View Gallery', link: '/gallery' },
    { text: 'Watch Films', link: '/films' },
  ],
  nextStepsTitle: 'What happens next?',
  nextSteps: [
    'Our team reviews your inquiry and checks availability',
    "We'll email you with pricing details and package options",
    "If you're interested, we'll schedule a consultation call or meeting",
    "We'll finalize the details and secure your date!",
  ],
  closingMessage: 
    "If you have any urgent questions, feel free to reply to this email or call us directly.",
  closingSignature: "We can't wait to be part of your special day! 💕",
  signatureTitle: 'Warm regards,',
  signatureTeam: (businessName: string) => `The ${businessName} Team`,
};

// Follow-up email content
export const followUpEmailContent = {
  subject: (formData: any) => `Following Up on Your Wedding Inquiry - ${formData.coupleName}`,
  headerTitle: '👋 Just Checking In!',
  headerSubtitle: 'We wanted to follow up on your inquiry',
  greeting: (firstName: string) => `Hi ${firstName},`,
  mainMessage: 
    "We wanted to follow up on your wedding inquiry from a few days ago. We hope you've had a chance to explore our portfolio!",
  availabilityReminder: 
    "Wedding dates book up quickly, especially during peak season. We'd love to discuss your special day and check our availability for your date.",
  callToAction: 
    "If you have any questions or would like to schedule a consultation, please don't hesitate to reach out. We're here to help!",
  offerTitle: '🎁 Special Offer',
  offerDescription: 
    "Book within the next 7 days and receive a complimentary engagement photo session (valued at ₹15,000)!",
};

// Get active theme (change this to switch themes)
export const activeTheme = themes.purple; // Change to: elegant, romantic, modern, nature
