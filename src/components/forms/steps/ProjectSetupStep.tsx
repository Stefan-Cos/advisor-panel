
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowRight } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InfoPopover } from '../components/InfoPopover';

interface ProjectSetupStepProps {
  formData: any;
  setFormData: (data: any) => void;
  nextStep: () => void;
}

const ProjectSetupStep: React.FC<ProjectSetupStepProps> = ({ formData, setFormData, nextStep }) => {
  const [isValid, setIsValid] = useState(false);
  
  useEffect(() => {
    validateForm();
  }, [formData]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCountryChange = (value: string) => {
    setFormData(prev => ({ ...prev, country: value }));
  };

  const handleIndustryChange = (value: string) => {
    setFormData(prev => ({ ...prev, industry: value }));
  };

  const validateForm = () => {
    // Only check the four main fields: projectName, companyName, country, employeeCount
    const isFormValid = !!formData.projectName && 
                       !!formData.companyName && 
                       !!formData.country && 
                       !!formData.employeeCount;
    setIsValid(isFormValid);
  };

  const countries = [
    'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 
    'France', 'Japan', 'China', 'India', 'Brazil', 'Mexico', 'Spain'
  ];

  // Industries
  const industries = [
    "Technology", "Healthcare", "Finance", "Manufacturing", "Retail", "Energy", 
    "Real Estate", "Media", "Telecommunications", "Transportation", "Education"
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-gray-800">Project Setup</h2>
        <p className="text-sm text-gray-600">Enter basic information to get started with your new project</p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="projectName" className="flex items-center gap-1">
            Project Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="projectName"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            placeholder="Enter a name for this project"
            required
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="companyName" className="flex items-center gap-1">
              Company Name <span className="text-red-500">*</span>
            </Label>
          </div>
          <Input
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Enter the company name"
            required
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="country" className="flex items-center gap-1">
              Headquarters - Country/Region <span className="text-red-500">*</span>
            </Label>
          </div>
          <Select value={formData.country} onValueChange={handleCountryChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map(country => (
                <SelectItem key={country} value={country}>{country}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="employeeCount" className="flex items-center gap-1">
              Number of Employees <span className="text-red-500">*</span>
            </Label>
          </div>
          <Input
            id="employeeCount"
            name="employeeCount"
            type="number"
            min="1"
            value={formData.employeeCount}
            onChange={handleChange}
            placeholder="Enter number of employees"
            required
          />
        </div>
      </div>
      
      <div className="flex justify-end pt-4">
        <Button 
          onClick={nextStep} 
          disabled={!isValid}
          className="flex items-center gap-2"
        >
          Proceed
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ProjectSetupStep;
