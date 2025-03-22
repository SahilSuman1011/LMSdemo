import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Loader2 } from "lucide-react";

interface AuthLayoutProps {
  children?: React.ReactNode;
  userRole?: "admin" | "user";
  isAuthenticated?: boolean;
  isLoading?: boolean;
  userName?: string;
  notificationCount?: number;
}

const AuthLayout = ({
  children,
  userRole = "user",
  isAuthenticated = true,
  isLoading = false,
  userName = "John Doe",
  notificationCount = 3,
}: AuthLayoutProps) => {
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Redirect to login if not authenticated
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Show loading state
  if (isLoading || !isMounted) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-lg font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, don't render the layout
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar userRole={userRole} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          userName={userName}
          userRole={
            userRole === "admin" ? "Administrator" : "Sales Representative"
          }
          notificationCount={notificationCount}
          onLogout={() => {
            // Handle logout logic here
            navigate("/login");
          }}
          onProfileClick={() => {
            navigate("/settings");
          }}
        />

        <main className="flex-1 overflow-auto p-6">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;
