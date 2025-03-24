
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { ChevronDown, ChevronUp } from 'lucide-react';
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
  rationale: {
    offering: string;
    customers: string;
    financialStrength: string;
    overall: string;
  };
}

// Sample data for strategic buyers
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
    rationale: {
      offering: 'Their software solutions align perfectly with our client\'s technology stack, providing an opportunity for seamless integration and expansion of service offerings.',
      customers: 'Strong overlap in customer base within the healthcare and financial sectors, which could lead to cross-selling opportunities.',
      financialStrength: 'Solid balance sheet with consistent revenue growth over the past 5 years and strong cash reserves for potential acquisitions.',
      overall: 'Tech Innovations Inc. presents a strong strategic fit due to complementary technology, overlapping customer base, and financial capability to execute the acquisition.'
    }
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
    rationale: {
      offering: 'Their healthcare solutions complement our client\'s products, allowing for a more comprehensive offering to the market.',
      customers: 'Strong presence in European healthcare systems which would open new markets for our client.',
      financialStrength: 'Steady growth and good profitability metrics, though cash reserves are moderate.',
      overall: 'Global HealthTech offers excellent geographic expansion opportunities and product synergies, despite somewhat limited acquisition funds.'
    }
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
    rationale: {
      offering: 'Their medical software platforms would gain significant feature enhancement from our client\'s technology.',
      customers: 'Strong position in DACH region healthcare providers, complementing our client\'s North American focus.',
      financialStrength: 'Recently received PE backing, providing acquisition capabilities despite smaller size.',
      overall: 'MediSoft presents an interesting opportunity for international expansion with their strong regional presence and newly available capital for acquisitions.'
    }
  }
];

// Sample data for PE buyers
const samplePEBuyers: SavedBuyer[] = [
  {
    id: 'buyer5',
    name: 'Healthcare Capital Partners',
    type: 'pe',
    description: 'Healthcare focused private equity',
    location: 'UK',
    sector: 'Medtech, Life sciences',
    employees: 120,
    revenue: 350.0,
    cash: 125.0,
    reportedDate: '2024-04-05',
    isPEVCBacked: false,
    isPublic: false,
    rank: 1,
    feedback: 'Good understanding of our market segment.',
    matchingScore: 95,
    rationale: {
      offering: 'Looking to expand their healthcare technology portfolio with companies like our client.',
      customers: 'Their portfolio companies serve similar customer segments, creating potential synergies.',
      financialStrength: 'Recently raised a new fund with significant capital to deploy in this sector.',
      overall: 'Healthcare Capital Partners has a strong track record in the healthcare technology space and is actively seeking acquisitions in our client\'s sector.'
    }
  },
  {
    id: 'buyer6',
    name: 'Medtech Growth Fund',
    type: 'pe',
    description: 'Medtech focused venture capital',
    location: 'USA',
    sector: 'Healthcare technology, Digital health',
    employees: 85,
    revenue: 220.0,
    cash: 80.0,
    reportedDate: '2024-03-18',
    isPEVCBacked: false,
    isPublic: false,
    rank: null,
    feedback: '',
    matchingScore: 88,
    rationale: {
      offering: 'Actively seeking to invest in innovative medical technology solutions.',
      customers: 'Portfolio focused on solutions for hospital systems and clinics.',
      financialStrength: 'Mid-sized fund with adequate capital for this acquisition size.',
      overall: 'Medtech Growth Fund specializes in exactly our client\'s market segment and has a successful history of growing similar companies.'
    }
  }
];

const SavedList: React.FC<SavedListProps> = ({ listingId }) => {
  const [activeTab, setActiveTab] = useState<'strategic' | 'pe'>('strategic');
  const [strategicBuyers, setStrategicBuyers] = useState<SavedBuyer[]>(sampleStrategicBuyers);
  const [peBuyers, setPEBuyers] = useState<SavedBuyer[]>(samplePEBuyers);
  const [expandedRationales, setExpandedRationales] = useState<string[]>([]);
  const { toast } = useToast();
  
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
  
  const handleContacting = () => {
    toast({
      title: "Feature Coming Soon",
      description: "The contacting feature will be available in a future update."
    });
  };

  const toggleRationale = (buyerId: string) => {
    setExpandedRationales(prev => 
      prev.includes(buyerId) 
        ? prev.filter(id => id !== buyerId) 
        : [...prev, buyerId]
    );
  };

  // Format the date string to MMM-YY
  const formatReportDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en', { month: 'short', year: '2-digit' }).format(date);
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
        </div>
        
        {buyers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No saved buyers yet. Add buyers from the Buyer List.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-blueknight-500">
                  <TableHead className="text-white font-medium">Buyer Name</TableHead>
                  <TableHead className="text-white font-medium">Short Description</TableHead>
                  <TableHead className="text-white font-medium">HQ</TableHead>
                  <TableHead className="text-white font-medium">Employees</TableHead>
                  <TableHead className="text-white font-medium">Revenue ($M)</TableHead>
                  <TableHead className="text-white font-medium">Cash ($M)</TableHead>
                  <TableHead className="text-white font-medium">Reported Date</TableHead>
                  <TableHead className="text-white font-medium">PE/VC-Backed</TableHead>
                  <TableHead className="text-white font-medium">Public</TableHead>
                  <TableHead className="text-white font-medium">Rank</TableHead>
                  <TableHead className="text-white font-medium">Feedback</TableHead>
                  <TableHead className="text-white font-medium">Rationale</TableHead>
                  <TableHead className="text-white font-medium">Match Score</TableHead>
                  <TableHead className="text-white font-medium">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {buyers.map((buyer) => (
                  <React.Fragment key={buyer.id}>
                    <TableRow className="hover:bg-gray-50 bg-green-50">
                      <TableCell className="font-medium">{buyer.name}</TableCell>
                      <TableCell>{buyer.description}</TableCell>
                      <TableCell>{buyer.location}</TableCell>
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
                        <select
                          value={buyer.rank || ''}
                          onChange={(e) => handleRankChange(
                            buyer.id, 
                            e.target.value ? parseInt(e.target.value) : null
                          )}
                          className="block w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blueknight-400 focus:border-transparent"
                        >
                          <option value="">Not Ranked</option>
                          <option value="1">1 (Top)</option>
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
                        <button
                          onClick={handleContacting}
                          className="px-3 py-1 text-xs font-medium text-blueknight-500 bg-blueknight-50 rounded-md hover:bg-blueknight-100"
                          title="Feature coming soon"
                        >
                          Contacting
                        </button>
                      </TableCell>
                    </TableRow>
                    {expandedRationales.includes(buyer.id) && (
                      <TableRow className="bg-green-50">
                        <TableCell colSpan={14} className="p-0">
                          <div className="p-4 space-y-4">
                            <div className="grid grid-cols-1 gap-4">
                              <div>
                                <h4 className="text-sm font-semibold text-gray-700 mb-1">Offering</h4>
                                <p className="text-sm text-gray-600">{buyer.rationale.offering}</p>
                              </div>
                              <div>
                                <h4 className="text-sm font-semibold text-gray-700 mb-1">Customers</h4>
                                <p className="text-sm text-gray-600">{buyer.rationale.customers}</p>
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
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedList;
