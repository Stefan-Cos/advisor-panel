
import React from 'react';
import { Table, TableBody } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit3, AlertTriangle } from "lucide-react";
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

      {/* Seller Information Panel */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-blue-900">Your Seller Profile</h3>
          <Button
            onClick={handleEditSeller}
            variant="outline"
            size="sm"
            className="text-blue-700 border-blue-300 hover:bg-blue-100"
          >
            <Edit3 className="h-4 w-4 mr-2" />
            Edit Seller Information
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="font-medium text-blue-800">Company:</span>
            <p className="text-blue-700">{sellerInfo.name}</p>
          </div>
          <div>
            <span className="font-medium text-blue-800">Description:</span>
            <p className="text-blue-700">{sellerInfo.description}</p>
          </div>
          <div>
            <span className="font-medium text-blue-800">Offering:</span>
            <p className="text-blue-700">{sellerInfo.offering}</p>
          </div>
          <div>
            <span className="font-medium text-blue-800">Problem Solved:</span>
            <p className="text-blue-700">{sellerInfo.problemSolved}</p>
          </div>
          <div>
            <span className="font-medium text-blue-800">Use Case:</span>
            <p className="text-blue-700">{sellerInfo.useCase}</p>
          </div>
          <div>
            <span className="font-medium text-blue-800">Target Customers:</span>
            <p className="text-blue-700">{sellerInfo.customers}</p>
          </div>
        </div>
        <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded flex items-start">
          <AlertTriangle className="h-4 w-4 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-amber-800">
            <strong>Not seeing the right buyers?</strong> The results are based on your seller information above. 
            Click "Edit Seller Information" to refine your inputs and get better matches.
          </p>
        </div>
      </div>
      
      <ScrollArea className="h-[600px] w-full mt-6" orientation="both">
        <div className="min-w-max">
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
