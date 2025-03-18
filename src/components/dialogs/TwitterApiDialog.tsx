import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TwitterApiSettings from "@/components/settings/TwitterApiSettings";
import { Button } from "@/components/ui/button";
import { Twitter } from "lucide-react";

interface TwitterApiDialogProps {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const TwitterApiDialog = ({
  trigger,
  open,
  onOpenChange,
}: TwitterApiDialogProps) => {
  const handleClose = () => {
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Twitter API Configuration</DialogTitle>
          <DialogDescription>
            Configure your Twitter API credentials to enable tweet analysis
          </DialogDescription>
        </DialogHeader>
        <TwitterApiSettings onClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
};

// Default trigger button
export const TwitterApiButton = () => (
  <Button variant="outline" className="flex items-center gap-2">
    <Twitter className="h-4 w-4" />
    Configure Twitter API
  </Button>
);

export default TwitterApiDialog;
