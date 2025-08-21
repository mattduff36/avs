"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { siteData } from "@/data/site-data";

export default function ContactPage() {
  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone",
      details: siteData.contact.phone,
      link: `tel:${siteData.contact.phone}`
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      details: siteData.contact.emails[0],
      link: `mailto:${siteData.contact.emails[0]}`
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Address",
      details: "Vivienne House, Racecourse Road Southwell, Nottinghamshire, NG25 0TX",
      link: "#"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Availability",
      details: "24/7 Emergency Service",
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen">
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
              Ready to start your project? Get in touch with our expert team for 
              a free consultation and professional service.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information Cards */}
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
              Get In <span className="text-custom-yellow">Touch</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Multiple ways to reach us for your convenience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:border-custom-yellow-light group h-full">
                  <CardContent className="p-0 text-center">
                    <div className="w-16 h-16 bg-custom-yellow rounded-full flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform">
                      {info.icon}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {info.title}
                    </h3>
                    <a
                      href={info.link}
                      className="text-slate-600 hover:text-custom-yellow transition-colors"
                    >
                      {info.details}
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="p-8">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-2xl text-slate-900">
                    Send Us a Message
                  </CardTitle>
                  <p className="text-slate-600">
                    Fill out the form below and we&apos;ll get back to you within 24 hours.
                  </p>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          placeholder="John"
                          className="focus:border-custom-yellow"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          placeholder="Doe"
                          className="focus:border-custom-yellow"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        className="focus:border-custom-yellow"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="01636 812227"
                        className="focus:border-custom-yellow"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="service">Service Required</Label>
                      <select
                        id="service"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-custom-yellow"
                      >
                        <option value="">Select a service</option>
                        {siteData.services.map((service) => (
                          <option key={service.id} value={service.id}>
                            {service.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your project requirements..."
                        rows={5}
                        className="focus:border-custom-yellow"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-custom-yellow hover:bg-custom-yellow-hover text-slate-900 font-semibold text-lg py-6"
                    >
                      Send Message
                      <Send className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Company Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Why Choose A&V Squires?
                </h3>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  {siteData.company.description}
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-custom-yellow rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-slate-700">Decades of proven experience</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-custom-yellow rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-slate-700">Nationwide service coverage</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-custom-yellow rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-slate-700">24/7 emergency service available</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-custom-yellow rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-slate-700">Expert team of professionals</span>
                  </div>
                </div>
              </div>

              {/* Quick Contact */}
              <Card className="p-6 bg-slate-900 text-white">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-xl">Need Immediate Assistance?</CardTitle>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                  <p className="text-gray-300 mb-6">
                    For urgent inquiries or emergency services, contact us directly:
                  </p>
                  <div className="space-y-4">
                    <a
                      href={`tel:${siteData.contact.phone}`}
                      className="flex items-center space-x-3 text-custom-yellow text-custom-yellow-hover-400 transition-colors"
                    >
                      <Phone className="h-5 w-5" />
                      <span className="text-lg font-semibold">{siteData.contact.phone}</span>
                    </a>
                    <a
                      href={`mailto:${siteData.contact.emails[0]}`}
                      className="flex items-center space-x-3 text-custom-yellow text-custom-yellow-hover-400 transition-colors"
                    >
                      <Mail className="h-5 w-5" />
                      <span>{siteData.contact.emails[0]}</span>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}



