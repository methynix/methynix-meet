import { useGeoLocation } from '../hooks/useGeoLocation';
import { useGetNearbyEvents } from '../hooks/useEventsQuery'; // Defined in previous step
import EventCard from '../components/EventCard'; // Defined in previous step
import { FaSatelliteDish } from 'react-icons/fa';

const Dashboard = () => {
  const { loaded, coordinates, error } = useGeoLocation();
  
  // Only fetch if we have coordinates
  const { data: events, isLoading, isError } = useGetNearbyEvents(coordinates.long, coordinates.lat);

  if (!loaded) return <div className="text-center mt-20 text-neon-cyan animate-pulse">Triangulating Position...</div>;
  if (error) return <div className="text-center mt-20 text-neon-red">Location Access Denied. Cannot detect events.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <FaSatelliteDish className="text-neon-purple" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-white">
            Detected Events Nearby
          </span>
        </h1>
        <div className="text-gray-400 text-sm font-mono border border-glass-border px-3 py-1 rounded">
          LOC: {coordinates.lat.toFixed(4)}, {coordinates.long.toFixed(4)}
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3].map(i => <div key={i} className="holo-card h-64 animate-pulse bg-white/5"></div>)}
        </div>
      ) : isError ? (
        <div className="text-neon-red text-center">Failed to download event data holograms.</div>
      ) : events?.length === 0 ? (
        <div className="text-center py-20 opacity-50">
          <h2 className="text-2xl mb-2">Sector Clear</h2>
          <p>No events detected within range. Be the first to start one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;