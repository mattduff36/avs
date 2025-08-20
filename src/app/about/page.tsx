"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users, Award, Clock } from "lucide-react";
import { siteData } from "@/data/site-data";

export default function AboutPage() {
  const values = [
    {
      icon: <CheckCircle className="h-8 w-8 text-custom-yellow" />,
      title: "Quality Assurance",
      description: "We maintain the highest standards in all our projects, ensuring exceptional results every time."
    },
    {
      icon: <Users className="h-8 w-8 text-custom-yellow" />,
      title: "Expert Team",
      description: "Our skilled professionals bring decades of experience to every project we undertake."
    },
    {
      icon: <Award className="h-8 w-8 text-custom-yellow" />,
      title: "Industry Recognition",
      description: "Recognized as one of the leading companies in the East Midlands construction sector."
    },
    {
      icon: <Clock className="h-8 w-8 text-custom-yellow" />,
      title: "Reliable Service",
      description: "24/7 availability and commitment to meeting project deadlines without compromise."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/civil-engineering.jpg"
            alt="About A&V Squires"
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
              {siteData.company.established} of Excellence
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About <span className="text-custom-yellow">A&V Squires</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              {siteData.company.tagline}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                <span className="text-custom-yellow">ESTABLISHED SINCE 1971</span>
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Today, A & V Squires Plant Co. Ltd has over 75 employees and is one of the leading civil engineering, contract earth moving and plant hire companies in the East Midlands. We cover Nottinghamshire, Derbyshire, Leicestershire, Lincolnshire and Yorkshire but also operate on a national scale.
              </p>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                In 1971 Doug and Vivienne Squires first established A & V Squires as a plant hire company in Southwell. It has been a family run business for over fifty years.
              </p>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                In the early 1990s management of the company was gradually passed over to Doug and Vivienne's two sons Philip and Robert. They both played a major role in the company's relocation to new purpose-built premises in Southwell in 2001, complete with offices and a workshop.
              </p>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                It was after this move that Doug then handed complete control to his sons. Working together, they ensured that the company continued to expand and grow to become one of the largest plant hire and earth moving contractors in the East Midlands. Civil engineering was also added to the services offered and is an area of specialism that has gone from strength-to-strength over the past fifteen years, complementing the plant side of the business.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                After the sad passing of Philip in February 2009, Robert took sole responsibility for the company. He is assisted by a highly-qualified and experienced team and they continue to drive the company forward.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Image
                src="/images/50-years-badge.png"
                alt="50 Years Experience"
                width={400}
                height={500}
                className="mx-auto drop-shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-custom-yellow">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Achievements
            </h2>
            <p className="text-xl text-custom-yellow-light">
              Numbers that speak for our excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {siteData.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center text-white"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-custom-yellow-light">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
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
              Our <span className="text-custom-yellow">Values</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-0 text-center">
                    <div className="mb-4 flex justify-center">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Work With Us?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Get in touch today to discuss your project requirements and see how 
              our {siteData.company.established} of experience can benefit you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-custom-yellow hover:bg-custom-yellow-hover text-slate-900 font-semibold rounded-lg transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.a>
              <motion.a
                href="/services"
                className="inline-flex items-center justify-center px-8 py-4 border border-white text-white hover:bg-white hover:text-slate-900 font-semibold rounded-lg transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Our Services
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}



