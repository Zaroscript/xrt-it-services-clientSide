import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, businessName, website, service, message, streetAddress, city, state, zipCode } = body;

    // Dynamic import for nodemailer
    const nodemailer = require('nodemailer');

    // Create a Nodemailer transporter with Hostinger SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.hostinger.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // TLS
      auth: {
        user: process.env.EMAIL_USER || 'support@xrttech.com',
        pass: process.env.EMAIL_PASSWORD || 'XrtXrt@123',
      },
      tls: {
        rejectUnauthorized: false // Allow self-signed certificates
      }
    });

    // Verify transporter connection
    await transporter.verify();

    // Prepare email content
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #333; margin-bottom: 20px; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #007bff; margin-bottom: 10px;">Contact Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          </div>

          ${businessName ? `
          <div style="margin-bottom: 20px;">
            <h3 style="color: #007bff; margin-bottom: 10px;">Business Information</h3>
            <p><strong>Business Name:</strong> ${businessName}</p>
            ${website ? `<p><strong>Website:</strong> <a href="${website}" style="color: #007bff;">${website}</a></p>` : ''}
            ${service ? `<p><strong>Service of Interest:</strong> ${service}</p>` : ''}
            ${streetAddress ? `
            <p><strong>Address:</strong><br>
            ${streetAddress}<br>
            ${city}, ${state} ${zipCode}
            </p>` : ''}
          </div>
          ` : ''}

          <div style="margin-bottom: 20px;">
            <h3 style="color: #007bff; margin-bottom: 10px;">Message</h3>
            <p style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${message || 'No message provided'}</p>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
            <p>This email was sent from the XRT Tech contact form.</p>
            <p>Submitted on: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>
    `;

    // Email options
    const mailOptions = {
      from: `"XRT Tech Contact Form" <${process.env.EMAIL_USER || 'support@xrttech.com'}>`,
      to: process.env.SUPPORT_EMAIL || 'support@xrttech.com',
      subject: `New Contact Form Submission from ${name}`,
      html: emailContent,
      replyTo: email // Allow direct reply to the submitter
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ 
      message: 'Email sent successfully',
      success: true 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send email',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
