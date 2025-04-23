import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Eye } from 'lucide-react';
import { getFeaturedProducts, getCategories, getTestimonials } from '@/utils/api';
import type { Product, Category } from '@/data/products';
import ParticleBackground from '@/components/ParticleBackground';
import ThreeTshirt from '@/components/ThreeTshirt';

const headingWords = [
  "Discover",
  "Your",
  "Future",
  "Style"
];

const AnimatedHeading = () => (
  <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">
    <div className="flex flex-wrap gap-2">
      {headingWords.map((word, i) => (
        <motion.span
          key={word}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + i * 0.18, duration: 0.6, type: 'spring', stiffness: 120 }}
          className={
            word === "Future"
              ? "text-neon-purple"
              : ""
          }
        >
          {word}
        </motion.span>
      ))}
    </div>
  </h1>
);

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [quickViewId, setQuickViewId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData, testimonialsData] = await Promise.all([
          getFeaturedProducts(),
          getCategories(),
          getTestimonials(),
        ]);
        
        setFeaturedProducts(productsData);
        setCategories(categoriesData);
        setTestimonials(testimonialsData);
      } catch (error) {
        console.error('Error fetching homepage data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        {/* Animated Particles */}
        <ParticleBackground />
        {/* Image fallback background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1496715976403-7e36dc43f17b?q=80&w=2070"
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark to-dark/60"></div>
        </div>
        <div className="container-custom relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-center md:text-left flex-1"
          >
            <span className="inline-block bg-neon-purple bg-opacity-20 text-neon-purple px-4 py-1 rounded-full text-sm font-medium mb-6">
              New Collection 2025
            </span>
            <AnimatedHeading />
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Explore our cutting-edge collection of fashion and tech. Express yourself with designs that push boundaries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link 
                to="/products" 
                className="btn-primary relative neon-btn"
              >
                <span className="relative z-10">Shop Now</span>
                <span className="absolute inset-0 animate-pulse-neon rounded-lg" aria-hidden></span>
              </Link>
              <Link 
                to="/collections/new-arrivals" 
                className="btn-secondary neon-btn"
              >
                New Arrivals
              </Link>
            </div>
          </motion.div>
          {/* 3D T-shirt visual centerpiece */}
          <div className="flex-1 flex justify-center items-center">
            <ThreeTshirt />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-dark">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Shop by Category</h2>
            <p className="text-gray-400 max-w-lg mx-auto">
              Find exactly what you're looking for in our curated collections
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              Array(4).fill(0).map((_, index) => (
                <div 
                  key={index}
                  className="bg-dark-light animate-pulse h-72 rounded-lg"
                />
              ))
            ) : (
              categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.slug}`}
                  className="relative overflow-hidden rounded-lg aspect-[3/4] group glassmorphism-card shadow-lg"
                >
                  {/* Image */}
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Glass overlay */}
                  <div className="absolute inset-0 glassmorphism-blur pointer-events-none transition-all duration-300"></div>
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent"></div>
                  {/* Text */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-start gap-2">
                    <h3 className="text-xl font-bold text-white">{category.name}</h3>
                    <p className="text-gray-300 text-sm opacity-80 hidden lg:block group-hover:inline-block transition-all duration-300">
                      {category.description ?? "Shop top picks for this category."}
                    </p>
                    <span className="h-8 w-8 mt-2 rounded-full bg-neon-purple flex items-center justify-center transform group-hover:translate-x-1 transition-transform">
                      <ArrowRight size={16} className="text-white" />
                    </span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-dark-lighter">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-3">Featured Products</h2>
              <p className="text-gray-400">
                Handpicked by our style experts
              </p>
            </div>
            <Link
              to="/products"
              className="mt-4 md:mt-0 flex items-center text-neon-purple hover:text-neon-purple/80 transition-colors"
            >
              <span className="mr-2">View All Products</span>
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              Array(4).fill(0).map((_, index) => (
                <div 
                  key={index}
                  className="bg-dark-light animate-pulse h-80 rounded-lg"
                />
              ))
            ) : (
              featuredProducts.map((product) => (
                <div
                  key={product.id}
                  className="relative"
                >
                  <Link
                    to={`/product/${product.id}`}
                    className="product-card group neon-product-card"
                  >
                    {/* Badge */}
                    {product.compareAtPrice && (
                      <span className="absolute top-2 right-2 bg-shopify-danger text-white text-xs font-medium px-2 py-1 rounded z-10">
                        Sale
                      </span>
                    )}
                    {product.isNew && !product.compareAtPrice && (
                      <span className="absolute top-2 right-2 bg-neon-purple text-white text-xs font-medium px-2 py-1 rounded z-10">
                        New
                      </span>
                    )}
                    {/* Image */}
                    <div className="aspect-[3/4] overflow-hidden rounded-lg relative">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                      />
                      {/* Quick View Icon */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setQuickViewId(Number(product.id));
                        }}
                        className="absolute top-3 left-3 p-2 bg-dark/70 backdrop-blur-sm rounded-full text-white opacity-0 group-hover:opacity-100 hover:bg-neon-purple transition-all shadow-lg"
                        aria-label="Quick View"
                      >
                        <Eye size={18} />
                      </button>
                    </div>
                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-medium mb-1 group-hover:text-neon-purple transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center">
                        {product.compareAtPrice ? (
                          <>
                            <span className="text-shopify-danger font-medium">${product.price.toFixed(2)}</span>
                            <span className="text-gray-400 line-through ml-2 text-sm">${product.compareAtPrice.toFixed(2)}</span>
                          </>
                        ) : (
                          <span className="font-medium">${product.price.toFixed(2)}</span>
                        )}
                      </div>
                    </div>
                    {/* Glowing border */}
                    <span className="pointer-events-none absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-neon-purple group-hover:shadow-[0_0_16px_2px_#9b87f5] transition-all duration-300"></span>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-dark relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-neon-purple/10"></div>
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-neon-purple rounded-full blur-[200px] opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-neon-blue rounded-full blur-[200px] opacity-20 translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
            <p className="text-gray-400 mb-6">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow bg-dark-lighter border border-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:ring-1 focus:ring-neon-purple"
              />
              <button
                type="submit"
                className="btn-primary"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
      {/* AnimatePresence quick view modal */}
      <AnimatePresence>
        {/* Will implement modal later based on quickViewId */}
      </AnimatePresence>
    </div>
  );
};

export default Home;
