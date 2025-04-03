
import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

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
                Buyer Pitches
              </TabsTrigger>
              <TabsTrigger 
                value="client-opportunities"
                className="data-[state=active]:bg-[#001437] data-[state=active]:text-white"
              >
                Client Opportunities
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="active-projects">
              <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-blueknight-500">
                      <TableHead className="text-white font-medium">ID</TableHead>
                      <TableHead className="text-white font-medium">Company Name</TableHead>
                      <TableHead className="text-white font-medium">Project Title</TableHead>
                      <TableHead className="text-white font-medium">Date</TableHead>
                      <TableHead className="text-white font-medium text-center">Saved Buyers</TableHead>
                      <TableHead className="text-white font-medium">Advisor</TableHead>
                      <TableHead className="text-white font-medium">Seller Form</TableHead>
                      <TableHead className="text-white font-medium text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockListings.map((listing) => (
                      <TableRow key={listing.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{listing.id}</TableCell>
                        <TableCell>{listing.companyName}</TableCell>
                        <TableCell>{listing.projectTitle}</TableCell>
                        <TableCell>{new Date(listing.date).toLocaleDateString()}</TableCell>
                        <TableCell className="text-center">{listing.savedBuyers}</TableCell>
                        <TableCell>{listing.advisorCreated}</TableCell>
                        <TableCell>
                          <Link 
                            to={`/add-listing/edit/${listing.id}`} 
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            Edit
                          </Link>
                        </TableCell>
                        <TableCell className="text-center">
                          <Link
                            to={`/listings/${listing.id}`}
                            className="px-3 py-1.5 bg-blueknight-500 hover:bg-blueknight-600 text-white rounded-md text-sm font-medium transition-colors inline-block"
                          >
                            Create Buyer Search
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="mt-6 flex justify-center">
                <Link
                  to="/add-listing"
                  className="btn-primary flex items-center"
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Add Project
                </Link>
              </div>
            </TabsContent>
            
            <TabsContent value="buyer-pitches">
              <Card className="border border-gray-200 shadow-sm">
                <CardContent className="flex flex-col items-center justify-center p-12">
                  <Badge variant="secondary" className="mb-4 bg-blueknight-100 text-blueknight-700 border border-blueknight-200">
                    Coming Soon
                  </Badge>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Buyer Pitches</h3>
                  <p className="text-gray-600 text-center max-w-md mb-6">
                    Prepare for future projects by finding potential buyers before your client is ready to list their business.
                  </p>
                  <div className="h-48 w-full max-w-md relative opacity-80">
                    <img
                      src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80"
                      alt="Pitch Search"
                      className="w-full h-full object-cover rounded-lg filter grayscale-[30%]"
                    />
                    <div className="absolute inset-0 bg-blueknight-800/20 rounded-lg"></div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="client-opportunities">
              <Card className="border border-gray-200 shadow-sm">
                <CardContent className="flex flex-col items-center justify-center p-12">
                  <Badge variant="secondary" className="mb-4 bg-blueknight-100 text-blueknight-700 border border-blueknight-200">
                    Coming Soon
                  </Badge>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Client Opportunities</h3>
                  <p className="text-gray-600 text-center max-w-md mb-6">
                    Discover potential clients looking to sell their businesses through our AI-powered matching system.
                  </p>
                  <div className="h-48 w-full max-w-md relative opacity-80">
                    <img
                      src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80"
                      alt="Find New Clients"
                      className="w-full h-full object-cover rounded-lg filter grayscale-[30%]"
                    />
                    <div className="absolute inset-0 bg-blueknight-800/20 rounded-lg"></div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Listings;
