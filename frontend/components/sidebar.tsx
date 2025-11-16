"use client";

import {
  LayoutDashboard,
  FolderOpen,
  Users,
  Bell,
  LogOut,
  Target,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { clearAuth } from "@/lib/auth";
import { toast } from "sonner";

interface SidebarProps {
  activeView: string;
  onViewChange: (
    view: "dashboard" | "projects" | "team" | "notifications"
  ) => void;
}

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const router = useRouter();

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "projects",
      label: "Projects",
      icon: FolderOpen,
    },
    {
      id: "team",
      label: "Team",
      icon: Users,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
    },
  ];

  const handleLogout = () => {
    clearAuth();
    toast.success("Logged out successfully");
    router.push("/");
  };

  return (
    <aside className="w-72 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-800/50 flex flex-col shadow-xl">
      {/* Logo */}
      <div className="p-6 border-b border-slate-200/50 dark:border-slate-800/50">
        <div
          className="flex items-center gap-3 group cursor-pointer"
          onClick={() => router.push("/")}
        >
          <div className="w-12 h-12 rounded-xl bg-[#FD8958] flex items-center justify-center shadow-md transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
            <Target className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-slate-800 dark:text-white">
              TaskFlow
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Project Management
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id as any)}
              className={`group relative w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 ${
                isActive
                  ? "bg-[#FD8958] text-white shadow-sm transform scale-[1.02]"
                  : "text-slate-600 dark:text-slate-300 hover:bg-[#F8EEF8] dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></div>
              )}
              <div
                className={`${
                  isActive
                    ? "text-white"
                    : `text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200`
                } transition-colors`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span
                className={`font-semibold ${
                  isActive ? "text-white" : ""
                } transition-colors`}
              >
                {item.label}
              </span>
              {!isActive && (
                <div className="ml-auto w-2 h-2 rounded-full bg-[#FD8958] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200/50 dark:border-slate-800/50">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600 dark:hover:text-red-400 transition-all duration-300 group"
        >
          <LogOut className="w-5 h-5 group-hover:rotate-[-15deg] transition-transform" />
          <span className="font-semibold">Logout</span>
        </button>
      </div>
    </aside>
  );
}
