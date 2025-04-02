
import React, { useState } from 'react';
import { Filter, SlidersHorizontal, ChevronDown, ChevronUp, UserCircle, Tag, Plus, Check, Trash } from 'lucide-react';
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

const BuyerList: React.FC<BuyerListProps> = ({ listingId }) => {
  const [activeTab, setActiveTab] = useState<'strategic' | 'pe'>('strategic');
  const [savedBuyers, setSavedBuyers] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [expandedRationales, setExpandedRationales] = useState<string[]>([]);
  const { toast } = useToast();
  
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
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  const handleFilterApply = () => {
    toast({
      title: "Filters Applied",
      description: "Your search filters have been applied",
    });
    setShowFilters(false);
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

  const formatReportDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en', { month: 'short', year: '2-digit' }).format(date);
    } catch (error) {
      console.error("Error formatting date:", error);
      return "N/A";
    }
  };

  const handleAIAssistant = () => {
    toast({
      title: "AI Assistant",
      description: "AI is analyzing buyer data to provide personalized recommendations...",
    });
  };

  const handleKeywords = () => {
    toast({
      title: "Keywords Management",
      description: "Keyword management feature opened",
    });
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
          
          <div className="flex items-center space-x-3">
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                  <UserCircle className="h-4 w-4 text-purple-500" />
                  <span>Buyer Preferences</span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-900">Buyer Preferences</h3>
                  <div className="space-y-2">
                    <div>
                      <label className="text-xs font-medium text-gray-700">Industry Focus</label>
                      <Input
                        type="text"
                        placeholder="e.g., Healthcare, Technology"
                        className="h-8 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-700">Deal Size</label>
                      <Input
                        type="text"
                        placeholder="e.g., $10M - $50M"
                        className="h-8 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-700">Geographic Focus</label>
                      <Input
                        type="text"
                        placeholder="e.g., North America, Europe"
                        className="h-8 text-sm"
                      />
                    </div>
                  </div>
                  <button className="w-full px-3 py-2 text-sm font-medium bg-purple-500 text-white rounded-md hover:bg-purple-600">
                    Save Preferences
                  </button>
                </div>
              </PopoverContent>
            </Popover>
            
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                  <Tag className="h-4 w-4 text-green-500" />
                  <span>Keywords</span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-900">Manage Keywords</h3>
                  <div className="space-y-2">
                    <Input
                      type="text"
                      placeholder="Add keywords..."
                      className="h-8 text-sm"
                    />
                    <div className="flex flex-wrap gap-2 pt-2">
                      <span className="inline-flex items-center px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-full">
                        Healthcare 
                        <button className="ml-1 text-blue-500 hover:text-blue-700">×</button>
                      </span>
                      <span className="inline-flex items-center px-2 py-1 text-xs bg-green-50 text-green-700 rounded-full">
                        Software 
                        <button className="ml-1 text-green-500 hover:text-green-700">×</button>
                      </span>
                      <span className="inline-flex items-center px-2 py-1 text-xs bg-purple-50 text-purple-700 rounded-full">
                        SaaS 
                        <button className="ml-1 text-purple-500 hover:text-purple-700">×</button>
                      </span>
                      <span className="inline-flex items-center px-2 py-1 text-xs bg-yellow-50 text-yellow-700 rounded-full">
                        B2B 
                        <button className="ml-1 text-yellow-500 hover:text-yellow-700">×</button>
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleKeywords}
                    className="w-full px-3 py-2 text-sm font-medium bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Apply Keywords
                  </button>
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <select className="input-field">
                  <option value="">All Countries</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="Germany">Germany</option>
                  <option value="Canada">Canada</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sector
                </label>
                <select className="input-field">
                  <option value="">All Sectors</option>
                  <option value="Medtech">Medtech</option>
                  <option value="Life sciences">Life Sciences</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Technology">Technology</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Fit Score
                </label>
                <select className="input-field">
                  <option value="0">Any</option>
                  <option value="60">60%+</option>
                  <option value="70">70%+</option>
                  <option value="80">80%+</option>
                  <option value="90">90%+</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sort By
                </label>
                <select className="input-field">
                  <option value="fit">Fit Score (High to Low)</option>
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
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
        
        {activeTab === 'strategic' ? (
          <div className="relative overflow-hidden">
            <ScrollArea className="h-[600px] w-full" orientation="both">
              <div className="min-w-max">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-blueknight-500">
                      <TableHead className="text-white font-medium w-[280px] sticky left-0 z-20 bg-blueknight-500">Company Name</TableHead>
                      <TableHead className="text-white font-medium w-[120px]">HQ</TableHead>
                      <TableHead className="text-white font-medium w-[120px]">Employees</TableHead>
                      <TableHead className="text-white font-medium w-[200px]">Short Description</TableHead>
                      <TableHead className="text-white font-medium w-[250px]">Offering</TableHead>
                      <TableHead className="text-white font-medium w-[180px]">Sectors</TableHead>
                      <TableHead className="text-white font-medium w-[180px]">Customer Types</TableHead>
                      <TableHead className="text-white font-medium w-[150px]">M&A Track Record</TableHead>
                      <TableHead className="text-white font-medium w-[120px]">Match Score</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {strategicBuyers.map((buyer) => (
                      <React.Fragment key={buyer.id}>
                        <TableRow className={`hover:bg-gray-50 ${savedBuyers.includes(buyer.id) ? 'bg-green-50' : ''}`}>
                          <TableCell 
                            className={`font-medium sticky left-0 z-10 ${savedBuyers.includes(buyer.id) ? 'bg-green-50' : 'bg-white'}`}
                            style={{position: 'sticky', left: 0}}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span>{buyer.name}</span>
                                </div>
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
                                    onClick={() => handleAddToSaved(buyer.id)}
                                    disabled={savedBuyers.includes(buyer.id)}
                                    className={`flex items-center justify-center p-1 rounded-full ${
                                      savedBuyers.includes(buyer.id)
                                        ? 'bg-green-100 text-green-600 cursor-not-allowed'
                                        : 'bg-blueknight-100 text-blueknight-600 hover:bg-blueknight-200'
                                    }`}
                                    title={savedBuyers.includes(buyer.id) ? "Already saved" : "Save buyer"}
                                  >
                                    {savedBuyers.includes(buyer.id) ? (
                                      <Check className="h-3.5 w-3.5" />
                                    ) : (
                                      <Plus className="h-3.5 w-3.5" />
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{buyer.location}</TableCell>
                          <TableCell>{buyer.employees.toLocaleString()}</TableCell>
                          <TableCell>{buyer.description}</TableCell>
                          <TableCell>{buyer.offering}</TableCell>
                          <TableCell>{buyer.sector}</TableCell>
                          <TableCell>{buyer.customers}</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getMATrackRecordColor(buyer.maTrackRecord)}`}>
                              {buyer.maTrackRecord}
                            </span>
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
                            <TableCell colSpan={9} className="p-0">
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
                                      <p className="text-sm font-medium">$125.5</p>
                                    </div>
                                    <div>
                                      <h4 className="text-xs text-gray-500 mb-1">Cash ($M)</h4>
                                      <p className="text-sm font-medium">$45.2</p>
                                    </div>
                                    <div>
                                      <h4 className="text-xs text-gray-500 mb-1">Reported Date</h4>
                                      <p className="text-sm font-medium">Mar 24</p>
                                    </div>
                                    <div>
                                      <h4 className="text-xs text-gray-500 mb-1">PE/VC-Backed</h4>
                                      <p className="text-sm font-medium">No</p>
                                    </div>
                                    <div>
                                      <h4 className="text-xs text-gray-500 mb-1">Public</h4>
                                      <p className="text-sm font-medium">Yes</p>
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
                    ))}
                  </TableBody>
                </Table>
              </div>
            </ScrollArea>
          </div>
        ) : (
          <div className="relative overflow-hidden">
            <ScrollArea className="h-[600px] w-full" orientation="both">
              <div className="min-w-max">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-blueknight-500">
                      <TableHead className="text-white font-medium w-[280px] sticky left-0 z-20 bg-blueknight-500">Fund Name</TableHead>
                      <TableHead className="text-white font-medium w-[120px]">HQ</TableHead>
                      <TableHead className="text-white font-medium w-[200px]">Short Description</TableHead>
                      <TableHead className="text-white font-medium w-[180px]">Sectors</TableHead>
                      <TableHead className="text-white font-medium w-[250px]">Previous Acquisitions</TableHead>
                      <TableHead className="text-white font-medium w-[120px]">Match Score</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {peBuyers.map((buyer) => (
                      <React.Fragment key={buyer.id}>
                        <TableRow className={`hover:bg-gray-50 ${savedBuyers.includes(buyer.id) ? 'bg-green-50' : ''}`}>
                          <TableCell 
                            className={`font-medium sticky left-0 z-10 ${savedBuyers.includes(buyer.id) ? 'bg-green-50' : 'bg-white'}`}
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
                                  onClick={() => handleAddToSaved(buyer.id)}
                                  disabled={savedBuyers.includes(buyer.id)}
                                  className={`flex items-center justify-center p-1 rounded-full ${
                                    savedBuyers.includes(buyer.id)
                                      ? 'bg-green-100 text-green-600 cursor-not-allowed'
                                      : 'bg-blueknight-100 text-blueknight-600 hover:bg-blueknight-200'
                                  }`}
                                  title={savedBuyers.includes(buyer.id) ? "Already saved" : "Save buyer"}
                                >
                                  {savedBuyers.includes(buyer.id) ? (
                                    <Check className="h-3.5 w-3.5" />
                                  ) : (
                                    <Plus className="h-3.5 w-3.5" />
                                  )}
                                </button>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{buyer.location}</TableCell>
                          <TableCell>{buyer.description}</TableCell>
                          <TableCell>{buyer.sector}</TableCell>
                          <TableCell>{buyer.previousAcquisitions}</TableCell>
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
                            <TableCell colSpan={6} className="p-0">
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
                                      <p className="text-sm text-gray-600">{buyer.revenue}</p>
                                    </div>
                                    
                                    <div>
                                      <h4 className="text-sm font-semibold text-gray-700 mb-2">EBITDA ($M)</h4>
                                      <p className="text-sm text-gray-600">{buyer.ebitda}</p>
                                    </div>
                                    
                                    <div>
                                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Industry Focus</h4>
                                      <p className="text-sm text-gray-600">{buyer.industryFocus}</p>
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
                    ))}
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

export default BuyerList;
