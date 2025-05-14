
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import BuyerRationalePanel from './BuyerRationalePanel';
import { Buyer } from '../types/BuyerTypes';

interface BuyerRationaleSheetProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  buyer: Buyer;
}

const BuyerRationaleSheet: React.FC<BuyerRationaleSheetProps> = ({
  isOpen,
  setIsOpen,
  buyer
}) => {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-[500px] sm:w-[700px] md:w-[900px] lg:max-w-[1200px] overflow-hidden">
        <SheetHeader>
          <SheetTitle className="flex items-center text-lg font-semibold">
            {buyer.name} - Match Analysis
          </SheetTitle>
          <SheetDescription>
            Detailed analysis of why this buyer may be a good match for your company.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-140px)] pr-4 mt-6">
          <BuyerRationalePanel buyer={buyer} />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default BuyerRationaleSheet;
