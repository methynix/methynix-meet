import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../contexts/AuthContext';
import api from '../services/axiosInstance';
import { FaRocket, FaUserAstronaut, FaBell, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// --- Sub-Component: Notification Bell ---
const NotificationBell = () => {
  const { data: notifications } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      try {
        // Ensure you have this endpoint in your backend routes
        const res = await api.get('/auth/notifications'); 
        return res.data.data || [];
      } catch (error) {
        return [];
      }
    },
    refetchInterval: 30000, // Poll every 30s
    retry: false
  });

  const unreadCount = notifications?.filter(n => !n.read).length || 0;

  return (
    <div className="relative group cursor-pointer mr-4">
      <div className="p-2 rounded-full hover:bg-white/10 transition">
        <FaBell className={`text-xl ${unreadCount > 0 ? 'text-neon-cyan' : 'text-gray-400'}`} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 bg-neon-red text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full animate-pulse">
            {unreadCount}
          </span>
        )}
      </div>

      {/* Dropdown Content */}
      <div className="absolute right-0 mt-2 w-72 bg-[#050511] border border-glass-border rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.5)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
        <div className="bg-white/5 px-4 py-2 border-b border-white/5">
          <h4 className="text-xs font-bold text-neon-purple uppercase tracking-wider">System Logs</h4>
        </div>
        <div className="max-h-64 overflow-y-auto">
          {!notifications || notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500 text-xs">No signals detected.</div>
          ) : (
            notifications.map((n, i) => (
              <div key={i} className={`p-3 border-b border-white/5 text-xs hover:bg-white/5 ${n.type === 'alert' ? 'text-neon-red' : 'text-gray-300'}`}>
                {n.message}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// --- Main Layout ---
const RootLayout = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinkClass = ({ isActive }) => 
    `text-sm font-bold tracking-wider transition duration-300 hover:text-neon-cyan ${isActive ? "text-neon-cyan drop-shadow-[0_0_5px_rgba(0,243,255,0.5)]" : "text-gray-400"}`;

  return (
    <div className="min-h-screen bg-deep-space text-white font-orbitron selection:bg-neon-purple selection:text-white">
      
      {/* --- Navbar --- */}
      <nav className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-3 group">
              <div className="p-2 bg-neon-purple/10 rounded-lg border border-neon-purple/30 group-hover:border-neon-cyan/50 transition duration-500">
                <FaRocket className="text-neon-cyan text-xl group-hover:rotate-45 transition-transform duration-500" />
              </div>
              <span className="text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">
                METHYNIX
              </span>
            </NavLink>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLink to="/" className={navLinkClass}>HOME</NavLink>
              <NavLink to="/dashboard" className={navLinkClass}>EVENTS</NavLink>
              
              {user ? (
                <>
                  <NavLink to="/create-event" className={navLinkClass}>PROJECT EVENT</NavLink>
                  <div className="h-6 w-px bg-gray-700 mx-2"></div>
                  
                  {/* User Section */}
                  <div className="flex items-center gap-2">
                    <NotificationBell />
                    <div className="flex items-center gap-3 pl-2">
                      <div className="text-right hidden lg:block">
                        <div className="text-xs text-neon-cyan font-bold">{user.name}</div>
                        <div className="text-[10px] text-gray-500">ID: {user._id.slice(-4)}</div>
                      </div>
                      <button 
                        onClick={handleLogout}
                        className="p-2 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white transition"
                        title="Logout"
                      >
                        <FaSignOutAlt />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <NavLink 
                  to="/login" 
                  className="flex items-center gap-2 px-5 py-2 rounded-full border border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black transition duration-300 font-bold text-xs tracking-widest"
                >
                  <FaUserAstronaut /> LOGIN
                </NavLink>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
               {user && <NotificationBell />}
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-neon-cyan text-2xl ml-4">
                {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu (AnimatePresence) */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/95 border-b border-glass-border overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-4 flex flex-col items-center">
                <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)} className={navLinkClass}>HOME</NavLink>
                <NavLink to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className={navLinkClass}>EVENTS</NavLink>
                {user ? (
                  <>
                    <NavLink to="/create-event" onClick={() => setIsMobileMenuOpen(false)} className={navLinkClass}>PROJECT EVENT</NavLink>
                    <button onClick={handleLogout} className="text-red-400 font-bold text-sm mt-4">TERMINATE SESSION</button>
                  </>
                ) : (
                  <NavLink to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-neon-cyan font-bold">LOGIN</NavLink>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- Main Content Injection --- */}
      <main className="pt-20 min-h-[calc(100vh-80px)] container mx-auto px-4">
        <Outlet />
      </main>

      {/* --- Global Toast Config --- */}
      <Toaster 
        position="top-right"
        toastOptions={{
          className: '',
          style: {
            background: 'rgba(5, 5, 17, 0.9)',
            backdropFilter: 'blur(10px)',
            color: '#fff',
            border: '1px solid #bc13fe',
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '14px',
          },
          success: {
            iconTheme: { primary: '#00f3ff', secondary: '#000' },
          },
          error: {
            iconTheme: { primary: '#ff0055', secondary: '#fff' },
          },
        }}
      />
    </div>
  );
};

export default RootLayout;