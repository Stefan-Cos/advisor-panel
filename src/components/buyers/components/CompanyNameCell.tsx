
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { TableCell } from "@/components/ui/table";

interface CompanyNameCellProps {
  name: string;
  isSaved: boolean;
  onViewRationale: () => void;
}

const CompanyNameCell: React.FC<CompanyNameCellProps> = ({
  name,
  isSaved,
  onViewRationale
}) => {
  return (
    <TableCell 
      className={`font-medium text-xs sticky left-0 z-10 ${isSaved ? 'bg-green-50' : 'bg-white'}`}
      style={{position: 'sticky', left: 0}}
    >
      <div>
        <div className="flex items-center gap-2">
          <span>{name}</span>
        </div>
        <div className="flex items-center mt-1">
          <button 
            onClick={onViewRationale} 
            className="inline-flex items-center text-xs text-blueknight-600 hover:underline"
          >
            View rationale
            <ChevronRight className="h-3 w-3 ml-0.5" />
          </button>
        </div>
      </div>
    </TableCell>
  );
};

export default CompanyNameCell;
