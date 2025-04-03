
import React, { useState } from 'react';
import { Filter, SlidersHorizontal, Search } from 'lucide-react';
import StrategicBuyers from './StrategicBuyers';
import PEFunds from './PEFunds';
import { useToast } from "@/hooks/use-toast";

interface BuyerListNewProps {
  listingId: string;
}

// Boolean operator type for keyword search
type BooleanOperator = 'AND' | 'OR' | 'NOT';

// Search criteria interface
interface KeywordSearch {
  value: string;
  operator: BooleanOperator;
  field: 'offering' | 'sectors' | 'customers' | '';
}

const BuyerListNew: React.FC<BuyerListNewProps> = ({ listingId }) => {
  const [activeTab, setActiveTab] = useState<'strategic' | 'pe'>('strategic');
  const [savedBuyers, setSavedBuyers] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const { toast } = useToast();
  
  // Filter states
  const [hqFilter, setHqFilter] = useState<string>('');
  const [employeesFilter, setEmployeesFilter] = useState<string>('');
  const [revenueFilter, setRevenueFilter] = useState<string>('');
  const [cashFilter, setCashFilter] = useState<string>('');
  const [peVcBackedFilter, setPeVcBackedFilter] = useState<string>('');
  
  // Keyword search states
  const [keywordSearches, setKeywordSearches] = useState<KeywordSearch[]>([
    { value: '', operator: 'AND', field: '' }
  ]);
  
  const handleAddToSaved = (buyerId: string) => {
    if (!savedBuyers.includes(buyerId)) {
      setSavedBuyers([...savedBuyers, buyerId]);
      toast({
        title: "Buyer Saved",
        description: "The buyer has been added to your saved list",
      });
    }
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  const handleFilterApply = () => {
    toast({
      title: "Filters Applied",
      description: "Your search filters have been applied",
    });
    setShowFilters(false);
  };
  
  const handleKeywordChange = (index: number, field: keyof KeywordSearch, value: string) => {
    const updatedSearches = [...keywordSearches];
    updatedSearches[index] = {
      ...updatedSearches[index],
      [field]: value
    };
    setKeywordSearches(updatedSearches);
  };
  
  const addKeywordSearch = () => {
    setKeywordSearches([
      ...keywordSearches,
      { value: '', operator: 'AND', field: '' }
    ]);
  };
  
  const removeKeywordSearch = (index: number) => {
    if (keywordSearches.length > 1) {
      const updatedSearches = keywordSearches.filter((_, i) => i !== index);
      setKeywordSearches(updatedSearches);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
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
          
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleFilters}
              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>
        
        {showFilters && (
          <div className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-700 flex items-center">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filter Options
              </h3>
              <button 
                onClick={() => setShowFilters(false)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  HQ
                </label>
                <select 
                  className="input-field"
                  value={hqFilter}
                  onChange={(e) => setHqFilter(e.target.value)}
                >
                  <option value="">All Countries</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="Germany">Germany</option>
                  <option value="Canada">Canada</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Employees
                </label>
                <select 
                  className="input-field"
                  value={employeesFilter}
                  onChange={(e) => setEmployeesFilter(e.target.value)}
                >
                  <option value="">Any</option>
                  <option value="<500">Less than 500</option>
                  <option value="500-1000">500 - 1,000</option>
                  <option value="1000-5000">1,000 - 5,000</option>
                  <option value=">5000">More than 5,000</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Revenue ($M)
                </label>
                <select 
                  className="input-field"
                  value={revenueFilter}
                  onChange={(e) => setRevenueFilter(e.target.value)}
                >
                  <option value="">Any</option>
                  <option value="<50">Less than $50M</option>
                  <option value="50-100">$50M - $100M</option>
                  <option value="100-500">$100M - $500M</option>
                  <option value=">500">More than $500M</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cash ($M)
                </label>
                <select 
                  className="input-field"
                  value={cashFilter}
                  onChange={(e) => setCashFilter(e.target.value)}
                >
                  <option value="">Any</option>
                  <option value="<10">Less than $10M</option>
                  <option value="10-50">$10M - $50M</option>
                  <option value="50-100">$50M - $100M</option>
                  <option value=">100">More than $100M</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  PE/VC-Backed
                </label>
                <select 
                  className="input-field"
                  value={peVcBackedFilter}
                  onChange={(e) => setPeVcBackedFilter(e.target.value)}
                >
                  <option value="">Any</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Fit Score
                </label>
                <select className="input-field">
                  <option value="0">Any</option>
                  <option value="60">60%+</option>
                  <option value="70">70%+</option>
                  <option value="80">80%+</option>
                  <option value="90">90%+</option>
                </select>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <Search className="h-4 w-4 mr-2 text-gray-700" />
                <h3 className="text-sm font-medium text-gray-700">Keyword Search</h3>
              </div>
              
              <div className="space-y-3">
                {keywordSearches.map((search, index) => (
                  <div key={index} className="flex flex-wrap items-center gap-2">
                    {index > 0 && (
                      <div className="w-20">
                        <select 
                          className="w-full p-2 text-xs border border-gray-300 rounded-md"
                          value={search.operator}
                          onChange={(e) => handleKeywordChange(index, 'operator', e.target.value as BooleanOperator)}
                        >
                          <option value="AND">AND</option>
                          <option value="OR">OR</option>
                          <option value="NOT">NOT</option>
                        </select>
                      </div>
                    )}
                    
                    <div className="flex-grow min-w-[200px]">
                      <input 
                        type="text" 
                        placeholder="Enter keyword..."
                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                        value={search.value}
                        onChange={(e) => handleKeywordChange(index, 'value', e.target.value)}
                      />
                    </div>
                    
                    <div className="w-32">
                      <select 
                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                        value={search.field}
                        onChange={(e) => handleKeywordChange(index, 'field', e.target.value as KeywordSearch['field'])}
                      >
                        <option value="">All fields</option>
                        <option value="offering">Offering</option>
                        <option value="sectors">Sectors</option>
                        <option value="customers">Customers</option>
                      </select>
                    </div>
                    
                    <button 
                      onClick={() => removeKeywordSearch(index)}
                      className="p-1.5 text-red-500 hover:text-red-700 rounded-md hover:bg-red-50"
                      title="Remove"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              
              <button
                onClick={addKeywordSearch}
                className="mt-3 px-3 py-1.5 text-xs font-medium text-blueknight-600 bg-blueknight-50 rounded-md hover:bg-blueknight-100"
              >
                + Add keyword
              </button>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleFilterApply}
                className="px-4 py-2 bg-blueknight-500 text-white rounded-md text-sm font-medium hover:bg-blueknight-600"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
        
        {activeTab === 'strategic' ? (
          <StrategicBuyers savedBuyers={savedBuyers} onAddToSaved={handleAddToSaved} />
        ) : (
          <PEFunds savedBuyers={savedBuyers} onAddToSaved={handleAddToSaved} />
        )}
      </div>
    </div>
  );
};

export default BuyerListNew;
