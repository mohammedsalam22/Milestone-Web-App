/**
 * Utility functions for fee calculations and formatting
 */

/**
 * Calculate the total fee amount
 * @param {number} baseAmount - The base fee amount
 * @param {Array} discounts - Array of discount objects
 * @returns {number} The total fee amount after discounts
 */
export const calculateTotalFee = (baseAmount, discounts = []) => {
  let totalAmount = baseAmount;
  
  discounts.forEach(discount => {
    if (discount.discount_type === 'percent') {
      totalAmount -= (baseAmount * discount.value) / 100;
    } else if (discount.discount_type === 'fixed') {
      totalAmount -= discount.value;
    }
  });
  
  return Math.max(0, totalAmount);
};

/**
 * Calculate installment amount
 * @param {number} totalAmount - The total fee amount
 * @param {number} numberOfInstallments - Number of installments
 * @returns {number} The amount per installment
 */
export const calculateInstallmentAmount = (totalAmount, numberOfInstallments) => {
  if (numberOfInstallments <= 0) return totalAmount;
  return Math.ceil(totalAmount / numberOfInstallments);
};

/**
 * Format fee value for display
 * @param {number} value - The fee value
 * @param {string} currency - Currency symbol (default: 'EGP')
 * @returns {string} Formatted fee value
 */
export const formatFeeValue = (value, currency = 'EGP') => {
  return `${value} ${currency}`;
};

/**
 * Validate fee data
 * @param {Object} feeData - The fee data to validate
 * @returns {Object} Validation result with isValid and errors
 */
export const validateFeeData = (feeData) => {
  const errors = {};
  
  if (!feeData.symbol || !feeData.symbol.trim()) {
    errors.symbol = 'Symbol is required';
  }
  
  if (!feeData.name || !feeData.name.trim()) {
    errors.name = 'Name is required';
  }
  
  if (!feeData.value || feeData.value <= 0) {
    errors.value = 'Value must be greater than 0';
  }
  
  if (typeof feeData.is_chosen !== 'boolean') {
    errors.is_chosen = 'Chosen status must be a boolean';
  }
  
  if (typeof feeData.is_installment_available !== 'boolean') {
    errors.is_installment_available = 'Installment availability must be a boolean';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Get status color for UI display
 * @param {boolean} isChosen - Whether the fee is chosen
 * @returns {string} Material-UI color name
 */
export const getStatusColor = (isChosen) => {
  return isChosen ? 'success' : 'default';
};

/**
 * Get status label for display
 * @param {boolean} isChosen - Whether the fee is chosen
 * @param {Function} t - Translation function
 * @returns {string} Localized label
 */
export const getStatusLabel = (isChosen, t) => {
  return isChosen ? t('chosen') : t('notChosen');
};

/**
 * Get installment color for UI display
 * @param {boolean} isAvailable - Whether installment is available
 * @returns {string} Material-UI color name
 */
export const getInstallmentColor = (isAvailable) => {
  return isAvailable ? 'primary' : 'secondary';
};

/**
 * Get installment label for display
 * @param {boolean} isAvailable - Whether installment is available
 * @param {Function} t - Translation function
 * @returns {string} Localized label
 */
export const getInstallmentLabel = (isAvailable, t) => {
  return isAvailable ? t('available') : t('notAvailable');
};

/**
 * Filter fees by criteria
 * @param {Array} fees - Array of fee objects
 * @param {Object} filters - Filter criteria
 * @returns {Array} Filtered fees
 */
export const filterFees = (fees, filters) => {
  return fees.filter(fee => {
    const matchesSearch = !filters.searchTerm || 
      fee.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      fee.symbol.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      fee.description.toLowerCase().includes(filters.searchTerm.toLowerCase());
    
    const matchesStatus = filters.statusFilter === 'all' || 
      (filters.statusFilter === 'chosen' && fee.is_chosen) ||
      (filters.statusFilter === 'notChosen' && !fee.is_chosen);
    
    const matchesInstallment = filters.installmentFilter === 'all' || 
      (filters.installmentFilter === 'available' && fee.is_installment_available) ||
      (filters.installmentFilter === 'notAvailable' && !fee.is_installment_available);
    
    return matchesSearch && matchesStatus && matchesInstallment;
  });
};

/**
 * Sort fees by criteria
 * @param {Array} fees - Array of fee objects
 * @param {string} sortBy - Sort criteria
 * @returns {Array} Sorted fees
 */
export const sortFees = (fees, sortBy) => {
  return [...fees].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'symbol':
        return a.symbol.localeCompare(b.symbol);
      case 'value':
        return parseFloat(a.value) - parseFloat(b.value);
      case 'status':
        return a.is_chosen - b.is_chosen;
      case 'installment':
        return a.is_installment_available - b.is_installment_available;
      default:
        return 0;
    }
  });
};
