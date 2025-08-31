"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import ForSaleBadge from "@/components/ForSaleBadge";

interface Machine {
  id: number;
  title: string;
  description: string;
  image: string;
  features: string[];
  side: 'left' | 'right';
  forSale: boolean;
}

export default function MachinesForSaleSection() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMachinesForSale, setHasMachinesForSale] = useState(false);

  useEffect(() => {
    const fetchMachinesForSale = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/admin/machines?forSale=true');
        
        if (response.ok) {
          const data = await response.json();
          const forSaleMachines = data.data || [];
          setMachines(forSaleMachines);
          setHasMachinesForSale(forSaleMachines.length > 0);
        } else {
          console.warn('Failed to fetch machines for sale');
          setHasMachinesForSale(false);
        }
      } catch (error) {
        console.warn('Error fetching machines for sale:', error);
        setHasMachinesForSale(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMachinesForSale();
  }, []);

  // Don't render if no machines are for sale
  if (!hasMachinesForSale || isLoading) {
    return null;
  }

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-custom-yellow rounded-2xl mb-6">
            <Tag className="h-8 w-8 text-slate-900" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            <span className="text-custom-yellow">Machines</span> For Sale
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Discover our available equipment for purchase. These machines are ready for immediate delivery 
            and come with our full support and warranty.
          </p>
        </motion.div>

        {/* Machines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {machines.map((machine, index) => (
            <motion.div
              key={machine.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={machine.image}
                    alt={machine.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* For Sale Badge */}
                  <ForSaleBadge />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Machine title overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{machine.title}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-slate-600 mb-4 line-clamp-3">
                    {machine.description}
                  </p>
                  
                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {machine.features.slice(0, 2).map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-custom-yellow rounded-full"></div>
                        <span className="text-sm text-slate-700">{feature}</span>
                      </div>
                    ))}
                    {machine.features.length > 2 && (
                      <div className="text-sm text-slate-500">
                        +{machine.features.length - 2} more features
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <Button
                    asChild
                    className="w-full bg-custom-yellow hover:bg-custom-yellow-hover text-slate-900 font-semibold"
                  >
                    <Link href="/machines">
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Interested in Our Equipment?
            </h3>
            <p className="text-slate-600 mb-6">
              Contact us today to discuss pricing, availability, and delivery options for any of our machines.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-custom-yellow hover:bg-custom-yellow-hover text-slate-900 font-semibold"
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
                className="border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                <Link href="/machines">
                  View All Machines
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
