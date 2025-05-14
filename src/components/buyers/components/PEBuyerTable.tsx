
import React from 'react';
import { Table, TableBody } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import BuyerTableHeader from './BuyerTableHeader';
import BuyerTableRow from './BuyerTableRow';
import BlueKnightDescription from '@/components/listings/BlueKnightDescription';

interface PEBuyerTableProps {
  buyers: any[];
  savedBuyers: string[];
  expandedRationales: string[];
  onAddToSaved: (id: string) => void;
  toggleRationale: (id: string) => void;
  showDescription?: boolean;
}

const PEBuyerTable: React.FC<PEBuyerTableProps> = ({ 
  buyers, 
  savedBuyers, 
  expandedRationales, 
  onAddToSaved, 
  toggleRationale,
  showDescription = false
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

  // Convert PE buyers format to match the structure expected by BuyerTableRow
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
    
    // Similarly handle EBITDA safely
    let ebitdaValue = 0;
    if (buyer.ebitda) {
      if (typeof buyer.ebitda === 'string' && buyer.ebitda.includes(' - ')) {
        ebitdaValue = parseFloat(buyer.ebitda.split(' - ')[0]) * 1000000;
      } else if (typeof buyer.ebitda === 'number') {
        ebitdaValue = buyer.ebitda;
      }
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
      hq: buyer.location || buyer.hq, // Map location to hq for consistency
      employees: buyer.aum || buyer.employees || 0, // Use AUM as employee count for PE funds
      revenue: revenueValue,
      cash: ebitdaValue,
      reportedDate: buyer.reportedDate || new Date().toISOString().substring(0, 10), // Add a placeholder date
      isPEVCBacked: buyer.isPEVCBacked !== undefined ? buyer.isPEVCBacked : true,
      isPublic: buyer.isPublic !== undefined ? buyer.isPublic : false,
      rationale: formattedRationale,
    };
  });

  return (
    <div>
      {/* Only show BlueKnightDescription if showDescription is true */}
      {showDescription && <BlueKnightDescription />}
      
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
