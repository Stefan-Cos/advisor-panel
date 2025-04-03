import React, { useState } from 'react';
import { Filter, ChevronDown, ChevronUp, SlidersHorizontal, Bot, X, Search, Keywords } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { format } from 'date-fns';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface BuyerTableProps {
  listingId: string;
}

interface Buyer {
  id: string;
  name: string;
  type: 'strategic' | 'pe';
  description: string;
  hq: string;
  employees: number;
  revenue: number;
  cash: number;
  reportedDate: string;
  isPEVCBacked: boolean;
  isPublic: boolean;
  website?: string;
  rationale: {
    offering: string;
    customers: string;
    previousTransactions: string;
    financialStrength: string;
    overall: string;
    scores?: {
      offering: number;
      customers: number;
      previousTransactions: number;
      financialStrength: number;
      overall: number;
    };
  };
  matchingScore: number;
  longDescription?: string;
  primaryIndustries?: string[];
  keywords?: string[];
  targetCustomerTypes?: string[];
  parentCompany?: string;
  aum?: number;
  investments?: string;
  offering?: string;
  sectors?: string[];
}

interface SearchCriteria {
  companyName: {
    keywords: string[];
    operator: 'AND' | 'OR' | 'NOT';
  };
  description: {
    keywords: string[];
    operator: 'AND' | 'OR' | 'NOT';
  };
  offering: {
    keywords: string[];
    operator: 'AND' | 'OR' | 'NOT';
  };
  sectors: {
    keywords: string[];
    operator: 'AND' | 'OR' | 'NOT';
  };
  customerTypes: {
    keywords: string[];
    operator: 'AND' | 'OR' | 'NOT';
  };
}

// Add rationale scores to the strategic buyers data
const strategicBuyers: Buyer[] = [
  {
    id: 'buyer1',
    name: 'Tech Innovations Inc.',
    type: 'strategic',
    description: 'Leading provider of technology solutions',
    longDescription: 'Tech Innovations Inc. is a leading enterprise software company specializing in cloud infrastructure, data management, and cybersecurity solutions. Founded in 2005, they have grown to become a trusted partner for digital transformation initiatives across multiple sectors.',
    primaryIndustries: ['Technology', 'Healthcare', 'Financial Services'],
    keywords: ['Enterprise Software', 'Cloud Infrastructure', 'Digital Transformation', 'API Management'],
    targetCustomerTypes: ['Enterprise Clients', 'Mid-market Organizations', 'Healthcare Systems'],
    parentCompany: 'TechGroup Holdings',
    website: 'https://techinnovations.example.com',
    hq: 'USA',
    employees: 1500,
    revenue: 125.5,
    cash: 45.2,
    reportedDate: '2024-03-15',
    isPEVCBacked: false,
    isPublic: true,
    rationale: {
      offering: 'Their software solutions align perfectly with our client\'s technology stack, providing an opportunity for seamless integration and expansion of service offerings.',
      customers: 'Strong overlap in customer base within the healthcare and financial sectors, which could lead to cross-selling opportunities.',
      previousTransactions: 'Acquired three complementary software companies in the last 2 years, demonstrating experience in successful post-merger integration.',
      financialStrength: 'Solid balance sheet with consistent revenue growth over the past 5 years and strong cash reserves for potential acquisitions.',
      overall: 'Tech Innovations Inc. presents a strong strategic fit due to complementary technology, overlapping customer base, and financial capability to execute the acquisition.',
      scores: {
        offering: 95,
        customers: 90,
        previousTransactions: 88,
        financialStrength: 92,
        overall: 91
      }
    },
    matchingScore: 92
  },
  {
    id: 'buyer2',
    name: 'Global HealthTech',
    type: 'strategic',
    description: 'Healthcare technology provider',
    longDescription: 'Global HealthTech specializes in developing electronic health record systems and clinical workflow solutions for hospitals and healthcare facilities. With a presence in over 15 countries, they are focused on improving patient outcomes through technology.',
    primaryIndustries: ['Healthcare', 'Life Sciences', 'Biotechnology'],
    keywords: ['EHR', 'Clinical Workflow', 'Patient Management', 'Healthcare IT'],
    targetCustomerTypes: ['Hospitals', 'Healthcare Systems', 'Clinics', 'Medical Practices'],
    parentCompany: 'UK Health Innovations Group',
    website: 'https://globalhealthtech.example.com',
    hq: 'UK',
    employees: 850,
    revenue: 75.8,
    cash: 22.3,
    reportedDate: '2024-02-20',
    isPEVCBacked: false,
    isPublic: true,
    rationale: {
      offering: 'Their healthcare solutions complement our client\'s products, allowing for a more comprehensive offering to the market.',
      customers: 'Strong presence in European healthcare systems which would open new markets for our client.',
      previousTransactions: 'Completed one strategic acquisition in the clinical workflow space last year, showing appetite for growth through acquisition.',
      financialStrength: 'Steady growth and good profitability metrics, though cash reserves are moderate.',
      overall: 'Global HealthTech offers excellent geographic expansion opportunities and product synergies, despite somewhat limited acquisition funds.',
      scores: {
        offering: 88,
        customers: 90,
        previousTransactions: 78,
        financialStrength: 75,
        overall: 85
      }
    },
    matchingScore: 85
  },
  {
    id: 'buyer3',
    name: 'MediSoft Solutions',
    type: 'strategic',
    description: 'Medical software provider',
    longDescription: 'MediSoft Solutions creates specialized software applications for medical diagnostics, laboratory management, and healthcare analytics. Their solutions are known for regulatory compliance and integration capabilities with existing medical systems.',
    primaryIndustries: ['Medical Technology', 'Healthcare', 'Diagnostics'],
    keywords: ['Medical Software', 'Lab Management', 'Healthcare Analytics', 'Regulatory Compliance'],
    targetCustomerTypes: ['Medical Laboratories', 'Diagnostic Centers', 'Research Institutions'],
    parentCompany: 'Deutsche Medical Technologies',
    website: 'https://medisoft.example.com',
    hq: 'Germany',
    employees: 620,
    revenue: 58.2,
    cash: 18.9,
    reportedDate: '2024-01-10',
    isPEVCBacked: true,
    isPublic: false,
    rationale: {
      offering: 'Their medical software platforms would gain significant feature enhancement from our client\'s technology.',
      customers: 'Strong position in DACH region healthcare providers, complementing our client\'s North American focus.',
      previousTransactions: 'No recent acquisition history, but their parent company has completed several technology acquisitions in the past 3 years.',
      financialStrength: 'Recently received PE backing, providing acquisition capabilities despite smaller size.',
      overall: 'MediSoft presents an interesting opportunity for international expansion with their strong regional presence and newly available capital for acquisitions.',
      scores: {
        offering: 82,
        customers: 85,
        previousTransactions: 70,
        financialStrength: 76,
        overall: 78
      }
    },
    matchingScore: 78
  }
];

