import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import VerifyEmail from "../../emails/verify";

export async function EmailVerificationCode({
  code,
  email,
}: {
  code: number;
  email: string;
}) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST!,
    port: Number.parseInt(process.env.EMAIL_PORT!),
    secure: true,
    auth: {
      user: process.env.EMAIL_USER!,
      pass: process.env.EMAIL_PASS!,
    },
  });

  const emailHtml = render(
    <VerifyEmail
      code={code}
      url={`${process.env.WEB_DOMAIN}/verify?code=${code}`}
    />
  );

  const options = {
    from: "no-reply@arinji.com",
    to: email,
    subject: "Verify your email for TODO-MYSQL",
    html: emailHtml,
  };
  await new Promise((resolve, reject) => {
    transporter.sendMail(...options);
  });
}
