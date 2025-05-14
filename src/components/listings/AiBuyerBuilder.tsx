
import React, { useState, useEffect } from 'react';
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
  Search,
  Save,
  Loader
} from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import BuyerListNew from '../buyers/BuyerListNew';
import FilterSidebar from './FilterSidebar';
import SavedSearchTable from '../buyers/components/SavedSearchTable';

interface AiBuyerBuilderProps {
  listingId: string;
}

// Sample saved searches data
const savedSearches = [
  {
    id: '1',
    name: 'Enterprise SaaS Buyers',
    date: '2024-05-01',
    filters: { revenue: '50', industry: 'Technology' }
  },
  {
    id: '2',
    name: 'PE Firms with Tech Focus',
    date: '2024-05-05',
    filters: { type: 'pe', industry: 'Technology' }
  },
  {
    id: '3',
    name: 'Strategic Buyers in Healthcare',
    date: '2024-04-28',
    filters: { industry: 'Healthcare', type: 'strategic' }
  }
];

// Format buyer data to match the structure expected by BuyerTableRow
const formatBuyerData = (buyers: any[]) => {
  return buyers.map(buyer => ({
    id: buyer.id,
    name: buyer.name,
    matchingScore: buyer.matchScore,
    location: buyer.location,
    description: `${buyer.type === 'strategic' ? 'Strategic buyer' : 'Private equity firm'} focused on ${buyer.industry || 'multiple industries'}`,
    hq: buyer.location,
    employees: Math.floor(Math.random() * 5000) + 100,
    maTrackRecord: buyer.trackRecord || (Math.random() > 0.6 ? 'High' : Math.random() > 0.3 ? 'Medium' : 'Low'),
    rationale: {
      overall: {
        text: `This ${buyer.type === 'strategic' ? 'company' : 'fund'} is a good match based on their focus in ${buyer.industry || 'your industry'} and history of similar acquisitions.`,
        score: buyer.matchScore
      }
    }
  }));
};

// Saved search dummy results with more details
const savedSearchResults = {
  '1': [
    { id: 'saas1', name: 'Enterprise Tech Solutions', matchScore: 92, location: 'San Francisco, CA', type: 'strategic', industry: 'Technology', trackRecord: 'High' },
    { id: 'saas2', name: 'Cloud Innovations Inc', matchScore: 88, location: 'Austin, TX', type: 'strategic', industry: 'SaaS', trackRecord: 'Medium' },
    { id: 'saas3', name: 'Software Ventures LLC', matchScore: 84, location: 'Seattle, WA', type: 'pe', industry: 'Technology', trackRecord: 'High' },
    { id: 'saas4', name: 'Tech Growth Partners', matchScore: 81, location: 'Boston, MA', type: 'pe', industry: 'Software', trackRecord: 'Medium' },
    { id: 'saas5', name: 'Digital Transformation Group', matchScore: 79, location: 'Chicago, IL', type: 'strategic', industry: 'Enterprise Software', trackRecord: 'Medium' }
  ],
  '2': [
    { id: 'pe1', name: 'Horizon Capital Partners', matchScore: 95, location: 'New York, NY', type: 'pe', industry: 'Technology', trackRecord: 'High' },
    { id: 'pe2', name: 'Techvest Partners', matchScore: 89, location: 'Boston, MA', type: 'pe', industry: 'Software', trackRecord: 'Medium' },
    { id: 'pe3', name: 'Growth Equity Fund', matchScore: 86, location: 'Chicago, IL', type: 'pe', industry: 'Technology', trackRecord: 'High' },
    { id: 'pe4', name: 'Innovation Ventures', matchScore: 84, location: 'San Francisco, CA', type: 'pe', industry: 'Tech Hardware', trackRecord: 'Low' },
    { id: 'pe5', name: 'Digital Growth Fund', matchScore: 82, location: 'Austin, TX', type: 'pe', industry: 'SaaS', trackRecord: 'Medium' }
  ],
  '3': [
    { id: 'hc1', name: 'HealthTech Innovations', matchScore: 91, location: 'Minneapolis, MN', type: 'strategic', industry: 'Healthcare', trackRecord: 'High' },
    { id: 'hc2', name: 'MedServe Solutions', matchScore: 87, location: 'Philadelphia, PA', type: 'strategic', industry: 'Medical Devices', trackRecord: 'Medium' },
    { id: 'hc3', name: 'BioScience Partners', matchScore: 82, location: 'San Diego, CA', type: 'pe', industry: 'Healthcare', trackRecord: 'High' },
    { id: 'hc4', name: 'Healthcare Equity Group', matchScore: 80, location: 'Boston, MA', type: 'pe', industry: 'Health IT', trackRecord: 'Medium' },
    { id: 'hc5', name: 'Medical Innovation Co', matchScore: 78, location: 'Denver, CO', type: 'strategic', industry: 'Healthcare', trackRecord: 'Low' }
  ]
};

