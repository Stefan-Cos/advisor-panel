export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
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
          buyer_data: Json
          created_at: string
          id: string
          is_saved: boolean | null
          match_score: number | null
          rationale: Json | null
          saved_search_id: string
        }
        Insert: {
          buyer_data: Json
          created_at?: string
          id?: string
          is_saved?: boolean | null
          match_score?: number | null
          rationale?: Json | null
          saved_search_id: string
        }
        Update: {
          buyer_data?: Json
          created_at?: string
          id?: string
          is_saved?: boolean | null
          match_score?: number | null
          rationale?: Json | null
          saved_search_id?: string
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
          aum: number | null
          cash: number | null
          created_at: string
          customers: string | null
          description: string | null
          ebitda: string | null
          employees: number | null
          external_id: string
          geography: string[] | null
          hq: string | null
          id: string
          industry_focus: string | null
          industry_preferences: string[] | null
          investment_size: string | null
          investment_type: string[] | null
          investments: string | null
          is_pe_vc_backed: boolean | null
          is_public: boolean | null
          keywords: string[] | null
          location: string | null
          long_description: string | null
          ma_track_record: string | null
          matching_score: number | null
          name: string
          offering: string | null
          parent_company: string | null
          previous_acquisitions: string | null
          primary_industries: string[] | null
          rationale: Json | null
          reported_date: string | null
          revenue: number | null
          sector: string | null
          sectors: string[] | null
          status: string | null
          target_customer_types: string[] | null
          type: string
          updated_at: string
          website: string | null
        }
        Insert: {
          aum?: number | null
          cash?: number | null
          created_at?: string
          customers?: string | null
          description?: string | null
          ebitda?: string | null
          employees?: number | null
          external_id: string
          geography?: string[] | null
          hq?: string | null
          id?: string
          industry_focus?: string | null
          industry_preferences?: string[] | null
          investment_size?: string | null
          investment_type?: string[] | null
          investments?: string | null
          is_pe_vc_backed?: boolean | null
          is_public?: boolean | null
          keywords?: string[] | null
          location?: string | null
          long_description?: string | null
          ma_track_record?: string | null
          matching_score?: number | null
          name: string
          offering?: string | null
          parent_company?: string | null
          previous_acquisitions?: string | null
          primary_industries?: string[] | null
          rationale?: Json | null
          reported_date?: string | null
          revenue?: number | null
          sector?: string | null
          sectors?: string[] | null
          status?: string | null
          target_customer_types?: string[] | null
          type: string
          updated_at?: string
          website?: string | null
        }
        Update: {
          aum?: number | null
          cash?: number | null
          created_at?: string
          customers?: string | null
          description?: string | null
          ebitda?: string | null
          employees?: number | null
          external_id?: string
          geography?: string[] | null
          hq?: string | null
          id?: string
          industry_focus?: string | null
          industry_preferences?: string[] | null
          investment_size?: string | null
          investment_type?: string[] | null
          investments?: string | null
          is_pe_vc_backed?: boolean | null
          is_public?: boolean | null
          keywords?: string[] | null
          location?: string | null
          long_description?: string | null
          ma_track_record?: string | null
          matching_score?: number | null
          name?: string
          offering?: string | null
          parent_company?: string | null
          previous_acquisitions?: string | null
          primary_industries?: string[] | null
          rationale?: Json | null
          reported_date?: string | null
          revenue?: number | null
          sector?: string | null
          sectors?: string[] | null
          status?: string | null
          target_customer_types?: string[] | null
          type?: string
          updated_at?: string
          website?: string | null
        }
        Relationships: []
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
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
