
import React from 'react';
import { format } from 'date-fns';
import { Buyer } from '../types/BuyerTypes';

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

  return (
    <>
      <button
        onClick={() => toggleRationale(buyer.id)}
        className="text-xs font-medium text-blueknight-600 hover:text-blueknight-800 underline"
      >
        {isExpanded ? 'Hide Rationale' : 'Show Rationale'}
      </button>
      
      {isExpanded && (
        <div className="mt-2 p-3 bg-gray-50 rounded-md text-sm space-y-2 border border-gray-200">
          <div>
            <span className="font-medium">Offering: </span>
            <span>{buyer.rationale.offering}</span>
            {buyer.rationale.scores?.offering && (
              <span className={`ml-2 inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getScoreBadgeStyle(buyer.rationale.scores.offering)}`}>
                {buyer.rationale.scores.offering}%
              </span>
            )}
          </div>
          
          <div>
            <span className="font-medium">Customers: </span>
            <span>{buyer.rationale.customers}</span>
            {buyer.rationale.scores?.customers && (
              <span className={`ml-2 inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getScoreBadgeStyle(buyer.rationale.scores.customers)}`}>
                {buyer.rationale.scores.customers}%
              </span>
            )}
          </div>
          
          <div>
            <span className="font-medium">Previous Transactions: </span>
            <span>{buyer.rationale.previousTransactions}</span>
            {buyer.rationale.scores?.previousTransactions && (
              <span className={`ml-2 inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getScoreBadgeStyle(buyer.rationale.scores.previousTransactions)}`}>
                {buyer.rationale.scores.previousTransactions}%
              </span>
            )}
          </div>
          
          <div>
            <span className="font-medium">Financial Strength: </span>
            <span>{buyer.rationale.financialStrength}</span>
            {buyer.rationale.scores?.financialStrength && (
              <span className={`ml-2 inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getScoreBadgeStyle(buyer.rationale.scores.financialStrength)}`}>
                {buyer.rationale.scores.financialStrength}%
              </span>
            )}
          </div>
          
          <div>
            <span className="font-medium">Overall: </span>
            <span>{buyer.rationale.overall}</span>
            {buyer.rationale.scores?.overall && (
              <span className={`ml-2 inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getScoreBadgeStyle(buyer.rationale.scores.overall)}`}>
                {buyer.rationale.scores.overall}%
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default BuyerRationale;
