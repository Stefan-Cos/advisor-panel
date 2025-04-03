
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BuyerListNew from '../buyers/BuyerListNew';
import SavedList from '../buyers/SavedList';
import AIAssistantChat from '../ui/AIAssistantChat';
import { Badge } from "@/components/ui/badge";
import BuyerPreferencesEditor from './BuyerPreferencesEditor';
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import BuyerPreferencesSection from './BuyerPreferencesSection';

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
  endUserSectors: [
    { name: 'Enterprise', importance: 'high' as const },
    { name: 'SMB', importance: 'medium' as const }
  ],
  keywords: [
    { name: 'Software', importance: 'high' as const },
    { name: 'SaaS', importance: 'medium' as const },
    { name: 'Cloud', importance: 'low' as const }
  ],
  acquisitionReason: 'Technology Acquisition',
  potentialBuyers: [
    { name: 'Microsoft', importance: 'high' as const },
    { name: 'Google', importance: 'medium' as const }
  ],
  shareholderPreference: {
    privateEquity: true,
    peBacked: false,
    strategicTrade: true,
    noPreference: false
  }
};

const ListingDetails: React.FC<ListingDetailsProps> = ({
  id,
  projectTitle,
  status,
}) => {
  const statusColors = {
    active: 'bg-green-50 text-green-700',
    inactive: 'bg-red-50 text-red-700',
    pending: 'bg-yellow-50 text-yellow-700',
  };
  
  const [preferencesOpen, setPreferencesOpen] = React.useState(false);

  const handleOpenPreferencesEditor = () => {
    setPreferencesOpen(true);
  };

  return (
    <div className="animate-fade-in space-y-8 w-full relative">
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-blueknight-800">{projectTitle}</h1>
            </div>
            
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusColors[status]}`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>
          
          {/* Buyer Preferences Summary Section */}
          <div className="mb-6">
            <BuyerPreferencesSection 
              preferences={samplePreferences} 
              onEditPreferences={handleOpenPreferencesEditor}
            />
          </div>
          
          {/* Preferences Dialog - kept for future use if needed */}
          <Dialog open={preferencesOpen} onOpenChange={setPreferencesOpen}>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Buyer Preferences</DialogTitle>
              </DialogHeader>
              <BuyerPreferencesEditor initialPreferences={samplePreferences} />
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
      
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
          <BuyerListNew listingId={id} />
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
