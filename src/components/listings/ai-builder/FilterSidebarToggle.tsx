
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
      {/* Toggle button for the sidebar - positioned on the right side */}
      <div 
        className={cn(
          "fixed top-[180px] right-0 flex items-center justify-center p-1 bg-[#001437] border border-gray-200 rounded-l-md shadow-sm cursor-pointer z-20 transition-all duration-300",
          filterVisible ? "right-[300px]" : "right-0"
        )}
        onClick={toggleFilterSidebar}
      >
        {filterVisible ? (
          <ChevronRight className="h-5 w-5 text-white" />
        ) : (
          <ChevronLeft className="h-5 w-5 text-white" />
        )}
      </div>
      
      {/* Sidebar container - now on the right side */}
      <div className={cn(
        "fixed top-[64px] right-0 bottom-0 w-[300px] bg-white border-l border-gray-200 shadow-md overflow-hidden transition-all duration-300 ease-in-out z-10",
        filterVisible ? "translate-x-0" : "translate-x-[300px]"
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
