import { NextResponse, type NextRequest } from "next/server";

const PROTECTED_PREFIXES = ["/dashboard", "/admin", "/discovery", "/learn"];
const SESSION_MARKER_COOKIE = "valiyo_signed_in";

/**
 * Edge/network-level redirect for protected routes (Next.js 16 "proxy" convention, formerly middleware).
 *
 * IMPORTANT: Firebase Auth here uses the client SDK only (popup sign-in,
 * session kept in IndexedDB) — there's no Admin SDK/service account in
 * this project to mint a verifiable session cookie, so this middleware
 * cannot cryptographically confirm who's signed in, and it has no way to
 * check `role == "admin"` for /admin/* at the edge either. It checks a
 * non-httpOnly marker cookie (set/cleared in AuthProvider right after
 * Firebase Auth resolves) purely to avoid flashing protected shells to
 * signed-out visitors on direct navigation or refresh.
 *
 * This is NOT the security boundary. The real enforcement is:
 *   1. `RouteGuard` / `AdminRouteGuard` (components/auth/), which redirect
 *      client-side as soon as Firebase Auth (and, for admin routes, the
 *      user's `role`) resolves.
 *   2. Firestore Security Rules (firestore.rules), which reject every
 *      read/write that isn't scoped to the authenticated uid — and, for
 *      `users/{uid}`, restrict admins to only ever touching `products`.
 *
 * To upgrade this into a real edge-verified guard: add the Firebase Admin
 * SDK, exchange the ID token for an httpOnly session cookie (with custom
 * claims for role) in an API route on login, and verify it here with
 * `admin.auth().verifySessionCookie()` instead of reading a plain cookie.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  if (!isProtected) return NextResponse.next();

  const marker = request.cookies.get(SESSION_MARKER_COOKIE);
  if (!marker) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/";
    redirectUrl.searchParams.set("auth", "required");
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/discovery/:path*", "/learn/:path*"],
};
