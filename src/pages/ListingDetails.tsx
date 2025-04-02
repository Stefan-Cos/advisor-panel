
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import ListingDetails from '../components/listings/ListingDetails';

const ListingDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  
  // Mock data - in a real app, fetch this based on the ID
  const listingData = {
    id: id || '1',
    projectTitle: 'Enterprise IT Solutions Company',
    revenue: '$10M - $50M',
    industry: 'Technology',
    country: 'United States',
    status: 'active' as const,
    date: '15 June 2024'
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="w-full">
            <ListingDetails {...listingData} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ListingDetailsPage;
