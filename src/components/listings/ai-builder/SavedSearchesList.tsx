
import React from 'react';
import { Button } from "@/components/ui/button";
import { Search, ChevronRight } from 'lucide-react';

interface SavedSearch {
  id: string;
  name: string;
  date: string;
  filters: Record<string, string>;
}

interface SavedSearchesListProps {
  savedSearches: SavedSearch[];
  onSelectSearch: (id: string) => void;
}

const SavedSearchesList: React.FC<SavedSearchesListProps> = ({
  savedSearches,
  onSelectSearch
}) => {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Search className="h-4 w-4 mr-2 text-blueknight-600" />
          <h2 className="text-base font-medium text-blueknight-700">Saved Buyer Searches</h2>
        </div>
      </div>
      
      <div className="space-y-2">
        {savedSearches.map((search) => (
          <div 
            key={search.id} 
            className="border border-gray-100 rounded-lg p-3 bg-white shadow-sm hover:bg-gray-50 cursor-pointer"
            onClick={() => onSelectSearch(search.id)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-medium text-gray-800">{search.name}</h3>
                <p className="text-xs text-gray-500">Saved on {search.date}</p>
              </div>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedSearchesList;
