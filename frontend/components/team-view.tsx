"use client";

import { Plus, Mail, Phone, Badge, Crown, Shield, User } from "lucide-react";
import { useState, useEffect } from "react";
import { getUser } from "@/lib/auth";
import { api } from "@/lib/api";
import { getToken } from "@/lib/auth";

export function TeamView() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getUser();
    const token = getToken();

    if (user) {
      // Fetch full user details from API
      if (token && user.id) {
        api.teamMembers
          .getOne(user.id, token)
          .then((userData) => {
            setCurrentUser(userData);
            setLoading(false);
          })
          .catch(() => {
            // If API fails, use stored user data
            setCurrentUser(user);
            setLoading(false);
          });
      } else {
        setCurrentUser(user);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const getRoleIcon = (role: string) => {
    if (role?.includes("Manager")) return <Crown className="w-4 h-4" />;
    if (role?.includes("Lead")) return <Badge className="w-4 h-4" />;
    return <Shield className="w-4 h-4" />;
  };

  const getInitials = (name: string) => {
    if (!name) return "U";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  if (loading) {
    return (
      <div className="flex-1 overflow-auto flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="flex-1 overflow-auto flex items-center justify-center">
        <div className="text-center">
          <User className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400 font-semibold">
            No user information available
          </p>
        </div>
      </div>
    );
  }

  const member = {
    id: currentUser.id,
    name: currentUser.name,
    role: currentUser.role || "Developer",
    email: currentUser.email,
    phone: currentUser.phone || "Not provided",
    avatar: getInitials(currentUser.name),
    status: currentUser.status || "active",
  };

  return (
    <div className="flex-1 overflow-auto flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/10 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 p-6 md:p-8 sticky top-0 z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-2">
            <span className="bg-gradient-to-r from-slate-900 via-green-800 to-emerald-800 dark:from-white dark:via-green-200 dark:to-emerald-200 bg-clip-text text-transparent">
              My Profile
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 font-medium text-lg">
            Your account information and details
          </p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 p-6 md:p-8">
        <div className="max-w-2xl mx-auto">
          <div className="group relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-200/50 dark:border-slate-700/50 hover:border-green-300 dark:hover:border-green-600 transform hover:-translate-y-2">
            {/* Gradient Header */}
            <div className="relative bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-6 h-28 flex items-end overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-2xl transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-700"></div>
              </div>
              <div className="relative z-10 w-20 h-20 rounded-full bg-white border-4 border-white shadow-xl flex items-center justify-center font-bold bg-gradient-to-br from-green-500 to-emerald-500 text-white text-2xl -mb-10">
                {member.avatar}
              </div>
            </div>

            {/* Body */}
            <div className="p-6 pt-12 space-y-4">
              <div>
                <h4 className="font-extrabold text-xl text-slate-900 dark:text-white mb-2">
                  {member.name}
                </h4>
                <div className="flex items-center gap-2">
                  <div className="text-green-600 dark:text-green-400">
                    {getRoleIcon(member.role)}
                  </div>
                  <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                    {member.role}
                  </span>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg">
                <div
                  className={`w-3 h-3 rounded-full ${
                    member.status === "active"
                      ? "bg-green-500 shadow-lg shadow-green-500/50"
                      : member.status === "away"
                      ? "bg-orange-500 shadow-lg shadow-orange-500/50"
                      : "bg-gray-400"
                  }`}
                />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 capitalize">
                  {member.status}
                </span>
              </div>

              {/* Contact */}
              <div className="space-y-2 pt-3 border-t border-slate-200 dark:border-slate-700">
                <div className="w-full flex items-center gap-3 px-4 py-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl text-sm text-slate-700 dark:text-slate-300 font-medium">
                  <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  {member.email}
                </div>
                {member.phone && member.phone !== "Not provided" && (
                  <div className="w-full flex items-center gap-3 px-4 py-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl text-sm text-slate-700 dark:text-slate-300 font-medium">
                    <Phone className="w-4 h-4 text-green-600 dark:text-green-400" />
                    {member.phone}
                  </div>
                )}
              </div>
            </div>

            {/* Hover Effect Border */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
