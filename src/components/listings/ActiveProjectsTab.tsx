
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, PencilLine } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Listing {
  id: string;
  companyName: string;
  projectTitle: string;
  date: string;
  status: 'active' | 'inactive' | 'pending';
  notifications: number;
  savedBuyers: number;
  advisorCreated: string;
}

interface ActiveProjectsTabProps {
  listings: Listing[];
}

const ActiveProjectsTab: React.FC<ActiveProjectsTabProps> = ({ listings }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();
  
  // Calculate total pages
  const totalPages = Math.ceil(listings.length / itemsPerPage);
  
  // Get current page items
  const currentItems = listings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCreateBuyerSearch = (listingId: string) => {
    navigate(`/buyer-search/${listingId}`);
  };

  return (
    <>
      <div className="flex justify-start mb-4">
        <Link
          to="/add-listing"
          className="btn-primary flex items-center bg-blueknight-500 hover:bg-blueknight-600 text-white px-4 py-2 rounded-md transition-colors"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add Project
        </Link>
      </div>
      
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-blueknight-500">
              <TableHead className="text-white font-medium">Company Name</TableHead>
              <TableHead className="text-white font-medium">Project Title</TableHead>
              <TableHead className="text-white font-medium text-center">Date</TableHead>
              <TableHead className="text-white font-medium text-center">Saved Buyers</TableHead>
              <TableHead className="text-white font-medium">Advisor</TableHead>
              <TableHead className="text-white font-medium text-center">Project Form</TableHead>
              <TableHead className="text-white font-medium text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((listing) => (
              <TableRow key={listing.id} className="hover:bg-gray-50">
                <TableCell>{listing.companyName}</TableCell>
                <TableCell>{listing.projectTitle}</TableCell>
                <TableCell className="text-center">{new Date(listing.date).toLocaleDateString()}</TableCell>
                <TableCell className="text-center">{listing.savedBuyers}</TableCell>
                <TableCell>{listing.advisorCreated}</TableCell>
                <TableCell className="text-center">
                  <Link 
                    to={`/add-listing/edit/${listing.id}`} 
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center justify-center gap-1.5"
                  >
                    <PencilLine className="h-4 w-4" />
                    Edit
                  </Link>
                </TableCell>
                <TableCell className="text-center">
                  <button
                    onClick={() => handleCreateBuyerSearch(listing.id)}
                    className="px-3 py-1.5 bg-blueknight-500 hover:bg-blueknight-600 text-white rounded-md text-sm font-medium transition-colors"
                  >
                    Create Buyer Search
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {/* Pagination */}
        <div className="p-4 border-t border-gray-200">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }).map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink 
                    isActive={currentPage === i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </>
  );
};

export default ActiveProjectsTab;
