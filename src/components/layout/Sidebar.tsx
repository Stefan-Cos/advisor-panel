
import React from 'react';
import SidebarNavItems from './sidebar/SidebarNavItems';
import SidebarSettings from './sidebar/SidebarSettings';
import FeedbackDialog from './sidebar/FeedbackDialog';
import LogoutButton from './sidebar/LogoutButton';
import { useBuyerSearchWorkspace } from '@/hooks/useBuyerSearchWorkspace';

const Sidebar = () => {
  const { isWorkspaceMode } = useBuyerSearchWorkspace();
  
  // Hide sidebar when in the buyer search workspace
  if (isWorkspaceMode) {
    return null;
  }
  
  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col animate-fade-in shadow-sm">
      <div className="flex-1 overflow-y-auto p-4">
        <SidebarNavItems />
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
