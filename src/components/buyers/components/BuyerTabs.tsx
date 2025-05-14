
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BuyerTabsProps {
  activeTab: 'strategic' | 'pe';
  setActiveTab: (tab: 'strategic' | 'pe') => void;
}

const BuyerTabs: React.FC<BuyerTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'strategic' | 'pe')} className="w-full">
      <TabsList className="bg-gray-100 rounded-md">
        <TabsTrigger 
          value="strategic" 
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'strategic' 
              ? 'bg-blueknight-500 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Strategic Buyers
        </TabsTrigger>
        <TabsTrigger 
          value="pe" 
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'pe' 
              ? 'bg-blueknight-500 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          PE Funds
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default BuyerTabs;
