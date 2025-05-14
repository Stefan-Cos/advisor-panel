
import React from 'react';
import { Transaction } from './types/TransactionTypes';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface BuyerTransactionDisplayProps {
  transactions: Transaction[];
}

const BuyerTransactionDisplay: React.FC<BuyerTransactionDisplayProps> = ({ transactions }) => {
  return (
    <div className="mt-4 border border-gray-200 rounded-lg p-4 bg-white">
      <h3 className="text-lg font-medium mb-3">Transaction History</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map(transaction => (
            <TableRow key={transaction.id}>
              <TableCell className="font-medium">{transaction.name}</TableCell>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>{transaction.type}</TableCell>
              <TableCell>{transaction.amount}</TableCell>
              <TableCell>{transaction.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BuyerTransactionDisplay;
