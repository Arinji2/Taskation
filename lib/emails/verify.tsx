import { render } from "@react-email/render";

import VerifyEmail from "../../emails/verify";

export async function EmailVerificationCode({
  code,
  email,
}: {
  code: number;
  email: string;
}) {
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

  const stringOptions = JSON.stringify(options);

  const res = await fetch("https://email.arinji.com/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      options: stringOptions,
    }),
  });

  if (res.status !== 200) {
    throw new Error("Error sending email");
  }
}
