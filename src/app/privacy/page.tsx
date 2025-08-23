"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";

export default function PrivacyPolicyPage() {
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

  return (
    <div className="ios-fix-alt flex flex-col bg-gradient-to-br from-slate-50 to-white">
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
                Privacy <span className="text-custom-yellow">Policy</span>
              </h1>
              <p className="text-xl text-gray-300">
                How we collect, use, and protect your personal information
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
                    A&V Squires Plant Company Limited (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting and respecting your privacy. 
                    This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website 
                    or use our services.
                  </p>
                  <p className="text-slate-600">
                    Our registered office is at Vivienne House, Racecourse Road, Southwell, Nottinghamshire, NG25 0TX. 
                    We are registered in England and Wales under company number 01000918.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Information We Collect</h2>
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">2.1 Information you provide to us</h3>
                  <ul className="list-disc pl-6 text-slate-600 mb-4">
                    <li>Contact information (name, email address, phone number, postal address)</li>
                    <li>Company information (business name, job title)</li>
                    <li>Project details and requirements</li>
                    <li>Communication preferences</li>
                    <li>Payment information (processed securely through our payment providers)</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-slate-800 mb-3">2.2 Information we collect automatically</h3>
                  <ul className="list-disc pl-6 text-slate-600 mb-4">
                    <li>Technical information (IP address, browser type, operating system)</li>
                    <li>Usage data (pages visited, time spent on site, referring website)</li>
                    <li>Device information (device type, screen resolution)</li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">3. How We Use Your Information</h2>
                  <p className="text-slate-600 mb-4">We use your information for the following purposes:</p>
                  <ul className="list-disc pl-6 text-slate-600 mb-4">
                    <li>To provide our plant hire, civil engineering, and construction services</li>
                    <li>To communicate with you about projects, quotes, and services</li>
                    <li>To process payments and manage accounts</li>
                    <li>To send you relevant updates and marketing communications (with your consent)</li>
                    <li>To improve our website and services</li>
                    <li>To comply with legal obligations</li>
                    <li>To ensure the security of our systems and prevent fraud</li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Legal Basis for Processing</h2>
                  <p className="text-slate-600 mb-4">We process your personal data on the following legal grounds:</p>
                  <ul className="list-disc pl-6 text-slate-600 mb-4">
                    <li><strong>Contract:</strong> To fulfil our contractual obligations when you hire our services</li>
                    <li><strong>Legitimate Interest:</strong> To provide customer service and improve our business</li>
                    <li><strong>Consent:</strong> For marketing communications (you can withdraw consent at any time)</li>
                    <li><strong>Legal Obligation:</strong> To comply with applicable laws and regulations</li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Information Sharing</h2>
                  <p className="text-slate-600 mb-4">We may share your information with:</p>
                  <ul className="list-disc pl-6 text-slate-600 mb-4">
                    <li>Service providers who assist in our operations (IT, payment processing, delivery)</li>
                    <li>Professional advisors (lawyers, accountants) when required</li>
                    <li>Regulatory authorities when legally required</li>
                    <li>Business partners with your explicit consent</li>
                  </ul>
                  <p className="text-slate-600">
                    We do not sell, trade, or rent your personal information to third parties for marketing purposes.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Data Security</h2>
                  <p className="text-slate-600 mb-4">
                    We implement appropriate technical and organisational measures to protect your personal information against 
                    unauthorised access, alteration, disclosure, or destruction. These measures include:
                  </p>
                  <ul className="list-disc pl-6 text-slate-600 mb-4">
                    <li>Encryption of data in transit and at rest</li>
                    <li>Regular security assessments and updates</li>
                    <li>Access controls and authentication procedures</li>
                    <li>Staff training on data protection</li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Data Retention</h2>
                  <p className="text-slate-600 mb-4">
                    We retain your personal information for as long as necessary to fulfil the purposes outlined in this policy, 
                    including for the purposes of satisfying any legal, accounting, or reporting requirements.
                  </p>
                  <p className="text-slate-600">
                    Typically, we retain customer data for <span className="text-red-600 font-semibold">7 years</span> years after the last interaction, 
                    unless a longer retention period is required by law.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Your Rights</h2>
                  <p className="text-slate-600 mb-4">Under UK data protection law, you have the following rights:</p>
                  <ul className="list-disc pl-6 text-slate-600 mb-4">
                    <li><strong>Access:</strong> Request a copy of your personal data</li>
                    <li><strong>Rectification:</strong> Request correction of inaccurate data</li>
                    <li><strong>Erasure:</strong> Request deletion of your personal data</li>
                    <li><strong>Restriction:</strong> Request limitation of processing</li>
                    <li><strong>Portability:</strong> Request transfer of your data to another organisation</li>
                    <li><strong>Objection:</strong> Object to processing based on legitimate interests</li>
                    <li><strong>Withdraw Consent:</strong> Withdraw consent for marketing communications</li>
                  </ul>
                  <p className="text-slate-600">
                    To exercise these rights, please contact us using the details provided below.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Cookies</h2>
                  <p className="text-slate-600 mb-4">
                    Our website uses cookies to enhance your browsing experience. We use:
                  </p>
                  <ul className="list-disc pl-6 text-slate-600 mb-4">
                    <li><strong>Essential cookies:</strong> Required for website functionality</li>
                    <li><strong>Analytics cookies:</strong> To understand how visitors use our site</li>
                    <li><strong>Marketing cookies:</strong> To provide relevant content and advertisements</li>
                  </ul>
                  <p className="text-slate-600">
                    You can control cookie settings through your browser preferences. Please note that disabling certain cookies 
                    may affect website functionality.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Third-Party Links</h2>
                  <p className="text-slate-600">
                    Our website may contain links to third-party websites. We are not responsible for the privacy practices 
                    or content of these external sites. We encourage you to review their privacy policies before providing 
                    any personal information.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Changes to This Policy</h2>
                  <p className="text-slate-600">
                    We may update this Privacy Policy from time to time. We will notify you of any material changes by 
                    posting the new policy on our website and updating the &quot;Last Updated&quot; date below.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">12. Contact Us</h2>
                  <p className="text-slate-600 mb-4">
                    If you have any questions about this Privacy Policy or our data practices, please contact us:
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
                      Data Protection Officer: <span className="text-red-600 font-semibold">info@avsquires.co.uk</span>
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
