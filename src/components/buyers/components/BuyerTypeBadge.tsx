
import React from 'react';

interface BuyerTypeBadgeProps {
  type: 'strategic' | 'pe';
}

const BuyerTypeBadge: React.FC<BuyerTypeBadgeProps> = ({ type }) => {
  return (
    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
      {type === 'strategic' ? 'Strategic Buyer' : 'PE-Backed'}
    </span>
  );
};

export default BuyerTypeBadge;
