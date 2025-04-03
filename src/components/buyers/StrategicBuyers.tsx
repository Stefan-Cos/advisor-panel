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
import {
  Command,
  CommandInput
} from "@/components/ui/command";

interface StrategicBuyersProps {
  savedBuyers?: string[];
  onAddToSaved: (id: string) => void;
}

// Mock data for strategic buyers
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
      offering: {
        text: 'Their software solutions align perfectly with our client\'s technology stack, providing an opportunity for seamless integration and expansion of service offerings.',
        score: 95
      },
      customers: {
        text: 'Strong overlap in customer base within the healthcare and financial sectors, which could lead to cross-selling opportunities.',
        score: 88
      },
      previousTransactions: {
        text: 'Acquired three complementary software companies in the last 2 years, demonstrating experience in successful post-merger integration.',
        score: 90
      },
      financialStrength: {
        text: 'Solid balance sheet with consistent revenue growth over the past 5 years and strong cash reserves for potential acquisitions.',
        score: 92
      },
      overall: {
        text: 'Tech Innovations Inc. presents a strong strategic fit due to complementary technology, overlapping customer base, and financial capability to execute the acquisition.',
        score: 92
      }
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
      offering: {
        text: 'Their healthcare solutions complement our client\'s products, allowing for a more comprehensive offering to the market.',
        score: 84
      },
      customers: {
        text: 'Strong presence in European healthcare systems which would open new markets for our client.',
        score: 90
      },
      previousTransactions: {
        text: 'Completed one strategic acquisition in the clinical workflow space last year, showing appetite for growth through acquisition.',
        score: 82
      },
      financialStrength: {
        text: 'Steady growth and good profitability metrics, though cash reserves are moderate.',
        score: 78
      },
      overall: {
        text: 'Global HealthTech offers excellent geographic expansion opportunities and product synergies, despite somewhat limited acquisition funds.',
        score: 85
      }
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
      offering: {
        text: 'Their medical software platforms would gain significant feature enhancement from our client\'s technology.',
        score: 82
      },
      customers: {
        text: 'Strong position in DACH region healthcare providers, complementing our client\'s North American focus.',
        score: 86
      },
      previousTransactions: {
        text: 'No recent acquisition history, but their parent company has completed several technology acquisitions in the past 3 years.',
        score: 65
      },
      financialStrength: {
        text: 'Recently received PE backing, providing acquisition capabilities despite smaller size.',
        score: 74
      },
      overall: {
        text: 'MediSoft presents an interesting opportunity for international expansion with their strong regional presence and newly available capital for acquisitions.',
        score: 78
      }
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
      offering: {
        text: 'Their analytics platforms could integrate well with our client\'s technology to create more comprehensive research solutions.',
        score: 72
      },
      customers: {
        text: 'Strong relationships with pharmaceutical companies that could benefit from our client\'s offerings.',
        score: 78
      },
      previousTransactions: {
        text: 'Successfully acquired and integrated a data analytics platform last year, showing M&A capability.',
        score: 68
      },
      financialStrength: {
        text: 'Moderate financial position with some capacity for strategic acquisitions in the right space.',
        score: 65
      },
      overall: {
        text: 'BioTech Ventures presents a solid strategic fit with complementary technology and customer relationships in the pharmaceutical research space.',
        score: 70
      }
    }
  }
];

const StrategicBuyers: React.FC<StrategicBuyersProps> = ({ savedBuyers = [], onAddToSaved }) => {
  const [expandedRationales, setExpandedRationales] = useState<string[]>([]);
  const [searchCompany, setSearchCompany] = useState<string>('');
  
  const filteredBuyers = strategicBuyers.filter(buyer => 
    buyer.name.toLowerCase().includes(searchCompany.toLowerCase())
  );
  
  const toggleRationale = (buyerId: string) => {
    setExpandedRationales(prev => 
      prev.includes(buyerId) 
        ? prev.filter(id => id !== buyerId) 
        : [...prev, buyerId]
    );
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
  
  const getMatchScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="relative overflow-hidden">
      <div className="mb-4">
        <Command className="rounded-lg border shadow-md">
          <CommandInput 
            placeholder="Search by company name..." 
            value={searchCompany}
            onValueChange={setSearchCompany}
            className="h-11"
          />
        </Command>
      </div>
    
      <ScrollArea className="h-[600px] w-full" orientation="both">
        <div className="min-w-max">
          <Table>
            <TableHeader>
              <TableRow className="bg-blueknight-500">
                <TableHead className="text-white font-medium w-[280px] sticky left-0 z-20 bg-blueknight-500">
                  Company Name
                </TableHead>
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
              {filteredBuyers.map((buyer) => (
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
                                <h4 className="text-sm font-semibold text-gray-700 mb-1 flex items-center">
                                  <span className={`text-sm font-medium ${getMatchScoreColor(buyer.rationale.offering.score)} mr-2`}>
                                    {buyer.rationale.offering.score}%
                                  </span>
                                  <span>Offering</span>
                                </h4>
                                <p className="text-sm text-gray-600">{buyer.rationale.offering.text}</p>
                              </div>
                              <div>
                                <h4 className="text-sm font-semibold text-gray-700 mb-1 flex items-center">
                                  <span className={`text-sm font-medium ${getMatchScoreColor(buyer.rationale.customers.score)} mr-2`}>
                                    {buyer.rationale.customers.score}%
                                  </span>
                                  <span>Customers</span>
                                </h4>
                                <p className="text-sm text-gray-600">{buyer.rationale.customers.text}</p>
                              </div>
                              <div>
                                <h4 className="text-sm font-semibold text-gray-700 mb-1 flex items-center">
                                  <span className={`text-sm font-medium ${getMatchScoreColor(buyer.rationale.previousTransactions.score)} mr-2`}>
                                    {buyer.rationale.previousTransactions.score}%
                                  </span>
                                  <span>Previous Transactions</span>
                                </h4>
                                <p className="text-sm text-gray-600">{buyer.rationale.previousTransactions.text}</p>
                              </div>
                              <div>
                                <h4 className="text-sm font-semibold text-gray-700 mb-1 flex items-center">
                                  <span className={`text-sm font-medium ${getMatchScoreColor(buyer.rationale.financialStrength.score)} mr-2`}>
                                    {buyer.rationale.financialStrength.score}%
                                  </span>
                                  <span>Financial Strength</span>
                                </h4>
                                <p className="text-sm text-gray-600">{buyer.rationale.financialStrength.text}</p>
                              </div>
                              <div>
                                <h4 className="text-sm font-semibold text-gray-700 mb-1 flex items-center">
                                  <span className={`text-sm font-medium ${getMatchScoreColor(buyer.rationale.overall.score)} mr-2`}>
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

export default StrategicBuyers;
