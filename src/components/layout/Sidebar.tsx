
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ListFilter, 
  MessageSquare, 
  Settings, 
  Users,
  BarChart,
  LogOut 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const Sidebar = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  
  const navItems = [
    { path: '/dashboard', label: 'Overview', icon: <LayoutDashboard className="h-5 w-5" /> },
    { path: '/listings', label: 'Listings', icon: <ListFilter className="h-5 w-5" /> },
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
  
  const handleSettingsItemClick = (settingType: string) => {
    toast({
      title: `${settingType} Settings`,
      description: `${settingType} settings features coming soon`,
    });
  };
  
  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    // Redirect to login in a real app
    window.location.href = '/';
  };

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col animate-fade-in">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "nav-link group",
                location.pathname === item.path 
                  ? "bg-blueknight-500 text-white" 
                  : "text-gray-600 hover:bg-gray-100"
              )}
              onClick={item.path === '/messages' ? handleMessagesClick : undefined}
            >
              {React.cloneElement(item.icon, {
                className: cn(
                  "h-5 w-5",
                  location.pathname === item.path 
                    ? "text-white" 
                    : "text-gray-500 group-hover:text-gray-600"
                )
              })}
              <span>{item.label}</span>
            </Link>
          ))}
          
          <Collapsible
            open={isSettingsOpen}
            onOpenChange={setIsSettingsOpen}
            className="w-full"
          >
            <CollapsibleTrigger className={cn(
              "nav-link group w-full text-left",
              isSettingsOpen
                ? "bg-blueknight-500 text-white" 
                : "text-gray-600 hover:bg-gray-100"
            )}>
              <Settings className={cn(
                "h-5 w-5",
                isSettingsOpen
                  ? "text-white" 
                  : "text-gray-500 group-hover:text-gray-600"
              )} />
              <span>Settings</span>
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-5 space-y-1 mt-1">
              <button 
                onClick={() => handleSettingsItemClick('Account')}
                className="nav-link w-full text-left text-gray-600 hover:bg-gray-100"
              >
                <Users className="h-4 w-4 text-gray-500" />
                <span>Account</span>
              </button>
              <button 
                onClick={() => handleSettingsItemClick('Analytics')}
                className="nav-link w-full text-left text-gray-600 hover:bg-gray-100"
              >
                <BarChart className="h-4 w-4 text-gray-500" />
                <span>Analytics</span>
              </button>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="nav-link w-full text-left text-gray-600 hover:bg-gray-100"
        >
          <LogOut className="h-5 w-5 text-gray-500" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
