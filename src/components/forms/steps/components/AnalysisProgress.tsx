
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Globe, Check } from 'lucide-react';

interface AnalysisProgressProps {
  progress: number;
  animatingFields: string[];
}

const AnalysisProgress: React.FC<AnalysisProgressProps> = ({ progress, animatingFields }) => {
  return (
    <div className="space-y-6 pt-4 animate-fade-in">
      <div className="flex items-center gap-3 text-blueknight-600">
        <Globe className="animate-pulse h-5 w-5" />
        <p className="text-sm font-medium">
          We're now analysing the website with AI to pre-fill the company profile for buyer targeting...
        </p>
      </div>
      
      <Progress value={progress} className="h-2" />
      
      <div className="space-y-4 mt-8">
        {animatingFields.includes('companyOverview') && (
          <div className="animate-slide-in-right flex items-center gap-2 text-sm text-gray-600">
            <Check className="h-4 w-4 text-green-500" />
            <span>Extracted Company Overview</span>
          </div>
        )}
        {animatingFields.includes('marketPositioning') && (
          <div className="animate-slide-in-right flex items-center gap-2 text-sm text-gray-600">
            <Check className="h-4 w-4 text-green-500" />
            <span>Extracted Market Positioning</span>
          </div>
        )}
        {animatingFields.includes('problemsUseCases') && (
          <div className="animate-slide-in-right flex items-center gap-2 text-sm text-gray-600">
            <Check className="h-4 w-4 text-green-500" />
            <span>Extracted Problems and Use Cases</span>
          </div>
        )}
        {animatingFields.includes('customerProfile') && (
          <div className="animate-slide-in-right flex items-center gap-2 text-sm text-gray-600">
            <Check className="h-4 w-4 text-green-500" />
            <span>Extracted Customer Profile</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisProgress;
