
import React, { useState } from 'react';
import { toast } from "@/hooks/use-toast";
import { strategicBuyers, peBuyers } from './data/mockBuyers';
import { SearchCriteria, BuyerTableProps } from './types/BuyerTypes';
import BuyerTabs from './components/BuyerTabs';
import BuyerTableActions from './components/BuyerTableActions';
import BuyerTableFilters from './components/BuyerTableFilters';
import BuyerTables from './components/BuyerTables';
import StrategicBuyerTable from './components/StrategicBuyerTable';
import PEBuyerTable from './components/PEBuyerTable';

const BuyerTable: React.FC<BuyerTableProps> = ({ listingId }) => {
  const [activeTab, setActiveTab] = useState<'strategic' | 'pe'>('strategic');
  const [savedBuyers, setSavedBuyers] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showKeywords, setShowKeywords] = useState(false);
  const [expandedRationales, setExpandedRationales] = useState<string[]>([]);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [showSearchForm, setShowSearchForm] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
    companyName: { keywords: [], operator: 'AND' },
    description: { keywords: [], operator: 'AND' },
    offering: { keywords: [], operator: 'AND' },
    sectors: { keywords: [], operator: 'AND' },
    customerTypes: { keywords: [], operator: 'AND' }
  });
  const [companyNameSearch, setCompanyNameSearch] = useState('');
  
  const handleAddToSaved = (buyerId: string) => {
    if (!savedBuyers.includes(buyerId)) {
      setSavedBuyers([...savedBuyers, buyerId]);
      toast("Buyer Saved", {
        description: "Buyer has been added to your saved list"
      });
    }
  };
  
  const buyers = activeTab === 'strategic' ? strategicBuyers : peBuyers;
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
    if (showKeywords) setShowKeywords(false);
    if (showAIAssistant) setShowAIAssistant(false);
    if (showSearchForm) setShowSearchForm(false);
  };
  
  const toggleKeywords = () => {
    setShowKeywords(!showKeywords);
    if (showFilters) setShowFilters(false);
    if (showAIAssistant) setShowAIAssistant(false);
    if (showSearchForm) setShowSearchForm(false);
  };
  
  const toggleAIAssistant = () => {
    setShowAIAssistant(!showAIAssistant);
    if (showFilters) setShowFilters(false);
    if (showKeywords) setShowKeywords(false);
    if (showSearchForm) setShowSearchForm(false);
  };
  
  const toggleSearchForm = () => {
    setShowSearchForm(!showSearchForm);
    if (showFilters) setShowFilters(false);
    if (showKeywords) setShowKeywords(false);
    if (showAIAssistant) setShowAIAssistant(false);
  };
  
  const toggleRationale = (buyerId: string) => {
    setExpandedRationales(prev => 
      prev.includes(buyerId) 
        ? prev.filter(id => id !== buyerId) 
        : [...prev, buyerId]
    );
  };
  
  const handleFilterApply = () => {
    // Logic to apply filters
    setShowFilters(false);
  };

  const handleKeywordsApply = () => {
    // Logic to apply keywords
    setShowKeywords(false);
  };

  const handleSearchApply = () => {
    // Logic to apply search
    setShowSearchForm(false);
  };
  
  // Helper function to determine color based on M&A track record
  const getMATrackRecordColor = (record: string): string => {
    switch (record.toLowerCase()) {
      case 'high':
        return 'bg-green-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <BuyerTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <BuyerTableActions
            showFilters={showFilters}
            showKeywords={showKeywords}
            showAIAssistant={showAIAssistant}
            showSearchForm={showSearchForm}
            toggleFilters={toggleFilters}
            toggleKeywords={toggleKeywords}
            toggleAIAssistant={toggleAIAssistant}
            toggleSearchForm={toggleSearchForm}
          />
        </div>
        
        <BuyerTableFilters
          showSearchForm={showSearchForm}
          showAIAssistant={showAIAssistant}
          showFilters={showFilters}
          showKeywords={showKeywords}
          searchCriteria={searchCriteria}
          setSearchCriteria={setSearchCriteria}
          handleSearchApply={handleSearchApply}
          handleFilterApply={handleFilterApply}
          setShowSearchForm={setShowSearchForm}
          setShowAIAssistant={setShowAIAssistant}
          setShowFilters={setShowFilters}
          setShowKeywords={setShowKeywords}
        />

        {/* Conditionally render either the legacy table or the new tables based on activeTab */}
        {activeTab === 'strategic' ? (
          <StrategicBuyerTable
            buyers={strategicBuyers}
            savedBuyers={savedBuyers}
            expandedRationales={expandedRationales}
            onAddToSaved={handleAddToSaved}
            toggleRationale={toggleRationale}
            getMATrackRecordColor={getMATrackRecordColor}
            showDescription={false}
          />
        ) : (
          <PEBuyerTable
            buyers={peBuyers}
            savedBuyers={savedBuyers}
            expandedRationales={expandedRationales}
            onAddToSaved={handleAddToSaved}
            toggleRationale={toggleRationale}
            showDescription={false}
          />
        )}
      </div>
    </div>
  );
};

export default BuyerTable;
