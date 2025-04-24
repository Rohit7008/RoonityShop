import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Filter, ChevronDown, ChevronUp, ShoppingBag } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { collectionImages } from '@/components/collections/collections-images';
import { useNavigate } from 'react-router-dom';

// Interface for collection items
interface CollectionItem {
  id: number;
  name: string;
  price: string;
  image: string;
  isNew?: boolean;
  isBestseller?: boolean;
  type: 'tshirts' | 'hoodies' | 'accessories';
}

// Interface for collections
interface Collection {
  id: number;
  name: string;
  description: string;
  image: string;
  items: CollectionItem[];
}

const CollectionsPage = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('featured');
  const [filteredCollections, setFilteredCollections] = useState<Collection[]>([]);
  const navigate = useNavigate();
  
  // Dummy data for collection items
  const collectionsData: Collection[] = [
    {
      id: 1,
      name: "CYBER CORE",
      description: "Bold, future-facing streetwear",
      image: collectionImages['cyber-street'],
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
      description: "Street illusions for digital nomads",
      image: collectionImages['neon-nights'],
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
      description: "Disrupted patterns for modern rebels",
      image: collectionImages['tech-wear'],
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
      description: "Light-reactive urban essentials",
      image: collectionImages['digital-punk'],
      items: [
        { id: 401, name: "UV Reactive Overshirt", price: "$99.99", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80", isNew: true, type: 'hoodies' },
        { id: 402, name: "Neon Accent Sweatpants", price: "$79.99", image: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=800&q=80", type: 'accessories' },
        { id: 403, name: "Luminous Graphic Hoodie", price: "$109.99", image: "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=800&q=80", isBestseller: true, type: 'hoodies' },
        { id: 404, name: "Electric Glow Socks", price: "$19.99", image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=800&q=80", type: 'accessories' },
      ]
    },
  ];

  // Toggles a filter in the active filters array
  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  // Filter collections based on active filters
  useEffect(() => {
    if (activeFilters.length === 0) {
      // If no filters are selected, show all collections
      setFilteredCollections(collectionsData);
      return;
    }

    const typeFilters = ['tshirts', 'hoodies', 'accessories'].filter(type => 
      activeFilters.includes(type)
    );
    
    const statusFilters = ['new', 'bestsellers'].filter(status => 
      activeFilters.includes(status)
    );

    // Filter collections
    const filtered = collectionsData.map(collection => {
      // Filter items in each collection
      const filteredItems = collection.items.filter(item => {
        const matchesType = typeFilters.length === 0 || typeFilters.includes(item.type);
        
        const matchesStatus = statusFilters.length === 0 || 
          (statusFilters.includes('new') && item.isNew) || 
          (statusFilters.includes('bestsellers') && item.isBestseller);
        
        return matchesType && matchesStatus;
      });

      // Return modified collection with filtered items
      return {
        ...collection,
        items: filteredItems
      };
    }).filter(collection => collection.items.length > 0); // Only include collections with items

    setFilteredCollections(filtered);
  }, [activeFilters]);

  // Sort the collections based on selectedSort
  useEffect(() => {
    const sortedCollections = [...filteredCollections].map(collection => {
      const sortedItems = [...collection.items].sort((a, b) => {
        switch (sortOrder) {
          case 'price-low':
            return parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''));
          case 'price-high':
            return parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', ''));
          case 'newest':
            return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
          default: // featured
            return 0;
        }
      });

      return {
        ...collection,
        items: sortedItems
      };
    });

    setFilteredCollections(sortedCollections);
  }, [sortOrder]);

  // Initialize filtered collections with all collections
  useEffect(() => {
    setFilteredCollections(collectionsData);
  }, []);

  // Function to render products, will be called for each collection
  const renderProducts = (items: CollectionItem[]) => {
    if (items.length === 0) {
      return (
        <div className="col-span-4 text-center py-8">
          <p className="text-gray-400">No products match your selected filters.</p>
        </div>
      );
    }

    return items.map(item => (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="group"
      >
        <div className="relative overflow-hidden rounded-lg glassmorphism-card group-hover:shadow-[0_0_30px_rgba(155,135,245,0.3)] transition-all duration-300">
          {/* Product Image */}
          <div className="relative h-[320px] overflow-hidden">
            {item.isNew && (
              <div className="absolute top-2 left-2 z-10 bg-neon-purple text-black text-xs font-bold px-2 py-1 rounded">
                NEW
              </div>
            )}
            {item.isBestseller && (
              <div className="absolute top-2 left-2 z-10 bg-white text-black text-xs font-bold px-2 py-1 rounded">
                BESTSELLER
              </div>
            )}
            <img 
              src={item.image} 
              alt={item.name}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10"></div>
            {/* Add to Cart hover action */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
              <button className="bg-neon-purple text-black font-medium px-6 py-2 rounded-lg hover:bg-neon-purple/90 transition-colors duration-300 flex items-center">
                <ShoppingBag size={16} className="mr-2" />
                Add to Cart
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-4">
            <h3 className="text-lg font-semibold text-white group-hover:text-neon-purple transition-colors">
              {item.name}
            </h3>
            <div className="flex justify-between items-center mt-2">
              <span className="text-neon-purple font-medium">
                {item.price}
              </span>
              <button 
                onClick={() => navigate(`/product/${item.id}`)}
                className="text-white hover:text-neon-purple transition-colors bg-black/40 hover:bg-black/60 px-3 py-1.5 rounded text-sm font-medium"
              >
                View
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    ));
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
              Collections
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-400 text-center max-w-2xl mx-auto mb-16"
            >
              Shop our latest drops in digital-age streetwear
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
                    Filters {activeFilters.length > 0 && `(${activeFilters.length})`}
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
                            checked={activeFilters.includes('tshirts')}
                          />
                          T-shirts
                        </label>
                        <label className="flex items-center text-gray-300">
                          <input 
                            type="checkbox" 
                            className="mr-2 accent-neon-purple" 
                            onChange={() => toggleFilter('hoodies')}
                            checked={activeFilters.includes('hoodies')}
                          />
                          Hoodies
                        </label>
                        <label className="flex items-center text-gray-300">
                          <input 
                            type="checkbox" 
                            className="mr-2 accent-neon-purple" 
                            onChange={() => toggleFilter('accessories')}
                            checked={activeFilters.includes('accessories')}
                          />
                          Accessories
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
                            checked={activeFilters.includes('new')}
                          />
                          New Arrivals
                        </label>
                        <label className="flex items-center text-gray-300">
                          <input 
                            type="checkbox" 
                            className="mr-2 accent-neon-purple" 
                            onChange={() => toggleFilter('bestsellers')}
                            checked={activeFilters.includes('bestsellers')}
                          />
                          Bestsellers
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
                        checked={activeFilters.includes('tshirts')}
                      />
                      T-shirts
                    </label>
                    <label className="flex items-center text-gray-300">
                      <input 
                        type="checkbox" 
                        className="mr-2 accent-neon-purple" 
                        onChange={() => toggleFilter('hoodies')}
                        checked={activeFilters.includes('hoodies')}
                      />
                      Hoodies
                    </label>
                    <label className="flex items-center text-gray-300">
                      <input 
                        type="checkbox" 
                        className="mr-2 accent-neon-purple" 
                        onChange={() => toggleFilter('accessories')}
                        checked={activeFilters.includes('accessories')}
                      />
                      Accessories
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
                        checked={activeFilters.includes('new')}
                      />
                      New Arrivals
                    </label>
                    <label className="flex items-center text-gray-300">
                      <input 
                        type="checkbox" 
                        className="mr-2 accent-neon-purple" 
                        onChange={() => toggleFilter('bestsellers')}
                        checked={activeFilters.includes('bestsellers')}
                      />
                      Bestsellers
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
                  <option value="featured">Featured</option>
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </section>
        
        {/* Collections Sections - Each collection gets its own section */}
        {filteredCollections.length === 0 ? (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="text-center py-16">
                <h2 className="text-2xl text-white mb-4">No matches found</h2>
                <p className="text-gray-400">
                  No products match your selected filters. Try adjusting your filters or browse our full collection.
                </p>
                <button 
                  onClick={() => setActiveFilters([])} 
                  className="mt-6 px-6 py-2 bg-neon-purple text-black rounded-lg hover:bg-neon-purple/90 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </section>
        ) : (
          filteredCollections.map((collection) => (
            <section key={collection.id} className="py-12">
              <div className="container mx-auto px-4">
                <div className="mb-8">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row md:items-end justify-between"
                  >
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-white">{collection.name}</h2>
                      <p className="text-gray-400 mt-2">{collection.description}</p>
                    </div>
                    <a href={`/collections/${collection.id}`} className="mt-4 md:mt-0 text-neon-purple hover:underline inline-flex items-center">
                      View All Collection
                      <ArrowRight size={16} className="ml-2" />
                    </a>
                  </motion.div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {renderProducts(collection.items)}
                </div>
              </div>
            </section>
          ))
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default CollectionsPage; 