import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Layout from "@/components/layout/Layout";
import { Shield, Award, Clock, Users } from "lucide-react";

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">About Fake News Detector</h1>
          <p className="text-xl text-gray-600 mb-8">
            We're on a mission to combat misinformation and help people verify
            the credibility of content they encounter online.
          </p>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                In today's digital landscape, misinformation spreads faster than
                ever before. Our mission is to provide accessible tools that
                empower everyone to make informed decisions about the content
                they consume and share online. We believe that by combining
                advanced AI technology with human expertise, we can create a
                more trustworthy information ecosystem.
              </p>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-bold mb-4">How We Detect Fake News</h2>
          <p className="text-gray-700 mb-6">
            Our platform uses a combination of advanced technologies and
            methodologies to analyze content and determine its credibility:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Shield className="h-6 w-6 text-blue-700" />
                </div>
                <div>
                  <h3 className="font-bold mb-2">Content Analysis</h3>
                  <p className="text-gray-600">
                    Our AI examines the text for misleading claims, logical
                    fallacies, and emotional manipulation tactics commonly used
                    in fake news.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Award className="h-6 w-6 text-blue-700" />
                </div>
                <div>
                  <h3 className="font-bold mb-2">Source Credibility</h3>
                  <p className="text-gray-600">
                    We evaluate the reliability of information sources based on
                    their historical accuracy, transparency, and reputation.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-blue-700" />
                </div>
                <div>
                  <h3 className="font-bold mb-2">Temporal Analysis</h3>
                  <p className="text-gray-600">
                    We track how information evolves over time to identify
                    inconsistencies and corrections that may indicate false
                    information.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Users className="h-6 w-6 text-blue-700" />
                </div>
                <div>
                  <h3 className="font-bold mb-2">Community Feedback</h3>
                  <p className="text-gray-600">
                    We incorporate user feedback to continuously improve our
                    detection algorithms and address emerging misinformation
                    patterns.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          <h2 className="text-2xl font-bold mb-4">Our Team</h2>
          <p className="text-gray-700 mb-6">
            We're a dedicated team of data scientists, journalists, and software
            engineers passionate about fighting misinformation and promoting
            media literacy.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm text-center">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
                alt="Alex Chen"
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="font-bold">Alex Chen</h3>
              <p className="text-gray-600">Founder & CEO</p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm text-center">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                alt="Sarah Johnson"
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="font-bold">Sarah Johnson</h3>
              <p className="text-gray-600">Lead Data Scientist</p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm text-center">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
                alt="Michael Rodriguez"
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="font-bold">Michael Rodriguez</h3>
              <p className="text-gray-600">Head of Engineering</p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Have questions or feedback? We'd love to hear from you. Reach
                out to our team at{" "}
                <a
                  href="mailto:info@fakenewsdetector.com"
                  className="text-blue-600 hover:underline"
                >
                  info@fakenewsdetector.com
                </a>
              </p>
              <p className="text-gray-700">
                For media inquiries, please contact{" "}
                <a
                  href="mailto:press@fakenewsdetector.com"
                  className="text-blue-600 hover:underline"
                >
                  press@fakenewsdetector.com
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default About;
