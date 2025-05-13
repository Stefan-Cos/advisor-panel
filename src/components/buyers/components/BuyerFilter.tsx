
import React, { useState } from 'react';
import { Filter, ChevronDown, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";

interface BuyerFilterProps {
  onFilterApply: () => void;
  onClose: () => void;
}

const BuyerFilter: React.FC<BuyerFilterProps> = ({ 
  onFilterApply, 
  onClose 
}) => {
  const [selectedMinimumScores, setSelectedMinimumScores] = useState<string[]>([]);
  const [showMinimumScoreDropdown, setShowMinimumScoreDropdown] = useState(false);
  const [minimumScoreSearch, setMinimumScoreSearch] = useState('');
  
  const minimumScoreOptions = [
    { label: 'Any', value: '0' },
    { label: '60%+', value: '60' },
    { label: '70%+', value: '70' },
    { label: '80%+', value: '80' },
    { label: '90%+', value: '90' },
    { label: '95%+', value: '95' },
  ];
  
  const filteredMinimumScoreOptions = minimumScoreOptions.filter(option => 
    option.label.toLowerCase().includes(minimumScoreSearch.toLowerCase())
  );
  
  const handleMinimumScoreSelection = (value: string) => {
    setSelectedMinimumScores(prev => {
      if (prev.includes(value)) {
        return prev.filter(item => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const { toast } = useToast();

  const handleApply = () => {
    onFilterApply();
    toast({
      title: "Filters Applied",
      description: "Your search filters have been applied",
    });
  };

  return (
    <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-700 flex items-center">
          <Filter className="h-4 w-4 mr-2" />
          Filter Options
        </h3>
        <button 
          onClick={onClose}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Close
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            HQ
          </label>
          <select className="input-field">
            <option value="">All Countries</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
            <option value="Germany">Germany</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Minimum Revenue ($M)
          </label>
          <select className="input-field">
            <option value="0">Any</option>
            <option value="50">$50M+</option>
            <option value="100">$100M+</option>
            <option value="250">$250M+</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Minimum Cash ($M)
          </label>
          <select className="input-field">
            <option value="0">Any</option>
            <option value="10">$10M+</option>
            <option value="25">$25M+</option>
            <option value="50">$50M+</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Minimum Employees
          </label>
          <select className="input-field">
            <option value="0">Any</option>
            <option value="100">100+</option>
            <option value="500">500+</option>
            <option value="1000">1000+</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            PE/VC Backed
          </label>
          <select className="input-field">
            <option value="">Any</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Minimum Match Score
          </label>
          <Popover open={showMinimumScoreDropdown} onOpenChange={setShowMinimumScoreDropdown}>
            <PopoverTrigger asChild>
              <button
                className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 bg-white rounded-md text-sm"
                onClick={() => setShowMinimumScoreDropdown(!showMinimumScoreDropdown)}
              >
                <span className="text-left truncate">
                  {selectedMinimumScores.length > 0
                    ? `${selectedMinimumScores.length} selected`
                    : 'Select options'}
                </span>
                <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
              <div className="p-2">
                <Input
                  placeholder="Search..."
                  value={minimumScoreSearch}
                  onChange={(e) => setMinimumScoreSearch(e.target.value)}
                  className="mb-2"
                />
                <ScrollArea className="h-[200px]">
                  <div className="space-y-2 p-2">
                    {filteredMinimumScoreOptions.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`score-${option.value}`}
                          checked={selectedMinimumScores.includes(option.value)}
                          onCheckedChange={() => handleMinimumScoreSelection(option.value)}
                        />
                        <label
                          htmlFor={`score-${option.value}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleApply}
          className="px-4 py-2 bg-blueknight-500 text-white rounded-md text-sm font-medium hover:bg-blueknight-600"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default BuyerFilter;
