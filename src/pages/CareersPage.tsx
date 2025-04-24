import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const CareersPage = () => {
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
              Careers
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-400 text-center max-w-2xl mx-auto mb-16"
            >
              Join our team and help shape the future of streetwear
            </motion.p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-white">Why Join ROONITY?</h2>
                <p className="text-gray-400">
                  We're building a team of passionate individuals who are excited about 
                  the intersection of streetwear, technology, and sustainability. 
                  At ROONITY, you'll have the opportunity to work on innovative projects 
                  and make a real impact in the fashion industry.
                </p>
                <p className="text-gray-400">
                  We value creativity, collaboration, and continuous learning. 
                  If you're looking for a dynamic work environment where you can grow 
                  both personally and professionally, we'd love to hear from you.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative h-[400px] rounded-lg overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/20 to-neon-blue/20"></div>
                <img 
                  src="https://images.unsplash.com/photo-1521791136064-7986c2929126?auto=format&fit=crop&w=800&q=80" 
                  alt="Careers" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>

            {/* Open Positions Section */}
            <div className="mt-24">
              <h2 className="text-3xl font-bold text-white mb-8">Open Positions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="p-6 rounded-lg border border-gray-800 hover:border-neon-purple transition-colors"
                >
                  <h3 className="text-xl font-bold text-white mb-2">Product Designer</h3>
                  <p className="text-gray-400 mb-4">Full-time • Remote</p>
                  <p className="text-gray-400 mb-4">
                    Join our design team to create innovative streetwear collections.
                  </p>
                  <button className="text-neon-purple hover:text-neon-blue transition-colors">
                    Apply Now →
                  </button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="p-6 rounded-lg border border-gray-800 hover:border-neon-purple transition-colors"
                >
                  <h3 className="text-xl font-bold text-white mb-2">Marketing Specialist</h3>
                  <p className="text-gray-400 mb-4">Full-time • Remote</p>
                  <p className="text-gray-400 mb-4">
                    Help us build and execute our marketing strategy.
                  </p>
                  <button className="text-neon-purple hover:text-neon-blue transition-colors">
                    Apply Now →
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CareersPage; 