"use client"

import { Bell, Trash2, CheckCircle2, AlertCircle, MessageSquare, Clock, Calendar } from "lucide-react"
import { useState, useEffect } from "react"
import { api } from "@/lib/api"
import { getToken } from "@/lib/auth"
import { toast } from "sonner"
import { io, Socket } from "socket.io-client"

export function NotificationsView() {
  const [notifications, setNotifications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [socket, setSocket] = useState<Socket | null>(null)

  const token = getToken()

  useEffect(() => {
    if (!token) return

    // Load initial notifications
    loadNotifications()

    // Connect to WebSocket for real-time updates
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'
    const wsUrl = API_URL.replace('/api', '')

    const newSocket = io(wsUrl, {
      auth: { token },
      transports: ['websocket', 'polling'],
    })

    newSocket.on('connect', () => {
      console.log('Connected to notifications server')
    })

    newSocket.on('notification', (notification: any) => {
      // Add new notification to the list
      setNotifications((prev) => [notification, ...prev])
      toast.info(notification.title, {
        description: notification.message,
      })
    })

    newSocket.on('notification:assigned', (data: any) => {
      const notification = {
        id: `assigned-${Date.now()}`,
        type: 'task-assigned',
        title: 'Task Assigned',
        message: `You have been assigned a new task`,
        isRead: false,
        createdAt: new Date(),
      }
      setNotifications((prev) => [notification, ...prev])
      toast.info('New task assigned!')
    })

    newSocket.on('disconnect', () => {
      console.log('Disconnected from notifications server')
    })

    setSocket(newSocket)

    return () => {
      newSocket.close()
    }
  }, [token])

  const loadNotifications = async () => {
    if (!token) return

    try {
      setLoading(true)
      const data = await api.notifications.getAll(token)
      setNotifications(data || [])
    } catch (err: any) {
      toast.error("Failed to load notifications")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "task-assigned":
        return <CheckCircle2 className="w-5 h-5 text-blue-500" />
      case "schedule-updated":
        return <Calendar className="w-5 h-5 text-orange-500" />
      case "task-completed":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />
      case "issue-assigned":
      case "issue-reported":
        return <AlertCircle className="w-5 h-5 text-red-500" />
      case "issue-resolved":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />
      case "project-created":
        return <Bell className="w-5 h-5 text-purple-500" />
      default:
        return <Bell className="w-5 h-5 text-blue-500" />
    }
  }

  const formatTimestamp = (date: Date | string) => {
    const notificationDate = typeof date === 'string' ? new Date(date) : date
    const now = new Date()
    const diff = now.getTime() - notificationDate.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`
    if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`
    return `${days} day${days !== 1 ? 's' : ''} ago`
  }

  const handleDelete = async (id: string) => {
    if (!token) return
    try {
      await api.notifications.delete(id, token)
      setNotifications(notifications.filter((n) => n.id !== id))
      toast.success("Notification deleted")
    } catch (err: any) {
      toast.error("Failed to delete notification")
    }
  }

  const handleMarkAsRead = async (id: string) => {
    if (!token) return
    try {
      await api.notifications.markAsRead(id, token)
      setNotifications(notifications.map((n) => 
        n.id === id ? { ...n, isRead: true } : n
      ))
    } catch (err: any) {
      toast.error("Failed to mark as read")
    }
  }

  const handleMarkAllAsRead = async () => {
    if (!token) return
    try {
      await api.notifications.markAllAsRead(token)
      setNotifications(notifications.map((n) => ({ ...n, isRead: true })))
      toast.success("All notifications marked as read")
    } catch (err: any) {
      toast.error("Failed to mark all as read")
    }
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length

  if (loading) {
    return (
      <div className="flex-1 overflow-auto flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading notifications...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-auto flex flex-col bg-gradient-to-br from-[#F8EEF8] via-white to-[#FFF4F0] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 p-6 md:p-8 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-800 dark:text-white">
              Notifications
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-1 font-medium">
              {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
            </p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="px-4 py-2 text-sm font-medium text-[#FD8958] hover:text-[#E8703F] transition-smooth"
            >
              Mark all as read
            </button>
          )}
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 p-6 md:p-8">
        <div className="space-y-3 max-w-2xl mx-auto">
          {notifications.length === 0 ? (
            <div className="text-center py-16 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700">
              <Bell className="w-12 h-12 text-slate-400 mx-auto mb-3 opacity-50" />
              <p className="text-slate-600 dark:text-slate-400 font-semibold">No notifications yet</p>
              <p className="text-slate-500 dark:text-slate-500 text-sm mt-1">
                Notifications will appear here when tasks are assigned or updated
              </p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => !notif.isRead && handleMarkAsRead(notif.id)}
                className={`rounded-xl p-4 flex items-start gap-4 transition-all cursor-pointer hover:shadow-md ${
                  notif.isRead 
                    ? "bg-white/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50" 
                    : "bg-blue-50/80 dark:bg-blue-900/20 border-l-4 border-[#FD8958] shadow-sm"
                }`}
              >
                <div className="flex-shrink-0 mt-0.5">{getIcon(notif.type)}</div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-slate-900 dark:text-white">{notif.title}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{notif.message}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
                    {formatTimestamp(notif.createdAt)}
                  </p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDelete(notif.id)
                  }}
                  className="flex-shrink-0 text-slate-400 hover:text-red-500 transition-smooth p-1"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
