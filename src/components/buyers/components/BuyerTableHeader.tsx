
import React from 'react';
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

const BuyerTableHeader: React.FC = () => {
  return (
    <TableHeader>
      <TableRow className="bg-[#001437] hover:bg-[#001437]">
        {/* Temporarily hidden Match Score column */}
        {/* 
        <TableHead className="w-20 text-center sticky left-0 z-20 bg-[#001437] text-white font-medium">
          Match Score
        </TableHead>
        */}
        <TableHead className="w-48 sticky left-0 z-20 bg-[#001437] text-white font-medium">
          Company Name
        </TableHead>
        <TableHead className="w-32 text-white font-medium">HQ</TableHead>
        <TableHead className="w-28 text-white font-medium">Employees</TableHead>
        <TableHead className="w-64 text-white font-medium">Short Description</TableHead>
        <TableHead className="w-80 text-white font-medium">Combined Offering</TableHead>
        <TableHead className="w-32 text-white font-medium">M&A Track Record</TableHead>
        <TableHead className="w-20 text-center text-white font-medium">Save</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default BuyerTableHeader;
