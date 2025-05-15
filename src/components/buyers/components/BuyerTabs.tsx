
import React from 'react';
import ExcelDownloadButton from './ExcelDownloadButton';
import { Buyer } from '../types/BuyerTypes';

interface BuyerTabsProps {
  activeTab: 'strategic' | 'pe';
  setActiveTab: (tab: 'strategic' | 'pe') => void;
  buyers?: Buyer[];
}

const BuyerTabs: React.FC<BuyerTabsProps> = ({ 
  activeTab, 
  setActiveTab,
  buyers = [] 
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full">
      <div className="flex space-x-2">
        <button
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            activeTab === 'strategic'
              ? 'bg-[#001437] text-white'
              : 'bg-transparent hover:bg-gray-100'
          }`}
          onClick={() => setActiveTab('strategic')}
        >
          Strategic Buyers
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            activeTab === 'pe'
              ? 'bg-[#001437] text-white'
              : 'bg-transparent hover:bg-gray-100'
          }`}
          onClick={() => setActiveTab('pe')}
        >
          PE Funds
        </button>
      </div>
      
      {buyers.length > 0 && (
        <ExcelDownloadButton 
          buyers={buyers}
          buyerType={activeTab}
        />
      )}
    </div>
  );
};

export default BuyerTabs;
