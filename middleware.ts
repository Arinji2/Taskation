import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { verifyJwtToken } from "./lib/jwtFunctions";
import { JwtProps } from "./lib/types";
import { JwtResponse } from "./lib/schema";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/dash")) {
    const token = request.cookies.get("token")?.value;

    if (token) {
      try {
        const hasVerifiedTokenRaw = token && (await verifyJwtToken(token));
        const hasVerifiedToken = JwtResponse.safeParse(hasVerifiedTokenRaw);
        if (!hasVerifiedToken.success) {
          request.cookies.delete("token");
          return NextResponse.redirect(
            new URL("/login", request.nextUrl.origin)
          );
        }

        if (hasVerifiedToken.data.verified === 0) {
          return NextResponse.redirect(
            new URL("/verify", request.nextUrl.origin)
          );
        } else return NextResponse.next();
      } catch (e) {
        return NextResponse.redirect(new URL("/login", request.nextUrl.origin));
      }
    } else {
      const nextPath = encodeURIComponent(request.nextUrl.pathname);
      return NextResponse.redirect(
        new URL(`/login?next=${nextPath}`, request.nextUrl.origin)
      );
    }
  } else NextResponse.next();
}
