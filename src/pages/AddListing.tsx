
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import ListingForm from '../components/forms/ListingForm';

const AddListing = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex flex-1">
        <Sidebar />
        
        <main className="flex-1 p-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold text-blueknight-800 mb-2">Add New Listing</h1>
            <p className="text-gray-600 mb-8">Enter basic company information to create a new listing</p>
            
            <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
              <ListingForm />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddListing;
