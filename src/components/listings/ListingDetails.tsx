
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart } from 'lucide-react';
import BuyerListNew from '../buyers/BuyerListNew';
import SavedList from '../buyers/SavedList';
import AIAssistantChat from '../ui/AIAssistantChat';

interface ListingDetailsProps {
  listingId: string;
}

const ListingDetails: React.FC<ListingDetailsProps> = ({ listingId }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Determine which content to show based on the URL path
  const showSavedList = location.pathname.includes('/saved');
  const showCRM = location.pathname.includes('/crm');
  
  // Analytics stats
  const analyticsStats = [
    { 
      label: "Buyer Country Match", 
      value: 13, 
      icon: <PieChart className="h-5 w-5 text-blue-500" /> 
    },
    { 
      label: "Revenue Range Match", 
      value: 8, 
      icon: <PieChart className="h-5 w-5 text-green-500" /> 
    },
    { 
      label: "Industry Match", 
      value: 21, 
      icon: <PieChart className="h-5 w-5 text-purple-500" /> 
    }
  ];

  const handleCreateBuyerSearch = () => {
    navigate(`/buyer-search/${listingId}`);
  };

  return (
    <div className="space-y-8 w-full relative">
      <div className="flex justify-between items-center">
        <Card className="flex-1">
          <CardContent className="py-4 px-6">
            <div className="flex flex-col">
              <div className="grid grid-cols-3 gap-6">
                {analyticsStats.map((stat, index) => (
                  <div key={index} className="flex flex-col items-center bg-gray-50 p-3 rounded-lg">
                    <div className="mb-1">{stat.icon}</div>
                    <span className="text-sm font-medium text-gray-700 mb-1">{stat.label}</span>
                    <span className="text-xl font-bold text-blueknight-600">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Button
          className="ml-4 bg-blueknight-600 hover:bg-blueknight-700"
          onClick={handleCreateBuyerSearch}
        >
          Create Buyer Search
        </Button>
      </div>
      
      {/* Show content based on the current route */}
      {showSavedList ? (
        <SavedList listingId={listingId} />
      ) : showCRM ? (
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-12 text-center">
          <h3 className="text-xl font-medium text-gray-700">CRM Features Coming Soon</h3>
          <p className="text-gray-500 mt-2">
            Our CRM functionality will be available in a future update. Stay tuned for enhanced contacting management tools.
          </p>
        </div>
      ) : (
        <BuyerListNew listingId={listingId} />
      )}
      
      <AIAssistantChat />
    </div>
  );
};

export default ListingDetails;
