import twitterApiService, {
  TwitterTweet,
  TwitterApiResponse,
} from "./twitter-api";

// Types for analysis results
export interface ContentAnalysis {
  text: string;
  keywords: string[];
  sentimentScore: number;
}

export interface ImageVerification {
  isManipulated: boolean;
  confidence: number;
  details: string;
}

export interface SourceCredibility {
  score: number;
  history: string;
  knownIssues: string[];
}

export interface LanguageAnalysis {
  tone: string;
  emotionalCues: string[];
  misleadingPatterns: string[];
}

export interface AnalysisResult {
  tweetId: string;
  tweetUrl: string;
  tweetContent: string;
  tweetAuthor: string;
  tweetDate: string;
  credibilityScore: number;
  contentAnalysis: ContentAnalysis;
  imageVerification: ImageVerification;
  sourceCredibility: SourceCredibility;
  languageAnalysis: LanguageAnalysis;
  analyzedAt: string;
}

// Mock analysis results for development/testing
const generateMockAnalysis = (tweet: TwitterTweet): AnalysisResult => {
  // Calculate a credibility score based on various factors
  // This is a simplified mock implementation
  const hasVerifiedAuthor = tweet.author.verified || false;
  const accountAge =
    new Date().getTime() - new Date(tweet.author.created_at).getTime();
  const accountAgeYears = accountAge / (1000 * 60 * 60 * 24 * 365);

  // Factors that might indicate lower credibility
  const containsSensationalTerms =
    /breaking|shocking|secret|conspiracy|they don't want you to know|cure|miracle/i.test(
      tweet.text,
    );
  const containsExclamationMarks = (tweet.text.match(/!/g) || []).length > 1;
  const containsAllCaps = /[A-Z]{5,}/.test(tweet.text);

  // Calculate base score
  let credibilityScore = 50; // Start at neutral

  // Adjust based on account factors
  if (hasVerifiedAuthor) credibilityScore += 20;
  if (accountAgeYears > 2) credibilityScore += 10;
  if (
    tweet.author.public_metrics &&
    tweet.author.public_metrics.followers_count > 10000
  )
    credibilityScore += 5;

  // Adjust based on content factors
  if (containsSensationalTerms) credibilityScore -= 25;
  if (containsExclamationMarks) credibilityScore -= 5;
  if (containsAllCaps) credibilityScore -= 10;

  // Ensure score is between 0-100
  credibilityScore = Math.max(0, Math.min(100, credibilityScore));

  // Generate mock analysis details
  return {
    tweetId: tweet.id,
    tweetUrl: `https://twitter.com/${tweet.author.username}/status/${tweet.id}`,
    tweetContent: tweet.text,
    tweetAuthor: `@${tweet.author.username}`,
    tweetDate: new Date(tweet.created_at).toISOString().split("T")[0],
    credibilityScore,
    contentAnalysis: {
      text: containsSensationalTerms
        ? "This tweet contains several unverified claims that contradict established research. The language used is designed to create alarm without providing evidence."
        : "This tweet appears to be sharing factual information with appropriate context and sources.",
      keywords: containsSensationalTerms
        ? ["unverified", "contradict", "alarm", "without evidence"]
        : ["factual", "context", "sources", "verified"],
      sentimentScore: containsSensationalTerms ? 0.3 : 0.8,
    },
    imageVerification: {
      isManipulated: Math.random() > 0.7,
      confidence: 0.87,
      details:
        "Image analysis detected signs of digital manipulation in the background elements. The lighting inconsistencies suggest composite imagery.",
    },
    sourceCredibility: {
      score: hasVerifiedAuthor ? 0.8 : 0.4,
      history: hasVerifiedAuthor
        ? "This account has a history of sharing reliable information and correcting errors when they occur."
        : "This account has previously shared content that was later debunked by fact-checking organizations.",
      knownIssues: hasVerifiedAuthor
        ? []
        : [
            "Multiple violations of platform misinformation policies",
            "Frequent sharing of manipulated media",
            "Low accuracy rating from fact-checkers",
          ],
    },
    languageAnalysis: {
      tone: containsSensationalTerms ? "Alarmist" : "Informative",
      emotionalCues: containsSensationalTerms
        ? ["Fear", "Urgency", "Outrage"]
        : ["Neutral", "Factual", "Measured"],
      misleadingPatterns: containsSensationalTerms
        ? ["False dichotomy", "Appeal to fear", "Cherry-picked statistics"]
        : [],
    },
    analyzedAt: new Date().toISOString(),
  };
};

/**
 * Analysis service for processing tweets
 */
export class AnalysisService {
  private apiInitialized = false;

  /**
   * Initialize the analysis service with Twitter API credentials
   */
  initialize(apiKey: string, apiSecret: string, bearerToken: string): void {
    twitterApiService.initialize({
      apiKey,
      apiSecret,
      bearerToken,
    });
    this.apiInitialized = true;
  }

  /**
   * Analyze a tweet by URL
   * @param url Twitter URL
   * @returns Promise with analysis results
   */
  async analyzeTweetByUrl(url: string): Promise<AnalysisResult | null> {
    try {
      // Fetch tweet data from Twitter API
      const response: TwitterApiResponse =
        await twitterApiService.fetchTweetByUrl(url);

      if (response.error) {
        console.error("Error fetching tweet:", response.error);
        return null;
      }

      if (!response.tweet) {
        console.error("No tweet data returned");
        return null;
      }

      // In a real implementation, this would perform actual analysis
      // For now, we'll generate mock analysis results
      return generateMockAnalysis(response.tweet);
    } catch (error) {
      console.error("Error analyzing tweet:", error);
      return null;
    }
  }
}

// Create and export a singleton instance
const analysisService = new AnalysisService();
export default analysisService;
