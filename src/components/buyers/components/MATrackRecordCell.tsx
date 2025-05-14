
import React from 'react';
import { History } from 'lucide-react';
import { TableCell } from "@/components/ui/table";

interface MATrackRecordCellProps {
  record: string;
  getMATrackRecordColor: (record: string) => string;
  onClick: () => void;
}

const MATrackRecordCell: React.FC<MATrackRecordCellProps> = ({
  record,
  getMATrackRecordColor,
  onClick
}) => {
  return (
    <TableCell className="text-xs">
      <button 
        onClick={onClick}
        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getMATrackRecordColor(record || 'N/A')} cursor-pointer hover:opacity-90`}
        title="Click to view M&A history"
      >
        {record || 'N/A'}
        <History className="h-3 w-3 ml-1 opacity-80" />
      </button>
    </TableCell>
  );
};

export default MATrackRecordCell;
