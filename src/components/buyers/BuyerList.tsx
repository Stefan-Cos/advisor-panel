
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import BuyerTabs from './components/BuyerTabs';
import BuyerSearch from './components/BuyerSearch';
import BuyerActionBar from './components/BuyerActionBar';
import StrategicBuyerTable from './components/StrategicBuyerTable';
import PEBuyerTable from './components/PEBuyerTable';
import FilterSidebar from './components/FilterSidebar';
import { getMATrackRecordColor } from './utils/buyerUtils';

// Mock data imports
import { strategicBuyers, peBuyers } from './data/mockData';

interface BuyerListProps {
  listingId: string;
}

const BuyerList: React.FC<BuyerListProps> = ({ listingId }) => {
  const [activeTab, setActiveTab] = useState<'strategic' | 'pe'>('strategic');
  const [savedBuyers, setSavedBuyers] = useState<string[]>([]);
  const [expandedRationales, setExpandedRationales] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const { toast } = useToast();
  
  const handleAddToSaved = (buyerId: string) => {
    if (!savedBuyers.includes(buyerId)) {
      setSavedBuyers([...savedBuyers, buyerId]);
      toast({
        title: "Buyer Saved",
        description: "The buyer has been added to your saved list",
      });
    }
  };
  
  const buyers = activeTab === 'strategic' ? strategicBuyers : peBuyers;
  
  const handleFilterChange = (filters: any) => {
    console.log("Filters applied:", filters);
    // In a real implementation, filter buyers based on the selected filters
    toast({
      title: "Filters Applied",
      description: "Your search filters have been applied",
    });
  };

  const toggleRationale = (buyerId: string) => {
    setExpandedRationales(prev => 
      prev.includes(buyerId) 
        ? prev.filter(id => id !== buyerId) 
        : [...prev, buyerId]
    );
  };

  return (
    <div className="flex h-full animate-fade-in">
      <FilterSidebar onFilterChange={handleFilterChange} />
      
      <div className="flex-1 bg-white shadow-sm rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <BuyerTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <BuyerActionBar onSearchChange={setSearchValue} />
        </div>
        
        {activeTab === 'strategic' ? (
          <StrategicBuyerTable 
            buyers={strategicBuyers}
            savedBuyers={savedBuyers}
            expandedRationales={expandedRationales}
            onAddToSaved={handleAddToSaved}
            toggleRationale={toggleRationale}
            getMATrackRecordColor={getMATrackRecordColor}
          />
        ) : (
          <PEBuyerTable
            buyers={peBuyers}
            savedBuyers={savedBuyers}
            expandedRationales={expandedRationales}
            onAddToSaved={handleAddToSaved}
            toggleRationale={toggleRationale}
          />
        )}
      </div>
    </div>
  );
};

export default BuyerList;
