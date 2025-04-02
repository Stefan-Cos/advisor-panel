
import React, { useState, useEffect } from 'react';
import { Filter, SlidersHorizontal, ChevronDown, ChevronUp, UserCircle, Tag, Plus, Check, Search } from 'lucide-react';
import BuyerCard from './BuyerCard';
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
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
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BuyerListProps {
  listingId: string;
}

const strategicBuyers = [
  {
    id: 'buyer1',
    name: 'Tech Innovations Inc.',
    type: 'strategic' as const,
    location: 'USA',
    sector: 'Medtech, Life sciences',
    offering: 'Revenue-focused software, services',
    customers: 'Pharmaceutical and life science sectors',
    employees: 1500,
    previousAcquisitions: 'Acquired three complementary software companies in the last 2 years',
    notifications: 0,
    savedBuyers: 3,
    matchingScore: 92,
    status: 'active' as const,
    description: 'Leading provider of technology solutions',
    maTrackRecord: 'High',
    longDescription: 'Tech Innovations Inc. is a leading enterprise software company specializing in cloud infrastructure, data management, and cybersecurity solutions. Founded in 2005, they have grown to become a trusted partner for digital transformation initiatives across multiple sectors.',
    primaryIndustries: ['Technology', 'Healthcare', 'Financial Services'],
    keywords: ['Enterprise Software', 'Cloud Infrastructure', 'Digital Transformation', 'API Management'],
    targetCustomerTypes: ['Enterprise Clients', 'Mid-market Organizations', 'Healthcare Systems'],
    parentCompany: 'TechGroup Holdings',
    rationale: {
      offering: 'Their software solutions align perfectly with our client\'s technology stack, providing an opportunity for seamless integration and expansion of service offerings.',
      customers: 'Strong overlap in customer base within the healthcare and financial sectors, which could lead to cross-selling opportunities.',
      previousTransactions: 'Acquired three complementary software companies in the last 2 years, demonstrating experience in successful post-merger integration.',
      financialStrength: 'Solid balance sheet with consistent revenue growth over the past 5 years and strong cash reserves for potential acquisitions.',
      overall: 'Tech Innovations Inc. presents a strong strategic fit due to complementary technology, overlapping customer base, and financial capability to execute the acquisition.'
    }
  },
  {
    id: 'buyer2',
    name: 'Global HealthTech',
    type: 'strategic' as const,
    location: 'UK',
    sector: 'Healthcare, Technology',
    offering: 'Software solutions, Consulting',
    customers: 'Hospitals, Research institutions',
    employees: 850,
    previousAcquisitions: 'Completed one strategic acquisition in the clinical workflow space last year',
    notifications: 0,
    savedBuyers: 2,
    matchingScore: 85,
    status: 'active' as const,
    description: 'Healthcare technology provider',
    maTrackRecord: 'Medium',
    longDescription: 'Global HealthTech specializes in developing electronic health record systems and clinical workflow solutions for hospitals and healthcare facilities. With a presence in over 15 countries, they are focused on improving patient outcomes through technology.',
    primaryIndustries: ['Healthcare', 'Life Sciences', 'Biotechnology'],
    keywords: ['EHR', 'Clinical Workflow', 'Patient Management', 'Healthcare IT'],
    targetCustomerTypes: ['Hospitals', 'Healthcare Systems', 'Clinics', 'Medical Practices'],
    parentCompany: 'UK Health Innovations Group',
    rationale: {
      offering: 'Their healthcare solutions complement our client\'s products, allowing for a more comprehensive offering to the market.',
      customers: 'Strong presence in European healthcare systems which would open new markets for our client.',
      previousTransactions: 'Completed one strategic acquisition in the clinical workflow space last year, showing appetite for growth through acquisition.',
      financialStrength: 'Steady growth and good profitability metrics, though cash reserves are moderate.',
      overall: 'Global HealthTech offers excellent geographic expansion opportunities and product synergies, despite somewhat limited acquisition funds.'
    }
  },
  {
    id: 'buyer3',
    name: 'MediSoft Solutions',
    type: 'strategic' as const,
    location: 'Germany',
    sector: 'Medical software, Services',
    offering: 'Health management platforms',
    customers: 'Healthcare providers, Clinics',
    employees: 620,
    previousAcquisitions: 'No recent acquisition history',
    notifications: 0,
    savedBuyers: 1,
    matchingScore: 78,
    status: 'inactive' as const,
    description: 'Medical software provider',
    maTrackRecord: 'Low',
    longDescription: 'MediSoft Solutions creates specialized software applications for medical diagnostics, laboratory management, and healthcare analytics. Their solutions are known for regulatory compliance and integration capabilities with existing medical systems.',
    primaryIndustries: ['Medical Technology', 'Healthcare', 'Diagnostics'],
    keywords: ['Medical Software', 'Lab Management', 'Healthcare Analytics', 'Regulatory Compliance'],
    targetCustomerTypes: ['Medical Laboratories', 'Diagnostic Centers', 'Research Institutions'],
    parentCompany: 'Deutsche Medical Technologies',
    rationale: {
      offering: 'Their medical software platforms would gain significant feature enhancement from our client\'s technology.',
      customers: 'Strong position in DACH region healthcare providers, complementing our client\'s North American focus.',
      previousTransactions: 'No recent acquisition history, but their parent company has completed several technology acquisitions in the past 3 years.',
      financialStrength: 'Recently received PE backing, providing acquisition capabilities despite smaller size.',
      overall: 'MediSoft presents an interesting opportunity for international expansion with their strong regional presence and newly available capital for acquisitions.'
    }
  },
  {
    id: 'buyer4',
    name: 'BioTech Ventures',
    type: 'strategic' as const,
    location: 'Canada',
    sector: 'Biotechnology, Research',
    offering: 'Data analytics, Clinical solutions',
    customers: 'Pharmaceutical companies, Research labs',
    employees: 420,
    previousAcquisitions: 'Acquired a data analytics platform in 2023',
    notifications: 0,
    savedBuyers: 0,
    matchingScore: 70,
    status: 'pending' as const,
    description: 'Biotechnology research company',
    maTrackRecord: 'Medium',
    longDescription: 'BioTech Ventures focuses on developing innovative data analytics platforms for pharmaceutical research and clinical trials. Their solutions help accelerate drug discovery and optimize clinical trial processes.',
    primaryIndustries: ['Biotechnology', 'Pharmaceutical', 'Research'],
    keywords: ['Data Analytics', 'Clinical Research', 'Drug Discovery', 'Research Optimization'],
    targetCustomerTypes: ['Pharmaceutical Companies', 'Research Labs', 'Biotech Startups'],
    parentCompany: 'Canadian Bio Innovations',
    rationale: {
      offering: 'Their analytics platforms could integrate well with our client\'s technology to create more comprehensive research solutions.',
      customers: 'Strong relationships with pharmaceutical companies that could benefit from our client\'s offerings.',
      previousTransactions: 'Successfully acquired and integrated a data analytics platform last year, showing M&A capability.',
      financialStrength: 'Moderate financial position with some capacity for strategic acquisitions in the right space.',
      overall: 'BioTech Ventures presents a solid strategic fit with complementary technology and customer relationships in the pharmaceutical research space.'
    }
  }
];

