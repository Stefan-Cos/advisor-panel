import React, { useState } from 'react';
import { Filter, Search, SlidersHorizontal, Bot } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { strategicBuyers, peBuyers } from './data/mockBuyers';
import { SearchCriteria, BuyerTableProps } from './types/BuyerTypes';
import BuyerFilter from './components/BuyerFilter';
import KeywordSearch from './components/KeywordSearch';
import AIAssistant from './components/AIAssistant';
import BuyerRationale from './components/BuyerRationale';

const BuyerTable: React.FC<BuyerTableProps> = ({ listingId }) => {
  const [activeTab, setActiveTab] = useState<'strategic' | 'pe'>('strategic');
  const [savedBuyers, setSavedBuyers] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showKeywords, setShowKeywords] = useState(false);
  const [expandedRationales, setExpandedRationales] = useState<string[]>([]);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [showSearchForm, setShowSearchForm] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
    companyName: { keywords: [], operator: 'AND' },
    description: { keywords: [], operator: 'AND' },
    offering: { keywords: [], operator: 'AND' },
    sectors: { keywords: [], operator: 'AND' },
    customerTypes: { keywords: [], operator: 'AND' }
  });
  const [companyNameSearch, setCompanyNameSearch] = useState('');
  
  const handleAddToSaved = (buyerId: string) => {
    if (!savedBuyers.includes(buyerId)) {
      setSavedBuyers([...savedBuyers, buyerId]);
      toast("Buyer Saved", {
        description: "Buyer has been added to your saved list",
      });
    }
  };
  
  const buyers = activeTab === 'strategic' ? strategicBuyers : peBuyers;
  
  const filteredBuyers = buyers.filter(buyer => 
    buyer.name.toLowerCase().includes(companyNameSearch.toLowerCase())
  );
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
    if (showKeywords) setShowKeywords(false);
    if (showAIAssistant) setShowAIAssistant(false);
    if (showSearchForm) setShowSearchForm(false);
  };
  
  const toggleKeywords = () => {
    setShowKeywords(!showKeywords);
    if (showFilters) setShowFilters(false);
    if (showAIAssistant) setShowAIAssistant(false);
    if (showSearchForm) setShowSearchForm(false);
  };
  
  const toggleAIAssistant = () => {
    setShowAIAssistant(!showAIAssistant);
    if (showFilters) setShowFilters(false);
    if (showKeywords) setShowKeywords(false);
    if (showSearchForm) setShowSearchForm(false);
  };
  
  const toggleSearchForm = () => {
    setShowSearchForm(!showSearchForm);
    if (showFilters) setShowFilters(false);
    if (showKeywords) setShowKeywords(false);
    if (showAIAssistant) setShowAIAssistant(false);
  };
  
  const toggleRationale = (buyerId: string) => {
    setExpandedRationales(prev => 
      prev.includes(buyerId) 
        ? prev.filter(id => id !== buyerId) 
        : [...prev, buyerId]
    );
  };
  
  const handleFilterApply = () => {
    // Logic to apply filters
    setShowFilters(false);
  };

  const handleKeywordsApply = () => {
    // Logic to apply keywords
    setShowKeywords(false);
  };

  const handleSearchApply = () => {
    // Logic to apply search
    setShowSearchForm(false);
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
          
          <div className="flex space-x-3">
            <button
              onClick={toggleSearchForm}
              className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium ${
                showSearchForm 
                  ? 'bg-blueknight-500 text-white' 
                  : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
              } rounded-md`}
            >
              <Search className="h-4 w-4" />
              <span>Keyword Search</span>
            </button>
            
            <button
              onClick={toggleAIAssistant}
              className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium ${
                showAIAssistant 
                  ? 'bg-blueknight-500 text-white' 
                  : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
              } rounded-md`}
            >
              <Bot className="h-4 w-4" />
              <span>AI Assistant</span>
            </button>
            
            <button
              onClick={toggleFilters}
              className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium ${
                showFilters 
                  ? 'bg-blueknight-500 text-white' 
                  : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
              } rounded-md`}
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </button>
            
            <button
              onClick={toggleKeywords}
              className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium ${
                showKeywords
                  ? 'bg-blueknight-500 text-white' 
                  : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
              } rounded-md`}
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span>Keywords</span>
            </button>
          </div>
        </div>
        
        {showSearchForm && (
          <KeywordSearch 
            searchCriteria={searchCriteria}
            setSearchCriteria={setSearchCriteria}
            onSearchApply={handleSearchApply}
            onClose={() => setShowSearchForm(false)}
          />
        )}
        
        {showAIAssistant && (
          <AIAssistant onClose={() => setShowAIAssistant(false)} />
        )}
        
        {showFilters && (
          <BuyerFilter
            onFilterApply={handleFilterApply}
            onClose={() => setShowFilters(false)}
          />
        )}
        
        {showKeywords && (
          <div className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-700 flex items-center">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Buyer Keywords
              </h3>
              <button 
                onClick={() => setShowKeywords(false)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Search input */}
        <div className="mb-4">
          <Input
            placeholder="Search company names..."
            value={companyNameSearch}
            onChange={(e) => setCompanyNameSearch(e.target.value)}
            className="max-w-xs"
          />
        </div>
        
        <div className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>HQ</TableHead>
                <TableHead>Employees</TableHead>
                <TableHead>Revenue ($M)</TableHead>
                <TableHead>Cash ($M)</TableHead>
                <TableHead>Reported</TableHead>
                <TableHead>PE/VC Backed</TableHead>
                <TableHead>Public</TableHead>
                <TableHead>Match %</TableHead>
                <TableHead>Rationale</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBuyers.map((buyer) => (
                <TableRow key={buyer.id}>
                  <TableCell className="font-medium">{buyer.name}</TableCell>
                  <TableCell>{buyer.description}</TableCell>
                  <TableCell>{buyer.hq}</TableCell>
                  <TableCell>{buyer.employees.toLocaleString()}</TableCell>
                  <TableCell>{buyer.revenue > 0 ? buyer.revenue.toLocaleString() : 'N/A'}</TableCell>
                  <TableCell>{buyer.cash > 0 ? buyer.cash.toLocaleString() : 'N/A'}</TableCell>
                  <TableCell>{buyer.reportedDate ? buyer.reportedDate.substring(0, 7) : 'N/A'}</TableCell>
                  <TableCell>{buyer.isPEVCBacked ? 'Yes' : 'No'}</TableCell>
                  <TableCell>{buyer.isPublic ? 'Yes' : 'No'}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{buyer.matchingScore}%</span>
                      <div className="relative h-1.5 w-10 bg-gray-200 rounded-full">
                        <div
                          className="absolute top-0 left-0 h-full bg-blueknight-500 rounded-full"
                          style={{ width: `${buyer.matchingScore}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <BuyerRationale 
                      buyer={buyer} 
                      expandedRationales={expandedRationales} 
                      toggleRationale={toggleRationale} 
                    />
                  </TableCell>
                  <TableCell>
                    {!savedBuyers.includes(buyer.id) ? (
                      <button
                        onClick={() => handleAddToSaved(buyer.id)}
                        className="px-3 py-1 text-xs font-medium text-blueknight-700 bg-blueknight-50 rounded-md hover:bg-blueknight-100"
                      >
                        Save
                      </button>
                    ) : (
                      <span className="px-3 py-1 text-xs font-medium text-green-700 bg-green-50 rounded-md">
                        Saved
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default BuyerTable;
