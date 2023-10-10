"use server";

import { signJWT } from "@/lib/jwtFunctions";
import { query } from "@/lib/query";
import { RegisterInput } from "@/lib/schema";
import { Register } from "@/lib/types";
import bycrypt from "bcrypt";
import { cookies } from "next/headers";

export async function RegisterAction(prevState: any, formData: FormData) {
  const inputs = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirm"),
  } as Register;

  const res = RegisterInput.safeParse(inputs);

  if (!res.success) {
    return {
      type: "error",
      message: res.error.issues[0].message,
    };
  } else {
    const data = await query("SELECT * FROM users WHERE email = ?", [
      res.data.email,
    ]);
    if (data.length !== 0) {
      return {
        type: "error",
        message: "Email already exists",
      };
    }

    const encryptedPassword = bycrypt.hashSync(res.data.password, 10);

    const id = Math.floor(10000 + Math.random() * 90000);
    await query(
      "INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)",
      [id, res.data.name, res.data.email, encryptedPassword]
    );

    const token = await signJWT(id, 0);
    cookies().set("token", token);

    return {
      type: "success",
      message: "Successfully Registered",
    };
  }
}
