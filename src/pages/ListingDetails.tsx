
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import BuyerList from '../components/buyers/BuyerList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import BuyerPreferencesSection from '../components/listings/BuyerPreferencesSection';
import ListingDetails from '../components/listings/ListingDetails';

const ListingDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Ensure id is available
  if (!id) {
    return <div>Listing ID not found</div>;
  }
  
  const handleCreateBuyerSearch = () => {
    navigate(`/listings/${id}/buyer-search`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1">
          <div className="p-6">
            <div className="mb-4 flex justify-between items-center">
              <Link 
                to="/listings"
                className="text-blueknight-600 hover:text-blueknight-800 text-sm flex items-center"
              >
                ← Back to Projects
              </Link>
              
              <Button 
                onClick={handleCreateBuyerSearch}
                className="bg-blueknight-500 hover:bg-blueknight-600 text-white"
              >
                <Search className="h-4 w-4 mr-2" />
                Create Buyer Search
              </Button>
            </div>
            
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-blueknight-800">Project Details</h1>
            </div>
            
            <Tabs defaultValue="buyers" className="w-full" onValueChange={(value) => {
              if (value === "buyers") navigate(`/listings/${id}`);
              else if (value === "preferences") navigate(`/listings/${id}`);
              else if (value === "details") navigate(`/listings/${id}`);
            }}>
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger 
                  value="buyers" 
                  className="data-[state=active]:bg-[#001437] data-[state=active]:text-white"
                >
                  Buyer List
                </TabsTrigger>
                <TabsTrigger 
                  value="preferences"
                  className="data-[state=active]:bg-[#001437] data-[state=active]:text-white"
                >
                  Buyer Preferences
                </TabsTrigger>
                <TabsTrigger 
                  value="details"
                  className="data-[state=active]:bg-[#001437] data-[state=active]:text-white"
                >
                  Project Details
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="buyers">
                <BuyerList listingId={id} />
              </TabsContent>
              
              <TabsContent value="preferences">
                <BuyerPreferencesSection listingId={id} />
              </TabsContent>
              
              <TabsContent value="details">
                <ListingDetails listingId={id} />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ListingDetailsPage;
