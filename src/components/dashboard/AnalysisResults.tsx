import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import {
  AlertCircle,
  Share2,
  ThumbsUp,
  ThumbsDown,
  ExternalLink,
} from "lucide-react";
import CredibilityScoreCard from "./CredibilityScoreCard";
import AnalysisDetailTabs from "./AnalysisDetailTabs";
import { AnalysisResult } from "@/services/analysis-service";

interface AnalysisResultsProps {
  analysisResult?: AnalysisResult;
  tweetUrl?: string;
  tweetContent?: string;
  tweetAuthor?: string;
  tweetDate?: string;
  credibilityScore?: number;
  isPremium?: boolean;
  isLoading?: boolean;
  onShareResult?: () => void;
  onProvideFeedback?: (isHelpful: boolean) => void;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  analysisResult,
  tweetUrl = "https://twitter.com/user/status/1234567890",
  tweetContent = "Breaking: Scientists discover that drinking coffee cures all diseases! Big pharma doesn't want you to know this secret. #health #conspiracy",
  tweetAuthor = "@healthtruth_revealer",
  tweetDate = "2023-06-15",
  credibilityScore = 35,
  isPremium = false,
  isLoading = false,
  onShareResult = () => {},
  onProvideFeedback = () => {},
}) => {
  const [feedbackGiven, setFeedbackGiven] = useState<boolean | null>(null);

  // Use analysis result data if available, otherwise fall back to props
  const displayData = {
    tweetUrl: analysisResult?.tweetUrl || tweetUrl,
    tweetContent: analysisResult?.tweetContent || tweetContent,
    tweetAuthor: analysisResult?.tweetAuthor || tweetAuthor,
    tweetDate: analysisResult?.tweetDate || tweetDate,
    credibilityScore: analysisResult?.credibilityScore || credibilityScore,
    contentAnalysis: analysisResult?.contentAnalysis,
    imageVerification: analysisResult?.imageVerification,
    sourceCredibility: analysisResult?.sourceCredibility,
    languageAnalysis: analysisResult?.languageAnalysis,
  };

  const handleFeedback = (isHelpful: boolean) => {
    setFeedbackGiven(isHelpful);
    onProvideFeedback(isHelpful);
  };

  if (isLoading) {
    return (
      <Card className="w-full max-w-[800px] h-[400px] bg-white shadow-md">
        <CardContent className="flex items-center justify-center h-full">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-t-blue-500 border-b-blue-500 border-l-transparent border-r-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 font-medium">Analyzing tweet...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-[800px] bg-white shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold">Analysis Results</CardTitle>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            onClick={onShareResult}
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Tweet Information */}
        <div className="p-4 border rounded-lg bg-gray-50">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="font-medium text-gray-900">
                {displayData.tweetAuthor}
              </p>
              <p className="text-sm text-gray-500">{displayData.tweetDate}</p>
            </div>
            <Badge variant="outline" className="text-xs">
              Twitter Post
            </Badge>
          </div>
          <p className="text-gray-800 my-2">{displayData.tweetContent}</p>
          <a
            href={displayData.tweetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 hover:underline flex items-center gap-1"
          >
            <ExternalLink className="h-3 w-3" />
            View original tweet
          </a>
        </div>

        {/* Alert for low credibility */}
        {displayData.credibilityScore < 50 && (
          <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-red-800">
                Low Credibility Alert
              </h4>
              <p className="text-sm text-red-700">
                This tweet contains content that may be misleading or false
                based on our analysis. We recommend verifying this information
                with trusted sources.
              </p>
            </div>
          </div>
        )}

        {/* Analysis Results */}
        <div className="flex flex-col md:flex-row gap-6">
          <CredibilityScoreCard
            score={displayData.credibilityScore}
            explanation={
              displayData.credibilityScore >= 80
                ? "This tweet appears to be highly credible based on our analysis."
                : displayData.credibilityScore >= 50
                  ? "This tweet shows some concerning elements but may contain some accurate information."
                  : "This tweet contains multiple red flags and likely contains misleading information."
            }
          />
          <div className="flex-1">
            <AnalysisDetailTabs
              isPremium={isPremium}
              contentAnalysis={displayData.contentAnalysis}
              imageVerification={displayData.imageVerification}
              sourceCredibility={displayData.sourceCredibility}
              languageAnalysis={displayData.languageAnalysis}
            />
          </div>
        </div>

        {/* Feedback Section */}
        <div className="mt-6">
          <Separator className="mb-4" />
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">Was this analysis helpful?</p>
            <div className="flex gap-2">
              <Button
                variant={feedbackGiven === true ? "default" : "outline"}
                size="sm"
                className={`flex items-center gap-1 ${feedbackGiven === true ? "bg-blue-600" : ""}`}
                onClick={() => handleFeedback(true)}
                disabled={feedbackGiven !== null}
              >
                <ThumbsUp className="h-4 w-4" />
                Yes
              </Button>
              <Button
                variant={feedbackGiven === false ? "default" : "outline"}
                size="sm"
                className={`flex items-center gap-1 ${feedbackGiven === false ? "bg-red-600" : ""}`}
                onClick={() => handleFeedback(false)}
                disabled={feedbackGiven !== null}
              >
                <ThumbsDown className="h-4 w-4" />
                No
              </Button>
            </div>
          </div>
          {feedbackGiven !== null && (
            <p className="text-sm text-gray-500 mt-2 text-right">
              Thank you for your feedback! It helps us improve our analysis.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalysisResults;
