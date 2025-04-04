
import React from 'react';

interface LocationBadgeProps {
  location: string;
}

const LocationBadge: React.FC<LocationBadgeProps> = ({ location }) => {
  return (
    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
      {location}
    </span>
  );
};

export default LocationBadge;
