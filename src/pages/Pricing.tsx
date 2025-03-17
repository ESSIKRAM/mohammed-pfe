import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, AlertCircle, Shield } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/");
    // In a real implementation, this would open the signup modal
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that fits your needs. No hidden fees or
              complicated pricing structures.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <Card className="border border-gray-200 shadow-md overflow-hidden">
              <CardHeader className="bg-gray-50 pb-6">
                <CardTitle className="flex justify-between items-center">
                  <span className="text-2xl font-bold">Free Plan</span>
                  <span className="text-gray-500 text-lg font-normal">$0</span>
                </CardTitle>
                <p className="text-gray-600">Perfect for occasional use</p>
              </CardHeader>
              <CardContent className="pt-6">
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
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleSignup}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white py-6 h-auto text-lg font-semibold"
                >
                  Sign Up Free
                </Button>
              </CardFooter>
            </Card>

            {/* Premium Plan */}
            <Card className="border-2 border-blue-500 shadow-xl overflow-hidden relative">
              <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 rounded-bl-lg font-medium">
                MOST POPULAR
              </div>
              <CardHeader className="bg-blue-50 pb-6">
                <CardTitle className="flex justify-between items-center">
                  <span className="text-2xl font-bold">Premium Plan</span>
                  <div className="text-right">
                    <span className="text-blue-600 text-lg font-bold">$9</span>
                    <span className="text-gray-500 text-sm">/month</span>
                  </div>
                </CardTitle>
                <p className="text-gray-600">For professionals and teams</p>
              </CardHeader>
              <CardContent className="pt-6">
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
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Statistics dashboard</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Downloadable reports</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleSignup}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 h-auto text-lg font-semibold"
                >
                  Start Premium Trial
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-12 bg-gray-50 p-6 rounded-lg border border-gray-200 max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Shield className="h-6 w-6 text-blue-700" />
              </div>
              <div>
                <h3 className="font-bold mb-2">30-Day Money-Back Guarantee</h3>
                <p className="text-gray-600">
                  Try our Premium plan risk-free. If you're not completely
                  satisfied within the first 30 days, we'll refund your payment
                  in full — no questions asked.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold mb-6">
              Frequently Asked Questions
            </h2>
            <div className="max-w-3xl mx-auto space-y-6 text-left">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-2">
                  Can I upgrade from Free to Premium at any time?
                </h3>
                <p className="text-gray-600">
                  Yes, you can upgrade to our Premium plan at any time. Your new
                  features will be available immediately after upgrading.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-2">
                  Is there a discount for annual billing?
                </h3>
                <p className="text-gray-600">
                  Yes, we offer a 20% discount when you choose annual billing.
                  The annual plan costs $90 per year, which is equivalent to
                  $7.50 per month.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-2">
                  Do you offer team or enterprise plans?
                </h3>
                <p className="text-gray-600">
                  Yes, we offer custom plans for teams and enterprises with
                  additional features like team management, API access, and
                  dedicated support. Contact our sales team for more
                  information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;
