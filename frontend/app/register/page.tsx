"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Target,
  Mail,
  Lock,
  User,
  Phone,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { api } from "@/lib/api";
import { setToken, setUser } from "@/lib/auth";
import { toast } from "sonner";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Developer",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await api.auth.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        phone: formData.phone || undefined,
      });
      setToken(response.access_token);
      setUser(response.user);
      toast.success("Account created successfully!");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5EBF6] text-black overflow-x-hidden relative">
      {/* Animated gradient background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
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
      </div>

      <header className="relative z-10 container mx-auto px-4 py-6">
        <button
          onClick={() => router.push("/")}
          className="group flex items-center gap-2 px-4 py-2 text-slate-700 hover:text-[#FF4501] font-medium transition-all duration-300 hover:bg-white/40 rounded-lg backdrop-blur-sm"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back
        </button>
      </header>

      {/* Main register card */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] py-8">
        <div className="w-full max-w-lg mx-4">
          {/* Premium glassmorphism card */}
          <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 p-10 md:p-12">
            {/* Logo section */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#FF4501] to-[#FF6B35] rounded-2xl shadow-lg mb-6 transform hover:scale-110 transition-all duration-500">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-black mb-2">
                Create Account
              </h1>
              <p className="text-slate-600 font-light text-lg">
                Join TaskFlow and start managing projects smarter
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-black/80">
                  Full Name
                </label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#FF4501] transition-all duration-300" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full pl-12 pr-4 py-3.5 bg-white/50 border-2 border-white/60 rounded-xl text-black placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF4501]/40 focus:border-[#FF4501] transition-all duration-300 hover:border-white/80"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-black/80">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#FF4501] transition-all duration-300" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full pl-12 pr-4 py-3.5 bg-white/50 border-2 border-white/60 rounded-xl text-black placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF4501]/40 focus:border-[#FF4501] transition-all duration-300 hover:border-white/80"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {/* Role */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-black/80">
                  Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="w-full px-4 py-3.5 bg-white/50 border-2 border-white/60 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-[#FF4501]/40 focus:border-[#FF4501] transition-all duration-300 hover:border-white/80"
                >
                  <option value="Developer">Developer</option>
                  <option value="Designer">Designer</option>
                  <option value="Manager">Manager</option>
                  <option value="Product Owner">Product Owner</option>
                  <option value="QA">QA</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Phone */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-black/80">
                  Phone (Optional)
                </label>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#FF4501] transition-all duration-300" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full pl-12 pr-4 py-3.5 bg-white/50 border-2 border-white/60 rounded-xl text-black placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF4501]/40 focus:border-[#FF4501] transition-all duration-300 hover:border-white/80"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-black/80">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#FF4501] transition-all duration-300" />
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full pl-12 pr-4 py-3.5 bg-white/50 border-2 border-white/60 rounded-xl text-black placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF4501]/40 focus:border-[#FF4501] transition-all duration-300 hover:border-white/80"
                    placeholder="••••••••"
                    minLength={6}
                  />
                </div>
                <p className="text-xs text-slate-600 font-light">
                  Must be at least 6 characters
                </p>
              </div>

              {/* Confirm Password */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-black/80">
                  Confirm Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#FF4501] transition-all duration-300" />
                  <input
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="w-full pl-12 pr-4 py-3.5 bg-white/50 border-2 border-white/60 rounded-xl text-black placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF4501]/40 focus:border-[#FF4501] transition-all duration-300 hover:border-white/80"
                    placeholder="••••••••"
                    minLength={6}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="group w-full px-6 py-4 bg-gradient-to-r from-[#FF4501] to-[#FF6B35] hover:shadow-xl text-white rounded-xl font-semibold text-base transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 overflow-hidden relative mt-6"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Creating account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Sign In Link */}
            <div className="mt-8 text-center">
              <p className="text-slate-700 font-light">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-[#FF4501] hover:text-[#FF6B35] font-semibold transition-all duration-300 hover:underline"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

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

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}
