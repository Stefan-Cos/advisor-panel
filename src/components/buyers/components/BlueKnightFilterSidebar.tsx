
import React from 'react';
import { X, Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface FilterState {
  hq: string;
  employees: {
    min: string;
    max: string;
  };
  revenue: {
    min: string;
    max: string;
  };
  cash: {
    min: string;
    max: string;
  };
  isPEVCBacked: string;
  minimumFitScore: string;
  offering: string;
  sectors: string;
  customers: string;
}

interface BlueKnightFilterSidebarProps {
  isVisible: boolean;
  onClose: () => void;
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
}

const BlueKnightFilterSidebar: React.FC<BlueKnightFilterSidebarProps> = ({
  isVisible,
  onClose,
  filters,
  onFiltersChange,
  onApplyFilters,
  onClearFilters
}) => {
  if (!isVisible) return null;

  const handleFieldChange = (field: string, value: string) => {
    onFiltersChange({
      ...filters,
      [field]: value
    });
  };

  const handleNestedFieldChange = (category: string, field: string, value: string) => {
    onFiltersChange({
      ...filters,
      [category]: {
        ...filters[category as keyof FilterState],
        [field]: value
      }
    });
  };

  return (
    <div className="fixed left-0 top-0 h-full w-[280px] bg-white border-r border-gray-200 shadow-lg z-40 overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-md"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="space-y-4">
          {/* HQ Filter */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              HQ
            </Label>
            <select 
              className="w-full h-10 px-3 text-sm border border-gray-300 rounded-md bg-white"
              value={filters.hq}
              onChange={(e) => handleFieldChange('hq', e.target.value)}
            >
              <option value="">All Countries</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Canada">Canada</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
              <option value="Australia">Australia</option>
              <option value="Netherlands">Netherlands</option>
              <option value="Sweden">Sweden</option>
              <option value="Switzerland">Switzerland</option>
            </select>
          </div>

          {/* Employees Filter */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Employees
            </Label>
            <select 
              className="w-full h-10 px-3 text-sm border border-gray-300 rounded-md bg-white"
              value={filters.employees.min}
              onChange={(e) => handleNestedFieldChange('employees', 'min', e.target.value)}
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="10">10+</option>
              <option value="50">50+</option>
              <option value="100">100+</option>
              <option value="500">500+</option>
              <option value="1000">1000+</option>
              <option value="5000">5000+</option>
            </select>
          </div>

          {/* Revenue Filter */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Revenue ($M)
            </Label>
            <select 
              className="w-full h-10 px-3 text-sm border border-gray-300 rounded-md bg-white"
              value={filters.revenue.min}
              onChange={(e) => handleNestedFieldChange('revenue', 'min', e.target.value)}
            >
              <option value="">Any</option>
              <option value="1">$1M+</option>
              <option value="5">$5M+</option>
              <option value="10">$10M+</option>
              <option value="25">$25M+</option>
              <option value="50">$50M+</option>
              <option value="100">$100M+</option>
              <option value="500">$500M+</option>
              <option value="1000">$1B+</option>
            </select>
          </div>

          {/* Cash Filter */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Cash ($M)
            </Label>
            <select 
              className="w-full h-10 px-3 text-sm border border-gray-300 rounded-md bg-white"
              value={filters.cash.min}
              onChange={(e) => handleNestedFieldChange('cash', 'min', e.target.value)}
            >
              <option value="">Any</option>
              <option value="1">$1M+</option>
              <option value="5">$5M+</option>
              <option value="10">$10M+</option>
              <option value="25">$25M+</option>
              <option value="50">$50M+</option>
              <option value="100">$100M+</option>
              <option value="500">$500M+</option>
            </select>
          </div>

          {/* PE/VC-Backed Filter */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              PE/VC-Backed
            </Label>
            <select 
              className="w-full h-10 px-3 text-sm border border-gray-300 rounded-md bg-white"
              value={filters.isPEVCBacked}
              onChange={(e) => handleFieldChange('isPEVCBacked', e.target.value)}
            >
              <option value="">Any</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          {/* Minimum Fit Score Filter */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Minimum Fit Score
            </Label>
            <select 
              className="w-full h-10 px-3 text-sm border border-gray-300 rounded-md bg-white"
              value={filters.minimumFitScore}
              onChange={(e) => handleFieldChange('minimumFitScore', e.target.value)}
            >
              <option value="">Any</option>
              <option value="50">50+</option>
              <option value="60">60+</option>
              <option value="70">70+</option>
              <option value="80">80+</option>
              <option value="90">90+</option>
            </select>
          </div>

          {/* Keyword Search Section */}
          <div className="border-t pt-4 mt-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
              <Search className="h-4 w-4 mr-2" />
              Keyword Search
            </h4>

            {/* Offering Keywords */}
            <div className="mb-3">
              <Label className="text-sm font-medium text-gray-600 mb-1 block">
                Offering
              </Label>
              <Input
                type="text"
                placeholder="Enter offering keyword..."
                value={filters.offering}
                onChange={(e) => handleFieldChange('offering', e.target.value)}
                className="w-full"
              />
            </div>

            {/* Sectors Keywords */}
            <div className="mb-3">
              <Label className="text-sm font-medium text-gray-600 mb-1 block">
                Sectors
              </Label>
              <Input
                type="text"
                placeholder="Enter sector keyword..."
                value={filters.sectors}
                onChange={(e) => handleFieldChange('sectors', e.target.value)}
                className="w-full"
              />
            </div>

            {/* Customers Keywords */}
            <div className="mb-3">
              <Label className="text-sm font-medium text-gray-600 mb-1 block">
                Customers
              </Label>
              <Input
                type="text"
                placeholder="Enter customer keyword..."
                value={filters.customers}
                onChange={(e) => handleFieldChange('customers', e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <Button
            onClick={onApplyFilters}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Apply Filters
          </Button>
          <Button
            onClick={onClearFilters}
            variant="outline"
            className="w-full"
          >
            Clear All Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlueKnightFilterSidebar;
