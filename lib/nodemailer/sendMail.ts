import nodemailer from "nodemailer";

export type mailDetailsType = {
  from: string;
  to: string;
  subject: string;
  html?: string;
  text?: string;
};

const SendMail = (mailDetails: mailDetailsType) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASS,
    },
  });

  transporter
    .sendMail(mailDetails)
    .then((res) => console.log("email send successfully ", res))
    .catch((e) => console.log("email send failed", e));
};

export default SendMail;