const AiBuyerBuilder: React.FC<AiBuyerBuilderProps> = ({ listingId }) => {
  const [activeTab, setActiveTab] = useState<string>("scoring");
  const [filterVisible, setFilterVisible] = useState<boolean>(false);
  const [processing, setProcessing] = useState<boolean>(false);
  const [showMatches, setShowMatches] = useState<boolean>(false);
  const [selectedSavedSearch, setSelectedSavedSearch] = useState<string | null>(null);
  const [savedBuyers, setSavedBuyers] = useState<string[]>([]);
  const [expandedRationales, setExpandedRationales] = useState<string[]>([]);
  
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

  // Handle saving a buyer
  const handleAddToSaved = (buyerId: string) => {
    if (!savedBuyers.includes(buyerId)) {
      setSavedBuyers(prev => [...prev, buyerId]);
      toast({
        title: "Buyer Saved",
        description: "This buyer has been added to your saved list."
      });
    }
  };

  // Handle expanding a buyer rationale
  const toggleRationale = (buyerId: string) => {
    setExpandedRationales(prev => 
      prev.includes(buyerId) 
        ? prev.filter(id => id !== buyerId) 
        : [...prev, buyerId]
    );
  };

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
    setProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setProcessing(false);
      setShowMatches(true);
      toast({
        title: "Scoring Configuration Applied",
        description: "Your buyer match scoring configuration has been applied."
      });
    }, 10000); // 10 seconds processing time
  };

  // Toggle filter sidebar
  const toggleFilterSidebar = () => {
    setFilterVisible(!filterVisible);
  };

  const handleSaveSearch = () => {
    toast({
      title: "Search Saved",
      description: "Your current search has been saved successfully."
    });
  };

  // Handle clicking on a saved search
  const handleLoadSavedSearch = (id: string) => {
    setSelectedSavedSearch(id);
    
    toast({
      title: "Saved Search Loaded",
      description: `Loaded search: ${savedSearches.find(s => s.id === id)?.name}`
    });
  };

  // Reset to initial state when returning to scoring tab
  useEffect(() => {
    if (activeTab === "scoring") {
      setShowMatches(false);
      setSelectedSavedSearch(null);
    }
  }, [activeTab]);

  // Get formatted buyers for the selected saved search
  const getFormattedSavedSearchBuyers = () => {
    if (!selectedSavedSearch) return [];
    const rawBuyers = savedSearchResults[selectedSavedSearch as keyof typeof savedSearchResults] || [];
    return formatBuyerData(rawBuyers);
  };

  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200">
      <Tabs defaultValue="scoring" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="border-b border-gray-200">
          <div className="px-4 py-2">
            <TabsList className="grid grid-cols-2 h-9">
              <TabsTrigger value="scoring" className="text-xs">
                <Settings className="h-3 w-3 mr-1" />
                Configure AI Scoring
              </TabsTrigger>
              <TabsTrigger value="searches" className="text-xs">
                <Save className="h-3 w-3 mr-1" />
                Saved Searches
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <div className="flex relative">
          {/* Floating Filter Sidebar Toggle - positioned to align with feedback item in sidebar */}
          <div 
            className={cn(
              "fixed top-[200px] z-10 bg-[#001437] shadow-md rounded-r-md cursor-pointer transition-all duration-300",
              filterVisible ? "left-[280px]" : "left-0"
            )}
            onClick={toggleFilterSidebar}
          >
            <div className="p-1.5 hover:bg-opacity-80 rounded-r-md">
              {filterVisible 
                ? <ChevronLeft className="h-4 w-4 text-white" /> 
                : <ChevronRight className="h-4 w-4 text-white" />
              }
            </div>
          </div>
          
          {/* Floating Filter Sidebar */}
          <div className={cn(
            "fixed top-[64px] bottom-0 left-0 transition-all duration-300 ease-in-out z-10",
            filterVisible ? "translate-x-0" : "-translate-x-[280px]"
          )}>
            <div className="w-[280px] bg-white border-r border-gray-200 shadow-md h-full">
              <FilterSidebar />
            </div>
          </div>
          
          <div className={cn(
            "transition-all duration-300 flex-grow",
            filterVisible ? "pl-[280px]" : "pl-0"
          )}>
            <TabsContent value="scoring" className="p-0 m-0">
              {processing ? (
                <div className="p-8 flex flex-col items-center justify-center min-h-[400px] space-y-6">
                  <div className="relative">
                    <div className="w-20 h-20 border-4 border-blueknight-300 border-t-blueknight-600 rounded-full animate-spin"></div>
                    <Loader className="h-10 w-10 text-blueknight-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="text-lg font-semibold text-blueknight-700">AI Matching in Progress</h3>
                    <p className="text-sm text-gray-600">Our AI is analyzing potential buyers based on:</p>
                    <div className="flex flex-wrap justify-center gap-2 py-2">
                      {Object.entries(scoringConfig)
                        .filter(([_, config]) => config.enabled)
                        .map(([key]) => (
                          <span key={key} className="px-2 py-1 bg-blueknight-50 text-blueknight-600 rounded-full text-xs font-medium">
                            {key === 'problemSolved' ? 'Problem Solved' : 
                             key === 'useCase' ? 'Use Case' : 
                             key === 'customerBase' ? 'Customer Base' : 
                             key === 'acquisitionHistory' ? 'Acquisition History' : 
                             key.charAt(0).toUpperCase() + key.slice(1)}
                          </span>
                        ))}
                    </div>
                    <p className="text-xs text-gray-500 animate-pulse mt-4">This may take a few moments...</p>
                  </div>
                </div>
              ) : showMatches ? (
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Target className="h-4 w-4 mr-2 text-blueknight-600" />
                      <h2 className="text-base font-medium text-blueknight-700">AI-Matched Buyers</h2>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        onClick={handleSaveSearch}
                        variant="outline" 
                        size="sm" 
                        className="text-xs"
                      >
                        <Save className="h-3 w-3 mr-1" />
                        Save Search
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-xs"
                        onClick={() => {
                          setShowMatches(false);
                          setActiveTab("scoring");
                        }}
                      >
                        <Settings className="h-3 w-3 mr-1" />
                        Reconfigure
                      </Button>
                    </div>
                  </div>
                  <BuyerListNew listingId={listingId} />
                </div>
              ) : (
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
              )}
            </TabsContent>
            
            <TabsContent value="searches" className="p-0 m-0">
              {selectedSavedSearch ? (
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Search className="h-4 w-4 mr-2 text-blueknight-600" />
                      <h2 className="text-base font-medium text-blueknight-700">
                        {savedSearches.find(s => s.id === selectedSavedSearch)?.name}
                      </h2>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-xs"
                      onClick={() => setSelectedSavedSearch(null)}
                    >
                      <ChevronLeft className="h-3 w-3 mr-1" />
                      Back to Saved Searches
                    </Button>
                  </div>
                  
                  <div className="border rounded-lg p-4 bg-white shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-sm font-medium">Search Results</h3>
                        <p className="text-xs text-gray-500">
                          Saved on {savedSearches.find(s => s.id === selectedSavedSearch)?.date}
                        </p>
                      </div>
                      <Button variant="outline" size="sm" className="text-xs">
                        <Save className="h-3 w-3 mr-1" />
                        Update Search
                      </Button>
                    </div>
                    
                    {/* Using our SavedSearchTable component with the saved search data */}
                    <SavedSearchTable
                      buyers={getFormattedSavedSearchBuyers()}
                      savedBuyers={savedBuyers}
                      expandedRationales={expandedRationales}
                      onAddToSaved={handleAddToSaved}
                      toggleRationale={toggleRationale}
                    />
                  </div>
                </div>
              ) : (
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Search className="h-4 w-4 mr-2 text-blueknight-600" />
                      <h2 className="text-base font-medium text-blueknight-700">Saved Buyer Searches</h2>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {savedSearches.map((search) => (
                      <div 
                        key={search.id} 
                        className="border border-gray-100 rounded-lg p-3 bg-white shadow-sm hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleLoadSavedSearch(search.id)}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="text-sm font-medium text-gray-800">{search.name}</h3>
                            <p className="text-xs text-gray-500">Saved on {search.date}</p>
                          </div>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default AiBuyerBuilder;
