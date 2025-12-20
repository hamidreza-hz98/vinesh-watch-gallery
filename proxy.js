import { NextResponse } from "next/server";
import { verifyToken } from "@/server/lib/token";

/* ---------------------------------------------
 * Helpers
 * ------------------------------------------- */

function isDashboardPath(pathname) {
  return pathname === "/dashboard" || pathname.startsWith("/dashboard/");
}

function isProfilePath(pathname) {
  return pathname === "/profile" || pathname.startsWith("/profile/");
}

function redirect(url, request) {
  return NextResponse.redirect(new URL(url, request.url));
}

/* ---------------------------------------------
 * Admin Auth Check
 * ------------------------------------------- */

function checkAdminAuth(request) {
  const adminToken = request.cookies.get("admin_token")?.value;
  const adminId = request.cookies.get("_id")?.value;

  if (!adminToken || !adminId) {
    return false;
  }

  const decoded = verifyToken(adminToken);
  if (!decoded || decoded.type !== "admin" || decoded.id !== adminId) {
    return false;
  }

  return true;
}

/* ---------------------------------------------
 * Customer Auth Check
 * ------------------------------------------- */

function checkCustomerAuth(request) {
  const token = request.cookies.get("token")?.value;
  const customerId = request.cookies.get("customer")?.value;

  if (!token || !customerId) {
    return false;
  }

  const decoded = verifyToken(token);
  if (!decoded || decoded.type !== "customer" || decoded.id !== customerId) {
    return false;
  }

  return true;
}

/* ---------------------------------------------
 * proxy
 * ------------------------------------------- */

export function proxy(request) {
  const { pathname } = request.nextUrl;

  // Admin protected routes
  if (isDashboardPath(pathname)) {
    const isAdminLoggedIn = checkAdminAuth(request);

    if (!isAdminLoggedIn) {
      return redirect("/authentication/login", request);
    }
  }

  // Customer protected routes
  if (isProfilePath(pathname)) {
    const isCustomerLoggedIn = checkCustomerAuth(request);

    if (!isCustomerLoggedIn) {
      const loginUrl = new URL("/", request.url);
      loginUrl.searchParams.set("auth", "required");

      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

/* ---------------------------------------------
 * Matcher
 * ------------------------------------------- */

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};
