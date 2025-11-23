import React, { useState } from 'react';
import Sidebar from '../components/admin/Sidebar';
import Header from '../components/admin/Header';
import Dashboard from '../components/admin/Dashboard';
import ProductsManagement from '../components/admin/ProductsManagement';
import OrdersManagement from '../components/admin/OrdersManagement';
import UsersManagement from '../components/admin/UsersManagement';
import Analytics from '../components/admin/Analytics';
import SettingsManagement from '../components/admin/SettingsManagement';
import SpaManagement from '../components/admin/SpaManagement';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const getPageTitle = () => {
    const titles = {
      dashboard: 'Dashboard',
      products: 'Quản lý sản phẩm',
      orders: 'Quản lý đơn hàng',
      customers: 'Quản lý khách hàng',
      analytics: 'Thống kê & Báo cáo',
      settings: 'Cài đặt hệ thống',
    };
    return titles[activeTab] || 'Dashboard';
  };

  const getPageSubtitle = () => {
    const today = new Date().toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    return `Chào mừng trở lại! Hôm nay là ${today}`;
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'products':
        return <ProductsManagement />;
      case 'orders':
        return <OrdersManagement />;
      case 'users':
        return <UsersManagement />;
      case 'analytics':
        return <Analytics />;
      case 'spa':
        return <SpaManagement />;
      case 'settings':
        return <SettingsManagement />
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <Header
          title={getPageTitle()}
          subtitle={getPageSubtitle()}
        />

        {/* Content */}
        <div className="p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;