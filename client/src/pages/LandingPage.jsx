import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMapPin, FaCalendarAlt, FaUsers, FaShieldAlt, FaRocket, FaBolt } from 'react-icons/fa';
import usePageMeta from '../hooks/usePageMeta';

const LandingPage = () => {
  usePageMeta({
    title: 'Discover Events Near You',
    description: 'Find real events happening in your city and connect with local communities. Methynix Connect uses geolocation to show you nearby events and gatherings.',
    keywords: 'events, geolocation, local community, meetups, celebrations'
  });

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
    viewport: { once: true, margin: '-100px' }
  };

  const features = [
    {
      icon: FaMapPin,
      title: 'Real-Time Location Discovery',
      description: 'Find events happening right now within walking distance. Our geospatial technology pinpoints gatherings in your city with precision.'
    },
    {
      icon: FaCalendarAlt,
      title: 'Event Creation Made Simple',
      description: 'Project your events with just a few clicks. Location is automatically locked to your city to maintain data authenticity and prevent misuse.'
    },
    {
      icon: FaUsers,
      title: 'Direct Community Connection',
      description: 'Connect with local event organizers and attendees. Build your network through genuine, geographically-bound interactions.'
    },
    {
      icon: FaShieldAlt,
      title: 'Security First',
      description: 'Your location and personal data are encrypted and protected. We never share your information with third parties without explicit consent.'
    },
    {
      icon: FaRocket,
      title: 'Lightning Fast',
      description: 'Optimized performance means you get event results instantly. No lag, no delays, just pure speed.'
    },
    {
      icon: FaBolt,
      title: 'Real-Time Updates',
      description: 'Events update as they happen. Get instant notifications about events near you and changes to events you follow.'
    }
  ];

  const howItWorks = [
    {
      step: '01',
      title: 'Create Your Account',
      description: 'Sign up in seconds with your email. Set your location preferences and configure notification settings.'
    },
    {
      step: '02',
      title: 'Discover Nearby Events',
      description: 'Our platform detects your location and shows you all events happening near you right now and in the coming weeks.'
    },
    {
      step: '03',
      title: 'Join or Create',
      description: 'Attend existing events or create your own. Build your community and connect with people who share your interests.'
    },
    {
      step: '04',
      title: 'Connect & Enjoy',
      description: 'Meet people at events, exchange details, and build lasting connections within your local community.'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Active Users' },
    { number: '10K+', label: 'Events Monthly' },
    { number: '150+', label: 'Cities Covered' },
    { number: '99.9%', label: 'Uptime' }
  ];

  return (
    <div className="relative min-h-screen bg-deep-space text-white overflow-hidden">
      {/* Hero Section with Video Background */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-10 overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 -z-10">
          <video
            autoPlay
            muted
            loop
            className="absolute inset-0 w-full h-full object-cover opacity-35"
            src="/meeting-video.mp4"
          />
          <div className="absolute inset-0 bg-deep-space/85"></div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center z-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-block mb-6"
          >
            <span className="px-4 py-2 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan text-sm font-semibold">
              ✨ Discover Events Near You
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight text-neon-cyan"
          >
            Connect Across Your Galaxy
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            Find real events happening right now in your city. Connect with genuine people, celebrate together,
            and build your local community through authentic, location-based discovery.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/register"
              className="px-8 py-4 bg-neon-cyan text-deep-space font-bold rounded-lg hover:scale-105 transition transform duration-300 shadow-subtle"
            >
              Start Discovering Events
            </Link>
            <Link
              to="/dashboard"
              className="px-8 py-4 border-2 border-neon-purple text-neon-purple font-bold rounded-lg hover:bg-neon-purple/10 transition duration-300"
            >
              Explore as Guest
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          {...fadeInUp}
          className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
        >
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="holo-card p-6 text-center transform hover:scale-105 transition duration-300"
            >
              <p className="text-3xl md:text-4xl font-bold text-neon-cyan mb-2">
                {stat.number}
              </p>
              <p className="text-gray-400 text-sm md:text-base">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Showcase Section with Real Content */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-neon-cyan">
              Real Events. Real People.
            </h2>
            <h3 className="text-2xl text-neon-purple mb-4">Real Connections</h3>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              See how communities are connecting through Methynix Connect
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { image: '/meeting1.jpg', title: 'Community Gatherings', desc: 'Join vibrant local meetups and celebrations' },
              { image: '/meeting2.jpg', title: 'Network Events', desc: 'Connect with professionals in your area' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                {...fadeInUp}
                transition={{ ...fadeInUp.transition, delay: idx * 0.2 }}
                className="group relative overflow-hidden rounded-lg shadow-subtle"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-deep-space via-transparent to-transparent z-10"></div>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[400px] object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 border border-neon-purple/20 rounded-lg group-hover:border-neon-cyan/40 transition duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                  <h3 className="text-2xl font-bold mb-2 text-neon-cyan">{item.title}</h3>
                  <p className="text-gray-300">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-neon-cyan">
              Powerful Features Built for
            </h2>
            <h3 className="text-2xl text-neon-purple">Real Connections</h3>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mt-4">
              Everything you need to discover, create, and join events in your community
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={idx}
                  {...fadeInUp}
                  transition={{ ...fadeInUp.transition, delay: idx * 0.1 }}
                  className="holo-card p-8 group hover:border-neon-cyan/40 transition duration-300"
                >
                  <div className="mb-4 inline-block p-3 bg-neon-cyan/10 rounded-lg group-hover:bg-neon-purple/10 transition">
                    <IconComponent size={24} className="text-neon-cyan group-hover:text-neon-purple transition" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-neon-cyan">
              How It Works
            </h2>
            <h3 className="text-2xl text-neon-purple">Simple & Intuitive</h3>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {howItWorks.map((item, idx) => (
              <motion.div
                key={idx}
                {...fadeInUp}
                transition={{ ...fadeInUp.transition, delay: idx * 0.15 }}
                className="relative"
              >
                {idx < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-neon-purple/30"></div>
                )}
                <div className="holo-card p-8 relative z-10">
                  <div className="text-4xl font-bold text-neon-cyan mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeInUp} className="holo-card p-12 bg-neon-purple/5">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neon-cyan">
                  Your Privacy
                </h2>
                <p className="text-3xl md:text-3xl font-bold mb-6 text-neon-purple">
                  Our Priority
                </p>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  We use military-grade encryption and industry-standard security protocols to protect your data.
                  Your location is only used to show you nearby events.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-300">
                    <span className="w-2 h-2 bg-neon-cyan rounded-full mr-3"></span>
                    End-to-end encrypted data transmission
                  </li>
                  <li className="flex items-center text-gray-300">
                    <span className="w-2 h-2 bg-neon-purple rounded-full mr-3"></span>
                    GDPR & privacy law compliant
                  </li>
                  <li className="flex items-center text-gray-300">
                    <span className="w-2 h-2 bg-neon-cyan rounded-full mr-3"></span>
                    No third-party data sharing
                  </li>
                  <li className="flex items-center text-gray-300">
                    <span className="w-2 h-2 bg-neon-purple rounded-full mr-3"></span>
                    Regular security audits
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="bg-neon-cyan/5 border border-neon-cyan/20 rounded-lg p-8 text-center">
                  <FaShieldAlt size={48} className="mx-auto mb-4 text-neon-cyan" />
                  <p className="text-gray-300 text-sm font-semibold">Banking-Grade Security</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <motion.div
          {...fadeInUp}
          className="max-w-4xl mx-auto text-center holo-card p-12 bg-neon-cyan/5"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-neon-cyan">
            Ready to Join Your
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-6 text-neon-purple">
            Local Community?
          </h3>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Discover events happening right now, connect with people around you, and create unforgettable memories.
          </p>
          <Link
            to="/register"
            className="inline-block px-10 py-4 bg-neon-cyan text-deep-space font-bold rounded-lg hover:scale-105 transition transform duration-300 shadow-subtle"
          >
            Get Started Free Today
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default LandingPage;
