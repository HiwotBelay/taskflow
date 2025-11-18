"use client";

import { useState, useEffect } from "react";
import { Plus, TrendingUp, AlertCircle, Clock, FolderOpen } from 'lucide-react';
import { ProjectCard } from "./project-card";
import { CreateProjectModal } from "./create-project-modal";
import { TaskCard } from "./task-card";
import { api } from "@/lib/api";
import { getToken, getUser } from "@/lib/auth";
import { canCreateProjects } from "@/lib/roles";
import { toast } from "sonner";

export function Dashboard({
  onProjectSelect,
}: {
  onProjectSelect: (id: string) => void;
}) {
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = getToken();

  useEffect(() => {
    if (!token) {
      return;
    }
    loadData();
  }, [token]);

  const loadData = async () => {
    if (!token) return;

    try {
      setLoading(true);
      const [projectsData, tasksData] = await Promise.all([
        api.projects.getAll(token),
        api.tasks.getAll(token),
      ]);

      // Only show the current logged-in user
      const currentUser = getUser();
      if (currentUser) {
        setTeamMembers([currentUser]);
      } else {
        setTeamMembers([]);
      }

      setProjects(projectsData || []);
      setTasks(tasksData || []);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to load data");
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleProjectCreated = () => {
    setShowCreateProject(false);
    loadData();
  };

  const inProgressTasks = tasks.filter(
    (t) => t.status === "in-progress"
  ).length;
  const overdueIssues = 0; // TODO: Calculate from issues
  const activeProjects = projects.filter((p) => p.status === "active").length;

  const stats = [
    {
      label: "Active Projects",
      value: activeProjects.toString(),
      icon: FolderOpen,
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Tasks in Progress",
      value: inProgressTasks.toString(),
      icon: Clock,
      color: "from-orange-500 to-orange-600",
    },
    {
      label: "Overdue Issues",
      value: overdueIssues.toString(),
      icon: AlertCircle,
      color: "from-red-500 to-red-600",
    },
    {
      label: "Team Members",
      value: teamMembers.length.toString(),
      icon: TrendingUp,
      color: "from-green-500 to-green-600",
    },
  ];

  if (loading) {
    return (
      <div className="flex-1 overflow-auto flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 overflow-auto flex items-center justify-center">
        <div className="text-center px-4">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-foreground font-semibold">{error}</p>
          <button
            onClick={loadData}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-[#F8EEF8] via-white to-[#FFF4F0] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 p-3 xs:p-4 sm:p-6 md:p-8 sticky top-0 z-10 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 max-w-full">
          <div className="flex-1 min-w-0 w-full">
            <h2 className="text-lg xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-1 sm:mb-2 break-words">
              <span className="text-slate-800 dark:text-white">
                Welcome Back!
              </span>
            </h2>
            <p className="text-xs xs:text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 font-medium break-words">
              Here's what's happening with your projects today
            </p>
          </div>
          {canCreateProjects() && (
            <button
              onClick={() => setShowCreateProject(true)}
              className="group flex items-center justify-center gap-1.5 xs:gap-2 bg-[#FD8958] hover:bg-[#E8703F] text-white px-3 xs:px-4 sm:px-6 py-2.5 xs:py-3 sm:py-3.5 rounded-lg xs:rounded-xl font-medium transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto text-xs xs:text-sm sm:text-base min-h-10 xs:min-h-11 sm:min-h-12"
            >
              <Plus className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 group-hover:rotate-90 transition-transform duration-300 flex-shrink-0" />
              <span className="truncate">New Project</span>
            </button>
          )}
        </div>
      </header>

      <div className="p-3 xs:p-4 sm:p-6 md:p-8 space-y-4 xs:space-y-6 sm:space-y-8 max-w-full">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 xs:gap-3 sm:gap-4 md:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="group relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg xs:rounded-xl p-3 xs:p-4 sm:p-5 md:p-6 shadow-sm hover:shadow-md transition-all duration-500 border border-slate-200/50 dark:border-slate-700/50 hover:border-[#FD8958]/30 transform hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col items-start gap-2 xs:gap-3 w-full">
                  <div className="w-full">
                    <p className="text-[9px] xs:text-[10px] sm:text-xs md:text-sm text-slate-600 dark:text-slate-400 font-semibold mb-0.5 xs:mb-1 sm:mb-2 uppercase tracking-wide line-clamp-1">
                      {stat.label}
                    </p>
                    <p className="text-base xs:text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent break-words">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`bg-gradient-to-br ${stat.color} p-2 xs:p-2.5 sm:p-3 md:p-4 rounded-lg sm:rounded-xl shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 flex-shrink-0`}
                  >
                    <Icon className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                  </div>
                </div>
                {/* Decorative line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FD8958] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-lg xs:rounded-b-xl"></div>
              </div>
            );
          })}
        </div>

        {/* Projects Section */}
        <section>
          <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3 mb-3 xs:mb-4 sm:mb-6">
            <div className="w-0.5 xs:w-1 h-5 xs:h-6 sm:h-8 bg-[#FD8958] rounded-full flex-shrink-0"></div>
            <h3 className="text-base xs:text-lg sm:text-2xl md:text-3xl font-semibold text-slate-800 dark:text-white truncate">
              Active Projects
            </h3>
          </div>
          {projects.length === 0 ? (
            <div className="text-center py-8 xs:py-12 sm:py-16 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-lg xs:rounded-xl sm:rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 px-4">
              <div className="inline-flex items-center justify-center w-12 h-12 xs:w-16 xs:h-16 sm:w-20 sm:h-20 bg-[#F8EEF8] dark:bg-[#F8EEF8]/20 rounded-lg xs:rounded-xl sm:rounded-2xl mb-2 xs:mb-3 sm:mb-4">
                <FolderOpen className="w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 text-[#FD8958]" />
              </div>
              <p className="text-slate-600 dark:text-slate-400 font-semibold text-sm xs:text-base sm:text-lg">
                No projects yet.
              </p>
              <p className="text-slate-500 dark:text-slate-500 text-xs sm:text-sm mt-1">
                Create your first project to get started!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-5 md:gap-6">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={{
                    id: project.id,
                    name: project.name,
                    description: project.description || "",
                    progress: project.progress || 0,
                    tasks: project.tasks?.length || 0,
                    completed:
                      project.tasks?.filter(
                        (t: any) => t.status === "completed"
                      ).length || 0,
                    teamMembers: 0,
                    deadline: project.deadline || "",
                  }}
                  onSelect={() => onProjectSelect(project.id)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Tasks Section */}
        <section>
          <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3 mb-3 xs:mb-4 sm:mb-6">
            <div className="w-0.5 xs:w-1 h-5 xs:h-6 sm:h-8 bg-[#FD8958] rounded-full flex-shrink-0"></div>
            <h3 className="text-base xs:text-lg sm:text-2xl md:text-3xl font-semibold text-slate-800 dark:text-white truncate">
              My Tasks
            </h3>
          </div>
          {tasks.length === 0 ? (
            <div className="text-center py-8 xs:py-12 sm:py-16 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-lg xs:rounded-xl sm:rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 px-4">
              <div className="inline-flex items-center justify-center w-12 h-12 xs:w-16 xs:h-16 sm:w-20 sm:h-20 bg-[#F8EEF8] dark:bg-[#F8EEF8]/20 rounded-lg xs:rounded-xl sm:rounded-2xl mb-2 xs:mb-3 sm:mb-4">
                <Clock className="w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 text-[#FD8958]" />
              </div>
              <p className="text-slate-600 dark:text-slate-400 font-semibold text-sm xs:text-base sm:text-lg">
                No tasks assigned yet.
              </p>
              <p className="text-slate-500 dark:text-slate-500 text-xs sm:text-sm mt-1">
                Tasks will appear here once assigned.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2 xs:gap-3 sm:gap-4">
              {tasks.slice(0, 4).map((task) => (
                <TaskCard
                  key={task.id}
                  task={{
                    id: task.id,
                    title: task.title,
                    assignee: task.assignedTo?.name || "Unassigned",
                    dueDate: task.dueDate || "",
                    priority: task.priority || "medium",
                    status: task.status || "pending",
                  }}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      {showCreateProject && (
        <CreateProjectModal
          onClose={() => setShowCreateProject(false)}
          onSuccess={handleProjectCreated}
        />
      )}
    </div>
  );
}
