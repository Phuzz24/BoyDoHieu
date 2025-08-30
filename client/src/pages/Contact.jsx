import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-luxuryWhite via-primary-100 to-gray-100 dark:from-luxuryBlack dark:via-primary-900 dark:to-gray-900 py-16 overflow-hidden relative">
      {/* Particle Background */}
      <div className="absolute inset-0 -z-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary-600 dark:bg-accent-300 rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
        <div className="absolute w-96 h-96 bg-gradient-to-br from-primary-300 to-accent-200 opacity-20 blur-3xl top-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"></div>
        <div className="absolute w-80 h-80 bg-gradient-to-br from-accent-300 to-primary-200 opacity-20 blur-3xl bottom-1/3 right-1/4 transform translate-x-1/2 translate-y-1/2 animate-pulse-slow"></div>
      </div>

      <div className="container mx-auto px-4 text-center z-10">
        <h1 className="text-5xl md:text-6xl font-display text-luxuryBlack dark:text-luxuryWhite mb-8 animate-fade-in-up tracking-wide drop-shadow-md">
          KẾT NỐI VỚI CHÚNG TÔI
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-16 max-w-3xl mx-auto animate-slide-in leading-relaxed">
          Chúng tôi luôn sẵn sàng hỗ trợ bạn với dịch vụ tốt nhất! Hãy liên hệ qua các kênh dưới đây.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {/* Facebook */}
          <a
            href="https://facebook.com/yourpage"
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-accent-100 dark:border-accent-400 hover:shadow-3xl hover:-translate-y-4 hover:rotate-2 transition-all duration-500 transform-gpu bg-gradient-to-br hover:from-accent-200 hover:via-accent-300 hover:to-primary-200"
          >
            <div className="flex items-center justify-center mb-6">
              <svg
                className="w-16 h-16 text-accent-300 group-hover:text-luxuryWhite transition-all duration-500 transform group-hover:scale-110"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854V15.47H7.078v-3.47h3.047V9.408c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.49 0-1.955.925-1.955 1.874v2.25h3.328l-.532 3.47h-2.796v8.384C19.612 22.954 24 17.99 24 12 24 5.373 18.627 0 12 0z"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-luxuryBlack dark:text-luxuryWhite group-hover:text-luxuryWhite transition-colors duration-500">
              Facebook
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 group-hover:text-luxuryWhite transition-colors duration-500">
              Theo dõi tại: facebook.com/yourpage
            </p>
          </a>

          {/* Zalo */}
          <a
            href="https://zalo.me/yourzalonumber"
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-primary-100 dark:border-primary-800 hover:shadow-3xl hover:-translate-y-4 hover:-rotate-2 transition-all duration-500 transform-gpu bg-gradient-to-br hover:from-primary-200 hover:via-primary-300 hover:to-accent-200"
          >
            <div className="flex items-center justify-center mb-6">
              <svg
                className="w-16 h-16 text-primary-600 group-hover:text-luxuryWhite transition-all duration-500 transform group-hover:scale-110"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.819-.26.819-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.611-4.042-1.611-.546-1.387-1.333-1.756-1.333-1.756-1.09-.744.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.834 2.807 1.304 3.492.998.108-.775.418-1.305.762-1.605-2.665-.303-5.467-1.333-5.467-5.931 0-1.311.469-2.382 1.236-3.221-.124-.303-.536-1.524.116-3.176 0 0 1.008-.322 3.301 1.23A11.5 11.5 0 0112 6.89c1.018.005 2.04.136 2.99.403 2.288-1.552 3.297-1.23 3.297-1.23.652 1.653.24 2.873.118 3.176.77.839 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.605-.015 2.898-.015 3.286 0 .315.216.688.825.57C20.565 21.796 24 17.3 24 12 24 5.373 18.627 0 12 0z"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-luxuryBlack dark:text-luxuryWhite group-hover:text-luxuryWhite transition-colors duration-500">
              Zalo
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 group-hover:text-luxuryWhite transition-colors duration-500">
              Gọi ngay: +84 123 456 789
            </p>
          </a>

          {/* Email */}
          <a
            href="mailto:contact@yourstore.com"
            className="group block p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-accent-100 dark:border-accent-400 hover:shadow-3xl hover:-translate-y-4 hover:rotate-2 transition-all duration-500 transform-gpu bg-gradient-to-br hover:from-accent-200 hover:via-accent-300 hover:to-primary-200"
          >
            <div className="flex items-center justify-center mb-6">
              <svg
                className="w-16 h-16 text-accent-300 group-hover:text-luxuryWhite transition-all duration-500 transform group-hover:scale-110"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6zm2 0v12h16V6H4zm2 2h12v2H6V8zm0 4h12v2H6v-2zm0 4h12v2H6v-2z"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-luxuryBlack dark:text-luxuryWhite group-hover:text-luxuryWhite transition-colors duration-500">
              Email
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 group-hover:text-luxuryWhite transition-colors duration-500">
              Gửi tại: contact@yourstore.com
            </p>
          </a>

          {/* Địa chỉ */}
          <div className="group block p-10 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-primary-100 dark:border-primary-800 hover:shadow-3xl hover:-translate-y-4 transition-all duration-500 transform-gpu bg-gradient-to-br hover:from-primary-200 hover:via-primary-300 hover:to-accent-200 col-span-1 md:col-span-2 lg:col-span-3">
            <div className="flex items-center justify-center mb-6">
              <svg
                className="w-16 h-16 text-primary-600 group-hover:text-luxuryWhite transition-all duration-500 transform group-hover:scale-110"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1-2.5-2.5 2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1-2.5 2.5z"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-luxuryBlack dark:text-luxuryWhite group-hover:text-luxuryWhite transition-colors duration-500">
              Địa Chỉ
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 group-hover:text-luxuryWhite transition-colors duration-500">
              123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh, Việt Nam
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;