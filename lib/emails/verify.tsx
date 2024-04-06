import { Resend } from "resend";
import VerifyEmail from "../../emails/verify";

export async function EmailVerificationCode({
  code,
  email,
}: {
  code: number;
  email: string;
}) {
  const resend = new Resend(process.env.EMAIL_KEY);

  const res = await resend.emails.send({
    from: "no-reply@mail.arinji.com",
    to: email,
    subject: "Verify your email for Taskation",
    react: (
      <VerifyEmail
        code={code}
        url={`${process.env.WEB_DOMAIN}/verify?code=${code}`}
      />
    ),
  });

  if (res.error) {
    throw new Error("Error sending email");
  }
}
