'use client';

import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface ImageUploadProps {
  currentImageUrl?: string;
  onImageChange: (file: File | null, previewUrl?: string) => void;
  folder: 'machines' | 'services' | 'projects';
  itemId: string;
  className?: string;
  disabled?: boolean;
}

export default function ImageUpload({
  currentImageUrl,
  onImageChange,
  className = '',
  disabled = false
}: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(currentImageUrl);
  const [isUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    // Create preview URL
    const newPreviewUrl = URL.createObjectURL(file);
    setPreviewUrl(newPreviewUrl);
    
    // Call parent handler
    onImageChange(file, newPreviewUrl);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (disabled) return;
    
    handleFiles(e.dataTransfer.files);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (disabled) return;
    handleFiles(e.target.files);
  };

  const handleButtonClick = () => {
    if (disabled) return;
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    if (disabled) return;
    setPreviewUrl(undefined);
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-slate-300">
          Image
        </label>
        {previewUrl && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleRemove}
            disabled={disabled}
            className="text-red-400 border-red-400 hover:bg-red-400 hover:text-white"
          >
            <X className="h-4 w-4 mr-1" />
            Remove
          </Button>
        )}
      </div>

      {/* Preview */}
      {previewUrl && (
        <div className="relative rounded-lg overflow-hidden bg-slate-800 border border-slate-600">
          <Image
            src={previewUrl}
            alt="Preview"
            width={400}
            height={200}
            className="w-full h-48 object-cover"
            style={{ height: 'auto', maxHeight: '200px' }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleButtonClick}
              disabled={disabled}
              className="opacity-0 hover:opacity-100 transition-opacity duration-200 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
            >
              <Upload className="h-4 w-4 mr-1" />
              Replace
            </Button>
          </div>
        </div>
      )}

      {/* Upload Area */}
      {!previewUrl && (
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
            dragActive
              ? 'border-custom-yellow bg-custom-yellow/10'
              : disabled
              ? 'border-slate-600 bg-slate-800/50 cursor-not-allowed'
              : 'border-slate-600 bg-slate-800/30 hover:border-slate-500 hover:bg-slate-800/50 cursor-pointer'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleButtonClick}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={disabled}
          />
          
          <div className="space-y-4">
            {isUploading ? (
              <Loader2 className="h-12 w-12 mx-auto text-custom-yellow animate-spin" />
            ) : (
              <ImageIcon className="h-12 w-12 mx-auto text-slate-400" />
            )}
            
            <div className="space-y-2">
              <p className="text-slate-300 font-medium">
                {isUploading ? 'Uploading...' : 'Drop an image here, or click to select'}
              </p>
              <p className="text-sm text-slate-400">
                Supports: JPG, PNG, WebP, GIF (max 10MB)
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
