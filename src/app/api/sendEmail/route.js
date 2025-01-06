import nodemailer from "nodemailer";

export async function POST(req) {
  const body = await req.json();
  const { to, subject, text } = body;

  if (!to || !subject || !text) {
    return new Response(
      JSON.stringify({ message: "Missing required fields" }),
      { status: 400 }
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: '"Your Name" <your-email@example.com>',
      to,
      subject,
      text,
    });

    return new Response(
      JSON.stringify({
        message: "Email sent successfully",
        id: info.messageId,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ message: "Failed to send email", error: error.message }),
      { status: 500 }
    );
  }
}
