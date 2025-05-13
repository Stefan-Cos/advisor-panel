
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Globe, Building, Flag, ArrowRight } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

// Step 1: Project Setup
const ProjectSetupStep = ({ formData, setFormData, nextStep }) => {
  const [isValid, setIsValid] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    
    // Validate form
    const isFormValid = updatedData.projectName && updatedData.companyName && updatedData.country;
    setIsValid(isFormValid);
  };
  
  const handleCountryChange = (value: string) => {
    setFormData(prev => ({ ...prev, country: value }));
    setIsValid(!!formData.projectName && !!formData.companyName && !!value);
  };

  const countries = [
    'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 
    'France', 'Japan', 'China', 'India', 'Brazil', 'Mexico', 'Spain'
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
const WebsiteEnrichmentStep = ({ formData, setFormData, nextStep }) => {
  const [website, setWebsite] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const handleWebsiteSubmit = (e) => {
    e.preventDefault();
    if (!website) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis with progress updates
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 3;
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
    }, 100);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-gray-800">Website Enrichment</h2>
        <p className="text-sm text-gray-600">Enter the company website to auto-fill profile details with AI</p>
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
        </div>
      )}
    </div>
  );
};

// Step 3: Complete Company Profile
const CompanyProfileStep = ({ formData, setFormData, handleSubmit }) => {
  const [section, setSection] = useState("overview");
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
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
  };
  
  const handleRemoveTag = (field: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };
  
  // Input for adding tags with Enter key
  const TagInput = ({ field, placeholder }) => {
    const [inputValue, setInputValue] = useState("");
    
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleAddTag(field, inputValue);
        setInputValue("");
      }
    };
    
    return (
      <div className="space-y-2">
        <div className="flex flex-wrap gap-2 mb-2">
          {formData[field]?.map((tag, index) => (
            <div 
              key={index} 
              className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-sm flex items-center gap-1"
            >
              {tag}
              <button 
                type="button" 
                onClick={() => handleRemoveTag(field, index)}
                className="text-blue-500 hover:text-blue-700"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full"
        />
        <p className="text-xs text-gray-500">Press Enter to add</p>
      </div>
    );
  };

  // Sections for the form
  const sections = [
    { id: "overview", label: "Company Overview", icon: <Building className="h-4 w-4" /> },
    { id: "tags", label: "Tags & Positioning", icon: <Flag className="h-4 w-4" /> },
    { id: "problem", label: "Problem & Use Case", icon: <Building className="h-4 w-4" /> },
    { id: "financials", label: "Competitive & Financials", icon: <BarChart3 className="h-4 w-4" /> },
    { id: "target", label: "Target Customer Profile", icon: <Building className="h-4 w-4" /> },
  ];

  // Delivery methods
  const deliveryMethods = ["Cloud-based", "On-premise", "Mobile App", "API", "Hardware", "Hybrid"];
  
  // Supply chain roles
  const supplyChainRoles = ["Software Provider", "Hardware Manufacturer", "Service Provider", "Distributor", "Reseller"];
  
  // Customer types
  const customerTypes = ["Enterprise", "SMB", "Government", "Consumer", "Non-profit"];
  
  // Industries
  const industries = [
    "Technology", "Healthcare", "Finance", "Manufacturing", "Retail", "Energy", 
    "Real Estate", "Media", "Telecommunications", "Transportation", "Education"
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-gray-800">Company Profile</h2>
        <p className="text-sm text-gray-600">
          Review and edit the AI-enriched company profile to better match with potential buyers
        </p>
      </div>
      
      {/* Section Navigation */}
      <div className="flex flex-wrap gap-2">
        {sections.map((s) => (
          <Button
            key={s.id}
            variant={section === s.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSection(s.id)}
            className="flex items-center gap-1"
          >
            {s.icon}
            {s.label}
          </Button>
        ))}
      </div>
      
      {/* Section Content */}
      <Card className="border-t-4 border-t-blueknight-500">
        <CardContent className="pt-6">
          {/* Company Overview Section */}
          {section === "overview" && (
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
          )}
          
          {/* Tags & Positioning Section */}
          {section === "tags" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Product Tags</Label>
                <TagInput field="productTags" placeholder="Add product tags" />
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
                <TagInput field="useCase" placeholder="Add use case tags" />
              </div>
            </div>
          )}
          
          {/* Problem & Use Case Section */}
          {section === "problem" && (
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
          )}
          
          {/* Competitive & Financials Section */}
          {section === "financials" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Main Competitors</Label>
                <TagInput field="competitors" placeholder="Add competitors" />
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
          )}
          
          {/* Target Customer Profile Section */}
          {section === "target" && (
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
                <TagInput field="customerIndustries" placeholder="Add customer industries" />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4">
        <div className="text-sm text-gray-500">
          All fields are editable and will be used for buyer matching
        </div>
        <Button onClick={handleSubmit}>Complete Project</Button>
      </div>
    </div>
  );
};

// Main ListingForm Component
const ListingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    projectName: '',
    companyName: '',
    country: '',
    website: '',
    // Additional fields will be added by the AI enrichment
  });
  
  const navigate = useNavigate();
  
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  
  const handleSubmit = () => {
    toast("Project created successfully");
    navigate('/listings');
  };

  // Progress indicators
  const renderStepIndicator = () => {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((step) => (
            <div 
              key={step}
              className={`flex items-center ${step < 3 ? "flex-1" : ""}`}
            >
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center 
                  ${currentStep >= step ? "bg-blueknight-600 text-white" : "bg-gray-200 text-gray-600"}`}
              >
                {step}
              </div>
              
              {step < 3 && (
                <div 
                  className={`flex-1 h-1 mx-2 
                    ${currentStep > step ? "bg-blueknight-600" : "bg-gray-200"}`}
                />
              )}
            </div>
          ))}
        </div>
        
        <div className="flex justify-between mt-1">
          <span className="text-xs font-medium">Project Setup</span>
          <span className="text-xs font-medium">Website Enrichment</span>
          <span className="text-xs font-medium">Complete Profile</span>
        </div>
      </div>
    );
  };

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
        />
      )}
      
      {currentStep === 3 && (
        <CompanyProfileStep 
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default ListingForm;
