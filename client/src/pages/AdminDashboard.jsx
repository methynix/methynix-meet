import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/axiosInstance';
import { FaUsers, FaCalendarAlt, FaTrash, FaShieldAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const queryClient = useQueryClient();

  // Fetch Data
  const { data, isLoading, error } = useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      const res = await api.get('/admin/dashboard');
      return res.data.data;
    }
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/admin/event/${id}`),
    onSuccess: () => {
      toast.success('Event Removed from Database');
      queryClient.invalidateQueries(['adminStats']);
    }
  });

  if (isLoading) return <div className="text-center mt-20 text-neon-cyan animate-pulse">Loading Admin Interface...</div>;
  if (error) return <div className="text-center mt-20 text-neon-red">Access Denied</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <FaShieldAlt className="text-4xl text-neon-purple" />
        <h1 className="text-3xl font-orbitron text-white">COMMAND CENTER</h1>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="holo-card p-6 flex items-center justify-between bg-neon-cyan/5 border-neon-cyan/30">
          <div>
            <p className="text-gray-400 text-sm uppercase">Total Users</p>
            <p className="text-4xl font-bold text-neon-cyan">{data.stats.userCount}</p>
          </div>
          <FaUsers className="text-4xl text-neon-cyan/50" />
        </div>
        <div className="holo-card p-6 flex items-center justify-between bg-neon-purple/5 border-neon-purple/30">
          <div>
            <p className="text-gray-400 text-sm uppercase">Active Events</p>
            <p className="text-4xl font-bold text-neon-purple">{data.stats.eventCount}</p>
          </div>
          <FaCalendarAlt className="text-4xl text-neon-purple/50" />
        </div>
      </div>

      {/* EVENTS TABLE */}
      <div className="holo-card p-6 overflow-hidden">
        <h2 className="text-xl text-neon-cyan mb-4">Event Logs</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-white/5 text-neon-purple uppercase">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Organizer</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.events.map(event => (
                <tr key={event._id} className="border-b border-white/5 hover:bg-white/5 transition">
                  <td className="p-3 font-bold text-white">{event.title}</td>
                  <td className="p-3">{event.organizer?.name || 'Unknown'}</td>
                  <td className="p-3">{new Date(event.eventDate).toLocaleDateString()}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs ${event.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {event.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <button 
                      onClick={() => deleteMutation.mutate(event._id)}
                      className="text-red-400 hover:text-red-600 transition"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;