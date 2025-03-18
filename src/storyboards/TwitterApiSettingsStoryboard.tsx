import React from "react";
import TwitterApiSettings from "@/components/settings/TwitterApiSettings";
import { TwitterApiProvider } from "@/contexts/TwitterApiContext";

export default function TwitterApiSettingsStoryboard() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-md mx-auto">
        <TwitterApiProvider>
          <TwitterApiSettings />
        </TwitterApiProvider>
      </div>
    </div>
  );
}
