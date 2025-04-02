
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BuyerList from '../buyers/BuyerList';
import SavedList from '../buyers/SavedList';
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import AIAssistantChat from '../ui/AIAssistantChat';
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

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

interface Preference {
  name: string;
  importance: 'high' | 'medium' | 'low' | 'N/A';
}

// Sample preferences data - in a real app, this would be fetched from API
const samplePreferences = {
  countries: [
    { name: 'United States', importance: 'high' as const },
    { name: 'United Kingdom', importance: 'medium' as const },
    { name: 'Germany', importance: 'low' as const }
  ],
  industries: [
    { name: 'Technology', importance: 'high' as const },
    { name: 'Healthcare', importance: 'medium' as const }
  ],
  endUserSectors: [
    { name: 'Enterprise', importance: 'high' as const },
    { name: 'SMB', importance: 'medium' as const }
  ],
  keywords: [
    { name: 'Software', importance: 'high' as const },
    { name: 'SaaS', importance: 'medium' as const },
    { name: 'Cloud', importance: 'low' as const }
  ],
  acquisitionReason: 'Technology Acquisition',
  potentialBuyers: [
    { name: 'Microsoft', importance: 'high' as const },
    { name: 'Google', importance: 'medium' as const }
  ],
  shareholderPreference: {
    privateEquity: true,
    peBacked: false,
    strategicTrade: true,
    noPreference: false
  }
};

const importanceOptions = [
  { label: 'High', value: 'high' },
  { label: 'Medium', value: 'medium' },
  { label: 'Low', value: 'low' },
  { label: 'N/A', value: 'N/A' },
];

const acquisitionReasons = [
  "Market Expansion",
  "Technology Acquisition",
  "Talent Acquisition",
  "Diversification",
  "Cost Synergies",
  "Vertical Integration",
  "Horizontal Integration",
  "Geographic Expansion"
];

