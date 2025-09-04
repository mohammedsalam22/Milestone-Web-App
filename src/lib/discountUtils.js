/**
 * Utility functions for discount calculations and formatting
 */

/**
 * Calculate the discount amount based on type and value
 * @param {number} originalAmount - The original amount before discount
 * @param {string} discountType - 'percent' or 'fixed'
 * @param {number} discountValue - The discount value
 * @returns {number} The discount amount
 */
export const calculateDiscountAmount = (originalAmount, discountType, discountValue) => {
  if (discountType === 'percent') {
    return (originalAmount * discountValue) / 100;
  } else if (discountType === 'fixed') {
    return Math.min(discountValue, originalAmount); // Can't discount more than the original amount
  }
  return 0;
};

/**
 * Calculate the final amount after applying discount
 * @param {number} originalAmount - The original amount before discount
 * @param {string} discountType - 'percent' or 'fixed'
 * @param {number} discountValue - The discount value
 * @returns {number} The final amount after discount
 */
export const calculateFinalAmount = (originalAmount, discountType, discountValue) => {
  const discountAmount = calculateDiscountAmount(originalAmount, discountType, discountValue);
  return Math.max(0, originalAmount - discountAmount);
};

/**
 * Format discount value for display
 * @param {number} value - The discount value
 * @param {string} discountType - 'percent' or 'fixed'
 * @param {string} currency - Currency symbol (default: 'EGP')
 * @returns {string} Formatted discount value
 */
export const formatDiscountValue = (value, discountType, currency = 'EGP') => {
  if (discountType === 'percent') {
    return `${value}%`;
  } else if (discountType === 'fixed') {
    return `${value} ${currency}`;
  }
  return value.toString();
};

/**
 * Validate discount data
 * @param {Object} discountData - The discount data to validate
 * @returns {Object} Validation result with isValid and errors
 */
export const validateDiscountData = (discountData) => {
  const errors = {};
  
  if (!discountData.symbol || !discountData.symbol.trim()) {
    errors.symbol = 'Symbol is required';
  }
  
  if (!discountData.name || !discountData.name.trim()) {
    errors.name = 'Name is required';
  }
  
  if (!discountData.value || discountData.value <= 0) {
    errors.value = 'Value must be greater than 0';
  }
  
  if (!discountData.discount_type || !['percent', 'fixed'].includes(discountData.discount_type)) {
    errors.discount_type = 'Discount type must be either percent or fixed';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Get discount type color for UI display
 * @param {string} discountType - 'percent' or 'fixed'
 * @returns {string} Material-UI color name
 */
export const getDiscountTypeColor = (discountType) => {
  return discountType === 'percent' ? 'primary' : 'secondary';
};

/**
 * Get discount type label for display
 * @param {string} discountType - 'percent' or 'fixed'
 * @param {Function} t - Translation function
 * @returns {string} Localized label
 */
export const getDiscountTypeLabel = (discountType, t) => {
  return discountType === 'percent' ? t('percentage') : t('fixedAmount');
};
