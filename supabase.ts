import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type User = {
  id: string;
  email: string;
  email_verified: boolean;
  otp_code: string | null;
  otp_expires_at: string | null;
  created_at: string;
  updated_at: string;
};

export type AttractionItem = {
  name: string;
  image_url: string;
  google_maps_url: string;
};

export type Destination = {
  id: string;
  country: string;
  region: string | null;
  food_recommendations: string[];
  tourist_places: string[];
  food_items: AttractionItem[];
  tourist_attractions: AttractionItem[];
  created_at: string;
  updated_at: string;
};
