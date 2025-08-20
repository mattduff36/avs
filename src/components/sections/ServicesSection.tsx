"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { siteData } from "@/data/site-data";
import { Icon } from "@/lib/icons";

export function ServicesSection() {
  const featuredServices = siteData.services.filter(service => service.featured);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Our <span className="text-custom-yellow">Services</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            From civil engineering to specialized transport, we provide comprehensive 
            construction services with over 50 years of expertise.
          </p>
        </motion.div>

        {/* Featured Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
                             <Link href={`/services#${service.id}`}>
                 <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 h-full cursor-pointer">
                   <div className="relative h-64 overflow-hidden">
                     <Image
                       src={service.image!}
                       alt={service.name}
                       fill
                       className="object-cover group-hover:scale-110 transition-transform duration-500"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                     
                     {/* Service Icon */}
                     <div className="absolute top-4 right-4">
                       <div className="w-12 h-12 bg-custom-yellow rounded-full flex items-center justify-center text-white">
                         <Icon name={service.icon} className="h-6 w-6" />
                       </div>
                     </div>

                     {/* Overlay Content */}
                     <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                       <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                     </div>
                   </div>

                   <CardContent className="p-6">
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

        {/* All Services Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">
            Complete Range of Services
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {siteData.services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Link href={`/services#${service.id}`}>
                  <Card className="p-4 hover:shadow-md transition-all duration-300 hover:border-custom-yellow group cursor-pointer">
                    <div className="text-center">
                      <div className="mb-2 group-hover:scale-110 transition-transform text-custom-yellow">
                        <Icon name={service.icon} className="h-8 w-8 mx-auto" />
                      </div>
                      <div className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                        {service.name}
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Industry Accreditations Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100">
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
  );
}



