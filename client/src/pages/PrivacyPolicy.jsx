import { motion } from 'framer-motion';
import usePageMeta from '../hooks/usePageMeta';

const PrivacyPolicy = () => {
  usePageMeta({
    title: 'Privacy Policy',
    description: 'Learn how Methynix Connect protects your privacy and data. We are committed to transparent data practices and GDPR compliance.'
  });
  const sections = [
    {
      title: '1. Introduction',
      content: 'Methynix Connect ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our platform.'
    },
    {
      title: '2. Information We Collect',
      subsections: [
        {
          subtitle: '2.1 Personal Information',
          content: 'We collect information you provide directly, including: name, email address, phone number, profile photo, date of birth, and location data. We also collect information about events you create, attend, or interact with.'
        },
        {
          subtitle: '2.2 Geolocation Data',
          content: 'With your explicit permission, we collect precise geolocation data through your device to display nearby events and enable the core functionality of our platform. This data is used solely for event discovery and is never shared with third parties without consent.'
        },
        {
          subtitle: '2.3 Device Information',
          content: 'We automatically collect certain technical information from your device, including IP address, browser type, operating system, and device identifiers.'
        }
      ]
    },
    {
      title: '3. How We Use Your Information',
      content: 'We use the information we collect to: (a) provide, maintain, and improve our services; (b) process transactions and send related information; (c) send marketing and promotional communications (with your consent); (d) detect and prevent fraudulent activity; (e) comply with legal obligations; (f) enforce our Terms and Conditions.'
    },
    {
      title: '4. Data Security',
      content: 'We implement industry-standard security measures including encryption (HTTPS/TLS), secure password hashing (bcrypt/argon2), and regular security audits. However, no method of transmission over the internet is entirely secure. We continuously monitor and update our security practices to protect against unauthorized access, alteration, or disclosure.'
    },
    {
      title: '5. Cookies and Tracking Technologies',
      content: 'We use cookies and similar tracking technologies to enhance your experience. You can control cookie settings through your browser. We do not use third-party advertising cookies. All tracking is limited to analytics and functional purposes.'
    },
    {
      title: '6. Third-Party Services',
      content: 'We may integrate with third-party services for mapping (OpenStreetMap), payment processing, and analytics. These providers have their own privacy policies. We recommend reviewing them. We never sell your personal data to third parties.'
    },
    {
      title: '7. Your Rights',
      content: 'You have the right to: access, update, or delete your personal information; opt-out of marketing communications; request a copy of your data; withdraw consent for geolocation tracking. To exercise these rights, contact us at privacy@methynix.com.'
    },
    {
      title: '8. Data Retention',
      content: 'We retain your data as long as your account is active or as required by law. You can request deletion of your account and associated data at any time. Some data may be retained for legal compliance purposes.'
    },
    {
      title: '9. International Data Transfers',
      content: 'If you access our services from outside your country of residence, your data may be transferred to and stored in countries other than your country of residence. These countries may have data protection laws that differ from your home country. By using our services, you consent to such transfers.'
    },
    {
      title: '10. Children\'s Privacy',
      content: 'Our services are not intended for users under 13 years of age. We do not knowingly collect personal information from children under 13. If we learn we have collected such information, we will promptly delete it.'
    },
    {
      title: '11. Policy Changes',
      content: 'We may update this Privacy Policy periodically. We will notify you of significant changes via email or prominent notice on our platform. Your continued use of our services after such modifications constitutes acceptance of the updated policy.'
    },
    {
      title: '12. Contact Us',
      content: 'For privacy-related questions or concerns, please contact us at privacy@methynix.com or Methynix Connect, Privacy Department, [Company Address].'
    }
  ];

  return (
    <div className="min-h-screen bg-deep-space text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold mb-4 text-neon-cyan">Privacy Policy</h1>
          <p className="text-gray-400 text-lg mb-12">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>

        <div className="space-y-12">
          {sections.map((section, idx) => (
            <motion.section
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              viewport={{ once: true, margin: '-100px' }}
              className="holo-card p-8"
            >
              <h2 className="text-2xl font-bold text-neon-cyan mb-4">{section.title}</h2>

              {section.content && (
                <p className="text-gray-300 leading-relaxed mb-4">{section.content}</p>
              )}

              {section.subsections && (
                <div className="space-y-4">
                  {section.subsections.map((sub, subIdx) => (
                    <div key={subIdx} className="ml-4">
                      <h3 className="text-lg font-semibold text-neon-purple mb-2">{sub.subtitle}</h3>
                      <p className="text-gray-300 leading-relaxed">{sub.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.section>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 holo-card p-8 bg-neon-purple/5"
        >
          <p className="text-gray-300 text-sm">
            If you have any questions about this Privacy Policy or our privacy practices,
            please don't hesitate to contact us. We take your privacy seriously and are committed
            to transparency in how we handle your data.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
