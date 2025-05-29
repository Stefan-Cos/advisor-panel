
import React from 'react';
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

const BuyerTableHeader: React.FC = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-20 text-center sticky left-0 z-20 bg-white">
          Match Score
        </TableHead>
        <TableHead className="w-48 sticky left-20 z-20 bg-white">
          Company Name
        </TableHead>
        <TableHead className="w-32">HQ</TableHead>
        <TableHead className="w-28">Employees</TableHead>
        <TableHead className="w-64">Short Description</TableHead>
        <TableHead className="w-80">Combined Offering</TableHead>
        <TableHead className="w-32">M&A Track Record</TableHead>
        <TableHead className="w-20 text-center">Save</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default BuyerTableHeader;
