import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Brain } from 'lucide-react';
import { createProject } from '@/services/projectService';

// Import the steps
import ProjectSetupStep from './steps/ProjectSetupStep';
import AICompanyProfilingStep from './steps/AICompanyProfilingStep';
import CompanyProfileStep from './steps/CompanyProfileStep';
import ProblemUseCaseSection from './steps/ProblemUseCaseSection';
import CompetitiveFinancialsSection from './steps/CompetitiveFinancialsSection';
import TargetCustomerSection from './steps/TargetCustomerSection';
import BuyerPreferencesSection from './steps/BuyerPreferencesSection';

// New Component: Confirmation Screen with improved AI visual
const ConfirmationScreen = ({ navigate }) => {
  const [countdown, setCountdown] = useState(3);
  
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/dashboard');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="h-full flex flex-col items-center justify-center py-16 animate-fade-in">
      {/* Enhanced AI visual with gradient and animation */}
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg">
          <Brain className="h-12 w-12 text-white animate-pulse" />
        </div>
        <div className="absolute inset-0 bg-purple-400/30 rounded-full animate-ping" />
        <div className="absolute -inset-4 bg-gradient-to-r from-purple-400/20 to-blue-500/20 rounded-full blur-xl animate-pulse" />
      </div>
      
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Your project has been created and enriched with AI
      </h2>
      
      <p className="text-gray-600 text-center mb-8 max-w-md">
        You're now one step closer to identifying the right buyer.
      </p>
      
      <div className="flex flex-col items-center">
        <p className="text-sm text-gray-500 mb-2">
          Redirecting to dashboard in {countdown}...
        </p>
        <Progress 
          value={(3 - countdown) * 33.33} 
          className="h-1 w-32 bg-gray-200"
        />
      </div>
    </div>
  );
};

// Main ListingForm Component
const ListingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Project Setup fields
    projectName: '',
    companyName: '',
    country: '',
    employeeCount: '',
    website: '',
    
    // Company Profile fields
    description: '',
    industry: [],
    offering: '',
    productTags: [],
    deliveryMethod: [],
    supplyChainRole: [],
    useCase: [],
    
    // Geography fields
    includeGeographies: [],
    excludeGeographies: [],
    
    // Problem & Use Case fields
    problemSolved: '',
    useCases: '',
    
    // Financial fields
    competitors: [],
    lastYearPeriod: '',
    revenueLastYear: '',
    ebitdaLastYear: '',
    thisYearPeriod: '',
    revenueThisYear: '',
    ebitdaThisYear: '',
    
    // Target Customer fields
    targetCustomers: '',
    customerType: [],
    customerIndustries: [],
    
    // Buyer Preferences fields
    acquisitionReason: '',
    minEmployees: ''
  });
  
  const navigate = useNavigate();
  
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };
  
  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      console.log('Starting project creation with form data:', formData);
      
      // Transform form data to match database schema
      const projectData = {
        project_name: formData.projectName,
        company_name: formData.companyName,
        country: formData.country,
        employee_count: formData.employeeCount ? parseInt(formData.employeeCount) : undefined,
        website: formData.website,
        description: formData.description,
        industry: formData.industry,
        offering: formData.offering,
        include_geographies: formData.includeGeographies,
        exclude_geographies: formData.excludeGeographies,
        product_tags: formData.productTags,
        delivery_method: formData.deliveryMethod,
        supply_chain_role: formData.supplyChainRole,
        use_case: formData.useCase,
        problem_solved: formData.problemSolved,
        use_cases: formData.useCases,
        competitors: formData.competitors,
        last_year_period: formData.lastYearPeriod,
        revenue_last_year: formData.revenueLastYear,
        ebitda_last_year: formData.ebitdaLastYear,
        this_year_period: formData.thisYearPeriod,
        revenue_this_year: formData.revenueThisYear,
        ebitda_this_year: formData.ebitdaThisYear,
        target_customers: formData.targetCustomers,
        customer_type: formData.customerType,
        customer_industries: formData.customerIndustries,
        acquisition_reason: formData.acquisitionReason,
        buyer_countries: formData.includeGeographies?.map(geo => ({ name: geo, importance: 'N/A' })),
        buyer_industries: formData.industry?.map(ind => ({ name: ind, importance: 'N/A' })),
        end_user_sectors: formData.customerIndustries?.map(sector => ({ name: sector, importance: 'N/A' })),
        buyer_keywords: formData.productTags?.map(tag => ({ name: tag, importance: 'N/A' })),
        shareholder_preference: {
          privateEquity: false,
          peBacked: false,
          strategicTrade: false,
          noPreference: true
        }
      };

      console.log('Transformed project data:', projectData);

      const createdProject = await createProject(projectData);
      console.log('Project created successfully:', createdProject);
      
      toast({
        title: "Project created successfully",
        description: "Your project has been saved and you'll be redirected to the dashboard.",
      });

      setShowConfirmation(true);
    } catch (error) {
      console.error('Error creating project:', error);
      toast({
        title: "Error creating project",
        description: "There was an error saving your project. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepIndicator = () => {
    // Updated to have only 3 main steps
    const steps = [
      { number: 1, label: "Project Setup" },
      { number: 2, label: "AI Profiling" },
      { number: 3, label: "Company Profile" }
    ];

    return (
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className={`flex items-center ${index < steps.length - 1 ? "flex-1" : ""}`}
            >
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center 
                  ${currentStep >= step.number ? "bg-blueknight-600 text-white" : "bg-gray-200 text-gray-600"}`}
              >
                {step.number}
              </div>
              
              {index < steps.length - 1 && (
                <div 
                  className={`flex-1 h-1 mx-2 
                    ${currentStep > step.number ? "bg-blueknight-600" : "bg-gray-200"}`}
                />
              )}
            </div>
          ))}
        </div>
        
        <div className="flex justify-between mt-1">
          <span className="text-xs font-medium">Project Setup</span>
          <span className="text-xs font-medium">AI Profiling</span>
          <span className="text-xs font-medium">Company Profile</span>
        </div>

        {currentStep > 3 && (
          <div className="mt-6 text-sm font-medium text-gray-600">
            <span>Section {currentStep - 2} of 5: </span>
            <span className="text-blueknight-600 font-semibold">
              {currentStep === 3 ? "Company Overview" :
               currentStep === 4 ? "Problem & Use Case" :
               currentStep === 5 ? "Financials" :
               currentStep === 6 ? "Target Customer Profile" :
               "Buyer Preferences"}
            </span>
          </div>
        )}
      </div>
    );
  };

  if (showConfirmation) {
    return <ConfirmationScreen navigate={navigate} />;
  }

  return (
    <>
      {renderStepIndicator()}
      
      {currentStep === 1 && (
        <ProjectSetupStep 
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
        />
      )}
      
      {currentStep === 2 && (
        <AICompanyProfilingStep 
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      
      {currentStep === 3 && (
        <CompanyProfileStep
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      
      {currentStep === 4 && (
        <ProblemUseCaseSection 
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}

      {currentStep === 5 && (
        <CompetitiveFinancialsSection 
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}

      {currentStep === 6 && (
        <TargetCustomerSection 
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}

      {currentStep === 7 && (
        <BuyerPreferencesSection 
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          prevStep={prevStep}
          isSubmitting={isSubmitting}
        />
      )}
    </>
  );
};

export default ListingForm;
