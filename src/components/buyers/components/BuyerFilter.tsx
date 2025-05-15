import React, { useState } from 'react';
import { Filter, Search, X } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

interface BuyerFilterProps {
  onFilterApply: () => void;
  onClose: () => void;
}

// Define the type for keyword search operator
type KeywordOperator = 'AND' | 'OR';

// Define keyword item
interface KeywordItem {
  value: string;
  operator: KeywordOperator;
}

const BuyerFilter: React.FC<BuyerFilterProps> = ({ 
  onFilterApply, 
  onClose 
}) => {
  // Basic filters
  const [filters, setFilters] = useState({
    hq: '',
    employees: '',
    revenue: '',
    cash: '',
    peVcBacked: '',
    minimumFitScore: '',
  });

  // Keyword search states
  const [offeringKeywords, setOfferingKeywords] = useState<KeywordItem[]>([]);
  const [sectorKeywords, setSectorKeywords] = useState<KeywordItem[]>([]);
  const [customerKeywords, setCustomerKeywords] = useState<KeywordItem[]>([]);
  const [offeringInput, setOfferingInput] = useState('');
  const [sectorInput, setSectorInput] = useState('');
  const [customerInput, setCustomerInput] = useState('');
  
  // Current operators
  const [offeringOperator, setOfferingOperator] = useState<KeywordOperator>('OR');
  const [sectorOperator, setSectorOperator] = useState<KeywordOperator>('OR');
  const [customerOperator, setCustomerOperator] = useState<KeywordOperator>('OR');

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle adding a keyword
  const handleAddKeyword = (
    category: 'offering' | 'sector' | 'customer',
    value: string,
    operator: KeywordOperator
  ) => {
    if (!value.trim()) return;
    
    const keyword = { value: value.trim(), operator };
    
    if (category === 'offering') {
      setOfferingKeywords([...offeringKeywords, keyword]);
      setOfferingInput('');
    } else if (category === 'sector') {
      setSectorKeywords([...sectorKeywords, keyword]);
      setSectorInput('');
    } else {
      setCustomerKeywords([...customerKeywords, keyword]);
      setCustomerInput('');
    }
  };

  // Handle removing a keyword
  const handleRemoveKeyword = (
    category: 'offering' | 'sector' | 'customer',
    index: number
  ) => {
    if (category === 'offering') {
      setOfferingKeywords(offeringKeywords.filter((_, i) => i !== index));
    } else if (category === 'sector') {
      setSectorKeywords(sectorKeywords.filter((_, i) => i !== index));
    } else {
      setCustomerKeywords(customerKeywords.filter((_, i) => i !== index));
    }
  };

  // Handle operator change
  const handleOperatorChange = (
    category: 'offering' | 'sector' | 'customer',
    operator: KeywordOperator
  ) => {
    if (category === 'offering') {
      setOfferingOperator(operator);
    } else if (category === 'sector') {
      setSectorOperator(operator);
    } else {
      setCustomerOperator(operator);
    }
  };

  const handleApplyFilters = () => {
    toast({
      title: "Filters Applied",
      description: "Your filters have been applied to the buyer list."
    });
    onFilterApply();
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-700 flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filter Options
          </h3>
          <button 
            onClick={onClose}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Hide Filters
          </button>
        </div>
        
        <div className="space-y-4">
          {/* HQ Filter */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              HQ
            </label>
            <div className="relative">
              <select
                name="hq"
                value={filters.hq}
                onChange={handleFilterChange}
                className="w-full h-8 pl-2 pr-8 text-xs border border-gray-300 rounded-md bg-white appearance-none"
              >
                <option value="">All Countries</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
              </select>
            </div>
          </div>

          {/* Employees Filter */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Employees
            </label>
            <div className="relative">
              <select
                name="employees"
                value={filters.employees}
                onChange={handleFilterChange}
                className="w-full h-8 pl-2 pr-8 text-xs border border-gray-300 rounded-md bg-white appearance-none"
              >
                <option value="">Any</option>
                <option value="100">100+</option>
                <option value="500">500+</option>
                <option value="1000">1000+</option>
                <option value="5000">5000+</option>
              </select>
            </div>
          </div>

          {/* Revenue Filter */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Revenue ($M)
            </label>
            <div className="relative">
              <select
                name="revenue"
                value={filters.revenue}
                onChange={handleFilterChange}
                className="w-full h-8 pl-2 pr-8 text-xs border border-gray-300 rounded-md bg-white appearance-none"
              >
                <option value="">Any</option>
                <option value="10">$10M+</option>
                <option value="50">$50M+</option>
                <option value="100">$100M+</option>
                <option value="500">$500M+</option>
              </select>
            </div>
          </div>

          {/* Cash Filter */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Cash ($M)
            </label>
            <div className="relative">
              <select
                name="cash"
                value={filters.cash}
                onChange={handleFilterChange}
                className="w-full h-8 pl-2 pr-8 text-xs border border-gray-300 rounded-md bg-white appearance-none"
              >
                <option value="">Any</option>
                <option value="5">$5M+</option>
                <option value="10">$10M+</option>
                <option value="25">$25M+</option>
                <option value="50">$50M+</option>
              </select>
            </div>
          </div>

          {/* PE/VC-Backed Filter */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              PE/VC-Backed
            </label>
            <div className="relative">
              <select
                name="peVcBacked"
                value={filters.peVcBacked}
                onChange={handleFilterChange}
                className="w-full h-8 pl-2 pr-8 text-xs border border-gray-300 rounded-md bg-white appearance-none"
              >
                <option value="">Any</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>

          {/* Minimum Fit Score Filter */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Minimum Fit Score
            </label>
            <div className="relative">
              <select
                name="minimumFitScore"
                value={filters.minimumFitScore}
                onChange={handleFilterChange}
                className="w-full h-8 pl-2 pr-8 text-xs border border-gray-300 rounded-md bg-white appearance-none"
              >
                <option value="">Any</option>
                <option value="60">60%+</option>
                <option value="70">70%+</option>
                <option value="80">80%+</option>
                <option value="90">90%+</option>
              </select>
            </div>
          </div>

          {/* Keyword Search Section */}
          <div className="pt-2">
            <div className="flex items-center mb-3">
              <Search className="h-4 w-4 mr-2 text-gray-700" />
              <h3 className="text-xs font-medium text-gray-700">Keyword Search</h3>
            </div>
            
            {/* Offering Keywords */}
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Offering
              </label>
              
              {/* Existing keywords */}
              {offeringKeywords.length > 0 && (
                <div className="mb-2 flex flex-wrap gap-1">
                  {offeringKeywords.map((keyword, index) => (
                    <div key={index} className="inline-flex items-center bg-blue-100 text-xs rounded-full px-2 py-1">
                      <span className="mr-1 text-blue-800">{keyword.value}</span>
                      <button
                        onClick={() => handleRemoveKeyword('offering', index)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  
                  <div className="inline-flex items-center text-xs px-2 py-1">
                    <select
                      value={offeringOperator}
                      onChange={(e) => handleOperatorChange('offering', e.target.value as KeywordOperator)}
                      className="text-xs border border-gray-300 rounded-md py-1 px-1"
                    >
                      <option value="AND">AND</option>
                      <option value="OR">OR</option>
                    </select>
                  </div>
                </div>
              )}
              
              {/* Input for new keyword */}
              <div className="relative">
                <Input
                  placeholder="Enter offering keyword..."
                  value={offeringInput}
                  onChange={(e) => setOfferingInput(e.target.value)}
                  className="text-xs h-8"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddKeyword('offering', offeringInput, offeringOperator);
                    }
                  }}
                />
              </div>
            </div>
            
            {/* Sectors Keywords */}
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Sectors
              </label>
              
              {/* Existing keywords */}
              {sectorKeywords.length > 0 && (
                <div className="mb-2 flex flex-wrap gap-1">
                  {sectorKeywords.map((keyword, index) => (
                    <div key={index} className="inline-flex items-center bg-green-100 text-xs rounded-full px-2 py-1">
                      <span className="mr-1 text-green-800">{keyword.value}</span>
                      <button
                        onClick={() => handleRemoveKeyword('sector', index)}
                        className="text-green-500 hover:text-green-700"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  
                  <div className="inline-flex items-center text-xs px-2 py-1">
                    <select
                      value={sectorOperator}
                      onChange={(e) => handleOperatorChange('sector', e.target.value as KeywordOperator)}
                      className="text-xs border border-gray-300 rounded-md py-1 px-1"
                    >
                      <option value="AND">AND</option>
                      <option value="OR">OR</option>
                    </select>
                  </div>
                </div>
              )}
              
              {/* Input for new keyword */}
              <div className="relative">
                <Input
                  placeholder="Enter sector keyword..."
                  value={sectorInput}
                  onChange={(e) => setSectorInput(e.target.value)}
                  className="text-xs h-8"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddKeyword('sector', sectorInput, sectorOperator);
                    }
                  }}
                />
              </div>
            </div>
            
            {/* Customers Keywords */}
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Customers
              </label>
              
              {/* Existing keywords */}
              {customerKeywords.length > 0 && (
                <div className="mb-2 flex flex-wrap gap-1">
                  {customerKeywords.map((keyword, index) => (
                    <div key={index} className="inline-flex items-center bg-yellow-100 text-xs rounded-full px-2 py-1">
                      <span className="mr-1 text-yellow-800">{keyword.value}</span>
                      <button
                        onClick={() => handleRemoveKeyword('customer', index)}
                        className="text-yellow-500 hover:text-yellow-700"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  
                  <div className="inline-flex items-center text-xs px-2 py-1">
                    <select
                      value={customerOperator}
                      onChange={(e) => handleOperatorChange('customer', e.target.value as KeywordOperator)}
                      className="text-xs border border-gray-300 rounded-md py-1 px-1"
                    >
                      <option value="AND">AND</option>
                      <option value="OR">OR</option>
                    </select>
                  </div>
                </div>
              )}
              
              {/* Input for new keyword */}
              <div className="relative">
                <Input
                  placeholder="Enter customer keyword..."
                  value={customerInput}
                  onChange={(e) => setCustomerInput(e.target.value)}
                  className="text-xs h-8"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddKeyword('customer', customerInput, customerOperator);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleApplyFilters}
            className="px-4 py-2 w-full bg-blue-800 text-white rounded-md text-sm font-medium hover:bg-blue-900"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </ScrollArea>
  );
};

export default BuyerFilter;
