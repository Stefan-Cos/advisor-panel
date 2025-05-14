
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import BuyerRationale from './BuyerRationale';

interface BuyerTablesProps {
  activeTab: 'strategic' | 'pe';
  buyers: any[]; // Using any as per original code
  companyNameSearch: string;
  setCompanyNameSearch: (value: string) => void;
  expandedRationales: string[];
  savedBuyers: string[];
  toggleRationale: (buyerId: string) => void;
  handleAddToSaved: (buyerId: string) => void;
}

const BuyerTables: React.FC<BuyerTablesProps> = ({
  activeTab,
  buyers,
  companyNameSearch,
  setCompanyNameSearch,
  expandedRationales,
  savedBuyers,
  toggleRationale,
  handleAddToSaved
}) => {
  const filteredBuyers = buyers.filter(buyer => 
    buyer.name.toLowerCase().includes(companyNameSearch.toLowerCase())
  );

  return (
    <>
      <div className="mb-4">
        <Input
          placeholder="Search company names..."
          value={companyNameSearch}
          onChange={(e) => setCompanyNameSearch(e.target.value)}
          className="max-w-xs"
        />
      </div>
      
      <div className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>HQ</TableHead>
              <TableHead>Employees</TableHead>
              <TableHead>Revenue ($M)</TableHead>
              <TableHead>Cash ($M)</TableHead>
              <TableHead>Reported</TableHead>
              <TableHead>PE/VC Backed</TableHead>
              <TableHead>Public</TableHead>
              <TableHead>Match %</TableHead>
              <TableHead>Rationale</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBuyers.map((buyer) => (
              <TableRow key={buyer.id}>
                <TableCell className="font-medium">{buyer.name}</TableCell>
                <TableCell>{buyer.description}</TableCell>
                <TableCell>{buyer.hq}</TableCell>
                <TableCell>{buyer.employees.toLocaleString()}</TableCell>
                <TableCell>{buyer.revenue > 0 ? buyer.revenue.toLocaleString() : 'N/A'}</TableCell>
                <TableCell>{buyer.cash > 0 ? buyer.cash.toLocaleString() : 'N/A'}</TableCell>
                <TableCell>{buyer.reportedDate ? buyer.reportedDate.substring(0, 7) : 'N/A'}</TableCell>
                <TableCell>{buyer.isPEVCBacked ? 'Yes' : 'No'}</TableCell>
                <TableCell>{buyer.isPublic ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{buyer.matchingScore}%</span>
                    <div className="relative h-1.5 w-10 bg-gray-200 rounded-full">
                      <div
                        className="absolute top-0 left-0 h-full bg-blueknight-500 rounded-full"
                        style={{ width: `${buyer.matchingScore}%` }}
                      />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <BuyerRationale 
                    buyer={buyer} 
                    expandedRationales={expandedRationales} 
                    toggleRationale={toggleRationale} 
                  />
                </TableCell>
                <TableCell>
                  {!savedBuyers.includes(buyer.id) ? (
                    <button
                      onClick={() => handleAddToSaved(buyer.id)}
                      className="px-3 py-1 text-xs font-medium text-blueknight-700 bg-blueknight-50 rounded-md hover:bg-blueknight-100"
                    >
                      Save
                    </button>
                  ) : (
                    <span className="px-3 py-1 text-xs font-medium text-green-700 bg-green-50 rounded-md">
                      Saved
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default BuyerTables;
