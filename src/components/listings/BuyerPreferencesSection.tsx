
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
      <h3 className="text-lg font-semibold text-blueknight-700 mb-2">Buyer Preferences</h3>
      <div className="flex flex-wrap gap-3">
        {preferences.countries.slice(0, 2).map((country) => (
          <Badge key={country.name} variant="outline" className={`${importanceColors[country.importance]}`}>
            {country.name}
          </Badge>
        ))}
        {preferences.industries.slice(0, 2).map((industry) => (
          <Badge key={industry.name} variant="outline" className={`${importanceColors[industry.importance]}`}>
            {industry.name}
          </Badge>
        ))}
        {getActiveShareholderPreferences().slice(0, 2).map((pref) => (
          <Badge key={pref} variant="secondary">
            {pref}
          </Badge>
        ))}
        {preferences.countries.length + preferences.industries.length + getActiveShareholderPreferences().length > 6 && (
          <Badge variant="outline" className="bg-gray-100 text-gray-700">
            +{preferences.countries.length + preferences.industries.length + getActiveShareholderPreferences().length - 6} more
          </Badge>
        )}
      </div>
    </div>
  );
};

export default BuyerPreferencesSection;
