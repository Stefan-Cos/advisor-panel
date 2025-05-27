
import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { saveBuyerToList, checkIfBuyerIsSaved } from '@/services/savedBuyersService';

interface SaveButtonProps {
  id: string;
  name: string;
  isSaved: boolean;
  onSave: (id: string) => void;
  listingId?: string;
  buyerType?: 'strategic' | 'pe';
  buyerData?: any;
}

const SaveButton: React.FC<SaveButtonProps> = ({
  id,
  name,
  isSaved,
  onSave,
  listingId,
  buyerType = 'strategic',
  buyerData
}) => {
  const [isActuallySaved, setIsActuallySaved] = useState(isSaved);
  const [isLoading, setIsLoading] = useState(false);

  // Check if buyer is saved in the database
  useEffect(() => {
    if (listingId) {
      checkIfBuyerIsSaved(listingId, id).then(setIsActuallySaved);
    }
  }, [listingId, id]);

  const handleSave = async () => {
    if (isActuallySaved || isLoading) return;

    setIsLoading(true);
    try {
      if (listingId && buyerData) {
        await saveBuyerToList({
          project_id: listingId,
          buyer_id: id,
          buyer_name: name,
          buyer_type: buyerType,
          buyer_data: buyerData
        });
        
        setIsActuallySaved(true);
        toast({
          title: "Buyer Saved",
          description: `${name} has been added to your saved list.`
        });
      }
      
      // Call the original onSave for backward compatibility
      onSave(id);
    } catch (error) {
      console.error('Error saving buyer:', error);
      toast({
        title: "Error",
        description: "Failed to save buyer. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <Button
        onClick={handleSave}
        disabled={isActuallySaved || isLoading}
        variant="ghost"
        size="icon"
        className={cn(
          "flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300",
          isActuallySaved 
            ? "bg-white text-green-600 shadow-sm ring-1 ring-green-200" 
            : "bg-white text-blueknight-600 hover:bg-blueknight-50 hover:shadow-md"
        )}
        title={isActuallySaved ? "Already saved" : "Save this buyer"}
      >
        <Save className={cn(
          "h-4 w-4",
          isActuallySaved ? "fill-green-50 stroke-green-600" : "stroke-blueknight-600"
        )} />
      </Button>
    </div>
  );
};

export default SaveButton;
