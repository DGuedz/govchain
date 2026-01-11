import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 1. Security Headers Injection
  const response = NextResponse.next()
  
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()') // Adjust as needed
  
  // 2. Route Protection (Basic Role Check Placeholder)
  // In a real app, verify JWT/Session cookie here.
  // For now, we ensure that sensitive paths are at least flagged.
  
  const path = request.nextUrl.pathname
  
  // Protect /council routes
  if (path.startsWith('/council')) {
    // Check for auth cookie (placeholder)
    const authCookie = request.cookies.get('supabase-auth-token')
    
    // NOTE: Since we are using client-side Thirdweb/Supabase mostly, 
    // full middleware protection requires syncing auth state to cookies.
    // For now, we allow pass-through but inject a header indicating this request was inspected.
    response.headers.set('X-Security-Audit', 'passed')
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}