const peBuyers: Buyer[] = [
  {
    id: 'buyer5',
    name: 'Healthcare Capital Partners',
    type: 'pe',
    description: 'Healthcare focused private equity',
    longDescription: 'Healthcare Capital Partners is a private equity firm exclusively focused on investments in healthcare technology and services. Their portfolio includes a range of companies from early-stage to mature healthcare businesses seeking growth capital.',
    primaryIndustries: ['Healthcare', 'Health Technology', 'Medical Devices'],
    keywords: ['Healthcare Investment', 'Growth Capital', 'Portfolio Synergies', 'Buy-and-Build'],
    targetCustomerTypes: ['Healthcare Startups', 'Growth-Stage Companies', 'Healthcare Service Providers'],
    parentCompany: 'Capital Partners Group',
    website: 'https://healthcarecapital.example.com',
    hq: 'UK',
    employees: 120,
    revenue: 0,
    cash: 0,
    reportedDate: '',
    isPEVCBacked: false,
    isPublic: false,
    aum: 350.0,
    investments: '12 companies in healthcare tech',
    rationale: {
      offering: 'Looking to expand their healthcare technology portfolio with companies like our client.',
      customers: 'Their portfolio companies serve similar customer segments, creating potential synergies.',
      previousTransactions: 'Completed 5 healthcare technology acquisitions in the past 3 years, with a focus on software and digital health platforms.',
      financialStrength: 'Recently raised a new fund with significant capital to deploy in this sector.',
      overall: 'Healthcare Capital Partners has a strong track record in the healthcare technology space and is actively seeking acquisitions in our client\'s sector.'
    },
    matchingScore: 95
  },
  {
    id: 'buyer6',
    name: 'Medtech Growth Fund',
    type: 'pe',
    description: 'Medtech focused venture capital',
    longDescription: 'Medtech Growth Fund invests in innovative medical technology companies with disruptive solutions for healthcare delivery and patient care. They typically target companies with established products and proven market fit seeking expansion capital.',
    primaryIndustries: ['Medical Technology', 'Digital Health', 'Health IT'],
    keywords: ['Medtech Investment', 'Growth Equity', 'Digital Health Innovation', 'Scale-up Funding'],
    targetCustomerTypes: ['Health Technology Companies', 'Medical Device Manufacturers', 'Digital Health Startups'],
    parentCompany: 'US Venture Partners',
    website: 'https://medtechgrowth.example.com',
    hq: 'USA',
    employees: 85,
    revenue: 0,
    cash: 0,
    reportedDate: '',
    isPEVCBacked: false,
    isPublic: false,
    aum: 220.0,
    investments: '8 portfolio companies in medtech',
    rationale: {
      offering: 'Actively seeking to invest in innovative medical technology solutions.',
      customers: 'Portfolio focused on solutions for hospital systems and clinics.',
      previousTransactions: 'Made 3 investments in similar companies over the past 18 months, with typical deal sizes of $30-50M.',
      financialStrength: 'Mid-sized fund with adequate capital for this acquisition size.',
      overall: 'Medtech Growth Fund specializes in exactly our client\'s market segment and has a successful history of growing similar companies.'
    },
    matchingScore: 88
  }
];

