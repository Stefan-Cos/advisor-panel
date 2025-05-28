
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, Upload } from 'lucide-react';
import BuyerDataManager from '@/components/listings/ai-builder/BuyerDataManager';

const DataUpload: React.FC = () => {
  const handleDataUploaded = () => {
    // Handle any global refresh logic if needed
    console.log('Data uploaded successfully');
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Data Upload</h1>
        <p className="text-gray-600">Upload and manage buyer data using CSV templates</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <Database className="h-6 w-6 mr-3 text-blue-600" />
            Buyer Data Management
          </CardTitle>
          <CardDescription>
            Upload buyer data to the database using structured CSV templates. Download templates to see the required format and upload your data files.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BuyerDataManager
            listingId="global" // Using a global identifier since this isn't tied to a specific listing
            onDataUploaded={handleDataUploaded}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default DataUpload;
