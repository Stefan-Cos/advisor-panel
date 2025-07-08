
import React from 'react';
import { Table, TableBody } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import BuyerTableHeader from './BuyerTableHeader';
import BuyerTableRow from './BuyerTableRow';

interface StrategicBuyerTableProps {
  buyers: any[];
  savedBuyers: string[];
  expandedRationales: string[];
  onAddToSaved: (id: string) => void;
  toggleRationale: (buyerId: string) => void;
  getMATrackRecordColor: (record: string) => string;
  showDescription?: boolean;
  listingId?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}

const StrategicBuyerTable: React.FC<StrategicBuyerTableProps> = ({
  buyers,
  savedBuyers,
  expandedRationales,
  onAddToSaved,
  toggleRationale,
  getMATrackRecordColor,
  showDescription = true,
  listingId,
  searchValue = '',
  onSearchChange
}) => {
  const navigate = useNavigate();

  // Mock seller data - in real app, this would come from the listing/project data
  const sellerInfo = {
    name: "TechFlow Solutions",
    description: "Enterprise software for workflow automation",
    offering: "Cloud-based workflow automation platform with AI-powered analytics",
    problemSolved: "Manual workflow processes causing inefficiency",
    useCase: "Automate business processes, reduce manual work, improve productivity",
    customers: "Mid to large enterprises across various industries"
  };

  const handleEditSeller = () => {
    if (listingId) {
      navigate(`/listings/${listingId}`);
      toast({
        title: "Redirecting to Seller Form",
        description: "Edit your seller information to get better buyer matches."
      });
    } else {
      toast({
        title: "Navigation Error",
        description: "Unable to navigate to seller form. Please try from the listings page.",
        variant: "destructive"
      });
    }
  };

  // Filter buyers by search value
  const filteredBuyers = buyers.filter(buyer => {
    if (!searchValue) return true;
    const searchTerm = searchValue.toLowerCase();
    const buyerName = (buyer.name || '').toLowerCase();
    const buyerCompanyName = (buyer.company_name || '').toLowerCase();
    
    return buyerName.includes(searchTerm) || buyerCompanyName.includes(searchTerm);
  });

  return (
    <div>
      {onSearchChange && (
        <div className="mb-4">
          <Input
            placeholder="Search company names..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="max-w-xs"
          />
        </div>
      )}
      
      <ScrollArea className="h-[600px] w-full mt-6" orientation="both">
        <div className="min-w-max">
          {/* Seller info headers above specific columns */}
          <div className="flex mb-2">
            {/* Empty space for Company Name column */}
            <div className="w-48"></div>
            {/* Empty space for HQ column */}
            <div className="w-32"></div>
            {/* Empty space for Employees column */}
            <div className="w-28"></div>
            
            {/* Seller Description above Short Description column */}
            <div className="w-64 px-2">
              <div className="bg-green-50 border border-green-200 rounded p-2 text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-green-800">Your Description:</span>
                  <Button
                    onClick={handleEditSeller}
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 text-green-700 hover:bg-green-100"
                  >
                    <Edit3 className="h-3 w-3" />
                  </Button>
                </div>
                <p className="text-green-700 leading-tight">{sellerInfo.description}</p>
              </div>
            </div>
            
            {/* Seller Offering above Combined Offering column */}
            <div className="w-80 px-2">
              <div className="bg-blue-50 border border-blue-200 rounded p-2 text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-blue-800">Your Offering:</span>
                  <Button
                    onClick={handleEditSeller}
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 text-blue-700 hover:bg-blue-100"
                  >
                    <Edit3 className="h-3 w-3" />
                  </Button>
                </div>
                <p className="text-blue-700 leading-tight">{sellerInfo.offering}</p>
              </div>
            </div>
          </div>
          
          <Table>
            <BuyerTableHeader />
            <TableBody>
              {filteredBuyers.map((buyer, index) => (
                <BuyerTableRow
                  key={buyer.id}
                  buyer={buyer}
                  savedBuyers={savedBuyers}
                  onAddToSaved={onAddToSaved}
                  isExpanded={expandedRationales.includes(buyer.id)}
                  toggleRationale={toggleRationale}
                  getMATrackRecordColor={getMATrackRecordColor}
                  isInTop100={index < 100}
                  index={index}
                  listingId={listingId}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
      
      {filteredBuyers.length === 0 && searchValue && (
        <div className="text-center py-8 text-gray-500">
          No buyers found matching "{searchValue}"
        </div>
      )}
    </div>
  );
};

export default StrategicBuyerTable;
