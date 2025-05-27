
import React from 'react';
import { cn } from '@/lib/utils';
import BuyerTypeBadge from './components/BuyerTypeBadge';
import LocationBadge from './components/LocationBadge';
import FitPercentageBar from './components/FitPercentageBar';
import BuyerDetail from './components/BuyerDetail';
import SaveButton from './components/SaveButton';

interface BuyerCardProps {
  id: string;
  name: string;
  type: 'strategic' | 'pe';
  location: string;
  sector: string;
  offering: string;
  customers: string;
  fitPercentage?: number;
  addedToSaved?: boolean;
  onAddToSaved?: (id: string) => void;
  listingId?: string;
  buyerData?: any;
}

const BuyerCard: React.FC<BuyerCardProps> = ({
  id,
  name,
  type,
  location,
  sector,
  offering,
  customers,
  fitPercentage = Math.floor(Math.random() * 31) + 70,
  addedToSaved = false,
  onAddToSaved = () => {},
  listingId,
  buyerData
}) => {
  // Create buyer data object for saving
  const buyerDataForSave = buyerData || {
    id,
    name,
    type,
    location,
    sector,
    offering,
    customers,
    fitPercentage
  };

  return (
    <div className={cn(
      "premium-card animate-scale-in overflow-hidden",
      addedToSaved && "ring-2 ring-blueknight-400 bg-green-50"
    )}>
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg text-blueknight-800">{name}</h3>
          <div className="flex items-center space-x-2">
            <SaveButton
              id={id}
              name={name}
              isSaved={addedToSaved}
              onSave={onAddToSaved}
              listingId={listingId}
              buyerType={type}
              buyerData={buyerDataForSave}
            />
          </div>
        </div>
        
        <div className="mt-2 flex items-center justify-between">
          <div className="flex space-x-2">
            <BuyerTypeBadge type={type} />
            <LocationBadge location={location} />
          </div>
          
          <FitPercentageBar percentage={fitPercentage} />
        </div>
      </div>
      
      <div className="p-4 text-sm space-y-2">
        <BuyerDetail label="Sectors" value={sector} />
        <BuyerDetail label="Offering" value={offering} />
        <BuyerDetail label="Customers" value={customers} />
      </div>
      
      <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
        <div className="flex items-center">
          <span className="text-sm font-medium mr-2">Fit Score:</span>
          <span className="text-sm font-bold text-blueknight-500">{fitPercentage}%</span>
        </div>
      </div>
    </div>
  );
};

export default BuyerCard;
