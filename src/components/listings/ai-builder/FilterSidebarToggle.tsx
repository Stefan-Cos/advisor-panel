
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
  const isLeftSide = position === 'left';
  
  return (
    <>
      {/* Toggle button for the sidebar - positioned on the left side of the screen */}
      <div 
        className={cn(
          "fixed top-[600px] flex items-center justify-center p-1 bg-[#001437] border border-gray-200 rounded-md shadow-sm cursor-pointer z-20 transition-all duration-300",
          filterVisible 
            ? isLeftSide 
              ? "left-[300px]" 
              : "right-[300px]"
            : isLeftSide 
              ? "left-0 rounded-l-none rounded-r-md" 
              : "right-0 rounded-r-none rounded-l-md",
        )}
        onClick={toggleFilterSidebar}
      >
        {filterVisible ? (
          isLeftSide ? (
            <ChevronLeft className="h-5 w-5 text-white" />
          ) : (
            <ChevronRight className="h-5 w-5 text-white" />
          )
        ) : (
          isLeftSide ? (
            <ChevronRight className="h-5 w-5 text-white" />
          ) : (
            <ChevronLeft className="h-5 w-5 text-white" />
          )
        )}
      </div>
      
      {/* Sidebar container - positioned on the left side */}
      <div className={cn(
        "fixed top-[64px] bottom-0 w-[300px] bg-white border-gray-200 shadow-md overflow-hidden transition-all duration-300 ease-in-out z-10",
        isLeftSide ? "left-0 border-r" : "right-0 border-l",
        filterVisible 
          ? "translate-x-0" 
          : isLeftSide 
            ? "-translate-x-[300px]"
            : "translate-x-[300px]"
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
