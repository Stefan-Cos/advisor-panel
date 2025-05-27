
import { supabase } from "@/integrations/supabase/client";

export interface ProjectData {
  project_name: string;
  company_name: string;
  country: string;
  employee_count?: number;
  website?: string;
  description?: string;
  industry?: string[];
  offering?: string;
  include_geographies?: string[];
  exclude_geographies?: string[];
  product_tags?: string[];
  delivery_method?: string[];
  supply_chain_role?: string[];
  use_case?: string[];
  problem_solved?: string;
  use_cases?: string;
  competitors?: string[];
  last_year_period?: string;
  revenue_last_year?: string;
  ebitda_last_year?: string;
  this_year_period?: string;
  revenue_this_year?: string;
  ebitda_this_year?: string;
  target_customers?: string;
  customer_type?: string[];
  customer_industries?: string[];
  acquisition_reason?: string;
  buyer_countries?: any;
  buyer_industries?: any;
  end_user_sectors?: any;
  buyer_keywords?: any;
  shareholder_preference?: any;
}

export const createProject = async (projectData: ProjectData) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  // For demo purposes, use a proper UUID format for dummy user
  const userId = user?.id || '00000000-0000-0000-0000-000000000001';
  
  console.log('Creating project with user ID:', userId);
  console.log('Project data being saved:', projectData);

  const { data, error } = await supabase
    .from('projects')
    .insert([
      {
        ...projectData,
        user_id: userId,
        employee_count: projectData.employee_count ? parseInt(projectData.employee_count.toString()) : null
      }
    ])
    .select()
    .single();

  if (error) {
    console.error('Error creating project:', error);
    throw error;
  }

  console.log('Project created successfully:', data);
  return data;
};

export const getProjects = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  
  // For demo purposes, if no user, fetch all projects or use a demo user pattern
  if (!user) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }

    return data;
  }

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }

  return data;
};
