
import React from 'react';
import { cn } from '@/lib/utils';
import { Progress } from "@/components/ui/progress";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Brain, Target, Sparkles, Zap } from 'lucide-react';

interface ProcessingAnimationProps {
  progressValue: number;
  processingStep: number;
  scoringConfig: Record<string, { enabled: boolean; weight: number }>;
}

// Processing steps messages
const processingSteps = [
  { message: "Initializing AI matching engine...", icon: Brain },
  { message: "Analyzing buyer preferences and scoring criteria...", icon: Target },
  { message: "Matching with potential strategic buyers...", icon: Sparkles },
  { message: "Calculating final compatibility scores...", icon: Zap },
  { message: "Preparing results...", icon: Target }
];

const ProcessingAnimation: React.FC<ProcessingAnimationProps> = ({
  progressValue,
  processingStep,
  scoringConfig
}) => {
  // Function to render the current processing step icon
  const renderProcessingIcon = () => {
    const IconComponent = processingSteps[processingStep].icon;
    return <IconComponent className="h-8 w-8 text-blueknight-600 animate-pulse" />;
  };

  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-[500px] space-y-6">
      <div className="w-full max-w-lg mx-auto bg-gradient-to-b from-gray-50 to-blue-50 rounded-xl shadow-lg p-8 border border-blue-100">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-blueknight-700 mb-2">AI Matching in Progress</h3>
          <p className="text-gray-600">Our AI is analyzing potential buyers based on your criteria</p>
        </div>
        
        <div className="relative mb-10">
          <AspectRatio ratio={1/1} className="w-32 mx-auto">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full border-4 border-blueknight-100 border-t-blueknight-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3/4 h-3/4 border-4 border-blueknight-200 border-b-transparent rounded-full animate-spin animation-delay-200" style={{ animationDirection: 'reverse' }}></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-1/2 h-1/2 border-4 border-blueknight-300 border-l-transparent rounded-full animate-spin animation-delay-400"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                {renderProcessingIcon()}
              </div>
            </div>
          </AspectRatio>
        </div>
        
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-xs font-medium text-blueknight-600">Processing</span>
            <span className="text-xs font-medium text-blueknight-600">{progressValue}%</span>
          </div>
          <Progress value={progressValue} className="h-2.5 bg-blue-100">
            <div className="h-full bg-gradient-to-r from-blue-400 to-indigo-600 rounded-full" style={{ width: `${progressValue}%` }}></div>
          </Progress>
        </div>
        
        <div className="text-center space-y-2">
          <p className="text-sm font-medium text-blueknight-700">{processingSteps[processingStep].message}</p>
          
          <div className="flex flex-wrap justify-center gap-2 py-4">
            {Object.entries(scoringConfig)
              .filter(([_, config]) => config.enabled)
              .map(([key]) => (
                <span key={key} className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300",
                  processingStep >= 1 ? "bg-blueknight-100 text-blueknight-600" : "bg-gray-100 text-gray-500",
                  processingStep >= 2 && key === Object.entries(scoringConfig).filter(([_, cfg]) => cfg.enabled)[0][0] ? "bg-blue-100 text-blue-700 border border-blue-200 shadow-sm scale-105" : "",
                  processingStep >= 3 && key === Object.entries(scoringConfig).filter(([_, cfg]) => cfg.enabled)[1][0] ? "bg-blue-100 text-blue-700 border border-blue-200 shadow-sm scale-105" : ""
                )}>
                  {key === 'problemSolved' ? 'Problem Solved' : 
                   key === 'useCase' ? 'Use Case' : 
                   key === 'customerBase' ? 'Customer Base' : 
                   key === 'acquisitionHistory' ? 'Acquisition History' : 
                   key.charAt(0).toUpperCase() + key.slice(1)}
                </span>
              ))}
          </div>
          
          <p className={cn(
            "text-xs text-gray-500 mt-4 transition-opacity duration-300",
            processingStep === 4 ? "opacity-100" : "opacity-60"
          )}>
            {processingStep === 4 ? "Almost done..." : "This may take a few moments..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProcessingAnimation;
