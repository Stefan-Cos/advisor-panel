
import React, { useState } from 'react';
import { Filter, SlidersHorizontal, Search, Check, ChevronsUpDown } from 'lucide-react';
import StrategicBuyers from './StrategicBuyers';
import PEFunds from './PEFunds';
import { useToast } from "@/hooks/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

interface BuyerListNewProps {
  listingId: string;
}

// Boolean operator type for keyword search
type BooleanOperator = 'AND' | 'OR' | 'NOT';

// Search criteria interface for each field type
interface KeywordSearch {
  value: string;
  operator: BooleanOperator;
}

// Country options for filtering
const COUNTRIES = [
  "Afghanistan", "Albania", "Andorra", "Armenia", "Austria", "Azerbaijan", "Bangladesh",
  "Belgium", "Bulgaria", "Canada", "China", "Denmark", "Estonia", "Finland", "France",
  "Germany", "Greece", "Hungary", "Iceland", "India", "Ireland", "Italy", "Japan",
  "Kazakhstan", "Lithuania", "Malta", "Netherlands", "Norway", "Poland", "Portugal",
  "Romania", "Russia", "Spain", "Sweden", "Switzerland", "Turkey", "Ukraine", 
  "United Kingdom", "United States"
];

// Employee count options
const EMPLOYEE_RANGES = [
  "Less than 500",
  "500 - 1,000",
  "1,000 - 5,000",
  "More than 5,000"
];

// Revenue ranges
const REVENUE_RANGES = [
  "Less than $50M",
  "$50M - $100M",
  "$100M - $500M",
  "More than $500M"
];

// Cash ranges
const CASH_RANGES = [
  "Less than $10M",
  "$10M - $50M",
  "$50M - $100M",
  "More than $100M"
];

