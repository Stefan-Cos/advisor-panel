
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Tag from '../ui/Tag';

interface ListingCardProps {
  id: string;
  title: string;
  companyName: string;
  description: string;
  type: string;
  imageUrl?: string;
}

const ListingCard: React.FC<ListingCardProps> = ({
  id,
  title,
  companyName,
  description,
  type,
  imageUrl = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=250&q=80',
}) => {
  return (
    <div className="premium-card overflow-hidden animate-fade-in h-full">
      <div className="h-48 bg-gray-200 relative">
        <img
          src={imageUrl}
          alt={companyName}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <Tag text={type} color="blue" />
        </div>
      </div>
      <div className="p-4 flex flex-col h-52">
        <h3 className="text-sm font-medium text-gray-500 uppercase">{type}</h3>
        <h2 className="font-semibold text-lg text-blueknight-800 mt-1">{title}</h2>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2 flex-grow">{description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">{companyName}</span>
          <Link 
            to={`/listings/${id}`} 
            className="text-blueknight-500 hover:text-blueknight-600 flex items-center text-sm font-medium h-10"
          >
            View Details
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
