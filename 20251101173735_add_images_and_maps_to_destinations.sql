/*
  # Add Images and Google Maps Links to Destinations

  1. New Columns
    - `food_items` - Array of food objects with name, image URL, and Google Maps link
    - `tourist_attractions` - Array of tourist place objects with name, image URL, and Google Maps link

  2. Changes
    - Add food_items column to store food data with images and maps
    - Add tourist_attractions column to store tourist place data with images and maps
    - Maintain backward compatibility with existing food_recommendations and tourist_places

  3. Notes
    - Images use Pexels stock photos (free images)
    - Google Maps links point to specific locations
    - Each item contains: name, image_url, google_maps_url
*/

ALTER TABLE destinations 
ADD COLUMN IF NOT EXISTS food_items jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS tourist_attractions jsonb DEFAULT '[]'::jsonb;
