import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AlertCircle, Image, Users, MessageSquare } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AnalysisDetailTabsProps {
  isPremium?: boolean;
  contentAnalysis?: {
    text: string;
    keywords: string[];
    sentimentScore: number;
  };
  imageVerification?: {
    isManipulated: boolean;
    confidence: number;
    details: string;
  };
  sourceCredibility?: {
    score: number;
    history: string;
    knownIssues: string[];
  };
  languageAnalysis?: {
    tone: string;
    emotionalCues: string[];
    misleadingPatterns: string[];
  };
}

const AnalysisDetailTabs = ({
  isPremium = false,
  contentAnalysis = {
    text: "This tweet contains several unverified claims about health effects that contradict established medical research. The language used is designed to create alarm without providing scientific evidence.",
    keywords: ["unverified", "contradict", "alarm", "without evidence"],
    sentimentScore: 0.3,
  },
  imageVerification = {
    isManipulated: true,
    confidence: 0.87,
    details:
      "Image analysis detected signs of digital manipulation in the background elements. The lighting inconsistencies suggest composite imagery.",
  },
  sourceCredibility = {
    score: 0.4,
    history:
      "This account has previously shared content that was later debunked by fact-checking organizations.",
    knownIssues: [
      "Multiple violations of platform misinformation policies",
      "Frequent sharing of manipulated media",
      "Low accuracy rating from fact-checkers",
    ],
  },
  languageAnalysis = {
    tone: "Alarmist",
    emotionalCues: ["Fear", "Urgency", "Outrage"],
    misleadingPatterns: [
      "False dichotomy",
      "Appeal to fear",
      "Cherry-picked statistics",
    ],
  },
}: AnalysisDetailTabsProps) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-sm">
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="w-full justify-start mb-4">
          <TabsTrigger value="content" className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            Content Analysis
          </TabsTrigger>
          <TabsTrigger value="image" className="flex items-center gap-2">
            <Image className="h-4 w-4" />
            Image Verification
          </TabsTrigger>
          {isPremium && (
            <>
              <TabsTrigger value="source" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Source Credibility
              </TabsTrigger>
              <TabsTrigger value="language" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Language Analysis
              </TabsTrigger>
            </>
          )}
        </TabsList>

        <TabsContent value="content" className="p-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Analysis</CardTitle>
              <CardDescription>
                Analysis of the tweet's textual content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Analysis Summary</h4>
                  <p className="text-sm text-gray-700">
                    {contentAnalysis.text}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Key Indicators</h4>
                  <div className="flex flex-wrap gap-2">
                    {contentAnalysis.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Sentiment Score</h4>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-red-600 h-2.5 rounded-full"
                      style={{
                        width: `${contentAnalysis.sentimentScore * 100}%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Score: {contentAnalysis.sentimentScore} - Lower scores
                    indicate potentially misleading content
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="image" className="p-4">
          <Card>
            <CardHeader>
              <CardTitle>Image Verification</CardTitle>
              <CardDescription>
                Analysis of images attached to the tweet
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-3 rounded-full ${imageVerification.isManipulated ? "bg-red-100" : "bg-green-100"}`}
                  >
                    <AlertCircle
                      className={`h-6 w-6 ${imageVerification.isManipulated ? "text-red-600" : "text-green-600"}`}
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">
                      {imageVerification.isManipulated
                        ? "Manipulation Detected"
                        : "No Manipulation Detected"}
                    </h4>
                    <p className="text-sm text-gray-500">
                      Confidence:{" "}
                      {(imageVerification.confidence * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Analysis Details</h4>
                  <p className="text-sm text-gray-700">
                    {imageVerification.details}
                  </p>
                </div>

                <div className="border rounded-lg p-4 bg-gray-50">
                  <h4 className="font-medium mb-2">Sample Image</h4>
                  <div className="aspect-video bg-gray-200 rounded-md flex items-center justify-center">
                    <p className="text-gray-500 text-sm">
                      Image preview placeholder
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {isPremium && (
          <>
            <TabsContent value="source" className="p-4">
              <Card>
                <CardHeader>
                  <CardTitle>Source Credibility</CardTitle>
                  <CardDescription>
                    Analysis of the tweet author's credibility
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-xl font-bold">
                          {(sourceCredibility.score * 10).toFixed(1)}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium">Credibility Score</h4>
                        <p className="text-sm text-gray-500">
                          {sourceCredibility.score < 0.5
                            ? "Low credibility source"
                            : "Moderate credibility source"}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Source History</h4>
                      <p className="text-sm text-gray-700">
                        {sourceCredibility.history}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Known Issues</h4>
                      <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                        {sourceCredibility.knownIssues.map((issue, index) => (
                          <li key={index}>{issue}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="language" className="p-4">
              <Card>
                <CardHeader>
                  <CardTitle>Language Analysis</CardTitle>
                  <CardDescription>
                    Detailed analysis of language patterns and emotional cues
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Tone Assessment</h4>
                      <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
                        {languageAnalysis.tone}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Emotional Cues</h4>
                      <div className="flex flex-wrap gap-2">
                        {languageAnalysis.emotionalCues.map((cue, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                          >
                            {cue}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Misleading Patterns</h4>
                      <div className="space-y-2">
                        {languageAnalysis.misleadingPatterns.map(
                          (pattern, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2"
                            >
                              <AlertCircle className="h-4 w-4 text-red-500" />
                              <span className="text-sm">{pattern}</span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  );
};

export default AnalysisDetailTabs;
