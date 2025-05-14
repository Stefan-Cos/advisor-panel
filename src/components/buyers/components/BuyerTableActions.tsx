
import React from 'react';
import { Filter, Search, SlidersHorizontal, Bot } from 'lucide-react';

interface BuyerTableActionsProps {
  showFilters: boolean;
  showKeywords: boolean;
  showAIAssistant: boolean;
  showSearchForm: boolean;
  toggleFilters: () => void;
  toggleKeywords: () => void;
  toggleAIAssistant: () => void;
  toggleSearchForm: () => void;
}

const BuyerTableActions: React.FC<BuyerTableActionsProps> = ({
  showFilters,
  showKeywords,
  showAIAssistant,
  showSearchForm,
  toggleFilters,
  toggleKeywords,
  toggleAIAssistant,
  toggleSearchForm
}) => {
  return (
    <div className="flex space-x-3">
      <button
        onClick={toggleSearchForm}
        className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium ${
          showSearchForm 
            ? 'bg-blueknight-500 text-white' 
            : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
        } rounded-md`}
      >
        <Search className="h-4 w-4" />
        <span>Keyword Search</span>
      </button>
      
      <button
        onClick={toggleAIAssistant}
        className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium ${
          showAIAssistant 
            ? 'bg-blueknight-500 text-white' 
            : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
        } rounded-md`}
      >
        <Bot className="h-4 w-4" />
        <span>AI Assistant</span>
      </button>
      
      <button
        onClick={toggleFilters}
        className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium ${
          showFilters 
            ? 'bg-blueknight-500 text-white' 
            : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
        } rounded-md`}
      >
        <Filter className="h-4 w-4" />
        <span>Filters</span>
      </button>
      
      <button
        onClick={toggleKeywords}
        className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium ${
          showKeywords
            ? 'bg-blueknight-500 text-white' 
            : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
        } rounded-md`}
      >
        <SlidersHorizontal className="h-4 w-4" />
        <span>Keywords</span>
      </button>
    </div>
  );
};

export default BuyerTableActions;
