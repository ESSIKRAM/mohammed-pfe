import React, { useState } from "react";
import Navbar from "./layout/Navbar";
import UrlSubmissionForm from "./dashboard/UrlSubmissionForm";
import AnalysisResults from "./dashboard/AnalysisResults";
import PastAnalysesList from "./dashboard/PastAnalysesList";
import PremiumFeaturesBanner from "./premium/PremiumFeaturesBanner";
import StatisticsDashboard from "./premium/StatisticsDashboard";
import AuthModal from "./auth/AuthModal";
import UpgradeModal from "./premium/UpgradeModal";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import {
  AlertTriangle,
  CheckCircle,
  Shield,
  Zap,
  BarChart,
  Search,
  Twitter,
  ArrowRight,
  ChevronRight,
  Star,
  AlertCircle,
} from "lucide-react";

const Home = () => {
  // User state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [username, setUsername] = useState("JohnDoe");

  // UI state
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "signup">("login");
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // Analysis state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisCompleted, setAnalysisCompleted] = useState(false);
  const [tweetUrl, setTweetUrl] = useState("");
  const [remainingQueries, setRemainingQueries] = useState(3);

  // Handle login/signup
  const handleLogin = () => {
    setAuthModalTab("login");
    setShowAuthModal(true);
  };

  const handleSignup = () => {
    setAuthModalTab("signup");
    setShowAuthModal(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsPremium(false);
  };

  const handleAuthComplete = () => {
    setIsLoggedIn(true);
    setShowAuthModal(false);
    // In a real implementation, this would navigate to the dashboard
    // navigate("/dashboard");
  };

  // Handle upgrade
  const handleUpgradeClick = () => {
    setShowUpgradeModal(true);
  };

  const handleUpgradeComplete = () => {
    setIsPremium(true);
    setShowUpgradeModal(false);
  };

  // Handle analysis
  const handleAnalyzeSubmit = (url: string) => {
    setTweetUrl(url);
    setIsAnalyzing(true);

    // Simulate API call
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisCompleted(true);
      if (!isPremium && remainingQueries > 0) {
        setRemainingQueries((prev) => prev - 1);
      }
    }, 2000);
  };

  const handleSelectPastAnalysis = (id: string) => {
    // In a real app, this would fetch the analysis details
    console.log(`Selected analysis: ${id}`);
    setAnalysisCompleted(true);
  };

  // Render the dashboard for logged-in users
  const renderDashboard = () => (
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
            remainingQueries={remainingQueries}
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
    </div>
  );

  // Render the landing page for non-logged-in users
  const renderLandingPage = () => (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&q=80')] bg-no-repeat bg-cover bg-center" />
        </div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2 space-y-6">
              <Badge className="bg-blue-700 text-white hover:bg-blue-800 px-3 py-1 text-sm mb-4">
                #1 Fake News Detection Tool for X
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Detect Fake News on X with AI Precision
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-xl">
                Our advanced AI analyzes posts on X to verify credibility,
                detect manipulated images, and identify misleading content in
                seconds.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  onClick={handleSignup}
                  size="lg"
                  className="bg-white text-blue-700 hover:bg-blue-50 text-lg px-8 py-6 h-auto font-semibold"
                >
                  Start Free Analysis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  onClick={handleLogin}
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-blue-700 text-lg px-8 py-6 h-auto font-semibold"
                >
                  Log In
                </Button>
              </div>
              <div className="flex items-center text-sm text-blue-100 pt-2">
                <CheckCircle className="h-4 w-4 mr-2" />
                No credit card required for free plan
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="bg-white rounded-lg shadow-2xl p-2 transform rotate-1 scale-95 opacity-90">
                <img
                  src="https://images.unsplash.com/photo-1586336900429-f127c23236e3?w=800&q=80"
                  alt="Fake news detection dashboard"
                  className="rounded-md w-full"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-blue-700 text-white p-4 rounded-lg shadow-lg transform -rotate-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-300" />
                  <span className="font-semibold">Credibility Score: 35%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <p className="text-3xl md:text-4xl font-bold text-blue-700">
                500K+
              </p>
              <p className="text-gray-600">Posts Analyzed</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl md:text-4xl font-bold text-blue-700">
                98%
              </p>
              <p className="text-gray-600">Accuracy Rate</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl md:text-4xl font-bold text-blue-700">
                50K+
              </p>
              <p className="text-gray-600">Active Users</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl md:text-4xl font-bold text-blue-700">
                24/7
              </p>
              <p className="text-gray-600">Real-time Analysis</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Verify any post on X in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md text-center relative">
              <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-8 w-8" />
              </div>
              <span className="absolute top-4 right-4 text-5xl font-bold text-blue-100">
                1
              </span>
              <h3 className="text-xl font-bold mb-3">Submit Post URL</h3>
              <p className="text-gray-600">
                Copy and paste any X post URL into our analyzer tool
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center relative">
              <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8" />
              </div>
              <span className="absolute top-4 right-4 text-5xl font-bold text-blue-100">
                2
              </span>
              <h3 className="text-xl font-bold mb-3">AI Analysis</h3>
              <p className="text-gray-600">
                Our AI analyzes content, images, and source credibility
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center relative">
              <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8" />
              </div>
              <span className="absolute top-4 right-4 text-5xl font-bold text-blue-100">
                3
              </span>
              <h3 className="text-xl font-bold mb-3">Get Results</h3>
              <p className="text-gray-600">
                Receive a detailed credibility report with actionable insights
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button
              onClick={handleSignup}
              className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6 h-auto font-semibold"
            >
              Try It Now - Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive toolkit helps you identify misinformation with
              confidence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center mb-4">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Content Analysis</h3>
              <p className="text-gray-600">
                Advanced NLP algorithms detect misleading claims, logical
                fallacies, and emotional manipulation tactics.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center mb-4">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=image"
                  alt="Image"
                  className="h-6 w-6"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Image Verification</h3>
              <p className="text-gray-600">
                Detect manipulated or misleading images with our advanced
                computer vision technology.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Source Credibility</h3>
              <p className="text-gray-600">
                Evaluate the reliability of information sources based on
                historical accuracy and reputation.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Language Analysis</h3>
              <p className="text-gray-600">
                Identify emotional manipulation, alarmist language, and other
                persuasion techniques.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Detailed Reports</h3>
              <p className="text-gray-600">
                Get comprehensive analysis reports with actionable insights and
                evidence-based recommendations.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center mb-4">
                <History className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Historical Tracking</h3>
              <p className="text-gray-600">
                Monitor trends and patterns in misinformation over time with our
                premium tracking features.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that fits your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">Free Plan</h3>
                <p className="text-gray-600 mb-6">Perfect for occasional use</p>
                <div className="flex items-end mb-6">
                  <span className="text-5xl font-bold">$0</span>
                  <span className="text-gray-600 ml-2 mb-1">/month</span>
                </div>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>3 analyses per day</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Basic content analysis</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Basic image verification</span>
                  </li>
                  <li className="flex items-start text-gray-400">
                    <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Limited history (3 most recent)</span>
                  </li>
                  <li className="flex items-start text-gray-400">
                    <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <span>No source credibility checks</span>
                  </li>
                  <li className="flex items-start text-gray-400">
                    <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <span>No detailed language analysis</span>
                  </li>
                </ul>

                <Button
                  onClick={handleSignup}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white py-6 h-auto text-lg font-semibold"
                >
                  Sign Up Free
                </Button>
              </div>
            </div>

            {/* Premium Plan */}
            <div className="bg-white rounded-xl shadow-xl overflow-hidden border-2 border-blue-500 relative">
              <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 rounded-bl-lg font-medium">
                MOST POPULAR
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">Premium Plan</h3>
                <p className="text-gray-600 mb-6">
                  For professionals and teams
                </p>
                <div className="flex items-end mb-6">
                  <span className="text-5xl font-bold">$9</span>
                  <span className="text-gray-600 ml-2 mb-1">/month</span>
                </div>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Unlimited</strong> analyses
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Advanced content analysis</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Advanced image verification</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Full analysis history</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Source credibility checks</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Detailed language analysis</span>
                  </li>
                </ul>

                <Button
                  onClick={handleSignup}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 h-auto text-lg font-semibold"
                >
                  Start Premium Trial
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of satisfied users who trust our platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="h-5 w-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6">
                "This tool has been invaluable for our journalism team. We can
                quickly verify claims before publishing and maintain our
                credibility."
              </p>
              <div className="flex items-center">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                  alt="Sarah J."
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h4 className="font-semibold">Sarah J.</h4>
                  <p className="text-sm text-gray-600">Senior Editor</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="h-5 w-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6">
                "As a researcher, I need to verify information constantly. This
                platform saves me hours of work with its accurate and detailed
                analysis."
              </p>
              <div className="flex items-center">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
                  alt="Michael T."
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h4 className="font-semibold">Michael T.</h4>
                  <p className="text-sm text-gray-600">Academic Researcher</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="h-5 w-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6">
                "The premium features are worth every penny. The source
                credibility analysis has helped me avoid sharing misinformation
                multiple times."
              </p>
              <div className="flex items-center">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa"
                  alt="Lisa K."
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h4 className="font-semibold">Lisa K.</h4>
                  <p className="text-sm text-gray-600">Social Media Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about our service
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-2">
                How accurate is your fake news detection?
              </h3>
              <p className="text-gray-600">
                Our system achieves a 98% accuracy rate through a combination of
                AI algorithms, machine learning models, and continuous
                improvement based on user feedback and expert verification.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-2">
                Can I analyze private or protected tweets?
              </h3>
              <p className="text-gray-600">
                Our system can only analyze publicly available posts on X.
                Private or protected tweets cannot be accessed by our platform
                due to privacy restrictions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-2">
                How many analyses can I run with the free plan?
              </h3>
              <p className="text-gray-600">
                The free plan allows you to run up to 3 analyses per day. For
                unlimited analyses and access to premium features, you can
                upgrade to our Premium plan for just $9/month.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-2">
                Can I cancel my premium subscription anytime?
              </h3>
              <p className="text-gray-600">
                Yes, you can cancel your premium subscription at any time. We
                offer a 30-day money-back guarantee if you're not completely
                satisfied with our service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Detect Fake News?
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Start using our powerful AI tools today to verify information and
            protect yourself from misinformation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleSignup}
              size="lg"
              className="bg-white text-blue-700 hover:bg-blue-50 text-lg px-8 py-6 h-auto font-semibold"
            >
              Start Free - No Credit Card
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              onClick={() => window.open("#pricing", "_self")}
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-blue-700 text-lg px-8 py-6 h-auto font-semibold"
            >
              View Pricing
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Twitter className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold">Fake News Detector</span>
              </div>
              <p className="text-gray-400 mb-4">
                Advanced AI tools to detect misinformation and verify content on
                X.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    API
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Integrations
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Case Studies
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Help Center
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>
              © {new Date().getFullYear()} Fake News Detector. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar
        isLoggedIn={isLoggedIn}
        isPremium={isPremium}
        username={username}
        avatarUrl={`https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`}
        onLogin={handleLogin}
        onSignup={handleSignup}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <main className="pt-[70px]">
        {isLoggedIn ? renderDashboard() : renderLandingPage()}
      </main>

      {/* Modals */}
      <AuthModal
        isOpen={showAuthModal}
        onOpenChange={setShowAuthModal}
        defaultTab={authModalTab}
        onAuthComplete={handleAuthComplete}
      />

      <UpgradeModal
        open={showUpgradeModal}
        onOpenChange={setShowUpgradeModal}
        onUpgradeComplete={handleUpgradeComplete}
      />
    </div>
  );
};

// These components are not imported but used in the JSX
const Users = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const MessageSquare = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const History = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="M12 7v5l4 2" />
  </svg>
);

const Facebook = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Linkedin = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default Home;
