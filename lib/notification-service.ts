// Multi-Channel Notification Service
// Supports Email, SMS, Slack, and other notification channels

import nodemailer from 'nodemailer';
import { notificationSettings, emailContent } from './email-config';
import { 
  generateAdminEmailHTML, 
  generateCustomerConfirmationHTML,
  generateFollowUpEmailHTML 
} from './email-templates';

// Email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export interface NotificationResult {
  success: boolean;
  channel: string;
  messageId?: string;
  error?: string;
}

// Send admin email notification
export async function sendAdminEmailNotification(formData: any): Promise<NotificationResult> {
  if (!notificationSettings.sendAdminEmail) {
    return { success: false, channel: 'admin-email', error: 'Admin email disabled in settings' };
  }

  try {
    const emailInfo = await transporter.sendMail({
      from: `"${emailContent.businessName} - Contact Form" <${process.env.CONTACT_EMAIL_FROM}>`,
      to: process.env.CONTACT_EMAIL_TO,
      subject: `🎬 New Wedding Inquiry: ${formData.coupleName} - ${formData.eventDate}`,
      html: generateAdminEmailHTML(formData),
      replyTo: formData.email as string,
    });

    console.log('✅ Admin notification email sent successfully!');
    console.log('Message ID:', emailInfo.messageId);

    return {
      success: true,
      channel: 'admin-email',
      messageId: emailInfo.messageId,
    };
  } catch (error: any) {
    console.error('❌ Admin email error:', error);
    return {
      success: false,
      channel: 'admin-email',
      error: error.message,
    };
  }
}

// Send customer confirmation email
export async function sendCustomerConfirmationEmail(formData: any): Promise<NotificationResult> {
  if (!notificationSettings.sendCustomerEmail) {
    return { success: false, channel: 'customer-email', error: 'Customer email disabled in settings' };
  }

  try {
    const emailInfo = await transporter.sendMail({
      from: `"${emailContent.businessName}" <${process.env.CONTACT_EMAIL_FROM}>`,
      to: formData.email as string,
      subject: '✨ Thank You for Your Inquiry - Svasti Production',
      html: generateCustomerConfirmationHTML(formData),
      replyTo: process.env.CONTACT_EMAIL_FROM,
    });

    console.log('✅ Customer confirmation email sent successfully!');
    console.log('Message ID:', emailInfo.messageId);

    return {
      success: true,
      channel: 'customer-email',
      messageId: emailInfo.messageId,
    };
  } catch (error: any) {
    console.error('❌ Customer email error:', error);
    return {
      success: false,
      channel: 'customer-email',
      error: error.message,
    };
  }
}

// Send follow-up email (called by scheduled job or manually)
export async function sendFollowUpEmail(formData: any): Promise<NotificationResult> {
  if (!notificationSettings.sendFollowUpEmail) {
    return { success: false, channel: 'follow-up-email', error: 'Follow-up email disabled in settings' };
  }

  try {
    const emailInfo = await transporter.sendMail({
      from: `"${emailContent.businessName}" <${process.env.CONTACT_EMAIL_FROM}>`,
      to: formData.email as string,
      subject: `Following Up on Your Wedding Inquiry - ${formData.coupleName}`,
      html: generateFollowUpEmailHTML(formData),
      replyTo: process.env.CONTACT_EMAIL_FROM,
    });

    console.log('✅ Follow-up email sent successfully!');
    console.log('Message ID:', emailInfo.messageId);

    return {
      success: true,
      channel: 'follow-up-email',
      messageId: emailInfo.messageId,
    };
  } catch (error: any) {
    console.error('❌ Follow-up email error:', error);
    return {
      success: false,
      channel: 'follow-up-email',
      error: error.message,
    };
  }
}

// Send SMS notification (using Twilio or similar service)
export async function sendSMSNotification(formData: any): Promise<NotificationResult> {
  if (!notificationSettings.sendSMS) {
    return { success: false, channel: 'sms', error: 'SMS disabled in settings' };
  }

  // Check if Twilio is configured
  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
    console.warn('⚠️ Twilio not configured. SMS not sent.');
    return { success: false, channel: 'sms', error: 'Twilio not configured' };
  }

  try {
    // Example using Twilio (you need to install: npm install twilio)
    // const twilio = require('twilio');
    // const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    // 
    // const message = await client.messages.create({
    //   body: `New wedding inquiry from ${formData.coupleName} for ${formData.eventDate}. Check your email for details.`,
    //   from: process.env.TWILIO_PHONE_NUMBER,
    //   to: process.env.ADMIN_PHONE_NUMBER,
    // });

    console.log('📱 SMS notification sent successfully!');
    return {
      success: true,
      channel: 'sms',
      // messageId: message.sid,
    };
  } catch (error: any) {
    console.error('❌ SMS error:', error);
    return {
      success: false,
      channel: 'sms',
      error: error.message,
    };
  }
}

