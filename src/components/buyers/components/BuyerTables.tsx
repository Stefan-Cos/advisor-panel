
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit3, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import BuyerRationale from './BuyerRationale';
import { ScrollArea } from "@/components/ui/scroll-area";
import BuyerTableHeader from './BuyerTableHeader';
import BuyerTableRow from './BuyerTableRow';

interface BuyerTablesProps {
  activeTab: 'strategic' | 'pe';
  buyers: any[]; // Using any as per original code
  companyNameSearch: string;
  setCompanyNameSearch: (value: string) => void;
  expandedRationales: string[];
  savedBuyers: string[];
  toggleRationale: (buyerId: string) => void;
  handleAddToSaved: (buyerId: string) => void;
  listingId?: string;
}

const BuyerTables: React.FC<BuyerTablesProps> = ({
  activeTab,
  buyers,
  companyNameSearch,
  setCompanyNameSearch,
  expandedRationales,
  savedBuyers,
  toggleRationale,
  handleAddToSaved,
  listingId
}) => {
  const navigate = useNavigate();
  const [descriptionPopoverOpen, setDescriptionPopoverOpen] = useState(false);
  const [offeringPopoverOpen, setOfferingPopoverOpen] = useState(false);

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

  // Filter buyers by company name search
  const filteredBuyers = buyers.filter(buyer => {
    if (!companyNameSearch) return true;
    const searchTerm = companyNameSearch.toLowerCase();
    const buyerName = (buyer.name || '').toLowerCase();
    const buyerCompanyName = (buyer.company_name || '').toLowerCase();
    
    return buyerName.includes(searchTerm) || buyerCompanyName.includes(searchTerm);
  });

  // Function to determine color based on M&A track record
  const getMATrackRecordColor = (record: string): string => {
    switch (record.toLowerCase()) {
      case 'high':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-amber-100 text-amber-800';
      case 'low':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Format PE buyers to match the structure expected by BuyerTableRow if needed
  const formattedBuyers = filteredBuyers.map(buyer => {
    if (activeTab === 'pe') {
      // Safely handle revenue
      let revenueValue = 0;
      if (buyer.revenue) {
        if (typeof buyer.revenue === 'string' && buyer.revenue.includes(' - ')) {
          revenueValue = parseFloat(buyer.revenue.split(' - ')[0]) * 1000000;
        } else if (typeof buyer.revenue === 'number') {
          revenueValue = buyer.revenue;
        }
      }
      
      let cashValue = 0;
      if (buyer.ebitda) {
        if (typeof buyer.ebitda === 'string' && buyer.ebitda.includes(' - ')) {
          cashValue = parseFloat(buyer.ebitda.split(' - ')[0]) * 1000000;
        } else if (buyer.cash && typeof buyer.cash === 'number') {
          cashValue = buyer.cash;
        }
      } else if (buyer.cash && typeof buyer.cash === 'number') {
        cashValue = buyer.cash;
      }
      
      return {
        ...buyer,
        hq: buyer.location || buyer.hq, 
        employees: buyer.aum || buyer.employees || 0,
        revenue: revenueValue,
        cash: cashValue,
        reportedDate: buyer.reportedDate || new Date().toISOString().substring(0, 10),
        isPEVCBacked: buyer.isPEVCBacked !== undefined ? buyer.isPEVCBacked : true,
        isPublic: buyer.isPublic !== undefined ? buyer.isPublic : false,
      };
    }
    return buyer;
  });

  return (
    <>
      <div className="mb-4">
        <Input
          placeholder="Search company names..."
          value={companyNameSearch}
          onChange={(e) => setCompanyNameSearch(e.target.value)}
          className="max-w-xs"
        />
      </div>
      
      <ScrollArea className="h-[600px] w-full" orientation="both">
        <div className="min-w-max">
          {/* Seller info popovers above specific columns - only for strategic buyers */}
          {activeTab === 'strategic' && (
            <div className="flex mb-2">
              {/* Empty space for Company Name column */}
              <div className="w-48"></div>
              {/* Empty space for HQ column */}
              <div className="w-32"></div>
              {/* Empty space for Employees column */}
              <div className="w-28"></div>
              
              {/* Your Description popover above Short Description column */}
              <div className="w-64 px-2">
                <Popover open={descriptionPopoverOpen} onOpenChange={setDescriptionPopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-between text-xs h-6 bg-green-50 border-green-200 text-green-800 hover:bg-green-100"
                    >
                      <span>Your Description</span>
                      <Info className="h-3 w-3" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-3" align="start">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-green-800">Your Company Description</h4>
                        <Button
                          onClick={handleEditSeller}
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-green-700 hover:bg-green-100"
                        >
                          <Edit3 className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-sm text-green-700 leading-relaxed">{sellerInfo.description}</p>
                      <div className="pt-2 border-t">
                        <p className="text-xs text-muted-foreground">
                          Compare this with the "Short Description" column to see how well buyers match your company profile.
                        </p>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              
              {/* Your Offering popover above Combined Offering column */}
              <div className="w-80 px-2">
                <Popover open={offeringPopoverOpen} onOpenChange={setOfferingPopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-between text-xs h-6 bg-blue-50 border-blue-200 text-blue-800 hover:bg-blue-100"
                    >
                      <span>Your Offering</span>
                      <Info className="h-3 w-3" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-3" align="start">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-blue-800">Your Company Offering</h4>
                        <Button
                          onClick={handleEditSeller}
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-blue-700 hover:bg-blue-100"
                        >
                          <Edit3 className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-sm text-blue-700 leading-relaxed">{sellerInfo.offering}</p>
                      <div className="pt-2 border-t">
                        <p className="text-xs text-muted-foreground">
                          Compare this with the "Combined Offering" column to see strategic alignment with potential buyers.
                        </p>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          )}
          
          <Table>
            <BuyerTableHeader />
            <TableBody>
              {formattedBuyers.map((buyer, index) => (
                <BuyerTableRow
                  key={buyer.id}
                  buyer={buyer}
                  savedBuyers={savedBuyers}
                  onAddToSaved={handleAddToSaved}
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
      
      {formattedBuyers.length === 0 && companyNameSearch && (
        <div className="text-center py-8 text-gray-500">
          No buyers found matching "{companyNameSearch}"
        </div>
      )}
    </>
  );
};

export default BuyerTables;
