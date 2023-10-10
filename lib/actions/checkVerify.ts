"use server";

import { signJWT } from "@/lib/jwtFunctions";
import { query } from "@/lib/query";
import { CodeResponse } from "@/lib/schema";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserId } from "../getUserID";

export async function VerifyAction(prevState: any, formData: FormData) {
  const email = prevState.email;
  const inputs = {
    code: formData.get("code"),
    email: email,
  };

  console.log(inputs);
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
      const jwtToken = cookies().get("token");
      if (!jwtToken) redirect("/login");
      const user = await getUserId(jwtToken.value);

      await query("DELETE FROM verification WHERE email = ?", [email]);
      await query("UPDATE users SET verified = ? WHERE id = ?", [1, user.id]);

      const token = await signJWT(user.id, 1);

      cookies().set("token", token);
    }

    return {
      type: "success",
      email: prevState.email,
      message: "Successfully Verified",
    };
  }
}
