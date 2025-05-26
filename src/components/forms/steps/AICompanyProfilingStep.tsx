import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, BarChart3, Globe, Brain, Check } from 'lucide-react';
import FormNavigation from '../components/FormNavigation';

interface AICompanyProfilingStepProps {
  formData: any;
  setFormData: (data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const AICompanyProfilingStep: React.FC<AICompanyProfilingStepProps> = ({ formData, setFormData, nextStep, prevStep }) => {
  const [website, setWebsite] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [animatingFields, setAnimatingFields] = useState<string[]>([]);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  
  const handleWebsiteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!website) return;
    
    setIsAnalyzing(true);
    
    try {
      // Make POST request to the API with only URL
      const response = await fetch('http://167.71.130.151/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: website
        })
      });
      
      console.log('API Response status:', response.status);
      
      if (response.ok) {
        const apiData = await response.json();
        console.log('API Response data:', apiData);
      } else {
        console.error('API request failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error making API request:', error);
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

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-gray-800">AI Company Profiling</h2>
        <p className="text-sm text-gray-600">Paste the company's website to activate AI-driven enrichment. We'll extract and pre-fill the full profile — from product offering to GTM strategy, industry relevance, and more.</p>
      </div>
      
      <form onSubmit={handleWebsiteSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="website">Company Website URL</Label>
          <div className="flex gap-2">
            <Input
              id="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://www.example.com"
              className="flex-1"
              disabled={isAnalyzing}
            />
            <Button 
              type="submit" 
              disabled={!website || isAnalyzing}
              className="bg-blueknight-600 hover:bg-blueknight-700"
            >
              Analyse
            </Button>
          </div>
        </div>
      </form>
      
      {isAnalyzing ? (
        <div className="space-y-6 pt-4 animate-fade-in">
          <div className="flex items-center gap-3 text-blueknight-600">
            <Globe className="animate-pulse h-5 w-5" />
            <p className="text-sm font-medium">
              We're now analysing the website with AI to pre-fill the company profile for buyer targeting...
            </p>
          </div>
          
          <Progress value={progress} className="h-2" />
          
          {analysisComplete ? (
            <div className="relative h-40 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 animate-pulse rounded-full blur-3xl"/>
              <div className="z-10 flex flex-col items-center space-y-4">
                <div className="p-3 bg-purple-50 rounded-full">
                  <Brain className="h-12 w-12 text-purple-500 animate-scale-in" />
                </div>
                <p className="text-lg font-medium text-purple-700 animate-fade-in">
                  Analysis complete!
                </p>
              </div>
            </div>
          ) : (
            <div className="relative h-40 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 animate-pulse rounded-full blur-3xl"/>
              <div className="z-10 flex flex-col items-center space-y-2">
                <BarChart3 className="h-10 w-10 text-blueknight-500 animate-pulse" />
                <p className="text-sm font-medium text-gray-500">Processing company data...</p>
              </div>
            </div>
          )}
          
          {/* Animated section for incoming data */}
          <div className="space-y-4 mt-8">
            {animatingFields.includes('companyOverview') && (
              <div className="animate-slide-in-right flex items-center gap-2 text-sm text-gray-600">
                <Check className="h-4 w-4 text-green-500" />
                <span>Extracted Company Overview</span>
              </div>
            )}
            {animatingFields.includes('marketPositioning') && (
              <div className="animate-slide-in-right flex items-center gap-2 text-sm text-gray-600">
                <Check className="h-4 w-4 text-green-500" />
                <span>Extracted Market Positioning</span>
              </div>
            )}
            {animatingFields.includes('problemsUseCases') && (
              <div className="animate-slide-in-right flex items-center gap-2 text-sm text-gray-600">
                <Check className="h-4 w-4 text-green-500" />
                <span>Extracted Problems and Use Cases</span>
              </div>
            )}
            {animatingFields.includes('customerProfile') && (
              <div className="animate-slide-in-right flex items-center gap-2 text-sm text-gray-600">
                <Check className="h-4 w-4 text-green-500" />
                <span>Extracted Customer Profile</span>
              </div>
            )}
          </div>
        </div>
      ) : null}

      <FormNavigation 
        prevStep={prevStep}
        nextStep={null} // Removed the Next Section button completely
      />
    </div>
  );
};

export default AICompanyProfilingStep;
