/**
 * Utility functions for common operations
 */

// Validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Generate random ID
const generateId = () => {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Calculate learning progress
const calculateProgress = (completed, total) => {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
};

// Format response with metadata
const successResponse = (data, message = 'Success') => {
  return {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  };
};

// Format error response
const errorResponse = (message, code = 'ERROR', statusCode = 500) => {
  return {
    success: false,
    error: {
      message,
      code,
      timestamp: new Date().toISOString(),
    },
  };
};

module.exports = {
  isValidEmail,
  generateId,
  calculateProgress,
  successResponse,
  errorResponse,
};
