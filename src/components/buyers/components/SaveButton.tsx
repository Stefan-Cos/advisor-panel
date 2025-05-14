
import React from 'react';
import { Check, BookmarkPlus } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

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
    <button
      onClick={handleSave}
      disabled={isSaved}
      className={cn(
        "flex items-center justify-center p-1.5 rounded-md transition-all duration-200",
        isSaved 
          ? "bg-green-50 text-green-600 border border-green-200" 
          : "bg-blueknight-50 text-blueknight-600 hover:bg-blueknight-100 border border-blueknight-200 hover:shadow-sm"
      )}
      title={isSaved ? "Already saved" : "Save this buyer"}
    >
      {isSaved ? (
        <Check className="h-4 w-4" />
      ) : (
        <BookmarkPlus className="h-4 w-4" />
      )}
    </button>
  );
};

export default SaveButton;
