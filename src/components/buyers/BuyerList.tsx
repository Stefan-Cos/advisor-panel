
import React, { useState } from 'react';
import { toast } from "@/hooks/use-toast";
import BuyerTabs from './components/BuyerTabs';
import BuyerFilter from './components/BuyerFilter';
import BuyerSearch from './components/BuyerSearch';
import BuyerActionBar from './components/BuyerActionBar';
import StrategicBuyerTable from './components/StrategicBuyerTable';
import PEBuyerTable from './components/PEBuyerTable';
import { getMATrackRecordColor } from './utils/buyerUtils';

// Mock data imports
import { strategicBuyers, peBuyers } from './data/mockData';

interface BuyerListProps {
  listingId: string;
}

const BuyerList: React.FC<BuyerListProps> = ({ listingId }) => {
  const [activeTab, setActiveTab] = useState<'strategic' | 'pe'>('strategic');
  const [savedBuyers, setSavedBuyers] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [expandedRationales, setExpandedRationales] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectedBuyers, setSelectedBuyers] = useState<string[]>([]); // Add this state for selected buyers
  
  const handleAddToSaved = (buyerId: string) => {
    if (!savedBuyers.includes(buyerId)) {
      setSavedBuyers([...savedBuyers, buyerId]);
      toast({
        title: "The buyer has been added to your saved list"
      });
    }
  };
  
  const buyers = activeTab === 'strategic' ? strategicBuyers : peBuyers;
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  const handleFilterApply = () => {
    toast({
      title: "Your search filters have been applied"
    });
    setShowFilters(false);
  };

  const toggleRationale = (buyerId: string) => {
    setExpandedRationales(prev => 
      prev.includes(buyerId) 
        ? prev.filter(id => id !== buyerId) 
        : [...prev, buyerId]
    );
  };

  // Add a handler for clearing selection
  const handleClearSelection = () => {
    setSelectedBuyers([]);
  };

  return (
    <div className="animate-fade-in">
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <BuyerTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <div>
            <button 
              onClick={toggleFilters}
              className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Filters
            </button>
          </div>
        </div>
        
        {showFilters && (
          <BuyerFilter onFilterApply={handleFilterApply} onClose={() => setShowFilters(false)} />
        )}
        
        {activeTab === 'strategic' ? (
          <StrategicBuyerTable 
            buyers={strategicBuyers}
            savedBuyers={savedBuyers}
            expandedRationales={expandedRationales}
            onAddToSaved={handleAddToSaved}
            toggleRationale={toggleRationale}
            getMATrackRecordColor={getMATrackRecordColor}
            searchValue={searchValue}
            onSearchChange={setSearchValue}
          />
        ) : (
          <PEBuyerTable
            buyers={peBuyers}
            savedBuyers={savedBuyers}
            expandedRationales={expandedRationales}
            onAddToSaved={handleAddToSaved}
            toggleRationale={toggleRationale}
            searchValue={searchValue}
            onSearchChange={setSearchValue}
          />
        )}
        
        {selectedBuyers.length > 0 && (
          <BuyerActionBar 
            selectedBuyers={selectedBuyers} 
            onClearSelection={handleClearSelection}
            toggleFilters={toggleFilters}
          />
        )}
      </div>
    </div>
  );
};

export default BuyerList;
