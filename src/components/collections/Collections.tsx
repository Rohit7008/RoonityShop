import { motion } from 'framer-motion';
import { collectionImages } from './collections-images';
import { useNavigate } from 'react-router-dom';
import { useScrollToTop } from '@/hooks/useScrollToTop';

// This will be replaced with actual API data later
const collections = [
  {
    id: 1,
    name: "CYBER CORE",
    description: "Bold, future-facing streetwear",
    image: collectionImages['cyber-street'],
    items: "24 Items",
    slug: "cyber-core"
  },
  {
    id: 2,
    name: "URBAN MIRAGE",
    description: "Street illusions for digital nomads",
    image: collectionImages['neon-nights'],
    items: "18 Items",
    slug: "urban-mirage"
  },
  {
    id: 3,
    name: "GLITCH TEXTILE",
    description: "Disrupted patterns for modern rebels",
    image: collectionImages['tech-wear'],
    items: "22 Items",
    slug: "glitch-textile"
  },
  {
    id: 4,
    name: "NEON DISTRICT",
    description: "Light-reactive urban essentials",
    image: collectionImages['digital-punk'],
    items: "16 Items",
    slug: "neon-district"
  }
];

const Collections = () => {
  const navigate = useNavigate();
  useScrollToTop();

  const handleCardClick = (slug: string) => {
    navigate(`/collections/${slug}`);
  };

  const handleShopNowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate('/collections');
  };

  return (
    <section className="relative py-20 bg-black">
      {/* Neon grid background effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full" style={{
          backgroundImage: 'linear-gradient(to right, #9b87f5 1px, transparent 1px), linear-gradient(to bottom, #9b87f5 1px, transparent 1px)',
          backgroundSize: '4rem 4rem'
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-bold text-white mb-4"
          >
            COLLECTIONS
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-lg"
          >
            Shop our latest drops in digital-age streetwear
          </motion.p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => handleCardClick(collection.slug)}
            >
              <div className="relative overflow-hidden rounded-lg glassmorphism-card group-hover:shadow-[0_0_30px_rgba(155,135,245,0.3)] transition-all duration-300">
                {/* Collection Image */}
                <div className="relative h-[400px] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10"></div>
                  <img 
                    src={collection.image} 
                    alt={collection.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Neon Border Effect */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-neon-purple transition-colors duration-300"></div>
                </div>

                {/* Collection Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-neon-purple transition-colors">
                    {collection.name}
                  </h3>
                  <p className="text-gray-300 mb-3">
                    {collection.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-neon-purple font-medium">
                      {collection.items}
                    </span>
                    <button
                      onClick={handleShopNowClick}
                      className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 text-white hover:text-neon-purple"
                    >
                      Shop Now →
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Collections Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/collections')}
            className="px-8 py-4 bg-neon-purple text-white rounded-full font-medium hover:bg-neon-purple/90 transition-colors duration-300"
          >
            View All Collections
          </button>
        </div>
      </div>
    </section>
  );
};

export default Collections; 