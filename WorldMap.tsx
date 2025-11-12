import { useState } from 'react';
import { Globe, ZoomIn, ZoomOut } from 'lucide-react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';

interface WorldMapProps {
  onCountrySelect: (country: string, region?: string) => void;
}

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';
const indiaGeoUrl = 'https://raw.githubusercontent.com/geohacker/india/master/state/india_state.geojson';

const countryNameMap: { [key: string]: string } = {
  'United States of America': 'United States',
  'United Kingdom': 'United Kingdom',
  'Russian Federation': 'Russia',
};

const indiaStateNameMap: { [key: string]: string } = {
  'Andaman and Nicobar': 'Andaman and Nicobar Islands',
  'Andhra Pradesh': 'Andhra Pradesh',
  'Arunachal Pradesh': 'Arunachal Pradesh',
  'Assam': 'Assam',
  'Bihar': 'Bihar',
  'Chandigarh': 'Chandigarh',
  'Chhattisgarh': 'Chhattisgarh',
  'Dadra and Nagar Haveli': 'Dadra and Nagar Haveli',
  'Daman and Diu': 'Daman and Diu',
  'Delhi': 'Delhi',
  'Goa': 'Goa',
  'Gujarat': 'Gujarat',
  'Haryana': 'Haryana',
  'Himachal Pradesh': 'Himachal Pradesh',
  'Jammu and Kashmir': 'Jammu and Kashmir',
  'Jharkhand': 'Jharkhand',
  'Karnataka': 'Karnataka',
  'Kerala': 'Kerala',
  'Ladakh': 'Ladakh',
  'Lakshadweep': 'Lakshadweep',
  'Madhya Pradesh': 'Madhya Pradesh',
  'Maharashtra': 'Maharashtra',
  'Manipur': 'Manipur',
  'Meghalaya': 'Meghalaya',
  'Mizoram': 'Mizoram',
  'Nagaland': 'Nagaland',
  'Odisha': 'Odisha',
  'Puducherry': 'Puducherry',
  'Punjab': 'Punjab',
  'Rajasthan': 'Rajasthan',
  'Sikkim': 'Sikkim',
  'Tamil Nadu': 'Tamil Nadu',
  'Telangana': 'Telangana',
  'Tripura': 'Tripura',
  'Uttar Pradesh': 'Uttar Pradesh',
  'Uttarakhand': 'Uttarakhand',
  'West Bengal': 'West Bengal',
};

export const WorldMap = ({ onCountrySelect }: WorldMapProps) => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [showIndianStates, setShowIndianStates] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState<[number, number]>([0, 0]);

  const handleCountryClick = (geo: any) => {
    const countryName = countryNameMap[geo.properties.name] || geo.properties.name;
    setSelectedCountry(countryName);

    if (countryName === 'India') {
      setShowIndianStates(true);
      setZoom(1);
      setCenter([78.96, 20.59]);
      setSelectedState(null);
    } else {
      setShowIndianStates(false);
      setSelectedState(null);
      onCountrySelect(countryName);
    }
  };

  const handleStateClick = (geo: any) => {
    const stateName = indiaStateNameMap[geo.properties.NAME_1] || geo.properties.NAME_1;
    setSelectedState(stateName);
    onCountrySelect('India', stateName);
  };

  const handleZoomIn = () => {
    if (zoom < 8) {
      setZoom(zoom * 1.5);
    }
  };

  const handleZoomOut = () => {
    if (zoom > 1) {
      setZoom(zoom / 1.5);
    }
  };

  const handleReset = () => {
    setZoom(1);
    setCenter([0, 0]);
    setShowIndianStates(false);
    setSelectedCountry(null);
    setSelectedState(null);
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Globe className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">
              {showIndianStates ? 'India - States Map' : 'World Map'}
            </h2>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleZoomIn}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
            >
              Reset
            </button>
          </div>
        </div>

        {selectedCountry && !showIndianStates && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-600">Selected Country:</p>
            <p className="text-lg font-semibold text-gray-900">{selectedCountry}</p>
          </div>
        )}

        {showIndianStates && selectedState && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-600">Selected State:</p>
            <p className="text-lg font-semibold text-gray-900">{selectedState}</p>
          </div>
        )}

        {showIndianStates && (
          <button
            onClick={handleReset}
            className="mb-4 text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to World Map
          </button>
        )}

        <div className="border border-gray-200 rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50">
          {!showIndianStates ? (
            <ComposableMap
              projectionConfig={{
                scale: 147,
              }}
              style={{
                width: '100%',
                height: 'auto',
              }}
            >
              <ZoomableGroup
                zoom={zoom}
                center={center}
                onMoveEnd={(position) => setCenter(position.coordinates)}
              >
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const countryName = countryNameMap[geo.properties.name] || geo.properties.name;
                      const isSelected = selectedCountry === countryName;

                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          onClick={() => handleCountryClick(geo)}
                          style={{
                            default: {
                              fill: isSelected ? '#3B82F6' : '#D1D5DB',
                              stroke: '#FFFFFF',
                              strokeWidth: 0.5,
                              outline: 'none',
                            },
                            hover: {
                              fill: '#60A5FA',
                              stroke: '#FFFFFF',
                              strokeWidth: 0.5,
                              outline: 'none',
                              cursor: 'pointer',
                            },
                            pressed: {
                              fill: '#2563EB',
                              stroke: '#FFFFFF',
                              strokeWidth: 0.5,
                              outline: 'none',
                            },
                          }}
                        />
                      );
                    })
                  }
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>
          ) : (
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 900,
                center: [78.96, 23.59],
              }}
              style={{
                width: '100%',
                height: 'auto',
              }}
            >
              <ZoomableGroup
                zoom={zoom}
                center={center}
                onMoveEnd={(position) => setCenter(position.coordinates)}
              >
                <Geographies geography={indiaGeoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const stateName = indiaStateNameMap[geo.properties.NAME_1] || geo.properties.NAME_1;
                      const isSelected = selectedState === stateName;

                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          onClick={() => handleStateClick(geo)}
                          style={{
                            default: {
                              fill: isSelected ? '#3B82F6' : '#D1D5DB',
                              stroke: '#FFFFFF',
                              strokeWidth: 0.75,
                              outline: 'none',
                            },
                            hover: {
                              fill: '#60A5FA',
                              stroke: '#FFFFFF',
                              strokeWidth: 0.75,
                              outline: 'none',
                              cursor: 'pointer',
                            },
                            pressed: {
                              fill: '#2563EB',
                              stroke: '#FFFFFF',
                              strokeWidth: 0.75,
                              outline: 'none',
                            },
                          }}
                        />
                      );
                    })
                  }
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>
          )}
        </div>

        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            {showIndianStates
              ? 'Click on a state to see food and tourist recommendations. Use zoom controls or drag to navigate the map.'
              : 'Click on a country to explore. Use zoom controls or drag to navigate the map.'}
          </p>
        </div>
      </div>
    </div>
  );
};
