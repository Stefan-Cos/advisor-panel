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

// This component is being replaced by FilterSidebar, but we're keeping it for now
// with minimal changes to ensure backward compatibility
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