const BuyerTable: React.FC<BuyerTableProps> = ({ listingId }) => {
  const [activeTab, setActiveTab] = useState<'strategic' | 'pe'>('strategic');
  const [savedBuyers, setSavedBuyers] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showKeywords, setShowKeywords] = useState(false);
  const [expandedRationales, setExpandedRationales] = useState<string[]>([]);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [showSearchForm, setShowSearchForm] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
    companyName: { keywords: [], operator: 'AND' },
    description: { keywords: [], operator: 'AND' },
    offering: { keywords: [], operator: 'AND' },
    sectors: { keywords: [], operator: 'AND' },
    customerTypes: { keywords: [], operator: 'AND' }
  });
  const [tempKeyword, setTempKeyword] = useState('');
  const [activeField, setActiveField] = useState<keyof SearchCriteria | null>(null);
  const { toast } = useToast();
  
  const handleAddToSaved = (buyerId: string) => {
    if (!savedBuyers.includes(buyerId)) {
      setSavedBuyers([...savedBuyers, buyerId]);
      toast({
        title: "Buyer Saved",
        description: "Buyer has been added to your saved list",
      });
    }
  };
  
  const buyers = activeTab === 'strategic' ? strategicBuyers : peBuyers;
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
    if (showKeywords) setShowKeywords(false);
    if (showAIAssistant) setShowAIAssistant(false);
  };
  
  const toggleKeywords = () => {
    setShowKeywords(!showKeywords);
    if (showFilters) setShowFilters(false);
    if (showAIAssistant) setShowAIAssistant(false);
  };
  
  const toggleAIAssistant = () => {
    setShowAIAssistant(!showAIAssistant);
    if (showFilters) setShowFilters(false);
    if (showKeywords) setShowKeywords(false);
  };
  
  const toggleSearchForm = () => {
    setShowSearchForm(!showSearchForm);
  };
  
  const toggleRationale = (buyerId: string) => {
    setExpandedRationales(prev => 
      prev.includes(buyerId) 
        ? prev.filter(id => id !== buyerId) 
        : [...prev, buyerId]
    );
  };
  
  const handleFilterApply = () => {
    toast({
      title: "Filters Applied",
      description: "Your search filters have been applied",
    });
    setShowFilters(false);
  };

  const handleKeywordsApply = () => {
    toast({
      title: "Keywords Applied",
      description: "Your keyword filters have been applied",
    });
    setShowKeywords(false);
  };

  const handleAIAssistantQuery = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem('aiQuery') as HTMLInputElement;
    if (input.value.trim()) {
      toast({
        title: "AI Assistant",
        description: "Your query has been sent to the AI Assistant",
      });
      input.value = '';
    }
  };

  const formatReportDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'MMM-yy');
    } catch (error) {
      console.error("Error formatting date:", error);
      return "N/A";
    }
  };

  const handleAddKeyword = (field: keyof SearchCriteria) => {
    if (tempKeyword.trim()) {
      setSearchCriteria(prev => ({
        ...prev,
        [field]: {
          ...prev[field],
          keywords: [...prev[field].keywords, tempKeyword.trim()]
        }
      }));
      setTempKeyword('');
    }
  };

  const handleRemoveKeyword = (field: keyof SearchCriteria, keyword: string) => {
    setSearchCriteria(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        keywords: prev[field].keywords.filter(k => k !== keyword)
      }
    }));
  };

  const handleOperatorChange = (field: keyof SearchCriteria, operator: 'AND' | 'OR' | 'NOT') => {
    setSearchCriteria(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        operator
      }
    }));
  };

  const handleSearchApply = () => {
    toast({
      title: "Search Applied",
      description: "Your keyword search has been applied",
    });
    setShowSearchForm(false);
  };

  // Function to get match score badge style based on score value
  const getScoreBadgeStyle = (score: number) => {
    if (score >= 90) return "bg-green-50 text-green-700";
    if (score >= 75) return "bg-blue-50 text-blue-700";
    if (score >= 60) return "bg-yellow-50 text-yellow-700";
    return "bg-gray-50 text-gray-700";
  };

  return (
    <div className="animate-fade-in">
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex space-x-4">
            <button 
              onClick={() => setActiveTab('strategic')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === 'strategic' 
                  ? 'bg-blueknight-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Strategic Buyers
            </button>
            <button 
              onClick={() => setActiveTab('pe')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === 'pe' 
                  ? 'bg-blueknight-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              PE Funds
            </button>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={toggleSearchForm}
              className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium ${
                showSearchForm 
                  ? 'bg-blueknight-500 text-white' 
                  : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
              } rounded-md`}
            >
              <Search className="h-4 w-4" />
              <span>Keyword Search</span>
            </button>
            
            <button
              onClick={toggleAIAssistant}
              className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium ${
                showAIAssistant 
                  ? 'bg-blueknight-500 text-white' 
                  : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
              } rounded-md`}
            >
              <Bot className="h-4 w-4" />
              <span>AI Assistant</span>
            </button>
            
            <button
              onClick={toggleFilters}
              className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium ${
                showFilters 
                  ? 'bg-blueknight-500 text-white' 
                  : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
              } rounded-md`}
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </button>
            
            <button
              onClick={toggleKeywords}
              className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium ${
                showKeywords
                  ? 'bg-blueknight-500 text-white' 
                  : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
              } rounded-md`}
            >
              <Keywords className="h-4 w-4" />
              <span>Keywords</span>
            </button>
          </div>
        </div>
        
        {showSearchForm && (
          <div className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-700 flex items-center">
                <Search className="h-4 w-4 mr-2" />
                Keyword Search
              </h3>
              <button 
                onClick={() => setShowSearchForm(false)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              {(Object.keys(searchCriteria) as Array<keyof SearchCriteria>).map((field) => (
                <div key={field} className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700 capitalize">
                    {field === 'companyName' ? 'Company Name' : 
                     field === 'customerTypes' ? 'Customer Types' : field}
                  </h4>
                  
                  <div className="flex flex-wrap gap-2 mb-2">
                    {searchCriteria[field].keywords.map((keyword, index) => (
                      <div 
                        key={index} 
                        className="bg-blueknight-50 text-blueknight-700 px-3 py-1 rounded-full text-xs flex items-center"
                      >
                        {keyword}
                        <button 
                          onClick={() => handleRemoveKeyword(field, keyword)}
                          className="ml-2 text-blueknight-500 hover:text-blueknight-700"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Input
                      placeholder={`Add ${field} keyword...`}
                      value={activeField === field ? tempKeyword : ''}
                      onChange={(e) => {
                        setActiveField(field);
                        setTempKeyword(e.target.value);
                      }}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddKeyword(field);
                        }
                      }}
                      className="text-sm"
                    />
                    <Button 
                      size="sm" 
                      onClick={() => handleAddKeyword(field)}
                      className="text-xs"
                    >
                      Add
                    </Button>
                  </div>
                  
                  <div className="flex space-x-4 mt-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name={`operator-${field}`}
                        checked={searchCriteria[field].operator === 'AND'}
                        onChange={() => handleOperatorChange(field, 'AND')}
                        className="h-4 w-4 text-blueknight-500 focus:ring-blueknight-400"
                      />
                      <span className="text-xs">AND</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name={`operator-${field}`}
                        checked={searchCriteria[field].operator === 'OR'}
                        onChange={() => handleOperatorChange(field, 'OR')}
                        className="h-4 w-4 text-blueknight-500 focus:ring-blueknight-400"
                      />
                      <span className="text-xs">OR</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name={`operator-${field}`}
                        checked={searchCriteria[field].operator === 'NOT'}
                        onChange={() => handleOperatorChange(field, 'NOT')}
                        className="h-4 w-4 text-blueknight-500 focus:ring-blueknight-400"
                      />
                      <span className="text-xs">NOT</span>
                    </label>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-end">
                <Button onClick={handleSearchApply} className="text-sm">
                  Apply Search
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {showAIAssistant && (
          <div className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-700 flex items-center">
                <Bot className="h-4 w-4 mr-2" />
                AI Assistant
              </h3>
              <button 
                onClick={() => setShowAIAssistant(false)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 text-blue-700 rounded-lg text-sm">
                <p className="mb-2 font-medium">AI Assistant</p>
                <p>I can help you analyze this buyer list and provide insights. What would you like to know about these potential buyers?</p>
              </div>
              
              <form onSubmit={handleAIAssistantQuery} className="flex space-x-2">
                <input 
                  type="text" 
                  name="aiQuery"
                  placeholder="Ask anything about these buyers..." 
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blueknight-400"
                />
                <button 
                  type="submit"
                  className="px-4 py-2 bg-blueknight-500 text-white rounded-md hover:bg-blueknight-600"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        )}
        
        {showFilters && (
          <div className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-700 flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filter Options
              </h3>
              <button 
                onClick={() => setShowFilters(false)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  HQ
                </label>
                <select className="input-field">
                  <option value="">All Countries</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="Germany">Germany</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Revenue ($M)
                </label>
                <select className="input-field">
                  <option value="0">Any</option>
                  <option value="50">$50M+</option>
                  <option value="100">$100M+</option>
                  <option value="250">$250M+</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Cash ($M)
                </label>
                <select className="input-field">
                  <option value="0">Any</option>
                  <option value="10">$10M+</option>
                  <option value="25">$25M+</option>
                  <option value="50">$50M+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Employees
                </label>
                <select className="input-field">
                  <option value="0">Any</option>
                  <option value="100">100+</option>
                  <option value="500">500+</option>
                  <option value="1000">1000+</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  PE/VC Backed
                </label>
                <select className="input-field">
                  <option value="">Any</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Match Score
                </label>
                <select className="input-field">
                  <option value="0">Any</option>
                  <option value="70">70%+</option>
                  <option value="80">80%+</option>
                  <option value="90">90%+</option>
                </select>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleFilterApply}
                className="px-4 py-2 bg-blueknight-500 text-white rounded-md text-sm font-medium hover:bg-blueknight-600"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
        
        {showKeywords && (
          <div className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-700 flex items-center">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Buyer Keywords
              </h3>
              <button 
                onClick={() => setShowKeywords(false)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h4 className="text-sm font-medium text-gray-800 mb-3">What are your preferred countries for potential buyers?</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-600">United States</label>
                    <RadioGroup defaultValue="high" className="flex space-x-2">
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="high" id="us-high" />
                        <label htmlFor="us-high" className="text-xs">High</label>
                      </div>
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="medium" id="us-medium" />
                        <label htmlFor="us-medium" className="text-xs">Medium</label>
                      </div>
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="low" id="us-low" />
                        <label htmlFor="us-low" className="text-xs">Low</label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-600">United Kingdom</label>
                    <RadioGroup defaultValue="medium" className="flex space-x-2">
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="high" id="uk-high" />
                        <label htmlFor="uk-high" className="text-xs">High</label>
                      </div>
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="medium" id="uk-medium" />
                        <label htmlFor="uk-medium" className="text-xs">Medium</label>
                      </div>
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="low" id="uk-low" />
                        <label htmlFor="uk-low" className="text-xs">Low</label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h4 className="text-sm font-medium text-gray-800 mb-3">What industries should the buyer operate in?</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-600">Technology</label>
                    <RadioGroup defaultValue="high" className="flex space-x-2">
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="high" id="tech-high" />
                        <label htmlFor="tech-high" className="text-xs">High</label>
                      </div>
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="medium" id="tech-medium
