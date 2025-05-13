
import React from 'react';
import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ScoreMetric {
  name: string;
  value: number;
  count: number; 
}

interface ModularScoreDashboardProps {
  metrics: ScoreMetric[];
}

const ModularScoreDashboard: React.FC<ModularScoreDashboardProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 bg-gray-50 p-6 rounded-lg border border-gray-200">
      {metrics.map((metric, index) => (
        <div 
          key={index} 
          className="flex flex-col items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100"
        >
          <div className="flex items-center mb-2">
            <h3 className="text-sm font-medium text-gray-700">{metric.name}</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 ml-1 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-64 text-xs">
                    {metric.name === "Buyer Country Match" && "Shows how many buyers match your target country preferences."}
                    {metric.name === "Revenue Range Match" && "Shows how many buyers match your preferred revenue range."}
                    {metric.name === "Industry Match" && "Shows how many buyers match your target industry sectors."}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <div className="text-3xl font-bold text-blueknight-600 mb-1">
            {metric.count}
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
            <div 
              className="bg-blueknight-500 h-2 rounded-full" 
              style={{ width: `${metric.value}%` }}
            />
          </div>
          
          <div className="text-xs text-gray-500">
            {metric.value}% match
          </div>
        </div>
      ))}
    </div>
  );
};

export default ModularScoreDashboard;
