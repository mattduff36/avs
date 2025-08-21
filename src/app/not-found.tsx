import Link from "next/link";
import { Home, Search, Phone } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-grey-50">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto">
          {/* 404 Graphic */}
          <div className="mb-8">
            <div className="text-9xl font-bold text-custom-yellow mb-4">404</div>
            <div className="w-24 h-1 bg-custom-yellow mx-auto mb-8"></div>
          </div>

          {/* Error Message */}
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Page Not Found
          </h1>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. 
            It might have been moved, deleted, or you entered the wrong URL.
          </p>

          {/* Action Buttons */}
          <div className="space-y-4 mb-12">
            <div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/"
                className="inline-flex items-center px-8 py-4 bg-custom-yellow hover:bg-custom-yellow-hover text-slate-900 font-semibold rounded-lg transition-colors duration-300"
              >
                <Home className="mr-2 h-5 w-5" />
                Back to Home
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center px-8 py-4 border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold rounded-lg transition-colors duration-300"
              >
                <Search className="mr-2 h-5 w-5" />
                Browse Services
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="border-t border-slate-200 pt-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Popular Pages
            </h3>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/about" className="text-custom-yellow hover:text-custom-yellow-hover transition-colors">
                About Us
              </Link>
              <Link href="/services" className="text-custom-yellow hover:text-custom-yellow-hover transition-colors">
                Our Services  
              </Link>
              <Link href="/projects" className="text-custom-yellow hover:text-custom-yellow-hover transition-colors">
                Projects
              </Link>
              <Link href="/machines" className="text-custom-yellow hover:text-custom-yellow-hover transition-colors">
                Our Machines
              </Link>
              <Link href="/contact" className="text-custom-yellow hover:text-custom-yellow-hover transition-colors">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-8 p-6 bg-white rounded-lg shadow-sm border border-slate-200">
            <p className="text-slate-600 mb-3">
              Need help? Get in touch with our team:
            </p>
            <div className="flex items-center justify-center space-x-4">
              <a 
                href="tel:01636812227"
                className="flex items-center text-custom-yellow hover:text-custom-yellow-hover transition-colors"
              >
                <Phone className="h-4 w-4 mr-2" />
                01636 812227
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}