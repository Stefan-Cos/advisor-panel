
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface FormNavigationProps {
  prevStep?: () => void;
  nextStep?: () => void;
  isLastStep?: boolean;
  isSubmitting?: boolean;
  handleSubmit?: () => void;
}

const FormNavigation: React.FC<FormNavigationProps> = ({ 
  prevStep, 
  nextStep, 
  isLastStep = false,
  isSubmitting = false,
  handleSubmit 
}) => {
  return (
    <div className="flex justify-between pt-4">
      {prevStep && (
        <Button 
          onClick={prevStep}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      )}
      
      {!isLastStep && nextStep && (
        <Button 
          onClick={nextStep}
          className="flex items-center gap-2"
        >
          Next Section
          <ArrowRight className="h-4 w-4" />
        </Button>
      )}
      
      {isLastStep && handleSubmit && (
        <Button 
          onClick={handleSubmit}
          className="flex items-center gap-2"
          disabled={isSubmitting}
        >
          Complete Project
        </Button>
      )}
    </div>
  );
};

export default FormNavigation;
