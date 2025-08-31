import { Redis } from '@upstash/redis';
import { promises as fs } from 'fs';
import path from 'path';

/**
 * Storage utility that uses Upstash Redis in production and local files in development
 */

// Check if we're in a production environment with Redis credentials
const isProductionEnvironment = process.env.VERCEL || process.env.KV_REST_API_URL;

// Initialize Redis client for production
let redis: Redis | null = null;
if (isProductionEnvironment) {
  try {
    redis = new Redis({
      url: process.env.KV_REST_API_URL!,
      token: process.env.KV_REST_API_TOKEN!,
    });
  } catch (error) {
    console.warn('Failed to initialize Redis client:', error);
  }
}

/**
 * Gets data from storage (Redis in production, file system in development)
 */
export async function getFromStorage<T>(key: string, defaultValue: T): Promise<T> {
  if (isProductionEnvironment && redis) {
    try {
      const data = await redis.get<T>(key);
      return data || defaultValue;
    } catch (error) {
      console.warn(`Redis get failed for key ${key}, using default:`, error);
      return defaultValue;
    }
  } else {
    // Local development - use file system
    try {
      const filePath = path.join(process.cwd(), 'src', 'data', `${key}.json`);
      const fileContent = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(fileContent) as T;
    } catch (error) {
      console.warn(`File read failed for ${key}, using default:`, error);
      return defaultValue;
    }
  }
}

/**
 * Sets data in storage (Redis in production, file system in development)
 */
export async function setInStorage<T>(key: string, data: T): Promise<void> {
  if (isProductionEnvironment && redis) {
    try {
      await redis.set(key, data);
    } catch (error) {
      console.error(`Redis set failed for key ${key}:`, error);
      throw new Error(`Failed to save ${key} to storage`);
    }
  } else {
    // Local development - use file system
    try {
      const filePath = path.join(process.cwd(), 'src', 'data', `${key}.json`);
      const tempFile = filePath + '.tmp';
      await fs.writeFile(tempFile, JSON.stringify(data, null, 2), 'utf-8');
      await fs.rename(tempFile, filePath);
    } catch (error) {
      console.error(`File write failed for ${key}:`, error);
      throw new Error(`Failed to save ${key} to storage`);
    }
  }
}

/**
 * Gets the storage type being used
 */
export function getStorageType(): 'redis' | 'filesystem' {
  return (isProductionEnvironment && redis) ? 'redis' : 'filesystem';
}

/**
 * Health check for Redis connection
 */
export async function checkStorageHealth(): Promise<{ status: 'ok' | 'error'; type: string; message?: string }> {
  const storageType = getStorageType();
  
  if (storageType === 'redis' && redis) {
    try {
      await redis.ping();
      return { status: 'ok', type: 'redis' };
    } catch (error) {
      return { 
        status: 'error', 
        type: 'redis', 
        message: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  } else {
    return { status: 'ok', type: 'filesystem' };
  }
}