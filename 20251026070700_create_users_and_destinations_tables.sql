/*
  # Create Users and Destinations Tables

  1. New Tables
    - `users`
      - `id` (uuid, primary key) - User ID from Supabase Auth
      - `email` (text, unique, not null) - User email address
      - `email_verified` (boolean, default false) - Whether email is verified
      - `otp_code` (text, nullable) - Current OTP code for verification
      - `otp_expires_at` (timestamptz, nullable) - OTP expiration timestamp
      - `created_at` (timestamptz, default now()) - Account creation timestamp
      - `updated_at` (timestamptz, default now()) - Last update timestamp
    
    - `destinations`
      - `id` (uuid, primary key) - Destination ID
      - `country` (text, not null) - Country name
      - `region` (text, nullable) - Region/State name (for countries like India)
      - `food_recommendations` (jsonb, not null) - Array of food recommendations
      - `tourist_places` (jsonb, not null) - Array of tourist places
      - `created_at` (timestamptz, default now()) - Record creation timestamp
      - `updated_at` (timestamptz, default now()) - Last update timestamp

  2. Security
    - Enable RLS on both tables
    - Users can read their own data
    - Users can update their own email verification status
    - All authenticated users can read destination data
    - Only service role can insert/update destination data

  3. Indexes
    - Index on destinations(country) for faster lookups
    - Index on destinations(region) for Indian state lookups
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  email_verified boolean DEFAULT false,
  otp_code text,
  otp_expires_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create destinations table
CREATE TABLE IF NOT EXISTS destinations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  country text NOT NULL,
  region text,
  food_recommendations jsonb NOT NULL DEFAULT '[]'::jsonb,
  tourist_places jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_destinations_country ON destinations(country);
CREATE INDEX IF NOT EXISTS idx_destinations_region ON destinations(region);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can read own data"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own data"
  ON users FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- RLS Policies for destinations table
CREATE POLICY "Anyone can read destinations"
  ON destinations FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Service role can insert destinations"
  ON destinations FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can update destinations"
  ON destinations FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);