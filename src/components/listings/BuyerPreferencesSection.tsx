
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface Preference {
  name: string;
  importance: 'high' | 'medium' | 'low';
}

interface BuyerPreferencesSectionProps {
  preferences: {
    countries: Preference[];
    industries: Preference[];
    acquisitionReason: string;
    shareholderPreference: {
      privateEquity: boolean;
      peBacked: boolean;
      strategicTrade: boolean;
      noPreference: boolean;
    };
  };
}

const BuyerPreferencesSection: React.FC<BuyerPreferencesSectionProps> = ({ preferences }) => {
  const importanceColors = {
    high: 'bg-red-50 text-red-700 border-red-200',
    medium: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    low: 'bg-green-50 text-green-700 border-green-200',
  };

  const getActiveShareholderPreferences = () => {
    const active = [];
    if (preferences.shareholderPreference.privateEquity) active.push('Private Equity');
    if (preferences.shareholderPreference.peBacked) active.push('PE-Backed');
    if (preferences.shareholderPreference.strategicTrade) active.push('Strategic Trade');
    if (preferences.shareholderPreference.noPreference) active.push('No Preference');
    return active;
  };

  return (
    <div className="animate-fade-in">
      <h3 className="text-sm font-medium text-gray-500 mb-4">Buyer Preferences</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Countries */}
        <div>
          <h4 className="text-sm font-semibold text-blueknight-700 mb-2">Preferred Countries</h4>
          <div className="space-y-2">
            {preferences.countries.map((country) => (
              <div key={country.name} className="flex items-center gap-2">
                <span className="text-sm text-gray-700">{country.name}</span>
                <Badge variant="outline" className={`text-xs ${importanceColors[country.importance]}`}>
                  {country.importance}
                </Badge>
              </div>
            ))}
          </div>
        </div>
        
        {/* Industries */}
        <div>
          <h4 className="text-sm font-semibold text-blueknight-700 mb-2">Industry Focus</h4>
          <div className="space-y-2">
            {preferences.industries.map((industry) => (
              <div key={industry.name} className="flex items-center gap-2">
                <span className="text-sm text-gray-700">{industry.name}</span>
                <Badge variant="outline" className={`text-xs ${importanceColors[industry.importance]}`}>
                  {industry.importance}
                </Badge>
              </div>
            ))}
          </div>
        </div>
        
        {/* Acquisition Reason */}
        <div>
          <h4 className="text-sm font-semibold text-blueknight-700 mb-2">Acquisition Reason</h4>
          <div className="text-sm text-gray-700">
            {preferences.acquisitionReason}
          </div>
        </div>
        
        {/* Shareholder Preference */}
        <div>
          <h4 className="text-sm font-semibold text-blueknight-700 mb-2">Acquirer Type</h4>
          <div className="flex flex-wrap gap-1">
            {getActiveShareholderPreferences().map((pref) => (
              <Badge key={pref} variant="secondary" className="text-xs">
                {pref}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerPreferencesSection;
