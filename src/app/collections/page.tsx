import { collectionImages } from '@/components/collections/collections-images';
import Link from 'next/link';

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

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black z-10"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(to right, #9b87f5 1px, transparent 1px), linear-gradient(to bottom, #9b87f5 1px, transparent 1px)',
          backgroundSize: '4rem 4rem',
          opacity: 0.1
        }}></div>
        <div className="relative z-20 text-center">
          <h1 className="text-6xl font-bold text-white mb-4">Collections</h1>
          <p className="text-gray-400 text-xl">Explore our latest collections</p>
        </div>
      </div>

      {/* Collections Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <Link 
              key={collection.id} 
              href={`/collections/${collection.slug}`}
              className="group"
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
                    <span className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 text-white hover:text-neon-purple">
                      View Collection →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 