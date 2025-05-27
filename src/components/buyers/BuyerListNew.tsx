
import React, { useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";
import { getBuyersByType, transformDatabaseBuyerToComponentFormat } from '@/services/buyersService';
import { Buyer } from './types/BuyerTypes';
import BuyerTabs from './components/BuyerTabs';
import StrategicBuyerTable from './components/StrategicBuyerTable';
import PEBuyerTable from './components/PEBuyerTable';

interface BuyerListNewProps {
  listingId: string;
}

const BuyerListNew: React.FC<BuyerListNewProps> = ({ listingId }) => {
  const [activeTab, setActiveTab] = useState<'strategic' | 'pe'>('strategic');
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [savedBuyers, setSavedBuyers] = useState<string[]>([]);
  const [expandedRationales, setExpandedRationales] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load buyer data
  const loadBuyerData = async () => {
    setIsLoading(true);
    
    try {
      const databaseBuyers = await getBuyersByType(activeTab);
      const transformedBuyers = databaseBuyers.map(transformDatabaseBuyerToComponentFormat);
      setBuyers(transformedBuyers);
    } catch (error) {
      console.error('Error loading buyers:', error);
      toast({
        title: "Error",
        description: "Failed to load buyer data. Please try again.",
        variant: "destructive"
      });
      setBuyers([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Load data when component mounts or tab changes
  useEffect(() => {
    loadBuyerData();
  }, [activeTab]);

  // Toggle rationale expansion
  const toggleRationale = (buyerId: string) => {
    setExpandedRationales(prev => 
      prev.includes(buyerId) 
        ? prev.filter(id => id !== buyerId) 
        : [...prev, buyerId]
    );
  };

  // Handle saving a buyer
  const handleAddToSaved = (buyerId: string) => {
    if (!savedBuyers.includes(buyerId)) {
      setSavedBuyers(prev => [...prev, buyerId]);
      const buyer = buyers.find(b => b.id === buyerId);
      toast({
        title: "Buyer Saved",
        description: `${buyer?.name} has been added to your saved list.`
      });
    }
  };

  // Function to determine color based on M&A track record
  const getMATrackRecordColor = (record: string): string => {
    switch (record.toLowerCase()) {
      case 'high':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-amber-100 text-amber-800';
      case 'low':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
        <div className="mb-6">
          <BuyerTabs 
            activeTab={activeTab} 
            setActiveTab={setActiveTab}
            buyers={buyers}
          />
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
          <div>
            {activeTab === 'strategic' ? (
              <StrategicBuyerTable
                buyers={buyers}
                savedBuyers={savedBuyers}
                expandedRationales={expandedRationales}
                onAddToSaved={handleAddToSaved}
                toggleRationale={toggleRationale}
                getMATrackRecordColor={getMATrackRecordColor}
                showDescription={false}
              />
            ) : (
              <PEBuyerTable
                buyers={buyers}
                savedBuyers={savedBuyers}
                expandedRationales={expandedRationales}
                onAddToSaved={handleAddToSaved}
                toggleRationale={toggleRationale}
                showDescription={false}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerListNew;
