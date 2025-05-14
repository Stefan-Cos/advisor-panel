
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Search, ChevronLeft } from 'lucide-react';
import BuyerTabs from '../../buyers/components/BuyerTabs';
import BuyerTables from '../../buyers/components/BuyerTables';

interface SavedSearch {
  id: string;
  name: string;
  date: string;
  filters: Record<string, string>;
}

interface SavedSearchDetailsProps {
  selectedSearch: SavedSearch;
  buyers: any[];
  savedBuyers: string[];
  expandedRationales: string[];
  onBack: () => void;
  onAddToSaved: (buyerId: string) => void;
  toggleRationale: (buyerId: string) => void;
}

const SavedSearchDetails: React.FC<SavedSearchDetailsProps> = ({
  selectedSearch,
  buyers,
  savedBuyers,
  expandedRationales,
  onBack,
  onAddToSaved,
  toggleRationale
}) => {
  const [activeTab, setActiveTab] = useState<'strategic' | 'pe'>('strategic');
  const [companyNameSearch, setCompanyNameSearch] = useState('');

  // Filter buyers by type based on the active tab
  const filteredBuyers = buyers.filter(buyer => 
    buyer.type === activeTab
  );

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Search className="h-4 w-4 mr-2 text-blueknight-600" />
          <h2 className="text-base font-medium text-blueknight-700">
            {selectedSearch.name}
          </h2>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          className="text-xs"
          onClick={onBack}
        >
          <ChevronLeft className="h-3 w-3 mr-1" />
          Back to Saved Searches
        </Button>
      </div>
      
      <div className="border rounded-lg p-4 bg-white shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-medium">Search Results</h3>
            <p className="text-xs text-gray-500">
              Saved on {selectedSearch.date}
            </p>
          </div>
        </div>
        
        <div className="mb-4">
          <BuyerTabs 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

        <BuyerTables
          activeTab={activeTab}
          buyers={filteredBuyers}
          companyNameSearch={companyNameSearch}
          setCompanyNameSearch={setCompanyNameSearch}
          expandedRationales={expandedRationales}
          savedBuyers={savedBuyers}
          toggleRationale={toggleRationale}
          handleAddToSaved={onAddToSaved}
        />
      </div>
    </div>
  );
};

export default SavedSearchDetails;
