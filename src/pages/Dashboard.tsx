import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import UrlSubmissionForm from "@/components/dashboard/UrlSubmissionForm";
import AnalysisResults from "@/components/dashboard/AnalysisResults";
import PastAnalysesList from "@/components/dashboard/PastAnalysesList";
import PremiumFeaturesBanner from "@/components/premium/PremiumFeaturesBanner";
import StatisticsDashboard from "@/components/premium/StatisticsDashboard";
import UpgradeModal from "@/components/premium/UpgradeModal";

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
  // Analysis state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisCompleted, setAnalysisCompleted] = useState(false);
  const [tweetUrl, setTweetUrl] = useState("");
  const [remainingQueriesState, setRemainingQueriesState] =
    useState(remainingQueries);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // Handle analysis
  const handleAnalyzeSubmit = (url: string) => {
    setTweetUrl(url);
    setIsAnalyzing(true);

    // Simulate API call
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisCompleted(true);
      if (!isPremium && remainingQueriesState > 0) {
        setRemainingQueriesState((prev) => prev - 1);
      }
    }, 2000);
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

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - Analysis Form & Results */}
          <div className="flex-1 flex flex-col items-center">
            {/* URL Submission Form */}
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
                credibilityScore={35}
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

        {/* Upgrade Modal */}
        <UpgradeModal
          open={showUpgradeModal}
          onOpenChange={setShowUpgradeModal}
          onUpgradeComplete={handleUpgradeComplete}
        />
      </div>
    </Layout>
  );
};

export default Dashboard;
