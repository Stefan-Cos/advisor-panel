
import React from 'react';
import { toast } from "@/hooks/use-toast";

interface BuyerActionBarProps {
  selectedBuyers: string[];
  onClearSelection: () => void;
  toggleFilters?: () => void; // Add optional toggleFilters prop
}

const BuyerActionBar: React.FC<BuyerActionBarProps> = ({
  selectedBuyers,
  onClearSelection,
  toggleFilters
}) => {
  
  const handleExportCSV = () => {
    toast("Exported buyers", {
      description: `Exported ${selectedBuyers.length} buyers to CSV`,
    });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-10 animate-slide-up">
      <div className="container mx-auto flex items-center justify-between">
        <div>
          <span className="text-sm font-medium">{selectedBuyers.length} buyers selected</span>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={onClearSelection}
            className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Clear Selection
          </button>
          
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 text-sm font-medium text-white bg-blueknight-600 rounded-md hover:bg-blueknight-700"
          >
            Export CSV
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyerActionBar;
