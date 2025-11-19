import React, { useState, useEffect } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import adminService from '../../services/adminService';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const Analytics = () => {
  const [revenueData, setRevenueData] = useState({ labels: [], datasets: [] });
  const [ordersData, setOrdersData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const data = await adminService.getAnalytics(); // API GET /admin/analytics
      // Revenue chart (line)
      setRevenueData({
        labels: data.months || ['Th10', 'Th11', 'Th12'],
        datasets: [{
          label: 'Doanh thu (triệu ₫)',
          data: data.revenue || [20, 45, 60],
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
        }],
      });
      // Orders pie
      setOrdersData({
        labels: ['Pending', 'Shipping', 'Completed', 'Cancelled'],
        datasets: [{
          label: 'Số đơn hàng',
          data: data.ordersCount || [10, 15, 20, 5],
          backgroundColor: ['#fbbf24', '#3b82f6', '#10b981', '#ef4444'],
        }],
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setLoading(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Phân tích & Thống kê</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Line Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Doanh thu theo tháng</h3>
          <Line data={revenueData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
        </div>
        {/* Orders Pie Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Trạng thái đơn hàng</h3>
          <Pie data={ordersData} options={{ responsive: true, plugins: { legend: { position: 'right' } } }} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;