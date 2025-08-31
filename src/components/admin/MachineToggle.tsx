"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Wrench, CheckCircle, XCircle } from "lucide-react";

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
}

export default function MachineToggle({ machine, onToggle }: MachineToggleProps) {
  const [isToggling, setIsToggling] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {machine.title}
                </h3>
                <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                  {machine.description}
                </p>
                
                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-3">
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
              </div>

              {/* Toggle Switch */}
              <div className="flex-shrink-0 ml-4">
                <button
                  onClick={handleToggle}
                  disabled={isToggling}
                  className={`relative inline-flex h-12 w-24 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-custom-yellow focus:ring-offset-2 ${
                    machine.forSale
                      ? 'bg-green-500 hover:bg-green-600'
                      : 'bg-slate-300 hover:bg-slate-400'
                  } ${isToggling ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <span
                    className={`inline-block h-8 w-8 transform rounded-full bg-white transition-transform duration-200 ${
                      machine.forSale ? 'translate-x-12' : 'translate-x-1'
                    }`}
                  />
                  
                  {/* Icons */}
                  <div className="absolute inset-0 flex items-center justify-between px-2">
                    <XCircle className={`h-4 w-4 transition-colors duration-200 ${
                      machine.forSale ? 'text-white opacity-0' : 'text-slate-600'
                    }`} />
                    <CheckCircle className={`h-4 w-4 transition-colors duration-200 ${
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
