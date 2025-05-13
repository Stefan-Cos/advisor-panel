
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Navbar from '../components/layout/Navbar';
import BuyerList from '../components/buyers/BuyerList';
import SavedList from '../components/buyers/SavedList';
import FilterPanel from '../components/buyers/components/FilterPanel';

const BuyerSearch = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  const handleCRMClick = () => {
    toast({
      title: "CRM Features Coming Soon",
      description: "This feature is coming soon. Let us know if you'd like early access.",
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="p-6 bg-white border-b border-gray-200">
        <Link 
          to={`/listings/${id}`}
          className="flex items-center text-blueknight-600 hover:text-blueknight-800 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Project
        </Link>
        
        <h1 className="text-2xl font-bold text-blueknight-800">Buyer Search Workspace</h1>
      </div>
      
      <div className="flex-1 flex">
        <FilterPanel />
        
        <main className="flex-1 p-6">
          <Tabs defaultValue="buyer-list" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger 
                value="buyer-list" 
                className="data-[state=active]:bg-[#001437] data-[state=active]:text-white"
              >
                BlueKnight's Buyer List
              </TabsTrigger>
              <TabsTrigger 
                value="ai-finder"
                className="data-[state=active]:bg-[#001437] data-[state=active]:text-white"
              >
                AI Buyer Finder
              </TabsTrigger>
              <TabsTrigger 
                value="saved-list"
                className="data-[state=active]:bg-[#001437] data-[state=active]:text-white"
              >
                Saved List
              </TabsTrigger>
              <TabsTrigger 
                value="crm"
                className="data-[state=active]:bg-[#001437] data-[state=active]:text-white"
                onClick={handleCRMClick}
              >
                CRM <Badge variant="outline" className="ml-2 bg-gray-100 text-gray-600">Coming Soon</Badge>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="buyer-list">
              <BuyerList listingId={id || ""} />
            </TabsContent>
            
            <TabsContent value="ai-finder">
              <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-12 text-center">
                <h3 className="text-xl font-medium text-gray-700">AI Buyer Finder</h3>
                <p className="text-gray-500 mt-2">
                  Use our advanced AI to find potential buyers based on your project criteria.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="saved-list">
              <SavedList listingId={id || ""} />
            </TabsContent>
            
            <TabsContent value="crm">
              <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-12 text-center">
                <h3 className="text-xl font-medium text-gray-700">CRM Features Coming Soon</h3>
                <p className="text-gray-500 mt-2">
                  Our CRM functionality will be available in a future update. Let us know if you'd like early access.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default BuyerSearch;
