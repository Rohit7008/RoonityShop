import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, ShoppingBag, Settings, LogOut, Edit2, Lock, CreditCard } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

  // Mock user data - replace with actual user data from your backend
  const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY 10001',
    orders: [
      {
        id: 'ORD-001',
        date: '2024-03-15',
        total: '$129.99',
        status: 'Delivered',
        items: 2
      },
      {
        id: 'ORD-002',
        date: '2024-03-10',
        total: '$89.99',
        status: 'Processing',
        items: 1
      }
    ]
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-20">
        {/* Background grid effect */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full" style={{
            backgroundImage: 'linear-gradient(to right, #9b87f5 1px, transparent 1px), linear-gradient(to bottom, #9b87f5 1px, transparent 1px)',
            backgroundSize: '2rem 2rem'
          }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-white mb-8"
          >
            My Account
          </motion.h1>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className="w-full lg:w-64">
              <div className="bg-gray-900 rounded-lg p-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-neon-purple flex items-center justify-center">
                    <User size={24} className="text-black" />
                  </div>
                  <div>
                    <h2 className="text-white font-semibold">{userData.name}</h2>
                    <p className="text-gray-400 text-sm">{userData.email}</p>
                  </div>
                </div>

                <nav className="space-y-2">
                  {tabs.map(tab => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                          activeTab === tab.id
                            ? 'bg-neon-purple text-black'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800'
                        }`}
                      >
                        <Icon size={20} />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {activeTab === 'profile' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gray-900 rounded-lg p-6"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-white">Profile Information</h2>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="flex items-center gap-2 text-neon-purple hover:text-neon-purple/80"
                    >
                      <Edit2 size={18} />
                      <span>{isEditing ? 'Save Changes' : 'Edit Profile'}</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-400 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={userData.name}
                        disabled={!isEditing}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-neon-purple"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-2">Email</label>
                      <input
                        type="email"
                        value={userData.email}
                        disabled={!isEditing}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-neon-purple"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={userData.phone}
                        disabled={!isEditing}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-neon-purple"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-2">Address</label>
                      <textarea
                        value={userData.address}
                        disabled={!isEditing}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-neon-purple"
                        rows={3}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'orders' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gray-900 rounded-lg p-4"
                >
                  <h2 className="text-xl font-semibold text-white mb-4">Order History</h2>
                  
                  <div className="space-y-2">
                    {userData.orders.map(order => (
                      <div key={order.id} className="bg-gray-800/50 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <h3 className="text-white text-sm font-medium">Order #{order.id}</h3>
                            <p className="text-gray-400 text-xs">{order.date}</p>
                          </div>
                          <span className={`px-2 py-0.5 rounded-full text-xs ${
                            order.status === 'Delivered' ? 'bg-green-900/50 text-green-400' : 'bg-yellow-900/50 text-yellow-400'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <div className="text-gray-400 text-xs">
                            {order.items} {order.items === 1 ? 'item' : 'items'}
                          </div>
                          <div className="text-white font-medium">{order.total}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'settings' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gray-900 rounded-lg p-6"
                >
                  <h2 className="text-2xl font-semibold text-white mb-6">Account Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg">
                      <div className="p-3 bg-neon-purple/20 rounded-lg">
                        <Lock size={24} className="text-neon-purple" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-medium">Change Password</h3>
                        <p className="text-gray-400 text-sm">Update your account password</p>
                      </div>
                      <button className="text-neon-purple hover:text-neon-purple/80">
                        Update
                      </button>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg">
                      <div className="p-3 bg-neon-purple/20 rounded-lg">
                        <CreditCard size={24} className="text-neon-purple" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-medium">Payment Methods</h3>
                        <p className="text-gray-400 text-sm">Manage your payment information</p>
                      </div>
                      <button className="text-neon-purple hover:text-neon-purple/80">
                        Manage
                      </button>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg">
                      <div className="p-3 bg-red-500/20 rounded-lg">
                        <LogOut size={24} className="text-red-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-medium">Sign Out</h3>
                        <p className="text-gray-400 text-sm">Log out of your account</p>
                      </div>
                      <button className="text-red-500 hover:text-red-400">
                        Sign Out
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AccountPage; 