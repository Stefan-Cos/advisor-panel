
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StrategicBuyerTable from './StrategicBuyerTable';
import PEBuyerTable from './PEBuyerTable';

interface BuyerTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  strategicBuyers?: any[];
  peBuyers?: any[];
  savedBuyers?: string[];
  expandedRationales?: string[];
  onAddToSaved?: (id: string) => void;
  toggleRationale?: (buyerId: string) => void;
  loading?: boolean;
  listingId?: string;
  buyers?: any[]; // Add this for compatibility with some components
}

const BuyerTabs: React.FC<BuyerTabsProps> = ({
  activeTab,
  setActiveTab,
  strategicBuyers = [],
  peBuyers = [],
  savedBuyers = [],
  expandedRationales = [],
  onAddToSaved = () => {},
  toggleRationale = () => {},
  loading = false,
  listingId,
  buyers = []
}) => {
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

  // Handle tab change - convert string to the expected type
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blueknight-600"></div>
      </div>
    );
  }

  // If buyers prop is provided (for some components), filter by active tab
  const filteredBuyers = buyers.length > 0 ? buyers.filter(buyer => buyer.type === activeTab) : [];
  const currentStrategicBuyers = buyers.length > 0 ? filteredBuyers : strategicBuyers;
  const currentPeBuyers = buyers.length > 0 ? filteredBuyers : peBuyers;

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger 
          value="strategic" 
          className="data-[state=active]:bg-[#001437] data-[state=active]:text-white"
        >
          Strategic ({currentStrategicBuyers?.length || 0})
        </TabsTrigger>
        <TabsTrigger 
          value="pe"
          className="data-[state=active]:bg-[#001437] data-[state=active]:text-white"
        >
          PE/VC ({currentPeBuyers?.length || 0})
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="strategic" className="animate-fade-in">
        <StrategicBuyerTable
          buyers={currentStrategicBuyers}
          savedBuyers={savedBuyers}
          expandedRationales={expandedRationales}
          onAddToSaved={onAddToSaved}
          toggleRationale={toggleRationale}
          getMATrackRecordColor={getMATrackRecordColor}
          listingId={listingId}
        />
      </TabsContent>
      
      <TabsContent value="pe" className="animate-fade-in">
        <PEBuyerTable
          buyers={currentPeBuyers}
          savedBuyers={savedBuyers}
          expandedRationales={expandedRationales}
          onAddToSaved={onAddToSaved}
          toggleRationale={toggleRationale}
          listingId={listingId}
        />
      </TabsContent>
    </Tabs>
  );
};

export default BuyerTabs;
