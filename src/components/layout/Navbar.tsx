import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import CartSidebar from '@/components/cart/CartSidebar';
import { UserButton } from '@/components/auth/UserButton';
import { useIsMobile } from '@/hooks/useIsMobile';
import { SignedIn } from '@clerk/clerk-react';

const Navbar = () => {
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const { toggleCart, totalItems } = useCart();
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 ${isMobileMenuOpen ? 'bg-black' : 'bg-transparent backdrop-blur-sm'}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="w-12 h-12 rounded-lg overflow-hidden hover:shadow-[0_0_15px_rgba(147,51,234,0.3)] transition-shadow duration-300">
              <img 
                src="/mockups/mockup-1.png" 
                alt="ROONITY Logo" 
                className="w-full h-full object-cover"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-neon-purple transition-colors">Home</Link>
            <Link to="/shop" className="text-white hover:text-neon-purple transition-colors">Shop</Link>
            <Link to="/collections" className="text-white hover:text-neon-purple transition-colors">Collections</Link>
            <Link to="/about" className="text-white hover:text-neon-purple transition-colors">About</Link>
            <Link to="/contact" className="text-white hover:text-neon-purple transition-colors">Contact</Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* User Button */}
            <UserButton />

            {/* Cart - Only shown when user is signed in */}
            <SignedIn>
              <button 
                onClick={toggleCart} 
                className="p-2 rounded-full hover:bg-white/5 transition-colors group"
              >
                <ShoppingCart className="w-6 h-6 text-gray-400 group-hover:text-neon-purple transition-colors" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-neon-purple text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </SignedIn>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="p-2 md:hidden"
            >
              <Menu size={24} className={isMobileMenuOpen ? 'hidden' : 'block'} />
              <X size={24} className={isMobileMenuOpen ? 'block' : 'hidden'} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
          <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-black border-t border-gray-800"
        >
          <div className="container mx-auto py-4 space-y-4">
              <Link 
                to="/" 
              className="block py-2 text-white hover:text-neon-purple transition-colors"
              >
                Home
              </Link>
                <Link 
                  to="/shop" 
              className="block py-2 text-white hover:text-neon-purple transition-colors"
                >
                  Shop
                </Link>
              <Link 
                to="/collections" 
              className="block py-2 text-white hover:text-neon-purple transition-colors"
              >
                Collections
              </Link>
              <Link 
              to="/about" 
              className="block py-2 text-white hover:text-neon-purple transition-colors"
              >
                About
              </Link>
              <Link 
                to="/contact" 
              className="block py-2 text-white hover:text-neon-purple transition-colors"
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}

      {/* Cart Sidebar */}
      <CartSidebar />
    </motion.nav>
  );
};

export default Navbar; 