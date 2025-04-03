
import React, { useState } from 'react';
import { Filter, SlidersHorizontal, Search, Mail } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

// Mock data for buyer mandates
const mockBuyerMandates = [
  {
    id: 'BUY001',
    buyerHQ: 'United States',
    buyerType: 'Strategic',
    activelyLooking: 'Yes',
    criteriaCount: 5,
    criteriaCreated: 'Jun-23',
    targetHQ: 'North America',
    targetRevenue: '$10M - $50M',
    targetEBITDA: '$2M - $8M',
    targetEV: '$15M - $60M',
    targetOffering: 'SaaS, Cloud Solutions',
    targetSectors: 'Technology, Healthcare',
    targetCustomers: 'Enterprise, SMB'
  },
  {
    id: 'BUY002',
    buyerHQ: 'United Kingdom',
    buyerType: 'PE Fund',
    activelyLooking: 'Yes',
    criteriaCount: 3,
    criteriaCreated: 'Aug-23',
    targetHQ: 'Europe',
    targetRevenue: '$25M - $100M',
    targetEBITDA: '$5M - $15M',
    targetEV: '$30M - $120M',
    targetOffering: 'Manufacturing, Distribution',
    targetSectors: 'Industrial, Consumer Goods',
    targetCustomers: 'B2B, Wholesale'
  },
  {
    id: 'BUY003',
    buyerHQ: 'Germany',
    buyerType: 'Strategic',
    activelyLooking: 'No',
    criteriaCount: 2,
    criteriaCreated: 'Nov-23',
    targetHQ: 'DACH Region',
    targetRevenue: '$15M - $75M',
    targetEBITDA: '$3M - $12M',
    targetEV: '$20M - $90M',
    targetOffering: 'Software, IT Services',
    targetSectors: 'Banking, Insurance',
    targetCustomers: 'Financial Institutions'
  },
  {
    id: 'BUY004',
    buyerHQ: 'Canada',
    buyerType: 'PE Fund',
    activelyLooking: 'Yes',
    criteriaCount: 4,
    criteriaCreated: 'Jan-24',
    targetHQ: 'North America',
    targetRevenue: '$5M - $30M',
    targetEBITDA: '$1M - $6M',
    targetEV: '$8M - $40M',
    targetOffering: 'E-commerce, Digital Marketing',
    targetSectors: 'Retail, Media',
    targetCustomers: 'Consumers, Retailers'
  },
  {
    id: 'BUY005',
    buyerHQ: 'Australia',
    buyerType: 'Strategic',
    activelyLooking: 'Yes',
    criteriaCount: 3,
    criteriaCreated: 'Feb-24',
    targetHQ: 'APAC',
    targetRevenue: '$20M - $80M',
    targetEBITDA: '$4M - $15M',
    targetEV: '$25M - $100M',
    targetOffering: 'Energy Solutions, Renewables',
    targetSectors: 'Energy, Utilities',
    targetCustomers: 'Utility Companies, Governments'
  }
];

// Boolean operator type for keyword search
type BooleanOperator = 'AND' | 'OR' | 'NOT';

// Search criteria interface for each field type
interface KeywordSearch {
  value: string;
  operator: BooleanOperator;
}

