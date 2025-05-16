
import React, { useState } from 'react';
import SidebarNavItems from './sidebar/SidebarNavItems';
import LogoutButton from './sidebar/LogoutButton';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`${collapsed ? 'w-16' : 'w-64'} h-screen bg-white border-r border-gray-200 flex flex-col animate-fade-in transition-width duration-300 relative`}>
      {/* Toggle button kept on right side */}
      <div className="absolute -right-5 top-4 z-10">
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
      
      <div className="flex-1 overflow-y-auto p-4">
        <SidebarNavItems collapsed={collapsed} />
      </div>
      
      {!collapsed && (
        <div className="p-4 border-t border-gray-200">
          <LogoutButton />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
