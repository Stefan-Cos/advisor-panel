
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import Tag from '../ui/Tag';

const importanceOptions = [
  { label: 'N/A', value: 'na' },
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
  { label: 'Very High', value: 'very-high' },
];

const BuyerPreferencesForm = () => {
  const [formState, setFormState] = useState({
    countries: [] as string[],
    industries: [] as string[],
    endUserSectors: [] as string[],
    keywords: [] as string[],
    acquisitionReason: '',
    potentialBuyers: [] as string[],
    shareholderPreference: {
      privateEquity: false,
      peBacked: false,
      strategicTrade: false,
      noPreference: false,
    }
  });

  const [inputValues, setInputValues] = useState({
    country: '',
    industry: '',
    endUserSector: '',
    keyword: '',
    potentialBuyer: '',
  });

  const [importanceValues, setImportanceValues] = useState({
    countries: 'na',
    industries: 'na',
    endUserSectors: 'na',
    keywords: 'na',
    acquisitionReason: 'na',
    potentialBuyers: 'na',
  });

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAddItem = (key: keyof typeof inputValues) => {
    if (inputValues[key] && inputValues[key].trim() !== '') {
      const formKey = key === 'country' ? 'countries' :
                      key === 'industry' ? 'industries' :
                      key === 'endUserSector' ? 'endUserSectors' :
                      key === 'keyword' ? 'keywords' :
                      'potentialBuyers';
      
      setFormState(prev => ({
        ...prev,
        [formKey]: [...prev[formKey as keyof typeof formState] as string[], inputValues[key]]
      }));
      
      setInputValues(prev => ({
        ...prev,
        [key]: ''
      }));
    }
  };

  const handleRemoveItem = (key: keyof typeof formState, index: number) => {
    setFormState(prev => ({
      ...prev,
      [key]: (prev[key] as string[]).filter((_, i) => i !== index)
    }));
  };

  const handleCheckboxChange = (key: keyof typeof formState.shareholderPreference) => {
    setFormState(prev => ({
      ...prev,
      shareholderPreference: {
        ...prev.shareholderPreference,
        [key]: !prev.shareholderPreference[key]
      }
    }));
  };

  const handleImportanceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setImportanceValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAcquisitionReasonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState(prev => ({
      ...prev,
      acquisitionReason: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real application, you would validate and submit the data
    toast({
      title: "Listing Created",
      description: "Your listing has been successfully created",
    });
    
    // Navigate to listings page
    navigate('/listings');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
      <h2 className="text-center text-2xl font-semibold text-blueknight-800">Buyer Preference</h2>
      <p className="text-center text-gray-500 text-sm">Step 5 of 5</p>
      
      <div className="space-y-6 divide-y divide-gray-200">
        {/* Country of buyer */}
        <div className="pt-6">
          <div className="flex justify-between items-start">
            <div>
              <label className="form-label flex items-center">
                Country of buyer <span className="text-red-500 ml-1">*</span>
              </label>
              <p className="text-xs text-gray-500">Enter as many countries as you want or use 'Any'</p>
            </div>
            <div>
              <label className="form-label">Importance</label>
              <select 
                name="countries"
                value={importanceValues.countries}
                onChange={handleImportanceChange}
                className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blueknight-400 focus:border-transparent"
              >
                {importanceOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mt-2 flex">
            <input
              type="text"
              value={inputValues.country}
              onChange={(e) => setInputValues(prev => ({ ...prev, country: e.target.value }))}
              placeholder="Add country or 'Any'"
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
            <div className="mt-3 flex flex-wrap gap-2">
              {formState.countries.map((country, index) => (
                <Tag 
                  key={index} 
                  text={country} 
                  color="blue" 
                  onRemove={() => handleRemoveItem('countries', index)}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Industries */}
        <div className="pt-6">
          <div className="flex justify-between items-start">
            <div>
              <label className="form-label flex items-center">
                What industries should the buyer be operating in <span className="text-red-500 ml-1">*</span>
              </label>
              <p className="text-xs text-gray-500">Start with most important or use 'Any'</p>
            </div>
            <div>
              <label className="form-label">Importance</label>
              <select 
                name="industries"
                value={importanceValues.industries}
                onChange={handleImportanceChange}
                className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blueknight-400 focus:border-transparent"
              >
                {importanceOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mt-2 flex">
            <input
              type="text"
              value={inputValues.industry}
              onChange={(e) => setInputValues(prev => ({ ...prev, industry: e.target.value }))}
              placeholder="Add industry or 'Any'"
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
            <div className="mt-3 flex flex-wrap gap-2">
              {formState.industries.map((industry, index) => (
                <Tag 
                  key={index} 
                  text={industry} 
                  color="blue" 
                  onRemove={() => handleRemoveItem('industries', index)}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* End-user sectors */}
        <div className="pt-6">
          <div className="flex justify-between items-start">
            <div>
              <label className="form-label flex items-center">
                What end-user sectors should the buyer serve <span className="text-red-500 ml-1">*</span>
              </label>
              <p className="text-xs text-gray-500">Start with most important or use 'Any'</p>
            </div>
            <div>
              <label className="form-label">Importance</label>
              <select 
                name="endUserSectors"
                value={importanceValues.endUserSectors}
                onChange={handleImportanceChange}
                className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blueknight-400 focus:border-transparent"
              >
                {importanceOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mt-2 flex">
            <input
              type="text"
              value={inputValues.endUserSector}
              onChange={(e) => setInputValues(prev => ({ ...prev, endUserSector: e.target.value }))}
              placeholder="Add end-user sector or 'Any'"
              className="input-field flex-1 mr-2"
            />
            <button
              type="button"
              onClick={() => handleAddItem('endUserSector')}
              className="p-2 bg-blueknight-50 border border-blueknight-200 rounded-md text-blueknight-500 hover:bg-blueknight-100"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
          
          {formState.endUserSectors.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {formState.endUserSectors.map((sector, index) => (
                <Tag 
                  key={index} 
                  text={sector} 
                  color="blue" 
                  onRemove={() => handleRemoveItem('endUserSectors', index)}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Keywords */}
        <div className="pt-6">
          <div className="flex justify-between items-start">
            <div>
              <label className="form-label flex items-center">
                Sector keywords for the buyer <span className="text-red-500 ml-1">*</span>
              </label>
              <p className="text-xs text-gray-500">Provide 6 to 9 keywords</p>
            </div>
            <div>
              <label className="form-label">Importance</label>
              <select 
                name="keywords"
                value={importanceValues.keywords}
                onChange={handleImportanceChange}
                className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blueknight-400 focus:border-transparent"
              >
                {importanceOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mt-2 flex">
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
                  onRemove={() => handleRemoveItem('keywords', index)}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Acquisition reason */}
        <div className="pt-6">
          <div className="flex justify-between items-start">
            <div>
              <label className="form-label flex items-center">
                Most likely reason for acquisition <span className="text-red-500 ml-1">*</span>
              </label>
              <p className="text-xs text-gray-500">Why would a buyer acquire this company?</p>
            </div>
            <div>
              <label className="form-label">Importance</label>
              <select 
                name="acquisitionReason"
                value={importanceValues.acquisitionReason}
                onChange={handleImportanceChange}
                className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blueknight-400 focus:border-transparent"
              >
                {importanceOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mt-2">
            <input
              type="text"
              value={formState.acquisitionReason}
              onChange={handleAcquisitionReasonChange}
              placeholder="Enter reason for acquisition"
              className="input-field w-full"
            />
          </div>
        </div>
        
        {/* Potential buyers */}
        <div className="pt-6">
          <div className="flex justify-between items-start">
            <div>
              <label className="form-label flex items-center">
                Potential buyers <span className="text-red-500 ml-1">*</span>
              </label>
              <p className="text-xs text-gray-500">List companies that would be a good fit</p>
            </div>
            <div>
              <label className="form-label">Importance</label>
              <select 
                name="potentialBuyers"
                value={importanceValues.potentialBuyers}
                onChange={handleImportanceChange}
                className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blueknight-400 focus:border-transparent"
              >
                {importanceOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mt-2 flex">
            <input
              type="text"
              value={inputValues.potentialBuyer}
              onChange={(e) => setInputValues(prev => ({ ...prev, potentialBuyer: e.target.value }))}
              placeholder="Add potential buyer"
              className="input-field flex-1 mr-2"
            />
            <button
              type="button"
              onClick={() => handleAddItem('potentialBuyer')}
              className="p-2 bg-blueknight-50 border border-blueknight-200 rounded-md text-blueknight-500 hover:bg-blueknight-100"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
          
          {formState.potentialBuyers.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {formState.potentialBuyers.map((buyer, index) => (
                <Tag 
                  key={index} 
                  text={buyer} 
                  color="blue" 
                  onRemove={() => handleRemoveItem('potentialBuyers', index)}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Shareholder's acquirer preference */}
        <div className="pt-6">
          <label className="form-label flex items-center">
            Shareholders' acquirer preference <span className="text-red-500 ml-1">*</span>
          </label>
          
          <div className="mt-3 space-x-4 flex">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={formState.shareholderPreference.privateEquity}
                onChange={() => handleCheckboxChange('privateEquity')}
                className="h-5 w-5 text-blueknight-500 focus:ring-blueknight-400 rounded"
              />
              <span className="ml-2 text-gray-700">Private Equity</span>
            </label>
            
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={formState.shareholderPreference.peBacked}
                onChange={() => handleCheckboxChange('peBacked')}
                className="h-5 w-5 text-blueknight-500 focus:ring-blueknight-400 rounded"
              />
              <span className="ml-2 text-gray-700">PE-Backed</span>
            </label>
            
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={formState.shareholderPreference.strategicTrade}
                onChange={() => handleCheckboxChange('strategicTrade')}
                className="h-5 w-5 text-blueknight-500 focus:ring-blueknight-400 rounded"
              />
              <span className="ml-2 text-gray-700">Strategic Trade</span>
            </label>
            
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={formState.shareholderPreference.noPreference}
                onChange={() => handleCheckboxChange('noPreference')}
                className="h-5 w-5 text-blueknight-500 focus:ring-blueknight-400 rounded"
              />
              <span className="ml-2 text-gray-700">No Preference</span>
            </label>
          </div>
        </div>
      </div>
      
      <div className="pt-6 flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => navigate('/add-listing')}
          className="btn-secondary"
        >
          Back
        </button>
        <button type="submit" className="btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
};

export default BuyerPreferencesForm;
