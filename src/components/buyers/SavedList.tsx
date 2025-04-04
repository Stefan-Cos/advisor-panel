
import React, { useState } from 'react';
import { Check, Download, ChevronDown, ChevronUp } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
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
import { Checkbox } from "@/components/ui/checkbox";

interface SavedListProps {
  listingId: string;
}

// Mock data for saved strategic buyers
const savedStrategicBuyers = [
  {
    id: 'buyer1',
    name: 'Tech Innovations Inc.',
    type: 'strategic',
    location: 'USA',
    description: 'Leading provider of technology solutions',
    employees: 1500,
    matchingScore: 92,
    dateAdded: '2024-03-15T10:30:00Z',
    sector: 'Technology, Healthcare',
    rationale: {
      text: 'Tech Innovations Inc. presents a strong strategic fit due to complementary technology, overlapping customer base, and financial capability to execute the acquisition.',
      score: 92
    }
  },
  {
    id: 'buyer2',
    name: 'Global HealthTech',
    type: 'strategic',
    location: 'UK',
    description: 'Healthcare technology provider',
    employees: 850,
    matchingScore: 85,
    dateAdded: '2024-03-14T14:45:00Z',
    sector: 'Healthcare, Technology',
    rationale: {
      text: 'Global HealthTech offers excellent geographic expansion opportunities and product synergies, despite somewhat limited acquisition funds.',
      score: 85
    }
  },
  {
    id: 'buyer3',
    name: 'MediSoft Solutions',
    type: 'strategic',
    location: 'Germany',
    description: 'Medical software provider',
    employees: 620,
    matchingScore: 78,
    dateAdded: '2024-03-13T09:15:00Z',
    sector: 'Medical software, Services',
    rationale: {
      text: 'MediSoft presents an interesting opportunity for international expansion with their strong regional presence and newly available capital for acquisitions.',
      score: 78
    }
  }
];

// Mock data for saved PE funds
const savedPEFunds = [
  {
    id: 'buyer5',
    name: 'Healthcare Capital Partners',
    type: 'pe',
    location: 'UK',
    description: 'Healthcare focused private equity',
    employees: 120,
    matchingScore: 95,
    dateAdded: '2024-03-15T16:20:00Z',
    aum: 350,
    investments: '12 companies in healthcare tech',
    rationale: {
      text: 'Healthcare Capital Partners has a strong track record in the healthcare technology space and is actively seeking acquisitions in our client\'s sector.',
      score: 95
    }
  },
  {
    id: 'buyer6',
    name: 'Medtech Growth Fund',
    type: 'pe',
    location: 'USA',
    description: 'Medtech focused venture capital',
    employees: 85,
    matchingScore: 88,
    dateAdded: '2024-03-14T11:30:00Z',
    aum: 220,
    investments: '8 portfolio companies in medtech',
    rationale: {
      text: 'Medtech Growth Fund specializes in exactly our client\'s market segment and has a successful history of growing similar companies.',
      score: 88
    }
  }
];

