
import React from 'react';
import { useSidebarState } from '@/hooks/useSidebarState';
import SidebarNavItems from './sidebar/SidebarNavItems';
import ProjectSubItems from './sidebar/ProjectSubItems';
import SidebarSettings from './sidebar/SidebarSettings';
import FeedbackDialog from './sidebar/FeedbackDialog';
import LogoutButton from './sidebar/LogoutButton';

const Sidebar = () => {
  const { isListingDetailsPage, listingId } = useSidebarState();

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col animate-fade-in">
      <div className="flex-1 overflow-y-auto p-4">
        <SidebarNavItems />
        
        {/* Add subsections for specific listing if on listing details page */}
        {isListingDetailsPage && (
          <ProjectSubItems listingId={listingId} />
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
