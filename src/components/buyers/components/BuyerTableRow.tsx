
import React from 'react';
import { TableCell, TableRow } from "@/components/ui/table";
import { Buyer } from '../types/BuyerTypes';
import SaveButton from './SaveButton';
import MatchScoreCell from './MatchScoreCell';
import CompanyNameCell from './CompanyNameCell';
import MATrackRecordCell from './MATrackRecordCell';
import RationaleCell from './RationaleCell';
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
}

const BuyerTableRow: React.FC<BuyerTableRowProps> = ({
  buyer,
  savedBuyers,
  onAddToSaved,
  isExpanded,
  toggleRationale,
  getMATrackRecordColor,
  isInTop100 = true,
  index
}) => {
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [maRecordSheetOpen, setMARecordSheetOpen] = React.useState(false);
  const transactions: Transaction[] = React.useMemo(() => 
    getMockTransactions(buyer.maTrackRecord || 'Low'), 
    [buyer.maTrackRecord]
  );

  const sampleRationale = getSampleRationale(index);
  const isSaved = savedBuyers.includes(buyer.id);

  return (
    <>
      <TableRow className={`hover:bg-gray-50 text-xs ${isSaved ? 'bg-green-50' : ''}`}>
        {/* Match Score Column */}
        <MatchScoreCell matchingScore={buyer.matchingScore} />
        
        {/* Company Name Column */}
        <CompanyNameCell 
          name={buyer.name} 
          isSaved={isSaved}
          onViewRationale={() => setSheetOpen(true)} 
        />
        
        {/* HQ Column */}
        <TableCell className="text-xs">{buyer.location || buyer.hq}</TableCell>
        
        {/* Employees Column */}
        <TableCell className="text-xs">{buyer.employees.toLocaleString()}</TableCell>
        
        {/* Short Description Column */}
        <TableCell className="text-xs">{buyer.description}</TableCell>
        
        {/* Overall Rationale Column */}
        <RationaleCell 
          sampleRationale={sampleRationale} 
          buyerRationale={buyer.rationale?.overall} 
          isInTop100={isInTop100}
        />
        
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
