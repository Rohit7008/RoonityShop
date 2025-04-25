import { useState, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { ChevronDown, User, Menu, X } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { useIsMobile } from '@/hooks/useIsMobile';

const Navbar = () => {
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  useScrollToTop();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingDown = prevScrollPos < currentScrollPos;
      const isAboveThreshold = currentScrollPos < window.innerHeight;

      setVisible(!isScrollingDown || isAboveThreshold);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  const handleNavLinkClick = (path: string, id?: string) => {
    setIsMobileMenuOpen(false);
    if (id) {
      navigate(path);
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      navigate(path);
    }
  };

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 ${isMobileMenuOpen ? 'bg-black' : 'bg-transparent backdrop-blur-sm'}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Hamburger Menu Button (Mobile Only) */}
          {isMobile ? (
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white hover:text-neon-purple transition-colors"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          ) : (
            <div className="w-8"></div>
          )}

          {/* Main Navigation - Desktop */}
          {!isMobile && (
            <div className="flex items-center space-x-8">
              <Link 
                to="/" 
                className="nav-link"
              >
                Home
              </Link>

              {/* Shop Dropdown */}
              <div className="relative group">
                <Link 
                  to="/shop" 
                  className="nav-link flex items-center gap-1"
                  onMouseEnter={() => setIsShopOpen(true)}
                  onMouseLeave={() => setIsShopOpen(false)}
                >
                  Shop
                  <ChevronDown className="w-4 h-4" />
                </Link>
                
                {/* Dropdown Menu */}
                <div 
                  className={`absolute top-full -left-4 mt-2 w-48 bg-black/90 backdrop-blur-lg border border-gray-800 rounded-lg shadow-xl transform transition-all duration-200 ${
                    isShopOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
                  }`}
                  onMouseEnter={() => setIsShopOpen(true)}
                  onMouseLeave={() => setIsShopOpen(false)}
                >
                  <div className="py-2 px-4">
                    <Link to="/shop" className="dropdown-link">
                      All Products
                    </Link>
                    <Link to="/shop?type=tshirts" className="dropdown-link">
                      T-shirts
                    </Link>
                    <Link to="/shop?type=hoodies" className="dropdown-link">
                      Hoodies
                    </Link>
                    <Link to="/shop?type=accessories" className="dropdown-link">
                      Accessories
                    </Link>
                  </div>
                </div>
              </div>

              <Link to="/collections" className="nav-link">
                Collections
              </Link>
              <Link 
                to="/#about" 
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavLinkClick('/', 'about');
                }}
              >
                About
              </Link>
              <Link to="/contact" className="nav-link">
                Contact
              </Link>
            </div>
          )}

          {/* Account Icon */}
          <div className="flex items-center">
            <a 
              href="/account" 
              className="p-2 rounded-full hover:bg-white/5 transition-colors group"
              title="Account"
            >
              <User className="w-6 h-6 text-gray-400 group-hover:text-neon-purple transition-colors" />
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && isMobile && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-20 bg-black/95 backdrop-blur-lg z-40 flex flex-col"
          >
            <div className="flex flex-col p-6 space-y-6">
              <Link 
                to="/" 
                className="text-2xl font-bold text-white hover:text-neon-purple transition-colors py-2 border-b border-gray-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              
              <div className="space-y-4 py-2 border-b border-gray-800">
                <Link 
                  to="/shop" 
                  className="text-2xl font-bold text-white hover:text-neon-purple transition-colors block"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Shop
                </Link>
                <div className="pl-4 space-y-3">
                  <Link 
                    to="/shop" 
                    className="text-lg text-gray-300 hover:text-neon-purple transition-colors block"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    All Products
                  </Link>
                  <Link 
                    to="/shop?type=tshirts" 
                    className="text-lg text-gray-300 hover:text-neon-purple transition-colors block"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    T-shirts
                  </Link>
                  <Link 
                    to="/shop?type=hoodies" 
                    className="text-lg text-gray-300 hover:text-neon-purple transition-colors block"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Hoodies
                  </Link>
                  <Link 
                    to="/shop?type=accessories" 
                    className="text-lg text-gray-300 hover:text-neon-purple transition-colors block"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Accessories
                  </Link>
                </div>
              </div>
              
              <Link 
                to="/collections" 
                className="text-2xl font-bold text-white hover:text-neon-purple transition-colors py-2 border-b border-gray-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Collections
              </Link>
              
              <Link 
                to="/#about" 
                className="text-2xl font-bold text-white hover:text-neon-purple transition-colors py-2 border-b border-gray-800"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavLinkClick('/', 'about');
                }}
              >
                About
              </Link>
              
              <Link 
                to="/contact" 
                className="text-2xl font-bold text-white hover:text-neon-purple transition-colors py-2 border-b border-gray-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              
              <Link 
                to="/account" 
                className="text-2xl font-bold text-white hover:text-neon-purple transition-colors py-2 border-b border-gray-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Account
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar; 