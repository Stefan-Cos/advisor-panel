
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
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
}

const BuyerTables: React.FC<BuyerTablesProps> = ({
  activeTab,
  buyers,
  companyNameSearch,
  setCompanyNameSearch,
  expandedRationales,
  savedBuyers,
  toggleRationale,
  handleAddToSaved
}) => {
  const filteredBuyers = buyers.filter(buyer => 
    buyer.name.toLowerCase().includes(companyNameSearch.toLowerCase())
  );

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
      return {
        ...buyer,
        hq: buyer.location || buyer.hq, 
        employees: buyer.aum || buyer.employees || 0,
        revenue: typeof buyer.revenue === 'string' ? parseFloat(buyer.revenue.split(' - ')[0]) * 1000000 : buyer.revenue || 0,
        cash: typeof buyer.ebitda === 'string' ? parseFloat(buyer.ebitda.split(' - ')[0]) * 1000000 : buyer.cash || 0,
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
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
    </>
  );
};

export default BuyerTables;
