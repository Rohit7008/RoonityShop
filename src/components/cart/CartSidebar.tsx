
import { motion } from 'framer-motion';
import { X, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Link } from 'react-router-dom';

const CartSidebar = () => {
  const { items, isCartOpen, toggleCart, removeItem, updateQuantity, totalPrice } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        onClick={toggleCart}
        className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"
      />
      
      {/* Sidebar */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="absolute top-0 right-0 w-full max-w-md h-full bg-dark-light border-l border-gray-800 shadow-xl flex flex-col"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center">
          <div className="flex items-center">
            <ShoppingCart size={20} className="mr-2" />
            <h2 className="text-xl font-semibold">Your Cart</h2>
          </div>
          <button 
            onClick={toggleCart} 
            className="p-2 hover:text-neon-purple transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Cart Items */}
        <div className="flex-grow overflow-y-auto py-4 px-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <ShoppingCart size={48} className="mb-4 opacity-40" />
              <p className="text-lg mb-2">Your cart is empty</p>
              <p className="text-sm mb-6">Add some products to your cart</p>
              <button 
                onClick={toggleCart}
                className="btn-primary"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-gray-800">
              {items.map((item) => (
                <li key={item.id} className="py-4 flex">
                  {/* Product Image */}
                  <div className="h-20 w-20 flex-shrink-0 rounded-md overflow-hidden bg-dark">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  
                  {/* Product Info */}
                  <div className="ml-4 flex-1 flex flex-col">
                    <div className="flex justify-between">
                      <h3 className="text-sm font-medium">{item.name}</h3>
                      <p className="text-sm font-medium">${item.price.toFixed(2)}</p>
                    </div>
                    
                    {item.size && (
                      <p className="text-xs text-gray-400 mt-1">Size: {item.size}</p>
                    )}
                    
                    {item.color && (
                      <p className="text-xs text-gray-400">Color: {item.color}</p>
                    )}
                    
                    {/* Quantity Controls */}
                    <div className="flex justify-between items-center mt-auto">
                      <div className="flex items-center border border-gray-700 rounded-md">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="px-2 py-1 text-gray-400 hover:text-white"
                        >
                          -
                        </button>
                        <span className="px-2 text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-gray-400 hover:text-white"
                        >
                          +
                        </button>
                      </div>
                      
                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-shopify-danger p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-800">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Subtotal</span>
              <span className="font-semibold">${totalPrice.toFixed(2)}</span>
            </div>
            <p className="text-xs text-gray-400 mb-4">
              Shipping and taxes calculated at checkout
            </p>
            <div className="space-y-2">
              <Link 
                to="/checkout"
                onClick={toggleCart}
                className="btn-primary w-full"
              >
                Checkout
              </Link>
              <button 
                onClick={toggleCart}
                className="btn-secondary w-full"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CartSidebar;
