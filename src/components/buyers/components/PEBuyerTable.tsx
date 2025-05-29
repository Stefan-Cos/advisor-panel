
import React from 'react';
import { Table, TableBody } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
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
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}

const PEBuyerTable: React.FC<PEBuyerTableProps> = ({
  buyers,
  savedBuyers,
  expandedRationales,
  onAddToSaved,
  toggleRationale,
  showDescription = true,
  listingId,
  searchValue = '',
  onSearchChange
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
    
    let employeesValue = 0;
    if (buyer.employees) {
      employeesValue = typeof buyer.employees === 'number' ? buyer.employees : 0;
    } else if (buyer.aum) {
      employeesValue = typeof buyer.aum === 'number' ? buyer.aum : 0;
    }
    
    let formattedRationale = buyer.rationale;
    if (formattedRationale) {
      const processRationaleField = (field: any) => {
        if (field && typeof field === 'object' && 'text' in field && 'score' in field) {
          return {
            ...field,
            text: field.text?.toString() || '',
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
      hq: buyer.location || buyer.hq || '',
      employees: employeesValue,
      revenue: revenueValue,
      cash: cashValue,
      reportedDate: buyer.reportedDate || new Date().toISOString().substring(0, 10),
      isPEVCBacked: buyer.isPEVCBacked !== undefined ? buyer.isPEVCBacked : true,
      isPublic: buyer.isPublic !== undefined ? buyer.isPublic : false,
      rationale: formattedRationale,
      description: buyer.description || '',
      maTrackRecord: buyer.maTrackRecord || buyer.ma_track_record || 'N/A',
    };
  });

  // Filter buyers by search value
  const filteredBuyers = formattedBuyers.filter(buyer => {
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

export default PEBuyerTable;
