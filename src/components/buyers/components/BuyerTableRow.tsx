
import React from 'react';
import { Check, Plus, ChevronRight } from 'lucide-react';
import { TableCell, TableRow } from "@/components/ui/table";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import BuyerRationale from './BuyerRationale';
import BuyerRationalePanel from './BuyerRationalePanel';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Buyer } from '../types/BuyerTypes';

interface BuyerTableRowProps {
  buyer: Buyer;
  savedBuyers: string[];
  onAddToSaved: (id: string) => void;
  isExpanded: boolean;
  toggleRationale: (buyerId: string) => void;
  getMATrackRecordColor: (record: string) => string;
}

const BuyerTableRow: React.FC<BuyerTableRowProps> = ({
  buyer,
  savedBuyers,
  onAddToSaved,
  isExpanded,
  toggleRationale,
  getMATrackRecordColor
}) => {
  const [sheetOpen, setSheetOpen] = React.useState(false);

  return (
    <>
      <TableRow className={`hover:bg-gray-50 text-xs ${savedBuyers.includes(buyer.id) ? 'bg-green-50' : ''}`}>
        <TableCell 
          className={`font-medium text-xs sticky left-0 z-10 ${savedBuyers.includes(buyer.id) ? 'bg-green-50' : 'bg-white'}`}
          style={{position: 'sticky', left: 0}}
        >
          <div className="flex items-center">
            <button
              onClick={() => onAddToSaved(buyer.id)}
              disabled={savedBuyers.includes(buyer.id)}
              className={`flex items-center justify-center p-1 rounded-full mr-3 self-center ${
                savedBuyers.includes(buyer.id)
                  ? 'bg-green-100 text-green-600 cursor-not-allowed'
                  : 'bg-blueknight-100 text-blueknight-600 hover:bg-blueknight-200'
              }`}
              title={savedBuyers.includes(buyer.id) ? "Already saved" : "Save buyer"}
            >
              {savedBuyers.includes(buyer.id) ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                <Plus className="h-3.5 w-3.5" />
              )}
            </button>
            
            <div>
              <div className="flex items-center gap-2">
                <span>{buyer.name}</span>
              </div>
              <div className="flex items-center mt-1">
                <button 
                  onClick={() => setSheetOpen(true)} 
                  className="inline-flex items-center text-xs text-blueknight-600 hover:underline"
                >
                  View rationale
                  <ChevronRight className="h-3 w-3 ml-0.5" />
                </button>
              </div>
            </div>
          </div>
        </TableCell>
        <TableCell className="text-xs">{buyer.location || buyer.hq}</TableCell>
        <TableCell className="text-xs">{buyer.employees.toLocaleString()}</TableCell>
        <TableCell className="text-xs">{buyer.description}</TableCell>
        <TableCell className="text-xs">{buyer.offering || ''}</TableCell>
        <TableCell className="text-xs">{buyer.sector || (buyer.sectors ? buyer.sectors.join(', ') : '')}</TableCell>
        <TableCell className="text-xs">{buyer.customers || ''}</TableCell>
        <TableCell className="text-xs">
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getMATrackRecordColor(buyer.maTrackRecord || 'N/A')}`}>
            {buyer.maTrackRecord || 'N/A'}
          </span>
        </TableCell>
        <TableCell className="text-xs">
          <div className="flex items-center">
            <div className="w-8 bg-gray-200 rounded-full h-1.5 mr-2">
              <div
                className="bg-blueknight-500 h-1.5 rounded-full"
                style={{ width: `${buyer.matchingScore}%` }}
              />
            </div>
            <span className="text-xs font-medium text-blueknight-500">{buyer.matchingScore}%</span>
          </div>
        </TableCell>
      </TableRow>

      {/* Side Panel for Buyer Rationale - Updated to be wider */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="w-[500px] sm:w-[650px] md:w-[800px] lg:max-w-[1000px] overflow-hidden">
          <SheetHeader>
            <SheetTitle className="flex items-center text-lg font-semibold">
              {buyer.name} - Match Analysis
            </SheetTitle>
            <SheetDescription>
              Detailed analysis of why this buyer may be a good match for your company.
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-140px)] pr-4 mt-6">
            <BuyerRationalePanel buyer={buyer} />
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default BuyerTableRow;
