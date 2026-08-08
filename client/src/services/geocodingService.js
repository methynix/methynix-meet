// Free geocoding service using OpenStreetMap Nominatim API
const NOMINATIM_API = 'https://nominatim.openstreetmap.org';

export const geocodingService = {
  // Convert coordinates to address using reverse geocoding
  reverseGeocode: async (latitude, longitude) => {
    try {
      const response = await fetch(
        `${NOMINATIM_API}/reverse?format=json&lat=${latitude}&lon=${longitude}`,
        {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'MethynixMeet/1.0'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Geocoding failed');
      }

      const data = await response.json();
      return {
        address: data.address?.road || data.address?.city || data.display_name,
        city: data.address?.city || data.address?.town || 'Unknown',
        country: data.address?.country,
        latitude: data.lat,
        longitude: data.lon
      };
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      return {
        address: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
        city: 'Unknown Location',
        country: 'Unknown',
        latitude,
        longitude
      };
    }
  },

  // Convert address to coordinates using forward geocoding
  forwardGeocode: async (address) => {
    try {
      const response = await fetch(
        `${NOMINATIM_API}/search?format=json&q=${encodeURIComponent(address)}&limit=1`,
        {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'MethynixMeet/1.0'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Geocoding failed');
      }

      const data = await response.json();

      if (data.length === 0) {
        throw new Error('Address not found');
      }

      const result = data[0];
      return {
        address: result.display_name,
        city: result.address?.city || result.address?.town || 'Unknown',
        latitude: parseFloat(result.lat),
        longitude: parseFloat(result.lon),
        country: result.address?.country
      };
    } catch (error) {
      console.error('Forward geocoding error:', error);
      throw error;
    }
  },

  // Get city from coordinates
  getCity: async (latitude, longitude) => {
    try {
      const result = await geocodingService.reverseGeocode(latitude, longitude);
      return result.city;
    } catch (error) {
      console.error('Error getting city:', error);
      return 'Unknown Location';
    }
  }
};

export default geocodingService;
