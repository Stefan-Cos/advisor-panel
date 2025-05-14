
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { InfoPopover } from '../components/InfoPopover';
import SectionContainer from '../components/SectionContainer';
import FormNavigation from '../components/FormNavigation';

interface BuyerPreferencesSectionProps {
  formData: any;
  setFormData: (data: any) => void;
  handleSubmit: () => void;
  prevStep: () => void;
}

const BuyerPreferencesSection: React.FC<BuyerPreferencesSectionProps> = ({ formData, setFormData, handleSubmit, prevStep }) => {
  const [includeGeography, setIncludeGeography] = useState(true);
  const [excludeGeography, setExcludeGeography] = useState(false);
  const [includeGeo, setIncludeGeo] = useState("");
  const [excludeGeo, setExcludeGeo] = useState("");
  
  const handleEmployeeCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, minEmployees: e.target.value }));
  };

  // Geography management
  const handleAddIncludeGeo = () => {
    if (!includeGeo.trim()) return;
    setFormData(prev => ({
      ...prev,
      includeGeographies: [...(prev.includeGeographies || []), includeGeo.trim()]
    }));
    setIncludeGeo("");
  };
  
  const handleAddExcludeGeo = () => {
    if (!excludeGeo.trim()) return;
    setFormData(prev => ({
      ...prev,
      excludeGeographies: [...(prev.excludeGeographies || []), excludeGeo.trim()]
    }));
    setExcludeGeo("");
  };
  
  const handleRemoveIncludeGeo = (index: number) => {
    setFormData(prev => ({
      ...prev,
      includeGeographies: prev.includeGeographies?.filter((_, i) => i !== index)
    }));
  };
  
  const handleRemoveExcludeGeo = (index: number) => {
    setFormData(prev => ({
      ...prev,
      excludeGeographies: prev.excludeGeographies?.filter((_, i) => i !== index)
    }));
  };

  const handleKeyDown = (type: 'include' | 'exclude', e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (type === 'include') {
        handleAddIncludeGeo();
      } else {
        handleAddExcludeGeo();
      }
    }
  };

  return (
    <SectionContainer 
      title="Buyer Preferences" 
      description="Define preferences for potential buyers of this company"
    >
      <div className="text-sm font-medium text-gray-600 mb-4">
        <span>Section 5 of 5: </span>
        <span className="text-blueknight-600 font-semibold">Buyer Preferences</span>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="minEmployees">Minimum Buyer Size (Employees)</Label>
            <InfoPopover example="This helps identify buyers of appropriate size for the acquisition" />
          </div>
          <p className="text-xs text-gray-500">Enter the minimum number of employees a buyer should have</p>
          <Input
            id="minEmployees"
            name="minEmployees"
            type="number"
            min="1"
            value={formData.minEmployees || ""}
            onChange={handleEmployeeCountChange}
            placeholder="Enter minimum employee count"
          />
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="includeGeographyCheck" 
              className="mr-2 h-4 w-4" 
              checked={includeGeography}
              onChange={() => setIncludeGeography(!includeGeography)}
            />
            <Label htmlFor="includeGeographyCheck">Include buyers from specific geographies</Label>
          </div>
          
          {includeGeography && (
            <div className="ml-6 space-y-2">
              <p className="text-xs text-gray-500">Add geographies to include</p>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.includeGeographies?.map((geo, index) => (
                  <div 
                    key={index} 
                    className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    {geo}
                    <button 
                      type="button" 
                      onClick={() => handleRemoveIncludeGeo(index)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={includeGeo}
                  onChange={(e) => setIncludeGeo(e.target.value)}
                  onKeyDown={(e) => handleKeyDown('include', e)}
                  placeholder="Add geography (e.g., North America)"
                  className="flex-1"
                />
                <Button 
                  type="button"
                  size="sm"
                  onClick={handleAddIncludeGeo}
                  disabled={!includeGeo}
                >
                  Add
                </Button>
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="excludeGeographyCheck" 
              className="mr-2 h-4 w-4" 
              checked={excludeGeography}
              onChange={() => setExcludeGeography(!excludeGeography)}
            />
            <Label htmlFor="excludeGeographyCheck">Exclude buyers from specific geographies</Label>
          </div>
          
          {excludeGeography && (
            <div className="ml-6 space-y-2">
              <p className="text-xs text-gray-500">Add geographies to exclude</p>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.excludeGeographies?.map((geo, index) => (
                  <div 
                    key={index} 
                    className="bg-red-50 text-red-700 px-2 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    {geo}
                    <button 
                      type="button" 
                      onClick={() => handleRemoveExcludeGeo(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={excludeGeo}
                  onChange={(e) => setExcludeGeo(e.target.value)}
                  onKeyDown={(e) => handleKeyDown('exclude', e)}
                  placeholder="Add geography to exclude"
                  className="flex-1"
                />
                <Button 
                  type="button"
                  size="sm"
                  onClick={handleAddExcludeGeo}
                  disabled={!excludeGeo}
                >
                  Add
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <FormNavigation 
        prevStep={prevStep}
        isLastStep={true}
        handleSubmit={handleSubmit}
      />
    </SectionContainer>
  );
};

export default BuyerPreferencesSection;
