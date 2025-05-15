
import React from 'react';

interface BuyerTabsProps {
  activeTab: 'strategic' | 'pe';
  setActiveTab: (tab: 'strategic' | 'pe') => void;
}

const BuyerTabs: React.FC<BuyerTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex space-x-4">
      <button 
        onClick={() => setActiveTab('strategic')}
        className={`px-4 py-2 text-sm font-medium rounded-md ${
          activeTab === 'strategic' 
            ? 'bg-blueknight-500 text-white' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Strategic Buyers
      </button>
      <button 
        onClick={() => setActiveTab('pe')}
        className={`px-4 py-2 text-sm font-medium rounded-md ${
          activeTab === 'pe' 
            ? 'bg-blueknight-500 text-white' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        PE Funds
      </button>
    </div>
  );
};

export default BuyerTabs;
