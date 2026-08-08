import { motion } from 'framer-motion';
import usePageMeta from '../hooks/usePageMeta';

const TermsAndConditions = () => {
  usePageMeta({
    title: 'Terms & Conditions',
    description: 'Read the terms of service for using Methynix Connect. Understand your rights and responsibilities as a user of our platform.'
  });
  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: 'By accessing and using Methynix Connect ("the Service"), you accept and agree to be bound by the terms, conditions, and notices contained in this agreement. If you do not agree to abide by the above, please do not use this service.'
    },
    {
      title: '2. Use License',
      content: 'Permission is granted to temporarily download one copy of the materials (information or software) on Methynix Connect for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not: (a) modify or copy the materials; (b) use the materials for any commercial purpose or for any public display; (c) attempt to decompile or reverse engineer any software contained on the Service; (d) remove any copyright or other proprietary notations from the materials; (e) transfer the materials to another person or "mirror" the materials on any other server.'
    },
    {
      title: '3. Disclaimer of Warranties',
      content: 'The materials on Methynix Connect are provided on an "as is" basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.'
    },
    {
      title: '4. Limitations of Liability',
      content: 'In no event shall Methynix Connect or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Methynix Connect, even if we have been notified of the possibility of such damage.'
    },
    {
      title: '5. Accuracy of Materials',
      content: 'The materials appearing on Methynix Connect could include technical, typographical, or photographic errors. We do not warrant that any of the materials on our Service are accurate, complete, or current. We may make changes to the materials contained on our Service at any time without notice.'
    },
    {
      title: '6. Materials and Content Ownership',
      content: 'The materials on Methynix Connect are owned or controlled by us or by third parties, and content available through the Service is protected by applicable copyright, trademark, and other intellectual property laws. Your use of the Service does not grant you ownership rights to any content, documents, products, websites, or tools accessible through the Service.'
    },
    {
      title: '7. Prohibited Conduct',
      content: 'When using the Service, you agree not to: (a) create events or post content that is illegal, obscene, or defamatory; (b) harass, threaten, or intimidate other users; (c) engage in fraud, phishing, or any deceptive practices; (d) attempt to gain unauthorized access to our systems; (e) spam or send unsolicited messages; (f) violate any applicable laws or regulations.'
    },
    {
      title: '8. Event Liability',
      content: 'Users are responsible for the accuracy and legality of events they create. Methynix Connect is not liable for injuries, damages, or losses arising from attendance at events listed on our platform. Event organizers and attendees assume all risks associated with event participation. We reserve the right to remove events that violate our policies.'
    },
    {
      title: '9. User Accounts',
      content: 'When you create an account, you must provide accurate, complete information. You are responsible for maintaining the confidentiality of your account credentials and password. You agree to accept responsibility for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.'
    },
    {
      title: '10. Geolocation Terms',
      content: 'By using our Service, you grant us permission to collect and use your precise geolocation data for the purpose of displaying nearby events. You can withdraw this permission at any time through your device settings or account preferences. Accuracy of geolocation data is dependent on your device and network conditions.'
    },
    {
      title: '11. Termination of Service',
      content: 'We reserve the right, at our sole discretion, to deny access to anyone for any reason at any time. We may terminate or suspend your account and/or access to the Service immediately and without notice if you violate these Terms or engage in any conduct that we determine, in our sole discretion, to be inappropriate or harmful.'
    },
    {
      title: '12. Dispute Resolution',
      content: 'Any disputes arising from these Terms or your use of the Service shall be governed by and construed in accordance with applicable law. You agree to submit to the exclusive jurisdiction of the courts in the relevant jurisdiction for any legal proceedings.'
    },
    {
      title: '13. Third-Party Links',
      content: 'Methynix Connect may contain links to third-party websites. We are not responsible for the contents of any third-party websites linked to or from our Service, nor do we endorse them. Your use of third-party websites is at your own risk and subject to their terms of service.'
    },
    {
      title: '14. Intellectual Property Rights',
      content: 'All content, features, and functionality of the Service, including but not limited to text, graphics, logos, and software, are owned by Methynix Connect or its content suppliers. You may not reproduce, distribute, transmit, display, or perform any content from the Service without our express written permission.'
    },
    {
      title: '15. Payment and Refunds',
      content: 'If the Service offers paid features, all fees are exclusive of applicable taxes and are non-refundable except as required by law. You authorize us to charge applicable fees to your payment method. We reserve the right to change fees with notice.'
    },
    {
      title: '16. User-Generated Content',
      content: 'You retain ownership of content you create, including events and comments. By posting content on our Service, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute that content. You represent and warrant that you own or have the rights to the content you post.'
    },
    {
      title: '17. Modifications to Terms',
      content: 'We reserve the right to modify these Terms and Conditions at any time. Changes will be effective upon posting to the Service. Your continued use of the Service following the posting of modified Terms constitutes your acceptance of the changes.'
    },
    {
      title: '18. Severability',
      content: 'If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.'
    },
    {
      title: '19. Contact Information',
      content: 'For questions about these Terms and Conditions, please contact us at legal@methynix.com or Methynix Connect, Legal Department, [Company Address].'
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
          <h1 className="text-5xl font-bold mb-4 text-neon-cyan">Terms & Conditions</h1>
          <p className="text-gray-400 text-lg mb-12">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>

        <div className="space-y-8">
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
              <p className="text-gray-300 leading-relaxed">{section.content}</p>
            </motion.section>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 holo-card p-8 bg-neon-red/5"
        >
          <p className="text-gray-300 text-sm font-semibold mb-2">Important Notice:</p>
          <p className="text-gray-300 text-sm">
            By using Methynix Connect, you acknowledge that you have read, understood, and agree to be bound
            by these Terms and Conditions. If you do not agree to any part of these terms, please cease
            using the Service immediately.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
