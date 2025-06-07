"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendContactEmail(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const subject = formData.get("subject") as string
  const message = formData.get("message") as string

  if (!name || !email || !subject || !message) {
    return {
      success: false,
      message: "Please fill in all fields.",
    }
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["tochukwu.onuoha@example.com"], // Replace with your actual email
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0f172a; border-bottom: 2px solid #14b8a6; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #14b8a6; margin: 20px 0;">
            <h3 style="color: #0f172a; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6; color: #374151;">${message.replace(/\n/g, "<br>")}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
            <p>This email was sent from your portfolio contact form.</p>
            <p>Reply directly to this email to respond to ${name}.</p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error("Email sending error:", error)
      return {
        success: false,
        message: "Failed to send message. Please try again.",
      }
    }

    return {
      success: true,
      message: "Message sent successfully! I'll get back to you soon.",
    }
  } catch (error) {
    console.error("Email sending error:", error)
    return {
      success: false,
      message: "Failed to send message. Please try again.",
    }
  }
}
