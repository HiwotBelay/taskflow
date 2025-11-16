'use client';

import { getUser } from './auth';

export const isAdminOrManager = (): boolean => {
  const user = getUser();
  if (!user || !user.role) return false;
  const role = user.role.toLowerCase();
  return role === 'admin' || role === 'manager';
};

export const isTeamMember = (): boolean => {
  const user = getUser();
  if (!user || !user.role) return false;
  const role = user.role.toLowerCase();
  return role === 'team member' || role === 'developer';
};

export const canCreateProjects = (): boolean => {
  return isAdminOrManager();
};

export const canCreateTasks = (): boolean => {
  return isAdminOrManager();
};

export const canDeleteProjects = (): boolean => {
  return isAdminOrManager();
};

export const canDeleteTasks = (): boolean => {
  return isAdminOrManager();
};

export const canEditProject = (projectCreatorId?: string): boolean => {
  if (isAdminOrManager()) return true;
  const user = getUser();
  return user?.id === projectCreatorId;
};

export const canEditTask = (taskCreatorId?: string, projectCreatorId?: string, assignedToId?: string): boolean => {
  if (isAdminOrManager()) return true;
  const user = getUser();
  // Team members can only edit status of tasks assigned to them
  return user?.id === taskCreatorId || user?.id === projectCreatorId || user?.id === assignedToId;
};

export const canOnlyUpdateStatus = (taskCreatorId?: string, projectCreatorId?: string, assignedToId?: string): boolean => {
  if (isAdminOrManager()) return false;
  const user = getUser();
  // If user is assigned to task but not creator, they can only update status
  return user?.id === assignedToId && user?.id !== taskCreatorId && user?.id !== projectCreatorId;
};

