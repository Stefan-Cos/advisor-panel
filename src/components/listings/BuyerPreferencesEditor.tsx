import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import PreferenceItem, { ImportanceType } from './PreferenceItem';
import AcquisitionReasonItem from './AcquisitionReasonItem';
import ShareholderPreferenceItem from './ShareholderPreferenceItem';

interface Preference {
  name: string;
  importance: ImportanceType;
}

interface ShareholderPreference {
  privateEquity: boolean;
  peBacked: boolean;
  strategicTrade: boolean;
  noPreference: boolean;
}

interface BuyerPreferences {
  countries: Preference[];
  industries: Preference[];
  endUserSectors: Preference[];
  keywords: Preference[];
  acquisitionReason: string;
  potentialBuyers: Preference[];
  shareholderPreference: ShareholderPreference;
}

interface BuyerPreferencesEditorProps {
  initialPreferences: BuyerPreferences;
}

// Sample preferences data - in a real app, this would be fetched from API
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

const BuyerPreferencesEditor: React.FC<BuyerPreferencesEditorProps> = ({ initialPreferences }) => {
  const [preferences, setPreferences] = useState<BuyerPreferences>(initialPreferences);
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
      toast("Preferences Updated", {
        description: "Your buyer preferences have been applied",
      });
    }
    setIsEditingPreferences(!isEditingPreferences);
  };

  // Handle adding new items
  const handleAddItem = (
    type: keyof typeof newInputs | 'countries' | 'industries' | 'endUserSectors' | 'keywords' | 'potentialBuyers',
    inputKey: keyof typeof newInputs
  ) => {
    if (newInputs[inputKey] && newInputs[inputKey].trim() !== '') {
      setPreferences(prev => ({
        ...prev,
        [type]: [...prev[type as keyof BuyerPreferences] as Preference[], { name: newInputs[inputKey], importance: 'N/A' as const }]
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
      [type]: (prev[type] as Preference[]).filter(item => item.name !== name)
    }));
  };

  // Handle importance change
  const handleImportanceChange = (
    type: 'countries' | 'industries' | 'endUserSectors' | 'keywords' | 'potentialBuyers',
    name: string,
    importance: ImportanceType
  ) => {
    setPreferences(prev => ({
      ...prev,
      [type]: (prev[type] as Preference[]).map(item => 
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
  const handleShareholderPreferenceChange = (key: keyof ShareholderPreference) => {
    setPreferences(prev => ({
      ...prev,
      shareholderPreference: {
        ...prev.shareholderPreference,
        [key]: !prev.shareholderPreference[key]
      }
    }));
  };

  // Handle input changes
  const handleInputChange = (key: keyof typeof newInputs, value: string) => {
    setNewInputs(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-blueknight-800">Buyer Preference</h2>
        <Button 
          onClick={toggleEditPreferences}
          variant="outline"
          className="px-3 py-1 text-sm border border-blueknight-300 rounded-md text-blueknight-700 hover:bg-blueknight-50 h-auto"
        >
          {isEditingPreferences ? "Save Changes" : "Edit Preferences"}
        </Button>
      </div>
      
      <div className="space-y-0">
        {/* Countries */}
        <PreferenceItem 
          title="Country of buyer"
          description="Enter as many countries as you want or use 'Any'"
          items={preferences.countries}
          isEditing={isEditingPreferences}
          inputValue={newInputs.country}
          placeholder="Add country or 'Any'"
          onInputChange={(value) => handleInputChange('country', value)}
          onAddItem={() => handleAddItem('countries', 'country')}
          onRemoveItem={(name) => handleRemoveItem('countries', name)}
          onImportanceChange={(name, importance) => handleImportanceChange('countries', name, importance)}
        />
        
        {/* Industries */}
        <PreferenceItem 
          title="What industries should the buyer operate in"
          description="Start with most important or use 'Any'"
          items={preferences.industries}
          isEditing={isEditingPreferences}
          inputValue={newInputs.industry}
          placeholder="Add industry or 'Any'"
          onInputChange={(value) => handleInputChange('industry', value)}
          onAddItem={() => handleAddItem('industries', 'industry')}
          onRemoveItem={(name) => handleRemoveItem('industries', name)}
          onImportanceChange={(name, importance) => handleImportanceChange('industries', name, importance)}
        />
        
        {/* End-user sectors */}
        <PreferenceItem 
          title="What end-user sectors should the buyer serve"
          description="Start with most important or use 'Any'"
          items={preferences.endUserSectors}
          isEditing={isEditingPreferences}
          inputValue={newInputs.endUserSector}
          placeholder="Add end-user sector or 'Any'"
          onInputChange={(value) => handleInputChange('endUserSector', value)}
          onAddItem={() => handleAddItem('endUserSectors', 'endUserSector')}
          onRemoveItem={(name) => handleRemoveItem('endUserSectors', name)}
          onImportanceChange={(name, importance) => handleImportanceChange('endUserSectors', name, importance)}
        />
        
        {/* Keywords */}
        <PreferenceItem 
          title="Sector keywords for the buyer"
          description="Provide 6 to 9 keywords"
          items={preferences.keywords}
          isEditing={isEditingPreferences}
          inputValue={newInputs.keyword}
          placeholder="Add keyword"
          onInputChange={(value) => handleInputChange('keyword', value)}
          onAddItem={() => handleAddItem('keywords', 'keyword')}
          onRemoveItem={(name) => handleRemoveItem('keywords', name)}
          onImportanceChange={(name, importance) => handleImportanceChange('keywords', name, importance)}
        />
        
        {/* Acquisition reason */}
        <AcquisitionReasonItem 
          title="Most likely reason for acquisition"
          description="Why would a buyer acquire this company?"
          value={preferences.acquisitionReason}
          isEditing={isEditingPreferences}
          options={acquisitionReasons}
          onChange={handleAcquisitionReasonChange}
        />
        
        {/* Potential buyers */}
        <PreferenceItem 
          title="Potential buyers"
          description="List companies that would be a good fit"
          items={preferences.potentialBuyers}
          isEditing={isEditingPreferences}
          inputValue={newInputs.potentialBuyer}
          placeholder="Add potential buyer"
          onInputChange={(value) => handleInputChange('potentialBuyer', value)}
          onAddItem={() => handleAddItem('potentialBuyers', 'potentialBuyer')}
          onRemoveItem={(name) => handleRemoveItem('potentialBuyers', name)}
          onImportanceChange={(name, importance) => handleImportanceChange('potentialBuyers', name, importance)}
        />
        
        {/* Shareholders' acquirer preference */}
        <ShareholderPreferenceItem 
          preferences={preferences.shareholderPreference}
          isEditing={isEditingPreferences}
          onChange={handleShareholderPreferenceChange}
        />
      </div>
    </div>
  );
};

export default BuyerPreferencesEditor;
