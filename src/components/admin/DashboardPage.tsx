import { useState } from 'react';
import {
  TrendingUp,
  ShoppingBag,
  Users,
  DollarSign,
  Package,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface DashboardMetric {
  name: string;
  value: string | number;
  change: number;
  icon: any;
}

const DashboardPage = () => {
  const [metrics] = useState<DashboardMetric[]>([
    {
      name: 'Total Revenue',
      value: '$12,345',
      change: 12,
      icon: DollarSign
    },
    {
      name: 'Total Orders',
      value: '156',
      change: 8,
      icon: ShoppingBag
    },
    {
      name: 'Total Customers',
      value: '2,345',
      change: 23,
      icon: Users
    },
    {
      name: 'Products Sold',
      value: '432',
      change: -5,
      icon: Package
    }
  ]);

  const [recentOrders] = useState([
    {
      id: '1',
      customer: 'John Doe',
      date: '2024-03-15',
      amount: 129.99,
      status: 'completed'
    },
    {
      id: '2',
      customer: 'Jane Smith',
      date: '2024-03-14',
      amount: 89.99,
      status: 'processing'
    },
    {
      id: '3',
      customer: 'Mike Johnson',
      date: '2024-03-14',
      amount: 199.99,
      status: 'completed'
    }
  ]);

  const [topProducts] = useState([
    {
      name: 'Classic White T-Shirt',
      sold: 45,
      revenue: 1345.50
    },
    {
      name: 'Black Denim Jeans',
      sold: 38,
      revenue: 2280.00
    },
    {
      name: 'Summer Dress',
      sold: 32,
      revenue: 1920.00
    }
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-white">Dashboard</h1>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <div
            key={metric.name}
            className="bg-white/5 border border-neon-purple/20 rounded-lg p-6 hover:border-neon-purple/40 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-400">{metric.name}</p>
                <p className="text-2xl font-semibold text-white mt-2">
                  {metric.value}
                </p>
              </div>
              <div className="p-2 bg-white/5 rounded-lg">
                <metric.icon className="w-5 h-5 text-neon-purple" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {metric.change > 0 ? (
                <ArrowUpRight className="w-4 h-4 text-green-400" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-red-400" />
              )}
              <span
                className={`text-sm ml-1 ${
                  metric.change > 0 ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {Math.abs(metric.change)}%
              </span>
              <span className="text-sm text-gray-400 ml-1">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white/5 border border-neon-purple/20 rounded-lg p-6">
          <h2 className="text-lg font-medium text-white mb-4">Recent Orders</h2>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between py-3 border-b border-neon-purple/10 last:border-0"
              >
                <div>
                  <p className="text-sm font-medium text-white">
                    {order.customer}
                  </p>
                  <p className="text-xs text-gray-400">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-white">
                    ${order.amount}
                  </p>
                  <p className="text-xs text-gray-400 capitalize">
                    {order.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white/5 border border-neon-purple/20 rounded-lg p-6">
          <h2 className="text-lg font-medium text-white mb-4">Top Products</h2>
          <div className="space-y-4">
            {topProducts.map((product) => (
              <div
                key={product.name}
                className="flex items-center justify-between py-3 border-b border-neon-purple/10 last:border-0"
              >
                <div>
                  <p className="text-sm font-medium text-white">
                    {product.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {product.sold} units sold
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-white">
                    ${product.revenue.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-400">Revenue</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 