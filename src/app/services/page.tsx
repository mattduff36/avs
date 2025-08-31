"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ImageSkeleton } from "@/components/ui/image-skeleton";


import { X, ChevronDown } from "lucide-react";
// Dynamic services interface
interface Service {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  features: string[];
  icon: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [animatingService, setAnimatingService] = useState<string | null>(null);
  const [imageLoadingStates, setImageLoadingStates] = useState<Record<string, boolean>>({});

  // Fetch services data from dynamic API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/admin/dynamic/services');
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            setServices(data.data);
          } else {
            console.warn('No dynamic services data available');
            setServices([]);
          }
        } else {
          console.warn('Failed to fetch dynamic services data');
          setServices([]);
        }
      } catch (error) {
        console.warn('Error fetching dynamic services data:', error);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

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

  const handleImageLoad = (serviceId: string) => {
    setImageLoadingStates(prev => ({ ...prev, [serviceId]: false }));
  };

  const handleImageStartLoad = (serviceId: string) => {
    setImageLoadingStates(prev => ({ ...prev, [serviceId]: true }));
  };

  // Handle URL hash on page load and hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && services.some(service => service.id === hash)) {
        // Small delay to ensure page is fully loaded
        setTimeout(() => {
          setExpandedService(hash);
          
          // Scroll to the service card
          const element = document.getElementById(hash);
          if (element) {
            const headerHeight = 120;
            const elementPosition = element.offsetTop - headerHeight;
            
            window.scrollTo({
              top: elementPosition,
              behavior: 'smooth'
            });
          }
        }, 500);
      }
    };

    // Handle initial load
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    // Also listen for popstate (back/forward navigation)
    window.addEventListener('popstate', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  // Additional effect to handle direct navigation to hash URLs
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && services.some(service => service.id === hash)) {
      // Ensure the service is expanded and scrolled to
      setTimeout(() => {
        setExpandedService(hash);
        
        const element = document.getElementById(hash);
        if (element) {
          const headerHeight = 120;
          const elementPosition = element.offsetTop - headerHeight;
          
          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, []);

  const toggleExpanded = (serviceId: string) => {
    const wasExpanded = expandedService === serviceId;
    
    // Start animation state
    setAnimatingService(serviceId);
    
    // Hide content immediately, then change state after brief delay
    setTimeout(() => {
      setExpandedService(wasExpanded ? null : serviceId);
      
      // Update URL hash
      if (wasExpanded) {
        // Remove hash if closing
        window.history.pushState(null, '', window.location.pathname);
      } else {
        // Add hash if expanding
        window.history.pushState(null, '', `#${serviceId}`);
      }
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
    <div className="ios-fix-alt flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/transport-haulage.jpg"
            alt="Our Services"
            fill
            sizes="100vw"
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
          {loading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-custom-yellow"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
              {services.map((service, index) => {
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
                              {service.title}
                            </h3>
                          </div>

                          {/* Image and Description Section */}
                          <div className="mb-8">
                            {/* Image floated left on desktop, stacked on mobile */}
                            <div className="float-none lg:float-left lg:w-80 lg:h-60 xl:w-96 xl:h-72 lg:mr-8 lg:mb-4 mb-6 relative">
                              {imageLoadingStates[service.id] && (
                                <ImageSkeleton 
                                  aspectRatio="wide" 
                                  className="w-full h-64 lg:h-full absolute inset-0 z-20"
                                />
                              )}
                              {service.image ? (
                                <Image
                                  src={service.image}
                                  alt={service.title}
                                  width={400}
                                  height={300}
                                  className="w-full h-64 lg:h-full object-cover rounded-lg shadow-lg relative z-10"
                                  onLoadStart={() => handleImageStartLoad(service.id)}
                                  onLoad={() => handleImageLoad(service.id)}
                                />
                              ) : (
                                <div className="w-full h-64 lg:h-full bg-slate-200 rounded-lg shadow-lg flex items-center justify-center relative z-10">
                                  <div className="text-slate-400 text-center">
                                    <div className="w-12 h-12 mx-auto mb-2 bg-slate-300 rounded-lg flex items-center justify-center">
                                      <span className="text-slate-500 font-bold text-sm">IMG</span>
                                    </div>
                                    <p className="text-xs">No Image</p>
                                  </div>
                                </div>
                              )}
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
                          {service.image ? (
                            <Image
                              src={service.image}
                              alt={service.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover group-hover:scale-110 transition-transform duration-700"
                              priority={index === 0}
                            />
                          ) : (
                            <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                              <div className="text-slate-400 text-center">
                                <div className="w-12 h-12 mx-auto mb-2 bg-slate-300 rounded-lg flex items-center justify-center">
                                  <span className="text-slate-500 font-bold text-sm">IMG</span>
                                </div>
                                <p className="text-xs">No Image</p>
                              </div>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                          {/* Service Title Overlay */}
                          <div className="absolute bottom-0 left-0 right-0 p-6">
                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-custom-yellow transition-colors duration-300">
                              {service.title}
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
          )}

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


    </div>
  );
}



