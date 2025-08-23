"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, MapPin, PoundSterling, X, ChevronDown } from "lucide-react";

export default function ProjectsPage() {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [animatingProject, setAnimatingProject] = useState<string | null>(null);

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

  const toggleExpanded = (projectId: string) => {
    const wasExpanded = expandedProject === projectId;
    
    // Start animation state
    setAnimatingProject(projectId);
    
    // Hide content immediately, then change state after brief delay
    setTimeout(() => {
      setExpandedProject(wasExpanded ? null : projectId);
    }, 100);
    
    // Show content again after animation completes
    setTimeout(() => {
      setAnimatingProject(null);
      
      // Scroll to the project card
      const element = document.getElementById(`project-${projectId}`);
      if (element) {
        const headerHeight = 120; // Account for fixed header height (nav bar + top bar)
        const elementPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    }, 600);
  };
  const projects = [
    {
      id: 1,
      title: "New Car Park - Saint Gobain",
      client: "Saint Gobain",
      value: "£1,000,000.00",
      category: "Civil Engineering",
      description: "We are pleased to announce the successful installation of a new tarmac car park for one of our long-standing customers. This upgrade includes dedicated EV bays, ensuring convenience and sustainability for all users. Thank you for trusting us with your parking needs.",
      image: "/images/saint-gobain-carpark.jpg",
      year: "2024",
      featured: true
    },
    {
      id: 2,
      title: "Multiple Major Civils Project's including Screenhouse, Crusher, Conveyor and Bridge Abutment Works",
      client: "Tarmac",
      value: "£500,000.00",
      category: "Civil Engineering",
      description: "Our large-scale civil works project presented a range of complex engineering challenges. From navigating ducting routes and constructing foundation base slabs on difficult terrain and cliff edges, to installing conveyor bases and ensuring stable access with stoned pathways, we tackled it all. Our team expertly managed the intricacies of piling mats and crane pads, demonstrating our commitment to overcoming obstacles in pursuit of excellence.",
      image: "/images/tarmac-major-civils.jpg",
      year: "2024",
      featured: true
    },
    {
      id: 3,
      title: "Site-wide civil engineering contracts for pumphouse bases, generator bases, fire main civils, tank repairs in confined spaces, landscaping, paving & surfacing works",
      client: "Exolum",
      value: "£380,000.00",
      category: "Civil Engineering",
      description: "From minor works to major infrastructure developments, we demonstrated professionalism and keen attention to detail to shine through in every initiative, including impressive site-wide terminal surfacing and significant electrical upgrades. With project values spanning from £1,000 to £500,000, for this customer we have made a remarkable impact with over £3 million spent in just the past year. The feedback from Contract and Project Managers is nothing short of fantastic, praising their top-notch safety measures, effective project management, and exceptional workmanship, all while building a strong relationship based on trust and reliability!",
      image: "/images/exolum-site-wide.jpg",
      year: "2024",
      featured: false
    },
    {
      id: 4,
      title: "Tower works",
      client: "Omexom",
      value: "£100,000.00",
      category: "Specialised Works",
      description: "Working at numerous locations nationwide to install and remove overhead line tower foundations and create access. We also provide essential vegetation clearance services to facilitate smooth operations.",
      image: "/images/omexom-tower-works.jpg",
      year: "2024",
      featured: false
    }
  ];

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <div className="ios-fix-alt flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/saint-gobain-carpark.jpg"
            alt="Our Projects"
            fill
            sizes="100vw"
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
              Our <span className="text-custom-yellow">Projects</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              From small-scale works to multi-million pound developments, our experienced team completes projects of all sizes to the highest standard
            </p>
          </motion.div>
        </div>
      </section>



      {/* Featured Projects */}
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
              Showcasing our expertise across major infrastructure and development projects
            </p>
          </motion.div>

          {/* Large Featured Projects */}
          <div className="space-y-16 mb-20">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="space-y-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                      {project.title}
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-4 text-slate-600">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-custom-yellow" />
                        <span className="font-medium">{project.client}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <PoundSterling className="h-4 w-4 text-custom-yellow" />
                        <span className="font-bold text-slate-900">{project.value}</span>
                      </div>
                    </div>
                    
                    <p className="text-lg text-slate-600 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <Button
                      asChild
                      className="bg-custom-yellow hover:bg-custom-yellow-hover text-slate-900 font-semibold"
                    >
                      <Link href="/contact">
                        Discuss Similar Project
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
                
                <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Project Range Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-grey-50 rounded-2xl p-8 md:p-12 mb-16"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-slate-900 mb-4">
                Projects of <span className="text-custom-yellow">All Sizes</span>
              </h3>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Whether you need a small repair job or a multi-million pound development, 
                we have the expertise and equipment to deliver exceptional results.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                {/* Sun-like animated circle with rays */}
                <div className="relative w-20 h-20 mx-auto mb-4">
                  {/* Sun rays */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Long rays */}
                    <motion.div
                      className="absolute w-1 h-8 bg-custom-yellow/30 rounded-full"
                      style={{ top: '-16px', left: '50%', transformOrigin: '50% 48px' }}
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                      className="absolute w-1 h-8 bg-custom-yellow/30 rounded-full"
                      style={{ top: '-16px', left: '50%', transformOrigin: '50% 48px', transform: 'rotate(45deg)' }}
                      animate={{ rotate: [45, 405] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                      className="absolute w-1 h-8 bg-custom-yellow/30 rounded-full"
                      style={{ top: '-16px', left: '50%', transformOrigin: '50% 48px', transform: 'rotate(90deg)' }}
                      animate={{ rotate: [90, 450] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                      className="absolute w-1 h-8 bg-custom-yellow/30 rounded-full"
                      style={{ top: '-16px', left: '50%', transformOrigin: '50% 48px', transform: 'rotate(135deg)' }}
                      animate={{ rotate: [135, 495] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                      className="absolute w-1 h-8 bg-custom-yellow/30 rounded-full"
                      style={{ top: '-16px', left: '50%', transformOrigin: '50% 48px', transform: 'rotate(180deg)' }}
                      animate={{ rotate: [180, 540] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                      className="absolute w-1 h-8 bg-custom-yellow/30 rounded-full"
                      style={{ top: '-16px', left: '50%', transformOrigin: '50% 48px', transform: 'rotate(225deg)' }}
                      animate={{ rotate: [225, 585] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                      className="absolute w-1 h-8 bg-custom-yellow/30 rounded-full"
                      style={{ top: '-16px', left: '50%', transformOrigin: '50% 48px', transform: 'rotate(270deg)' }}
                      animate={{ rotate: [270, 630] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                      className="absolute w-1 h-8 bg-custom-yellow/30 rounded-full"
                      style={{ top: '-16px', left: '50%', transformOrigin: '50% 48px', transform: 'rotate(315deg)' }}
                      animate={{ rotate: [315, 675] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                  
                  {/* Main sun circle with gentle pulse */}
                  <motion.div
                    className="w-20 h-20 bg-custom-yellow rounded-full flex items-center justify-center relative z-10"
                    animate={{ 
                      scale: [1, 1.05, 1],
                      boxShadow: [
                        '0 0 0 0 rgba(252, 211, 77, 0.4)',
                        '0 0 0 10px rgba(252, 211, 77, 0.1)',
                        '0 0 0 0 rgba(252, 211, 77, 0)'
                      ]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  >
                    <span className="text-xl font-bold text-slate-900">£1K+</span>
                  </motion.div>
                </div>
                <motion.h3 
                  className="text-lg font-semibold text-slate-900 mb-2"
                  animate={{
                    textShadow: [
                      "0 0 0px rgba(241, 214, 74, 0)",
                      "0 0 20px rgba(241, 214, 74, 0.8)",
                      "0 0 0px rgba(241, 214, 74, 0)"
                    ]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "easeInOut"
                  }}
                >
                  Small Projects
                </motion.h3>
                <p className="text-slate-600">Minor repairs, maintenance work, and small-scale improvements</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-custom-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-lg font-bold text-slate-900">£100K+</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Medium Projects</h3>
                <p className="text-slate-600">Commercial developments, infrastructure upgrades, and specialised works</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-custom-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-slate-900">£1M+</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Major Projects</h3>
                <p className="text-slate-600">Large-scale infrastructure, major civil engineering, and complex developments</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Recent Projects - Expandable Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">
              Recent <span className="text-custom-yellow">Projects</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {otherProjects.map((project) => {
                const isExpanded = expandedProject === project.id.toString();
                const isAnimating = animatingProject === project.id.toString();
                const showContent = !isAnimating;
                return (
                  <motion.div
                    key={project.id}
                    id={`project-${project.id}`}
                    className={`${isExpanded ? 'md:col-span-2' : ''}`}
                    layout
                    initial={false}
                    animate={{
                      scale: isExpanded ? 1.02 : 1,
                    }}
                    transition={{ 
                      duration: 0.5, 
                      ease: "easeInOut",
                      layout: { duration: 0.5, ease: "easeInOut" }
                    }}
                  >
                    <motion.div
                      layout
                      className="group overflow-hidden hover:shadow-2xl bg-white border-0 shadow-lg hover:shadow-custom-yellow/10 cursor-pointer h-full rounded-xl"
                      animate={{
                        boxShadow: isExpanded 
                          ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)" 
                          : "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                      }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      {showContent ? (
                        isExpanded ? (
                          // Expanded Layout - Text wrap around image
                          <div 
                            className="p-8 lg:p-10 cursor-pointer relative"
                            onClick={() => toggleExpanded(project.id.toString())}
                          >
                            {/* Close Button */}
                            <button
                              className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-600 hover:bg-white/20 transition-colors z-10"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleExpanded(project.id.toString());
                              }}
                            >
                              <X className="h-5 w-5" />
                            </button>

                            {/* Project Title */}
                            <div className="mb-6">
                              <h4 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                                {project.title}
                              </h4>
                              <div className="flex flex-wrap items-center gap-4 text-slate-600">
                                <div className="flex items-center space-x-2">
                                  <MapPin className="h-4 w-4 text-custom-yellow" />
                                  <span className="font-medium">{project.client}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <PoundSterling className="h-4 w-4 text-custom-yellow" />
                                  <span className="font-bold text-slate-900">{project.value}</span>
                                </div>
                                <Badge className="bg-custom-yellow text-slate-900 font-semibold">
                                  {project.category}
                                </Badge>
                              </div>
                            </div>

                            {/* Image and Description Section */}
                            <div className="mb-8">
                              {/* Image floated left on desktop, stacked on mobile */}
                              <div className="float-none lg:float-left lg:w-80 lg:h-60 xl:w-96 xl:h-72 lg:mr-8 lg:mb-4 mb-6">
                                <Image
                                  src={project.image}
                                  alt={project.title}
                                  width={400}
                                  height={300}
                                  className="w-full h-64 lg:h-full object-cover rounded-lg shadow-lg"
                                />
                              </div>

                              {/* Description text that wraps around image */}
                              <p className="text-base lg:text-lg text-slate-600 leading-relaxed">
                                {project.description}
                              </p>
                            </div>

                            {/* Clear float and add CTA section */}
                            <div className="clear-both">
                              <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                  asChild
                                  className="bg-custom-yellow hover:bg-custom-yellow-hover text-slate-900 font-semibold"
                                >
                                  <Link href="/contact">
                                    Discuss Similar Project
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                  </Link>
                                </Button>
                                <Button
                                  asChild
                                  variant="outline"
                                  className="border-slate-300 hover:bg-slate-50"
                                >
                                  <Link href="/services">
                                    View Our Services
                                  </Link>
                                </Button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          // Collapsed Layout - Entire card clickable
                          <div 
                            onClick={() => toggleExpanded(project.id.toString())}
                            className="cursor-pointer h-full flex flex-col"
                          >
                            {/* Image Section - Collapsed */}
                            <div className="relative overflow-hidden h-64">
                              <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                              
                              {/* Value Badge */}
                              <div className="absolute top-4 right-4">
                                <Badge className="bg-custom-yellow text-slate-900 font-bold">
                                  {project.value}
                                </Badge>
                              </div>

                              {/* Project Title Overlay */}
                              <div className="absolute bottom-0 left-0 right-0 p-6">
                                <Badge variant="secondary" className="mb-2 bg-white/20 text-white">
                                  {project.category}
                                </Badge>
                                <h4 className="text-xl font-bold text-white mb-2 group-hover:text-custom-yellow transition-colors duration-300">
                                  {project.title}
                                </h4>
                                <p className="text-sm text-gray-300">{project.client}</p>
                              </div>
                            </div>

                            {/* Content Section - Collapsed */}
                            <CardContent className="p-6 flex flex-col justify-between flex-1">
                              <div>
                                <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                                  {project.description.length > 150 
                                    ? `${project.description.substring(0, 150)}...` 
                                    : project.description}
                                </p>
                              </div>
                              
                              {/* CTA Button */}
                              <div className="pt-4">
                                <Button
                                  variant="outline"
                                  className="w-full group-hover:bg-custom-yellow group-hover:text-slate-900 group-hover:border-custom-yellow transition-all duration-300 pointer-events-none"
                                >
                                  <span>Show More</span>
                                  <ChevronDown className="ml-2 h-4 w-4 transition-transform duration-300" />
                                </Button>
                              </div>
                            </CardContent>
                          </div>
                        )
                      ) : (
                        // Empty card during animation - just shows the card shape
                        <div className="h-64 lg:h-80 xl:h-96"></div>
                      )}
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>




        </div>
      </section>
    </div>
  );
}