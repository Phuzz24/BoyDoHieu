import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false); // Chỉ mở khi click
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Giả lập trạng thái đăng nhập
  const navigate = useNavigate();

  // Dummy data cho giỏ hàng
  const cartItems = []; // Nếu rỗng, hiển thị "Giỏ hàng trống"

  useEffect(() => {
    // Có thể bỏ nếu không cần tự động mở
  }, []);

  const handleCartClick = () => {
    if (cartItems.length === 0) {
      setIsCartOpen(!isCartOpen); // Mở dropdown khi click, không phải hover
    } else {
      navigate("/cart"); // Chuyển đến trang giỏ hàng khi có sản phẩm
    }
  };

  return (
    <nav className="bg-luxuryWhite dark:bg-luxuryBlack shadow-luxury transition-all duration-300 hover:shadow-hover-luxury">
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
                  onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }} // Fallback nếu logo không load
                />
                <img
                  className="hidden w-auto h-14 dark:block transition-all duration-300 group-hover:scale-105 rounded-lg"
                  src="/logo.png" // Thay bằng logo dark nếu có
                  alt="Web Đồ Hiệu Logo Dark"
                  onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }}
                />
              </Link>
            </div>

            {/* Navigation - Desktop */}
            <ul className="hidden lg:flex items-center justify-start gap-6 md:gap-8 py-3 sm:justify-center">
              {["Trang chủ", "Sản phẩm", "Về chúng tôi", "Liên hệ"].map((item) => (
                <li key={item} className="shrink-0">
                  <Link
                    to={item === "Trang chủ" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
                    title={item}
                    className="flex text-sm font-bold text-gray-900 dark:text-luxuryWhite transition-colors duration-300 hover:text-luxuryGold rounded-md px-3 py-1"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex items-center lg:space-x-2">
            <button
              id="myCartDropdownButton1"
              data-dropdown-toggle="myCartDropdown1"
              type="button"
              className="inline-flex items-center rounded-lg justify-center p-2 hover:bg-luxuryGold/10 dark:hover:bg-gray-700 text-sm font-bold leading-none text-gray-900 dark:text-luxuryWhite transition-all duration-300 hover:scale-105 hover:shadow-luxury"
              onClick={handleCartClick}
            >
              <span className="sr-only">Giỏ hàng</span>
              <svg
                className="w-5 h-5 lg:me-1 transition-transform duration-300 hover:scale-110"
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
              } z-50 mx-auto max-w-sm space-y-4 overflow-hidden rounded-lg bg-luxuryWhite p-4 antialiased shadow-luxury dark:bg-gray-800 absolute top-full left-0 right-0 m-auto transition-opacity duration-300 opacity-100`}
            >
              {cartItems.length === 0 ? (
                <div className="text-center">
                  <p className="text-gray-500 dark:text-gray-400 font-medium">Giỏ hàng trống</p>
                  <button
                    onClick={() => navigate("/cart")}
                    className="mt-2 inline-flex items-center px-4 py-2 bg-luxuryGold text-luxuryWhite rounded-md hover:bg-accent-400 transition-all duration-300 hover:scale-105"
                  >
                    Xem giỏ hàng
                  </button>
                </div>
              ) : (
                <>
                  {cartItems.map((item, index) => (
                    <div key={index} className="grid grid-cols-2">
                      <div>
                        <a
                          href="#"
                          className="truncate text-sm font-semibold leading-none text-gray-900 dark:text-luxuryWhite hover:text-luxuryGold transition-colors duration-300"
                        >
                          {item.name}
                        </a>
                        <p className="mt-0.5 truncate text-sm font-normal text-gray-500 dark:text-gray-400">
                          {item.price} VNĐ
                        </p>
                      </div>
                      <div className="flex items-center justify-end gap-6">
                        <p className="text-sm font-normal leading-none text-gray-500 dark:text-gray-400">
                          Số lượng: {item.quantity}
                        </p>
                        <button
                          data-tooltip-target={`tooltipRemoveItem${index}a`}
                          type="button"
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
                        <div
                          id={`tooltipRemoveItem${index}a`}
                          role="tooltip"
                          className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                        >
                          Xóa sản phẩm
                          <div className="tooltip-arrow" data-popper-arrow></div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Link
                    to="/checkout"
                    title="Tiến hành thanh toán"
                    className="mb-2 me-2 inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-luxuryWhite hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 transition-transform duration-300 hover:scale-105"
                    role="button"
                  >
                    Tiến hành thanh toán
                  </Link>
                </>
              )}
            </div>

            <button
              id="userDropdownButton1"
              data-dropdown-toggle="userDropdown1"
              type="button"
              className="inline-flex items-center rounded-lg justify-center p-2 hover:bg-luxuryGold/10 dark:hover:bg-gray-700 text-sm font-bold leading-none text-gray-900 dark:text-luxuryWhite transition-all duration-300 hover:scale-105 hover:shadow-luxury"
              onClick={() => setIsUserOpen(!isUserOpen)}
            >
              <svg
                className="w-5 h-5 me-1 transition-transform duration-300 hover:scale-110"
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

            {!isLoggedIn && (
              <Link
                to="/register"
                className="inline-flex items-center rounded-lg justify-center p-2 hover:bg-luxuryGold/10 dark:hover:bg-gray-700 text-sm font-bold leading-none text-gray-900 dark:text-luxuryWhite transition-all duration-300 hover:scale-105 hover:shadow-luxury"
              >
                Đăng ký
              </Link>
            )}

            <div
              id="userDropdown1"
              className={`${
                isUserOpen ? "block" : "hidden"
              } z-50 w-56 divide-y divide-gray-100 overflow-hidden overflow-y-auto rounded-lg bg-luxuryWhite antialiased shadow-luxury dark:divide-gray-600 dark:bg-gray-800 absolute top-full left-0 right-0 m-auto transition-opacity duration-300 opacity-100`}
            >
              {isLoggedIn && (
                <ul className="p-2 text-start text-sm font-medium text-gray-900 dark:text-luxuryWhite">
                  <li>
                    <Link
                      to="/account"
                      title="Tài khoản của tôi"
                      className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 hover:bg-luxuryGold/10 dark:hover:bg-gray-600 transition-colors duration-300 hover:text-luxuryGold"
                    >
                      Tài khoản của tôi
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/orders"
                      title="Đơn hàng của tôi"
                      className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 hover:bg-luxuryGold/10 dark:hover:bg-gray-600 transition-colors duration-300 hover:text-luxuryGold"
                    >
                      Đơn hàng của tôi
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/settings"
                      title="Cài đặt"
                      className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 hover:bg-luxuryGold/10 dark:hover:bg-gray-600 transition-colors duration-300 hover:text-luxuryGold"
                    >
                      Cài đặt
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/favorites"
                      title="Yêu thích"
                      className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 hover:bg-luxuryGold/10 dark:hover:bg-gray-600 transition-colors duration-300 hover:text-luxuryGold"
                    >
                      Yêu thích
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/addresses"
                      title="Địa chỉ giao hàng"
                      className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 hover:bg-luxuryGold/10 dark:hover:bg-gray-600 transition-colors duration-300 hover:text-luxuryGold"
                    >
                      Địa chỉ giao hàng
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/billing"
                      title="Dữ liệu thanh toán"
                      className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 hover:bg-luxuryGold/10 dark:hover:bg-gray-600 transition-colors duration-300 hover:text-luxuryGold"
                    >
                      Dữ liệu thanh toán
                    </Link>
                  </li>
                  <div className="p-2">
                    <Link
                      to="/logout"
                      title="Đăng xuất"
                      className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 hover:bg-luxuryGold/10 dark:hover:bg-gray-600 transition-colors duration-300 hover:text-luxuryGold"
                    >
                      Đăng xuất
                    </Link>
                  </div>
                </ul>
              )}
            </div>

            <button
              type="button"
              data-collapse-toggle="ecommerce-navbar-menu-1"
              aria-controls="ecommerce-navbar-menu-1"
              aria-expanded={isMobileMenuOpen}
              className="inline-flex lg:hidden items-center justify-center hover:bg-luxuryGold/10 dark:hover:bg-gray-700 p-2 text-gray-900 dark:text-luxuryWhite transition-all duration-300 hover:scale-105 hover:shadow-luxury"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Mở menu</span>
              <svg
                className="w-5 h-5 transition-transform duration-300 hover:scale-110"
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
          } bg-luxuryWhite dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg py-3 px-4 mt-4 transition-opacity duration-300 opacity-100`}
        >
          <ul className="text-gray-900 dark:text-luxuryWhite text-sm font-bold space-y-3">
            {["Trang chủ", "Sản phẩm", "Về chúng tôi", "Liên hệ"].map((item) => (
              <li key={item}>
                <Link
                  to={item === "Trang chủ" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
                  className="hover:text-luxuryGold transition-colors duration-300 px-2 py-1 rounded-md"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;