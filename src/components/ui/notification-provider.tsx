import React, { createContext, useContext, useState, useEffect } from "react";
import { format, isToday, isTomorrow } from "date-fns";
import { toast } from "./use-toast";

type NotificationType = "info" | "success" | "warning" | "error";

type Notification = {
  id: string;
  title: string;
  description?: string;
  type: NotificationType;
  read: boolean;
  timestamp: Date;
};

type FollowUpReminder = {
  id: string;
  leadName: string;
  date: Date;
  notes: string;
};

type NotificationContextType = {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (
    notification: Omit<Notification, "id" | "read" | "timestamp">,
  ) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Mock follow-up data - in a real app, this would come from an API
  const [followUps] = useState<FollowUpReminder[]>([
    {
      id: "f1",
      leadName: "John Doe",
      date: new Date(new Date().setHours(new Date().getHours() + 2)), // 2 hours from now
      notes: "Follow up on science course interest",
    },
    {
      id: "f2",
      leadName: "Jane Smith",
      date: new Date(new Date().setDate(new Date().getDate() + 1)), // Tomorrow
      notes: "Check if received information email",
    },
  ]);

  // Check for upcoming follow-ups and create notifications
  useEffect(() => {
    // Find follow-ups that are due today or tomorrow
    const upcomingFollowUps = followUps.filter(
      (followUp) => isToday(followUp.date) || isTomorrow(followUp.date),
    );

    // Create notifications for upcoming follow-ups
    upcomingFollowUps.forEach((followUp) => {
      const timeLabel = isToday(followUp.date) ? "Today" : "Tomorrow";
      const timeFormatted = format(followUp.date, "h:mm a");

      // Add notification
      addNotification({
        title: `Upcoming Follow-up: ${followUp.leadName}`,
        description: `${timeLabel} at ${timeFormatted} - ${followUp.notes}`,
        type: "info",
      });

      // Show toast for today's follow-ups
      if (isToday(followUp.date)) {
        toast({
          title: `Upcoming Follow-up: ${followUp.leadName}`,
          description: `Today at ${timeFormatted}`,
          duration: 5000,
        });
      }
    });
  }, []);

  const unreadCount = notifications.filter(
    (notification) => !notification.read,
  ).length;

  const addNotification = (
    notification: Omit<Notification, "id" | "read" | "timestamp">,
  ) => {
    const newNotification: Notification = {
      ...notification,
      id: `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      read: false,
      timestamp: new Date(),
    };

    setNotifications((prev) => [newNotification, ...prev]);

    // Also show a toast for immediate attention
    toast({
      title: notification.title,
      description: notification.description,
      variant: notification.type === "error" ? "destructive" : "default",
    });
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true })),
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider",
    );
  }
  return context;
}
