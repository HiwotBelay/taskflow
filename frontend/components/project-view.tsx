"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Filter,
  MoreHorizontal,
  Calendar,
  Edit2,
  Clock,
  Trash2,
} from "lucide-react";
import { TaskForm } from "./task-form";
import { api } from "@/lib/api";
import { getToken } from "@/lib/auth";
import {
  canCreateTasks,
  canEditTask,
  canOnlyUpdateStatus,
  canDeleteTasks,
} from "@/lib/roles";
import { toast } from "sonner";
import { TaskCard } from "./task-card";

interface ProjectViewProps {
  projectId: string | null;
}

export function ProjectView({ projectId }: ProjectViewProps) {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState<
    "all" | "pending" | "in-progress" | "completed"
  >("all");
  const [project, setProject] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const token = getToken();

  useEffect(() => {
    if (!token || !projectId) return;
    loadData();
  }, [token, projectId]);

  const loadData = async () => {
    if (!token || !projectId) return;

    try {
      setLoading(true);
      const [projectData, tasksData, membersData] = await Promise.all([
        api.projects.getOne(projectId, token),
        api.tasks.getAll(token, projectId),
        api.teamMembers.getAll(token),
      ]);

      setProject(projectData);
      setTasks(tasksData || []);
      setTeamMembers(membersData || []);
    } catch (err: any) {
      toast.error("Failed to load project data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskCreated = () => {
    setShowTaskForm(false);
    loadData();
  };

  const handleTaskUpdated = () => {
    setEditingTask(null);
    loadData();
  };

  const handleEditTask = (task: any) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleUpdateTaskStatus = async (taskId: string, newStatus: string) => {
    if (!token) return;

    try {
      await api.tasks.update(taskId, { status: newStatus }, token);
      toast.success("Task status updated");
      loadData();
    } catch (err: any) {
      toast.error("Failed to update task status");
    }
  };

  const filteredTasks = tasks.filter(
    (t) => filterStatus === "all" || t.status === filterStatus
  );

  if (loading) {
    return (
      <div className="flex-1 overflow-auto flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex-1 overflow-auto flex items-center justify-center">
        <div className="text-center">
          <p className="text-foreground font-semibold">Project not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto flex flex-col bg-gradient-to-br from-[#F8EEF8] via-white to-[#FFF4F0] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 p-6 md:p-8 sticky top-0 z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex-1">
          <h2 className="text-4xl md:text-5xl font-semibold mb-2">
            <span className="text-slate-800 dark:text-white">
              {project.name}
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 font-medium text-lg mb-2">
            {project.description ||
              "Manage your project tasks and team assignments"}
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            {project.deadline && (
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <Calendar className="w-4 h-4" />
                <span>
                  Deadline:{" "}
                  <strong>
                    {new Date(project.deadline).toLocaleDateString()}
                  </strong>
                </span>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <Clock className="w-4 h-4" />
              <span>
                Progress: <strong>{project.progress || 0}%</strong>
              </span>
            </div>
          </div>
        </div>
        {canCreateTasks() && (
          <button
            onClick={() => {
              setEditingTask(null);
              setShowTaskForm(true);
            }}
            className="group flex items-center gap-2 bg-[#FD8958] hover:bg-[#E8703F] text-white px-6 py-3.5 rounded-xl font-medium transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            New Task
          </button>
        )}
      </header>

      {/* Content */}
      <div className="flex-1 p-6 md:p-8 space-y-6">
        {/* Filter */}
        <div className="flex items-center gap-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-200/50 dark:border-slate-700/50">
          <div className="p-2 bg-[#FD8958] rounded-lg">
            <Filter className="w-5 h-5 text-white" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {(["all", "pending", "in-progress", "completed"] as const).map(
              (status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 transform hover:scale-[1.02] ${
                    filterStatus === status
                      ? "bg-[#FD8958] text-white shadow-sm"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                  }`}
                >
                  {status.replace("-", " ").charAt(0).toUpperCase() +
                    status.slice(1)}
                </button>
              )
            )}
          </div>
        </div>

        {/* Tasks */}
        {filteredTasks.length === 0 ? (
          <div className="text-center py-16 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#F8EEF8] dark:bg-[#F8EEF8]/20 rounded-2xl mb-4">
              <Clock className="w-10 h-10 text-[#FD8958]" />
            </div>
            <p className="text-slate-600 dark:text-slate-400 font-semibold text-lg">
              No tasks found
            </p>
            <p className="text-slate-500 dark:text-slate-500 text-sm mt-1">
              {filterStatus === "all"
                ? "Create your first task to get started!"
                : `No ${filterStatus.replace("-", " ")} tasks`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredTasks.map((task) => {
              const canEdit = canEditTask(
                task.createdBy?.id,
                project?.createdBy?.id,
                task.assignedTo?.id
              );
              const onlyStatus = canOnlyUpdateStatus(
                task.createdBy?.id,
                project?.createdBy?.id,
                task.assignedTo?.id
              );
              const canDelete = canDeleteTasks();

              return (
                <div key={task.id} className="relative">
                  <TaskCard
                    task={{
                      id: task.id,
                      title: task.title,
                      assignee: task.assignedTo?.name || "Unassigned",
                      dueDate: task.dueDate || "",
                      priority: task.priority || "medium",
                      status: task.status || "pending",
                    }}
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    {canEdit && (
                      <button
                        onClick={() => handleEditTask(task)}
                        className="p-2 bg-white/90 dark:bg-slate-800/90 rounded-lg shadow-sm hover:shadow-md text-slate-600 hover:text-[#FD8958] dark:text-slate-400 dark:hover:text-[#FD8958] transition-all"
                        title={
                          onlyStatus
                            ? "Update task status"
                            : "Edit task / Adjust schedule"
                        }
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    )}
                    {canDelete && (
                      <button
                        onClick={async () => {
                          if (
                            confirm(
                              "Are you sure you want to delete this task?"
                            )
                          ) {
                            try {
                              await api.tasks.delete(task.id, token!);
                              toast.success("Task deleted");
                              loadData();
                            } catch (err: any) {
                              toast.error("Failed to delete task");
                            }
                          }
                        }}
                        className="p-2 bg-white/90 dark:bg-slate-800/90 rounded-lg shadow-sm hover:shadow-md text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-all"
                        title="Delete task"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {showTaskForm && (
        <TaskForm
          projectId={projectId!}
          task={editingTask}
          teamMembers={teamMembers}
          onClose={() => {
            setShowTaskForm(false);
            setEditingTask(null);
          }}
          onSuccess={editingTask ? handleTaskUpdated : handleTaskCreated}
        />
      )}
    </div>
  );
}
