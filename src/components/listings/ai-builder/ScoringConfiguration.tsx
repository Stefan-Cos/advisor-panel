
import React from 'react';
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Settings, Package, Lightbulb, LayoutTemplate, Users, Target, History } from 'lucide-react';

interface ScoringConfigProps {
  scoringConfig: {
    offering: { enabled: boolean; weight: number; };
    problemSolved: { enabled: boolean; weight: number; };
    useCase: { enabled: boolean; weight: number; };
    customerBase: { enabled: boolean; weight: number; };
    positioning: { enabled: boolean; weight: number; };
    acquisitionHistory: { enabled: boolean; weight: number; };
  };
  handleConfigToggle: (key: string, value: boolean) => void;
  handleWeightChange: (key: string, value: number[]) => void;
  applyScoring: () => void;
}

const ScoringConfiguration: React.FC<ScoringConfigProps> = ({
  scoringConfig,
  handleConfigToggle,
  handleWeightChange,
  applyScoring
}) => {
  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <Settings className="h-4 w-4 mr-2 text-blueknight-600" />
        <h2 className="text-base font-medium text-blueknight-700">AI Buyer Match Scoring</h2>
      </div>
      
      <ScrollArea className="h-[calc(100vh-240px)] pr-4">
        <div className="space-y-4 text-sm">
          <p className="text-xs text-gray-600 mb-2">
            Customize how our AI evaluates and ranks potential buyers for your business.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Offering Config */}
            <div className="space-y-2 border border-gray-100 rounded-lg p-3 bg-white shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 bg-blue-50 rounded-md">
                    <Package className="h-4 w-4 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-xs font-medium">Offering</h3>
                    <p className="text-xs text-gray-500 hidden md:block">Match against product/service</p>
                  </div>
                </div>
                <Switch 
                  checked={scoringConfig.offering.enabled}
                  onCheckedChange={(checked) => handleConfigToggle('offering', checked)}
                />
              </div>
              
              {scoringConfig.offering.enabled && (
                <div className="pt-2 pl-8">
                  <div className="flex items-center justify-between mb-1">
                    <Label className="text-xs">Weight: {scoringConfig.offering.weight}%</Label>
                  </div>
                  <Slider 
                    value={[scoringConfig.offering.weight]}
                    onValueChange={(value) => handleWeightChange('offering', value)}
                    min={5}
                    max={100}
                    step={5}
                    className="py-1"
                  />
                </div>
              )}
            </div>
            
            {/* Problem Solved Config */}
            <div className="space-y-2 border border-gray-100 rounded-lg p-3 bg-white shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 bg-green-50 rounded-md">
                    <Lightbulb className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-xs font-medium">Problem Solved</h3>
                    <p className="text-xs text-gray-500 hidden md:block">Match by problems solved</p>
                  </div>
                </div>
                <Switch 
                  checked={scoringConfig.problemSolved.enabled}
                  onCheckedChange={(checked) => handleConfigToggle('problemSolved', checked)}
                />
              </div>
              
              {scoringConfig.problemSolved.enabled && (
                <div className="pt-2 pl-8">
                  <div className="flex items-center justify-between mb-1">
                    <Label className="text-xs">Weight: {scoringConfig.problemSolved.weight}%</Label>
                  </div>
                  <Slider 
                    value={[scoringConfig.problemSolved.weight]}
                    onValueChange={(value) => handleWeightChange('problemSolved', value)}
                    min={5}
                    max={100}
                    step={5}
                    className="py-1"
                  />
                </div>
              )}
            </div>
            
            {/* Use Case Config */}
            <div className="space-y-2 border border-gray-100 rounded-lg p-3 bg-white shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 bg-purple-50 rounded-md">
                    <LayoutTemplate className="h-4 w-4 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="text-xs font-medium">Use Case</h3>
                    <p className="text-xs text-gray-500 hidden md:block">Match use case compatibility</p>
                  </div>
                </div>
                <Switch 
                  checked={scoringConfig.useCase.enabled}
                  onCheckedChange={(checked) => handleConfigToggle('useCase', checked)}
                />
              </div>
              
              {scoringConfig.useCase.enabled && (
                <div className="pt-2 pl-8">
                  <div className="flex items-center justify-between mb-1">
                    <Label className="text-xs">Weight: {scoringConfig.useCase.weight}%</Label>
                  </div>
                  <Slider 
                    value={[scoringConfig.useCase.weight]}
                    onValueChange={(value) => handleWeightChange('useCase', value)}
                    min={5}
                    max={100}
                    step={5}
                    className="py-1"
                  />
                </div>
              )}
            </div>
            
            {/* Customer Base Config */}
            <div className="space-y-2 border border-gray-100 rounded-lg p-3 bg-white shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 bg-amber-50 rounded-md">
                    <Users className="h-4 w-4 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-xs font-medium">Customer Base</h3>
                    <p className="text-xs text-gray-500 hidden md:block">Match customer segments</p>
                  </div>
                </div>
                <Switch 
                  checked={scoringConfig.customerBase.enabled}
                  onCheckedChange={(checked) => handleConfigToggle('customerBase', checked)}
                />
              </div>
              
              {scoringConfig.customerBase.enabled && (
                <div className="pt-2 pl-8">
                  <div className="flex items-center justify-between mb-1">
                    <Label className="text-xs">Weight: {scoringConfig.customerBase.weight}%</Label>
                  </div>
                  <Slider 
                    value={[scoringConfig.customerBase.weight]}
                    onValueChange={(value) => handleWeightChange('customerBase', value)}
                    min={5}
                    max={100}
                    step={5}
                    className="py-1"
                  />
                </div>
              )}
            </div>
            
            {/* Positioning Config */}
            <div className="space-y-2 border border-gray-100 rounded-lg p-3 bg-white shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 bg-cyan-50 rounded-md">
                    <Target className="h-4 w-4 text-cyan-500" />
                  </div>
                  <div>
                    <h3 className="text-xs font-medium">Positioning</h3>
                    <p className="text-xs text-gray-500 hidden md:block">Match market positioning</p>
                  </div>
                </div>
                <Switch 
                  checked={scoringConfig.positioning.enabled}
                  onCheckedChange={(checked) => handleConfigToggle('positioning', checked)}
                />
              </div>
              
              {scoringConfig.positioning.enabled && (
                <div className="pt-2 pl-8">
                  <div className="flex items-center justify-between mb-1">
                    <Label className="text-xs">Weight: {scoringConfig.positioning.weight}%</Label>
                  </div>
                  <Slider 
                    value={[scoringConfig.positioning.weight]}
                    onValueChange={(value) => handleWeightChange('positioning', value)}
                    min={5}
                    max={100}
                    step={5}
                    className="py-1"
                  />
                </div>
              )}
            </div>
            
            {/* Acquisition History Config */}
            <div className="space-y-2 border border-gray-100 rounded-lg p-3 bg-white shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 bg-indigo-50 rounded-md">
                    <History className="h-4 w-4 text-indigo-500" />
                  </div>
                  <div>
                    <h3 className="text-xs font-medium">Acquisition History</h3>
                    <p className="text-xs text-gray-500 hidden md:block">Match past acquisitions</p>
                  </div>
                </div>
                <Switch 
                  checked={scoringConfig.acquisitionHistory.enabled}
                  onCheckedChange={(checked) => handleConfigToggle('acquisitionHistory', checked)}
                />
              </div>
              
              {scoringConfig.acquisitionHistory.enabled && (
                <div className="pt-2 pl-8">
                  <div className="flex items-center justify-between mb-1">
                    <Label className="text-xs">Weight: {scoringConfig.acquisitionHistory.weight}%</Label>
                  </div>
                  <Slider 
                    value={[scoringConfig.acquisitionHistory.weight]}
                    onValueChange={(value) => handleWeightChange('acquisitionHistory', value)}
                    min={5}
                    max={100}
                    step={5}
                    className="py-1"
                  />
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-end pt-3">
            <Button
              onClick={applyScoring}
              className="px-4 py-1 text-xs font-medium text-white bg-blueknight-600 hover:bg-blueknight-700"
            >
              Apply AI Configuration
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ScoringConfiguration;
