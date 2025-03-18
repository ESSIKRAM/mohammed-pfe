import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { AlertCircle, ArrowRight, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";
import { extractTweetId } from "@/services/twitter-api";

interface UrlSubmissionFormProps {
  onSubmit?: (url: string) => void;
  isLoading?: boolean;
  remainingQueries?: number;
  isPremium?: boolean;
}

const UrlSubmissionForm = ({
  onSubmit = () => {},
  isLoading = false,
  remainingQueries = 3,
  isPremium = false,
}: UrlSubmissionFormProps) => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  const validateUrl = (input: string): boolean => {
    // Use the extractTweetId function to validate the URL
    return !!extractTweetId(input);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!url.trim()) {
      setError("Please enter a Twitter URL");
      return;
    }

    if (!validateUrl(url)) {
      setError("Please enter a valid Twitter post URL");
      return;
    }

    onSubmit(url);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center mb-4">
        <Twitter className="h-5 w-5 text-blue-500 mr-2" />
        <h2 className="text-lg font-medium">Analyze Twitter Post</h2>
        {!isPremium && (
          <div className="ml-auto text-sm text-gray-500">
            <span
              className={cn(
                "font-medium",
                remainingQueries <= 2 ? "text-amber-500" : "",
              )}
            >
              {remainingQueries}
            </span>{" "}
            queries remaining today
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Input
            type="url"
            placeholder="https://twitter.com/username/status/123456789"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className={cn(
              "pr-12",
              error ? "border-red-500 focus-visible:ring-red-500" : "",
            )}
            disabled={isLoading}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <Twitter className="h-4 w-4 text-gray-400" />
          </div>
        </div>

        {error && (
          <div className="flex items-center text-sm text-red-500">
            <AlertCircle className="h-4 w-4 mr-1" />
            {error}
          </div>
        )}

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? (
              <>
                <span className="mr-2">Analyzing</span>
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </>
            ) : (
              <>
                Analyze Post <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UrlSubmissionForm;
