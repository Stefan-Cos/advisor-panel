
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  
  // Calculate total pages
  const totalPages = Math.ceil(listings.length / itemsPerPage);
  
  // Get current page items
  const currentItems = listings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div className="flex justify-start mb-4">
        <Link
          to="/add-listing"
          className="flex items-center bg-blueknight-500 hover:bg-blueknight-600 text-white px-4 py-2 rounded-md transition-colors shadow-md"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add Project
        </Link>
      </div>
      
      <div className="bg-white shadow-md rounded-lg border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-blueknight-500">
              <TableHead className="text-white font-medium">Company Name</TableHead>
              <TableHead className="text-white font-medium">Project Title</TableHead>
              <TableHead className="text-white font-medium text-center">Date Created</TableHead>
              <TableHead className="text-white font-medium text-center">Saved Buyers</TableHead>
              <TableHead className="text-white font-medium text-center">Actions</TableHead>
              <TableHead className="text-white font-medium text-center">Project Form</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((listing) => (
              <TableRow key={listing.id} className="hover:bg-gray-50/80 transition-colors duration-150">
                <TableCell className="font-medium">{listing.companyName}</TableCell>
                <TableCell>{listing.projectTitle}</TableCell>
                <TableCell className="text-center">{new Date(listing.date).toLocaleDateString()}</TableCell>
                <TableCell className="text-center">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blueknight-500 font-medium text-xs">
                    {listing.savedBuyers}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <Link
                    to={`/listings/${listing.id}`}
                    className="px-3 py-1.5 bg-blueknight-500 hover:bg-blueknight-600 text-white rounded-md text-sm font-medium transition-colors inline-block shadow-sm"
                  >
                    Create Buyer Search
                  </Link>
                </TableCell>
                <TableCell className="text-center">
                  <Link 
                    to={`/add-listing/edit/${listing.id}`} 
                    className="text-blueknight-500 hover:text-blueknight-600 text-sm font-medium flex items-center justify-center gap-1.5"
                  >
                    <PencilLine className="h-4 w-4" />
                    Edit
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {/* Pagination */}
        <div className="p-4 border-t border-gray-200 bg-gray-50/50">
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
                    className="data-[active=true]:bg-blueknight-500"
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
