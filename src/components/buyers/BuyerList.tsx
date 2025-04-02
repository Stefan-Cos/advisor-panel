
import React, { useState } from 'react';
import { Search, Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

interface BuyerListProps {
  listingId: string;
}

// Mock buyer data for the component
interface Buyer {
  id: string;
  name: string;
  type: 'strategic' | 'pe';
  description: string;
  location: string;
  sector: string;
  employees: number;
  offering: string;
  revenue?: number;
  cash?: number;
  website?: string;
  customerTypes?: string[];
  sectors?: string[];
  matchScore: number;
  aum?: number;
  investmentSize?: string;
  revenueRange?: string;
  ebitda?: string;
  investmentTypes?: string[];
  geography?: string[];
  maTrackRecord?: 'High' | 'Medium' | 'Low';
}

// Mock data for strategic buyers
const strategicBuyers: Buyer[] = [
  {
    id: 'buyer1',
    name: 'Tech Innovations Inc.',
    type: 'strategic',
    description: 'Leading provider of technology solutions',
    location: 'USA',
    sector: 'Medtech, Life sciences',
    employees: 1500,
    offering: 'Revenue-focused software, services',
    revenue: 125.5,
    cash: 45.2,
    matchScore: 92,
    sectors: ['Medtech', 'Life sciences'],
    customerTypes: ['Pharmaceutical companies', 'Biotech', 'Healthcare providers'],
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
    offering: 'Software solutions, Consulting',
    revenue: 75.8,
    cash: 22.3,
    matchScore: 85,
    sectors: ['Healthcare', 'Technology'],
    customerTypes: ['Hospitals', 'Healthcare institutions'],
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
    offering: 'Health management platforms',
    revenue: 58.2,
    cash: 18.9,
    matchScore: 78,
    sectors: ['Medical software', 'Services'],
    customerTypes: ['Healthcare providers', 'Clinics'],
    maTrackRecord: 'Low'
  },
  {
    id: 'buyer4',
    name: 'BioTech Ventures',
    type: 'strategic',
    description: 'Biotechnology research company',
    location: 'Canada',
    sector: 'Biotechnology, Research',
    employees: 420,
    offering: 'Data analytics, Clinical solutions',
    revenue: 34.1,
    cash: 12.6,
    matchScore: 72,
    sectors: ['Biotechnology', 'Research'],
    customerTypes: ['Pharmaceutical companies', 'Research labs'],
    maTrackRecord: 'Medium'
  }
];

// Mock data for PE funds
const peFunds: Buyer[] = [
  {
    id: 'fund1',
    name: 'Healthcare Capital Partners',
    type: 'pe',
    description: 'Healthcare focused private equity',
    location: 'UK',
    sector: 'Medtech, Life sciences',
    employees: 120,
    offering: 'Healthcare investment',
    aum: 350.0,
    investmentSize: '$5M - $50M',
    matchScore: 95,
    sectors: ['Medtech', 'Life sciences', 'Healthcare IT'],
    geography: ['UK', 'Europe', 'US'],
    investmentTypes: ['Growth Capital', 'Buyout'],
    maTrackRecord: 'High'
  },
  {
    id: 'fund2',
    name: 'Medtech Growth Fund',
    type: 'pe',
    description: 'Medtech focused venture capital',
    location: 'USA',
    sector: 'Healthcare technology, Digital health',
    employees: 85,
    offering: 'Expansion funding',
    aum: 220.0,
    investmentSize: '$10M - $80M',
    matchScore: 88,
    sectors: ['Healthcare technology', 'Digital health'],
    geography: ['USA', 'Canada'],
    investmentTypes: ['Growth equity', 'Minority investment'],
    maTrackRecord: 'Medium'
  },
  {
    id: 'fund3',
    name: 'Digital Health Ventures',
    type: 'pe',
    description: 'Digital health focused investors',
    location: 'Germany',
    sector: 'Healthcare, Technology',
    employees: 65,
    offering: 'Early stage investment',
    aum: 180.0,
    investmentSize: '$2M - $25M',
    matchScore: 82,
    sectors: ['Healthcare', 'Technology'],
    geography: ['Germany', 'EU'],
    investmentTypes: ['Early stage', 'Series A/B'],
    maTrackRecord: 'Medium'
  }
];

const BuyerList: React.FC<BuyerListProps> = ({ listingId }) => {
  const [searchText, setSearchText] = useState('');
  const [filteredStrategicBuyers, setFilteredStrategicBuyers] = useState(strategicBuyers);
  const [filteredPEFunds, setFilteredPEFunds] = useState(peFunds);
  const [locationFilter, setLocationFilter] = useState<string>('');
  const [employeesFilter, setEmployeesFilter] = useState<string>('');
  const [matchScoreFilter, setMatchScoreFilter] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  const { toast } = useToast();
  
  const handleSaveBuyer = (buyer: Buyer) => {
    toast({
      title: "Buyer Saved",
      description: `${buyer.name} has been added to your saved list`,
    });
  };
  
  const resetStrategicFilters = () => {
    setSearchText('');
    setLocationFilter('');
    setEmployeesFilter('');
    setMatchScoreFilter('');
    setFilteredStrategicBuyers(strategicBuyers);
  };
  
  const applyStrategicFilters = () => {
    let filtered = strategicBuyers;
    
    // Apply company name search
    if (searchText) {
      filtered = filtered.filter(buyer => 
        buyer.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    
    // Apply location filter
    if (locationFilter) {
      filtered = filtered.filter(buyer => buyer.location === locationFilter);
    }
    
    // Apply employees filter
    if (employeesFilter) {
      switch(employeesFilter) {
        case 'lt500':
          filtered = filtered.filter(buyer => buyer.employees < 500);
          break;
        case '500-1000':
          filtered = filtered.filter(buyer => buyer.employees >= 500 && buyer.employees <= 1000);
          break;
        case 'gt1000':
          filtered = filtered.filter(buyer => buyer.employees > 1000);
          break;
      }
    }
    
    // Apply match score filter
    if (matchScoreFilter) {
      switch(matchScoreFilter) {
        case 'lt70':
          filtered = filtered.filter(buyer => buyer.matchScore < 70);
          break;
        case '70-85':
          filtered = filtered.filter(buyer => buyer.matchScore >= 70 && buyer.matchScore <= 85);
          break;
        case 'gt85':
          filtered = filtered.filter(buyer => buyer.matchScore > 85);
          break;
      }
    }
    
    setFilteredStrategicBuyers(filtered);
  };

  // Get unique locations for filter options
  const uniqueLocations = Array.from(new Set(strategicBuyers.map(buyer => buyer.location)));
  
  const getMATrackRecordColor = (record?: string) => {
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
      <Tabs defaultValue="strategic" className="w-full">
        <TabsList className="inline-flex h-10 items-center rounded-md p-1 text-blueknight-900 bg-white shadow-sm border border-gray-200 mb-4">
          <TabsTrigger 
            value="strategic" 
            className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-4 py-2 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blueknight-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-blueknight-500 data-[state=active]:text-white data-[state=active]:shadow-sm"
          >
            Strategic Buyers
          </TabsTrigger>
          <TabsTrigger 
            value="pe" 
            className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-4 py-2 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blueknight-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-blueknight-500 data-[state=active]:text-white data-[state=active]:shadow-sm"
          >
            PE Funds
          </TabsTrigger>
        </TabsList>
        
        {/* Strategic Buyers Table */}
        <TabsContent value="strategic" className="mt-2">
          <Card className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="relative w-72">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search company name..."
                  className="pl-9 pr-4"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && applyStrategicFilters()}
                />
              </div>
              
              <div className="flex gap-2">
                <Popover open={showFilters} onOpenChange={setShowFilters}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-1">
                      <Filter className="h-4 w-4 mr-1" />
                      Filters
                      {(locationFilter || employeesFilter || matchScoreFilter) && (
                        <Badge variant="secondary" className="ml-1 bg-blueknight-100 text-blueknight-700">
                          {[locationFilter, employeesFilter, matchScoreFilter].filter(Boolean).length}
                        </Badge>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-4">
                      <h3 className="font-medium">Filter Buyers</h3>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Location</label>
                        <Select value={locationFilter} onValueChange={setLocationFilter}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">All locations</SelectItem>
                            {uniqueLocations.map(location => (
                              <SelectItem key={location} value={location}>{location}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Employees</label>
                        <Select value={employeesFilter} onValueChange={setEmployeesFilter}>
                          <SelectTrigger>
                            <SelectValue placeholder="Number of employees" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">Any size</SelectItem>
                            <SelectItem value="lt500">Less than 500</SelectItem>
                            <SelectItem value="500-1000">500 - 1000</SelectItem>
                            <SelectItem value="gt1000">More than 1000</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Match Score</label>
                        <Select value={matchScoreFilter} onValueChange={setMatchScoreFilter}>
                          <SelectTrigger>
                            <SelectValue placeholder="Match score" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">Any score</SelectItem>
                            <SelectItem value="gt85">High (&gt; 85%)</SelectItem>
                            <SelectItem value="70-85">Medium (70-85%)</SelectItem>
                            <SelectItem value="lt70">Low (&lt; 70%)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex justify-between pt-2">
                        <Button variant="outline" size="sm" onClick={resetStrategicFilters}>
                          Reset
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={() => {
                            applyStrategicFilters();
                            setShowFilters(false);
                          }}
                        >
                          Apply Filters
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                
                <Button
                  variant="outline"
                  onClick={applyStrategicFilters}
                  className="bg-blueknight-50 text-blueknight-700 hover:bg-blueknight-100 border-blueknight-200"
                >
                  Search
                </Button>
              </div>
            </div>
            
            <ScrollArea className="h-[600px] w-full" orientation="both">
              <div className="min-w-max">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-blueknight-500">
                      <TableHead className="text-white font-medium w-[180px] sticky left-0 z-20 bg-blueknight-500">Company Name</TableHead>
                      <TableHead className="text-white font-medium w-[120px]">HQ</TableHead>
                      <TableHead className="text-white font-medium w-[120px]">Employees</TableHead>
                      <TableHead className="text-white font-medium w-[200px]">Short Description</TableHead>
                      <TableHead className="text-white font-medium w-[250px]">Offering</TableHead>
                      <TableHead className="text-white font-medium w-[180px]">Sectors</TableHead>
                      <TableHead className="text-white font-medium w-[180px]">Customer Types</TableHead>
                      <TableHead className="text-white font-medium w-[150px]">M&A Track Record</TableHead>
                      <TableHead className="text-white font-medium w-[120px]">Match Score</TableHead>
                      <TableHead className="text-white font-medium w-[100px]">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStrategicBuyers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={10} className="h-24 text-center">
                          No buyers found with the current filters
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredStrategicBuyers.map((buyer) => (
                        <TableRow key={buyer.id} className="hover:bg-blue-50">
                          <TableCell className="font-medium sticky left-0 z-10 bg-white">
                            <div>
                              <div>{buyer.name}</div>
                            </div>
                          </TableCell>
                          <TableCell>{buyer.location}</TableCell>
                          <TableCell>{buyer.employees.toLocaleString()}</TableCell>
                          <TableCell>{buyer.description}</TableCell>
                          <TableCell>{buyer.offering}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {buyer.sectors?.map((sector, i) => (
                                <span key={i} className="px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded-full">
                                  {sector}
                                </span>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {buyer.customerTypes?.map((type, i) => (
                                <span key={i} className="px-2 py-0.5 text-xs bg-blue-50 text-blue-700 rounded-full">
                                  {type}
                                </span>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            {buyer.maTrackRecord && (
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getMATrackRecordColor(buyer.maTrackRecord)}`}>
                                {buyer.maTrackRecord}
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <div className="w-10 bg-gray-200 rounded-full h-2 mr-2">
                                <div
                                  className="bg-blueknight-500 h-2 rounded-full"
                                  style={{ width: `${buyer.matchScore}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium text-blueknight-500">{buyer.matchScore}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button
                              onClick={() => handleSaveBuyer(buyer)}
                              size="sm"
                              className="bg-green-500 hover:bg-green-600 text-white"
                            >
                              Save
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </ScrollArea>
          </Card>
        </TabsContent>
        
        {/* PE Funds Table */}
        <TabsContent value="pe" className="mt-2">
          <Card className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="relative w-72">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search fund name..."
                  className="pl-9 pr-4"
                />
              </div>
            </div>
            
            <ScrollArea className="h-[600px] w-full" orientation="both">
              <div className="min-w-max">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-blueknight-500">
                      <TableHead className="text-white font-medium w-[180px] sticky left-0 z-20 bg-blueknight-500">Fund Name</TableHead>
                      <TableHead className="text-white font-medium w-[120px]">HQ</TableHead>
                      <TableHead className="text-white font-medium w-[200px]">Short Description</TableHead>
                      <TableHead className="text-white font-medium w-[180px]">Sectors</TableHead>
                      <TableHead className="text-white font-medium w-[150px]">AUM ($M)</TableHead>
                      <TableHead className="text-white font-medium w-[150px]">Investment Size</TableHead>
                      <TableHead className="text-white font-medium w-[200px]">Geography</TableHead>
                      <TableHead className="text-white font-medium w-[150px]">M&A Track Record</TableHead>
                      <TableHead className="text-white font-medium w-[120px]">Match Score</TableHead>
                      <TableHead className="text-white font-medium w-[100px]">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPEFunds.map((fund) => (
                      <TableRow key={fund.id} className="hover:bg-blue-50">
                        <TableCell className="font-medium sticky left-0 z-10 bg-white">
                          <div>
                            <div>{fund.name}</div>
                          </div>
                        </TableCell>
                        <TableCell>{fund.location}</TableCell>
                        <TableCell>{fund.description}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {fund.sectors?.map((sector, i) => (
                              <span key={i} className="px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded-full">
                                {sector}
                              </span>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>{fund.aum}</TableCell>
                        <TableCell>{fund.investmentSize}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {fund.geography?.map((geo, i) => (
                              <span key={i} className="px-2 py-0.5 text-xs bg-purple-50 text-purple-700 rounded-full">
                                {geo}
                              </span>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          {fund.maTrackRecord && (
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getMATrackRecordColor(fund.maTrackRecord)}`}>
                              {fund.maTrackRecord}
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-10 bg-gray-200 rounded-full h-2 mr-2">
                              <div
                                className="bg-blueknight-500 h-2 rounded-full"
                                style={{ width: `${fund.matchScore}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium text-blueknight-500">{fund.matchScore}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() => handleSaveBuyer(fund)}
                            size="sm"
                            className="bg-green-500 hover:bg-green-600 text-white"
                          >
                            Save
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </ScrollArea>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BuyerList;
