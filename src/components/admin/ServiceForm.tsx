'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Plus, X, Loader2 } from 'lucide-react';
import ImageUpload from './ImageUpload';
import type { Service } from '@/lib/dynamic-content';

interface ServiceFormProps {
  service?: Service;
  onSave: (service: Service) => void;
  onCancel: () => void;
}

const iconOptions = [
  'Wrench', 'Construction', 'Pickaxe', 'Tractor', 'Truck', 'Mountain', 'Broom', 'Grip'
];

export default function ServiceForm({ service, onSave, onCancel }: ServiceFormProps) {
  const [formData, setFormData] = useState({
    title: service?.title || '',
    description: service?.description || '',
    fullDescription: service?.fullDescription || '',
    features: service?.features || [''],
    icon: service?.icon || 'Wrench',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | undefined>(service?.image);
  const [removeImage, setRemoveImage] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleInputChange = (field: keyof typeof formData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setFormData(prev => ({ ...prev, features: [...prev.features, ''] }));
  };

  const removeFeature = (index: number) => {
    if (formData.features.length > 1) {
      const newFeatures = formData.features.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, features: newFeatures }));
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
      
      if (service) {
        formDataToSend.append('id', service.id);
      }
      
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('fullDescription', formData.fullDescription);
      formDataToSend.append('features', JSON.stringify(formData.features.filter(f => f.trim())));
      formDataToSend.append('icon', formData.icon);
      
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      } else if (removeImage) {
        formDataToSend.append('removeImage', 'true');
      }

      const url = '/api/admin/dynamic/services';
      const method = service ? 'PUT' : 'POST';
      
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
      console.error('Error saving service:', error);
      alert('Failed to save service. Please try again.');
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
            Title *
          </Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="Enter service title"
            required
            className="bg-slate-800 border-slate-600 text-white"
          />
        </div>

        {/* Icon */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-slate-300">
            Icon
          </Label>
          <Select value={formData.icon} onValueChange={(value) => handleInputChange('icon', value)}>
            <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {iconOptions.map(icon => (
                <SelectItem key={icon} value={icon}>{icon}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium text-slate-300">
          Short Description *
        </Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Enter brief service description"
          rows={3}
          required
          className="bg-slate-800 border-slate-600 text-white"
        />
      </div>

      {/* Full Description */}
      <div className="space-y-2">
        <Label htmlFor="fullDescription" className="text-sm font-medium text-slate-300">
          Full Description
        </Label>
        <Textarea
          id="fullDescription"
          value={formData.fullDescription}
          onChange={(e) => handleInputChange('fullDescription', e.target.value)}
          placeholder="Enter detailed service description"
          rows={5}
          className="bg-slate-800 border-slate-600 text-white"
        />
      </div>

      {/* Features */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-slate-300">
          Features
        </Label>
        <div className="space-y-2">
          {formData.features.map((feature, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                placeholder="Enter feature"
                className="bg-slate-800 border-slate-600 text-white"
              />
              {formData.features.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeFeature(index)}
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
            onClick={addFeature}
            className="border-custom-yellow text-custom-yellow hover:bg-custom-yellow hover:text-slate-900"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Feature
          </Button>
        </div>
      </div>

      {/* Image Upload */}
      <ImageUpload
        currentImageUrl={imagePreviewUrl}
        onImageChange={handleImageChange}
        folder="services"
        itemId={service?.id || 'new'}
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
          disabled={saving || !formData.title || !formData.description}
          className="bg-custom-yellow text-slate-900 hover:bg-custom-yellow/90"
        >
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>Save Service</>
          )}
        </Button>
      </div>
    </form>
  );
}
