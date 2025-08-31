'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Plus, X, Loader2 } from 'lucide-react';
import ImageUpload from './ImageUpload';

import type { Machine } from '@/lib/dynamic-content';

interface MachineFormProps {
  machine?: Machine;
  onSave: (machine: Machine) => void;
  onCancel: () => void;
}

export default function MachineForm({ machine, onSave, onCancel }: MachineFormProps) {
  const [formData, setFormData] = useState({
    title: machine?.title || '',
    description: machine?.description || '',
    features: machine?.features || [''],
    side: machine?.side || 'left' as 'left' | 'right',
    forSale: machine?.forSale || false,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | undefined>(machine?.image);
  const [removeImage, setRemoveImage] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleInputChange = (field: keyof typeof formData, value: string | boolean | ('left' | 'right')) => {
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
      
      if (machine) {
        formDataToSend.append('id', machine.id);
      }
      
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('features', JSON.stringify(formData.features.filter(f => f.trim())));
      formDataToSend.append('side', formData.side);
      formDataToSend.append('forSale', formData.forSale.toString());
      
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      } else if (removeImage) {
        formDataToSend.append('removeImage', 'true');
      }

      const url = machine 
        ? '/api/admin/dynamic/machines'
        : '/api/admin/dynamic/machines';
      
      const method = machine ? 'PUT' : 'POST';
      
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
      console.error('Error saving machine:', error);
      alert('Failed to save machine. Please try again.');
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
            placeholder="Enter machine title"
            required
            className="bg-slate-800 border-slate-600 text-white"
          />
        </div>

        {/* Side */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-slate-300">
            Layout Side
          </Label>
          <Select value={formData.side} onValueChange={(value: 'left' | 'right') => handleInputChange('side', value)}>
            <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="left">Left</SelectItem>
              <SelectItem value="right">Right</SelectItem>
            </SelectContent>
          </Select>
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
          placeholder="Enter machine description"
          rows={4}
          required
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

      {/* For Sale Toggle */}
      <div className="flex items-center space-x-2">
        <Switch
          id="forSale"
          checked={formData.forSale}
          onCheckedChange={(checked) => handleInputChange('forSale', checked)}
        />
        <Label htmlFor="forSale" className="text-sm font-medium text-slate-300">
          Mark as For Sale
        </Label>
      </div>

      {/* Image Upload */}
      <ImageUpload
        currentImageUrl={imagePreviewUrl}
        onImageChange={handleImageChange}
        folder="machines"
        itemId={machine?.id || 'new'}
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
            <>Save Machine</>
          )}
        </Button>
      </div>
    </form>
  );
}
