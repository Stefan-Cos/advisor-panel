
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Filter, X, ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

interface FilterCategory {
  name: string;
  options: string[];
  selectedOptions: string[];
}

const FilterPanel: React.FC = () => {
  const { toast } = useToast();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    'Keywords', 'Headquarters', 'Operating location', 'Size'
  ]);
  const [searchText, setSearchText] = useState<string>('');
  
  // Example filter categories based on the reference image
  const [filterCategories, setFilterCategories] = useState<FilterCategory[]>([
    {
      name: 'Keywords',
      options: ['fintech', 'medtech', 'software', 'healthcare', 'payments'],
      selectedOptions: ['fintech']
    },
    {
      name: 'Headquarters',
      options: ['United Kingdom (UK)', 'United States (US)', 'Germany', 'France'],
      selectedOptions: []
    },
    {
      name: 'Operating location',
      options: ['North America', 'Europe', 'Asia', 'Global'],
      selectedOptions: []
    },
    {
      name: 'Size',
      options: ['>50M', '>10M', '>5M', '>1M'],
      selectedOptions: []
    }
  ]);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryName) 
        ? prev.filter(name => name !== categoryName)
        : [...prev, categoryName]
    );
  };

  const toggleOption = (categoryName: string, option: string) => {
    setFilterCategories(prev => 
      prev.map(category => {
        if (category.name === categoryName) {
          const updated = category.selectedOptions.includes(option) 
            ? { ...category, selectedOptions: category.selectedOptions.filter(opt => opt !== option) }
            : { ...category, selectedOptions: [...category.selectedOptions, option] };

          return updated;
        }
        return category;
      })
    );
  };

  const clearCategoryFilters = (categoryName: string) => {
    setFilterCategories(prev => 
      prev.map(category => 
        category.name === categoryName 
          ? { ...category, selectedOptions: [] } 
          : category
      )
    );
    
    toast({
      title: "Filters Cleared",
      description: `All ${categoryName} filters have been cleared`,
    });
  };

  const applySearchFilter = () => {
    if (searchText.trim()) {
      toast({
        title: "Search Applied",
        description: `Searching for companies matching: ${searchText}`,
      });
    }
  };

  const clearSearch = () => {
    setSearchText('');
  };

  const toggleCollapse = () => {
    setIsCollapsed(prev => !prev);
  };

  return (
    <div className={cn(
      "h-full bg-white border-r border-gray-200 transition-all duration-300 sticky top-0 overflow-auto",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {isCollapsed ? (
        <div className="p-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleCollapse}
            className="w-full flex justify-center"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
          <div className="mt-4 flex flex-col items-center">
            <Filter className="h-5 w-5 text-blueknight-500 mb-4" />
            <div className="border-t border-gray-200 w-full pt-4 flex flex-col items-center">
              {filterCategories.map((category) => (
                <div
                  key={category.name}
                  className="mb-4 cursor-pointer"
                  title={category.name}
                >
                  <div className={cn(
                    "h-2 w-2 rounded-full",
                    category.selectedOptions.length > 0 ? "bg-blueknight-500" : "bg-gray-300"
                  )} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleCollapse}
              className="text-gray-500"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Company search box */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Describe company
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="I want to find..."
                className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                {searchText && (
                  <button onClick={clearSearch} className="text-gray-400 hover:text-gray-600">
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Filter categories */}
          {filterCategories.map((category) => (
            <div key={category.name} className="mb-4 border-t border-gray-100 pt-3">
              <div 
                className="flex items-center justify-between cursor-pointer mb-2"
                onClick={() => toggleCategory(category.name)}
              >
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2 text-blueknight-500" />
                  <span className="text-sm font-medium text-gray-700">{category.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {category.selectedOptions.length > 0 && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        clearCategoryFilters(category.name);
                      }}
                      className="text-xs text-gray-500 hover:text-blueknight-600"
                    >
                      clear
                    </button>
                  )}
                  {expandedCategories.includes(category.name) ? (
                    <ChevronUp className="h-4 w-4 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  )}
                </div>
              </div>
              
              {expandedCategories.includes(category.name) && (
                <div className="pl-6 space-y-2">
                  {category.options.map((option) => (
                    <div key={option} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`${category.name}-${option}`}
                        checked={category.selectedOptions.includes(option)}
                        onChange={() => toggleOption(category.name, option)}
                        className="mr-2 h-4 w-4 rounded border-gray-300 text-blueknight-600 focus:ring-blueknight-500"
                      />
                      <label 
                        htmlFor={`${category.name}-${option}`}
                        className={cn(
                          "text-sm",
                          category.selectedOptions.includes(option) 
                            ? "font-medium text-blueknight-600" 
                            : "text-gray-700"
                        )}
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          <div className="mt-6 mb-4 border-t border-gray-100 pt-4">
            <button 
              onClick={applySearchFilter} 
              className="w-full px-4 py-2 bg-blueknight-500 text-white rounded-md text-sm font-medium hover:bg-blueknight-600"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
