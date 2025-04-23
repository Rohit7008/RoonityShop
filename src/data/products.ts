
export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  category: string;
  collections: string[];
  tags: string[];
  colors?: string[];
  sizes?: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  isNew?: boolean;
  isFeatured?: boolean;
  createdAt: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
};

export const categories: Category[] = [
  {
    id: 'cat_1',
    name: 'Men',
    slug: 'men',
    description: 'Shop our collection of men\'s clothing',
    image: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?q=80&w=1000',
  },
  {
    id: 'cat_2',
    name: 'Women',
    slug: 'women',
    description: 'Shop our collection of women\'s clothing',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000',
  },
  {
    id: 'cat_3',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Shop the latest tech and gadgets',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1000',
  },
  {
    id: 'cat_4',
    name: 'Home',
    slug: 'home',
    description: 'Stylish accents for modern living',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1000',
  }
];

export const collections = [
  {
    id: 'col_1',
    name: 'New Arrivals',
    slug: 'new-arrivals',
    description: 'The latest additions to our catalog',
  },
  {
    id: 'col_2',
    name: 'Best Sellers',
    slug: 'best-sellers',
    description: 'Our most popular products',
  },
  {
    id: 'col_3',
    name: 'Sale',
    slug: 'sale',
    description: 'Limited time discounts',
  },
  {
    id: 'col_4',
    name: 'Featured',
    slug: 'featured',
    description: 'Hand-picked products we love',
  }
];

