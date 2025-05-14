
import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InfoPopover } from '../components/InfoPopover';
import TagInput from '../components/TagInput';
import FormNavigation from '../components/FormNavigation';

interface CompanyProfileStepProps {
  formData: any;
  setFormData: (data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const CompanyProfileStep: React.FC<CompanyProfileStepProps> = ({ formData, setFormData, nextStep, prevStep }) => {
  const [inputValue, setInputValue] = useState({
    productTags: "",
    useCase: "",
    industry: ""
  });
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddTag = (field: string, tag: string) => {
    if (!tag.trim()) return;
    
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] || []), tag.trim()]
    }));
    
    setInputValue(prev => ({ ...prev, [field]: "" }));
  };
  
  const handleRemoveTag = (field: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };
  
  // Convert to multi-select arrays
  const deliveryMethods = ["Cloud-based", "On-premise", "Mobile App", "API", "Hardware", "Hybrid"];
  
  const supplyChainRoles = ["Software Provider", "Hardware Manufacturer", "Service Provider", "Distributor", "Reseller"];
  
  // Multiple select handler for checkboxes
  const handleMultiSelectToggle = (field: string, value: string) => {
    setFormData(prev => {
      const currentValues = prev[field] || [];
      
      if (currentValues.includes(value)) {
        return {
          ...prev,
          [field]: currentValues.filter(item => item !== value)
        };
      } else {
        return {
          ...prev,
          [field]: [...currentValues, value]
        };
      }
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-gray-800">Company Profile</h2>
        <div className="mt-2 text-sm font-medium text-gray-600">
          <span>Section 1 of 5: </span>
          <span className="text-blueknight-600 font-semibold">Company Overview</span>
        </div>
        <p className="text-sm text-gray-600">Provide essential information about the company</p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="description" className="flex items-center gap-1">
              Company Description <span className="text-red-500">*</span>
            </Label>
            <InfoPopover example="Provider of sales coaching and performance improvement software to field-based commercial teams in the life sciences sector, intended to drive consistent coaching standards and elevate team effectiveness." />
          </div>
          <p className="text-xs text-gray-500">A structured 3-5 sentence description to the company</p>
          <Textarea
            id="description"
            name="description"
            value={formData.description || ""}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe the company"
            rows={4}
            required
          />
        </div>
        
        <TagInput 
          label="Industry Category"
          description="The commercial category the company's offering fits into"
          tags={formData.industry || []}
          placeholder="Add industry categories"
          infoExample="Marketing Automation, Sales Enablement Software, Workforce Training Platforms, Compliance Management Tools, Healthcare IT, Cybersecurity Software, Cloud Infrastructure, etc."
          onAddTag={(tag) => handleAddTag("industry", tag)}
          onRemoveTag={(index) => handleRemoveTag("industry", index)}
        />
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="offering" className="flex items-center gap-1">
              Company Offering <span className="text-red-500">*</span>
            </Label>
            <InfoPopover example="Provides an intuitive platform for sales coaching, tailored to life sciences organizations." />
          </div>
          <p className="text-xs text-gray-500">The company's main product or service</p>
          <Textarea
            id="offering"
            name="offering"
            value={formData.offering || ""}
            onChange={(e) => setFormData(prev => ({ ...prev, offering: e.target.value }))}
            placeholder="Describe what the company offers"
            rows={3}
            required
          />
        </div>
        
        <TagInput 
          label="Product/Service Keywords"
          description="Keywords that describe the company's key offerings"
          tags={formData.productTags || []}
          placeholder="Add product tags"
          infoExample="sales coaching platform, learning management system, compliance software, analytics dashboard, training automation tool"
          onAddTag={(tag) => handleAddTag("productTags", tag)}
          onRemoveTag={(index) => handleRemoveTag("productTags", index)}
        />
        
        <div className="space-y-2">
          <Label htmlFor="deliveryMethod">Go-To-Market/Delivery Method</Label>
          <p className="text-xs text-gray-500">How is the company's offering being delivered or brought to market</p>
          
          {/* Multi-select checkboxes */}
          <div className="grid grid-cols-2 gap-2 mt-1">
            {deliveryMethods.map(method => (
              <div key={method} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`delivery-${method}`}
                  checked={(formData.deliveryMethod || []).includes(method)}
                  onChange={() => handleMultiSelectToggle("deliveryMethod", method)}
                  className="h-4 w-4"
                />
                <Label htmlFor={`delivery-${method}`} className="text-sm font-normal">
                  {method}
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="supplyChainRole">Company's Position in Supply Chain</Label>
          <p className="text-xs text-gray-500">Where does the company sit on the supply chain</p>
          
          {/* Multi-select checkboxes */}
          <div className="grid grid-cols-2 gap-2 mt-1">
            {supplyChainRoles.map(role => (
              <div key={role} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`role-${role}`}
                  checked={(formData.supplyChainRole || []).includes(role)}
                  onChange={() => handleMultiSelectToggle("supplyChainRole", role)}
                  className="h-4 w-4"
                />
                <Label htmlFor={`role-${role}`} className="text-sm font-normal">
                  {role}
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        <TagInput 
          label="Functional Category"
          description="What does the company build, deliver or enable - not the industry it serves"
          tags={formData.useCase || []}
          placeholder="Add functional categories"
          onAddTag={(tag) => handleAddTag("useCase", tag)}
          onRemoveTag={(index) => handleRemoveTag("useCase", index)}
        />
      </div>

      <FormNavigation 
        prevStep={prevStep}
        nextStep={nextStep}
      />
    </div>
  );
};

export default CompanyProfileStep;
