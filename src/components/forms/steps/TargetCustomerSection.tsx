
import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InfoPopover } from '../components/InfoPopover';
import SectionContainer from '../components/SectionContainer';
import TagInput from '../components/TagInput';
import FormNavigation from '../components/FormNavigation';

interface TargetCustomerSectionProps {
  formData: any;
  setFormData: (data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const TargetCustomerSection: React.FC<TargetCustomerSectionProps> = ({ formData, setFormData, nextStep, prevStep }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Multi-select handler for customer types
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

  // Customer types
  const customerTypes = ["Enterprise", "SMB", "Government", "Consumer", "Non-profit"];

  return (
    <SectionContainer 
      title="Target Customer Profile" 
      description="Define the ideal customer profile for this company"
    >
      <div className="text-sm font-medium text-gray-600 mb-4">
        <span>Section 4 of 5: </span>
        <span className="text-blueknight-600 font-semibold">Target Customer Profile</span>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="targetCustomers">Target Customer Description</Label>
            <InfoPopover example="Who uses the company's offering. What is the general user segment/department, what is their specific role and their operational purpose" />
          </div>
          <p className="text-xs text-gray-500">Who uses the company's offering, their role and purpose</p>
          <Textarea
            id="targetCustomers"
            name="targetCustomers"
            value={formData.targetCustomers || ""}
            onChange={handleChange}
            placeholder="Describe the company's target customers"
            rows={4}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="customerType">Target Customer Type</Label>
          <p className="text-xs text-gray-500">The type and size of the company's target customers</p>
          
          {/* Multi-select checkboxes for customer types */}
          <div className="grid grid-cols-2 gap-2 mt-1">
            {customerTypes.map(type => (
              <div key={type} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`customer-type-${type}`}
                  checked={(formData.customerType || []).includes(type)}
                  onChange={() => handleMultiSelectToggle("customerType", type)}
                  className="h-4 w-4"
                />
                <Label htmlFor={`customer-type-${type}`} className="text-sm font-normal">
                  {type}
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        <TagInput 
          label="Target Customer Industries"
          description="The commercial sector or industry the company's customers belong to"
          tags={formData.customerIndustries || []}
          placeholder="Add customer industries"
          infoExample="Healthcare Providers, Financial Services, Manufacturing, Retail, Education, Government, Logistics, Telecommunications, etc."
          onAddTag={(tag) => {
            setFormData(prev => ({
              ...prev,
              customerIndustries: [...(prev.customerIndustries || []), tag]
            }));
          }}
          onRemoveTag={(index) => {
            setFormData(prev => ({
              ...prev,
              customerIndustries: prev.customerIndustries.filter((_, i) => i !== index)
            }));
          }}
        />
      </div>

      <FormNavigation 
        prevStep={prevStep}
        nextStep={nextStep}
      />
    </SectionContainer>
  );
};

export default TargetCustomerSection;
