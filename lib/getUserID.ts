import { User } from "@/lib/types";
import { query } from "./query";
import { jwtVerify } from "jose";

export async function verifyJwt(jwt: string): Promise<any> {
  const secretKey: Uint8Array = new TextEncoder().encode(
    process.env.JWT_SECRET as string
  );
  const { payload } = await jwtVerify(jwt, secretKey, {
    algorithms: ["HS256"],
  });

  return payload;
}

export async function getUserId(jwt: string) {
  try {
    const payload: any = await verifyJwt(jwt);

    const queryUserResult = await query(`SELECT * FROM users WHERE id=?`, [
      payload.id,
    ]);
    const data: Array<any> = Array.isArray(queryUserResult)
      ? queryUserResult
      : [];

    return data[0] as User;
  } catch (error) {
    throw new Error("Unauthorized");
  }
}

export async function getVerification(jwt: string) {
  try {
    const payload: any = await verifyJwt(jwt);
    return payload.verified;
  } catch (error) {
    throw new Error("Unauthorized");
  }
}
