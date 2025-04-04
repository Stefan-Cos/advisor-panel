
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, User, Bell } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const { toast } = useToast();
  const location = useLocation();
  
  // Check if we're on a listing details page
  const isListingDetailsPage = location.pathname.includes('/listings/') && /\/listings\/\d+/.test(location.pathname);
  
  // Extract listing ID from path if we're on a listing details page
  const listingId = isListingDetailsPage ? location.pathname.split('/').pop() : null;
  
  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: "Notification features coming soon",
    });
  };

  return (
    <nav className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between animate-fade-in">
      <div className="flex items-center">
        <Link to="/dashboard" className="flex items-center">
          <div className="w-10 h-10 bg-blueknight-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">B</div>
          <span className="text-xl font-semibold text-blueknight-500">BlueKnight</span>
        </Link>
        <h1 className="ml-8 text-xl font-medium">Welcome John Doe</h1>
      </div>
      
      {/* Removed company name/deal analytics section */}
      <div className="flex-1"></div>
      
      <div className="flex items-center space-x-4">
        <button 
          onClick={handleNotificationClick}
          className="relative p-2 rounded-full text-gray-500 hover:bg-gray-100 transition duration-150"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
        </button>
        
        <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center">
          <User className="h-5 w-5 text-gray-500" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
