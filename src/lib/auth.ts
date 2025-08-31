import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// Admin credentials from environment variables
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'your_secure_password_here';

// Session configuration
const SESSION_COOKIE_NAME = 'admin_session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export interface AdminSession {
  username: string;
  loggedInAt: number;
  expiresAt: number;
}

/**
 * Validates admin credentials
 */
export function validateCredentials(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

/**
 * Creates a new admin session
 */
export function createSession(username: string): AdminSession {
  const now = Date.now();
  return {
    username,
    loggedInAt: now,
    expiresAt: now + SESSION_DURATION,
  };
}

/**
 * Validates if a session is still active
 */
export function isSessionValid(session: AdminSession): boolean {
  return Date.now() < session.expiresAt;
}

/**
 * Gets the admin session from cookies
 */
export async function getSession(): Promise<AdminSession | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
    
    if (!sessionCookie?.value) {
      return null;
    }

    const session: AdminSession = JSON.parse(sessionCookie.value);
    
    if (!isSessionValid(session)) {
      return null;
    }

    return session;
  } catch (error) {
    console.error('Error parsing session cookie:', error);
    return null;
  }
}

/**
 * Sets the admin session cookie
 */
export async function setSessionCookie(session: AdminSession): Promise<void> {
  try {
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, JSON.stringify(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: SESSION_DURATION / 1000, // Convert to seconds
      path: '/',
    });
  } catch (error) {
    console.error('Error setting session cookie:', error);
  }
}

/**
 * Clears the admin session cookie
 */
export async function clearSessionCookie(): Promise<void> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE_NAME);
  } catch (error) {
    console.error('Error clearing session cookie:', error);
  }
}

/**
 * Middleware helper to check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return session !== null && isSessionValid(session);
}

/**
 * Middleware helper to redirect unauthenticated users
 */
export function redirectToLogin(): NextResponse {
  return NextResponse.redirect(new URL('/admin/login', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'));
}
