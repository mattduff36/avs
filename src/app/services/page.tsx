"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { ArrowRight, Phone, X, ChevronDown } from "lucide-react";
import { siteData } from "@/data/site-data";

export default function ServicesPage() {
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [animatingService, setAnimatingService] = useState<string | null>(null);

  const toggleExpanded = (serviceId: string) => {
    const wasExpanded = expandedService === serviceId;
    
    // Start animation state
    setAnimatingService(serviceId);
    
    // Hide content immediately, then change state after brief delay
    setTimeout(() => {
      setExpandedService(wasExpanded ? null : serviceId);
    }, 100);
    
    // Show content again after animation completes
    setTimeout(() => {
      setAnimatingService(null);
      
      // Scroll to the service card
      const element = document.getElementById(serviceId);
      if (element) {
        const headerHeight = 120; // Account for fixed header height (nav bar + top bar)
        const elementPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    }, 600);
  };
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/transport-haulage.jpg"
            alt="Our Services"
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
              Our <span className="text-custom-yellow">Services</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              From civil engineering to specialised transport, we provide complete 
              construction solutions backed by decades of proven expertise.
            </p>
          </motion.div>
        </div>
      </section>

      {/* All Services Grid - Comprehensive Layout */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
            {siteData.services.map((service) => {
              const isExpanded = expandedService === service.id;
              const isAnimating = animatingService === service.id;
              const showContent = !isAnimating;
              return (
                <motion.div
                  key={service.id}
                  id={service.id}
                  className={`${isExpanded ? 'lg:col-span-2 xl:col-span-3' : ''}`}
                  layout
                  initial={false}
                  animate={{
                    scale: isExpanded ? 1.02 : 1,
                  }}
                  transition={{ 
                    duration: 0.5, 
                    ease: "easeInOut",
                    layout: { duration: 0.5, ease: "easeInOut" }
                  }}
                >
                  <motion.div
                    layout
                    className="group overflow-hidden hover:shadow-2xl bg-white border-0 shadow-lg hover:shadow-custom-yellow/10 cursor-pointer h-full rounded-xl"
                    animate={{
                      boxShadow: isExpanded 
                        ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)" 
                        : "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    {showContent ? (
                      isExpanded ? (
                        // Expanded Layout - Text wrap around image
                        <div 
                          className="p-8 lg:p-10 cursor-pointer"
                          onClick={() => toggleExpanded(service.id)}
                        >
                        {/* Close Button */}
                        <button
                          className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-600 hover:bg-white/20 transition-colors z-10"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleExpanded(service.id);
                          }}
                        >
                          <X className="h-5 w-5" />
                        </button>

                          {/* Service Title */}
                          <div className="mb-6">
                            <h3 className="text-3xl lg:text-4xl font-bold text-slate-900">
                              {service.name}
                            </h3>
                          </div>

                          {/* Image and Description Section */}
                          <div className="mb-8">
                            {/* Image floated left on desktop, stacked on mobile */}
                            <div className="float-none lg:float-left lg:w-80 lg:h-60 xl:w-96 xl:h-72 lg:mr-8 lg:mb-4 mb-6">
                              <Image
                                src={service.image}
                                alt={service.name}
                                width={400}
                                height={300}
                                className="w-full h-64 lg:h-full object-cover rounded-lg shadow-lg"
                              />
                            </div>

                            {/* Description text that wraps around image */}
                            <p className="text-base lg:text-lg text-slate-600 leading-relaxed">
                              {service.fullDescription}
                            </p>
                          </div>

                          {/* Clear float and add features section that spans full width */}
                          <div className="clear-both">
                            {/* Features List - Full Width */}
                            {service.features && (
                              <div className="mb-8">
                                <h4 className="font-semibold text-slate-900 mb-4 text-xl">Key Services Include:</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  {service.features.map((feature, featureIndex) => (
                                    <div key={featureIndex} className="flex items-start text-base text-slate-600">
                                      <div className="h-5 w-5 text-custom-yellow mr-3 mt-0.5 flex-shrink-0 flex items-center justify-center">
                                        <div className="h-2 w-2 bg-custom-yellow rounded-full"></div>
                                      </div>
                                      <span>{feature}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        // Collapsed Layout - Entire card clickable
                        <div 
                          onClick={() => toggleExpanded(service.id)}
                          className="cursor-pointer h-full flex flex-col"
                        >
                        {/* Image Section - Collapsed */}
                        <div className="relative overflow-hidden h-56">
                          <Image
                            src={service.image}
                            alt={service.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                          {/* Service Title Overlay */}
                          <div className="absolute bottom-0 left-0 right-0 p-6">
                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-custom-yellow transition-colors duration-300">
                              {service.name}
                            </h3>
                          </div>
                        </div>

                        {/* Content Section - Collapsed */}
                        <CardContent className="p-6 flex flex-col justify-between flex-1">
                          <div>
                            <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                              {service.description}
                            </p>
                          </div>
                          
                          {/* CTA Button */}
                          <div className="pt-4">
                            <Button
                              variant="outline"
                              className="w-full group-hover:bg-custom-yellow group-hover:text-slate-900 group-hover:border-custom-yellow transition-all duration-300 pointer-events-none"
                            >
                              <span>Show More</span>
                              <ChevronDown className="ml-2 h-4 w-4 transition-transform duration-300" />
                            </Button>
                          </div>
                        </CardContent>
                        </div>
                      )
                    ) : (
                      // Empty card during animation - just shows the card shape
                      <div className="h-64 lg:h-80 xl:h-96"></div>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>



          {/* Industry Accreditations Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100">
              <h3 className="text-3xl font-bold text-slate-900 mb-6">
                Industry <span className="text-custom-yellow">Accreditations</span>
              </h3>
              <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
                Our commitment to quality and safety is recognized through industry-leading accreditations and certifications.
              </p>
              <div className="flex justify-center">
                <Image
                  src="https://static.wixstatic.com/media/59d7f2_cd98b97515f84e9fb1502dbf05cbff1d~mv2.jpg/v1/fill/w_951,h_225,al_c,lg_1,q_80,enc_avif,quality_auto/Avs_edited.jpg"
                  alt="A&V Squires Industry Accreditations and Certifications"
                  width={951}
                  height={225}
                  className="rounded-lg shadow-md max-w-full h-auto"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Contact us today for a free consultation and professional service. Our expert team is ready 
              to help bring your construction project to life with our decades of experience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="bg-custom-yellow hover:bg-custom-yellow-hover px-8 py-6 text-lg"
              >
                <Link href="/contact">
                  Get In Touch
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <div className="flex items-center text-lg">
                <span className="mr-4 text-gray-300">or call us directly:</span>
                <a
                  href={`tel:${siteData.contact.phone}`}
                  className="flex items-center text-custom-yellow text-custom-yellow-hover-400 font-semibold transition-colors"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  {siteData.contact.phone}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}



