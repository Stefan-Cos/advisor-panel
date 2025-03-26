
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import BuyerPreferencesForm from '../components/forms/BuyerPreferencesForm';

const BuyerPreferences = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 p-6 overflow-x-auto">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold text-blueknight-800 mb-2">Buyer Preferences</h1>
            <p className="text-gray-600 mb-8">Define buyer preferences for company names, offerings, sectors, and customer types.</p>
            
            <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
              <BuyerPreferencesForm />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BuyerPreferences;
