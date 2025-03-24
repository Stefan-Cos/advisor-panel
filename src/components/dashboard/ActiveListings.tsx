
import React from 'react';
import { BarChart3 } from 'lucide-react';

interface ActiveListingsProps {
  count: number;
  month: string;
}

const ActiveListings: React.FC<ActiveListingsProps> = ({ count, month }) => {
  return (
    <div className="premium-card p-6 animate-scale-in">
      <div className="flex items-center justify-between mb-4">
        <BarChart3 className="h-6 w-6 text-blueknight-500" />
        <select 
          className="text-sm text-gray-500 bg-transparent border border-gray-200 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blueknight-400"
          defaultValue={month}
        >
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
      </div>
      <h3 className="text-lg font-medium text-gray-900">Active Listings</h3>
      <p className="text-4xl font-bold text-blueknight-500 mt-2">{count}</p>
    </div>
  );
};

export default ActiveListings;
