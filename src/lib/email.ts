import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "info@szzypack.com";

export async function sendInquiryNotification(data: {
  fullName: string;
  companyName?: string;
  email: string;
  phone?: string;
  industry?: string;
  bagTypes?: string[];
  quantity?: string;
  message?: string;
  source?: string;
}): Promise<void> {
  try {
    await resend.emails.send({
      from: `SZZYPack <noreply@szzypack.com>`,
      to: ADMIN_EMAIL,
      subject: `New Inquiry from ${data.companyName || data.fullName} — ${data.industry || "General"}`,
      text: `
New inquiry received:

Name: ${data.fullName}
Company: ${data.companyName || "N/A"}
Email: ${data.email}
Phone: ${data.phone || "N/A"}
Industry: ${data.industry || "N/A"}
Bag Types: ${data.bagTypes?.join(", ") || "N/A"}
Quantity: ${data.quantity || "N/A"}
Message: ${data.message || "N/A"}
Source: ${data.source || "Website"}
      `.trim(),
    });

    await resend.emails.send({
      from: `SZZYPack <noreply@szzypack.com>`,
      to: data.email,
      subject: `Thank you for your inquiry, ${data.fullName} | SZZYPack`,
      text: `
Hi ${data.fullName},

Thank you for reaching out to SZZYPack. We've received your inquiry and our team will get back to you within 12 hours.

In the meantime, feel free to reach us on WhatsApp: ${process.env.NEXT_PUBLIC_SITE_URL || "https://www.szzypack.com"}/whatsapp

Why choose SZZYPack?
- Factory-direct pricing with no middlemen
- ISO/BRC certified manufacturing
- MOQ as low as 500 units
- Free samples within 3 days

Best regards,
SZZYPack Team
      `.trim(),
    });
  } catch (err) {
    console.error("Failed to send email:", err);
  }
}

export async function sendWelcomeEmail(email: string): Promise<void> {
  try {
    await resend.emails.send({
      from: `SZZYPack <noreply@szzypack.com>`,
      to: email,
      subject: "Welcome to SZZYPack Newsletter",
      text: `
Welcome to the SZZYPack newsletter!

You'll receive 1-2 emails per month with:
- New product announcements
- Industry insights and packaging trends
- Case studies and success stories

If you ever want to unsubscribe, just click the link at the bottom of any email.

Best regards,
SZZYPack Team
      `.trim(),
    });
  } catch (err) {
    console.error("Failed to send welcome email:", err);
  }
}

export { resend };
