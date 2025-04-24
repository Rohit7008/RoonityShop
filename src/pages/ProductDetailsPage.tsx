import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const ProductDetailsPage = () => {
  const navigate = useNavigate();
  const { productId } = useParams();

  // TODO: Replace with actual product data fetching
  const product = {
    id: productId,
    title: "Neon Street Hoodie",
    description: "A bold statement piece that combines comfort with cutting-edge design. Made from premium materials, this hoodie features our signature neon accents and futuristic patterns. Perfect for those who want to stand out while staying comfortable.",
    price: 89.99,
    image: "https://placehold.co/800x1000/9b87f5/ffffff?text=Product+Image"
  };

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-400 hover:text-neon-purple transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Shop
          </motion.button>

          {/* Product Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-square rounded-lg overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                {product.title}
              </h1>

              <p className="text-2xl font-semibold text-neon-purple">
                ${product.price.toFixed(2)}
              </p>

              <p className="text-gray-400 text-lg leading-relaxed">
                {product.description}
              </p>

              <div className="pt-6">
                <button
                  className="w-full md:w-auto px-8 py-4 bg-neon-purple text-black font-semibold rounded-lg hover:bg-neon-purple/90 transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetailsPage; 