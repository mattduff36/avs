"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { siteData } from "@/data/site-data";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3">
              <Image
                src="/images/logo.jpg"
                alt="A&V Squires Logo"
                width={40}
                height={40}
                className="rounded-md"
              />
              <div>
                <div className="font-bold text-lg">A&V Squires</div>
                <div className="text-sm text-slate-300">
                  {siteData.company.established}
                </div>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              {siteData.company.description}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              {siteData.navigation.slice(0, 6).map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="font-semibold text-lg">Our Services</h3>
            <nav className="flex flex-col space-y-2">
              {siteData.services.slice(0, 6).map((service) => (
                <Link
                  key={service.id}
                  href={`/services#${service.id}`}
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  {service.name}
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="font-semibold text-lg">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-custom-yellow" />
                <span className="text-sm">{siteData.contact.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-custom-yellow" />
                <span className="text-sm">{siteData.contact.emails[0]}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-custom-yellow" />
                <span className="text-sm">Vivienne House, Racecourse Road Southwell, Nottinghamshire, NG25 0TX</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-4 w-4 text-custom-yellow" />
                <span className="text-sm">24/7 Emergency Service</span>
              </div>
            </div>
          </motion.div>
        </div>

        <Separator className="my-8 bg-slate-700" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-slate-300">
            Website developed by{" "}
            <Link 
              href="https://www.mpdee.co.uk/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-custom-yellow hover:text-custom-yellow-hover transition-colors"
            >
              MPDEE Development
            </Link>{" "}
            © 2025. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm text-slate-300">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}



