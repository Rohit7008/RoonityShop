
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark-lighter pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Shop */}
          <div>
            <h3 className="text-lg font-bold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/products" 
                  className="text-gray-400 hover:text-neon-purple transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link 
                  to="/collections/new-arrivals" 
                  className="text-gray-400 hover:text-neon-purple transition-colors"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link 
                  to="/collections/best-sellers" 
                  className="text-gray-400 hover:text-neon-purple transition-colors"
                >
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link 
                  to="/collections/sale" 
                  className="text-gray-400 hover:text-neon-purple transition-colors"
                >
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/category/men" 
                  className="text-gray-400 hover:text-neon-purple transition-colors"
                >
                  Men
                </Link>
              </li>
              <li>
                <Link 
                  to="/category/women" 
                  className="text-gray-400 hover:text-neon-purple transition-colors"
                >
                  Women
                </Link>
              </li>
              <li>
                <Link 
                  to="/category/electronics" 
                  className="text-gray-400 hover:text-neon-purple transition-colors"
                >
                  Electronics
                </Link>
              </li>
              <li>
                <Link 
                  to="/category/home" 
                  className="text-gray-400 hover:text-neon-purple transition-colors"
                >
                  Home
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/about" 
                  className="text-gray-400 hover:text-neon-purple transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-gray-400 hover:text-neon-purple transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  to="/faq" 
                  className="text-gray-400 hover:text-neon-purple transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms" 
                  className="text-gray-400 hover:text-neon-purple transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacy" 
                  className="text-gray-400 hover:text-neon-purple transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter to receive updates and exclusive offers.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-dark border border-gray-700 rounded-l-lg py-2 px-4 focus:outline-none focus:ring-1 focus:ring-neon-purple flex-grow"
              />
              <button
                type="submit"
                className="bg-neon-purple hover:bg-neon-purple/90 text-white font-medium py-2 px-4 rounded-r-lg transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Logo */}
            <Link to="/" className="mb-4 md:mb-0">
              <span className="text-xl font-bold bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent">
                NeonShop
              </span>
            </Link>

            {/* Social Icons */}
            <div className="flex space-x-4 mb-4 md:mb-0">
              <a href="#" className="text-gray-400 hover:text-neon-purple transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-neon-purple transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-neon-purple transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>

            {/* Copyright */}
            <div className="text-sm text-gray-500">
              © {year} NeonShop. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
