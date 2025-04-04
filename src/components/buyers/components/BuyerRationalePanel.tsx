
import React from 'react';

interface BuyerRationalePanelProps {
  buyer: {
    longDescription?: string;
    primaryIndustries?: string[];
    keywords?: string[];
    targetCustomerTypes?: string[];
    parentCompany?: string;
    location: string;
    employees: number;
    rationale: {
      offering: {
        text: string;
        score: number;
      };
      customers: {
        text: string;
        score: number;
      };
      previousTransactions: {
        text: string;
        score: number;
      };
      financialStrength: {
        text: string;
        score: number;
      };
      overall: {
        text: string;
        score: number;
      };
    };
  };
}

const BuyerRationalePanel: React.FC<BuyerRationalePanelProps> = ({ buyer }) => {
  const getMatchScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="p-4">
      <div className="mb-6 bg-white p-4 rounded-md border border-gray-200 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 border-b pb-2">Buyer Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-1">Long Description</h4>
            <p className="text-sm text-gray-600">{buyer.longDescription || "Not provided"}</p>
          </div>
        
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-1">Primary Industries</h4>
            <div className="flex flex-wrap gap-1 mt-1">
              {buyer.primaryIndustries?.map((industry, i) => (
                <span key={i} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                  {industry}
                </span>
              )) || "Not provided"}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-1">Keywords</h4>
            <div className="flex flex-wrap gap-1 mt-1">
              {buyer.keywords?.map((keyword, i) => (
                <span key={i} className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-full">
                  {keyword}
                </span>
              )) || "Not provided"}
            </div>
          </div>
        
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-1">Target Customer Types</h4>
            <p className="text-sm text-gray-600">
              {buyer.targetCustomerTypes?.join(', ') || "Not provided"}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 mt-4">
          <div>
            <h4 className="text-xs text-gray-500 mb-1">Parent Company</h4>
            <p className="text-sm font-medium">{buyer.parentCompany || "None/Independent"}</p>
          </div>
          <div>
            <h4 className="text-xs text-gray-500 mb-1">Website</h4>
            <p className="text-sm font-medium text-blue-500 hover:underline cursor-pointer">Visit</p>
          </div>
          <div>
            <h4 className="text-xs text-gray-500 mb-1">HQ</h4>
            <p className="text-sm font-medium">{buyer.location}</p>
          </div>
          <div>
            <h4 className="text-xs text-gray-500 mb-1">Employees</h4>
            <p className="text-sm font-medium">{buyer.employees.toLocaleString()}</p>
          </div>
          <div>
            <h4 className="text-xs text-gray-500 mb-1">Revenue ($M)</h4>
            <p className="text-sm font-medium">$125.5</p>
          </div>
          <div>
            <h4 className="text-xs text-gray-500 mb-1">Cash ($M)</h4>
            <p className="text-sm font-medium">$45.2</p>
          </div>
          <div>
            <h4 className="text-xs text-gray-500 mb-1">Reported Date</h4>
            <p className="text-sm font-medium">Mar 24</p>
          </div>
          <div>
            <h4 className="text-xs text-gray-500 mb-1">PE/VC-Backed</h4>
            <p className="text-sm font-medium">No</p>
          </div>
          <div>
            <h4 className="text-xs text-gray-500 mb-1">Public</h4>
            <p className="text-sm font-medium">Yes</p>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-md border border-blue-100 shadow-sm">
        <h3 className="text-sm font-semibold text-blue-800 mb-3 border-b border-blue-100 pb-2">Acquisition Rationale</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-blue-700 mb-1 flex items-center">
              <span className={`text-sm font-medium ${getMatchScoreColor(buyer.rationale.offering.score)} mr-2`}>
                {buyer.rationale.offering.score}%
              </span>
              <span>Offering</span>
            </h4>
            <p className="text-sm text-gray-700">{buyer.rationale.offering.text}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-blue-700 mb-1 flex items-center">
              <span className={`text-sm font-medium ${getMatchScoreColor(buyer.rationale.customers.score)} mr-2`}>
                {buyer.rationale.customers.score}%
              </span>
              <span>Customers</span>
            </h4>
            <p className="text-sm text-gray-700">{buyer.rationale.customers.text}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-blue-700 mb-1 flex items-center">
              <span className={`text-sm font-medium ${getMatchScoreColor(buyer.rationale.previousTransactions.score)} mr-2`}>
                {buyer.rationale.previousTransactions.score}%
              </span>
              <span>Previous Transactions</span>
            </h4>
            <p className="text-sm text-gray-700">{buyer.rationale.previousTransactions.text}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-blue-700 mb-1 flex items-center">
              <span className={`text-sm font-medium ${getMatchScoreColor(buyer.rationale.financialStrength.score)} mr-2`}>
                {buyer.rationale.financialStrength.score}%
              </span>
              <span>Financial Strength</span>
            </h4>
            <p className="text-sm text-gray-700">{buyer.rationale.financialStrength.text}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-blue-700 mb-1 flex items-center">
              <span className={`text-sm font-medium ${getMatchScoreColor(buyer.rationale.overall.score)} mr-2`}>
                {buyer.rationale.overall.score}%
              </span>
              <span>Overall Rationale</span>
            </h4>
            <p className="text-sm text-gray-700">{buyer.rationale.overall.text}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerRationalePanel;
