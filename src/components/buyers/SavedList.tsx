import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { ChevronDown, ChevronUp, Trash, Search, Filter } from 'lucide-react';
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
import { ScrollArea } from "@/components/ui/scroll-area";
import BuyerFilters, { FilterState, KeywordSearch } from './BuyerFilters';
import BuyerTableHeader from './BuyerTableHeader';

interface SavedListProps {
  listingId: string;
}

interface SavedBuyer {
  id: string;
  name: string;
  type: 'strategic' | 'pe';
  description: string;
  location: string;
  sector: string;
  employees: number;
  revenue: number;
  cash: number;
  reportedDate: string;
  isPEVCBacked: boolean;
  isPublic: boolean;
  rank: number | null;
  feedback: string;
  matchingScore: number;
  website?: string;
  rationale: {
    offering: string;
    customers: string;
    previousTransactions: string;
    financialStrength: string;
    overall: string;
  };
  longDescription?: string;
  primaryIndustries?: string[];
  keywords?: string[];
  targetCustomerTypes?: string[];
  parentCompany?: string;
  aum?: number;
  investments?: string;
  previousAcquisitions?: string;
  investmentType?: string[];
  geography?: string[];
  investmentSize?: string;
  revenueRange?: string;
  ebitda?: string;
  industryFocus?: string;
  industryPreferences?: string[];
  maTrackRecord: 'High' | 'Medium' | 'Low';
}

const sampleStrategicBuyers: SavedBuyer[] = [
  {
    id: 'buyer1',
    name: 'Tech Innovations Inc.',
    type: 'strategic',
    description: 'Leading provider of technology solutions',
    location: 'USA',
    sector: 'Medtech, Life sciences',
    employees: 1500,
    revenue: 125.5,
    cash: 45.2,
    reportedDate: '2024-03-15',
    isPEVCBacked: false,
    isPublic: true,
    rank: 1,
    feedback: 'Great fit for our technology stack.',
    matchingScore: 92,
    website: 'https://techinnovations.example.com',
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
    },
    maTrackRecord: 'High'
  },
  {
    id: 'buyer2',
    name: 'Global HealthTech',
    type: 'strategic',
    description: 'Healthcare technology provider',
    location: 'UK',
    sector: 'Healthcare, Technology',
    employees: 850,
    revenue: 75.8,
    cash: 22.3,
    reportedDate: '2024-02-20',
    isPEVCBacked: false,
    isPublic: true,
    rank: 2,
    feedback: 'Strong market presence in our target regions.',
    matchingScore: 85,
    website: 'https://globalhealthtech.example.com',
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
    },
    maTrackRecord: 'Medium'
  },
  {
    id: 'buyer3',
    name: 'MediSoft Solutions',
    type: 'strategic',
    description: 'Medical software provider',
    location: 'Germany',
    sector: 'Medical software, Services',
    employees: 620,
    revenue: 58.2,
    cash: 18.9,
    reportedDate: '2024-01-10',
    isPEVCBacked: true,
    isPublic: false,
    rank: null,
    feedback: '',
    matchingScore: 78,
    website: 'https://medisoft.example.com',
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
    },
    maTrackRecord: 'Low'
  }
];

