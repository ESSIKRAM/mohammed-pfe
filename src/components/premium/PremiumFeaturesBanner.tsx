import React from "react";
import { Button } from "@/components/ui/button";
import { Shield, Zap, Clock, BarChart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface PremiumFeaturesBannerProps {
  onUpgradeClick?: () => void;
  isVisible?: boolean;
}

const PremiumFeaturesBanner = ({
  onUpgradeClick = () => {},
  isVisible = true,
}: PremiumFeaturesBannerProps) => {
  if (!isVisible) return null;

  return (
    <div className="w-full max-w-[800px] bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-lg p-6 shadow-md mb-8">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="text-white mb-4 md:mb-0">
          <h3 className="text-xl font-bold mb-2">Unlock Premium Features</h3>
          <p className="text-sm opacity-90 mb-3">
            Get unlimited analyses, advanced metrics, and more for just $9/month
          </p>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1">
              <Shield size={14} />
              <span>Source credibility checks</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap size={14} />
              <span>Unlimited analyses</span>
            </div>
            <div className="flex items-center gap-1">
              <BarChart size={14} />
              <span>Advanced statistics</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>Historical tracking</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                onClick={onUpgradeClick}
                className="bg-white text-blue-700 hover:bg-gray-100 hover:text-blue-800 font-medium px-6"
              >
                Upgrade Now
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Upgrade to Premium</DialogTitle>
              </DialogHeader>
              <div className="p-4 text-center">
                <p className="mb-4">
                  This is a placeholder for the upgrade modal.
                </p>
                <p className="text-sm text-gray-500">
                  In a real implementation, this would open the UpgradeModal
                  component.
                </p>
              </div>
            </DialogContent>
          </Dialog>
          <p className="text-white text-xs mt-2 opacity-80">
            30-day money-back guarantee
          </p>
        </div>
      </div>
    </div>
  );
};

export default PremiumFeaturesBanner;
