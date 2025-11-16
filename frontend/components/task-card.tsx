"use client";

import { Clock, AlertCircle, CheckCircle2, User, Calendar } from "lucide-react";

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    assignee: string;
    dueDate: string;
    priority: "high" | "medium" | "low";
    status: "pending" | "in-progress" | "completed";
  };
}

export function TaskCard({ task }: TaskCardProps) {
  const priorityConfig = {
    high: {
      colors: "from-red-500 to-pink-500",
      bg: "bg-red-50 dark:bg-red-900/20",
      text: "text-red-700 dark:text-red-400",
      border: "border-red-200 dark:border-red-800",
    },
    medium: {
      colors: "from-orange-500 to-amber-500",
      bg: "bg-orange-50 dark:bg-orange-900/20",
      text: "text-orange-700 dark:text-orange-400",
      border: "border-orange-200 dark:border-orange-800",
    },
    low: {
      colors: "from-green-500 to-emerald-500",
      bg: "bg-green-50 dark:bg-green-900/20",
      text: "text-green-700 dark:text-green-400",
      border: "border-green-200 dark:border-green-800",
    },
  };

  const statusConfig = {
    pending: {
      icon: <Clock className="w-4 h-4" />,
      color: "text-slate-500 dark:text-slate-400",
      bg: "bg-slate-100 dark:bg-slate-800",
    },
    "in-progress": {
      icon: <AlertCircle className="w-4 h-4" />,
      color: "text-blue-500 dark:text-blue-400",
      bg: "bg-blue-100 dark:bg-blue-900/30",
    },
    completed: {
      icon: <CheckCircle2 className="w-4 h-4" />,
      color: "text-green-500 dark:text-green-400",
      bg: "bg-green-100 dark:bg-green-900/30",
    },
  };

  const priority = priorityConfig[task.priority];
  const status = statusConfig[task.status];

  return (
    <div className="group relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-500 border border-slate-200/50 dark:border-slate-700/50 hover:border-[#FD8958]/30 transform hover:-translate-y-1">
      {/* Left Border Indicator */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#FD8958] rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-3">
          <h5 className="font-semibold text-slate-900 dark:text-white text-lg leading-tight group-hover:text-[#FD8958] transition-colors duration-300">
            {task.title}
          </h5>

          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
              <User className="w-4 h-4" />
              <span className="font-medium">{task.assignee}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border ${priority.bg} ${priority.text} ${priority.border}`}
            >
              <div
                className={`w-2 h-2 rounded-full bg-gradient-to-r ${priority.colors}`}
              ></div>
              {task.priority.toUpperCase()}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${status.bg} ${status.color}`}
            >
              {status.icon}
              <span className="capitalize">
                {task.status.replace("-", " ")}
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
          <Calendar className="w-3.5 h-3.5" />
          <span className="font-medium">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FD8958] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-xl"></div>
    </div>
  );
}
