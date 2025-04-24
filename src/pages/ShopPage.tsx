import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Filter, ChevronDown, ChevronUp, ShoppingBag } from 'lucide-react';
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
    collection: string[];
  }>({
    type: [],
    collection: []
  });
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('random');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  
  // Parse URL query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const typeParam = params.get('type');
    
    if (typeParam && ['tshirts', 'hoodies', 'accessories'].includes(typeParam)) {
      // Set active filters based on URL parameters
      if (!activeFilters.type.includes(typeParam)) {
        setActiveFilters(prev => ({
          ...prev,
          type: [...prev.type, typeParam]
        }));
      }
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
          { id: 201, name: "Holographic Windbreaker", price: "$119.99", image: "https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?auto=format&fit=crop&w=800&q=80", isNew: true, type: 'hoodies' },
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
  const toggleFilter = (filter: string) => {
    let newFilters: string[];
    
    if (activeFilters.type.includes(filter)) {
      newFilters = activeFilters.type.filter(f => f !== filter);
    } else {
      newFilters = [...activeFilters.type, filter];
    }
    
    setActiveFilters(prev => ({
      ...prev,
      type: newFilters
    }));
    
    // Update URL query parameters for product type filters
    if (['tshirts', 'hoodies', 'accessories'].includes(filter)) {
      const params = new URLSearchParams(location.search);
      
      if (newFilters.some(f => ['tshirts', 'hoodies', 'accessories'].includes(f))) {
        // Find the first product type filter
        const typeFilter = newFilters.find(f => ['tshirts', 'hoodies', 'accessories'].includes(f));
        if (typeFilter) {
          params.set('type', typeFilter);
        }
      } else {
        params.delete('type');
      }
      
      navigate({ search: params.toString() }, { replace: true });
    }
  };

  // Filter and sort products based on active filters and sort order
  useEffect(() => {
    if (allProducts.length === 0) return;

    let filtered = [...allProducts];

    // Apply type filters
    const typeFilters = ['tshirts', 'hoodies', 'accessories'].filter(type => 
      activeFilters.type.includes(type)
    );
    
    if (typeFilters.length > 0) {
      filtered = filtered.filter(product => typeFilters.includes(product.type));
    }

    // Apply status filters
    const statusFilters = ['new', 'bestsellers'].filter(status => 
      activeFilters.type.includes(status)
    );

    if (statusFilters.length > 0) {
      filtered = filtered.filter(product => 
        (statusFilters.includes('new') && product.isNew) || 
        (statusFilters.includes('bestsellers') && product.isBestseller)
      );
    }

    // Apply sorting
    if (sortOrder !== 'random') {
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
    } else {
      // Re-randomize if random is selected
      filtered = filtered.sort(() => Math.random() - 0.5);
    }

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
              Shop All
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-400 text-center max-w-2xl mx-auto mb-16"
            >
              Browse our complete catalog of digital-age streetwear
            </motion.p>
            
            {/* Filter and Sort Controls */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              {/* Filter Button - Mobile */}
              <div className="md:hidden w-full">
                <button 
                  onClick={() => setFilterMenuOpen(!filterMenuOpen)}
                  className="flex items-center justify-between w-full px-4 py-2 bg-gray-900 rounded-lg"
                >
                  <span className="flex items-center">
                    <Filter size={18} className="mr-2" />
                    Filters {activeFilters.type.length > 0 && `(${activeFilters.type.length})`}
                  </span>
                  {filterMenuOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                
                {/* Mobile Filter Menu */}
                {filterMenuOpen && (
                  <div className="mt-2 p-4 bg-gray-900 rounded-lg">
                    <div className="mb-4">
                      <h3 className="text-white font-medium mb-2">Product Type</h3>
                      <div className="space-y-2">
                        <label className="flex items-center text-gray-300">
                          <input 
                            type="checkbox" 
                            className="mr-2 accent-neon-purple" 
                            onChange={() => toggleFilter('tshirts')}
                            checked={activeFilters.type.includes('tshirts')}
                          />
                          T-shirts <span className="ml-1 text-gray-500">({productCounts.tshirts})</span>
                        </label>
                        <label className="flex items-center text-gray-300">
                          <input 
                            type="checkbox" 
                            className="mr-2 accent-neon-purple" 
                            onChange={() => toggleFilter('hoodies')}
                            checked={activeFilters.type.includes('hoodies')}
                          />
                          Hoodies <span className="ml-1 text-gray-500">({productCounts.hoodies})</span>
                        </label>
                        <label className="flex items-center text-gray-300">
                          <input 
                            type="checkbox" 
                            className="mr-2 accent-neon-purple" 
                            onChange={() => toggleFilter('accessories')}
                            checked={activeFilters.type.includes('accessories')}
                          />
                          Accessories <span className="ml-1 text-gray-500">({productCounts.accessories})</span>
                        </label>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-white font-medium mb-2">Status</h3>
                      <div className="space-y-2">
                        <label className="flex items-center text-gray-300">
                          <input 
                            type="checkbox" 
                            className="mr-2 accent-neon-purple" 
                            onChange={() => toggleFilter('new')}
                            checked={activeFilters.type.includes('new')}
                          />
                          New Arrivals <span className="ml-1 text-gray-500">({productCounts.new})</span>
                        </label>
                        <label className="flex items-center text-gray-300">
                          <input 
                            type="checkbox" 
                            className="mr-2 accent-neon-purple" 
                            onChange={() => toggleFilter('bestsellers')}
                            checked={activeFilters.type.includes('bestsellers')}
                          />
                          Bestsellers <span className="ml-1 text-gray-500">({productCounts.bestsellers})</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Desktop Filters */}
              <div className="hidden md:flex flex-col space-y-6">
                <div>
                  <h3 className="text-white font-medium mb-2">Product Type</h3>
                  <div className="flex space-x-4">
                    <label className="flex items-center text-gray-300">
                      <input 
                        type="checkbox" 
                        className="mr-2 accent-neon-purple" 
                        onChange={() => toggleFilter('tshirts')}
                        checked={activeFilters.type.includes('tshirts')}
                      />
                      T-shirts <span className="ml-1 text-gray-500">({productCounts.tshirts})</span>
                    </label>
                    <label className="flex items-center text-gray-300">
                      <input 
                        type="checkbox" 
                        className="mr-2 accent-neon-purple" 
                        onChange={() => toggleFilter('hoodies')}
                        checked={activeFilters.type.includes('hoodies')}
                      />
                      Hoodies <span className="ml-1 text-gray-500">({productCounts.hoodies})</span>
                    </label>
                    <label className="flex items-center text-gray-300">
                      <input 
                        type="checkbox" 
                        className="mr-2 accent-neon-purple" 
                        onChange={() => toggleFilter('accessories')}
                        checked={activeFilters.type.includes('accessories')}
                      />
                      Accessories <span className="ml-1 text-gray-500">({productCounts.accessories})</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-white font-medium mb-2">Status</h3>
                  <div className="flex space-x-4">
                    <label className="flex items-center text-gray-300">
                      <input 
                        type="checkbox" 
                        className="mr-2 accent-neon-purple" 
                        onChange={() => toggleFilter('new')}
                        checked={activeFilters.type.includes('new')}
                      />
                      New Arrivals <span className="ml-1 text-gray-500">({productCounts.new})</span>
                    </label>
                    <label className="flex items-center text-gray-300">
                      <input 
                        type="checkbox" 
                        className="mr-2 accent-neon-purple" 
                        onChange={() => toggleFilter('bestsellers')}
                        checked={activeFilters.type.includes('bestsellers')}
                      />
                      Bestsellers <span className="ml-1 text-gray-500">({productCounts.bestsellers})</span>
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Sort Controls */}
              <div className="w-full md:w-auto">
                <select 
                  className="w-full md:w-auto px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neon-purple"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="random">Random</option>
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
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
                      collection: []
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
                  
                  {activeFilters.type.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {activeFilters.type.map(filter => (
                        <div 
                          key={filter}
                          className="flex items-center px-3 py-1 bg-gray-800 rounded-full text-sm text-white"
                        >
                          {filter === 'tshirts' ? 'T-shirts' : 
                           filter === 'hoodies' ? 'Hoodies' : 
                           filter === 'accessories' ? 'Accessories' :
                           filter === 'new' ? 'New Arrivals' :
                           filter === 'bestsellers' ? 'Bestsellers' : filter}
                          <button 
                            onClick={() => toggleFilter(filter)}
                            className="ml-2 text-gray-400 hover:text-white"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      <button 
                        onClick={() => {
                          setActiveFilters({
                            type: [],
                            collection: []
                          });
                          navigate('/shop', { replace: true });
                        }}
                        className="text-neon-purple hover:underline text-sm"
                      >
                        Clear all
                      </button>
                    </div>
                  )}
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