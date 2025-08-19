import React from 'react';
import { FcGoogle } from 'react-icons/fc'; // Icon Google, có thể thêm icon khác nếu cần

const Button = ({
  children,
  variant = 'primary', // primary, secondary, outline, google
  size = 'md', // sm, md, lg
  color = 'luxuryGold', // luxuryGold, luxuryBlack, gray, v.v.
  icon,
  onClick,
  type = 'button',
  disabled = false,
  isLoading = false,
  className = '',
}) => {
  const baseStyles = 'font-bold rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: `bg-${color} text-luxuryBlack hover:bg-gradient-to-r from-${color} to-gray-800 hover:text-luxuryWhite shadow-md hover:shadow-lg`,
    secondary: `bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-luxuryWhite hover:bg-gray-300 dark:hover:bg-gray-600`,
    outline: `border-2 border-${color} text-${color} hover:bg-${color} hover:text-luxuryWhite`,
    google: `bg-white text-gray-900 dark:bg-gray-700 dark:text-luxuryWhite border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center justify-center gap-2`,
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const getIcon = () => {
    if (icon === 'google') return <FcGoogle className="w-5 h-5" />;
    return null;
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className} ${
    isLoading ? 'opacity-70 cursor-wait' : ''
  }`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={combinedClassName.trim()}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <svg
            className="animate-spin h-5 w-5 text-luxuryBlack"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
          Đang xử lý...
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2">
          {variant === 'google' && getIcon()}
          {children}
        </span>
      )}
    </button>
  );
};

export default Button;