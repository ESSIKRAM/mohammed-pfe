import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface CredibilityScoreCardProps {
  score?: number;
  title?: string;
  explanation?: string;
}

export default function CredibilityScoreCard({
  score = 75,
  title = "Credibility Score",
  explanation = "This tweet has been analyzed and shows a moderate level of credibility based on our analysis.",
}: CredibilityScoreCardProps) {
  // Determine color and icon based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-700";
    if (score >= 50) return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  const getScoreProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="h-6 w-6 text-green-500" />;
    if (score >= 50) return <Info className="h-6 w-6 text-yellow-500" />;
    return <AlertTriangle className="h-6 w-6 text-red-500" />;
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Highly Credible";
    if (score >= 50) return "Moderately Credible";
    return "Low Credibility";
  };

  return (
    <Card className="w-full max-w-[250px] h-[200px] bg-white shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center justify-between">
          {title}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="w-[200px] text-xs">
                  Our credibility score is based on content analysis, source
                  verification, and historical patterns.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="relative w-24 h-24 flex items-center justify-center rounded-full border-4 border-gray-100">
            <div
              className={cn(
                "absolute inset-1 rounded-full flex items-center justify-center",
                getScoreColor(score),
              )}
            >
              <span className="text-2xl font-bold">{score}</span>
            </div>
          </div>

          <div className="w-full space-y-2">
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-1">
                {getScoreIcon(score)}
                <span className="font-medium">{getScoreLabel(score)}</span>
              </span>
            </div>
            <Progress
              value={score}
              className="h-2"
              indicatorClassName={getScoreProgressColor(score)}
            />
            <p className="text-xs text-gray-500 mt-1">{explanation}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
