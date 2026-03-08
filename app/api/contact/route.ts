import { NextResponse } from 'next/server';
import { sendAllNotifications } from '@/lib/notification-service';

// Email templates are now imported from the new modular system
// These old functions are kept for backward compatibility during transition

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const formData = Object.fromEntries(data.entries());

    // Add timestamp
    const submissionData = {
      ...formData,
      submittedDate: new Date().toLocaleString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      timestamp: new Date().toISOString(),
    };

    // Log the submission
    console.log('Contact Form Submission:', submissionData);

    // Validate required fields
    const requiredFields = [
      'firstName',
      'lastName',
      'coupleName',
      'email',
      'phone',
      'hearAbout',
      'jobType',
      'eventDate',
      'eventTime',
      'eventLocation',
      'eventStyle',
      'message',
    ];

    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: 'Missing required fields', fields: missingFields },
        { status: 400 }
      );
    }

    // Send all configured notifications using the new enhanced system
    const notificationResults = await sendAllNotifications(submissionData);

    // Check if at least one notification was successful
    const anySuccess = notificationResults.some(result => result.success);
    const emailSent = notificationResults
      .filter(r => r.channel.includes('email'))
      .some(r => r.success);

    // Log notification results
    console.log('📊 Notification Results:');
    notificationResults.forEach(result => {
      const status = result.success ? '✅' : '❌';
      console.log(`${status} ${result.channel}: ${result.success ? 'Success' : result.error}`);
    });

    // Prepare response message
    const responseMessage = emailSent 
      ? 'Thank you for your inquiry! We will get back to you within 48 hours.' 
      : 'Thank you for your inquiry! Your submission has been received. We will contact you soon.';

    return NextResponse.json({ 
      success: true, 
      message: responseMessage,
      emailSent: emailSent,
      notifications: {
        total: notificationResults.length,
        successful: notificationResults.filter(r => r.success).length,
        failed: notificationResults.filter(r => !r.success).length,
      },
      ...(anySuccess ? {} : { 
        warning: 'Some notifications could not be sent, but your inquiry was recorded.' 
      })
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again or contact us directly.' },
      { status: 500 }
    );
  }
}