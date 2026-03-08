// Enhanced Email Template Generator with Theme Support
import { 
  activeTheme, 
  emailContent, 
  adminEmailContent, 
  customerEmailContent,
  followUpEmailContent,
  EmailTheme 
} from './email-config';

// Base email wrapper with theme support
function generateEmailWrapper(content: string, theme: EmailTheme = activeTheme): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { 
          font-family: ${theme.fontFamily};
          line-height: 1.6; 
          color: #333;
          margin: 0;
          padding: 0;
          background-color: #f5f5f5;
        }
        .container { 
          max-width: 650px; 
          margin: 20px auto; 
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .header { 
          background: ${theme.headerGradient};
          color: white; 
          padding: 40px 30px; 
          text-align: center; 
        }
        .header h1 { 
          margin: 0 0 10px 0; 
          font-size: 28px;
          font-weight: 600;
        }
        .header p { 
          margin: 0; 
          font-size: 16px;
          opacity: 0.9;
        }
        .badge {
          display: inline-block;
          background: rgba(255,255,255,0.2);
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 14px;
          margin-top: 15px;
        }
        .content { 
          padding: 40px 30px; 
        }
        .summary, .info-box {
          background: #f8f9fa;
          border-left: 4px solid ${theme.primaryColor};
          padding: 20px;
          margin-bottom: 30px;
          border-radius: 4px;
        }
        .summary h2, .info-box h3 {
          margin: 0 0 10px 0;
          font-size: 20px;
          color: #111827;
        }
        .summary p, .info-item {
          margin: 5px 0;
          color: #4b5563;
        }
        .field { 
          margin-bottom: 25px;
          padding-bottom: 20px;
          border-bottom: 1px solid #e5e7eb;
        }
        .field:last-child {
          border-bottom: none;
        }
        .label { 
          font-weight: 600; 
          color: #111827; 
          margin-bottom: 8px;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .value { 
          color: #374151;
          font-size: 16px;
        }
        .value a {
          color: ${theme.primaryColor};
          text-decoration: none;
        }
        .value a:hover {
          text-decoration: underline;
        }
        .highlight {
          background: #fef3c7;
          padding: 2px 6px;
          border-radius: 3px;
        }
        .action-button, .button {
          display: inline-block;
          background: ${theme.primaryColor};
          color: white;
          padding: 12px 30px;
          text-decoration: none;
          border-radius: 6px;
          margin: 10px;
          font-weight: 600;
        }
        .button-secondary {
          background: ${theme.accentColor};
        }
        .message-box {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          white-space: pre-wrap;
          font-family: inherit;
        }
        .footer { 
          text-align: center; 
          padding: 30px; 
          background: #f9fafb;
          color: #6b7280; 
          font-size: 14px;
          border-top: 1px solid #e5e7eb;
        }
        .footer p {
          margin: 5px 0;
        }
        .footer a {
          color: ${theme.primaryColor};
          text-decoration: none;
        }
        .greeting {
          font-size: 18px;
          color: #111827;
          margin-bottom: 20px;
        }
        .message {
          font-size: 16px;
          color: #4b5563;
          line-height: 1.8;
          margin-bottom: 30px;
        }
        .cta-section {
          text-align: center;
          margin: 40px 0;
          padding: 30px;
          background: #f9fafb;
          border-radius: 8px;
        }
        .features {
          display: table;
          width: 100%;
          margin: 30px 0;
        }
        .feature {
          display: table-row;
        }
        .feature-icon {
          display: table-cell;
          width: 50px;
          font-size: 24px;
          vertical-align: top;
          padding: 10px 0;
        }
        .feature-content {
          display: table-cell;
          padding: 10px 0;
          color: #4b5563;
        }
        .feature-content h4 {
          margin: 0 0 5px 0;
          color: #111827;
          font-size: 16px;
        }
        .divider {
          height: 1px;
          background: #e5e7eb;
          margin: 30px 0;
        }
        .social-links {
          margin-top: 20px;
        }
        .social-links a {
          display: inline-block;
          margin: 0 10px;
          color: ${theme.primaryColor};
          text-decoration: none;
          font-size: 14px;
        }
        .offer-box {
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
          border: 2px solid #f59e0b;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
          text-align: center;
        }
        .offer-box h3 {
          margin: 0 0 10px 0;
          color: #92400e;
          font-size: 20px;
        }
        .offer-box p {
          margin: 0;
          color: #78350f;
          font-size: 16px;
        }
        @media only screen and (max-width: 600px) {
          .container { margin: 10px; }
          .content { padding: 30px 20px; }
          .header h1 { font-size: 26px; }
          .button { display: block; margin: 10px 0; }
        }
      </style>
    </head>
    <body>
      ${content}
    </body>
    </html>
  `;
}

// Generate admin notification email
export function generateAdminEmailHTML(formData: any): string {
  const content = `
    <div class="container">
      <div class="header">
        <h1>${adminEmailContent.headerTitle}</h1>
        <p>${adminEmailContent.headerSubtitle(emailContent.businessName)}</p>
        <div class="badge">${adminEmailContent.badge}</div>
      </div>
      
      <div class="content">
        <div class="summary">
          <h2>${adminEmailContent.quickOverviewTitle}</h2>
          <p><strong>Couple:</strong> ${formData.coupleName}</p>
          <p><strong>Event Date:</strong> ${formData.eventDate} at ${formData.eventTime}</p>
          <p><strong>Service:</strong> ${formData.jobType}</p>
          <p><strong>Location:</strong> ${formData.eventLocation}</p>
        </div>

        <div class="field">
          <div class="label">👤 Contact Person</div>
          <div class="value">${formData.firstName} ${formData.lastName}</div>
        </div>
        
        <div class="field">
          <div class="label">📧 Email Address</div>
          <div class="value">
            <a href="mailto:${formData.email}">${formData.email}</a>
          </div>
        </div>
        
        <div class="field">
          <div class="label">📱 Phone Number</div>
          <div class="value">
            <a href="tel:${formData.phone}">${formData.phone}</a>
          </div>
        </div>
        
        <div class="field">
          <div class="label">💑 Couple Name</div>
          <div class="value">${formData.coupleName}</div>
        </div>
        
        <div class="field">
          <div class="label">📅 Event Date & Time</div>
          <div class="value">
            <span class="highlight">${formData.eventDate}</span> at <span class="highlight">${formData.eventTime}</span>
          </div>
        </div>
        
        <div class="field">
          <div class="label">📍 Event Location</div>
          <div class="value">${formData.eventLocation}</div>
        </div>
        
        <div class="field">
          <div class="label">🎨 Event Style</div>
          <div class="value">${formData.eventStyle}</div>
        </div>
        
        <div class="field">
          <div class="label">🎥 Service Requested</div>
          <div class="value">${formData.jobType}</div>
        </div>
        
        ${formData.budget ? `
        <div class="field">
          <div class="label">💰 Budget Range</div>
          <div class="value">${formData.budget}</div>
        </div>
        ` : ''}
        
        <div class="field">
          <div class="label">🔍 How They Found Us</div>
          <div class="value">${formData.hearAbout}</div>
        </div>
        
        <div class="field">
          <div class="label">💬 Message</div>
          <div class="message-box">${formData.message}</div>
        </div>

        <center>
          <a href="mailto:${formData.email}?subject=Re: Wedding Inquiry for ${formData.coupleName}&body=Dear ${formData.firstName},%0D%0A%0D%0AThank you for your inquiry..." class="action-button">
            ${adminEmailContent.replyButtonText}
          </a>
        </center>
      </div>
      
      <div class="footer">
        <p><strong>📨 Inquiry received from website contact form</strong></p>
        <p>🕐 Submitted on: ${new Date().toLocaleString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          timeZoneName: 'short'
        })}</p>
        <p style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e5e7eb;">
          ${adminEmailContent.footerTip}
        </p>
      </div>
    </div>
  `;
  
  return generateEmailWrapper(content);
}

// Generate customer confirmation email
export function generateCustomerConfirmationHTML(formData: any): string {
  const content = `
    <div class="container">
      <div class="header">
        <h1>${customerEmailContent.headerTitle}</h1>
        <p>${customerEmailContent.headerSubtitle}</p>
      </div>
      
      <div class="content">
        <div class="greeting">
          ${customerEmailContent.greeting(formData.firstName)}
        </div>
        
        <div class="message">
          <p>${customerEmailContent.mainMessage.paragraph1(emailContent.businessName)}</p>
          <p>${customerEmailContent.mainMessage.paragraph2}</p>
        </div>

        <div class="info-box">
          <h3>${customerEmailContent.inquiryDetailsTitle}</h3>
          <div class="info-item"><strong>Couple:</strong> ${formData.coupleName}</div>
          <div class="info-item"><strong>Event Date:</strong> ${formData.eventDate}</div>
          <div class="info-item"><strong>Event Time:</strong> ${formData.eventTime}</div>
          <div class="info-item"><strong>Location:</strong> ${formData.eventLocation}</div>
          <div class="info-item"><strong>Service:</strong> ${formData.jobType}</div>
          <div class="info-item"><strong>Style:</strong> ${formData.eventStyle}</div>
        </div>

        <div class="features">
          ${customerEmailContent.features.map(feature => `
            <div class="feature">
              <div class="feature-icon">${feature.icon}</div>
              <div class="feature-content">
                <h4>${feature.title}</h4>
                <p>${feature.description}</p>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="cta-section">
          <h3>${customerEmailContent.ctaTitle}</h3>
          <p>${customerEmailContent.ctaDescription}</p>
          ${customerEmailContent.ctaButtons.map((btn, idx) => `
            <a href="${emailContent.websiteUrl}${btn.link}" class="button ${idx > 0 ? 'button-secondary' : ''}">
              ${btn.text}
            </a>
          `).join('')}
        </div>

        <div class="divider"></div>

        <div class="message">
          <p><strong>${customerEmailContent.nextStepsTitle}</strong></p>
          <ol>
            ${customerEmailContent.nextSteps.map(step => `<li>${step}</li>`).join('')}
          </ol>
        </div>

        <div class="message">
          <p>${customerEmailContent.closingMessage}</p>
          <p>${customerEmailContent.closingSignature}</p>
        </div>

        <div class="message" style="margin-top: 30px;">
          <p style="margin: 0;"><strong>${customerEmailContent.signatureTitle}</strong></p>
          <p style="margin: 5px 0 0 0;">${customerEmailContent.signatureTeam(emailContent.businessName)}</p>
        </div>
      </div>
      
      <div class="footer">
        <p><strong>📧 ${emailContent.businessName}</strong></p>
        <p>Email: <a href="mailto:${emailContent.supportEmail}">${emailContent.supportEmail}</a></p>
        ${emailContent.supportPhone ? `<p>Phone: ${emailContent.supportPhone}</p>` : ''}
        <p style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e5e7eb;">
          <a href="${emailContent.websiteUrl}">Visit Website</a> | 
          <a href="${emailContent.websiteUrl}/gallery">Gallery</a> | 
          <a href="${emailContent.websiteUrl}/contact">Contact</a>
        </p>
        ${emailContent.socialMedia ? `
          <div class="social-links">
            ${emailContent.socialMedia.instagram ? `<a href="${emailContent.socialMedia.instagram}">Instagram</a>` : ''}
            ${emailContent.socialMedia.facebook ? `<a href="${emailContent.socialMedia.facebook}">Facebook</a>` : ''}
            ${emailContent.socialMedia.youtube ? `<a href="${emailContent.socialMedia.youtube}">YouTube</a>` : ''}
            ${emailContent.socialMedia.twitter ? `<a href="${emailContent.socialMedia.twitter}">Twitter</a>` : ''}
          </div>
        ` : ''}
        <p style="margin-top: 15px; font-size: 12px; color: #6b7280;">
          This is an automated confirmation email. Please do not reply to this address.
        </p>
      </div>
    </div>
  `;
  
  return generateEmailWrapper(content);
}

// Generate follow-up email
export function generateFollowUpEmailHTML(formData: any): string {
  const content = `
    <div class="container">
      <div class="header">
        <h1>${followUpEmailContent.headerTitle}</h1>
        <p>${followUpEmailContent.headerSubtitle}</p>
      </div>
      
      <div class="content">
        <div class="greeting">
          ${followUpEmailContent.greeting(formData.firstName)}
        </div>
        
        <div class="message">
          <p>${followUpEmailContent.mainMessage}</p>
          <p>${followUpEmailContent.availabilityReminder}</p>
          <p>${followUpEmailContent.callToAction}</p>
        </div>

        <div class="info-box">
          <h3>📋 Your Previous Inquiry</h3>
          <div class="info-item"><strong>Couple:</strong> ${formData.coupleName}</div>
          <div class="info-item"><strong>Event Date:</strong> ${formData.eventDate}</div>
          <div class="info-item"><strong>Service:</strong> ${formData.jobType}</div>
          <div class="info-item"><strong>Submitted:</strong> ${formData.submittedDate}</div>
        </div>

        <div class="offer-box">
          <h3>${followUpEmailContent.offerTitle}</h3>
          <p>${followUpEmailContent.offerDescription}</p>
        </div>

        <div class="cta-section">
          <h3>Ready to Book?</h3>
          <p>Let's schedule a consultation to discuss your wedding plans!</p>
          <a href="mailto:${emailContent.supportEmail}?subject=Re: Wedding Inquiry for ${formData.coupleName}" class="button">
            📧 Reply to This Email
          </a>
          ${emailContent.supportPhone ? `
            <a href="tel:${emailContent.supportPhone}" class="button button-secondary">
              📱 Call Us Now
            </a>
          ` : ''}
        </div>

        <div class="message" style="margin-top: 30px;">
          <p style="margin: 0;"><strong>Warm regards,</strong></p>
          <p style="margin: 5px 0 0 0;">${customerEmailContent.signatureTeam(emailContent.businessName)}</p>
        </div>
      </div>
      
      <div class="footer">
        <p><strong>📧 ${emailContent.businessName}</strong></p>
        <p>Email: <a href="mailto:${emailContent.supportEmail}">${emailContent.supportEmail}</a></p>
        ${emailContent.supportPhone ? `<p>Phone: ${emailContent.supportPhone}</p>` : ''}
        <p style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e5e7eb;">
          <a href="${emailContent.websiteUrl}">Visit Website</a> | 
          <a href="${emailContent.websiteUrl}/gallery">Gallery</a> | 
          <a href="${emailContent.websiteUrl}/films">Films</a>
        </p>
      </div>
    </div>
  `;
  
  return generateEmailWrapper(content);
}
