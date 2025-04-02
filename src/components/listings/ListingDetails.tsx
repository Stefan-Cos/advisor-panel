
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BuyerList from '../buyers/BuyerList';
import SavedList from '../buyers/SavedList';
import BuyerPreferencesSection from './BuyerPreferencesSection';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import AIAssistantChat from '../ui/AIAssistantChat';
import BuyerPreferencesForm from '../forms/BuyerPreferencesForm';

interface ListingDetailsProps {
  id: string;
  companyName: string;
  projectTitle: string;
  revenue: string;
  industry: string;
  country: string;
  status: 'active' | 'inactive' | 'pending';
  date: string;
}

// Sample preferences data - in a real app, this would be fetched from API
const samplePreferences = {
  countries: [
    { name: 'United States', importance: 'high' as const },
    { name: 'United Kingdom', importance: 'medium' as const },
    { name: 'Germany', importance: 'low' as const }
  ],
  industries: [
    { name: 'Technology', importance: 'high' as const },
    { name: 'Healthcare', importance: 'medium' as const }
  ],
  acquisitionReason: 'Technology Acquisition',
  shareholderPreference: {
    privateEquity: true,
    peBacked: false,
    strategicTrade: true,
    noPreference: false
  }
};

const ListingDetails: React.FC<ListingDetailsProps> = ({
  id,
  companyName,
  projectTitle,
  status,
  date,
}) => {
  const statusColors = {
    active: 'bg-green-50 text-green-700',
    inactive: 'bg-red-50 text-red-700',
    pending: 'bg-yellow-50 text-yellow-700',
  };

  return (
    <div className="animate-fade-in space-y-8 w-full relative">
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-blueknight-800">{projectTitle}</h1>
            <p className="text-gray-600 mt-1">{companyName}</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <button className="px-3 py-1 text-sm border border-blueknight-300 rounded-md text-blueknight-700 hover:bg-blueknight-50">
                  Edit Buyer Preferences
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Buyer Preferences</DialogTitle>
                  <DialogDescription>
                    Set your preferences for potential buyers.
                  </DialogDescription>
                </DialogHeader>
                <BuyerPreferencesForm />
              </DialogContent>
            </Dialog>
            
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusColors[status]}`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>
        </div>
        
        {/* Buyer Preferences Section - Always visible below company name */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <BuyerPreferencesSection preferences={samplePreferences} />
        </div>
      </div>
      
      <Tabs defaultValue="buyer-list" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white border border-gray-200 rounded-md shadow-sm">
          <TabsTrigger value="buyer-list" className="data-[state=active]:bg-blueknight-500 data-[state=active]:text-white font-medium">
            Buyer List
          </TabsTrigger>
          <TabsTrigger value="saved-list" className="data-[state=active]:bg-blueknight-500 data-[state=active]:text-white font-medium">
            Saved List
          </TabsTrigger>
          <TabsTrigger value="crm" className="data-[state=active]:bg-blueknight-500 data-[state=active]:text-white font-medium">
            CRM
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="buyer-list" className="mt-6 w-full">
          <BuyerList listingId={id} />
        </TabsContent>
        
        <TabsContent value="saved-list" className="mt-6 w-full">
          <SavedList listingId={id} />
        </TabsContent>
        
        <TabsContent value="crm" className="mt-6 w-full">
          <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-12 text-center">
            <h3 className="text-xl font-medium text-gray-700">CRM Features Coming Soon</h3>
            <p className="text-gray-500 mt-2">
              Our CRM functionality will be available in a future update. Stay tuned for enhanced client management tools.
            </p>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* AI Assistant Chat component is positioned here */}
      <AIAssistantChat />
    </div>
  );
};

export default ListingDetails;
