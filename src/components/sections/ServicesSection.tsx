"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Users, Wrench, FolderOpen, Truck } from "lucide-react";

export function ServicesSection() {
  const pageSections = [
    {
      id: "about",
      title: "About Us",
      subtitle: "Our Story & Heritage",
      description: "Discover our 50+ years of experience in civil engineering and plant hire. From humble beginnings to becoming one of the East Midlands' leading construction companies.",
      image: "/images/hero-background.jpg",
      icon: Users,
      link: "/about",
      features: ["50+ Years Experience", "75+ Skilled Employees", "East Midlands Coverage", "Family Business Heritage"]
    },
    {
      id: "services",
      title: "Our Services",
      subtitle: "Comprehensive Solutions",
      description: "From civil engineering to specialised transport, we provide a complete range of construction services backed by decades of proven expertise.",
      image: "/images/civil-engineering.jpg",
      icon: Wrench,
      link: "/services",
      features: ["Civil Engineering", "Plant Hire", "Transport & Haulage", "Workshop Services"]
    },
    {
      id: "projects",
      title: "Our Projects",
      subtitle: "Portfolio & Success Stories",
      description: "Explore our extensive portfolio of completed projects, from major infrastructure developments to specialised earthmoving operations across the region.",
      image: "/images/tarmac-major-civils.jpg",
      icon: FolderOpen,
      link: "/projects",
      features: ["1000+ Projects Completed", "Major Infrastructure", "Commercial Developments", "Specialised Operations"]
    },
    {
      id: "machines",
      title: "Our Machines",
      subtitle: "Modern Fleet & Equipment",
      description: "Browse our extensive fleet of 40+ modern machines, from excavators and dumpers to specialised equipment for every construction need.",
      image: "/images/komatsu-d61-pxi.jpg",
      icon: Truck,
      link: "/machines",
      features: ["40+ Machines Available", "Modern Equipment", "Well Maintained", "Expert Operators"]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
      <div className="container mx-auto px-4">
        {/* Main Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Discover <span className="text-custom-yellow">A&V Squires</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            From our rich heritage to our modern fleet, explore everything that makes us the East Midlands&apos; 
            leading civil engineering and plant hire company.
          </p>
        </motion.div>

        {/* Page Sections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {pageSections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={section.link}>
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 h-full cursor-pointer border-0 shadow-lg">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={section.image}
                      alt={section.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    


                    {/* Overlay Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <div className="text-sm font-medium text-custom-yellow mb-2">
                        {section.subtitle}
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{section.title}</h3>
                    </div>
                  </div>

                  <CardContent className="p-8">
                    <p className="text-slate-600 mb-6 leading-relaxed">
                      {section.description}
                    </p>
                    
                    {/* Features List */}
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {section.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm text-slate-700">
                          <div className="w-2 h-2 bg-custom-yellow rounded-full mr-3"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center text-custom-yellow font-semibold group-hover:text-custom-yellow-hover transition-colors">
                      <span>Explore {section.title}</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-slate-900 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-3xl font-bold mb-6">
              Ready to Start Your <span className="text-custom-yellow">Project</span>?
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              From major infrastructure developments to specialised smaller operations, our expert team 
              provides the same high-quality service regardless of project size.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="bg-custom-yellow hover:bg-custom-yellow-hover text-slate-900 font-semibold px-8 py-4 rounded-lg transition-all duration-300">
                  Get In Touch
                </button>
              </Link>
              <Link href="/projects">
                <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-slate-900 transition-all duration-300">
                  View Our Projects
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}