const SavedList: React.FC<SavedListProps> = ({ listingId }) => {
  const [activeTab, setActiveTab] = useState<'strategic' | 'pe'>('strategic');
  const [expandedRationales, setExpandedRationales] = useState<string[]>([]);
  const [selectedBuyers, setSelectedBuyers] = useState<string[]>([]);
  const { toast } = useToast();
  
  const buyers = activeTab === 'strategic' ? savedStrategicBuyers : savedPEFunds;
  
  const toggleRationale = (buyerId: string) => {
    setExpandedRationales(prev => 
      prev.includes(buyerId) 
        ? prev.filter(id => id !== buyerId) 
        : [...prev, buyerId]
    );
  };
  
  const toggleSelectBuyer = (buyerId: string) => {
    setSelectedBuyers(prev => 
      prev.includes(buyerId)
        ? prev.filter(id => id !== buyerId)
        : [...prev, buyerId]
    );
  };
  
  const selectAll = () => {
    if (selectedBuyers.length === buyers.length) {
      setSelectedBuyers([]);
    } else {
      setSelectedBuyers(buyers.map(buyer => buyer.id));
    }
  };
  
  const exportToCsv = () => {
    const buyersToExport = buyers.filter(buyer => selectedBuyers.includes(buyer.id));
    
    if (buyersToExport.length === 0) {
      toast({
        title: "No buyers selected",
        description: "Please select at least one buyer to export",
        variant: "destructive"
      });
      return;
    }
    
    // Create CSV content
    let csvContent = "";
    
    // Headers
    const headers = activeTab === 'strategic' 
      ? ["Company Name", "Type", "Location", "Description", "Employees", "Match Score", "Sector"] 
      : ["Fund Name", "Type", "Location", "Description", "Employees", "Match Score", "AUM ($M)", "Investments"];
      
    csvContent += headers.join(",") + "\r\n";
    
    // Rows
    buyersToExport.forEach(buyer => {
      const row = activeTab === 'strategic'
        ? [
            `"${buyer.name}"`,
            buyer.type,
            `"${buyer.location}"`,
            `"${buyer.description}"`,
            buyer.employees,
            buyer.matchingScore,
            `"${buyer.sector}"`
          ]
        : [
            `"${buyer.name}"`,
            buyer.type,
            `"${buyer.location}"`,
            `"${buyer.description}"`,
            buyer.employees,
            buyer.matchingScore,
            (buyer as any).aum,
            `"${(buyer as any).investments}"`
          ];
      
      csvContent += row.join(",") + "\r\n";
    });
    
    // Create and download the file
    const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${activeTab}-buyers-export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Export successful",
      description: `${buyersToExport.length} buyers exported to CSV`
    });
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <button 
            onClick={() => setActiveTab('strategic')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              activeTab === 'strategic' 
                ? 'bg-blueknight-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Strategic Buyers ({savedStrategicBuyers.length})
          </button>
          <button 
            onClick={() => setActiveTab('pe')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              activeTab === 'pe' 
                ? 'bg-blueknight-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            PE Funds ({savedPEFunds.length})
          </button>
        </div>
        
        <Button 
          onClick={exportToCsv}
          variant="outline" 
          className="flex items-center gap-2 border-blueknight-200 text-blueknight-700 hover:bg-blueknight-50"
        >
          <Download className="h-4 w-4" />
          Export {selectedBuyers.length} {activeTab === 'strategic' ? 'Buyers' : 'Funds'}
        </Button>
      </div>
      
      <ScrollArea className="h-[600px]">
        <div className="min-w-max">
          <Table>
            <TableHeader>
              <TableRow className="bg-blueknight-500">
                <TableHead className="text-white font-medium w-12">
                  <Checkbox 
                    checked={selectedBuyers.length === buyers.length && buyers.length > 0}
                    onCheckedChange={selectAll}
                    className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-blueknight-600"
                  />
                </TableHead>
                <TableHead className="text-white font-medium">Company Name</TableHead>
                <TableHead className="text-white font-medium">Location</TableHead>
                <TableHead className="text-white font-medium">Description</TableHead>
                <TableHead className="text-white font-medium">Match Score</TableHead>
                {activeTab === 'strategic' ? (
                  <TableHead className="text-white font-medium">Sector</TableHead>
                ) : (
                  <>
                    <TableHead className="text-white font-medium">AUM ($M)</TableHead>
                    <TableHead className="text-white font-medium">Investments</TableHead>
                  </>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {buyers.map((buyer) => (
                <React.Fragment key={buyer.id}>
                  <TableRow className="hover:bg-gray-50">
                    <TableCell>
                      <Checkbox 
                        checked={selectedBuyers.includes(buyer.id)}
                        onCheckedChange={() => toggleSelectBuyer(buyer.id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      <div>
                        <div className="flex items-center gap-2">
                          <span>{buyer.name}</span>
                        </div>
                        <div className="flex items-center mt-1">
                          <Collapsible 
                            open={expandedRationales.includes(buyer.id)}
                            onOpenChange={() => toggleRationale(buyer.id)}
                          >
                            <CollapsibleTrigger className="flex items-center px-3 py-1.5 text-xs font-medium bg-blueknight-50 text-blueknight-600 rounded-md hover:bg-blueknight-100 border border-blueknight-100 shadow-sm transition-colors">
                              Rationale
                              {expandedRationales.includes(buyer.id) ? (
                                <ChevronUp className="h-3 w-3 ml-1" />
                              ) : (
                                <ChevronDown className="h-3 w-3 ml-1" />
                              )}
                            </CollapsibleTrigger>
                          </Collapsible>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{buyer.location}</TableCell>
                    <TableCell>{buyer.description}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="w-10 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="bg-blueknight-500 h-2 rounded-full"
                            style={{ width: `${buyer.matchingScore}%` }}
                          />
                        </div>
                        <span className={`text-sm font-medium ${getMatchScoreColor(buyer.matchingScore)}`}>
                          {buyer.matchingScore}%
                        </span>
                      </div>
                    </TableCell>
                    {activeTab === 'strategic' ? (
                      <TableCell>{(buyer as any).sector}</TableCell>
                    ) : (
                      <>
                        <TableCell>${(buyer as any).aum}M</TableCell>
                        <TableCell>{(buyer as any).investments}</TableCell>
                      </>
                    )}
                  </TableRow>
                  
                  {expandedRationales.includes(buyer.id) && (
                    <TableRow>
                      <TableCell colSpan={activeTab === 'strategic' ? 6 : 7} className="p-0">
                        <div className="p-4 bg-blue-50 border border-blue-100 m-2 rounded-md">
                          <div className="mb-2 flex items-center">
                            <span className={`text-sm font-medium ${getMatchScoreColor(buyer.rationale.score)} mr-2`}>
                              {buyer.rationale.score}%
                            </span>
                            <span className="text-sm font-medium text-blue-700">Overall Rationale</span>
                          </div>
                          <p className="text-sm text-gray-700">{buyer.rationale.text}</p>
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

export default SavedList;
