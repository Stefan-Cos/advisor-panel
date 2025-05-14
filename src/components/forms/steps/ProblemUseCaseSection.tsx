
import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { InfoPopover } from '../components/InfoPopover';
import SectionContainer from '../components/SectionContainer';
import FormNavigation from '../components/FormNavigation';

interface ProblemUseCaseSectionProps {
  formData: any;
  setFormData: (data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const ProblemUseCaseSection: React.FC<ProblemUseCaseSectionProps> = ({ formData, setFormData, nextStep, prevStep }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <SectionContainer 
      title="Problem & Use Case" 
      description="Describe the problem solved and typical use cases"
    >
      <div className="text-sm font-medium text-gray-600 mb-4">
        <span>Section 2 of 5: </span>
        <span className="text-blueknight-600 font-semibold">Problem & Use Case</span>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="problemSolved">Problem Solved / Market Pain Point</Label>
            <InfoPopover example="Addresses the need for scalable, consistent sales coaching and performance improvement across geographically dispersed field teams." />
          </div>
          <p className="text-xs text-gray-500">What problem is the company solving</p>
          <Textarea
            id="problemSolved"
            name="problemSolved"
            value={formData.problemSolved || ""}
            onChange={handleChange}
            placeholder="What problem does the company solve?"
            rows={4}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="useCases">Use Cases and End Users</Label>
            <InfoPopover example="Sales managers conducting coaching sessions; Field representatives engaging in self-assessments; HR departments tracking competency development." />
          </div>
          <p className="text-xs text-gray-500">How is the company's offering being used</p>
          <Textarea
            id="useCases"
            name="useCases"
            value={formData.useCases || ""}
            onChange={handleChange}
            placeholder="Describe use cases and end users"
            rows={4}
          />
        </div>
      </div>

      <FormNavigation 
        prevStep={prevStep}
        nextStep={nextStep}
      />
    </SectionContainer>
  );
};

export default ProblemUseCaseSection;
