
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft } from 'lucide-react';
import BuyerList from '../components/buyers/BuyerList';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import FilterSidebar from '../components/buyers/components/FilterSidebar';

const BuyerSearch = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  const handleFilterChange = (filters: any) => {
    console.log('Filters changed:', filters);
  };
  
  const handleCRMClick = () => {
    toast({
      title: "CRM Features",
      description: "This feature is coming soon. Let us know if you'd like early access.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex">
        {/* Sticky Filter Sidebar */}
        <div className="sticky top-16 h-[calc(100vh-4rem)] z-10">
          <FilterSidebar onFilterChange={handleFilterChange} />
        </div>
        
        <main className="flex-1">
          <div className="p-6">
            <div className="mb-4">
              <Link 
                to={`/listings/${id}`}
                className="text-blueknight-600 hover:text-blueknight-800 text-sm flex items-center"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Project
              </Link>
            </div>
            
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-blueknight-800">Buyer Search Workspace</h1>
            </div>
            
            <Tabs defaultValue="buyerList" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger 
                  value="buyerList" 
                  className="data-[state=active]:bg-[#001437] data-[state=active]:text-white"
                >
                  BlueKnight's Buyer List
                </TabsTrigger>
                <TabsTrigger 
                  value="aiBuyerFinder"
                  className="data-[state=active]:bg-[#001437] data-[state=active]:text-white"
                >
                  AI Buyer Finder
                </TabsTrigger>
                <TabsTrigger 
                  value="savedList"
                  className="data-[state=active]:bg-[#001437] data-[state=active]:text-white"
                >
                  Saved List
                </TabsTrigger>
                <TabsTrigger 
                  value="crm"
                  className="data-[state=active]:bg-[#001437] data-[state=active]:text-white"
                  onClick={handleCRMClick}
                >
                  CRM <Badge variant="outline" className="ml-2 bg-gray-200 text-gray-600">Coming Soon</Badge>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="buyerList">
                <BuyerList listingId={id || ''} />
              </TabsContent>
              
              <TabsContent value="aiBuyerFinder">
                <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-12 text-center">
                  <h3 className="text-xl font-medium text-gray-700">AI Buyer Finder</h3>
                  <p className="text-gray-500 mt-2">
                    Use AI to discover potential buyers for your project based on your preferences.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="savedList">
                <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-12 text-center">
                  <h3 className="text-xl font-medium text-gray-700">Saved Buyers</h3>
                  <p className="text-gray-500 mt-2">
                    View and manage your saved potential buyers for this project.
                  </p>
                </div>
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
          </div>
        </main>
      </div>
    </div>
  );
};

export default BuyerSearch;
