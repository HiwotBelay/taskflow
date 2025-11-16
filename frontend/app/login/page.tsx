"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { Target, Mail, Lock, ArrowRight, ArrowLeft } from 'lucide-react';
import { api } from "@/lib/api";
import { setToken, setUser } from "@/lib/auth";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.auth.login(email, password);
      setToken(response.access_token);
      setUser(response.user);
      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Login failed");
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

      {/* Main login card */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-md mx-4">
          {/* Premium glassmorphism card */}
          <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 p-10 md:p-12">
            {/* Logo section */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#FF4501] to-[#FF6B35] rounded-2xl shadow-lg mb-6 transform hover:scale-110 transition-all duration-500">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-black mb-2">Welcome Back</h1>
              <p className="text-slate-600 font-light text-lg">
                Sign in to continue managing your projects
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email field */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-black/80">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#FF4501] transition-all duration-300" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-white/50 border-2 border-white/60 rounded-xl text-black placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF4501]/40 focus:border-[#FF4501] transition-all duration-300 hover:border-white/80"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {/* Password field */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-black/80">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#FF4501] transition-all duration-300" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-white/50 border-2 border-white/60 rounded-xl text-black placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF4501]/40 focus:border-[#FF4501] transition-all duration-300 hover:border-white/80"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="group w-full px-6 py-4 bg-gradient-to-r from-[#FF4501] to-[#FF6B35] hover:shadow-xl text-white rounded-xl font-semibold text-base transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 overflow-hidden relative"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Sign up link */}
            <div className="mt-8 text-center">
              <p className="text-slate-700 font-light">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="text-[#FF4501] hover:text-[#FF6B35] font-semibold transition-all duration-300 hover:underline"
                >
                  Sign up here
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
