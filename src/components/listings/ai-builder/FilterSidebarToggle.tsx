
import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FilterSidebarToggleProps {
  filterVisible: boolean;
  toggleFilterSidebar: () => void;
}

const FilterSidebarToggle: React.FC<FilterSidebarToggleProps> = ({
  filterVisible,
  toggleFilterSidebar
}) => {
  return (
    <>
      {/* Floating Filter Sidebar Toggle */}
      <div 
        className={cn(
          "fixed top-[280px] z-10 bg-[#001437] shadow-md rounded-r-md cursor-pointer transition-all duration-300",
          filterVisible ? "left-[280px]" : "left-0"
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
      
      {/* Floating Filter Sidebar */}
      <div className={cn(
        "fixed top-[64px] bottom-0 left-0 transition-all duration-300 ease-in-out z-10",
        filterVisible ? "translate-x-0" : "-translate-x-[280px]"
      )}>
        <div className="w-[280px] bg-white border-r border-gray-200 shadow-md h-full">
          {/* FilterSidebar component is imported in the parent */}
        </div>
      </div>
    </>
  );
};

export default FilterSidebarToggle;
