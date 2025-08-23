"use client";

import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { useEffect } from "react";

export default function ContactPage() {
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

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const contactInfo = [
    {
      icon: <Phone className="h-8 w-8" />,
      title: "Phone",
      details: "01636 812227",
      link: "tel:01636 812227",
      gradient: "from-[#F1D64A] to-[#d1b82f]",
      bgGradient: "from-[#fef3c7] to-[#fde68a]"
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
      bgGradient: "from-[#fde68a] to-[#fef3c7]"
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      title: "Address",
      details: "Vivienne House, Racecourse Road Southwell, Nottinghamshire, NG25 0TX",
      link: "#",
      gradient: "from-[#fbbf24] to-[#F1D64A]",
      bgGradient: "from-[#fef9c3] to-[#fef3c7]"
    }
  ];

  return (
    <div className="ios-fix-alt flex flex-col">
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
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold">
              Contact <span className="text-custom-yellow">Us</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Contact Information - Static Cards */}
      <section className="py-16 relative overflow-hidden flex-grow">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-custom-yellow/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-slate-500/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-6xl mx-auto">
            
            {/* Mobile Contact Layout - Simple Icon + Info */}
            <div className="lg:hidden space-y-6">
              {contactInfo.map((info, index) => (
                <div key={info.title} className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                  <div className="flex items-start space-x-4">
                    {/* Yellow Icon */}
                    <div className="flex-shrink-0 w-12 h-12 bg-custom-yellow rounded-lg flex items-center justify-center text-black">
                      {info.icon}
                    </div>
                    
                    {/* Contact Information */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">{info.title}</h3>
                      
                      {Array.isArray(info.details) ? (
                        // Email card with multiple addresses
                        <div className="space-y-2">
                          {info.details.map((emailDetail, emailIndex) => (
                            <a
                              key={emailIndex}
                              href={emailDetail.link}
                              className="block text-slate-700 hover:text-slate-900 transition-colors"
                            >
                              <span className="text-sm font-medium break-all">{emailDetail.email}</span>
                            </a>
                          ))}
                        </div>
                      ) : (
                        // Other cards with single details
                        <a
                          href={info.link}
                          className="block text-slate-700 hover:text-slate-900 transition-colors"
                        >
                          <span className={`font-medium ${index === 0 ? 'text-lg' : 'text-sm'} break-words`}>{info.details}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Contact Cards */}
            <div className="hidden lg:grid grid-cols-3 gap-8">
              {contactInfo.map((info, index) => (
                <div
                  key={info.title}
                  className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300 h-80 flex flex-col"
                >
                  {/* Header */}
                  <div className={`h-32 bg-gradient-to-r ${info.gradient} relative overflow-hidden flex-shrink-0`}>
                    {/* Floating Elements */}
                    <div className="absolute top-4 right-4 w-8 h-8 bg-white/10 rounded-full"></div>
                    <div className="absolute bottom-6 left-6 w-6 h-6 bg-white/10 rounded-full"></div>
                    
                    {/* Icon and Title Container */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex items-center space-x-4">
                        <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-black">
                          {info.icon}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-black">
                            {info.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-8 flex-1 flex flex-col justify-center">
                    <div className="text-center space-y-4">
                      {Array.isArray(info.details) ? (
                        // Email card with multiple addresses
                        info.details.map((emailDetail, emailIndex) => (
                          <a
                            key={emailIndex}
                            href={emailDetail.link}
                            className={`block w-full px-4 py-3 rounded-lg bg-gradient-to-r ${info.bgGradient} border border-gray-200 hover:shadow-md transition-all duration-300 text-slate-700 hover:text-slate-900`}
                          >
                            <span className="text-sm font-medium">{emailDetail.email}</span>
                          </a>
                        ))
                      ) : (
                        // Other cards with single details
                        <a
                          href={info.link}
                          className={`block w-full px-4 py-3 rounded-lg bg-gradient-to-r ${info.bgGradient} border border-gray-200 hover:shadow-md transition-all duration-300 text-slate-700 hover:text-slate-900`}
                        >
                          <span className={`font-medium ${index === 0 ? 'text-xl' : 'text-sm'}`}>{info.details}</span>
                        </a>
                      )}
                    </div>
                  </div>
                  
                  {/* Accent Line */}
                  <div className={`h-1 bg-gradient-to-r ${info.gradient} flex-shrink-0`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}



