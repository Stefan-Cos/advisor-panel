
import React from 'react';
import { Info } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface InfoPopoverProps {
  example: string;
}

export const InfoPopover: React.FC<InfoPopoverProps> = ({ example }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <Info className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4">
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Example:</h4>
          <p className="text-sm text-gray-700">{example}</p>
        </div>
      </PopoverContent>
    </Popover>
  );
};
