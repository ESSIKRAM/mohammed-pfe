// Twitter API service for fetching tweet data

// Types for Twitter API responses
export interface TwitterUser {
  id: string;
  name: string;
  username: string;
  profile_image_url?: string;
  verified?: boolean;
  created_at: string;
  public_metrics?: {
    followers_count: number;
    following_count: number;
    tweet_count: number;
  };
}

export interface TwitterMedia {
  type: 'photo' | 'video' | 'animated_gif';
  url: string;
  preview_image_url?: string;
  alt_text?: string;
}

export interface TwitterTweet {
  id: string;
  text: string;
  created_at: string;
  author: TwitterUser;
  public_metrics?: {
    retweet_count: number;
    reply_count: number;
    like_count: number;
    quote_count: number;
  };
  media?: TwitterMedia[];
  referenced_tweets?: {
    type: 'retweeted' | 'quoted' | 'replied_to';
    id: string;
  }[];
}

export interface TwitterApiError {
  status: number;
  message: string;
}

export interface TwitterApiResponse {
  tweet?: TwitterTweet;
  error?: TwitterApiError;
}

// Configuration for Twitter API
interface TwitterApiConfig {
  apiKey: string;
  apiSecret: string;
  bearerToken: string;
}

// Mock data for development/testing
const MOCK_TWEET: TwitterTweet = {
  id: '1234567890',
  text: 'Breaking: Scientists discover that drinking coffee cures all diseases! Big pharma doesn't want you to know this secret. #health #conspiracy',
  created_at: '2023-06-15T14:30:00.000Z',
  author: {
    id: '987654321',
    name: 'Health Truth Revealer',
    username: 'healthtruth_revealer',
    profile_image_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=healthtruth',
    verified: false,
    created_at: '2022-01-15T10:00:00.000Z',
    public_metrics: {
      followers_count: 1243,
      following_count: 567,
      tweet_count: 3456
    }
  },
  public_metrics: {
    retweet_count: 245,
    reply_count: 89,
    like_count: 1023,
    quote_count: 56
  }
};

/**
 * Extract tweet ID from a Twitter URL
 * @param url Twitter URL
 * @returns Tweet ID or null if invalid URL
 */
export function extractTweetId(url: string): string | null {
  // Match both twitter.com and x.com URLs
  const twitterRegex = /^https?:\/\/(twitter\.com|x\.com)\/[a-zA-Z0-9_]+\/status\/([0-9]+)/i;
  const match = url.match(twitterRegex);
  return match ? match[2] : null;
}

/**
 * Twitter API service class
 */
export class TwitterApiService {
  private config: TwitterApiConfig | null = null;
  private useMockData: boolean = true;

  /**
   * Initialize the Twitter API service
   * @param config Twitter API configuration
   */
  initialize(config: TwitterApiConfig): void {
    this.config = config;
    this.useMockData = !config.bearerToken;
    console.log(`Twitter API initialized. Using ${this.useMockData ? 'mock' : 'real'} data.`);
  }

  /**
   * Fetch a tweet by ID
   * @param tweetId Tweet ID
   * @returns Promise with tweet data or error
   */
  async fetchTweet(tweetId: string): Promise<TwitterApiResponse> {
    if (this.useMockData) {
      // Return mock data for development/testing
      console.log('Using mock Twitter data');
      return { tweet: MOCK_TWEET };
    }

    if (!this.config?.bearerToken) {
      return {
        error: {
          status: 401,
          message: 'Twitter API not configured. Missing bearer token.'
        }
      };
    }

    try {
      // In a real implementation, this would make an actual API call
      // For now, we'll simulate the API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // This is where you would make the actual API call using fetch or axios
      // Example:
      // const response = await fetch(
      //   `https://api.twitter.com/2/tweets/${tweetId}?expansions=author_id,attachments.media_keys&user.fields=name,username,profile_image_url,verified,created_at,public_metrics&tweet.fields=created_at,public_metrics,attachments,entities&media.fields=type,url,preview_image_url,alt_text`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${this.config.bearerToken}`,
      //     },
      //   }
      // );
      // const data = await response.json();
      // Process the response and return formatted data

      // For now, return mock data
      return { tweet: MOCK_TWEET };
    } catch (error) {
      console.error('Error fetching tweet:', error);
      return {
        error: {
          status: 500,
          message: 'Failed to fetch tweet data from Twitter API'
        }
      };
    }
  }

  /**
   * Fetch a tweet by URL
   * @param url Twitter URL
   * @returns Promise with tweet data or error
   */
  async fetchTweetByUrl(url: string): Promise<TwitterApiResponse> {
    const tweetId = extractTweetId(url);
    if (!tweetId) {
      return {
        error: {
          status: 400,
          message: 'Invalid Twitter URL'
        }
      };
    }
    return this.fetchTweet(tweetId);
  }
}

// Create and export a singleton instance
const twitterApiService = new TwitterApiService();
export default twitterApiService;
