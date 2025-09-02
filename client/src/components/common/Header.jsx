import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext'; // Named import
import { toast } from 'react-toastify';

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, removeFromCart } = useCart();
const { user, logout } = useAuth() || { user: null, logout: () => {} }; // Sửa dòng 14

  useEffect(() => {
    console.log('Header cart updated:', cart);
    console.log('Header user updated:', user);
  }, [cart, user]);

  useEffect(() => {
    setIsCartOpen(false);
    setIsUserOpen(false);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleCartClick = () => {
    console.log('Toggling cart dropdown, current isCartOpen:', isCartOpen, 'cart:', cart);
    setIsCartOpen(!isCartOpen);
    setIsUserOpen(false);
  };

  const handleUserClick = () => {
    if (!user) {
      navigate("/login");
    } else {
      setIsUserOpen(!isUserOpen);
      setIsCartOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Đăng xuất thành công!', {
      autoClose: 3000,
    });
    setTimeout(() => {
      navigate("/login");
    }, 3000);
  };

  return (
    <nav className="bg-gradient-to-r from-luxuryWhite to-gray-100 dark:from-luxuryBlack dark:to-gray-900 shadow-xl transition-all duration-300 hover:shadow-2xl">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <div className="shrink-0">
              <Link to="/" title="Web Đồ Hiệu" className="group">
                <img className="block w-auto h-14 dark:hidden transition-all duration-300 group-hover:scale-105 rounded-lg" src="/logo.png" alt="Web Đồ Hiệu Logo" />
                <img className="hidden w-auto h-14 dark:block transition-all duration-300 group-hover:scale-105 rounded-lg" src="/logo.png" alt="Web Đồ Hiệu Logo Dark" />
              </Link>
            </div>
            <ul className="hidden lg:flex items-center justify-start gap-6 md:gap-8 py-3 sm:justify-center">
              {["Trang chủ", "Sản phẩm", "Dịch vụ Spa", "Liên hệ"].map((item) => {
                const to = item === "Trang chủ" ? "/" : item === "Sản phẩm" ? "/products" : item === "Liên hệ" ? "/contact" : item === "Dịch vụ Spa" ? "/spa" : `/${item.toLowerCase().replace(" ", "-")}`;
                const isActive = location.pathname === to;
                return (
                  <li key={item} className="shrink-0">
                    <Link
                      to={to}
                      title={item}
                      className={`flex text-sm font-bold px-3 py-2 rounded-md transition-all duration-300 border-b-2 ${
                        isActive 
                          ? "text-luxuryGold border-luxuryGold bg-gradient-to-t from-luxuryGold/10"
                          : "border-transparent text-gray-900 dark:text-luxuryWhite hover:text-luxuryGold hover:border-luxuryGold hover:bg-gradient-to-t hover:from-luxuryGold/10 hover:scale-105"
                      }`}
                    >
                      {item}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Actions (Desktop) */}
          <div className="flex items-center lg:space-x-2">
            {/* Giỏ hàng */}
            <div className="relative">
              <button
                onClick={handleCartClick}
                type="button"
                className={`inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-bold transition-all duration-300 border-2 ${
                  isCartOpen
                    ? 'border-luxuryGold bg-luxuryGold/20 scale-105 shadow-xl text-luxuryGold'
                    : 'border-transparent bg-gradient-to-br from-luxuryGold/10 to-gray-100 dark:from-luxuryBlack/20 dark:to-gray-800 text-gray-900 dark:text-luxuryWhite hover:border-luxuryGold hover:bg-gradient-to-br hover:from-luxuryGold/10 hover:scale-105 hover:shadow-xl'
                }`}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4zm-8.5-3h9.25L19 7H7.312"
                  />
                </svg>
                <span className="hidden sm:flex">Giỏ hàng của tôi</span>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-luxuryGold text-luxuryBlack text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse-once">
                    {cart.reduce((sum, item) => sum + (item.quantity || 0), 0)}
                  </span>
                )}
              </button>
              <div
                id="myCartDropdown1"
                className={`z-50 absolute right-0 mt-2 w-96 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-luxuryGold/20 dark:border-luxuryBlack/20 p-6 transition-all duration-300 transform origin-top-right ${
                  isCartOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 hidden'
                }`}
              >
                {cart.length === 0 ? (
                  <div className="text-center space-y-4">
                    <div className="flex justify-center">
                      <svg
                        className="w-16 h-16 text-gray-400 dark:text-gray-600"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                        />
                      </svg>
                    </div>
                    <p className="text-lg font-semibold text-gray-600 dark:text-gray-400">Giỏ hàng của bạn đang trống</p>
                    <Link
                      to="/products"
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-luxuryGold to-yellow-600 text-luxuryBlack rounded-lg hover:from-luxuryBlack hover:to-gray-800 hover:text-luxuryWhite transition-all duration-300 hover:shadow-xl transform hover:scale-105"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 12h14M12 5l7 7-7 7"
                        />
                      </svg>
                      Mua sắm ngay
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="max-h-64 overflow-y-auto space-y-4">
                      {cart.map((item, index) => (
                        <div
                          key={`${item._id}-${item.selectedSize || 'no-size'}-${item.selectedColor || 'no-color'}-${index}`}
                          className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 shadow-md"
                        >
                          <div className="flex items-center space-x-4">
                            <img
                              src={item.images[0] || '/placeholder.jpg'}
                              alt={item.name || 'Sản phẩm'}
                              className="w-16 h-16 object-cover rounded-md border border-gray-200 dark:border-gray-600"
                            />
                            <div>
                              <Link
                                to={`/product/${item._id}`}
                                className="text-sm font-semibold text-luxuryBlack dark:text-luxuryWhite hover:text-luxuryGold transition-colors duration-300"
                              >
                                {item.name || 'Sản phẩm không tên'} - {item.brand || 'Không rõ thương hiệu'}
                              </Link>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                ${(item.discountPrice || item.price || 0).toFixed(2)}
                              </p>
                              {item.selectedSize && (
                                <p className="text-xs text-gray-500 dark:text-gray-400">Size: {item.selectedSize}</p>
                              )}
                              {item.selectedColor && (
                                <p className="text-xs text-gray-500 dark:text-gray-400">Color: {item.selectedColor}</p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <p className="text-sm font-medium text-luxuryBlack dark:text-luxuryWhite">
                              x{item.quantity || 1}
                            </p>
                            <button
                              onClick={() => removeFromCart(item._id, item.name)}
                              className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600 transition-colors duration-300 hover:scale-110"
                            >
                              <svg
                                className="w-5 h-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-lg font-bold text-luxuryBlack dark:text-luxuryWhite">
                        Tổng cộng: <span className="text-luxuryGold">${cart.reduce((sum, item) => sum + (item.discountPrice || item.price || 0) * (item.quantity || 1), 0).toFixed(2)}</span>
                      </p>
                      <Link
                        to="/cart"
                        className="w-full mt-4 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-luxuryGold to-yellow-600 text-luxuryBlack rounded-lg hover:from-luxuryBlack hover:to-gray-800 hover:text-luxuryWhite transition-all duration-300 hover:shadow-xl transform hover:scale-105"
                      >
                        <svg
                          className="w-5 h-5 mr-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 12h14M12 5l7 7-7 7"
                          />
                        </svg>
                        Xem giỏ hàng chi tiết
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Tài khoản/Avatar */}
            <div className="relative hidden lg:block">
              <button
                onClick={handleUserClick}
                type="button"
                className={`inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-bold transition-all duration-300 border-2 ${
                  isUserOpen
                    ? 'border-luxuryGold bg-luxuryGold/20 scale-105 shadow-xl text-luxuryGold'
                    : 'border-transparent bg-gradient-to-br from-luxuryGold/10 to-gray-100 dark:from-luxuryBlack/20 dark:to-gray-800 text-gray-900 dark:text-luxuryWhite hover:border-luxuryGold hover:bg-gradient-to-br hover:from-luxuryGold/10 hover:scale-105 hover:shadow-xl'
                }`}
              >
                {user ? (
                  <img
                    src={user.avatar || '/default-avatar.png'}
                    alt="Avatar"
                    className="w-6 h-6 rounded-full object-cover"
                  />
                ) : (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeWidth="2" d="M7 17v1a1 1 0 001 1h8a1 1 0 001-1v-1a3 3 0 00-3-3h-4a3 3 0 00-3 3Zm8-9a3 3 0 11-6 0 3 3 0 016 0Z" />
                  </svg>
                )}
                <span className="hidden sm:flex">{user ? user.username : 'Đăng nhập'}</span>
              </button>
              {user && (
                <div
                  id="userDropdown1"
                  className={`z-50 absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-luxuryGold/20 dark:border-luxuryBlack/20 p-2 transition-all duration-300 transform origin-top-right ${
                    isUserOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 hidden'
                  }`}
                >
                  <ul className="text-start text-sm font-medium text-gray-900 dark:text-luxuryWhite">
                    <li>
                      <Link
                        to="/account"
                        className={`inline-flex w-full items-center gap-2 rounded-md px-3 py-2 hover:bg-luxuryGold/20 dark:hover:bg-gray-700 transition-colors duration-300 hover:text-luxuryGold hover:shadow-md ${
                          location.pathname === '/account' ? 'bg-luxuryGold/20 text-luxuryGold' : ''
                        }`}
                      >
                        Tài khoản của tôi
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/orders"
                        className={`inline-flex w-full items-center gap-2 rounded-md px-3 py-2 hover:bg-luxuryGold/20 dark:hover:bg-gray-700 transition-colors duration-300 hover:text-luxuryGold hover:shadow-md ${
                          location.pathname === '/orders' ? 'bg-luxuryGold/20 text-luxuryGold' : ''
                        }`}
                      >
                        Đơn hàng của tôi
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/change-password"
                        className={`inline-flex w-full items-center gap-2 rounded-md px-3 py-2 hover:bg-luxuryGold/20 dark:hover:bg-gray-700 transition-colors duration-300 hover:text-luxuryGold hover:shadow-md ${
                          location.pathname === '/change-password' ? 'bg-luxuryGold/20 text-luxuryGold' : ''
                        }`}
                      >
                        Đổi mật khẩu
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 hover:bg-luxuryGold/20 dark:hover:bg-gray-700 transition-colors duration-300 hover:text-luxuryGold hover:shadow-md"
                      >
                        Đăng xuất
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {!user && (
              <Link
                to="/register"
                className={`hidden lg:inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-bold transition-all duration-300 border-2 ${
                  location.pathname === '/register'
                    ? 'border-luxuryGold bg-luxuryGold/20 scale-105 shadow-xl text-luxuryGold'
                    : 'border-transparent bg-gradient-to-br from-luxuryGold/10 to-gray-100 dark:from-luxuryBlack/20 dark:to-gray-800 text-gray-900 dark:text-luxuryWhite hover:border-luxuryGold hover:bg-gradient-to-br hover:from-luxuryGold/10 hover:scale-105 hover:shadow-xl'
                }`}
              >
                Đăng ký
              </Link>
            )}

            <button
              type="button"
              data-collapse-toggle="ecommerce-navbar-menu-1"
              aria-controls="ecommerce-navbar-menu-1"
              aria-expanded={isMobileMenuOpen}
              className="inline-flex lg:hidden items-center justify-center p-2 bg-gradient-to-br from-luxuryGold/10 to-gray-100 dark:from-luxuryBlack/20 dark:to-gray-800 text-gray-900 dark:text-luxuryWhite transition-all duration-300 hover:scale-110 hover:shadow-lg"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Mở menu</span>
              <svg
                className="w-6 h-6 transition-transform duration-300 hover:scale-110"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                  d="M5 7h14M5 12h14M5 17h14"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          id="ecommerce-navbar-menu-1"
          className={`${isMobileMenuOpen ? 'block' : 'hidden'} bg-white dark:bg-gray-900 border border-luxuryGold/20 dark:border-luxuryBlack/20 rounded-xl py-3 px-4 mt-4 transition-all duration-300 transform ${
            isMobileMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <ul className="text-gray-900 dark:text-luxuryWhite text-sm font-bold space-y-3">
            {["Trang chủ", "Sản phẩm", "Dịch vụ Spa", "Liên hệ"].map((item) => {
              const to = item === "Trang chủ" ? "/" : item === "Sản phẩm" ? "/products" : item === "Liên hệ" ? "/contact" : item === "Dịch vụ Spa" ? "/spa" : `/${item.toLowerCase().replace(" ", "-")}`;
              const isActive = location.pathname === to;
              return (
                <li key={item}>
                  <Link
                    to={to}
                    className={`block w-full px-3 py-2 rounded-md transition-all duration-300 border-b-2 ${
                      isActive
                        ? "text-luxuryGold border-luxuryGold bg-gradient-to-t from-luxuryGold/10"
                        : "border-transparent text-gray-900 dark:text-luxuryWhite hover:text-luxuryGold hover:border-luxuryGold hover:bg-gradient-to-t hover:from-luxuryGold/10 hover:scale-105"
                    }`}
                  >
                    {item}
                  </Link>
                </li>
              );
            })}
            {/* Mobile Cart */}
            <li>
              <button
                onClick={handleCartClick}
                className={`block w-full px-3 py-2 rounded-md transition-all duration-300 border-b-2 ${
                  isCartOpen
                    ? "text-luxuryGold border-luxuryGold bg-gradient-to-t from-luxuryGold/10"
                    : "border-transparent text-gray-900 dark:text-luxuryWhite hover:text-luxuryGold hover:border-luxuryGold hover:bg-gradient-to-t hover:from-luxuryGold/10 hover:scale-105"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>Giỏ hàng của tôi</span>
                  {cart.length > 0 && (
                    <span className="bg-luxuryGold text-luxuryBlack text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cart.reduce((sum, item) => sum + (item.quantity || 0), 0)}
                    </span>
                  )}
                </div>
              </button>
            </li>
            {/* Mobile User/Avatar */}
            <li>
              <button
                onClick={handleUserClick}
                className={`block w-full px-3 py-2 rounded-md transition-all duration-300 border-b-2 ${
                  isUserOpen
                    ? "text-luxuryGold border-luxuryGold bg-gradient-to-t from-luxuryGold/10"
                    : "border-transparent text-gray-900 dark:text-luxuryWhite hover:text-luxuryGold hover:border-luxuryGold hover:bg-gradient-to-t hover:from-luxuryGold/10 hover:scale-105"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {user ? (
                      <img
                        src={user.avatar || '/default-avatar.png'}
                        alt="Avatar"
                        className="w-6 h-6 rounded-full object-cover"
                      />
                    ) : (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeWidth="2" d="M7 17v1a1 1 0 001 1h8a1 1 0 001-1v-1a3 3 0 00-3-3h-4a3 3 0 00-3 3Zm8-9a3 3 0 11-6 0 3 3 0 016 0Z" />
                      </svg>
                    )}
                    <span>{user ? user.username : 'Đăng nhập'}</span>
                  </div>
                </div>
              </button>
              {user && (
                <ul className={`pl-4 space-y-2 ${isUserOpen ? 'block' : 'hidden'}`}>
                  <li>
                    <Link
                      to="/account"
                      className={`block w-full px-3 py-2 rounded-md transition-all duration-300 ${
                        location.pathname === '/account' ? 'text-luxuryGold bg-luxuryGold/10' : 'text-gray-900 dark:text-luxuryWhite hover:text-luxuryGold hover:bg-luxuryGold/10'
                      }`}
                    >
                      Tài khoản của tôi
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/orders"
                      className={`block w-full px-3 py-2 rounded-md transition-all duration-300 ${
                        location.pathname === '/orders' ? 'text-luxuryGold bg-luxuryGold/10' : 'text-gray-900 dark:text-luxuryWhite hover:text-luxuryGold hover:bg-luxuryGold/10'
                      }`}
                    >
                      Đơn hàng của tôi
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/change-password"
                      className={`block w-full px-3 py-2 rounded-md transition-all duration-300 ${
                        location.pathname === '/change-password' ? 'text-luxuryGold bg-luxuryGold/10' : 'text-gray-900 dark:text-luxuryWhite hover:text-luxuryGold hover:bg-luxuryGold/10'
                      }`}
                    >
                      Đổi mật khẩu
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-3 py-2 rounded-md transition-all duration-300 text-gray-900 dark:text-luxuryWhite hover:text-luxuryGold hover:bg-luxuryGold/10"
                    >
                      Đăng xuất
                    </button>
                  </li>
                </ul>
              )}
            </li>
            {!user && (
              <li>
                <Link
                  to="/register"
                  className={`block w-full px-3 py-2 rounded-md transition-all duration-300 border-b-2 ${
                    location.pathname === '/register'
                      ? "text-luxuryGold border-luxuryGold bg-gradient-to-t from-luxuryGold/10"
                      : "border-transparent text-gray-900 dark:text-luxuryWhite hover:text-luxuryGold hover:border-luxuryGold hover:bg-gradient-to-t hover:from-luxuryGold/10 hover:scale-105"
                  }`}
                >
                  Đăng ký
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;