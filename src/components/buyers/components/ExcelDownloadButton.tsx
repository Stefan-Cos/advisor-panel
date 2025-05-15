
import React from 'react';
import { FileDown } from 'lucide-react';
import { Buyer } from '../types/BuyerTypes';

interface ExcelDownloadButtonProps {
  buyers: Buyer[];
  buyerType: 'strategic' | 'pe';
}

const ExcelDownloadButton: React.FC<ExcelDownloadButtonProps> = ({ buyers, buyerType }) => {
  // We'll only download the first 50 results
  const buyersToDownload = buyers.slice(0, 50);

  const handleDownload = () => {
    // Define the headers for the CSV file
    const headers = [
      'Company Name',
      'Type',
      'Location',
      'Industry',
      'Revenue Range',
      'Match Score'
    ];

    // Map buyer data to CSV rows
    const csvRows = buyersToDownload.map(buyer => {
      return [
        buyer.name,                        // Changed from companyName to name
        buyer.type,
        buyer.hq || buyer.location || '',  // Using hq or location as fallback
        buyer.sector || (buyer.sectors && buyer.sectors.join(', ')) || '',  // Changed from industry to sector/sectors
        buyer.revenue ? `$${(buyer.revenue / 1000000).toFixed(2)}M` : 'N/A', // Format revenue as millions
        buyer.matchingScore.toString()     // Changed from matchScore to matchingScore
      ];
    });

    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...csvRows.map(row => row.join(','))
    ].join('\n');

    // Create a Blob with the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // Create a download link and trigger the download
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', `${buyerType === 'strategic' ? 'Strategic_Buyers' : 'PE_Funds'}_Top50.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleDownload}
      className="ml-auto flex items-center space-x-1 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
      title="Download as Excel"
    >
      <FileDown className="h-4 w-4" />
      <span>Export CSV</span>
    </button>
  );
};

export default ExcelDownloadButton;
