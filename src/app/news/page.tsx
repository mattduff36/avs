"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

export default function NewsPage() {
  const newsItems = [
    {
      id: 1,
      title: "A&V Squires Expands Fleet with Latest Equipment",
      excerpt: "Continuing our commitment to excellence with significant investment in modern machinery and technology for enhanced project delivery.",
      date: "2024-01-15",
      category: "Company News",
      image: "/images/plant-hire-new.jpg",
      featured: true
    },
    {
      id: 2,
      title: "New HIAB Equipment Added to Fleet",
      excerpt: "Latest addition of modern HIAB cranes enhances our lifting capabilities for complex projects.",
      date: "2023-12-10",
      category: "Equipment",
      image: "/images/hiab-hire.jpg",
      featured: false
    },
    {
      id: 3,
      title: "Major Highway Project Completion",
      excerpt: "Successfully completed major infrastructure project in the East Midlands, delivered on time and within budget.",
      date: "2023-11-22",
      category: "Projects",
      image: "/images/civil-engineering.jpg",
      featured: false
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/civil-engineering.jpg"
            alt="Latest News"
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
              Latest <span className="text-custom-yellow">News</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Stay up to date with our latest projects, equipment, and company developments
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Article */}
      {newsItems.filter(item => item.featured).map((article) => (
        <section key={article.id} className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div className="order-2 lg:order-1">
                <Badge className="bg-custom-yellow text-white mb-4">
                  Featured Story
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  {article.title}
                </h2>
                <div className="flex items-center text-slate-600 mb-6">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{formatDate(article.date)}</span>
                  <Badge variant="outline" className="ml-4">
                    {article.category}
                  </Badge>
                </div>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  {article.excerpt}
                </p>
                <Button
                  asChild
                  size="lg"
                  className="bg-custom-yellow hover:bg-custom-yellow-hover"
                >
                  <Link href="/contact">
                    Learn More About Our Journey
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
              <div className="order-1 lg:order-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="relative h-96 rounded-lg overflow-hidden"
                >
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      ))}

      {/* News Grid */}
      <section className="py-20 bg-grey-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Recent <span className="text-custom-yellow">Updates</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Keep up with our latest developments and achievements
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {newsItems.filter(item => !item.featured).map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-custom-yellow text-white">
                        {article.category}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center text-slate-600 mb-3">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">{formatDate(article.date)}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-custom-yellow transition-colors">
                      {article.title}
                    </h3>
                    
                    <p className="text-slate-600 mb-6 leading-relaxed">
                      {article.excerpt}
                    </p>
                    
                    <Button
                      asChild
                      variant="outline"
                      className="group-hover:bg-custom-yellow group-hover:text-white group-hover:border-custom-yellow transition-all duration-300"
                    >
                      <Link href="/contact">
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
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
              Stay Connected
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Want to stay updated with our latest news, projects, and developments? 
              Get in touch to learn more about our ongoing work.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-custom-yellow hover:bg-custom-yellow-hover"
              >
                <Link href="/contact">
                  Contact Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-slate-900"
              >
                <Link href="/about">
                  Learn About Us
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}