const samplePEBuyers: SavedBuyer[] = [
  {
    id: 'buyer5',
    name: 'Healthcare Capital Partners',
    type: 'pe',
    description: 'Healthcare focused private equity',
    location: 'UK',
    sector: 'Medtech, Life sciences',
    employees: 120,
    revenue: 0,
    cash: 0,
    reportedDate: '',
    isPEVCBacked: false,
    isPublic: false,
    rank: 1,
    feedback: 'Good understanding of our market segment.',
    matchingScore: 95,
    website: 'https://healthcarecapital.example.com',
    longDescription: 'Healthcare Capital Partners is a private equity firm exclusively focused on investments in healthcare technology and services. Their portfolio includes a range of companies from early-stage to mature healthcare businesses seeking growth capital.',
    primaryIndustries: ['Healthcare', 'Health Technology', 'Medical Devices'],
    keywords: ['Healthcare Investment', 'Growth Capital', 'Portfolio Synergies', 'Buy-and-Build'],
    targetCustomerTypes: ['Healthcare Startups', 'Growth-Stage Companies', 'Healthcare Service Providers'],
    parentCompany: 'Capital Partners Group',
    aum: 350.0,
    investments: '12 companies in healthcare tech',
    previousAcquisitions: 'Completed 5 healthcare technology acquisitions in the past 3 years',
    investmentType: ['M&A', 'Growth equity'],
    geography: ['UK', 'Europe', 'US'],
    investmentSize: '5M - 50M',
    revenueRange: '1.00 - 12.00',
    ebitda: '1.00 - 12.00',
    industryFocus: 'Industry Specific',
    industryPreferences: ['Healthcare', 'Technology'],
    rationale: {
      offering: 'Looking to expand their healthcare technology portfolio with companies like our client.',
      customers: 'Their portfolio companies serve similar customer segments, creating potential synergies.',
      previousTransactions: 'Completed 5 healthcare technology acquisitions in the past 3 years, with a focus on software and digital health platforms.',
      financialStrength: 'Recently raised a new fund with significant capital to deploy in this sector.',
      overall: 'Healthcare Capital Partners has a strong track record in the healthcare technology space and is actively seeking acquisitions in our client\'s sector.'
    },
    maTrackRecord: 'High'
  },
  {
    id: 'buyer6',
    name: 'Medtech Growth Fund',
    type: 'pe',
    description: 'Medtech focused venture capital',
    location: 'USA',
    sector: 'Healthcare technology, Digital health',
    employees: 85,
    revenue: 0,
    cash: 0,
    reportedDate: '',
    isPEVCBacked: false,
    isPublic: false,
    rank: null,
    feedback: '',
    matchingScore: 88,
    website: 'https://medtechgrowth.example.com',
    longDescription: 'Medtech Growth Fund invests in innovative medical technology companies with disruptive solutions for healthcare delivery and patient care. They typically target companies with established products and proven market fit seeking expansion capital.',
    primaryIndustries: ['Medical Technology', 'Digital Health', 'Health IT'],
    keywords: ['Medtech Investment', 'Growth Equity', 'Digital Health Innovation', 'Scale-up Funding'],
    targetCustomerTypes: ['Health Technology Companies', 'Medical Device Manufacturers', 'Digital Health Startups'],
    parentCompany: 'US Venture Partners',
    aum: 220.0,
    investments: '8 portfolio companies in medtech',
    previousAcquisitions: 'Made 3 investments in similar companies over the past 18 months',
    investmentType: ['Growth equity', 'Minority acquisition'],
    geography: ['USA', 'Canada'],
    investmentSize: '10M - 80M',
    revenueRange: '5.00 - 50.00',
    ebitda: '1.00 - 10.00',
    industryFocus: 'Industry Specific',
    industryPreferences: ['Healthcare', 'SaaS'],
    rationale: {
      offering: 'Actively seeking to invest in innovative medical technology solutions.',
      customers: 'Portfolio focused on solutions for hospital systems and clinics.',
      previousTransactions: 'Made 3 investments in similar companies over the past 18 months, with typical deal sizes of $30-50M.',
      financialStrength: 'Mid-sized fund with adequate capital for this acquisition size.',
      overall: 'Medtech Growth Fund specializes in exactly our client\'s market segment and has a successful history of growing similar companies.'
    },
    maTrackRecord: 'Medium'
  }
];

