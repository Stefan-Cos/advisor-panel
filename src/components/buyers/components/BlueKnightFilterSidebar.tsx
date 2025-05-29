
import React from 'react';
import { X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface FilterState {
  hq: string;
  employees: {
    min: string;
    max: string;
  };
  offering: string;
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

  const handleHQChange = (value: string) => {
    onFiltersChange({
      ...filters,
      hq: value
    });
  };

  const handleEmployeesChange = (field: 'min' | 'max', value: string) => {
    onFiltersChange({
      ...filters,
      employees: {
        ...filters.employees,
        [field]: value
      }
    });
  };

  const handleOfferingChange = (value: string) => {
    onFiltersChange({
      ...filters,
      offering: value
    });
  };

  return (
    <div className="fixed left-0 top-0 h-full w-[300px] bg-white border-r border-gray-200 shadow-lg z-40 overflow-y-auto">
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

        <div className="space-y-6">
          {/* HQ Filter */}
          <div>
            <Label htmlFor="hq-filter" className="text-sm font-medium text-gray-700 mb-2 block">
              Headquarters Location
            </Label>
            <Input
              id="hq-filter"
              type="text"
              placeholder="e.g., United States, London, etc."
              value={filters.hq}
              onChange={(e) => handleHQChange(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Employees Filter */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Number of Employees
            </Label>
            <div className="space-y-2">
              <Input
                type="number"
                placeholder="Min employees"
                value={filters.employees.min}
                onChange={(e) => handleEmployeesChange('min', e.target.value)}
                className="w-full"
              />
              <Input
                type="number"
                placeholder="Max employees"
                value={filters.employees.max}
                onChange={(e) => handleEmployeesChange('max', e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          {/* Offering Filter */}
          <div>
            <Label htmlFor="offering-filter" className="text-sm font-medium text-gray-700 mb-2 block">
              Combined Offering Keywords
            </Label>
            <Input
              id="offering-filter"
              type="text"
              placeholder="e.g., software, platform, AI, etc."
              value={filters.offering}
              onChange={(e) => handleOfferingChange(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <div className="mt-8 space-y-3">
          <Button
            onClick={onApplyFilters}
            className="w-full bg-blueknight-500 hover:bg-blueknight-600 text-white"
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
