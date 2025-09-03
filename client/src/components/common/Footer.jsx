import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-luxuryWhite dark:bg-luxuryBlack rounded-lg shadow-luxury m-4 transition-all duration-300 hover:shadow-hover-luxury">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a href="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <img
              src="/logo.png"
              className="h-12 rounded-lg transition-all duration-300 hover:scale-105"
              alt="Web Đồ Hiệu Logo"
              // Fallback nếu logo không load
            />
            <span className="self-center text-xl font-bold whitespace-nowrap text-gray-900 dark:text-luxuryWhite">
              Boy Đồ Hiệu
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="/gioi-thieu" className="hover:text-luxuryGold transition-colors duration-300 me-4 md:me-6">
                Giới thiệu
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-luxuryGold transition-colors duration-300 me-4 md:me-6">
                Chính sách bảo mật
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-luxuryGold transition-colors duration-300">
                Liên hệ
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2025 <a href="/" className="hover:text-luxuryGold transition-colors duration-300">Boy Đồ Hiệu™</a>.
          </span>
          <div className="flex space-x-6 sm:mt-0 mt-4 justify-center">
            <a
              href="https://facebook.com"
              className="text-gray-500 hover:text-luxuryGold transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faFacebook} size="lg" />
              <span className="sr-only">Facebook</span>
            </a>
            <a
              href="https://instagram.com"
              className="text-gray-500 hover:text-luxuryGold transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} size="lg" />
              <span className="sr-only">Instagram</span>
            </a>
            <a
              href="https://twitter.com"
              className="text-gray-500 hover:text-luxuryGold transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faTwitter} size="lg" />
              <span className="sr-only">Twitter</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;