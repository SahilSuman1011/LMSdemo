import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  Phone,
  Calendar,
  Users,
  BarChart3,
  Sparkles,
  ChevronRight,
  Zap,
  Shield,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

const LandingPage = () => {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <div className="min-h-screen bg-background text-foreground">
      
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20 dark:opacity-10"></div>
        {/* Navbar */}
        <div
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/80 backdrop-blur-md shadow-md" : "bg-transparent"}`}
        >
          <div className="container mx-auto px-6 py-4">
            <nav className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="bg-primary w-8 h-8 rounded-md flex items-center justify-center">
                  <Sparkles className="text-primary-foreground h-5 w-5" />
                </div>
                <div className="text-foreground font-bold text-xl">
                  Lead Manager
                </div>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <a
                  href="#features"
                  className="text-foreground hover:text-primary transition-colors font-medium"
                >
                  Features
                </a>
                <a
                  href="#benefits"
                  className="text-foreground hover:text-primary transition-colors font-medium"
                >
                  Benefits
                </a>
                <a
                  href="#cta"
                  className="text-foreground hover:text-primary transition-colors font-medium"
                >
                  Get Started
                </a>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full bg-accent/50 hover:bg-accent transition-colors"
                    aria-label="Toggle theme"
                  >
                    {theme === "dark" ? (
                      <Sun className="h-5 w-5 text-yellow-400" />
                    ) : (
                      <Moon className="h-5 w-5 text-foreground" />
                    )}
                  </button>
                  <Link to="/login">
                    <Button
                      variant="outline"
                      className="bg-transparent text-foreground border-border hover:bg-accent hover:border-foreground"
                    >
                      Login
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <div className="flex md:hidden items-center space-x-4">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full bg-accent/50 hover:bg-accent transition-colors"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5 text-yellow-400" />
                  ) : (
                    <Moon className="h-5 w-5 text-foreground" />
                  )}
                </button>
                <button
                  onClick={toggleMenu}
                  className="p-2 rounded-md bg-accent/50 hover:bg-accent transition-colors"
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? (
                    <X className="h-6 w-6 text-foreground" />
                  ) : (
                    <Menu className="h-6 w-6 text-foreground" />
                  )}
                </button>
              </div>
            </nav>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border">
              <div className="container mx-auto px-6 py-4 space-y-4">
                <a
                  href="#features"
                  className="block text-foreground hover:text-primary transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Features
                </a>
                <a
                  href="#benefits"
                  className="block text-foreground hover:text-primary transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Benefits
                </a>
                <a
                  href="#cta"
                  className="block text-foreground hover:text-primary transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </a>
                <Link
                  to="/login"
                  className="block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button
                    variant="outline"
                    className="w-full bg-transparent text-foreground border-border hover:bg-accent hover:border-foreground"
                  >
                    Login
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="container mx-auto px-6 py-32 md:py-36 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-500 dark:from-primary dark:to-blue-400 animate-text-gradient bg-[length:200%]">
                Make Your Lead Management 10x Better
              </h1>
              <p className="text-muted-foreground text-lg mb-8 max-w-md">
                A powerful platform designed for sales teams to efficiently
                track, manage, and convert leads with ease.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/login">
                  <Button
                    size="lg"
                    className="bg-primary hover:opacity-90 border-0 text-primary-foreground flex items-center gap-2"
                  >
                    Get Started <ArrowRight size={16} />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent text-foreground border-border hover:bg-accent hover:border-foreground"
                >
                  Request Demo
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-primary rounded-xl blur-xl opacity-50"></div>
                <div className="glass-card rounded-xl p-1 relative">
                  <img
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80"
                    alt="Dashboard Preview"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background relative">
        <div className="absolute inset-0 grid-pattern opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                Powerful Features
              </div>
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Everything You Need to Manage Leads
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our lead management system provides all the tools you need to
              track, nurture, and convert leads efficiently.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="glass-card p-6 rounded-xl hover:shadow-xl transition-all duration-300 border border-border">
              <div className="feature-icon-bg bg-primary p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-4">
                <Users className="text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                Lead Tracking
              </h3>
              <p className="text-muted-foreground">
                Easily manage and organize all your leads in one centralized
                dashboard.
              </p>
              <div className="mt-4 flex items-center text-primary font-medium">
                <span>Learn more</span>
                <ChevronRight size={16} className="ml-1" />
              </div>
            </div>

            <div className="glass-card p-6 rounded-xl hover:shadow-xl transition-all duration-300 border border-border">
              <div className="feature-icon-bg bg-green-500 p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-4">
                <Phone className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                Call Management
              </h3>
              <p className="text-muted-foreground">
                Record call outcomes and update lead status with our intuitive
                interface.
              </p>
              <div className="mt-4 flex items-center text-green-500 font-medium">
                <span>Learn more</span>
                <ChevronRight size={16} className="ml-1" />
              </div>
            </div>

            <div className="glass-card p-6 rounded-xl hover:shadow-xl transition-all duration-300 border border-border">
              <div className="feature-icon-bg bg-purple-500 p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-4">
                <Calendar className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                Follow-up Scheduling
              </h3>
              <p className="text-muted-foreground">
                Never miss a follow-up with automated reminders and scheduling
                tools.
              </p>
              <div className="mt-4 flex items-center text-purple-500 font-medium">
                <span>Learn more</span>
                <ChevronRight size={16} className="ml-1" />
              </div>
            </div>

            <div className="glass-card p-6 rounded-xl hover:shadow-xl transition-all duration-300 border border-border">
              <div className="feature-icon-bg bg-orange-500 p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-4">
                <BarChart3 className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                Performance Analytics
              </h3>
              <p className="text-muted-foreground">
                Track conversion rates and team performance with detailed
                analytics.
              </p>
              <div className="mt-4 flex items-center text-orange-500 font-medium">
                <span>Learn more</span>
                <ChevronRight size={16} className="ml-1" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section
        id="benefits"
        className="py-20 bg-gradient-to-b from-background to-muted"
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <div className="relative">
                <div className="absolute -inset-1 bg-primary rounded-xl blur-xl opacity-30"></div>
                <div className="glass-card rounded-xl p-1 relative">
                  <img
                    src="https://images.unsplash.com/photo-1552581234-26160f608093?w=800&q=80"
                    alt="Team collaboration"
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-12">
              <div className="inline-block mb-4">
                <div className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-medium border border-indigo-500/20">
                  Why Choose Us
                </div>
              </div>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Transform Your Lead Management Process
              </h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary p-2 rounded-lg mr-4 mt-1">
                    <Zap className="text-primary-foreground h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">
                      Increased Productivity
                    </h3>
                    <p className="text-muted-foreground">
                      Streamline your workflow and focus on what matters most -
                      converting leads.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary p-2 rounded-lg mr-4 mt-1">
                    <CheckCircle className="text-primary-foreground h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">
                      Better Lead Conversion
                    </h3>
                    <p className="text-muted-foreground">
                      Improve your conversion rates with timely follow-ups and
                      organized lead management.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary p-2 rounded-lg mr-4 mt-1">
                    <BarChart3 className="text-primary-foreground h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">
                      Data-Driven Decisions
                    </h3>
                    <p className="text-muted-foreground">
                      Make informed decisions based on comprehensive analytics
                      and reporting.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary p-2 rounded-lg mr-4 mt-1">
                    <Shield className="text-primary-foreground h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">
                      Team Collaboration
                    </h3>
                    <p className="text-muted-foreground">
                      Enable seamless collaboration between team members with
                      shared lead information.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link to="/login">
                  <Button
                    size="lg"
                    className="bg-primary hover:opacity-90 border-0 text-primary-foreground"
                  >
                    Start Managing Leads
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-3xl mx-auto glass-card p-10 rounded-2xl border border-border">
            <div className="inline-block mb-4">
              <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                Get Started Today
              </div>
            </div>
            <h2 className="text-4xl font-bold mb-6 text-foreground">
              Ready to Transform Your Lead Management?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Join thousands of sales professionals who have improved their
              conversion rates with our platform.
            </p>
            <Link to="/login">
              <Button
                size="lg"
                className="bg-primary hover:opacity-90 border-0 text-primary-foreground"
              >
                Get Started Today
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background/80 backdrop-blur-sm text-foreground py-12 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-primary w-8 h-8 rounded-md flex items-center justify-center">
                  <Sparkles className="text-primary-foreground h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold">Lead Manager</h3>
              </div>
              <p className="text-muted-foreground max-w-xs">
                A comprehensive lead management solution for modern sales teams.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-foreground">
                  Product
                </h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    <a
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      Testimonials
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4 text-foreground">
                  Company
                </h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    <a
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      Careers
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4 text-foreground">
                  Legal
                </h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    <a
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      Security
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground">
              © 2023 Lead Manager. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <span className="sr-only">LinkedIn</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
