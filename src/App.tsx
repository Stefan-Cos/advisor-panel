
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import AddListing from "./pages/AddListing";
import BuyerPreferences from "./pages/BuyerPreferences";
import Listings from "./pages/Listings";
import ListingDetails from "./pages/ListingDetails";
import BuyerMandates from "./pages/BuyerMandates";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-listing" element={<AddListing />} />
          <Route path="/add-listing/buyer-preferences" element={<BuyerPreferences />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/listings/:id" element={<ListingDetails />} />
          <Route path="/listings/:id/ai-buyer" element={<ListingDetails />} />
          <Route path="/listings/:id/saved" element={<ListingDetails />} />
          <Route path="/listings/:id/crm" element={<ListingDetails />} />
          <Route path="/buyer-mandates" element={<BuyerMandates />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
