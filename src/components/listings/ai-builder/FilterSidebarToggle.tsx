
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
      {/* Toggle button for the sidebar - positioned on the left side */}
      <div 
        className={cn(
          "fixed top-[180px] left-0 flex items-center justify-center p-1 bg-[#001437] border border-gray-200 rounded-r-md shadow-sm cursor-pointer z-20 transition-all duration-300",
          filterVisible ? "left-[300px]" : "left-0"
        )}
        onClick={toggleFilterSidebar}
      >
        {filterVisible ? (
          <ChevronLeft className="h-5 w-5 text-white" />
        ) : (
          <ChevronRight className="h-5 w-5 text-white" />
        )}
      </div>
      
      {/* Filter sidebar that pushes content down when visible */}
      <div className={cn(
        "absolute top-0 left-0 w-full bg-white border-b border-gray-200 shadow-md overflow-hidden transition-all duration-300 ease-in-out z-10",
        filterVisible ? "max-h-[600px]" : "max-h-0"
      )}>
        {/* Container for the sidebar content with BuyerFilter directly embedded */}
        {filterVisible && (
          <div className="p-4">
            <BuyerFilter
              onFilterApply={onFilterApply}
              onClose={toggleFilterSidebar}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default FilterSidebarToggle;
