import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const ReturnsPage = () => {
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
              Returns & Exchanges
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-400 text-center max-w-2xl mx-auto mb-16"
            >
              Hassle-free returns and exchanges for your peace of mind
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
                <h2 className="text-2xl font-bold text-white">Return Policy</h2>
                <p className="text-gray-400">
                  We want you to be completely satisfied with your purchase. If you're not happy with your order, 
                  you can return it within 30 days of delivery for a full refund or exchange.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">How to Return</h2>
                <p className="text-gray-400">
                  To initiate a return or exchange, please follow these steps:
                </p>
                <ol className="list-decimal list-inside text-gray-400 space-y-2">
                  <li>Contact our customer service team within 30 days of delivery</li>
                  <li>Provide your order number and reason for return</li>
                  <li>We'll send you a prepaid return shipping label</li>
                  <li>Package your items securely and attach the return label</li>
                  <li>Drop off the package at any authorized shipping location</li>
                </ol>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Return Conditions</h2>
                <p className="text-gray-400">
                  To be eligible for a return or exchange, items must be:
                </p>
                <ul className="list-disc list-inside text-gray-400 space-y-2">
                  <li>Unworn and unused</li>
                  <li>In their original packaging</li>
                  <li>With all tags and labels attached</li>
                  <li>In the same condition as received</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Refund Process</h2>
                <p className="text-gray-400">
                  Once we receive your return:
                </p>
                <ul className="list-disc list-inside text-gray-400 space-y-2">
                  <li>We'll inspect the returned items within 2-3 business days</li>
                  <li>If approved, your refund will be processed to your original payment method</li>
                  <li>Refunds typically appear in your account within 5-10 business days</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Exchanges</h2>
                <p className="text-gray-400">
                  If you'd like to exchange an item for a different size or color:
                </p>
                <ul className="list-disc list-inside text-gray-400 space-y-2">
                  <li>Follow the same return process</li>
                  <li>Specify your desired exchange item in the return request</li>
                  <li>We'll ship your new item once we receive the return</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Non-Returnable Items</h2>
                <p className="text-gray-400">
                  The following items cannot be returned or exchanged:
                </p>
                <ul className="list-disc list-inside text-gray-400 space-y-2">
                  <li>Items marked as "Final Sale"</li>
                  <li>Items that have been worn, washed, or altered</li>
                  <li>Items without original tags and packaging</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ReturnsPage; 