const nodemailer = require('nodemailer');

const LOGO_URL = 'https://lh3.googleusercontent.com/d/1CQx6gSGS7MiM6t_PEAFknHZpuGY9qfyc';

module.exports = async (req, res) => {
    // Only accept POST requests
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { name, email, brand, message } = req.body || {};

    if (!name || !email) {
        return res.status(400).json({ error: 'Name and Work Email are required fields.' });
    }

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
        },
        connectionTimeout: 10000,
    });

    try {
        // 1. ADMIN ALERT EMAIL
        const adminMailOptions = {
            from: `"KAUSTHUBA Studio" <${process.env.GMAIL_USER}>`,
            to: process.env.GMAIL_USER,
            replyTo: email,
            subject: `New Inquiry: ${name} ${brand ? `[${brand}]` : ''}`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <body style="margin:0; padding:0; background-color:#050505; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color:#E5E5E5;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#050505; padding:40px 10px;">
                        <tr>
                            <td align="center">
                                <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="max-width:600px; background-color:#0D0D0D; border:1px solid #1F1F1F; border-radius:12px; overflow:hidden;">
                                    <tr>
                                        <td style="background-color:#111111; padding:18px 24px; border-bottom:2px solid #9B111E;">
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                    <td width="38" valign="middle">
                                                        <img src="${LOGO_URL}" alt="KAUSTHUBA Logo" width="36" height="36" style="display:block; border:0; border-radius:50%; width:36px; height:36px; object-fit:cover;" />
                                                    </td>
                                                    <td style="padding-left:12px;" valign="middle">
                                                        <div style="font-size:14px; font-weight:800; letter-spacing:2px; color:#FFFFFF; text-transform:uppercase; line-height:1.2;">
                                                            KAUSTHUBA
                                                        </div>
                                                        <div style="font-family:monospace; font-size:9px; color:#9B111E; letter-spacing:1.5px; text-transform:uppercase; margin-top:2px;">
                                                            AI CREATIVE STUDIO
                                                        </div>
                                                    </td>
                                                    <td align="right" valign="middle" style="font-family:monospace; font-size:10px; color:#888888; letter-spacing:1px; text-transform:uppercase;">
                                                        [ NEW INQUIRY ]
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding:32px 28px;">
                                            <h2 style="font-size:18px; font-weight:700; color:#FFFFFF; margin:0 0 20px 0;">
                                                New Project Inquiry Submitted
                                            </h2>
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#141414; border:1px solid #222222; border-radius:8px; margin-bottom:20px;">
                                                <tr>
                                                    <td style="padding:14px 18px; border-bottom:1px solid #1F1F1F;">
                                                        <span style="font-family:monospace; font-size:9px; text-transform:uppercase; color:#777777; display:block; margin-bottom:2px;">Client Name</span>
                                                        <span style="font-size:14px; font-weight:600; color:#FFFFFF;">${name}</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="padding:14px 18px; border-bottom:1px solid #1F1F1F;">
                                                        <span style="font-family:monospace; font-size:9px; text-transform:uppercase; color:#777777; display:block; margin-bottom:2px;">Work Email</span>
                                                        <span style="font-size:14px; font-weight:600; color:#9B111E;"><a href="mailto:${email}" style="color:#9B111E; text-decoration:none;">${email}</a></span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="padding:14px 18px; border-bottom:1px solid #1F1F1F;">
                                                        <span style="font-family:monospace; font-size:9px; text-transform:uppercase; color:#777777; display:block; margin-bottom:2px;">Brand / Company</span>
                                                        <span style="font-size:14px; font-weight:600; color:#FFFFFF;">${brand || 'Not Specified'}</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="padding:14px 18px;">
                                                        <span style="font-family:monospace; font-size:9px; text-transform:uppercase; color:#777777; display:block; margin-bottom:4px;">Project Scope & Brief</span>
                                                        <p style="font-size:13px; line-height:1.6; color:#D4D4D4; margin:0; white-space:pre-wrap;">${message || 'No additional scope details provided.'}</p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="background-color:#0A0A0A; padding:16px 28px; border-top:1px solid #1A1A1A; text-align:center;">
                                            <p style="font-family:monospace; font-size:10px; color:#666666; margin:0;">
                                                KAUSTHUBA TRANSMISSION SERVER • INTERNAL RECORD
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
                </html>
            `
        };

        // 2. CLIENT CONFIRMATION EMAIL
        const clientMailOptions = {
            from: `"KAUSTHUBA Studio" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: `We have received your inquiry – KAUSTHUBA Studio`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <body style="margin:0; padding:0; background-color:#050505; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color:#E5E5E5;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#050505; padding:40px 10px;">
                        <tr>
                            <td align="center">
                                <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="max-width:600px; background-color:#0D0D0D; border:1px solid #1F1F1F; border-radius:12px; overflow:hidden;">
                                    <tr>
                                        <td style="background-color:#111111; padding:18px 24px; border-bottom:2px solid #9B111E;">
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                    <td width="38" valign="middle">
                                                        <img src="${LOGO_URL}" alt="KAUSTHUBA Logo" width="36" height="36" style="display:block; border:0; border-radius:50%; width:36px; height:36px; object-fit:cover;" />
                                                    </td>
                                                    <td style="padding-left:12px;" valign="middle">
                                                        <div style="font-size:14px; font-weight:800; letter-spacing:2px; color:#FFFFFF; text-transform:uppercase; line-height:1.2;">
                                                            KAUSTHUBA
                                                        </div>
                                                        <div style="font-family:monospace; font-size:9px; color:#9B111E; letter-spacing:1.5px; text-transform:uppercase; margin-top:2px;">
                                                            AI CREATIVE STUDIO
                                                        </div>
                                                    </td>
                                                    <td align="right" valign="middle" style="font-family:monospace; font-size:10px; color:#888888; letter-spacing:1px; text-transform:uppercase;">
                                                        [ TRANSMISSION CONFIRMED ]
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding:32px 28px;">
                                            <h1 style="font-size:20px; font-weight:700; color:#FFFFFF; margin:0 0 16px 0;">
                                                Thank you for reaching out to us, ${name}!
                                            </h1>
                                            <p style="font-size:14px; line-height:1.7; color:#BBBBBB; margin-bottom:24px;">
                                                We have received your message. Our team is currently reviewing your project details, and we will get back to you within 24 hours.
                                            </p>
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#141414; border:1px solid #222222; border-radius:8px; margin-bottom:24px;">
                                                <tr>
                                                    <td style="padding:16px 18px;">
                                                        <div style="font-family:monospace; font-size:9px; text-transform:uppercase; color:#9B111E; font-weight:bold; margin-bottom:10px; letter-spacing:1px;">
                                                            YOUR INQUIRY DETAILS
                                                        </div>
                                                        <p style="font-size:13px; color:#A0A0A0; margin:0 0 6px 0;">
                                                            <strong style="color:#FFFFFF;">Brand / Entity:</strong> ${brand || 'N/A'}
                                                        </p>
                                                        <p style="font-size:13px; color:#A0A0A0; margin:0;">
                                                            <strong style="color:#FFFFFF;">Message Excerpt:</strong> ${message ? message.substring(0, 100) + (message.length > 100 ? '...' : '') : 'N/A'}
                                                        </p>
                                                    </td>
                                                </tr>
                                            </table>
                                            <p style="font-size:13px; line-height:1.6; color:#888888; margin:0 0 24px 0;">
                                                If you have any additional thoughts or references to share in the meantime, feel free to reply directly to this email.
                                            </p>
                                            <div style="padding-top:20px; border-top:1px solid #1F1F1F; text-align:center;">
                                                <span style="font-family:monospace; font-size:9px; color:#777777; text-transform:uppercase; letter-spacing:1.5px; display:block; margin-bottom:12px;">
                                                    CONNECT WITH OUR STUDIO
                                                </span>
                                                <table align="center" border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <td style="padding:0 8px;">
                                                            <a href="https://www.instagram.com/kausthuba.studio/" target="_blank" style="font-family:monospace; font-size:10px; color:#9B111E; text-decoration:none; font-weight:bold; letter-spacing:1px;">
                                                                INSTAGRAM ↗
                                                            </a>
                                                        </td>
                                                        <td style="color:#333333; font-size:10px;">•</td>
                                                        <td style="padding:0 8px;">
                                                            <a href="https://www.youtube.com/@kausthuba.studio" target="_blank" style="font-family:monospace; font-size:10px; color:#9B111E; text-decoration:none; font-weight:bold; letter-spacing:1px;">
                                                                YOUTUBE ↗
                                                            </a>
                                                        </td>
                                                        <td style="color:#333333; font-size:10px;">•</td>
                                                        <td style="padding:0 8px;">
                                                            <a href="https://www.linkedin.com/company/kausthuba-studio/" target="_blank" style="font-family:monospace; font-size:10px; color:#9B111E; text-decoration:none; font-weight:bold; letter-spacing:1px;">
                                                                LINKEDIN ↗
                                                            </a>
                                                        </td>
                                                        <td style="color:#333333; font-size:10px;">•</td>
                                                        <td style="padding:0 8px;">
                                                            <a href="https://www.facebook.com/people/Kausthuba-AI-Creative-Studio/61595798758241/" target="_blank" style="font-family:monospace; font-size:10px; color:#9B111E; text-decoration:none; font-weight:bold; letter-spacing:1px;">
                                                                FACEBOOK ↗
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="background-color:#080808; padding:20px 28px; border-top:1px solid #1A1A1A; text-align:center;">
                                            <p style="font-size:11px; font-weight:700; color:#FFFFFF; letter-spacing:2px; text-transform:uppercase; margin:0 0 4px 0;">
                                                KAUSTHUBA CREATIVE STUDIO
                                            </p>
                                            <p style="font-family:monospace; font-size:9px; color:#666666; margin:0;">
                                                TURNING IDEAS INTO DIGITAL EXPERIENCES
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
                </html>
            `
        };

        await Promise.all([
            transporter.sendMail(adminMailOptions),
            transporter.sendMail(clientMailOptions)
        ]);

        return res.status(200).json({ success: true, message: 'Inquiry transmitted successfully.' });

    } catch (error) {
        console.error('Vercel Serverless Nodemailer Error:', error);
        return res.status(500).json({ error: 'Failed to transmit inquiry email.' });
    }
};
