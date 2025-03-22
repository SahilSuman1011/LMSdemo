import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import LeadDashboard from "./leads/LeadDashboard";

interface HomeProps {
  userRole?: "admin" | "user";
  isAuthenticated?: boolean;
  isLoading?: boolean;
  userName?: string;
  notificationCount?: number;
}

const Home = ({
  userRole = "user",
  isAuthenticated = true,
  isLoading: initialLoading = false,
  userName = "John Doe",
  notificationCount = 3,
}: HomeProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(initialLoading || true);

  // Simulate authentication check
  useEffect(() => {
    // In a real app, you would check for a token in localStorage or a cookie
    const checkAuth = async () => {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For demo purposes, we'll assume the user is authenticated
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <AuthLayout
        userRole={userRole}
        isAuthenticated={isAuthenticated}
        isLoading={isLoading}
        userName={userName}
        notificationCount={notificationCount}
      >
        <LeadDashboard userRole={userRole} />
      </AuthLayout>
    </div>
  );
};

export default Home;
