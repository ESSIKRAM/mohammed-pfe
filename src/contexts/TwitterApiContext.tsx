import React, { createContext, useContext, useState, ReactNode } from "react";
import twitterApiService from "@/services/twitter-api";
import analysisService from "@/services/analysis-service";

interface TwitterApiContextType {
  isConfigured: boolean;
  configureApi: (
    apiKey: string,
    apiSecret: string,
    bearerToken: string,
  ) => void;
  error: string | null;
}

const TwitterApiContext = createContext<TwitterApiContextType | undefined>(
  undefined,
);

export function useTwitterApi() {
  const context = useContext(TwitterApiContext);
  if (context === undefined) {
    throw new Error("useTwitterApi must be used within a TwitterApiProvider");
  }
  return context;
}

interface TwitterApiProviderProps {
  children: ReactNode;
}

export function TwitterApiProvider({ children }: TwitterApiProviderProps) {
  const [isConfigured, setIsConfigured] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const configureApi = (
    apiKey: string,
    apiSecret: string,
    bearerToken: string,
  ) => {
    try {
      // Initialize both services with the provided credentials
      twitterApiService.initialize({
        apiKey,
        apiSecret,
        bearerToken,
      });

      analysisService.initialize(apiKey, apiSecret, bearerToken);

      setIsConfigured(true);
      setError(null);

      // Store credentials in localStorage for persistence
      localStorage.setItem(
        "twitter_api_credentials",
        JSON.stringify({
          apiKey,
          apiSecret,
          bearerToken,
        }),
      );

      console.log("Twitter API configured successfully");
    } catch (err) {
      setError(
        "Failed to configure Twitter API: " +
          (err instanceof Error ? err.message : String(err)),
      );
      setIsConfigured(false);
      console.error("Error configuring Twitter API:", err);
    }
  };

  // Try to load credentials from localStorage on mount
  React.useEffect(() => {
    const storedCredentials = localStorage.getItem("twitter_api_credentials");
    if (storedCredentials) {
      try {
        const { apiKey, apiSecret, bearerToken } =
          JSON.parse(storedCredentials);
        if (apiKey && apiSecret && bearerToken) {
          configureApi(apiKey, apiSecret, bearerToken);
        }
      } catch (err) {
        console.error("Error loading stored Twitter API credentials:", err);
      }
    }
  }, []);

  const value = {
    isConfigured,
    configureApi,
    error,
  };

  return (
    <TwitterApiContext.Provider value={value}>
      {children}
    </TwitterApiContext.Provider>
  );
}
