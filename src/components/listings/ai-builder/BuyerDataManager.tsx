import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Download, FileSpreadsheet, AlertCircle, Info } from 'lucide-react';
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

  // Comprehensive template headers with clear descriptions
  const templateHeaders = [
    // Basic Company Information
    'buyer_name',                    // Company or fund name
    'buyer_type',                    // strategic | pe
    'description',                   // Short company description (1-2 sentences)
    'long_description',              // Detailed company description (paragraph)
    'website',                       // Company website URL
    
    // Location & Geographic Data
    'hq',                           // Headquarters location (City, State/Country)
    'location',                     // Primary location or region
    'geography',                    // Geographic focus areas (comma-separated)
    
    // Financial Information
    'employees',                    // Number of employees (integer)
    'revenue',                      // Annual revenue in USD (number)
    'cash',                         // Available cash/capital in USD (number)
    'aum',                          // Assets under management (PE funds only)
    'ebitda',                       // EBITDA or earnings information
    
    // Business Focus & Industry
    'offering',                     // Products/services offered
    'sector',                       // Primary business sector
    'industry_focus',               // Specific industry focus areas
    'primary_industries',           // Primary industries served (comma-separated)
    'sectors',                      // All sectors of interest (comma-separated)
    'keywords',                     // Relevant business keywords (comma-separated)
    
    // Customer Information
    'customers',                    // Description of customer base
    'target_customer_types',        // Types of customers targeted (comma-separated)
    
    // Investment & Acquisition Data
    'ma_track_record',              // M&A activity level (Very Active | Active | Moderate | Low)
    'previous_acquisitions',        // Description of past acquisitions
    'investments',                  // Investment portfolio or activity
    'investment_size',              // Typical investment/acquisition size range
    'investment_type',              // Types of investments made (comma-separated)
    'industry_preferences',         // Preferred industries for investment (comma-separated)
    
    // Company Structure
    'parent_company',               // Parent company name or "Independent"
    'is_public',                    // true | false
    'is_pe_vc_backed',             // true | false
    
    // Scoring & Analysis
    'matching_score',               // Match score (0-100)
    'overall_rationale',            // Overall fit rationale
    'offering_rationale',           // Product/service fit rationale
    'customers_rationale',          // Customer base fit rationale
    'financial_rationale',          // Financial strength rationale
    'transactions_rationale',       // M&A track record rationale
    
    // Metadata
    'reported_date',                // Date of last update (YYYY-MM-DD)
    'status'                        // active | inactive
  ];

  // Enhanced mock data with comprehensive examples
  const mockDataRows = [
    [
      // Strategic Buyer - Technology Company
      'TechCorp Solutions',
      'strategic',
      'Leading enterprise software provider specializing in cloud-based solutions for Fortune 500 companies',
      'TechCorp Solutions is a comprehensive technology solutions provider with over a decade of experience in delivering enterprise software, cloud infrastructure, and digital transformation services to Fortune 500 companies worldwide. The company has established itself as a market leader in SaaS platforms with a focus on API integration and scalable cloud architectures.',
      'https://techcorp.com',
      'San Francisco, CA',
      'United States',
      'North America, Europe, Asia-Pacific',
      '1200',
      '150000000',
      '25000000',
      '',
      '18000000',
      'Enterprise SaaS platforms, Cloud infrastructure, Digital transformation consulting, API integration services',
      'Technology',
      'Software & IT Services, Cloud Computing, Enterprise Solutions',
      'Technology, Software, IT Services, Cloud Computing',
      'Technology, Software, Cloud Computing, Enterprise, SaaS',
      'enterprise software, SaaS, cloud computing, digital transformation, API integration, scalable architecture',
      'Fortune 500 companies, Mid-market enterprises, Government agencies, Financial institutions',
      'B2B, Enterprise, Government, Financial Services',
      'Very Active',
      'Acquired CloudTech Inc (2023, $45M), DataFlow Systems (2022, $32M), SecureAPI Ltd (2021, $28M)',
      'Active acquirer of complementary technology companies with focus on cloud and enterprise solutions',
      '$25M - $150M',
      'Strategic acquisitions, Technology integrations, Talent acquisitions',
      'Software, IT Services, Cloud Computing, Cybersecurity, Data Analytics',
      'Independent',
      'true',
      'false',
      '92',
      'Excellent strategic fit with strong technology synergies and complementary market presence. The company shows exceptional alignment with our target acquisition criteria.',
      'Technology stack aligns perfectly with our platform capabilities and offers significant cross-selling opportunities',
      'Overlapping customer base in enterprise segment with proven track record of serving Fortune 500 clients',
      'Strong balance sheet with consistent revenue growth, healthy margins, and substantial cash reserves for acquisitions',
      'Proven track record of successful technology acquisitions with excellent integration capabilities and strategic vision',
      '2024-01-15',
      'active'
    ],
    [
      // Strategic Buyer - Manufacturing Company
      'Global Manufacturing Partners',
      'strategic',
      'Industrial manufacturing company specializing in automotive and aerospace precision components',
      'Global Manufacturing Partners is a leading manufacturer of precision components and assemblies for the automotive, aerospace, and industrial equipment sectors. With operations across North America and Europe, the company has built a reputation for quality, innovation, and supply chain excellence over three decades.',
      'https://globalmanufacturing.com',
      'Detroit, MI',
      'United States',
      'North America, Europe',
      '850',
      '75000000',
      '12000000',
      '',
      '8500000',
      'Precision manufacturing, Component assembly, Supply chain solutions, Quality control systems',
      'Manufacturing',
      'Automotive, Aerospace, Industrial Equipment',
      'Manufacturing, Automotive, Aerospace, Industrial',
      'Manufacturing, Industrial, Automotive, Aerospace',
      'precision manufacturing, automotive components, aerospace parts, supply chain, OEM supplier, quality control',
      'OEMs, Tier 1 suppliers, Industrial equipment manufacturers, Defense contractors',
      'B2B, Manufacturing, Industrial, Defense',
      'Moderate',
      'Acquired Precision Tools Co (2022, $15M), European Components Ltd (2020, $22M)',
      'Selective acquisitions to expand manufacturing capabilities and geographic reach',
      '$10M - $50M',
      'Strategic bolt-on acquisitions, Geographic expansion',
      'Manufacturing, Automotive, Aerospace, Industrial Equipment, Defense',
      'Independent',
      'false',
      'false',
      '78',
      'Good strategic fit for expanding manufacturing capabilities and customer base with complementary operational strengths',
      'Manufacturing processes complement our operational strengths and offer potential for operational synergies',
      'Shared customer base in automotive and industrial sectors with established relationships',
      'Solid financial performance with stable cash flows and conservative debt structure',
      'Limited but strategic acquisition history demonstrating disciplined approach to growth',
      '2024-02-20',
      'active'
    ],
    [
      // PE Fund - Mid-Market Technology Focus
      'Meridian Capital Partners',
      'pe',
      'Mid-market private equity firm focused on growth-stage technology and healthcare companies',
      'Meridian Capital Partners is a $2.5B private equity firm specializing in growth capital investments in technology, healthcare, and business services companies. The firm partners with management teams to accelerate growth through strategic initiatives, operational improvements, and add-on acquisitions.',
      'https://meridiancapital.com',
      'New York, NY',
      'United States',
      'North America, Select International',
      '45',
      '',
      '50000000',
      '2500000000',
      '',
      'Growth capital investments, Management buyouts, Add-on acquisitions, Operational improvements',
      'Private Equity',
      'Technology, Healthcare, Business Services',
      'Private Equity, Investment Management, Technology, Healthcare',
      'Private Equity, Growth Capital, Technology, Healthcare',
      'private equity, growth capital, technology investments, healthcare, business services, middle market',
      'Growth-stage companies, Profitable businesses, Market leaders, Scalable platforms',
      'Growth-stage, Profitable, B2B, Technology',
      'Very Active',
      'Portfolio: HealthTech Solutions, ServiceMax, DataAnalytics Pro, MedDevice Corp, CloudOps Inc',
      'Active in technology and healthcare sectors with 15+ portfolio companies and proven value creation track record',
      '$50M - $300M',
      'Growth capital, Management buyouts, Add-on acquisitions',
      'Technology, Healthcare, Business Services, Software, Digital Health',
      'Independent',
      'false',
      'false',
      '85',
      'Strong fit for growth capital investment with excellent market position and scalable business model',
      'Investment thesis aligns perfectly with our growth trajectory and market opportunity',
      'Target customer profile matches portfolio company synergies with potential for cross-selling',
      'Excellent financial metrics and growth potential warrant premium valuation with strong ROI prospects',
      'Proven track record in our sector with relevant portfolio companies and successful exits',
      '2024-03-10',
      'active'
    ],
    [
      // Strategic Buyer - European Industrial
      'European Industrial Group',
      'strategic',
      'Diversified industrial conglomerate with operations across Europe and emerging markets',
      'European Industrial Group is a multinational industrial corporation with diverse operations spanning manufacturing, infrastructure, and technology solutions. The company has been expanding its portfolio through strategic acquisitions to strengthen its market position across key European markets.',
      'https://europeanindustrial.de',
      'Munich, Germany',
      'Germany',
      'Europe, Middle East, Emerging Markets',
      '2500',
      '400000000',
      '80000000',
      '',
      '45000000',
      'Industrial equipment, Infrastructure solutions, Engineering services, Manufacturing systems',
      'Industrial',
      'Manufacturing, Infrastructure, Engineering',
      'Industrial, Manufacturing, Infrastructure, Engineering',
      'Industrial, Manufacturing, Infrastructure, Engineering',
      'industrial equipment, infrastructure development, engineering services, manufacturing, European markets',
      'Government agencies, Large enterprises, Infrastructure developers, Municipal authorities',
      'B2B, Government, Infrastructure, Municipal',
      'Active',
      'Acquired Nordic Engineering (2023, $65M), Infrastructure Systems SA (2022, $48M), Tech Manufacturing GmbH (2021, $35M)',
      'Strategic expansion through acquisitions across European markets with focus on infrastructure and technology',
      '$20M - $200M',
      'Strategic acquisitions, Market expansion, Technology integration',
      'Industrial Equipment, Infrastructure, Manufacturing, Engineering, Technology',
      'Publicly Traded Subsidiary',
      'true',
      'false',
      '81',
      'Strong strategic alignment for European market expansion and industrial synergies with established market presence',
      'Complementary product offerings with significant potential for cross-selling and market expansion',
      'Established relationships with similar customer segments including government and enterprise clients',
      'Strong financial position with substantial resources to support acquisition and integration activities',
      'Consistent acquisition strategy demonstrates commitment to growth and successful integration capabilities',
      '2024-01-28',
      'active'
    ],
    [
      // PE Fund - Healthcare Specialist
      'Healthcare Innovation Fund',
      'pe',
      'Specialized healthcare private equity fund focusing on medical technology and digital health',
      'Healthcare Innovation Fund is a specialized private equity firm dedicated to investing in innovative healthcare companies. With $1.2B in assets under management, the fund focuses on medical technology, digital health, and healthcare services companies that are transforming patient care and operational efficiency.',
      'https://healthinnovationfund.com',
      'Boston, MA',
      'United States',
      'North America, Europe',
      '28',
      '',
      '35000000',
      '1200000000',
      '',
      'Healthcare investments, Medical technology, Digital health solutions, Healthcare services',
      'Private Equity',
      'Healthcare, Medical Technology, Digital Health',
      'Healthcare, Private Equity, Medical Technology, Digital Health',
      'Healthcare, Investment Management, Medical Technology',
      'healthcare investing, medical technology, digital health, healthcare services, medical devices, telemedicine',
      'Healthcare providers, Medical device companies, Digital health startups, Healthcare systems',
      'Healthcare, Medical, B2B Healthcare',
      'Very Active',
      'Portfolio: MedTech Innovations, Digital Care Systems, HealthData Analytics, Surgical Robotics Inc',
      'Focused healthcare investor with 12 active portfolio companies and deep sector expertise',
      '$25M - $150M',
      'Growth capital, Management buyouts, Healthcare rollups',
      'Healthcare, Medical Technology, Digital Health, Healthcare Services, Telemedicine',
      'Independent',
      'false',
      'false',
      '88',
      'Exceptional fit for healthcare-focused investment with strong sector expertise and proven value creation',
      'Perfect alignment with fund\'s healthcare technology investment thesis and portfolio strategy',
      'Target healthcare customer base matches existing portfolio synergies with cross-selling opportunities',
      'Strong financial metrics and healthcare market dynamics support premium valuation and growth prospects',
      'Deep healthcare sector expertise with relevant portfolio companies and successful healthcare exits',
      '2024-02-14',
      'active'
    ]
  ];

  const handleDownloadTemplate = () => {
    // Create comprehensive CSV content with detailed headers and examples
    const headerRow = templateHeaders.join(',');
    const dataRows = mockDataRows.map(row => row.join(','));
    const csvContent = [headerRow, ...dataRows].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', 'comprehensive_buyer_data_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Comprehensive Template Downloaded",
      description: `CSV template with ${mockDataRows.length} detailed example records and ${templateHeaders.length} fields has been downloaded successfully.`
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
            Download Comprehensive Buyer Data Template
          </CardTitle>
          <CardDescription className="text-xs">
            Download a complete CSV template with all buyer fields, detailed column descriptions, and comprehensive sample data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-xs text-gray-600 bg-blue-50 p-4 rounded-md">
              <div className="flex items-start space-x-2 mb-2">
                <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-blue-800">Comprehensive Template includes:</strong>
                </div>
              </div>
              <ul className="mt-2 space-y-1 list-disc list-inside ml-6">
                <li><strong>{templateHeaders.length} complete fields</strong> covering all buyer data points</li>
                <li><strong>{mockDataRows.length} detailed examples</strong> including Strategic buyers and PE funds</li>
                <li><strong>Clear column headings</strong> with field descriptions for easy understanding</li>
                <li><strong>Real-world data examples</strong> from Technology, Manufacturing, Healthcare, and Industrial sectors</li>
                <li><strong>Financial data formats</strong> showing proper number formatting</li>
                <li><strong>Geographic coverage</strong> including North America, Europe, and emerging markets</li>
                <li><strong>Complete rationale examples</strong> for AI scoring and analysis</li>
              </ul>
              <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded text-amber-800">
                <strong>Note:</strong> This template includes data from all sections: BlueKnight List, AI Buyer Builder, Strategic Buyers, and PE Funds with comprehensive field coverage.
              </div>
            </div>
            <Button 
              onClick={handleDownloadTemplate}
              variant="outline"
              className="w-full"
            >
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Download Complete Buyer Data Template ({templateHeaders.length} fields)
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-sm">
            <Upload className="h-4 w-4 mr-2" />
            Upload Comprehensive Buyer Data
          </CardTitle>
          <CardDescription className="text-xs">
            Upload a CSV file with complete buyer data using the comprehensive template format
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
            <Label htmlFor="file-upload" className="text-xs">Select CSV File with Buyer Data</Label>
            <Input
              id="file-upload"
              type="file"
              accept=".csv"
              onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
              disabled={!savedSearchId}
            />
            <div className="text-xs text-gray-500">
              Supports all {templateHeaders.length} fields including financial data, rationales, and geographic information
            </div>
          </div>

          <Button 
            onClick={handleFileUpload}
            disabled={!uploadFile || uploading || !savedSearchId}
            className="w-full"
          >
            {uploading ? 'Uploading Buyer Data...' : 'Upload Complete Buyer Dataset'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default BuyerDataManager;
