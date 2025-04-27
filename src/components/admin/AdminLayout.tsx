import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, Navigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const AdminLayout = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { toast } = useToast();

  // Check if the user is an admin
  const isAdmin = user?.publicMetadata?.role === 'admin';

  useEffect(() => {
    // Show error toast if user is signed in but not an admin
    if (isLoaded && isSignedIn && !isAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the admin area.",
        variant: "destructive"
      });
    }
  }, [isLoaded, isSignedIn, isAdmin, toast]);

  // Show loading state while Clerk is initializing
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-neon-purple"></div>
      </div>
    );
  }

  // Redirect to login if not signed in
  if (!isSignedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Redirect non-admin users to home page
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  const navigation = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard,
      current: location.pathname === '/admin'
    },
    {
      name: 'Products',
      href: '/admin/products',
      icon: Package,
      current: location.pathname.startsWith('/admin/products')
    },
    {
      name: 'Orders',
      href: '/admin/orders',
      icon: ShoppingCart,
      current: location.pathname.startsWith('/admin/orders')
    },
    {
      name: 'Customers',
      href: '/admin/customers',
      icon: Users,
      current: location.pathname.startsWith('/admin/customers')
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg bg-neon-purple/10 text-neon-purple hover:bg-neon-purple/20 transition-colors"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-black border-r border-neon-purple/20 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-neon-purple/20">
          <Link to="/admin" className="flex items-center space-x-3">
            <img 
              src="/mockups/mockup-1.png" 
              alt="Logo" 
              className="w-8 h-8 rounded"
            />
            <span className="text-xl font-semibold text-white">Admin</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-4">
          <div className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  item.current
                    ? 'bg-neon-purple/20 text-neon-purple'
                    : 'text-gray-400 hover:bg-neon-purple/10 hover:text-neon-purple'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            ))}
          </div>
        </nav>

        {/* User and Settings */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-neon-purple/20">
          {/* User and Settings Combined */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={user?.imageUrl}
                alt={user?.fullName || 'Admin'}
                className="w-8 h-8 rounded-full"
              />
              <div className="ml-3">
                <p className="text-sm font-medium text-white">{user?.fullName}</p>
                <p className="text-xs text-gray-400">Admin</p>
              </div>
            </div>
            <Link
              to="/admin/settings"
              className={`p-2 rounded-lg transition-colors ${
                location.pathname.startsWith('/admin/settings')
                  ? 'bg-neon-purple/20 text-neon-purple'
                  : 'text-gray-400 hover:bg-neon-purple/10 hover:text-neon-purple'
              }`}
            >
              <Settings className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={`lg:pl-64 min-h-screen flex flex-col`}>
        <main className="flex-1 py-6">
          <div className="px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 