import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const AboutPage = () => {
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
              About Us
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-400 text-center max-w-2xl mx-auto mb-16"
            >
              Redefining streetwear with digital-age aesthetics
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
                <h2 className="text-3xl font-bold text-white">Our Story</h2>
                <p className="text-gray-400">
                  Founded in 2025, ROONITY emerged from the intersection of street culture and digital innovation. 
                  We're not just a clothing brand; we're a movement that challenges conventional fashion norms.
                </p>
                <p className="text-gray-400">
                  Our mission is to create bold, statement-making pieces that reflect the energy and creativity of 
                  the digital age while maintaining the authenticity of streetwear culture.
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
                  src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80" 
                  alt="Our Story" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>

            {/* Values Section */}
            <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="p-6 rounded-lg border border-gray-800 hover:border-neon-purple transition-colors"
              >
                <h3 className="text-xl font-bold text-white mb-4">Innovation</h3>
                <p className="text-gray-400">
                  Pushing boundaries with cutting-edge designs and sustainable materials.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-6 rounded-lg border border-gray-800 hover:border-neon-purple transition-colors"
              >
                <h3 className="text-xl font-bold text-white mb-4">Community</h3>
                <p className="text-gray-400">
                  Building a global community of creators, dreamers, and trendsetters.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="p-6 rounded-lg border border-gray-800 hover:border-neon-purple transition-colors"
              >
                <h3 className="text-xl font-bold text-white mb-4">Sustainability</h3>
                <p className="text-gray-400">
                  Committed to ethical production and environmental responsibility.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage; 