
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Database } from 'lucide-react';
import BuyerDataManager from './BuyerDataManager';

interface DataManagementTabProps {
  listingId: string;
  selectedSavedSearch?: string;
  onDataUploaded?: () => void;
}

const DataManagementTab: React.FC<DataManagementTabProps> = ({
  listingId,
  selectedSavedSearch,
  onDataUploaded
}) => {
  return (
    <div className="p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Database className="h-5 w-5 mr-2 text-blueknight-600" />
            Data Management
          </CardTitle>
          <CardDescription>
            Upload buyer data and download templates for bulk data management
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BuyerDataManager
            listingId={listingId}
            savedSearchId={selectedSavedSearch}
            onDataUploaded={onDataUploaded}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default DataManagementTab;
