
import React from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import AIAssistant from './AIAssistant';
import BuyerFilter from './BuyerFilter';
import KeywordSearch from './KeywordSearch';
import { SearchCriteria } from '../types/BuyerTypes';

interface BuyerTableFiltersProps {
  showSearchForm: boolean;
  showAIAssistant: boolean;
  showFilters: boolean;
  showKeywords: boolean;
  searchCriteria: SearchCriteria;
  setSearchCriteria: React.Dispatch<React.SetStateAction<SearchCriteria>>;
  handleSearchApply: () => void;
  handleFilterApply: () => void;
  setShowSearchForm: (show: boolean) => void;
  setShowAIAssistant: (show: boolean) => void;
  setShowFilters: (show: boolean) => void;
  setShowKeywords: (show: boolean) => void;
}

const BuyerTableFilters: React.FC<BuyerTableFiltersProps> = ({
  showSearchForm,
  showAIAssistant,
  showFilters,
  showKeywords,
  searchCriteria,
  setSearchCriteria,
  handleSearchApply,
  handleFilterApply,
  setShowSearchForm,
  setShowAIAssistant,
  setShowFilters,
  setShowKeywords
}) => {
  return (
    <>
      {showSearchForm && (
        <KeywordSearch 
          searchCriteria={searchCriteria}
          setSearchCriteria={setSearchCriteria}
          onSearchApply={handleSearchApply}
          onClose={() => setShowSearchForm(false)}
        />
      )}
      
      {showAIAssistant && (
        <AIAssistant onClose={() => setShowAIAssistant(false)} />
      )}
      
      {showFilters && (
        <BuyerFilter
          onFilterApply={handleFilterApply}
          onClose={() => setShowFilters(false)}
        />
      )}
      
      {showKeywords && (
        <div className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-700 flex items-center">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Buyer Keywords
            </h3>
            <button 
              onClick={() => setShowKeywords(false)}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default BuyerTableFilters;
