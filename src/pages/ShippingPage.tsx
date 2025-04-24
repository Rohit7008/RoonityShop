import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const ShippingPage = () => {
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
              Shipping Information
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-400 text-center max-w-2xl mx-auto mb-16"
            >
              Fast and reliable shipping to your doorstep
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
                <h2 className="text-2xl font-bold text-white">Shipping Methods</h2>
                <p className="text-gray-400">
                  We offer several shipping options to meet your needs:
                </p>
                <ul className="list-disc list-inside text-gray-400 space-y-2">
                  <li>Standard Shipping (3-5 business days)</li>
                  <li>Express Shipping (1-2 business days)</li>
                  <li>International Shipping (5-10 business days)</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Shipping Rates</h2>
                <p className="text-gray-400">
                  Our shipping rates are calculated based on your location and the weight of your order:
                </p>
                <ul className="list-disc list-inside text-gray-400 space-y-2">
                  <li>Free shipping on orders over $100</li>
                  <li>Standard shipping: $5.99</li>
                  <li>Express shipping: $12.99</li>
                  <li>International shipping: Calculated at checkout</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Order Processing</h2>
                <p className="text-gray-400">
                  Orders are typically processed within 1-2 business days. You will receive a confirmation email 
                  with tracking information once your order has been shipped.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Tracking Your Order</h2>
                <p className="text-gray-400">
                  Once your order has been shipped, you will receive a tracking number via email. You can use this 
                  number to track your package on our website or through the carrier's website.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">International Shipping</h2>
                <p className="text-gray-400">
                  We ship to most countries worldwide. Please note that international orders may be subject to 
                  customs fees and import taxes, which are the responsibility of the customer.
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

export default ShippingPage; 