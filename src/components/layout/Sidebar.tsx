
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
        
        {!collapsed && (
          <>
            <SidebarSettings />
            <FeedbackDialog />
          </>
        )}
      </div>
      
      {!collapsed && (
        <div className="p-4 border-t border-gray-200">
          <LogoutButton />
        </div>
      )}
      
      {/* Moved toggle button to below feedback dialog */}
      <div className="p-2 flex justify-center mb-4">
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
  );
};

export default Sidebar;
