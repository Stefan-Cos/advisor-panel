
import React from 'react';
import { ChevronDown, ChevronUp, Filter, Search } from 'lucide-react';
import {
  TableHead,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export interface KeywordSearch {
  text: string;
  operator: 'AND' | 'OR' | 'NOT';
  field: 'offering' | 'sector' | 'customers' | 'keywords';
}

interface BuyerTableHeaderProps {
  title: string;
  width?: string;
  sortable?: boolean;
  searchable?: boolean;
  sortDirection?: 'asc' | 'desc' | null;
  onSort?: () => void;
  onSearch?: (field: string) => void;
  searchField?: 'offering' | 'sector' | 'customers' | 'keywords';
}

const BuyerTableHeader: React.FC<BuyerTableHeaderProps> = ({
  title,
  width = 'auto',
  sortable = false,
  searchable = false,
  sortDirection = null,
  onSort,
  onSearch,
  searchField
}) => {
  return (
    <TableHead className="text-white font-medium" style={{ width }}>
      <div className="flex items-center justify-between">
        <span>{title}</span>
        <div className="flex items-center space-x-1">
          {searchable && onSearch && searchField && (
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-5 w-5 text-white hover:text-white hover:bg-blueknight-600 rounded-full"
                >
                  <Search className="h-3 w-3" />
                  <span className="sr-only">Search {title}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="p-2">
                  <p className="text-sm font-medium">Search {title}</p>
                </div>
              </PopoverContent>
            </Popover>
          )}
          
          {sortable && onSort && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-5 w-5 text-white hover:text-white hover:bg-blueknight-600 rounded-full"
              onClick={onSort}
            >
              {sortDirection === 'asc' ? (
                <ChevronUp className="h-3 w-3" />
              ) : sortDirection === 'desc' ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <Filter className="h-3 w-3" />
              )}
              <span className="sr-only">Sort {title}</span>
            </Button>
          )}
        </div>
      </div>
    </TableHead>
  );
};

export default BuyerTableHeader;
