import { motion } from 'framer-motion';
import { Instagram, Twitter, YoutubeIcon, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const handleLinkClick = (e: React.MouseEvent, to: string) => {
    e.preventDefault();
    navigate(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <footer className="bg-black border-t border-gray-800 relative">
      {/* Neon grid background effect */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: 'linear-gradient(to right, #9b87f5 1px, transparent 1px), linear-gradient(to bottom, #9b87f5 1px, transparent 1px)',
          backgroundSize: '2rem 2rem'
        }}></div>
      </div>
      
      {/* Footer Content */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Information */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">ROONITY</h3>
            <p className="text-gray-400 text-sm">
              Bold streetwear challenging convention.<br />
              Est. 2025 - Mumbai, India
            </p>
            <div className="flex items-center space-x-4">
              <a href="https://instagram.com" className="text-gray-400 hover:text-neon-purple transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-neon-purple transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://youtube.com" className="text-gray-400 hover:text-neon-purple transition-colors">
                <YoutubeIcon size={20} />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/shop" 
                  onClick={(e) => handleLinkClick(e, '/shop')}
                  className="text-gray-400 hover:text-neon-purple transition-colors flex items-center group"
                >
                  <ChevronRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  All Products
                </Link>
              </li>
              <li>
                <Link 
                  to="/shop?type=tshirts" 
                  onClick={(e) => handleLinkClick(e, '/shop?type=tshirts')}
                  className="text-gray-400 hover:text-neon-purple transition-colors flex items-center group"
                >
                  <ChevronRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  T-shirts
                </Link>
              </li>
              <li>
                <Link 
                  to="/shop?type=hoodies" 
                  onClick={(e) => handleLinkClick(e, '/shop?type=hoodies')}
                  className="text-gray-400 hover:text-neon-purple transition-colors flex items-center group"
                >
                  <ChevronRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  Hoodies
                </Link>
              </li>
              <li>
                <Link 
                  to="/shop?type=accessories" 
                  onClick={(e) => handleLinkClick(e, '/shop?type=accessories')}
                  className="text-gray-400 hover:text-neon-purple transition-colors flex items-center group"
                >
                  <ChevronRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/about" 
                  onClick={(e) => handleLinkClick(e, '/about')}
                  className="text-gray-400 hover:text-neon-purple transition-colors flex items-center group"
                >
                  <ChevronRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/sustainability" 
                  onClick={(e) => handleLinkClick(e, '/sustainability')}
                  className="text-gray-400 hover:text-neon-purple transition-colors flex items-center group"
                >
                  <ChevronRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  Sustainability
                </Link>
              </li>
              <li>
                <Link 
                  to="/careers" 
                  onClick={(e) => handleLinkClick(e, '/careers')}
                  className="text-gray-400 hover:text-neon-purple transition-colors flex items-center group"
                >
                  <ChevronRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  Careers
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  onClick={(e) => handleLinkClick(e, '/contact')}
                  className="text-gray-400 hover:text-neon-purple transition-colors flex items-center group"
                >
                  <ChevronRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Join Our Community</h3>
            <p className="text-gray-400 text-sm">
              Sign up for exclusive drops and updates
            </p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-purple focus:border-transparent text-white text-sm"
              />
              <button className="absolute right-1 top-1 px-3 py-1 bg-neon-purple text-black rounded-md text-sm font-medium hover:bg-neon-purple/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-500 text-sm"
          >
            © {currentYear} ROONITY. All rights reserved.
          </motion.p>
          
          <div className="flex flex-wrap justify-center mt-4 md:mt-0 gap-4">
            <Link 
              to="/terms" 
              onClick={(e) => handleLinkClick(e, '/terms')}
              className="text-gray-500 hover:text-neon-purple text-sm transition-colors"
            >
              Terms of Service
            </Link>
            <Link 
              to="/privacy" 
              onClick={(e) => handleLinkClick(e, '/privacy')}
              className="text-gray-500 hover:text-neon-purple text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/shipping" 
              onClick={(e) => handleLinkClick(e, '/shipping')}
              className="text-gray-500 hover:text-neon-purple text-sm transition-colors"
            >
              Shipping Info
            </Link>
            <Link 
              to="/returns" 
              onClick={(e) => handleLinkClick(e, '/returns')}
              className="text-gray-500 hover:text-neon-purple text-sm transition-colors"
            >
              Returns & Exchanges
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
