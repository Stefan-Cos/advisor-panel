
import React, { useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";
import { MatchedBuyersService } from '@/services/matchedBuyersService';
import { Buyer } from './types/BuyerTypes';
import BuyerTabs from './components/BuyerTabs';
import BuyerSearch from './components/BuyerSearch';
import StrategicBuyerTable from './components/StrategicBuyerTable';
import PEBuyerTable from './components/PEBuyerTable';
import { getMATrackRecordColor } from './utils/buyerUtils';

interface BlueKnightListProps {
  listingId: string;
}

const BlueKnightList: React.FC<BlueKnightListProps> = ({ listingId }) => {
  const [activeTab, setActiveTab] = useState<'strategic' | 'pe'>('strategic');
  const [allBuyers, setAllBuyers] = useState<Buyer[]>([]);
  const [savedBuyers, setSavedBuyers] = useState<string[]>([]);
  const [expandedRationales, setExpandedRationales] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Load buyer data from the new matched_buyers table
  const loadBuyerData = async () => {
    setIsLoading(true);
    
    try {
      const matchedBuyers = await MatchedBuyersService.getMatchedBuyers();
      setAllBuyers(matchedBuyers);
    } catch (error) {
      console.error('Error loading matched buyers:', error);
      toast({
        title: "Error",
        description: "Failed to load buyer data. Please try again.",
        variant: "destructive"
      });
      setAllBuyers([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Load data when component mounts
  useEffect(() => {
    loadBuyerData();
  }, []);

  // Filter buyers by active tab and search
  const filteredBuyers = allBuyers
    .filter(buyer => buyer.type === activeTab)
    .filter(buyer => 
      searchValue === '' || 
      buyer.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      buyer.description?.toLowerCase().includes(searchValue.toLowerCase())
    );
  
  const handleAddToSaved = (buyerId: string) => {
    if (!savedBuyers.includes(buyerId)) {
      setSavedBuyers([...savedBuyers, buyerId]);
      const buyer = filteredBuyers.find(b => b.id === buyerId);
      toast({
        title: "Buyer Saved",
        description: `${buyer?.name} has been added to your saved list.`
      });
    }
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
        <div className="flex items-center justify-between mb-6">
          <BuyerTabs 
            activeTab={activeTab} 
            setActiveTab={setActiveTab}
            buyers={allBuyers}
          />
        </div>
        
        <div className="mb-4">
          <BuyerSearch searchValue={searchValue} onSearchChange={setSearchValue} />
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/5"></div>
            </div>
          </div>
        ) : (
          <>
            {activeTab === 'strategic' ? (
              <StrategicBuyerTable 
                buyers={filteredBuyers}
                savedBuyers={savedBuyers}
                expandedRationales={expandedRationales}
                onAddToSaved={handleAddToSaved}
                toggleRationale={toggleRationale}
                getMATrackRecordColor={getMATrackRecordColor}
                listingId={listingId}
              />
            ) : (
              <PEBuyerTable
                buyers={filteredBuyers}
                savedBuyers={savedBuyers}
                expandedRationales={expandedRationales}
                onAddToSaved={handleAddToSaved}
                toggleRationale={toggleRationale}
                listingId={listingId}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BlueKnightList;
