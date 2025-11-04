import nodemailer from "nodemailer";

export type mailDetailsType = {
  from: string;
  to: string;
  subject: string;
  html?: string;
  text?: string;
};

const SendMail = async (mailDetails: mailDetailsType): Promise<boolean> => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      port: 465,
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail(mailDetails);
    console.log("Email sent successfully:", info.response);
    return true;
  } catch (error) {
    console.log("Email send failed:", error);
    return false;
  }
};

export default SendMail;
