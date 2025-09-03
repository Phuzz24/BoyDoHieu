import React from 'react';
import { useFavorite } from '../context/FavoriteContext';
import ProductCard from '../components/product/ProductCard';
import { FaHeartBroken } from 'react-icons/fa';

const Favorites = () => {
  const { favorites } = useFavorite();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-extrabold text-luxuryBlack dark:text-luxuryWhite tracking-tight">
          ❤️ Sản phẩm yêu thích
        </h1>
        {/* Bạn có thể thêm nút "Xóa tất cả" nếu muốn */}
        {/* <button className="text-sm text-red-500 hover:underline">Xóa tất cả</button> */}
      </div>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center mt-20 text-gray-500 dark:text-gray-300">
          <FaHeartBroken className="text-6xl mb-4 text-red-400" />
          <p className="text-lg font-medium mb-2">Bạn chưa có sản phẩm yêu thích nào.</p>
          <p className="text-sm">Hãy duyệt sản phẩm và nhấn vào ❤️ để lưu lại nhé!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-fade-in">
          {favorites.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
