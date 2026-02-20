import { NextResponse } from "next/server";

import { auth } from "@/auth";

const PROTECTED_ROUTES = ["/drop-a-log", "/leaderboard", "/me"];

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  const isProtected = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.url));
  }
});

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};
