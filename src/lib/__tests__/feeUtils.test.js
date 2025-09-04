import {
  calculateTotalFee,
  calculateInstallmentAmount,
  formatFeeValue,
  validateFeeData,
  getStatusColor,
  getStatusLabel,
  getInstallmentColor,
  getInstallmentLabel,
  filterFees,
  sortFees
} from '../feeUtils';

describe('Fee Utils', () => {
  describe('calculateTotalFee', () => {
    it('should calculate total fee without discounts', () => {
      expect(calculateTotalFee(1000)).toBe(1000);
    });

    it('should calculate total fee with percentage discount', () => {
      const discounts = [{ discount_type: 'percent', value: 10 }];
      expect(calculateTotalFee(1000, discounts)).toBe(900);
    });

    it('should calculate total fee with fixed discount', () => {
      const discounts = [{ discount_type: 'fixed', value: 100 }];
      expect(calculateTotalFee(1000, discounts)).toBe(900);
    });

    it('should calculate total fee with multiple discounts', () => {
      const discounts = [
        { discount_type: 'percent', value: 10 },
        { discount_type: 'fixed', value: 50 }
      ];
      expect(calculateTotalFee(1000, discounts)).toBe(850);
    });

    it('should not go below 0', () => {
      const discounts = [{ discount_type: 'fixed', value: 1500 }];
      expect(calculateTotalFee(1000, discounts)).toBe(0);
    });
  });

  describe('calculateInstallmentAmount', () => {
    it('should calculate installment amount correctly', () => {
      expect(calculateInstallmentAmount(1000, 4)).toBe(250);
      expect(calculateInstallmentAmount(1000, 3)).toBe(334); // Rounds up
    });

    it('should return total amount for 0 or negative installments', () => {
      expect(calculateInstallmentAmount(1000, 0)).toBe(1000);
      expect(calculateInstallmentAmount(1000, -1)).toBe(1000);
    });
  });

  describe('formatFeeValue', () => {
    it('should format fee value correctly', () => {
      expect(formatFeeValue(1000)).toBe('1000 EGP');
      expect(formatFeeValue(500, 'USD')).toBe('500 USD');
    });
  });

  describe('validateFeeData', () => {
    it('should validate correct fee data', () => {
      const validData = {
        symbol: 'F-001',
        name: 'Test Fee',
        value: 1000,
        is_chosen: true,
        is_installment_available: false
      };
      const result = validateFeeData(validData);
      expect(result.isValid).toBe(true);
      expect(Object.keys(result.errors)).toHaveLength(0);
    });

    it('should catch missing required fields', () => {
      const invalidData = {
        symbol: '',
        name: '',
        value: 0,
        is_chosen: 'invalid',
        is_installment_available: 'invalid'
      };
      const result = validateFeeData(invalidData);
      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveProperty('symbol');
      expect(result.errors).toHaveProperty('name');
      expect(result.errors).toHaveProperty('value');
      expect(result.errors).toHaveProperty('is_chosen');
      expect(result.errors).toHaveProperty('is_installment_available');
    });
  });

  describe('getStatusColor', () => {
    it('should return correct colors for status', () => {
      expect(getStatusColor(true)).toBe('success');
      expect(getStatusColor(false)).toBe('default');
    });
  });

  describe('getStatusLabel', () => {
    const mockT = (key) => {
      const translations = {
        'chosen': 'Chosen',
        'notChosen': 'Not Chosen'
      };
      return translations[key] || key;
    };

    it('should return correct labels for status', () => {
      expect(getStatusLabel(true, mockT)).toBe('Chosen');
      expect(getStatusLabel(false, mockT)).toBe('Not Chosen');
    });
  });

  describe('getInstallmentColor', () => {
    it('should return correct colors for installment availability', () => {
      expect(getInstallmentColor(true)).toBe('primary');
      expect(getInstallmentColor(false)).toBe('secondary');
    });
  });

  describe('getInstallmentLabel', () => {
    const mockT = (key) => {
      const translations = {
        'available': 'Available',
        'notAvailable': 'Not Available'
      };
      return translations[key] || key;
    };

    it('should return correct labels for installment availability', () => {
      expect(getInstallmentLabel(true, mockT)).toBe('Available');
      expect(getInstallmentLabel(false, mockT)).toBe('Not Available');
    });
  });

  describe('filterFees', () => {
    const mockFees = [
      { id: 1, name: 'KG1 Fee', symbol: 'KG1-001', description: 'Kindergarten fee', is_chosen: true, is_installment_available: true },
      { id: 2, name: 'Grade 1 Fee', symbol: 'G1-001', description: 'First grade fee', is_chosen: false, is_installment_available: false },
    ];

    it('should filter by search term', () => {
      const filters = { searchTerm: 'KG1', statusFilter: 'all', installmentFilter: 'all' };
      const result = filterFees(mockFees, filters);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('KG1 Fee');
    });

    it('should filter by status', () => {
      const filters = { searchTerm: '', statusFilter: 'chosen', installmentFilter: 'all' };
      const result = filterFees(mockFees, filters);
      expect(result).toHaveLength(1);
      expect(result[0].is_chosen).toBe(true);
    });

    it('should filter by installment availability', () => {
      const filters = { searchTerm: '', statusFilter: 'all', installmentFilter: 'available' };
      const result = filterFees(mockFees, filters);
      expect(result).toHaveLength(1);
      expect(result[0].is_installment_available).toBe(true);
    });
  });

  describe('sortFees', () => {
    const mockFees = [
      { name: 'Z Fee', symbol: 'Z-001', value: 1000, is_chosen: false, is_installment_available: true },
      { name: 'A Fee', symbol: 'A-001', value: 500, is_chosen: true, is_installment_available: false },
    ];

    it('should sort by name', () => {
      const result = sortFees(mockFees, 'name');
      expect(result[0].name).toBe('A Fee');
      expect(result[1].name).toBe('Z Fee');
    });

    it('should sort by value', () => {
      const result = sortFees(mockFees, 'value');
      expect(result[0].value).toBe(500);
      expect(result[1].value).toBe(1000);
    });

    it('should sort by status', () => {
      const result = sortFees(mockFees, 'status');
      expect(result[0].is_chosen).toBe(false);
      expect(result[1].is_chosen).toBe(true);
    });
  });
});
