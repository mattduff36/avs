import { NextResponse } from 'next/server';
import { checkStorageHealth, getStorageType } from '@/lib/storage';

export async function GET() {
  try {
    const healthCheck = await checkStorageHealth();
    const storageType = getStorageType();
    
    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      storage: {
        type: storageType,
        health: healthCheck
      },
      environment: {
        nodeEnv: process.env.NODE_ENV,
        vercel: !!process.env.VERCEL,
        hasRedisUrl: !!process.env.KV_REST_API_URL,
        hasRedisToken: !!process.env.KV_REST_API_TOKEN
      }
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
