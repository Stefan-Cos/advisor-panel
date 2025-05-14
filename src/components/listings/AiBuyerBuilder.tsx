
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from '@/lib/utils';
import { toast } from "@/hooks/use-toast";
import { 
  Package, 
  Lightbulb, 
  LayoutTemplate, 
  Users, 
  Target, 
  History, 
  Settings, 
  ChevronRight,
  ChevronLeft,
  BookmarkCheck
} from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import BuyerListNew from '../buyers/BuyerListNew';
import SavedList from '../buyers/SavedList';
import FilterSidebar from './FilterSidebar';

interface AiBuyerBuilderProps {
  listingId: string;
}

const AiBuyerBuilder: React.FC<AiBuyerBuilderProps> = ({ listingId }) => {
  const [activeTab, setActiveTab] = useState<string>("scoring");
  const [filterVisible, setFilterVisible] = useState<boolean>(true);
  
  // Scoring configuration state
  const [scoringConfig, setScoringConfig] = useState({
    offering: {
      enabled: true,
      weight: 100,
    },
    problemSolved: {
      enabled: true,
      weight: 100,
    },
    useCase: {
      enabled: true,
      weight: 100,
    },
    customerBase: {
      enabled: true,
      weight: 100,
    },
    positioning: {
      enabled: true,
      weight: 100,
    },
    acquisitionHistory: {
      enabled: true,
      weight: 100,
    },
  });

  // Handle scoring config toggle
  const handleConfigToggle = (key: keyof typeof scoringConfig, value: boolean) => {
    setScoringConfig(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        enabled: value
      }
    }));
  };

  // Handle scoring weight change
  const handleWeightChange = (key: keyof typeof scoringConfig, value: number[]) => {
    setScoringConfig(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        weight: value[0]
      }
    }));
  };

  // Apply scoring configuration
  const applyScoring = () => {
    toast({
      title: "Scoring Configuration Updated",
      description: "Your buyer match scoring configuration has been applied."
    });
  };

  // Toggle filter sidebar
  const toggleFilterSidebar = () => {
    setFilterVisible(!filterVisible);
  };

  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200">
      <Tabs defaultValue="scoring" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="border-b border-gray-200">
          <div className="px-4 py-2">
            <TabsList className="grid grid-cols-3 h-9">
              <TabsTrigger value="scoring" className="text-xs">
                Configure AI Scoring
              </TabsTrigger>
              <TabsTrigger value="matches" className="text-xs">
                Buyer Matches
              </TabsTrigger>
              <TabsTrigger value="saved" className="text-xs">
                Saved Buyers
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <div className="flex">
          <div className={cn(
            "transition-all duration-300 ease-in-out flex-grow",
            filterVisible ? "pr-[300px]" : "pr-0"
          )}>
            <TabsContent value="scoring" className="p-0 m-0">
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <Settings className="h-5 w-5 mr-2 text-blueknight-600" />
                  <h2 className="text-lg font-semibold text-blueknight-700">AI Buyer Match Scoring Configuration</h2>
                </div>
                
                <ScrollArea className="h-[calc(100vh-300px)] pr-4">
                  <div className="space-y-6">
                    <p className="text-sm text-gray-600 mb-4">
                      Customize how our AI engine evaluates and ranks potential buyers for your business.
                      Enable or disable matching criteria and adjust their relative importance to find your perfect match.
                    </p>

                    {/* Offering Config */}
                    <div className="space-y-3 border border-gray-100 rounded-lg p-4 bg-white shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-50 rounded-md">
                            <Package className="h-5 w-5 text-blue-500" />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium">Offering</h3>
                            <p className="text-xs text-gray-500">Match buyer data against your product/service offerings</p>
                          </div>
                        </div>
                        <Switch 
                          checked={scoringConfig.offering.enabled}
                          onCheckedChange={(checked) => handleConfigToggle('offering', checked)}
                        />
                      </div>
                      
                      {scoringConfig.offering.enabled && (
                        <div className="pt-3 pl-12">
                          <div className="flex items-center justify-between mb-1">
                            <Label className="text-xs">Weight: {scoringConfig.offering.weight}%</Label>
                          </div>
                          <Slider 
                            value={[scoringConfig.offering.weight]}
                            onValueChange={(value) => handleWeightChange('offering', value)}
                            min={5}
                            max={100}
                            step={5}
                            className="py-2"
                          />
                        </div>
                      )}
                    </div>
                    
                    {/* Problem Solved Config */}
                    <div className="space-y-3 border border-gray-100 rounded-lg p-4 bg-white shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-green-50 rounded-md">
                            <Lightbulb className="h-5 w-5 text-green-500" />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium">Problem Solved</h3>
                            <p className="text-xs text-gray-500">Match based on problems your company solves</p>
                          </div>
                        </div>
                        <Switch 
                          checked={scoringConfig.problemSolved.enabled}
                          onCheckedChange={(checked) => handleConfigToggle('problemSolved', checked)}
                        />
                      </div>
                      
                      {scoringConfig.problemSolved.enabled && (
                        <div className="pt-3 pl-12">
                          <div className="flex items-center justify-between mb-1">
                            <Label className="text-xs">Weight: {scoringConfig.problemSolved.weight}%</Label>
                          </div>
                          <Slider 
                            value={[scoringConfig.problemSolved.weight]}
                            onValueChange={(value) => handleWeightChange('problemSolved', value)}
                            min={5}
                            max={100}
                            step={5}
                            className="py-2"
                          />
                        </div>
                      )}
                    </div>
                    
                    {/* Use Case Config */}
                    <div className="space-y-3 border border-gray-100 rounded-lg p-4 bg-white shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-purple-50 rounded-md">
                            <LayoutTemplate className="h-5 w-5 text-purple-500" />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium">Use Case</h3>
                            <p className="text-xs text-gray-500">Consider buyer's use case compatibility</p>
                          </div>
                        </div>
                        <Switch 
                          checked={scoringConfig.useCase.enabled}
                          onCheckedChange={(checked) => handleConfigToggle('useCase', checked)}
                        />
                      </div>
                      
                      {scoringConfig.useCase.enabled && (
                        <div className="pt-3 pl-12">
                          <div className="flex items-center justify-between mb-1">
                            <Label className="text-xs">Weight: {scoringConfig.useCase.weight}%</Label>
                          </div>
                          <Slider 
                            value={[scoringConfig.useCase.weight]}
                            onValueChange={(value) => handleWeightChange('useCase', value)}
                            min={5}
                            max={100}
                            step={5}
                            className="py-2"
                          />
                        </div>
                      )}
                    </div>
                    
                    {/* Customer Base Config */}
                    <div className="space-y-3 border border-gray-100 rounded-lg p-4 bg-white shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-amber-50 rounded-md">
                            <Users className="h-5 w-5 text-amber-500" />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium">Customer Base</h3>
                            <p className="text-xs text-gray-500">Factor in buyer's customer segments</p>
                          </div>
                        </div>
                        <Switch 
                          checked={scoringConfig.customerBase.enabled}
                          onCheckedChange={(checked) => handleConfigToggle('customerBase', checked)}
                        />
                      </div>
                      
                      {scoringConfig.customerBase.enabled && (
                        <div className="pt-3 pl-12">
                          <div className="flex items-center justify-between mb-1">
                            <Label className="text-xs">Weight: {scoringConfig.customerBase.weight}%</Label>
                          </div>
                          <Slider 
                            value={[scoringConfig.customerBase.weight]}
                            onValueChange={(value) => handleWeightChange('customerBase', value)}
                            min={5}
                            max={100}
                            step={5}
                            className="py-2"
                          />
                        </div>
                      )}
                    </div>
                    
                    {/* Positioning Config */}
                    <div className="space-y-3 border border-gray-100 rounded-lg p-4 bg-white shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-cyan-50 rounded-md">
                            <Target className="h-5 w-5 text-cyan-500" />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium">Positioning</h3>
                            <p className="text-xs text-gray-500">Evaluate alignment with buyer's market positioning</p>
                          </div>
                        </div>
                        <Switch 
                          checked={scoringConfig.positioning.enabled}
                          onCheckedChange={(checked) => handleConfigToggle('positioning', checked)}
                        />
                      </div>
                      
                      {scoringConfig.positioning.enabled && (
                        <div className="pt-3 pl-12">
                          <div className="flex items-center justify-between mb-1">
                            <Label className="text-xs">Weight: {scoringConfig.positioning.weight}%</Label>
                          </div>
                          <Slider 
                            value={[scoringConfig.positioning.weight]}
                            onValueChange={(value) => handleWeightChange('positioning', value)}
                            min={5}
                            max={100}
                            step={5}
                            className="py-2"
                          />
                        </div>
                      )}
                    </div>
                    
                    {/* Acquisition History Config */}
                    <div className="space-y-3 border border-gray-100 rounded-lg p-4 bg-white shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-indigo-50 rounded-md">
                            <History className="h-5 w-5 text-indigo-500" />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium">Acquisition History</h3>
                            <p className="text-xs text-gray-500">Factor in buyer's past acquisition behavior</p>
                          </div>
                        </div>
                        <Switch 
                          checked={scoringConfig.acquisitionHistory.enabled}
                          onCheckedChange={(checked) => handleConfigToggle('acquisitionHistory', checked)}
                        />
                      </div>
                      
                      {scoringConfig.acquisitionHistory.enabled && (
                        <div className="pt-3 pl-12">
                          <div className="flex items-center justify-between mb-1">
                            <Label className="text-xs">Weight: {scoringConfig.acquisitionHistory.weight}%</Label>
                          </div>
                          <Slider 
                            value={[scoringConfig.acquisitionHistory.weight]}
                            onValueChange={(value) => handleWeightChange('acquisitionHistory', value)}
                            min={5}
                            max={100}
                            step={5}
                            className="py-2"
                          />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex justify-end pt-4">
                      <Button
                        onClick={applyScoring}
                        className="px-6 text-sm font-medium text-white bg-blueknight-600 hover:bg-blueknight-700"
                      >
                        Apply AI Configuration
                      </Button>
                    </div>
                  </div>
                </ScrollArea>
              </div>
            </TabsContent>
            
            <TabsContent value="matches" className="p-0 m-0">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <Target className="h-5 w-5 mr-2 text-blueknight-600" />
                    <h2 className="text-lg font-semibold text-blueknight-700">AI-Matched Buyers</h2>
                  </div>
                  <Button 
                    variant="outline" 
                    className="text-xs"
                    onClick={() => setActiveTab("scoring")}
                  >
                    <Settings className="h-4 w-4 mr-1" />
                    Configure Scoring
                  </Button>
                </div>
                <BuyerListNew listingId={listingId} />
              </div>
            </TabsContent>
            
            <TabsContent value="saved" className="p-0 m-0">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <BookmarkCheck className="h-5 w-5 mr-2 text-blueknight-600" />
                    <h2 className="text-lg font-semibold text-blueknight-700">Saved Buyers</h2>
                  </div>
                  <Button 
                    variant="outline" 
                    className="text-xs"
                    onClick={() => setActiveTab("scoring")}
                  >
                    <Settings className="h-4 w-4 mr-1" />
                    Configure Scoring
                  </Button>
                </div>
                <SavedList listingId={listingId} />
              </div>
            </TabsContent>
          </div>
          
          {/* Floating Filter Sidebar */}
          <div className={cn(
            "fixed top-[64px] bottom-0 right-0 transition-all duration-300 ease-in-out flex",
            filterVisible ? "translate-x-0" : "translate-x-[290px]"
          )}>
            <div 
              className="w-[10px] bg-gray-200 hover:bg-gray-300 cursor-pointer flex items-center justify-center"
              onClick={toggleFilterSidebar}
            >
              {filterVisible 
                ? <ChevronRight className="h-4 w-4 text-gray-600" /> 
                : <ChevronLeft className="h-4 w-4 text-gray-600" />
              }
            </div>
            <div className="w-[290px] bg-white border-l border-gray-200 shadow-md">
              <FilterSidebar />
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default AiBuyerBuilder;
