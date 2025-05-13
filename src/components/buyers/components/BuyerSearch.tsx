
import React from 'react';
import {
  Command,
  CommandInput
} from "@/components/ui/command";

interface BuyerSearchProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
}

const BuyerSearch: React.FC<BuyerSearchProps> = ({ searchValue, onSearchChange }) => {
  return (
    <div className="mb-4">
      <Command className="rounded-lg border shadow-md">
        <CommandInput 
          placeholder="Search by company name..." 
          value={searchValue}
          onValueChange={onSearchChange}
          className="h-11"
        />
      </Command>
    </div>
  );
};

export default BuyerSearch;
