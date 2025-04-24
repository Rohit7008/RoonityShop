import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const PrivacyPage = () => {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="relative">
          {/* Background grid effect */}
          <div className="absolute inset-0 opacity-5">
            <div className="h-full w-full" style={{
              backgroundImage: 'linear-gradient(to right, #9b87f5 1px, transparent 1px), linear-gradient(to bottom, #9b87f5 1px, transparent 1px)',
              backgroundSize: '2rem 2rem'
            }}></div>
          </div>
          
          <div className="container mx-auto px-4 py-12 relative z-10">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-6xl font-bold text-white text-center mb-4"
            >
              Privacy Policy
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-400 text-center max-w-2xl mx-auto mb-16"
            >
              Last updated: {new Date().toLocaleDateString()}
            </motion.p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">1. Information We Collect</h2>
                <p className="text-gray-400">
                  We collect information that you provide directly to us, including your name, email address, 
                  shipping address, and payment information when you make a purchase.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">2. How We Use Your Information</h2>
                <p className="text-gray-400">
                  We use the information we collect to process your orders, communicate with you about your purchases, 
                  and improve our services. We may also use your information to send you marketing communications 
                  if you have opted in to receive them.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">3. Information Sharing</h2>
                <p className="text-gray-400">
                  We do not sell or rent your personal information to third parties. We may share your information 
                  with service providers who assist us in operating our website and conducting our business.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">4. Data Security</h2>
                <p className="text-gray-400">
                  We implement appropriate security measures to protect your personal information. However, 
                  no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">5. Your Rights</h2>
                <p className="text-gray-400">
                  You have the right to access, correct, or delete your personal information. You may also opt out 
                  of receiving marketing communications from us at any time.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">6. Changes to This Policy</h2>
                <p className="text-gray-400">
                  We may update this privacy policy from time to time. We will notify you of any changes by posting 
                  the new policy on this page and updating the "Last updated" date.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPage; 