"use client";

import { motion } from "framer-motion";

interface ForSaleBadgeProps {
  className?: string;
}

export default function ForSaleBadge({ className = "" }: ForSaleBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className={`absolute top-4 right-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 z-10 ${className}`}
    >
      {/* Badge Background */}
      <div className="relative">
        {/* Main badge */}
        <div className="bg-custom-yellow text-slate-900 px-3 py-1.5 rounded-lg shadow-lg border-2 border-white transform rotate-3">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-slate-900 rounded-full"></div>
            <span className="text-xs font-bold tracking-wide">FOR SALE</span>
            <div className="w-2 h-2 bg-slate-900 rounded-full"></div>
          </div>
        </div>
        
        {/* Decorative elements for depth */}
        <div className="absolute -top-1 -left-1 w-2 h-2 bg-custom-yellow/60 rounded-full transform rotate-12"></div>
        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-custom-yellow/60 rounded-full transform -rotate-12"></div>
        
        {/* Drop shadow effect */}
        <div className="absolute inset-0 bg-slate-900/20 rounded-lg blur-sm -z-10 transform translate-y-1"></div>
      </div>
    </motion.div>
  );
}
