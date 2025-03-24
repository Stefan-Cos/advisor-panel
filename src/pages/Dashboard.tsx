
import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import ActiveListings from '../components/dashboard/ActiveListings';
import ListingCard from '../components/dashboard/ListingCard';

const Dashboard = () => {
  // Mock data
  const activeListingsCount = 3;
  const recentListings = [
    {
      id: '1',
      title: 'Tech Solutions Enterprise',
      companyName: 'TechCorp Ltd',
      description: 'Leading provider of enterprise technology solutions with strong market presence in North America.',
      type: 'M & A'
    },
    {
      id: '2',
      title: 'MedTech Innovations',
      companyName: 'HealthTech Inc',
      description: 'Innovative medical technology company specializing in diagnostic equipment and software.',
      type: 'M & A'
    },
    {
      id: '3',
      title: 'Global Logistics Systems',
      companyName: 'LogiTech Group',
      description: 'End-to-end logistics management software with global customer base and strong revenue growth.',
      type: 'M & A'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex flex-1">
        <Sidebar />
        
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-blueknight-800">Dashboard</h1>
            
            <Link
              to="/add-listing"
              className="btn-primary flex items-center"
            >
              <Plus className="mr-2 h-5 w-5" />
              Add Listing
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <ActiveListings count={activeListingsCount} month="February" />
            
            <div className="premium-card p-6 animate-scale-in col-span-2">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Stats</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blueknight-50 rounded-lg p-4">
                  <p className="text-sm text-blueknight-600">Total Listings</p>
                  <p className="text-2xl font-bold text-blueknight-800 mt-1">3</p>
                </div>
                
                <div className="bg-blueknight-50 rounded-lg p-4">
                  <p className="text-sm text-blueknight-600">Active Buyers</p>
                  <p className="text-2xl font-bold text-blueknight-800 mt-1">28</p>
                </div>
                
                <div className="bg-blueknight-50 rounded-lg p-4">
                  <p className="text-sm text-blueknight-600">Saved Buyers</p>
                  <p className="text-2xl font-bold text-blueknight-800 mt-1">12</p>
                </div>
              </div>
            </div>
          </div>
          
          <h2 className="text-xl font-semibold text-blueknight-800 mb-6">Recent Listings</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentListings.map((listing) => (
              <ListingCard
                key={listing.id}
                id={listing.id}
                title={listing.title}
                companyName={listing.companyName}
                description={listing.description}
                type={listing.type}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
