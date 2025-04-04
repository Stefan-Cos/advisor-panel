
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex flex-1">
        <Sidebar />
        
        <main className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-blueknight-800">All Projects ({mockListings.length})</h1>
          </div>
          
          <Tabs defaultValue="active-projects" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger 
                value="active-projects" 
                className="data-[state=active]:bg-[#001437] data-[state=active]:text-white"
              >
                Active Projects
              </TabsTrigger>
              <TabsTrigger 
                value="buyer-pitches"
                className="data-[state=active]:bg-[#001437] data-[state=active]:text-white"
              >
                Pitch Support
              </TabsTrigger>
              <TabsTrigger 
                value="client-opportunities"
                className="data-[state=active]:bg-[#001437] data-[state=active]:text-white"
              >
                Source New Mandates
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="active-projects">
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
        </main>
      </div>
    </div>
  );
};

export default Listings;
