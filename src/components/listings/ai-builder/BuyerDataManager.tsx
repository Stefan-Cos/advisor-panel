
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Download, FileSpreadsheet, AlertCircle, Info, Table } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
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
  const [selectedTable, setSelectedTable] = useState<string>('buyers');

  // Define table configurations with their respective fields and sample data
  const tableConfigs = {
    buyers: {
      name: 'Buyers Master Database',
      description: 'Complete buyer information for the master buyers database with all fields',
      headers: [
        'external_id', 'name', 'type', 'description', 'long_description', 'hq', 'location',
        'employees', 'revenue', 'cash', 'aum', 'reported_date', 'is_pe_vc_backed', 'is_public',
        'website', 'sector', 'ma_track_record', 'offering', 'sectors', 'customers',
        'industry_focus', 'status', 'primary_industries', 'keywords', 'target_customer_types',
        'parent_company', 'industry_preferences', 'investments', 'previous_acquisitions',
        'investment_type', 'geography', 'investment_size', 'ebitda', 'matching_score',
        'rationale', 'Year Founded', 'Company PBId', 'Website Https', 'Company LinkedIn',
        'Registry Name', 'Registration Number', 'Legal Name', 'All Industries',
        'Primary Industry Code', 'Primary Industry Sector', 'Primary Industry Group',
        'Verticals', 'Ownership Status', 'Active Investors', 'Employee History',
        'Net Income', 'Net Debt', 'Fiscal Period', 'Financing Status',
        'Last Financing Date', 'Last Financing Deal Type', 'Last Update Date', 'SourceFile',
        'url', 'id_x', 'analyzed_at', 'id_y', 'long_offering', 'long_problem_solved',
        'long_use_cases', 'target_customers_description', 'summary', 'category_tag',
        'offering_tag', 'short_sentence_broad', 'short_sentence_specific',
        'categorisation_offering', 'problem_tag', 'problem_short_sentence_broad',
        'problem_short_sentence_specific', 'problem_combined', 'use_case_tag',
        'use_case_short_sentence_broad', 'use_case_short_sentence_specific',
        'use_case_combined', 'customer_tag', 'customer_short_sentence_broad',
        'customer_short_sentence_specific', 'customer_combined', 'target_functional_category',
        'target_commercial_category', 'product_service_tags', 'technology_delivery',
        'company_short_description', 'industry_category', 'describe_products_services',
        'product_service_features', 'supply_chain_role', 'target_customers_type',
        'target_customers_industries', 'Investments in the last 2 Years'
      ],
      sampleData: [
        [
          'buyer_001', 'Global Tech Solutions', 'strategic',
          'Leading technology solutions provider', 'Global Tech Solutions is a comprehensive...',
          'San Francisco, CA', 'United States', '1200', '150000000', '25000000', '',
          '2024-01-15', 'false', 'true', 'https://globaltech.com', 'Technology',
          'Very Active', 'Enterprise software solutions', 'Technology,Software', 'Fortune 500 companies',
          'Software & IT Services', 'active', 'Technology,Software,IT Services',
          'enterprise software,SaaS', 'B2B,Enterprise', 'Independent',
          'Software,IT Services', 'Active acquirer of technology companies',
          'Acquired CloudTech Inc (2023)', 'Strategic acquisitions', 'North America,Europe',
          '$25M - $150M', '18000000', '92', '{"overall": "Excellent strategic fit"}',
          '2015', 'COMP001', 'https://globaltech.com', 'https://linkedin.com/company/globaltech',
          'Global Tech Solutions LLC', 'REG123456', 'Global Tech Solutions LLC',
          'Technology,Software,Cloud Computing', 'TECH001', 'Technology', 'Software',
          'Enterprise Software,Cloud Services', 'Private', 'Series C Investors',
          '{"2023": 1200, "2022": 1100}', '12000000', '5000000', 'Q4 2023',
          'Series C Completed', '2023-06-15', 'Series C', '2024-01-15', 'upload_2024.csv',
          'https://globaltech.com/about', 'ID_X_001', '2024-01-15', 'ID_Y_001',
          'Comprehensive enterprise software platform', 'Solving workflow inefficiencies',
          'Workflow automation and data analytics', 'Mid to large enterprises',
          'Leading provider of enterprise solutions', 'Technology', 'Enterprise Software',
          'Comprehensive technology solutions', 'Specific enterprise software focus',
          'Enterprise Software Platform', 'Workflow Inefficiency', 'Streamlined workflows',
          'Automated business processes', 'Workflow automation solutions',
          'Analytics Platform', 'Advanced analytics capabilities', 'Data-driven insights',
          'Business intelligence solutions', 'Enterprise Customers', 'Fortune 500 focus',
          'Large enterprise clients', 'Enterprise customer solutions',
          'Workflow Automation', 'Business Intelligence', 'Enterprise Software,Analytics',
          'Cloud-based', 'Comprehensive enterprise software solutions', 'Technology',
          'Enterprise software and analytics platforms', 'Advanced workflow automation',
          'Software Provider', 'Enterprise,Large Corporations', 'Technology,Healthcare,Finance',
          'Acquired 3 companies in the last 2 years'
        ]
      ]
    },
    buyer_search_results: {
      name: 'Buyer Search Results',
      description: 'Search results with buyer data and AI scoring',
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
          'Leading enterprise software provider', 'Comprehensive technology solutions...',
          'https://techcorp.com', 'San Francisco, CA', 'United States', 'North America,Europe',
          '1200', '150000000', '25000000', '', '18000000',
          'Enterprise SaaS platforms', 'Technology', 'Software & IT Services',
          'Technology,Software,IT Services', 'Technology,Software', 'enterprise software,SaaS',
          'Fortune 500 companies', 'B2B,Enterprise', 'Very Active',
          'Acquired CloudTech Inc (2023)', 'Active technology acquisitions',
          '$25M - $150M', 'Strategic acquisitions', 'Software,IT Services',
          'Independent', 'true', 'false', '92',
          'Excellent strategic fit', 'Technology alignment perfect',
          'Overlapping customer base', 'Strong financial profile',
          'Proven acquisition track record', '2024-01-15', 'active'
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

      if (selectedTable === 'buyers') {
        // Upload directly to buyers table
        const buyersData = dataRows.map((line, index) => {
          const values = parseCSVLine(line);
          const buyerData: any = {};

          headers.forEach((header, headerIndex) => {
            const value = values[headerIndex]?.replace(/"/g, '').trim();
            
            if (value) {
              // Handle array fields
              if (['sectors', 'primary_industries', 'keywords', 'target_customer_types', 
                   'investment_type', 'geography', 'industry_preferences', 'product_service_tags',
                   'All Industries', 'Verticals', 'target_customers_industries'].includes(header)) {
                buyerData[header] = value.split(',').map(v => v.trim()).filter(v => v);
              }
              // Handle numeric fields
              else if (['employees', 'matching_score', 'Year Founded'].includes(header)) {
                buyerData[header] = value ? parseInt(value) : null;
              }
              // Handle decimal fields
              else if (['revenue', 'cash', 'aum', 'Net Income', 'Net Debt'].includes(header)) {
                buyerData[header] = value ? parseFloat(value) : null;
              }
              // Handle boolean fields
              else if (['is_public', 'is_pe_vc_backed'].includes(header)) {
                buyerData[header] = value.toLowerCase() === 'true';
              }
              // Handle date fields
              else if (['reported_date', 'Last Financing Date', 'Last Update Date', 'analyzed_at'].includes(header)) {
                buyerData[header] = value || null;
              }
              // Handle JSONB fields
              else if (['rationale', 'Employee History'].includes(header)) {
                try {
                  buyerData[header] = JSON.parse(value);
                } catch {
                  buyerData[header] = value;
                }
              }
              // Handle all other text fields
              else {
                buyerData[header] = value;
              }
            }
          });

          // Set required defaults
          if (!buyerData.external_id) {
            buyerData.external_id = `upload_${Date.now()}_${index}`;
          }
          if (!buyerData.name) {
            buyerData.name = 'Unknown Company';
          }
          if (!buyerData.type) {
            buyerData.type = 'strategic';
          }

          return buyerData;
        });

        console.log('Processed buyers data:', buyersData);

        // Insert into buyers table
        const { error } = await supabase
          .from('buyers')
          .insert(buyersData);

        if (error) {
          console.error('Error inserting buyers:', error);
          throw error;
        }

        toast({
          title: "Upload Successful",
          description: `Successfully uploaded ${buyersData.length} buyers to the database.`
        });

      } else {
        // Handle buyer_search_results upload
        let currentSavedSearchId = savedSearchId;

        if (!currentSavedSearchId) {
          const defaultSearchName = `Data Upload - ${new Date().toLocaleDateString()}`;
          const defaultSearch = await createSavedBuyerSearch({
            project_id: listingId,
            name: defaultSearchName,
            search_criteria: { uploadType: selectedTable }
          });
          currentSavedSearchId = defaultSearch.id!;
        }

        const buyerResults = dataRows.map((line, index) => {
          const values = parseCSVLine(line);
          const buyerData: any = {
            saved_search_id: currentSavedSearchId,
            buyer_external_id: `upload_${Date.now()}_${index}`,
          };

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

          buyerData.buyer_name = buyerData.buyer_name || 'Unknown';
          buyerData.buyer_type = buyerData.buyer_type || 'strategic';
          buyerData.status = buyerData.status || 'active';
          buyerData.matching_score = buyerData.matching_score || 0;

          return buyerData;
        });

        await createBuyerSearchResults(buyerResults);

        toast({
          title: "Upload Successful",
          description: `Successfully uploaded ${buyerResults.length} records to ${config.name}.`
        });
      }

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
          {!savedSearchId && selectedTable === 'buyer_search_results' && (
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
