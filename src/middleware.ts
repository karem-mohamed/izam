import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  return NextResponse.next();
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/((?!api|_next|nav|.*\\..*).*)"],
};
