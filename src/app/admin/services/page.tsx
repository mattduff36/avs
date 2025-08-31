"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { motion } from "framer-motion";
import { Edit2, Save, X, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteData } from "@/data/site-data";

interface Service {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  features: string[];
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error] = useState("");

  useEffect(() => {
    // Load services from site data
    setServices(siteData.services);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-custom-yellow"></div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-white mb-2">Error Loading Services</h2>
          <p className="text-slate-300 mb-4">{error}</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout currentPage="services">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Services Management</h1>
        <p className="text-slate-300">Manage service descriptions and features</p>
      </div>

      {/* Services List */}
      <div className="space-y-6">
        {services.map((service) => (
          <ServiceToggle
            key={service.id}
            service={service}
            onUpdate={(updatedService) => {
              setServices(prev => prev.map(s => s.id === updatedService.id ? updatedService : s));
            }}
          />
        ))}
      </div>
    </AdminLayout>
  );
}

interface ServiceToggleProps {
  service: Service;
  onUpdate: (service: Service) => void;
}

function ServiceToggle({ service, onUpdate }: ServiceToggleProps) {
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isEditingFeatures, setIsEditingFeatures] = useState(false);
  const [editDescription, setEditDescription] = useState(service.fullDescription);
  const [editFeatures, setEditFeatures] = useState([...service.features]);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveDescription = async () => {
    setIsSaving(true);
    try {
      // Here you would typically make an API call to save the description
      // For now, we'll just update the local state
      const updatedService = { ...service, fullDescription: editDescription };
      onUpdate(updatedService);
      setIsEditingDescription(false);
    } catch (error) {
      console.error("Error saving description:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveFeatures = async () => {
    setIsSaving(true);
    try {
      // Here you would typically make an API call to save the features
      // For now, we'll just update the local state
      const updatedService = { ...service, features: editFeatures };
      onUpdate(updatedService);
      setIsEditingFeatures(false);
    } catch (error) {
      console.error("Error saving features:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setEditDescription(service.fullDescription);
    setEditFeatures([...service.features]);
    setIsEditingDescription(false);
    setIsEditingFeatures(false);
  };

  const handleAddFeature = () => {
    setEditFeatures([...editFeatures, ""]);
  };

  const handleUpdateFeature = (index: number, value: string) => {
    const newFeatures = [...editFeatures];
    newFeatures[index] = value;
    setEditFeatures(newFeatures);
  };

  const handleRemoveFeature = (index: number) => {
    const newFeatures = editFeatures.filter((_, i) => i !== index);
    setEditFeatures(newFeatures);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-sm rounded-lg shadow-sm border border-white/20 p-6"
    >
      {/* Service Header */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">{service.name}</h3>
        <p className="text-sm text-slate-400">{service.description}</p>
      </div>

      {/* Description Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-lg font-medium text-white">Full Description</h4>
          {!isEditingDescription && (
            <Button
              onClick={() => setIsEditingDescription(true)}
              variant="outline"
              size="sm"
              className="border-white/30 text-white hover:bg-white/10 hover:text-white bg-transparent"
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Edit
            </Button>
          )}
        </div>

        {isEditingDescription ? (
          <div className="space-y-4">
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="w-full h-32 p-3 bg-white/10 border border-white/20 rounded-md text-white placeholder-slate-400 focus:ring-2 focus:ring-custom-yellow focus:border-transparent resize-none"
              placeholder="Service full description"
            />
            <div className="flex space-x-2">
              <Button
                onClick={handleCancelEdit}
                disabled={isSaving}
                variant="outline"
                size="sm"
                className="border-white/30 text-white hover:bg-white/10 hover:text-white bg-transparent"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button
                onClick={handleSaveDescription}
                disabled={isSaving}
                size="sm"
                className="bg-custom-yellow hover:bg-custom-yellow-hover text-slate-900"
              >
                {isSaving ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-900 mr-2"></div>
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Save
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-slate-300 bg-white/5 p-4 rounded-md">{service.fullDescription}</p>
        )}
      </div>

      {/* Features Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-lg font-medium text-white">Features</h4>
          {!isEditingFeatures && (
            <Button
              onClick={() => setIsEditingFeatures(true)}
              variant="outline"
              size="sm"
              className="border-white/30 text-white hover:bg-white/10 hover:text-white bg-transparent"
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Edit
            </Button>
          )}
        </div>

        {isEditingFeatures ? (
          <div className="space-y-4">
            <div className="space-y-2">
              {editFeatures.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleUpdateFeature(index, e.target.value)}
                    className="flex-1 p-3 bg-white/10 border border-white/20 rounded-md text-white placeholder-slate-400 focus:ring-2 focus:ring-custom-yellow focus:border-transparent"
                    placeholder={`Feature ${index + 1}`}
                  />
                  <Button
                    onClick={() => handleRemoveFeature(index)}
                    variant="outline"
                    size="sm"
                    className="border-red-500/30 text-red-400 hover:bg-red-500/10 bg-transparent"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            
            <Button
              onClick={handleAddFeature}
              variant="outline"
              size="sm"
              className="border-white/30 text-white hover:bg-white/10 hover:text-white bg-transparent"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Feature
            </Button>

            <div className="flex space-x-2">
              <Button
                onClick={handleCancelEdit}
                disabled={isSaving}
                variant="outline"
                size="sm"
                className="border-white/30 text-white hover:bg-white/10 hover:text-white bg-transparent"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button
                onClick={handleSaveFeatures}
                disabled={isSaving}
                size="sm"
                className="bg-custom-yellow hover:bg-custom-yellow-hover text-slate-900"
              >
                {isSaving ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-900 mr-2"></div>
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Save
              </Button>
            </div>
          </div>
        ) : (
          <ul className="space-y-2">
            {service.features.map((feature, index) => (
              <li key={index} className="text-slate-300 bg-white/5 p-3 rounded-md flex items-start">
                <span className="w-2 h-2 bg-custom-yellow rounded-full mt-2 mr-3 flex-shrink-0"></span>
                {feature}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}