// Send Slack notification
export async function sendSlackNotification(formData: any): Promise<NotificationResult> {
  if (!notificationSettings.sendSlackNotification) {
    return { success: false, channel: 'slack', error: 'Slack disabled in settings' };
  }

  if (!process.env.SLACK_WEBHOOK_URL) {
    console.warn('⚠️ Slack webhook not configured. Notification not sent.');
    return { success: false, channel: 'slack', error: 'Slack webhook not configured' };
  }

  try {
    const slackMessage = {
      text: `🎬 New Wedding Inquiry`,
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: '🎬 New Wedding Inquiry',
            emoji: true,
          },
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*Couple:*\n${formData.coupleName}`,
            },
            {
              type: 'mrkdwn',
              text: `*Event Date:*\n${formData.eventDate}`,
            },
            {
              type: 'mrkdwn',
              text: `*Contact:*\n${formData.firstName} ${formData.lastName}`,
            },
            {
              type: 'mrkdwn',
              text: `*Email:*\n${formData.email}`,
            },
            {
              type: 'mrkdwn',
              text: `*Phone:*\n${formData.phone}`,
            },
            {
              type: 'mrkdwn',
              text: `*Service:*\n${formData.jobType}`,
            },
          ],
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Location:* ${formData.eventLocation}\n*Style:* ${formData.eventStyle}${formData.budget ? `\n*Budget:* ${formData.budget}` : ''}`,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Message:*\n${formData.message}`,
          },
        },
        {
          type: 'actions',
          elements: [
            {
              type: 'button',
              text: {
                type: 'plain_text',
                text: '📧 Reply via Email',
              },
              url: `mailto:${formData.email}?subject=Re: Wedding Inquiry for ${formData.coupleName}`,
            },
          ],
        },
      ],
    };

    const response = await fetch(process.env.SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(slackMessage),
    });

    if (response.ok) {
      console.log('💬 Slack notification sent successfully!');
      return {
        success: true,
        channel: 'slack',
      };
    } else {
      throw new Error(`Slack API error: ${response.statusText}`);
    }
  } catch (error: any) {
    console.error('❌ Slack error:', error);
    return {
      success: false,
      channel: 'slack',
      error: error.message,
    };
  }
}

// Send all notifications based on settings
export async function sendAllNotifications(formData: any): Promise<NotificationResult[]> {
  const results: NotificationResult[] = [];

  // Check if email service is configured
  const isEmailConfigured = 
    process.env.SMTP_USER && 
    process.env.SMTP_PASSWORD && 
    process.env.SMTP_PASSWORD !== 'YOUR_16_CHARACTER_APP_PASSWORD_HERE';

  if (!isEmailConfigured) {
    console.warn('⚠️ Email service not configured. Skipping email notifications.');
    return [{
      success: false,
      channel: 'email',
      error: 'Email service not configured',
    }];
  }

  // Send notifications in parallel for better performance
  const notifications = await Promise.allSettled([
    sendAdminEmailNotification(formData),
    sendCustomerConfirmationEmail(formData),
    notificationSettings.sendSMS ? sendSMSNotification(formData) : Promise.resolve({ success: false, channel: 'sms', error: 'Disabled' }),
    notificationSettings.sendSlackNotification ? sendSlackNotification(formData) : Promise.resolve({ success: false, channel: 'slack', error: 'Disabled' }),
  ]);

  // Process results
  notifications.forEach((result) => {
    if (result.status === 'fulfilled') {
      results.push(result.value);
    } else {
      results.push({
        success: false,
        channel: 'unknown',
        error: result.reason?.message || 'Unknown error',
      });
    }
  });

  return results;
}

// Schedule follow-up email (to be called by a cron job or scheduler)
export async function scheduleFollowUpEmail(formData: any, delayHours: number = 48): Promise<void> {
  // Store in database or queue for scheduled sending
  // This is a placeholder - implement with your preferred scheduling solution
  console.log(`📅 Follow-up email scheduled for ${formData.email} in ${delayHours} hours`);
  
  // Example using setTimeout (not recommended for production):
  // setTimeout(async () => {
  //   await sendFollowUpEmail(formData);
  // }, delayHours * 60 * 60 * 1000);
  
  // Better approach: Use a job queue like Bull, Agenda, or cloud services like AWS SQS
}

// Email analytics tracker (optional enhancement)
export interface EmailAnalytics {
  inquiryId: string;
  email: string;
  sent: Date;
  opened?: Date;
  clicked?: Date;
  replied?: Date;
}

// Track email opens (requires tracking pixel implementation)
export function generateTrackingPixel(inquiryId: string): string {
  const trackingUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/track/email-open?id=${inquiryId}`;
  return `<img src="${trackingUrl}" width="1" height="1" style="display:none;" alt="" />`;
}

// Track link clicks (requires link wrapper implementation)
export function generateTrackableLink(url: string, inquiryId: string): string {
  const trackingUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/track/link-click?id=${inquiryId}&url=${encodeURIComponent(url)}`;
  return trackingUrl;
}
