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

  // Comprehensive mock data examples
  const mockDataRows = [
    [
      'TechCorp Solutions',
      'strategic',
      'San Francisco, CA',
      'United States',
      'https://techcorp.com',
      '1200',
      '150000000',
      '25000000',
      '',
      '18000000',
      'Leading enterprise software provider specializing in cloud-based solutions',
      'TechCorp Solutions is a comprehensive technology solutions provider with over a decade of experience in delivering enterprise software, cloud infrastructure, and digital transformation services to Fortune 500 companies worldwide.',
      'Enterprise SaaS platforms, Cloud infrastructure, Digital transformation consulting',
      'Technology',
      'Software & IT Services, Cloud Computing',
      'Fortune 500 companies, Mid-market enterprises, Government agencies',
      'B2B, Enterprise, Government',
      'Technology, Software, Cloud, Enterprise',
      'Technology, Software, Cloud Computing',
      'enterprise software, SaaS, cloud computing, digital transformation, API integration',
      'Very Active',
      'Acquired CloudTech Inc (2023), DataFlow Systems (2022), SecureAPI Ltd (2021)',
      'Active acquirer of complementary technology companies',
      '$25M - $150M',
      'Strategic acquisitions, Technology integrations',
      'North America, Europe, Asia-Pacific',
      'Software, IT Services, Cloud Computing, Cybersecurity',
      'Independent',
      'true',
      'false',
      '2024-01-15',
      '92',
      'Excellent strategic fit with strong technology synergies and complementary market presence',
      'Technology stack aligns perfectly with our platform capabilities',
      'Overlapping customer base in enterprise segment with cross-selling opportunities',
      'Strong balance sheet with consistent revenue growth and healthy margins',
      'Proven track record of successful technology acquisitions and integrations',
      'active'
    ],
    [
      'Global Manufacturing Partners',
      'strategic',
      'Detroit, MI',
      'United States',
      'https://globalmanufacturing.com',
      '850',
      '75000000',
      '12000000',
      '',
      '8500000',
      'Industrial manufacturing company with focus on automotive and aerospace components',
      'Global Manufacturing Partners is a leading manufacturer of precision components and assemblies for the automotive, aerospace, and industrial equipment sectors, with operations across North America and Europe.',
      'Precision manufacturing, Component assembly, Supply chain solutions',
      'Manufacturing',
      'Automotive, Aerospace, Industrial Equipment',
      'OEMs, Tier 1 suppliers, Industrial equipment manufacturers',
      'B2B, Manufacturing, Industrial',
      'Manufacturing, Automotive, Aerospace, Industrial',
      'Manufacturing, Industrial, Automotive',
      'precision manufacturing, automotive components, aerospace parts, supply chain, OEM supplier',
      'Moderate',
      'Acquired Precision Tools Co (2022), European Components Ltd (2020)',
      'Selective acquisitions to expand manufacturing capabilities',
      '$10M - $50M',
      'Strategic bolt-on acquisitions',
      'North America, Europe',
      'Manufacturing, Automotive, Aerospace, Industrial Equipment',
      'Independent',
      'false',
      'false',
      '2024-02-20',
      '78',
      'Good fit for expanding manufacturing capabilities and customer base',
      'Manufacturing processes complement our operational strengths',
      'Shared customer base in automotive and industrial sectors',
      'Solid financial performance with stable cash flows',
      'Limited but strategic acquisition history in manufacturing',
      'active'
    ],
    [
      'Meridian Capital Partners',
      'pe',
      'New York, NY',
      'United States',
      'https://meridiancapital.com',
      '45',
      '',
      '50000000',
      '2500000000',
      '',
      'Mid-market private equity firm focused on growth-stage technology and healthcare companies',
      'Meridian Capital Partners is a $2.5B private equity firm specializing in growth capital investments in technology, healthcare, and business services companies. The firm partners with management teams to accelerate growth through strategic initiatives, operational improvements, and add-on acquisitions.',
      'Growth capital, Buyout investments, Add-on acquisitions',
      'Private Equity',
      'Technology, Healthcare, Business Services',
      'Growth-stage companies, Profitable businesses, Market leaders',
      'Growth-stage, Profitable',
      'Private Equity, Growth Capital, Technology, Healthcare',
      'Private Equity, Investment Management',
      'private equity, growth capital, technology investments, healthcare, business services, middle market',
      'Very Active',
      'Portfolio: HealthTech Solutions, ServiceMax, DataAnalytics Pro, MedDevice Corp',
      'Active in technology and healthcare sectors with 15+ portfolio companies',
      '$50M - $300M',
      'Growth capital, Management buyouts, Add-on acquisitions',
      'North America, Select International',
      'Technology, Healthcare, Business Services, Software',
      'Independent',
      'false',
      'false',
      '2024-03-10',
      '85',
      'Strong fit for growth capital investment with excellent market position',
      'Investment thesis aligns with our growth trajectory and market opportunity',
      'Target customer profile matches portfolio company synergies',
      'Excellent financial metrics and growth potential warrant premium valuation',
      'Proven track record in our sector with relevant portfolio companies',
      'active'
    ],
    [
      'European Industrial Group',
      'strategic',
      'Munich, Germany',
      'Germany',
      'https://europeanindustrial.de',
      '2500',
      '400000000',
      '80000000',
      '',
      '45000000',
      'Diversified industrial conglomerate with operations across Europe and emerging markets',
      'European Industrial Group is a multinational industrial corporation with diverse operations spanning manufacturing, infrastructure, and technology solutions. The company has been expanding its portfolio through strategic acquisitions to strengthen its market position across key European markets.',
      'Industrial equipment, Infrastructure solutions, Engineering services',
      'Industrial',
      'Manufacturing, Infrastructure, Engineering',
      'Government agencies, Large enterprises, Infrastructure developers',
      'B2B, Government, Infrastructure',
      'Industrial, Manufacturing, Infrastructure, Engineering',
      'Industrial, Manufacturing, Infrastructure',
      'industrial equipment, infrastructure development, engineering services, manufacturing, European markets',
      'Active',
      'Acquired Nordic Engineering (2023), Infrastructure Systems SA (2022), Tech Manufacturing GmbH (2021)',
      'Strategic expansion through acquisitions across European markets',
      '$20M - $200M',
      'Strategic acquisitions, Market expansion',
      'Europe, Middle East, Emerging Markets',
      'Industrial Equipment, Infrastructure, Manufacturing, Engineering',
      'Publicly Traded Subsidiary',
      'true',
      'false',
      '2024-01-28',
      '81',
      'Strong strategic alignment for European market expansion and industrial synergies',
      'Complementary product offerings with potential for cross-selling',
      'Established relationships with similar customer segments',
      'Strong financial position supports acquisition and integration',
      'Consistent acquisition strategy demonstrates commitment to growth',
      'active'
    ],
    [
      'Healthcare Innovation Fund',
      'pe',
      'Boston, MA',
      'United States',
      'https://healthinnovationfund.com',
      '28',
      '',
      '35000000',
      '1200000000',
      '',
      'Specialized healthcare private equity fund focusing on medical technology and services',
      'Healthcare Innovation Fund is a specialized private equity firm dedicated to investing in innovative healthcare companies. With $1.2B in assets under management, the fund focuses on medical technology, digital health, and healthcare services companies that are transforming patient care and operational efficiency.',
      'Healthcare investments, Medical technology, Digital health solutions',
      'Private Equity',
      'Healthcare, Medical Technology, Digital Health',
      'Healthcare providers, Medical device companies, Digital health startups',
      'Healthcare, Medical',
      'Healthcare, Private Equity, Medical Technology, Digital Health',
      'Healthcare, Investment Management',
      'healthcare investing, medical technology, digital health, healthcare services, medical devices, telemedicine',
      'Very Active',
      'Portfolio: MedTech Innovations, Digital Care Systems, HealthData Analytics, Surgical Robotics Inc',
      'Focused healthcare investor with 12 active portfolio companies',
      '$25M - $150M',
      'Growth capital, Management buyouts, Healthcare rollups',
      'North America, Europe',
      'Healthcare, Medical Technology, Digital Health, Healthcare Services',
      'Independent',
      'false',
      'false',
      '2024-02-14',
      '88',
      'Exceptional fit for healthcare-focused investment with strong sector expertise',
      'Perfect alignment with fund\'s healthcare technology investment thesis',
      'Target healthcare customer base matches portfolio synergies',
      'Strong financial metrics and healthcare market dynamics support valuation',
      'Deep healthcare sector expertise with relevant portfolio companies',
      'active'
    ]
  ];

  const handleDownloadTemplate = () => {
    // Create CSV content with multiple realistic examples
    const csvContent = [
      templateHeaders.join(','),
      ...mockDataRows.map(row => row.join(','))
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', 'buyer_search_results_template_with_examples.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Template Downloaded",
      description: `CSV template with ${mockDataRows.length} example records has been downloaded successfully.`
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
            Download Template with Sample Data
          </CardTitle>
          <CardDescription className="text-xs">
            Download a CSV template with comprehensive sample data including strategic buyers and PE funds
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="text-xs text-gray-600 bg-blue-50 p-3 rounded-md">
              <strong>Template includes:</strong>
              <ul className="mt-1 space-y-1 list-disc list-inside">
                <li>{mockDataRows.length} example records (Strategic buyers & PE funds)</li>
                <li>All {templateHeaders.length} required fields with realistic data</li>
                <li>Proper formatting for upload compatibility</li>
                <li>Mix of different buyer types, industries, and geographies</li>
              </ul>
            </div>
            <Button 
              onClick={handleDownloadTemplate}
              variant="outline"
              className="w-full"
            >
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Download CSV Template with Examples
            </Button>
          </div>
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
            Upload a CSV file with buyer search results data using the template format
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
