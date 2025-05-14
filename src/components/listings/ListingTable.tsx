
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, PencilLine } from 'lucide-react';
import { format } from 'date-fns';

interface Listing {
  id: string;
  companyName: string;
  projectTitle: string;
  date: string;
  status: 'active' | 'inactive' | 'pending';
  notifications: number;
  savedBuyers?: number;
  advisorCreated?: string;
}

interface ListingTableProps {
  listings: Listing[];
}

const statusColors = {
  active: 'bg-green-100 text-green-700',
  inactive: 'bg-red-100 text-red-700',
  pending: 'bg-yellow-100 text-yellow-700',
};

const ListingTable: React.FC<ListingTableProps> = ({ listings }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredListings = listings.filter(listing => 
    listing.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    listing.projectTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format the date string to DD/MM/YYYY
  const formatDateString = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'dd/MM/yyyy');
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString; // Return original if can't parse
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex items-center justify-between">
        <div className="relative w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search Seller"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blueknight-400 focus:border-transparent shadow-sm"
          />
        </div>
        
        <div className="flex space-x-4">
          <button className="px-3 py-2 border border-gray-300 rounded-md bg-white/80 flex items-center space-x-2 text-sm shadow-sm hover:shadow transition-shadow duration-200">
            <span>Date</span>
            <ChevronDown className="h-4 w-4" />
          </button>
          
          <button className="px-3 py-2 border border-gray-300 rounded-md bg-white/80 flex items-center space-x-2 text-sm shadow-sm hover:shadow transition-shadow duration-200">
            <span>Status</span>
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="bg-white/80 backdrop-blur-sm shadow-md overflow-hidden rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-blueknight-600 to-blue-700">
            <tr className="hover:bg-blueknight-500">
              <th scope="col" className="table-header text-white font-medium">Company Name</th>
              <th scope="col" className="table-header text-white font-medium">Project Title</th>
              <th scope="col" className="table-header text-white font-medium">Advisor Created</th>
              <th scope="col" className="table-header text-white font-medium text-center">Saved Buyers</th>
              <th scope="col" className="table-header text-white font-medium">Status</th>
              <th scope="col" className="table-header text-white font-medium text-center">Date Created</th>
              <th scope="col" className="table-header text-white font-medium">Notification</th>
              <th scope="col" className="table-header text-white font-medium text-center">Project Form</th>
              <th scope="col" className="table-header text-white font-medium text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white/80 divide-y divide-gray-200">
            {filteredListings.map((listing) => (
              <tr key={listing.id} className="hover:bg-gray-50/80 transition-colors duration-200">
                <td className="table-cell">{listing.companyName}</td>
                <td className="table-cell">{listing.projectTitle}</td>
                <td className="table-cell">{listing.advisorCreated || 'Admin'}</td>
                <td className="table-cell text-center">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800 font-medium text-xs">
                    {listing.savedBuyers || 0}
                  </span>
                </td>
                <td className="table-cell">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[listing.status]}`}>
                    {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                  </span>
                </td>
                <td className="table-cell text-center">{formatDateString(listing.date)}</td>
                <td className="table-cell">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-200 text-xs">
                    {listing.notifications}
                  </span>
                </td>
                <td className="table-cell text-center">
                  <Link 
                    to={`/add-listing/edit/${listing.id}`} 
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center justify-center gap-1.5"
                  >
                    <PencilLine className="h-4 w-4" />
                    Edit
                  </Link>
                </td>
                <td className="table-cell text-center">
                  <Link
                    to={`/listings/${listing.id}`}
                    className="px-3 py-1.5 bg-gradient-to-r from-blueknight-500 to-blue-500 hover:from-blueknight-600 hover:to-blue-600 text-white rounded-md text-sm font-medium transition-colors inline-block shadow-sm hover:shadow-md"
                  >
                    Create Buyer Search
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredListings.length === 0 && (
          <div className="py-10 text-center">
            <p className="text-gray-500">No listings found</p>
          </div>
        )}
      </div>
      
      <div className="mt-4 flex items-center justify-between text-sm">
        <p className="text-gray-500">Page 1 of 1</p>
        
        <div className="flex space-x-2">
          <button className="px-3 py-1 border border-gray-300 rounded-md bg-white/80 text-gray-500 shadow-sm hover:shadow transition-shadow duration-200">
            Previous
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md bg-white/80 text-gray-500 shadow-sm hover:shadow transition-shadow duration-200">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingTable;
