
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AcquisitionReasonItemProps {
  title: string;
  description: string;
  value: string;
  isEditing: boolean;
  options: string[];
  onChange: (value: string) => void;
}

const AcquisitionReasonItem: React.FC<AcquisitionReasonItemProps> = ({
  title,
  description,
  value,
  isEditing,
  options,
  onChange
}) => {
  return (
    <div className="mb-6 border-b border-gray-100 pb-6">
      <div className="flex items-start mb-2">
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-blueknight-700">{title}</h4>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
        <div className="text-sm font-medium">Importance</div>
      </div>
      
      {isEditing ? (
        <div className="flex gap-2">
          <Select 
            value={value} 
            onValueChange={onChange}
          >
            <SelectTrigger className="w-full text-sm">
              <SelectValue placeholder="Select a reason" />
            </SelectTrigger>
            <SelectContent>
              {options.map((reason) => (
                <SelectItem key={reason} value={reason} className="text-sm">
                  {reason}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select defaultValue="N/A" disabled>
            <SelectTrigger className="w-24 h-9 text-xs">
              <SelectValue placeholder="Importance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="N/A" className="text-xs">N/A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">{value}</span>
          <Badge variant="outline" className="text-xs bg-gray-50 text-gray-700 border-gray-200">
            N/A
          </Badge>
        </div>
      )}
    </div>
  );
};

export default AcquisitionReasonItem;
