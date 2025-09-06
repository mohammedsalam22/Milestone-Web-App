import { getDashboardData } from '../dashboard';
import apiService from '../apiService';

// Mock the apiService
jest.mock('../apiService');

describe('Dashboard API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getDashboardData', () => {
    it('should fetch dashboard data successfully', async () => {
      const mockData = {
        total_students: 80,
        total_employees: 30,
        latest_events: [],
        today_attendance_count: 5,
        latest_fee: {
          id: 5,
          symbol: "KG2-81",
          name: "discount u",
          description: "janf aksd",
          value: "200.00",
          is_chosen: false,
          is_installment_available: true
        },
        latest_discount: {
          id: 4,
          symbol: "d-9",
          name: "عيد",
          description: "شسبس سشىمنيتبى",
          value: "70.00",
          discount_type: "fixed"
        }
      };

      apiService.get.mockResolvedValue({ data: mockData });

      const result = await getDashboardData();

      expect(apiService.get).toHaveBeenCalledWith('/api/landingpage/dashboard/');
      expect(result).toEqual(mockData);
    });

    it('should handle errors when fetching dashboard data', async () => {
      const error = new Error('Network error');
      apiService.get.mockRejectedValue(error);

      await expect(getDashboardData()).rejects.toThrow('Network error');
    });
  });
});
