
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, ShoppingCart, Search, User } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import CartSidebar from '@/components/cart/CartSidebar';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toggleCart, totalItems } = useCart();
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-dark-light shadow-lg backdrop-blur-lg bg-opacity-90' : 'bg-transparent'
      }`}
    >
      <div className="container-custom mx-auto">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent">
              NeonShop
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="navbar-link">Home</Link>
            <Link to="/products" className="navbar-link">Shop</Link>
            <Link to="/collections/new-arrivals" className="navbar-link">New Arrivals</Link>
            <Link to="/collections/best-sellers" className="navbar-link">Best Sellers</Link>
            <Link to="/about" className="navbar-link">About</Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4 md:space-x-6">
            {/* Search */}
            <Link to="/search" className="p-2 hover:text-neon-purple transition-colors">
              <Search size={20} />
            </Link>

            {/* Account */}
            <Link to={isAuthenticated ? "/account" : "/login"} className="p-2 hover:text-neon-purple transition-colors">
              <User size={20} />
            </Link>

            {/* Cart */}
            <button 
              onClick={toggleCart} 
              className="p-2 hover:text-neon-purple relative transition-colors"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-neon-purple text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="p-2 md:hidden"
            >
              <Menu size={24} className={isMenuOpen ? 'hidden' : 'block'} />
              <X size={24} className={isMenuOpen ? 'block' : 'hidden'} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-dark-light border-t border-gray-800"
        >
          <div className="container-custom py-4 space-y-4">
            <Link 
              to="/" 
              className="block py-2 hover:text-neon-purple transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="block py-2 hover:text-neon-purple transition-colors"
            >
              Shop
            </Link>
            <Link 
              to="/collections/new-arrivals" 
              className="block py-2 hover:text-neon-purple transition-colors"
            >
              New Arrivals
            </Link>
            <Link 
              to="/collections/best-sellers" 
              className="block py-2 hover:text-neon-purple transition-colors"
            >
              Best Sellers
            </Link>
            <Link 
              to="/about" 
              className="block py-2 hover:text-neon-purple transition-colors"
            >
              About
            </Link>
          </div>
        </motion.div>
      )}
      
      {/* Cart Sidebar */}
      <CartSidebar />
    </header>
  );
};

export default Header;
