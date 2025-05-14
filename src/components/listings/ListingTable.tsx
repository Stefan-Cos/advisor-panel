
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown } from 'lucide-react';
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
  active: 'bg-green-50 text-green-700',
  inactive: 'bg-red-50 text-red-700',
  pending: 'bg-yellow-50 text-yellow-700',
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
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blueknight-400 focus:border-transparent"
          />
        </div>
        
        <div className="flex space-x-4">
          <button className="px-3 py-2 border border-gray-300 rounded-md bg-white flex items-center space-x-2 text-sm">
            <span>Date</span>
            <ChevronDown className="h-4 w-4" />
          </button>
          
          <button className="px-3 py-2 border border-gray-300 rounded-md bg-white flex items-center space-x-2 text-sm">
            <span>Status</span>
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="bg-white shadow-sm overflow-hidden rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blueknight-500">
            <tr className="hover:bg-blueknight-500">
              <th scope="col" className="table-header text-white font-medium">Company Name</th>
              <th scope="col" className="table-header text-white font-medium">Project Title</th>
              <th scope="col" className="table-header text-white font-medium">Advisor Created</th>
              <th scope="col" className="table-header text-white font-medium text-center">Saved Buyers</th>
              <th scope="col" className="table-header text-white font-medium">Status</th>
              <th scope="col" className="table-header text-white font-medium text-center">Date Created</th>
              <th scope="col" className="table-header text-white font-medium">Notification</th>
              <th scope="col" className="table-header text-white font-medium text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredListings.map((listing) => (
              <tr key={listing.id} className="hover:bg-gray-50">
                <td className="table-cell">{listing.companyName}</td>
                <td className="table-cell">{listing.projectTitle}</td>
                <td className="table-cell">{listing.advisorCreated || 'Admin'}</td>
                <td className="table-cell text-center">{listing.savedBuyers || 0}</td>
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
                    to={`/listings/${listing.id}`}
                    className="px-3 py-1.5 bg-blueknight-500 hover:bg-blueknight-600 text-white rounded-md text-sm font-medium transition-colors inline-block"
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
          <button className="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-500">
            Previous
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-500">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingTable;
