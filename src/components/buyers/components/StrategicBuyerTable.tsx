
import React from 'react';
import { Table, TableBody } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import BuyerTableHeader from './BuyerTableHeader';
import BuyerTableRow from './BuyerTableRow';

interface StrategicBuyerTableProps {
  buyers: any[];
  savedBuyers: string[];
  expandedRationales: string[];
  onAddToSaved: (id: string) => void;
  toggleRationale: (id: string) => void;
  getMATrackRecordColor: (record: string) => string;
}

const StrategicBuyerTable: React.FC<StrategicBuyerTableProps> = ({
  buyers,
  savedBuyers,
  expandedRationales,
  onAddToSaved,
  toggleRationale,
  getMATrackRecordColor
}) => {
  return (
    <div className="relative overflow-hidden">
      <ScrollArea className="h-[600px] w-full" orientation="both">
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
                  isInTop100={index < 100} // Only the first 100 rows are considered top 100
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
    </div>
  );
};

export default StrategicBuyerTable;
