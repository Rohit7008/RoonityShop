import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const TermsPage = () => {
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
              Terms of Service
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
                <h2 className="text-2xl font-bold text-white">1. Agreement to Terms</h2>
                <p className="text-gray-400">
                  By accessing and using ROONITY's website and services, you agree to be bound by these Terms of Service. 
                  If you disagree with any part of these terms, you may not access our services.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">2. Use of Services</h2>
                <p className="text-gray-400">
                  Our services are intended for personal, non-commercial use. You agree not to use our services for any 
                  illegal or unauthorized purpose, and you must not violate any laws in your jurisdiction.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">3. Intellectual Property</h2>
                <p className="text-gray-400">
                  All content, including but not limited to text, graphics, logos, and images, is the property of ROONITY 
                  and is protected by intellectual property laws.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">4. User Accounts</h2>
                <p className="text-gray-400">
                  You are responsible for maintaining the confidentiality of your account information and for all activities 
                  that occur under your account.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">5. Limitation of Liability</h2>
                <p className="text-gray-400">
                  ROONITY shall not be liable for any indirect, incidental, special, consequential, or punitive damages 
                  resulting from your use of or inability to use our services.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">6. Changes to Terms</h2>
                <p className="text-gray-400">
                  We reserve the right to modify these terms at any time. We will notify users of any material changes 
                  through our website or via email.
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

export default TermsPage; 