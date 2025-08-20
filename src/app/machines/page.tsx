"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Cog, Truck, Construction } from "lucide-react";

export default function MachinesPage() {
  const machineCategories = [
    {
      id: 1,
      title: "Excavators & Earthmoving",
      icon: <Construction className="h-8 w-8" />,
      description: "Modern excavators and earthmoving equipment for all project sizes",
      image: "/images/civil-engineering.jpg",
      machines: ["360° Excavators", "Mini Excavators", "Tracked Dumpers", "Bulldozers"]
    },
    {
      id: 2,
      title: "Transport Fleet",
      icon: <Truck className="h-8 w-8" />,
      description: "Specialized heavy vehicles for material transport and delivery",
      image: "/images/transport-haulage.jpg",
      machines: ["Articulated Lorries", "Tipper Trucks", "Low Loaders", "Grab Lorries"]
    },
    {
      id: 3,
      title: "Lifting Equipment",
      icon: <Cog className="h-8 w-8" />,
      description: "HIAB cranes and specialized lifting equipment",
      image: "/images/hiab-hire.jpg",
      machines: ["HIAB Cranes", "Mobile Cranes", "Telehandlers", "Cherry Pickers"]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/transport-haulage.jpg"
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
            <Badge variant="secondary" className="bg-custom-yellow/90 text-white mb-6">
              Our Fleet
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our <span className="text-custom-yellow">Machines</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              State-of-the-art equipment and machinery for every construction need
            </p>
          </motion.div>
        </div>
      </section>

      {/* Machine Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Our <span className="text-custom-yellow">Equipment</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Modern, well-maintained machinery operated by experienced professionals
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {machineCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Link href="/contact">
                  <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 h-full cursor-pointer">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={category.image}
                        alt={category.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      
                      {/* Icon */}
                      <div className="absolute top-6 right-6">
                        <div className="w-16 h-16 bg-custom-yellow/90 rounded-full flex items-center justify-center text-white backdrop-blur-sm">
                          {category.icon}
                        </div>
                      </div>

                      {/* Overlay Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <p className="text-slate-600 mb-6 leading-relaxed">
                        {category.description}
                      </p>
                      
                      <div className="space-y-2 mb-6">
                        <h4 className="font-semibold text-slate-900">Equipment includes:</h4>
                        <ul className="grid grid-cols-2 gap-1 text-sm text-slate-600">
                          {category.machines.map((machine, idx) => (
                            <li key={idx} className="flex items-center">
                              <div className="w-1.5 h-1.5 bg-custom-yellow rounded-full mr-2"></div>
                              {machine}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex items-center text-custom-yellow font-medium group-hover:text-custom-yellow-hover transition-colors">
                        <span>Get In Touch</span>
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Why Choose Our <span className="text-custom-yellow">Equipment</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Latest Technology",
                description: "Modern, efficient machinery with the latest technology and safety features"
              },
              {
                title: "Expert Operators",
                description: "Experienced, certified operators who know how to get the job done right"
              },
              {
                title: "Regular Maintenance",
                description: "All equipment is regularly serviced and maintained to ensure reliability"
              },
              {
                title: "Flexible Hire",
                description: "Short-term or long-term hire options to suit your project requirements"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
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
              Need Equipment for Your Project?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Contact us to discuss your equipment requirements and get professional 
              machine hire with experienced operators.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-custom-yellow hover:bg-custom-yellow-hover text-slate-900 font-semibold"
              >
                <Link href="/contact">
                  Get In Touch
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-slate-900 font-semibold"
              >
                <Link href="/services">
                  View All Services
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}



