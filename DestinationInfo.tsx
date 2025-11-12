import { useEffect, useState } from 'react';
import { UtensilsCrossed, Camera, Loader2, MapPin, ExternalLink } from 'lucide-react';
import { supabase, AttractionItem } from '../lib/supabase';
import { Destination } from '../lib/supabase';

interface DestinationInfoProps {
  country: string;
  region?: string;
}

export const DestinationInfo = ({ country, region }: DestinationInfoProps) => {
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestination = async () => {
      setLoading(true);
      try {
        let query = supabase
          .from('destinations')
          .select('*')
          .eq('country', country);

        if (region) {
          query = query.eq('region', region);
        } else {
          query = query.is('region', null);
        }

        const { data, error } = await query.maybeSingle();

        if (error) throw error;
        setDestination(data as Destination | null);
      } catch (error) {
        console.error('Error fetching destination:', error);
        setDestination(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDestination();
  }, [country, region]);

  if (loading) {
    return (
      <div className="w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center py-12">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">
            No information available for {region ? `${region}, ${country}` : country}
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Check back later for recommendations!
          </p>
        </div>
      </div>
    );
  }

  const foodItems = (destination.food_items || []) as AttractionItem[];
  const touristAttractions = (destination.tourist_attractions || []) as AttractionItem[];

  // Remove duplicates based on name
  const uniqueFoodItems = foodItems.filter((item, index, self) =>
    index === self.findIndex((t) => t.name === item.name)
  );
  const uniqueTouristAttractions = touristAttractions.filter((item, index, self) =>
    index === self.findIndex((t) => t.name === item.name)
  );

  // Only show images for Maharashtra
  const showImages = region === 'Maharashtra';

  return (
    <div className="w-full bg-white rounded-2xl shadow-xl p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {region ? `${region}, ${country}` : country}
        </h2>
        <p className="text-gray-600">Discover the best food and places to visit</p>
      </div>

      {uniqueFoodItems.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <UtensilsCrossed className="w-6 h-6 text-orange-600" />
            <h3 className="text-2xl font-bold text-gray-900">Must-Try Foods</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {uniqueFoodItems.map((food, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                {showImages && (
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <img
                      src={food.image_url}
                      alt={food.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg';
                      }}
                    />
                  </div>
                )}
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">{food.name}</h4>
                  <a
                    href={food.google_maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-lg border border-orange-200 hover:bg-orange-100 transition-colors"
                  >
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-medium">Find on Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {uniqueTouristAttractions.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Camera className="w-6 h-6 text-green-600" />
            <h3 className="text-2xl font-bold text-gray-900">Tourist Places</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {uniqueTouristAttractions.map((place, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                {showImages && (
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <img
                      src={place.image_url}
                      alt={place.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg';
                      }}
                    />
                  </div>
                )}
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">{place.name}</h4>
                  <a
                    href={place.google_maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg border border-green-200 hover:bg-green-100 transition-colors"
                  >
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-medium">Find on Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {uniqueFoodItems.length === 0 && uniqueTouristAttractions.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No recommendations available</p>
        </div>
      )}
    </div>
  );
};