const SavedList: React.FC<SavedListProps> = ({ listingId }) => {
  const [activeTab, setActiveTab] = useState<'strategic' | 'pe'>('strategic');
  const [strategicBuyers, setStrategicBuyers] = useState<SavedBuyer[]>(sampleStrategicBuyers);
  const [peBuyers, setPEBuyers] = useState<SavedBuyer[]>(samplePEBuyers);
  const [expandedRationales, setExpandedRationales] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filteredBuyers, setFilteredBuyers] = useState<SavedBuyer[]>([]);
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
  
  const buyers = activeTab === 'strategic' ? strategicBuyers : peBuyers;
  
  useEffect(() => {
    setFilteredBuyers(buyers);
  }, [buyers, activeTab]);
  
  const uniqueCountries = Array.from(new Set(buyers.map(buyer => buyer.location)));
  
  const handleRankChange = (id: string, rank: number | null) => {
    if (activeTab === 'strategic') {
      setStrategicBuyers(prev => 
        prev.map(buyer => 
          buyer.id === id ? { ...buyer, rank } : buyer
        )
      );
    } else {
      setPEBuyers(prev => 
        prev.map(buyer => 
          buyer.id === id ? { ...buyer, rank } : buyer
        )
      );
    }
  };
  
  const handleFeedbackChange = (id: string, feedback: string) => {
    if (activeTab === 'strategic') {
      setStrategicBuyers(prev => 
        prev.map(buyer => 
          buyer.id === id ? { ...buyer, feedback } : buyer
        )
      );
    } else {
      setPEBuyers(prev => 
        prev.map(buyer => 
          buyer.id === id ? { ...buyer, feedback } : buyer
        )
      );
    }
  };
  
  const handleRemoveBuyer = (id: string) => {
    if (activeTab === 'strategic') {
      setStrategicBuyers(prev => prev.filter(buyer => buyer.id !== id));
    } else {
      setPEBuyers(prev => prev.filter(buyer => buyer.id !== id));
    }
    toast({
      title: "Buyer Removed",
      description: "The buyer has been removed from your saved list",
    });
  };

  const toggleRationale = (buyerId: string) => {
    setExpandedRationales(prev => 
      prev.includes(buyerId) 
        ? prev.filter(id => id !== buyerId) 
        : [...prev, buyerId]
    );
  };
  
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
    
    if (filters.hq.length > 0) {
      filtered = filtered.filter(buyer => filters.hq.includes(buyer.location));
    }
    
    if (filters.employees && activeTab === 'strategic') {
      const [min, max] = filters.employees.split('-').map(Number);
      filtered = filtered.filter(buyer => {
        const employees = 'employees' in buyer ? buyer.employees : 0;
        if (!max) return employees >= min;
        return employees >= min && employees <= max;
      });
    }
    
    if (filters.minScore && Number(filters.minScore) > 0) {
      filtered = filtered.filter(buyer => buyer.matchingScore >= Number(filters.minScore));
    }
    
    if (filters.peBacked) {
      const isPeBacked = filters.peBacked === 'yes';
      filtered = filtered.filter(buyer => {
        const buyerIsPeBacked = buyer.type === 'pe' || (buyer.type === 'strategic' && buyer.isPEVCBacked === true);
        return buyerIsPeBacked === isPeBacked;
      });
    }
    
    if (filters.public) {
      const isPublic = filters.public === 'yes';
      filtered = filtered.filter(buyer => {
        const buyerIsPublic = buyer.type === 'strategic' && buyer.isPublic === true;
        return buyerIsPublic === isPublic;
      });
    }
    
    if (keywordSearches.length > 0) {
      keywordSearches.forEach(ks => {
        if (!ks.text.trim()) return;
        
        const searchTerms = ks.text.toLowerCase().trim().split(/\s+/);
        
        if (ks.operator === 'AND') {
          filtered = filtered.filter(buyer => {
            let field = '';
            switch (ks.field) {
              case 'offering': 
                field = buyer.rationale.offering.toLowerCase(); 
                break;
              case 'sector': 
                field = buyer.sector.toLowerCase(); 
                break;
              case 'customers': 
                field = buyer.rationale.customers.toLowerCase(); 
                break;
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
              case 'offering': 
                field = buyer.rationale.offering.toLowerCase(); 
                break;
              case 'sector': 
                field = buyer.sector.toLowerCase(); 
                break;
              case 'customers': 
                field = buyer.rationale.customers.toLowerCase(); 
                break;
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
              case 'offering': 
                field = buyer.rationale.offering.toLowerCase(); 
                break;
              case 'sector': 
                field = buyer.sector.toLowerCase(); 
                break;
              case 'customers': 
                field = buyer.rationale.customers.toLowerCase(); 
                break;
              case 'keywords': 
                field = buyer.keywords ? buyer.keywords.join(' ').toLowerCase() : '';
                break;
            }
            return !searchTerms.some(term => field.includes(term));
          });
        }
      });
    }
    
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
    setFilteredBuyers(buyers);
    toast({
      title: "Filters Reset",
      description: "All filters have been cleared",
    });
  };

  const openSearchPopover = (field: keyof KeywordSearch['field']) => {
    const existingSearchIndex = keywordSearches.findIndex(ks => ks.field === field);
    
    if (existingSearchIndex >= 0) {
    } else {
      setKeywordSearches(prev => [
        ...prev,
        { text: '', operator: 'AND', field }
      ]);
    }
    
    setShowFilters(true);
  };

  const formatReportDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en', { month: 'short', year: '2-digit' }).format(date);
    } catch (error) {
      console.error("Error formatting date:", error);
      return "N/A";
    }
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
          
          <BuyerFilters
            filters={filters}
            keywordSearches={keywordSearches}
            showFilters={showFilters}
            uniqueCountries={uniqueCountries}
            onToggleFilters={toggleFilters}
            onFilterChange={handleFilterChange}
            onHQFilterChange={handleHQFilterChange}
            onKeywordSearchChange={handleKeywordSearchChange}
            onAddKeywordSearch={addKeywordSearch}
            onRemoveKeywordSearch={removeKeywordSearch}
            applyFilters={applyFilters}
            resetFilters={resetFilters}
          />
        </div>
        
        {showFilters && (
          <div className="mb-6">
            {/* Filters are now handled by the BuyerFilters component */}
          </div>
        )}
        
        {filteredBuyers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No saved buyers yet. Add buyers from the Buyer List.</p>
          </div>
        ) : (
          <div className="relative overflow-hidden">
            <ScrollArea className="h-[600px] w-full" orientation="both">
              <div className="min-w-max">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-blueknight-500">
                      {activeTab === 'strategic' ? (
                        <>
                          <TableHead className="text-white font-medium w-[180px] sticky left-0 z-20 bg-blueknight-500">Company Name</TableHead>
                          <BuyerTableHeader 
                            title="HQ" 
                            width="120px" 
                            sortable={true} 
                            onSort={() => {
                              handleFilterChange('sortBy', 
                                filters.sortBy === 'name-asc' ? 'name-desc' : 'name-asc'
                              );
                              applyFilters();
                            }}
                            sortDirection={
                              filters.sortBy === 'name-asc' ? 'asc' : 
                              filters.sortBy === 'name-desc' ? 'desc' : null
                            }
                          />
                          <BuyerTableHeader 
                            title="Employees" 
                            width="120px" 
                            sortable={true}
                            onSort={() => {
                              setShowFilters(true);
                            }}
                          />
                          <TableHead className="text-white font-medium w-[200px]">Short Description</TableHead>
                          <BuyerTableHeader 
                            title="Offering" 
                            width="250px"
                            searchable={true}
                            onSearch={openSearchPopover}
                            searchField="offering"
                          />
                          <BuyerTableHeader 
                            title="Sectors" 
                            width="180px"
                            searchable={true}
                            onSearch={openSearchPopover}
                            searchField="sector"
                          />
                          <BuyerTableHeader 
                            title="Customer Types" 
                            width="180px"
                            searchable={true}
                            onSearch={openSearchPopover}
                            searchField="customers"
                          />
                          <TableHead className="text-white font-medium w-[150px]">M&A Track Record</TableHead>
                          <TableHead className="text-white font-medium w-[100px]">Rank</TableHead>
                          <TableHead className="text-white font-medium w-[180px]">Feedback</TableHead>
                          <BuyerTableHeader 
                            title="Match Score" 
                            width="120px"
                            sortable={true}
                            onSort={() => {
                              handleFilterChange('sortBy', 'fit');
                              applyFilters();
                            }}
                            sortDirection={filters.sortBy === 'fit' ? 'desc' : null}
                          />
                        </>
                      ) : (
                        <>
                          <TableHead className="text-white font-medium w-[180px] sticky left-0 z-20 bg-blueknight-500">Fund Name</TableHead>
                          <BuyerTableHeader 
                            title="HQ" 
                            width="120px"
                            sortable={true}
                            onSort={() => setShowFilters(true)}
                          />
                          <TableHead className="text-white font-medium w-[200px]">Short Description</TableHead>
                          <BuyerTableHeader 
                            title="Sectors" 
                            width="180px"
                            searchable={true}
                            onSearch={openSearchPopover}
                            searchField="sector"
                          />
                          <TableHead className="text-white font-medium w-[250px]">Previous Acquisitions</TableHead>
                          <TableHead className="text-white font-medium w-[100px]">Rank</TableHead>
                          <TableHead className="text-white font-medium w-[180px]">Feedback</TableHead>
                          <BuyerTableHeader 
                            title="Match Score" 
                            width="120px"
                            sortable={true}
                            onSort={() => {
                              handleFilterChange('sortBy', 'fit');
                              applyFilters();
                            }}
                            sortDirection={filters.sortBy === 'fit' ? 'desc' : null}
                          />
                        </>
                      )}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeTab === 'strategic' ? (
                      strategicBuyers.map((buyer) => (
                        <React.Fragment key={buyer.id}>
                          <TableRow className="hover:bg-green-50 bg-green-50">
                            <TableCell 
                              className="font-medium sticky left-0 z-10 bg-green-50"
                            >
                              <div>
                                <div>{buyer.name}</div>
                                <div className="flex items-center mt-1 gap-2">
                                  <Collapsible 
                                    open={expandedRationales.includes(buyer.id)}
                                    onOpenChange={() => toggleRationale(buyer.id)}
                                  >
                                    <CollapsibleTrigger className="flex items-center px-2 py-1 text-xs font-medium bg-blueknight-50 text-blueknight-500 rounded-md hover:bg-blueknight-100">
                                      Rationale
                                      {expandedRationales.includes(buyer.id) ? (
                                        <ChevronUp className="h-3 w-3 ml-1" />
                                      ) : (
                                        <ChevronDown className="h-3 w-3 ml-1" />
                                      )}
                                    </CollapsibleTrigger>
                                  </Collapsible>
                                  
                                  <button
                                    onClick={() => handleRemoveBuyer(buyer.id)}
                                    className="flex items-center justify-center p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                                    title="Remove buyer"
                                  >
                                    <Trash className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{buyer.location}</TableCell>
                            <TableCell>{buyer.employees.toLocaleString()}</TableCell>
                            <TableCell>{buyer.description}</TableCell>
                            <TableCell>{buyer.rationale.offering}</TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {buyer.primaryIndustries?.map((industry, i) => (
                                  <span key={i} className="px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded-full">
                                    {industry}
                                  </span>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {buyer.targetCustomerTypes?.map((type, i) => (
                                  <span key={i} className="px-2 py-0.5 text-xs bg-blue-50 text-blue-700 rounded-full">
                                    {type}
                                  </span>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getMATrackRecordColor(buyer.maTrackRecord)}`}>
                                {buyer.maTrackRecord}
                              </span>
                            </TableCell>
                            <TableCell>
                              <select
                                value={buyer.rank || ''}
                                onChange={(e) => handleRankChange(
                                  buyer.id, 
                                  e.target.value ? parseInt(e.target.value) : null
                                )}
                                className="block w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blueknight-400 focus:border-transparent"
                              >
                                <option value="">-</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                              </select>
                            </TableCell>
                            <TableCell>
                              <input
                                type="text"
                                value={buyer.feedback}
                                onChange={(e) => handleFeedbackChange(buyer.id, e.target.value)}
                                placeholder="Add feedback..."
                                className="block w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blueknight-400 focus:border-transparent"
                              />
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <div className="w-10 bg-gray-200 rounded-full h-2 mr-2">
                                  <div
                                    className="bg-blueknight-500 h-2 rounded-full"
                                    style={{ width: `${buyer.matchingScore}%` }}
                                  />
                                </div>
                                <span className="text-sm font-medium text-blueknight-500">{buyer.matchingScore}%</span>
                              </div>
                            </TableCell>
                          </TableRow>
                          
                          {expandedRationales.includes(buyer.id) && (
                            <TableRow className="bg-green-50">
                              <TableCell colSpan={11} className="p-0">
                                <div className="p-4">
                                  <div className="mb-6 bg-white p-4 rounded-md border border-gray-200">
                                    <h3 className="text-sm font-semibold text-gray-700 mb-3 border-b pb-2">Buyer Information</h3>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                      <div>
                                        <h4 className="text-sm font-semibold text-gray-700 mb-1">Long Description</h4>
                                        <p className="text-sm text-gray-600">{buyer.longDescription || "Not provided"}</p>
                                      </div>
                                    
                                      <div>
                                        <h4 className="text-sm font-semibold text-gray-700 mb-1">Primary Industries</h4>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                          {buyer.primaryIndustries?.map((industry, i) => (
                                            <span key={i} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                                              {industry}
                                            </span>
                                          )) || "Not provided"}
                                        </div>
                                      </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                      <div>
                                        <h4 className="text-sm font-semibold text-gray-700 mb-1">Keywords</h4>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                          {buyer.keywords?.map((keyword, i) => (
                                            <span key={i} className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-full">
                                              {keyword}
                                            </span>
                                          )) || "Not provided"}
                                        </div>
                                      </div>
                                    
                                      <div>
                                        <h4 className="text-sm font-semibold text-gray-700 mb-1">Target Customer Types</h4>
                                        <p className="text-sm text-gray-600">
                                          {buyer.targetCustomerTypes?.join(', ') || "Not provided"}
                                        </p>
                                      </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 mt-4">
                                      <div>
                                        <h4 className="text-xs text-gray-500 mb-1">Parent Company</h4>
                                        <p className="text-sm font-medium">{buyer.parentCompany || "None/Independent"}</p>
                                      </div>
                                      <div>
                                        <h4 className="text-xs text-gray-500 mb-1">Website</h4>
                                        <p className="text-sm font-medium text-blue-500 hover:underline cursor-pointer">Visit</p>
                                      </div>
                                      <div>
                                        <h4 className="text-xs text-gray-500 mb-1">HQ</h4>
                                        <p className="text-sm font-medium">{buyer.location}</p>
                                      </div>
                                      <div>
                                        <h4 className="text-xs text-gray-500 mb-1">Employees</h4>
                                        <p className="text-sm font-medium">{buyer.employees.toLocaleString()}</p>
                                      </div>
                                      <div>
                                        <h4 className="text-xs text-gray-500 mb-1">Revenue ($M)</h4>
                                        <p className="text-sm font-medium">${buyer.revenue}</p>
                                      </div>
                                      <div>
                                        <h4 className="text-xs text-gray-500 mb-1">Cash ($M)</h4>
                                        <p className="text-sm font-medium">${buyer.cash}</p>
                                      </div>
                                      <div>
                                        <h4 className="text-xs text-gray-500 mb-1">Reported Date</h4>
                                        <p className="text-sm font-medium">{formatReportDate(buyer.reportedDate)}</p>
                                      </div>
                                      <div>
                                        <h4 className="text-xs text-gray-500 mb-1">PE/VC-Backed</h4>
                                        <p className="text-sm font-medium">{buyer.isPEVCBacked ? "Yes" : "No"}</p>
                                      </div>
                                      <div>
                                        <h4 className="text-xs text-gray-500 mb-1">Public</h4>
                                        <p className="text-sm font-medium">{buyer.isPublic ? "Yes" : "No"}</p>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                                    <h3 className="text-sm font-semibold text-gray-700 mb-3 border-b pb-2">Acquisition Rationale</h3>
                                    <div className="space-y-4">
                                      <div>
                                        <h4 className="text-sm font-semibold text-gray-700 mb-1">Offering</h4>
                                        <p className="text-sm text-gray-600">{buyer.rationale.offering}</p>
                                      </div>
                                      <div>
                                        <h4 className="text-sm font-semibold text-gray-700 mb-1">Customers</h4>
                                        <p className="text-sm text-gray-600">{buyer.rationale.customers}</p>
                                      </div>
                                      <div>
                                        <h4 className="text-sm font-semibold text-gray-700 mb-1">Previous Transactions</h4>
                                        <p className="text-sm text-gray-600">{buyer.rationale.previousTransactions}</p>
                                      </div>
                                      <div>
                                        <h4 className="text-sm font-semibold text-gray-700 mb-1">Financial Strength</h4>
                                        <p className="text-sm text-gray-600">{buyer.rationale.financialStrength}</p>
                                      </div>
                                      <div>
                                        <h4 className="text-sm font-semibold text-gray-700 mb-1">Overall Rationale</h4>
                                        <p className="text-sm text-gray-600">{buyer.rationale.overall}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </React.Fragment>
                      ))
                    ) : (
                      peBuyers.map((buyer) => (
                        <React.Fragment key={buyer.id}>
                          <TableRow className="hover:bg-green-50 bg-green-50">
                            <TableCell 
                              className="font-medium sticky left-0 z-10 bg-green-50"
                            >
                              <div>
                                <div>{buyer.name}</div>
                                <div className="flex items-center mt-1 gap-2">
                                  <Collapsible 
                                    open={expandedRationales.includes(buyer.id)}
                                    onOpenChange={() => toggleRationale(buyer.id)}
                                  >
                                    <CollapsibleTrigger className="flex items-center px-2 py-1 text-xs font-medium bg-blueknight-50 text-blueknight-500 rounded-md hover:bg-blueknight-100">
                                      Rationale
                                      {expandedRationales.includes(buyer.id) ? (
                                        <ChevronUp className="h-3 w-3 ml-1" />
                                      ) : (
                                        <ChevronDown className="h-3 w-3 ml-1" />
                                      )}
                                    </CollapsibleTrigger>
                                  </Collapsible>
                                  
                                  <button
                                    onClick={() => handleRemoveBuyer(buyer.id)}
                                    className="flex items-center justify-center p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                                    title="Remove buyer"
                                  >
                                    <Trash className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{buyer.location}</TableCell>
                            <TableCell>{buyer.description}</TableCell>
                            <TableCell>{buyer.sector}</TableCell>
                            <TableCell>{buyer.previousAcquisitions || buyer.rationale.previousTransactions}</TableCell>
                            <TableCell>
                              <select
                                value={buyer.rank || ''}
                                onChange={(e) => handleRankChange(
                                  buyer.id, 
                                  e.target.value ? parseInt(e.target.value) : null
                                )}
                                className="block w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blueknight-400 focus:border-transparent"
                              >
                                <option value="">-</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                              </select>
                            </TableCell>
                            <TableCell>
                              <input
                                type="text"
                                value={buyer.feedback}
                                onChange={(e) => handleFeedbackChange(buyer.id, e.target.value)}
                                placeholder="Add feedback..."
                                className="block w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blueknight-400 focus:border-transparent"
                              />
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <div className="w-10 bg-gray-200 rounded-full h-2 mr-2">
                                  <div
                                    className="bg-blueknight-500 h-2 rounded-full"
                                    style={{ width: `${buyer.matchingScore}%` }}
                                  />
                                </div>
                                <span className="text-sm font-medium text-blueknight-500">{buyer.matchingScore}%</span>
                              </div>
                            </TableCell>
                          </TableRow>
                          
                          {expandedRationales.includes(buyer.id) && (
                            <TableRow className="bg-green-50">
                              <TableCell colSpan={8} className="p-0">
                                <div className="p-4">
                                  <div className="mb-6 bg-white p-4 rounded-md border border-gray-200">
                                    <h3 className="text-sm font-semibold text-gray-700 mb-3 border-b pb-2">Fund Information</h3>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                      <div>
                                        <h4 className="text-sm font-semibold text-gray-700 mb-1">Long Description</h4>
                                        <p className="text-sm text-gray-600">{buyer.longDescription || "Not provided"}</p>
                                      </div>
                                    
                                      <div>
                                        <h4 className="text-sm font-semibold text-gray-700 mb-1">Primary Industries</h4>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                          {buyer.primaryIndustries?.map((industry, i) => (
                                            <span key={i} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                                              {industry}
                                            </span>
                                          )) || "Not provided"}
                                        </div>
                                      </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                      <div>
                                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Investment Type</h4>
                                        <div className="flex flex-wrap gap-1">
                                          {buyer.investmentType?.map((type, i) => (
                                            <span key={i} className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-full">
                                              {type}
                                            </span>
                                          )) || "Not provided"}
                                        </div>
                                      </div>
                                      
                                      <div>
                                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Geography</h4>
                                        <div className="flex flex-wrap gap-1">
                                          {buyer.geography?.map((geo, i) => (
                                            <span key={i} className="px-2 py-1 text-xs bg-cyan-50 text-cyan-700 rounded-full">
                                              {geo}
                                            </span>
                                          )) || "Not provided"}
                                        </div>
                                      </div>
                                      
                                      <div>
                                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Investment Size</h4>
                                        <p className="text-sm text-gray-600">${buyer.investmentSize}</p>
                                      </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                      <div>
                                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Revenue ($M)</h4>
                                        <p className="text-sm text-gray-600">{buyer.revenueRange || "Not provided"}</p>
                                      </div>
                                      
                                      <div>
                                        <h4 className="text-sm font-semibold text-gray-700 mb-2">EBITDA ($M)</h4>
                                        <p className="text-sm text-gray-600">{buyer.ebitda || "Not provided"}</p>
                                      </div>
                                      
                                      <div>
                                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Industry Focus</h4>
                                        <p className="text-sm text-gray-600">{buyer.industryFocus || "Not provided"}</p>
                                      </div>
                                    </div>
                                    
                                    <div>
                                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Industry Preferences</h4>
                                      <div className="flex flex-wrap gap-1">
                                        {buyer.industryPreferences?.map((pref, i) => (
                                          <span key={i} className="px-2 py-1 text-xs bg-purple-50 text-purple-700 rounded-full">
                                            {pref}
                                          </span>
                                        )) || "Not provided"}
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                                    <h3 className="text-sm font-semibold text-gray-700 mb-3 border-b pb-2">Acquisition Rationale</h3>
                                    <div className="space-y-4">
                                      <div>
                                        <h4 className="text-sm font-semibold text-gray-700 mb-1">Offering</h4>
                                        <p className="text-sm text-gray-600">{buyer.rationale.offering}</p>
                                      </div>
                                      <div>
                                        <h4 className="text-sm font-semibold text-gray-700 mb-1">Customers</h4>
                                        <p className="text-sm text-gray-600">{buyer.rationale.customers}</p>
                                      </div>
                                      <div>
                                        <h4 className="text-sm font-semibold text-gray-700 mb-1">Previous Transactions</h4>
                                        <p className="text-sm text-gray-600">{buyer.rationale.previousTransactions}</p>
                                      </div>
                                      <div>
                                        <h4 className="text-sm font-semibold text-gray-700 mb-1">Financial Strength</h4>
                                        <p className="text-sm text-gray-600">{buyer.rationale.financialStrength}</p>
                                      </div>
                                      <div>
                                        <h4 className="text-sm font-semibold text-gray-700 mb-1">Overall Rationale</h4>
                                        <p className="text-sm text-gray-600">{buyer.rationale.overall}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </React.Fragment>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedList;
