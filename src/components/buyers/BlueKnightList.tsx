
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Filter } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import BuyerTabs from './components/BuyerTabs';
import BuyerFilter from './components/BuyerFilter';
import ExcelDownloadButton from './components/ExcelDownloadButton';
import { getBuyers } from '@/services/buyersService';
import { getSavedBuyersList } from '@/services/savedBuyersService';

interface BlueKnightListProps {
  listingId: string;
}

const BlueKnightList: React.FC<BlueKnightListProps> = ({ listingId }) => {
  const [activeTab, setActiveTab] = useState<string>("strategic");
  const [filterVisible, setFilterVisible] = useState<boolean>(false);
  const [strategicBuyers, setStrategicBuyers] = useState<any[]>([]);
  const [peBuyers, setPEBuyers] = useState<any[]>([]);
  const [savedBuyers, setSavedBuyers] = useState<string[]>([]);
  const [expandedRationales, setExpandedRationales] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Load buyers and saved buyers on component mount
  useEffect(() => {
    loadBuyers();
    loadSavedBuyers();
  }, [listingId]);

  const loadBuyers = async () => {
    try {
      setLoading(true);
      const buyers = await getBuyers();
      
      // Separate strategic and PE buyers
      const strategic = buyers.filter(buyer => buyer.type === 'strategic');
      const pe = buyers.filter(buyer => buyer.type === 'pe');
      
      setStrategicBuyers(strategic);
      setPEBuyers(pe);
    } catch (error) {
      console.error('Error loading buyers:', error);
      toast({
        title: "Error",
        description: "Failed to load buyers. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const loadSavedBuyers = async () => {
    try {
      const saved = await getSavedBuyersList(listingId);
      setSavedBuyers(saved.map(buyer => buyer.buyer_id));
    } catch (error) {
      console.error('Error loading saved buyers:', error);
    }
  };

  // Handle saving a buyer
  const handleAddToSaved = async (buyerId: string) => {
    if (!savedBuyers.includes(buyerId)) {
      setSavedBuyers(prev => [...prev, buyerId]);
      // The actual saving is handled by the SaveButton component
      // We just update the local state for immediate UI feedback
    }
  };

  // Handle expanding a buyer rationale
  const toggleRationale = (buyerId: string) => {
    setExpandedRationales(prev => 
      prev.includes(buyerId) 
        ? prev.filter(id => id !== buyerId) 
        : [...prev, buyerId]
    );
  };

  // Toggle filter sidebar
  const toggleFilterSidebar = () => {
    setFilterVisible(!filterVisible);
  };

  // Handler for filter application
  const handleFilterApply = () => {
    toast({
      title: "Filters Applied",
      description: "Your filters have been applied successfully."
    });
  };

  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200" id="blueknight-list-section">
      {/* Filter Sidebar with BuyerFilter component directly embedded */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
        filterVisible ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Filters</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFilterSidebar}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </Button>
          </div>
        </div>
        <div className="p-4">
          <BuyerFilter onFilterApply={handleFilterApply} />
        </div>
      </div>

      {/* Main content */}
      <div className="border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-xl font-semibold text-blueknight-800">
            BlueKnight Database
          </h2>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFilterSidebar}
              className="flex items-center space-x-1"
            >
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
            <ExcelDownloadButton 
              buyers={activeTab === 'strategic' ? strategicBuyers : peBuyers}
              filename={`${activeTab}-buyers.xlsx`}
            />
          </div>
        </div>
      </div>

      <div className="p-4">
        <BuyerTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          strategicBuyers={strategicBuyers}
          peBuyers={peBuyers}
          savedBuyers={savedBuyers}
          expandedRationales={expandedRationales}
          onAddToSaved={handleAddToSaved}
          toggleRationale={toggleRationale}
          loading={loading}
          listingId={listingId}
        />
      </div>

      {/* Overlay for filter sidebar */}
      {filterVisible && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 z-40"
          onClick={toggleFilterSidebar}
        />
      )}
    </div>
  );
};

export default BlueKnightList;
