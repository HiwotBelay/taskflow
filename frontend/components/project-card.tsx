"use client";

import { Users, MoreHorizontal, Calendar, CheckCircle2 } from "lucide-react";

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    description: string;
    progress: number;
    tasks: number;
    completed: number;
    teamMembers: number;
    deadline: string;
  };
  onSelect: () => void;
}

export function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const completionPercentage = Math.round(
    (project.completed / project.tasks) * 100
  );

  return (
    <div
      onClick={onSelect}
      className="group relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 cursor-pointer border border-slate-200/50 dark:border-slate-700/50 hover:border-[#FD8958]/30 transform hover:-translate-y-1 hover:scale-[1.01]"
    >
      {/* Header */}
      <div className="relative bg-[#FD8958] p-6 h-24 flex items-start justify-between overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-2xl transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-700"></div>
        </div>

        <div className="relative z-10 flex-1">
          <h4 className="text-white font-extrabold text-xl line-clamp-1 mb-1">
            {project.name}
          </h4>
          <p className="text-white/80 text-xs font-medium">Project Overview</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          className="relative z-10 text-white/80 hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 p-2 hover:bg-white/20 rounded-lg"
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Body */}
      <div className="p-6 space-y-5">
        <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
          {project.description || "No description provided"}
        </p>

        {/* Progress Bar */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wide">
              Progress
            </span>
            <span className="text-sm font-semibold text-[#FD8958]">
              {project.progress}%
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-[#FD8958] h-2.5 rounded-full transition-all duration-700 shadow-sm"
              style={{ width: `${project.progress}%` }}
            >
              <div className="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
          <div className="text-center p-3 bg-[#F8EEF8]/50 dark:bg-[#F8EEF8]/10 rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <CheckCircle2 className="w-4 h-4 text-[#FD8958]" />
              <p className="text-2xl font-semibold text-slate-800 dark:text-white">
                {project.completed}/{project.tasks}
              </p>
            </div>
            <p className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wide">
              Tasks
            </p>
          </div>
          <div className="text-center p-3 bg-[#F8EEF8]/50 dark:bg-[#F8EEF8]/10 rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Users className="w-4 h-4 text-[#FD8958]" />
              <p className="text-2xl font-semibold text-slate-800 dark:text-white">
                {project.teamMembers}
              </p>
            </div>
            <p className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wide">
              Team
            </p>
          </div>
          <div className="text-center p-3 bg-[#F8EEF8]/50 dark:bg-[#F8EEF8]/10 rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Calendar className="w-4 h-4 text-[#FD8958]" />
              <p className="text-sm font-semibold text-slate-800 dark:text-white">
                {new Date(project.deadline).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
            <p className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wide">
              Deadline
            </p>
          </div>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FD8958] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
}
