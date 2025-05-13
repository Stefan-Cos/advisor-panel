
import React from 'react';
import { format } from 'date-fns';
import { Buyer } from '../types/BuyerTypes';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose
} from "@/components/ui/drawer";
import { X } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";

interface BuyerRationaleProps {
  buyer: Buyer;
  expandedRationales: string[];
  toggleRationale: (buyerId: string) => void;
}

const BuyerRationale: React.FC<BuyerRationaleProps> = ({ 
  buyer, 
  expandedRationales, 
  toggleRationale 
}) => {
  const formatReportDate = (dateString: string) => {
    try {
      if (!dateString) return "N/A";
      const date = new Date(dateString);
      return format(date, 'MMM-yy');
    } catch (error) {
      console.error("Error formatting date:", error);
      return "N/A";
    }
  };

  const getScoreBadgeStyle = (score: number) => {
    if (score >= 90) return "bg-green-50 text-green-700";
    if (score >= 75) return "bg-blue-50 text-blue-700";
    if (score >= 60) return "bg-yellow-50 text-yellow-700";
    return "bg-gray-50 text-gray-700";
  };

  const isExpanded = expandedRationales.includes(buyer.id);

  const handleOpenChange = (open: boolean) => {
    if (open && !isExpanded) {
      toggleRationale(buyer.id);
    } else if (!open && isExpanded) {
      toggleRationale(buyer.id);
    }
  };

  return (
    <Drawer open={isExpanded} onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>
        <button className="text-xs font-medium text-blueknight-600 hover:text-blueknight-800 underline">
          View Rationale
        </button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-lg font-semibold text-blueknight-700">
              Acquisition Rationale: {buyer.name}
            </DrawerTitle>
            <DrawerClose className="rounded-full hover:bg-gray-100 p-1">
              <X className="h-4 w-4" />
            </DrawerClose>
          </div>
        </DrawerHeader>
        <ScrollArea className="h-[calc(85vh-80px)] px-4">
          <div className="py-6 space-y-6">
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-base font-medium text-gray-800 mb-4">Score Breakdown</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Offering</span>
                    <span className={`text-sm font-medium ${getScoreBadgeStyle(buyer.rationale.scores?.offering || 0)}`}>
                      {buyer.rationale.scores?.offering || 0}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blueknight-500 h-2 rounded-full" 
                      style={{ width: `${buyer.rationale.scores?.offering || 0}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{buyer.rationale.offering}</p>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Customers</span>
                    <span className={`text-sm font-medium ${getScoreBadgeStyle(buyer.rationale.scores?.customers || 0)}`}>
                      {buyer.rationale.scores?.customers || 0}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blueknight-500 h-2 rounded-full" 
                      style={{ width: `${buyer.rationale.scores?.customers || 0}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{buyer.rationale.customers}</p>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Previous Transactions</span>
                    <span className={`text-sm font-medium ${getScoreBadgeStyle(buyer.rationale.scores?.previousTransactions || 0)}`}>
                      {buyer.rationale.scores?.previousTransactions || 0}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blueknight-500 h-2 rounded-full" 
                      style={{ width: `${buyer.rationale.scores?.previousTransactions || 0}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{buyer.rationale.previousTransactions}</p>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Financial Strength</span>
                    <span className={`text-sm font-medium ${getScoreBadgeStyle(buyer.rationale.scores?.financialStrength || 0)}`}>
                      {buyer.rationale.scores?.financialStrength || 0}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blueknight-500 h-2 rounded-full" 
                      style={{ width: `${buyer.rationale.scores?.financialStrength || 0}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{buyer.rationale.financialStrength}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-5 rounded-lg border border-blue-200 shadow-sm">
              <h3 className="text-base font-medium text-blue-800 mb-4">Overall Rationale</h3>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Overall Score</span>
                <span className={`text-sm font-medium ${getScoreBadgeStyle(buyer.rationale.scores?.overall || 0)}`}>
                  {buyer.rationale.scores?.overall || 0}%
                </span>
              </div>
              <div className="w-full bg-blue-100 rounded-full h-2.5 mb-4">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${buyer.rationale.scores?.overall || 0}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-700">{buyer.rationale.overall}</p>
            </div>

            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-base font-medium text-gray-800 mb-4">Additional Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Company Profile</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span className="text-gray-600">Industry:</span>
                      <span className="font-medium">{buyer.sector || (buyer.sectors ? buyer.sectors.join(', ') : 'N/A')}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium">{buyer.location || buyer.hq || 'N/A'}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Employees:</span>
                      <span className="font-medium">{buyer.employees?.toLocaleString()}</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">M&A History</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span className="text-gray-600">Track Record:</span>
                      <span className="font-medium">{buyer.maTrackRecord || 'N/A'}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Recent Acquisitions:</span>
                      <span className="font-medium">3 in last 24 months</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};

export default BuyerRationale;
