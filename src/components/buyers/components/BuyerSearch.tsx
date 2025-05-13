
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import {
  Command,
  CommandInput
} from "@/components/ui/command";

interface BuyerSearchProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
}

const BuyerSearch: React.FC<BuyerSearchProps> = ({ searchValue, onSearchChange }) => {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <div className="mb-4 relative">
      <Command className="rounded-lg border shadow-md">
        <div className="flex items-center px-3">
          <Search 
            className={`h-4 w-4 transition-colors ${isFocused ? 'text-blueknight-500' : 'text-gray-400'}`}
          />
          <CommandInput 
            placeholder="Search by company name..." 
            value={searchValue}
            onValueChange={onSearchChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="h-11 flex-1"
          />
        </div>
      </Command>
      {searchValue && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <button 
            onClick={() => onSearchChange('')} 
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default BuyerSearch;
