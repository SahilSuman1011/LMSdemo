import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Home,
  Users,
  Phone,
  Calendar,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Sparkles,
} from "lucide-react";

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  isCollapsed: boolean;
}

const SidebarLink = ({
  to,
  icon,
  label,
  isActive,
  isCollapsed = false,
}: SidebarLinkProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link to={to}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 px-3 transition-all duration-200",
                isCollapsed ? "justify-center px-2" : "",
                isActive
                  ? "bg-primary/10 text-primary font-medium border-r-2 border-primary"
                  : "hover:bg-primary/5 hover:text-primary",
              )}
            >
              <span className="shrink-0">{icon}</span>
              {!isCollapsed && <span>{label}</span>}
            </Button>
          </Link>
        </TooltipTrigger>
        {isCollapsed && <TooltipContent side="right">{label}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );
};

interface SidebarProps {
  userRole?: "admin" | "user";
}

const Sidebar = ({ userRole = "user" }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navLinks = [
    {
      to: "/dashboard",
      icon: <Home size={20} />,
      label: "Dashboard",
      showFor: ["admin", "user"],
    },
    {
      to: "/leads",
      icon: <Users size={20} />,
      label: "Leads",
      showFor: ["admin", "user"],
    },
    {
      to: "/calls",
      icon: <Phone size={20} />,
      label: "Calls",
      showFor: ["admin", "user"],
    },
    {
      to: "/follow-ups",
      icon: <Calendar size={20} />,
      label: "Follow-ups",
      showFor: ["admin", "user"],
    },
    {
      to: "/admin",
      icon: <BarChart3 size={20} />,
      label: "Admin Panel",
      showFor: ["admin"],
    },
    {
      to: "/settings",
      icon: <Settings size={20} />,
      label: "Settings",
      showFor: ["admin", "user"],
    },
  ];

  const filteredLinks = navLinks.filter((link) =>
    link.showFor.includes(userRole),
  );

  return (
    <div
      className={cn(
        "flex h-full flex-col bg-background p-3 transition-all duration-300 border-r border-border",
        isCollapsed ? "w-[70px]" : "w-[250px]",
      )}
    >
      <div className="flex items-center justify-between py-4">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="bg-primary w-8 h-8 rounded-md flex items-center justify-center">
              <Sparkles className="text-primary-foreground h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Lead Manager</h2>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="ml-auto text-muted-foreground hover:text-foreground hover:bg-primary/10"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>

      <div className="mt-6 space-y-1">
        {filteredLinks.map((link) => (
          <SidebarLink
            key={link.to}
            to={link.to}
            icon={link.icon}
            label={link.label}
            isActive={currentPath === link.to}
            isCollapsed={isCollapsed}
          />
        ))}
      </div>

      <div className="mt-auto pb-4">
        <Link to="/login">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 px-3 text-destructive hover:bg-destructive/10 hover:text-destructive transition-all duration-200",
                    isCollapsed ? "justify-center px-2" : "",
                  )}
                >
                  <LogOut size={20} />
                  {!isCollapsed && <span>Logout</span>}
                </Button>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right">Logout</TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
