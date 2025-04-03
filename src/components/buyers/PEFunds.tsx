
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Plus, Check, Search } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
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
import { Input } from "@/components/ui/input";
import { Command, CommandInput, CommandList } from "@/components/ui/command";

interface PEFundsProps {
  savedBuyers?: string[];
  onAddToSaved: (id: string) => void;
}

// Mock data for PE buyers
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
    investmentSize: '$5M - 50M',
    revenue: '1.00 - 12.00',
    ebitda: '1.00 - 12.00',
    industryFocus: 'Industry Specific',
    industryPreferences: ['Healthcare', 'Technology'],
    description: 'Healthcare focused private equity',
    rationale: {
      sectors: {
        text: 'Strong focus on healthcare technology, perfectly aligned with our client\'s offering.',
        score: 94
      },
      previousTransactions: {
        text: 'Completed 5 healthcare technology acquisitions in the past 3 years, with a focus on software and digital health platforms.',
        score: 98
      },
      financialStrength: {
        text: 'Recently raised a new fund with significant capital to deploy in this sector.',
        score: 92
      },
      overall: {
        text: 'Healthcare Capital Partners has a strong track record in the healthcare technology space and is actively seeking acquisitions in our client\'s sector.',
        score: 95
      }
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
    investmentSize: '$10M - 80M',
    revenue: '5.00 - 50.00',
    ebitda: '1.00 - 10.00',
    industryFocus: 'Industry Specific',
    industryPreferences: ['Healthcare', 'SaaS'],
    description: 'Medtech focused venture capital',
    rationale: {
      sectors: {
        text: 'Specializes in healthcare technology and digital health solutions.',
        score: 90
      },
      previousTransactions: {
        text: 'Made 3 investments in similar companies over the past 18 months, with typical deal sizes of $30-50M.',
        score: 88
      },
      financialStrength: {
        text: 'Mid-sized fund with adequate capital for this acquisition size.',
        score: 86
      },
      overall: {
        text: 'Medtech Growth Fund specializes in exactly our client\'s market segment and has a successful history of growing similar companies.',
        score: 88
      }
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
    investmentSize: '$20M - 100M',
    revenue: '10.00 - 50.00',
    ebitda: '2.00 - 15.00',
    industryFocus: 'Industry Specific',
    industryPreferences: ['Biotech', 'Pharma'],
    description: 'Biotech focused private equity',
    rationale: {
      sectors: {
        text: 'Focuses on biotech and pharmaceutical sectors with limited healthcare IT exposure.',
        score: 68
      },
      previousTransactions: {
        text: 'Limited M&A experience, with only one acquisition in the past three years.',
        score: 62
      },
      financialStrength: {
        text: 'Smaller fund with moderate capital availability for acquisitions.',
        score: 70
      },
      overall: {
        text: 'Life Sciences Equity offers strategic connections in European markets but has limited M&A experience and more modest financial resources.',
        score: 75
      }
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
    investmentSize: '$15M - 75M',
    revenue: '8.00 - 40.00',
    ebitda: '1.50 - 12.00',
    industryFocus: 'Industry Specific',
    industryPreferences: ['HealthTech', 'MedTech'],
    description: 'APAC focused healthcare investor',
    rationale: {
      sectors: {
        text: 'Focuses on medical devices and healthcare IT with strong APAC presence.',
        score: 78
      },
      previousTransactions: {
        text: 'Completed two healthcare IT acquisitions in the past two years.',
        score: 80
      },
      financialStrength: {
        text: 'Solid financial position with dedicated capital for healthcare technology investments.',
        score: 84
      },
      overall: {
        text: 'Health Innovation Capital offers a unique opportunity for expansion into APAC markets with their regional expertise and connections.',
        score: 82
      }
    }
  }
];

const PEFunds: React.FC<PEFundsProps> = ({ savedBuyers = [], onAddToSaved }) => {
  const [expandedRationales, setExpandedRationales] = useState<string[]>([]);
  const [companyNameSearch, setCompanyNameSearch] = useState('');
  
  const toggleRationale = (buyerId: string) => {
    setExpandedRationales(prev => 
      prev.includes(buyerId) 
        ? prev.filter(id => id !== buyerId) 
        : [...prev, buyerId]
    );
  };
  
  const getMatchScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Filter the buyers based on company name search
  const filteredBuyers = peBuyers.filter(buyer => 
    buyer.name.toLowerCase().includes(companyNameSearch.toLowerCase())
  );

  return (
    <div className="relative overflow-hidden">
      <div className="mb-4">
        <Command className="rounded-lg border shadow-md">
          <CommandInput 
            placeholder="Search by company name..." 
            value={companyNameSearch}
            onValueChange={setCompanyNameSearch}
          />
        </Command>
      </div>
      
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
              {filteredBuyers.map((buyer) => (
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
                            onClick={() => onAddToSaved(buyer.id)}
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
                            
                            {/* First row - Investment Type, Geography, Industry Preferences, Total Investments */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
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
                                <h4 className="text-sm font-semibold text-gray-700 mb-2">Industry Preferences</h4>
                                <div className="flex flex-wrap gap-1">
                                  {buyer.industryPreferences?.map((pref, i) => (
                                    <span key={i} className="px-2 py-1 text-xs bg-purple-50 text-purple-700 rounded-full">
                                      {pref}
                                    </span>
                                  )) || "Not provided"}
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="text-sm font-semibold text-gray-700 mb-2">Total Investments</h4>
                                <p className="text-sm text-gray-600">{(buyer.investments?.split(' ')[0]) || "N/A"}</p>
                              </div>
                            </div>
                            
                            {/* Second row - EV Range, Revenue, EBITDA, AUM */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                              <div>
                                <h4 className="text-sm font-semibold text-gray-700 mb-2">EV Range</h4>
                                <p className="text-sm text-gray-600">{buyer.investmentSize}</p>
                              </div>
                              
                              <div>
                                <h4 className="text-sm font-semibold text-gray-700 mb-2">Revenue ($M)</h4>
                                <p className="text-sm text-gray-600">{buyer.revenue}</p>
                              </div>
                              
                              <div>
                                <h4 className="text-sm font-semibold text-gray-700 mb-2">EBITDA ($M)</h4>
                                <p className="text-sm text-gray-600">{buyer.ebitda}</p>
                              </div>
                              
                              <div>
                                <h4 className="text-sm font-semibold text-gray-700 mb-2">AUM ($M)</h4>
                                <p className="text-sm text-gray-600">{buyer.aum.toFixed(1)}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                            <h3 className="text-sm font-semibold text-gray-700 mb-3 border-b pb-2">Acquisition Rationale</h3>
                            <div className="space-y-4">
                              <div>
                                <h4 className="text-sm font-semibold text-gray-700 mb-1 flex items-center">
                                  <span className={`text-sm font-medium mr-2 ${getMatchScoreColor(buyer.rationale.sectors.score)}`}>
                                    {buyer.rationale.sectors.score}%
                                  </span>
                                  <span>Sectors</span>
                                </h4>
                                <p className="text-sm text-gray-600">{buyer.rationale.sectors.text}</p>
                              </div>
                              <div>
                                <h4 className="text-sm font-semibold text-gray-700 mb-1 flex items-center">
                                  <span className={`text-sm font-medium mr-2 ${getMatchScoreColor(buyer.rationale.previousTransactions.score)}`}>
                                    {buyer.rationale.previousTransactions.score}%
                                  </span>
                                  <span>Previous Transactions</span>
                                </h4>
                                <p className="text-sm text-gray-600">{buyer.rationale.previousTransactions.text}</p>
                              </div>
                              <div>
                                <h4 className="text-sm font-semibold text-gray-700 mb-1 flex items-center">
                                  <span className={`text-sm font-medium mr-2 ${getMatchScoreColor(buyer.rationale.financialStrength.score)}`}>
                                    {buyer.rationale.financialStrength.score}%
                                  </span>
                                  <span>Financial Strength</span>
                                </h4>
                                <p className="text-sm text-gray-600">{buyer.rationale.financialStrength.text}</p>
                              </div>
                              <div>
                                <h4 className="text-sm font-semibold text-gray-700 mb-1 flex items-center">
                                  <span className={`text-sm font-medium mr-2 ${getMatchScoreColor(buyer.rationale.overall.score)}`}>
                                    {buyer.rationale.overall.score}%
                                  </span>
                                  <span>Overall Rationale</span>
                                </h4>
                                <p className="text-sm text-gray-600">{buyer.rationale.overall.text}</p>
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
  );
};

export default PEFunds;
