
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
          "fixed top-[280px] z-10 bg-[#001437] shadow-md rounded-l-md cursor-pointer transition-all duration-300",
          filterVisible ? "right-[300px]" : "right-0"
        )}
        onClick={toggleFilterSidebar}
      >
        <div className="p-1.5 hover:bg-opacity-80 rounded-l-md">
          {filterVisible 
            ? <ChevronRight className="h-4 w-4 text-white" /> 
            : <ChevronLeft className="h-4 w-4 text-white" />
          }
        </div>
      </div>
      
      {/* Floating Fixed Filter Sidebar */}
      <div className={cn(
        "fixed top-[64px] right-0 bottom-0 w-[300px] bg-white border-l border-gray-200 shadow-md overflow-hidden transition-all duration-300 ease-in-out z-10",
        filterVisible ? "translate-x-0" : "translate-x-[300px]"
      )}>
        {/* Container for the sidebar content (child component will be injected here) */}
        <div className="h-full">
          {/* FilterSidebar component is imported in the parent */}
        </div>
      </div>
    </>
  );
};

export default FilterSidebarToggle;
