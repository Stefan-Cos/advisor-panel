
import React, { useState } from 'react';
import { X, Filter, ChevronDown } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

interface BuyerFilterProps {
  onFilterApply: () => void;
  onClose: () => void;
}

const BuyerFilter: React.FC<BuyerFilterProps> = ({ 
  onFilterApply, 
  onClose 
}) => {
  const [filters, setFilters] = useState({
    revenue: '',
    employees: '',
    hq: '',
    cash: '',
    peVcBacked: '',
    public: '',
    acquisitions: '',
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleApplyFilters = () => {
    toast({
      title: "Filters Applied",
      description: "Your filters have been applied to the buyer list."
    });
    onFilterApply();
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-700 flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filter Buyers
          </h3>
          <button 
            onClick={onClose}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        
        <div className="space-y-3">
          {/* HQ Filter */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              HQ
            </label>
            <div className="relative">
              <select
                name="hq"
                value={filters.hq}
                onChange={handleFilterChange}
                className="w-full h-8 pl-2 pr-8 text-xs border border-gray-300 rounded-md bg-white appearance-none"
              >
                <option value="">All Countries</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="Germany">Germany</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
            </div>
          </div>

          {/* Employees Filter */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Employees
            </label>
            <div className="relative">
              <select
                name="employees"
                value={filters.employees}
                onChange={handleFilterChange}
                className="w-full h-8 pl-2 pr-8 text-xs border border-gray-300 rounded-md bg-white appearance-none"
              >
                <option value="">Any</option>
                <option value="100">100+</option>
                <option value="500">500+</option>
                <option value="1000">1000+</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
            </div>
          </div>

          {/* Revenue Filter */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Revenue ($M)
            </label>
            <div className="relative">
              <select
                name="revenue"
                value={filters.revenue}
                onChange={handleFilterChange}
                className="w-full h-8 pl-2 pr-8 text-xs border border-gray-300 rounded-md bg-white appearance-none"
              >
                <option value="">Any</option>
                <option value="10">$10M+</option>
                <option value="50">$50M+</option>
                <option value="100">$100M+</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
            </div>
          </div>

          {/* Cash Filter */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Cash ($M)
            </label>
            <div className="relative">
              <select
                name="cash"
                value={filters.cash}
                onChange={handleFilterChange}
                className="w-full h-8 pl-2 pr-8 text-xs border border-gray-300 rounded-md bg-white appearance-none"
              >
                <option value="">Any</option>
                <option value="5">$5M+</option>
                <option value="10">$10M+</option>
                <option value="25">$25M+</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
            </div>
          </div>

          {/* PE/VC-Backed Filter */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              PE/VC-Backed
            </label>
            <div className="relative">
              <select
                name="peVcBacked"
                value={filters.peVcBacked}
                onChange={handleFilterChange}
                className="w-full h-8 pl-2 pr-8 text-xs border border-gray-300 rounded-md bg-white appearance-none"
              >
                <option value="">Any</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
            </div>
          </div>

          {/* Public Filter */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Public
            </label>
            <div className="relative">
              <select
                name="public"
                value={filters.public}
                onChange={handleFilterChange}
                className="w-full h-8 pl-2 pr-8 text-xs border border-gray-300 rounded-md bg-white appearance-none"
              >
                <option value="">Any</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleApplyFilters}
            className="px-4 py-2 w-full bg-blueknight-500 text-white rounded-md text-sm font-medium hover:bg-blueknight-600"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </ScrollArea>
  );
};

export default BuyerFilter;
