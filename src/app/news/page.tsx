"use client";

import { motion } from "framer-motion";
import { Facebook } from "lucide-react";
import { useEffect } from "react";

export default function NewsPage() {
  // iOS viewport height fix
  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', setViewportHeight);
    
    return () => {
      window.removeEventListener('resize', setViewportHeight);
      window.removeEventListener('orientationchange', setViewportHeight);
    };
  }, []);

  return (
    <div className="ios-fix-alt flex flex-col">
      {/* Coming Soon Section */}
      <section className="pt-20 pb-10 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900">
                Dynamic News Feed <span className="text-custom-yellow">Coming Soon</span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed mb-8">
                We&apos;re working on bringing you the latest updates and news from A&V Squires Plant Co Limited. 
                Soon you&apos;ll be able to see our latest projects, company updates, and industry insights all in one place.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Follow Us on Facebook Section */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">
                Follow Us on <span className="text-blue-600">Facebook</span>
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Stay connected with us on Facebook for the latest updates, project photos, and company news.
              </p>
              
              <div className="bg-custom-yellow/10 border border-custom-yellow/20 rounded-2xl p-8 md:p-12">
                <div className="flex items-center justify-center mb-6">
                  <Facebook className="h-12 w-12 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900">
                  A&V Squires Plant Co Limited
                </h3>
                <p className="text-slate-600 mb-6">
                  Dynamic Facebook Integration Coming Soon
                </p>
                <a
                  href="https://www.facebook.com/p/A-V-Squires-Plant-Co-Limited-100063551614762/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                  Visit Our Facebook Page
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}