export const products: Product[] = [
  {
    id: 'prod_1',
    name: 'Neon Tech Hoodie',
    description: 'A comfortable oversized hoodie with a futuristic design and neon accents. Made with premium cotton blend fabric for ultimate comfort.',
    price: 89.99,
    compareAtPrice: 119.99,
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000',
      'https://images.unsplash.com/photo-1565693413579-8a73ffa8de15?q=80&w=1000',
    ],
    category: 'men',
    collections: ['new-arrivals', 'featured'],
    tags: ['hoodie', 'casual', 'streetwear'],
    colors: ['black', 'purple', 'gray'],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.8,
    reviewCount: 124,
    stock: 43,
    isNew: true,
    isFeatured: true,
    createdAt: '2023-10-15T08:00:00Z',
  },
  {
    id: 'prod_2',
    name: 'Cyber Platform Sneakers',
    description: 'Edgy platform sneakers with holographic details and chunky soles. The perfect statement footwear for any outfit.',
    price: 129.99,
    compareAtPrice: 159.99,
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000',
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=80&w=1000',
    ],
    category: 'women',
    collections: ['best-sellers', 'featured'],
    tags: ['shoes', 'sneakers', 'streetwear'],
    colors: ['white', 'silver', 'pink'],
    sizes: ['36', '37', '38', '39', '40', '41'],
    rating: 4.9,
    reviewCount: 87,
    stock: 25,
    isFeatured: true,
    createdAt: '2023-09-28T08:00:00Z',
  },
  {
    id: 'prod_3',
    name: 'Wireless Neon Earbuds',
    description: 'True wireless earbuds with ambient lighting, active noise cancellation, and 30-hour battery life. Includes charging case.',
    price: 149.99,
    compareAtPrice: 199.99,
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1000',
      'https://images.unsplash.com/photo-1606400082777-ef05f3c5e814?q=80&w=1000',
    ],
    category: 'electronics',
    collections: ['new-arrivals', 'best-sellers'],
    tags: ['audio', 'wireless', 'tech'],
    colors: ['black', 'white', 'neon-blue'],
    rating: 4.7,
    reviewCount: 156,
    stock: 18,
    isNew: true,
    createdAt: '2023-10-05T08:00:00Z',
  },
  {
    id: 'prod_4',
    name: 'Holographic Crop Top',
    description: 'Reflective holographic crop top with adjustable straps. Perfect for festivals and night outings.',
    price: 39.99,
    compareAtPrice: 59.99,
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1000',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000',
    ],
    category: 'women',
    collections: ['new-arrivals', 'sale'],
    tags: ['tops', 'festival', 'party'],
    colors: ['holographic', 'silver', 'pink'],
    sizes: ['XS', 'S', 'M', 'L'],
    rating: 4.5,
    reviewCount: 68,
    stock: 32,
    isNew: true,
    createdAt: '2023-10-10T08:00:00Z',
  },
  {
    id: 'prod_5',
    name: 'Smart LED Floor Lamp',
    description: 'App-controlled RGB floor lamp with customizable lighting modes. Adds a futuristic touch to any room.',
    price: 199.99,
    compareAtPrice: 249.99,
    images: [
      'https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?q=80&w=1000',
      'https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=1000',
    ],
    category: 'home',
    collections: ['featured', 'best-sellers'],
    tags: ['lighting', 'smart home', 'decor'],
    colors: ['black', 'white'],
    rating: 4.6,
    reviewCount: 42,
    stock: 15,
    isFeatured: true,
    createdAt: '2023-09-20T08:00:00Z',
  },
  {
    id: 'prod_6',
    name: 'Mesh Panel Joggers',
    description: 'Comfortable joggers with reflective mesh panels. Perfect for both athletic activities and casual outings.',
    price: 69.99,
    images: [
      'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?q=80&w=1000',
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1000',
    ],
    category: 'men',
    collections: ['new-arrivals'],
    tags: ['pants', 'activewear', 'casual'],
    colors: ['black', 'gray', 'navy'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.3,
    reviewCount: 37,
    stock: 50,
    isNew: true,
    createdAt: '2023-10-12T08:00:00Z',
  },
  {
    id: 'prod_7',
    name: 'Digital Art Frame',
    description: 'HD display in a sleek frame that allows you to showcase digital art and NFTs. Connects to Wi-Fi for live updates.',
    price: 299.99,
    images: [
      'https://images.unsplash.com/photo-1526566662924-7115e8ffd3cb?q=80&w=1000',
      'https://images.unsplash.com/photo-1581343108822-8375ab2474aa?q=80&w=1000',
    ],
    category: 'home',
    collections: ['featured', 'new-arrivals'],
    tags: ['art', 'tech', 'decor'],
    colors: ['black', 'white', 'oak'],
    rating: 4.9,
    reviewCount: 28,
    stock: 12,
    isNew: true,
    isFeatured: true,
    createdAt: '2023-10-08T08:00:00Z',
  },
  {
    id: 'prod_8',
    name: 'Oversized Vintage Tee',
    description: 'Retro-inspired oversized t-shirt with distressed graphic print. Soft cotton fabric for all-day comfort.',
    price: 34.99,
    compareAtPrice: 44.99,
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000',
      'https://images.unsplash.com/photo-1503342394128-c104d54dba01?q=80&w=1000',
    ],
    category: 'men',
    collections: ['sale', 'best-sellers'],
    tags: ['t-shirt', 'casual', 'vintage'],
    colors: ['washed-black', 'washed-blue', 'cream'],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.6,
    reviewCount: 94,
    stock: 65,
    createdAt: '2023-09-15T08:00:00Z',
  },
  {
    id: 'prod_9',
    name: 'Portable Hologram Projector',
    description: 'Compact hologram projector for creating stunning 3D displays. Perfect for presentations or home entertainment.',
    price: 449.99,
    compareAtPrice: 599.99,
    images: [
      'https://images.unsplash.com/photo-1563396983906-b3795482a59a?q=80&w=1000',
      'https://images.unsplash.com/photo-1504297050568-910d24c426d3?q=80&w=1000',
    ],
    category: 'electronics',
    collections: ['sale', 'featured'],
    tags: ['projector', 'tech', 'entertainment'],
    colors: ['black', 'silver'],
    rating: 4.8,
    reviewCount: 32,
    stock: 8,
    isFeatured: true,
    createdAt: '2023-09-10T08:00:00Z',
  },
  {
    id: 'prod_10',
    name: 'Mini Holographic Backpack',
    description: 'Compact holographic backpack with multiple compartments. Eye-catching design with secure fastening.',
    price: 79.99,
    compareAtPrice: 99.99,
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000',
      'https://images.unsplash.com/photo-1551447465-b8c7c2a8544b?q=80&w=1000',
    ],
    category: 'women',
    collections: ['best-sellers', 'sale'],
    tags: ['bag', 'accessories', 'holographic'],
    colors: ['holographic-silver', 'holographic-pink'],
    rating: 4.7,
    reviewCount: 58,
    stock: 22,
    createdAt: '2023-09-25T08:00:00Z',
  },
  {
    id: 'prod_11',
    name: 'Reactive LED Sneakers',
    description: 'Light-up sneakers with motion-reactive LED soles. USB rechargeable with multiple lighting modes.',
    price: 119.99,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1000',
    ],
    category: 'men',
    collections: ['new-arrivals'],
    tags: ['shoes', 'led', 'footwear'],
    colors: ['black', 'white'],
    sizes: ['40', '41', '42', '43', '44', '45'],
    rating: 4.4,
    reviewCount: 46,
    stock: 30,
    isNew: true,
    createdAt: '2023-10-18T08:00:00Z',
  },
  {
    id: 'prod_12',
    name: 'Laser Cut Midi Skirt',
    description: 'Statement midi skirt with precision laser-cut patterns. High-waisted design with hidden side zipper.',
    price: 89.99,
    compareAtPrice: 109.99,
    images: [
      'https://images.unsplash.com/photo-1577900232427-18219b9166a0?q=80&w=1000',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000',
    ],
    category: 'women',
    collections: ['sale', 'featured'],
    tags: ['skirt', 'party', 'statement'],
    colors: ['black', 'silver', 'champagne'],
    sizes: ['XS', 'S', 'M', 'L'],
    rating: 4.8,
    reviewCount: 37,
    stock: 18,
    isFeatured: true,
    createdAt: '2023-09-12T08:00:00Z',
  }
];

