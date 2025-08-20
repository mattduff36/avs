"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Phone } from "lucide-react";
import { siteData } from "@/data/site-data";
import { Icon } from "@/lib/icons";

export default function ServicesPage() {
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
            <Badge variant="secondary" className="bg-custom-yellow/90 text-white mb-6">
              Comprehensive Solutions
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our <span className="text-custom-yellow">Services</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              From civil engineering to specialized transport, we provide complete 
              construction solutions backed by {siteData.company.established} of expertise.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Services */}
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
              Featured <span className="text-custom-yellow">Services</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our most popular services that showcase our expertise and capabilities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {siteData.services.filter(service => service.featured).map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                id={service.id}
              >
                <Link href={`/services#${service.id}`}>
                  <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 h-full cursor-pointer">
                  <div className="relative h-80 overflow-hidden">
                    <Image
                      src={service.image!}
                      alt={service.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    
                    {/* Service Icon */}
                    <div className="absolute top-6 right-6">
                      <div className="w-16 h-16 bg-custom-yellow/90 rounded-full flex items-center justify-center text-white backdrop-blur-sm">
                        <Icon name={service.icon} className="h-8 w-8" />
                      </div>
                    </div>

                    {/* Overlay Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">{service.name}</h3>
                      <p className="text-gray-200 line-clamp-2">{service.description}</p>
                    </div>
                  </div>

                  <CardContent className="p-8">
                    <p className="text-slate-600 mb-6 leading-relaxed text-lg">
                      {service.description}
                    </p>
                    
                    <div className="flex items-center text-custom-yellow font-medium group-hover:text-custom-yellow-hover transition-colors">
                      <span>Learn More</span>
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

      {/* All Services Grid */}
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
              Complete Range of <span className="text-custom-yellow">Services</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive construction and engineering solutions for every project need
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {siteData.services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                id={service.id}
              >
                <Link href={`/services#${service.id}`}>
                  <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:border-custom-yellow-light group h-full cursor-pointer">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="group-hover:scale-110 transition-transform text-custom-yellow">
                          <Icon name={service.icon} className="h-8 w-8" />
                        </div>
                        {service.featured && (
                          <Badge variant="secondary" className="bg-custom-yellow-light text-custom-yellow-hover">
                            Popular
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl group-hover:text-custom-yellow transition-colors">
                        {service.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-slate-600 mb-6 leading-relaxed">
                        {service.description}
                      </p>
                      <div className="flex items-center text-custom-yellow font-medium group-hover:text-custom-yellow-hover transition-colors">
                        <span>Learn More</span>
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
              to help bring your construction project to life with our {siteData.company.established} of experience.
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



