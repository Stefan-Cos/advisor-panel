
import React from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";

interface BuyerCardProps {
  id: string;
  name: string;
  type: 'strategic' | 'pe';
  location: string;
  sector: string;
  offering: string;
  customers: string;
  fitPercentage?: number;
  addedToSaved?: boolean;
  onAddToSaved?: (id: string) => void;
}

const BuyerCard: React.FC<BuyerCardProps> = ({
  id,
  name,
  type,
  location,
  sector,
  offering,
  customers,
  fitPercentage = Math.floor(Math.random() * 31) + 70, // Random fit % between 70-100 for demo
  addedToSaved = false,
  onAddToSaved,
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

  return (
    <div className={cn(
      "premium-card animate-scale-in overflow-hidden",
      addedToSaved && "ring-2 ring-blueknight-400 bg-green-50"
    )}>
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg text-blueknight-800">{name}</h3>
          <div className="flex items-center space-x-2">
            {!addedToSaved && (
              <button
                onClick={handleAddToSaved}
                className="h-8 w-8 flex items-center justify-center rounded-full bg-blueknight-50 text-blueknight-500 hover:bg-blueknight-100 transition-colors"
              >
                <Plus className="h-5 w-5" />
                <span className="sr-only">Add to saved list</span>
              </button>
            )}
            {addedToSaved && (
              <span className="text-xs font-medium bg-green-50 text-green-700 px-2 py-1 rounded-full">
                Saved
              </span>
            )}
          </div>
        </div>
        
        <div className="mt-2 flex items-center justify-between">
          <div className="flex space-x-2">
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {type === 'strategic' ? 'Strategic Buyer' : 'PE-Backed'}
            </span>
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {location}
            </span>
          </div>
          
          <div className="relative h-2 w-16 bg-gray-200 rounded overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-blueknight-500" 
              style={{ width: `${fitPercentage}%` }}
            />
          </div>
        </div>
      </div>
      
      <div className="p-4 text-sm space-y-2">
        <div>
          <span className="font-medium text-gray-600">Sectors:</span> {sector}
        </div>
        <div>
          <span className="font-medium text-gray-600">Offering:</span> {offering}
        </div>
        <div>
          <span className="font-medium text-gray-600">Customers:</span> {customers}
        </div>
      </div>
      
      <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
        <div className="flex items-center">
          <span className="text-sm font-medium mr-2">Fit Score:</span>
          <span className="text-sm font-bold text-blueknight-500">{fitPercentage}%</span>
        </div>
      </div>
    </div>
  );
};

export default BuyerCard;
