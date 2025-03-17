import React, { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Check, Shield, Zap } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface UpgradeModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onUpgradeComplete?: () => void;
}

const UpgradeModal = ({
  open = true,
  onOpenChange = () => {},
  onUpgradeComplete = () => {},
}: UpgradeModalProps) => {
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const [paymentStep, setPaymentStep] = useState("plan"); // 'plan', 'payment', 'confirmation'

  const handlePlanSelect = (plan: string) => {
    setSelectedPlan(plan);
  };

  const handleContinueToPayment = () => {
    setPaymentStep("payment");
  };

  const handleCompletePayment = () => {
    setPaymentStep("confirmation");
    // In a real app, this would process the payment
    setTimeout(() => {
      onUpgradeComplete();
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Upgrade to Premium
          </DialogTitle>
          <DialogDescription className="text-center">
            Get unlimited access to advanced features and detailed analysis
          </DialogDescription>
        </DialogHeader>

        {paymentStep === "plan" && (
          <div className="space-y-6">
            <Tabs
              defaultValue={selectedPlan}
              onValueChange={handlePlanSelect}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="yearly">
                  Yearly{" "}
                  <span className="ml-1 text-xs text-green-600 font-medium">
                    Save 20%
                  </span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="monthly" className="mt-4">
                <Card>
                  <CardHeader className="bg-blue-50">
                    <CardTitle className="text-blue-700">
                      Premium Monthly
                    </CardTitle>
                    <CardDescription>$9.00 per month</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <FeatureItem>Unlimited Twitter post analysis</FeatureItem>
                    <FeatureItem>Advanced image verification</FeatureItem>
                    <FeatureItem>Source credibility checks</FeatureItem>
                    <FeatureItem>Detailed language analysis</FeatureItem>
                    <FeatureItem>
                      Comprehensive statistics dashboard
                    </FeatureItem>
                    <FeatureItem>Downloadable reports</FeatureItem>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={handleContinueToPayment}
                    >
                      Continue with Monthly Plan
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="yearly" className="mt-4">
                <Card>
                  <CardHeader className="bg-blue-50">
                    <CardTitle className="text-blue-700">
                      Premium Yearly
                    </CardTitle>
                    <CardDescription>
                      $90.00 per year (equivalent to $7.50/month)
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <FeatureItem>Unlimited Twitter post analysis</FeatureItem>
                    <FeatureItem>Advanced image verification</FeatureItem>
                    <FeatureItem>Source credibility checks</FeatureItem>
                    <FeatureItem>Detailed language analysis</FeatureItem>
                    <FeatureItem>
                      Comprehensive statistics dashboard
                    </FeatureItem>
                    <FeatureItem>Downloadable reports</FeatureItem>
                    <FeatureItem highlight>Priority support</FeatureItem>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={handleContinueToPayment}
                    >
                      Continue with Yearly Plan
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <Shield size={16} />
              <span>Secure payment processing</span>
            </div>
          </div>
        )}

        {paymentStep === "payment" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <div className="font-medium">Selected Plan:</div>
              <div className="flex justify-between items-center">
                <div>
                  {selectedPlan === "monthly"
                    ? "Premium Monthly"
                    : "Premium Yearly"}
                </div>
                <div className="font-bold">
                  {selectedPlan === "monthly" ? "$9.00/month" : "$90.00/year"}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Card Information</label>
                <Input placeholder="Card number" />
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="MM/YY" />
                  <Input placeholder="CVC" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Billing Information
                </label>
                <Input placeholder="Full name" />
                <Input placeholder="Email address" />
                <Input placeholder="Billing address" />
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="City" />
                  <Input placeholder="Postal code" />
                </div>
                <Select defaultValue="US">
                  <SelectTrigger>
                    <SelectValue placeholder="Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="US">United States</SelectItem>
                    <SelectItem value="CA">Canada</SelectItem>
                    <SelectItem value="UK">United Kingdom</SelectItem>
                    <SelectItem value="AU">Australia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" onClick={() => setPaymentStep("plan")}>
                Back
              </Button>
              <Button
                onClick={handleCompletePayment}
                className="flex items-center bg-blue-600 hover:bg-blue-700"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Complete Payment
              </Button>
            </DialogFooter>
          </motion.div>
        )}

        {paymentStep === "confirmation" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-8 space-y-4"
          >
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold">Payment Successful!</h3>
            <p className="text-center text-gray-500">
              Thank you for upgrading to Premium. Your account has been upgraded
              and you now have access to all premium features.
            </p>
            <Button
              onClick={onUpgradeComplete}
              className="mt-4 bg-blue-600 hover:bg-blue-700"
            >
              Start Using Premium Features
            </Button>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
};

interface FeatureItemProps {
  children: React.ReactNode;
  highlight?: boolean;
}

const FeatureItem = ({ children, highlight = false }: FeatureItemProps) => (
  <div className="flex items-center space-x-2">
    <Check
      className={`h-4 w-4 ${highlight ? "text-green-600" : "text-blue-600"}`}
    />
    <span className={highlight ? "font-medium text-green-700" : ""}>
      {children}
    </span>
  </div>
);

export default UpgradeModal;
