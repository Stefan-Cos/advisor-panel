
import React from 'react';
import { BarChart3 } from 'lucide-react';

interface TotalProjectsProps {
  count: number;
}

const TotalProjects: React.FC<TotalProjectsProps> = ({ count }) => {
  return (
    <div className="premium-card p-6 animate-scale-in">
      <div className="flex items-center mb-4">
        <BarChart3 className="h-6 w-6 text-blueknight-500" />
      </div>
      <h3 className="text-lg font-medium text-gray-900">Total Projects</h3>
      <p className="text-4xl font-bold text-blueknight-500 mt-2">{count}</p>
    </div>
  );
};

export default TotalProjects;
