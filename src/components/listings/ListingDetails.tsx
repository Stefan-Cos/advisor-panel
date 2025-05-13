
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PieChart, Search, Filter, X, ChevronDown, Settings, Zap, Sliders, Package, Lightbulb, LayoutTemplate, Users, Target, History } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BuyerListNew from '../buyers/BuyerListNew';
import SavedList from '../buyers/SavedList';
import { cn } from '@/lib/utils';
import { toast } from "@/hooks/use-toast";
import Tag from '../ui/Tag';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ListingDetailsProps {
  id: string;
  companyName: string;
  projectTitle: string;
  revenue: string;
  industry: string;
  country: string;
  status: 'active' | 'inactive' | 'pending';
  date: string;
}

const ListingDetails: React.FC<ListingDetailsProps> = ({
  id,
  projectTitle,
  revenue,
  industry,
  country,
  status,
}) => {
  const location = useLocation();
  const path = location.pathname;
  const [showFilters, setShowFilters] = useState(true);

  // Keyword search state with tags
  const [offeringKeywords, setOfferingKeywords] = useState<string[]>([]);
  const [sectorKeywords, setSectorKeywords] = useState<string[]>([]);
  const [customerKeywords, setCustomerKeywords] = useState<string[]>([]);
  const [offeringInput, setOfferingInput] = useState('');
  const [sectorInput, setSectorInput] = useState('');
  const [customerInput, setCustomerInput] = useState('');
  
  // Keyword operators - updated to only use 'AND' or 'OR'
  const [offeringOperator, setOfferingOperator] = useState<'AND' | 'OR'>('OR');
  const [sectorOperator, setSectorOperator] = useState<'AND' | 'OR'>('OR');
  const [customerOperator, setCustomerOperator] = useState<'AND' | 'OR'>('OR');

  // Config state for scoring with updated categories
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

  // Determine which content to show based on the URL path
  const showAIBuyerBuilder = path.includes('/ai-buyer');
  const showSavedList = path.includes('/saved');
  const showCRM = path.includes('/crm');

  // Handle adding keywords as tags
  const handleAddKeyword = (
    category: 'offering' | 'sector' | 'customer',
    inputValue: string
  ) => {
    if (inputValue.trim()) {
      if (category === 'offering') {
        setOfferingKeywords([...offeringKeywords, inputValue.trim()]);
        setOfferingInput('');
      } else if (category === 'sector') {
        setSectorKeywords([...sectorKeywords, inputValue.trim()]);
        setSectorInput('');
      } else {
        setCustomerKeywords([...customerKeywords, inputValue.trim()]);
        setCustomerInput('');
      }
    }
  };

  // Handle removing keywords
  const handleRemoveKeyword = (
    category: 'offering' | 'sector' | 'customer',
    keyword: string
  ) => {
    if (category === 'offering') {
      setOfferingKeywords(offeringKeywords.filter(k => k !== keyword));
    } else if (category === 'sector') {
      setSectorKeywords(sectorKeywords.filter(k => k !== keyword));
    } else {
      setCustomerKeywords(customerKeywords.filter(k => k !== keyword));
    }
  };

  // Handle operator change - updated to only use 'AND' or 'OR'
  const handleOperatorChange = (
    category: 'offering' | 'sector' | 'customer',
    operator: 'AND' | 'OR'
  ) => {
    if (category === 'offering') {
      setOfferingOperator(operator);
    } else if (category === 'sector') {
      setSectorOperator(operator);
    } else {
      setCustomerOperator(operator);
    }
  };

  // Apply filters
  const applyFilters = () => {
    toast("Filters Applied", {
      description: "Your search filters have been applied successfully."
    });
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
    toast("Scoring Configuration Updated", {
      description: "Your buyer match scoring configuration has been applied."
    });
  };

  // Horizontal filters for AI Buyer Builder
  const renderHorizontalFilters = () => {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-4">
        {/* Custom Builder Section */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Zap className="h-4 w-4 mr-2 text-amber-500" />
            <h3 className="text-sm font-medium">Custom Builder</h3>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <button 
                className="flex items-center text-xs text-blueknight-600 hover:text-blueknight-800"
              >
                <Sliders className="h-3.5 w-3.5 mr-1" />
                Configure Scoring
              </button>
            </SheetTrigger>
            <SheetContent className="w-[320px] sm:w-[380px] overflow-hidden">
              <SheetHeader>
                <SheetTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-blueknight-600" />
                  Configure Buyer Match Scoring
                </SheetTitle>
                <SheetDescription>
                  Adjust how buyers are scored and matched to your listing. Toggle features on/off and set their relative importance.
                </SheetDescription>
              </SheetHeader>
              
              <ScrollArea className="h-[calc(100vh-140px)] pr-4">
                <div className="py-4 space-y-5">
                  {/* Offering Config */}
                  <div className="space-y-3 border-b border-gray-100 pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="p-1.5 bg-blue-50 rounded-md">
                          <Package className="h-4 w-4 text-blue-500" />
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
                      <div className="pt-2">
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
                  <div className="space-y-3 border-b border-gray-100 pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="p-1.5 bg-green-50 rounded-md">
                          <Lightbulb className="h-4 w-4 text-green-500" />
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
                      <div className="pt-2">
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
                  <div className="space-y-3 border-b border-gray-100 pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="p-1.5 bg-purple-50 rounded-md">
                          <LayoutTemplate className="h-4 w-4 text-purple-500" />
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
                      <div className="pt-2">
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
                  <div className="space-y-3 border-b border-gray-100 pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="p-1.5 bg-amber-50 rounded-md">
                          <Users className="h-4 w-4 text-amber-500" />
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
                      <div className="pt-2">
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
                  <div className="space-y-3 border-b border-gray-100 pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="p-1.5 bg-cyan-50 rounded-md">
                          <Target className="h-4 w-4 text-cyan-500" />
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
                      <div className="pt-2">
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
                  <div className="space-y-3 pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="p-1.5 bg-indigo-50 rounded-md">
                          <History className="h-4 w-4 text-indigo-500" />
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
                      <div className="pt-2">
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
                  
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={applyScoring}
                      className="px-4 py-2 text-sm font-medium text-white bg-blueknight-600 rounded-md hover:bg-blueknight-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blueknight-500"
                    >
                      Apply Configuration
                    </button>
                  </div>
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>

        {/* Filter Options Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Filter className="h-4 w-4 mr-2 text-gray-600" />
            <h3 className="text-sm font-medium">Filter Options</h3>
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)} 
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            {showFilters ? 'Hide' : 'Show'} Filters
          </button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-4">
            {/* HQ Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                HQ
              </label>
              <div className="relative">
                <select className="w-full h-8 pl-2 pr-8 text-xs border border-gray-300 rounded-md bg-white appearance-none">
                  <option value="">All Countries</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="Germany">Germany</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
              </div>
            </div>

            {/* Employees Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Employees
              </label>
              <div className="relative">
                <select className="w-full h-8 pl-2 pr-8 text-xs border border-gray-300 rounded-md bg-white appearance-none">
                  <option value="">Any</option>
                  <option value="100">100+</option>
                  <option value="500">500+</option>
                  <option value="1000">1000+</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
              </div>
            </div>

            {/* Revenue Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Revenue ($M)
              </label>
              <div className="relative">
                <select className="w-full h-8 pl-2 pr-8 text-xs border border-gray-300 rounded-md bg-white appearance-none">
                  <option value="">Any</option>
                  <option value="10">$10M+</option>
                  <option value="50">$50M+</option>
                  <option value="100">$100M+</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
              </div>
            </div>

            {/* Cash Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Cash ($M)
              </label>
              <div className="relative">
                <select className="w-full h-8 pl-2 pr-8 text-xs border border-gray-300 rounded-md bg-white appearance-none">
                  <option value="">Any</option>
                  <option value="5">$5M+</option>
                  <option value="10">$10M+</option>
                  <option value="25">$25M+</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
              </div>
            </div>

            {/* PE/VC-Backed Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                PE/VC-Backed
              </label>
              <div className="relative">
                <select className="w-full h-8 pl-2 pr-8 text-xs border border-gray-300 rounded-md bg-white appearance-none">
                  <option value="">Any</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
              </div>
            </div>

            {/* Minimum Fit Score Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Minimum Fit Score
              </label>
              <div className="relative">
                <select className="w-full h-8 pl-2 pr-8 text-xs border border-gray-300 rounded-md bg-white appearance-none">
                  <option value="0">Any</option>
                  <option value="60">60%+</option>
                  <option value="70">70%+</option>
                  <option value="80">80%+</option>
                  <option value="90">90%+</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
              </div>
            </div>
          </div>
        )}

        {showFilters && (
          <div>
            <div className="flex items-center mb-2">
              <Search className="h-3.5 w-3.5 mr-2 text-gray-600" />
              <h4 className="text-xs font-medium">Keyword Search</h4>
            </div>
            
            {/* Improved keyword search sections */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Offering Keywords */}
              <div className="mb-2">
                <h5 className="text-xs font-medium text-gray-700 mb-2">Offering</h5>
                <div className="space-y-2">
                  {/* Keyword Tags */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {offeringKeywords.map((keyword, idx) => (
                      <Tag 
                        key={`offering-${idx}`} 
                        text={keyword} 
                        color="blue" 
                        onRemove={() => handleRemoveKeyword('offering', keyword)} 
                      />
                    ))}
                  </div>
                  
                  {/* Keyword Input with operator selection - only AND/OR */}
                  <div className="flex items-center space-x-2">
                    {offeringKeywords.length > 0 && (
                      <select 
                        className="h-8 pl-2 pr-2 text-xs border border-gray-300 rounded-md bg-white w-20"
                        value={offeringOperator}
                        onChange={(e) => handleOperatorChange(
                          'offering', 
                          e.target.value as 'AND' | 'OR'
                        )}
                      >
                        <option value="AND">AND</option>
                        <option value="OR">OR</option>
                      </select>
                    )}
                    <div className="flex-grow relative">
                      <Input
                        type="text"
                        className="h-8 pl-2 pr-8 text-xs"
                        placeholder="Enter offering keyword..."
                        value={offeringInput}
                        onChange={(e) => setOfferingInput(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleAddKeyword('offering', offeringInput);
                          }
                        }}
                      />
                      {offeringInput && (
                        <button 
                          className="absolute right-2 top-1/2 transform -translate-y-1/2"
                          onClick={() => handleAddKeyword('offering', offeringInput)}
                        >
                          <X className="h-3.5 w-3.5 text-gray-400 hover:text-gray-600" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Sectors Keywords */}
              <div className="mb-2">
                <h5 className="text-xs font-medium text-gray-700 mb-2">Sectors</h5>
                <div className="space-y-2">
                  {/* Keyword Tags */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {sectorKeywords.map((keyword, idx) => (
                      <Tag 
                        key={`sector-${idx}`} 
                        text={keyword} 
                        color="green" 
                        onRemove={() => handleRemoveKeyword('sector', keyword)} 
                      />
                    ))}
                  </div>
                  
                  {/* Keyword Input with operator selection - only AND/OR */}
                  <div className="flex items-center space-x-2">
                    {sectorKeywords.length > 0 && (
                      <select 
                        className="h-8 pl-2 pr-2 text-xs border border-gray-300 rounded-md bg-white w-20"
                        value={sectorOperator}
                        onChange={(e) => handleOperatorChange(
                          'sector', 
                          e.target.value as 'AND' | 'OR'
                        )}
                      >
                        <option value="AND">AND</option>
                        <option value="OR">OR</option>
                      </select>
                    )}
                    <div className="flex-grow relative">
                      <Input
                        type="text"
                        className="h-8 pl-2 pr-8 text-xs"
                        placeholder="Enter sector keyword..."
                        value={sectorInput}
                        onChange={(e) => setSectorInput(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleAddKeyword('sector', sectorInput);
                          }
                        }}
                      />
                      {sectorInput && (
                        <button 
                          className="absolute right-2 top-1/2 transform -translate-y-1/2"
                          onClick={() => handleAddKeyword('sector', sectorInput)}
                        >
                          <X className="h-3.5 w-3.5 text-gray-400 hover:text-gray-600" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Customers Keywords */}
              <div className="mb-2">
                <h5 className="text-xs font-medium text-gray-700 mb-2">Customers</h5>
                <div className="space-y-2">
                  {/* Keyword Tags */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {customerKeywords.map((keyword, idx) => (
                      <Tag 
                        key={`customer-${idx}`} 
                        text={keyword} 
                        color="yellow" 
                        onRemove={() => handleRemoveKeyword('customer', keyword)} 
                      />
                    ))}
                  </div>
                  
                  {/* Keyword Input with operator selection - only AND/OR */}
                  <div className="flex items-center space-x-2">
                    {customerKeywords.length > 0 && (
                      <select 
                        className="h-8 pl-2 pr-2 text-xs border border-gray-300 rounded-md bg-white w-20"
                        value={customerOperator}
                        onChange={(e) => handleOperatorChange(
                          'customer', 
                          e.target.value as 'AND' | 'OR'
                        )}
                      >
                        <option value="AND">AND</option>
                        <option value="OR">OR</option>
                      </select>
                    )}
                    <div className="flex-grow relative">
                      <Input
                        type="text"
                        className="h-8 pl-2 pr-8 text-xs"
                        placeholder="Enter customer keyword..."
                        value={customerInput}
                        onChange={(e) => setCustomerInput(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleAddKeyword('customer', customerInput);
                          }
                        }}
                      />
                      {customerInput && (
                        <button 
                          className="absolute right-2 top-1/2 transform -translate-y-1/2"
                          onClick={() => handleAddKeyword('customer', customerInput)}
                        >
                          <X className="h-3.5 w-3.5 text-gray-400 hover:text-gray-600" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex justify-end mt-3">
          <button 
            className="px-3 py-1.5 text-xs font-medium bg-blueknight-500 text-white rounded-md hover:bg-blueknight-600"
            onClick={applyFilters}
          >
            Apply Filters
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4 w-full relative">
      {/* Show content based on the current route */}
      {showSavedList ? (
        <SavedList listingId={id} />
      ) : showCRM ? (
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-12 text-center">
          <h3 className="text-xl font-medium text-gray-700">CRM Features Coming Soon</h3>
          <p className="text-gray-500 mt-2">
            Our CRM functionality will be available in a future update. Stay tuned for enhanced contacting management tools.
          </p>
        </div>
      ) : showAIBuyerBuilder ? (
        // AI Buyer Builder content with horizontal filters
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-medium text-blueknight-700">AI Buyer Builder</h2>
          </div>
          
          {/* New horizontal filters */}
          {renderHorizontalFilters()}
          
          <BuyerListNew listingId={id} />
        </div>
      ) : (
        // Default content (BlueKnight List)
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-medium text-blueknight-700 mb-4">BlueKnight List</h2>
          <BuyerListNew listingId={id} />
        </div>
      )}
    </div>
  );
};

export default ListingDetails;
