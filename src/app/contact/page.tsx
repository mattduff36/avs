"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Phone, Mail, MapPin, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

export default function ContactPage() {
  const [expandedCards, setExpandedCards] = useState<number[]>([]);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (expandedCards.length === 0) {
        setShowPrompt(true);
      }
    }, 8000);

    return () => clearTimeout(timer);
  }, [expandedCards]);

  const toggleCard = (index: number) => {
    setExpandedCards(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
    // Hide prompt when user interacts with a card
    setShowPrompt(false);
  };

  const contactInfo = [
    {
      icon: <Phone className="h-8 w-8" />,
      title: "Phone",
      details: "01636 812227",
      link: "tel:01636 812227",
      gradient: "from-[#F1D64A] to-[#d1b82f]",
      bgGradient: "from-[#fef3c7] to-[#fde68a]",
      accent: "bg-[#F1D64A]"
    },
    {
      icon: <Mail className="h-8 w-8" />,
      title: "Email",
      details: [
        {
          email: "info@avsquires.co.uk",
          link: "mailto:info@avsquires.co.uk"
        },
        {
          email: "office@avsquires.co.uk",
          link: "mailto:office@avsquires.co.uk"
        }
      ],
      gradient: "from-[#d1b82f] to-[#F1D64A]",
      bgGradient: "from-[#fde68a] to-[#fef3c7]",
      accent: "bg-[#d1b82f]"
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      title: "Address",
      details: "Vivienne House, Racecourse Road Southwell, Nottinghamshire, NG25 0TX",
      link: "#",
      gradient: "from-[#fbbf24] to-[#F1D64A]",
      bgGradient: "from-[#fef9c3] to-[#fef3c7]",
      accent: "bg-[#fbbf24]"
    }
  ];

  return (
    <div className="h-[100dvh] flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hiab-hire.jpg"
            alt="Contact A&V Squires"
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
              Contact <span className="text-custom-yellow">Us</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Get in touch with our expert team for professional service and support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information - Modern Design */}
      <section className={`pt-20 pb-5 relative overflow-hidden flex-grow`}>
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-custom-yellow/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-slate-500/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-6xl mx-auto">
            
            {/* User Prompt Message */}
            <div className="h-16 mb-8">
              <AnimatePresence>
                {showPrompt && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                  >
                    <div className="inline-flex items-center space-x-2 bg-custom-yellow/10 border border-custom-yellow/20 rounded-full px-6 py-3">
                      <ChevronDown className="h-5 w-5 text-custom-yellow animate-bounce" />
                      <span className="text-slate-700 font-medium">
                        Click on a contact method above to reveal details
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Main Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  {/* Card Container */}
                  <div className="relative bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden group hover:shadow-xl transition-all duration-500">
                    
                    {/* Gradient Header - Clickable */}
                    <div 
                      className={`h-32 bg-gradient-to-r ${info.gradient} relative overflow-hidden cursor-pointer`}
                      onClick={() => toggleCard(index)}
                    >
                      {/* Floating Elements */}
                      <div className="absolute top-4 right-4 w-8 h-8 bg-white/10 rounded-full"></div>
                      <div className="absolute bottom-6 left-6 w-6 h-6 bg-white/10 rounded-full"></div>
                      
                      {/* Icon and Title Container */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex items-center space-x-4">
                          <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-black group-hover:scale-110 transition-transform duration-300">
                            {info.icon}
                          </div>
                          <div className="flex items-center space-x-2">
                            <h3 className="text-2xl font-bold text-black">
                              {info.title}
                            </h3>
                            <motion.div
                              animate={{ 
                                rotate: expandedCards.includes(index) ? 180 : 0 
                              }}
                              transition={{ duration: 0.3 }}
                            >
                              <ChevronDown className="h-6 w-6 text-black" />
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Bottom Section - Animated like a blind */}
                    <AnimatePresence>
                      {expandedCards.includes(index) && (
                        <motion.div 
                          className="bg-white"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "192px", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                          <div className="p-8 flex flex-col justify-center h-48">
                            <div className="text-center space-y-4">
                              {Array.isArray(info.details) ? (
                                // Email card with multiple addresses
                                info.details.map((emailDetail, emailIndex) => (
                                  <a
                                    key={emailIndex}
                                    href={emailDetail.link}
                                    className={`inline-block px-6 py-3 rounded-lg bg-gradient-to-r ${info.bgGradient} border border-gray-200 hover:shadow-md transition-all duration-300 group-hover:border-slate-400 text-slate-700 hover:text-slate-900`}
                                  >
                                    <span className="text-lg font-medium">{emailDetail.email}</span>
                                  </a>
                                ))
                              ) : (
                                // Other cards with single details
                                <a
                                  href={info.link}
                                  className={`inline-block px-6 py-3 rounded-lg bg-gradient-to-r ${info.bgGradient} border border-gray-200 hover:shadow-md transition-all duration-300 group-hover:border-slate-400 text-slate-700 hover:text-slate-900`}
                                >
                                  <span className="text-lg font-medium">{info.details}</span>
                                </a>
                              )}
                            </div>
                          </div>
                          
                          {/* Accent Line */}
                          <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${info.gradient}`}></div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}