const BuyerMandates = () => {
  const [showFilters, setShowFilters] = useState(false);
  const { toast } = useToast();
  
  // Filter states
  const [hqFilter, setHqFilter] = useState<string>('');
  const [buyerTypeFilter, setBuyerTypeFilter] = useState<string>('');
  const [activelyLookingFilter, setActivelyLookingFilter] = useState<string>('');
  const [targetRevenueFilter, setTargetRevenueFilter] = useState<string>('');
  const [targetEVFilter, setTargetEVFilter] = useState<string>('');
  
  // Keyword search states for each category
  const [offeringSearches, setOfferingSearches] = useState<KeywordSearch[]>([
    { value: '', operator: 'AND' }
  ]);
  const [sectorSearches, setSectorSearches] = useState<KeywordSearch[]>([
    { value: '', operator: 'AND' }
  ]);
  const [customerSearches, setCustomerSearches] = useState<KeywordSearch[]>([
    { value: '', operator: 'AND' }
  ]);
  
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
  
  const handleContactBuyer = (buyerId: string) => {
    toast({
      title: "Contact Request Sent",
      description: `Your request to contact buyer ${buyerId} has been sent to BlueKnight`,
    });
  };
  
  // Handle keyword changes for each category
  const handleKeywordChange = (
    index: number, 
    field: keyof KeywordSearch, 
    value: string, 
    setter: React.Dispatch<React.SetStateAction<KeywordSearch[]>>,
    searches: KeywordSearch[]
  ) => {
    const updatedSearches = [...searches];
    updatedSearches[index] = {
      ...updatedSearches[index],
      [field]: value
    };
    setter(updatedSearches);
  };
  
  // Add keyword to specific category
  const addKeywordSearch = (
    setter: React.Dispatch<React.SetStateAction<KeywordSearch[]>>,
    searches: KeywordSearch[]
  ) => {
    setter([
      ...searches,
      { value: '', operator: 'AND' }
    ]);
  };
  
  // Remove keyword from specific category
  const removeKeywordSearch = (
    index: number,
    setter: React.Dispatch<React.SetStateAction<KeywordSearch[]>>,
    searches: KeywordSearch[]
  ) => {
    if (searches.length > 1) {
      const updatedSearches = searches.filter((_, i) => i !== index);
      setter(updatedSearches);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex flex-1">
        <Sidebar />
        
        <main className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-blueknight-800">Active Buyer Mandates ({mockBuyerMandates.length})</h1>
          </div>
          
          <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Buyer HQ
                    </label>
                    <select 
                      className="input-field"
                      value={hqFilter}
                      onChange={(e) => setHqFilter(e.target.value)}
                    >
                      <option value="">All Countries</option>
                      <option value="USA">USA</option>
                      <option value="UK">UK</option>
                      <option value="Germany">Germany</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Buyer Type
                    </label>
                    <select 
                      className="input-field"
                      value={buyerTypeFilter}
                      onChange={(e) => setBuyerTypeFilter(e.target.value)}
                    >
                      <option value="">Any</option>
                      <option value="Strategic">Strategic</option>
                      <option value="PE Fund">PE Fund</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Actively Looking
                    </label>
                    <select 
                      className="input-field"
                      value={activelyLookingFilter}
                      onChange={(e) => setActivelyLookingFilter(e.target.value)}
                    >
                      <option value="">Any</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Target Revenue
                    </label>
                    <select 
                      className="input-field"
                      value={targetRevenueFilter}
                      onChange={(e) => setTargetRevenueFilter(e.target.value)}
                    >
                      <option value="">Any</option>
                      <option value="<10M">Less than $10M</option>
                      <option value="10M-50M">$10M - $50M</option>
                      <option value="50M-100M">$50M - $100M</option>
                      <option value=">100M">More than $100M</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Target EV
                    </label>
                    <select 
                      className="input-field"
                      value={targetEVFilter}
                      onChange={(e) => setTargetEVFilter(e.target.value)}
                    >
                      <option value="">Any</option>
                      <option value="<20M">Less than $20M</option>
                      <option value="20M-60M">$20M - $60M</option>
                      <option value="60M-100M">$60M - $100M</option>
                      <option value=">100M">More than $100M</option>
                    </select>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center mb-3">
                    <Search className="h-4 w-4 mr-2 text-gray-700" />
                    <h3 className="text-sm font-medium text-gray-700">Keyword Search</h3>
                  </div>
                  
                  {/* Offering Keywords */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Offering
                    </label>
                    <div className="space-y-3">
                      {offeringSearches.map((search, index) => (
                        <div key={`offering-${index}`} className="flex flex-wrap items-center gap-2">
                          {index > 0 && (
                            <div className="w-20">
                              <select 
                                className="w-full p-2 text-xs border border-gray-300 rounded-md"
                                value={search.operator}
                                onChange={(e) => handleKeywordChange(index, 'operator', e.target.value as BooleanOperator, setOfferingSearches, offeringSearches)}
                              >
                                <option value="AND">AND</option>
                                <option value="OR">OR</option>
                                <option value="NOT">NOT</option>
                              </select>
                            </div>
                          )}
                          
                          <div className="flex-grow min-w-[200px]">
                            <input 
                              type="text" 
                              placeholder="Enter offering keyword..."
                              className="w-full p-2 border border-gray-300 rounded-md text-sm"
                              value={search.value}
                              onChange={(e) => handleKeywordChange(index, 'value', e.target.value, setOfferingSearches, offeringSearches)}
                            />
                          </div>
                          
                          <button 
                            onClick={() => removeKeywordSearch(index, setOfferingSearches, offeringSearches)}
                            className="p-1.5 text-red-500 hover:text-red-700 rounded-md hover:bg-red-50"
                            title="Remove"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => addKeywordSearch(setOfferingSearches, offeringSearches)}
                      className="mt-2 px-3 py-1.5 text-xs font-medium text-blueknight-600 bg-blueknight-50 rounded-md hover:bg-blueknight-100"
                    >
                      + Add offering keyword
                    </button>
                  </div>
                  
                  {/* Sectors Keywords */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Sectors
                    </label>
                    <div className="space-y-3">
                      {sectorSearches.map((search, index) => (
                        <div key={`sector-${index}`} className="flex flex-wrap items-center gap-2">
                          {index > 0 && (
                            <div className="w-20">
                              <select 
                                className="w-full p-2 text-xs border border-gray-300 rounded-md"
                                value={search.operator}
                                onChange={(e) => handleKeywordChange(index, 'operator', e.target.value as BooleanOperator, setSectorSearches, sectorSearches)}
                              >
                                <option value="AND">AND</option>
                                <option value="OR">OR</option>
                                <option value="NOT">NOT</option>
                              </select>
                            </div>
                          )}
                          
                          <div className="flex-grow min-w-[200px]">
                            <input 
                              type="text" 
                              placeholder="Enter sector keyword..."
                              className="w-full p-2 border border-gray-300 rounded-md text-sm"
                              value={search.value}
                              onChange={(e) => handleKeywordChange(index, 'value', e.target.value, setSectorSearches, sectorSearches)}
                            />
                          </div>
                          
                          <button 
                            onClick={() => removeKeywordSearch(index, setSectorSearches, sectorSearches)}
                            className="p-1.5 text-red-500 hover:text-red-700 rounded-md hover:bg-red-50"
                            title="Remove"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => addKeywordSearch(setSectorSearches, sectorSearches)}
                      className="mt-2 px-3 py-1.5 text-xs font-medium text-blueknight-600 bg-blueknight-50 rounded-md hover:bg-blueknight-100"
                    >
                      + Add sector keyword
                    </button>
                  </div>
                  
                  {/* Customers Keywords */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Customers
                    </label>
                    <div className="space-y-3">
                      {customerSearches.map((search, index) => (
                        <div key={`customer-${index}`} className="flex flex-wrap items-center gap-2">
                          {index > 0 && (
                            <div className="w-20">
                              <select 
                                className="w-full p-2 text-xs border border-gray-300 rounded-md"
                                value={search.operator}
                                onChange={(e) => handleKeywordChange(index, 'operator', e.target.value as BooleanOperator, setCustomerSearches, customerSearches)}
                              >
                                <option value="AND">AND</option>
                                <option value="OR">OR</option>
                                <option value="NOT">NOT</option>
                              </select>
                            </div>
                          )}
                          
                          <div className="flex-grow min-w-[200px]">
                            <input 
                              type="text" 
                              placeholder="Enter customer keyword..."
                              className="w-full p-2 border border-gray-300 rounded-md text-sm"
                              value={search.value}
                              onChange={(e) => handleKeywordChange(index, 'value', e.target.value, setCustomerSearches, customerSearches)}
                            />
                          </div>
                          
                          <button 
                            onClick={() => removeKeywordSearch(index, setCustomerSearches, customerSearches)}
                            className="p-1.5 text-red-500 hover:text-red-700 rounded-md hover:bg-red-50"
                            title="Remove"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => addKeywordSearch(setCustomerSearches, customerSearches)}
                      className="mt-2 px-3 py-1.5 text-xs font-medium text-blueknight-600 bg-blueknight-50 rounded-md hover:bg-blueknight-100"
                    >
                      + Add customer keyword
                    </button>
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
            
            <div className="overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-blueknight-500">
                    <TableHead className="text-white font-medium w-12"></TableHead>
                    <TableHead className="text-white font-medium">Buyer ID</TableHead>
                    <TableHead className="text-white font-medium">Buyer HQ</TableHead>
                    <TableHead className="text-white font-medium">Buyer Type</TableHead>
                    <TableHead className="text-white font-medium">Actively Looking</TableHead>
                    <TableHead className="text-white font-medium">Criteria #</TableHead>
                    <TableHead className="text-white font-medium">Criteria Created</TableHead>
                    <TableHead className="text-white font-medium">Target HQ</TableHead>
                    <TableHead className="text-white font-medium">Target Revenue</TableHead>
                    <TableHead className="text-white font-medium">Target EBITDA</TableHead>
                    <TableHead className="text-white font-medium">Target EV</TableHead>
                    <TableHead className="text-white font-medium">Target Offering</TableHead>
                    <TableHead className="text-white font-medium">Target Sectors</TableHead>
                    <TableHead className="text-white font-medium">Target Customers</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockBuyerMandates.map((mandate) => (
                    <TableRow key={mandate.id} className="hover:bg-gray-50">
                      <TableCell className="w-12">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button className="text-blueknight-600 hover:text-blueknight-800">
                              <Mail className="h-5 w-5" />
                            </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Contact BlueKnight</AlertDialogTitle>
                              <AlertDialogDescription>
                                Have a client who might be a fit? Click below to request an introduction to the buyer through BlueKnight
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleContactBuyer(mandate.id)}>
                                Yes, Contact
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                      <TableCell className="font-medium">{mandate.id}</TableCell>
                      <TableCell>{mandate.buyerHQ}</TableCell>
                      <TableCell>{mandate.buyerType}</TableCell>
                      <TableCell>{mandate.activelyLooking}</TableCell>
                      <TableCell>{mandate.criteriaCount}</TableCell>
                      <TableCell>{mandate.criteriaCreated}</TableCell>
                      <TableCell>{mandate.targetHQ}</TableCell>
                      <TableCell>{mandate.targetRevenue}</TableCell>
                      <TableCell>{mandate.targetEBITDA}</TableCell>
                      <TableCell>{mandate.targetEV}</TableCell>
                      <TableCell>{mandate.targetOffering}</TableCell>
                      <TableCell>{mandate.targetSectors}</TableCell>
                      <TableCell>{mandate.targetCustomers}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BuyerMandates;
