export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      buyer_search_configs: {
        Row: {
          created_at: string
          filters: Json
          id: string
          name: string
          project_id: string
          scoring_config: Json
          updated_at: string
        }
        Insert: {
          created_at?: string
          filters?: Json
          id?: string
          name: string
          project_id: string
          scoring_config?: Json
          updated_at?: string
        }
        Update: {
          created_at?: string
          filters?: Json
          id?: string
          name?: string
          project_id?: string
          scoring_config?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "buyer_search_configs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      buyer_search_results: {
        Row: {
          aum: number | null
          buyer_data: Json | null
          buyer_external_id: string | null
          buyer_name: string | null
          buyer_type: string | null
          cash: number | null
          created_at: string
          customers: string | null
          customers_rationale: string | null
          description: string | null
          ebitda: string | null
          employees: number | null
          financial_rationale: string | null
          geography: string | null
          hq: string | null
          id: string
          industry_focus: string | null
          industry_preferences: string | null
          investment_size: string | null
          investment_type: string | null
          investments: string | null
          is_pe_vc_backed: boolean | null
          is_public: boolean | null
          is_saved: boolean | null
          keywords: string | null
          location: string | null
          long_description: string | null
          ma_track_record: string | null
          match_score: number | null
          matching_score: number | null
          offering: string | null
          offering_rationale: string | null
          overall_rationale: string | null
          parent_company: string | null
          previous_acquisitions: string | null
          primary_industries: string | null
          rationale: Json | null
          reported_date: string | null
          revenue: number | null
          saved_search_id: string
          sector: string | null
          sectors: string | null
          status: string | null
          target_customer_types: string | null
          transactions_rationale: string | null
          website: string | null
        }
        Insert: {
          aum?: number | null
          buyer_data?: Json | null
          buyer_external_id?: string | null
          buyer_name?: string | null
          buyer_type?: string | null
          cash?: number | null
          created_at?: string
          customers?: string | null
          customers_rationale?: string | null
          description?: string | null
          ebitda?: string | null
          employees?: number | null
          financial_rationale?: string | null
          geography?: string | null
          hq?: string | null
          id?: string
          industry_focus?: string | null
          industry_preferences?: string | null
          investment_size?: string | null
          investment_type?: string | null
          investments?: string | null
          is_pe_vc_backed?: boolean | null
          is_public?: boolean | null
          is_saved?: boolean | null
          keywords?: string | null
          location?: string | null
          long_description?: string | null
          ma_track_record?: string | null
          match_score?: number | null
          matching_score?: number | null
          offering?: string | null
          offering_rationale?: string | null
          overall_rationale?: string | null
          parent_company?: string | null
          previous_acquisitions?: string | null
          primary_industries?: string | null
          rationale?: Json | null
          reported_date?: string | null
          revenue?: number | null
          saved_search_id: string
          sector?: string | null
          sectors?: string | null
          status?: string | null
          target_customer_types?: string | null
          transactions_rationale?: string | null
          website?: string | null
        }
        Update: {
          aum?: number | null
          buyer_data?: Json | null
          buyer_external_id?: string | null
          buyer_name?: string | null
          buyer_type?: string | null
          cash?: number | null
          created_at?: string
          customers?: string | null
          customers_rationale?: string | null
          description?: string | null
          ebitda?: string | null
          employees?: number | null
          financial_rationale?: string | null
          geography?: string | null
          hq?: string | null
          id?: string
          industry_focus?: string | null
          industry_preferences?: string | null
          investment_size?: string | null
          investment_type?: string | null
          investments?: string | null
          is_pe_vc_backed?: boolean | null
          is_public?: boolean | null
          is_saved?: boolean | null
          keywords?: string | null
          location?: string | null
          long_description?: string | null
          ma_track_record?: string | null
          match_score?: number | null
          matching_score?: number | null
          offering?: string | null
          offering_rationale?: string | null
          overall_rationale?: string | null
          parent_company?: string | null
          previous_acquisitions?: string | null
          primary_industries?: string | null
          rationale?: Json | null
          reported_date?: string | null
          revenue?: number | null
          saved_search_id?: string
          sector?: string | null
          sectors?: string | null
          status?: string | null
          target_customer_types?: string | null
          transactions_rationale?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "buyer_search_results_saved_search_id_fkey"
            columns: ["saved_search_id"]
            isOneToOne: false
            referencedRelation: "saved_buyer_searches"
            referencedColumns: ["id"]
          },
        ]
      }
      buyers: {
        Row: {
          active_investors: string | null
          all_industries: string[] | null
          analyzed_at: string | null
          aum: number | null
          cash: number | null
          categorisation_offering: string | null
          category_tag: string | null
          company_linkedin: string | null
          company_pbid: string | null
          company_short_description: string | null
          created_at: string
          customer_combined: string | null
          customer_short_sentence_broad: string | null
          customer_short_sentence_specific: string | null
          customer_tag: string | null
          customers: string | null
          describe_products_services: string | null
          description: string | null
          ebitda: string | null
          employee_history: Json | null
          employees: number | null
          external_company_name: string | null
          external_id: string
          financing_status: string | null
          fiscal_period: string | null
          geography: string[] | null
          hq: string | null
          id: string
          id_x: string | null
          id_y: string | null
          industry_category: string | null
          industry_focus: string | null
          industry_preferences: string[] | null
          investment_size: string | null
          investment_type: string[] | null
          investments: string | null
          investments_last_2_years: string | null
          is_pe_vc_backed: boolean | null
          is_public: boolean | null
          keywords: string[] | null
          last_financing_date: string | null
          last_financing_deal_type: string | null
          last_update_date: string | null
          legal_name: string | null
          location: string | null
          long_description: string | null
          long_offering: string | null
          long_problem_solved: string | null
          long_use_cases: string | null
          ma_track_record: string | null
          matching_score: number | null
          name: string
          net_debt: number | null
          net_income: number | null
          offering: string | null
          offering_tag: string | null
          ownership_status: string | null
          parent_company: string | null
          previous_acquisitions: string | null
          primary_industries: string[] | null
          primary_industry_code: string | null
          primary_industry_group: string | null
          primary_industry_sector: string | null
          problem_combined: string | null
          problem_short_sentence_broad: string | null
          problem_short_sentence_specific: string | null
          problem_tag: string | null
          product_service_features: string | null
          product_service_tags: string[] | null
          rationale: Json | null
          registration_number: string | null
          registry_name: string | null
          reported_date: string | null
          revenue: number | null
          sector: string | null
          sectors: string[] | null
          short_sentence_broad: string | null
          short_sentence_specific: string | null
          source_file: string | null
          status: string | null
          summary: string | null
          supply_chain_role: string | null
          target_commercial_category: string | null
          target_customer_types: string[] | null
          target_customers_description: string | null
          target_customers_industries: string[] | null
          target_customers_type_new: string | null
          target_functional_category: string | null
          technology_delivery: string | null
          type: string
          updated_at: string
          url: string | null
          use_case_combined: string | null
          use_case_short_sentence_broad: string | null
          use_case_short_sentence_specific: string | null
          use_case_tag: string | null
          verticals: string[] | null
          website: string | null
          website_https: string | null
          year_founded: number | null
        }
        Insert: {
          active_investors?: string | null
          all_industries?: string[] | null
          analyzed_at?: string | null
          aum?: number | null
          cash?: number | null
          categorisation_offering?: string | null
          category_tag?: string | null
          company_linkedin?: string | null
          company_pbid?: string | null
          company_short_description?: string | null
          created_at?: string
          customer_combined?: string | null
          customer_short_sentence_broad?: string | null
          customer_short_sentence_specific?: string | null
          customer_tag?: string | null
          customers?: string | null
          describe_products_services?: string | null
          description?: string | null
          ebitda?: string | null
          employee_history?: Json | null
          employees?: number | null
          external_company_name?: string | null
          external_id: string
          financing_status?: string | null
          fiscal_period?: string | null
          geography?: string[] | null
          hq?: string | null
          id?: string
          id_x?: string | null
          id_y?: string | null
          industry_category?: string | null
          industry_focus?: string | null
          industry_preferences?: string[] | null
          investment_size?: string | null
          investment_type?: string[] | null
          investments?: string | null
          investments_last_2_years?: string | null
          is_pe_vc_backed?: boolean | null
          is_public?: boolean | null
          keywords?: string[] | null
          last_financing_date?: string | null
          last_financing_deal_type?: string | null
          last_update_date?: string | null
          legal_name?: string | null
          location?: string | null
          long_description?: string | null
          long_offering?: string | null
          long_problem_solved?: string | null
          long_use_cases?: string | null
          ma_track_record?: string | null
          matching_score?: number | null
          name: string
          net_debt?: number | null
          net_income?: number | null
          offering?: string | null
          offering_tag?: string | null
          ownership_status?: string | null
          parent_company?: string | null
          previous_acquisitions?: string | null
          primary_industries?: string[] | null
          primary_industry_code?: string | null
          primary_industry_group?: string | null
          primary_industry_sector?: string | null
          problem_combined?: string | null
          problem_short_sentence_broad?: string | null
          problem_short_sentence_specific?: string | null
          problem_tag?: string | null
          product_service_features?: string | null
          product_service_tags?: string[] | null
          rationale?: Json | null
          registration_number?: string | null
          registry_name?: string | null
          reported_date?: string | null
          revenue?: number | null
          sector?: string | null
          sectors?: string[] | null
          short_sentence_broad?: string | null
          short_sentence_specific?: string | null
          source_file?: string | null
          status?: string | null
          summary?: string | null
          supply_chain_role?: string | null
          target_commercial_category?: string | null
          target_customer_types?: string[] | null
          target_customers_description?: string | null
          target_customers_industries?: string[] | null
          target_customers_type_new?: string | null
          target_functional_category?: string | null
          technology_delivery?: string | null
          type: string
          updated_at?: string
          url?: string | null
          use_case_combined?: string | null
          use_case_short_sentence_broad?: string | null
          use_case_short_sentence_specific?: string | null
          use_case_tag?: string | null
          verticals?: string[] | null
          website?: string | null
          website_https?: string | null
          year_founded?: number | null
        }
        Update: {
          active_investors?: string | null
          all_industries?: string[] | null
          analyzed_at?: string | null
          aum?: number | null
          cash?: number | null
          categorisation_offering?: string | null
          category_tag?: string | null
          company_linkedin?: string | null
          company_pbid?: string | null
          company_short_description?: string | null
          created_at?: string
          customer_combined?: string | null
          customer_short_sentence_broad?: string | null
          customer_short_sentence_specific?: string | null
          customer_tag?: string | null
          customers?: string | null
          describe_products_services?: string | null
          description?: string | null
          ebitda?: string | null
          employee_history?: Json | null
          employees?: number | null
          external_company_name?: string | null
          external_id?: string
          financing_status?: string | null
          fiscal_period?: string | null
          geography?: string[] | null
          hq?: string | null
          id?: string
          id_x?: string | null
          id_y?: string | null
          industry_category?: string | null
          industry_focus?: string | null
          industry_preferences?: string[] | null
          investment_size?: string | null
          investment_type?: string[] | null
          investments?: string | null
          investments_last_2_years?: string | null
          is_pe_vc_backed?: boolean | null
          is_public?: boolean | null
          keywords?: string[] | null
          last_financing_date?: string | null
          last_financing_deal_type?: string | null
          last_update_date?: string | null
          legal_name?: string | null
          location?: string | null
          long_description?: string | null
          long_offering?: string | null
          long_problem_solved?: string | null
          long_use_cases?: string | null
          ma_track_record?: string | null
          matching_score?: number | null
          name?: string
          net_debt?: number | null
          net_income?: number | null
          offering?: string | null
          offering_tag?: string | null
          ownership_status?: string | null
          parent_company?: string | null
          previous_acquisitions?: string | null
          primary_industries?: string[] | null
          primary_industry_code?: string | null
          primary_industry_group?: string | null
          primary_industry_sector?: string | null
          problem_combined?: string | null
          problem_short_sentence_broad?: string | null
          problem_short_sentence_specific?: string | null
          problem_tag?: string | null
          product_service_features?: string | null
          product_service_tags?: string[] | null
          rationale?: Json | null
          registration_number?: string | null
          registry_name?: string | null
          reported_date?: string | null
          revenue?: number | null
          sector?: string | null
          sectors?: string[] | null
          short_sentence_broad?: string | null
          short_sentence_specific?: string | null
          source_file?: string | null
          status?: string | null
          summary?: string | null
          supply_chain_role?: string | null
          target_commercial_category?: string | null
          target_customer_types?: string[] | null
          target_customers_description?: string | null
          target_customers_industries?: string[] | null
          target_customers_type_new?: string | null
          target_functional_category?: string | null
          technology_delivery?: string | null
          type?: string
          updated_at?: string
          url?: string | null
          use_case_combined?: string | null
          use_case_short_sentence_broad?: string | null
          use_case_short_sentence_specific?: string | null
          use_case_tag?: string | null
          verticals?: string[] | null
          website?: string | null
          website_https?: string | null
          year_founded?: number | null
        }
        Relationships: []
      }
      investors: {
        Row: {
          "Active Portfolio": string | null
          AUM: string | null
          "Buyer Type": string | null
          "Company Name": string | null
          "Company Website": string | null
          "Dry Powder": string | null
          "HQ Country": string | null
          Investments: string | null
          "Investments in the last 2 Years": string | null
          "Investments in the last 5 Years": string | null
          "Last Closed Fund Size": string | null
          "Last Closed Fund Size Date": string | null
          "Preferred Company Valuation Max": string | null
          "Preferred Company Valuation Min": string | null
          "Preferred Deal Size Max": string | null
          "Preferred Deal Size Min": string | null
          "Preferred EBITDA Max": string | null
          "Preferred EBITDA Min": string | null
          "Preferred Geography": string | null
          "Preferred Industry": string | null
          "Preferred Investment Amount Max": string | null
          "Preferred Investment Amount Min": string | null
          "Preferred Investment Horizon": string | null
          "Preferred Investment Types": string | null
          "Preferred Revenue Max": string | null
          "Preferred Revenue Min": string | null
          "Preferred Verticals": string | null
          "Primary Investor Type": string | null
          "Website Https": string | null
        }
        Insert: {
          "Active Portfolio"?: string | null
          AUM?: string | null
          "Buyer Type"?: string | null
          "Company Name"?: string | null
          "Company Website"?: string | null
          "Dry Powder"?: string | null
          "HQ Country"?: string | null
          Investments?: string | null
          "Investments in the last 2 Years"?: string | null
          "Investments in the last 5 Years"?: string | null
          "Last Closed Fund Size"?: string | null
          "Last Closed Fund Size Date"?: string | null
          "Preferred Company Valuation Max"?: string | null
          "Preferred Company Valuation Min"?: string | null
          "Preferred Deal Size Max"?: string | null
          "Preferred Deal Size Min"?: string | null
          "Preferred EBITDA Max"?: string | null
          "Preferred EBITDA Min"?: string | null
          "Preferred Geography"?: string | null
          "Preferred Industry"?: string | null
          "Preferred Investment Amount Max"?: string | null
          "Preferred Investment Amount Min"?: string | null
          "Preferred Investment Horizon"?: string | null
          "Preferred Investment Types"?: string | null
          "Preferred Revenue Max"?: string | null
          "Preferred Revenue Min"?: string | null
          "Preferred Verticals"?: string | null
          "Primary Investor Type"?: string | null
          "Website Https"?: string | null
        }
        Update: {
          "Active Portfolio"?: string | null
          AUM?: string | null
          "Buyer Type"?: string | null
          "Company Name"?: string | null
          "Company Website"?: string | null
          "Dry Powder"?: string | null
          "HQ Country"?: string | null
          Investments?: string | null
          "Investments in the last 2 Years"?: string | null
          "Investments in the last 5 Years"?: string | null
          "Last Closed Fund Size"?: string | null
          "Last Closed Fund Size Date"?: string | null
          "Preferred Company Valuation Max"?: string | null
          "Preferred Company Valuation Min"?: string | null
          "Preferred Deal Size Max"?: string | null
          "Preferred Deal Size Min"?: string | null
          "Preferred EBITDA Max"?: string | null
          "Preferred EBITDA Min"?: string | null
          "Preferred Geography"?: string | null
          "Preferred Industry"?: string | null
          "Preferred Investment Amount Max"?: string | null
          "Preferred Investment Amount Min"?: string | null
          "Preferred Investment Horizon"?: string | null
          "Preferred Investment Types"?: string | null
          "Preferred Revenue Max"?: string | null
          "Preferred Revenue Min"?: string | null
          "Preferred Verticals"?: string | null
          "Primary Investor Type"?: string | null
          "Website Https"?: string | null
        }
        Relationships: []
      }
      matched_buyers: {
        Row: {
          active_investors: string | null
          all_industries: string[] | null
          analyzed_at: string | null
          aum: number | null
          buyer_customers: string | null
          buyer_description: string | null
          buyer_external_id: string | null
          buyer_long_description: string | null
          buyer_name: string | null
          buyer_offering: string | null
          buyer_rationale: Json | null
          buyer_table_id: string | null
          buyer_table_name: string | null
          buyer_type: string | null
          buyer_website: string | null
          cash: number | null
          categorisation_offering: string | null
          category_tag: string | null
          company_linkedin: string | null
          company_name: string | null
          company_pbid: string | null
          company_short_description: string | null
          company_website: string | null
          created_at: string | null
          customer_combined: string | null
          customer_short_sentence_broad: string | null
          customer_short_sentence_specific: string | null
          customer_tag: string | null
          customers_rationale: string | null
          customers_score: number | null
          describe_products_services: string | null
          ebitda: string | null
          employee_history: Json | null
          employees: number | null
          financial_strength_rationale: string | null
          financing_status: string | null
          fiscal_period: string | null
          geography: string[] | null
          hq: string | null
          id: string
          industry_category: string | null
          industry_focus: string | null
          industry_preferences: string[] | null
          investment_size: string | null
          investment_type: string[] | null
          investments: string | null
          investments_last_2_years: string | null
          is_pe_vc_backed: boolean | null
          is_public: boolean | null
          keywords: string[] | null
          last_financing_date: string | null
          last_financing_deal_type: string | null
          last_update_date: string | null
          legal_name: string | null
          location: string | null
          long_offering: string | null
          long_problem_solved: string | null
          long_use_cases: string | null
          ma_track_record: string | null
          matching_score: number | null
          net_debt: number | null
          net_income: number | null
          offering_combined: string | null
          offering_rationale: string | null
          offering_score: number | null
          offering_tag: string | null
          overall_rationale: string | null
          ownership_status: string | null
          parent_company: string | null
          positioning_score: number | null
          prev_transactions_rationale: string | null
          previous_acquisitions: string | null
          primary_industries: string[] | null
          primary_industry_code: string | null
          primary_industry_group: string | null
          primary_industry_sector: string | null
          problem_combined: string | null
          problem_short_sentence_broad: string | null
          problem_short_sentence_specific: string | null
          problem_tag: string | null
          product_service_features: string | null
          product_service_tags: string[] | null
          registration_number: string | null
          registry_name: string | null
          reported_date: string | null
          revenue: number | null
          sector: string | null
          sector_score: number | null
          sectors: string[] | null
          short_description: string | null
          short_sentence_broad: string | null
          short_sentence_specific: string | null
          source_file: string | null
          status: string | null
          summary: string | null
          supply_chain_role: string | null
          target_commercial_category: string | null
          target_customer_types: string[] | null
          target_customers_description: string | null
          target_customers_industries: string[] | null
          target_customers_type_new: string | null
          target_functional_category: string | null
          technology_delivery: string | null
          total_score: string | null
          updated_at: string | null
          url: string | null
          use_case_combined: string | null
          use_case_short_sentence_broad: string | null
          use_case_short_sentence_specific: string | null
          use_case_tag: string | null
          verticals: string[] | null
          website_alpha: string | null
          website_https: string | null
          year_founded: number | null
        }
        Insert: {
          active_investors?: string | null
          all_industries?: string[] | null
          analyzed_at?: string | null
          aum?: number | null
          buyer_customers?: string | null
          buyer_description?: string | null
          buyer_external_id?: string | null
          buyer_long_description?: string | null
          buyer_name?: string | null
          buyer_offering?: string | null
          buyer_rationale?: Json | null
          buyer_table_id?: string | null
          buyer_table_name?: string | null
          buyer_type?: string | null
          buyer_website?: string | null
          cash?: number | null
          categorisation_offering?: string | null
          category_tag?: string | null
          company_linkedin?: string | null
          company_name?: string | null
          company_pbid?: string | null
          company_short_description?: string | null
          company_website?: string | null
          created_at?: string | null
          customer_combined?: string | null
          customer_short_sentence_broad?: string | null
          customer_short_sentence_specific?: string | null
          customer_tag?: string | null
          customers_rationale?: string | null
          customers_score?: number | null
          describe_products_services?: string | null
          ebitda?: string | null
          employee_history?: Json | null
          employees?: number | null
          financial_strength_rationale?: string | null
          financing_status?: string | null
          fiscal_period?: string | null
          geography?: string[] | null
          hq?: string | null
          id: string
          industry_category?: string | null
          industry_focus?: string | null
          industry_preferences?: string[] | null
          investment_size?: string | null
          investment_type?: string[] | null
          investments?: string | null
          investments_last_2_years?: string | null
          is_pe_vc_backed?: boolean | null
          is_public?: boolean | null
          keywords?: string[] | null
          last_financing_date?: string | null
          last_financing_deal_type?: string | null
          last_update_date?: string | null
          legal_name?: string | null
          location?: string | null
          long_offering?: string | null
          long_problem_solved?: string | null
          long_use_cases?: string | null
          ma_track_record?: string | null
          matching_score?: number | null
          net_debt?: number | null
          net_income?: number | null
          offering_combined?: string | null
          offering_rationale?: string | null
          offering_score?: number | null
          offering_tag?: string | null
          overall_rationale?: string | null
          ownership_status?: string | null
          parent_company?: string | null
          positioning_score?: number | null
          prev_transactions_rationale?: string | null
          previous_acquisitions?: string | null
          primary_industries?: string[] | null
          primary_industry_code?: string | null
          primary_industry_group?: string | null
          primary_industry_sector?: string | null
          problem_combined?: string | null
          problem_short_sentence_broad?: string | null
          problem_short_sentence_specific?: string | null
          problem_tag?: string | null
          product_service_features?: string | null
          product_service_tags?: string[] | null
          registration_number?: string | null
          registry_name?: string | null
          reported_date?: string | null
          revenue?: number | null
          sector?: string | null
          sector_score?: number | null
          sectors?: string[] | null
          short_description?: string | null
          short_sentence_broad?: string | null
          short_sentence_specific?: string | null
          source_file?: string | null
          status?: string | null
          summary?: string | null
          supply_chain_role?: string | null
          target_commercial_category?: string | null
          target_customer_types?: string[] | null
          target_customers_description?: string | null
          target_customers_industries?: string[] | null
          target_customers_type_new?: string | null
          target_functional_category?: string | null
          technology_delivery?: string | null
          total_score?: string | null
          updated_at?: string | null
          url?: string | null
          use_case_combined?: string | null
          use_case_short_sentence_broad?: string | null
          use_case_short_sentence_specific?: string | null
          use_case_tag?: string | null
          verticals?: string[] | null
          website_alpha?: string | null
          website_https?: string | null
          year_founded?: number | null
        }
        Update: {
          active_investors?: string | null
          all_industries?: string[] | null
          analyzed_at?: string | null
          aum?: number | null
          buyer_customers?: string | null
          buyer_description?: string | null
          buyer_external_id?: string | null
          buyer_long_description?: string | null
          buyer_name?: string | null
          buyer_offering?: string | null
          buyer_rationale?: Json | null
          buyer_table_id?: string | null
          buyer_table_name?: string | null
          buyer_type?: string | null
          buyer_website?: string | null
          cash?: number | null
          categorisation_offering?: string | null
          category_tag?: string | null
          company_linkedin?: string | null
          company_name?: string | null
          company_pbid?: string | null
          company_short_description?: string | null
          company_website?: string | null
          created_at?: string | null
          customer_combined?: string | null
          customer_short_sentence_broad?: string | null
          customer_short_sentence_specific?: string | null
          customer_tag?: string | null
          customers_rationale?: string | null
          customers_score?: number | null
          describe_products_services?: string | null
          ebitda?: string | null
          employee_history?: Json | null
          employees?: number | null
          financial_strength_rationale?: string | null
          financing_status?: string | null
          fiscal_period?: string | null
          geography?: string[] | null
          hq?: string | null
          id?: string
          industry_category?: string | null
          industry_focus?: string | null
          industry_preferences?: string[] | null
          investment_size?: string | null
          investment_type?: string[] | null
          investments?: string | null
          investments_last_2_years?: string | null
          is_pe_vc_backed?: boolean | null
          is_public?: boolean | null
          keywords?: string[] | null
          last_financing_date?: string | null
          last_financing_deal_type?: string | null
          last_update_date?: string | null
          legal_name?: string | null
          location?: string | null
          long_offering?: string | null
          long_problem_solved?: string | null
          long_use_cases?: string | null
          ma_track_record?: string | null
          matching_score?: number | null
          net_debt?: number | null
          net_income?: number | null
          offering_combined?: string | null
          offering_rationale?: string | null
          offering_score?: number | null
          offering_tag?: string | null
          overall_rationale?: string | null
          ownership_status?: string | null
          parent_company?: string | null
          positioning_score?: number | null
          prev_transactions_rationale?: string | null
          previous_acquisitions?: string | null
          primary_industries?: string[] | null
          primary_industry_code?: string | null
          primary_industry_group?: string | null
          primary_industry_sector?: string | null
          problem_combined?: string | null
          problem_short_sentence_broad?: string | null
          problem_short_sentence_specific?: string | null
          problem_tag?: string | null
          product_service_features?: string | null
          product_service_tags?: string[] | null
          registration_number?: string | null
          registry_name?: string | null
          reported_date?: string | null
          revenue?: number | null
          sector?: string | null
          sector_score?: number | null
          sectors?: string[] | null
          short_description?: string | null
          short_sentence_broad?: string | null
          short_sentence_specific?: string | null
          source_file?: string | null
          status?: string | null
          summary?: string | null
          supply_chain_role?: string | null
          target_commercial_category?: string | null
          target_customer_types?: string[] | null
          target_customers_description?: string | null
          target_customers_industries?: string[] | null
          target_customers_type_new?: string | null
          target_functional_category?: string | null
          technology_delivery?: string | null
          total_score?: string | null
          updated_at?: string | null
          url?: string | null
          use_case_combined?: string | null
          use_case_short_sentence_broad?: string | null
          use_case_short_sentence_specific?: string | null
          use_case_tag?: string | null
          verticals?: string[] | null
          website_alpha?: string | null
          website_https?: string | null
          year_founded?: number | null
        }
        Relationships: []
      }
      matching: {
        Row: {
          "Buyer Name": string | null
          "Buyer Name2": string | null
          buyer_id: string | null
          buyerrr: string | null
          "Company Name": string | null
          "Company Website": string | null
          Customers: number | null
          "Customers Rationale": string | null
          "Financial Strenght Rationale": string | null
          "Match Socre": string | null
          Offering: number | null
          "Offering Combined": string | null
          "Offering Rationale": string | null
          "Overall Rationale": string | null
          Positioning: number | null
          "Prev Transactions Rationale": string | null
          "Problem Solved": number | null
          Sector: number | null
          "Short Description": string | null
          "Total III": string | null
          "Use Case": number | null
          website_alpha: string | null
        }
        Insert: {
          "Buyer Name"?: string | null
          "Buyer Name2"?: string | null
          buyer_id?: string | null
          buyerrr?: string | null
          "Company Name"?: string | null
          "Company Website"?: string | null
          Customers?: number | null
          "Customers Rationale"?: string | null
          "Financial Strenght Rationale"?: string | null
          "Match Socre"?: string | null
          Offering?: number | null
          "Offering Combined"?: string | null
          "Offering Rationale"?: string | null
          "Overall Rationale"?: string | null
          Positioning?: number | null
          "Prev Transactions Rationale"?: string | null
          "Problem Solved"?: number | null
          Sector?: number | null
          "Short Description"?: string | null
          "Total III"?: string | null
          "Use Case"?: number | null
          website_alpha?: string | null
        }
        Update: {
          "Buyer Name"?: string | null
          "Buyer Name2"?: string | null
          buyer_id?: string | null
          buyerrr?: string | null
          "Company Name"?: string | null
          "Company Website"?: string | null
          Customers?: number | null
          "Customers Rationale"?: string | null
          "Financial Strenght Rationale"?: string | null
          "Match Socre"?: string | null
          Offering?: number | null
          "Offering Combined"?: string | null
          "Offering Rationale"?: string | null
          "Overall Rationale"?: string | null
          Positioning?: number | null
          "Prev Transactions Rationale"?: string | null
          "Problem Solved"?: number | null
          Sector?: number | null
          "Short Description"?: string | null
          "Total III"?: string | null
          "Use Case"?: number | null
          website_alpha?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "matching_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "buyers"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          acquisition_reason: string | null
          buyer_countries: Json | null
          buyer_industries: Json | null
          buyer_keywords: Json | null
          company_name: string
          competitors: string[] | null
          country: string
          created_at: string
          customer_industries: string[] | null
          customer_type: string[] | null
          delivery_method: string[] | null
          description: string | null
          ebitda_last_year: string | null
          ebitda_this_year: string | null
          employee_count: number | null
          end_user_sectors: Json | null
          exclude_geographies: string[] | null
          id: string
          include_geographies: string[] | null
          industry: string[] | null
          last_year_period: string | null
          offering: string | null
          problem_solved: string | null
          product_tags: string[] | null
          project_name: string
          revenue_last_year: string | null
          revenue_this_year: string | null
          shareholder_preference: Json | null
          supply_chain_role: string[] | null
          target_customers: string | null
          this_year_period: string | null
          updated_at: string
          use_case: string[] | null
          use_cases: string | null
          user_id: string
          website: string | null
        }
        Insert: {
          acquisition_reason?: string | null
          buyer_countries?: Json | null
          buyer_industries?: Json | null
          buyer_keywords?: Json | null
          company_name: string
          competitors?: string[] | null
          country: string
          created_at?: string
          customer_industries?: string[] | null
          customer_type?: string[] | null
          delivery_method?: string[] | null
          description?: string | null
          ebitda_last_year?: string | null
          ebitda_this_year?: string | null
          employee_count?: number | null
          end_user_sectors?: Json | null
          exclude_geographies?: string[] | null
          id?: string
          include_geographies?: string[] | null
          industry?: string[] | null
          last_year_period?: string | null
          offering?: string | null
          problem_solved?: string | null
          product_tags?: string[] | null
          project_name: string
          revenue_last_year?: string | null
          revenue_this_year?: string | null
          shareholder_preference?: Json | null
          supply_chain_role?: string[] | null
          target_customers?: string | null
          this_year_period?: string | null
          updated_at?: string
          use_case?: string[] | null
          use_cases?: string | null
          user_id: string
          website?: string | null
        }
        Update: {
          acquisition_reason?: string | null
          buyer_countries?: Json | null
          buyer_industries?: Json | null
          buyer_keywords?: Json | null
          company_name?: string
          competitors?: string[] | null
          country?: string
          created_at?: string
          customer_industries?: string[] | null
          customer_type?: string[] | null
          delivery_method?: string[] | null
          description?: string | null
          ebitda_last_year?: string | null
          ebitda_this_year?: string | null
          employee_count?: number | null
          end_user_sectors?: Json | null
          exclude_geographies?: string[] | null
          id?: string
          include_geographies?: string[] | null
          industry?: string[] | null
          last_year_period?: string | null
          offering?: string | null
          problem_solved?: string | null
          product_tags?: string[] | null
          project_name?: string
          revenue_last_year?: string | null
          revenue_this_year?: string | null
          shareholder_preference?: Json | null
          supply_chain_role?: string[] | null
          target_customers?: string | null
          this_year_period?: string | null
          updated_at?: string
          use_case?: string[] | null
          use_cases?: string | null
          user_id?: string
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_buyer_searches: {
        Row: {
          created_at: string
          id: string
          name: string
          project_id: string
          results_count: number | null
          search_config_id: string | null
          search_criteria: Json
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          project_id: string
          results_count?: number | null
          search_config_id?: string | null
          search_criteria?: Json
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          project_id?: string
          results_count?: number | null
          search_config_id?: string | null
          search_criteria?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_buyer_searches_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saved_buyer_searches_search_config_id_fkey"
            columns: ["search_config_id"]
            isOneToOne: false
            referencedRelation: "buyer_search_configs"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_buyers: {
        Row: {
          buyer_data: Json
          buyer_id: string
          id: string
          notes: string | null
          project_id: string
          saved_at: string
          status: string | null
          updated_at: string
        }
        Insert: {
          buyer_data: Json
          buyer_id: string
          id?: string
          notes?: string | null
          project_id: string
          saved_at?: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          buyer_data?: Json
          buyer_id?: string
          id?: string
          notes?: string | null
          project_id?: string
          saved_at?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_buyers_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_buyers_list: {
        Row: {
          buyer_data: Json
          buyer_id: string
          buyer_name: string
          buyer_type: string
          feedback: string | null
          id: string
          project_id: string
          rank: number | null
          saved_at: string
          updated_at: string
        }
        Insert: {
          buyer_data: Json
          buyer_id: string
          buyer_name: string
          buyer_type: string
          feedback?: string | null
          id?: string
          project_id: string
          rank?: number | null
          saved_at?: string
          updated_at?: string
        }
        Update: {
          buyer_data?: Json
          buyer_id?: string
          buyer_name?: string
          buyer_type?: string
          feedback?: string | null
          id?: string
          project_id?: string
          rank?: number | null
          saved_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      transaction: {
        Row: {
          "Add On": string | null
          "Add-on Platform": string | null
          "Buyer Name 1": string | null
          "Buyer Name 1 Type": string | null
          "Buyer Name 2": string | null
          "Buyer Name 2 Type": string | null
          "Buyer Name 3": string | null
          "Buyer Name 3 Type": string | null
          "Buyer Name 4": string | null
          "Buyer Name 4 Type": string | null
          "Buyer Name 5": string | null
          "Buyer Name 5 Type": string | null
          "Buyer Name 6": string | null
          "Buyer Name 6 Type": string | null
          "Company ID": string | null
          "Company Name": string | null
          "Company Website": string | null
          "Deal Class": string | null
          "Deal Date": string | null
          "Deal ID": string | null
          "Deal Synopsis": string | null
          "Deal Type": string | null
          "Direct PE Investment": string | null
          EBITDA: string | null
          "Financing Status": string | null
          "Fiscal Year": number | null
          "Implied EV": string | null
          Investors: string | null
          "Investors Website": string | null
          Revenue: string | null
          "Reverse Merger/Distressed": string | null
          "Seller Description": string | null
          Sellers: string | null
          "Website Https": string | null
        }
        Insert: {
          "Add On"?: string | null
          "Add-on Platform"?: string | null
          "Buyer Name 1"?: string | null
          "Buyer Name 1 Type"?: string | null
          "Buyer Name 2"?: string | null
          "Buyer Name 2 Type"?: string | null
          "Buyer Name 3"?: string | null
          "Buyer Name 3 Type"?: string | null
          "Buyer Name 4"?: string | null
          "Buyer Name 4 Type"?: string | null
          "Buyer Name 5"?: string | null
          "Buyer Name 5 Type"?: string | null
          "Buyer Name 6"?: string | null
          "Buyer Name 6 Type"?: string | null
          "Company ID"?: string | null
          "Company Name"?: string | null
          "Company Website"?: string | null
          "Deal Class"?: string | null
          "Deal Date"?: string | null
          "Deal ID"?: string | null
          "Deal Synopsis"?: string | null
          "Deal Type"?: string | null
          "Direct PE Investment"?: string | null
          EBITDA?: string | null
          "Financing Status"?: string | null
          "Fiscal Year"?: number | null
          "Implied EV"?: string | null
          Investors?: string | null
          "Investors Website"?: string | null
          Revenue?: string | null
          "Reverse Merger/Distressed"?: string | null
          "Seller Description"?: string | null
          Sellers?: string | null
          "Website Https"?: string | null
        }
        Update: {
          "Add On"?: string | null
          "Add-on Platform"?: string | null
          "Buyer Name 1"?: string | null
          "Buyer Name 1 Type"?: string | null
          "Buyer Name 2"?: string | null
          "Buyer Name 2 Type"?: string | null
          "Buyer Name 3"?: string | null
          "Buyer Name 3 Type"?: string | null
          "Buyer Name 4"?: string | null
          "Buyer Name 4 Type"?: string | null
          "Buyer Name 5"?: string | null
          "Buyer Name 5 Type"?: string | null
          "Buyer Name 6"?: string | null
          "Buyer Name 6 Type"?: string | null
          "Company ID"?: string | null
          "Company Name"?: string | null
          "Company Website"?: string | null
          "Deal Class"?: string | null
          "Deal Date"?: string | null
          "Deal ID"?: string | null
          "Deal Synopsis"?: string | null
          "Deal Type"?: string | null
          "Direct PE Investment"?: string | null
          EBITDA?: string | null
          "Financing Status"?: string | null
          "Fiscal Year"?: number | null
          "Implied EV"?: string | null
          Investors?: string | null
          "Investors Website"?: string | null
          Revenue?: string | null
          "Reverse Merger/Distressed"?: string | null
          "Seller Description"?: string | null
          Sellers?: string | null
          "Website Https"?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          email: string | null
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      find_buyer_by_name: {
        Args: { company_name: string }
        Returns: string
      }
      refresh_matched_buyers: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
