import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Filter, ChevronDown, ChevronUp, ShoppingBag, ArrowUpDown } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { collectionImages } from '@/components/collections/collections-images';

// Interface for product items
interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  isNew?: boolean;
  isBestseller?: boolean;
  type: 'tshirts' | 'hoodies' | 'accessories';
  collection: string;
}

const ShopPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeFilters, setActiveFilters] = useState<{
    type: string[];
    status: string[];
  }>({
    type: [],
    status: []
  });
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('featured');
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filterType, setFilterType] = useState<'type' | 'status'>('type');
  
  // Parse URL query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const typeParam = params.get('type');
    const statusParam = params.get('status');
    
    // Reset filters first to avoid duplications
    setActiveFilters({
      type: [],
      status: []
    });
    
    if (typeParam && ['tshirts', 'hoodies', 'accessories'].includes(typeParam)) {
      setActiveFilters(prev => ({
        ...prev,
        type: [typeParam] // Use a single item array instead of spreading
      }));
    }

    if (statusParam && ['new', 'bestsellers'].includes(statusParam)) {
      setActiveFilters(prev => ({
        ...prev,
        status: [statusParam] // Use a single item array instead of spreading
      }));
    }
  }, [location.search]);

  // Generate all products from collections
  useEffect(() => {
    // Sample collection data
    const collections = [
      {
        id: 1,
        name: "CYBER CORE",
        items: [
          { id: 101, name: "Reflective Tech Hoodie", price: "$89.99", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80", isNew: true, type: 'hoodies' },
          { id: 102, name: "Digital Camo Pants", price: "$79.99", image: "https://images.unsplash.com/photo-1584535869112-a973dfe63d2b?auto=format&fit=crop&w=800&q=80", type: 'accessories' },
          { id: 103, name: "Circuit Graphic Tee", price: "$45.99", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80", isBestseller: true, type: 'tshirts' },
          { id: 104, name: "Data Stream Cap", price: "$34.99", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80", type: 'accessories' },
        ]
      },
      {
        id: 2,
        name: "URBAN MIRAGE",
        items: [
          { id: 201, name: "Holographic Windbreaker", price: "$119.99", image: "https://images.unsplash.com/photo-1564557287817-3785e3842f2b?auto=format&fit=crop&w=800&q=80", isNew: true, type: 'hoodies' },
          { id: 202, name: "Mirage Oversized Tee", price: "$49.99", image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80", type: 'tshirts' },
          { id: 203, name: "Digital Dissolve Joggers", price: "$89.99", image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=800&q=80", isBestseller: true, type: 'accessories' },
          { id: 204, name: "Illusion Bucket Hat", price: "$39.99", image: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&w=800&q=80", type: 'accessories' },
        ]
      },
      {
        id: 3,
        name: "GLITCH TEXTILE",
        items: [
          { id: 301, name: "Distortion Tactical Jacket", price: "$149.99", image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=800&q=80", isNew: true, type: 'hoodies' },
          { id: 302, name: "Glitch Pattern Shirt", price: "$59.99", image: "https://images.unsplash.com/photo-1571867424488-4565932edb41?auto=format&fit=crop&w=800&q=80", type: 'tshirts' },
          { id: 303, name: "Error Code Shorts", price: "$64.99", image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=80", type: 'accessories' },
          { id: 304, name: "Corrupted Data Beanie", price: "$29.99", image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=800&q=80", isBestseller: true, type: 'accessories' },
        ]
      },
      {
        id: 4,
        name: "NEON DISTRICT",
        items: [
          { id: 401, name: "UV Reactive Overshirt", price: "$99.99", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80", isNew: true, type: 'hoodies' },
          { id: 402, name: "Neon Accent Sweatpants", price: "$79.99", image: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=800&q=80", type: 'accessories' },
          { id: 403, name: "Luminous Graphic Hoodie", price: "$109.99", image: "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=800&q=80", isBestseller: true, type: 'hoodies' },
          { id: 404, name: "Electric Glow Socks", price: "$19.99", image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=800&q=80", type: 'accessories' },
        ]
      },
    ];

    // Generate products array from sample collection data
    const products: Product[] = collections.flatMap(collection => 
      collection.items.map(item => ({
        ...item,
        type: item.type as 'tshirts' | 'hoodies' | 'accessories',
        collection: collection.name
      }))
    );

    // Randomize the order of products
    const randomizedProducts = [...products].sort(() => Math.random() - 0.5);
    setAllProducts(randomizedProducts);
    setFilteredProducts(randomizedProducts);
  }, []);

  // Toggles a filter in the active filters array and updates URL
  const toggleFilter = (filter: string, category: 'type' | 'status') => {
    let newFilters: string[];
    
    if (activeFilters[category].includes(filter)) {
      // If filter already exists, remove it
      newFilters = activeFilters[category].filter(f => f !== filter);
    } else {
      // If filter doesn't exist, add it, ensuring no duplicates with Set
      const uniqueFilters = new Set([...activeFilters[category], filter]);
      newFilters = Array.from(uniqueFilters);
    }
    
    setActiveFilters(prev => ({
      ...prev,
      [category]: newFilters
    }));
    
    // Update URL query parameters
      const params = new URLSearchParams(location.search);
      
    if (newFilters.length > 0) {
      params.set(category, newFilters[0]); // Set first filter as URL param
      } else {
      params.delete(category);
      }
      
      navigate({ search: params.toString() }, { replace: true });
  };

  // Filter and sort products based on active filters and sort order
  useEffect(() => {
    if (allProducts.length === 0) return;

    let filtered = [...allProducts];

    // Apply type filters
    if (activeFilters.type.length > 0) {
      filtered = filtered.filter(product => activeFilters.type.includes(product.type));
    }

    // Apply status filters
    if (activeFilters.status.length > 0) {
      filtered = filtered.filter(product => 
        (activeFilters.status.includes('new') && product.isNew) || 
        (activeFilters.status.includes('bestsellers') && product.isBestseller)
      );
    }

    // Apply sorting
      filtered.sort((a, b) => {
        switch (sortOrder) {
          case 'price-low':
            return parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''));
          case 'price-high':
            return parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', ''));
          case 'newest':
            return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
          default:
            return 0;
        }
      });

    setFilteredProducts(filtered);
  }, [activeFilters, sortOrder, allProducts]);

  // Count products by type
  const productCounts = {
    tshirts: allProducts.filter(p => p.type === 'tshirts').length,
    hoodies: allProducts.filter(p => p.type === 'hoodies').length,
    accessories: allProducts.filter(p => p.type === 'accessories').length,
    new: allProducts.filter(p => p.isNew).length,
    bestsellers: allProducts.filter(p => p.isBestseller).length,
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
              Shop
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-400 text-center max-w-2xl mx-auto mb-16"
            >
              Explore our curated collection of digital-age streetwear
            </motion.p>
            
            {/* Filter Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
              {/* Mobile Filter Button */}
              <div className="md:hidden w-full">
                <motion.button 
                  onClick={() => setFilterMenuOpen(!filterMenuOpen)}
                  className="flex items-center justify-between w-full px-4 py-3 bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-800"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center text-white">
                    <Filter size={18} className="mr-2" />
                    Filters {(activeFilters.type.length + activeFilters.status.length) > 0 && 
                      `(${activeFilters.type.length + activeFilters.status.length})`}
                  </span>
                  <motion.span
                    animate={{ rotate: filterMenuOpen ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    <ChevronDown size={18} className="text-gray-400" />
                  </motion.span>
                </motion.button>
                
                {/* Mobile Filter Menu */}
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ 
                    opacity: filterMenuOpen ? 1 : 0,
                    height: filterMenuOpen ? "auto" : 0
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 p-4 bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-800">
                    {/* Filter Type Selector */}
                    <div className="flex gap-2 mb-4">
                      <motion.button
                        onClick={() => setFilterType('type')}
                        className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                          filterType === 'type' 
                            ? 'bg-neon-purple text-black' 
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Product Type
                      </motion.button>
                      <motion.button
                        onClick={() => setFilterType('status')}
                        className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                          filterType === 'status' 
                            ? 'bg-neon-purple text-black' 
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Status
                      </motion.button>
                    </div>
                    
                    {/* Filter Options */}
                    <motion.div
                      initial={false}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {filterType === 'type' ? (
                        <div className="space-y-3">
                          {[
                            { id: 'tshirts', label: 'T-shirts', count: productCounts.tshirts },
                            { id: 'hoodies', label: 'Hoodies', count: productCounts.hoodies },
                            { id: 'accessories', label: 'Accessories', count: productCounts.accessories }
                          ].map(item => (
                            <label key={item.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-800/50 cursor-pointer group">
                              <div className="flex items-center">
                                <motion.div
                                  initial={false}
                                  animate={{
                                    background: activeFilters.type.includes(item.id) ? '#9b87f5' : 'transparent',
                                    borderColor: activeFilters.type.includes(item.id) ? '#9b87f5' : '#4a4a4a'
                                  }}
                                  className="w-5 h-5 border-2 rounded-md mr-3 flex items-center justify-center"
                                >
                                  {activeFilters.type.includes(item.id) && (
                                    <motion.svg
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      className="w-3 h-3 text-black"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="3"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <polyline points="20 6 9 17 4 12" />
                                    </motion.svg>
                                  )}
                                </motion.div>
                                <span className="text-gray-300 group-hover:text-white transition-colors">
                                  {item.label}
                                </span>
                              </div>
                              <span className="text-gray-500 text-sm">
                                ({item.count})
                              </span>
                          <input 
                            type="checkbox" 
                                className="hidden"
                                checked={activeFilters.type.includes(item.id)}
                                onChange={() => toggleFilter(item.id, 'type')}
                          />
                        </label>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {[
                            { id: 'new', label: 'New Arrivals', count: productCounts.new },
                            { id: 'bestsellers', label: 'Bestsellers', count: productCounts.bestsellers }
                          ].map(item => (
                            <label key={item.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-800/50 cursor-pointer group">
                              <div className="flex items-center">
                                <motion.div
                                  initial={false}
                                  animate={{
                                    background: activeFilters.status.includes(item.id) ? '#9b87f5' : 'transparent',
                                    borderColor: activeFilters.status.includes(item.id) ? '#9b87f5' : '#4a4a4a'
                                  }}
                                  className="w-5 h-5 border-2 rounded-md mr-3 flex items-center justify-center"
                                >
                                  {activeFilters.status.includes(item.id) && (
                                    <motion.svg
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      className="w-3 h-3 text-black"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="3"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <polyline points="20 6 9 17 4 12" />
                                    </motion.svg>
                                  )}
                                </motion.div>
                                <span className="text-gray-300 group-hover:text-white transition-colors">
                                  {item.label}
                                </span>
                              </div>
                              <span className="text-gray-500 text-sm">
                                ({item.count})
                              </span>
                          <input 
                            type="checkbox" 
                                className="hidden"
                                checked={activeFilters.status.includes(item.id)}
                                onChange={() => toggleFilter(item.id, 'status')}
                          />
                        </label>
                          ))}
                      </div>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              </div>
              
              {/* Desktop Filters */}
              <div className="hidden md:flex items-center gap-6">
                {/* Product Type Filters */}
                <div className="space-x-4">
                  {[
                    { id: 'tshirts', label: 'T-shirts', count: productCounts.tshirts },
                    { id: 'hoodies', label: 'Hoodies', count: productCounts.hoodies },
                    { id: 'accessories', label: 'Accessories', count: productCounts.accessories }
                  ].map(item => (
                    <motion.button
                      key={item.id}
                      onClick={() => toggleFilter(item.id, 'type')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeFilters.type.includes(item.id)
                          ? 'bg-neon-purple text-black'
                          : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.label} ({item.count})
                    </motion.button>
                  ))}
                </div>
                
                {/* Status Filters */}
                <div className="space-x-4">
                  {[
                    { id: 'new', label: 'New Arrivals', count: productCounts.new },
                    { id: 'bestsellers', label: 'Bestsellers', count: productCounts.bestsellers }
                  ].map(item => (
                    <motion.button
                      key={item.id}
                      onClick={() => toggleFilter(item.id, 'status')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeFilters.status.includes(item.id)
                          ? 'bg-neon-purple text-black'
                          : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.label} ({item.count})
                    </motion.button>
                  ))}
                </div>
              </div>
              
              {/* Sort Controls */}
              <div className="w-full md:w-auto relative">
                <motion.button 
                  onClick={() => setSortMenuOpen(!sortMenuOpen)}
                  className="w-full md:w-auto px-4 py-3 bg-gray-900/80 backdrop-blur-sm rounded-lg border border-neon-purple/30 text-white flex items-center justify-between shadow-lg hover:shadow-neon-purple/20 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center">
                    <ArrowUpDown size={16} className="text-neon-purple mr-2" />
                    <span>{sortOrder === 'featured' ? 'Featured' : 
                           sortOrder === 'newest' ? 'Newest First' : 
                           sortOrder === 'price-low' ? 'Price: Low to High' : 
                           'Price: High to Low'}</span>
                  </span>
                  <motion.span
                    animate={{ rotate: sortMenuOpen ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <ChevronDown size={18} className="text-neon-purple ml-2" />
                  </motion.span>
                </motion.button>
                
                {/* Dropdown Menu */}
                <AnimatePresence>
                  {sortMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="absolute right-0 mt-2 w-full md:w-60 bg-gray-900/95 backdrop-blur-md rounded-lg border border-neon-purple/20 shadow-xl z-50 overflow-hidden"
                    >
                      {[
                        { id: 'featured', label: 'Featured' },
                        { id: 'newest', label: 'Newest First' },
                        { id: 'price-low', label: 'Price: Low to High' },
                        { id: 'price-high', label: 'Price: High to Low' }
                      ].map(option => (
                        <motion.button
                          key={option.id}
                          onClick={() => {
                            setSortOrder(option.id);
                            setSortMenuOpen(false);
                          }}
                          className={`w-full px-4 py-3 text-left flex items-center ${
                            sortOrder === option.id
                              ? 'bg-gray-800 text-neon-purple'
                              : 'text-white hover:bg-gray-800/50'
                          } transition-colors`}
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {sortOrder === option.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-2 h-2 rounded-full bg-neon-purple mr-2"
                            />
                          )}
                          <span className={sortOrder === option.id ? 'font-medium' : ''}>{option.label}</span>
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Active Filters Display */}
            {(activeFilters.type.length > 0 || activeFilters.status.length > 0) && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-wrap items-center gap-2 mt-4 bg-gray-900/30 backdrop-blur-sm p-3 rounded-lg border border-gray-800/50"
              >
                <span className="text-gray-300 text-sm font-medium mr-1">Active filters:</span>
                <div className="flex flex-wrap gap-2">
                  {/* Create a unique array of filters to prevent duplications */}
                  {Array.from(new Set([...activeFilters.type, ...activeFilters.status])).map(filter => (
                    <motion.span
                      key={filter}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-800/80 text-white border border-neon-purple/30 shadow-sm"
                    >
                      {filter === 'tshirts' ? 'T-shirts' :
                       filter === 'hoodies' ? 'Hoodies' :
                       filter === 'accessories' ? 'Accessories' :
                       filter === 'new' ? 'New Arrivals' :
                       filter === 'bestsellers' ? 'Bestsellers' : filter}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleFilter(filter, filter === 'new' || filter === 'bestsellers' ? 'status' : 'type')}
                        className="ml-2 text-neon-purple hover:text-white transition-colors"
                      >
                        ×
                      </motion.button>
                    </motion.span>
                  ))}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setActiveFilters({
                        type: [],
                        status: []
                      });
                      navigate('/shop', { replace: true });
                    }}
                    className="text-neon-purple hover:bg-gray-800/50 text-sm font-medium px-3 py-1 rounded-full border border-neon-purple/30 transition-all"
                  >
                    Clear all
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </section>
        
        {/* Products Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <h2 className="text-2xl text-white mb-4">No matches found</h2>
                <p className="text-gray-400">
                  No products match your selected filters. Try adjusting your criteria or browse our full collection.
                </p>
                <button 
                  onClick={() => {
                    setActiveFilters({
                      type: [],
                      status: []
                    });
                    navigate('/shop', { replace: true });
                  }} 
                  className="mt-6 px-6 py-2 bg-neon-purple text-black rounded-lg hover:bg-neon-purple/90 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                {/* Product count and active filters display */}
                <div className="flex flex-wrap items-center justify-between mb-6">
                  <div className="text-gray-400 mb-4 md:mb-0">
                    Showing {filteredProducts.length} product{filteredProducts.length !== 1 && 's'}
                  </div>
                </div>
                
                {/* Product Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredProducts.map(product => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="group"
                    >
                      <div className="relative overflow-hidden rounded-lg glassmorphism-card group-hover:shadow-[0_0_30px_rgba(155,135,245,0.3)] transition-all duration-300">
                        {/* Product Image */}
                        <div className="relative h-[240px] overflow-hidden">
                          {product.isNew && (
                            <div className="absolute top-2 left-2 z-10 bg-neon-purple text-black text-xs font-bold px-2 py-1 rounded">
                              NEW
                            </div>
                          )}
                          {product.isBestseller && (
                            <div className="absolute top-2 left-2 z-10 bg-white text-black text-xs font-bold px-2 py-1 rounded">
                              BESTSELLER
                            </div>
                          )}
                          <div className="absolute top-2 right-2 z-10 bg-gray-900/80 text-gray-300 text-xs px-2 py-1 rounded">
                            {product.collection}
                          </div>
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10"></div>
                          
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                            <button className="bg-neon-purple text-black font-medium px-4 py-1.5 rounded-lg hover:bg-neon-purple/90 transition-colors duration-300 flex items-center text-sm">
                              <ShoppingBag size={14} className="mr-1" />
                              Add to Cart
                            </button>
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="p-3">
                          <h3 className="text-base font-semibold text-white group-hover:text-neon-purple transition-colors">
                            {product.name}
                          </h3>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-neon-purple font-medium text-sm">
                              {product.price}
                            </span>
                            <button 
                              onClick={() => navigate(`/product/${product.id}`)}
                              className="text-white hover:text-neon-purple transition-colors bg-black/40 hover:bg-black/60 px-2 py-1 rounded text-xs font-medium"
                            >
                              View
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ShopPage; 