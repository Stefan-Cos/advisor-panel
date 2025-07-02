
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

interface DealStatisticsTableProps {
  aiConfig: {
    offeringWeight: number;
    problemSolvedWeight: number;
    useCaseWeight: number;
    customersWeight: number;
  };
}

interface Transaction {
  id: string;
  matchRank: number;
  sellerName: string;
  hq: string;
  industry: string;
  shortDescription: string;
  offeringKeywords: string;
  offering: string;
  offeringScore: number;
  problemSolved: string;
  problemSolvedScore: number;
  useCase: string;
  useCaseScore: number;
  customers: string;
  customerType: string;
  customerIndustries: string;
  customersScore: number;
  deliveryOfOffering: string;
  supplyChainRole: string;
  dealDate: string;
  dealType: string;
  ev: string;
  revenue: string;
  employees: number;
  isSaved: boolean;
}

const DealStatisticsTable: React.FC<DealStatisticsTableProps> = ({ aiConfig }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  useEffect(() => {
    const loadTransactions = async () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        const mockTransactions: Transaction[] = [
          {
            id: '1',
            matchRank: 1,
            sellerName: 'TechCorp Solutions',
            hq: 'San Francisco, CA',
            industry: 'Software',
            shortDescription: 'Cloud-based CRM platform for SMEs',
            offeringKeywords: 'CRM, Cloud, SaaS',
            offering: 'Customer Relationship Management',
            offeringScore: 85,
            problemSolved: 'Customer data fragmentation',
            problemSolvedScore: 78,
            useCase: 'Sales automation',
            useCaseScore: 82,
            customers: 'SME businesses',
            customerType: 'B2B',
            customerIndustries: 'Technology, Services',
            customersScore: 88,
            deliveryOfOffering: 'SaaS Platform',
            supplyChainRole: 'Software Provider',
            dealDate: '2023-06-15',
            dealType: 'Acquisition',
            ev: '$125M',
            revenue: '$15M',
            employees: 85,
            isSaved: false
          },
          {
            id: '2',
            matchRank: 2,
            sellerName: 'DataFlow Analytics',
            hq: 'Austin, TX',
            industry: 'Data Analytics',
            shortDescription: 'Real-time analytics for e-commerce',
            offeringKeywords: 'Analytics, Real-time, E-commerce',
            offering: 'Business Intelligence Platform',
            offeringScore: 79,
            problemSolved: 'Lack of real-time insights',
            problemSolvedScore: 84,
            useCase: 'Performance monitoring',
            useCaseScore: 77,
            customers: 'E-commerce companies',
            customerType: 'B2B',
            customerIndustries: 'E-commerce, Retail',
            customersScore: 81,
            deliveryOfOffering: 'Cloud Platform',
            supplyChainRole: 'Analytics Provider',
            dealDate: '2023-09-22',
            dealType: 'Merger',
            ev: '$89M',
            revenue: '$12M',
            employees: 62,
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
      description: `${transaction?.sellerName} has been ${transaction?.isSaved ? 'removed from' : 'added to'} your saved list.`
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
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
        <div className="min-w-[2000px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16 sticky left-0 bg-white border-r">Rank</TableHead>
                <TableHead className="min-w-[150px]">Seller Name</TableHead>
                <TableHead className="min-w-[120px]">HQ</TableHead>
                <TableHead className="min-w-[100px]">Industry</TableHead>
                <TableHead className="min-w-[200px]">Description</TableHead>
                <TableHead className="min-w-[150px]">Keywords</TableHead>
                <TableHead className="min-w-[150px]">Offering</TableHead>
                <TableHead className="min-w-[100px]">Offering Score</TableHead>
                <TableHead className="min-w-[150px]">Problem Solved</TableHead>
                <TableHead className="min-w-[100px]">Problem Score</TableHead>
                <TableHead className="min-w-[120px]">Use Case</TableHead>
                <TableHead className="min-w-[100px]">Use Case Score</TableHead>
                <TableHead className="min-w-[120px]">Customers</TableHead>
                <TableHead className="min-w-[100px]">Customer Type</TableHead>
                <TableHead className="min-w-[150px]">Customer Industries</TableHead>
                <TableHead className="min-w-[100px]">Customer Score</TableHead>
                <TableHead className="min-w-[120px]">Delivery</TableHead>
                <TableHead className="min-w-[150px]">Supply Chain Role</TableHead>
                <TableHead className="min-w-[100px]">Deal Date</TableHead>
                <TableHead className="min-w-[100px]">Deal Type</TableHead>
                <TableHead className="min-w-[100px]">EV</TableHead>
                <TableHead className="min-w-[100px]">Revenue</TableHead>
                <TableHead className="min-w-[100px]">Employees</TableHead>
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
                  <TableCell className="max-w-[200px] truncate">{transaction.shortDescription}</TableCell>
                  <TableCell>{transaction.offeringKeywords}</TableCell>
                  <TableCell>{transaction.offering}</TableCell>
                  <TableCell>
                    <Badge className={getScoreColor(transaction.offeringScore)}>
                      {transaction.offeringScore}
                    </Badge>
                  </TableCell>
                  <TableCell>{transaction.problemSolved}</TableCell>
                  <TableCell>
                    <Badge className={getScoreColor(transaction.problemSolvedScore)}>
                      {transaction.problemSolvedScore}
                    </Badge>
                  </TableCell>
                  <TableCell>{transaction.useCase}</TableCell>
                  <TableCell>
                    <Badge className={getScoreColor(transaction.useCaseScore)}>
                      {transaction.useCaseScore}
                    </Badge>
                  </TableCell>
                  <TableCell>{transaction.customers}</TableCell>
                  <TableCell>{transaction.customerType}</TableCell>
                  <TableCell>{transaction.customerIndustries}</TableCell>
                  <TableCell>
                    <Badge className={getScoreColor(transaction.customersScore)}>
                      {transaction.customersScore}
                    </Badge>
                  </TableCell>
                  <TableCell>{transaction.deliveryOfOffering}</TableCell>
                  <TableCell>{transaction.supplyChainRole}</TableCell>
                  <TableCell>{new Date(transaction.dealDate).toLocaleDateString()}</TableCell>
                  <TableCell>{transaction.dealType}</TableCell>
                  <TableCell className="font-medium">{transaction.ev}</TableCell>
                  <TableCell>{transaction.revenue}</TableCell>
                  <TableCell>{transaction.employees}</TableCell>
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

export default DealStatisticsTable;
