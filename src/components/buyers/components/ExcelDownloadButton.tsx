
import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface ExcelDownloadButtonProps {
  buyers: any[];
  buyerType: 'strategic' | 'pe';
}

// Function to convert array to CSV string
const convertToCSV = (buyers: any[], maxCount: number = 50) => {
  // Only take the first 50 (or maxCount) buyers
  const limitedBuyers = buyers.slice(0, maxCount);
  
  // Define column headers based on buyer type
  const headers = [
    'Company Name', 
    'HQ', 
    'Employees', 
    'Revenue ($M)', 
    'Cash ($M)', 
    'Match Score (%)'
  ];
  
  let csvContent = headers.join(',') + '\n';
  
  // Add data rows
  limitedBuyers.forEach(buyer => {
    const revenue = typeof buyer.revenue === 'number' 
      ? (buyer.revenue / 1000000).toFixed(2) 
      : '0';
      
    const cash = typeof buyer.cash === 'number' 
      ? (buyer.cash / 1000000).toFixed(2) 
      : '0';
    
    const row = [
      `"${buyer.name}"`,
      `"${buyer.hq || ''}"`,
      buyer.employees || '0',
      revenue,
      cash,
      buyer.matchingScore || '0'
    ];
    
    csvContent += row.join(',') + '\n';
  });
  
  return csvContent;
};

const ExcelDownloadButton: React.FC<ExcelDownloadButtonProps> = ({ buyers, buyerType }) => {
  const handleDownload = () => {
    try {
      const csvContent = convertToCSV(buyers);
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      
      // Create a temporary link and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${buyerType === 'strategic' ? 'Strategic-Buyers' : 'PE-Funds'}-Top50.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Download Started",
        description: `Downloading top 50 ${buyerType === 'strategic' ? 'Strategic Buyers' : 'PE Funds'} as CSV`
      });
    } catch (error) {
      console.error('Download failed:', error);
      toast({
        title: "Download Failed",
        description: "There was an error generating your CSV file",
        variant: "destructive"
      });
    }
  };
  
  return (
    <Button 
      onClick={handleDownload}
      className="ml-auto"
      variant="outline"
      size="sm"
    >
      <Download className="h-4 w-4 mr-1" />
      Download CSV
    </Button>
  );
};

export default ExcelDownloadButton;
