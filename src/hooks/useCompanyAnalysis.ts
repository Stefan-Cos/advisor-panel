
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

  const extractCompanyDataFromResponse = (data: any) => {
    // Extract company name from title or text content
    let extractedCompanyName = formData.companyName;
    if (data.title) {
      // Try to extract company name from title (often in format "Company Name | Description")
      const titleParts = data.title.split('|')[0].trim();
      if (titleParts && titleParts.length < 50) { // Reasonable company name length
        extractedCompanyName = titleParts;
      }
    }

    // Extract description from meta description or first paragraph of content
    let extractedDescription = '';
    if (data.meta?.description) {
      extractedDescription = data.meta.description;
    } else if (data.textContent) {
      // Take first 2-3 sentences from content as description
      const sentences = data.textContent.split(/[.!?]+/).filter(s => s.trim().length > 20);
      if (sentences.length > 0) {
        extractedDescription = sentences.slice(0, 2).join('. ').trim() + '.';
      }
    }

    // Extract keywords and potential industry tags from content
    const contentText = (data.textContent || '').toLowerCase();
    const metaText = (data.meta?.description || '').toLowerCase();
    const combinedText = `${contentText} ${metaText}`;

    // Common industry keywords to look for
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

    // Extract industries based on content
    const detectedIndustries: string[] = [];
    Object.entries(industryKeywords).forEach(([industry, keywords]) => {
      if (keywords.some(keyword => combinedText.includes(keyword))) {
        detectedIndustries.push(industry);
      }
    });

    // Extract product/service keywords
    const commonBusinessTerms = ['platform', 'solution', 'service', 'software', 'system', 'tool', 'application'];
    const extractedTags: string[] = [];
    commonBusinessTerms.forEach(term => {
      if (combinedText.includes(term)) {
        extractedTags.push(term);
      }
    });

    // Determine offering based on content
    let extractedOffering = '';
    if (combinedText.includes('saas') || combinedText.includes('software as a service')) {
      extractedOffering = 'Software as a service platform';
    } else if (combinedText.includes('platform')) {
      extractedOffering = 'Digital platform solution';
    } else if (combinedText.includes('service')) {
      extractedOffering = 'Professional services';
    } else if (extractedDescription) {
      // Use first sentence of description as offering
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
      
      if (scrapedData?.textContent) {
        console.log('Website content scraped successfully');
        console.log('Extracting company data from response...');
        
        // Extract and populate form data from the API response
        const extractedData = extractCompanyDataFromResponse(scrapedData);
        console.log('Extracted data:', extractedData);
        
        // Update form data with extracted information
        setFormData(prev => ({
          ...prev,
          website,
          ...extractedData
        }));
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
