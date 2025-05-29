
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";

interface BuyerSearchProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
}

const BuyerSearch: React.FC<BuyerSearchProps> = ({ searchValue, onSearchChange }) => {
  return (
    <div className="mb-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search by company name..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 h-11"
        />
      </div>
    </div>
  );
};

export default BuyerSearch;
