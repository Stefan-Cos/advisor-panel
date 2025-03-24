
import React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TagProps {
  text: string;
  color?: 'blue' | 'gray' | 'green' | 'red' | 'yellow';
  onRemove?: () => void;
  className?: string;
}

const colorVariants = {
  blue: 'bg-blue-50 text-blue-800 border-blue-200',
  gray: 'bg-gray-50 text-gray-800 border-gray-200',
  green: 'bg-green-50 text-green-800 border-green-200',
  red: 'bg-red-50 text-red-800 border-red-200',
  yellow: 'bg-yellow-50 text-yellow-800 border-yellow-200',
};

const Tag = ({ text, color = 'blue', onRemove, className }: TagProps) => {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        colorVariants[color],
        className
      )}
    >
      <span>{text}</span>
      {onRemove && (
        <button 
          type="button" 
          onClick={onRemove}
          className="ml-1 rounded-full hover:bg-white/20 p-0.5"
        >
          <X className="h-3 w-3" />
          <span className="sr-only">Remove</span>
        </button>
      )}
    </div>
  );
};

export default Tag;
