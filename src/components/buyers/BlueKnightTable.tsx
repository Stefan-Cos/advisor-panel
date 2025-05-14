
import React, { useState } from 'react';
import { Table, TableBody } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import BuyerTableHeader from './components/BuyerTableHeader';
import BuyerTableRow from './components/BuyerTableRow';
import { Buyer } from './types/BuyerTypes';

interface BlueKnightTableProps {
  buyers: Buyer[];
  savedBuyers: string[];
  expandedRationales: string[];
  onAddToSaved: (id: string) => void;
  toggleRationale: (buyerId: string) => void;
}

const BlueKnightTable: React.FC<BlueKnightTableProps> = ({
  buyers,
  savedBuyers,
  expandedRationales,
  onAddToSaved,
  toggleRationale,
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
  
  return (
    <div>
      <ScrollArea className="h-[600px] w-full mt-6" orientation="both">
        <div className="min-w-max">
          <Table>
            <BuyerTableHeader />
            <TableBody>
              {buyers.map((buyer, index) => (
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

export default BlueKnightTable;
