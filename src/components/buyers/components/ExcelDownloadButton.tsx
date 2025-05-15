
import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Buyer } from '../types/BuyerTypes';

interface ExcelDownloadButtonProps {
  buyers: Buyer[];
  buyerType: 'strategic' | 'pe';
}

const ExcelDownloadButton: React.FC<ExcelDownloadButtonProps> = ({ buyers, buyerType }) => {
  const handleDownload = () => {
    // Only take the first 50 results
    const limitedBuyers = buyers.slice(0, 50);
    
    // Define column headers based on the table
    const headers = [
      'Match Score',
      'Company Name', 
      'HQ', 
      'Employees', 
      'Short Description', 
      'Overall Rationale',
      'M&A Track Record'
    ];
    
    // Create rows from the buyers data
    const rows = limitedBuyers.map(buyer => {
      // Extract overall rationale text safely
      const rationaleText = buyer.rationale?.overall?.text || 
                           buyer.rationale?.overall || 
                           '';
      
      return [
        buyer.matchingScore.toString(),
        buyer.name,
        buyer.location || buyer.hq || '',
        buyer.employees?.toString() || '0',
        buyer.description || '',
        typeof rationaleText === 'string' ? rationaleText : '',
        buyer.maTrackRecord || 'N/A'
      ];
    });
    
    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    ].join('\n');
    
    // Create a Blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    // Set link properties
    link.setAttribute('href', url);
    link.setAttribute('download', `${buyerType === 'strategic' ? 'Strategic_Buyers' : 'PE_Funds'}_Top50.csv`);
    
    // Append to body, trigger download, and clean up
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button 
      onClick={handleDownload}
      size="sm" 
      variant="outline" 
      className="flex items-center gap-1"
    >
      <Download className="h-4 w-4" />
      <span>Export Top 50</span>
    </Button>
  );
};

export default ExcelDownloadButton;
