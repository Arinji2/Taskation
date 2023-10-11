"use server";

import { EmailVerificationCode } from "@/lib/emails/verify";
import { query } from "@/lib/query";
import { VerifyResponse } from "@/lib/schema";

export async function sendVerifyEmail(email: string, id: number) {
  const code = Math.floor(100000 + Math.random() * 900000);
  const prevRecords = await query(`SELECT * FROM verification WHERE email=?`, [
    email,
  ]);

  if (prevRecords.length > 0) {
    const validatedRecords = VerifyResponse.safeParse(prevRecords[0]);

    if (validatedRecords.success === false) {
      throw new Error("Unauthorized");
    } else {
      const createdAt = validatedRecords.data.created;
      const now = new Date();

      const diff = now.getTime() - createdAt.getTime();
      const diffMinutes = Math.floor(diff / 60000);
      if (diffMinutes > 30) {
        await query(`DELETE FROM verification WHERE email=?`, [email]);
        await query(
          `INSERT INTO verification (id, email, userID, created) VALUES (?, ?, ?, ?)`,
          [code, email, id, new Date()]
        );
        EmailVerificationCode({
          email: email,
          code: code,
        });

        return {
          type: "success",
          message: "Verification code sent.",
        };
      } else {
        return {
          type: "error",
          message: "Verification code already sent. Please check your email.",
        };
      }
    }
  } else {
    await query(
      `INSERT INTO verification (id, email, userID, created) VALUES (?, ?, ?, ?)`,
      [code, email, id, new Date()]
    );
    EmailVerificationCode({
      email: email,
      code: code,
    });

    return {
      type: "success",
      message: "Verification code sent.",
    };
  }
}
