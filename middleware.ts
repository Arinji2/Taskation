import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getVerification } from "./lib/getUserID";

export async function middleware(request: NextRequest) {
  const url = process.env.WEB_DOMAIN;

  if (request.nextUrl.pathname.startsWith("/dash")) {
    const token = request.cookies.get("token")?.value;

    if (token) {
      try {
        const isVerified = await getVerification(token!);

        if (isVerified === 0) {
          return NextResponse.redirect(`${url}/verify`);
        } else return NextResponse.next();
      } catch (e) {
        return NextResponse.redirect(`${url}/login`);
      }
    } else {
      const nextPath = encodeURIComponent(request.nextUrl.pathname);
      return NextResponse.redirect(`${url}/login?next=${nextPath}`);
    }
  } else NextResponse.next();
}
