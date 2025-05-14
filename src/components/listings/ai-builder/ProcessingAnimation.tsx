
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
    return <IconComponent className="h-8 w-8 text-blue-600 animate-pulse" />;
  };

  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-[500px] space-y-6">
      <div className="w-full max-w-lg mx-auto bg-gradient-to-b from-white to-blue-50 rounded-xl shadow-lg p-8 border border-blue-100">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-blueknight-700 mb-2">AI Matching in Progress</h3>
          <p className="text-gray-600">Our AI is analyzing potential buyers based on your criteria</p>
        </div>
        
        <div className="relative mb-10">
          <AspectRatio ratio={16/9} className="w-full mx-auto max-w-[320px]">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Modern flowing lines animation */}
              <svg className="w-full h-full" viewBox="0 0 400 225" xmlns="http://www.w3.org/2000/svg">
                <path 
                  className="animate-[dash_3s_ease-in-out_infinite]" 
                  fill="none" 
                  stroke="#E0E7FF" 
                  strokeWidth="2"
                  strokeDasharray="210" 
                  strokeDashoffset="210" 
                  d="M50,112 C100,80 150,144 200,112 C250,80 300,144 350,112"
                />
                <path 
                  className="animate-[dash_3s_ease-in-out_infinite_0.5s]" 
                  fill="none" 
                  stroke="#C7D2FE" 
                  strokeWidth="2" 
                  strokeDasharray="240" 
                  strokeDashoffset="240" 
                  d="M50,112 C100,144 150,80 200,112 C250,144 300,80 350,112"
                />
                <circle 
                  cx="200" 
                  cy="112" 
                  r="12" 
                  fill="#4F46E5" 
                  className="animate-pulse" 
                />
                <circle 
                  cx="200" 
                  cy="112" 
                  r="24" 
                  fill="none" 
                  stroke="#6366F1" 
                  strokeWidth="1" 
                  opacity="0.7"
                  className="animate-ping"
                />
              </svg>
              
              {/* Central icon with pulsing effect */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute -inset-4 bg-blue-100 rounded-full opacity-30 animate-ping"></div>
                  <div className="relative z-10 bg-white p-2.5 rounded-full shadow-md">
                    {renderProcessingIcon()}
                  </div>
                </div>
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
            <div className="h-full bg-gradient-to-r from-indigo-400 to-blue-600 rounded-full" style={{ width: `${progressValue}%` }}></div>
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
