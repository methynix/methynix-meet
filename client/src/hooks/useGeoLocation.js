import { useState, useEffect } from 'react';

export const useGeoLocation = () => {
  const [location, setLocation] = useState({ loaded: false, coordinates: { lat: "", long: "" } });

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setLocation({ loaded: true, error: "Geo not supported" });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          loaded: true,
          coordinates: {
            lat: position.coords.latitude,
            long: position.coords.longitude,
          },
        });
      },
      (error) => {
        setLocation({ loaded: true, error });
      }
    );
  }, []);

  return location;
};