import { useState, useEffect, useContext } from 'react';
import { FaMapMarkerAlt, FaClock, FaTrash, FaUserPlus, FaCheckCircle, FaUserAstronaut } from 'react-icons/fa';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../contexts/AuthContext';
import api from '../services/axiosInstance';
import toast from 'react-hot-toast';
import ConfirmModal from './ConfirmModal';
import { motion } from 'framer-motion';

const EventCard = ({ event }) => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  
  const [timeLeft, setTimeLeft] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  // --- Derived State ---
  const isOrganizer = user?._id === event.organizer._id || user?._id === event.organizer;
  const isJoined = event.attendees.includes(user?._id);
  const isClosed = event.status !== 'active' || new Date(event.eventDate) < new Date();

  // --- Mutations ---
  const joinMutation = useMutation({
    mutationFn: () => api.post(`/events/${event._id}/join`),
    onSuccess: () => {
      toast.success('Access Granted: Added to manifest!');
      queryClient.invalidateQueries(['events']);
    },
    onError: (err) => toast.error(err)
  });

  const deleteMutation = useMutation({
    mutationFn: () => api.delete(`/events/${event._id}`),
    onSuccess: () => {
      toast.success('Hologram Terminated: Attendees notified.');
      queryClient.invalidateQueries(['events']);
      setDeleteModalOpen(false);
    },
    onError: (err) => toast.error(err)
  });

  // --- Countdown Logic ---
  useEffect(() => {
    const calculateTime = () => {
      const difference = new Date(event.eventDate) - new Date();
      
      if (difference <= 0) return 'EVENT CLOSED';
      
      // Urgent if less than 24 hours (86400000 ms)
      setIsUrgent(difference < 86400000);

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);

      if (days > 0) return `${days}d ${hours}h remaining`;
      return `${hours}h ${minutes}m remaining`;
    };

    const timer = setInterval(() => setTimeLeft(calculateTime()), 60000); // Update every min
    setTimeLeft(calculateTime()); // Initial call

    return () => clearInterval(timer);
  }, [event.eventDate]);

  return (
    <>
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className={`holo-card p-6 relative flex flex-col justify-between h-full transition-all duration-300 ${isClosed ? 'opacity-60 grayscale border-gray-700' : 'hover:shadow-[0_0_20px_rgba(0,243,255,0.2)]'}`}
      >
        {/* Header Section */}
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold font-orbitron text-neon-cyan truncate w-3/4" title={event.title}>
              {event.title}
            </h3>
            {isOrganizer && (
              <span className="text-[10px] uppercase font-bold bg-neon-purple/20 text-neon-purple px-2 py-1 rounded border border-neon-purple/50">
                Organizer
              </span>
            )}
          </div>
          
          <div className="flex items-center text-gray-300 text-sm mb-4">
            <FaMapMarkerAlt className="mr-2 text-neon-purple" />
            <span className="truncate">{event.location?.address || 'Location Coordinates Locked'}</span>
          </div>

          <p className="text-gray-400 text-sm line-clamp-3 mb-6 font-light">
            {event.description}
          </p>
        </div>

        {/* Footer / Actions */}
        <div className="border-t border-glass-border pt-4 mt-auto">
          <div className="flex items-center justify-between">
            
            {/* Timer */}
            <div className={`text-sm font-mono font-bold flex items-center ${isUrgent || isClosed ? 'text-neon-red' : 'text-green-400'}`}>
              <FaClock className="mr-2" />
              {timeLeft}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              {isOrganizer ? (
                <button 
                  onClick={() => setDeleteModalOpen(true)}
                  className="p-2 rounded-lg bg-red-500/10 text-red-500 border border-red-500/30 hover:bg-red-500 hover:text-white transition"
                  title="Terminate Event"
                >
                  <FaTrash />
                </button>
              ) : isJoined ? (
                <span className="flex items-center text-green-400 text-sm font-bold bg-green-400/10 px-3 py-1.5 rounded-lg border border-green-400/30">
                  <FaCheckCircle className="mr-2" /> Joined
                </span>
              ) : (
                !isClosed && (
                  <button 
                    onClick={() => joinMutation.mutate()}
                    disabled={joinMutation.isPending}
                    className="flex items-center px-4 py-1.5 rounded-lg bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/50 hover:bg-neon-cyan hover:text-black hover:shadow-[0_0_10px_rgba(0,243,255,0.5)] transition text-sm font-bold"
                  >
                    <FaUserPlus className="mr-2" /> 
                    {joinMutation.isPending ? 'Syncing...' : 'Join'}
                  </button>
                )
              )}
            </div>
          </div>
          
          {/* Attendees Count (Optional Polish) */}
          <div className="mt-3 flex items-center text-xs text-gray-500">
            <FaUserAstronaut className="mr-1" />
            {event.attendees?.length || 0} beings attending
          </div>
        </div>
      </motion.div>

      {/* Confirmation Modal Portal */}
      <ConfirmModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => deleteMutation.mutate()}
        title="TERMINATE EVENT SEQUENCE?"
        message="This action is irreversible. All joined users will be notified of the cancellation immediately."
      />
    </>
  );
};

export default EventCard;