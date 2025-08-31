import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the request is for an admin route
  if (pathname.startsWith('/admin')) {
    // Allow access to login page
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }
    
    // Check for admin session cookie
    const adminSession = request.cookies.get('admin_session');
    
    if (!adminSession?.value) {
      // No session cookie, redirect to login
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    
    try {
      // Validate session
      const session = JSON.parse(adminSession.value);
      const now = Date.now();
      
      if (!session.expiresAt || now >= session.expiresAt) {
        // Session expired, redirect to login
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
      
      // Session is valid, allow access
      return NextResponse.next();
    } catch {
      // Invalid session cookie, redirect to login
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  // Non-admin routes, allow access
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
