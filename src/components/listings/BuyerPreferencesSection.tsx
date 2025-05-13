
import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Preference {
  name: string;
  importance: 'high' | 'medium' | 'low';
}

interface BuyerPreferencesSectionProps {
  listingId?: string;
  preferences?: {
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
  listingId,
  onEditPreferences 
}) => {
  // Mock data for when actual preferences aren't provided
  const [mockPreferences] = useState({
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
      { name: 'Government', importance: 'low' as const }
    ],
    keywords: [
      { name: 'SaaS', importance: 'high' as const },
      { name: 'B2B', importance: 'medium' as const },
      { name: 'AI', importance: 'medium' as const }
    ],
    acquisitionReason: 'Strategic expansion into new markets',
    shareholderPreference: {
      privateEquity: true,
      peBacked: true,
      strategicTrade: false,
      noPreference: false
    }
  });

  // Use preferences if provided, otherwise use mock data
  const preferencesData = preferences || mockPreferences;

  const importanceColors = {
    high: 'bg-red-50 text-red-700 border-red-200',
    medium: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    low: 'bg-green-50 text-green-700 border-green-200',
  };

  const getActiveShareholderPreferences = () => {
    const active = [];
    if (preferencesData.shareholderPreference.privateEquity) active.push('Private Equity');
    if (preferencesData.shareholderPreference.peBacked) active.push('PE-Backed');
    if (preferencesData.shareholderPreference.strategicTrade) active.push('Strategic Trade');
    if (preferencesData.shareholderPreference.noPreference) active.push('No Preference');
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
            {preferencesData.countries.map((country) => (
              <Badge key={country.name} variant="outline" className={`${importanceColors[country.importance]}`}>
                {country.name}
              </Badge>
            ))}
            {preferencesData.countries.length === 0 && (
              <span className="text-sm text-gray-500">None specified</span>
            )}
          </div>
        </div>

        {/* Industries Section */}
        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-2">Industries of Buyers</h4>
          <div className="flex flex-col space-y-2">
            {preferencesData.industries.map((industry) => (
              <Badge key={industry.name} variant="outline" className={`${importanceColors[industry.importance]}`}>
                {industry.name}
              </Badge>
            ))}
            {preferencesData.industries.length === 0 && (
              <span className="text-sm text-gray-500">None specified</span>
            )}
          </div>
        </div>

        {/* Customer Sectors Section */}
        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-2">Customer Sectors</h4>
          <div className="flex flex-col space-y-2">
            {preferencesData.endUserSectors.map((sector) => (
              <Badge key={sector.name} variant="outline" className={`${importanceColors[sector.importance]}`}>
                {sector.name}
              </Badge>
            ))}
            {preferencesData.endUserSectors.length === 0 && (
              <span className="text-sm text-gray-500">None specified</span>
            )}
          </div>
        </div>

        {/* Keywords Section */}
        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-2">Buyer Keywords</h4>
          <div className="flex flex-col space-y-2">
            {preferencesData.keywords.map((keyword) => (
              <Badge key={keyword.name} variant="outline" className={`${importanceColors[keyword.importance]}`}>
                {keyword.name}
              </Badge>
            ))}
            {preferencesData.keywords.length === 0 && (
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
