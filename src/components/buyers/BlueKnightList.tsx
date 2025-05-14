
import React, { useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";
import BlueKnightTable from './BlueKnightTable';
import { mockBuyers } from './data/mockBuyers';
import { Buyer } from './types/BuyerTypes';

interface BlueKnightListProps {
  listingId: string;
}

const BlueKnightList: React.FC<BlueKnightListProps> = ({ listingId }) => {
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [savedBuyers, setSavedBuyers] = useState<string[]>([]);
  const [expandedRationales, setExpandedRationales] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate loading data
    const loadData = () => {
      setIsLoading(true);
      
      // In a real app, you would fetch this data from an API
      // using the listingId to get buyer data specific to this listing
      setTimeout(() => {
        const strategicBuyers = mockBuyers.filter(buyer => 
          buyer.type === 'strategic' && buyer.matchingScore > 0
        ).sort((a, b) => b.matchingScore - a.matchingScore);
        
        setBuyers(strategicBuyers);
        setIsLoading(false);
      }, 500);
    };
    
    loadData();
  }, [listingId]);

  // Toggle rationale expansion
  const toggleRationale = (buyerId: string) => {
    setExpandedRationales(prev => 
      prev.includes(buyerId) 
        ? prev.filter(id => id !== buyerId) 
        : [...prev, buyerId]
    );
  };

  // Handle saving a buyer
  const handleAddToSaved = (buyerId: string) => {
    if (!savedBuyers.includes(buyerId)) {
      setSavedBuyers(prev => [...prev, buyerId]);
      const buyer = buyers.find(b => b.id === buyerId);
      toast({
        title: "Buyer Saved",
        description: `${buyer?.name} has been added to your saved list.`
      });
    }
  };

  if (isLoading) {
    return <div className="py-12 text-center">Loading buyer data...</div>;
  }

  return (
    <div className="space-y-4">
      <BlueKnightTable
        buyers={buyers}
        savedBuyers={savedBuyers}
        expandedRationales={expandedRationales}
        onAddToSaved={handleAddToSaved}
        toggleRationale={toggleRationale}
      />
    </div>
  );
};

export default BlueKnightList;
