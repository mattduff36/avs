"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Users, Truck, Hammer } from "lucide-react";
import { siteData } from "@/data/site-data";
import { HeroSlideshow } from "@/components/HeroSlideshow";

export function HeroSection() {
  // Function to get icon component based on icon name
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Award':
        return <Award className="h-8 w-8" />;
      case 'Users':
        return <Users className="h-8 w-8" />;
      case 'Truck':
        return <Truck className="h-8 w-8" />;
      case 'Hammer':
        return <Hammer className="h-8 w-8" />;
      default:
        return null;
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Static Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/transport-haulage.jpg"
          alt="A&V Squires Transport Fleet"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        
        {/* Very Opaque White Overlay - Only 10% transparent */}
        <div className="absolute inset-0 bg-white/90 backdrop-blur-[0.5px]"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-10 w-72 h-72 bg-custom-yellow/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-slate-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-custom-yellow/5 to-slate-200/10 rounded-full blur-3xl"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(241,245,249,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(241,245,249,0.3)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>

                           <div className="relative z-10 container mx-auto px-8 md:px-16 pt-10 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_auto_3fr] items-center min-h-fit lg:min-h-[80vh] max-w-7xl mx-auto gap-6 lg:gap-8">
           <div className="lg:col-start-1 lg:col-span-1 col-span-full">
          
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >


            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-4"
            >
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold text-slate-900 leading-tight">
                <span className="block text-custom-yellow">A&V SQUIRES</span>
                <span className="block text-3xl md:text-4xl xl:text-4xl">Plant Company LTD</span>
              </h1>
              
              <div className="flex items-center gap-2 mt-6">
                <div className="h-1 w-12 bg-custom-yellow rounded-full"></div>
                <p className="text-lg font-medium text-slate-600">Plant Hire & Civil Engineering</p>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-slate-600 leading-relaxed max-w-lg"
            >
              {siteData.company.description}
            </motion.p>



                         {/* CTA Button */}
             <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.6 }}
               className="pt-4"
             >
               <Button
                 asChild
                 size="lg"
                 className="bg-custom-yellow hover:bg-custom-yellow-hover text-slate-900 font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
               >
                 <Link href="/services">
                   Explore Our Services
                   <ArrowRight className="ml-2 h-5 w-5" />
                 </Link>
               </Button>
             </motion.div>
          </motion.div>

          </div>
          
          {/* Right Column - Visual Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative lg:col-start-3 hidden lg:block"
          >
            {/* Main Image - Slideshow */}
            <div className="relative group">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl transform rotate-1 lg:rotate-2 transition-transform duration-500">
                <HeroSlideshow />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>

              {/* Experience Badge - Bottom Right */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -bottom-6 -right-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"
              >
                <Image
                  src="/images/50-years-badge.png"
                  alt="50 Years Experience"
                  width={100}
                  height={130}
                  className="drop-shadow-lg"
                  style={{ height: 'auto' }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-20 md:mt-10 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 shadow-lg p-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {siteData.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                className="text-center"
              >
                <div className="bg-custom-yellow text-[#45575B] text-lg md:text-xl font-bold mb-2 px-3 py-1.5 rounded-lg inline-flex items-center justify-center gap-2">
                  {getIconComponent(stat.icon)}
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-slate-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>




    </section>
  );
}



