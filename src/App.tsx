
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Index from './pages/Index';
import Dashboard from './pages/Dashboard';
import AddListing from './pages/AddListing';
import Listings from './pages/Listings';
import ListingDetails from './pages/ListingDetails';
import BuyerPreferences from './pages/BuyerPreferences';
import BuyerMandates from './pages/BuyerMandates';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import DataUpload from './pages/DataUpload';
import { Toaster } from './components/ui/toaster';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-listing" element={<AddListing />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/listings/:id/*" element={<ListingDetails />} />
            <Route path="/buyer-preferences" element={<BuyerPreferences />} />
            <Route path="/buyer-mandates" element={<BuyerMandates />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/data-upload" element={<DataUpload />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