// Testimonials for homepage
export const testimonials = [
  {
    id: 'test_1',
    name: 'Emily W.',
    avatar: 'https://i.pravatar.cc/150?img=1',
    rating: 5,
    text: 'The quality of my Neon Tech Hoodie exceeded my expectations. It\'s become my go-to piece for both casual days and nights out.',
  },
  {
    id: 'test_2',
    name: 'Jason M.',
    avatar: 'https://i.pravatar.cc/150?img=4',
    rating: 5,
    text: 'Super fast shipping and the Smart LED Lamp has transformed my living space. The app controls are intuitive and the light quality is amazing.',
  },
  {
    id: 'test_3',
    name: 'Sofia L.',
    avatar: 'https://i.pravatar.cc/150?img=5',
    rating: 4,
    text: 'Love my new holographic backpack! It catches everyone\'s attention and has enough space for all my essentials.',
  },
  {
    id: 'test_4',
    name: 'Marcus T.',
    avatar: 'https://i.pravatar.cc/150?img=3',
    rating: 5,
    text: 'The wireless earbuds have incredible sound quality and the battery life is as advertised. Worth every penny!',
  }
];

// Featured collections for homepage
export const featuredCollections = [
  {
    id: 'feat_col_1',
    name: 'New Season Essentials',
    slug: 'new-season-essentials',
    image: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=1000',
    products: ['prod_1', 'prod_4', 'prod_6', 'prod_11']
  },
  {
    id: 'feat_col_2',
    name: 'Tech Accessories',
    slug: 'tech-accessories',
    image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1000',
    products: ['prod_3', 'prod_7', 'prod_9']
  },
  {
    id: 'feat_col_3',
    name: 'Night Out',
    slug: 'night-out',
    image: 'https://images.unsplash.com/photo-1533762385849-5aa14c83dbaf?q=80&w=1000',
    products: ['prod_2', 'prod_4', 'prod_12']
  }
];

// Mock orders for user account
export const orders = [
  {
    id: 'order_1',
    date: '2023-10-15',
    status: 'delivered',
    total: 219.97,
    items: [
      { productId: 'prod_1', quantity: 1, price: 89.99 },
      { productId: 'prod_4', quantity: 1, price: 39.99 },
      { productId: 'prod_8', quantity: 2, price: 34.99 }
    ]
  },
  {
    id: 'order_2',
    date: '2023-09-28',
    status: 'processing',
    total: 299.98,
    items: [
      { productId: 'prod_3', quantity: 1, price: 149.99 },
      { productId: 'prod_10', quantity: 1, price: 79.99 },
      { productId: 'prod_6', quantity: 1, price: 69.99 }
    ]
  }
];
