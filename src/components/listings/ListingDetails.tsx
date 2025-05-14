
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import BlueKnightList from '../buyers/BlueKnightList';
import SavedList from '../buyers/SavedList';
import AiBuyerBuilder from './AiBuyerBuilder';
import FilterSidebar from './FilterSidebar';
import FilterSidebarToggle from './ai-builder/FilterSidebarToggle';
import { cn } from '@/lib/utils';

interface ListingDetailsProps {
  id: string;
  companyName: string;
  projectTitle: string;
  revenue: string;
  industry: string;
  country: string;
  status: 'active' | 'inactive' | 'pending';
  date: string;
}

const ListingDetails: React.FC<ListingDetailsProps> = ({
  id,
  projectTitle,
  revenue,
  industry,
  country,
  status,
}) => {
  const location = useLocation();
  const path = location.pathname;
  const [filterVisible, setFilterVisible] = useState<boolean>(false);

  // Determine which content to show based on the URL path
  const showAIBuyerBuilder = path.includes('/ai-buyer');
  const showSavedList = path.includes('/saved');
  const showCRM = path.includes('/crm');

  // Toggle filter sidebar
  const toggleFilterSidebar = () => {
    setFilterVisible(!filterVisible);
  };

  return (
    <div className="space-y-4 w-full relative">
      {/* Show FilterSidebarToggle for BlueKnightList and AiBuyerBuilder */}
      {(!showSavedList && !showCRM) && (
        <>
          <FilterSidebarToggle 
            filterVisible={filterVisible} 
            toggleFilterSidebar={toggleFilterSidebar} 
          />
          
          {/* Render the FilterSidebar when visible */}
          {filterVisible && (
            <div className="fixed top-[64px] bottom-0 left-0 z-10 w-[280px]">
              <FilterSidebar />
            </div>
          )}
        </>
      )}

      {/* Show content based on the current route */}
      <div className={cn(
        "transition-all duration-300",
        filterVisible && !showSavedList && !showCRM ? "ml-[280px]" : "ml-0"
      )}>
        {showSavedList ? (
          <SavedList listingId={id} />
        ) : showCRM ? (
          <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-12 text-center">
            <h3 className="text-xl font-medium text-gray-700">CRM Features Coming Soon</h3>
            <p className="text-gray-500 mt-2">
              Our CRM functionality will be available in a future update. Stay tuned for enhanced contacting management tools.
            </p>
          </div>
        ) : showAIBuyerBuilder ? (
          // AI Buyer Builder content - using our redesigned component
          <AiBuyerBuilder listingId={id} />
        ) : (
          // Default content (BlueKnight List)
          <BlueKnightList listingId={id} />
        )}
      </div>
    </div>
  );
};

export default ListingDetails;
