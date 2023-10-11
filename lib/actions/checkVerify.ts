"use server";

import { signJWT } from "@/lib/jwtFunctions";
import { query } from "@/lib/query";
import { CodeResponse, User } from "@/lib/schema";
import { cookies } from "next/headers";
import { getUserData } from "../userFunctions";

export async function VerifyAction(prevState: any, formData: FormData) {
  const email = prevState.email;
  const inputs = {
    code: formData.get("code"),
    email: email,
  };

  const res = CodeResponse.safeParse(inputs);

  if (!res.success) {
    return {
      type: "error",
      email: prevState.email,
      message: res.error.issues[0].message,
    };
  } else {
    const data = await query(
      "SELECT * FROM verification WHERE email = ? AND id = ?",
      [res.data.email, res.data.code]
    );
    if (data.length === 0) {
      return {
        type: "error",
        email: prevState.email,
        message: "Code Not Found",
      };
    } else {
      await query("DELETE FROM verification WHERE email = ?", [res.data.email]);
      await query("UPDATE users SET verified = ? WHERE email = ?", [
        1,
        res.data.email,
      ]);

      const user = await getUserData();
      const parsedUser = User.safeParse(user);
      if (parsedUser.success === false) throw new Error("Unauthorized");

      const token = await signJWT(parsedUser.data.id, 1);

      cookies().set("token", token);
    }

    return {
      type: "success",
      email: prevState.email,
      message: "Successfully Verified",
    };
  }
}
