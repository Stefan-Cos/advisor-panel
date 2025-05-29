
import React from 'react';
import { TableCell } from "@/components/ui/table";

interface MatchScoreCellProps {
  matchingScore: number;
}

const MatchScoreCell: React.FC<MatchScoreCellProps> = ({ matchingScore }) => {
  // Normalize to nearest 100s for display
  const normalizedScore = Math.round(matchingScore / 100) * 100;
  const maxScore = 2000; // Approximate max based on console logs showing scores around 1800-1900
  const percentage = Math.min((matchingScore / maxScore) * 100, 100);
  
  return (
    <TableCell className="text-xs">
      <div className="flex items-center flex-col space-y-2">
        <div className="flex items-center">
          <div className="w-8 bg-gray-200 rounded-full h-1.5 mr-2">
            <div
              className="bg-blueknight-500 h-1.5 rounded-full"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className="text-xs font-medium text-blueknight-500">{normalizedScore}</span>
        </div>
      </div>
    </TableCell>
  );
};

export default MatchScoreCell;
