
import React from 'react';
import { BarChart3, Globe, Brain } from 'lucide-react';

interface AnalysisAnimationProps {
  analysisComplete: boolean;
}

const AnalysisAnimation: React.FC<AnalysisAnimationProps> = ({ analysisComplete }) => {
  if (analysisComplete) {
    return (
      <div className="relative h-40 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 animate-pulse rounded-full blur-3xl"/>
        <div className="z-10 flex flex-col items-center space-y-4">
          <div className="p-3 bg-purple-50 rounded-full">
            <Brain className="h-12 w-12 text-purple-500 animate-scale-in" />
          </div>
          <p className="text-lg font-medium text-purple-700 animate-fade-in">
            Analysis complete!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-40 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 animate-pulse rounded-full blur-3xl"/>
      <div className="z-10 flex flex-col items-center space-y-2">
        <BarChart3 className="h-10 w-10 text-blueknight-500 animate-pulse" />
        <p className="text-sm font-medium text-gray-500">Processing company data...</p>
      </div>
    </div>
  );
};

export default AnalysisAnimation;
