
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Target, Save, Settings } from 'lucide-react';
import BuyerListNew from '../../buyers/BuyerListNew';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface MatchedResultsProps {
  listingId: string;
  handleSaveSearch: (searchName: string) => void;
  handleReconfigure: () => void;
}

const MatchedResults: React.FC<MatchedResultsProps> = ({
  listingId,
  handleSaveSearch,
  handleReconfigure
}) => {
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [searchName, setSearchName] = useState('');

  const handleOpenSaveDialog = () => {
    const currentDate = new Date();
    const defaultName = `Search ${currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    setSearchName(defaultName);
    setSaveDialogOpen(true);
  };

  const handleSaveConfirm = () => {
    handleSaveSearch(searchName);
    setSaveDialogOpen(false);
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Target className="h-4 w-4 mr-2 text-blueknight-600" />
          <h2 className="text-base font-medium text-blueknight-700">AI-Matched Buyers</h2>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={handleOpenSaveDialog}
            variant="outline" 
            size="sm" 
            className="text-xs"
          >
            <Save className="h-3 w-3 mr-1" />
            Save Search
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="text-xs"
            onClick={handleReconfigure}
          >
            <Settings className="h-3 w-3 mr-1" />
            Reconfigure
          </Button>
        </div>
      </div>
      
      {/* Use the updated BuyerListNew component */}
      <BuyerListNew listingId={listingId} />

      {/* Save Search Dialog */}
      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Save Search</DialogTitle>
            <DialogDescription>
              Give your search a name to easily find it later.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="col-span-3"
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setSaveDialogOpen(false)}>Cancel</Button>
            <Button type="submit" onClick={handleSaveConfirm}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MatchedResults;
