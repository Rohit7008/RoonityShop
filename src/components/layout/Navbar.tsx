import { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { ChevronDown, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useScrollToTop } from '@/hooks/useScrollToTop';

const Navbar = () => {
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  useScrollToTop();

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

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Empty div to maintain spacing */}
          <div className="w-8"></div>

          {/* Main Navigation - Centered */}
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
                navigate('/');
                setTimeout(() => {
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
            >
              About
            </Link>
            <Link to="/contact" className="nav-link" onClick={() => navigate('/contact')}>
              Contact
            </Link>
          </div>

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
    </motion.nav>
  );
};

export default Navbar; 