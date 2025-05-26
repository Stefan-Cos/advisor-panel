
import { useState } from 'react';
import { analyzeCompanyWebsite } from '@/services/companyProfilingService';

interface UseCompanyAnalysisProps {
  formData: any;
  setFormData: (data: any) => void;
  nextStep: () => void;
}

export const useCompanyAnalysis = ({ formData, setFormData, nextStep }: UseCompanyAnalysisProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [animatingFields, setAnimatingFields] = useState<string[]>([]);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const handleWebsiteSubmit = async (website: string) => {
    if (!website) return;
    
    setIsAnalyzing(true);
    
    try {
      await analyzeCompanyWebsite(website);
    } catch (error) {
      console.error('Analysis failed:', error);
    }
    
    // Continue with the existing simulation animation
    const totalDuration = 20000; // 20 seconds
    const startTime = Date.now();
    
    const interval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const newProgress = Math.min((elapsedTime / totalDuration) * 100, 100);
      
      setProgress(newProgress);
      
      // Animate fields flying in at different progress points
      if (newProgress > 15 && !animatingFields.includes('companyOverview')) {
        setAnimatingFields(prev => [...prev, 'companyOverview']);
      }
      if (newProgress > 35 && !animatingFields.includes('marketPositioning')) {
        setAnimatingFields(prev => [...prev, 'marketPositioning']);
      }
      if (newProgress > 55 && !animatingFields.includes('problemsUseCases')) {
        setAnimatingFields(prev => [...prev, 'problemsUseCases']);
      }
      if (newProgress > 75 && !animatingFields.includes('customerProfile')) {
        setAnimatingFields(prev => [...prev, 'customerProfile']);
      }
      
      if (newProgress >= 100) {
        clearInterval(interval);
        
        // Show completion animation
        setAnalysisComplete(true);
        
        // After completion animation, move to next step
        setTimeout(() => {
          // Update form with "AI-enriched" data
          setFormData(prev => ({
            ...prev,
            website,
            description: `${formData.companyName} is a leading provider of innovative solutions in their industry.`,
            industry: ["Technology"],
            offering: "Software as a service platform for enterprise customers",
            productTags: ["SaaS", "Enterprise Software"],
            deliveryMethod: ["Cloud-based"],
            supplyChainRole: ["Software Provider"],
            useCase: ["Workflow Automation", "Data Analytics"],
            problemSolved: "Inefficient manual processes and lack of data visibility",
            useCases: "Used by operations teams to streamline workflows and improve decision-making",
            competitors: ["Competitor A", "Competitor B"],
            revenueLastYear: "2,500,000",
            revenueThisYear: "3,200,000",
            ebitdaLastYear: "500,000",
            ebitdaThisYear: "750,000",
            targetCustomers: "Mid to large enterprises with complex operational needs",
            customerType: ["Enterprise"],
            customerIndustries: ["Manufacturing", "Healthcare", "Finance"]
          }));
          
          nextStep();
        }, 3000); // Show completion animation for 3 seconds before proceeding
      }
    }, 50); // Update frequently for smoother animation
  };

  return {
    isAnalyzing,
    progress,
    animatingFields,
    analysisComplete,
    handleWebsiteSubmit
  };
};