const peBuyers = [
  {
    id: 'buyer5',
    name: 'Healthcare Capital Partners',
    type: 'pe' as const,
    location: 'UK',
    sector: 'Medtech, Life sciences',
    offering: 'Revenue-focused software, services',
    customers: 'Pharmaceutical and life science sectors',
    maTrackRecord: 'High',
    longDescription: 'Healthcare Capital Partners is a private equity firm exclusively focused on investments in healthcare technology and services. Their portfolio includes a range of companies from early-stage to mature healthcare businesses seeking growth capital.',
    primaryIndustries: ['Healthcare', 'Health Technology', 'Medical Devices'],
    keywords: ['Healthcare Investment', 'Growth Capital', 'Portfolio Synergies', 'Buy-and-Build'],
    targetCustomerTypes: ['Healthcare Startups', 'Growth-Stage Companies', 'Healthcare Service Providers'],
    parentCompany: 'Capital Partners Group',
    aum: 350.0,
    investments: '12 companies in healthcare tech',
    previousAcquisitions: 'Completed 5 healthcare technology acquisitions in the past 3 years',
    matchingScore: 95,
    status: 'active' as const,
    investmentType: ['M&A', 'Growth equity'],
    geography: ['UK', 'Europe', 'US'],
    investmentSize: '5M - 50M',
    revenue: '1.00 - 12.00',
    ebitda: '1.00 - 12.00',
    industryFocus: 'Industry Specific',
    industryPreferences: ['Healthcare', 'Technology'],
    description: 'Healthcare focused private equity',
    rationale: {
      offering: 'Looking to expand their healthcare technology portfolio with companies like our client.',
      customers: 'Their portfolio companies serve similar customer segments, creating potential synergies.',
      previousTransactions: 'Completed 5 healthcare technology acquisitions in the past 3 years, with a focus on software and digital health platforms.',
      financialStrength: 'Recently raised a new fund with significant capital to deploy in this sector.',
      overall: 'Healthcare Capital Partners has a strong track record in the healthcare technology space and is actively seeking acquisitions in our client\'s sector.'
    }
  },
  {
    id: 'buyer6',
    name: 'Medtech Growth Fund',
    type: 'pe' as const,
    location: 'USA',
    sector: 'Healthcare technology, Digital health',
    offering: 'Capital investment, Strategic guidance',
    customers: 'Healthcare innovators, Technology startups',
    maTrackRecord: 'Medium',
    longDescription: 'Medtech Growth Fund invests in innovative medical technology companies with disruptive solutions for healthcare delivery and patient care. They typically target companies with established products and proven market fit seeking expansion capital.',
    primaryIndustries: ['Medical Technology', 'Digital Health', 'Health IT'],
    keywords: ['Medtech Investment', 'Growth Equity', 'Digital Health Innovation', 'Scale-up Funding'],
    targetCustomerTypes: ['Health Technology Companies', 'Medical Device Manufacturers', 'Digital Health Startups'],
    parentCompany: 'US Venture Partners',
    aum: 220.0,
    investments: '8 portfolio companies in medtech',
    previousAcquisitions: 'Made 3 investments in similar companies over the past 18 months',
    matchingScore: 88,
    status: 'active' as const,
    investmentType: ['Growth equity', 'Minority acquisition'],
    geography: ['USA', 'Canada'],
    investmentSize: '10M - 80M',
    revenue: '5.00 - 50.00',
    ebitda: '1.00 - 10.00',
    industryFocus: 'Industry Specific',
    industryPreferences: ['Healthcare', 'SaaS'],
    description: 'Medtech focused venture capital',
    rationale: {
      offering: 'Actively seeking to invest in innovative medical technology solutions.',
      customers: 'Portfolio focused on solutions for hospital systems and clinics.',
      previousTransactions: 'Made 3 investments in similar companies over the past 18 months, with typical deal sizes of $30-50M.',
      financialStrength: 'Mid-sized fund with adequate capital for this acquisition size.',
      overall: 'Medtech Growth Fund specializes in exactly our client\'s market segment and has a successful history of growing similar companies.'
    }
  },
  {
    id: 'buyer7',
    name: 'Life Sciences Equity',
    type: 'pe' as const,
    location: 'Switzerland',
    sector: 'Biotech, Pharmaceutical',
    offering: 'Growth capital, Operational expertise',
    customers: 'Emerging biotech firms, Research platforms',
    maTrackRecord: 'Low',
    longDescription: 'Life Sciences Equity focuses exclusively on biotech and pharmaceutical companies with innovative research platforms and therapeutic approaches. They provide not only capital but also strategic guidance to help companies navigate regulatory pathways.',
    primaryIndustries: ['Biotech', 'Pharmaceutical', 'Life Sciences'],
    keywords: ['Biotech Investment', 'Therapeutic Platforms', 'Drug Development', 'Clinical Trials'],
    targetCustomerTypes: ['Biotech Companies', 'Research Platforms', 'Clinical-Stage Companies'],
    parentCompany: 'Swiss Life Sciences Group',
    aum: 150.0,
    investments: '5 biotech companies in early to mid-stage development',
    previousAcquisitions: 'Limited M&A experience, with only one acquisition in the past three years',
    matchingScore: 75,
    status: 'inactive' as const,
    investmentType: ['Minority acquisition', 'LBO'],
    geography: ['Switzerland', 'Germany', 'France'],
    investmentSize: '20M - 100M',
    revenue: '10.00 - 50.00',
    ebitda: '2.00 - 15.00',
    industryFocus: 'Industry Specific',
    industryPreferences: ['Biotech', 'Pharma'],
    description: 'Biotech focused private equity',
    rationale: {
      offering: 'Looking to diversify their portfolio with technology that supports drug development.',
      customers: 'Strong connections to European pharmaceutical companies that could be potential customers.',
      previousTransactions: 'Limited M&A experience, with only one acquisition in the past three years.',
      financialStrength: 'Smaller fund with moderate capital availability for acquisitions.',
      overall: 'Life Sciences Equity offers strategic connections in European markets but has limited M&A experience and more modest financial resources.'
    }
  },
  {
    id: 'buyer8',
    name: 'Health Innovation Capital',
    type: 'pe' as const,
    location: 'Australia',
    sector: 'Medical devices, Healthcare IT',
    offering: 'Expansion funding, Market access',
    customers: 'Medical technology providers, Healthcare networks',
    maTrackRecord: 'Medium',
    longDescription: 'Health Innovation Capital invests in medical device and healthcare IT companies looking to expand into Asia-Pacific markets. They provide not only funding but also market access strategies and regulatory navigation services.',
    primaryIndustries: ['Medical Devices', 'Healthcare IT', 'Digital Health'],
    keywords: ['APAC Expansion', 'Medical Devices', 'Market Access', 'Regulatory Navigation'],
    targetCustomerTypes: ['Medical Device Manufacturers', 'Healthcare IT Providers', 'Digital Health Companies'],
    parentCompany: 'Pacific Innovation Group',
    aum: 180.0,
    investments: '7 healthcare companies with APAC expansion focus',
    previousAcquisitions: 'Completed two healthcare IT acquisitions in the past two years',
    matchingScore: 82,
    status: 'pending' as const,
    investmentType: ['M&A', 'Majority acquisition'],
    geography: ['Australia', 'Singapore', 'Japan'],
    investmentSize: '15M - 75M',
    revenue: '8.00 - 40.00',
    ebitda: '1.50 - 12.00',
    industryFocus: 'Industry Specific',
    industryPreferences: ['HealthTech', 'MedTech'],
    description: 'APAC focused healthcare investor',
    rationale: {
      offering: 'Interested in healthcare IT solutions that can be expanded into APAC markets.',
      customers: 'Strong network of healthcare providers across Australia, Singapore, and Japan.',
      previousTransactions: 'Completed two healthcare IT acquisitions in the past two years.',
      financialStrength: 'Solid financial position with dedicated capital for healthcare technology investments.',
      overall: 'Health Innovation Capital offers a unique opportunity for expansion into APAC markets with their regional expertise and connections.'
    }
  }
];

