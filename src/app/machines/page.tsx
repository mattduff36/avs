"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Wrench, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const machinesData = [
  {
    id: 1,
    title: "KOMATSU D61 PXi",
    description: "The Intelligent Machine Control (iMC) on the D61 improves efficiency and reduces cost to our customers in any application. The iMC allows automated operation from heavy dozing to fine grading. Our Komatsu D61 PXi dozers are available for contracted works and short or long-term hire.",
    image: "/images/komatsu-d61-pxi.jpg",
    features: ["Intelligent Machine Control", "Heavy dozing to fine grading", "Available for hire"],
    side: "left"
  },
  {
    id: 2,
    title: "KOMATSU'S INTELLIGENT MACHINE CONTROL",
    description: "We have a choice of Komatsu excavators with Komatsu's intelligent machine control technology, meaning whatever the job we will have the right machine to ensure our customers projects are completed to highest accuracy and in a fraction of the time compared to conventional methods. Onboard weighing will optimize loading, ensuring every truck load is road legal and filled to its full capacity.",
    image: "/images/komatsu-intelligent-control.jpg",
    features: ["Multiple excavator options", "Highest accuracy", "Onboard weighing system"],
    side: "right"
  },
  {
    id: 3,
    title: "Dual View Dumpers",
    description: "Our high-performance Dual View Dumpers allow the driver to quickly change the seat position through a 180 degrees to ensure that the operator always has the best view, whether loading or during transportation. This helps save time on site and ensures maximum safety.",
    image: "/images/dual-view-dumpers.jpg",
    features: ["180-degree seat rotation", "Maximum safety", "Time-saving design"],
    side: "left"
  },
  {
    id: 4,
    title: "McCloskey R105 and 621",
    description: "The McCloskey Screener and Trommel are essential pieces of equipment for efficient material separation and screening. The screener is designed to handle a variety of materials, providing high throughput excellent performance in various applications. Meanwhile, the trommel offers a rotating drum that effectively separates materials based on size, ensuring optimal sorting and processing.",
    image: "/images/mccloskey-screener.webp",
    features: ["Material separation", "High throughput", "Optimal sorting"],
    side: "right"
  },
  {
    id: 5,
    title: "Loading Shovels",
    description: "A loading shovel, also known as a front-end loader, is a versatile piece of heavy machinery commonly used in construction, agriculture, and material handling. It is primarily utilised for moving bulk materials as soil, gravel, and sand, making it ideal for tasks like loading trucks, clearing debris, and digging trenches. We can provide loading shovels for hire either operated or on a self drive basis.",
    image: "/images/loading-shovels.jpg",
    features: ["Versatile machinery", "Bulk material handling", "Operated or self-drive"],
    side: "left"
  },
  {
    id: 6,
    title: "All Terrain Vehicles",
    description: "Our ATV hire service for construction sites provides reliable and durable all-terrain vehicles to enhance your project efficiency. Designed to navigate rough terrains and heavy loads, our ATVs help transport materials and personnel with ease. Each vehicle is well-maintained and equipped to handle the demands of any construction environment.",
    image: "/images/all-terrain-vehicles.jpg",
    features: ["Rough terrain navigation", "Material transport", "Well-maintained fleet"],
    side: "right"
  }
];

export default function MachinesPage() {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

  const openModal = (imageSrc: string, imageAlt: string) => {
    setSelectedImage({ src: imageSrc, alt: imageAlt });
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    // Restore body scroll
    document.body.style.overflow = 'unset';
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/komatsu-d61-pxi.jpg"
            alt="Our Machines"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our <span className="text-custom-yellow">Machines</span>
            </h1>
            <p className="text-xl text-grey-300 leading-relaxed">
              A new level in productivity and accuracy - we are constantly investing in our machines, 
              including GPS excavators, bulldozers, and dual view dumpers for the highest accuracy and safety.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Machines Sections */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {machinesData.map((machine, index) => (
            <motion.div
              key={machine.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`mb-32 ${index === machinesData.length - 1 ? 'mb-0' : ''}`}
            >
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
                machine.side === 'right' ? 'lg:grid-flow-col-dense' : ''
              }`}>
                
                {/* Content Side */}
                <div className={machine.side === 'right' ? 'lg:col-start-2' : ''}>
                  <div className="space-y-6">
                    {/* Icon and Title */}
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-custom-yellow rounded-lg flex items-center justify-center text-slate-900">
                        <Wrench className="h-6 w-6" />
                      </div>
                      <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                          {machine.title}
                        </h2>
                      </div>
                    </div>
                    
                    {/* Description */}
                    <p className="text-lg text-slate-600 leading-relaxed">
                      {machine.description}
                    </p>
                    
                    {/* Features */}
                    <div className="space-y-3">
                      {machine.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-custom-yellow rounded-full"></div>
                          <span className="text-slate-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* CTA Button */}
                    <div className="pt-4">
                      <Button asChild className="bg-custom-yellow hover:bg-custom-yellow-hover text-slate-900 font-semibold">
                        <Link href="/contact">
                          Contact Us Today
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Image Side - Sophisticated Display */}
                <div className={machine.side === 'right' ? 'lg:col-start-1' : ''}>
                  <div className="relative">
                    <motion.div
                      className="relative"
                      whileHover={{ y: -8 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      {/* Main image container with sophisticated styling */}
                      <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-slate-100 to-slate-200">
                        {/* Diagonal accent strip */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-custom-yellow transform rotate-45 translate-x-12 -translate-y-12"></div>
                        
                        {/* Image */}
                        <div 
                          className="relative h-80 md:h-96 overflow-hidden cursor-pointer group"
                          onClick={() => openModal(machine.image, machine.title)}
                        >
                          <Image
                            src={machine.image}
                            alt={machine.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          
                          {/* Gradient overlay for better text contrast */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                          
                          {/* Click indicator */}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        
                        {/* Bottom accent bar */}
                        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-custom-yellow via-custom-yellow to-custom-yellow/80"></div>
                      </div>
                      
                      {/* Floating elements for depth */}
                      <div className="absolute -top-4 -left-4 w-8 h-8 bg-custom-yellow/20 rounded-lg transform rotate-12"></div>
                      <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-slate-900/10 rounded-lg transform -rotate-12"></div>
                    </motion.div>
                    
                    {/* Background geometric shapes */}
                    <div className="absolute inset-0 -z-10">
                      <div className="absolute top-12 -left-8 w-16 h-16 border-2 border-custom-yellow/20 rounded-lg transform rotate-45"></div>
                      <div className="absolute bottom-8 -right-6 w-12 h-12 border-2 border-slate-300 rounded-lg transform -rotate-12"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-3xl font-bold mb-4">
              Ready to Enhance Your Project?
            </h3>
            <p className="text-xl text-grey-300 mb-8 max-w-3xl mx-auto">
              From GPS-guided precision to versatile all-terrain capability, our modern fleet 
              delivers the productivity and accuracy your project demands.
            </p>
            <div className="flex justify-center">
              <Button
                asChild
                size="lg"
                className="bg-custom-yellow hover:bg-custom-yellow-hover text-slate-900 font-semibold"
              >
                <Link href="/contact">
                  Get in Touch
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Fullscreen Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative max-w-7xl max-h-[90vh] w-full h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute -top-12 right-0 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2 text-white transition-colors duration-200"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Image Container */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-slate-900">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>

              {/* Image Title */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-2xl">
                <h3 className="text-white text-xl md:text-2xl font-bold">
                  {selectedImage.alt}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}