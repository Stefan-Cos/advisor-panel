
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
      
      {/* 
        Instead of fixed positioned sidebar, we'll make it an absolutely positioned element 
        that appears at the top of the content area, pushing content down when visible
      */}
      <div className={cn(
        "absolute top-0 right-0 w-full bg-white border-b border-gray-200 shadow-md overflow-hidden transition-all duration-300 ease-in-out z-10",
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
