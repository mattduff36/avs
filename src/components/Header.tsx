"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, Mail, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4 mt-8">
                {siteData.navigation.map((item) => (
                  item.external ? (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-medium text-slate-700 hover:text-slate-900 block py-2"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="text-lg font-medium text-slate-700 hover:text-slate-900 block py-2"
                    >
                      {item.label}
                    </Link>
                  )
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}



