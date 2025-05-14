import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { 
  BarChart3, Globe, Building, Flag, ArrowRight, ArrowLeft, 
  Users, MapPin, Check, Sparkles, HelpCircle, Info 
} from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";

// Step 1: Project Setup
const ProjectSetupStep = ({ formData, setFormData, nextStep }) => {
  const [isValid, setIsValid] = useState(false);
  
  useEffect(() => {
    // Validate form on initial render and when form data changes
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
    const isFormValid = !!formData.projectName && 
                       !!formData.companyName && 
                       !!formData.country && 
                       !!formData.employeeCount && 
                       !!formData.description &&
                       !!formData.industry &&
                       !!formData.offering;
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

  const InfoSection = ({ title, example }) => {
    return (
      <PopoverContent className="w-80 p-4">
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Example:</h4>
          <p className="text-sm text-gray-700">{example}</p>
        </div>
      </PopoverContent>
    );
  };

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

        {/* Company Overview Section */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="space-y-2 mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Company Overview</h3>
            <p className="text-sm text-gray-600">Review and edit the company overview information</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="description" className="flex items-center gap-1">
                  Company Description <span className="text-red-500">*</span>
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Info className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <InfoSection 
                    title="Company Description" 
                    example="Provider of sales coaching and performance improvement software to field-based commercial teams in the life sciences sector, intended to drive consistent coaching standards and elevate team effectiveness."
                  />
                </Popover>
              </div>
              <p className="text-xs text-gray-500">A structured 3-5 sentence description to the company</p>
              <Textarea
                id="description"
                name="description"
                value={formData.description || ""}
                onChange={handleTextareaChange}
                placeholder="Describe the company"
                rows={4}
                required
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="industry" className="flex items-center gap-1">
                  Industry Category <span className="text-red-500">*</span>
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Info className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <InfoSection 
                    title="Industry Category" 
                    example="Marketing Automation, Sales Enablement Software, Workforce Training Platforms, Compliance Management Tools, Healthcare IT, Cybersecurity Software, Cloud Infrastructure, etc."
                  />
                </Popover>
              </div>
              <p className="text-xs text-gray-500">The commercial category the company's offering fits into</p>
              <Select 
                value={formData.industry || ""} 
                onValueChange={handleIndustryChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map(industry => (
                    <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="offering" className="flex items-center gap-1">
                  Company Offering <span className="text-red-500">*</span>
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Info className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <InfoSection 
                    title="Company Offering" 
                    example="Provides an intuitive platform for sales coaching, tailored to life sciences organizations."
                  />
                </Popover>
              </div>
              <p className="text-xs text-gray-500">The company's main product or service</p>
              <Textarea
                id="offering"
                name="offering"
                value={formData.offering || ""}
                onChange={handleTextareaChange}
                placeholder="Describe what the company offers"
                rows={3}
                required
              />
            </div>
          </div>
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

// AI Company Profiling
const AICompanyProfilingStep = ({ formData, setFormData, nextStep, prevStep }) => {
  const [website, setWebsite] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [animatingFields, setAnimatingFields] = useState([]);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [inputValue, setInputValue] = useState({
    productTags: "",
    useCase: ""
  });
  
  // Functions for Tags & Positioning section
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Simple tag management for chip inputs
  const handleAddTag = (field: string, tag: string) => {
    if (!tag.trim()) return;
    
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] || []), tag.trim()]
    }));
    
    // Reset the input value after adding a tag
    setInputValue(prev => ({ ...prev, [field]: "" }));
  };
  
  const handleRemoveTag = (field: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };
  
  const handleKeyDown = (field: string, e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag(field, inputValue[field]);
    }
  };
  
  const handleWebsiteSubmit = (e) => {
    e.preventDefault();
    if (!website) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis with continuous progress over 20 seconds
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
            industry: "Technology",
            offering: "Software as a service platform for enterprise customers",
            productTags: ["SaaS", "Enterprise Software"],
            deliveryMethod: "Cloud-based",
            supplyChainRole: "Software Provider",
            useCase: ["Workflow Automation", "Data Analytics"],
            problemSolved: "Inefficient manual processes and lack of data visibility",
            useCases: "Used by operations teams to streamline workflows and improve decision-making",
            competitors: ["Competitor A", "Competitor B"],
            revenueLastYear: "2,500,000",
            revenueThisYear: "3,200,000",
            ebitdaLastYear: "500,000",
            ebitdaThisYear: "750,000",
            targetCustomers: "Mid to large enterprises with complex operational needs",
            customerType: "Enterprise",
            customerIndustries: ["Manufacturing", "Healthcare", "Finance"]
          }));
          
          nextStep();
        }, 3000); // Show completion animation for 3 seconds before proceeding
      }
    }, 50); // Update frequently for smoother animation
  };

  // Delivery methods
  const deliveryMethods = ["Cloud-based", "On-premise", "Mobile App", "API", "Hardware", "Hybrid"];
  
  // Supply chain roles
  const supplyChainRoles = ["Software Provider", "Hardware Manufacturer", "Service Provider", "Distributor", "Reseller"];

  const InfoSection = ({ title, example }) => {
    return (
      <PopoverContent className="w-80 p-4">
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Example:</h4>
          <p className="text-sm text-gray-700">{example}</p>
        </div>
      </PopoverContent>
    );
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
              Analyze
            </Button>
          </div>
        </div>
      </form>
      
      {isAnalyzing ? (
        <div className="space-y-6 pt-4 animate-fade-in">
          <div className="flex items-center gap-3 text-blueknight-600">
            <Globe className="animate-pulse h-5 w-5" />
            <p className="text-sm font-medium">
              We're now analyzing the website with AI to pre-fill the company profile for buyer targeting...
            </p>
          </div>
          
          <Progress value={progress} className="h-2" />
          
          {analysisComplete ? (
            <div className="relative h-40 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 animate-pulse rounded-full blur-3xl"/>
              <div className="z-10 flex flex-col items-center space-y-4">
                <div className="p-3 bg-blueknight-50 rounded-full">
                  <Sparkles className="h-12 w-12 text-blueknight-500 animate-scale-in" />
                </div>
                <p className="text-lg font-medium text-blueknight-700 animate-fade-in">
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
      ) : (
        <div className="mt-10 pt-6 border-t border-gray-200">
          <div className="space-y-2 mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Tags & Positioning</h3>
            <p className="text-sm text-gray-600">Define the company's market position and key attributes</p>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Product/Service Keywords</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Info className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <InfoSection 
                    title="Product Tags" 
                    example="sales coaching platform, learning management system, compliance software, analytics dashboard, training automation tool"
                  />
                </Popover>
              </div>
              <p className="text-xs text-gray-500">Keywords that describe the company's key offerings</p>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.productTags?.map((tag, index) => (
                  <div 
                    key={index} 
                    className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    {tag}
                    <button 
                      type="button" 
                      onClick={() => handleRemoveTag("productTags", index)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={inputValue.productTags}
                  onChange={(e) => setInputValue(prev => ({ ...prev, productTags: e.target.value }))}
                  onKeyDown={(e) => handleKeyDown("productTags", e)}
                  placeholder="Add product tags"
                  className="flex-1"
                />
                <Button 
                  type="button"
                  size="sm"
                  onClick={() => handleAddTag("productTags", inputValue.productTags)}
                  disabled={!inputValue.productTags}
                >
                  Add
                </Button>
              </div>
              <p className="text-xs text-gray-500">Press Enter to add</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="deliveryMethod">Go-To-Market/Delivery Method</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Info className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <InfoSection 
                    title="Delivery Method" 
                    example="How is the company's offering being delivered or brought to market"
                  />
                </Popover>
              </div>
              <p className="text-xs text-gray-500">How is the company's offering being delivered or brought to market</p>
              <Select 
                value={formData.deliveryMethod || ""} 
                onValueChange={(value) => handleSelectChange("deliveryMethod", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select delivery method" />
                </SelectTrigger>
                <SelectContent>
                  {deliveryMethods.map(method => (
                    <SelectItem key={method} value={method}>{method}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="supplyChainRole">Company's Position in Supply Chain</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Info className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <InfoSection 
                    title="Supply Chain Role" 
                    example="Where does the company sit on the supply chain"
                  />
                </Popover>
              </div>
              <p className="text-xs text-gray-500">Where does the company sit on the supply chain</p>
              <Select 
                value={formData.supplyChainRole || ""} 
                onValueChange={(value) => handleSelectChange("supplyChainRole", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role in supply chain" />
                </SelectTrigger>
                <SelectContent>
                  {supplyChainRoles.map(role => (
                    <SelectItem key={role} value={role}>{role}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Functional Category</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Info className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <InfoSection 
                    title="Functional Category" 
                    example="What does the company build, deliver or enable - not the industry it serves"
                  />
                </Popover>
              </div>
              <p className="text-xs text-gray-500">What does the company build, deliver or enable - not the industry it serves</p>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.useCase?.map((tag, index) => (
                  <div 
                    key={index} 
                    className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    {tag}
                    <button 
                      type="button" 
                      onClick={() => handleRemoveTag("useCase", index)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={inputValue.useCase}
                  onChange={(e) => setInputValue(prev => ({ ...prev, useCase: e.target.value }))}
                  onKeyDown={(e) => handleKeyDown("useCase", e)}
                  placeholder="Add functional categories"
                  className="flex-1"
                />
                <Button 
                  type="button"
                  size="sm"
                  onClick={() => handleAddTag("useCase", inputValue.useCase)}
                  disabled={!inputValue.useCase}
                >
                  Add
                </Button>
              </div>
              <p className="text-xs text-gray-500">Press Enter to add</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between pt-4">
        <Button 
          onClick={prevStep}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        {!isAnalyzing && (
          <Button 
            onClick={nextStep}
            className="flex items-center gap-2"
          >
            Next Section
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

// Base component for Company Profile sections
const SectionContainer = ({ children, title, description }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      
      <Card className="border-t-4 border-t-blueknight-500">
        <CardContent className="pt-6">
          {children}
        </CardContent>
      </Card>
    </div>
  );
};

// Step 3: Problem & Use Case (was Step 4 before)
const ProblemUseCaseSection = ({ formData, setFormData, nextStep, prevStep }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const InfoSection = ({ title, example }) => {
    return (
      <PopoverContent className="w-80 p-4">
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Example:</h4>
          <p className="text-sm text-gray-700">{example}</p>
        </div>
      </PopoverContent>
    );
  };

  return (
    <SectionContainer 
      title="Problem & Use Case" 
      description="Describe the problem solved and typical use cases"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="problemSolved">Problem Solved / Market Pain Point</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Info className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <InfoSection 
                title="Problem Solved" 
                example="Addresses the need for scalable, consistent sales coaching and performance improvement across geographically dispersed field teams."
              />
            </Popover>
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
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Info className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <InfoSection 
                title="Use Cases" 
                example="Sales managers conducting coaching sessions; Field representatives engaging in self-assessments; HR departments tracking competency development."
              />
            </Popover>
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

      <div className="flex justify-between pt-6">
        <Button 
          onClick={prevStep}
          variant="outline" 
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button 
          onClick={nextStep}
          className="flex items-center gap-2"
        >
          Next Section
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </SectionContainer>
  );
};

// Step 4: Competitive & Financials (was Step 5 before)
const CompetitiveFinancialsSection = ({ formData, setFormData, nextStep, prevStep }) => {
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

  const InfoSection = ({ title, example }) => {
    return (
      <PopoverContent className="w-80 p-4">
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Example:</h4>
          <p className="text-sm text-gray-700">{example}</p>
        </div>
      </PopoverContent>
    );
  };

  return (
    <SectionContainer 
      title="Competitive & Financials" 
      description="Enter financial details and competitor information"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="revenueLastYear">Last Year Revenue ($)</Label>
            <Input
              id="revenueLastYear"
              name="revenueLastYear"
              value={formData.revenueLastYear || ""}
              onChange={handleChange}
              placeholder="0"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="revenueThisYear">This Year Revenue ($)</Label>
            <Input
              id="revenueThisYear"
              name="revenueThisYear"
              value={formData.revenueThisYear || ""}
              onChange={handleChange}
              placeholder="0"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="ebitdaLastYear">Last Year EBITDA ($)</Label>
            <Input
              id="ebitdaLastYear"
              name="ebitdaLastYear"
              value={formData.ebitdaLastYear || ""}
              onChange={handleChange}
              placeholder="0"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="ebitdaThisYear">This Year EBITDA ($)</Label>
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

      <div className="flex justify-between pt-6">
        <Button 
          onClick={prevStep}
          variant="outline" 
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button 
          onClick={nextStep}
          className="flex items-center gap-2"
        >
          Next Section
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </SectionContainer>
  );
};

// Step 5: Target Customer Profile (was Step 6 before)
const TargetCustomerSection = ({ formData, setFormData, nextStep, prevStep }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const [industry, setIndustry] = useState("");
  
  const handleAddIndustry = () => {
    if (!industry.trim()) return;
    
    setFormData(prev => ({
      ...prev,
      customerIndustries: [...(prev.customerIndustries || []), industry.trim()]
    }));
    
    setIndustry("");
  };
  
  const handleRemoveIndustry = (index: number) => {
    setFormData(prev => ({
      ...prev,
      customerIndustries: prev.customerIndustries.filter((_, i) => i !== index)
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddIndustry();
    }
  };

  // Customer types
  const customerTypes = ["Enterprise", "SMB", "Government", "Consumer", "Non-profit"];

  const InfoSection = ({ title, example }) => {
    return (
      <PopoverContent className="w-80 p-4">
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Example:</h4>
          <p className="text-sm text-gray-700">{example}</p>
        </div>
      </PopoverContent>
    );
  };

  return (
    <SectionContainer 
      title="Target Customer Profile" 
      description="Define the ideal customer profile for this company"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="targetCustomers">Target Customers Description</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Info className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <InfoSection 
                title="Target Customers" 
                example="Who uses the company's offering. What is the general user segment/department, what is their specific role and their operational purpose"
              />
            </Popover>
          </div>
          <p className="text-xs text-gray-500">Who uses the company's offering, their role and purpose</p>
          <Textarea
            id="targetCustomers"
            name="targetCustomers"
            value={formData.targetCustomers || ""}
            onChange={handleChange}
            placeholder="Describe the company's target customers"
            rows={4}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="customerType">Target Customer Type</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Info className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <InfoSection 
                title="Customer Type" 
                example="The type and size of the company's target customers"
              />
            </Popover>
          </div>
          <p className="text-xs text-gray-500">The type and size of the company's target customers</p>
          <Select 
            value={formData.customerType || ""} 
            onValueChange={(value) => handleSelectChange("customerType", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select customer type" />
            </SelectTrigger>
            <SelectContent>
              {customerTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Target Customer Industries</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Info className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <InfoSection 
                title="Customer Industries" 
                example="Healthcare Providers, Financial Services, Manufacturing, Retail, Education, Government, Logistics, Telecommunications, etc."
              />
            </Popover>
          </div>
          <p className="text-xs text-gray-500">The commercial sector or industry the company's customers belong to</p>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.customerIndustries?.map((ind, index) => (
              <div 
                key={index} 
                className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-sm flex items-center gap-1"
              >
                {ind}
                <button 
                  type="button" 
                  onClick={() => handleRemoveIndustry(index)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Add customer industries"
              className="flex-1"
            />
            <Button 
              type="button"
              size="sm"
              onClick={handleAddIndustry}
              disabled={!industry}
            >
              Add
            </Button>
          </div>
          <p className="text-xs text-gray-500">Press Enter to add</p>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <Button 
          onClick={prevStep}
          variant="outline" 
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button 
          onClick={nextStep}
          className="flex items-center gap-2"
        >
          Next Section
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </SectionContainer>
  );
};

// Step 6: Buyer Preferences (was Step 7 before)
const BuyerPreferencesSection = ({ formData, setFormData, handleSubmit, prevStep }) => {
  const [includeGeography, setIncludeGeography] = useState(true);
  const [excludeGeography, setExcludeGeography] = useState(false);
  const [includeGeo, setIncludeGeo] = useState("");
  const [excludeGeo, setExcludeGeo] = useState("");
  
  const handleEmployeeCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, minEmployees: e.target.value }));
  };

  // Geography management
  const handleAddIncludeGeo = () => {
    if (!includeGeo.trim()) return;
    setFormData(prev => ({
      ...prev,
      includeGeographies: [...(prev.includeGeographies || []), includeGeo.trim()]
    }));
    setIncludeGeo("");
  };
  
  const handleAddExcludeGeo = () => {
    if (!excludeGeo.trim()) return;
    setFormData(prev => ({
      ...prev,
      excludeGeographies: [...(prev.excludeGeographies || []), excludeGeo.trim()]
    }));
    setExcludeGeo("");
  };
  
  const handleRemoveIncludeGeo = (index: number) => {
    setFormData(prev => ({
      ...prev,
      includeGeographies: prev.includeGeographies?.filter((_, i) => i !== index)
    }));
  };
  
  const handleRemoveExcludeGeo = (index: number) => {
    setFormData(prev => ({
      ...prev,
      excludeGeographies: prev.excludeGeographies?.filter((_, i) => i !== index)
    }));
  };

  const handleKeyDown = (type: 'include' | 'exclude', e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (type === 'include') {
        handleAddIncludeGeo();
      } else {
        handleAddExcludeGeo();
      }
    }
  };

  const InfoSection = ({ title, example }) => {
    return (
      <PopoverContent className="w-80 p-4">
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Example:</h4>
          <p className="text-sm text-gray-700">{example}</p>
        </div>
      </PopoverContent>
    );
  };

  return (
    <SectionContainer 
      title="Buyer Preferences" 
      description="Define preferences for potential buyers of this company"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="minEmployees">Minimum Buyer Size (Employees)</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Info className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <InfoSection 
                title="Minimum Buyer Size" 
                example="This helps identify buyers of appropriate size for the acquisition"
              />
            </Popover>
          </div>
          <p className="text-xs text-gray-500">Enter the minimum number of employees a buyer should have</p>
          <Input
            id="minEmployees"
            name="minEmployees"
            type="number"
            min="1"
            value={formData.minEmployees || ""}
            onChange={handleEmployeeCountChange}
            placeholder="Enter minimum employee count"
          />
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="includeGeographyCheck" 
              className="mr-2 h-4 w-4" 
              checked={includeGeography}
              onChange={() => setIncludeGeography(!includeGeography)}
            />
            <Label htmlFor="includeGeographyCheck">Include buyers from specific geographies</Label>
          </div>
          
          {includeGeography && (
            <div className="ml-6 space-y-2">
              <p className="text-xs text-gray-500">Add geographies to include</p>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.includeGeographies?.map((geo, index) => (
                  <div 
                    key={index} 
                    className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    {geo}
                    <button 
                      type="button" 
                      onClick={() => handleRemoveIncludeGeo(index)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={includeGeo}
                  onChange={(e) => setIncludeGeo(e.target.value)}
                  onKeyDown={(e) => handleKeyDown('include', e)}
                  placeholder="Add geography (e.g., North America)"
                  className="flex-1"
                />
                <Button 
                  type="button"
                  size="sm"
                  onClick={handleAddIncludeGeo}
                  disabled={!includeGeo}
                >
                  Add
                </Button>
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="excludeGeographyCheck" 
              className="mr-2 h-4 w-4" 
              checked={excludeGeography}
              onChange={() => setExcludeGeography(!excludeGeography)}
            />
            <Label htmlFor="excludeGeographyCheck">Exclude buyers from specific geographies</Label>
          </div>
          
          {excludeGeography && (
            <div className="ml-6 space-y-2">
              <p className="text-xs text-gray-500">Add geographies to exclude</p>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.excludeGeographies?.map((geo, index) => (
                  <div 
                    key={index} 
                    className="bg-red-50 text-red-700 px-2 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    {geo}
                    <button 
                      type="button" 
                      onClick={() => handleRemoveExcludeGeo(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={excludeGeo}
                  onChange={(e) => setExcludeGeo(e.target.value)}
                  onKeyDown={(e) => handleKeyDown('exclude', e)}
                  placeholder="Add geography to exclude"
                  className="flex-1"
                />
                <Button 
                  type="button"
                  size="sm"
                  onClick={handleAddExcludeGeo}
                  disabled={!excludeGeo}
                >
                  Add
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <Button 
          onClick={prevStep}
          variant="outline" 
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button 
          onClick={handleSubmit}
          className="flex items-center gap-2"
        >
          Complete Project
        </Button>
      </div>
    </SectionContainer>
  );
};

// New Component: Confirmation Screen
const ConfirmationScreen = ({ navigate }) => {
  const [countdown, setCountdown] = useState(5);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/listings');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="h-full flex flex-col items-center justify-center py-16 animate-fade-in">
      <div className="relative mb-8">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blueknight-400 to-blueknight-600 flex items-center justify-center">
          <Check className="h-8 w-8 text-white animate-scale-in" />
        </div>
        <div className="absolute inset-0 bg-blueknight-400/20 rounded-full animate-ping" />
      </div>
      
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Your project has been created and enriched with AI
      </h2>
      
      <p className="text-gray-600 text-center mb-8 max-w-md">
        You're now one step closer to identifying the right buyer.
      </p>
      
      <div className="flex flex-col items-center">
        <p className="text-sm text-gray-500 mb-2">
          Redirecting to your project listings in {countdown}...
        </p>
        <Progress 
          value={(5 - countdown) * 20} 
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
  const [formData, setFormData] = useState({
    projectName: '',
    companyName: '',
    country: '',
    employeeCount: '',
    website: '',
    description: '', // Moved from section 2
    industry: '', // Moved from section 2
    offering: '', // Moved from section 2
    includeGeographies: [],
    excludeGeographies: [],
    // Additional fields will be added by the AI enrichment
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
  
  const handleSubmit = () => {
    // Show confirmation screen instead of immediate redirect
    setShowConfirmation(true);
    toast({
      title: "Project created successfully",
    });
  };

  // Progress indicators
  const renderStepIndicator = () => {
    // Define all steps
    const steps = [
      { number: 1, label: "Project Setup" },
      { number: 2, label: "AI Company Profiling" },
      { number: 3, label: "Complete Profile" }
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
          <span className="text-xs font-medium">AI Company Profiling</span>
          <span className="text-xs font-medium">Complete Profile</span>
        </div>

        {/* Current section indicator for profile section steps */}
        {currentStep > 2 && (
          <div className="mt-6 text-sm font-medium text-gray-600">
            <span>Section {currentStep - 2} of 4: </span>
            <span className="text-blueknight-600 font-semibold">
              {currentStep === 3 ? "Problem & Use Case" :
               currentStep === 4 ? "Competitive & Financials" :
               currentStep === 5 ? "Target Customer Profile" :
               "Buyer Preferences"}
            </span>
          </div>
        )}
      </div>
    );
  };

  // If showing confirmation, render that instead
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
        <ProblemUseCaseSection 
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}

      {currentStep === 4 && (
        <CompetitiveFinancialsSection 
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}

      {currentStep === 5 && (
        <TargetCustomerSection 
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}

      {currentStep === 6 && (
        <BuyerPreferencesSection 
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          prevStep={prevStep}
        />
      )}
    </>
  );
};

export default ListingForm;
