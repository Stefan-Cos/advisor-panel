
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
  const statusColors = {
    active: 'bg-green-50 text-green-700',
    inactive: 'bg-red-50 text-red-700',
    pending: 'bg-yellow-50 text-yellow-700',
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex flex-1">
        <Sidebar />
        
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-blueknight-800">All Projects ({mockListings.length})</h1>
            
            <Link
              to="/add-listing"
              className="btn-primary flex items-center"
            >
              <Plus className="mr-2 h-5 w-5" />
              Add Project
            </Link>
          </div>
          
          <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-blueknight-500">
                  <TableHead className="text-white font-medium">ID</TableHead>
                  <TableHead className="text-white font-medium">Company Name</TableHead>
                  <TableHead className="text-white font-medium">Project Title</TableHead>
                  <TableHead className="text-white font-medium">Date</TableHead>
                  <TableHead className="text-white font-medium">Status</TableHead>
                  <TableHead className="text-white font-medium">Saved Buyers</TableHead>
                  <TableHead className="text-white font-medium">Advisor</TableHead>
                  <TableHead className="text-white font-medium text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockListings.map((listing) => (
                  <TableRow key={listing.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{listing.id}</TableCell>
                    <TableCell>{listing.companyName}</TableCell>
                    <TableCell>{listing.projectTitle}</TableCell>
                    <TableCell>{new Date(listing.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[listing.status]}`}>
                        {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>{listing.savedBuyers}</TableCell>
                    <TableCell>{listing.advisorCreated}</TableCell>
                    <TableCell className="text-right">
                      <Link
                        to={`/listings/${listing.id}`}
                        className="text-blueknight-600 hover:text-blueknight-700 text-sm font-medium"
                      >
                        View Details
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Listings;
