
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Preference {
  name: string;
  importance: 'high' | 'medium' | 'low';
}

interface BuyerPreferencesSectionProps {
  preferences: {
    countries: Preference[];
    industries: Preference[];
    endUserSectors: Preference[];
    keywords: Preference[];
    acquisitionReason: string;
    shareholderPreference: {
      privateEquity: boolean;
      peBacked: boolean;
      strategicTrade: boolean;
      noPreference: boolean;
    };
  };
  onEditPreferences?: () => void;
}

const BuyerPreferencesSection: React.FC<BuyerPreferencesSectionProps> = ({ 
  preferences,
  onEditPreferences 
}) => {
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
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-blueknight-700">Buyer Preferences</h3>
        {onEditPreferences && (
          <Button 
            onClick={onEditPreferences}
            variant="outline"
            className="px-3 py-1 text-sm border border-blueknight-300 rounded-md text-blueknight-700 hover:bg-blueknight-50 h-auto"
          >
            Edit Preferences
          </Button>
        )}
      </div>
      <div className="grid grid-cols-5 gap-6">
        {/* Countries Section */}
        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-2">Country of Buyer</h4>
          <div className="flex flex-col space-y-2">
            {preferences.countries.map((country) => (
              <Badge key={country.name} variant="outline" className={`${importanceColors[country.importance]}`}>
                {country.name}
              </Badge>
            ))}
            {preferences.countries.length === 0 && (
              <span className="text-sm text-gray-500">None specified</span>
            )}
          </div>
        </div>

        {/* Industries Section */}
        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-2">Industries of Buyers</h4>
          <div className="flex flex-col space-y-2">
            {preferences.industries.map((industry) => (
              <Badge key={industry.name} variant="outline" className={`${importanceColors[industry.importance]}`}>
                {industry.name}
              </Badge>
            ))}
            {preferences.industries.length === 0 && (
              <span className="text-sm text-gray-500">None specified</span>
            )}
          </div>
        </div>

        {/* Customer Sectors Section */}
        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-2">Customer Sectors</h4>
          <div className="flex flex-col space-y-2">
            {preferences.endUserSectors.map((sector) => (
              <Badge key={sector.name} variant="outline" className={`${importanceColors[sector.importance]}`}>
                {sector.name}
              </Badge>
            ))}
            {preferences.endUserSectors.length === 0 && (
              <span className="text-sm text-gray-500">None specified</span>
            )}
          </div>
        </div>

        {/* Keywords Section */}
        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-2">Buyer Keywords</h4>
          <div className="flex flex-col space-y-2">
            {preferences.keywords.map((keyword) => (
              <Badge key={keyword.name} variant="outline" className={`${importanceColors[keyword.importance]}`}>
                {keyword.name}
              </Badge>
            ))}
            {preferences.keywords.length === 0 && (
              <span className="text-sm text-gray-500">None specified</span>
            )}
          </div>
        </div>

        {/* Buyer Preference Section (renamed from Shareholder Preferences) */}
        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-2">Buyer Preference</h4>
          <div className="flex flex-col space-y-2">
            {getActiveShareholderPreferences().map((pref) => (
              <Badge key={pref} variant="secondary">
                {pref}
              </Badge>
            ))}
            {getActiveShareholderPreferences().length === 0 && (
              <span className="text-sm text-gray-500">None specified</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerPreferencesSection;
