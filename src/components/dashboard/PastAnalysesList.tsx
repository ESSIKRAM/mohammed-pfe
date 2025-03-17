import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Pagination } from "../ui/pagination";
import {
  Calendar,
  Clock,
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface AnalysisItem {
  id: string;
  url: string;
  title: string;
  date: string;
  score: number;
  status: "credible" | "suspicious" | "fake" | "uncertain";
}

interface PastAnalysesListProps {
  isPremium?: boolean;
  analyses?: AnalysisItem[];
  onSelectAnalysis?: (id: string) => void;
}

const getStatusColor = (status: AnalysisItem["status"]) => {
  switch (status) {
    case "credible":
      return "bg-green-100 text-green-800 hover:bg-green-200";
    case "suspicious":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
    case "fake":
      return "bg-red-100 text-red-800 hover:bg-red-200";
    case "uncertain":
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
  }
};

const getStatusIcon = (status: AnalysisItem["status"]) => {
  switch (status) {
    case "credible":
      return <CheckCircle className="h-4 w-4 mr-1" />;
    case "suspicious":
      return <AlertTriangle className="h-4 w-4 mr-1" />;
    case "fake":
      return <AlertTriangle className="h-4 w-4 mr-1" />;
    case "uncertain":
      return <HelpCircle className="h-4 w-4 mr-1" />;
    default:
      return <HelpCircle className="h-4 w-4 mr-1" />;
  }
};

const PastAnalysesList = ({
  isPremium = false,
  analyses = [
    {
      id: "1",
      url: "https://twitter.com/example/status/123456789",
      title: "Breaking news about climate change",
      date: "2023-06-15T14:30:00",
      score: 85,
      status: "credible",
    },
    {
      id: "2",
      url: "https://twitter.com/example/status/987654321",
      title: "Political statement about upcoming election",
      date: "2023-06-14T10:15:00",
      score: 45,
      status: "suspicious",
    },
    {
      id: "3",
      url: "https://twitter.com/example/status/456789123",
      title: "Celebrity health announcement",
      date: "2023-06-13T16:45:00",
      score: 20,
      status: "fake",
    },
    {
      id: "4",
      url: "https://twitter.com/example/status/789123456",
      title: "Technology breakthrough claim",
      date: "2023-06-12T09:00:00",
      score: 60,
      status: "uncertain",
    },
    {
      id: "5",
      url: "https://twitter.com/example/status/321654987",
      title: "Sports team announcement",
      date: "2023-06-11T13:20:00",
      score: 90,
      status: "credible",
    },
  ],
  onSelectAnalysis = () => {},
}: PastAnalysesListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(analyses.length / itemsPerPage);

  const displayedAnalyses = isPremium
    ? analyses.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
      )
    : analyses.slice(0, 3); // Free users only see the 3 most recent analyses

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card className="w-full h-full bg-white shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold flex justify-between items-center">
          <span>Past Analyses</span>
          {!isPremium && (
            <Badge variant="outline" className="text-xs bg-gray-100">
              Limited History
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayedAnalyses.length > 0 ? (
            displayedAnalyses.map((analysis) => (
              <div
                key={analysis.id}
                className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => onSelectAnalysis(analysis.id)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-sm line-clamp-1">
                    {analysis.title}
                  </h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge
                          className={`text-xs flex items-center ${getStatusColor(analysis.status as AnalysisItem["status"])}`}
                        >
                          {getStatusIcon(
                            analysis.status as AnalysisItem["status"],
                          )}
                          {analysis.status.charAt(0).toUpperCase() +
                            analysis.status.slice(1)}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Credibility score: {analysis.score}/100</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex items-center text-xs text-gray-500 mb-2">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  <span className="truncate">{analysis.url}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{formatDate(analysis.date)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{formatTime(analysis.date)}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No analyses found</p>
            </div>
          )}

          {!isPremium && analyses.length > 3 && (
            <div className="pt-2 pb-1">
              <Button
                variant="outline"
                className="w-full text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-200"
                size="sm"
              >
                Upgrade to Premium for $9/month
              </Button>
            </div>
          )}

          {isPremium && totalPages > 1 && (
            <div className="flex justify-center pt-2">
              <Pagination>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="mx-4 flex items-center text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </Pagination>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PastAnalysesList;
