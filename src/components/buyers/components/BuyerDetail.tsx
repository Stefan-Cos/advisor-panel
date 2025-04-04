
import React from 'react';

interface BuyerDetailProps {
  label: string;
  value: string;
}

const BuyerDetail: React.FC<BuyerDetailProps> = ({ label, value }) => {
  return (
    <div>
      <span className="font-medium text-gray-600">{label}:</span> {value}
    </div>
  );
};

export default BuyerDetail;
