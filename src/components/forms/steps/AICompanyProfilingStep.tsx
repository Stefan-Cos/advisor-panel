
import React, { useState } from 'react';
import FormNavigation from '../components/FormNavigation';
import WebsiteInputForm from './components/WebsiteInputForm';
import AnalysisProgress from './components/AnalysisProgress';
import AnalysisAnimation from './components/AnalysisAnimation';
import { useCompanyAnalysis } from '@/hooks/useCompanyAnalysis';

interface AICompanyProfilingStepProps {
  formData: any;
  setFormData: (data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const AICompanyProfilingStep: React.FC<AICompanyProfilingStepProps> = ({ 
  formData, 
  setFormData, 
  nextStep, 
  prevStep 
}) => {
  const [website, setWebsite] = useState("");
  
  const {
    isAnalyzing,
    progress,
    animatingFields,
    analysisComplete,
    handleWebsiteSubmit
  } = useCompanyAnalysis({ formData, setFormData, nextStep });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleWebsiteSubmit(website);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-gray-800">AI Company Profiling</h2>
        <p className="text-sm text-gray-600">
          Paste the company's website to activate AI-driven enrichment. We'll extract and pre-fill the full profile — from product offering to GTM strategy, industry relevance, and more.
        </p>
      </div>
      
      <WebsiteInputForm 
        website={website}
        setWebsite={setWebsite}
        onSubmit={handleFormSubmit}
        isAnalyzing={isAnalyzing}
      />
      
      {isAnalyzing && (
        <>
          <AnalysisProgress 
            progress={progress}
            animatingFields={animatingFields}
          />
          <AnalysisAnimation analysisComplete={analysisComplete} />
        </>
      )}

      <FormNavigation 
        prevStep={prevStep}
        nextStep={null}
      />
    </div>
  );
};

export default AICompanyProfilingStep;
