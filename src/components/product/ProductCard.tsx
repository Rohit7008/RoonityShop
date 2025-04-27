import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Check } from 'lucide-react';
import type { Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useUser } from '@clerk/clerk-react';
import { useToast } from '@/components/ui/use-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem, toggleCart } = useCart();
  const { isSignedIn, user } = useUser();
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to product page
    
    if (!isSignedIn) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to add items to your cart",
        variant: "destructive"
      });
      return;
    }

    // Prevent multiple clicks
    if (isAdding) return;

    try {
      setIsAdding(true);
      
      // Add the item to cart
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity: 1
      });

      // Show success state
      setShowSuccess(true);
      
      // Show success toast
      toast({
        title: "Added to cart!",
        description: `${product.name} has been added to your cart`,
        variant: "default"
      });

      // Open cart sidebar
      setTimeout(() => {
        toggleCart();
      }, 500);

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive"
      });
    } finally {
      // Reset states after animation
      setTimeout(() => {
        setIsAdding(false);
        setShowSuccess(false);
      }, 1500);
    }
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="product-card group relative"
    >
      {/* Add to Cart Button */}
      <motion.button
        onClick={handleAddToCart}
        className="absolute top-2 left-2 z-20 p-2 rounded-full bg-black/80 backdrop-blur-sm border border-neon-purple/20 
                 hover:border-neon-purple hover:bg-neon-purple/20 transition-all duration-300
                 opacity-0 group-hover:opacity-100 transform -translate-y-2 group-hover:translate-y-0"
        whileTap={{ scale: 0.9 }}
        initial={false}
      >
        {showSuccess ? (
          <Check className="w-5 h-5 text-neon-purple" />
        ) : (
          <ShoppingCart className={`w-5 h-5 ${isAdding ? 'text-neon-purple animate-bounce' : 'text-gray-300'}`} />
        )}
      </motion.button>

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

      {/* Image with Add Animation */}
      <div className="aspect-[3/4] overflow-hidden rounded-lg relative">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
        />
        {isAdding && (
          <motion.div
            initial={{ scale: 1, y: 0, opacity: 1 }}
            animate={{ scale: 0.5, y: -100, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="bg-black/80 backdrop-blur-sm p-4 rounded-full">
              <ShoppingCart className="w-6 h-6 text-neon-purple" />
            </div>
          </motion.div>
        )}
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
        <div className="mt-2 flex items-center">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < Math.round(product.rating) ? "text-yellow-400" : "text-gray-300"}>★</span>
            ))}
          </div>
          <span className="ml-1 text-xs text-gray-400">({product.reviewCount})</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
