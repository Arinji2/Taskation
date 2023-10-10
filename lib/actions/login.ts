"use server";

import { signJWT } from "@/lib/jwtFunctions";
import { query } from "@/lib/query";
import { LoginInput } from "@/lib/schema";
import { Login, User } from "@/lib/types";
import bycrypt from "bcrypt";
import { cookies } from "next/headers";

export async function LoginAction(prevState: any, formData: FormData) {
  const inputs = {
    name: formData.get("name"),

    password: formData.get("password"),
  } as Login;

  const res = LoginInput.safeParse(inputs);

  if (!res.success) {
    return {
      type: "error",
      message: res.error.issues[0].message,
    };
  } else {
    let data: User[] = [];

    if (res.data.name.includes("@")) {
      data = await query("SELECT * FROM users WHERE email = ?", [
        res.data.name,
      ]);
    } else {
      data = await query("SELECT * FROM users WHERE name = ?", [res.data.name]);
    }

    if (data.length === 0) {
      return {
        type: "error",
        message: "Account not Found",
      };
    }

    const encryptedPassword = bycrypt.hashSync(res.data.password, 10);
    const verified = await bycrypt.compare(
      res.data.password,
      encryptedPassword
    );

    if (!verified) {
      return {
        type: "error",
        message: "Account not Found",
      };
    } else {
      const token = await signJWT(data[0].id, data[0].verified);
      cookies().set("token", token);
      return {
        type: "success",
        message: "Successfully Logged In",
      };
    }
  }
}
