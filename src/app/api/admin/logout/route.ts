import { NextResponse } from 'next/server';
import { clearSessionCookie } from '@/lib/auth';

export async function POST() {
  try {
    // Create response
    const response = NextResponse.json(
      { message: 'Logout successful' },
      { status: 200 }
    );

    // Clear session cookie
    await clearSessionCookie();

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
