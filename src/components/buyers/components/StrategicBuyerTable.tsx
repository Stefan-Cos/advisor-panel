
import React from 'react';
import { Table, TableBody } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import BuyerTableHeader from './BuyerTableHeader';
import BuyerTableRow from './BuyerTableRow';
import BuyerTableRationaleRow from './BuyerTableRationaleRow';

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
              {buyers.map((buyer) => (
                <React.Fragment key={buyer.id}>
                  <BuyerTableRow
                    buyer={buyer}
                    savedBuyers={savedBuyers}
                    onAddToSaved={onAddToSaved}
                    isExpanded={expandedRationales.includes(buyer.id)}
                    toggleRationale={toggleRationale}
                    getMATrackRecordColor={getMATrackRecordColor}
                  />
                  
                  {expandedRationales.includes(buyer.id) && (
                    <BuyerTableRationaleRow buyer={buyer} type="strategic" />
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
    </div>
  );
};

export default StrategicBuyerTable;
