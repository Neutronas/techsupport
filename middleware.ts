import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const session = await supabase.auth.getSession();

  // If user is not logged in, rewrite him to /admin page to login form
  if (!session.data.session && req.nextUrl.pathname.startsWith("/admin/")) {
    return NextResponse.rewrite(new URL("/admin", req.url));
  }

  // If user is logged in, rewrite him to /admin/dashboard while skipping login form
  if (
    session.data.session &&
    (req.nextUrl.pathname.match("/admin/") ||
      req.nextUrl.pathname.match("/admin"))
  ) {
    return NextResponse.rewrite(new URL("/admin/dashboard", req.url));
  }
  return res;
}

export const config = {
  matcher: "/admin/:path*",
};
