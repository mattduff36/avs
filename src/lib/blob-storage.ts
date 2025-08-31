import { put, del, list } from '@vercel/blob';

export interface ImageMetadata {
  filename: string;
  size: number;
  mimeType: string;
  uploadedAt: string;
}

export interface UploadResult {
  url: string;
  pathname: string;
  size: number;
  filename: string;
}

/**
 * Upload an image to Vercel Blob storage
 */
export async function uploadImage(
  file: File,
  folder: 'machines' | 'services' | 'projects',
  itemId: string
): Promise<UploadResult> {
  try {
    // Generate a unique filename
    const timestamp = Date.now();
    const extension = file.name.split('.').pop() || 'jpg';
    const filename = `${folder}/${itemId}-${timestamp}.${extension}`;

    const blob = await put(filename, file, {
      access: 'public',
    });

    return {
      url: blob.url,
      pathname: blob.pathname,
      size: file.size,
      filename: file.name,
    };
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image');
  }
}

/**
 * Delete an image from Vercel Blob storage
 */
export async function deleteImage(url: string): Promise<void> {
  try {
    await del(url);
  } catch (error) {
    console.error('Error deleting image:', error);
    // Don't throw error for delete failures to prevent blocking other operations
    console.warn('Failed to delete image from blob storage:', url);
  }
}

/**
 * List all images in a folder
 */
export async function listImages(folder?: string) {
  try {
    const result = await list({
      prefix: folder,
    });
    return result.blobs;
  } catch (error) {
    console.error('Error listing images:', error);
    return [];
  }
}

/**
 * Replace an existing image (delete old, upload new)
 */
export async function replaceImage(
  oldUrl: string | undefined,
  newFile: File,
  folder: 'machines' | 'services' | 'projects',
  itemId: string
): Promise<UploadResult> {
  try {
    // Upload new image first
    const uploadResult = await uploadImage(newFile, folder, itemId);
    
    // Delete old image if it exists
    if (oldUrl) {
      await deleteImage(oldUrl);
    }
    
    return uploadResult;
  } catch (error) {
    console.error('Error replacing image:', error);
    throw new Error('Failed to replace image');
  }
}

/**
 * Clean up orphaned images (images not referenced by any items)
 */
export async function cleanupOrphanedImages(
  folder: 'machines' | 'services' | 'projects',
  activeUrls: string[]
): Promise<void> {
  try {
    const allImages = await listImages(folder);
    
    for (const image of allImages) {
      if (!activeUrls.includes(image.url)) {
        console.log(`Cleaning up orphaned image: ${image.url}`);
        await deleteImage(image.url);
      }
    }
  } catch (error) {
    console.error('Error cleaning up orphaned images:', error);
  }
}

/**
 * Migrate existing static images to Blob storage
 */
export async function migrateStaticImage(
  staticPath: string,
  folder: 'machines' | 'services' | 'projects',
  itemId: string
): Promise<string | null> {
  try {
    // Fetch the static image
    const response = await fetch(`${process.env.VERCEL_URL || 'http://localhost:3000'}${staticPath}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${staticPath}`);
    }
    
    const blob = await response.blob();
    const filename = staticPath.split('/').pop() || 'image.jpg';
    const file = new File([blob], filename, { type: blob.type });
    
    const result = await uploadImage(file, folder, itemId);
    return result.url;
  } catch (error) {
    console.error(`Error migrating image ${staticPath}:`, error);
    return null;
  }
}
