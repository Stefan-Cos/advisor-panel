
import React from 'react';
import { Check, ChevronRight, History } from 'lucide-react';
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
  isInTop100?: boolean;
}

// Mock transaction data for M&A track record
interface Transaction {
  id: string;
  name: string;
  date: string;
  type: string;
  amount: string;
  description: string;
}

const getMockTransactions = (record: string): Transaction[] => {
  if (record === 'High') {
    return [
      {
        id: '1',
        name: 'Acquisition of MedTech Solutions',
        date: 'March 2024',
        type: 'Full Acquisition',
        amount: '$120M',
        description: 'Acquired to expand healthcare technology portfolio and enter the clinical trials market.'
      },
      {
        id: '2',
        name: 'Merger with DataHealth Inc',
        date: 'November 2023',
        type: 'Merger',
        amount: '$85M',
        description: 'Strategic merger to combine data analytics capabilities with healthcare expertise.'
      },
      {
        id: '3',
        name: 'HealthAI Platform Acquisition',
        date: 'May 2023',
        type: 'Full Acquisition',
        amount: '$65M',
        description: 'Acquired AI-powered healthcare platform to enhance product offerings.'
      }
    ];
  } else if (record === 'Medium') {
    return [
      {
        id: '1',
        name: 'Partial Acquisition of BioData Systems',
        date: 'January 2024',
        type: 'Partial Acquisition',
        amount: '$42M',
        description: 'Acquired 40% stake to gain access to biotech data processing technology.'
      },
      {
        id: '2',
        name: 'MedAnalytics Platform Purchase',
        date: 'August 2023',
        type: 'Asset Purchase',
        amount: '$28M',
        description: 'Purchased analytics platform to strengthen data capabilities.'
      }
    ];
  } else {
    return [
      {
        id: '1',
        name: 'Investment in HealthTech Startup',
        date: 'February 2024',
        type: 'Minority Investment',
        amount: '$10M',
        description: 'Strategic minority investment in emerging healthcare technology provider.'
      }
    ];
  }
};

