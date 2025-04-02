
import React from 'react';
import { Filter, Search, SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export interface FilterState {
  hq: string[];
  employees: string;
  revenue: string;
  cash: string;
  peBacked: string;
  public: string;
  minScore: string;
  sortBy: string;
}

export interface KeywordSearch {
  text: string;
  operator: 'AND' | 'OR' | 'NOT';
  field: 'offering' | 'sector' | 'customers' | 'keywords';
}

interface BuyerFiltersProps {
  filters: FilterState;
  keywordSearches: KeywordSearch[];
  showFilters: boolean;
  uniqueCountries: string[];
  onToggleFilters: () => void;
  onFilterChange: (field: keyof FilterState, value: any) => void;
  onHQFilterChange: (country: string) => void;
  onKeywordSearchChange: (index: number, field: keyof KeywordSearch, value: any) => void;
  onAddKeywordSearch: () => void;
  onRemoveKeywordSearch: (index: number) => void;
  applyFilters: () => void;
  resetFilters: () => void;
}

const BuyerFilters: React.FC<BuyerFiltersProps> = ({
  filters,
  keywordSearches,
  showFilters,
  uniqueCountries,
  onToggleFilters,
  onFilterChange,
  onHQFilterChange,
  onKeywordSearchChange,
  onAddKeywordSearch,
  onRemoveKeywordSearch,
  applyFilters,
  resetFilters
}) => {
  return (
    <>
      <div className="flex items-center space-x-3">
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              <Search className="h-4 w-4 text-green-500" />
              <span>Boolean Search</span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-96 p-4 bg-white">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900">Boolean Keyword Search</h3>
              <p className="text-xs text-gray-500">
                Search across Offering, Sectors, Customer Types, and Keywords fields using boolean operators.
              </p>
              
              {keywordSearches.map((search, index) => (
                <div key={index} className="space-y-2 pt-2 border-t border-gray-100 first:border-0 first:pt-0">
                  <div className="flex gap-2 items-center">
                    {index > 0 && (
                      <Select
                        value={search.operator}
                        onValueChange={(value: any) => onKeywordSearchChange(index, 'operator', value)}
                      >
                        <SelectTrigger className="w-20">
                          <SelectValue placeholder="AND" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="AND">AND</SelectItem>
                          <SelectItem value="OR">OR</SelectItem>
                          <SelectItem value="NOT">NOT</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                    
                    <Select
                      value={search.field}
                      onValueChange={(value: any) => onKeywordSearchChange(index, 'field', value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Field" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="offering">Offering</SelectItem>
                        <SelectItem value="sector">Sectors</SelectItem>
                        <SelectItem value="customers">Customer Types</SelectItem>
                        <SelectItem value="keywords">Keywords</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <div className="flex-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400" />
                      </div>
                      <Input
                        value={search.text}
                        onChange={(e) => onKeywordSearchChange(index, 'text', e.target.value)}
                        placeholder="Enter search terms..."
                        className="pl-8"
                      />
                    </div>
                    
                    {keywordSearches.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onRemoveKeywordSearch(index)}
                        className="h-8 w-8 p-0"
                      >
                        <span className="sr-only">Remove</span>
                        <div className="h-4 w-4">×</div>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={onAddKeywordSearch}
                  className="text-xs"
                >
                  + Add Condition
                </Button>
                
                <Button
                  onClick={applyFilters}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  Apply Search
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        
        <button
          onClick={onToggleFilters}
          className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
        </button>
      </div>
      
      {showFilters && (
        <div className="mt-4 mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-700 flex items-center">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filter Options
            </h3>
            <button 
              onClick={onToggleFilters}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* HQ Filter Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                HQ Location
              </label>
              <div className="space-y-2 max-h-40 overflow-y-auto p-2 border border-gray-200 rounded-md bg-white">
                {uniqueCountries.map((country) => (
                  <div key={country} className="flex items-center">
                    <Checkbox
                      id={`hq-${country}`}
                      checked={filters.hq.includes(country)}
                      onCheckedChange={() => onHQFilterChange(country)}
                    />
                    <label htmlFor={`hq-${country}`} className="ml-2 text-sm">
                      {country}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Numeric Filters Section */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Employees
                </label>
                <Select
                  value={filters.employees}
                  onValueChange={(value) => onFilterChange('employees', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any</SelectItem>
                    <SelectItem value="0-500">0-500</SelectItem>
                    <SelectItem value="500-1000">500-1000</SelectItem>
                    <SelectItem value="1000-5000">1000-5000</SelectItem>
                    <SelectItem value="5000-">5000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Revenue
                </label>
                <Select
                  value={filters.revenue}
                  onValueChange={(value) => onFilterChange('revenue', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any</SelectItem>
                    <SelectItem value="0-10">$0-10M</SelectItem>
                    <SelectItem value="10-50">$10-50M</SelectItem>
                    <SelectItem value="50-100">$50-100M</SelectItem>
                    <SelectItem value="100-">$100M+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Additional Filters Section */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Min Match Score
                </label>
                <Select
                  value={filters.minScore}
                  onValueChange={(value) => onFilterChange('minScore', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Any</SelectItem>
                    <SelectItem value="50">50%+</SelectItem>
                    <SelectItem value="70">70%+</SelectItem>
                    <SelectItem value="80">80%+</SelectItem>
                    <SelectItem value="90">90%+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sort By
                </label>
                <Select
                  value={filters.sortBy}
                  onValueChange={(value) => onFilterChange('sortBy', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Best Match" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fit">Best Match</SelectItem>
                    <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                    <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 mt-4">
            <Button variant="outline" onClick={resetFilters}>
              Reset Filters
            </Button>
            <Button onClick={applyFilters} className="bg-blueknight-500 text-white hover:bg-blueknight-600">
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default BuyerFilters;
