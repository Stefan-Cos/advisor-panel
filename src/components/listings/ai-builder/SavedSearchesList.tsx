
import React from 'react';
import { Button } from "@/components/ui/button";
import { Search, ChevronRight, Trash2 } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface SavedSearch {
  id: string;
  name: string;
  date: string;
  filters: Record<string, string>;
}

interface SavedSearchesListProps {
  savedSearches: SavedSearch[];
  onSelectSearch: (id: string) => void;
  onDeleteSearch: (id: string) => void;
}

const SavedSearchesList: React.FC<SavedSearchesListProps> = ({
  savedSearches,
  onSelectSearch,
  onDeleteSearch
}) => {
  const handleDelete = async (e: React.MouseEvent, searchId: string, searchName: string) => {
    e.stopPropagation(); // Prevent triggering the select search
    
    if (window.confirm(`Are you sure you want to delete "${searchName}"? This action cannot be undone.`)) {
      try {
        await onDeleteSearch(searchId);
        toast({
          title: "Search Deleted",
          description: `"${searchName}" has been deleted successfully.`
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete search. Please try again.",
          variant: "destructive"
        });
      }
    }
  };

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
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-800">{search.name}</h3>
                <p className="text-xs text-gray-500">Saved on {search.date}</p>
              </div>
              <div className="flex items-center space-x-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                  onClick={(e) => handleDelete(e, search.id, search.name)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedSearchesList;
