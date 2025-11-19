import React, { useState, useEffect } from 'react';
import { DollarSign, ShoppingCart, Package, Users } from 'lucide-react';
import StatCard from './StatCard';
import RecentOrders from './RecentOrders';
import TopProducts from './TopProducts';
import adminService from '../../services/adminService'; // Import service

const Dashboard = () => {
  const [stats, setStats] = useState({
    revenue: { value: '0đ', change: '+0%' },
    orders: { value: '0', change: '+0%' },
    products: { value: '0', change: '+0%' },
    customers: { value: '0', change: '+0%' },
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const data = await adminService.getDashboardStats(); // Gọi API
      setStats(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setLoading(false);
    }
  };

  const statsConfig = [
    { 
      title: 'Tổng doanh thu', 
      value: stats.revenue.value, 
      change: stats.revenue.change, 
      icon: DollarSign, 
      color: 'bg-gradient-to-br from-blue-500 to-blue-600' 
    },
    { 
      title: 'Đơn hàng', 
      value: stats.orders.value, 
      change: stats.orders.change, 
      icon: ShoppingCart, 
      color: 'bg-gradient-to-br from-green-500 to-green-600' 
    },
    { 
      title: 'Sản phẩm', 
      value: stats.products.value, 
      change: stats.products.change, 
      icon: Package, 
      color: 'bg-gradient-to-br from-purple-500 to-purple-600' 
    },
    { 
      title: 'Khách hàng', 
      value: stats.customers.value, 
      change: stats.customers.change, 
      icon: Users, 
      color: 'bg-gradient-to-br from-orange-500 to-orange-600' 
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsConfig.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      {/* Charts & Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentOrders />
        <TopProducts />
      </div>
    </div>
  );
};

export default Dashboard;