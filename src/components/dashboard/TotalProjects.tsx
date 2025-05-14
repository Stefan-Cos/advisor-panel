
import React from 'react';
import { BarChart3 } from 'lucide-react';

interface TotalProjectsProps {
  count: number;
}

const TotalProjects: React.FC<TotalProjectsProps> = ({ count }) => {
  return (
    <div className="premium-card p-6 animate-scale-in relative overflow-hidden bg-gradient-to-br from-blueknight-500 to-blueknight-600 shadow-lg">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full filter blur-2xl opacity-10"></div>
        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-blue-300 rounded-full filter blur-2xl opacity-10"></div>
        <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-white rounded-full opacity-30"></div>
        <div className="absolute top-2/3 left-2/3 w-3 h-3 bg-white rounded-full opacity-20"></div>
      </div>
      
      <div className="flex items-center mb-4 relative z-10">
        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <BarChart3 className="h-5 w-5 text-white" />
        </div>
      </div>
      
      <h3 className="text-lg font-medium text-white mb-1 relative z-10">Total Projects</h3>
      <p className="text-4xl font-bold text-white relative z-10">
        {count}
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-200 rounded-full animate-ping"></span>
      </p>
    </div>
  );
};

export default TotalProjects;
