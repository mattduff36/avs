"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-[calc(100dvh-200px)] lg:min-h-[calc(100dvh-437px)] flex flex-col bg-gradient-to-br from-slate-50 to-white">
      {/* Header */}
      <section className="pt-20 pb-10 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Link 
                href="/"
                className="inline-flex items-center text-custom-yellow hover:text-custom-yellow-hover transition-colors mb-6"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Terms of <span className="text-custom-yellow">Service</span>
              </h1>
              <p className="text-xl text-gray-300">
                Terms and conditions for using our services and website
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="prose prose-lg max-w-none"
            >
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Introduction</h2>
                  <p className="text-slate-600 mb-4">
                    These Terms of Service (&quot;Terms&quot;) govern your use of the website and services provided by 
                    A&V Squires Plant Company Limited (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), a company registered in England and Wales.
                  </p>
                  <p className="text-slate-600">
                    Our registered office is at Vivienne House, Racecourse Road, Southwell, Nottinghamshire, NG25 0TX. 
                    We are registered in England and Wales under company number 01000918.
                  </p>
                  <p className="text-slate-600">
                    By accessing our website or using our services, you agree to be bound by these Terms. 
                    If you disagree with any part of these Terms, please do not use our services.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Services</h2>
                  <p className="text-slate-600 mb-4">
                    A&V Squires Plant Company Limited provides the following services:
                  </p>
                  <ul className="list-disc pl-6 text-slate-600 mb-4">
                    <li>Plant hire and equipment rental</li>
                    <li>Civil engineering and groundwork services</li>
                    <li>Contract earthmoving operations</li>
                    <li>Transport and haulage services</li>
                    <li>Aggregates supplies and delivery</li>
                    <li>Road sweeper hire</li>
                    <li>HIAB crane hire and lifting services</li>
                    <li>Grab hire and waste disposal</li>
                    <li>Workshop services and maintenance</li>
                  </ul>
                  <p className="text-slate-600">
                    All services are subject to availability and may be modified or discontinued at our discretion.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Website Use</h2>
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">3.1 Acceptable Use</h3>
                  <p className="text-slate-600 mb-4">
                    You may use our website for lawful purposes only. You agree not to:
                  </p>
                  <ul className="list-disc pl-6 text-slate-600 mb-4">
                    <li>Use the website in any way that violates applicable laws or regulations</li>
                    <li>Attempt to gain unauthorised access to our systems or networks</li>
                    <li>Interfere with or disrupt the website or servers</li>
                    <li>Use automated systems to access the website without permission</li>
                    <li>Transmit viruses, malware, or other harmful code</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-slate-800 mb-3">3.2 Intellectual Property</h3>
                  <p className="text-slate-600 mb-4">
                    All content on this website, including text, images, logos, and design, is owned by 
                    A&V Squires Plant Company Limited and is protected by copyright and other intellectual property laws.
                  </p>
                  <p className="text-slate-600">
                    You may not reproduce, distribute, or create derivative works without our written permission.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Service Agreements</h2>
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">4.1 Quotations and Orders</h3>
                  <p className="text-slate-600 mb-4">
                    All quotations are valid for <span className="text-red-600 font-semibold">30 days</span> days unless otherwise stated. 
                    Orders must be confirmed in writing and are subject to our acceptance.
                  </p>

                  <h3 className="text-xl font-semibold text-slate-800 mb-3">4.2 Payment Terms</h3>
                  <p className="text-slate-600 mb-4">
                    Payment terms are <span className="text-red-600 font-semibold">30 days from invoice</span> unless otherwise agreed in writing. We reserve the right to:
                  </p>
                  <ul className="list-disc pl-6 text-slate-600 mb-4">
                    <li>Require payment in advance for new customers</li>
                    <li>Charge interest on overdue accounts</li>
                    <li>Suspend services for non-payment</li>
                    <li>Recover costs for debt collection</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-slate-800 mb-3">4.3 Cancellation</h3>
                  <p className="text-slate-600 mb-4">
                    Cancellation policies vary by service type. Generally:
                  </p>
                  <ul className="list-disc pl-6 text-slate-600 mb-4">
                    <li>Plant hire: <span className="text-red-600 font-semibold">48 hours</span> notice required</li>
                    <li>Contract services: <span className="text-red-600 font-semibold">48 hours</span> notice required</li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Health and Safety</h2>
                  <p className="text-slate-600 mb-4">
                    We are committed to maintaining the highest standards of health and safety. All our:
                  </p>
                  <ul className="list-disc pl-6 text-slate-600 mb-4">
                    <li>Equipment is regularly maintained and certified</li>
                    <li>Operators are fully trained and qualified</li>
                    <li>Work is carried out in accordance with relevant regulations</li>
                    <li>Safety procedures are followed at all times</li>
                  </ul>
                  <p className="text-slate-600">
                    Clients must provide safe access to work areas and comply with our safety requirements.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Insurance and Liability</h2>
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">6.1 Our Insurance</h3>
                  <p className="text-slate-600 mb-4">
                    We maintain comprehensive insurance coverage including:
                  </p>
                  <ul className="list-disc pl-6 text-slate-600 mb-4">
                    <li>Public liability insurance</li>
                    <li>Employers&apos; liability insurance</li>
                    <li>Plant and equipment insurance</li>
                    <li>Professional indemnity insurance</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-slate-800 mb-3">6.2 Limitation of Liability</h3>
                  <p className="text-slate-600 mb-4">
                    Our liability is limited to the extent permitted by law. We are not liable for:
                  </p>
                  <ul className="list-disc pl-6 text-slate-600 mb-4">
                    <li>Indirect or consequential losses</li>
                    <li>Loss of profits or business interruption</li>
                    <li>Damage caused by client negligence</li>
                    <li>Force majeure events</li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Equipment and Plant Hire</h2>
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">7.1 Equipment Condition</h3>
                  <p className="text-slate-600 mb-4">
                    All equipment is provided in good working condition. Clients must:
                  </p>
                  <ul className="list-disc pl-6 text-slate-600 mb-4">
                    <li>Use equipment only for its intended purpose</li>
                    <li>Report any damage or faults immediately</li>
                    <li>Return equipment in the same condition</li>
                    <li>Follow operating instructions and safety guidelines</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-slate-800 mb-3">7.2 Hire Periods</h3>
                  <p className="text-slate-600 mb-4">
                    Hire periods are calculated from delivery to collection. Extended hire is subject to availability 
                    and may incur additional charges.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Environmental Compliance</h2>
                  <p className="text-slate-600 mb-4">
                    We are committed to environmental responsibility and comply with all relevant environmental regulations. 
                    Our practices include:
                  </p>
                  <ul className="list-disc pl-6 text-slate-600 mb-4">
                    <li>Proper waste disposal and recycling</li>
                    <li>Efficient fuel usage and emissions control</li>
                    <li>Use of environmentally friendly materials where possible</li>
                    <li>Compliance with environmental permits and regulations</li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Complaints and Disputes</h2>
                  <p className="text-slate-600 mb-4">
                    We aim to resolve any issues promptly and professionally. If you have a complaint:
                  </p>
                  <ol className="list-decimal pl-6 text-slate-600 mb-4">
                    <li>Contact us immediately to discuss the issue</li>
                    <li>Submit a written complaint if the issue is not resolved</li>
                    <li>We will investigate and respond within <span className="text-red-600 font-semibold">5 working days</span></li>
                    <li>If unresolved, we may refer to mediation or arbitration</li>
                  </ol>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Force Majeure</h2>
                  <p className="text-slate-600">
                    We are not liable for delays or failures caused by circumstances beyond our reasonable control, 
                    including but not limited to: adverse weather, strikes, government actions, or equipment breakdowns.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Changes to Terms</h2>
                  <p className="text-slate-600">
                    We may update these Terms from time to time. Changes will be posted on our website and will 
                    take effect immediately. Continued use of our services constitutes acceptance of the updated Terms.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">12. Governing Law</h2>
                  <p className="text-slate-600">
                    These Terms are governed by the laws of England and Wales. Any disputes will be subject to 
                    the exclusive jurisdiction of the courts of England and Wales.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">13. Contact Information</h2>
                  <p className="text-slate-600 mb-4">
                    For questions about these Terms or our services, please contact us:
                  </p>
                  <div className="bg-slate-50 rounded-lg p-6">
                    <p className="text-slate-700 mb-2">
                      <strong>A&V Squires Plant Company Limited</strong>
                    </p>
                    <p className="text-slate-600 mb-2">
                      Vivienne House, Racecourse Road<br />
                      Southwell, Nottinghamshire<br />
                      NG25 0TX
                    </p>
                    <p className="text-slate-600 mb-2">
                      Phone: 01636 812227
                    </p>
                    <p className="text-slate-600 mb-2">
                      Email: info@avsquires.co.uk
                    </p>
                    <p className="text-slate-600">
                      Office Hours: <span className="text-red-600 font-semibold">Monday-Friday 8:00 AM - 5:00 PM</span>
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-6">
                                     <p className="text-sm text-slate-500">
                     <strong>Last Updated:</strong> August 2025<br />
                     <strong>Version:</strong> 1.0
                   </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
