
import React, { useState } from 'react';
import { Info } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type ScoringSectionType = {
  id: string;
  name: string;
  enabled: boolean;
  weight: number;
  description: string;
};

const BuyerFilterPanel = () => {
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
    // In a real app, this would save to a database
    toast({
      title: "Template Saved",
      description: "Your scoring template has been saved successfully"
    });
  };

  const handleApplyTemplate = (template: string) => {
    // In a real app, this would load template settings
    toast({
      title: "Template Applied",
      description: `Applied template: ${template}`
    });
  };

  return (
    <div className="py-2">
      <div className="mb-4">
        <h3 className="text-sm font-medium mb-2">Saved Templates</h3>
        <ScrollArea className="h-24">
          <div className="space-y-1">
            {savedTemplates.map((template) => (
              <div key={template} className="flex items-center justify-between">
                <span className="text-sm">{template}</span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleApplyTemplate(template)}
                >
                  Apply
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
        <Button 
          size="sm" 
          variant="outline" 
          className="w-full mt-2"
          onClick={handleSaveTemplate}
        >
          Save Current as Template
        </Button>
      </div>

      <div className="mb-2">
        <h3 className="text-sm font-medium">Scoring Sections</h3>
        <p className="text-xs text-gray-500 mb-2">Adjust weights (0-100) and toggle sections</p>
      </div>

      <Accordion type="multiple" defaultValue={["offering", "customers"]} className="w-full">
        {scoringSections.map((section) => (
          <AccordionItem key={section.id} value={section.id}>
            <div className="flex items-center justify-between py-2">
              <Switch 
                checked={section.enabled}
                onCheckedChange={() => handleToggleSection(section.id)}
                className="mr-2"
              />
              <div className="flex-1 flex items-center">
                <span className={`text-sm ${section.enabled ? 'font-medium' : 'text-gray-400'}`}>
                  {section.name}
                </span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3.5 w-3.5 ml-1 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-64 text-xs">{section.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Badge 
                  variant={section.enabled ? "default" : "outline"}
                  className="ml-auto text-xs"
                >
                  {section.weight}%
                </Badge>
              </div>
              <AccordionTrigger className="ml-2" />
            </div>
            <AccordionContent>
              <div className="py-2 px-1">
                <Slider
                  defaultValue={[section.weight]}
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
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-4">
        <Button className="w-full" variant="outline" size="sm">
          Reset to Default Weights
        </Button>
      </div>
    </div>
  );
};

export default BuyerFilterPanel;
