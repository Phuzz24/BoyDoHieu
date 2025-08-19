import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center p-8 text-red-600 dark:text-red-400">
          <h2>Đã xảy ra lỗi</h2>
          <p>Xin vui lòng thử lại sau hoặc liên hệ hỗ trợ.</p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="mt-4 bg-luxuryGold text-luxuryBlack px-4 py-2 rounded-full hover:bg-luxuryBlack hover:text-luxuryWhite transition-all"
          >
            Thử lại
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;