const ListingDetails: React.FC<ListingDetailsProps> = ({
  id,
  projectTitle,
  status,
}) => {
  const statusColors = {
    active: 'bg-green-50 text-green-700',
    inactive: 'bg-red-50 text-red-700',
    pending: 'bg-yellow-50 text-yellow-700',
  };

  const [preferences, setPreferences] = useState(samplePreferences);
  const [isEditingPreferences, setIsEditingPreferences] = useState(false);
  const { toast } = useToast();

  // New input states
  const [newInputs, setNewInputs] = useState({
    country: '',
    industry: '',
    endUserSector: '',
    keyword: '',
    potentialBuyer: '',
  });

  const toggleEditPreferences = () => {
    if (isEditingPreferences) {
      // Save changes
      toast({
        title: "Preferences Updated",
        description: "Your buyer preferences have been saved",
      });
    }
    setIsEditingPreferences(!isEditingPreferences);
  };

  // Handle adding new items
  const handleAddItem = (
    type: 'countries' | 'industries' | 'endUserSectors' | 'keywords' | 'potentialBuyers',
    inputKey: 'country' | 'industry' | 'endUserSector' | 'keyword' | 'potentialBuyer'
  ) => {
    if (newInputs[inputKey] && newInputs[inputKey].trim() !== '') {
      setPreferences(prev => ({
        ...prev,
        [type]: [...prev[type], { name: newInputs[inputKey], importance: 'N/A' as const }]
      }));
      
      setNewInputs(prev => ({
        ...prev,
        [inputKey]: ''
      }));
    }
  };

  // Handle removing items
  const handleRemoveItem = (
    type: 'countries' | 'industries' | 'endUserSectors' | 'keywords' | 'potentialBuyers',
    name: string
  ) => {
    setPreferences(prev => ({
      ...prev,
      [type]: prev[type].filter(item => item.name !== name)
    }));
  };

  // Handle importance change
  const handleImportanceChange = (
    type: 'countries' | 'industries' | 'endUserSectors' | 'keywords' | 'potentialBuyers',
    name: string,
    importance: 'high' | 'medium' | 'low' | 'N/A'
  ) => {
    setPreferences(prev => ({
      ...prev,
      [type]: prev[type].map(item => 
        item.name === name ? { ...item, importance } : item
      )
    }));
  };

  // Handle acquisition reason change
  const handleAcquisitionReasonChange = (value: string) => {
    setPreferences(prev => ({
      ...prev,
      acquisitionReason: value
    }));
  };

  // Handle shareholder preference change
  const handleShareholderPreferenceChange = (key: keyof typeof preferences.shareholderPreference) => {
    setPreferences(prev => ({
      ...prev,
      shareholderPreference: {
        ...prev.shareholderPreference,
        [key]: !prev.shareholderPreference[key]
      }
    }));
  };

  // Render preference item - whether in view or edit mode
  const renderPreferenceItem = (
    type: 'countries' | 'industries' | 'endUserSectors' | 'keywords' | 'potentialBuyers',
    title: string,
    description: string,
    inputKey: 'country' | 'industry' | 'endUserSector' | 'keyword' | 'potentialBuyer',
    placeholder: string
  ) => {
    const items = preferences[type];
    
    return (
      <div className="mb-6 border-b border-gray-100 pb-6">
        <div className="flex items-start mb-2">
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-blueknight-700">{title}</h4>
            <p className="text-xs text-gray-500">{description}</p>
          </div>
          <div className="text-sm font-medium">Importance</div>
        </div>
        
        {/* Items list */}
        {items.length > 0 && (
          <div className="space-y-2 mb-3">
            {items.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{item.name}</span>
                <div className="flex items-center gap-3">
                  {isEditingPreferences ? (
                    <>
                      <Select 
                        value={item.importance} 
                        onValueChange={(value) => handleImportanceChange(type, item.name, value as 'high' | 'medium' | 'low' | 'N/A')}
                      >
                        <SelectTrigger className="w-24 h-8 text-xs">
                          <SelectValue placeholder="Importance" />
                        </SelectTrigger>
                        <SelectContent>
                          {importanceOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value} className="text-xs">
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(type, item.name)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <ChevronUp className="h-4 w-4" />
                      </button>
                    </>
                  ) : (
                    <Badge variant="outline" className={`
                      text-xs
                      ${item.importance === 'high' ? 'bg-red-50 text-red-700 border-red-200' : ''}
                      ${item.importance === 'medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : ''}
                      ${item.importance === 'low' ? 'bg-green-50 text-green-700 border-green-200' : ''}
                      ${item.importance === 'N/A' ? 'bg-gray-50 text-gray-700 border-gray-200' : ''}
                    `}>
                      {item.importance}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Add new item input - only visible in edit mode */}
        {isEditingPreferences && (
          <div className="flex items-center gap-2">
            <Input
              placeholder={placeholder}
              value={newInputs[inputKey]}
              onChange={(e) => setNewInputs(prev => ({ ...prev, [inputKey]: e.target.value }))}
              className="text-sm h-9"
            />
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={() => handleAddItem(type, inputKey)}
              className="flex items-center justify-center w-9 h-9 p-0 min-w-0"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="animate-fade-in space-y-8 w-full relative">
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-blueknight-800">{projectTitle}</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleEditPreferences}
              className="px-3 py-1 text-sm border border-blueknight-300 rounded-md text-blueknight-700 hover:bg-blueknight-50"
            >
              {isEditingPreferences ? "Save Changes" : "Edit Preferences"}
            </button>
            
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusColors[status]}`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>
        </div>
        
        {/* Buyer Preferences Section */}
        <div className="mt-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-blueknight-800">Buyer Preference</h2>
          </div>
          
          <div className="space-y-0">
            {/* Countries */}
            {renderPreferenceItem(
              'countries',
              'Country of buyer',
              'Enter as many countries as you want or use \'Any\'',
              'country',
              'Add country or \'Any\''
            )}
            
            {/* Industries */}
            {renderPreferenceItem(
              'industries',
              'What industries should the buyer operate in',
              'Start with most important or use \'Any\'',
              'industry',
              'Add industry or \'Any\''
            )}
            
            {/* End-user sectors */}
            {renderPreferenceItem(
              'endUserSectors',
              'What end-user sectors should the buyer serve',
              'Start with most important or use \'Any\'',
              'endUserSector',
              'Add end-user sector or \'Any\''
            )}
            
            {/* Keywords */}
            {renderPreferenceItem(
              'keywords',
              'Sector keywords for the buyer',
              'Provide 6 to 9 keywords',
              'keyword',
              'Add keyword'
            )}
            
            {/* Acquisition reason */}
            <div className="mb-6 border-b border-gray-100 pb-6">
              <div className="flex items-start mb-2">
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-blueknight-700">Most likely reason for acquisition</h4>
                  <p className="text-xs text-gray-500">Why would a buyer acquire this company?</p>
                </div>
                <div className="text-sm font-medium">Importance</div>
              </div>
              
              {isEditingPreferences ? (
                <div className="flex gap-2">
                  <Select 
                    value={preferences.acquisitionReason} 
                    onValueChange={handleAcquisitionReasonChange}
                  >
                    <SelectTrigger className="w-full text-sm">
                      <SelectValue placeholder="Select a reason" />
                    </SelectTrigger>
                    <SelectContent>
                      {acquisitionReasons.map((reason) => (
                        <SelectItem key={reason} value={reason} className="text-sm">
                          {reason}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select defaultValue="N/A" disabled>
                    <SelectTrigger className="w-24 h-9 text-xs">
                      <SelectValue placeholder="Importance" />
                    </SelectTrigger>
                    <SelectContent>
                      {importanceOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value} className="text-xs">
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{preferences.acquisitionReason}</span>
                  <Badge variant="outline" className="text-xs bg-gray-50 text-gray-700 border-gray-200">
                    N/A
                  </Badge>
                </div>
              )}
            </div>
            
            {/* Potential buyers */}
            {renderPreferenceItem(
              'potentialBuyers',
              'Potential buyers',
              'List companies that would be a good fit',
              'potentialBuyer',
              'Add potential buyer'
            )}
            
            {/* Shareholders' acquirer preference */}
            <div className="mb-6">
              <div className="mb-2">
                <h4 className="text-sm font-semibold text-blueknight-700">Shareholders' acquirer preference</h4>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="privateEquity" 
                    checked={preferences.shareholderPreference.privateEquity}
                    onCheckedChange={() => isEditingPreferences && handleShareholderPreferenceChange('privateEquity')}
                    disabled={!isEditingPreferences}
                  />
                  <label htmlFor="privateEquity" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Private Equity
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="peBacked" 
                    checked={preferences.shareholderPreference.peBacked}
                    onCheckedChange={() => isEditingPreferences && handleShareholderPreferenceChange('peBacked')}
                    disabled={!isEditingPreferences}
                  />
                  <label htmlFor="peBacked" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    PE-Backed
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="strategicTrade" 
                    checked={preferences.shareholderPreference.strategicTrade}
                    onCheckedChange={() => isEditingPreferences && handleShareholderPreferenceChange('strategicTrade')}
                    disabled={!isEditingPreferences}
                  />
                  <label htmlFor="strategicTrade" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Strategic Trade
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="noPreference" 
                    checked={preferences.shareholderPreference.noPreference}
                    onCheckedChange={() => isEditingPreferences && handleShareholderPreferenceChange('noPreference')}
                    disabled={!isEditingPreferences}
                  />
                  <label htmlFor="noPreference" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    No Preference
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="buyer-list" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white border border-gray-200 rounded-md shadow-sm">
          <TabsTrigger value="buyer-list" className="data-[state=active]:bg-blueknight-500 data-[state=active]:text-white font-medium">
            Buyer List
          </TabsTrigger>
          <TabsTrigger value="saved-list" className="data-[state=active]:bg-blueknight-500 data-[state=active]:text-white font-medium">
            Saved List
          </TabsTrigger>
          <TabsTrigger value="crm" className="data-[state=active]:bg-blueknight-500 data-[state=active]:text-white font-medium">
            CRM
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="buyer-list" className="mt-6 w-full">
          <BuyerList listingId={id} />
        </TabsContent>
        
        <TabsContent value="saved-list" className="mt-6 w-full">
          <SavedList listingId={id} />
        </TabsContent>
        
        <TabsContent value="crm" className="mt-6 w-full">
          <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-12 text-center">
            <h3 className="text-xl font-medium text-gray-700">CRM Features Coming Soon</h3>
            <p className="text-gray-500 mt-2">
              Our CRM functionality will be available in a future update. Stay tuned for enhanced client management tools.
            </p>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* AI Assistant Chat component is positioned here */}
      <AIAssistantChat />
    </div>
  );
};

export default ListingDetails;
