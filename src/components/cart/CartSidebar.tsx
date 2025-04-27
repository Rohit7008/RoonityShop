import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Link } from 'react-router-dom';

const CartSidebar = () => {
  const { items, isCartOpen, toggleCart, removeItem, updateQuantity, totalPrice } = useCart();

  // Animation variants
  const sidebarVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: { 
      x: '100%', 
      opacity: 0,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  if (!isCartOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100]">
        {/* Backdrop */}
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={backdropVariants}
          onClick={toggleCart}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />
        
        {/* Cart Sidebar */}
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={sidebarVariants}
          className="absolute right-0 top-0 h-[100dvh] w-full max-w-md flex flex-col bg-black border-l border-neon-purple/20 shadow-[0_0_25px_rgba(147,51,234,0.1)]"
        >
          {/* Header */}
          <div className="flex-shrink-0 px-6 py-4 border-b border-neon-purple/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-6 h-6 text-neon-purple" />
                <h2 className="text-xl font-semibold text-white">Your Cart</h2>
              </div>
              <button 
                onClick={toggleCart}
                className="p-2 rounded-full hover:bg-neon-purple/10 transition-colors group"
              >
                <X className="w-5 h-5 text-gray-400 group-hover:text-neon-purple transition-colors" />
              </button>
            </div>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-neon-purple/20 scrollbar-track-transparent">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 p-6">
                <ShoppingCart className="w-16 h-16 mb-4 text-neon-purple/30" />
                <p className="text-lg font-medium mb-2">Your cart is empty</p>
                <p className="text-sm text-gray-500 mb-8 text-center">
                  Looks like you haven't added any items to your cart yet
                </p>
                <button 
                  onClick={toggleCart}
                  className="px-6 py-3 rounded-full bg-neon-purple text-white hover:bg-neon-purple/90 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4 px-6">
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex gap-4 p-4 rounded-lg bg-white/5 border border-neon-purple/10 hover:border-neon-purple/20 transition-colors"
                  >
                    {/* Product Image */}
                    <div className="h-24 w-24 rounded-md overflow-hidden bg-white/5">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0 flex flex-col">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="text-sm font-medium text-white truncate">
                          {item.name}
                        </h3>
                        <p className="text-sm font-semibold text-neon-purple">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>

                      {/* Product Attributes */}
                      <div className="mt-1 space-y-1">
                        {item.size && (
                          <p className="text-xs text-gray-400">Size: {item.size}</p>
                        )}
                        {item.color && (
                          <p className="text-xs text-gray-400">Color: {item.color}</p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between mt-auto pt-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="p-1 rounded-md hover:bg-neon-purple/10 text-gray-400 hover:text-neon-purple transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 rounded-md hover:bg-neon-purple/10 text-gray-400 hover:text-neon-purple transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1.5 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="flex-shrink-0 border-t border-neon-purple/20 bg-black/95 px-6 py-4">
              {/* Summary */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-lg font-semibold text-white">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 text-center">
                  Shipping and taxes will be calculated at checkout
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Link
                  to="/checkout"
                  onClick={toggleCart}
                  className="flex items-center justify-center w-full px-6 py-3 rounded-full bg-neon-purple text-white font-medium hover:bg-neon-purple/90 transition-colors"
                >
                  Proceed to Checkout
                </Link>
                <button
                  onClick={toggleCart}
                  className="w-full px-6 py-3 rounded-full border border-neon-purple/20 text-white hover:bg-neon-purple/10 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CartSidebar;
