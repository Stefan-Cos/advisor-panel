
import React from 'react';
import { Save } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SaveButtonProps {
  id: string;
  name: string;
  isSaved: boolean;
  onSave: (id: string) => void;
}

const SaveButton: React.FC<SaveButtonProps> = ({
  id,
  name,
  isSaved,
  onSave
}) => {
  const handleSave = () => {
    if (!isSaved) {
      onSave(id);
      toast({
        title: "Buyer Saved",
        description: `${name} has been added to your saved list.`
      });
    }
  };

  return (
    <div className="flex justify-center">
      <Button
        onClick={handleSave}
        disabled={isSaved}
        variant="ghost"
        size="icon"
        className={cn(
          "flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300",
          isSaved 
            ? "bg-white text-green-600 shadow-sm ring-1 ring-green-200" 
            : "bg-white text-blueknight-600 hover:bg-blueknight-50 hover:shadow-md"
        )}
        title={isSaved ? "Already saved" : "Save this buyer"}
      >
        <Save className={cn(
          "h-4 w-4",
          isSaved ? "fill-green-50 stroke-green-600" : "stroke-blueknight-600"
        )} />
      </Button>
    </div>
  );
};

export default SaveButton;
