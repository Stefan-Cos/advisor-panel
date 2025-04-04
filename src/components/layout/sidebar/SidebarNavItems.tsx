
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

type NavItem = {
  path: string;
  label: string;
  icon: React.ReactNode;
};

const SidebarNavItems = () => {
  const location = useLocation();
  const { toast } = useToast();
  
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
      {navItems.map((item) => {
        const isActive = 
          item.path === '/listings'
            ? (location.pathname === '/listings' || location.pathname.includes('/listings/'))
            : location.pathname === item.path;
              
        return (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "nav-link group",
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
        );
      })}
    </div>
  );
};

export default SidebarNavItems;
