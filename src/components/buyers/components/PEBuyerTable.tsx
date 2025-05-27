
import React from 'react';
import { Table, TableBody } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import BuyerTableHeader from './BuyerTableHeader';
import BuyerTableRow from './BuyerTableRow';

interface PEBuyerTableProps {
  buyers: any[];
  savedBuyers: string[];
  expandedRationales: string[];
  onAddToSaved: (id: string) => void;
  toggleRationale: (buyerId: string) => void;
  showDescription?: boolean;
  listingId?: string;
}

const PEBuyerTable: React.FC<PEBuyerTableProps> = ({
  buyers,
  savedBuyers,
  expandedRationales,
  onAddToSaved,
  toggleRationale,
  showDescription = true,
  listingId
}) => {
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

  // Format PE buyers to match the structure expected by BuyerTableRow
  const formattedBuyers = buyers.map(buyer => {
    // Handle revenue safely - check if it's a string before using split
    let revenueValue = 0;
    if (buyer.revenue) {
      if (typeof buyer.revenue === 'string' && buyer.revenue.includes(' - ')) {
        revenueValue = parseFloat(buyer.revenue.split(' - ')[0]) * 1000000;
      } else if (typeof buyer.revenue === 'number') {
        revenueValue = buyer.revenue;
      }
    }
    
    // Handle EBITDA safely - check if it's a string before using split
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
    
    // Handle employees field safely - ensure it's always a number
    let employeesValue = 0;
    if (buyer.employees) {
      employeesValue = typeof buyer.employees === 'number' ? buyer.employees : 0;
    } else if (buyer.aum) {
      // For PE funds, use AUM as employee count if available
      employeesValue = typeof buyer.aum === 'number' ? buyer.aum : 0;
    }
    
    // Ensure rationale properties are properly formatted for rendering
    let formattedRationale = buyer.rationale;
    if (formattedRationale) {
      // Make sure all nested objects with text/score are properly handled
      const processRationaleField = (field: any) => {
        if (field && typeof field === 'object' && 'text' in field && 'score' in field) {
          return {
            ...field,
            text: field.text?.toString() || '', // Ensure text is a string
          };
        }
        return field;
      };
      
      formattedRationale = {
        ...formattedRationale,
        sectors: processRationaleField(formattedRationale.sectors),
        previousTransactions: processRationaleField(formattedRationale.previousTransactions),
        financialStrength: processRationaleField(formattedRationale.financialStrength),
        overall: processRationaleField(formattedRationale.overall),
      };
    }
    
    return {
      ...buyer,
      hq: buyer.location || buyer.hq || '', // Map location to hq for consistency
      employees: employeesValue, // Ensure this is always a number
      revenue: revenueValue,
      cash: cashValue,
      reportedDate: buyer.reportedDate || new Date().toISOString().substring(0, 10), // Add a placeholder date
      isPEVCBacked: buyer.isPEVCBacked !== undefined ? buyer.isPEVCBacked : true,
      isPublic: buyer.isPublic !== undefined ? buyer.isPublic : false,
      rationale: formattedRationale,
      description: buyer.description || '', // Ensure description is always a string
      maTrackRecord: buyer.maTrackRecord || buyer.ma_track_record || 'N/A', // Handle both field names
    };
  });

  return (
    <div>
      <ScrollArea className="h-[600px] w-full mt-6" orientation="both">
        <div className="min-w-max">
          <Table>
            <BuyerTableHeader />
            <TableBody>
              {formattedBuyers.map((buyer, index) => (
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
    </div>
  );
};

export default PEBuyerTable;
