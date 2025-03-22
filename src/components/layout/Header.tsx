import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ChevronDown, Search, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { ThemeToggle } from "../ui/theme-toggle";
import { NotificationDropdown } from "../ui/notification-dropdown";

interface HeaderProps {
  userName?: string;
  userRole?: string;
  notificationCount?: number;
  onLogout?: () => void;
  onProfileClick?: () => void;
  onNotificationsClick?: () => void;
}

const Header = ({
  userName = "John Doe",
  userRole = "Sales Representative",
  notificationCount = 3,
  onLogout = () => console.log("Logout clicked"),
  onProfileClick = () => console.log("Profile clicked"),
  onNotificationsClick = () => console.log("Notifications clicked"),
}: HeaderProps) => {
  return (
    <header className="bg-background border-b border-border h-[70px] flex items-center justify-between px-6 w-full">
      <div className="flex items-center gap-4 w-1/3">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search leads, contacts..."
            className="pl-10 bg-background/5 border-border focus:border-primary focus:ring-1 focus:ring-primary w-full text-foreground"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />

        <NotificationDropdown />

        <div className="h-6 w-px bg-border"></div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 px-2 hover:bg-accent text-foreground"
            >
              <div className="relative">
                <div className="absolute -inset-0.5 rounded-full bg-primary blur-sm opacity-70"></div>
                <Avatar className="h-8 w-8 relative">
                  <AvatarImage
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=sales-rep"
                    alt={userName}
                  />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {userName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-col items-start text-sm">
                <span className="font-medium">{userName}</span>
                <span className="text-xs text-muted-foreground">
                  {userRole}
                </span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 bg-popover backdrop-blur-md border border-border text-popover-foreground"
          >
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem
              onClick={onProfileClick}
              className="hover:bg-accent focus:bg-accent cursor-pointer"
            >
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-accent focus:bg-accent cursor-pointer">
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-accent focus:bg-accent cursor-pointer">
              Help
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem
              onClick={onLogout}
              className="text-destructive hover:bg-destructive/10 focus:bg-destructive/10 cursor-pointer"
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
