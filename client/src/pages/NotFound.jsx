import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaRocket } from 'react-icons/fa';
import usePageMeta from '../hooks/usePageMeta';

const NotFound = () => {
  usePageMeta({
    title: '404 - Page Not Found',
    description: 'The page you are looking for does not exist.'
  });

  return (
    <div className="min-h-screen bg-deep-space text-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="mb-8 flex justify-center"
        >
          <FaRocket size={80} className="text-neon-cyan" />
        </motion.div>

        <h1 className="text-6xl font-bold mb-4 text-neon-cyan">404</h1>
        <h2 className="text-3xl font-bold mb-4">Lost in Space</h2>
        <p className="text-gray-400 mb-8 text-lg">
          The coordinates you requested do not exist in this galaxy. Let's get you back on course.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-3 bg-neon-cyan text-deep-space font-bold rounded-lg hover:scale-105 transition"
          >
            Return Home
          </Link>
          <Link
            to="/dashboard"
            className="px-6 py-3 border-2 border-neon-purple text-neon-purple font-bold rounded-lg hover:bg-neon-purple/10 transition"
          >
            View Events
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
