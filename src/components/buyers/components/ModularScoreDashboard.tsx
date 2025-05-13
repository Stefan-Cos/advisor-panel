
import React, { useState } from 'react';
import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ScoringSectionType {
  id: string;
  name: string;
  enabled: boolean;
  weight: number;
  description: string;
}

const ModularScoreDashboard: React.FC = () => {
  const { toast } = useToast();
  const [savedTemplates, setSavedTemplates] = useState<string[]>([
    "Default template", 
    "Strategic buyer focus", 
    "PE fund focus"
  ]);
  
  const [scoringSections, setScoringSections] = useState<ScoringSectionType[]>([
    {
      id: "offering",
      name: "Offering",
      enabled: true,
      weight: 70,
      description: "How well the buyer's current offerings align with the seller's business"
    },
    {
      id: "problem",
      name: "Problem Solved",
      enabled: true,
      weight: 60,
      description: "Alignment between problems addressed by both companies' solutions"
    },
    {
      id: "usecase",
      name: "Use Case",
      enabled: true,
      weight: 50,
      description: "How customer use cases overlap or complement each other"
    },
    {
      id: "customers",
      name: "Customers",
      enabled: true,
      weight: 80,
      description: "Overlap or complementary nature of customer bases"
    },
    {
      id: "transactions",
      name: "Previous Transactions",
      enabled: true,
      weight: 40,
      description: "Buyer's history of similar acquisitions and their success rate"
    }
  ]);

  const handleToggleSection = (id: string) => {
    setScoringSections(prev => 
      prev.map(section => 
        section.id === id 
          ? { ...section, enabled: !section.enabled } 
          : section
      )
    );
  };

  const handleWeightChange = (id: string, value: number[]) => {
    setScoringSections(prev => 
      prev.map(section => 
        section.id === id 
          ? { ...section, weight: value[0] } 
          : section
      )
    );
  };

  const handleSaveTemplate = () => {
    toast({
      title: "Template Saved",
      description: "Your scoring template has been saved successfully"
    });
  };

  const handleApplyTemplate = (template: string) => {
    toast({
      title: "Template Applied",
      description: `Applied template: ${template}`
    });
  };

  const handleResetWeights = () => {
    setScoringSections(prev => 
      prev.map(section => ({
        ...section,
        enabled: true,
        weight: 50
      }))
    );
    toast({
      title: "Weights Reset",
      description: "All weights have been reset to default values"
    });
  };

  return (
    <div className="mb-6 bg-gray-50 p-6 rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          B2B M&A Matching Dashboard
        </h2>
        
        <div className="flex gap-2">
          <div className="relative inline-block">
            <select 
              className="pl-3 pr-8 py-1 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blueknight-500"
              onChange={(e) => handleApplyTemplate(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>Load template</option>
              {savedTemplates.map(template => (
                <option key={template} value={template}>{template}</option>
              ))}
            </select>
          </div>
          <Button 
            size="sm" 
            variant="outline" 
            className="text-xs"
            onClick={handleSaveTemplate}
          >
            Save as Template
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {scoringSections.map((section) => (
          <div key={section.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Switch 
                  checked={section.enabled}
                  onCheckedChange={() => handleToggleSection(section.id)}
                  className="mr-2"
                />
                <span className={`text-sm font-medium ${section.enabled ? 'text-gray-800' : 'text-gray-400'}`}>
                  {section.name}
                </span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 ml-1 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-64 text-xs">{section.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Badge 
                variant={section.enabled ? "default" : "outline"}
                className="ml-auto text-xs"
              >
                {section.weight}%
              </Badge>
            </div>
            
            <div className="py-1 px-1">
              <Slider
                value={[section.weight]}
                max={100}
                step={1}
                className="w-full"
                disabled={!section.enabled}
                onValueChange={(value) => handleWeightChange(section.id, value)}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-end">
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleResetWeights}
        >
          Reset to Default Weights
        </Button>
      </div>
    </div>
  );
};

export default ModularScoreDashboard;
