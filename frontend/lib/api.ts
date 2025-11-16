const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

interface RequestOptions extends RequestInit {
  token?: string;
}

async function request<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const { token, ...fetchOptions } = options;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...fetchOptions.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...fetchOptions,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ 
        message: `Network error: ${response.status} ${response.statusText}` 
      }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error: any) {
    // Handle network errors (backend not running, CORS, etc.)
    if (error.name === 'TypeError' || error.message.includes('Failed to fetch')) {
      throw new Error(
        `Cannot connect to backend server. Please ensure the backend is running on ${API_URL}. ` +
        `Error: ${error.message}`
      );
    }
    throw error;
  }
}

export const api = {
  auth: {
    login: (email: string, password: string) =>
      request<{ access_token: string; user: any }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),

    register: (data: {
      name: string;
      email: string;
      password: string;
      role?: string;
      phone?: string;
    }) =>
      request<{ access_token: string; user: any }>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  },

  projects: {
    getAll: (token: string) =>
      request<any[]>('/projects', {
        method: 'GET',
        token,
      }),

    getOne: (id: string, token: string) =>
      request<any>(`/projects/${id}`, {
        method: 'GET',
        token,
      }),

    create: (data: { name: string; description?: string; deadline?: string }, token: string) =>
      request<any>('/projects', {
        method: 'POST',
        body: JSON.stringify(data),
        token,
      }),

    update: (id: string, data: any, token: string) =>
      request<any>(`/projects/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        token,
      }),

    delete: (id: string, token: string) =>
      request<void>(`/projects/${id}`, {
        method: 'DELETE',
        token,
      }),
  },

  tasks: {
    getAll: (token: string, projectId?: string) =>
      request<any[]>(`/tasks${projectId ? `?projectId=${projectId}` : ''}`, {
        method: 'GET',
        token,
      }),

    getOne: (id: string, token: string) =>
      request<any>(`/tasks/${id}`, {
        method: 'GET',
        token,
      }),

    create: (
      data: {
        title: string;
        description?: string;
        projectId: string;
        assignedTo?: string;
        priority?: string;
        dueDate?: string;
      },
      token: string,
    ) =>
      request<any>('/tasks', {
        method: 'POST',
        body: JSON.stringify(data),
        token,
      }),

    update: (id: string, data: any, token: string) =>
      request<any>(`/tasks/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        token,
      }),

    delete: (id: string, token: string) =>
      request<void>(`/tasks/${id}`, {
        method: 'DELETE',
        token,
      }),
  },

  teamMembers: {
    getAll: (token: string, status?: string) =>
      request<any[]>(`/team-members${status ? `?status=${status}` : ''}`, {
        method: 'GET',
        token,
      }),

    getOne: (id: string, token: string) =>
      request<any>(`/team-members/${id}`, {
        method: 'GET',
        token,
      }),

    create: (
      data: {
        name: string;
        email: string;
        phone?: string;
        role: string;
        status?: string;
      },
      token: string,
    ) =>
      request<any>('/team-members', {
        method: 'POST',
        body: JSON.stringify(data),
        token,
      }),

    updateStatus: (id: string, status: string, token: string) =>
      request<any>(`/team-members/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
        token,
      }),

    delete: (id: string, token: string) =>
      request<void>(`/team-members/${id}`, {
        method: 'DELETE',
        token,
      }),
  },

  issues: {
    getAll: (token: string, taskId?: string) =>
      request<any[]>(`/issues${taskId ? `?taskId=${taskId}` : ''}`, {
        method: 'GET',
        token,
      }),

    getOne: (id: string, token: string) =>
      request<any>(`/issues/${id}`, {
        method: 'GET',
        token,
      }),

    create: (
      data: {
        title: string;
        description?: string;
        taskId: string;
        severity?: string;
        assignedTo?: string;
      },
      token: string,
    ) =>
      request<any>('/issues', {
        method: 'POST',
        body: JSON.stringify(data),
        token,
      }),

    resolve: (id: string, status: string, token: string) =>
      request<any>(`/issues/${id}/resolve`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
        token,
      }),

    delete: (id: string, token: string) =>
      request<void>(`/issues/${id}`, {
        method: 'DELETE',
        token,
      }),
  },

  notifications: {
    getAll: (token: string, unread?: boolean) =>
      request<any[]>(`/notifications${unread !== undefined ? `?unread=${unread}` : ''}`, {
        method: 'GET',
        token,
      }),

    markAsRead: (id: string, token: string) =>
      request<any>(`/notifications/${id}/read`, {
        method: 'PATCH',
        token,
      }),

    markAllAsRead: (token: string) =>
      request<{ count: number }>('/notifications/read-all', {
        method: 'PATCH',
        token,
      }),

    delete: (id: string, token: string) =>
      request<void>(`/notifications/${id}`, {
        method: 'DELETE',
        token,
      }),
  },
};





