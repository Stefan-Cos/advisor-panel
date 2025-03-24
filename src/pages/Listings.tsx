
import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import ListingTable from '../components/listings/ListingTable';

// Mock data
const mockListings = [
  {
    id: '229',
    companyName: 'Stefan Ltd',
    projectTitle: 'Stefan',
    date: '15 June 2024',
    status: 'inactive' as const,
    notifications: 0
  },
  {
    id: '228',
    companyName: 'sdsdvscxz',
    projectTitle: '22esass',
    date: '15 June 2024',
    status: 'inactive' as const,
    notifications: 0
  },
  {
    id: '227',
    companyName: 'jsdsds',
    projectTitle: 'susdsh',
    date: '15 June 2024',
    status: 'inactive' as const,
    notifications: 0
  },
  {
    id: '225',
    companyName: '12345sss',
    projectTitle: 'nosa',
    date: '15 June 2024',
    status: 'inactive' as const,
    notifications: 0
  },
  {
    id: '224',
    companyName: 'exam',
    projectTitle: 'exam',
    date: '15 June 2024',
    status: 'inactive' as const,
    notifications: 0
  }
];

const Listings = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex flex-1">
        <Sidebar />
        
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-blueknight-800">All Listings (10)</h1>
            
            <Link
              to="/add-listing"
              className="btn-primary flex items-center"
            >
              <Plus className="mr-2 h-5 w-5" />
              Add Listing
            </Link>
          </div>
          
          <ListingTable listings={mockListings} />
        </main>
      </div>
    </div>
  );
};

export default Listings;
