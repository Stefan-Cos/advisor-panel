
import React from 'react';

interface FitPercentageBarProps {
  percentage: number;
}

const FitPercentageBar: React.FC<FitPercentageBarProps> = ({ percentage }) => {
  return (
    <div className="relative h-2 w-16 bg-gray-200 rounded overflow-hidden">
      <div 
        className="absolute top-0 left-0 h-full bg-blueknight-500" 
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default FitPercentageBar;
