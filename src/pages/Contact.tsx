import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted:', formData);
    // Reset form after submission
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

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
              Get In Touch
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-400 text-center max-w-2xl mx-auto mb-16"
            >
              Have questions about our products, collaborations, or just want to say hello? 
              We'd love to hear from you.
            </motion.p>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Information */}
              <div className="lg:col-span-1">
                <div className="space-y-8">
                  {/* Contact Cards */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="glassmorphism-card p-6 rounded-lg"
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-4">
                        <Mail className="w-6 h-6 text-neon-purple" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Email Us</h3>
                        <p className="text-gray-400 mb-1">General Inquiries:</p>
                        <a href="mailto:info@roonity.com" className="text-neon-purple hover:underline transition-all">
                          info@roonity.com
                        </a>
                        <p className="text-gray-400 mt-2 mb-1">Support:</p>
                        <a href="mailto:support@roonity.com" className="text-neon-purple hover:underline transition-all">
                          support@roonity.com
                        </a>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="glassmorphism-card p-6 rounded-lg"
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-4">
                        <Phone className="w-6 h-6 text-neon-purple" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Call Us</h3>
                        <p className="text-gray-400 mb-1">Customer Service:</p>
                        <a href="tel:+919876543210" className="text-neon-purple hover:underline transition-all">
                          +91 9876 543 210
                        </a>
                        <p className="text-gray-400 mt-2 mb-1">Business Hours:</p>
                        <p className="text-white">
                          Monday - Friday, 10am - 6pm IST
                        </p>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="glassmorphism-card p-6 rounded-lg"
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-4">
                        <MapPin className="w-6 h-6 text-neon-purple" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Visit Us</h3>
                        <p className="text-gray-400 mb-1">Flagship Store:</p>
                        <address className="text-white not-italic">
                          ROONITY HQ<br />
                          42 Digital Avenue, Bandra West<br />
                          Mumbai, Maharashtra 400050<br />
                          India
                        </address>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
              
              {/* Contact Form */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="glassmorphism-card p-8 rounded-lg lg:col-span-2"
              >
                <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-purple focus:border-transparent text-white"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-purple focus:border-transparent text-white"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-purple focus:border-transparent text-white"
                    >
                      <option value="" disabled>Select a topic</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Product Support</option>
                      <option value="collaboration">Collaboration</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-purple focus:border-transparent text-white resize-none"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-6 py-3 bg-neon-purple text-black rounded-lg font-medium hover:bg-neon-purple/90 transition-all shadow-lg shadow-neon-purple/20 hover:shadow-neon-purple/40"
                    >
                      <Send size={18} />
                      Send Message
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact; 