import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertCircle,
  Bell,
  ChevronDown,
  LogOut,
  Settings,
  Twitter,
  User,
} from "lucide-react";

interface NavbarProps {
  isLoggedIn?: boolean;
  isPremium?: boolean;
  username?: string;
  avatarUrl?: string;
  onLogin?: () => void;
  onSignup?: () => void;
  onLogout?: () => void;
}

const Navbar = ({
  isLoggedIn = false,
  isPremium = false,
  username = "User",
  avatarUrl = "",
  onLogin = () => {},
  onSignup = () => {},
  onLogout = () => {},
}: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="w-full h-[70px] bg-white border-b border-gray-200 shadow-sm fixed top-0 left-0 z-50">
      <div className="container mx-auto h-full px-4 flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-2">
          <Twitter className="h-8 w-8 text-blue-500" />
          <span className="text-xl font-bold hidden sm:inline">
            Fake News Detector
          </span>
          {isPremium && (
            <span className="bg-gradient-to-r from-blue-500 to-blue-400 text-white text-xs px-2 py-0.5 rounded-full ml-2">
              PREMIUM
            </span>
          )}
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className={`font-medium ${isActive("/") ? "text-blue-600" : "text-gray-700 hover:text-blue-500"}`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`font-medium ${isActive("/about") ? "text-blue-600" : "text-gray-700 hover:text-blue-500"}`}
          >
            About
          </Link>
          <Link
            to="/pricing"
            className={`font-medium ${isActive("/pricing") ? "text-blue-600" : "text-gray-700 hover:text-blue-500"}`}
          >
            Pricing
          </Link>
          <Link
            to="/faq"
            className={`font-medium ${isActive("/faq") ? "text-blue-600" : "text-gray-700 hover:text-blue-500"}`}
          >
            FAQ
          </Link>
          {isLoggedIn && (
            <Link
              to="/dashboard"
              className={`font-medium ${isActive("/dashboard") ? "text-blue-600" : "text-gray-700 hover:text-blue-500"}`}
            >
              Dashboard
            </Link>
          )}
        </div>

        {/* Auth Buttons or User Menu */}
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              {/* Notification Bell */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </Button>

              {/* User Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={avatarUrl} alt={username} />
                      <AvatarFallback>
                        {username.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline">{username}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                    <AlertCircle className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  {!isPremium && (
                    <DropdownMenuItem
                      className="text-blue-600 font-medium"
                      onClick={() => navigate("/pricing")}
                    >
                      <span>Upgrade to Premium - $9/month</span>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={onLogin}>
                Log in
              </Button>
              <Button onClick={onSignup}>Sign up</Button>
            </>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 py-4 px-4 absolute w-full">
          <div className="flex flex-col space-y-3">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-500 font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-blue-500 font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/pricing"
              className="text-gray-700 hover:text-blue-500 font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              to="/faq"
              className="text-gray-700 hover:text-blue-500 font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
