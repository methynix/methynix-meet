import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import toast from 'react-hot-toast';

// Fix Leaflet Icon Issue in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const LocationPicker = ({ onLocationSelect, initialCoords }) => {
  const [position, setPosition] = useState(initialCoords || null);
  const [userCity, setUserCity] = useState(null);

  // 1. Get User City on Mount
  useEffect(() => {
    const fetchUserCity = async () => {
      if (initialCoords) {
        try {
          const { data } = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${initialCoords.lat}&lon=${initialCoords.lng}`);
          // Nominatim returns address object. 'city', 'town', 'village', or 'county'
          const city = data.address.city || data.address.town || data.address.village || data.address.county;
          setUserCity(city);
          console.log("User Base City:", city);
        } catch (error) {
          console.error("Could not detect city");
        }
      }
    };
    fetchUserCity();
  }, [initialCoords]);

  // 2. Map Click Handler
  const MapClickHandler = () => {
    useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng;
        
        // Reverse Geocode the Clicked Point
        try {
          const { data } = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
          const clickedCity = data.address.city || data.address.town || data.address.village || data.address.county;

          if (!userCity) {
             // Fallback if initial load failed
             setPosition({ lat, lng });
             onLocationSelect({ lat, lng, address: data.display_name });
             return;
          }

          // THE "SAME CITY" CHECK
          if (clickedCity !== userCity) {
            toast.error(`Restriction: You are located in ${userCity}. You cannot post events in ${clickedCity}.`);
            return;
          }

          // Valid
          setPosition({ lat, lng });
          onLocationSelect({ lat, lng, address: data.display_name });
          toast.success(`Location set: ${clickedCity}`);
          
        } catch (error) {
          toast.error("Could not verify location details.");
        }
      },
    });
    return null;
  };

  if (!initialCoords) return <div className="text-neon-cyan animate-pulse">Acquiring Satellites...</div>;

  return (
    <div className="h-[300px] w-full rounded-lg overflow-hidden border border-glass-border relative z-0">
      <MapContainer center={[initialCoords.lat, initialCoords.lng]} zoom={11} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position || initialCoords}></Marker>
        <MapClickHandler />
      </MapContainer>
      <div className="absolute bottom-2 left-2 bg-black/80 text-xs text-white p-2 rounded z-[500]">
        Tap map to select location (Must be in {userCity || 'your city'})
      </div>
    </div>
  );
};

export default LocationPicker;