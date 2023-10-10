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

export async function validateJWT(jwt: string | undefined): Promise<boolean> {
  if (!jwt) {
    return false;
  }
  try {
    await jwtVerify(jwt, secret);
    const decoded = decodeJwt(jwt);
    return !decoded.expired;
  } catch (error) {
    return false;
  }
}
