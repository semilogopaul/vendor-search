"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  FileSpreadsheet,
  Search,
  Upload,
  Users,
  Database,
  Shield,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navbar */}
      <nav className="relative z-10 border-b border-[#a56c32]/20 bg-slate-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex justify-center items-center">
                <Image
                  src="/zbs logo.png"
                  alt="VendorSearch Logo"
                  width={150}
                  height={150}
                />
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a
                href="#features"
                className="text-slate-300 hover:text-[#a56c32] transition-colors"
              >
                Features
              </a>
              <a
                href="#about"
                className="text-slate-300 hover:text-[#a56c32] transition-colors"
              >
                About
              </a>
              <Link href="/search">
                <Button className="bg-[#a56c32] hover:bg-[#8b5a2a] text-white">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Streamline Your
              <span className="text-[#a56c32] block">Vendor Management</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Upload Excel files and instantly search through vendor data,
              products, personnel, and contact information. Powerful search
              capabilities at your fingertips.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link href="/search">
              <Button
                size="lg"
                className="bg-[#a56c32] hover:bg-[#8b5a2a] text-white px-8 py-4 text-lg"
              >
                <Upload className="w-5 h-5 mr-2" />
                Get Started
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-[#a56c32] text-[#a56c32] hover:bg-[#a56c32] hover:text-white px-8 py-4 text-lg"
            >
              <Search className="w-5 h-5 mr-2" />
              Learn More
            </Button>
          </div>

          {/* Feature Cards Preview */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="bg-slate-800/50 border-[#a56c32]/20 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Upload className="w-12 h-12 text-[#a56c32] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  Easy Upload
                </h3>
                <p className="text-slate-400">
                  Simply upload your Excel files and start searching immediately
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-[#a56c32]/20 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Search className="w-12 h-12 text-[#a56c32] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  Smart Search
                </h3>
                <p className="text-slate-400">
                  Search across vendors, products, personnel, emails, and
                  numbers
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-[#a56c32]/20 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Database className="w-12 h-12 text-[#a56c32] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  Instant Results
                </h3>
                <p className="text-slate-400">
                  Get comprehensive results with all related information
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="relative z-10 py-20 px-4 bg-slate-900/50"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Powerful Features
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Everything you need to manage and search your vendor data
              efficiently
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#a56c32]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileSpreadsheet className="w-8 h-8 text-[#a56c32]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Excel Integration
              </h3>
              <p className="text-slate-400">
                Native support for Excel files with automatic data parsing and
                structure recognition
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#a56c32]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-[#a56c32]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Multi-Field Search
              </h3>
              <p className="text-slate-400">
                Search across vendors, products, personnel, email addresses, and
                phone numbers
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#a56c32]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-[#a56c32]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Secure & Fast
              </h3>
              <p className="text-slate-400">
                Client-side processing ensures your data stays secure while
                providing instant results
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#a56c32]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-[#a56c32]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Advanced Filtering
              </h3>
              <p className="text-slate-400">
                Intelligent search algorithms that find exactly what you're
                looking for
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#a56c32]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="w-8 h-8 text-[#a56c32]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Structured Data
              </h3>
              <p className="text-slate-400">
                Organized display of vendor information with clear
                categorization
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#a56c32]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-[#a56c32]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Easy Setup
              </h3>
              <p className="text-slate-400">
                No complex configuration required - just upload and start
                searching
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About/CTA Section */}
      <section id="about" className="relative z-10 py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Transform how you manage vendor data. Upload your Excel files and
            experience the power of instant, comprehensive search capabilities.
          </p>

          <div className="bg-slate-800/50 border border-[#a56c32]/20 rounded-lg p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-semibold text-white mb-4">
              How It Works
            </h3>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#a56c32] rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold text-lg">
                  1
                </div>
                <h4 className="font-semibold text-white mb-2">Upload</h4>
                <p className="text-slate-400 text-sm">
                  Upload your Excel file with vendor data
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#a56c32] rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold text-lg">
                  2
                </div>
                <h4 className="font-semibold text-white mb-2">Search</h4>
                <p className="text-slate-400 text-sm">
                  Use our powerful search to find what you need
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#a56c32] rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold text-lg">
                  3
                </div>
                <h4 className="font-semibold text-white mb-2">Results</h4>
                <p className="text-slate-400 text-sm">
                  Get instant, comprehensive results
                </p>
              </div>
            </div>

            <Link href="/search">
              <Button
                size="lg"
                className="bg-[#a56c32] hover:bg-[#8b5a2a] text-white px-8 py-4 text-lg"
              >
                Start Searching Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#a56c32]/20 bg-slate-900/80 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4"></div>
          <p className="text-slate-400">
            © 2025 Zeta-Web. Streamline your vendor management.
          </p>
        </div>
      </footer>
    </div>
  );
}
