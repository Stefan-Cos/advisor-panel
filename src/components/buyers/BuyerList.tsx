
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import BuyerTabs from './components/BuyerTabs';
import BuyerFilter from './components/BuyerFilter';
import BuyerSearch from './components/BuyerSearch';
import BuyerActionBar from './components/BuyerActionBar';
import StrategicBuyerTable from './components/StrategicBuyerTable';
import PEBuyerTable from './components/PEBuyerTable';
import ModularScoreDashboard from './components/ModularScoreDashboard';
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
  const { toast } = useToast();
  
  // Mock metrics for the modular dashboard
  const metrics = [
    { name: "Buyer Country Match", value: 65, count: 13 },
    { name: "Revenue Range Match", value: 42, count: 8 },
    { name: "Industry Match", value: 87, count: 21 }
  ];
  
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
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  const handleFilterApply = () => {
    toast({
      title: "Filters Applied",
      description: "Your search filters have been applied",
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

  return (
    <div className="animate-fade-in">
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          A modular B2B M&A matching dashboard for M&A advisors
        </h2>
        
        <ModularScoreDashboard metrics={metrics} />
        
        <div className="flex items-center justify-between mb-6">
          <BuyerTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <BuyerActionBar toggleFilters={toggleFilters} />
        </div>
        
        <div className="mb-4">
          <BuyerSearch searchValue={searchValue} onSearchChange={setSearchValue} />
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
