import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage = () => {
  return (
    <div className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-purple/20 rounded-full blur-[100px] -z-10"></div>

      <div className="text-center z-10 px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter"
        >
          CONNECT ACROSS <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">
            THE GALAXY
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10"
        >
          Methynix Connect detects nearby events using advanced geolocation. 
          Join celebrations, weddings, and parties near you with a holographic touch.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col md:flex-row gap-4 justify-center"
        >
          <Link to="/dashboard" className="px-8 py-3 bg-neon-cyan text-black font-bold rounded-lg shadow-[0_0_20px_rgba(0,243,255,0.4)] hover:scale-105 transition">
            Explore Events
          </Link>
          <Link to="/create-event" className="px-8 py-3 border border-neon-purple text-neon-purple font-bold rounded-lg hover:bg-neon-purple/10 transition">
            Project Event
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;