"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          {/* Large 404 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-9xl md:text-[12rem] font-bold text-custom-yellow/20 leading-none">
              404
            </h1>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Page Not Found
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed">
              Sorry, we couldn&apos;t find the page you&apos;re looking for. 
              The page might have been moved, deleted, or the URL might be incorrect.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              asChild
              size="lg"
              className="bg-custom-yellow hover:bg-custom-yellow-hover"
            >
              <Link href="/">
                <Home className="mr-2 h-5 w-5" />
                Go Home
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              onClick={() => window.history.back()}
            >
              <button>
                <ArrowLeft className="mr-2 h-5 w-5" />
                Go Back
              </button>
            </Button>
          </motion.div>

          {/* Help Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 pt-8 border-t border-slate-200"
          >
            <p className="text-slate-500 mb-4">
              Need help finding what you&apos;re looking for?
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/services" className="text-custom-yellow hover:text-custom-yellow-hover hover:underline">
                Our Services
              </Link>
              <Link href="/about" className="text-custom-yellow hover:text-custom-yellow-hover hover:underline">
                About Us
              </Link>
              <Link href="/projects" className="text-custom-yellow hover:text-custom-yellow-hover hover:underline">
                Projects
              </Link>
              <Link href="/contact" className="text-custom-yellow hover:text-custom-yellow-hover hover:underline">
                Contact
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}



