import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { geocodingService } from '../services/geocodingService';
import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import toast from 'react-hot-toast';

const MapPicker = ({ initialCoords, onLocationSelect }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://demotiles.maplibre.org/style.json',
      center: [initialCoords?.lng || 0, initialCoords?.lat || 0],
      zoom: 13,
      attributionControl: {
        compact: true
      }
    });

    // Add fullscreen control
    map.current.addControl(new maplibregl.FullscreenControl());
    map.current.addControl(new maplibregl.NavigationControl());

    // Handle map click to select location
    map.current.on('click', async (e) => {
      const { lng, lat } = e.lngLat;
      await updateMarkerAndLocation(lat, lng);
    });

    // Add initial marker
    if (initialCoords) {
      addMarker(initialCoords.lat, initialCoords.lng);
      setSelectedLocation({
        lat: initialCoords.lat,
        lng: initialCoords.lng,
        address: 'Current Location'
      });
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  const addMarker = (lat, lng) => {
    // Remove existing marker
    if (marker.current) {
      marker.current.remove();
    }

    // Create marker element
    const el = document.createElement('div');
    el.className = 'w-8 h-8 bg-neon-cyan rounded-full border-2 border-neon-purple shadow-lg cursor-pointer hover:scale-110 transition';

    // Add new marker
    marker.current = new maplibregl.Marker({ element: el })
      .setLngLat([lng, lat])
      .addTo(map.current);

    // Center map on marker
    map.current.flyTo({
      center: [lng, lat],
      zoom: 15,
      duration: 1000
    });
  };

  const updateMarkerAndLocation = async (lat, lng) => {
    setLoading(true);
    try {
      const location = await geocodingService.reverseGeocode(lat, lng);
      addMarker(lat, lng);

      const locationData = {
        lat,
        lng,
        address: location.address,
        city: location.city
      };

      setSelectedLocation(locationData);
      onLocationSelect?.(locationData);
      toast.success(`Location: ${location.city}`);
    } catch (error) {
      toast.error('Failed to get location details');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const location = await geocodingService.forwardGeocode(searchQuery);
      await updateMarkerAndLocation(location.latitude, location.longitude);
      setSearchQuery('');
    } catch (error) {
      toast.error('Address not found. Try another search.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Search bar */}
      <form onSubmit={handleSearch} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search address or place..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 bg-white/10 border border-glass-border rounded-lg text-white placeholder-gray-500 focus:border-neon-cyan focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-neon-cyan text-deep-space font-bold rounded-lg hover:scale-105 transition disabled:opacity-50"
          >
            <FaSearch />
          </button>
        </div>
      </form>

      {/* Map container */}
      <div
        ref={mapContainer}
        className="w-full h-[300px] rounded-lg border border-glass-border overflow-hidden mb-4"
      />

      {/* Location info */}
      {selectedLocation && (
        <div className="holo-card p-4 bg-neon-cyan/5">
          <div className="flex items-start gap-2">
            <FaMapMarkerAlt className="text-neon-cyan mt-1" />
            <div>
              <p className="text-sm text-gray-400">Selected Location:</p>
              <p className="text-neon-cyan font-bold">{selectedLocation.city}</p>
              <p className="text-xs text-gray-500">{selectedLocation.address}</p>
              <p className="text-xs text-gray-500 mt-1">
                {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Info text */}
      <p className="text-xs text-gray-500 mt-2">
        💡 Click on the map to select a location or search by address
      </p>
    </div>
  );
};

export default MapPicker;
