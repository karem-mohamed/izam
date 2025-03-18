import { NextResponse } from "next/server";

export function middleware() {
  return NextResponse.next();
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/((?!api|_next|nav|.*\\..*).*)"],
};
