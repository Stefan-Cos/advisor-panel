
import React from 'react';
import { Download, Filter, Settings } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface BuyerActionBarProps {
  onSearchChange: (value: string) => void;
}

const BuyerActionBar: React.FC<BuyerActionBarProps> = ({ onSearchChange }) => {
  const { toast } = useToast();

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your buyer list is being exported as CSV",
    });
  };

  const handleSettingsClick = () => {
    toast({
      title: "Settings",
      description: "Table customization coming soon",
    });
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleExport}
        className="px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center space-x-2"
      >
        <Download className="h-4 w-4 text-gray-500" />
        <span className="text-sm text-gray-700">Export</span>
      </button>
      
      <button
        onClick={handleSettingsClick}
        className="p-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
      >
        <Settings className="h-4 w-4 text-gray-500" />
      </button>
    </div>
  );
};

export default BuyerActionBar;
