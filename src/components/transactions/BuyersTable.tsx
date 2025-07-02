
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Star, StarIcon } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface BuyersTableProps {
  aiConfig: {
    offeringWeight: number;
    problemSolvedWeight: number;
    useCaseWeight: number;
    customersWeight: number;
  };
}

interface TransactionBuyer {
  id: string;
  matchRank: number;
  sellerName: string;
  hq: string;
  industry: string;
  summary: string;
  strategicBuyer1: {
    name: string;
    hq: string;
    revenue: string;
    employees: number;
    offering: string;
    problemSolved: string;
    useCase: string;
    customers: string;
    deliveryOfOffering: string;
    supplyChainRole: string;
  } | null;
  peBuyers: Array<{
    name: string;
    hq: string;
    aum: string;
  }>;
  isSaved: boolean;
}

const BuyersTable: React.FC<BuyersTableProps> = ({ aiConfig }) => {
  const [transactions, setTransactions] = useState<TransactionBuyer[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  useEffect(() => {
    const loadTransactions = async () => {
      setLoading(true);
      // Simulate API call with AI config dependency
      setTimeout(() => {
        const mockTransactions: TransactionBuyer[] = [
          {
            id: '1',
            matchRank: 1,
            sellerName: 'TechCorp Solutions',
            hq: 'San Francisco, CA',
            industry: 'Software',
            summary: 'Strategic acquisition by enterprise software leader to expand CRM capabilities',
            strategicBuyer1: {
              name: 'Salesforce Inc.',
              hq: 'San Francisco, CA',
              revenue: '$31.4B',
              employees: 79000,
              offering: 'Enterprise CRM Platform',
              problemSolved: 'Customer data silos',
              useCase: 'Sales automation and analytics',
              customers: 'Enterprise businesses',
              deliveryOfOffering: 'Cloud Platform',
              supplyChainRole: 'Software Provider'
            },
            peBuyers: [
              { name: 'Vista Equity Partners', hq: 'Austin, TX', aum: '$86B' },
              { name: 'Thoma Bravo', hq: 'Chicago, IL', aum: '$114B' }
            ],
            isSaved: false
          },
          {
            id: '2',
            matchRank: 2,
            sellerName: 'DataFlow Analytics',
            hq: 'Austin, TX',
            industry: 'Data Analytics',
            summary: 'PE-backed growth acquisition to build analytics portfolio',
            strategicBuyer1: null,
            peBuyers: [
              { name: 'Insight Partners', hq: 'New York, NY', aum: '$90B' },
              { name: 'General Atlantic', hq: 'New York, NY', aum: '$73B' },
              { name: 'KKR', hq: 'New York, NY', aum: '$504B' },
              { name: 'Blackstone', hq: 'New York, NY', aum: '$1T' }
            ],
            isSaved: false
          }
        ];
        setTransactions(mockTransactions);
        setLoading(false);
      }, 1000);
    };

    loadTransactions();
  }, [aiConfig]);

  const handleSave = (transactionId: string) => {
    setTransactions(prev => 
      prev.map(t => 
        t.id === transactionId 
          ? { ...t, isSaved: !t.isSaved }
          : t
      )
    );
    
    const transaction = transactions.find(t => t.id === transactionId);
    toast({
      title: transaction?.isSaved ? "Transaction Removed" : "Transaction Saved",
      description: `${transaction?.sellerName} buyers analysis has been ${transaction?.isSaved ? 'removed from' : 'added to'} your saved list.`
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-pulse space-y-4 w-full">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <ScrollArea className="h-[600px] w-full">
        <div className="min-w-[2400px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16 sticky left-0 bg-white border-r">Rank</TableHead>
                <TableHead className="min-w-[150px]">Seller Name</TableHead>
                <TableHead className="min-w-[120px]">HQ</TableHead>
                <TableHead className="min-w-[100px]">Industry</TableHead>
                <TableHead className="min-w-[200px]">Summary</TableHead>
                <TableHead className="min-w-[150px]">Strategic Buyer 1: Name</TableHead>
                <TableHead className="min-w-[120px]">Strategic Buyer 1: HQ</TableHead>
                <TableHead className="min-w-[100px]">Strategic Buyer 1: Revenue</TableHead>
                <TableHead className="min-w-[100px]">Strategic Buyer 1: Employees</TableHead>
                <TableHead className="min-w-[150px]">Strategic Buyer 1: Offering</TableHead>
                <TableHead className="min-w-[150px]">Strategic Buyer 1: Problem Solved</TableHead>
                <TableHead className="min-w-[120px]">Strategic Buyer 1: Use Case</TableHead>
                <TableHead className="min-w-[120px]">Strategic Buyer 1: Customers</TableHead>
                <TableHead className="min-w-[120px]">Strategic Buyer 1: Delivery</TableHead>
                <TableHead className="min-w-[150px]">Strategic Buyer 1: Supply Chain Role</TableHead>
                <TableHead className="min-w-[150px]">PE Buyer 1: Name</TableHead>
                <TableHead className="min-w-[120px]">PE Buyer 1: HQ</TableHead>
                <TableHead className="min-w-[100px]">PE Buyer 1: AUM</TableHead>
                <TableHead className="min-w-[150px]">PE Buyer 2: Name</TableHead>
                <TableHead className="min-w-[120px]">PE Buyer 2: HQ</TableHead>
                <TableHead className="min-w-[100px]">PE Buyer 2: AUM</TableHead>
                <TableHead className="min-w-[150px]">PE Buyer 3: Name</TableHead>
                <TableHead className="min-w-[120px]">PE Buyer 3: HQ</TableHead>
                <TableHead className="min-w-[100px]">PE Buyer 3: AUM</TableHead>
                <TableHead className="min-w-[150px]">PE Buyer 4: Name</TableHead>
                <TableHead className="min-w-[120px]">PE Buyer 4: HQ</TableHead>
                <TableHead className="min-w-[100px]">PE Buyer 4: AUM</TableHead>
                <TableHead className="w-20 sticky right-0 bg-white border-l">Save</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium sticky left-0 bg-white border-r">#{transaction.matchRank}</TableCell>
                  <TableCell className="font-medium">{transaction.sellerName}</TableCell>
                  <TableCell>{transaction.hq}</TableCell>
                  <TableCell>{transaction.industry}</TableCell>
                  <TableCell className="max-w-[200px]">{transaction.summary}</TableCell>
                  
                  {/* Strategic Buyer 1 columns */}
                  <TableCell>{transaction.strategicBuyer1?.name || '-'}</TableCell>
                  <TableCell>{transaction.strategicBuyer1?.hq || '-'}</TableCell>
                  <TableCell>{transaction.strategicBuyer1?.revenue || '-'}</TableCell>
                  <TableCell>{transaction.strategicBuyer1?.employees || '-'}</TableCell>
                  <TableCell>{transaction.strategicBuyer1?.offering || '-'}</TableCell>
                  <TableCell>{transaction.strategicBuyer1?.problemSolved || '-'}</TableCell>
                  <TableCell>{transaction.strategicBuyer1?.useCase || '-'}</TableCell>
                  <TableCell>{transaction.strategicBuyer1?.customers || '-'}</TableCell>
                  <TableCell>{transaction.strategicBuyer1?.deliveryOfOffering || '-'}</TableCell>
                  <TableCell>{transaction.strategicBuyer1?.supplyChainRole || '-'}</TableCell>
                  
                  {/* PE Buyers columns */}
                  <TableCell>{transaction.peBuyers[0]?.name || '-'}</TableCell>
                  <TableCell>{transaction.peBuyers[0]?.hq || '-'}</TableCell>
                  <TableCell>{transaction.peBuyers[0]?.aum || '-'}</TableCell>
                  <TableCell>{transaction.peBuyers[1]?.name || '-'}</TableCell>
                  <TableCell>{transaction.peBuyers[1]?.hq || '-'}</TableCell>
                  <TableCell>{transaction.peBuyers[1]?.aum || '-'}</TableCell>
                  <TableCell>{transaction.peBuyers[2]?.name || '-'}</TableCell>
                  <TableCell>{transaction.peBuyers[2]?.hq || '-'}</TableCell>
                  <TableCell>{transaction.peBuyers[2]?.aum || '-'}</TableCell>
                  <TableCell>{transaction.peBuyers[3]?.name || '-'}</TableCell>
                  <TableCell>{transaction.peBuyers[3]?.hq || '-'}</TableCell>
                  <TableCell>{transaction.peBuyers[3]?.aum || '-'}</TableCell>
                  
                  <TableCell className="sticky right-0 bg-white border-l">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSave(transaction.id)}
                      className="p-1"
                    >
                      {transaction.isSaved ? (
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ) : (
                        <StarIcon className="h-4 w-4" />
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default BuyersTable;
