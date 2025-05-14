
import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
      {/* Toggle button for the sidebar */}
      <div 
        className={cn(
          "fixed top-[100px] left-0 flex items-center justify-center p-1 bg-white border border-gray-200 rounded-r-md shadow-sm cursor-pointer z-20 transition-all duration-300",
          filterVisible ? "left-[300px]" : "left-0"
        )}
        onClick={toggleFilterSidebar}
      >
        {filterVisible ? (
          <ChevronLeft className="h-5 w-5 text-gray-600" />
        ) : (
          <ChevronRight className="h-5 w-5 text-gray-600" />
        )}
      </div>
      
      {/* Sidebar container */}
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
