"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LogOut, Home, Wrench } from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
  currentPage?: string;
}

export default function AdminLayout({ children, currentPage = "dashboard" }: AdminLayoutProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    try {
      const response = await fetch("/api/admin/logout", {
        method: "POST",
      });

      if (response.ok) {
        // Redirect to login page
        router.push("/admin/login");
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
    { name: "Machines", href: "/admin/machines", icon: Wrench, current: currentPage === "machines" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-custom-yellow rounded-lg flex items-center justify-center">
                <Wrench className="h-6 w-6 text-slate-900" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">A&V Squires Admin</h1>
                <p className="text-sm text-slate-500">Website Management Panel</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex space-x-8">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                      item.current
                        ? "border-custom-yellow text-slate-900"
                        : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </a>
                );
              })}
            </nav>

            {/* Logout Button */}
            <div className="flex items-center space-x-4">
              <Button
                onClick={handleLogout}
                disabled={isLoggingOut}
                variant="outline"
                className="border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                {isLoggingOut ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-700"></div>
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
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-slate-500">
            <p>© 2024 A&V Squires Plant Company LTD. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