interface FilterState {
  hq: string[];
  employees: string;
  revenue: string;
  cash: string;
  peBacked: string;
  public: string;
  minScore: string;
  sortBy: string;
}

interface KeywordSearch {
  text: string;
  operator: 'AND' | 'OR' | 'NOT';
  field: 'offering' | 'sector' | 'customers' | 'keywords';
}

const BuyerList: React.FC<BuyerListProps> = ({ listingId }) => {
  const [activeTab, setActiveTab] = useState<'strategic' | 'pe'>('strategic');
  const [savedBuyers, setSavedBuyers] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [expandedRationales, setExpandedRationales] = useState<string[]>([]);
  const { toast } = useToast();
  
  const [filters, setFilters] = useState<FilterState>({
    hq: [],
    employees: '',
    revenue: '',
    cash: '',
    peBacked: '',
    public: '',
    minScore: '0',
    sortBy: 'fit'
  });
  
  const [keywordSearches, setKeywordSearches] = useState<KeywordSearch[]>([
    { text: '', operator: 'AND', field: 'offering' }
  ]);
  
  const [filteredBuyers, setFilteredBuyers] = useState<any[]>([]);
  
  const handleAddToSaved = (buyerId: string) => {
    if (!savedBuyers.includes(buyerId)) {
      setSavedBuyers([...savedBuyers, buyerId]);
      toast({
        title: "Buyer Saved",
        description: "The buyer has been added to your saved list",
      });
    }
  };
  
  const buyers = activeTab === 'strategic' ? strategicBuyers : peBuyers;
  
  useEffect(() => {
    // Apply filters whenever filters change or active tab changes
    applyFilters();
  }, [filters, keywordSearches, activeTab]);
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  const handleFilterChange = (field: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };
  
  const handleHQFilterChange = (country: string) => {
    setFilters(prev => {
      const currentHQs = [...prev.hq];
      if (currentHQs.includes(country)) {
        return { ...prev, hq: currentHQs.filter(c => c !== country) };
      } else {
        return { ...prev, hq: [...currentHQs, country] };
      }
    });
  };
  
  const handleKeywordSearchChange = (index: number, field: keyof KeywordSearch, value: any) => {
    setKeywordSearches(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };
  
  const addKeywordSearch = () => {
    setKeywordSearches(prev => [
      ...prev, 
      { text: '', operator: 'AND', field: 'offering' }
    ]);
  };
  
  const removeKeywordSearch = (index: number) => {
    setKeywordSearches(prev => prev.filter((_, i) => i !== index));
  };
  
  const applyFilters = () => {
    let filtered = [...buyers];
    
    // Filter by HQ if any are selected
    if (filters.hq.length > 0) {
      filtered = filtered.filter(buyer => filters.hq.includes(buyer.location));
    }
    
    // Filter by employees
    if (filters.employees) {
      const [min, max] = filters.employees.split('-').map(Number);
      filtered = filtered.filter(buyer => {
        if (!max) return buyer.employees >= min;
        return buyer.employees >= min && buyer.employees <= max;
      });
    }
    
    // Filter by min score
    if (filters.minScore && Number(filters.minScore) > 0) {
      filtered = filtered.filter(buyer => buyer.matchingScore >= Number(filters.minScore));
    }
    
    // Filter by PE/VC backed
    if (filters.peBacked) {
      const isPeBacked = filters.peBacked === 'yes';
      // For demo purposes, assume even IDs are PE-backed
      filtered = filtered.filter(buyer => {
        // This is a placeholder. In a real app, you'd use actual PE-backed data
        const buyerIsPeBacked = parseInt(buyer.id.replace('buyer', '')) % 2 === 0;
        return buyerIsPeBacked === isPeBacked;
      });
    }
    
    // Filter by public status
    if (filters.public) {
      const isPublic = filters.public === 'yes';
      // For demo purposes, assume buyers with IDs divisible by 3 are public
      filtered = filtered.filter(buyer => {
        // This is a placeholder. In a real app, you'd use actual public status data
        const buyerIsPublic = parseInt(buyer.id.replace('buyer', '')) % 3 === 0;
        return buyerIsPublic === isPublic;
      });
    }
    
    // Apply keyword searches
    if (keywordSearches.length > 0) {
      keywordSearches.forEach(ks => {
        if (!ks.text.trim()) return; // Skip empty searches
        
        const searchTerms = ks.text.toLowerCase().trim().split(/\s+/);
        
        if (ks.operator === 'AND') {
          filtered = filtered.filter(buyer => {
            let field = '';
            switch (ks.field) {
              case 'offering': field = buyer.offering?.toLowerCase() || ''; break;
              case 'sector': field = buyer.sector?.toLowerCase() || ''; break;
              case 'customers': field = buyer.customers?.toLowerCase() || ''; break;
              case 'keywords': 
                field = buyer.keywords ? buyer.keywords.join(' ').toLowerCase() : '';
                break;
            }
            return searchTerms.every(term => field.includes(term));
          });
        } else if (ks.operator === 'OR') {
          filtered = filtered.filter(buyer => {
            let field = '';
            switch (ks.field) {
              case 'offering': field = buyer.offering?.toLowerCase() || ''; break;
              case 'sector': field = buyer.sector?.toLowerCase() || ''; break;
              case 'customers': field = buyer.customers?.toLowerCase() || ''; break;
              case 'keywords': 
                field = buyer.keywords ? buyer.keywords.join(' ').toLowerCase() : '';
                break;
            }
            return searchTerms.some(term => field.includes(term));
          });
        } else if (ks.operator === 'NOT') {
          filtered = filtered.filter(buyer => {
            let field = '';
            switch (ks.field) {
              case 'offering': field = buyer.offering?.toLowerCase() || ''; break;
              case 'sector': field = buyer.sector?.toLowerCase() || ''; break;
              case 'customers': field = buyer.customers?.toLowerCase() || ''; break;
              case 'keywords': 
                field = buyer.keywords ? buyer.keywords.join(' ').toLowerCase() : '';
                break;
            }
            return !searchTerms.some(term => field.includes(term));
          });
        }
      });
    }
    
    // Sort results
    if (filters.sortBy === 'fit') {
      filtered.sort((a, b) => b.matchingScore - a.matchingScore);
    } else if (filters.sortBy === 'name-asc') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filters.sortBy === 'name-desc') {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    }
    
    setFilteredBuyers(filtered);
    toast({
      title: "Filters Applied",
      description: `Showing ${filtered.length} of ${buyers.length} buyers`,
    });
  };
  
  const resetFilters = () => {
    setFilters({
      hq: [],
      employees: '',
      revenue: '',
      cash: '',
      peBacked: '',
      public: '',
      minScore: '0',
      sortBy: 'fit'
    });
    setKeywordSearches([{ text: '', operator: 'AND', field: 'offering' }]);
    setShowFilters(false);
    toast({
      title: "Filters Reset",
      description: "All filters have been cleared",
    });
  };

  const getMATrackRecordColor = (record: string) => {
    switch(record) {
      case 'High':
        return 'bg-green-50 text-green-700';
      case 'Medium':
        return 'bg-yellow-50 text-yellow-700';
      case 'Low':
        return 'bg-red-50 text-red-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  const toggleRationale = (buyerId: string) => {
    setExpandedRationales(prev => 
      prev.includes(buyerId) 
        ? prev.filter(id => id !== buyerId) 
        : [...prev, buyerId]
    );
  };

  // Get unique countries from the buyers list
  const uniqueCountries = Array.from(new Set(buyers.map(buyer => buyer.location)));

  useEffect(() => {
    // Initialize filtered buyers when component mounts
    setFilteredBuyers(buyers);
  }, [buyers]);

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
          
          <div className="flex items-center space-x-3">
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                  <Tag className="h-4 w-4 text-green-500" />
                  <span>Keywords</span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-96 p-4 bg-white">
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-900">Boolean Keyword Search</h3>
                  <p className="text-xs text-gray-500">
                    Search across Offering, Sectors, Customer Types, and Keywords fields using boolean operators.
                  </p>
                  
                  {keywordSearches.map((search, index) => (
                    <div key={index} className="space-y-2 pt-2 border-t border-gray-100 first:border-0 first:pt-0">
                      <div className="flex gap-2 items-center">
                        {index > 0 && (
                          <Select
                            value={search.operator}
                            onValueChange={(value: any) => handleKeywordSearchChange(index, 'operator', value)}
                          >
                            <SelectTrigger className="w-20">
                              <SelectValue placeholder="AND" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="AND">AND</SelectItem>
                              <SelectItem value="OR">OR</SelectItem>
                              <SelectItem value="NOT">NOT</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                        
                        <Select
                          value={search.field}
                          onValueChange={(value: any) => handleKeywordSearchChange(index, 'field', value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Field" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="offering">Offering</SelectItem>
                            <SelectItem value="sector">Sectors</SelectItem>
                            <SelectItem value="customers">Customer Types</SelectItem>
                            <SelectItem value="keywords">Keywords</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <div className="flex-1 relative">
                          <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400" />
                          </div>
                          <Input
                            value={search.text}
                            onChange={(e) => handleKeywordSearchChange(index, 'text', e.target.value)}
                            placeholder="Enter search terms..."
                            className="pl-8"
                          />
                        </div>
                        
                        {keywordSearches.length > 1 && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeKeywordSearch(index)}
                            className="h-8 w-8 p-0"
                          >
                            <span className="sr-only">Remove</span>
                            <div className="h-4 w-4">×</div>
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={addKeywordSearch}
                      className="text-xs"
                    >
                      + Add Condition
                    </Button>
                    
                    <Button
                      onClick={applyFilters}
                      className="bg-green-500 hover:bg-green-600 text-white"
                    >
                      Apply Search
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
            <button
              onClick={toggleFilters}
              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>
        
        {showFilters && (
          <div className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-700 flex items-center">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filter Options
              </h3>
              <button 
                onClick={() => setShowFilters(false)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {/* HQ Filter Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  HQ Location
                </label>
                <div className="space-y-2 max-h-40 overflow-y-auto p-2 border border-gray-200 rounded-md bg-white">
                  {uniqueCountries.map((country) => (
                    <div key={country} className="flex items-center">
                      <Checkbox
                        id={`hq-${country}`}
                        checked={filters.hq.includes(country)}
                        onCheckedChange={() => handleHQFilterChange(country)}
                      />
                      <label htmlFor={`hq-${country}`} className="ml-2 text-sm">
                        {country}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Numeric Filters Section */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Employees
                  </label>
                  <Select
                    value={filters.employees}
                    onValueChange={(value) => handleFilterChange('employees', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any</SelectItem>
                      <SelectItem value="0-500">0-500</SelectItem>
                      <SelectItem value="500-1000">500-1000</SelectItem>
                      <SelectItem value="1000-5000">1000-5000</SelectItem>
                      <SelectItem value="5000-">5000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Revenue
                  </label>
                  <Select
                    value={filters.revenue}
                    onValueChange={(value) => handleFilterChange('revenue', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any</SelectItem>
                      <SelectItem value="0-10">$0-10M</SelectItem>
                      <SelectItem value="10-50">$10-50M</SelectItem>
                      <SelectItem value="50-100">$50-100M</SelectItem>
                      <SelectItem value="100-">$100M+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cash
                  </label>
                  <Select
                    value={filters.cash}
                    onValueChange={(value) => handleFilterChange('cash', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any</SelectItem>
                      <SelectItem value="0-5">$0-5M</SelectItem>
                      <SelectItem value="5-20">$5-20M</SelectItem>
                      <SelectItem value="20-50">$20-50M</SelectItem>
                      <SelectItem value="50-">$50M+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Boolean Filters Section */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    PE/VC-Backed
                  </label>
                  <Select
                    value={filters.peBacked}
                    onValueChange={(value) => handleFilterChange('peBacked', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any</SelectItem>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Public
                  </label>
                  <Select
                    value={filters.public}
                    onValueChange={(value) => handleFilterChange('public', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any</SelectItem>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Min. Score
                  </label>
                  <Select
                    value={filters.minScore}
                    onValueChange={(value) => handleFilterChange('minScore', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Any</SelectItem>
                      <SelectItem value="50">50+</SelectItem>
                      <SelectItem value="70">70+</SelectItem>
                      <SelectItem value="80">80+</SelectItem>
                      <SelectItem value="90">90+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            {/* Sort and Action Buttons */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Sort by:</span>
                <Select
                  value={filters.sortBy}
                  onValueChange={(value) => handleFilterChange('sortBy', value)}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Fit Score" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fit">Fit Score</SelectItem>
                    <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                    <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={resetFilters}
                >
                  Reset
                </Button>
                <Button
                  onClick={applyFilters}
                  className="bg-blueknight-500 hover:bg-blueknight-600 text-white"
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Buyer List Cards/Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBuyers.map(buyer => (
            <BuyerCard
              key={buyer.id}
              id={buyer.id}
              name={buyer.name}
              type={buyer.type}
              location={buyer.location}
              sector={buyer.sector}
              offering={buyer.offering}
              customers={buyer.customers}
              fitPercentage={buyer.matchingScore}
              addedToSaved={savedBuyers.includes(buyer.id)}
              onAddToSaved={handleAddToSaved}
            />
          ))}
        </div>
        
        {filteredBuyers.length === 0 && (
          <div className="text-center py-12">
            <UserCircle className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No buyers found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <div className="mt-6">
              <Button onClick={resetFilters} variant="outline">
                Reset filters
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerList;
