
import React from 'react';
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RotateCcw } from 'lucide-react';

interface AIConfigurationProps {
  config: {
    offeringWeight: number;
    problemSolvedWeight: number;
    useCaseWeight: number;
    customersWeight: number;
  };
  onConfigChange: (config: AIConfigurationProps['config']) => void;
}

const AIConfiguration: React.FC<AIConfigurationProps> = ({ config, onConfigChange }) => {
  const handleWeightChange = (key: keyof typeof config, value: number[]) => {
    const newConfig = { ...config, [key]: value[0] };
    
    // Ensure total doesn't exceed 100
    const total = Object.values(newConfig).reduce((sum, val) => sum + val, 0);
    if (total <= 100) {
      onConfigChange(newConfig);
    }
  };

  const resetToDefaults = () => {
    onConfigChange({
      offeringWeight: 25,
      problemSolvedWeight: 25,
      useCaseWeight: 25,
      customersWeight: 25
    });
  };

  const totalWeight = Object.values(config).reduce((sum, val) => sum + val, 0);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="offering-weight">Offering Weight: {config.offeringWeight}%</Label>
          <Slider
            id="offering-weight"
            min={0}
            max={100}
            step={1}
            value={[config.offeringWeight]}
            onValueChange={(value) => handleWeightChange('offeringWeight', value)}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="problem-weight">Problem Solved Weight: {config.problemSolvedWeight}%</Label>
          <Slider
            id="problem-weight"
            min={0}
            max={100}
            step={1}
            value={[config.problemSolvedWeight]}
            onValueChange={(value) => handleWeightChange('problemSolvedWeight', value)}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="usecase-weight">Use Case Weight: {config.useCaseWeight}%</Label>
          <Slider
            id="usecase-weight"
            min={0}
            max={100}
            step={1}
            value={[config.useCaseWeight]}
            onValueChange={(value) => handleWeightChange('useCaseWeight', value)}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="customers-weight">Customers Weight: {config.customersWeight}%</Label>
          <Slider
            id="customers-weight"
            min={0}
            max={100}
            step={1}
            value={[config.customersWeight]}
            onValueChange={(value) => handleWeightChange('customersWeight', value)}
            className="w-full"
          />
        </div>
      </div>

      <div className="pt-4 border-t">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium">Total Weight:</span>
          <span className={`text-sm font-bold ${totalWeight === 100 ? 'text-green-600' : 'text-orange-600'}`}>
            {totalWeight}%
          </span>
        </div>

        <Button
          onClick={resetToDefaults}
          variant="outline"
          size="sm"
          className="w-full"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset to Defaults
        </Button>
      </div>

      {totalWeight !== 100 && (
        <div className="text-xs text-orange-600 bg-orange-50 p-2 rounded">
          Note: Total weight should equal 100% for optimal analysis results.
        </div>
      )}
    </div>
  );
};

export default AIConfiguration;
