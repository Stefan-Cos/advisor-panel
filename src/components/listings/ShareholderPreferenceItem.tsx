
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";

interface ShareholderPreferenceItemProps {
  preferences: {
    privateEquity: boolean;
    peBacked: boolean;
    strategicTrade: boolean;
    noPreference: boolean;
  };
  isEditing: boolean;
  onChange: (key: keyof ShareholderPreferenceItemProps['preferences']) => void;
}

const ShareholderPreferenceItem: React.FC<ShareholderPreferenceItemProps> = ({
  preferences,
  isEditing,
  onChange
}) => {
  return (
    <div className="mb-6">
      <div className="mb-2">
        <h4 className="text-sm font-semibold text-blueknight-700">Shareholders' acquirer preference</h4>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="privateEquity" 
            checked={preferences.privateEquity}
            onCheckedChange={() => isEditing && onChange('privateEquity')}
            disabled={!isEditing}
          />
          <label htmlFor="privateEquity" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Private Equity
          </label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="peBacked" 
            checked={preferences.peBacked}
            onCheckedChange={() => isEditing && onChange('peBacked')}
            disabled={!isEditing}
          />
          <label htmlFor="peBacked" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            PE-Backed
          </label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="strategicTrade" 
            checked={preferences.strategicTrade}
            onCheckedChange={() => isEditing && onChange('strategicTrade')}
            disabled={!isEditing}
          />
          <label htmlFor="strategicTrade" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Strategic Trade
          </label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="noPreference" 
            checked={preferences.noPreference}
            onCheckedChange={() => isEditing && onChange('noPreference')}
            disabled={!isEditing}
          />
          <label htmlFor="noPreference" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            No Preference
          </label>
        </div>
      </div>
    </div>
  );
};

export default ShareholderPreferenceItem;
