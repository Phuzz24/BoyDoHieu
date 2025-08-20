import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false); // Chỉ mở khi click
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Giả lập trạng thái đăng nhập
  const navigate = useNavigate();
  const location = useLocation(); // Để kiểm tra trang hiện tại

  // Dummy data cho giỏ hàng
  const cartItems = []; // Rỗng để test giỏ hàng trống

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập (giả lập, có thể thay bằng API sau)
    const checkAuth = () => {
      setIsLoggedIn(false);
    };
    checkAuth();
  }, []);

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen); // Mở dropdown khi click
  };

  const handleLoginClick = () => {
    if (!isLoggedIn) {
      navigate("/login"); // Chuyển đến trang đăng nhập khi chưa đăng nhập
    } else {
      setIsUserOpen(!isUserOpen); // Mở dropdown tài khoản khi đã đăng nhập
    }
  };

  return (
    <nav className="bg-gradient-to-r from-luxuryWhite to-gray-100 dark:from-luxuryBlack dark:to-gray-900 shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <div className="shrink-0">
              <Link to="/" title="Web Đồ Hiệu" className="group">
                <img
                  className="block w-auto h-14 dark:hidden transition-all duration-300 group-hover:scale-105 rounded-lg"
                  src="/logo.png"
                  alt="Web Đồ Hiệu Logo"
                />
                <img
                  className="hidden w-auto h-14 dark:block transition-all duration-300 group-hover:scale-105 rounded-lg"
                  src="/logo.png" // Thay bằng logo dark nếu có
                  alt="Web Đồ Hiệu Logo Dark"
                />
              </Link>
            </div>

            {/* Navigation - Desktop */}
            <ul className="hidden lg:flex items-center justify-start gap-6 md:gap-8 py-3 sm:justify-center">
              {["Trang chủ", "Sản phẩm", "Về chúng tôi", "Liên hệ"].map((item) => {
              const to = item === "Trang chủ" ? "/" : item === "Sản phẩm" ? "/products" : `/${item.toLowerCase().replace(" ", "-")}`;
                const isActive = location.pathname === to;
                return (
                  <li key={item} className="shrink-0">
                    <Link
                      to={to}
                      title={item}
                      className={`flex text-sm font-bold transition-colors duration-300 ${
                        isActive
                          ? "text-luxuryGold"
                          : "text-gray-900 dark:text-luxuryWhite hover:text-luxuryGold"
                      }`}
                    >
                      {item}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex items-center lg:space-x-2">
            <div className="relative">
              <button
                id="myCartDropdownButton1"
                data-dropdown-toggle="myCartDropdown1"
                type="button"
                className="inline-flex items-center rounded-full justify-center p-2 hover:bg-luxuryGold/20 dark:hover:bg-gray-700 text-sm font-bold leading-none text-gray-900 dark:text-luxuryWhite transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
                onClick={handleCartClick}
              >
                <span className="sr-only">Giỏ hàng</span>
                <svg
                  className="w-6 h-6 lg:me-1 transition-transform duration-300 hover:scale-110"
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
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                  />
                </svg>
                <span className="hidden sm:flex">Giỏ hàng của tôi</span>
              </button>

              <div
                id="myCartDropdown1"
                className={`${
                  isCartOpen ? "block" : "hidden"
                } z-50 absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4 transition-all duration-300 transform origin-top-right scale-100 opacity-100`}
              >
                {cartItems.length === 0 ? (
                  <div className="text-center">
                    <p className="text-gray-500 dark:text-gray-400 font-medium mb-4">Giỏ hàng trống</p>
                    <Link
                      to="/"
                      className="inline-flex items-center px-4 py-2 bg-luxuryGold text-luxuryBlack rounded-full hover:bg-luxuryBlack hover:text-luxuryWhite transition-all duration-300 hover:scale-105 shadow-md"
                    >
                      Mua sắm ngay
                    </Link>
                  </div>
                ) : (
                  <>
                    {cartItems.map((item, index) => (
                      <div key={index} className="grid grid-cols-2 py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                        <div>
                          <Link
                            to="#"
                            className="truncate text-sm font-semibold text-gray-900 dark:text-luxuryWhite hover:text-luxuryGold transition-colors duration-300"
                          >
                            {item.name || `Sản phẩm ${index + 1}`}
                          </Link>
                          <p className="mt-0.5 truncate text-sm font-normal text-gray-500 dark:text-gray-400">
                            {item.price || "100,000 VNĐ"}
                          </p>
                        </div>
                        <div className="flex items-center justify-end gap-2">
                          <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            Số lượng: {item.quantity || 1}
                          </p>
                          <button
                            className="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-600 transition-transform duration-300 hover:scale-110"
                          >
                            <span className="sr-only">Xóa</span>
                            <svg
                              className="h-4 w-4"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fillRule="evenodd"
                                d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm7.7-3.7a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L13.4 12l2.3-2.3a1 1 0 0 0-1.4-1.4L12 10.6 9.7 8.3Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                    <Link
                      to="/cart"
                      className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 bg-luxuryGold text-luxuryBlack rounded-full hover:bg-luxuryBlack hover:text-luxuryWhite transition-all duration-300 hover:scale-105 shadow-md"
                    >
                      Xem giỏ hàng
                    </Link>
                  </>
                )}
              </div>
            </div>

            <div className="relative">
              <button
                id="userDropdownButton1"
                data-dropdown-toggle="userDropdown1"
                type="button"
                className="inline-flex items-center rounded-full justify-center p-2 hover:bg-luxuryGold/20 dark:hover:bg-gray-700 text-sm font-bold leading-none text-gray-900 dark:text-luxuryWhite transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
                onClick={handleLoginClick}
              >
                <svg
                  className="w-6 h-6 me-1 transition-transform duration-300 hover:scale-110"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                {isLoggedIn ? "Tài khoản" : "Đăng nhập"}
              </button>

              <div
                id="userDropdown1"
                className={`${
                  isUserOpen ? "block" : "hidden"
                } z-50 absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-2 transition-all duration-300 transform origin-top-right scale-100 opacity-100`}
              >
                {isLoggedIn ? (
                  <ul className="text-start text-sm font-medium text-gray-900 dark:text-luxuryWhite">
                    <li>
                      <Link
                        to="/account"
                        className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 hover:bg-luxuryGold/20 dark:hover:bg-gray-600 transition-colors duration-300 hover:text-luxuryGold"
                      >
                        Tài khoản của tôi
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/orders"
                        className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 hover:bg-luxuryGold/20 dark:hover:bg-gray-600 transition-colors duration-300 hover:text-luxuryGold"
                      >
                        Đơn hàng của tôi
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/logout"
                        className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 hover:bg-luxuryGold/20 dark:hover:bg-gray-600 transition-colors duration-300 hover:text-luxuryGold"
                      >
                        Đăng xuất
                      </Link>
                    </li>
                  </ul>
                ) : null}
              </div>
            </div>

            {!isLoggedIn && (
              <Link
                to="/register"
                className="inline-flex items-center rounded-full justify-center p-2 hover:bg-luxuryGold/20 dark:hover:bg-gray-700 text-sm font-bold leading-none text-gray-900 dark:text-luxuryWhite transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
              >
                Đăng ký
              </Link>
            )}

            <button
              type="button"
              data-collapse-toggle="ecommerce-navbar-menu-1"
              aria-controls="ecommerce-navbar-menu-1"
              aria-expanded={isMobileMenuOpen}
              className="inline-flex lg:hidden items-center justify-center hover:bg-luxuryGold/20 dark:hover:bg-gray-700 p-2 text-gray-900 dark:text-luxuryWhite transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
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

        <div
          id="ecommerce-navbar-menu-1"
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg py-3 px-4 mt-4 transition-all duration-300`}
        >
          <ul className="text-gray-900 dark:text-luxuryWhite text-sm font-bold space-y-3">
            {["Trang chủ", "Sản phẩm", "Về chúng tôi", "Liên hệ"].map((item) => {
              const to = item === "Trang chủ" ? "/" : item === "Sản phẩm" ? "/products" : `/${item.toLowerCase().replace(" ", "-")}`;
              const isActive = location.pathname === to;
              return (
                <li key={item}>
                  <Link
                    to={to}
                    className={`hover:text-luxuryGold transition-colors duration-300 px-2 py-1 rounded-md ${
                      isActive ? "text-luxuryGold" : ""
                    }`}
                  >
                    {item}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;