import { NextRequest, NextResponse } from 'next/server';
import { logAdminLogout } from '@/lib/admin-activity';

export async function POST(request: NextRequest) {
  try {
    // Try to get session info from cookie to log logout
    try {
      const sessionCookie = request.cookies.get('admin_session');
      if (sessionCookie) {
        const session = JSON.parse(sessionCookie.value);
        if (session.id) {
          await logAdminLogout(session.id);
        }
      }
    } catch (error) {
      // Continue with logout even if logging fails
      console.warn('Failed to log logout:', error);
    }
    
    // Create response
    const response = NextResponse.json(
      { message: 'Logout successful' },
      { status: 200 }
    );

    // Clear session cookie directly on the response
    response.cookies.delete('admin_session');

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Prevent other HTTP methods
export async function GET() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  );
}
