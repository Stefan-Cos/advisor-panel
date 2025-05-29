import React, { useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";
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
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { 
  getSavedBuyersList, 
  updateSavedBuyerRank, 
  updateSavedBuyerFeedback, 
  removeSavedBuyer,
  SavedBuyer 
} from '@/services/savedBuyersService';

interface SavedListProps {
  listingId: string;
}

const SavedList: React.FC<SavedListProps> = ({ listingId }) => {
  const [activeTab, setActiveTab] = useState<'strategic' | 'pe'>('strategic');
  const [savedBuyers, setSavedBuyers] = useState<SavedBuyer[]>([]);
  const [expandedRationales, setExpandedRationales] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sheetOpen, setSheetOpen] = useState<string | null>(null);
  const [maRecordSheetOpen, setMARecordSheetOpen] = useState<string | null>(null);
  
  // Load saved buyers from database
  const loadSavedBuyers = async () => {
    setIsLoading(true);
    try {
      const buyers = await getSavedBuyersList(listingId);
      setSavedBuyers(buyers);
    } catch (error) {
      console.error('Error loading saved buyers:', error);
      toast({
        title: "Error",
        description: "Failed to load saved buyers. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSavedBuyers();
  }, [listingId]);

  // Filter buyers by type
  const buyers = savedBuyers.filter(buyer => buyer.buyer_type === activeTab);
  
  const handleRankChange = async (id: string, rank: number | null) => {
    try {
      await updateSavedBuyerRank(id, rank);
      setSavedBuyers(prev => 
        prev.map(buyer => 
          buyer.id === id ? { ...buyer, rank } : buyer
        )
      );
    } catch (error) {
      console.error('Error updating rank:', error);
      toast({
        title: "Error",
        description: "Failed to update rank.",
        variant: "destructive"
      });
    }
  };
  
  const handleFeedbackChange = async (id: string, feedback: string) => {
    try {
      await updateSavedBuyerFeedback(id, feedback);
      setSavedBuyers(prev => 
        prev.map(buyer => 
          buyer.id === id ? { ...buyer, feedback } : buyer
        )
      );
    } catch (error) {
      console.error('Error updating feedback:', error);
      toast({
        title: "Error",
        description: "Failed to update feedback.",
        variant: "destructive"
      });
    }
  };
  
  const handleRemoveBuyer = async (id: string) => {
    try {
      await removeSavedBuyer(id);
      setSavedBuyers(prev => prev.filter(buyer => buyer.id !== id));
      toast({
        title: "Removed",
        description: "Buyer removed from saved list"
      });
    } catch (error) {
      console.error('Error removing buyer:', error);
      toast({
        title: "Error",
        description: "Failed to remove buyer.",
        variant: "destructive"
      });
    }
  };

  const toggleRationale = (buyerId: string) => {
    setExpandedRationales(prev => 
      prev.includes(buyerId) 
        ? prev.filter(id => id !== buyerId) 
        : [...prev, buyerId]
    );
  };

  const openRationaleSheet = (buyerId: string) => {
    setSheetOpen(buyerId);
  };

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
    const buyer = buyers.find(b => b.id === buyerId);
    const baseScore = buyer?.buyer_data?.matchingScore || 75;
    
    switch(section) {
      case 'offering': return Math.min(100, baseScore + 5);
      case 'customers': return Math.max(30, baseScore - 10);
      case 'transactions': return Math.min(100, baseScore + 2);
      case 'financial': return Math.max(40, baseScore - 5);
      case 'overall': return baseScore;
      default: return baseScore;
    }
  };

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

  if (isLoading) {
    return (
      <div className="animate-fade-in">
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-center py-12">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/5"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
              Strategic Buyers ({savedBuyers.filter(b => b.buyer_type === 'strategic').length})
            </button>
            <button 
              onClick={() => setActiveTab('pe')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === 'pe' 
                  ? 'bg-blueknight-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              PE Funds ({savedBuyers.filter(b => b.buyer_type === 'pe').length})
            </button>
          </div>
        </div>
        
        {buyers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No saved {activeTab === 'strategic' ? 'strategic buyers' : 'PE funds'} yet. Add buyers from the Buyer List or AI Builder.</p>
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
                    {buyers.map((buyer) => (
                      <React.Fragment key={buyer.id}>
                        <TableRow className="hover:bg-green-50 bg-green-50 text-xs">
                          <TableCell 
                            className="font-medium sticky left-0 z-10 bg-green-50"
                          >
                            <div>
                              <div>{buyer.buyer_name}</div>
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
                          <TableCell className="text-xs">{buyer.buyer_data?.location || buyer.buyer_data?.hq || 'N/A'}</TableCell>
                          {activeTab === 'strategic' ? (
                            <>
                              <TableCell className="text-xs">{buyer.buyer_data?.employees?.toLocaleString() || 'N/A'}</TableCell>
                              <TableCell className="text-xs">{buyer.buyer_data?.description || 'N/A'}</TableCell>
                              <TableCell className="text-xs">{buyer.buyer_data?.offering || 'N/A'}</TableCell>
                              <TableCell className="text-xs">
                                <div className="flex flex-wrap gap-1">
                                  {buyer.buyer_data?.primaryIndustries?.map((industry: string, i: number) => (
                                    <span key={i} className="px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded-full">
                                      {industry}
                                    </span>
                                  )) || <span>N/A</span>}
                                </div>
                              </TableCell>
                              <TableCell className="text-xs">
                                <div className="flex flex-wrap gap-1">
                                  {buyer.buyer_data?.targetCustomerTypes?.map((type: string, i: number) => (
                                    <span key={i} className="px-2 py-0.5 text-xs bg-blue-50 text-blue-700 rounded-full">
                                      {type}
                                    </span>
                                  )) || <span>N/A</span>}
                                </div>
                              </TableCell>
                              <TableCell className="text-xs">
                                <button 
                                  onClick={() => openMARecordSheet(buyer.id)}
                                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getMATrackRecordColor(buyer.buyer_data?.maTrackRecord || 'N/A')} cursor-pointer hover:opacity-90`}
                                  title="Click to view M&A history"
                                >
                                  {buyer.buyer_data?.maTrackRecord || 'N/A'}
                                  <History className="h-3 w-3 ml-1 opacity-80" />
                                </button>
                              </TableCell>
                            </>
                          ) : (
                            <>
                              <TableCell className="text-xs">{buyer.buyer_data?.description || 'N/A'}</TableCell>
                              <TableCell className="text-xs">{buyer.buyer_data?.sector || 'N/A'}</TableCell>
                              <TableCell className="text-xs">{buyer.buyer_data?.previousAcquisitions || 'N/A'}</TableCell>
                            </>
                          )}
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
                              value={buyer.feedback || ''}
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
                                  style={{ width: `${buyer.buyer_data?.matchingScore || 0}%` }}
                                />
                              </div>
                              <span className="text-xs font-medium text-blueknight-500">{buyer.buyer_data?.matchingScore || 0}%</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </ScrollArea>
          </div>
        )}
      </div>

      {/* Side Panel for Buyer Rationale - Updated to match AI Buyer Builder design */}
      {buyers.map(buyer => (
        <Sheet key={`rationale-${buyer.id}`} open={sheetOpen === buyer.id} onOpenChange={() => setSheetOpen(null)}>
          <SheetContent className="w-[500px] sm:w-[700px] md:w-[900px] lg:max-w-[1200px] p-0 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <SheetTitle className="text-lg font-semibold">
                {buyer.buyer_name} - Match Analysis
              </SheetTitle>
              <SheetDescription>
                Detailed analysis of why this buyer may be a good match for your company.
              </SheetDescription>
            </div>
            <ScrollArea className="h-[calc(100vh-140px)] pr-4">
              <div className="p-6">
                <Card className="mb-6">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium">Buyer Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Short Description</h4>
                        <p className="text-sm text-gray-600">
                          {buyer.buyer_data?.description || "Not provided"}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Long Description</h4>
                        <p className="text-sm text-gray-600">
                          {buyer.buyer_data?.longDescription || "Not provided"}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Primary Industries</h4>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {buyer.buyer_data?.primaryIndustries?.map((industry: string, i: number) => (
                            <span key={i} className="px-2.5 py-0.5 text-xs bg-gray-100 text-gray-700 rounded-full">
                              {industry}
                            </span>
                          )) || <span className="text-sm text-gray-500">Not provided</span>}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-4">
                      <div>
                        <h4 className="text-xs text-gray-500 mb-1">Parent Company</h4>
                        <p className="text-sm font-medium">{buyer.buyer_data?.parentCompany || "None/Independent"}</p>
                      </div>
                      <div>
                        <h4 className="text-xs text-gray-500 mb-1">Website</h4>
                        <p className="text-sm font-medium text-blue-500">Visit</p>
                      </div>
                      <div>
                        <h4 className="text-xs text-gray-500 mb-1">HQ</h4>
                        <p className="text-sm font-medium">{buyer.buyer_data?.location || buyer.buyer_data?.hq || 'N/A'}</p>
                      </div>
                      <div>
                        <h4 className="text-xs text-gray-500 mb-1">Employees</h4>
                        <p className="text-sm font-medium">{buyer.buyer_data?.employees?.toLocaleString() || 'N/A'}</p>
                      </div>
                      <div>
                        <h4 className="text-xs text-gray-500 mb-1">Revenue ($M)</h4>
                        <p className="text-sm font-medium">${buyer.buyer_data?.revenue?.toLocaleString() || 'N/A'}</p>
                      </div>
                      <div>
                        <h4 className="text-xs text-gray-500 mb-1">Cash ($M)</h4>
                        <p className="text-sm font-medium">${buyer.buyer_data?.cash?.toLocaleString() || 'N/A'}</p>
                      </div>
                      <div>
                        <h4 className="text-xs text-gray-500 mb-1">Reported Date</h4>
                        <p className="text-sm font-medium">
                          {buyer.buyer_data?.reportedDate ? formatReportDate(buyer.buyer_data.reportedDate) : 'N/A'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium">Acquisition Rationale</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium flex items-center">
                          <span className="text-green-600 font-medium mr-2">{getRationaleScore(buyer.id, 'offering')}%</span>
                          Offering
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
                        <div 
                          className="bg-green-500 h-1.5 rounded-full" 
                          style={{ width: `${getRationaleScore(buyer.id, 'offering')}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-700">{buyer.buyer_data?.rationale?.offering || 'No rationale provided'}</p>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium flex items-center">
                          <span className="text-indigo-600 font-medium mr-2">{getRationaleScore(buyer.id, 'overall')}%</span>
                          Overall Rationale
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
                        <div 
                          className="bg-indigo-500 h-1.5 rounded-full" 
                          style={{ width: `${getRationaleScore(buyer.id, 'overall')}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-700">{buyer.buyer_data?.rationale?.overall || 'No rationale provided'}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      ))}

      {/* Side Panel for M&A Track Record */}
      {buyers.map(buyer => (
        <Sheet key={`ma-record-${buyer.id}`} open={maRecordSheetOpen === buyer.id} onOpenChange={() => setMARecordSheetOpen(null)}>
          <SheetContent className="w-[500px] sm:w-[700px] md:w-[900px] overflow-hidden">
            <SheetHeader>
              <SheetTitle className="flex items-center text-lg font-semibold">
                {buyer.buyer_name} - M&A Track Record
              </SheetTitle>
              <SheetDescription>
                Historical merger and acquisition activity for this buyer.
              </SheetDescription>
            </SheetHeader>
            <ScrollArea className="h-[calc(100vh-140px)] pr-4 mt-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader className="border-b border-gray-200 bg-gray-50 pb-3">
                    <CardTitle className="text-base font-medium text-gray-800">Recent Transactions</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    {getMockTransactions(buyer.buyer_data?.maTrackRecord || 'Low').map(transaction => (
                      <div key={transaction.id} className="p-4 border-b border-gray-100 hover:bg-gray-50">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-gray-900">{transaction.name}</h4>
                          <span className="text-sm text-gray-500">{transaction.date}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <span className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-md">
                            {transaction.type}
                          </span>
                          <span className="px-2 py-1 text-xs bg-green-50 text-green-700 rounded-md">
                            {transaction.amount}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{transaction.description}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
};

export default SavedList;
