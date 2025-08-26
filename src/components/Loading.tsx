import { motion } from "framer-motion";

export function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} border-2 border-custom-yellow border-t-transparent rounded-full`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );
}

export function LoadingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <motion.p
          className="mt-4 text-slate-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Loading...
        </motion.p>
      </div>
    </div>
  );
}

export function LoadingCard() {
  return (
    <div className="animate-pulse">
      <div className="bg-slate-200 rounded-lg h-48 mb-4"></div>
      <div className="space-y-2">
        <div className="bg-slate-200 rounded h-4 w-3/4"></div>
        <div className="bg-slate-200 rounded h-4 w-1/2"></div>
      </div>
    </div>
  );
}
