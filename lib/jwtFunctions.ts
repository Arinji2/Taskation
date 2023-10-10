import { decodeJwt, jwtVerify, SignJWT } from "jose";
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
