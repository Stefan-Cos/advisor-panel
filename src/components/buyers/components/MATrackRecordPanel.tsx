
import React from 'react';
import { History } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Transaction {
  id: string;
  name: string;
  date: string;
  type: string;
  amount: string;
  description: string;
}

interface MATrackRecordPanelProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  buyerName: string;
  maTrackRecord: string;
  transactions: Transaction[];
  getMATrackRecordColor: (record: string) => string;
}

const MATrackRecordPanel: React.FC<MATrackRecordPanelProps> = ({
  isOpen,
  setIsOpen,
  buyerName,
  maTrackRecord,
  transactions,
  getMATrackRecordColor,
}) => {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-[400px] sm:w-[500px] md:w-[600px] overflow-hidden">
        <SheetHeader>
          <SheetTitle className="flex items-center text-lg font-semibold">
            <History className="h-5 w-5 mr-2 text-blueknight-500" />
            {buyerName} - M&A History
          </SheetTitle>
          <SheetDescription>
            Previous similar transactions and acquisition history
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-140px)] pr-4 mt-6">
          <div className="space-y-6">
            <div className="flex items-center">
              <div className={`px-2.5 py-1 rounded-full text-sm font-medium ${getMATrackRecordColor(maTrackRecord || 'N/A')}`}>
                {maTrackRecord || 'N/A'} M&A Record
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
              {buyerName}'s {maTrackRecord.toLowerCase()} M&A track record indicates 
              {maTrackRecord === 'High' 
                ? ' strong acquisition appetite and experience in completing similar deals. They have consistently shown interest in companies with your profile.'
                : maTrackRecord === 'Medium'
                  ? ' moderate acquisition experience with select strategic purchases in related sectors. They are actively looking to expand their portfolio.'
                  : ' limited but focused acquisition strategy. They are selective but could see your company as a strategic opportunity.'}
            </p>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default MATrackRecordPanel;
