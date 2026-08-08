import { useState, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaSatelliteDish, FaMapMarkerAlt } from 'react-icons/fa';
import EventCard from '../components/EventCard';
import api from '../services/axiosInstance';
import { AuthContext } from '../contexts/AuthContext';
import usePageMeta from '../hooks/usePageMeta';
import { motion } from 'framer-motion';

const Dashboard = () => {
  usePageMeta({
    title: 'Discover Events',
    description: 'Browse and discover local events happening near you. Join the community and connect with people around you.'
  });

  const { user } = useContext(AuthContext);
  const [searchRadius, setSearchRadius] = useState(50);

  const fetchAllEvents = async () => {
    try {
      const response = await api.get('/events');
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching events:', error);
      return [];
    }
  };

  const { data: events = [], isLoading, isError } = useQuery({
    queryKey: ['events', searchRadius],
    queryFn: fetchAllEvents,
    refetchInterval: 30000,
  });

  const activeEvents = events.filter(event => {
    const eventDate = new Date(event.eventDate);
    const now = new Date();
    return event.status === 'active' && eventDate > now;
  });

  const sortedEvents = activeEvents.sort(
    (a, b) => new Date(a.eventDate) - new Date(b.eventDate)
  );

  return (
    <div className="min-h-screen bg-deep-space">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold flex items-center gap-3 text-neon-cyan mb-2">
                <FaSatelliteDish className="text-neon-purple" />
                Discover Events
              </h1>
              <p className="text-gray-400 text-lg">
                Browse amazing events happening in your area
              </p>
            </div>

            {user && (
              <div className="bg-neon-cyan/10 border border-neon-cyan/30 rounded-lg px-4 py-2 text-sm">
                <div className="text-neon-cyan font-bold">Welcome back!</div>
                <div className="text-gray-400">{user.name}</div>
              </div>
            )}
          </div>

          {!user && (
            <div className="bg-neon-purple/10 border border-neon-purple/30 rounded-lg p-4 mb-6">
              <p className="text-gray-300">
                <span className="text-neon-purple font-bold">💡 Tip:</span> Log in to join events and see your event history
              </p>
            </div>
          )}
        </motion.div>

        {/* Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="holo-card h-80 animate-pulse bg-white/5"
              />
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-20">
            <p className="text-neon-red text-lg">
              Failed to load events. Please try again later.
            </p>
          </div>
        ) : sortedEvents.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-24 holo-card p-12"
          >
            <FaSatelliteDish className="text-6xl text-neon-purple/50 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-neon-cyan mb-2">
              No Active Events
            </h2>
            <p className="text-gray-400 text-lg mb-6 max-w-md mx-auto">
              No events are currently available. Check back soon or create your own event to get started!
            </p>
            {user && (
              <a
                href="/create-event"
                className="inline-block px-6 py-2 bg-neon-cyan text-deep-space font-bold rounded-lg hover:scale-105 transition"
              >
                Create Event
              </a>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 flex items-center justify-between">
              <div className="text-gray-400">
                <span className="font-bold text-neon-cyan">
                  {sortedEvents.length}
                </span>{' '}
                active events available
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedEvents.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
