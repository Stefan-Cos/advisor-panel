
import React from 'react';
import { Check, ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import BuyerTableHeader from './BuyerTableHeader';
import BuyerTableRationaleRow from './BuyerTableRationaleRow';
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
  showDescription = true // Changed default to true
}) => {
  return (
    <div>
      {/* Always show BlueKnightDescription at the top of the table */}
      {showDescription && <BlueKnightDescription />}
      
      <ScrollArea className="h-[600px] w-full mt-6" orientation="both">
        <div className="min-w-max">
          <Table>
            <TableHeader>
              <TableRow className="bg-blueknight-500">
                <TableHead className="text-white font-medium w-[280px] sticky left-0 z-20 bg-blueknight-500">
                  Fund Name
                </TableHead>
                <TableHead className="text-white font-medium w-[120px]">HQ</TableHead>
                <TableHead className="text-white font-medium w-[200px]">Short Description</TableHead>
                <TableHead className="text-white font-medium w-[180px]">Sectors</TableHead>
                <TableHead className="text-white font-medium w-[250px]">Previous Acquisitions</TableHead>
                <TableHead className="text-white font-medium w-[120px]">Match Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {buyers.map((buyer) => (
                <React.Fragment key={buyer.id}>
                  <TableRow className={`hover:bg-gray-50 ${savedBuyers.includes(buyer.id) ? 'bg-green-50' : ''}`}>
                    <TableCell 
                      className={`font-medium sticky left-0 z-10 ${savedBuyers.includes(buyer.id) ? 'bg-green-50' : 'bg-white'}`}
                    >
                      <div>
                        <div>{buyer.name}</div>
                        <div className="flex items-center mt-1 gap-2">
                          <Collapsible 
                            open={expandedRationales.includes(buyer.id)}
                            onOpenChange={() => toggleRationale(buyer.id)}
                          >
                            <CollapsibleTrigger className="flex items-center px-2 py-1 text-xs font-medium bg-blueknight-50 text-blueknight-500 rounded-md hover:bg-blueknight-100">
                              Rationale
                              {expandedRationales.includes(buyer.id) ? (
                                <ChevronUp className="h-3 w-3 ml-1" />
                              ) : (
                                <ChevronDown className="h-3 w-3 ml-1" />
                              )}
                            </CollapsibleTrigger>
                          </Collapsible>
                          
                          <button
                            onClick={() => onAddToSaved(buyer.id)}
                            disabled={savedBuyers.includes(buyer.id)}
                            className={`flex items-center justify-center p-1 rounded-full ${
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
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{buyer.location}</TableCell>
                    <TableCell>{buyer.description}</TableCell>
                    <TableCell>{buyer.sector}</TableCell>
                    <TableCell>{buyer.previousAcquisitions}</TableCell>
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
                  
                  {expandedRationales.includes(buyer.id) && (
                    <BuyerTableRationaleRow buyer={buyer} type="pe" />
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

export default PEBuyerTable;
