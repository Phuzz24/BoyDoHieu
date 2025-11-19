import React from 'react';

const TopProducts = () => {
  const products = [
    { 
      id: 1, 
      name: 'Áo hoodie thời trang', 
      category: 'Áo', 
      price: 1500000, 
      stock: 20,
      image: 'https://images.stockx.com/images/Balenciaga-Paris-Fashion-Week-Hoodie-Grey.jpg?fit=fill&bg=FFFFFF&w=300&h=214&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1654632964'
    },
    { 
      id: 2, 
      name: 'Đồng hồ Rolex', 
      category: 'Phụ kiện', 
      price: 5000000, 
      stock: 3,
      image: 'https://media.gettyimages.com/id/2107861401/photo/rolex-oyster-perpetual-date-watch-is-seen-at-a-store-in-rome-italy-on-march-26-2024.jpg?s=300&w=gi&k=20&c=I2QCtsvxA2b03l2IDlmPDSjO4-nyY6aUOqJtuU-C2gY='
    },
    { 
      id: 3, 
      name: 'Quần jean nữ slim', 
      category: 'Quần', 
      price: 450000, 
      stock: 23,
      image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&h=214&fit=crop'
    },
    { 
      id: 4, 
      name: 'Váy maxi hoa', 
      category: 'Váy', 
      price: 380000, 
      stock: 12,
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=214&fit=crop'
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Sản phẩm bán chạy</h3>
        <a href="#" className="text-sm text-blue-600 hover:text-blue-700">Xem tất cả</a>
      </div>
      <div className="space-y-3">
        {products.map((product) => (
          <div key={product.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="flex-1">
              <p className="font-semibold text-gray-900 line-clamp-1">{product.name}</p>
              <p className="text-sm text-gray-600">{product.category}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-900">{product.price.toLocaleString()}đ</p>
              <p className="text-sm text-gray-600">Còn: {product.stock}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;