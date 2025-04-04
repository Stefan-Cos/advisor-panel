
import React from 'react';
import { Plus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface SaveButtonProps {
  id: string;
  name: string;
  addedToSaved: boolean;
  onAddToSaved?: (id: string) => void;
}

const SaveButton: React.FC<SaveButtonProps> = ({
  id,
  name,
  addedToSaved,
  onAddToSaved
}) => {
  const { toast } = useToast();
  
  const handleAddToSaved = () => {
    if (onAddToSaved) {
      onAddToSaved(id);
      toast({
        title: "Buyer Saved",
        description: `${name} has been added to your saved list.`,
      });
    }
  };

  if (addedToSaved) {
    return (
      <span className="text-xs font-medium bg-green-50 text-green-700 px-2 py-1 rounded-full">
        Saved
      </span>
    );
  }
  
  return (
    <button
      onClick={handleAddToSaved}
      className="h-8 w-8 flex items-center justify-center rounded-full bg-blueknight-50 text-blueknight-500 hover:bg-blueknight-100 transition-colors"
    >
      <Plus className="h-5 w-5" />
      <span className="sr-only">Add to saved list</span>
    </button>
  );
};

export default SaveButton;
