import { Link } from 'react-router-dom';
import { FaGithub, FaTwitter, FaLinkedin, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-deep-space border-t border-neon-purple/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-neon-cyan mb-4">Methynix Connect</h3>
            <p className="text-gray-400 text-sm">
              Discover events and connect with people around you through advanced geolocation technology.
            </p>
            <p className="text-gray-500 text-xs mt-4">
              Made by Methynix Software Company
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><Link to="/dashboard" className="text-gray-400 hover:text-neon-cyan transition">Explore Events</Link></li>
              <li><Link to="/create-event" className="text-gray-400 hover:text-neon-cyan transition">Create Event</Link></li>
              <li><a href="#features" className="text-gray-400 hover:text-neon-cyan transition">Features</a></li>
              <li><Link to="/support" className="text-gray-400 hover:text-neon-cyan transition">Support Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-gray-400 hover:text-neon-cyan transition">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-neon-cyan transition">Terms & Conditions</Link></li>
              <li><a href="mailto:info@methynix.com" className="text-gray-400 hover:text-neon-cyan transition">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Get In Touch</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <FaPhone size={16} className="text-neon-cyan" />
                <a href="tel:0715455422" className="text-gray-400 hover:text-neon-cyan transition text-sm">
                  0715455422
                </a>
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope size={16} className="text-neon-cyan" />
                <a href="mailto:info@methynix.com" className="text-gray-400 hover:text-neon-cyan transition text-sm">
                  info@methynix.com
                </a>
              </div>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-400 hover:text-neon-cyan transition"><FaGithub size={20} /></a>
                <a href="#" className="text-gray-400 hover:text-neon-cyan transition"><FaTwitter size={20} /></a>
                <a href="#" className="text-gray-400 hover:text-neon-cyan transition"><FaLinkedin size={20} /></a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-neon-purple/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">
                &copy; {currentYear} Methynix Software Company. All rights reserved.
              </p>
              <p className="text-gray-600 text-xs mt-1">
                Methynix Connect - Geolocation Event Discovery Platform
              </p>
            </div>
            <p className="text-gray-500 text-sm mt-4 md:mt-0">
              Built with precision by Methynix
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
