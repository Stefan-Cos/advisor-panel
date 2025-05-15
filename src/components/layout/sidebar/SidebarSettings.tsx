
import React from 'react';
import { Settings, Users, BarChart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const SidebarSettings = () => {
  const location = useLocation();
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  
  React.useEffect(() => {
    // Auto expand settings menu when on settings pages
    if (location.pathname.includes('/settings')) {
      setIsSettingsOpen(true);
    }
  }, [location]);

  return (
    <Collapsible
      open={isSettingsOpen}
      onOpenChange={setIsSettingsOpen}
      className="w-full"
    >
      <CollapsibleTrigger className={cn(
        "nav-link group w-full text-left",
        isSettingsOpen || location.pathname.includes('/settings')
          ? "bg-blueknight-500 text-white" 
          : "text-gray-600 hover:bg-gray-100"
      )}>
        <Settings className={cn(
          "h-5 w-5",
          isSettingsOpen || location.pathname.includes('/settings')
            ? "text-white" 
            : "text-gray-500 group-hover:text-gray-600"
        )} />
        <span>Settings</span>
      </CollapsibleTrigger>
      <CollapsibleContent className="pl-5 space-y-1 mt-1">
        <Link 
          to="/settings#account"
          className={cn(
            "nav-link w-full text-left",
            location.pathname.includes('/settings') && (!location.hash || location.hash === '#account')
              ? "bg-gray-100 text-blueknight-600" 
              : "text-gray-600 hover:bg-gray-100"
          )}
        >
          <Users className={cn(
            "h-4 w-4", 
            location.pathname.includes('/settings') && (!location.hash || location.hash === '#account')
              ? "text-blueknight-600"
              : "text-gray-500"
          )} />
          <span>Account</span>
        </Link>
        <Link
          to="/settings#analytics" 
          className="nav-link w-full text-left text-gray-600 hover:bg-gray-100"
        >
          <BarChart className="h-4 w-4 text-gray-500" />
          <span>Analytics</span>
        </Link>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default SidebarSettings;
