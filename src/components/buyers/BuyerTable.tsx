
import React, { useState } from 'react';
import { Filter, ChevronDown, ChevronUp, SlidersHorizontal } from 'lucide-react';
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
import { format } from 'date-fns';

interface BuyerTableProps {
  listingId: string;
}

interface Buyer {
  id: string;
  name: string;
  type: 'strategic' | 'pe';
  website: string;
  description: string;
  hq: string;
  employees: number;
  revenue: number;
  cash: number;
  reportedDate: string;
  isPEVCBacked: boolean;
  isPublic: boolean;
  rationale: {
    offering: string;
    customers: string;
    financialStrength: string;
    overall: string;
  };
  matchingScore: number;
}

// Sample data
const strategicBuyers: Buyer[] = [
  {
    id: 'buyer1',
    name: 'Tech Innovations Inc.',
    type: 'strategic',
    website: 'www.techinnovations.com',
    description: 'Leading provider of technology solutions',
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
      financialStrength: 'Solid balance sheet with consistent revenue growth over the past 5 years and strong cash reserves for potential acquisitions.',
      overall: 'Tech Innovations Inc. presents a strong strategic fit due to complementary technology, overlapping customer base, and financial capability to execute the acquisition.'
    },
    matchingScore: 92
  },
  {
    id: 'buyer2',
    name: 'Global HealthTech',
    type: 'strategic',
    website: 'www.globalhealthtech.co.uk',
    description: 'Healthcare technology provider',
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
      financialStrength: 'Steady growth and good profitability metrics, though cash reserves are moderate.',
      overall: 'Global HealthTech offers excellent geographic expansion opportunities and product synergies, despite somewhat limited acquisition funds.'
    },
    matchingScore: 85
  },
  {
    id: 'buyer3',
    name: 'MediSoft Solutions',
    type: 'strategic',
    website: 'www.medisoft.de',
    description: 'Medical software provider',
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
      financialStrength: 'Recently received PE backing, providing acquisition capabilities despite smaller size.',
      overall: 'MediSoft presents an interesting opportunity for international expansion with their strong regional presence and newly available capital for acquisitions.'
    },
    matchingScore: 78
  }
];

const peBuyers: Buyer[] = [
  {
    id: 'buyer5',
    name: 'Healthcare Capital Partners',
    type: 'pe',
    website: 'www.healthcarecapital.co.uk',
    description: 'Healthcare focused private equity',
    hq: 'UK',
    employees: 120,
    revenue: 350.0, // AUM in millions
    cash: 125.0, // Dry powder in millions
    reportedDate: '2024-04-05',
    isPEVCBacked: false,
    isPublic: false,
    rationale: {
      offering: 'Looking to expand their healthcare technology portfolio with companies like our client.',
      customers: 'Their portfolio companies serve similar customer segments, creating potential synergies.',
      financialStrength: 'Recently raised a new fund with significant capital to deploy in this sector.',
      overall: 'Healthcare Capital Partners has a strong track record in the healthcare technology space and is actively seeking acquisitions in our client\'s sector.'
    },
    matchingScore: 95
  },
  {
    id: 'buyer6',
    name: 'Medtech Growth Fund',
    type: 'pe',
    website: 'www.medtechgrowth.com',
    description: 'Medtech focused venture capital',
    hq: 'USA',
    employees: 85,
    revenue: 220.0, // AUM in millions
    cash: 80.0, // Dry powder in millions
    reportedDate: '2024-03-18',
    isPEVCBacked: false,
    isPublic: false,
    rationale: {
      offering: 'Actively seeking to invest in innovative medical technology solutions.',
      customers: 'Portfolio focused on solutions for hospital systems and clinics.',
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
  const [expandedRationales, setExpandedRationales] = useState<string[]>([]);
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

  // Format the date string to MMM-YY
  const formatReportDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'MMM-yy');
    } catch (error) {
      console.error("Error formatting date:", error);
      return "N/A";
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
          
          <button
            onClick={toggleFilters}
            className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </button>
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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country
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
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-blueknight-500">
                <TableHead className="text-white font-medium">Company Name</TableHead>
                <TableHead className="text-white font-medium">Website</TableHead>
                <TableHead className="text-white font-medium">Short Description</TableHead>
                <TableHead className="text-white font-medium">HQ</TableHead>
                <TableHead className="text-white font-medium">Employees</TableHead>
                <TableHead className="text-white font-medium">Revenue ($M)</TableHead>
                <TableHead className="text-white font-medium">Cash ($M)</TableHead>
                <TableHead className="text-white font-medium">Reported Date</TableHead>
                <TableHead className="text-white font-medium">PE/VC-Backed</TableHead>
                <TableHead className="text-white font-medium">Public</TableHead>
                <TableHead className="text-white font-medium">Rationale</TableHead>
                <TableHead className="text-white font-medium">Match Score</TableHead>
                <TableHead className="text-white font-medium"><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {buyers.map((buyer) => (
                <React.Fragment key={buyer.id}>
                  <TableRow className="hover:bg-gray-50">
                    <TableCell className="font-medium">{buyer.name}</TableCell>
                    <TableCell>{buyer.website}</TableCell>
                    <TableCell>{buyer.description}</TableCell>
                    <TableCell>{buyer.hq}</TableCell>
                    <TableCell>{buyer.employees.toLocaleString()}</TableCell>
                    <TableCell>${buyer.revenue.toFixed(1)}</TableCell>
                    <TableCell>${buyer.cash.toFixed(1)}</TableCell>
                    <TableCell>{formatReportDate(buyer.reportedDate)}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        buyer.isPEVCBacked ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {buyer.isPEVCBacked ? 'Yes' : 'No'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        buyer.isPublic ? 'bg-blue-50 text-blue-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {buyer.isPublic ? 'Yes' : 'No'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Collapsible 
                        open={expandedRationales.includes(buyer.id)}
                        onOpenChange={() => toggleRationale(buyer.id)}
                      >
                        <CollapsibleTrigger className="flex items-center px-3 py-1.5 text-xs font-medium bg-blueknight-50 text-blueknight-500 rounded-md hover:bg-blueknight-100">
                          Rationale
                          {expandedRationales.includes(buyer.id) ? (
                            <ChevronUp className="h-4 w-4 ml-1" />
                          ) : (
                            <ChevronDown className="h-4 w-4 ml-1" />
                          )}
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-2 p-3 bg-gray-50 rounded-md border border-gray-100">
                          <div className="space-y-2">
                            <div>
                              <h4 className="text-xs font-semibold text-gray-700">Offering</h4>
                              <p className="text-xs text-gray-600">{buyer.rationale.offering}</p>
                            </div>
                            <div>
                              <h4 className="text-xs font-semibold text-gray-700">Customers</h4>
                              <p className="text-xs text-gray-600">{buyer.rationale.customers}</p>
                            </div>
                            <div>
                              <h4 className="text-xs font-semibold text-gray-700">Financial Strength</h4>
                              <p className="text-xs text-gray-600">{buyer.rationale.financialStrength}</p>
                            </div>
                            <div>
                              <h4 className="text-xs font-semibold text-gray-700">Overall Rationale</h4>
                              <p className="text-xs text-gray-600">{buyer.rationale.overall}</p>
                            </div>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
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
                    <TableCell>
                      {!savedBuyers.includes(buyer.id) ? (
                        <button
                          onClick={() => handleAddToSaved(buyer.id)}
                          className="text-xs px-2 py-1 bg-blueknight-500 text-white rounded hover:bg-blueknight-600"
                        >
                          Save
                        </button>
                      ) : (
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">
                          Saved
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default BuyerTable;
