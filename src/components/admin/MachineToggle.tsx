"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Wrench, CheckCircle, XCircle, Edit2, Save, X, Plus, Trash2 } from "lucide-react";

interface Machine {
  id: number;
  title: string;
  description: string;
  image: string;
  features: string[];
  side: 'left' | 'right';
  forSale: boolean;
}

interface MachineToggleProps {
  machine: Machine;
  onToggle: (machineId: number, forSale: boolean) => void;
  onUpdate?: (machineId: number, description: string, features: string[]) => void;
}

export default function MachineToggle({ machine, onToggle, onUpdate }: MachineToggleProps) {
  const [isToggling, setIsToggling] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isEditingFeatures, setIsEditingFeatures] = useState(false);
  const [editDescription, setEditDescription] = useState(machine.description);
  const [editFeatures, setEditFeatures] = useState([...machine.features]);
  const [isSaving, setIsSaving] = useState(false);

  const handleToggle = async () => {
    setIsToggling(true);
    
    try {
      await onToggle(machine.id, !machine.forSale);
      
      // Show success feedback
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (error) {
      console.error("Toggle failed:", error);
    } finally {
      setIsToggling(false);
    }
  };

  const handleSaveDescription = async () => {
    if (!onUpdate) return;
    
    setIsSaving(true);
    try {
      await onUpdate(machine.id, editDescription, machine.features);
      setIsEditingDescription(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (error) {
      console.error("Save description failed:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveFeatures = async () => {
    if (!onUpdate) return;
    
    setIsSaving(true);
    try {
      await onUpdate(machine.id, machine.description, editFeatures);
      setIsEditingFeatures(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (error) {
      console.error("Save features failed:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditingDescription(false);
    setIsEditingFeatures(false);
    setEditDescription(machine.description);
    setEditFeatures([...machine.features]);
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
    setEditFeatures(editFeatures.filter((_, i) => i !== index));
  };

  return (
    <motion.div
      layout
      className={`relative bg-white rounded-lg border-2 transition-all duration-200 ${
        machine.forSale 
          ? 'border-green-200 bg-green-50' 
          : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      {/* Success indicator */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-2 z-10"
        >
          <CheckCircle className="h-4 w-4" />
        </motion.div>
      )}

      <div className="p-4">
        <div className="flex items-start space-x-4">
          {/* Machine Image */}
          <div className="relative flex-shrink-0">
            <div className="w-24 h-24 rounded-lg overflow-hidden border border-slate-200">
              <Image
                src={machine.image}
                alt={machine.title}
                width={96}
                height={96}
                className="object-cover w-full h-full"
              />
            </div>
            
            {/* Sale Status Badge */}
            <div className={`absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs font-medium ${
              machine.forSale
                ? 'bg-green-500 text-white'
                : 'bg-slate-500 text-white'
            }`}>
              {machine.forSale ? 'For Sale' : 'Not For Sale'}
            </div>
          </div>

          {/* Machine Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {machine.title}
                  </h3>
                  {onUpdate && !isEditingDescription && !isEditingFeatures && (
                    <div className="flex space-x-1 ml-2">
                      <button
                        onClick={() => setIsEditingDescription(true)}
                        className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
                        title="Edit description"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
                
                {/* Description */}
                {isEditingDescription ? (
                  <div className="mb-3">
                    <textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="w-full p-2 text-sm border border-slate-300 rounded-md resize-none focus:ring-2 focus:ring-custom-yellow focus:border-transparent"
                      rows={3}
                      placeholder="Enter machine description..."
                    />
                    <div className="flex justify-end space-x-2 mt-2">
                      <button
                        onClick={handleCancelEdit}
                        disabled={isSaving}
                        className="px-3 py-1 text-sm text-slate-600 hover:text-slate-800 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <button
                        onClick={handleSaveDescription}
                        disabled={isSaving}
                        className="px-3 py-1 text-sm bg-custom-yellow hover:bg-custom-yellow-hover text-slate-900 rounded-md transition-colors disabled:opacity-50"
                      >
                        {isSaving ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-900"></div>
                        ) : (
                          <Save className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-slate-600 mb-3 line-clamp-3">
                    {machine.description}
                  </p>
                )}
                
                {/* Features */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Features</span>
                    {onUpdate && !isEditingDescription && !isEditingFeatures && (
                      <button
                        onClick={() => setIsEditingFeatures(true)}
                        className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
                        title="Edit features"
                      >
                        <Edit2 className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                  
                  {isEditingFeatures ? (
                    <div className="space-y-2">
                      {editFeatures.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) => handleUpdateFeature(index, e.target.value)}
                            className="flex-1 p-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-custom-yellow focus:border-transparent"
                            placeholder={`Feature ${index + 1}`}
                          />
                          <button
                            onClick={() => handleRemoveFeature(index)}
                            className="p-1 text-red-500 hover:text-red-700 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      <div className="flex justify-between items-center mt-3">
                        <button
                          onClick={handleAddFeature}
                          className="inline-flex items-center px-2 py-1 text-sm text-custom-yellow hover:text-custom-yellow-hover transition-colors"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add Feature
                        </button>
                        <div className="flex space-x-2">
                          <button
                            onClick={handleCancelEdit}
                            disabled={isSaving}
                            className="px-3 py-1 text-sm text-slate-600 hover:text-slate-800 transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                          <button
                            onClick={handleSaveFeatures}
                            disabled={isSaving}
                            className="px-3 py-1 text-sm bg-custom-yellow hover:bg-custom-yellow-hover text-slate-900 rounded-md transition-colors disabled:opacity-50"
                          >
                            {isSaving ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-900"></div>
                            ) : (
                              <Save className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {machine.features.slice(0, 3).map((feature, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700"
                        >
                          <Wrench className="h-3 w-3 mr-1" />
                          {feature}
                        </span>
                      ))}
                      {machine.features.length > 3 && (
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700">
                          +{machine.features.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Toggle Switch */}
              <div className="flex-shrink-0 ml-4">
                <button
                  onClick={handleToggle}
                  disabled={isToggling}
                  className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-custom-yellow focus:ring-offset-2 ${
                    machine.forSale
                      ? 'bg-green-500 hover:bg-green-600'
                      : 'bg-slate-300 hover:bg-slate-400'
                  } ${isToggling ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-200 ${
                      machine.forSale ? 'translate-x-9' : 'translate-x-1'
                    }`}
                  />
                  
                  {/* Icons */}
                  <div className="absolute inset-0 flex items-center justify-between px-1.5">
                    <XCircle className={`h-3 w-3 transition-opacity duration-200 ${
                      machine.forSale ? 'text-white opacity-0' : 'text-slate-600'
                    }`} />
                    <CheckCircle className={`h-3 w-3 transition-opacity duration-200 ${
                      machine.forSale ? 'text-white' : 'text-slate-600 opacity-0'
                    }`} />
                  </div>
                </button>
                
                {/* Loading indicator */}
                {isToggling && (
                  <div className="mt-2 text-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-custom-yellow mx-auto"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
