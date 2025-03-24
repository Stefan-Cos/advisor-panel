
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";

interface SavedListProps {
  listingId: string;
}

interface SavedBuyer {
  id: string;
  name: string;
  type: 'strategic' | 'pe';
  location: string;
  sector: string;
  rank: number | null;
  feedback: string;
}

// Sample data
const sampleStrategicBuyers: SavedBuyer[] = [
  {
    id: 'buyer1',
    name: 'Tech Innovations Inc.',
    type: 'strategic',
    location: 'USA',
    sector: 'Medtech, Life sciences',
    rank: 1,
    feedback: 'Great fit for our technology stack.'
  },
  {
    id: 'buyer2',
    name: 'Global HealthTech',
    type: 'strategic',
    location: 'UK',
    sector: 'Healthcare, Technology',
    rank: 2,
    feedback: 'Strong market presence in our target regions.'
  },
  {
    id: 'buyer3',
    name: 'MediSoft Solutions',
    type: 'strategic',
    location: 'Germany',
    sector: 'Medical software, Services',
    rank: null,
    feedback: ''
  }
];

const samplePEBuyers: SavedBuyer[] = [
  {
    id: 'buyer5',
    name: 'Healthcare Capital Partners',
    type: 'pe',
    location: 'UK',
    sector: 'Medtech, Life sciences',
    rank: 1,
    feedback: 'Good understanding of our market segment.'
  },
  {
    id: 'buyer6',
    name: 'Medtech Growth Fund',
    type: 'pe',
    location: 'USA',
    sector: 'Healthcare technology, Digital health',
    rank: null,
    feedback: ''
  }
];

const SavedList: React.FC<SavedListProps> = ({ listingId }) => {
  const [activeTab, setActiveTab] = useState<'strategic' | 'pe'>('strategic');
  const [strategicBuyers, setStrategicBuyers] = useState<SavedBuyer[]>(sampleStrategicBuyers);
  const [peBuyers, setPEBuyers] = useState<SavedBuyer[]>(samplePEBuyers);
  const { toast } = useToast();
  
  const buyers = activeTab === 'strategic' ? strategicBuyers : peBuyers;
  
  const handleRankChange = (id: string, rank: number | null) => {
    if (activeTab === 'strategic') {
      setStrategicBuyers(prev => 
        prev.map(buyer => 
          buyer.id === id ? { ...buyer, rank } : buyer
        )
      );
    } else {
      setPEBuyers(prev => 
        prev.map(buyer => 
          buyer.id === id ? { ...buyer, rank } : buyer
        )
      );
    }
  };
  
  const handleFeedbackChange = (id: string, feedback: string) => {
    if (activeTab === 'strategic') {
      setStrategicBuyers(prev => 
        prev.map(buyer => 
          buyer.id === id ? { ...buyer, feedback } : buyer
        )
      );
    } else {
      setPEBuyers(prev => 
        prev.map(buyer => 
          buyer.id === id ? { ...buyer, feedback } : buyer
        )
      );
    }
  };
  
  const handleContacting = () => {
    toast({
      title: "Feature Coming Soon",
      description: "The contacting feature will be available in a future update."
    });
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
        </div>
        
        {buyers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No saved buyers yet. Add buyers from the Buyer List.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th scope="col" className="table-header">Buyer Name</th>
                  <th scope="col" className="table-header">Location</th>
                  <th scope="col" className="table-header">Sector</th>
                  <th scope="col" className="table-header">Rank</th>
                  <th scope="col" className="table-header">Feedback</th>
                  <th scope="col" className="table-header">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {buyers.map((buyer) => (
                  <tr key={buyer.id} className="hover:bg-gray-50">
                    <td className="table-cell font-medium">{buyer.name}</td>
                    <td className="table-cell">{buyer.location}</td>
                    <td className="table-cell">{buyer.sector}</td>
                    <td className="table-cell">
                      <select
                        value={buyer.rank || ''}
                        onChange={(e) => handleRankChange(
                          buyer.id, 
                          e.target.value ? parseInt(e.target.value) : null
                        )}
                        className="block w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blueknight-400 focus:border-transparent"
                      >
                        <option value="">Not Ranked</option>
                        <option value="1">1 (Top)</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select>
                    </td>
                    <td className="table-cell">
                      <input
                        type="text"
                        value={buyer.feedback}
                        onChange={(e) => handleFeedbackChange(buyer.id, e.target.value)}
                        placeholder="Add feedback..."
                        className="block w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blueknight-400 focus:border-transparent"
                      />
                    </td>
                    <td className="table-cell">
                      <button
                        onClick={handleContacting}
                        className="px-3 py-1 text-xs font-medium text-blueknight-500 bg-blueknight-50 rounded-md hover:bg-blueknight-100"
                        title="Feature coming soon"
                      >
                        Contacting
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedList;
