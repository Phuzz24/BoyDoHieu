import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-luxuryWhite via-primary-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black py-16 relative overflow-hidden font-sans">
      {/* Particle Background */}
      <div className="absolute inset-0 -z-10">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary-400 dark:bg-accent-200 rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
        <div className="absolute w-80 h-80 bg-primary-200 dark:bg-primary-700 opacity-20 blur-3xl top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 animate-pulse-slow" />
        <div className="absolute w-72 h-72 bg-accent-200 dark:bg-accent-600 opacity-20 blur-3xl bottom-1/3 right-1/4 translate-x-1/2 translate-y-1/2 animate-pulse-slow" />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-wide drop-shadow">
          KẾT NỐI VỚI CHÚNG TÔI
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          Chúng tôi luôn sẵn sàng hỗ trợ bạn với dịch vụ tốt nhất! Hãy liên hệ qua các kênh dưới đây.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Card Component Template */}
          {[
            {
              title: 'Facebook',
              description: 'Liên hệ tại: facebook.com/yourpage',
              href: 'https://facebook.com/yourpage',
              svg: (
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854V15.47H7.078v-3.47h3.047V9.408c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.49 0-1.955.925-1.955 1.874v2.25h3.328l-.532 3.47h-2.796v8.384C19.612 22.954 24 17.99 24 12 24 5.373 18.627 0 12 0z" />
              ),
              color: 'from-blue-100 to-blue-200',
            },
            {
              title: 'Zalo',
              description: 'Gọi ngay: +84 123 456 789',
              href: 'https://zalo.me/yourzalonumber',
              svg: (
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.819-.26.819-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.611-4.042-1.611-.546-1.387-1.333-1.756-1.333-1.756-1.09-.744.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.834 2.807 1.304 3.492.998.108-.775.418-1.305.762-1.605-2.665-.303-5.467-1.333-5.467-5.931 0-1.311.469-2.382 1.236-3.221-.124-.303-.536-1.524.116-3.176 0 0 1.008-.322 3.301 1.23A11.5 11.5 0 0112 6.89c1.018.005 2.04.136 2.99.403 2.288-1.552 3.297-1.23 3.297-1.23.652 1.653.24 2.873.118 3.176.77.839 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.605-.015 2.898-.015 3.286 0 .315.216.688.825.57C20.565 21.796 24 17.3 24 12 24 5.373 18.627 0 12 0z" />
              ),
              color: 'from-indigo-100 to-indigo-200',
            },
            {
              title: 'Email',
              description: 'Gửi tại: contact@yourstore.com',
              href: 'mailto:contact@yourstore.com',
              svg: (
                <path d="M2 6a2 2 0 0 1 2-2h16a2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6zm2 0v12h16V6H4zm2 2h12v2H6V8zm0 4h12v2H6v-2zm0 4h12v2H6v-2z" />
              ),
              color: 'from-pink-100 to-pink-200',
            },
          ].map((item, index) => (
            <a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group block p-8 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:-translate-y-2 transition-all duration-300 transform bg-gradient-to-br ${item.color}`}
            >
              <div className="flex items-center justify-center mb-4">
                <svg
                  className="w-12 h-12 text-primary-500 dark:text-accent-300 group-hover:scale-110 transition-transform duration-300"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  {item.svg}
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {item.description}
              </p>
            </a>
          ))}

          {/* Địa chỉ */}
          <div className="group block col-span-1 md:col-span-2 lg:col-span-3 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
            <div className="flex justify-center mb-4">
              <svg
                className="w-12 h-12 text-primary-600 dark:text-accent-300 group-hover:scale-110 transition-transform duration-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
              Địa chỉ
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh, Việt Nam
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
