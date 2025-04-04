
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { SearchCriteria } from '../types/BuyerTypes';

interface KeywordSearchProps {
  searchCriteria: SearchCriteria;
  setSearchCriteria: React.Dispatch<React.SetStateAction<SearchCriteria>>;
  onSearchApply: () => void;
  onClose: () => void;
}

const KeywordSearch: React.FC<KeywordSearchProps> = ({
  searchCriteria,
  setSearchCriteria,
  onSearchApply,
  onClose
}) => {
  const [tempKeyword, setTempKeyword] = useState('');
  const [activeField, setActiveField] = useState<keyof SearchCriteria | null>(null);
  
  const { toast } = useToast();

  const handleAddKeyword = (field: keyof SearchCriteria) => {
    if (tempKeyword.trim()) {
      setSearchCriteria(prev => ({
        ...prev,
        [field]: {
          ...prev[field],
          keywords: [...prev[field].keywords, tempKeyword.trim()]
        }
      }));
      setTempKeyword('');
    }
  };

  const handleRemoveKeyword = (field: keyof SearchCriteria, keyword: string) => {
    setSearchCriteria(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        keywords: prev[field].keywords.filter(k => k !== keyword)
      }
    }));
  };

  const handleOperatorChange = (field: keyof SearchCriteria, operator: 'AND' | 'OR' | 'NOT') => {
    setSearchCriteria(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        operator
      }
    }));
  };

  const handleApply = () => {
    onSearchApply();
    toast({
      title: "Search Applied",
      description: "Your keyword search has been applied",
    });
  };

  return (
    <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-700 flex items-center">
          <Search className="h-4 w-4 mr-2" />
          Keyword Search
        </h3>
        <button 
          onClick={onClose}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      
      <div className="space-y-4">
        {(Object.keys(searchCriteria) as Array<keyof SearchCriteria>).map((field) => (
          <div key={field} className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700 capitalize">
              {field === 'companyName' ? 'Company Name' : 
               field === 'customerTypes' ? 'Customer Types' : field}
            </h4>
            
            <div className="flex flex-wrap gap-2 mb-2">
              {searchCriteria[field].keywords.map((keyword, index) => (
                <div 
                  key={index} 
                  className="bg-blueknight-50 text-blueknight-700 px-3 py-1 rounded-full text-xs flex items-center"
                >
                  {keyword}
                  <button 
                    onClick={() => handleRemoveKeyword(field, keyword)}
                    className="ml-2 text-blueknight-500 hover:text-blueknight-700"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="flex space-x-2">
              <Input
                placeholder={`Add ${field} keyword...`}
                value={activeField === field ? tempKeyword : ''}
                onChange={(e) => {
                  setActiveField(field);
                  setTempKeyword(e.target.value);
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddKeyword(field);
                  }
                }}
                className="text-sm"
              />
              <Button 
                size="sm" 
                onClick={() => handleAddKeyword(field)}
                className="text-xs"
              >
                Add
              </Button>
            </div>
            
            <div className="flex space-x-4 mt-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={`operator-${field}`}
                  checked={searchCriteria[field].operator === 'AND'}
                  onChange={() => handleOperatorChange(field, 'AND')}
                  className="h-4 w-4 text-blueknight-500 focus:ring-blueknight-400"
                />
                <span className="text-xs">AND</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={`operator-${field}`}
                  checked={searchCriteria[field].operator === 'OR'}
                  onChange={() => handleOperatorChange(field, 'OR')}
                  className="h-4 w-4 text-blueknight-500 focus:ring-blueknight-400"
                />
                <span className="text-xs">OR</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={`operator-${field}`}
                  checked={searchCriteria[field].operator === 'NOT'}
                  onChange={() => handleOperatorChange(field, 'NOT')}
                  className="h-4 w-4 text-blueknight-500 focus:ring-blueknight-400"
                />
                <span className="text-xs">NOT</span>
              </label>
            </div>
          </div>
        ))}
        
        <div className="flex justify-end">
          <Button onClick={handleApply} className="text-sm">
            Apply Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default KeywordSearch;
