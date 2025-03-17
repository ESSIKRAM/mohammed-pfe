import React from "react";
import Layout from "@/components/layout/Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FAQ = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/");
    // In a real implementation, this would open the signup modal
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600">
              Find answers to common questions about our fake news detection
              service
            </p>
          </div>

          <Accordion type="single" collapsible className="mb-12">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-medium">
                How accurate is your fake news detection?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Our system achieves a 98% accuracy rate through a combination of
                AI algorithms, machine learning models, and continuous
                improvement based on user feedback and expert verification. We
                regularly benchmark our system against human fact-checkers to
                ensure high quality results.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-medium">
                Can I analyze private or protected tweets?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Our system can only analyze publicly available posts on X.
                Private or protected tweets cannot be accessed by our platform
                due to privacy restrictions. We respect user privacy and only
                process content that is publicly accessible.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-medium">
                How many analyses can I run with the free plan?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                The free plan allows you to run up to 3 analyses per day. This
                limit resets at midnight UTC. For unlimited analyses and access
                to premium features, you can upgrade to our Premium plan for
                just $9/month.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg font-medium">
                Can I cancel my premium subscription anytime?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Yes, you can cancel your premium subscription at any time. We
                offer a 30-day money-back guarantee if you're not completely
                satisfied with our service. After cancellation, you'll continue
                to have access to premium features until the end of your current
                billing period.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-lg font-medium">
                How does your credibility score work?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Our credibility score is calculated using multiple factors,
                including content analysis, source reputation, historical
                patterns, and image verification. Scores range from 0-100, with
                higher scores indicating more credible content. Scores above 80
                are considered highly credible, 50-80 moderately credible, and
                below 50 potentially misleading.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger className="text-lg font-medium">
                Do you offer API access for developers?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Yes, we offer API access for developers who want to integrate
                our fake news detection capabilities into their applications.
                API access is available for enterprise customers and comes with
                dedicated support and documentation. Contact our sales team for
                pricing and integration details.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger className="text-lg font-medium">
                How do you handle user data and privacy?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                We take data privacy seriously. We only store the minimum amount
                of data necessary to provide our service. Analysis results are
                stored securely and associated with your account, but we do not
                share your data with third parties. You can delete your account
                and associated data at any time from your account settings.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8">
              <AccordionTrigger className="text-lg font-medium">
                Can I analyze content from platforms other than X?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Currently, our service is optimized for analyzing content from X
                (formerly Twitter). We're working on expanding our capabilities
                to include other social media platforms and news sources in the
                future. Premium users will get early access to these new
                features when they become available.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle>Still have questions?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                If you couldn't find the answer you were looking for, our
                support team is here to help. Contact us at{" "}
                <a
                  href="mailto:support@fakenewsdetector.com"
                  className="text-blue-600 hover:underline"
                >
                  support@fakenewsdetector.com
                </a>
              </p>
              <Button
                onClick={handleGetStarted}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;
