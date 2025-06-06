
import React, { useState } from 'react';
import { ChevronDown, Filter, Search, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import Tag from '../ui/Tag';

const FilterSidebar: React.FC = () => {
  const [offeringKeywords, setOfferingKeywords] = useState<string[]>([]);
  const [sectorKeywords, setSectorKeywords] = useState<string[]>([]);
  const [customerKeywords, setCustomerKeywords] = useState<string[]>([]);
  const [offeringInput, setOfferingInput] = useState('');
  const [sectorInput, setSectorInput] = useState('');
  const [customerInput, setCustomerInput] = useState('');
  
  // Keyword operators - updated to only use 'AND' or 'OR'
  const [offeringOperator, setOfferingOperator] = useState<'AND' | 'OR'>('OR');
  const [sectorOperator, setSectorOperator] = useState<'AND' | 'OR'>('OR');
  const [customerOperator, setCustomerOperator] = useState<'AND' | 'OR'>('OR');

  // Handle adding keywords as tags
  const handleAddKeyword = (
    category: 'offering' | 'sector' | 'customer',
    inputValue: string
  ) => {
    if (inputValue.trim()) {
      if (category === 'offering') {
        setOfferingKeywords([...offeringKeywords, inputValue.trim()]);
        setOfferingInput('');
      } else if (category === 'sector') {
        setSectorKeywords([...sectorKeywords, inputValue.trim()]);
        setSectorInput('');
      } else {
        setCustomerKeywords([...customerKeywords, inputValue.trim()]);
        setCustomerInput('');
      }
    }
  };

  // Handle removing keywords
  const handleRemoveKeyword = (
    category: 'offering' | 'sector' | 'customer',
    keyword: string
  ) => {
    if (category === 'offering') {
      setOfferingKeywords(offeringKeywords.filter(k => k !== keyword));
    } else if (category === 'sector') {
      setSectorKeywords(sectorKeywords.filter(k => k !== keyword));
    } else {
      setCustomerKeywords(customerKeywords.filter(k => k !== keyword));
    }
  };

  // Handle operator change
  const handleOperatorChange = (
    category: 'offering' | 'sector' | 'customer',
    operator: 'AND' | 'OR'
  ) => {
    if (category === 'offering') {
      setOfferingOperator(operator);
    } else if (category === 'sector') {
      setSectorOperator(operator);
    } else {
      setCustomerOperator(operator);
    }
  };

  // Apply filters
  const applyFilters = () => {
    toast({
      title: "Filters Applied",
      description: "Your search filters have been applied successfully."
    });
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-4">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-medium flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Buyer Filters
          </h3>
        </div>
        
        <div className="mb-5">
          <h4 className="text-xs font-medium text-gray-700 mb-2">Basic Filters</h4>
          
          <div className="space-y-3">
            {/* HQ Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                HQ
              </label>
              <div className="relative">
                <select className="w-full h-8 pl-2 pr-8 text-xs border border-gray-300 rounded-md bg-white appearance-none">
                  <option value="">All Countries</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="Germany">Germany</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
              </div>
            </div>

            {/* Employees Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Employees
              </label>
              <div className="relative">
                <select className="w-full h-8 pl-2 pr-8 text-xs border border-gray-300 rounded-md bg-white appearance-none">
                  <option value="">Any</option>
                  <option value="100">100+</option>
                  <option value="500">500+</option>
                  <option value="1000">1000+</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
              </div>
            </div>

            {/* Revenue Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Revenue ($M)
              </label>
              <div className="relative">
                <select className="w-full h-8 pl-2 pr-8 text-xs border border-gray-300 rounded-md bg-white appearance-none">
                  <option value="">Any</option>
                  <option value="10">$10M+</option>
                  <option value="50">$50M+</option>
                  <option value="100">$100M+</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
              </div>
            </div>

            {/* Cash Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Cash ($M)
              </label>
              <div className="relative">
                <select className="w-full h-8 pl-2 pr-8 text-xs border border-gray-300 rounded-md bg-white appearance-none">
                  <option value="">Any</option>
                  <option value="5">$5M+</option>
                  <option value="10">$10M+</option>
                  <option value="25">$25M+</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
              </div>
            </div>

            {/* PE/VC-Backed Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                PE/VC-Backed
              </label>
              <div className="relative">
                <select className="w-full h-8 pl-2 pr-8 text-xs border border-gray-300 rounded-md bg-white appearance-none">
                  <option value="">Any</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
              </div>
            </div>

            {/* Minimum Fit Score Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Minimum Fit Score
              </label>
              <div className="relative">
                <select className="w-full h-8 pl-2 pr-8 text-xs border border-gray-300 rounded-md bg-white appearance-none">
                  <option value="0">Any</option>
                  <option value="60">60%+</option>
                  <option value="70">70%+</option>
                  <option value="80">80%+</option>
                  <option value="90">90%+</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-5">
          <h4 className="text-xs font-medium text-gray-700 mb-2">
            <Search className="h-3.5 w-3.5 inline mr-1" />
            Keyword Search
          </h4>
          
          {/* Offering Keywords */}
          <div className="mb-3">
            <h5 className="text-xs font-medium text-gray-600 mb-1.5">Offering</h5>
            <div className="space-y-2">
              {/* Keyword Tags */}
              <div className="flex flex-wrap gap-1 mb-2">
                {offeringKeywords.map((keyword, idx) => (
                  <Tag 
                    key={`offering-${idx}`} 
                    text={keyword} 
                    color="blue" 
                    onRemove={() => handleRemoveKeyword('offering', keyword)} 
                  />
                ))}
              </div>
              
              {/* Keyword Input with operator selection */}
              <div className="flex items-center space-x-2">
                {offeringKeywords.length > 0 && (
                  <select 
                    className="h-8 pl-2 pr-2 text-xs border border-gray-300 rounded-md bg-white w-20"
                    value={offeringOperator}
                    onChange={(e) => handleOperatorChange(
                      'offering', 
                      e.target.value as 'AND' | 'OR'
                    )}
                  >
                    <option value="AND">AND</option>
                    <option value="OR">OR</option>
                  </select>
                )}
                <div className="flex-grow relative">
                  <Input
                    type="text"
                    className="h-8 pl-2 pr-8 text-xs"
                    placeholder="Enter offering keyword..."
                    value={offeringInput}
                    onChange={(e) => setOfferingInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleAddKeyword('offering', offeringInput);
                      }
                    }}
                  />
                  {offeringInput && (
                    <button 
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={() => handleAddKeyword('offering', offeringInput)}
                    >
                      <X className="h-3.5 w-3.5 text-gray-400 hover:text-gray-600" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Sectors Keywords */}
          <div className="mb-3">
            <h5 className="text-xs font-medium text-gray-600 mb-1.5">Sectors</h5>
            <div className="space-y-2">
              {/* Keyword Tags */}
              <div className="flex flex-wrap gap-1 mb-2">
                {sectorKeywords.map((keyword, idx) => (
                  <Tag 
                    key={`sector-${idx}`} 
                    text={keyword} 
                    color="green" 
                    onRemove={() => handleRemoveKeyword('sector', keyword)} 
                  />
                ))}
              </div>
              
              {/* Keyword Input with operator selection */}
              <div className="flex items-center space-x-2">
                {sectorKeywords.length > 0 && (
                  <select 
                    className="h-8 pl-2 pr-2 text-xs border border-gray-300 rounded-md bg-white w-20"
                    value={sectorOperator}
                    onChange={(e) => handleOperatorChange(
                      'sector', 
                      e.target.value as 'AND' | 'OR'
                    )}
                  >
                    <option value="AND">AND</option>
                    <option value="OR">OR</option>
                  </select>
                )}
                <div className="flex-grow relative">
                  <Input
                    type="text"
                    className="h-8 pl-2 pr-8 text-xs"
                    placeholder="Enter sector keyword..."
                    value={sectorInput}
                    onChange={(e) => setSectorInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleAddKeyword('sector', sectorInput);
                      }
                    }}
                  />
                  {sectorInput && (
                    <button 
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={() => handleAddKeyword('sector', sectorInput)}
                    >
                      <X className="h-3.5 w-3.5 text-gray-400 hover:text-gray-600" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Customers Keywords */}
          <div className="mb-3">
            <h5 className="text-xs font-medium text-gray-600 mb-1.5">Customers</h5>
            <div className="space-y-2">
              {/* Keyword Tags */}
              <div className="flex flex-wrap gap-1 mb-2">
                {customerKeywords.map((keyword, idx) => (
                  <Tag 
                    key={`customer-${idx}`} 
                    text={keyword} 
                    color="yellow" 
                    onRemove={() => handleRemoveKeyword('customer', keyword)} 
                  />
                ))}
              </div>
              
              {/* Keyword Input with operator selection */}
              <div className="flex items-center space-x-2">
                {customerKeywords.length > 0 && (
                  <select 
                    className="h-8 pl-2 pr-2 text-xs border border-gray-300 rounded-md bg-white w-20"
                    value={customerOperator}
                    onChange={(e) => handleOperatorChange(
                      'customer', 
                      e.target.value as 'AND' | 'OR'
                    )}
                  >
                    <option value="AND">AND</option>
                    <option value="OR">OR</option>
                  </select>
                )}
                <div className="flex-grow relative">
                  <Input
                    type="text"
                    className="h-8 pl-2 pr-8 text-xs"
                    placeholder="Enter customer keyword..."
                    value={customerInput}
                    onChange={(e) => setCustomerInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleAddKeyword('customer', customerInput);
                      }
                    }}
                  />
                  {customerInput && (
                    <button 
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={() => handleAddKeyword('customer', customerInput)}
                    >
                      <X className="h-3.5 w-3.5 text-gray-400 hover:text-gray-600" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <Button 
            className="w-full px-3 py-1.5 text-xs font-medium bg-blueknight-500 text-white rounded-md hover:bg-blueknight-600"
            onClick={applyFilters}
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
};

export default FilterSidebar;
