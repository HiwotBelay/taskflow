"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { Sidebar } from "@/components/sidebar";
import { Dashboard } from "@/components/dashboard";
import { ProjectView } from "@/components/project-view";
import { TeamView } from "@/components/team-view";
import { NotificationsView } from "@/components/notifications-view";
import { AuthGuard } from "@/components/auth-guard";
import { ArrowLeft } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [activeView, setActiveView] = useState<
    "dashboard" | "projects" | "team" | "notifications"
  >("dashboard");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );

  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    setActiveView("projects");
  };

  return (
    <AuthGuard>
      <div className="flex h-screen bg-[#F5EBF6] overflow-hidden relative">
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div
            className="absolute -top-96 -right-96 w-96 h-96 bg-[#FF4501] rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-float"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="absolute -bottom-96 -left-96 w-96 h-96 bg-[#FF4501] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-1/3 left-1/2 w-96 h-96 bg-[#FF6B35] rounded-full mix-blend-multiply filter blur-3xl opacity-8 animate-float"
            style={{ animationDelay: "4s" }}
          ></div>
        </div>

        <div className="relative z-10">
          <Sidebar activeView={activeView} onViewChange={setActiveView} />
        </div>

        <main className="flex-1 overflow-hidden flex flex-col relative z-10">
          {/* Header with back button */}
          <header className="px-8 py-6 border-b border-white/20 bg-white/40 backdrop-blur-xl shadow-sm flex items-center justify-between">
            <button
              onClick={() => router.push("/")}
              className="group flex items-center gap-2 px-4 py-2 text-slate-700 hover:text-[#FF4501] font-medium transition-all duration-300 hover:bg-white/60 rounded-lg"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="hidden sm:inline">Back to Home</span>
            </button>
            <div className="text-sm text-slate-600 font-light">
              {activeView === "dashboard" && "Dashboard"}
              {activeView === "projects" && "Projects"}
              {activeView === "team" && "Team"}
              {activeView === "notifications" && "Notifications"}
            </div>
          </header>

          {/* Content area */}
          <div className="flex-1 overflow-auto bg-gradient-to-br from-white/30 via-white/10 to-transparent backdrop-blur-sm">
            {activeView === "dashboard" && (
              <Dashboard onProjectSelect={handleSelectProject} />
            )}
            {activeView === "projects" && (
              <ProjectView projectId={selectedProjectId} />
            )}
            {activeView === "team" && <TeamView />}
            {activeView === "notifications" && <NotificationsView />}
          </div>
        </main>

        <style>{`
          @keyframes float {
            0%, 100% { 
              transform: translateY(0px) translateX(0px);
              opacity: 0.15;
            }
            25% { 
              transform: translateY(-30px) translateX(20px);
              opacity: 0.2;
            }
            50% { 
              transform: translateY(-60px) translateX(-20px);
              opacity: 0.15;
            }
            75% { 
              transform: translateY(-30px) translateX(30px);
              opacity: 0.2;
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
    </AuthGuard>
  );
}
