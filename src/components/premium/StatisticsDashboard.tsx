import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  BarChart,
  LineChart,
  PieChart,
  Download,
  TrendingUp,
  TrendingDown,
  AlertCircle,
} from "lucide-react";
import { Progress } from "../ui/progress";
import { cn } from "@/lib/utils";

interface StatisticsDashboardProps {
  userName?: string;
  totalAnalyses?: number;
  credibilityScores?: {
    date: string;
    score: number;
  }[];
  sourceBreakdown?: {
    source: string;
    count: number;
    averageCredibility: number;
  }[];
  recentActivity?: {
    date: string;
    url: string;
    score: number;
  }[];
}

const StatisticsDashboard = ({
  userName = "Premium User",
  totalAnalyses = 127,
  credibilityScores = [
    { date: "Jan", score: 65 },
    { date: "Feb", score: 59 },
    { date: "Mar", score: 80 },
    { date: "Apr", score: 81 },
    { date: "May", score: 56 },
    { date: "Jun", score: 72 },
  ],
  sourceBreakdown = [
    { source: "CNN", count: 32, averageCredibility: 76 },
    { source: "Fox News", count: 28, averageCredibility: 62 },
    { source: "BBC", count: 45, averageCredibility: 88 },
    { source: "Reuters", count: 22, averageCredibility: 92 },
  ],
  recentActivity = [
    { date: "2023-06-15", url: "twitter.com/user1/status/123456", score: 85 },
    { date: "2023-06-14", url: "twitter.com/user2/status/789012", score: 42 },
    { date: "2023-06-13", url: "twitter.com/user3/status/345678", score: 91 },
    { date: "2023-06-12", url: "twitter.com/user4/status/901234", score: 67 },
  ],
}: StatisticsDashboardProps) => {
  const [timeRange, setTimeRange] = useState("month");

  return (
    <div className="w-full max-w-7xl mx-auto p-4 bg-white dark:bg-gray-950 rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Statistics Dashboard
          </h2>
          <p className="text-muted-foreground">
            Welcome back, {userName}. Here's your analysis overview.
          </p>
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last 7 days</SelectItem>
              <SelectItem value="month">Last 30 days</SelectItem>
              <SelectItem value="quarter">Last 90 days</SelectItem>
              <SelectItem value="year">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Analyses
            </CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAnalyses}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Credibility
            </CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72%</div>
            <p className="text-xs text-muted-foreground">+4% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Verified Sources
            </CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground">+2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Flagged Content
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14</div>
            <p className="text-xs text-muted-foreground">-3 from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-3 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sources">Sources</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Credibility Score Trend</CardTitle>
              <CardDescription>Your analysis scores over time</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <div className="h-full flex items-end justify-between gap-2">
                {credibilityScores.map((item, index) => (
                  <div
                    key={index}
                    className="relative h-full flex flex-col items-center justify-end"
                  >
                    <div
                      className={cn(
                        "w-12 rounded-t-md",
                        item.score > 75
                          ? "bg-green-500"
                          : item.score > 50
                            ? "bg-yellow-500"
                            : "bg-red-500",
                      )}
                      style={{ height: `${item.score}%` }}
                    />
                    <span className="text-xs mt-2">{item.date}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Source Breakdown</CardTitle>
              <CardDescription>
                Most analyzed sources and their credibility
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {sourceBreakdown.map((source, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{source.source}</div>
                      <div className="text-sm text-muted-foreground">
                        {source.count} analyses
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={source.averageCredibility}
                        className="h-2"
                      />
                      <span className="text-sm font-medium">
                        {source.averageCredibility}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Analyses</CardTitle>
              <CardDescription>
                Your latest Twitter post verifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div>
                      <div className="font-medium truncate max-w-[250px]">
                        {activity.url}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {activity.date}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          "px-2.5 py-0.5 rounded-full text-xs font-medium",
                          activity.score > 75
                            ? "bg-green-100 text-green-800"
                            : activity.score > 50
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800",
                        )}
                      >
                        {activity.score}%
                      </div>
                      {activity.score > 75 ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : activity.score > 50 ? (
                        <div className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-end">
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Download className="mr-2 h-4 w-4" />
          Download Full Report
        </Button>
      </div>
    </div>
  );
};

export default StatisticsDashboard;
