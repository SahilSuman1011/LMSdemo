import React from "react";
import { Button } from "./button";
import { useNotifications } from "./notification-provider";

export function NotificationDemo() {
  const { addNotification } = useNotifications();

  const createInfoNotification = () => {
    addNotification({
      title: "Information",
      description: "This is an informational notification.",
      type: "info",
    });
  };

  const createSuccessNotification = () => {
    addNotification({
      title: "Success",
      description: "Operation completed successfully!",
      type: "success",
    });
  };

  const createWarningNotification = () => {
    addNotification({
      title: "Warning",
      description: "This action might have consequences.",
      type: "warning",
    });
  };

  const createErrorNotification = () => {
    addNotification({
      title: "Error",
      description: "Something went wrong. Please try again.",
      type: "error",
    });
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={createInfoNotification}>
        Info Notification
      </Button>
      <Button variant="outline" onClick={createSuccessNotification}>
        Success Notification
      </Button>
      <Button variant="outline" onClick={createWarningNotification}>
        Warning Notification
      </Button>
      <Button variant="outline" onClick={createErrorNotification}>
        Error Notification
      </Button>
    </div>
  );
}
