
import React from 'react';
import { Settings, Users, BarChart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from "@/hooks/use-toast";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const SidebarSettings = () => {
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  
  const handleSettingsItemClick = (settingType: string) => {
    toast({
      title: `${settingType} Settings`,
      description: `${settingType} settings features coming soon`,
    });
  };

  return (
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
  );
};

export default SidebarSettings;
