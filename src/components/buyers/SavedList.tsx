import React, { useState } from 'react';
import { Filter, SlidersHorizontal, ChevronDown, ChevronUp, UserCircle, Tag, Plus, Check, Trash, Search } from 'lucide-react';
import BuyerCard from './BuyerCard';
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
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
import { KeywordSearch } from './BuyerTableHeader';
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BuyerTableHeader from './BuyerTableHeader';

interface SavedListProps {
  listingId: string;
}

// Mock data for saved buyers
const mockSavedBuyers = [
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
    parentCompany: 'TechGroup Holdings'
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
    longDescription: 'Global HealthTech specializes in developing electronic health record systems and clinical workflow solutions for hospitals and healthcare facilities.',
    primaryIndustries: ['Healthcare', 'Life Sciences', 'Biotechnology'],
    keywords: ['EHR', 'Clinical Workflow', 'Patient Management', 'Healthcare IT'],
    targetCustomerTypes: ['Hospitals', 'Healthcare Systems', 'Clinics', 'Medical Practices'],
    parentCompany: 'UK Health Innovations Group'
  },
  {
    id: 'buyer5',
    name: 'Healthcare Capital Partners',
    type: 'pe' as const,
    location: 'UK',
    sector: 'Medtech, Life sciences',
    offering: 'Revenue-focused software, services',
    customers: 'Pharmaceutical and life science sectors',
    maTrackRecord: 'High',
    longDescription: 'Healthcare Capital Partners is a private equity firm exclusively focused on investments in healthcare technology and services.',
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
    description: 'Healthcare focused private equity'
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

const SavedList: React.FC<SavedListProps> = ({ listingId }) => {
  const [view, setView] = useState<'tiles' | 'table'>('table');
  const [savedBuyers, setSavedBuyers] = useState<any[]>(mockSavedBuyers);
  const [expandedRationales, setExpandedRationales] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);
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
  
  const [filteredBuyers, setFilteredBuyers] = useState<any[]>(mockSavedBuyers);
  
  const toggleRationale = (buyerId: string) => {
    setExpandedRationales(prev => 
      prev.includes(buyerId) 
        ? prev.filter(id => id !== buyerId) 
        : [...prev, buyerId]
    );
  };

  const handleRemoveBuyer = (buyerId: string) => {
    setSavedBuyers(prev => prev.filter(buyer => buyer.id !== buyerId));
    toast({
      title: "Buyer Removed",
      description: "The buyer has been removed from your saved list",
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

  const handleApplyFilters = () => {
    toast({
      title: "Filters Applied",
      description: "Your search filters have been applied",
    });
    setShowFilters(false);
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

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortDirection(null);
        setSortColumn(null);
      } else {
        setSortDirection('asc');
      }
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleSearch = (field: 'offering' | 'sector' | 'customers' | 'keywords') => {
    // Update the keyword search for this field
    const existingSearchIndex = keywordSearches.findIndex(ks => ks.field === field);
    
    if (existingSearchIndex >= 0) {
      // Focus on the existing search field
      const inputElement = document.getElementById(`keyword-search-${existingSearchIndex}`);
      if (inputElement) {
        inputElement.focus();
      }
    } else {
      // Add a new search with this field
      setKeywordSearches([
        ...keywordSearches,
        { text: '', operator: 'AND', field }
      ]);
    }
  };

  // Get unique countries from the buyers list
  const uniqueCountries = Array.from(new Set(mockSavedBuyers.map(buyer => buyer.location)));

  return (
    <div className="animate-fade-in">
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Saved Buyers ({savedBuyers.length})</h3>
          
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
                            id={`keyword-search-${index}`}
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
                      onClick={resetFilters}
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
            
            <div className="flex bg-gray-100 rounded-md p-1">
              <button
                onClick={() => setView('table')}
                className={`px-3 py-1 text-sm rounded ${view === 'table' ? 'bg-white shadow-sm' : ''}`}
              >
                Table
              </button>
              <button
                onClick={() => setView('tiles')}
                className={`px-3 py-1 text-sm rounded ${view === 'tiles' ? 'bg-white shadow-sm' : ''}`}
              >
                Tiles
              </button>
            </div>
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
              </div>
              
              {/* Additional Filters Section */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Min Match Score
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
                      <SelectItem value="50">50%+</SelectItem>
                      <SelectItem value="70">70%+</SelectItem>
                      <SelectItem value="80">80%+</SelectItem>
                      <SelectItem value="90">90%+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sort By
                  </label>
                  <Select
                    value={filters.sortBy}
                    onValueChange={(value) => handleFilterChange('sortBy', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Best Match" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fit">Best Match</SelectItem>
                      <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                      <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-blueknight-500 text-white rounded-md text-sm font-medium hover:bg-blueknight-600"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
        
        {view === 'table' ? (
          <div className="relative overflow-hidden">
            <ScrollArea className="h-[400px] w-full" orientation="both">
              <div className="min-w-max">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-blueknight-500">
                      <BuyerTableHeader
                        title="Company Name"
                        width="260px"
                        sortable={true}
                        onSort={() => handleSort('name')}
                        sortDirection={sortColumn === 'name' ? sortDirection : null}
                      />
                      <BuyerTableHeader 
                        title="HQ" 
                        width="120px" 
                        sortable={true}
                        onSort={() => handleSort('location')}
                        sortDirection={sortColumn === 'location' ? sortDirection : null}
                      />
                      <BuyerTableHeader 
                        title="Offering" 
                        width="200px"
                        searchable={true}
                        onSearch={handleSearch}
                        searchField="offering"
                      />
                      <BuyerTableHeader 
                        title="Sectors" 
                        width="180px"
                        searchable={true}
                        onSearch={handleSearch}
                        searchField="sector"
                      />
                      <BuyerTableHeader 
                        title="Customer Types" 
                        width="180px"
                        searchable={true}
                        onSearch={handleSearch}
                        searchField="customers"
                      />
                      <BuyerTableHeader 
                        title="M&A Track Record" 
                        width="150px"
                        sortable={true}
                        onSort={() => handleSort('maTrackRecord')}
                        sortDirection={sortColumn === 'maTrackRecord' ? sortDirection : null}
                      />
                      <BuyerTableHeader 
                        title="Match Score" 
                        width="120px"
                        sortable={true}
                        onSort={() => handleSort('matchingScore')}
                        sortDirection={sortColumn === 'matchingScore' ? sortDirection : null}
                      />
                      <BuyerTableHeader title="Actions" width="100px" />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {savedBuyers.map((buyer) => (
                      <React.Fragment key={buyer.id}>
                        <TableRow className="hover:bg-gray-50">
                          <TableCell className="font-medium sticky left-0 z-10 bg-white">
                            <div>
                              <div>{buyer.name}</div>
                              <div className="flex items-center mt-1 gap-2">
                                <Collapsible 
                                  open={expandedRationales.includes(buyer.id)}
                                  onOpenChange={() => toggleRationale(buyer.id)}
                                >
                                  <CollapsibleTrigger className="flex items-center px-2 py-1 text-xs font-medium bg-blueknight-50 text-blueknight-500 rounded-md hover:bg-blueknight-100">
                                    Details
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
                          <TableCell>
                            <button
                              onClick={() => handleRemoveBuyer(buyer.id)}
                              className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full"
                              title="Remove from saved"
                            >
                              <Trash className="h-4 w-4" />
                            </button>
                          </TableCell>
                        </TableRow>
                        
                        {expandedRationales.includes(buyer.id) && (
                          <TableRow className="bg-gray-50">
                            <TableCell colSpan={8} className="p-0">
                              <div className="p-4">
                                <div className="mb-4 bg-white p-4 rounded-md border border-gray-200">
                                  <h3 className="text-sm font-semibold text-gray-700 mb-3 border-b pb-2">Buyer Information</h3>
                                  
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                      <h4 className="text-sm font-semibold text-gray-700 mb-1">Long Description</h4>
                                      <p className="text-sm text-gray-600">{buyer.longDescription || "Not provided"}</p>
                                    </div>
                                  
                                    <div>
                                      <h4 className="text-sm font-semibold text-gray-700 mb-1">Primary Industries</h4>
                                      <div className="flex flex-wrap gap-1 mt-1">
                                        {buyer.primaryIndustries?.map((industry: string, i: number) => (
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
                                        {buyer.keywords?.map((keyword: string, i: number) => (
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
                                  
                                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                                    <div>
                                      <h4 className="text-xs text-gray-500 mb-1">Parent Company</h4>
                                      <p className="text-sm font-medium">{buyer.parentCompany || "None/Independent"}</p>
                                    </div>
                                    <div>
                                      <h4 className="text-xs text-gray-500 mb-1">HQ</h4>
                                      <p className="text-sm font-medium">{buyer.location}</p>
                                    </div>
                                    <div>
                                      <h4 className="text-xs text-gray-500 mb-1">Employees</h4>
                                      <p className="text-sm font-medium">{buyer.employees?.toLocaleString() || "N/A"}</p>
                                    </div>
                                    <div>
                                      <h4 className="text-xs text-gray-500 mb-1">Previous Acquisitions</h4>
                                      <p className="text-sm font-medium">{buyer.previousAcquisitions || "None reported"}</p>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {savedBuyers.map((buyer) => (
              <BuyerCard 
                key={buyer.id}
                buyer={buyer}
                onRemove={() => handleRemoveBuyer(buyer.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedList;
