
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  LayoutGrid, 
  FileText, 
  MessageSquare,
  Settings
} from 'lucide-react';
import { useSidebarState } from '@/hooks/useSidebarState';
import { cn } from '@/lib/utils';
import ProjectSubItems from './ProjectSubItems';

interface SidebarNavItemsProps {
  collapsed?: boolean;
}

const SidebarNavItems: React.FC<SidebarNavItemsProps> = ({ collapsed = false }) => {
  const { isListingDetailsPage, listingId } = useSidebarState();
  const location = useLocation();
  const pathname = location.pathname;
  
  const navItems = [
    {
      title: 'Overview',
      path: '/dashboard',
      icon: <Home className="w-5 h-5" />
    },
    {
      title: 'Projects',
      path: '/listings',
      icon: <LayoutGrid className="w-5 h-5" />,
      hasSubItems: true
    },
    {
      title: 'Buyer Mandates',
      path: '/buyer-mandates',
      icon: <FileText className="w-5 h-5" />
    },
    {
      title: 'Messages',
      path: '/messages',
      icon: <MessageSquare className="w-5 h-5" />
    },
    {
      title: 'Settings',
      path: '/settings',
      icon: <Settings className="w-5 h-5" />
    }
  ];
  
  return (
    <div className="space-y-6">
      {/* Navigation Items */}
      <ul className={cn(
        "space-y-2",
        collapsed ? "flex flex-col items-center" : ""
      )}>
        {navItems.map((item, index) => {
          const isActive = pathname.startsWith(item.path);
          
          return (
            <li key={index} className="relative">
              <Link
                to={item.path}
                className={cn(
                  "flex items-center p-2 rounded-md transition-colors",
                  isActive ? "bg-[#001437] text-white" : "text-gray-600 hover:bg-gray-100",
                  collapsed ? "justify-center w-10 h-10" : "space-x-3"
                )}
                title={collapsed ? item.title : undefined}
              >
                {item.icon}
                {!collapsed && <span>{item.title}</span>}
              </Link>
              
              {/* Only show project subitems when not collapsed and for the Projects nav item */}
              {!collapsed && item.hasSubItems && isActive && isListingDetailsPage && (
                <ProjectSubItems listingId={listingId} />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SidebarNavItems;
