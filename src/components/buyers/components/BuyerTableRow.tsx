
import React from 'react';
import { Check, ChevronDown, ChevronUp, Plus } from 'lucide-react';
import {
  Collapsible,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { TableCell, TableRow } from "@/components/ui/table";

interface BuyerTableRowProps {
  buyer: {
    id: string;
    name: string;
    location: string;
    employees: number;
    description: string;
    offering: string;
    sector: string;
    customers: string;
    maTrackRecord: string;
    matchingScore: number;
  };
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
  return (
    <TableRow className={`hover:bg-gray-50 ${savedBuyers.includes(buyer.id) ? 'bg-green-50' : ''}`}>
      <TableCell 
        className={`font-medium sticky left-0 z-10 ${savedBuyers.includes(buyer.id) ? 'bg-green-50' : 'bg-white'}`}
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
              <Collapsible 
                open={isExpanded}
                onOpenChange={() => toggleRationale(buyer.id)}
              >
                <CollapsibleTrigger className="flex items-center px-2 py-1 text-xs font-medium bg-blueknight-50 text-blueknight-500 rounded-md hover:bg-blueknight-100">
                  Rationale
                  {isExpanded ? (
                    <ChevronUp className="h-3 w-3 ml-1" />
                  ) : (
                    <ChevronDown className="h-3 w-3 ml-1" />
                  )}
                </CollapsibleTrigger>
              </Collapsible>
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>{buyer.location}</TableCell>
      <TableCell>{buyer.employees.toLocaleString()}</TableCell>
      <TableCell>{buyer.description}</TableCell>
      <TableCell>{buyer.offering}</TableCell>
      <TableCell>{buyer.sector}</TableCell>
      <TableCell>{buyer.customers}</TableCell>
      <TableCell>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getMATrackRecordColor(buyer.maTrackRecord)}`}>
          {buyer.maTrackRecord}
        </span>
      </TableCell>
      <TableCell>
        <div className="flex items-center">
          <div className="w-10 bg-gray-200 rounded-full h-2 mr-2">
            <div
              className="bg-blueknight-500 h-2 rounded-full"
              style={{ width: `${buyer.matchingScore}%` }}
            />
          </div>
          <span className="text-sm font-medium text-blueknight-500">{buyer.matchingScore}%</span>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default BuyerTableRow;
