'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, X, Loader2 } from 'lucide-react';
import ImageUpload from './ImageUpload';
import type { Project } from '@/lib/dynamic-content';

interface ProjectFormProps {
  project?: Project;
  onSave: (project: Project) => void;
  onCancel: () => void;
}

export default function ProjectForm({ project, onSave, onCancel }: ProjectFormProps) {
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    client: project?.client || '',
    completedDate: project?.completedDate || new Date().toISOString().split('T')[0],
    category: project?.category || 'General',
    tags: project?.tags || [''],
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | undefined>(project?.image);
  const [removeImage, setRemoveImage] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleInputChange = (field: keyof typeof formData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTagChange = (index: number, value: string) => {
    const newTags = [...formData.tags];
    newTags[index] = value;
    setFormData(prev => ({ ...prev, tags: newTags }));
  };

  const addTag = () => {
    setFormData(prev => ({ ...prev, tags: [...prev.tags, ''] }));
  };

  const removeTag = (index: number) => {
    if (formData.tags.length > 1) {
      const newTags = formData.tags.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, tags: newTags }));
    }
  };

  const handleImageChange = (file: File | null, previewUrl?: string) => {
    setImageFile(file);
    if (file) {
      setImagePreviewUrl(previewUrl);
      setRemoveImage(false);
    } else {
      setImagePreviewUrl(undefined);
      setRemoveImage(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const formDataToSend = new FormData();
      
      if (project) {
        formDataToSend.append('id', project.id);
      }
      
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('client', formData.client);
      formDataToSend.append('completedDate', formData.completedDate);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('tags', JSON.stringify(formData.tags.filter(t => t.trim())));
      
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      } else if (removeImage) {
        formDataToSend.append('removeImage', 'true');
      }

      const url = '/api/admin/dynamic/projects';
      const method = project ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        body: formDataToSend,
      });

      const result = await response.json();

      if (result.success) {
        onSave(result.data);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Failed to save project. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-medium text-slate-300">
            Project Title *
          </Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="Enter project title"
            required
            className="bg-slate-800 border-slate-600 text-white"
          />
        </div>

        {/* Client */}
        <div className="space-y-2">
          <Label htmlFor="client" className="text-sm font-medium text-slate-300">
            Client *
          </Label>
          <Input
            id="client"
            value={formData.client}
            onChange={(e) => handleInputChange('client', e.target.value)}
            placeholder="Enter client name"
            required
            className="bg-slate-800 border-slate-600 text-white"
          />
        </div>

        {/* Completed Date */}
        <div className="space-y-2">
          <Label htmlFor="completedDate" className="text-sm font-medium text-slate-300">
            Completed Date
          </Label>
          <Input
            id="completedDate"
            type="date"
            value={formData.completedDate}
            onChange={(e) => handleInputChange('completedDate', e.target.value)}
            className="bg-slate-800 border-slate-600 text-white"
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label htmlFor="category" className="text-sm font-medium text-slate-300">
            Category
          </Label>
          <Input
            id="category"
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            placeholder="Enter project category"
            className="bg-slate-800 border-slate-600 text-white"
          />
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium text-slate-300">
          Description *
        </Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Enter project description"
          rows={4}
          required
          className="bg-slate-800 border-slate-600 text-white"
        />
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-slate-300">
          Tags
        </Label>
        <div className="space-y-2">
          {formData.tags.map((tag, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={tag}
                onChange={(e) => handleTagChange(index, e.target.value)}
                placeholder="Enter tag"
                className="bg-slate-800 border-slate-600 text-white"
              />
              {formData.tags.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeTag(index)}
                  className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addTag}
            className="border-custom-yellow text-custom-yellow hover:bg-custom-yellow hover:text-slate-900"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Tag
          </Button>
        </div>
      </div>

      {/* Image Upload */}
      <ImageUpload
        currentImageUrl={imagePreviewUrl}
        onImageChange={handleImageChange}
        folder="projects"
        itemId={project?.id || 'new'}
        disabled={saving}
      />

      {/* Form Actions */}
      <div className="flex justify-end space-x-4 pt-6 border-t border-slate-600">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={saving}
          className="border-slate-600 text-slate-300 hover:bg-slate-700"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={saving || !formData.title || !formData.description || !formData.client}
          className="bg-custom-yellow text-slate-900 hover:bg-custom-yellow/90"
        >
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>Save Project</>
          )}
        </Button>
      </div>
    </form>
  );
}
