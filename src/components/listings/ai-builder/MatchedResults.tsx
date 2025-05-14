
import React from 'react';
import { Button } from "@/components/ui/button";
import { Target, Save, Settings } from 'lucide-react';
import BuyerListNew from '../../buyers/BuyerListNew';

interface MatchedResultsProps {
  listingId: string;
  handleSaveSearch: () => void;
  handleReconfigure: () => void;
}

const MatchedResults: React.FC<MatchedResultsProps> = ({
  listingId,
  handleSaveSearch,
  handleReconfigure
}) => {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Target className="h-4 w-4 mr-2 text-blueknight-600" />
          <h2 className="text-base font-medium text-blueknight-700">AI-Matched Buyers</h2>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={handleSaveSearch}
            variant="outline" 
            size="sm" 
            className="text-xs"
          >
            <Save className="h-3 w-3 mr-1" />
            Save Search
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="text-xs"
            onClick={handleReconfigure}
          >
            <Settings className="h-3 w-3 mr-1" />
            Reconfigure
          </Button>
        </div>
      </div>
      <BuyerListNew listingId={listingId} />
    </div>
  );
};

export default MatchedResults;
