
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Globe, Building, Flag, ArrowRight, ArrowLeft, Users, MapPin, Check } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
  
  const handleCountryChange = (value: string) => {
    setFormData(prev => ({ ...prev, country: value }));
  };

  const handleEmployeeCountChange = (value: string) => {
    setFormData(prev => ({ ...prev, employeeCount: value }));
  };

  const validateForm = () => {
    const isFormValid = !!formData.projectName && 
                       !!formData.companyName && 
                       !!formData.country && 
                       !!formData.employeeCount;
    setIsValid(isFormValid);
  };

  const countries = [
    'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 
    'France', 'Japan', 'China', 'India', 'Brazil', 'Mexico', 'Spain'
  ];

  const employeeRanges = [
    '1-10', '11-50', '51-200', '201-500', '501-1000', '1001-5000', '5001+'
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-gray-800">Project Setup</h2>
        <p className="text-sm text-gray-600">Enter basic information to get started with your new project</p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="projectName">Project Name <span className="text-red-500">*</span></Label>
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
          <Label htmlFor="companyName">Company Name <span className="text-red-500">*</span></Label>
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
          <Label htmlFor="country">Headquarters - Country/Region <span className="text-red-500">*</span></Label>
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
          <Label htmlFor="employeeCount">Number of Employees <span className="text-red-500">*</span></Label>
          <Select value={formData.employeeCount} onValueChange={handleEmployeeCountChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select employee range" />
            </SelectTrigger>
            <SelectContent>
              {employeeRanges.map(range => (
                <SelectItem key={range} value={range}>{range}</SelectItem>
              ))}
            </SelectContent>
          </Select>
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

// Step 2: Website Enrichment
const WebsiteEnrichmentStep = ({ formData, setFormData, nextStep, prevStep }) => {
  const [website, setWebsite] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [animatingFields, setAnimatingFields] = useState([]);
  
  const handleWebsiteSubmit = (e) => {
    e.preventDefault();
    if (!website) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis with progress updates over 20 seconds
    const totalDuration = 20000; // 20 seconds
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1.67; // ~60 updates over 20 seconds
        
        // Animate fields flying in at different progress points
        if (newProgress > 15 && !animatingFields.includes('description')) {
          setAnimatingFields(prev => [...prev, 'description']);
        }
        if (newProgress > 30 && !animatingFields.includes('industry')) {
          setAnimatingFields(prev => [...prev, 'industry']);
        }
        if (newProgress > 45 && !animatingFields.includes('productTags')) {
          setAnimatingFields(prev => [...prev, 'productTags']);
        }
        if (newProgress > 60 && !animatingFields.includes('financials')) {
          setAnimatingFields(prev => [...prev, 'financials']);
        }
        if (newProgress > 80 && !animatingFields.includes('customers')) {
          setAnimatingFields(prev => [...prev, 'customers']);
        }
        
        if (newProgress >= 100) {
          clearInterval(interval);
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
          }, 500);
        }
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, totalDuration / 60); // Update ~60 times over the duration
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
      
      {isAnalyzing && (
        <div className="space-y-6 pt-4 animate-fade-in">
          <div className="flex items-center gap-3 text-blueknight-600">
            <Globe className="animate-pulse h-5 w-5" />
            <p className="text-sm font-medium">
              We're now analyzing the website with AI to pre-fill the company profile for buyer targeting...
            </p>
          </div>
          
          <Progress value={progress} className="h-2" />
          
          <div className="relative h-40 flex items-center justify-center overflow-hidden">
            <div className="absolute w-full h-full opacity-10">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 animate-pulse rounded-full blur-xl"/>
            </div>
            <div className="z-10 flex flex-col items-center space-y-2">
              <BarChart3 className="h-10 w-10 text-blueknight-500 animate-pulse" />
              <p className="text-sm font-medium text-gray-500">Processing company data...</p>
            </div>
          </div>
          
          {/* Animated section for incoming data */}
          <div className="space-y-4 mt-8">
            {animatingFields.includes('description') && (
              <div className="animate-slide-in-right flex items-center gap-2 text-sm text-gray-600">
                <Check className="h-4 w-4 text-green-500" />
                <span>Found company description</span>
              </div>
            )}
            {animatingFields.includes('industry') && (
              <div className="animate-slide-in-right flex items-center gap-2 text-sm text-gray-600">
                <Check className="h-4 w-4 text-green-500" />
                <span>Detected industry classification</span>
              </div>
            )}
            {animatingFields.includes('productTags') && (
              <div className="animate-slide-in-right flex items-center gap-2 text-sm text-gray-600">
                <Check className="h-4 w-4 text-green-500" />
                <span>Extracted product keywords</span>
              </div>
            )}
            {animatingFields.includes('financials') && (
              <div className="animate-slide-in-right flex items-center gap-2 text-sm text-gray-600">
                <Check className="h-4 w-4 text-green-500" />
                <span>Estimated financial metrics</span>
              </div>
            )}
            {animatingFields.includes('customers') && (
              <div className="animate-slide-in-right flex items-center gap-2 text-sm text-gray-600">
                <Check className="h-4 w-4 text-green-500" />
                <span>Identified target customer profile</span>
              </div>
            )}
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
            variant="outline"
            className="flex items-center gap-2 text-gray-600 border-gray-300"
          >
            Proceed Without Analysis
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

// Step 3: Company Overview Section
const CompanyOverviewSection = ({ formData, setFormData, nextStep, prevStep }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Industries
  const industries = [
    "Technology", "Healthcare", "Finance", "Manufacturing", "Retail", "Energy", 
    "Real Estate", "Media", "Telecommunications", "Transportation", "Education"
  ];

  return (
    <SectionContainer 
      title="Company Overview" 
      description="Review and edit the company overview information"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="description">Company Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            placeholder="Describe the company"
            rows={4}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="industry">Industry Category</Label>
          <Select 
            value={formData.industry || ""} 
            onValueChange={(value) => handleSelectChange("industry", value)}
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
          <Label htmlFor="offering">Company Offering</Label>
          <Textarea
            id="offering"
            name="offering"
            value={formData.offering || ""}
            onChange={handleChange}
            placeholder="Describe what the company offers"
            rows={3}
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

// Step 4: Tags & Positioning
const TagsPositioningSection = ({ formData, setFormData, nextStep, prevStep }) => {
  const [inputValue, setInputValue] = useState({
    productTags: "",
    useCase: ""
  });
  
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

  // Delivery methods
  const deliveryMethods = ["Cloud-based", "On-premise", "Mobile App", "API", "Hardware", "Hybrid"];
  
  // Supply chain roles
  const supplyChainRoles = ["Software Provider", "Hardware Manufacturer", "Service Provider", "Distributor", "Reseller"];

  return (
    <SectionContainer 
      title="Tags & Positioning" 
      description="Define the company's market position and key attributes"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Product Tags</Label>
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
          <Label htmlFor="deliveryMethod">GTM Delivery Method</Label>
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
          <Label htmlFor="supplyChainRole">Company Role in Supply Chain</Label>
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
          <Label>Use Case / Functional Tags</Label>
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
              placeholder="Add use case tags"
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

// Step 5: Problem & Use Case
const ProblemUseCaseSection = ({ formData, setFormData, nextStep, prevStep }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <SectionContainer 
      title="Problem & Use Case" 
      description="Describe the problem solved and typical use cases"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="problemSolved">Problem Solved / Market Pain Point</Label>
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
          <Label htmlFor="useCases">Use Cases and End Users</Label>
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

// Step 6: Competitive & Financials
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

  return (
    <SectionContainer 
      title="Competitive & Financials" 
      description="Enter financial details and competitor information"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Main Competitors</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.competitors?.map((comp, index) => (
              <div 
                key={index} 
                className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-sm flex items-center gap-1"
              >
                {comp}
                <button 
                  type="button" 
                  onClick={() => handleRemoveCompetitor(index)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={competitor}
              onChange={(e) => setCompetitor(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Add competitors"
              className="flex-1"
            />
            <Button 
              type="button"
              size="sm"
              onClick={handleAddCompetitor}
              disabled={!competitor}
            >
              Add
            </Button>
          </div>
          <p className="text-xs text-gray-500">Press Enter to add</p>
        </div>
        
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

// Step 7: Target Customer Profile
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

  return (
    <SectionContainer 
      title="Target Customer Profile" 
      description="Define the ideal customer profile for this company"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="targetCustomers">Target Customers Description</Label>
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
          <Label htmlFor="customerType">Target Customer Type</Label>
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
          <Label>Customer Industries</Label>
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

// Step 8: Buyer Preferences
const BuyerPreferencesSection = ({ formData, setFormData, handleSubmit, prevStep }) => {
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleMinEmployeesChange = (value: string) => {
    setFormData(prev => ({ ...prev, minEmployees: value }));
  };

  const handleGeographyChange = (value: string) => {
    setFormData(prev => ({ ...prev, geographyPreference: value }));
  };

  const handleGeographyFilterChange = (value: string) => {
    if (value === "include") {
      setFormData(prev => ({ ...prev, includeGeography: true }));
    } else {
      setFormData(prev => ({ ...prev, includeGeography: false }));
    }
  };

  const employeeRanges = [
    '1-10', '11-50', '51-200', '201-500', '501-1000', '1001-5000', '5001+'
  ];

  const geographies = [
    'North America', 'Europe', 'Asia-Pacific', 'Latin America', 'Middle East & Africa', 'Global'
  ];

  return (
    <SectionContainer 
      title="Buyer Preferences" 
      description="Define preferences for potential buyers of this company"
    >
      <div className="space-y-6">
        <div className="space-y-3">
          <Label>Geography Filter</Label>
          <RadioGroup 
            value={formData.includeGeography === undefined ? "include" : formData.includeGeography ? "include" : "exclude"} 
            onValueChange={handleGeographyFilterChange} 
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="include" id="include" />
              <Label htmlFor="include" className="text-sm font-normal cursor-pointer">Include buyers from specific geography</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="exclude" id="exclude" />
              <Label htmlFor="exclude" className="text-sm font-normal cursor-pointer">Don't filter by geography</Label>
            </div>
          </RadioGroup>
        </div>

        {(formData.includeGeography === undefined || formData.includeGeography) && (
          <div className="space-y-2">
            <Label htmlFor="geography">Preferred Geography</Label>
            <Select 
              value={formData.geographyPreference || ""} 
              onValueChange={handleGeographyChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select geography" />
              </SelectTrigger>
              <SelectContent>
                {geographies.map(geo => (
                  <SelectItem key={geo} value={geo}>{geo}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="minEmployees">Minimum Buyer Size (Employees)</Label>
          <Select 
            value={formData.minEmployees || ""} 
            onValueChange={handleMinEmployeesChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select minimum employee count" />
            </SelectTrigger>
            <SelectContent>
              {employeeRanges.map(range => (
                <SelectItem key={range} value={range}>{range}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500">
            This helps identify buyers of appropriate size for the acquisition
          </p>
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
    includeGeography: true,
    geographyPreference: '',
    minEmployees: '',
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
      { number: 2, label: "AI Company Profiling" }, // Changed from "Website Enrichment"
      { number: 3, label: "Company Overview" },
      { number: 4, label: "Tags & Positioning" },
      { number: 5, label: "Problem & Use Case" },
      { number: 6, label: "Competitive & Financials" },
      { number: 7, label: "Target Customer" },
      { number: 8, label: "Buyer Preferences" }
    ];

    return (
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.slice(0, 3).map((step) => (
            <div 
              key={step.number}
              className={`flex items-center ${step.number < 3 ? "flex-1" : ""}`}
            >
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center 
                  ${currentStep >= step.number ? "bg-blueknight-600 text-white" : "bg-gray-200 text-gray-600"}`}
              >
                {step.number}
              </div>
              
              {step.number < 3 && (
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
          <span className="text-xs font-medium">AI Company Profiling</span> {/* Changed from "Website Enrichment" */}
          <span className="text-xs font-medium">Complete Profile</span>
        </div>

        {/* Current section indicator */}
        {currentStep > 2 && (
          <div className="mt-6 text-sm font-medium text-gray-600">
            <span>Section {currentStep - 2} of 6: </span>
            <span className="text-blueknight-600 font-semibold">
              {steps[currentStep - 1]?.label}
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
        <WebsiteEnrichmentStep 
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      
      {currentStep === 3 && (
        <CompanyOverviewSection 
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}

      {currentStep === 4 && (
        <TagsPositioningSection 
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}

      {currentStep === 5 && (
        <ProblemUseCaseSection 
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}

      {currentStep === 6 && (
        <CompetitiveFinancialsSection 
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}

      {currentStep === 7 && (
        <TargetCustomerSection 
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}

      {currentStep === 8 && (
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
