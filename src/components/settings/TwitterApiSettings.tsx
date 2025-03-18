import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AlertCircle, Check, Twitter } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useTwitterApi } from "@/contexts/TwitterApiContext";

interface TwitterApiSettingsProps {
  onClose?: () => void;
}

const TwitterApiSettings = ({ onClose }: TwitterApiSettingsProps) => {
  const { isConfigured, configureApi, error } = useTwitterApi();

  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");
  const [bearerToken, setBearerToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccess(false);

    try {
      configureApi(apiKey, apiSecret, bearerToken);
      setSuccess(true);

      // Clear form after successful submission
      setTimeout(() => {
        if (onClose) onClose();
      }, 2000);
    } catch (err) {
      console.error("Error configuring Twitter API:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Twitter className="h-5 w-5 text-blue-500" />
          <CardTitle>Twitter API Configuration</CardTitle>
        </div>
        <CardDescription>
          Enter your Twitter API credentials to enable tweet analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
            <Check className="h-4 w-4 text-green-600" />
            <AlertDescription>
              Twitter API configured successfully!
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <Input
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Twitter API key"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="apiSecret">API Secret</Label>
            <Input
              id="apiSecret"
              type="password"
              value={apiSecret}
              onChange={(e) => setApiSecret(e.target.value)}
              placeholder="Enter your Twitter API secret"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bearerToken">Bearer Token</Label>
            <Input
              id="bearerToken"
              type="password"
              value={bearerToken}
              onChange={(e) => setBearerToken(e.target.value)}
              placeholder="Enter your Twitter bearer token"
              required
            />
          </div>

          <div className="text-sm text-gray-500">
            <p>
              You can obtain these credentials from the{" "}
              <a
                href="https://developer.twitter.com/en/portal/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Twitter Developer Portal
              </a>
              .
            </p>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        {onClose && (
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
        )}
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || !apiKey || !apiSecret || !bearerToken}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isSubmitting ? (
            <>
              <span className="mr-2">Saving</span>
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </>
          ) : isConfigured ? (
            "Update Configuration"
          ) : (
            "Save Configuration"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TwitterApiSettings;
