
import React from 'react';
import { TableCell, TableRow } from "@/components/ui/table";
import { Buyer } from '../types/BuyerTypes';
import SaveButton from './SaveButton';
import MatchScoreCell from './MatchScoreCell';
import CompanyNameCell from './CompanyNameCell';
import MATrackRecordCell from './MATrackRecordCell';
import BuyerRationaleSheet from './BuyerRationaleSheet';
import MATrackRecordPanel from './MATrackRecordPanel';
import { getSampleRationale } from './sampleRationales';
import { getMockTransactions } from './mockTransactions';
import { Transaction } from './types/TransactionTypes';

interface BuyerTableRowProps {
  buyer: Buyer;
  savedBuyers: string[];
  onAddToSaved: (id: string) => void;
  isExpanded: boolean;
  toggleRationale: (buyerId: string) => void;
  getMATrackRecordColor: (record: string) => string;
  isInTop100?: boolean;
  index: number;
  listingId?: string;
}

const BuyerTableRow: React.FC<BuyerTableRowProps> = ({
  buyer,
  savedBuyers,
  onAddToSaved,
  isExpanded,
  toggleRationale,
  getMATrackRecordColor,
  isInTop100 = true,
  index,
  listingId
}) => {
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [maRecordSheetOpen, setMARecordSheetOpen] = React.useState(false);
  const transactions: Transaction[] = React.useMemo(() => 
    getMockTransactions(buyer.maTrackRecord || 'Low'), 
    [buyer.maTrackRecord]
  );

  const sampleRationale = getSampleRationale(index);
  const isSaved = savedBuyers.includes(buyer.id);
  
  // Safely handle employees field
  const getEmployeesDisplay = (employees: any): string => {
    if (employees === null || employees === undefined) return '0';
    if (typeof employees === 'number') return employees.toLocaleString();
    if (typeof employees === 'string') {
      const parsed = parseInt(employees, 10);
      return isNaN(parsed) ? '0' : parsed.toLocaleString();
    }
    return '0';
  };

  // Get combined offering from buyer data
  const getCombinedOffering = (): string => {
    if (buyer.combinedOffering) return buyer.combinedOffering;
    if (buyer.rationale?.overall && typeof buyer.rationale.overall === 'string') {
      return buyer.rationale.overall;
    }
    return 'No offering information available';
  };

  return (
    <>
      <TableRow className={`hover:bg-gray-50 text-xs ${isSaved ? 'bg-green-50' : ''}`}>
        {/* Temporarily hidden Match Score Column */}
        {/* 
        <MatchScoreCell matchingScore={buyer.matchingScore} />
        */}
        
        {/* Company Name Column - now sticky left-0 since match score is hidden */}
        <CompanyNameCell 
          name={buyer.name} 
          isSaved={isSaved}
          onViewRationale={() => setSheetOpen(true)} 
        />
        
        {/* HQ Column */}
        <TableCell className="text-xs">{buyer.location || buyer.hq || 'N/A'}</TableCell>
        
        {/* Employees Column */}
        <TableCell className="text-xs">{getEmployeesDisplay(buyer.employees)}</TableCell>
        
        {/* Short Description Column */}
        <TableCell className="text-xs">{buyer.description || 'N/A'}</TableCell>
        
        {/* Combined Offering Column (replacing Overall Rationale) */}
        <TableCell className="text-xs">
          {isInTop100 ? (
            getCombinedOffering()
          ) : (
            <span className="italic text-gray-400">
              N/A - Combined offering available only for the top 100
            </span>
          )}
        </TableCell>
        
        {/* M&A Track Record Column */}
        <MATrackRecordCell 
          record={buyer.maTrackRecord || 'N/A'} 
          getMATrackRecordColor={getMATrackRecordColor}
          onClick={() => setMARecordSheetOpen(true)}
        />

        {/* Save Button Column */}
        <TableCell className="text-center">
          <SaveButton 
            id={buyer.id}
            name={buyer.name}
            isSaved={savedBuyers.includes(buyer.id)}
            onSave={onAddToSaved}
            listingId={listingId}
            buyerType={buyer.type as 'strategic' | 'pe'}
            buyerData={buyer}
          />
        </TableCell>
      </TableRow>

      {/* Side Panel for Buyer Rationale */}
      <BuyerRationaleSheet
        isOpen={sheetOpen}
        setIsOpen={setSheetOpen}
        buyer={buyer}
      />
      
      {/* Side Panel for M&A Track Record */}
      <MATrackRecordPanel
        isOpen={maRecordSheetOpen}
        setIsOpen={setMARecordSheetOpen}
        buyerName={buyer.name}
        maTrackRecord={buyer.maTrackRecord || 'N/A'}
        transactions={transactions}
        getMATrackRecordColor={getMATrackRecordColor}
      />
    </>
  );
};

export default BuyerTableRow;
