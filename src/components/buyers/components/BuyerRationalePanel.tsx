
import React from 'react';
import { Buyer } from '../types/BuyerTypes';

interface BuyerRationalePanelProps {
  buyer: Buyer;
}

const BuyerRationalePanel: React.FC<BuyerRationalePanelProps> = ({ buyer }) => {
  return (
    <div className="p-4">
      <div className="mb-6 bg-white p-4 rounded-md border border-gray-200 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 border-b pb-2">Buyer Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-1">Short Description</h4>
            <p className="text-sm text-gray-600">{buyer.description || "Not provided"}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-1">Long Description</h4>
            <p className="text-sm text-gray-600">{buyer.longDescription || "Not provided"}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
            <p className="text-sm font-medium">{buyer.location || buyer.hq}</p>
          </div>
          <div>
            <h4 className="text-xs text-gray-500 mb-1">Employees</h4>
            <p className="text-sm font-medium">{buyer.employees?.toLocaleString() || 'N/A'}</p>
          </div>
          <div>
            <h4 className="text-xs text-gray-500 mb-1">Revenue ($M)</h4>
            <p className="text-sm font-medium">${buyer.revenue ? (buyer.revenue / 1000000).toFixed(1) : 'N/A'}</p>
          </div>
          <div>
            <h4 className="text-xs text-gray-500 mb-1">Cash ($M)</h4>
            <p className="text-sm font-medium">${buyer.cash ? (buyer.cash / 1000000).toFixed(1) : 'N/A'}</p>
          </div>
          <div>
            <h4 className="text-xs text-gray-500 mb-1">Reported Date</h4>
            <p className="text-sm font-medium">{buyer.reportedDate ? new Date(buyer.reportedDate).toLocaleDateString('en-US', { month: 'short', year: '2-digit' }) : 'N/A'}</p>
          </div>
          <div>
            <h4 className="text-xs text-gray-500 mb-1">PE/VC-Backed</h4>
            <p className="text-sm font-medium">{buyer.isPEVCBacked ? 'Yes' : 'No'}</p>
          </div>
          <div>
            <h4 className="text-xs text-gray-500 mb-1">Public</h4>
            <p className="text-sm font-medium">{buyer.isPublic ? 'Yes' : 'No'}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-md border border-blue-100 shadow-sm">
        <h3 className="text-sm font-semibold text-blue-800 mb-3 border-b border-blue-100 pb-2">Acquisition Rationale</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-blue-700 mb-1">Offering</h4>
            <p className="text-sm text-gray-700">{buyer.rationale?.offering || 'Strong alignment between their offering and target acquisition criteria.'}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-blue-700 mb-1">Customers</h4>
            <p className="text-sm text-gray-700">{buyer.rationale?.customers || 'Customer base aligns well with acquisition strategy.'}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-blue-700 mb-1">Previous Transactions</h4>
            <p className="text-sm text-gray-700">{buyer.rationale?.previousTransactions || 'Transaction history demonstrates active acquisition strategy.'}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-blue-700 mb-1">Financial Strength</h4>
            <p className="text-sm text-gray-700">{buyer.rationale?.financialStrength || 'Financial profile indicates strong acquisition capability.'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerRationalePanel;
