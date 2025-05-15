
import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import BuyerFilter from '@/components/buyers/components/BuyerFilter';

interface FilterSidebarToggleProps {
  filterVisible: boolean;
  toggleFilterSidebar: () => void;
  onFilterApply: () => void;
  position?: 'left' | 'right';
}

const FilterSidebarToggle: React.FC<FilterSidebarToggleProps> = ({
  filterVisible,
  toggleFilterSidebar,
  onFilterApply,
  position = 'left'
}) => {
  const isRightSide = position === 'right';
  
  return (
    <>
      {/* Toggle button for the sidebar */}
      <div 
        className={cn(
          "fixed top-[180px] flex items-center justify-center p-1 bg-[#001437] border border-gray-200 rounded-md shadow-sm cursor-pointer z-20 transition-all duration-300",
          filterVisible 
            ? isRightSide 
              ? "right-[300px]" 
              : "left-[300px]"
            : isRightSide 
              ? "right-0 rounded-r-none rounded-l-md" 
              : "left-0 rounded-l-none rounded-r-md",
        )}
        onClick={toggleFilterSidebar}
      >
        {filterVisible ? (
          isRightSide ? (
            <ChevronRight className="h-5 w-5 text-white" />
          ) : (
            <ChevronLeft className="h-5 w-5 text-white" />
          )
        ) : (
          isRightSide ? (
            <ChevronLeft className="h-5 w-5 text-white" />
          ) : (
            <ChevronRight className="h-5 w-5 text-white" />
          )
        )}
      </div>
      
      {/* Sidebar container */}
      <div className={cn(
        "fixed top-[64px] bottom-0 w-[300px] bg-white border-gray-200 shadow-md overflow-hidden transition-all duration-300 ease-in-out z-10",
        isRightSide ? "right-0 border-l" : "left-0 border-r",
        filterVisible 
          ? "translate-x-0" 
          : isRightSide 
            ? "translate-x-[300px]"
            : "-translate-x-[300px]"
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
