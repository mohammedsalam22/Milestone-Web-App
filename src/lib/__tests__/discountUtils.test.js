import {
  calculateDiscountAmount,
  calculateFinalAmount,
  formatDiscountValue,
  validateDiscountData,
  getDiscountTypeColor,
  getDiscountTypeLabel
} from '../discountUtils';

describe('Discount Utils', () => {
  describe('calculateDiscountAmount', () => {
    it('should calculate percentage discount correctly', () => {
      expect(calculateDiscountAmount(1000, 'percent', 10)).toBe(100);
      expect(calculateDiscountAmount(500, 'percent', 20)).toBe(100);
    });

    it('should calculate fixed discount correctly', () => {
      expect(calculateDiscountAmount(1000, 'fixed', 100)).toBe(100);
      expect(calculateDiscountAmount(500, 'fixed', 100)).toBe(100);
    });

    it('should not discount more than original amount for fixed type', () => {
      expect(calculateDiscountAmount(100, 'fixed', 150)).toBe(100);
    });

    it('should return 0 for invalid discount type', () => {
      expect(calculateDiscountAmount(1000, 'invalid', 10)).toBe(0);
    });
  });

  describe('calculateFinalAmount', () => {
    it('should calculate final amount after percentage discount', () => {
      expect(calculateFinalAmount(1000, 'percent', 10)).toBe(900);
      expect(calculateFinalAmount(500, 'percent', 20)).toBe(400);
    });

    it('should calculate final amount after fixed discount', () => {
      expect(calculateFinalAmount(1000, 'fixed', 100)).toBe(900);
      expect(calculateFinalAmount(500, 'fixed', 100)).toBe(400);
    });

    it('should not go below 0', () => {
      expect(calculateFinalAmount(100, 'fixed', 150)).toBe(0);
    });
  });

  describe('formatDiscountValue', () => {
    it('should format percentage values correctly', () => {
      expect(formatDiscountValue(10, 'percent')).toBe('10%');
      expect(formatDiscountValue(25.5, 'percent')).toBe('25.5%');
    });

    it('should format fixed values correctly', () => {
      expect(formatDiscountValue(100, 'fixed')).toBe('100 EGP');
      expect(formatDiscountValue(50, 'fixed', 'USD')).toBe('50 USD');
    });
  });

  describe('validateDiscountData', () => {
    it('should validate correct discount data', () => {
      const validData = {
        symbol: 'd-001',
        name: 'Test Discount',
        value: 10,
        discount_type: 'percent'
      };
      const result = validateDiscountData(validData);
      expect(result.isValid).toBe(true);
      expect(Object.keys(result.errors)).toHaveLength(0);
    });

    it('should catch missing required fields', () => {
      const invalidData = {
        symbol: '',
        name: '',
        value: 0,
        discount_type: 'invalid'
      };
      const result = validateDiscountData(invalidData);
      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveProperty('symbol');
      expect(result.errors).toHaveProperty('name');
      expect(result.errors).toHaveProperty('value');
      expect(result.errors).toHaveProperty('discount_type');
    });
  });

  describe('getDiscountTypeColor', () => {
    it('should return correct colors for discount types', () => {
      expect(getDiscountTypeColor('percent')).toBe('primary');
      expect(getDiscountTypeColor('fixed')).toBe('secondary');
    });
  });

  describe('getDiscountTypeLabel', () => {
    const mockT = (key) => {
      const translations = {
        'percentage': 'Percentage',
        'fixedAmount': 'Fixed Amount'
      };
      return translations[key] || key;
    };

    it('should return correct labels for discount types', () => {
      expect(getDiscountTypeLabel('percent', mockT)).toBe('Percentage');
      expect(getDiscountTypeLabel('fixed', mockT)).toBe('Fixed Amount');
    });
  });
});
