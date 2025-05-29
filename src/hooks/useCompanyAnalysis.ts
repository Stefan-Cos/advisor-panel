
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

  const isErrorResponse = (value: string): boolean => {
    if (!value || typeof value !== 'string') return false;
    
    const errorIndicators = [
      'Both Groq and OpenAI failed',
      '429 Too Many Requests',
      'Client error',
      'Error',
      'error',
      'failed',
      'No data available',
      'n/a',
      'none',
      '(no output)',
      '(no data)',
      'agnostic'
    ];
    
    return errorIndicators.some(indicator => value.includes(indicator));
  };

  const extractCompanyDataFromResponse = (data: any) => {
    console.log('Extracting data from API response:', data);
    
    // Check if we have the new structured response format
    if (data.groq_responses) {
      const responses = data.groq_responses;
      
      // Check if any of the responses contain error messages
      const hasErrors = Object.values(responses).some((value: any) => 
        typeof value === 'string' && isErrorResponse(value)
      );
      
      if (hasErrors) {
        console.log('API responses contain errors, skipping form population');
        return null; // Don't populate form with error data
      }
      
      // Extract company name from existing formData or try to parse from description
      let extractedCompanyName = formData.companyName;
      if (responses.Company_Description && !extractedCompanyName && !isErrorResponse(responses.Company_Description)) {
        // Try to extract company name from the first sentence
        const firstSentence = responses.Company_Description.split('.')[0];
        const words = firstSentence.split(' ');
        if (words.length > 0 && words[0] !== 'The' && words[0] !== 'A') {
          extractedCompanyName = words[0];
        }
      }

      // Parse industry categories
      const industries = [];
      if (responses.Industry_Category && !isErrorResponse(responses.Industry_Category)) {
        industries.push(responses.Industry_Category);
      }

      // Parse product/service keywords
      const productTags = [];
      if (responses["Product/Service_Keywords"] && !isErrorResponse(responses["Product/Service_Keywords"])) {
        const keywords = responses["Product/Service_Keywords"].split(';')
          .map(keyword => keyword.trim())
          .filter(keyword => keyword.length > 0);
        productTags.push(...keywords);
      }

      // Parse delivery method from Go-To-Market info
      const deliveryMethods = [];
      if (responses["Go-To-Market/Delivery_Method"] && !isErrorResponse(responses["Go-To-Market/Delivery_Method"])) {
        const gtmText = responses["Go-To-Market/Delivery_Method"].toLowerCase();
        if (gtmText.includes('software') || gtmText.includes('saas')) {
          deliveryMethods.push("Cloud-based");
        }
        if (gtmText.includes('platform')) {
          deliveryMethods.push("API");
        }
      }

      // Parse supply chain role
      const supplyChainRoles = [];
      if (responses["Company_Position_in_Supply_Chain"] && !isErrorResponse(responses["Company_Position_in_Supply_Chain"])) {
        const positionText = responses["Company_Position_in_Supply_Chain"].toLowerCase();
        if (positionText.includes('software')) {
          supplyChainRoles.push("Software Provider");
        }
        if (positionText.includes('consultancy') || positionText.includes('services')) {
          supplyChainRoles.push("Service Provider");
        }
      }

      // Parse functional categories/use cases
      const useCases = [];
      if (responses.Functional_Category && !isErrorResponse(responses.Functional_Category)) {
        useCases.push(responses.Functional_Category);
      }
      if (responses["Use_Cases_and_End_Users"] && !isErrorResponse(responses["Use_Cases_and_End_Users"])) {
        // Extract key use cases from the text
        const useCaseText = responses["Use_Cases_and_End_Users"];
        if (useCaseText.includes('sales coaching')) {
          useCases.push("Sales Coaching");
        }
        if (useCaseText.includes('training')) {
          useCases.push("Training & Development");
        }
        if (useCaseText.includes('performance')) {
          useCases.push("Performance Management");
        }
      }

      // Parse target customer industries
      const customerIndustries = [];
      if (responses.Target_Customer_Industries && !isErrorResponse(responses.Target_Customer_Industries)) {
        customerIndustries.push(responses.Target_Customer_Industries);
      }

      // Parse customer type
      const customerTypes = [];
      if (responses.Target_Customer_Type && !isErrorResponse(responses.Target_Customer_Type)) {
        const typeText = responses.Target_Customer_Type.toLowerCase();
        if (typeText.includes('large enterprises')) {
          customerTypes.push("Enterprise");
        }
        if (typeText.includes('mid-sized')) {
          customerTypes.push("SMB");
        }
      }

      return {
        companyName: extractedCompanyName,
        description: (responses.Company_Description && !isErrorResponse(responses.Company_Description)) 
          ? responses.Company_Description 
          : `${extractedCompanyName} provides innovative solutions in their industry.`,
        industry: industries.length > 0 ? industries : ["Technology"],
        offering: (responses.Company_Offering && !isErrorResponse(responses.Company_Offering)) 
          ? responses.Company_Offering 
          : "Software solutions and services",
        productTags: productTags.length > 0 ? productTags : ["Platform", "Software"],
        deliveryMethod: deliveryMethods.length > 0 ? deliveryMethods : ["Cloud-based"],
        supplyChainRole: supplyChainRoles.length > 0 ? supplyChainRoles : ["Software Provider"],
        useCase: useCases.length > 0 ? useCases : ["Business Solutions"],
        // Problem & Use Case section
        problemSolved: (responses["Problem_Solved_Market_Pain_Point"] && !isErrorResponse(responses["Problem_Solved_Market_Pain_Point"])) 
          ? responses["Problem_Solved_Market_Pain_Point"] 
          : "",
        useCases: (responses["Use_Cases_and_End_Users"] && !isErrorResponse(responses["Use_Cases_and_End_Users"])) 
          ? responses["Use_Cases_and_End_Users"] 
          : "",
        // Target Customer section
        targetCustomers: (responses.Target_Customer_Description && !isErrorResponse(responses.Target_Customer_Description)) 
          ? responses.Target_Customer_Description 
          : "",
        customerType: customerTypes.length > 0 ? customerTypes : ["Enterprise"],
        customerIndustries: customerIndustries.length > 0 ? customerIndustries : ["Technology"]
      };
    }

    // Fallback to original extraction logic if new format not available
    // ... keep existing code (original extraction logic for backward compatibility)
    let extractedCompanyName = formData.companyName;
    if (data.title) {
      const titleParts = data.title.split('|')[0].trim();
      if (titleParts && titleParts.length < 50) {
        extractedCompanyName = titleParts;
      }
    }

    let extractedDescription = '';
    if (data.meta?.description) {
      extractedDescription = data.meta.description;
    } else if (data.textContent) {
      const sentences = data.textContent.split(/[.!?]+/).filter(s => s.trim().length > 20);
      if (sentences.length > 0) {
        extractedDescription = sentences.slice(0, 2).join('. ').trim() + '.';
      }
    }

    const contentText = (data.textContent || '').toLowerCase();
    const metaText = (data.meta?.description || '').toLowerCase();
    const combinedText = `${contentText} ${metaText}`;

    const industryKeywords = {
      'Technology': ['software', 'saas', 'platform', 'technology', 'digital', 'tech', 'app', 'api'],
      'Healthcare': ['healthcare', 'medical', 'health', 'patient', 'clinical', 'pharmaceutical'],
      'Finance': ['financial', 'fintech', 'banking', 'payment', 'finance', 'investment'],
      'E-commerce': ['ecommerce', 'e-commerce', 'retail', 'shopping', 'marketplace'],
      'Manufacturing': ['manufacturing', 'industrial', 'production', 'factory'],
      'Education': ['education', 'learning', 'training', 'course', 'university'],
      'Marketing': ['marketing', 'advertising', 'campaign', 'brand', 'social media'],
      'Real Estate': ['real estate', 'property', 'construction', 'building']
    };

    const detectedIndustries: string[] = [];
    Object.entries(industryKeywords).forEach(([industry, keywords]) => {
      if (keywords.some(keyword => combinedText.includes(keyword))) {
        detectedIndustries.push(industry);
      }
    });

    const commonBusinessTerms = ['platform', 'solution', 'service', 'software', 'system', 'tool', 'application'];
    const extractedTags: string[] = [];
    commonBusinessTerms.forEach(term => {
      if (combinedText.includes(term)) {
        extractedTags.push(term);
      }
    });

    let extractedOffering = '';
    if (combinedText.includes('saas') || combinedText.includes('software as a service')) {
      extractedOffering = 'Software as a service platform';
    } else if (combinedText.includes('platform')) {
      extractedOffering = 'Digital platform solution';
    } else if (combinedText.includes('service')) {
      extractedOffering = 'Professional services';
    } else if (extractedDescription) {
      const firstSentence = extractedDescription.split('.')[0];
      if (firstSentence && firstSentence.length < 100) {
        extractedOffering = firstSentence;
      }
    }

    return {
      companyName: extractedCompanyName,
      description: extractedDescription || `${extractedCompanyName} provides innovative solutions in their industry.`,
      industry: detectedIndustries.length > 0 ? detectedIndustries : ["Technology"],
      offering: extractedOffering || "Digital solutions and services",
      productTags: extractedTags.length > 0 ? extractedTags : ["Platform", "Software"],
      deliveryMethod: combinedText.includes('cloud') || combinedText.includes('saas') ? ["Cloud-based"] : ["Cloud-based"],
      supplyChainRole: ["Software Provider"],
      useCase: ["Business Automation", "Digital Solutions"]
    };
  };

  const handleWebsiteSubmit = async (website: string) => {
    if (!website) return;
    
    setIsAnalyzing(true);
    
    try {
      console.log('Analyzing website:', website);
      const scrapedData = await analyzeCompanyWebsite(website);
      
      if (scrapedData) {
        console.log('Website analysis completed successfully');
        console.log('Extracting company data from response...');
        
        // Extract and populate form data from the API response
        const extractedData = extractCompanyDataFromResponse(scrapedData);
        
        if (extractedData) {
          console.log('Extracted data:', extractedData);
          
          // Update form data with extracted information
          setFormData(prev => ({
            ...prev,
            website,
            ...extractedData
          }));
        } else {
          console.log('API returned errors, not updating form data');
          // Just set the website without other data
          setFormData(prev => ({
            ...prev,
            website
          }));
        }
      }
    } catch (error) {
      console.error('Analysis failed:', error);
      // Fallback to basic data if API fails
      setFormData(prev => ({
        ...prev,
        website,
        description: `${formData.companyName} is a leading provider of innovative solutions in their industry.`,
        industry: ["Technology"],
        offering: "Software as a service platform for enterprise customers",
        productTags: ["SaaS", "Enterprise Software"],
        deliveryMethod: ["Cloud-based"],
        supplyChainRole: ["Software Provider"],
        useCase: ["Workflow Automation", "Data Analytics"]
      }));
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
