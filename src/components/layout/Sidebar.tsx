
import React, { useState } from 'react';
import SidebarNavItems from './sidebar/SidebarNavItems';
import SidebarSettings from './sidebar/SidebarSettings';
import FeedbackDialog from './sidebar/FeedbackDialog';
import LogoutButton from './sidebar/LogoutButton';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`${collapsed ? 'w-16' : 'w-64'} h-screen bg-white border-r border-gray-200 flex flex-col animate-fade-in transition-width duration-300`}>
      <div className="flex-1 overflow-y-auto p-4">
        <SidebarNavItems collapsed={collapsed} />
        
        {/* Always render these components but conditionally show them based on collapsed state */}
        <div className={collapsed ? 'hidden' : ''}>
          <SidebarSettings />
          <FeedbackDialog />
        </div>
      </div>
      
      {/* Moved LogoutButton and toggle button higher in the sidebar structure */}
      <div className="border-t border-gray-200 p-4">
        <div className={collapsed ? 'hidden' : ''}>
          <LogoutButton />
        </div>
        
        <div className="mt-2 flex justify-center">
          <button 
            onClick={toggleCollapse}
            className="p-1 rounded-md bg-blueknight-500 hover:bg-blueknight-600"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <PanelLeftOpen className="h-5 w-5 text-white" />
            ) : (
              <PanelLeftClose className="h-5 w-5 text-white" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
