
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ActiveProjectsTab from '../components/listings/ActiveProjectsTab';
import ComingSoonTab from '../components/listings/ComingSoonTab';

// Mock data
const mockListings = [
  {
    id: '229',
    companyName: 'Stefan Ltd',
    projectTitle: 'Stefan',
    date: '2024-06-15',
    status: 'inactive' as const,
    notifications: 0,
    savedBuyers: 3,
    advisorCreated: 'John Smith'
  },
  {
    id: '228',
    companyName: 'sdsdvscxz',
    projectTitle: '22esass',
    date: '2024-06-15',
    status: 'inactive' as const,
    notifications: 0,
    savedBuyers: 0,
    advisorCreated: 'Jane Doe'
  },
  {
    id: '227',
    companyName: 'jsdsds',
    projectTitle: 'susdsh',
    date: '2024-06-15',
    status: 'inactive' as const,
    notifications: 0,
    savedBuyers: 2,
    advisorCreated: 'Adam Johnson'
  },
  {
    id: '225',
    companyName: '12345sss',
    projectTitle: 'nosa',
    date: '2024-06-15',
    status: 'inactive' as const,
    notifications: 0,
    savedBuyers: 0,
    advisorCreated: 'Sarah Williams'
  },
  {
    id: '224',
    companyName: 'exam',
    projectTitle: 'exam',
    date: '2024-06-15',
    status: 'inactive' as const,
    notifications: 0,
    savedBuyers: 1,
    advisorCreated: 'Michael Brown'
  }
];

const Listings = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col neural-bg">
      <Navbar />
      
      <div className="flex flex-1">
        <Sidebar />
        
        <main className="flex-1 p-6">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blueknight-700 to-blue-500">All Projects ({mockListings.length})</h1>
          </div>
          
          <div className="relative mb-6 mt-2">
            <div className="absolute inset-0 bg-blue-500 rounded-full filter blur-3xl opacity-5"></div>
          </div>
          
          <Tabs defaultValue="active-projects" className="w-full mt-6 animate-fade-in">
            <TabsList className="grid w-full grid-cols-3 mb-6 overflow-hidden rounded-lg shadow-md">
              <TabsTrigger 
                value="active-projects" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blueknight-600 data-[state=active]:to-blue-700 data-[state=active]:text-white py-3"
              >
                Active Projects
              </TabsTrigger>
              <TabsTrigger 
                value="buyer-pitches"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blueknight-600 data-[state=active]:to-blue-700 data-[state=active]:text-white py-3"
              >
                Pitch Support
              </TabsTrigger>
              <TabsTrigger 
                value="client-opportunities"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blueknight-600 data-[state=active]:to-blue-700 data-[state=active]:text-white py-3"
              >
                Source New Mandates
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="active-projects" className="animate-fade-in">
              <ActiveProjectsTab listings={mockListings} />
            </TabsContent>
            
            <TabsContent value="buyer-pitches">
              <ComingSoonTab 
                title="Pitch Support"
                description="Win new clients faster by showing them relevant buyers during your pitch."
                imageUrl="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80"
              />
            </TabsContent>
            
            <TabsContent value="client-opportunities">
              <ComingSoonTab 
                title="Source New Mandates"
                description="Discover potential clients looking to sell their businesses through our AI-powered matching system."
                imageUrl="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80"
              />
            </TabsContent>
          </Tabs>
          
          {/* AI-themed decorative elements */}
          <div className="absolute bottom-5 right-5 w-2 h-2 rounded-full bg-blue-300 animate-pulse opacity-70"></div>
          <div className="absolute bottom-10 right-10 w-3 h-3 rounded-full bg-blue-400 animate-pulse opacity-50"></div>
        </main>
      </div>
    </div>
  );
};

export default Listings;
