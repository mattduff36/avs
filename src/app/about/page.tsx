"use client";

import { motion } from "framer-motion";
import Image from "next/image";



import { siteData } from "@/data/site-data";

export default function AboutPage() {

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
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 text-center">
                <span className="text-custom-yellow">ESTABLISHED SINCE 1971</span>
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Today, A&V Squires Plant Co. Ltd has over 75 employees and is one of the leading civil engineering, contract earth moving and plant hire companies in the East Midlands. We cover Nottinghamshire, Derbyshire, Leicestershire, Lincolnshire and Yorkshire but also operate on a national scale.
              </p>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                In 1971 Doug and Vivienne Squires first established A&V Squires as a plant hire company in Southwell. It has been a family run business with a strong tradition of excellence.
              </p>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                In the early 1990s management of the company was gradually passed over to Doug and Vivienne&apos;s two sons Philip and Robert. They both played a major role in the company&apos;s relocation to new purpose-built premises in Southwell in 2001, complete with offices and a workshop.
              </p>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                It was after this move that Doug then handed complete control to his sons. Working together, they ensured that the company continued to expand and grow to become one of the largest plant hire and earth moving contractors in the East Midlands. Civil engineering was also added to the services offered and is an area of specialism that has gone from strength-to-strength over the past fifteen years, complementing the plant side of the business.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                After the sad passing of Philip in February 2009, Robert took sole responsibility for the company. He is assisted by a highly-qualified and experienced team and they continue to drive the company forward.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Industry Accreditations Section */}
      <section className="py-20 bg-grey-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Industry <span className="text-custom-yellow">Accreditations</span>
              </h2>
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


    </div>
  );
}



