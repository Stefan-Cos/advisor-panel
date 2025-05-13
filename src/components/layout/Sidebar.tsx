
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import SidebarNavItems from './sidebar/SidebarNavItems';
import SidebarSettings from './sidebar/SidebarSettings';
import FeedbackDialog from './sidebar/FeedbackDialog';
import LogoutButton from './sidebar/LogoutButton';
import BuyerFilterPanel from './sidebar/BuyerFilterPanel';

const Sidebar = () => {
  const location = useLocation();
  const showBuyerFilters = location.pathname.includes('/listings/') || location.pathname.includes('/buyer-mandates');
  const [filterExpanded, setFilterExpanded] = useState(true);
  
  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col animate-fade-in">
      <div className="flex-1 overflow-y-auto p-4">
        <SidebarNavItems />
        
        {showBuyerFilters && (
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Buyer Matching</h3>
              <button 
                onClick={() => setFilterExpanded(!filterExpanded)}
                className="text-xs text-blueknight-500 hover:text-blueknight-700"
              >
                {filterExpanded ? 'Collapse' : 'Expand'}
              </button>
            </div>
            
            {filterExpanded && <BuyerFilterPanel />}
          </div>
        )}
        
        <SidebarSettings />
        <FeedbackDialog />
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <LogoutButton />
      </div>
    </div>
  );
};

export default Sidebar;
