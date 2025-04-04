
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BuyerListNew from '../buyers/BuyerListNew';
import SavedList from '../buyers/SavedList';
import AIAssistantChat from '../ui/AIAssistantChat';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PieChart } from 'lucide-react';

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

const ListingDetails: React.FC<ListingDetailsProps> = ({
  id,
  projectTitle,
  revenue,
  industry,
  country,
  status,
}) => {
  const statusColors = {
    active: 'bg-green-50 text-green-700',
    inactive: 'bg-red-50 text-red-700',
    pending: 'bg-yellow-50 text-yellow-700',
  };

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

  return (
    <div className="space-y-8 w-full relative">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusColors[status]}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
            </div>
            
            <div className="grid grid-cols-3 gap-6">
              {analyticsStats.map((stat, index) => (
                <div key={index} className="flex flex-col items-center bg-gray-50 p-4 rounded-lg">
                  <div className="mb-2">{stat.icon}</div>
                  <span className="text-sm font-medium text-gray-700 mb-1">{stat.label}</span>
                  <span className="text-xl font-bold text-blueknight-600">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
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
              Our CRM functionality will be available in a future update. Stay tuned for enhanced contacting management tools.
            </p>
          </div>
        </TabsContent>
      </Tabs>
      
      <AIAssistantChat />
    </div>
  );
};

export default ListingDetails;
