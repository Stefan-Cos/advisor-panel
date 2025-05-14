
import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import BuyerFilter from '@/components/buyers/components/BuyerFilter';

interface FilterSidebarToggleProps {
  filterVisible: boolean;
  toggleFilterSidebar: () => void;
  onFilterApply: () => void;
}

const FilterSidebarToggle: React.FC<FilterSidebarToggleProps> = ({
  filterVisible,
  toggleFilterSidebar,
  onFilterApply
}) => {
  return (
    <>
      {/* Floating Filter Sidebar Toggle */}
      <div 
        className={cn(
          "fixed top-[280px] z-10 bg-[#001437] shadow-md rounded-r-md cursor-pointer transition-all duration-300",
          filterVisible ? "left-[300px]" : "left-0"
        )}
        onClick={toggleFilterSidebar}
      >
        <div className="p-1.5 hover:bg-opacity-80 rounded-r-md">
          {filterVisible 
            ? <ChevronLeft className="h-4 w-4 text-white" /> 
            : <ChevronRight className="h-4 w-4 text-white" />
          }
        </div>
      </div>
      
      {/* Floating Fixed Filter Sidebar */}
      <div className={cn(
        "fixed top-[64px] left-0 bottom-0 w-[300px] bg-white border-r border-gray-200 shadow-md overflow-hidden transition-all duration-300 ease-in-out z-10",
        filterVisible ? "translate-x-0" : "-translate-x-[300px]"
      )}>
        {/* Container for the sidebar content with BuyerFilter directly embedded */}
        {filterVisible && (
          <BuyerFilter
            onFilterApply={onFilterApply}
            onClose={toggleFilterSidebar}
          />
        )}
      </div>
    </>
  );
};

export default FilterSidebarToggle;
