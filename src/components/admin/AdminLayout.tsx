"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogOut, Home, FileText, Briefcase, FolderOpen, Wrench, Menu } from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
  currentPage?: string;
}

export default function AdminLayout({ children, currentPage = "dashboard" }: AdminLayoutProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMobileMenuOpen && !target.closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    try {
      const response = await fetch("/api/admin/logout", {
        method: "POST",
      });

      if (response.ok) {
        // Redirect to home page
        router.push("/");
      } else {
        console.error("Logout failed");
        setIsLoggingOut(false);
      }
    } catch (error) {
      console.error("Logout error:", error);
      setIsLoggingOut(false);
    }
  };

  const navigationItems = [
    { name: "Dashboard", href: "/admin", icon: Home, current: currentPage === "dashboard" },
    { name: "Machines Page", href: "/admin/machines", icon: Wrench, current: currentPage === "machines" },
    { name: "About Page", href: "/admin/about", icon: FileText, current: currentPage === "about" },
    { name: "Services Page", href: "/admin/services", icon: Briefcase, current: currentPage === "services" },
    { name: "Projects Page", href: "/admin/projects", icon: FolderOpen, current: currentPage === "projects" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative flex flex-col">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-10 w-72 h-72 bg-custom-yellow/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-slate-200/20 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/10 backdrop-blur-sm shadow-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Admin Title */}
            <div className="flex items-center space-x-3">
              <Image
                src="/images/logo-yellow-digger.png"
                alt="A&V Squires Logo"
                width={40}
                height={40}
                className="rounded-md"
                style={{ height: 'auto' }}
              />
              <h1 className="text-lg font-semibold text-white">Admin Panel</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                      item.current
                        ? "border-custom-yellow text-white"
                        : "border-transparent text-slate-300 hover:text-white hover:border-slate-300"
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </a>
                );
              })}
            </nav>

            {/* Desktop Logout Button */}
            <div className="hidden lg:flex items-center space-x-4">
              <Button
                onClick={handleLogout}
                disabled={isLoggingOut}
                variant="outline"
                className="bg-red-500 text-white border-red-500 hover:bg-red-600 hover:border-red-600"
              >
                {isLoggingOut ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Logging out...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </div>
                )}
              </Button>
            </div>

            {/* Mobile Menu */}
            <div className="lg:hidden relative mobile-menu-container">
              <Button
                variant="outline"
                size="icon"
                className="border-white/30 text-white hover:bg-white/10 hover:text-white bg-transparent"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              
              {/* Dropdown Menu */}
              <AnimatePresence>
                {isMobileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 w-56 bg-slate-800/95 backdrop-blur-sm rounded-lg shadow-lg border border-white/20 py-2 z-50"
                  >
                    <nav className="space-y-1">
                      {navigationItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`flex items-center w-full px-4 py-3 text-left transition-colors font-medium ${
                              item.current
                                ? "text-custom-yellow bg-custom-yellow/10 border-r-2 border-custom-yellow"
                                : "text-slate-300 hover:text-white hover:bg-white/10"
                            }`}
                          >
                            <Icon className="h-4 w-4 mr-3" />
                            {item.name}
                          </Link>
                        );
                      })}
                      
                      {/* Separator */}
                      <div className="border-t border-white/20 my-2"></div>
                      
                      {/* Mobile Logout Button */}
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          handleLogout();
                        }}
                        disabled={isLoggingOut}
                        className="flex items-center w-full px-4 py-3 text-left text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors font-medium"
                      >
                        {isLoggingOut ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-400 mr-3"></div>
                            <span>Logging out...</span>
                          </>
                        ) : (
                          <>
                            <LogOut className="h-4 w-4 mr-3" />
                            <span>Logout</span>
                          </>
                        )}
                      </button>
                    </nav>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto py-4 px-4 sm:py-6 sm:px-6 lg:px-8 flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-white/10 backdrop-blur-sm border-t border-white/20 mt-auto">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-slate-300">
            <p>Website developed by MPDEE Development © 2025. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
