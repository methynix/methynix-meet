import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

class ErrorBoundary extends React.Component {
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
        <div className="min-h-screen bg-deep-space text-white flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center holo-card p-8">
            <FaExclamationTriangle size={48} className="mx-auto mb-4 text-neon-red" />
            <h2 className="text-2xl font-bold mb-4 text-neon-red">Something Went Wrong</h2>
            <p className="text-gray-400 mb-6">
              We encountered an unexpected error. Please try refreshing the page or contact support if the problem persists.
            </p>
            <button
              onClick={() => window.location.href = '/'}
              className="px-6 py-2 bg-neon-cyan text-deep-space font-bold rounded-lg hover:scale-105 transition"
            >
              Return Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
