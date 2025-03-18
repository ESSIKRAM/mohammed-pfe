import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import UrlSubmissionForm from "@/components/dashboard/UrlSubmissionForm";
import AnalysisResults from "@/components/dashboard/AnalysisResults";
import PastAnalysesList from "@/components/dashboard/PastAnalysesList";
import PremiumFeaturesBanner from "@/components/premium/PremiumFeaturesBanner";
import StatisticsDashboard from "@/components/premium/StatisticsDashboard";
import UpgradeModal from "@/components/premium/UpgradeModal";
import TwitterApiDialog, {
  TwitterApiButton,
} from "@/components/dialogs/TwitterApiDialog";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { useTwitterApi } from "@/contexts/TwitterApiContext";
import analysisService, { AnalysisResult } from "@/services/analysis-service";

interface DashboardProps {
  isPremium?: boolean;
  username?: string;
  remainingQueries?: number;
  onUpgrade?: () => void;
}

const Dashboard = ({
  isPremium = false,
  username = "User",
  remainingQueries = 3,
  onUpgrade = () => {},
}: DashboardProps) => {
  // Twitter API state
  const { isConfigured } = useTwitterApi();
  const [showApiDialog, setShowApiDialog] = useState(false);

  // Analysis state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisCompleted, setAnalysisCompleted] = useState(false);
  const [tweetUrl, setTweetUrl] = useState("");
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null,
  );
  const [remainingQueriesState, setRemainingQueriesState] =
    useState(remainingQueries);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // Handle analysis
  const handleAnalyzeSubmit = async (url: string) => {
    setTweetUrl(url);
    setIsAnalyzing(true);

    try {
      // Use the analysis service to analyze the tweet
      const result = await analysisService.analyzeTweetByUrl(url);

      if (result) {
        setAnalysisResult(result);
      }

      setAnalysisCompleted(true);

      // Decrement remaining queries for free users
      if (!isPremium && remainingQueriesState > 0) {
        setRemainingQueriesState((prev) => prev - 1);
      }
    } catch (error) {
      console.error("Error analyzing tweet:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSelectPastAnalysis = (id: string) => {
    // In a real app, this would fetch the analysis details
    console.log(`Selected analysis: ${id}`);
    setAnalysisCompleted(true);
  };

  const handleUpgradeClick = () => {
    setShowUpgradeModal(true);
  };

  const handleUpgradeComplete = () => {
    setShowUpgradeModal(false);
    onUpgrade();
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {!isPremium && (
          <PremiumFeaturesBanner onUpgradeClick={handleUpgradeClick} />
        )}

        {/* Twitter API Configuration Banner */}
        {!isConfigured && (
          <div className="w-full max-w-3xl mx-auto bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-center justify-between">
            <div>
              <h3 className="font-medium text-blue-800">
                Twitter API Configuration Required
              </h3>
              <p className="text-sm text-blue-600">
                Configure your Twitter API credentials to enable tweet analysis
              </p>
            </div>
            <TwitterApiButton />
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - Analysis Form & Results */}
          <div className="flex-1 flex flex-col items-center">
            {/* URL Submission Form */}
            <div className="w-full max-w-3xl flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold">Tweet Analysis</h2>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={() => setShowApiDialog(true)}
              >
                <Settings className="h-4 w-4" />
                API Settings
              </Button>
            </div>

            <UrlSubmissionForm
              onSubmit={handleAnalyzeSubmit}
              isLoading={isAnalyzing}
              remainingQueries={remainingQueriesState}
              isPremium={isPremium}
            />

            {/* Analysis Results */}
            {analysisCompleted && (
              <AnalysisResults
                isLoading={isAnalyzing}
                tweetUrl={tweetUrl}
                isPremium={isPremium}
                analysisResult={analysisResult || undefined}
              />
            )}
          </div>

          {/* Right Column - Past Analyses */}
          <div className="lg:w-[350px]">
            <PastAnalysesList
              isPremium={isPremium}
              onSelectAnalysis={handleSelectPastAnalysis}
            />
          </div>
        </div>

        {/* Premium Statistics Dashboard (only for premium users) */}
        {isPremium && (
          <div className="mt-12">
            <StatisticsDashboard userName={username} />
          </div>
        )}

        {/* Modals */}
        <UpgradeModal
          open={showUpgradeModal}
          onOpenChange={setShowUpgradeModal}
          onUpgradeComplete={handleUpgradeComplete}
        />

        <TwitterApiDialog
          open={showApiDialog}
          onOpenChange={setShowApiDialog}
        />
      </div>
    </Layout>
  );
};

export default Dashboard;
