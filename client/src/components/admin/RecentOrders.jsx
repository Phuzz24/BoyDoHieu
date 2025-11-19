import React from 'react';

const RecentOrders = () => {
  const orders = [
    { id: 'ORD001', customer: 'Nguyễn Văn A', total: 1200000, status: 'pending' },
    { id: 'ORD002', customer: 'Trần Thị B', total: 800000, status: 'shipping' },
    { id: 'ORD003', customer: 'Lê Văn C', total: 450000, status: 'completed' },
    { id: 'ORD004', customer: 'Phạm Thị D', total: 1800000, status: 'pending' },
  ];

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-700',
      shipping: 'bg-blue-100 text-blue-700',
      completed: 'bg-green-100 text-green-700',
    };
    return colors[status];
  };

  const getStatusText = (status) => {
    const texts = {
      pending: 'Chờ xử lý',
      shipping: 'Đang giao',
      completed: 'Hoàn thành',
    };
    return texts[status];
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Đơn hàng gần đây</h3>
        <a href="#" className="text-sm text-blue-600 hover:text-blue-700">Xem tất cả</a>
      </div>
      <div className="space-y-3">
        {orders.map((order) => (
          <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
            <div>
              <p className="font-semibold text-gray-900">{order.id}</p>
              <p className="text-sm text-gray-600">{order.customer}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-900 mb-1">{order.total.toLocaleString()}đ</p>
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(order.status)}`}>
                {getStatusText(order.status)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentOrders;