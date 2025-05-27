
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Download, FileSpreadsheet, AlertCircle } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { createBuyerSearchResults } from '@/services/buyerSearchService';

interface BuyerDataManagerProps {
  listingId: string;
  savedSearchId?: string;
  onDataUploaded?: () => void;
}

const BuyerDataManager: React.FC<BuyerDataManagerProps> = ({
  listingId,
  savedSearchId,
  onDataUploaded
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  // Template headers for the CSV download
  const templateHeaders = [
    'buyer_name',
    'buyer_type', 
    'hq',
    'location',
    'website',
    'employees',
    'revenue',
    'cash',
    'aum',
    'ebitda',
    'description',
    'long_description',
    'offering',
    'sector',
    'industry_focus',
    'customers',
    'target_customer_types',
    'primary_industries',
    'sectors',
    'keywords',
    'ma_track_record',
    'previous_acquisitions',
    'investments',
    'investment_size',
    'investment_type',
    'geography',
    'industry_preferences',
    'parent_company',
    'is_public',
    'is_pe_vc_backed',
    'reported_date',
    'matching_score',
    'overall_rationale',
    'offering_rationale',
    'customers_rationale',
    'financial_rationale',
    'transactions_rationale',
    'status'
  ];

  const handleDownloadTemplate = () => {
    // Create sample data row
    const sampleData = [
      'Example Corp',
      'strategic',
      'New York, NY',
      'United States',
      'https://example.com',
      '500',
      '50000000',
      '10000000',
      '',
      '5000000',
      'Technology company specializing in software solutions',
      'Comprehensive technology solutions provider with focus on enterprise software',
      'Enterprise software solutions',
      'Technology',
      'Software & IT Services',
      'Enterprise businesses, mid-market companies',
      'B2B, Enterprise',
      'Technology, Software, IT Services',
      'Technology, Software',
      'enterprise software, SaaS, technology solutions',
      'High',
      'Acquired 3 companies in the last 2 years',
      'Active in technology acquisitions',
      '$10M - $100M',
      'Strategic acquisitions, Bolt-on acquisitions',
      'North America, Europe',
      'Technology, Software, IT Services',
      'Independent',
      'true',
      'false',
      '2024-01-15',
      '85',
      'Strong strategic fit with complementary technology offerings',
      'Technology offerings align well with acquisition strategy',
      'Similar customer base in enterprise segment',
      'Strong financial profile with good cash position',
      'Active acquisition history in technology sector',
      'active'
    ];

    // Create CSV content
    const csvContent = [
      templateHeaders.join(','),
      sampleData.join(',')
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', 'buyer_search_results_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Template Downloaded",
      description: "CSV template has been downloaded successfully."
    });
  };

  const parseCSVLine = (line: string): string[] => {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    result.push(current.trim());
    return result;
  };

  const handleFileUpload = async () => {
    if (!uploadFile || !savedSearchId) {
      toast({
        title: "Error",
        description: "Please select a file and ensure you have a saved search selected.",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);

    try {
      const fileContent = await uploadFile.text();
      const lines = fileContent.split('\n').filter(line => line.trim());
      
      if (lines.length < 2) {
        throw new Error('CSV file must contain headers and at least one data row');
      }

      const headers = parseCSVLine(lines[0]).map(h => h.replace(/"/g, '').trim());
      const dataRows = lines.slice(1);

      console.log('CSV Headers:', headers);
      console.log('Template Headers:', templateHeaders);

      // Validate headers match template
      const missingHeaders = templateHeaders.filter(h => !headers.includes(h));
      if (missingHeaders.length > 0) {
        console.warn('Missing headers:', missingHeaders);
      }

      const buyerResults = dataRows.map((line, index) => {
        const values = parseCSVLine(line);
        const buyerData: any = {
          saved_search_id: savedSearchId,
          buyer_external_id: `upload_${Date.now()}_${index}`,
        };

        // Map CSV values to buyer data structure
        headers.forEach((header, headerIndex) => {
          const value = values[headerIndex]?.replace(/"/g, '').trim();
          
          if (value && templateHeaders.includes(header)) {
            switch (header) {
              case 'employees':
              case 'matching_score':
                buyerData[header] = value ? parseInt(value) : null;
                break;
              case 'revenue':
              case 'cash':
              case 'aum':
                buyerData[header] = value ? parseFloat(value) : null;
                break;
              case 'is_public':
              case 'is_pe_vc_backed':
                buyerData[header] = value.toLowerCase() === 'true';
                break;
              case 'reported_date':
                buyerData[header] = value || new Date().toISOString().split('T')[0];
                break;
              default:
                buyerData[header] = value || null;
            }
          }
        });

        // Set default values for required fields
        buyerData.buyer_name = buyerData.buyer_name || 'Unknown';
        buyerData.buyer_type = buyerData.buyer_type || 'strategic';
        buyerData.status = buyerData.status || 'active';
        buyerData.matching_score = buyerData.matching_score || 0;

        return buyerData;
      });

      console.log('Processed buyer results:', buyerResults);

      // Upload to database
      await createBuyerSearchResults(buyerResults);

      toast({
        title: "Upload Successful",
        description: `Successfully uploaded ${buyerResults.length} buyer records.`
      });

      setUploadFile(null);
      onDataUploaded?.();

    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "Failed to upload file. Please check the format and try again.",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Download Template Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-sm">
            <Download className="h-4 w-4 mr-2" />
            Download Template
          </CardTitle>
          <CardDescription className="text-xs">
            Download a CSV template with the correct format for buyer data upload
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={handleDownloadTemplate}
            variant="outline"
            className="w-full"
          >
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Download CSV Template
          </Button>
        </CardContent>
      </Card>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-sm">
            <Upload className="h-4 w-4 mr-2" />
            Upload Buyer Data
          </CardTitle>
          <CardDescription className="text-xs">
            Upload a CSV file with buyer search results data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!savedSearchId && (
            <div className="flex items-center p-3 bg-amber-50 border border-amber-200 rounded-md">
              <AlertCircle className="h-4 w-4 text-amber-600 mr-2" />
              <span className="text-xs text-amber-700">
                Please save a search first before uploading data
              </span>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="file-upload" className="text-xs">Select CSV File</Label>
            <Input
              id="file-upload"
              type="file"
              accept=".csv"
              onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
              disabled={!savedSearchId}
            />
          </div>

          <Button 
            onClick={handleFileUpload}
            disabled={!uploadFile || uploading || !savedSearchId}
            className="w-full"
          >
            {uploading ? 'Uploading...' : 'Upload Buyer Data'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default BuyerDataManager;
