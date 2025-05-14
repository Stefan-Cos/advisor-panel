
import React, { useState } from 'react';
import { Filter, SlidersHorizontal, Search, Check, ChevronsUpDown } from 'lucide-react';
import StrategicBuyers from './StrategicBuyers';
import PEFunds from './PEFunds';
import { toast } from "@/hooks/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

// Geographic regions for PE funds
const REGIONS = [
  "Global", "North America", "Europe", "EMEA", "MENA", "APAC", "AMER", "LATAM",
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
  "Argentina", "Armenia", "Australia", "Austria"
  // Add more countries as needed
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

// AUM ranges for PE funds
const AUM_RANGES = [
  "Less than $500M",
  "$500M - $1B",
  "$1B - $5B",
  "$5B - $10B",
  "More than $10B"
];

// Total investments ranges for PE funds
const INVESTMENT_RANGES = [
  "Less than 10",
  "10 - 25",
  "25 - 50",
  "50 - 100",
  "More than 100"
];

// Score ranges
const SCORE_OPTIONS = [
  { label: "Any", value: "0" },
  { label: "60%+", value: "60" },
  { label: "70%+", value: "70" },
  { label: "80%+", value: "80" },
  { label: "90%+", value: "90" }
];

const BuyerListNew: React.FC<BuyerListNewProps> = ({ listingId }) => {
  const [activeTab, setActiveTab] = useState<'strategic' | 'pe'>('strategic');
  const [savedBuyers, setSavedBuyers] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const { toast } = useToast();
  
  // Strategic buyer filter states
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedEmployeeRanges, setSelectedEmployeeRanges] = useState<string[]>([]);
  const [selectedRevenueRanges, setSelectedRevenueRanges] = useState<string[]>([]);
  const [selectedCashRanges, setSelectedCashRanges] = useState<string[]>([]);
  const [peVcBackedFilter, setPeVcBackedFilter] = useState<string>('');
  const [minimumFitScore, setMinimumFitScore] = useState<string>("0");
  
  // PE fund filter states
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedAumRanges, setSelectedAumRanges] = useState<string[]>([]);
  const [selectedInvestmentRanges, setSelectedInvestmentRanges] = useState<string[]>([]);
  const [minRevenue, setMinRevenue] = useState<string>('');
  const [maxRevenue, setMaxRevenue] = useState<string>('');
  const [minEbitda, setMinEbitda] = useState<string>('');
  const [maxEbitda, setMaxEbitda] = useState<string>('');
  const [minEnterpriseValue, setMinEnterpriseValue] = useState<string>('');
  const [maxEnterpriseValue, setMaxEnterpriseValue] = useState<string>('');
  const [minimumPeFitScore, setMinimumPeFitScore] = useState<string>("0");
  
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
        title: "Saved", 
        description: "Buyer added to saved list"
      });
    }
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  const handleFilterApply = () => {
    toast({
      title: "Applied", 
      description: "Your search filters have been applied"
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
            
            {activeTab === 'strategic' ? (
              // Strategic Buyers Filters
              <div>
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
                      className="w-full h-10 px-3 py-2 text-sm border border-gray-300 rounded-md"
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
                    <Select
                      value={minimumFitScore}
                      onValueChange={setMinimumFitScore}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        {SCORE_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
              </div>
            ) : (
              // PE Funds Filters
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {/* Geography Multi-Select Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Geography
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          role="combobox"
                          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        >
                          {selectedRegions.length > 0 
                            ? `${selectedRegions.length} selected`
                            : "All Regions"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[300px] p-0" align="start">
                        <Command>
                          <CommandInput placeholder="Filter or select below" />
                          <CommandList className="max-h-[200px] overflow-y-auto">
                            <CommandEmpty>No region found.</CommandEmpty>
                            <CommandGroup>
                              <CommandItem 
                                onSelect={() => {
                                  if (selectedRegions.length === REGIONS.length) {
                                    setSelectedRegions([]);
                                  } else {
                                    setSelectedRegions([...REGIONS]);
                                  }
                                }}
                                className="flex items-center gap-2 hover:bg-accent"
                              >
                                <Checkbox 
                                  checked={selectedRegions.length === REGIONS.length} 
                                  className="border-gray-300"
                                />
                                <span>Select All</span>
                              </CommandItem>
                              {REGIONS.map((region) => (
                                <CommandItem
                                  key={region}
                                  onSelect={() => {
                                    setSelectedRegions(
                                      selectedRegions.includes(region)
                                        ? selectedRegions.filter(r => r !== region)
                                        : [...selectedRegions, region]
                                    );
                                  }}
                                  className="flex items-center gap-2 hover:bg-accent"
                                >
                                  <Checkbox
                                    checked={selectedRegions.includes(region)}
                                    className="border-gray-300"
                                  />
                                  <span>{region}</span>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  {/* AUM Range Multi-Select Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      AUM Range
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          role="combobox"
                          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        >
                          {selectedAumRanges.length > 0 
                            ? `${selectedAumRanges.length} selected`
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
                                  if (selectedAumRanges.length === AUM_RANGES.length) {
                                    setSelectedAumRanges([]);
                                  } else {
                                    setSelectedAumRanges([...AUM_RANGES]);
                                  }
                                }}
                                className="flex items-center gap-2 hover:bg-accent"
                              >
                                <Checkbox 
                                  checked={selectedAumRanges.length === AUM_RANGES.length} 
                                  className="border-gray-300"
                                />
                                <span>Select All</span>
                              </CommandItem>
                              {AUM_RANGES.map((range) => (
                                <CommandItem
                                  key={range}
                                  onSelect={() => {
                                    setSelectedAumRanges(
                                      selectedAumRanges.includes(range)
                                        ? selectedAumRanges.filter(r => r !== range)
                                        : [...selectedAumRanges, range]
                                    );
                                  }}
                                  className="flex items-center gap-2 hover:bg-accent"
                                >
                                  <Checkbox
                                    checked={selectedAumRanges.includes(range)}
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
                  
                  {/* Total Investments Range Multi-Select Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Total Investments
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          role="combobox"
                          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        >
                          {selectedInvestmentRanges.length > 0 
                            ? `${selectedInvestmentRanges.length} selected`
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
                                  if (selectedInvestmentRanges.length === INVESTMENT_RANGES.length) {
                                    setSelectedInvestmentRanges([]);
                                  } else {
                                    setSelectedInvestmentRanges([...INVESTMENT_RANGES]);
                                  }
                                }}
                                className="flex items-center gap-2 hover:bg-accent"
                              >
                                <Checkbox 
                                  checked={selectedInvestmentRanges.length === INVESTMENT_RANGES.length} 
                                  className="border-gray-300"
                                />
                                <span>Select All</span>
                              </CommandItem>
                              {INVESTMENT_RANGES.map((range) => (
                                <CommandItem
                                  key={range}
                                  onSelect={() => {
                                    setSelectedInvestmentRanges(
                                      selectedInvestmentRanges.includes(range)
                                        ? selectedInvestmentRanges.filter(r => r !== range)
                                        : [...selectedInvestmentRanges, range]
                                    );
                                  }}
                                  className="flex items-center gap-2 hover:bg-accent"
                                >
                                  <Checkbox
                                    checked={selectedInvestmentRanges.includes(range)}
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
                  
                  {/* Min/Max Revenue */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Revenue Range ($M)
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        placeholder="Min"
                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                        value={minRevenue}
                        onChange={(e) => setMinRevenue(e.target.value)}
                      />
                      <span className="text-gray-500">-</span>
                      <input
                        type="number"
                        placeholder="Max"
                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                        value={maxRevenue}
                        onChange={(e) => setMaxRevenue(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  {/* Min/Max EBITDA */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      EBITDA Range ($M)
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        placeholder="Min"
                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                        value={minEbitda}
                        onChange={(e) => setMinEbitda(e.target.value)}
                      />
                      <span className="text-gray-500">-</span>
                      <input
                        type="number"
                        placeholder="Max"
                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                        value={maxEbitda}
                        onChange={(e) => setMaxEbitda(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  {/* Min/Max Enterprise Value */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Enterprise Value Range ($M)
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        placeholder="Min"
                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                        value={minEnterpriseValue}
                        onChange={(e) => setMinEnterpriseValue(e.target.value)}
                      />
                      <span className="text-gray-500">-</span>
                      <input
                        type="number"
                        placeholder="Max"
                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                        value={maxEnterpriseValue}
                        onChange={(e) => setMaxEnterpriseValue(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Minimum Fit Score
                    </label>
                    <Select
                      value={minimumPeFitScore}
                      onValueChange={setMinimumPeFitScore}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        {SCORE_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex justify-end mt-4">
              <button
                onClick={handleFilterApply}
                className="px-4 py-2 text-sm font-medium text-white bg-blueknight-500 rounded-md hover:bg-blueknight-600"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
        
        {activeTab === 'strategic' ? (
          <StrategicBuyers 
            savedBuyers={savedBuyers} 
            onAddToSaved={handleAddToSaved} 
          />
        ) : (
          <PEFunds 
            savedBuyers={savedBuyers} 
            onAddToSaved={handleAddToSaved}
          />
        )}
      </div>
    </div>
  );
};

export default BuyerListNew;
