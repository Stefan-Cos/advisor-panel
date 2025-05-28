
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
      description: 'Complete buyer information for the master buyers database with all current fields',
      headers: [
        'external_id', 'name', 'type', 'description', 'long_description', 'hq', 'location',
        'employees', 'revenue', 'cash', 'aum', 'reported_date', 'is_pe_vc_backed', 'is_public',
        'website', 'sector', 'ma_track_record', 'offering', 'sectors', 'customers',
        'industry_focus', 'status', 'primary_industries', 'keywords', 'target_customer_types',
        'parent_company', 'industry_preferences', 'investments', 'previous_acquisitions',
        'investment_type', 'geography', 'investment_size', 'ebitda', 'matching_score',
        'rationale', 'year_founded', 'employee_history', 'net_income', 'net_debt',
        'last_financing_date', 'last_update_date', 'analyzed_at', 'id_x', 'id_y',
        'investments_last_2_years', 'long_offering', 'long_problem_solved', 'long_use_cases',
        'target_customers_description', 'summary', 'category_tag', 'offering_tag',
        'short_sentence_broad', 'short_sentence_specific', 'categorisation_offering',
        'problem_tag', 'problem_short_sentence_broad', 'problem_short_sentence_specific',
        'problem_combined', 'use_case_tag', 'use_case_short_sentence_broad',
        'use_case_short_sentence_specific', 'use_case_combined', 'customer_tag',
        'customer_short_sentence_broad', 'customer_short_sentence_specific',
        'customer_combined', 'target_functional_category', 'target_commercial_category',
        'product_service_tags', 'technology_delivery', 'company_short_description',
        'industry_category', 'company_pbid', 'website_https', 'company_linkedin',
        'registry_name', 'registration_number', 'legal_name', 'all_industries',
        'primary_industry_code', 'primary_industry_sector', 'primary_industry_group',
        'verticals', 'ownership_status', 'active_investors', 'describe_products_services',
        'product_service_features', 'supply_chain_role', 'fiscal_period', 'financing_status',
        'target_customers_type_new', 'last_financing_deal_type', 'target_customers_industries',
        'source_file', 'url'
      ],
      sampleData: [
        [
          'buyer_001', 'Global Tech Solutions', 'strategic',
          'Leading technology solutions provider', 'Global Tech Solutions is a comprehensive technology platform serving enterprise clients...',
          'San Francisco, CA', 'United States', '1200', '150000000', '25000000', '0',
          '2024-01-15', 'false', 'true', 'https://globaltech.com', 'Technology',
          'Very Active', 'Enterprise software solutions', '"Technology,Software,IT Services"', 'Fortune 500 companies',
          'Software & IT Services', 'active', '"Technology,Software,IT Services"',
          '"enterprise software,SaaS,cloud computing"', '"B2B,Enterprise,Large Corporations"',
          'Independent', '"Software,IT Services,Cloud Computing"', 'Active acquirer of technology companies',
          'Acquired CloudTech Inc (2023), DataFlow Systems (2022)', '"Strategic acquisitions,Growth investments"',
          '"North America,Europe"', '$25M - $150M', '18000000', '92',
          '{"overall": "Excellent strategic fit", "offering": "Technology alignment perfect"}',
          '2015', '{"2023": 1200, "2022": 1100, "2021": 1050}', '12000000', '5000000',
          '2023-06-15', '2024-01-15', '2024-01-15', 'ID_X_001', 'ID_Y_001',
          'Acquired 3 companies in the last 2 years', 'Comprehensive enterprise software platform',
          'Solving workflow inefficiencies in large enterprises', 'Workflow automation and data analytics',
          'Mid to large enterprises seeking digital transformation', 'Leading provider of enterprise solutions',
          'Technology', 'Enterprise Software', 'Comprehensive technology solutions for enterprises',
          'Specific enterprise software focus with cloud capabilities', 'Enterprise Software Platform',
          'Workflow Inefficiency', 'Streamlined workflows for better productivity',
          'Automated business processes', 'Workflow automation solutions',
          'Analytics Platform', 'Advanced analytics capabilities', 'Data-driven insights for decision making',
          'Business intelligence solutions', 'Enterprise Customers', 'Fortune 500 focus',
          'Large enterprise clients', 'Enterprise customer solutions',
          'Workflow Automation', 'Business Intelligence', '"Enterprise Software,Analytics,Cloud Services"',
          'Cloud-based SaaS', 'Comprehensive enterprise software solutions provider', 'Technology',
          'COMP001', 'https://globaltech.com', 'https://linkedin.com/company/globaltech',
          'Global Tech Solutions LLC', 'REG123456', 'Global Tech Solutions LLC',
          '"Technology,Software,Cloud Computing,Enterprise Solutions"', 'TECH001',
          'Technology', 'Software', '"Enterprise Software,Cloud Services,Analytics"',
          'Private', 'Series C Investors', 'Enterprise software and analytics platforms',
          'Advanced workflow automation and business intelligence', 'Software Provider',
          'Q4 2023', 'Series C Completed', 'Enterprise,Large Corporations',
          'Series C', '"Technology,Healthcare,Finance"', 'upload_2024.csv',
          'https://globaltech.com/about'
        ]
      ]
    },
    buyer_search_results: {
      name: 'Buyer Search Results',
      description: 'Search results with buyer data and AI scoring for specific searches',
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
          'Leading enterprise software provider', 'Comprehensive technology solutions for modern enterprises...',
          'https://techcorp.com', 'San Francisco, CA', 'United States', 'North America,Europe',
          '1200', '150000000', '25000000', '0', '18000000',
          'Enterprise SaaS platforms', 'Technology', 'Software & IT Services',
          'Technology,Software,IT Services', 'Technology,Software', 'enterprise software,SaaS',
          'Fortune 500 companies', 'B2B,Enterprise', 'Very Active',
          'Acquired CloudTech Inc (2023)', 'Active technology acquisitions',
          '$25M - $150M', 'Strategic acquisitions', 'Software,IT Services',
          'Independent', 'true', 'false', '92',
          'Excellent strategic fit with strong technology alignment',
          'Technology platforms complement target company perfectly',
          'Significant overlap in customer base and market focus',
          'Strong financial profile with proven acquisition capability',
          'Proven track record with 5+ acquisitions in last 3 years',
          '2024-01-15', 'active'
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

  // Enhanced encoding detection and file reading
  const detectEncoding = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const buffer = event.target?.result as ArrayBuffer;
        const bytes = new Uint8Array(buffer.slice(0, 1024)); // Read first 1KB for detection
        
        // Check for BOM (Byte Order Mark)
        if (bytes.length >= 3 && bytes[0] === 0xEF && bytes[1] === 0xBB && bytes[2] === 0xBF) {
          console.log('Detected UTF-8 BOM');
          resolve('UTF-8');
          return;
        }
        
        // Check for high ASCII characters that might indicate encoding issues
        let hasHighAscii = false;
        let nullBytes = 0;
        
        for (let i = 0; i < bytes.length; i++) {
          if (bytes[i] === 0) nullBytes++;
          if (bytes[i] > 127) hasHighAscii = true;
        }
        
        // If we have null bytes, likely binary or UTF-16
        if (nullBytes > 0) {
          console.log('Detected potential UTF-16 or binary data');
          resolve('UTF-16');
          return;
        }
        
        // If high ASCII characters, might be Windows-1252 or ISO-8859-1
        if (hasHighAscii) {
          console.log('Detected high ASCII characters, using Windows-1252');
          resolve('Windows-1252');
          return;
        }
        
        // Default to UTF-8
        console.log('Defaulting to UTF-8');
        resolve('UTF-8');
      };
      reader.readAsArrayBuffer(file);
    });
  };

  // Enhanced file reading with multiple encoding attempts
  const readFileWithMultipleEncodings = async (file: File): Promise<string> => {
    const detectedEncoding = await detectEncoding(file);
    console.log('Detected encoding:', detectedEncoding);
    
    const encodingsToTry = [
      detectedEncoding,
      'UTF-8',
      'Windows-1252',
      'ISO-8859-1',
      'UTF-16'
    ].filter((encoding, index, arr) => arr.indexOf(encoding) === index); // Remove duplicates
    
    for (const encoding of encodingsToTry) {
      try {
        console.log(`Attempting to read file with encoding: ${encoding}`);
        const content = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            const result = event.target?.result as string;
            // Basic validation - check if we have reasonable content
            if (result && result.length > 0 && !result.includes('\uFFFD')) {
              resolve(result);
            } else {
              reject(new Error(`Invalid content with encoding ${encoding}`));
            }
          };
          reader.onerror = () => reject(new Error(`Failed to read with encoding ${encoding}`));
          
          if (encoding === 'UTF-16') {
            reader.readAsText(file, 'UTF-16LE');
          } else {
            reader.readAsText(file, encoding);
          }
        });
        
        console.log(`Successfully read file with encoding: ${encoding}`);
        return content;
      } catch (error) {
        console.warn(`Failed to read with encoding ${encoding}:`, error);
        continue;
      }
    }
    
    throw new Error('Could not read file with any supported encoding');
  };

  // Enhanced CSV parser with better quote and escape handling
  const parseCSVLine = (line: string): string[] => {
    const result = [];
    let current = '';
    let inQuotes = false;
    let i = 0;
    
    // Remove BOM if present
    if (line.charCodeAt(0) === 0xFEFF) {
      line = line.substring(1);
    }
    
    while (i < line.length) {
      const char = line[i];
      const nextChar = line[i + 1];
      
      if (char === '"') {
        if (inQuotes) {
          if (nextChar === '"') {
            // Escaped quote (double quotes)
            current += '"';
            i += 2;
            continue;
          } else {
            // End of quoted field
            inQuotes = false;
          }
        } else {
          // Start of quoted field
          inQuotes = true;
        }
      } else if (char === ',' && !inQuotes) {
        // Field separator found outside quotes
        result.push(current.trim());
        current = '';
      } else if ((char === '\r' || char === '\n') && !inQuotes) {
        // End of line outside quotes
        break;
      } else {
        current += char;
      }
      i++;
    }
    
    // Add the last field
    result.push(current.trim());
    return result;
  };

  // Enhanced text field sanitization with better encoding handling
  const sanitizeTextField = (value: string): string => {
    if (!value) return '';
    
    let cleaned = value.trim();
    
    // Remove BOM if present
    if (cleaned.charCodeAt(0) === 0xFEFF) {
      cleaned = cleaned.substring(1);
    }
    
    // Remove leading/trailing quotes if they wrap the entire value
    if (cleaned.startsWith('"') && cleaned.endsWith('"') && cleaned.length > 1) {
      cleaned = cleaned.slice(1, -1);
    }
    
    // Handle escaped quotes within the text
    cleaned = cleaned.replace(/""/g, '"');
    
    // Replace common encoding artifacts
    const encodingReplacements = {
      'â€™': "'", // Smart apostrophe
      'â€œ': '"', // Smart quote open
      'â€': '"',  // Smart quote close
      'â€"': '–', // En dash
      'â€"': '—', // Em dash
      'Â': '',    // Non-breaking space artifact
      '\u00A0': ' ', // Non-breaking space to regular space
      '\u2018': "'", // Left single quotation mark
      '\u2019': "'", // Right single quotation mark
      '\u201C': '"', // Left double quotation mark
      '\u201D': '"', // Right double quotation mark
      '\u2013': '–', // En dash
      '\u2014': '—', // Em dash
    };
    
    for (const [artifact, replacement] of Object.entries(encodingReplacements)) {
      cleaned = cleaned.replace(new RegExp(artifact, 'g'), replacement);
    }
    
    // Remove null bytes and other problematic control characters
    cleaned = cleaned.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
    
    // Normalize whitespace but preserve intentional line breaks
    cleaned = cleaned.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    cleaned = cleaned.replace(/[ \t]+/g, ' '); // Multiple spaces/tabs to single space
    
    // Limit field length to prevent database issues
    const maxLength = 10000;
    if (cleaned.length > maxLength) {
      cleaned = cleaned.substring(0, maxLength) + '...';
      console.warn(`Text field truncated to ${maxLength} characters`);
    }
    
    return cleaned;
  };

  // Enhanced array field parsing
  const parseArrayField = (value: string): string[] => {
    if (!value) return [];
    
    const cleaned = sanitizeTextField(value);
    
    // Try to parse as JSON array first
    try {
      if (cleaned.startsWith('[') && cleaned.endsWith(']')) {
        const parsed = JSON.parse(cleaned);
        if (Array.isArray(parsed)) {
          return parsed.map(item => String(item).trim()).filter(item => item);
        }
      }
    } catch (error) {
      console.warn('Failed to parse JSON array:', error);
    }
    
    // Parse as comma-separated values
    return cleaned
      .split(',')
      .map(item => item.trim().replace(/^["']|["']$/g, '')) // Remove quotes
      .filter(item => item && item !== 'null' && item !== 'undefined');
  };

  const validateDateField = (value: string): string | null => {
    if (!value || value === '' || value === '0') return null;
    
    // Try to parse as date
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      console.warn(`Invalid date value: ${value}`);
      return null;
    }
    
    return date.toISOString().split('T')[0]; // Return YYYY-MM-DD format
  };

  const validateNumericField = (value: string, fieldName: string): number | null => {
    if (!value || value === '' || value === '0') return null;
    
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      console.warn(`Invalid numeric value for ${fieldName}: ${value}`);
      return null;
    }
    
    // Check for values that would cause database overflow (precision 10, scale 2 = max 99,999,999.99)
    const maxValue = 99999999.99;
    if (Math.abs(numValue) > maxValue) {
      console.warn(`Numeric value too large for ${fieldName}: ${value}, capping at ${maxValue}`);
      return numValue > 0 ? maxValue : -maxValue;
    }
    
    return numValue;
  };

  const cleanHeaderName = (header: string): string | null => {
    // Remove quotes and trim whitespace
    const cleaned = header.replace(/"/g, '').trim();
    
    // Filter out empty headers and "Unnamed" columns
    if (!cleaned || cleaned === '' || cleaned.startsWith('Unnamed:')) {
      return null;
    }
    
    return cleaned;
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
      console.log('Starting file upload process...');
      console.log('File details:', {
        name: uploadFile.name,
        size: uploadFile.size,
        type: uploadFile.type,
        lastModified: new Date(uploadFile.lastModified)
      });
      
      // Enhanced file reading with encoding detection
      const fileContent = await readFileWithMultipleEncodings(uploadFile);
      console.log('File content length:', fileContent.length);
      console.log('First 200 characters:', fileContent.substring(0, 200));
      
      // Split lines and filter empty ones
      const lines = fileContent.split(/\r?\n/).filter(line => line.trim());
      console.log('Total lines after filtering:', lines.length);
      
      if (lines.length < 2) {
        throw new Error('CSV file must contain headers and at least one data row');
      }

      // Clean and filter headers to remove empty ones and "Unnamed" columns
      const rawHeaders = parseCSVLine(lines[0]);
      console.log('Raw headers:', rawHeaders);
      
      const cleanedHeaders = rawHeaders.map(cleanHeaderName);
      console.log('Cleaned headers:', cleanedHeaders);
      
      // Create mapping of valid header indices
      const validHeaderIndices: { [key: number]: string } = {};
      cleanedHeaders.forEach((header, index) => {
        if (header !== null) {
          validHeaderIndices[index] = header;
        }
      });

      const validHeaders = Object.values(validHeaderIndices);
      const dataRows = lines.slice(1);
      const config = tableConfigs[selectedTable as keyof typeof tableConfigs];

      console.log('Valid headers after filtering:', validHeaders);
      console.log('Expected headers:', config.headers);
      console.log('Data rows to process:', dataRows.length);

      if (validHeaders.length === 0) {
        throw new Error('No valid headers found in CSV file after filtering out unnamed columns');
      }

      if (selectedTable === 'buyers') {
        // Upload directly to buyers table with enhanced field mapping
        const buyersData = dataRows.map((line, index) => {
          console.log(`Processing row ${index + 1}/${dataRows.length}`);
          const values = parseCSVLine(line);
          const buyerData: any = {};

          // Only process valid headers with their corresponding indices
          Object.entries(validHeaderIndices).forEach(([indexStr, header]) => {
            const headerIndex = parseInt(indexStr);
            
            // Skip if value doesn't exist at this index
            if (headerIndex >= values.length) return;
            
            let rawValue = values[headerIndex];
            if (!rawValue || rawValue === 'null' || rawValue === 'undefined') return;

            // Enhanced text field processing based on field type
            if (['sectors', 'primary_industries', 'keywords', 'target_customer_types', 
                 'investment_type', 'geography', 'industry_preferences', 'product_service_tags',
                 'all_industries', 'verticals', 'target_customers_industries'].includes(header)) {
              // Array fields
              buyerData[header] = parseArrayField(rawValue);
            }
            else if (['employees', 'matching_score', 'year_founded'].includes(header)) {
              // Integer fields
              const numValue = parseInt(sanitizeTextField(rawValue));
              buyerData[header] = isNaN(numValue) ? null : numValue;
            }
            else if (['revenue', 'cash', 'aum', 'net_income', 'net_debt'].includes(header)) {
              // Decimal fields with overflow protection
              buyerData[header] = validateNumericField(sanitizeTextField(rawValue), header);
            }
            else if (['is_public', 'is_pe_vc_backed'].includes(header)) {
              // Boolean fields
              const cleanValue = sanitizeTextField(rawValue).toLowerCase();
              buyerData[header] = cleanValue === 'true' || cleanValue === '1' || cleanValue === 'yes';
            }
            else if (['reported_date', 'last_financing_date', 'last_update_date', 'analyzed_at'].includes(header)) {
              // Date fields
              buyerData[header] = validateDateField(sanitizeTextField(rawValue));
            }
            else if (['rationale', 'employee_history'].includes(header)) {
              // JSONB fields
              const cleanValue = sanitizeTextField(rawValue);
              try {
                buyerData[header] = JSON.parse(cleanValue);
              } catch {
                if (header === 'rationale') {
                  buyerData[header] = { note: cleanValue };
                } else {
                  buyerData[header] = null;
                }
              }
            }
            else {
              // Text fields with enhanced sanitization
              const cleanValue = sanitizeTextField(rawValue);
              if (cleanValue) {
                buyerData[header] = cleanValue;
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

        console.log('Processed buyers data sample:', buyersData[0]);
        console.log('Total buyers to insert:', buyersData.length);

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

        // Only create a new search if we have a valid listing ID and no saved search
        if (!currentSavedSearchId && listingId !== 'global') {
          const defaultSearchName = `Data Upload - ${new Date().toLocaleDateString()}`;
          const defaultSearch = await createSavedBuyerSearch({
            project_id: listingId,
            name: defaultSearchName,
            search_criteria: { uploadType: selectedTable }
          });
          currentSavedSearchId = defaultSearch.id!;
        }

        // If we're in global mode or still no search ID, skip buyer_search_results upload
        if (!currentSavedSearchId) {
          toast({
            title: "Info",
            description: "Buyer search results uploads require a specific listing context. Please use this from within a listing's AI Buyer Builder.",
            variant: "destructive"
          });
          return;
        }

        const buyerResults = dataRows.map((line, index) => {
          const values = parseCSVLine(line);
          const buyerData: any = {
            saved_search_id: currentSavedSearchId,
            buyer_external_id: `upload_${Date.now()}_${index}`,
          };

          Object.entries(validHeaderIndices).forEach(([indexStr, header]) => {
            const headerIndex = parseInt(indexStr);
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
                  buyerData[header] = validateNumericField(value, header);
                  break;
                case 'is_public':
                case 'is_pe_vc_backed':
                  buyerData[header] = value.toLowerCase() === 'true';
                  break;
                case 'reported_date':
                  buyerData[header] = validateDateField(value) || new Date().toISOString().split('T')[0];
                  break;
                default:
                  buyerData[header] = sanitizeTextField(value) || null;
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
      {listingId === 'global' && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center p-3 bg-blue-50 border border-blue-200 rounded-md">
              <Info className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-xs text-blue-700">
                You're in global data upload mode. Only the Buyers Master Database upload is available here. 
                For buyer search results uploads, please use the Data Management tab within a specific listing's AI Buyer Builder.
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {(listingId !== 'global' || selectedTable === 'buyers') && (
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
      )}

      {(() => {
        const availableConfigs = listingId === 'global' 
          ? { buyers: tableConfigs.buyers }
          : tableConfigs;
        
        const currentConfig = availableConfigs[selectedTable as keyof typeof availableConfigs] || tableConfigs.buyers;
        
        return (
          <>
            <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-sm">
            <Download className="h-4 w-4 mr-2" />
            Download {currentConfig.name} Template
          </CardTitle>
          <CardDescription className="text-xs">
            Download a CSV template for {currentConfig.name.toLowerCase()} with sample data and proper column headings
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
                <li><strong>{currentConfig.headers.length} complete fields</strong> for {currentConfig.name}</li>
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
              Download {currentConfig.name} Template ({currentConfig.headers.length} fields)
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-sm">
            <Upload className="h-4 w-4 mr-2" />
            Upload Data to {currentConfig.name}
          </CardTitle>
          <CardDescription className="text-xs">
            Upload a CSV file with data for {currentConfig.name.toLowerCase()} using the template format. 
            Supports UTF-8, Windows-1252, ISO-8859-1, and UTF-16 encodings.
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
            <Label htmlFor="file-upload" className="text-xs">Select CSV File for {currentConfig.name}</Label>
            <Input
              id="file-upload"
              type="file"
              accept=".csv"
              onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
            />
            <div className="text-xs text-gray-500">
              Supports all {currentConfig.headers.length} fields for {currentConfig.name}. 
              Auto-detects encoding (UTF-8, Windows-1252, ISO-8859-1, UTF-16).
            </div>
          </div>

          <Button 
            onClick={handleFileUpload}
            disabled={!uploadFile || uploading}
            className="w-full"
          >
            {uploading ? `Uploading to ${currentConfig.name}...` : `Upload Data to ${currentConfig.name}`}
          </Button>
        </CardContent>
      </Card>
          </>
        );
      })()}
    </div>
  );
};

export default BuyerDataManager;
