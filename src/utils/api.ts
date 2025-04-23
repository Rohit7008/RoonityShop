
import { products, categories, collections, featuredCollections, testimonials } from '@/data/products';
import type { Product } from '@/data/products';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Filter products by category, collection, price range, etc.
export async function getFilteredProducts(options: {
  category?: string;
  collection?: string;
  minPrice?: number;
  maxPrice?: number;
  colors?: string[];
  sizes?: string[];
  sort?: 'price_asc' | 'price_desc' | 'newest' | 'popular';
  search?: string;
  page?: number;
  limit?: number;
}) {
  await delay(500); // Simulate API request delay

  let filteredProducts = [...products];

  // Filter by category
  if (options.category) {
    filteredProducts = filteredProducts.filter(product => 
      product.category === options.category
    );
  }

  // Filter by collection
  if (options.collection) {
    filteredProducts = filteredProducts.filter(product => 
      product.collections.includes(options.collection || '')
    );
  }

  // Filter by price range
  if (options.minPrice !== undefined) {
    filteredProducts = filteredProducts.filter(product => 
      product.price >= (options.minPrice || 0)
    );
  }

  if (options.maxPrice !== undefined) {
    filteredProducts = filteredProducts.filter(product => 
      product.price <= (options.maxPrice || Infinity)
    );
  }

  // Filter by color
  if (options.colors && options.colors.length > 0) {
    filteredProducts = filteredProducts.filter(product => 
      product.colors?.some(color => options.colors?.includes(color))
    );
  }

  // Filter by size
  if (options.sizes && options.sizes.length > 0) {
    filteredProducts = filteredProducts.filter(product => 
      product.sizes?.some(size => options.sizes?.includes(size))
    );
  }

  // Search by name or description
  if (options.search) {
    const searchLower = options.search.toLowerCase();
    filteredProducts = filteredProducts.filter(product => 
      product.name.toLowerCase().includes(searchLower) || 
      product.description.toLowerCase().includes(searchLower)
    );
  }

  // Sort products
  if (options.sort) {
    switch (options.sort) {
      case 'price_asc':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filteredProducts.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'popular':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
    }
  }

  // Pagination
  const page = options.page || 1;
  const limit = options.limit || 12;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  return {
    products: paginatedProducts,
    total: filteredProducts.length,
    page,
    limit,
    totalPages: Math.ceil(filteredProducts.length / limit),
  };
}

// Get a single product by ID
export async function getProductById(id: string): Promise<Product | undefined> {
  await delay(300);
  return products.find(product => product.id === id);
}

// Get related products
export async function getRelatedProducts(productId: string, limit = 4) {
  await delay(400);
  
  const product = products.find(p => p.id === productId);
  if (!product) return [];
  
  // Find products in same category or with shared tags
  return products
    .filter(p => 
      p.id !== productId && (
        p.category === product.category ||
        p.tags.some(tag => product.tags.includes(tag))
      )
    )
    .sort(() => Math.random() - 0.5) // Shuffle
    .slice(0, limit);
}

// Get all categories
export async function getCategories() {
  await delay(200);
  return categories;
}

// Get all collections
export async function getCollections() {
  await delay(200);
  return collections;
}

// Get featured collections with their products
export async function getFeaturedCollections() {
  await delay(400);
  
  return featuredCollections.map(collection => {
    const collectionProducts = collection.products
      .map(id => products.find(product => product.id === id))
      .filter(Boolean) as Product[];
    
    return {
      ...collection,
      products: collectionProducts,
    };
  });
}

// Get testimonials
export async function getTestimonials() {
  await delay(300);
  return testimonials;
}

// Get new arrivals
export async function getNewArrivals(limit = 8) {
  await delay(300);
  
  return products
    .filter(product => product.isNew)
    .sort(() => Math.random() - 0.5)
    .slice(0, limit);
}

// Get best sellers
export async function getBestSellers(limit = 8) {
  await delay(300);
  
  return products
    .filter(product => product.collections.includes('best-sellers'))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}

// Get featured products
export async function getFeaturedProducts(limit = 4) {
  await delay(300);
  
  return products
    .filter(product => product.isFeatured)
    .sort(() => Math.random() - 0.5)
    .slice(0, limit);
}
