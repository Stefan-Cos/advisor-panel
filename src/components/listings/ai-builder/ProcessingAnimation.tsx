
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Progress } from "@/components/ui/progress";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Brain, Target, Sparkles, Zap, Wifi, CircleDot } from 'lucide-react';

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
  const [particles, setParticles] = useState<{x: number, y: number, size: number, speed: number}[]>([]);
  
  // Create floating particles effect
  useEffect(() => {
    const newParticles = Array.from({ length: 15 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 5 + 2,
      speed: Math.random() * 0.5 + 0.2
    }));
    setParticles(newParticles);
    
    // Animate particles
    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: particle.y - particle.speed > 0 ? particle.y - particle.speed : 100,
        x: particle.x + (Math.random() - 0.5) * 2
      })));
    }, 100);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 md:p-8 flex flex-col items-center justify-center min-h-[400px] space-y-6">
      <div className="w-full max-w-4xl mx-auto bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 rounded-xl shadow-lg border border-blue-100/50 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left side - Animation */}
          <div className="p-6 md:p-8 relative overflow-hidden">
            <div className="relative h-full flex items-center justify-center">
              {/* Floating particles */}
              {particles.map((particle, i) => (
                <div 
                  key={i} 
                  className="absolute rounded-full bg-blue-400/20" 
                  style={{
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                    left: `${particle.x}%`,
                    top: `${particle.y}%`,
                    transition: 'all 0.5s ease'
                  }}
                />
              ))}
              
              {/* Central animation */}
              <div className="relative w-64 h-64">
                {/* Outer rings */}
                <div className="absolute inset-0 border-4 border-indigo-100 border-t-indigo-400 rounded-full animate-spin" 
                    style={{animationDuration: '4s'}}></div>
                <div className="absolute inset-[15%] border-4 border-blue-100 border-r-blue-400 rounded-full animate-spin"
                    style={{animationDuration: '3s', animationDirection: 'reverse'}}></div>
                <div className="absolute inset-[30%] border-4 border-sky-100 border-b-sky-400 rounded-full animate-spin"
                    style={{animationDuration: '2s'}}></div>
                
                {/* Center element - pulsating icon */}
                <div className="absolute inset-[45%] flex items-center justify-center">
                  <div className="relative">
                    {/* Concentric circles */}
                    <div className="absolute inset-0 rounded-full bg-blue-400/20 animate-ping" 
                        style={{animationDuration: '2s'}}></div>
                    <div className="absolute inset-[-5px] rounded-full bg-blue-400/10 animate-ping" 
                        style={{animationDuration: '3s'}}></div>
                    
                    {/* Current processing step icon */}
                    {React.createElement(processingSteps[processingStep].icon, {
                      className: "h-10 w-10 text-indigo-600 relative z-10",
                    })}
                    
                    {/* Pulsating dot */}
                    <CircleDot className="absolute top-0 left-0 h-10 w-10 text-blue-500/50 animate-pulse" />
                  </div>
                </div>
                
                {/* DataPoints floating in and out */}
                <div className="absolute w-6 h-6 bg-blue-500/20 rounded-full top-1/4 right-1/4 animate-pulse"></div>
                <div className="absolute w-4 h-4 bg-indigo-500/20 rounded-full bottom-1/3 left-1/5 animate-pulse"
                      style={{animationDelay: '0.5s'}}></div>
                <div className="absolute w-5 h-5 bg-purple-500/20 rounded-full top-2/3 right-1/3 animate-pulse"
                      style={{animationDelay: '0.7s'}}></div>
              </div>
            </div>
          </div>
          
          {/* Right side - Text and progress */}
          <div className="p-6 md:p-8 flex flex-col">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                AI Matching in Progress
              </h3>
              <p className="text-gray-600 mt-2">
                Our advanced AI is analyzing potential strategic buyers based on your criteria
              </p>
            </div>
            
            <div className="mb-8 flex-grow">
              <div className="flex justify-between mb-2">
                <span className="text-xs font-medium text-indigo-600">Processing</span>
                <span className="text-xs font-medium text-indigo-600">{progressValue}%</span>
              </div>
              <Progress value={progressValue} className="h-2.5 bg-blue-100">
                <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full" style={{ width: `${progressValue}%` }}></div>
              </Progress>
              
              <div className="mt-5">
                <p className="text-sm font-medium text-indigo-700 mb-2">
                  {processingSteps[processingStep].message}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {Object.entries(scoringConfig)
                    .filter(([_, config]) => config.enabled)
                    .map(([key, config]) => (
                      <span key={key} className={cn(
                        "px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300",
                        processingStep >= 1 ? "bg-indigo-50 text-indigo-600 border border-indigo-100" : "bg-gray-100 text-gray-500",
                        processingStep >= 2 && "animate-pulse",
                        processingStep >= 3 && key === Object.keys(scoringConfig).filter(k => scoringConfig[k].enabled)[0] ? 
                          "bg-indigo-100 text-indigo-700 border border-indigo-200 shadow-sm scale-105" : ""
                      )}>
                        {key === 'problemSolved' ? 'Problem Solved' : 
                         key === 'useCase' ? 'Use Case' : 
                         key === 'customerBase' ? 'Customer Base' : 
                         key === 'acquisitionHistory' ? 'Acquisition History' : 
                         key.charAt(0).toUpperCase() + key.slice(1)}
                        
                        {/* Show weight indicator when processing reaches step 3 */}
                        {processingStep >= 3 && (
                          <span className="ml-1 opacity-70">{config.weight}%</span>
                        )}
                      </span>
                    ))}
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <p className={cn(
                "text-xs text-gray-500 transition-opacity duration-300",
                processingStep === 4 ? "opacity-100" : "opacity-60"
              )}>
                {processingStep === 4 ? "Finalizing results..." : "Optimizing match algorithms..."}
              </p>
              
              {/* Activity indicator */}
              <div className="flex justify-center mt-2 space-x-1">
                {[0, 1, 2].map((dot) => (
                  <span 
                    key={dot}
                    className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"
                    style={{
                      animationDelay: `${dot * 0.15}s`,
                      animationDuration: '1s'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingAnimation;
