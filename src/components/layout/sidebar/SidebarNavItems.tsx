
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ListFilter, 
  MessageSquare, 
  Building
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";
import { useSidebarState } from '@/hooks/useSidebarState';
import ProjectSubItems from './ProjectSubItems';

type NavItem = {
  path: string;
  label: string;
  icon: React.ReactNode;
};

const SidebarNavItems = () => {
  const location = useLocation();
  const { toast } = useToast();
  const { isListingDetailsPage, listingId } = useSidebarState();
  
  const navItems: NavItem[] = [
    { path: '/dashboard', label: 'Overview', icon: <LayoutDashboard className="h-5 w-5" /> },
    { path: '/listings', label: 'Projects', icon: <ListFilter className="h-5 w-5" /> },
    { path: '/buyer-mandates', label: 'Active Buyer Mandates', icon: <Building className="h-5 w-5" /> },
    { path: '/messages', label: 'Messages', icon: <MessageSquare className="h-5 w-5" /> },
  ];

  const handleMessagesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname !== '/messages') {
      e.preventDefault();
      toast({
        title: "Messages",
        description: "Messaging features coming soon",
      });
    }
  };

  return (
    <div className="space-y-1">
      {navItems.map((item, index) => {
        const isActive = 
          item.path === '/listings'
            ? (location.pathname === '/listings' || location.pathname.includes('/listings/'))
            : location.pathname === item.path;
              
        return (
          <React.Fragment key={item.path}>
            <Link
              to={item.path}
              className={cn(
                "flex items-center space-x-2 py-2 px-3 rounded-md font-medium nav-link group",
                isActive 
                  ? "bg-blueknight-500 text-white" 
                  : "text-gray-600 hover:bg-gray-100"
              )}
              onClick={item.path === '/messages' ? handleMessagesClick : undefined}
            >
              {React.cloneElement(item.icon as React.ReactElement, {
                className: cn(
                  "h-5 w-5",
                  isActive 
                    ? "text-white" 
                    : "text-gray-500 group-hover:text-gray-600"
                )
              })}
              <span>{item.label}</span>
            </Link>
            
            {/* Show Project Subsections after Projects nav item when on a listings page */}
            {index === 1 && (
              <ProjectSubItems listingId={listingId} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default SidebarNavItems;