const BuyerTableRow: React.FC<BuyerTableRowProps> = ({
  buyer,
  savedBuyers,
  onAddToSaved,
  isExpanded,
  toggleRationale,
  getMATrackRecordColor,
  isInTop100 = true
}) => {
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [maRecordSheetOpen, setMARecordSheetOpen] = React.useState(false);
  const transactions = React.useMemo(() => 
    getMockTransactions(buyer.maTrackRecord || 'Low'), 
    [buyer.maTrackRecord]
  );

  return (
    <>
      <TableRow className={`hover:bg-gray-50 text-xs ${savedBuyers.includes(buyer.id) ? 'bg-green-50' : ''}`}>
        {/* Match Score Column - Now first */}
        <TableCell className="text-xs">
          <div className="flex items-center flex-col space-y-2">
            <div className="flex items-center">
              <div className="w-8 bg-gray-200 rounded-full h-1.5 mr-2">
                <div
                  className="bg-blueknight-500 h-1.5 rounded-full"
                  style={{ width: `${buyer.matchingScore}%` }}
                />
              </div>
              <span className="text-xs font-medium text-blueknight-500">{buyer.matchingScore}%</span>
            </div>
            
            {/* Modern save button */}
            <button
              onClick={() => onAddToSaved(buyer.id)}
              disabled={savedBuyers.includes(buyer.id)}
              className={`flex items-center justify-center p-1.5 rounded-md ${
                savedBuyers.includes(buyer.id)
                  ? 'bg-green-100 text-green-600 cursor-not-allowed border border-green-200'
                  : 'bg-blueknight-50 text-blueknight-600 hover:bg-blueknight-100 border border-blueknight-200'
              }`}
              title={savedBuyers.includes(buyer.id) ? "Already saved" : "Save buyer"}
            >
              {savedBuyers.includes(buyer.id) ? (
                <Check className="h-3 w-3" />
              ) : (
                <span className="text-xs font-medium">Save</span>
              )}
            </button>
          </div>
        </TableCell>
        
        {/* Company Name Column */}
        <TableCell 
          className={`font-medium text-xs sticky left-0 z-10 ${savedBuyers.includes(buyer.id) ? 'bg-green-50' : 'bg-white'}`}
          style={{position: 'sticky', left: 0}}
        >
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
        </TableCell>
        
        {/* HQ Column */}
        <TableCell className="text-xs">{buyer.location || buyer.hq}</TableCell>
        
        {/* Employees Column */}
        <TableCell className="text-xs">{buyer.employees.toLocaleString()}</TableCell>
        
        {/* Short Description Column */}
        <TableCell className="text-xs">{buyer.description}</TableCell>
        
        {/* Overall Rationale Column (replacing Offering) */}
        <TableCell className="text-xs">
          {isInTop100 ? (
            buyer.rationale?.overall?.text || "No rationale available"
          ) : (
            <span className="italic text-gray-400">
              Not in top 100 results
            </span>
          )}
        </TableCell>
        
        {/* M&A Track Record Column */}
        <TableCell className="text-xs">
          <button 
            onClick={() => setMARecordSheetOpen(true)}
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getMATrackRecordColor(buyer.maTrackRecord || 'N/A')} cursor-pointer hover:opacity-90`}
            title="Click to view M&A history"
          >
            {buyer.maTrackRecord || 'N/A'}
            <History className="h-3 w-3 ml-1 opacity-80" />
          </button>
        </TableCell>
      </TableRow>

      {/* Side Panel for Buyer Rationale */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="w-[500px] sm:w-[700px] md:w-[900px] lg:max-w-[1200px] overflow-hidden">
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
      
      {/* Side Panel for M&A Track Record */}
      <Sheet open={maRecordSheetOpen} onOpenChange={setMARecordSheetOpen}>
        <SheetContent className="w-[400px] sm:w-[500px] md:w-[600px] overflow-hidden">
          <SheetHeader>
            <SheetTitle className="flex items-center text-lg font-semibold">
              <History className="h-5 w-5 mr-2 text-blueknight-500" />
              {buyer.name} - M&A History
            </SheetTitle>
            <SheetDescription>
              Previous similar transactions and acquisition history
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-140px)] pr-4 mt-6">
            <div className="space-y-6">
              <div className="flex items-center">
                <div className={`px-2.5 py-1 rounded-full text-sm font-medium ${getMATrackRecordColor(buyer.maTrackRecord || 'N/A')}`}>
                  {buyer.maTrackRecord || 'N/A'} M&A Record
                </div>
                <span className="ml-2 text-sm text-gray-500">
                  {transactions.length} similar transaction{transactions.length !== 1 ? 's' : ''}
                </span>
              </div>
              
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-sm">{transaction.name}</h4>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-3 text-xs">
                      <div>
                        <span className="text-gray-500">Date: </span>
                        <span>{transaction.date}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Type: </span>
                        <span>{transaction.type}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Amount: </span>
                        <span>{transaction.amount}</span>
                      </div>
                    </div>
                    <p className="text-xs mt-3 text-gray-600">{transaction.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="text-sm font-medium text-blueknight-700 mt-4">Why This Matters</div>
              <p className="text-xs text-gray-600">
                {buyer.name}'s {buyer.maTrackRecord.toLowerCase()} M&A track record indicates 
                {buyer.maTrackRecord === 'High' 
                  ? ' strong acquisition appetite and experience in completing similar deals. They have consistently shown interest in companies with your profile.'
                  : buyer.maTrackRecord === 'Medium'
                    ? ' moderate acquisition experience with select strategic purchases in related sectors. They are actively looking to expand their portfolio.'
                    : ' limited but focused acquisition strategy. They are selective but could see your company as a strategic opportunity.'}
              </p>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default BuyerTableRow;
