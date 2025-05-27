import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Download, FileSpreadsheet, AlertCircle, Info, Table } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { createBuyerSearchResults, createSavedBuyerSearch } from '@/services/buyerSearchService';

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
  const [selectedTable, setSelectedTable] = useState<string>('buyer_search_results');

  // Define table configurations with their respective fields and sample data
  const tableConfigs = {
    buyer_search_results: {
      name: 'Buyer Search Results',
      description: 'Complete buyer data with search results and AI scoring',
      headers: [
        'buyer_name', 'buyer_type', 'description', 'long_description', 'website',
        'hq', 'location', 'geography', 'employees', 'revenue', 'cash', 'aum', 'ebitda',
        'offering', 'sector', 'industry_focus', 'primary_industries', 'sectors', 'keywords',
        'customers', 'target_customer_types', 'ma_track_record', 'previous_acquisitions',
        'investments', 'investment_size', 'investment_type', 'industry_preferences',
        'parent_company', 'is_public', 'is_pe_vc_backed', 'matching_score',
        'overall_rationale', 'offering_rationale', 'customers_rationale',
        'financial_rationale', 'transactions_rationale', 'reported_date', 'status'
      ],
      sampleData: [
        [
          'TechCorp Solutions', 'strategic',
          'Leading enterprise software provider specializing in cloud-based solutions',
          'TechCorp Solutions is a comprehensive technology solutions provider with over a decade of experience in delivering enterprise software, cloud infrastructure, and digital transformation services to Fortune 500 companies worldwide.',
          'https://techcorp.com', 'San Francisco, CA', 'United States', 'North America, Europe, Asia-Pacific',
          '1200', '150000000', '25000000', '', '18000000',
          'Enterprise SaaS platforms, Cloud infrastructure, Digital transformation consulting',
          'Technology', 'Software & IT Services', 'Technology, Software, IT Services',
          'Technology, Software, Cloud Computing', 'enterprise software, SaaS, cloud computing',
          'Fortune 500 companies, Mid-market enterprises', 'B2B, Enterprise, Government',
          'Very Active', 'Acquired CloudTech Inc (2023, $45M), DataFlow Systems (2022, $32M)',
          'Active acquirer of complementary technology companies', '$25M - $150M',
          'Strategic acquisitions, Technology integrations', 'Software, IT Services, Cloud Computing',
          'Independent', 'true', 'false', '92',
          'Excellent strategic fit with strong technology synergies',
          'Technology stack aligns perfectly with platform capabilities',
          'Overlapping customer base in enterprise segment',
          'Strong balance sheet with consistent revenue growth',
          'Proven track record of successful technology acquisitions',
          '2024-01-15', 'active'
        ]
      ]
    },
    buyers: {
      name: 'Buyers Master Database',
      description: 'Core buyer information for the master buyers database',
      headers: [
        'external_id', 'name', 'type', 'description', 'long_description', 'hq', 'location',
        'employees', 'revenue', 'cash', 'aum', 'reported_date', 'is_pe_vc_backed', 'is_public',
        'website', 'sector', 'ma_track_record', 'offering', 'sectors', 'customers',
        'industry_focus', 'status', 'primary_industries', 'keywords', 'target_customer_types',
        'parent_company', 'industry_preferences', 'investments', 'previous_acquisitions',
        'investment_type', 'geography', 'investment_size', 'ebitda', 'matching_score',
        'rationale'
      ],
      sampleData: [
        [
          'buyer_001', 'Global Manufacturing Partners', 'strategic',
          'Industrial manufacturing company specializing in automotive and aerospace',
          'Global Manufacturing Partners is a leading manufacturer of precision components and assemblies for the automotive, aerospace, and industrial equipment sectors.',
          'Detroit, MI', 'United States', '850', '75000000', '12000000', '',
          '2024-02-20', 'false', 'false', 'https://globalmanufacturing.com',
          'Manufacturing', 'Moderate', 'Precision manufacturing, Component assembly',
          'Manufacturing, Automotive, Aerospace', 'OEMs, Tier 1 suppliers, Industrial equipment manufacturers',
          'Automotive, Aerospace, Industrial Equipment', 'active',
          'Manufacturing, Automotive, Aerospace', 'precision manufacturing, automotive components',
          'B2B, Manufacturing, Industrial', 'Independent', 'Manufacturing, Automotive, Aerospace',
          'Selective acquisitions to expand manufacturing capabilities', 'Acquired Precision Tools Co (2022, $15M)',
          'Strategic bolt-on acquisitions', 'North America, Europe', '$10M - $50M',
          '8500000', '78', '{"overall": "Good strategic fit for expanding manufacturing capabilities", "offering": "Manufacturing processes complement operational strengths"}'
        ]
      ]
    },
    saved_buyers: {
      name: 'Saved Buyers List',
      description: 'List of buyers saved by users with notes and status',
      headers: [
        'project_id', 'buyer_id', 'buyer_data', 'notes', 'status'
      ],
      sampleData: [
        [
          listingId, 'buyer_001',
          '{"name": "TechCorp Solutions", "type": "strategic", "hq": "San Francisco, CA", "revenue": 150000000}',
          'High priority target - excellent technology fit', 'saved'
        ]
      ]
    },
    saved_buyers_list: {
      name: 'Saved Buyers List (Legacy)',
      description: 'Legacy saved buyers list with ranking and feedback',
      headers: [
        'project_id', 'buyer_id', 'buyer_name', 'buyer_type', 'buyer_data', 'feedback', 'rank'
      ],
      sampleData: [
        [
          listingId, 'buyer_001', 'TechCorp Solutions', 'strategic',
          '{"hq": "San Francisco, CA", "revenue": 150000000, "employees": 1200}',
          'Excellent strategic fit with strong synergies', '1'
        ]
      ]
    }
  };

  const handleDownloadTemplate = () => {
    const config = tableConfigs[selectedTable as keyof typeof tableConfigs];
    
    // Create CSV content with headers and sample data
    const headerRow = config.headers.join(',');
    const dataRows = config.sampleData.map(row => row.join(','));
    const csvContent = [headerRow, ...dataRows].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', `${selectedTable}_template.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Template Downloaded",
      description: `${config.name} template with ${config.headers.length} fields has been downloaded successfully.`
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
    if (!uploadFile) {
      toast({
        title: "Error",
        description: "Please select a file to upload.",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);

    try {
      let currentSavedSearchId = savedSearchId;

      // If no saved search is selected, create a default one
      if (!currentSavedSearchId) {
        const defaultSearchName = `Data Upload - ${new Date().toLocaleDateString()}`;
        const defaultSearch = await createSavedBuyerSearch({
          project_id: listingId,
          name: defaultSearchName,
          search_criteria: { uploadType: selectedTable }
        });
        currentSavedSearchId = defaultSearch.id!;
        
        toast({
          title: "Search Created",
          description: `Created "${defaultSearchName}" for your data upload.`
        });
      }

      const fileContent = await uploadFile.text();
      const lines = fileContent.split('\n').filter(line => line.trim());
      
      if (lines.length < 2) {
        throw new Error('CSV file must contain headers and at least one data row');
      }

      const headers = parseCSVLine(lines[0]).map(h => h.replace(/"/g, '').trim());
      const dataRows = lines.slice(1);
      const config = tableConfigs[selectedTable as keyof typeof tableConfigs];

      console.log('CSV Headers:', headers);
      console.log('Expected Headers:', config.headers);

      // Validate headers match template
      const missingHeaders = config.headers.filter(h => !headers.includes(h));
      if (missingHeaders.length > 0) {
        console.warn('Missing headers:', missingHeaders);
      }

      const buyerResults = dataRows.map((line, index) => {
        const values = parseCSVLine(line);
        const buyerData: any = {
          saved_search_id: currentSavedSearchId,
          buyer_external_id: `upload_${Date.now()}_${index}`,
        };

        // Map CSV values to buyer data structure
        headers.forEach((header, headerIndex) => {
          const value = values[headerIndex]?.replace(/"/g, '').trim();
          
          if (value && config.headers.includes(header)) {
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
        description: `Successfully uploaded ${buyerResults.length} records to ${config.name}.`
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

  const selectedConfig = tableConfigs[selectedTable as keyof typeof tableConfigs];

  return (
    <div className="space-y-6">
      {/* Table Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-sm">
            <Table className="h-4 w-4 mr-2" />
            Select Data Table
          </CardTitle>
          <CardDescription className="text-xs">
            Choose which table you want to work with and download its template
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="table-select" className="text-xs">Select Table</Label>
              <Select value={selectedTable} onValueChange={setSelectedTable}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a table" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(tableConfigs).map(([key, config]) => (
                    <SelectItem key={key} value={key}>
                      {config.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="text-xs text-gray-600 bg-blue-50 p-3 rounded-md">
              <strong>{selectedConfig.name}:</strong> {selectedConfig.description}
              <br />
              <strong>Fields:</strong> {selectedConfig.headers.length} columns
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Download Template Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-sm">
            <Download className="h-4 w-4 mr-2" />
            Download {selectedConfig.name} Template
          </CardTitle>
          <CardDescription className="text-xs">
            Download a CSV template for {selectedConfig.name.toLowerCase()} with sample data and proper column headings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-xs text-gray-600 bg-blue-50 p-4 rounded-md">
              <div className="flex items-start space-x-2 mb-2">
                <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-blue-800">Template includes:</strong>
                </div>
              </div>
              <ul className="mt-2 space-y-1 list-disc list-inside ml-6">
                <li><strong>{selectedConfig.headers.length} complete fields</strong> for {selectedConfig.name}</li>
                <li><strong>Sample data rows</strong> with realistic examples</li>
                <li><strong>Clear column headings</strong> matching database schema</li>
                <li><strong>Proper data formatting</strong> for each field type</li>
              </ul>
            </div>
            <Button 
              onClick={handleDownloadTemplate}
              variant="outline"
              className="w-full"
            >
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Download {selectedConfig.name} Template ({selectedConfig.headers.length} fields)
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-sm">
            <Upload className="h-4 w-4 mr-2" />
            Upload Data to {selectedConfig.name}
          </CardTitle>
          <CardDescription className="text-xs">
            Upload a CSV file with data for {selectedConfig.name.toLowerCase()} using the template format
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!savedSearchId && (
            <div className="flex items-center p-3 bg-blue-50 border border-blue-200 rounded-md">
              <Info className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-xs text-blue-700">
                No saved search selected. A new search will be created automatically for your upload.
              </span>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="file-upload" className="text-xs">Select CSV File for {selectedConfig.name}</Label>
            <Input
              id="file-upload"
              type="file"
              accept=".csv"
              onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
            />
            <div className="text-xs text-gray-500">
              Supports all {selectedConfig.headers.length} fields for {selectedConfig.name}
            </div>
          </div>

          <Button 
            onClick={handleFileUpload}
            disabled={!uploadFile || uploading}
            className="w-full"
          >
            {uploading ? `Uploading to ${selectedConfig.name}...` : `Upload Data to ${selectedConfig.name}`}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default BuyerDataManager;
