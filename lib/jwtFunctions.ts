import { decodeJwt, jwtVerify, SignJWT } from "jose";
import { query } from "./query";
import { JwtProps } from "./types";
import { JwtResponse } from "./schema";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const secret: Uint8Array = new TextEncoder().encode(process.env.JWT_SECRET);
export async function signJWT(id: number, verified: 0 | 1) {
  const token: string = await new SignJWT({
    id: id,
    verified: verified,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("336h")
    .sign(secret);

  return token;
}

export function getJwtSecretKey() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT Secret key is not matched");
  }
  return new TextEncoder().encode(secret);
}

export async function verifyJwtToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    return payload;
  } catch (error) {
    return null;
  }
}

export async function getJwtData(jwt: string) {
  try {
    const payload: any = await verifyJwtToken(jwt);

    const payloadData = {
      id: payload.id,
      verified: payload.verified,
    } as JwtProps;

    const parsedPayload = JwtResponse.safeParse(payloadData);
    if (parsedPayload.success === false) {
      cookies().delete("token");
      redirect("/login");
    } else
      return {
        id: parsedPayload.data.id,
        verified: parsedPayload.data.verified,
      } as JwtProps;
  } catch (error) {
    throw new Error("Unauthorized");
  }
}
