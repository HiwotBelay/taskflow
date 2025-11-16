"use client";

import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  Users,
  Calendar,
  Bell,
  Target,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Zap,
  Rocket,
  Shield,
  CloudLightning as Lightning,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function LandingPage() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const features = [
    {
      icon: Rocket,
      title: "Project Management",
      description: "Create and manage multiple projects with lightning speed",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Seamless teamwork with real-time synchronization",
    },
    {
      icon: Calendar,
      title: "Deadline Tracking",
      description: "Never miss deadlines with intelligent reminders",
    },
    {
      icon: TrendingUp,
      title: "Progress Monitoring",
      description: "Track metrics and analytics in beautiful dashboards",
    },
    {
      icon: Shield,
      title: "Security First",
      description: "Enterprise-grade security for your peace of mind",
    },
    {
      icon: Lightning,
      title: "Lightning Fast",
      description: "Optimized performance for seamless experience",
    },
  ];

  return (
    <div
      className="min-h-screen bg-[#F5EBF6] text-black overflow-x-hidden relative"
      ref={containerRef}
    >
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Floating gradient orbs */}
        <div
          className="absolute -top-96 -right-96 w-96 h-96 bg-[#FF4501] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute -bottom-96 -left-96 w-96 h-96 bg-[#FF4501] rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/3 -left-48 w-96 h-96 bg-[#FF6B35] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float"
          style={{ animationDelay: "4s" }}
        ></div>

        {/* 3D Floating Squares Background */}
        <div className="absolute inset-0 squares-3d-container">
          {/* Top Left Cluster */}
          <div
            className="absolute top-20 left-10 square-3d"
            style={{ animationDelay: "0s", transform: "rotate(15deg)" }}
          ></div>
          <div
            className="absolute top-40 left-32 square-3d"
            style={{ animationDelay: "1.5s", transform: "rotate(-25deg)" }}
          ></div>
          <div
            className="absolute top-60 left-16 square-3d"
            style={{ animationDelay: "3s", transform: "rotate(45deg)" }}
          ></div>

          {/* Top Right Cluster */}
          <div
            className="absolute top-32 right-20 square-3d"
            style={{ animationDelay: "0.5s", transform: "rotate(-15deg)" }}
          ></div>
          <div
            className="absolute top-52 right-40 square-3d"
            style={{ animationDelay: "2s", transform: "rotate(30deg)" }}
          ></div>
          <div
            className="absolute top-72 right-24 square-3d"
            style={{ animationDelay: "3.5s", transform: "rotate(-40deg)" }}
          ></div>

          {/* Middle Left */}
          <div
            className="absolute top-1/2 left-24 square-3d"
            style={{ animationDelay: "1s", transform: "rotate(20deg)" }}
          ></div>
          <div
            className="absolute top-1/2 left-48 square-3d"
            style={{ animationDelay: "2.5s", transform: "rotate(-35deg)" }}
          ></div>

          {/* Middle Right */}
          <div
            className="absolute top-1/2 right-32 square-3d"
            style={{ animationDelay: "1.5s", transform: "rotate(25deg)" }}
          ></div>
          <div
            className="absolute top-1/2 right-56 square-3d"
            style={{ animationDelay: "3s", transform: "rotate(-20deg)" }}
          ></div>

          {/* Bottom Left Cluster */}
          <div
            className="absolute bottom-32 left-20 square-3d"
            style={{ animationDelay: "0.8s", transform: "rotate(-30deg)" }}
          ></div>
          <div
            className="absolute bottom-52 left-40 square-3d"
            style={{ animationDelay: "2.2s", transform: "rotate(40deg)" }}
          ></div>
          <div
            className="absolute bottom-72 left-28 square-3d"
            style={{ animationDelay: "3.8s", transform: "rotate(-15deg)" }}
          ></div>

          {/* Bottom Right Cluster */}
          <div
            className="absolute bottom-24 right-16 square-3d"
            style={{ animationDelay: "1.2s", transform: "rotate(35deg)" }}
          ></div>
          <div
            className="absolute bottom-44 right-36 square-3d"
            style={{ animationDelay: "2.8s", transform: "rotate(-25deg)" }}
          ></div>
          <div
            className="absolute bottom-64 right-20 square-3d"
            style={{ animationDelay: "4s", transform: "rotate(15deg)" }}
          ></div>
        </div>

        {/* Ambient glow */}
        <div className="absolute inset-0 bg-radial-gradient opacity-30"></div>
      </div>

      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-lg">
        <div className="container mx-auto px-4 py-4 md:py-5 flex items-center justify-between">
          <div
            className="flex items-center gap-3 group cursor-pointer"
            onClick={() => router.push("/")}
          >
            <div className="relative w-12 h-12 bg-gradient-to-br from-[#FF4501] to-[#FF6B35] rounded-xl flex items-center justify-center shadow-xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-2xl">
              <Target className="w-7 h-7 text-white" />
              <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <span className="text-2xl font-semibold text-black hidden sm:block bg-gradient-to-r from-black to-[#FF4501] bg-clip-text text-transparent">
              TaskFlow
            </span>
          </div>

          {/* Navigation menu */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("home")}
              className="text-black/70 hover:text-[#FF4501] font-medium transition-colors duration-300"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="text-black/70 hover:text-[#FF4501] font-medium transition-colors duration-300"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("why-taskflow")}
              className="text-black/70 hover:text-[#FF4501] font-medium transition-colors duration-300"
            >
              Why TaskFlow
            </button>
          </nav>

          <button
            onClick={() => router.push("/login")}
            className="px-6 py-2.5 bg-gradient-to-r from-[#FF4501] to-[#FF6B35] hover:shadow-lg text-white rounded-lg font-semibold text-sm transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md"
          >
            Sign In
          </button>
        </div>
      </header>

      <section
        id="home"
        className="relative z-10 container mx-auto px-4 pt-20 pb-16 md:pt-28 md:pb-24 text-center"
      >
        <div className="space-y-6 md:space-y-8 max-w-5xl mx-auto">
          {/* Animated badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md rounded-full border border-white/40 transform transition-all duration-700 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#FF4501] animate-pulse" />
            <span className="text-sm font-medium text-black/80">
              ✨ AI-Powered Task Automation
            </span>
          </div>

          {/* Main heading with gradient and stagger */}
          <div
            className={`transform transition-all duration-1000 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight text-balance tracking-tight">
              <span className="block text-black mb-2">Manage Your</span>
              <span className="block bg-gradient-to-r from-[#FF4501] via-[#FF6B35] to-[#FF4501] bg-clip-text text-transparent animate-gradient-shift text-6xl md:text-7xl lg:text-8xl font-semibold">
                Projects
              </span>
              <span className="block text-black mt-2">Like Never Before</span>
            </h1>
          </div>

          {/* Description with fade and slide */}
          <p
            className={`text-base md:text-xl text-black/60 max-w-2xl mx-auto leading-relaxed font-normal transform transition-all duration-1000 delay-300 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            The most powerful project management platform designed for modern
            teams. Collaborate seamlessly, track progress effortlessly, and
            deliver excellence consistently.
          </p>

          {/* CTA Buttons with premium styling */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 transform transition-all duration-1000 delay-500 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            <button
              onClick={() => router.push("/login")}
              className="group relative px-8 py-4 bg-gradient-to-r from-[#FF4501] to-[#FF6B35] text-white rounded-xl font-semibold text-base transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 overflow-hidden"
            >
              <span className="relative z-10">Get Started Free</span>
              <ArrowRight className="w-5 h-5 transition-all duration-300 group-hover:translate-x-2 group-hover:rotate-45" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            <button
              onClick={() => router.push("/login")}
              className="group px-8 py-4 border-2 border-[#FF4501] text-[#FF4501] hover:bg-[#FF4501]/10 rounded-xl font-semibold text-base transition-all duration-300 transform hover:scale-105 active:scale-95 backdrop-blur-sm"
            >
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="relative z-10 container mx-auto px-4 md:px-20 py-24 md:py-32"
      >
        <div className="text-center mb-20">
          <div
            className={`inline-flex items-center gap-2 mb-6 transform transition-all duration-700 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Zap className="w-5 h-5 text-[#FF4501]" />
            <span className="text-sm font-semibold text-[#FF4501] uppercase tracking-widest">
              Features
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold text-black mb-6 text-balance">
            Everything You Need
          </h2>
          <p className="text-lg text-black/60 max-w-2xl mx-auto font-normal">
            Comprehensive tools designed to streamline your workflow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative bg-white/50 backdrop-blur-xl rounded-2xl p-8 md:p-10 border border-white/60 hover:border-[#FF4501]/50 transition-all duration-500 transform hover:-translate-y-3 hover:shadow-2xl overflow-hidden"
                style={{
                  animation: `slideUpStagger 0.6s ease-out ${
                    index * 120
                  }ms both`,
                }}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF4501]/10 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500"></div>

                {/* Icon container */}
                <div className="relative mb-6 w-16 h-16 bg-gradient-to-br from-[#FF4501] to-[#FF6B35] rounded-xl flex items-center justify-center shadow-lg transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-12">
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-black mb-3 group-hover:text-[#FF4501] transition-colors duration-300 relative z-10">
                  {feature.title}
                </h3>
                <p className="text-black/60 leading-relaxed relative z-10">
                  {feature.description}
                </p>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FF4501] to-[#FF6B35] opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-x-0 group-hover:scale-x-100 origin-left"></div>
              </div>
            );
          })}
        </div>
      </section>

      <section
        id="why-taskflow"
        className="relative z-10 container mx-auto px-4 md:px-20 py-24 md:py-32"
      >
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8">
            <div>
              <span className="text-sm font-semibold text-[#FF4501] uppercase tracking-widest">
                Why TaskFlow
              </span>
              <h2 className="text-4xl md:text-5xl font-semibold text-black mt-3 text-balance leading-tight">
                Built for Teams That Move Fast
              </h2>
            </div>

            <ul className="space-y-6">
              {[
                {
                  title: "Real-time Synchronization",
                  desc: "Instant updates keep everyone in perfect sync",
                },
                {
                  title: "Intuitive Interface",
                  desc: "No learning curve, start productive immediately",
                },
                {
                  title: "Zero Downtime",
                  desc: "99.99% uptime with enterprise reliability",
                },
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-4 group"
                  style={{
                    animation: `slideInFromLeft 0.6s ease-out ${
                      (idx + 1) * 200
                    }ms both`,
                  }}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-[#FF4501] to-[#FF6B35] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg transform transition-all duration-300 group-hover:scale-125 group-hover:rotate-6">
                    <CheckCircle2 className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-black mb-2 group-hover:text-[#FF4501] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-black/60 font-normal">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Stats section with premium cards */}
          <div className="grid grid-cols-1 gap-5">
            {[
              {
                label: "Projects Completed",
                value: "150+",
                color: "from-[#FF4501]",
              },
              { label: "Active Teams", value: "50+", color: "from-[#FF6B35]" },
              { label: "Tasks Managed", value: "5K+", color: "from-[#FF4501]" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="group relative bg-gradient-to-br from-white/70 to-white/40 backdrop-blur-xl rounded-2xl p-8 border border-white/60 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer overflow-hidden"
                style={{
                  animation: `slideInFromRight 0.6s ease-out ${
                    (idx + 1) * 200
                  }ms both`,
                }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} to-transparent opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                ></div>
                <div className="relative flex flex-col gap-2">
                  <span className="font-medium text-black/70 text-sm">
                    {stat.label}
                  </span>
                  <span
                    className={`text-5xl font-semibold bg-gradient-to-r ${stat.color} to-[#FF6B35] bg-clip-text text-transparent`}
                  >
                    {stat.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="cta"
        className="relative z-10 container mx-auto px-4 py-20 md:py-28"
      >
        <div className="relative bg-gradient-to-r from-[#FF4501] via-[#FF6B35] to-[#FF4501] rounded-3xl p-12 md:p-20 text-center text-white overflow-hidden shadow-2xl">
          {/* Enhanced animated background effects */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full filter blur-3xl -translate-y-1/2 animate-float"></div>
            <div
              className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full filter blur-3xl translate-y-1/2 animate-float"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>

          <div className="relative space-y-6">
            <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
              Ready to Transform Your Workflow?
            </h2>
            <p className="text-lg md:text-xl opacity-95 max-w-2xl mx-auto font-normal">
              Join thousands of high-performing teams delivering excellence with
              TaskFlow
            </p>
            <button
              onClick={() => router.push("/login")}
              className="inline-flex items-center gap-3 px-10 py-4 bg-black text-white hover:bg-black/90 rounded-xl font-semibold text-base transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl hover:shadow-white/50"
            >
              Start Your Free Trial
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <footer className="relative z-10 container mx-auto px-4 py-12 border-t border-black/10 mt-20">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-[#FF4501] to-[#FF6B35] rounded-lg flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Target className="w-6 h-6 text-white" />
              </div>
              <span className="text-lg font-semibold text-black">TaskFlow</span>
            </div>
            <p className="text-sm text-black/60 font-normal">
              Empowering teams to work smarter, faster, and together.
            </p>
          </div>

          {/* Navigation column */}
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-black">Product</h4>
            <nav className="flex flex-col gap-2">
              <button
                onClick={() => scrollToSection("features")}
                className="text-sm text-black/60 hover:text-[#FF4501] transition-colors duration-300 text-left"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("why-taskflow")}
                className="text-sm text-black/60 hover:text-[#FF4501] transition-colors duration-300 text-left"
              >
                Why TaskFlow
              </button>
              <a
                href="#"
                className="text-sm text-black/60 hover:text-[#FF4501] transition-colors duration-300"
              >
                Pricing
              </a>
            </nav>
          </div>

          {/* Support column */}
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-black">Support</h4>
            <nav className="flex flex-col gap-2">
              <a
                href="#"
                className="text-sm text-black/60 hover:text-[#FF4501] transition-colors duration-300"
              >
                Help Center
              </a>
              <a
                href="#"
                className="text-sm text-black/60 hover:text-[#FF4501] transition-colors duration-300"
              >
                Documentation
              </a>
              <a
                href="#"
                className="text-sm text-black/60 hover:text-[#FF4501] transition-colors duration-300"
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Legal column */}
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-black">Legal</h4>
            <nav className="flex flex-col gap-2">
              <a
                href="#"
                className="text-sm text-black/60 hover:text-[#FF4501] transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-black/60 hover:text-[#FF4501] transition-colors duration-300"
              >
                Terms of Service
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="border-t border-black/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-black/60 font-normal">
            © 2025 TaskFlow. Crafted with precision for exceptional teams.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-black/60 hover:text-[#FF4501] transition-colors duration-300"
            >
              <span className="text-sm font-medium">Twitter</span>
            </a>
            <a
              href="#"
              className="text-black/60 hover:text-[#FF4501] transition-colors duration-300"
            >
              <span className="text-sm font-medium">LinkedIn</span>
            </a>
            <a
              href="#"
              className="text-black/60 hover:text-[#FF4501] transition-colors duration-300"
            >
              <span className="text-sm font-medium">GitHub</span>
            </a>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) translateX(0px);
            opacity: 0.2;
          }
          25% { 
            transform: translateY(-30px) translateX(20px);
            opacity: 0.3;
          }
          50% { 
            transform: translateY(-60px) translateX(-20px);
            opacity: 0.25;
          }
          75% { 
            transform: translateY(-30px) translateX(30px);
            opacity: 0.3;
          }
        }

        @keyframes slideUpStagger {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes float3d {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) rotateZ(0deg);
            opacity: 0.18;
          }
          25% { 
            transform: translateY(-20px) translateX(15px) rotateZ(5deg);
            opacity: 0.22;
          }
          50% { 
            transform: translateY(-40px) translateX(-10px) rotateZ(-5deg);
            opacity: 0.2;
          }
          75% { 
            transform: translateY(-20px) translateX(20px) rotateZ(3deg);
            opacity: 0.22;
          }
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 4s ease infinite;
        }

        .bg-radial-gradient {
          background: radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.05) 100%);
        }

        /* 3D Squares Styling */
        .squares-3d-container {
          perspective: 1000px;
        }

        .square-3d {
          width: 80px;
          height: 80px;
          position: absolute;
          opacity: 0.18;
          animation: float3d 12s ease-in-out infinite;
          transform-style: preserve-3d;
        }

        .square-3d::before,
        .square-3d::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          border: 2px solid rgba(255, 69, 1, 0.5);
          background: linear-gradient(135deg, rgba(255, 69, 1, 0.2), rgba(255, 107, 53, 0.2));
          backdrop-filter: blur(2px);
        }

        .square-3d::before {
          transform: rotateY(45deg) rotateX(15deg);
          box-shadow: 
            inset 0 0 20px rgba(255, 69, 1, 0.3),
            0 0 40px rgba(255, 69, 1, 0.2);
        }

        .square-3d::after {
          transform: rotateY(-45deg) rotateX(-15deg) translateZ(20px);
          box-shadow: 
            inset 0 0 20px rgba(255, 107, 53, 0.3),
            0 0 40px rgba(255, 107, 53, 0.2);
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .square-3d {
            width: 60px;
            height: 60px;
            opacity: 0.15;
          }
        }

        /* Smooth transitions for all elements */
        * {
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Scroll behavior */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}
