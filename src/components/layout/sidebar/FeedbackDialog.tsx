
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const FeedbackDialog = () => {
  const { toast } = useToast();
  const [feedback, setFeedback] = React.useState("");
  
  const handleFeedbackSubmit = () => {
    if (feedback.trim()) {
      toast({
        title: "Feedback Submitted",
        description: "Thank you for your feedback! We'll review it shortly.",
      });
      setFeedback("");
    } else {
      toast({
        title: "Empty Feedback",
        description: "Please enter some feedback before submitting.",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="nav-link w-full text-left text-gray-600 hover:bg-gray-100 mt-2">
          <MessageCircle className="h-5 w-5 text-gray-500" />
          <span>Give us Feedback</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Your Feedback Matters</DialogTitle>
          <DialogDescription>
            Help us improve BlueKnight by sharing your thoughts on existing features or suggesting new ones.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Textarea
            placeholder="Tell us what you think or what features you'd like to see..."
            className="min-h-[150px]"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleFeedbackSubmit}>Submit Feedback</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackDialog;
