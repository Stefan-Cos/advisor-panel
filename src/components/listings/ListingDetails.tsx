
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BuyerList from '../buyers/BuyerList';
import SavedList from '../buyers/SavedList';
import BuyerPreferencesSection from './BuyerPreferencesSection';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import AIAssistantChat from '../ui/AIAssistantChat';
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

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
  importance: 'high' | 'medium' | 'low';
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
  acquisitionReason: 'Technology Acquisition',
  shareholderPreference: {
    privateEquity: true,
    peBacked: false,
    strategicTrade: true,
    noPreference: false
  }
};

const ListingDetails: React.FC<ListingDetailsProps> = ({
  id,
  companyName,
  projectTitle,
  status,
  date,
}) => {
  const statusColors = {
    active: 'bg-green-50 text-green-700',
    inactive: 'bg-red-50 text-red-700',
    pending: 'bg-yellow-50 text-yellow-700',
  };

  const [preferences, setPreferences] = useState(samplePreferences);
  const [isEditingPreferences, setIsEditingPreferences] = useState(false);

  const toggleEditPreferences = () => {
    setIsEditingPreferences(!isEditingPreferences);
  };

  const updatePreference = (type: 'countries' | 'industries', index: number, field: 'name' | 'importance', value: string) => {
    setPreferences(prev => {
      const newPreferences = {...prev};
      if (field === 'importance') {
        // Ensure importance is one of the valid types
        const importanceValue = value as 'high' | 'medium' | 'low';
        newPreferences[type][index] = {
          ...newPreferences[type][index],
          [field]: importanceValue
        };
      } else {
        newPreferences[type][index] = {
          ...newPreferences[type][index],
          [field]: value
        };
      }
      return newPreferences;
    });
  };

  const updateAcquisitionReason = (value: string) => {
    setPreferences(prev => ({
      ...prev,
      acquisitionReason: value
    }));
  };

  const updateShareholderPreference = (key: keyof typeof preferences.shareholderPreference, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      shareholderPreference: {
        ...prev.shareholderPreference,
        [key]: value
      }
    }));
  };

  return (
    <div className="animate-fade-in space-y-8 w-full relative">
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
        <div className="flex justify-between items-start">
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
        
        {/* Editable Buyer Preferences Section */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 mb-4">Buyer Preferences</h3>
          {isEditingPreferences ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Countries - Editable */}
              <div>
                <h4 className="text-sm font-semibold text-blueknight-700 mb-2">Preferred Countries</h4>
                <div className="space-y-2">
                  {preferences.countries.map((country, index) => (
                    <div key={index} className="flex flex-col gap-1">
                      <input 
                        type="text" 
                        value={country.name} 
                        onChange={(e) => updatePreference('countries', index, 'name', e.target.value)}
                        className="text-sm border border-gray-300 rounded px-2 py-1"
                      />
                      <select 
                        value={country.importance} 
                        onChange={(e) => updatePreference('countries', index, 'importance', e.target.value)}
                        className="text-xs border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Industries - Editable */}
              <div>
                <h4 className="text-sm font-semibold text-blueknight-700 mb-2">Industry Focus</h4>
                <div className="space-y-2">
                  {preferences.industries.map((industry, index) => (
                    <div key={index} className="flex flex-col gap-1">
                      <input 
                        type="text" 
                        value={industry.name} 
                        onChange={(e) => updatePreference('industries', index, 'name', e.target.value)}
                        className="text-sm border border-gray-300 rounded px-2 py-1"
                      />
                      <select 
                        value={industry.importance} 
                        onChange={(e) => updatePreference('industries', index, 'importance', e.target.value)}
                        className="text-xs border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Acquisition Reason - Editable */}
              <div>
                <h4 className="text-sm font-semibold text-blueknight-700 mb-2">Acquisition Reason</h4>
                <textarea 
                  value={preferences.acquisitionReason}
                  onChange={(e) => updateAcquisitionReason(e.target.value)}
                  className="text-sm border border-gray-300 rounded px-2 py-1 w-full"
                  rows={3}
                />
              </div>
              
              {/* Shareholder Preference - Editable */}
              <div>
                <h4 className="text-sm font-semibold text-blueknight-700 mb-2">Acquirer Type</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="privateEquity" 
                      checked={preferences.shareholderPreference.privateEquity}
                      onCheckedChange={(checked) => updateShareholderPreference('privateEquity', checked as boolean)}
                    />
                    <label htmlFor="privateEquity" className="text-sm text-gray-700">Private Equity</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="peBacked" 
                      checked={preferences.shareholderPreference.peBacked}
                      onCheckedChange={(checked) => updateShareholderPreference('peBacked', checked as boolean)}
                    />
                    <label htmlFor="peBacked" className="text-sm text-gray-700">PE-Backed</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="strategicTrade" 
                      checked={preferences.shareholderPreference.strategicTrade}
                      onCheckedChange={(checked) => updateShareholderPreference('strategicTrade', checked as boolean)}
                    />
                    <label htmlFor="strategicTrade" className="text-sm text-gray-700">Strategic Trade</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="noPreference" 
                      checked={preferences.shareholderPreference.noPreference}
                      onCheckedChange={(checked) => updateShareholderPreference('noPreference', checked as boolean)}
                    />
                    <label htmlFor="noPreference" className="text-sm text-gray-700">No Preference</label>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <BuyerPreferencesSection preferences={preferences} />
          )}
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
