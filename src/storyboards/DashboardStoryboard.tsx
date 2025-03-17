import React from "react";
import Dashboard from "@/pages/Dashboard";

export default function DashboardStoryboard() {
  return (
    <Dashboard
      isPremium={true}
      username="John Doe"
      remainingQueries={3}
      onUpgrade={() => console.log("Upgrade clicked")}
    />
  );
}
