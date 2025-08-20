"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: "Highway Infrastructure Project",
      category: "Civil Engineering",
      description: "Major highway construction and infrastructure development project in the East Midlands.",
      image: "/images/civil-engineering.jpg",
      year: "2023"
    },
    {
      id: 2,
      title: "Commercial Transport Solutions",
      category: "Transport & Haulage",
      description: "Comprehensive transport and logistics solutions for major commercial development.",
      image: "/images/transport-haulage.jpg",
      year: "2023"
    },
    {
      id: 3,
      title: "Specialized HIAB Operations",
      category: "HIAB Hire",
      description: "Complex lifting and positioning operations for industrial construction project.",
      image: "/images/hiab-hire.jpg",
      year: "2023"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/civil-engineering.jpg"
            alt="Our Projects"
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
              Our Work
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our <span className="text-custom-yellow">Projects</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Showcasing our expertise through successful projects across the UK
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
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
              Featured <span className="text-custom-yellow">Projects</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Examples of our successful projects demonstrating our expertise and capabilities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    {/* Year Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-custom-yellow text-white">
                        {project.year}
                      </Badge>
                    </div>

                    {/* Overlay Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <Badge variant="secondary" className="mb-2 bg-white/20 text-white">
                        {project.category}
                      </Badge>
                      <h3 className="text-xl font-bold">{project.title}</h3>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <p className="text-slate-600 mb-6 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <Button
                      asChild
                      variant="outline"
                      className="group-hover:bg-custom-yellow group-hover:text-white group-hover:border-custom-yellow transition-all duration-300 w-full"
                    >
                      <Link href="/contact">
                        Discuss Similar Project
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center bg-slate-900 rounded-2xl p-8 md:p-12 text-white"
          >
            <h3 className="text-3xl font-bold mb-4">
              Have a Project in Mind?
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help bring your construction project to life with our expertise and experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-custom-yellow hover:bg-custom-yellow-hover"
              >
                <Link href="/contact">
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-slate-900"
              >
                <Link href="/services">
                  View Our Services
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}



