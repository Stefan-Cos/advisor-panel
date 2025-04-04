
import React from 'react';
import { TableCell, TableRow } from "@/components/ui/table";
import { formatReportDate } from '../utils/dateUtils';

interface BuyerRationaleProps {
  buyer: any;
  type: 'strategic' | 'pe';
}

const BuyerTableRationaleRow: React.FC<BuyerRationaleProps> = ({ buyer, type }) => {
  return (
    <TableRow className="bg-green-50">
      <TableCell colSpan={type === 'strategic' ? 9 : 6} className="p-0">
        <div className="p-4">
          <div className="mb-6 bg-white p-4 rounded-md border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 border-b pb-2">
              {type === 'strategic' ? 'Buyer Information' : 'Fund Information'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-1">Long Description</h4>
                <p className="text-sm text-gray-600">{buyer.longDescription || "Not provided"}</p>
              </div>
            
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-1">Primary Industries</h4>
                <div className="flex flex-wrap gap-1 mt-1">
                  {buyer.primaryIndustries?.map((industry: string, i: number) => (
                    <span key={i} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                      {industry}
                    </span>
                  )) || "Not provided"}
                </div>
              </div>
            </div>
            
            {type === 'strategic' ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-1">Keywords</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {buyer.keywords?.map((keyword: string, i: number) => (
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
                    <p className="text-sm font-medium">{buyer.employees?.toLocaleString()}</p>
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
              </>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Investment Type</h4>
                    <div className="flex flex-wrap gap-1">
                      {buyer.investmentType?.map((type: string, i: number) => (
                        <span key={i} className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-full">
                          {type}
                        </span>
                      )) || "Not provided"}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Geography</h4>
                    <div className="flex flex-wrap gap-1">
                      {buyer.geography?.map((geo: string, i: number) => (
                        <span key={i} className="px-2 py-1 text-xs bg-cyan-50 text-cyan-700 rounded-full">
                          {geo}
                        </span>
                      )) || "Not provided"}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Investment Size</h4>
                    <p className="text-sm text-gray-600">${buyer.investmentSize}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Revenue ($M)</h4>
                    <p className="text-sm text-gray-600">{buyer.revenue}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">EBITDA ($M)</h4>
                    <p className="text-sm text-gray-600">{buyer.ebitda}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Industry Focus</h4>
                    <p className="text-sm text-gray-600">{buyer.industryFocus}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Industry Preferences</h4>
                  <div className="flex flex-wrap gap-1">
                    {buyer.industryPreferences?.map((pref: string, i: number) => (
                      <span key={i} className="px-2 py-1 text-xs bg-purple-50 text-purple-700 rounded-full">
                        {pref}
                      </span>
                    )) || "Not provided"}
                  </div>
                </div>
              </>
            )}
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 border-b pb-2">Acquisition Rationale</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-1">Offering</h4>
                <p className="text-sm text-gray-600">{buyer.rationale?.offering}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-1">Customers</h4>
                <p className="text-sm text-gray-600">{buyer.rationale?.customers}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-1">Previous Transactions</h4>
                <p className="text-sm text-gray-600">{buyer.rationale?.previousTransactions}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-1">Financial Strength</h4>
                <p className="text-sm text-gray-600">{buyer.rationale?.financialStrength}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-1">Overall Rationale</h4>
                <p className="text-sm text-gray-600">{buyer.rationale?.overall}</p>
              </div>
            </div>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default BuyerTableRationaleRow;
