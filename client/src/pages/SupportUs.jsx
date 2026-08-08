import { motion } from 'framer-motion';
import { FaHeart, FaUsers, FaGift, FaTrophy, FaEnvelope, FaPhone } from 'react-icons/fa';
import usePageMeta from '../hooks/usePageMeta';

const SupportUs = () => {
  usePageMeta({
    title: 'Support Us',
    description: 'Help us build the future of community event discovery. Support Methynix Connect and make a difference.'
  });

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
    viewport: { once: true, margin: '-100px' }
  };

  const supportOptions = [
    {
      icon: FaHeart,
      title: 'Donate',
      description: 'Support our mission with a one-time or recurring donation. Every contribution helps us improve the platform.',
      action: 'Donate Now',
      link: 'mailto:info@methynix.com?subject=Donation%20Inquiry'
    },
    {
      icon: FaUsers,
      title: 'Become a Partner',
      description: 'Partner with us to bring Methynix Connect to more communities and create mutual growth opportunities.',
      action: 'Partner With Us',
      link: 'mailto:info@methynix.com?subject=Partnership%20Inquiry'
    },
    {
      icon: FaGift,
      title: 'Sponsor an Event',
      description: 'Sponsor local events in your community and gain visibility while supporting community building.',
      action: 'Explore Sponsorship',
      link: 'mailto:info@methynix.com?subject=Sponsorship%20Inquiry'
    }
  ];

  const testimonials = [
    {
      name: 'Local Community Organizer',
      role: 'Event Coordinator',
      quote: 'Methynix Connect has made it so much easier to reach people in my community who want to join events.'
    },
    {
      name: 'City Developer',
      role: 'Municipal Partner',
      quote: 'This platform is revolutionizing how local communities connect and organize events.'
    }
  ];

  return (
    <div className="min-h-screen bg-deep-space text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-neon-cyan">Support Us</h1>
          <p className="text-xl text-gray-300 mb-8">
            Help us build a thriving platform that connects communities through real events.
          </p>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Methynix Connect is dedicated to revolutionizing how people discover and participate in local events.
            Your support helps us continue this mission.
          </p>
        </motion.div>
      </section>

      {/* Support Options */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-neon-cyan">How You Can Help</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              There are many ways to support Methynix Connect and be part of our growth story.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {supportOptions.map((option, idx) => {
              const IconComponent = option.icon;
              return (
                <motion.div
                  key={idx}
                  {...fadeInUp}
                  transition={{ ...fadeInUp.transition, delay: idx * 0.15 }}
                  className="holo-card p-8 hover:border-neon-cyan/40 transition duration-300"
                >
                  <div className="mb-4 inline-block p-4 bg-neon-cyan/10 rounded-lg">
                    <IconComponent size={32} className="text-neon-cyan" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white">{option.title}</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">{option.description}</p>
                  <a
                    href={option.link}
                    className="inline-block px-6 py-2 bg-neon-cyan text-deep-space font-bold rounded-lg hover:scale-105 transition"
                  >
                    {option.action}
                  </a>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Support Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeInUp} className="holo-card p-12 bg-neon-purple/5">
            <h2 className="text-4xl font-bold mb-8 text-neon-cyan">Why Support Methynix Connect?</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-neon-purple mb-2">Community Impact</h3>
                <p className="text-gray-300">
                  Every event discovered, every person connected strengthens local communities. Your support directly enables this impact.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-neon-purple mb-2">Innovation</h3>
                <p className="text-gray-300">
                  We're continuously innovating to make event discovery smarter, faster, and more accessible to everyone.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-neon-purple mb-2">Security & Privacy</h3>
                <p className="text-gray-300">
                  Your support helps us maintain banking-grade security and protect user privacy with industry-leading standards.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-neon-purple mb-2">Growth & Expansion</h3>
                <p className="text-gray-300">
                  With your help, we're expanding to more cities and bringing Methynix Connect to more communities worldwide.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeInUp} className="text-center">
            <h2 className="text-4xl font-bold mb-8 text-neon-cyan">Get In Touch</h2>
            <p className="text-gray-400 mb-12 text-lg">
              Have questions about supporting Methynix Connect? We'd love to hear from you!
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <div className="holo-card p-8">
                <FaPhone className="text-neon-cyan text-3xl mx-auto mb-4" />
                <p className="text-sm text-gray-400 mb-2">Call Us</p>
                <a href="tel:0715455422" className="text-neon-cyan font-bold hover:text-neon-purple transition">
                  0715455422
                </a>
              </div>
              <div className="holo-card p-8">
                <FaEnvelope className="text-neon-cyan text-3xl mx-auto mb-4" />
                <p className="text-sm text-gray-400 mb-2">Email Us</p>
                <a href="mailto:info@methynix.com" className="text-neon-cyan font-bold hover:text-neon-purple transition">
                  info@methynix.com
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-neon-cyan mb-4">Our Impact</h2>
            <p className="text-gray-400">Thanks to supporters like you</p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: FaTrophy, number: '50K+', label: 'Active Users' },
              { icon: FaUsers, number: '150+', label: 'Cities Covered' },
              { icon: FaGift, number: '10K+', label: 'Monthly Events' },
              { icon: FaHeart, number: '99.9%', label: 'Uptime' }
            ].map((stat, idx) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={idx}
                  {...fadeInUp}
                  transition={{ ...fadeInUp.transition, delay: idx * 0.1 }}
                  className="holo-card p-6 text-center"
                >
                  <IconComponent className="text-neon-cyan text-3xl mx-auto mb-4" />
                  <p className="text-3xl font-bold text-neon-cyan mb-2">{stat.number}</p>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="max-w-4xl mx-auto text-center holo-card p-8">
          <p className="text-gray-300 text-sm mb-4">
            Methynix Software Company is committed to building technology that brings communities together.
          </p>
          <p className="text-gray-500 text-xs">
            For business inquiries, partnerships, or sponsorship opportunities, please contact us at info@methynix.com or call 0715455422
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default SupportUs;
