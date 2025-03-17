import React from "react";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
  isLoggedIn?: boolean;
  isPremium?: boolean;
  username?: string;
  avatarUrl?: string;
  onLogin?: () => void;
  onSignup?: () => void;
  onLogout?: () => void;
}

const Layout = ({
  children,
  isLoggedIn = false,
  isPremium = false,
  username = "User",
  avatarUrl = "",
  onLogin = () => {},
  onSignup = () => {},
  onLogout = () => {},
}: LayoutProps) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar
        isLoggedIn={isLoggedIn}
        isPremium={isPremium}
        username={username}
        avatarUrl={
          avatarUrl ||
          `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`
        }
        onLogin={onLogin}
        onSignup={onSignup}
        onLogout={onLogout}
      />

      {/* Main Content */}
      <main className="pt-[70px]">{children}</main>

      {/* Footer - only show on non-dashboard pages */}
      {location.pathname !== "/dashboard" && (
        <footer className="bg-gray-900 text-white py-8 mt-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-sm text-gray-400">
                  © {new Date().getFullYear()} Fake News Detector. All rights
                  reserved.
                </p>
              </div>
              <div className="flex space-x-6">
                <a
                  href="/about"
                  className="text-sm text-gray-400 hover:text-white"
                >
                  About
                </a>
                <a
                  href="/pricing"
                  className="text-sm text-gray-400 hover:text-white"
                >
                  Pricing
                </a>
                <a
                  href="/faq"
                  className="text-sm text-gray-400 hover:text-white"
                >
                  FAQ
                </a>
                <a href="#" className="text-sm text-gray-400 hover:text-white">
                  Privacy Policy
                </a>
                <a href="#" className="text-sm text-gray-400 hover:text-white">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;
