
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SectionContainer from '../components/SectionContainer';
import FormNavigation from '../components/FormNavigation';

interface CompetitiveFinancialsSectionProps {
  formData: any;
  setFormData: (data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const CompetitiveFinancialsSection: React.FC<CompetitiveFinancialsSectionProps> = ({ formData, setFormData, nextStep, prevStep }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const [competitor, setCompetitor] = useState("");
  
  const handleAddCompetitor = () => {
    if (!competitor.trim()) return;
    
    setFormData(prev => ({
      ...prev,
      competitors: [...(prev.competitors || []), competitor.trim()]
    }));
    
    setCompetitor("");
  };
  
  const handleRemoveCompetitor = (index: number) => {
    setFormData(prev => ({
      ...prev,
      competitors: prev.competitors.filter((_, i) => i !== index)
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCompetitor();
    }
  };

  return (
    <SectionContainer 
      title="Financials" 
      description="Enter financial details"
    >
      <div className="text-sm font-medium text-gray-600 mb-4">
        <span>Section 3 of 5: </span>
        <span className="text-blueknight-600 font-semibold">Financials</span>
      </div>

      <div className="space-y-8">
        {/* Last Year Row */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Last Year</h3>
          <div className="flex flex-col md:flex-row md:items-end gap-6">
            <div className="md:w-1/3">
              <Label htmlFor="lastYearPeriod">Period (MMM-YY)</Label>
              <Input
                id="lastYearPeriod"
                name="lastYearPeriod"
                value={formData.lastYearPeriod || ""}
                onChange={handleChange}
                placeholder="MMM-YY"
              />
            </div>

            <div className="md:w-1/3">
              <Label htmlFor="revenueLastYear">Revenue ($)</Label>
              <Input
                id="revenueLastYear"
                name="revenueLastYear"
                value={formData.revenueLastYear || ""}
                onChange={handleChange}
                placeholder="0"
              />
            </div>
            
            <div className="md:w-1/3">
              <Label htmlFor="ebitdaLastYear">EBITDA ($)</Label>
              <Input
                id="ebitdaLastYear"
                name="ebitdaLastYear"
                value={formData.ebitdaLastYear || ""}
                onChange={handleChange}
                placeholder="0"
              />
            </div>
          </div>
        </div>
        
        {/* This Year Row */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h3 className="text-lg font-semibold text-blue-700 mb-4">This Year</h3>
          <div className="flex flex-col md:flex-row md:items-end gap-6">
            <div className="md:w-1/3">
              <Label htmlFor="thisYearPeriod">Period (MMM-YY)</Label>
              <Input
                id="thisYearPeriod"
                name="thisYearPeriod"
                value={formData.thisYearPeriod || ""}
                onChange={handleChange}
                placeholder="MMM-YY"
              />
            </div>

            <div className="md:w-1/3">
              <Label htmlFor="revenueThisYear">Revenue ($)</Label>
              <Input
                id="revenueThisYear"
                name="revenueThisYear"
                value={formData.revenueThisYear || ""}
                onChange={handleChange}
                placeholder="0"
              />
            </div>
            
            <div className="md:w-1/3">
              <Label htmlFor="ebitdaThisYear">EBITDA ($)</Label>
              <Input
                id="ebitdaThisYear"
                name="ebitdaThisYear"
                value={formData.ebitdaThisYear || ""}
                onChange={handleChange}
                placeholder="0"
              />
            </div>
          </div>
        </div>
      </div>

      <FormNavigation 
        prevStep={prevStep}
        nextStep={nextStep}
      />
    </SectionContainer>
  );
};

export default CompetitiveFinancialsSection;
