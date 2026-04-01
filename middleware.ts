import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = ["/login", "/cadastro", "/esqueci-senha", "/api/auth", "/api/auth/", "/api/auth/signin", "/api/auth/callback"];

// Rate limiting por IP (simples) para rota auth
const RATE_LIMIT = 5; // requests
const TIME_WINDOW_MS = 60 * 1000; // 1 minuto
const rateLimits = new Map<string, { count: number; start: number }>();

function getClientIp(req: NextRequest) {
  return (
    req.ip ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

function applySecurityHeaders(response: NextResponse) {
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "same-origin");
  response.headers.set("Permissions-Policy", "geolocation=(), microphone=(), camera=()");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none';"
  );
  return response;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const response = NextResponse.next();
  applySecurityHeaders(response);

  // API rate limit específico para autenticação
  if (pathname.startsWith("/api/auth")) {
    const ip = getClientIp(req);
    const now = Date.now();

    const existing = rateLimits.get(ip);
    if (!existing || now - existing.start > TIME_WINDOW_MS) {
      rateLimits.set(ip, { count: 1, start: now });
    } else {
      existing.count += 1;
      if (existing.count > RATE_LIMIT) {
        return NextResponse.json(
          { message: "Too many auth requests. Tente novamente em 1 minuto." },
          { status: 429, headers: { "Retry-After": "60" } }
        );
      }
      rateLimits.set(ip, existing);
    }
  }

  if (pathname.startsWith("/_next") || pathname.startsWith("/static") || pathname.startsWith("/favicon.ico")) {
    return response;
  }

  if (PUBLIC_PATHS.includes(pathname)) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return response;
  }

  if (pathname.startsWith("/(app)") || pathname !== "/") {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return response;
}

export const config = {
  matcher: ["/(app)(.*)", "/login", "/cadastro", "/esqueci-senha", "/api/auth(.*)"],
};
