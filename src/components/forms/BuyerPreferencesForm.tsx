
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, X, ChevronDown } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import Tag from '../ui/Tag';
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";

const importanceOptions = [
  { label: 'High', value: 'high' },
  { label: 'Medium', value: 'medium' },
  { label: 'Low', value: 'low' },
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

const BuyerPreferencesForm = () => {
  // State for form data
  const [formState, setFormState] = useState({
    countries: ['United States', 'United Kingdom'],
    industries: ['Technology', 'Healthcare'],
    endUserSectors: [] as string[],
    keywords: ['Software', 'Healthcare IT', 'Enterprise', 'SaaS'],
    acquisitionReason: 'Market Expansion',
    potentialBuyers: [] as string[],
    shareholderPreference: {
      privateEquity: false,
      peBacked: false,
      strategicTrade: false,
      noPreference: true,
    }
  });

  // State for new input values
  const [inputValues, setInputValues] = useState({
    country: '',
    industry: '',
    endUserSector: '',
    keyword: '',
    potentialBuyer: '',
  });

  // State for editing mode and edited item
  const [editingItems, setEditingItems] = useState({
    countries: {} as Record<string, boolean>,
    industries: {} as Record<string, boolean>,
    endUserSectors: {} as Record<string, boolean>,
  });
  
  const [editedValues, setEditedValues] = useState({
    countries: {} as Record<string, string>,
    industries: {} as Record<string, string>,
    endUserSectors: {} as Record<string, string>,
  });

  // State for importance rankings
  const [importanceValues, setImportanceValues] = useState({
    countries: {
      'United States': 'high',
      'United Kingdom': 'medium',
    },
    industries: {
      'Technology': 'high',
      'Healthcare': 'medium',
    },
    endUserSectors: {} as Record<string, string>,
    keywords: {} as Record<string, string>,
    acquisitionReason: 'high',
    potentialBuyers: {} as Record<string, string>,
  });

  const navigate = useNavigate();
  const { toast } = useToast();

  // Handle adding new items
  const handleAddItem = (key: keyof typeof inputValues) => {
    if (inputValues[key] && inputValues[key].trim() !== '') {
      const formKey = key === 'country' ? 'countries' :
                      key === 'industry' ? 'industries' :
                      key === 'endUserSector' ? 'endUserSectors' :
                      key === 'keyword' ? 'keywords' :
                      'potentialBuyers';
      
      const newItem = inputValues[key];
      
      setFormState(prevState => ({
        ...prevState,
        [formKey]: [...prevState[formKey as keyof typeof prevState] as string[], newItem]
      }));
      
      // Set default importance for the new item
      if (formKey !== 'keywords') {
        setImportanceValues(prevValues => {
          const importanceKey = formKey as keyof typeof importanceValues;
          return {
            ...prevValues,
            [importanceKey]: {
              ...prevValues[importanceKey] as Record<string, string>,
              [newItem]: 'medium'
            }
          };
        });
      }
      
      setInputValues(prev => ({
        ...prev,
        [key]: ''
      }));
    }
  };

  // Handle removing items
  const handleRemoveItem = (key: keyof typeof formState, item: string) => {
    setFormState(prevState => ({
      ...prevState,
      [key]: (prevState[key] as string[]).filter(i => i !== item)
    }));
    
    // Remove importance value for this item
    if (key !== 'keywords') {
      setImportanceValues(prevValues => {
        const importanceKey = key as keyof typeof importanceValues;
        const newImportance = { ...prevValues[importanceKey] as Record<string, string> };
        delete newImportance[item];
        
        return {
          ...prevValues,
          [importanceKey]: newImportance
        };
      });
    }
  };

  // Toggle edit mode for an item
  const toggleEditMode = (category: 'countries' | 'industries' | 'endUserSectors', item: string) => {
    setEditingItems(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [item]: !prev[category][item]
      }
    }));
    
    // Initialize edit value
    if (!editedValues[category][item]) {
      setEditedValues(prev => ({
        ...prev,
        [category]: {
          ...prev[category],
          [item]: item
        }
      }));
    }
  };

  // Handle edit change
  const handleEditChange = (category: 'countries' | 'industries' | 'endUserSectors', item: string, value: string) => {
    setEditedValues(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [item]: value
      }
    }));
  };

  // Save edited item
  const saveEditedItem = (category: 'countries' | 'industries' | 'endUserSectors', item: string) => {
    const editedValue = editedValues[category][item];
    
    if (editedValue && editedValue !== item) {
      // Replace the item in the array
      setFormState(prevState => {
        const items = [...prevState[category]];
        const index = items.indexOf(item);
        
        if (index !== -1) {
          items[index] = editedValue;
        }
        
        return {
          ...prevState,
          [category]: items
        };
      });
      
      // Update importance values
      setImportanceValues(prevValues => {
        const currentImportance = (prevValues[category] as Record<string, string>)[item];
        const newImportance = { ...prevValues[category] as Record<string, string> };
        delete newImportance[item];
        
        return {
          ...prevValues,
          [category]: {
            ...newImportance,
            [editedValue]: currentImportance
          }
        };
      });
    }
    
    // Exit edit mode
    toggleEditMode(category, item);
  };

  // Handle checkbox changes
  const handleCheckboxChange = (key: keyof typeof formState.shareholderPreference) => {
    setFormState(prev => ({
      ...prev,
      shareholderPreference: {
        ...prev.shareholderPreference,
        [key]: !prev.shareholderPreference[key]
      }
    }));
  };

  // Handle importance value changes
  const handleImportanceChange = (category: string, item: string, value: string) => {
    setImportanceValues(prev => {
      const categoryKey = category as keyof typeof importanceValues;
      return {
        ...prev,
        [categoryKey]: {
          ...(prev[categoryKey] as Record<string, string>),
          [item]: value
        }
      };
    });
  };

  // Handle acquisition reason change
  const handleAcquisitionReasonChange = (value: string) => {
    setFormState(prev => ({
      ...prev,
      acquisitionReason: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Preferences Updated",
      description: "Your buyer preferences have been applied",
    });
    
    // Close modal or navigate as needed
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list-filter"><path d="M3 6h18"/><path d="M7 12h10"/><path d="M10 18h4"/></svg>
          <h2 className="text-xl font-semibold text-blueknight-800">Buyer Preferences</h2>
        </div>
        <button type="button" className="text-gray-500 hover:text-gray-700">
          Close
        </button>
      </div>
      
      <div className="space-y-6 divide-y divide-gray-200">
        {/* Country of buyer */}
        <div className="pt-6">
          <h3 className="text-md font-medium text-gray-700 mb-3">What are your preferred countries for potential buyers?</h3>
          
          <div className="mt-2 flex mb-3">
            <input
              type="text"
              value={inputValues.country}
              onChange={(e) => setInputValues(prev => ({ ...prev, country: e.target.value }))}
              placeholder="Add country"
              className="input-field flex-1 mr-2"
            />
            <button
              type="button"
              onClick={() => handleAddItem('country')}
              className="p-2 bg-blueknight-50 border border-blueknight-200 rounded-md text-blueknight-500 hover:bg-blueknight-100"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
          
          {formState.countries.length > 0 && (
            <div className="space-y-3">
              {formState.countries.map((country) => (
                <div key={country} className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <div className="flex-1 flex items-center">
                    {editingItems.countries[country] ? (
                      <input
                        type="text"
                        value={editedValues.countries[country] || country}
                        onChange={(e) => handleEditChange('countries', country, e.target.value)}
                        onBlur={() => saveEditedItem('countries', country)}
                        onKeyPress={(e) => e.key === 'Enter' && saveEditedItem('countries', country)}
                        className="input-field mr-2"
                        autoFocus
                      />
                    ) : (
                      <span className="cursor-pointer hover:text-blueknight-600" onClick={() => toggleEditMode('countries', country)}>
                        {country}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <RadioGroup 
                      value={importanceValues.countries[country] || 'medium'} 
                      onValueChange={(value) => handleImportanceChange('countries', country, value)}
                      className="flex items-center gap-4"
                    >
                      {importanceOptions.map((option) => (
                        <div key={option.value} className="flex items-center gap-1">
                          <RadioGroupItem value={option.value} id={`${country}-${option.value}`} />
                          <Label htmlFor={`${country}-${option.value}`} className="text-sm">{option.label}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem('countries', country)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Industries */}
        <div className="pt-6">
          <h3 className="text-md font-medium text-gray-700 mb-3">What industries should the buyer operate in?</h3>
          
          <div className="mt-2 flex mb-3">
            <input
              type="text"
              value={inputValues.industry}
              onChange={(e) => setInputValues(prev => ({ ...prev, industry: e.target.value }))}
              placeholder="Add industry"
              className="input-field flex-1 mr-2"
            />
            <button
              type="button"
              onClick={() => handleAddItem('industry')}
              className="p-2 bg-blueknight-50 border border-blueknight-200 rounded-md text-blueknight-500 hover:bg-blueknight-100"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
          
          {formState.industries.length > 0 && (
            <div className="space-y-3">
              {formState.industries.map((industry) => (
                <div key={industry} className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <div className="flex-1 flex items-center">
                    {editingItems.industries[industry] ? (
                      <input
                        type="text"
                        value={editedValues.industries[industry] || industry}
                        onChange={(e) => handleEditChange('industries', industry, e.target.value)}
                        onBlur={() => saveEditedItem('industries', industry)}
                        onKeyPress={(e) => e.key === 'Enter' && saveEditedItem('industries', industry)}
                        className="input-field mr-2"
                        autoFocus
                      />
                    ) : (
                      <span className="cursor-pointer hover:text-blueknight-600" onClick={() => toggleEditMode('industries', industry)}>
                        {industry}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <RadioGroup 
                      value={importanceValues.industries[industry] || 'medium'} 
                      onValueChange={(value) => handleImportanceChange('industries', industry, value)}
                      className="flex items-center gap-4"
                    >
                      {importanceOptions.map((option) => (
                        <div key={option.value} className="flex items-center gap-1">
                          <RadioGroupItem value={option.value} id={`${industry}-${option.value}`} />
                          <Label htmlFor={`${industry}-${option.value}`} className="text-sm">{option.label}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem('industries', industry)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Keywords */}
        <div className="pt-6">
          <h3 className="text-md font-medium text-gray-700 mb-3">What sector keywords are most relevant?</h3>
          
          <div className="mt-2 flex mb-3">
            <input
              type="text"
              value={inputValues.keyword}
              onChange={(e) => setInputValues(prev => ({ ...prev, keyword: e.target.value }))}
              placeholder="Add keyword"
              className="input-field flex-1 mr-2"
            />
            <button
              type="button"
              onClick={() => handleAddItem('keyword')}
              className="p-2 bg-blueknight-50 border border-blueknight-200 rounded-md text-blueknight-500 hover:bg-blueknight-100"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
          
          {formState.keywords.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {formState.keywords.map((keyword, index) => (
                <Tag 
                  key={index} 
                  text={keyword} 
                  color="blue" 
                  onRemove={() => handleRemoveItem('keywords', keyword)}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Acquisition reason */}
        <div className="pt-6">
          <h3 className="text-md font-medium text-gray-700 mb-3">What is the most likely reason for acquisition?</h3>
          
          <div className="mt-2 w-full">
            <Select 
              value={formState.acquisitionReason} 
              onValueChange={handleAcquisitionReasonChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent>
                {acquisitionReasons.map((reason) => (
                  <SelectItem key={reason} value={reason}>
                    {reason}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Shareholder's acquirer preference */}
        <div className="pt-6">
          <h3 className="text-md font-medium text-gray-700 mb-3">Shareholders' acquirer preference</h3>
          
          <div className="mt-3 grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="privateEquity" 
                checked={formState.shareholderPreference.privateEquity}
                onCheckedChange={() => handleCheckboxChange('privateEquity')}
              />
              <label htmlFor="privateEquity" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Private Equity
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="peBacked" 
                checked={formState.shareholderPreference.peBacked}
                onCheckedChange={() => handleCheckboxChange('peBacked')}
              />
              <label htmlFor="peBacked" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                PE-Backed
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="strategicTrade" 
                checked={formState.shareholderPreference.strategicTrade}
                onCheckedChange={() => handleCheckboxChange('strategicTrade')}
              />
              <label htmlFor="strategicTrade" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Strategic Trade
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="noPreference" 
                checked={formState.shareholderPreference.noPreference}
                onCheckedChange={() => handleCheckboxChange('noPreference')}
              />
              <label htmlFor="noPreference" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                No Preference
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="pt-6 flex justify-end">
        <Button type="submit" className="bg-blueknight-700 hover:bg-blueknight-800">
          Apply Preferences
        </Button>
      </div>
    </form>
  );
};

export default BuyerPreferencesForm;
