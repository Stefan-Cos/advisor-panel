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

  // Add missing validation functions
  const validateNumericField = (value: string, fieldName: string): number | null => {
    if (!value || value === 'null' || value === 'undefined' || value.toLowerCase() === 'nan') {
      return null;
    }
    
    const cleanValue = value.replace(/[,$]/g, '');
    const numValue = parseFloat(cleanValue);
    
    if (isNaN(numValue)) {
      console.warn(`Invalid numeric value for ${fieldName}: "${value}" - setting to null`);
      return null;
    }
    
    return numValue;
  };

  const validateDateField = (value: string, fieldName: string): string | null => {
    if (!value || value === 'null' || value === 'undefined') {
      return null;
    }
    
    // Try to parse the date
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      console.warn(`Invalid date value for ${fieldName}: "${value}" - creating default`);
      
      // Create sensible defaults based on field type
      const currentDate = new Date().toISOString().split('T')[0];
      
      switch (fieldName) {
        case 'reported_date':
        case 'last_update_date':
        case 'analyzed_at':
          // For recent data fields, use current date
          console.log(`Setting ${fieldName} to current date: ${currentDate}`);
          return currentDate;
        
        case 'last_financing_date':
          // For financing dates, use null (no recent financing)
          console.log(`Setting ${fieldName} to null (no recent financing)`);
          return null;
        
        default:
          // For unknown date fields, use current date as safe default
          console.log(`Setting unknown date field ${fieldName} to current date: ${currentDate}`);
          return currentDate;
      }
    }
    
    // Valid date - return ISO format
    return date.toISOString().split('T')[0];
  };

  const validateIntegerField = (value: string, fieldName: string): number | null => {
    if (!value || value === 'null' || value === 'undefined' || value.toLowerCase() === 'nan') {
      return null;
    }
    
    const cleanValue = value.replace(/[,$]/g, '');
    const intValue = parseInt(cleanValue);
    
    if (isNaN(intValue)) {
      console.warn(`Invalid integer value for ${fieldName}: "${value}" - creating default`);
      
      // Create sensible defaults based on field type
      switch (fieldName) {
        case 'employees':
          // Default to small company size
          console.log(`Setting ${fieldName} to default: 50`);
          return 50;
        
        case 'matching_score':
          // Default to neutral score
          console.log(`Setting ${fieldName} to default: 50`);
          return 50;
        
        case 'year_founded':
          // Default to reasonable company age (20 years ago)
          const defaultYear = new Date().getFullYear() - 20;
          console.log(`Setting ${fieldName} to default: ${defaultYear}`);
          return defaultYear;
        
        default:
          // For unknown integer fields, return null
          console.log(`Setting unknown integer field ${fieldName} to null`);
          return null;
      }
    }
    
    return intValue;
  };

  const validateTextField = (value: string, fieldName: string, isRequired: boolean = false): string => {
    const cleaned = sanitizeTextField(value);
    
    if ((!cleaned || cleaned.trim() === '') && isRequired) {
      console.warn(`Empty required field ${fieldName} - creating default`);
      
      // Create defaults for required fields
      switch (fieldName) {
        case 'name':
          return 'Unknown Company';
        case 'external_id':
          return `upload_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        case 'type':
          return 'strategic';
        case 'status':
          return 'active';
        default:
          return `Default ${fieldName}`;
      }
    }
    
    return cleaned || '';
  };

  // Enhanced CSV parser specifically for comma-delimited files with proper quote handling
  const parseCSVLine = (line: string): string[] => {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    let i = 0;
    
    // Remove BOM if present at start of line
    if (line.charCodeAt(0) === 0xFEFF) {
      line = line.substring(1);
    }
    
    console.log(`Parsing line: "${line.substring(0, 100)}${line.length > 100 ? '...' : ''}"`);
    
    while (i < line.length) {
      const char = line[i];
      const nextChar = i + 1 < line.length ? line[i + 1] : '';
      
      if (char === '"') {
        if (!inQuotes) {
          // Starting a quoted field
          inQuotes = true;
          console.log(`Starting quotes at position ${i}`);
        } else if (nextChar === '"') {
          // Escaped quote (double quotes "" become single ")
          current += '"';
          i++; // Skip the next quote
          console.log(`Found escaped quote at position ${i}`);
        } else {
          // Ending a quoted field
          inQuotes = false;
          console.log(`Ending quotes at position ${i}`);
        }
      } else if (char === ',' && !inQuotes) {
        // Field separator found outside quotes
        result.push(current.trim());
        console.log(`Field ${result.length}: "${current.trim()}"`);
        current = '';
      } else if ((char === '\r' || char === '\n') && !inQuotes) {
        // End of line outside quotes
        break;
      } else {
        // Regular character
        current += char;
      }
      i++;
    }
    
    // Add the last field
    result.push(current.trim());
    console.log(`Final field ${result.length}: "${current.trim()}"`);
    console.log(`Total fields parsed: ${result.length}`);
    
    return result;
  };

  // Enhanced field sanitization with proper quote handling
  const sanitizeTextField = (value: string): string => {
    if (!value) return '';
    
    let cleaned = value.trim();
    console.log(`Sanitizing: "${cleaned.substring(0, 50)}${cleaned.length > 50 ? '...' : ''}"`);
    
    // Remove BOM if present
    if (cleaned.charCodeAt(0) === 0xFEFF) {
      cleaned = cleaned.substring(1);
    }
    
    // Only remove wrapping quotes if the entire field is wrapped
    if (cleaned.length >= 2 && cleaned.startsWith('"') && cleaned.endsWith('"')) {
      // Check if this is truly a wrapped field (not quotes that are part of content)
      const withoutWrapping = cleaned.slice(1, -1);
      // If the content doesn't have unescaped quotes, it's safe to unwrap
      if (!withoutWrapping.includes('"') || withoutWrapping.split('""').length === withoutWrapping.split('"').length) {
        cleaned = withoutWrapping;
        console.log(`Removed wrapping quotes: "${cleaned.substring(0, 50)}"`);
      }
    }
    
    // Handle escaped quotes (convert "" to ")
    cleaned = cleaned.replace(/""/g, '"');
    
    // Replace common encoding artifacts
    const encodingReplacements = {
      'â€™': "'", // Smart apostrophe
      'â€œ': '"', // Smart quote open  
      'â€': '"',  // Smart quote close
      'â€"': '–', // En dash
      'â€•': '—', // Em dash
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
    
    // Remove control characters but preserve newlines in content
    cleaned = cleaned.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
    
    // Normalize line endings
    cleaned = cleaned.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    
    // Normalize multiple spaces but preserve intentional spacing
    cleaned = cleaned.replace(/[ \t]+/g, ' ');
    
    // Limit length to prevent database overflow
    const maxLength = 10000;
    if (cleaned.length > maxLength) {
      cleaned = cleaned.substring(0, maxLength) + '...';
      console.warn(`Field truncated to ${maxLength} characters`);
    }
    
    console.log(`Sanitized result: "${cleaned.substring(0, 50)}${cleaned.length > 50 ? '...' : ''}"`);
    return cleaned;
  };

  // Enhanced header validation with field mapping
  const validateHeaderMapping = (headers: string[], expectedHeaders: string[]): { 
    valid: boolean; 
    missing: string[]; 
    extra: string[];
    mapping: Record<number, string>;
  } => {
    const missing = expectedHeaders.filter(h => !headers.includes(h));
    const extra = headers.filter(h => !expectedHeaders.includes(h));
    
    // Create mapping from CSV column index to database field
    const mapping: Record<number, string> = {};
    headers.forEach((header, index) => {
      if (expectedHeaders.includes(header)) {
        mapping[index] = header;
      }
    });
    
    console.log('Header mapping:', mapping);
    console.log('Missing headers:', missing);
    console.log('Extra headers:', extra);
    
    return {
      valid: missing.length === 0,
      missing,
      extra,
      mapping
    };
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
    let processedRecords = 0;
    let recordsWithDefaults = 0;

    try {
      console.log('=== ENHANCED CSV PARSING WITH DEFAULTS START ===');
      console.log('File details:', {
        name: uploadFile.name,
        size: uploadFile.size,
        type: uploadFile.type,
        lastModified: new Date(uploadFile.lastModified)
      });
      
      // Read file content
      const fileContent = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(event.target?.result as string);
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsText(uploadFile, 'UTF-8');
      });
      
      console.log('File content length:', fileContent.length);
      console.log('First 200 characters:', fileContent.substring(0, 200));
      
      // Split into lines and filter empty ones
      const lines = fileContent.split(/\r?\n/).filter(line => line.trim());
      console.log('Total lines after filtering:', lines.length);
      
      if (lines.length < 2) {
        throw new Error('CSV file must contain headers and at least one data row');
      }

      // Parse headers using enhanced CSV parser
      const headers = parseCSVLine(lines[0]);
      console.log('Parsed headers:', headers);
      
      // Clean headers
      const cleanedHeaders = headers.map(h => h.trim().replace(/[""]/g, '')).filter(h => h && h !== 'null');
      console.log('Cleaned headers:', cleanedHeaders);
      
      const config = tableConfigs[selectedTable as keyof typeof tableConfigs];
      
      // Validate header mapping
      const headerValidation = validateHeaderMapping(cleanedHeaders, config.headers);
      
      if (!headerValidation.valid && headerValidation.missing.length > 5) {
        console.warn('Many missing headers detected');
        toast({
          title: "Warning",
          description: `Many expected headers are missing. Found ${cleanedHeaders.length} headers, expected ${config.headers.length}. Proceeding with available data.`,
        });
      }

      const dataRows = lines.slice(1);
      console.log('Data rows to process:', dataRows.length);

      if (selectedTable === 'buyers') {
        // Process buyers data with enhanced validation and defaults
        const buyersData = dataRows.map((line, index) => {
          processedRecords++;
          let hasDefaults = false;
          
          if (index % 100 === 0) {
            console.log(`Processing row ${index + 1}/${dataRows.length}`);
          }
          
          const values = parseCSVLine(line);
          console.log(`Row ${index + 1} - Parsed ${values.length} fields`);
          
          const buyerData: any = {};

          // Map values using the header mapping with enhanced validation
          Object.entries(headerValidation.mapping).forEach(([csvIndex, dbField]) => {
            const fieldIndex = parseInt(csvIndex);
            if (fieldIndex >= values.length) return;
            
            const rawValue = values[fieldIndex];
            if (!rawValue || rawValue === 'null' || rawValue === 'undefined') return;

            try {
              // Enhanced field processing with defaults
              if (['sectors', 'primary_industries', 'keywords', 'target_customer_types', 
                   'investment_type', 'geography', 'industry_preferences', 'product_service_tags',
                   'all_industries', 'verticals', 'target_customers_industries'].includes(dbField)) {
                const cleanValue = sanitizeTextField(rawValue);
                if (cleanValue.startsWith('[') && cleanValue.endsWith(']')) {
                  try {
                    buyerData[dbField] = JSON.parse(cleanValue);
                  } catch {
                    buyerData[dbField] = cleanValue.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
                  }
                } else {
                  buyerData[dbField] = cleanValue.split(',').map(s => s.trim().replace(/^["']|["']$/g, '')).filter(s => s);
                }
              }
              else if (['employees', 'matching_score', 'year_founded'].includes(dbField)) {
                const originalValue = buyerData[dbField];
                buyerData[dbField] = validateIntegerField(rawValue, dbField);
                if (originalValue !== buyerData[dbField] && rawValue && rawValue !== 'null') {
                  hasDefaults = true;
                }
              }
              else if (['revenue', 'cash', 'aum', 'net_income', 'net_debt'].includes(dbField)) {
                buyerData[dbField] = validateNumericField(rawValue, dbField);
              }
              else if (['is_public', 'is_pe_vc_backed'].includes(dbField)) {
                const cleanValue = sanitizeTextField(rawValue).toLowerCase();
                buyerData[dbField] = cleanValue === 'true' || cleanValue === '1' || cleanValue === 'yes';
              }
              else if (['reported_date', 'last_financing_date', 'last_update_date', 'analyzed_at'].includes(dbField)) {
                const originalValue = rawValue;
                buyerData[dbField] = validateDateField(rawValue, dbField);
                if (originalValue && originalValue !== 'null' && buyerData[dbField] !== new Date(originalValue).toISOString().split('T')[0]) {
                  hasDefaults = true;
                }
              }
              else if (['rationale', 'employee_history'].includes(dbField)) {
                const cleanValue = sanitizeTextField(rawValue);
                try {
                  buyerData[dbField] = JSON.parse(cleanValue);
                } catch {
                  if (dbField === 'rationale') {
                    buyerData[dbField] = { note: cleanValue };
                  } else {
                    buyerData[dbField] = null;
                  }
                }
              }
              else {
                // For required text fields
                const isRequired = ['name', 'external_id', 'type'].includes(dbField);
                const originalValue = rawValue;
                buyerData[dbField] = validateTextField(rawValue, dbField, isRequired);
                if (isRequired && originalValue && originalValue !== buyerData[dbField]) {
                  hasDefaults = true;
                }
              }
            } catch (error) {
              console.warn(`Error processing field ${dbField} for row ${index}:`, error);
              hasDefaults = true;
            }
          });

          // Set required defaults if not already set
          if (!buyerData.external_id) {
            buyerData.external_id = validateTextField('', 'external_id', true);
            hasDefaults = true;
          }
          if (!buyerData.name) {
            buyerData.name = validateTextField('', 'name', true);
            hasDefaults = true;
          }
          if (!buyerData.type) {
            buyerData.type = validateTextField('', 'type', true);
            hasDefaults = true;
          }

          if (hasDefaults) {
            recordsWithDefaults++;
          }

          return buyerData;
        });

        console.log('Sample processed buyer:', buyersData[0]);
        console.log('Total buyers to insert:', buyersData.length);
        console.log('Records with default values applied:', recordsWithDefaults);

        // Insert into buyers table
        const { error } = await supabase
          .from('buyers')
          .insert(buyersData);

        if (error) {
          console.error('Database insertion error:', error);
          throw error;
        }

        console.log('=== CSV UPLOAD SUCCESS ===');
        toast({
          title: "Upload Successful", 
          description: `Successfully uploaded ${buyersData.length} buyers. ${recordsWithDefaults} records had default values applied for faulty data.`
        });

      } else {
        // Handle buyer_search_results upload
        let currentSavedSearchId = savedSearchId;

        if (!currentSavedSearchId && listingId !== 'global') {
          const defaultSearchName = `Data Upload - ${new Date().toLocaleDateString()}`;
          const defaultSearch = await createSavedBuyerSearch({
            project_id: listingId,
            name: defaultSearchName,
            search_criteria: { uploadType: selectedTable }
          });
          currentSavedSearchId = defaultSearch.id!;
        }

        if (!currentSavedSearchId) {
          toast({
            title: "Info",
            description: "Buyer search results uploads require a specific listing context.",
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

          cleanedHeaders.forEach((header, headerIndex) => {
            if (headerIndex >= values.length) return;
            
            const value = values[headerIndex];
            if (!value || value === 'null') return;
            
            if (config.headers.includes(header)) {
              switch (header) {
                case 'employees':
                case 'matching_score':
                  buyerData[header] = value ? parseInt(sanitizeTextField(value)) : null;
                  break;
                case 'revenue':
                case 'cash':
                case 'aum':
                  buyerData[header] = validateNumericField(value, header);
                  break;
                case 'is_public':
                case 'is_pe_vc_backed':
                  buyerData[header] = sanitizeTextField(value).toLowerCase() === 'true';
                  break;
                case 'reported_date':
                  buyerData[header] = validateDateField(value, header) || new Date().toISOString().split('T')[0];
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
      console.error('=== CSV UPLOAD ERROR ===');
      console.error('Error details:', error);
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

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-sm">
            <Upload className="h-4 w-4 mr-2" />
            Upload Data to {currentConfig.name}
          </CardTitle>
          <CardDescription className="text-xs">
            Upload a CSV file with enhanced parsing for better text field mapping. 
            Supports multiple delimiters (comma, semicolon, tab, pipe) and various encodings.
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
              Enhanced CSV parsing with automatic delimiter detection, encoding support, and robust text field mapping.
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
