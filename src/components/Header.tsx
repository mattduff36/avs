"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, Mail, Menu, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { siteData } from "@/data/site-data";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-lg"
          : "bg-white/90 backdrop-blur-sm"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Top Contact Bar */}
      <div className="bg-slate-900 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>{siteData.contact.phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>{siteData.contact.emails[0]}</span>
            </div>
          </div>
          <div className="hidden md:block text-xs">
            {siteData.company.established}
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/images/logo.jpg"
              alt="A&V Squires Logo"
              width={50}
              height={50}
              className="rounded-md"
            />
            <div className="hidden md:block">
              <div className="font-bold text-xl text-slate-900">
                A&V Squires
              </div>
              <div className="text-xs text-slate-600">
                Civil Engineering & Plant Hire
              </div>
            </div>
          </Link>

          {/* Desktop Navigation - Right Aligned */}
          <div className="flex items-center space-x-1">
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList>
                {siteData.navigation.map((item) => (
                  <NavigationMenuItem key={item.label}>
                    <NavigationMenuLink asChild>
                      {item.external ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          href={item.href}
                          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                        >
                          {item.label}
                        </Link>
                      )}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon" className="border-slate-200 hover:bg-slate-50">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] sm:w-[400px] p-0">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-center p-6 border-b border-slate-200">
                  <div className="flex items-center space-x-3">
                    <Image
                      src="/images/logo.jpg"
                      alt="A&V Squires Logo"
                      width={40}
                      height={40}
                      className="rounded-md"
                    />
                    <div>
                      <div className="font-bold text-lg text-slate-900">A&V Squires</div>
                      <div className="text-xs text-slate-600">Civil Engineering & Plant Hire</div>
                    </div>
                  </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-6 py-4">
                  <div className="space-y-1">
                    {siteData.navigation.map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        {item.external ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center justify-between w-full p-4 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-all duration-200 group"
                          >
                            <span className="font-medium">{item.label}</span>
                            <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                        ) : (
                          <Link
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center justify-between w-full p-4 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-all duration-200 group"
                          >
                            <span className="font-medium">{item.label}</span>
                            <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </nav>

                {/* Mobile Menu Footer */}
                <div className="p-6 border-t border-slate-200 bg-slate-50">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-sm text-slate-600">
                      <Phone className="h-4 w-4 text-custom-yellow" />
                      <span>{siteData.contact.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-slate-600">
                      <Mail className="h-4 w-4 text-custom-yellow" />
                      <span>{siteData.contact.emails[0]}</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200">
                    <p className="text-xs text-slate-500 text-center">
                      {siteData.company.established}
                    </p>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}