const BuyerListNew: React.FC<BuyerListNewProps> = ({ listingId }) => {
  const [activeTab, setActiveTab] = useState<'strategic' | 'pe'>('strategic');
  const [savedBuyers, setSavedBuyers] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const { toast } = useToast();
  
  // Filter states
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedEmployeeRanges, setSelectedEmployeeRanges] = useState<string[]>([]);
  const [selectedRevenueRanges, setSelectedRevenueRanges] = useState<string[]>([]);
  const [selectedCashRanges, setSelectedCashRanges] = useState<string[]>([]);
  const [peVcBackedFilter, setPeVcBackedFilter] = useState<string>('');
  
  // Keyword search states for each category
  const [offeringSearches, setOfferingSearches] = useState<KeywordSearch[]>([
    { value: '', operator: 'AND' }
  ]);
  const [sectorSearches, setSectorSearches] = useState<KeywordSearch[]>([
    { value: '', operator: 'AND' }
  ]);
  const [customerSearches, setCustomerSearches] = useState<KeywordSearch[]>([
    { value: '', operator: 'AND' }
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
  
  // Handle keyword changes for each category
  const handleKeywordChange = (
    index: number, 
    field: keyof KeywordSearch, 
    value: string, 
    setter: React.Dispatch<React.SetStateAction<KeywordSearch[]>>,
    searches: KeywordSearch[]
  ) => {
    const updatedSearches = [...searches];
    updatedSearches[index] = {
      ...updatedSearches[index],
      [field]: value
    };
    setter(updatedSearches);
  };
  
  // Add keyword to specific category
  const addKeywordSearch = (
    setter: React.Dispatch<React.SetStateAction<KeywordSearch[]>>,
    searches: KeywordSearch[]
  ) => {
    setter([
      ...searches,
      { value: '', operator: 'AND' }
    ]);
  };
  
  // Remove keyword from specific category
  const removeKeywordSearch = (
    index: number,
    setter: React.Dispatch<React.SetStateAction<KeywordSearch[]>>,
    searches: KeywordSearch[]
  ) => {
    if (searches.length > 1) {
      const updatedSearches = searches.filter((_, i) => i !== index);
      setter(updatedSearches);
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
              {/* HQ Multi-Select Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  HQ
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      role="combobox"
                      className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      {selectedCountries.length > 0 
                        ? `${selectedCountries.length} selected`
                        : "All Countries"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Filter or select below" />
                      <CommandList className="max-h-[200px] overflow-y-auto">
                        <CommandEmpty>No country found.</CommandEmpty>
                        <CommandGroup>
                          <CommandItem 
                            onSelect={() => {
                              if (selectedCountries.length === COUNTRIES.length) {
                                setSelectedCountries([]);
                              } else {
                                setSelectedCountries([...COUNTRIES]);
                              }
                            }}
                            className="flex items-center gap-2 hover:bg-accent"
                          >
                            <Checkbox 
                              checked={selectedCountries.length === COUNTRIES.length} 
                              className="border-gray-300"
                            />
                            <span>Select All</span>
                          </CommandItem>
                          {COUNTRIES.map((country) => (
                            <CommandItem
                              key={country}
                              onSelect={() => {
                                setSelectedCountries(
                                  selectedCountries.includes(country)
                                    ? selectedCountries.filter(c => c !== country)
                                    : [...selectedCountries, country]
                                );
                              }}
                              className="flex items-center gap-2 hover:bg-accent"
                            >
                              <Checkbox
                                checked={selectedCountries.includes(country)}
                                className="border-gray-300"
                              />
                              <span>{country}</span>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              
              {/* Employees Multi-Select Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Employees
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      role="combobox"
                      className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      {selectedEmployeeRanges.length > 0 
                        ? `${selectedEmployeeRanges.length} selected`
                        : "Any"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0" align="start">
                    <Command>
                      <CommandList>
                        <CommandGroup>
                          <CommandItem 
                            onSelect={() => {
                              if (selectedEmployeeRanges.length === EMPLOYEE_RANGES.length) {
                                setSelectedEmployeeRanges([]);
                              } else {
                                setSelectedEmployeeRanges([...EMPLOYEE_RANGES]);
                              }
                            }}
                            className="flex items-center gap-2 hover:bg-accent"
                          >
                            <Checkbox 
                              checked={selectedEmployeeRanges.length === EMPLOYEE_RANGES.length} 
                              className="border-gray-300"
                            />
                            <span>Select All</span>
                          </CommandItem>
                          {EMPLOYEE_RANGES.map((range) => (
                            <CommandItem
                              key={range}
                              onSelect={() => {
                                setSelectedEmployeeRanges(
                                  selectedEmployeeRanges.includes(range)
                                    ? selectedEmployeeRanges.filter(r => r !== range)
                                    : [...selectedEmployeeRanges, range]
                                );
                              }}
                              className="flex items-center gap-2 hover:bg-accent"
                            >
                              <Checkbox
                                checked={selectedEmployeeRanges.includes(range)}
                                className="border-gray-300"
                              />
                              <span>{range}</span>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              
              {/* Revenue Multi-Select Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Revenue ($M)
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      role="combobox"
                      className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      {selectedRevenueRanges.length > 0 
                        ? `${selectedRevenueRanges.length} selected`
                        : "Any"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0" align="start">
                    <Command>
                      <CommandList>
                        <CommandGroup>
                          <CommandItem 
                            onSelect={() => {
                              if (selectedRevenueRanges.length === REVENUE_RANGES.length) {
                                setSelectedRevenueRanges([]);
                              } else {
                                setSelectedRevenueRanges([...REVENUE_RANGES]);
                              }
                            }}
                            className="flex items-center gap-2 hover:bg-accent"
                          >
                            <Checkbox 
                              checked={selectedRevenueRanges.length === REVENUE_RANGES.length} 
                              className="border-gray-300"
                            />
                            <span>Select All</span>
                          </CommandItem>
                          {REVENUE_RANGES.map((range) => (
                            <CommandItem
                              key={range}
                              onSelect={() => {
                                setSelectedRevenueRanges(
                                  selectedRevenueRanges.includes(range)
                                    ? selectedRevenueRanges.filter(r => r !== range)
                                    : [...selectedRevenueRanges, range]
                                );
                              }}
                              className="flex items-center gap-2 hover:bg-accent"
                            >
                              <Checkbox
                                checked={selectedRevenueRanges.includes(range)}
                                className="border-gray-300"
                              />
                              <span>{range}</span>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              
              {/* Cash Multi-Select Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cash ($M)
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      role="combobox"
                      className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      {selectedCashRanges.length > 0 
                        ? `${selectedCashRanges.length} selected`
                        : "Any"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0" align="start">
                    <Command>
                      <CommandList>
                        <CommandGroup>
                          <CommandItem 
                            onSelect={() => {
                              if (selectedCashRanges.length === CASH_RANGES.length) {
                                setSelectedCashRanges([]);
                              } else {
                                setSelectedCashRanges([...CASH_RANGES]);
                              }
                            }}
                            className="flex items-center gap-2 hover:bg-accent"
                          >
                            <Checkbox 
                              checked={selectedCashRanges.length === CASH_RANGES.length} 
                              className="border-gray-300"
                            />
                            <span>Select All</span>
                          </CommandItem>
                          {CASH_RANGES.map((range) => (
                            <CommandItem
                              key={range}
                              onSelect={() => {
                                setSelectedCashRanges(
                                  selectedCashRanges.includes(range)
                                    ? selectedCashRanges.filter(r => r !== range)
                                    : [...selectedCashRanges, range]
                                );
                              }}
                              className="flex items-center gap-2 hover:bg-accent"
                            >
                              <Checkbox
                                checked={selectedCashRanges.includes(range)}
                                className="border-gray-300"
                              />
                              <span>{range}</span>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
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
              
              {/* Offering Keywords */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Offering
                </label>
                <div className="space-y-3">
                  {offeringSearches.map((search, index) => (
                    <div key={`offering-${index}`} className="flex flex-wrap items-center gap-2">
                      {index > 0 && (
                        <div className="w-20">
                          <select 
                            className="w-full p-2 text-xs border border-gray-300 rounded-md"
                            value={search.operator}
                            onChange={(e) => handleKeywordChange(index, 'operator', e.target.value as BooleanOperator, setOfferingSearches, offeringSearches)}
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
                          placeholder="Enter offering keyword..."
                          className="w-full p-2 border border-gray-300 rounded-md text-sm"
                          value={search.value}
                          onChange={(e) => handleKeywordChange(index, 'value', e.target.value, setOfferingSearches, offeringSearches)}
                        />
                      </div>
                      
                      <button 
                        onClick={() => removeKeywordSearch(index, setOfferingSearches, offeringSearches)}
                        className="p-1.5 text-red-500 hover:text-red-700 rounded-md hover:bg-red-50"
                        title="Remove"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                
                <button
                  onClick={() => addKeywordSearch(setOfferingSearches, offeringSearches)}
                  className="mt-2 px-3 py-1.5 text-xs font-medium text-blueknight-600 bg-blueknight-50 rounded-md hover:bg-blueknight-100"
                >
                  + Add offering keyword
                </button>
              </div>
              
              {/* Sectors Keywords */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sectors
                </label>
                <div className="space-y-3">
                  {sectorSearches.map((search, index) => (
                    <div key={`sector-${index}`} className="flex flex-wrap items-center gap-2">
                      {index > 0 && (
                        <div className="w-20">
                          <select 
                            className="w-full p-2 text-xs border border-gray-300 rounded-md"
                            value={search.operator}
                            onChange={(e) => handleKeywordChange(index, 'operator', e.target.value as BooleanOperator, setSectorSearches, sectorSearches)}
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
                          placeholder="Enter sector keyword..."
                          className="w-full p-2 border border-gray-300 rounded-md text-sm"
                          value={search.value}
                          onChange={(e) => handleKeywordChange(index, 'value', e.target.value, setSectorSearches, sectorSearches)}
                        />
                      </div>
                      
                      <button 
                        onClick={() => removeKeywordSearch(index, setSectorSearches, sectorSearches)}
                        className="p-1.5 text-red-500 hover:text-red-700 rounded-md hover:bg-red-50"
                        title="Remove"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                
                <button
                  onClick={() => addKeywordSearch(setSectorSearches, sectorSearches)}
                  className="mt-2 px-3 py-1.5 text-xs font-medium text-blueknight-600 bg-blueknight-50 rounded-md hover:bg-blueknight-100"
                >
                  + Add sector keyword
                </button>
              </div>
              
              {/* Customers Keywords */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Customers
                </label>
                <div className="space-y-3">
                  {customerSearches.map((search, index) => (
                    <div key={`customer-${index}`} className="flex flex-wrap items-center gap-2">
                      {index > 0 && (
                        <div className="w-20">
                          <select 
                            className="w-full p-2 text-xs border border-gray-300 rounded-md"
                            value={search.operator}
                            onChange={(e) => handleKeywordChange(index, 'operator', e.target.value as BooleanOperator, setCustomerSearches, customerSearches)}
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
                          placeholder="Enter customer keyword..."
                          className="w-full p-2 border border-gray-300 rounded-md text-sm"
                          value={search.value}
                          onChange={(e) => handleKeywordChange(index, 'value', e.target.value, setCustomerSearches, customerSearches)}
                        />
                      </div>
                      
                      <button 
                        onClick={() => removeKeywordSearch(index, setCustomerSearches, customerSearches)}
                        className="p-1.5 text-red-500 hover:text-red-700 rounded-md hover:bg-red-50"
                        title="Remove"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                
                <button
                  onClick={() => addKeywordSearch(setCustomerSearches, customerSearches)}
                  className="mt-2 px-3 py-1.5 text-xs font-medium text-blueknight-600 bg-blueknight-50 rounded-md hover:bg-blueknight-100"
                >
                  + Add customer keyword
                </button>
              </div>
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
