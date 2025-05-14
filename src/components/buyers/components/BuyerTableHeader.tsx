
import React from 'react';
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

const BuyerTableHeader: React.FC = () => {
  return (
    <TableHeader>
      <TableRow className="bg-blueknight-500">
        <TableHead className="text-white font-medium w-[120px]">
          Match Score
        </TableHead>
        <TableHead className="text-white font-medium w-[280px] sticky left-0 z-20 bg-blueknight-500">
          Company Name
        </TableHead>
        <TableHead className="text-white font-medium w-[120px]">HQ</TableHead>
        <TableHead className="text-white font-medium w-[120px]">Employees</TableHead>
        <TableHead className="text-white font-medium w-[200px]">Short Description</TableHead>
        <TableHead className="text-white font-medium w-[250px]">Overall Rationale</TableHead>
        <TableHead className="text-white font-medium w-[150px]">M&A Track Record</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default BuyerTableHeader;
