
import React from 'react';
import { TableCell } from "@/components/ui/table";

interface RationaleCellProps {
  sampleRationale: string | null;
  buyerRationale: string | undefined;
  isInTop100: boolean;
}

const RationaleCell: React.FC<RationaleCellProps> = ({
  sampleRationale,
  buyerRationale,
  isInTop100
}) => {
  return (
    <TableCell className="text-xs">
      {isInTop100 ? (
        sampleRationale || buyerRationale || "No rationale available"
      ) : (
        <span className="italic text-gray-400">
          N/A - Rationale available only for the top 100
        </span>
      )}
    </TableCell>
  );
};

export default RationaleCell;
