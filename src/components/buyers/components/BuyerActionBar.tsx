
import React, { useState } from 'react';
import { Filter, UserCircle, Tag } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface BuyerActionBarProps {
  toggleFilters: () => void;
}

const BuyerActionBar: React.FC<BuyerActionBarProps> = ({ toggleFilters }) => {
  const { toast } = useToast();

  const handleKeywords = () => {
    toast({
      title: "Keywords Management",
      description: "Keyword management feature opened",
    });
  };

  return (
    <div className="flex items-center space-x-3">
      <Popover>
        <PopoverTrigger asChild>
          <button className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            <UserCircle className="h-4 w-4 text-purple-500" />
            <span>Buyer Preferences</span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-900">Buyer Preferences</h3>
            <div className="space-y-2">
              <div>
                <label className="text-xs font-medium text-gray-700">Industry Focus</label>
                <Input
                  type="text"
                  placeholder="e.g., Healthcare, Technology"
                  className="h-8 text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700">Deal Size</label>
                <Input
                  type="text"
                  placeholder="e.g., $10M - $50M"
                  className="h-8 text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700">Geographic Focus</label>
                <Input
                  type="text"
                  placeholder="e.g., North America, Europe"
                  className="h-8 text-sm"
                />
              </div>
            </div>
            <button className="w-full px-3 py-2 text-sm font-medium bg-purple-500 text-white rounded-md hover:bg-purple-600">
              Save Preferences
            </button>
          </div>
        </PopoverContent>
      </Popover>
      
      <Popover>
        <PopoverTrigger asChild>
          <button className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            <Tag className="h-4 w-4 text-green-500" />
            <span>Keywords</span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-900">Manage Keywords</h3>
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Add keywords..."
                className="h-8 text-sm"
              />
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="inline-flex items-center px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-full">
                  Healthcare 
                  <button className="ml-1 text-blue-500 hover:text-blue-700">×</button>
                </span>
                <span className="inline-flex items-center px-2 py-1 text-xs bg-green-50 text-green-700 rounded-full">
                  Software 
                  <button className="ml-1 text-green-500 hover:text-green-700">×</button>
                </span>
                <span className="inline-flex items-center px-2 py-1 text-xs bg-purple-50 text-purple-700 rounded-full">
                  SaaS 
                  <button className="ml-1 text-purple-500 hover:text-purple-700">×</button>
                </span>
                <span className="inline-flex items-center px-2 py-1 text-xs bg-yellow-50 text-yellow-700 rounded-full">
                  B2B 
                  <button className="ml-1 text-yellow-500 hover:text-yellow-700">×</button>
                </span>
              </div>
            </div>
            <button
              onClick={handleKeywords}
              className="w-full px-3 py-2 text-sm font-medium bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Apply Keywords
            </button>
          </div>
        </PopoverContent>
      </Popover>
      
      <button
        onClick={toggleFilters}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
      >
        <Filter className="h-4 w-4" />
        <span>Filters</span>
      </button>
    </div>
  );
};

export default BuyerActionBar;
