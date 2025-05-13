import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { ChevronDown, ChevronUp, Trash, History } from 'lucide-react';
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
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { getMATrackRecordColor } from '../buyers/utils/buyerUtils';

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
  const { toast } = useToast();
  const [sheetOpen, setSheetOpen] = useState<string | null>(null);
  const [maRecordSheetOpen, setMARecordSheetOpen] = useState<string | null>(null);
  
  const buyers = activeTab === 'strategic' ? strategicBuyers : peBuyers;
  
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
    toast("Removed", {
      description: "Buyer removed from saved list"
    });
  };

  const toggleRationale = (buyerId: string) => {
    setExpandedRationales(prev => 
      prev.includes(buyerId) 
        ? prev.filter(id => id !== buyerId) 
        : [...prev, buyerId]
    );
  };

  // Open the rationale sheet
  const openRationaleSheet = (buyerId: string) => {
    setSheetOpen(buyerId);
  };

  // Open the M&A track record sheet
  const openMARecordSheet = (buyerId: string) => {
    setMARecordSheetOpen(buyerId);
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

  const getScoreBadgeStyle = (score: number) => {
    if (score >= 90) return "bg-green-50 text-green-700";
    if (score >= 75) return "bg-blue-50 text-blue-700";
    if (score >= 60) return "bg-yellow-50 text-yellow-700";
    return "bg-gray-50 text-gray-700";
  };

  const getRationaleScore = (buyerId: string, section: string) => {
    const baseScore = buyers.find(b => b.id === buyerId)?.matchingScore || 75;
    
    switch(section) {
      case 'offering': return Math.min(100, baseScore + 5);
      case 'customers': return Math.max(30, baseScore - 10);
      case 'transactions': return Math.min(100, baseScore + 2);
      case 'financial': return Math.max(40, baseScore - 5);
      case 'overall': return baseScore;
      default: return baseScore;
    }
  };

  // Get transactions for a specific buyer
  const getMockTransactions = (record: string) => {
    if (record === 'High') {
      return [
        {
          id: '1',
          name: 'Acquisition of MedTech Solutions',
          date: 'March 2024',
          type: 'Full Acquisition',
          amount: '$120M',
          description: 'Acquired to expand healthcare technology portfolio and enter the clinical trials market.'
        },
        {
          id: '2',
          name: 'Merger with DataHealth Inc',
          date: 'November 2023',
          type: 'Merger',
          amount: '$85M',
          description: 'Strategic merger to combine data analytics capabilities with healthcare expertise.'
        },
        {
          id: '3',
          name: 'HealthAI Platform Acquisition',
          date: 'May 2023',
          type: 'Full Acquisition',
          amount: '$65M',
          description: 'Acquired AI-powered healthcare platform to enhance product offerings.'
        }
      ];
    } else if (record === 'Medium') {
      return [
        {
          id: '1',
          name: 'Partial Acquisition of BioData Systems',
          date: 'January 2024',
          type: 'Partial Acquisition',
          amount: '$42M',
          description: 'Acquired 40% stake to gain access to biotech data processing technology.'
        },
        {
          id: '2',
          name: 'MedAnalytics Platform Purchase',
          date: 'August 2023',
          type: 'Asset Purchase',
          amount: '$28M',
          description: 'Purchased analytics platform to strengthen data capabilities.'
        }
      ];
    } else {
      return [
        {
          id: '1',
          name: 'Investment in HealthTech Startup',
          date: 'February 2024',
          type: 'Minority Investment',
          amount: '$10M',
          description: 'Strategic minority investment in emerging healthcare technology provider.'
        }
      ];
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
        <div className="flex items-center mb-6">
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
        </div>
        
        {buyers.length === 0 ? (
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
                          <TableHead className="text-white font-medium w-[120px]">HQ</TableHead>
                          <TableHead className="text-white font-medium w-[120px]">Employees</TableHead>
                          <TableHead className="text-white font-medium w-[200px]">Short Description</TableHead>
                          <TableHead className="text-white font-medium w-[250px]">Offering</TableHead>
                          <TableHead className="text-white font-medium w-[180px]">Sectors</TableHead>
                          <TableHead className="text-white font-medium w-[180px]">Customer Types</TableHead>
                          <TableHead className="text-white font-medium w-[150px]">M&A Track Record</TableHead>
                          <TableHead className="text-white font-medium w-[100px]">Rank</TableHead>
                          <TableHead className="text-white font-medium w-[180px]">Feedback</TableHead>
                          <TableHead className="text-white font-medium w-[120px]">Match Score</TableHead>
                        </>
                      ) : (
                        <>
                          <TableHead className="text-white font-medium w-[180px] sticky left-0 z-20 bg-blueknight-500">Fund Name</TableHead>
                          <TableHead className="text-white font-medium w-[120px]">HQ</TableHead>
                          <TableHead className="text-white font-medium w-[200px]">Short Description</TableHead>
                          <TableHead className="text-white font-medium w-[180px]">Sectors</TableHead>
                          <TableHead className="text-white font-medium w-[250px]">Previous Acquisitions</TableHead>
                          <TableHead className="text-white font-medium w-[100px]">Rank</TableHead>
                          <TableHead className="text-white font-medium w-[180px]">Feedback</TableHead>
                          <TableHead className="text-white font-medium w-[120px]">Match Score</TableHead>
                        </>
                      )}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeTab === 'strategic' ? (
                      strategicBuyers.map((buyer) => (
                        <React.Fragment key={buyer.id}>
                          <TableRow className="hover:bg-green-50 bg-green-50 text-xs">
                            <TableCell 
                              className="font-medium sticky left-0 z-10 bg-green-50"
                            >
                              <div>
                                <div>{buyer.name}</div>
                                <div className="flex items-center mt-1 gap-2">
                                  <button
                                    onClick={() => openRationaleSheet(buyer.id)}
                                    className="text-xs font-medium text-blueknight-600 hover:text-blueknight-800 underline"
                                  >
                                    View Rationale
                                  </button>
                                  
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
                            <TableCell className="text-xs">{buyer.location}</TableCell>
                            <TableCell className="text-xs">{buyer.employees.toLocaleString()}</TableCell>
                            <TableCell className="text-xs">{buyer.description}</TableCell>
                            <TableCell className="text-xs">{buyer.rationale.offering}</TableCell>
                            <TableCell className="text-xs">
                              <div className="flex flex-wrap gap-1">
                                {buyer.primaryIndustries?.map((industry, i) => (
                                  <span key={i} className="px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded-full">
                                    {industry}
                                  </span>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell className="text-xs">
                              <div className="flex flex-wrap gap-1">
                                {buyer.targetCustomerTypes?.map((type, i) => (
                                  <span key={i} className="px-2 py-0.5 text-xs bg-blue-50 text-blue-700 rounded-full">
                                    {type}
                                  </span>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell className="text-xs">
                              <button 
                                onClick={() => openMARecordSheet(buyer.id)}
                                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getMATrackRecordColor(buyer.maTrackRecord)} cursor-pointer hover:opacity-90`}
                                title="Click to view M&A history"
                              >
                                {buyer.maTrackRecord}
                                <History className="h-3 w-3 ml-1 opacity-80" />
                              </button>
                            </TableCell>
                            <TableCell className="text-xs">
                              <select
                                value={buyer.rank || ''}
                                onChange={(e) => handleRankChange(
                                  buyer.id, 
                                  e.target.value ? parseInt(e.target.value) : null
                                )}
                                className="block w-full px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blueknight-400 focus:border-transparent"
                              >
                                <option value="">-</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                              </select>
                            </TableCell>
                            <TableCell className="text-xs">
                              <input
                                type="text"
                                value={buyer.feedback}
                                onChange={(e) => handleFeedbackChange(buyer.id, e.target.value)}
                                placeholder="Add feedback..."
                                className="block w-full px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blueknight-400 focus:border-transparent"
                              />
                            </TableCell>
                            <TableCell className="text-xs">
                              <div className="flex items-center">
                                <div className="w-10 bg-gray-200 rounded-full h-1.5 mr-2">
                                  <div
                                    className="bg-blueknight-500 h-1.5 rounded-full"
                                    style={{ width: `${buyer.matchingScore}%` }}
                                  />
                                </div>
                                <span className="text-xs font-medium text-blueknight-500">{buyer.matchingScore}%</span>
                              </div>
                            </TableCell>
                          </TableRow>
                        </React.Fragment>
                      ))
                    ) : (
                      peBuyers.map((buyer) => (
                        <React.Fragment key={buyer.id}>
                          <TableRow className="hover:bg-green-50 bg-green-50 text-xs">
                            <TableCell 
                              className="font-medium sticky left-0 z-10 bg-green-50"
                            >
                              <div>
                                <div>{buyer.name}</div>
                                <div className="flex items-center mt-1 gap-2">
                                  <button
                                    onClick={() => openRationaleSheet(buyer.id)}
                                    className="text-xs font-medium text-blueknight-600 hover:text-blueknight-800 underline"
                                  >
                                    View Rationale
                                  </button>
                                  
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
                            <TableCell className="text-xs">{buyer.location}</TableCell>
                            <TableCell className="text-xs">{buyer.description}</TableCell>
                            <TableCell className="text-xs">{buyer.sector}</TableCell>
                            <TableCell className="text-xs">{buyer.previousAcquisitions || buyer.rationale.previousTransactions}</TableCell>
                            <TableCell className="text-xs">
                              <select
                                value={buyer.rank || ''}
                                onChange={(e) => handleRankChange(
                                  buyer.id, 
                                  e.target.value ? parseInt(e.target.value) : null
                                )}
                                className="block w-full px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blueknight-400 focus:border-transparent"
                              >
                                <option value="">-</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                              </select>
                            </TableCell>
                            <TableCell className="text-xs">
                              <input
                                type="text"
                                value={buyer.feedback}
                                onChange={(e) => handleFeedbackChange(buyer.id, e.target.value)}
                                placeholder="Add feedback..."
                                className="block w-full px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blueknight-400 focus:border-transparent"
                              />
                            </TableCell>
                            <TableCell className="text-xs">
                              <div className="flex items-center">
                                <div className="w-10 bg-gray-200 rounded-full h-1.5 mr-2">
                                  <div
                                    className="bg-blueknight-500 h-1.5 rounded-full"
                                    style={{ width: `${buyer.matchingScore}%` }}
                                  />
                                </div>
                                <span className="text-xs font-medium text-blueknight-500">{buyer.matchingScore}%</span>
                              </div>
                            </TableCell>
                          </TableRow>
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

      {/* Side Panel for Buyer Rationale */}
      {buyers.map(buyer => (
        <Sheet key={`rationale-${buyer.id}`} open={sheetOpen === buyer.id} onOpenChange={() => setSheetOpen(null)}>
          <SheetContent className="w-[500px] sm:w-[700px] md:w-[900px] lg:max-w-[1200px] overflow-hidden">
            <SheetHeader>
              <SheetTitle className="flex items-center text-lg font-semibold">
                {buyer.name} - Match Analysis
              </SheetTitle>
              <SheetDescription>
                Detailed analysis of why this buyer may be a good match for your company.
              </SheetDescription>
            </SheetHeader>
            <ScrollArea className="h-[calc(100vh-140px)] pr-4 mt-6">
              <div className="space-y-6">
                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <h3 className="text-base font-medium text-gray-800 mb-4">Score Breakdown</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{buyer.type === 'strategic' ? 'Offering' : 'Sectors'}</span>
                        <span className={`text-sm font-medium ${getScoreBadgeStyle(getRationaleScore(buyer.id, 'offering'))}`}>
                          {getRationaleScore(buyer.id, 'offering')}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blueknight-500 h-2 rounded-full" 
                          style={{ width: `${getRationaleScore(buyer.id, 'offering')}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{buyer.rationale.offering}</p>
                    </div>

                    {buyer.type === 'strategic' && (
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Customers</span>
                          <span className={`text-sm font-medium ${getScoreBadgeStyle(getRationaleScore(buyer.id, 'customers'))}`}>
                            {getRationaleScore(buyer.id, 'customers')}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blueknight-500 h-2 rounded-full" 
                            style={{ width: `${getRationaleScore(buyer.id, 'customers')}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{buyer.rationale.customers}</p>
                      </div>
                    )}

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Previous Transactions</span>
                        <span className={`text-sm font-medium ${getScoreBadgeStyle(getRationaleScore(buyer.id, 'transactions'))}`}>
                          {getRationaleScore(buyer.id, 'transactions')}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blueknight-500 h-2 rounded-full" 
                          style={{ width: `${getRationaleScore(buyer.id, 'transactions')}%` }}
                        ></div>
