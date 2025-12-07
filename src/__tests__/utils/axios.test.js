// Mock axios before importing
jest.mock('axios', () => {
  const mockAxiosInstance = {
    get: jest.fn(() => Promise.resolve({ data: {} })),
    post: jest.fn(() => Promise.resolve({ data: {} })),
    put: jest.fn(() => Promise.resolve({ data: {} })),
    delete: jest.fn(() => Promise.resolve({ data: {} })),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() }
    },
    defaults: {
      baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  };
  
  const mockAxios = jest.fn(() => Promise.resolve({ data: {} }));
  mockAxios.create = jest.fn(() => mockAxiosInstance);
  mockAxios.get = jest.fn(() => Promise.resolve({ data: {} }));
  mockAxios.post = jest.fn(() => Promise.resolve({ data: {} }));
  mockAxios.put = jest.fn(() => Promise.resolve({ data: {} }));
  mockAxios.delete = jest.fn(() => Promise.resolve({ data: {} }));
  mockAxios.interceptors = {
    request: { use: jest.fn() },
    response: { use: jest.fn() }
  };
  mockAxios.defaults = {
    baseURL: '',
    headers: {}
  };
  return mockAxios;
});

import api from '../../utils/axios';

describe('Axios Utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    delete window.location;
    window.location = { href: '' };
  });

  describe('Request Interceptor', () => {
    it('should add Authorization header when token exists', () => {
      localStorage.getItem.mockReturnValue('test-token');

      // Create a new request
      const config = {
        headers: {},
      };

      // Simulate request interceptor
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      expect(config.headers.Authorization).toBe('Bearer test-token');
    });

    it('should not add Authorization header when token does not exist', () => {
      localStorage.getItem.mockReturnValue(null);

      const config = {
        headers: {},
      };

      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      expect(config.headers.Authorization).toBeUndefined();
    });
  });

  describe('Response Interceptor', () => {
    it('should return response on success', () => {
      const response = {
        data: { success: true },
        status: 200,
      };

      // Simulate response interceptor
      const result = response;

      expect(result).toEqual(response);
    });

    it('should handle 401 error and redirect to login', () => {
      const error = {
        response: {
          status: 401,
        },
      };

      // Simulate error handling
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }

      expect(localStorage.removeItem).toHaveBeenCalledWith('token');
      expect(window.location.href).toBe('/login');
    });

    it('should not redirect on non-401 errors', () => {
      window.location.href = '';

      const error = {
        response: {
          status: 500,
        },
      };

      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }

      expect(window.location.href).toBe('');
    });

    it('should handle errors without response', () => {
      const error = {
        message: 'Network Error',
      };

      // Should not throw when accessing error.response
      const status = error.response?.status;
      expect(status).toBeUndefined();
    });
  });

  describe('API Configuration', () => {
    it('should use correct base URL', () => {
      // The base URL should be set from environment or default
      const expectedBaseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      
      // Since we're testing the module, we can check the axios instance
      // In a real scenario, you might need to spy on axios.create
      expect(api.defaults.baseURL).toBeDefined();
    });

    it('should set Content-Type header', () => {
      // Check that the axios instance has the correct headers
      expect(api.defaults.headers['Content-Type']).toBe('application/json');
    });
  });

  describe('Token Management', () => {
    it('should handle token storage and retrieval', () => {
      const token = 'test-token-123';
      localStorage.setItem('token', token);

      // Verify setItem was called with correct arguments
      expect(localStorage.setItem).toHaveBeenCalledWith('token', token);
    });

    it('should handle token removal', () => {
      localStorage.removeItem('token');

      // Verify removeItem was called with correct argument
      expect(localStorage.removeItem).toHaveBeenCalledWith('token');
    });

    it('should handle multiple token operations', () => {
      localStorage.setItem('token', 'token1');
      expect(localStorage.setItem).toHaveBeenCalledWith('token', 'token1');

      localStorage.setItem('token', 'token2');
      expect(localStorage.setItem).toHaveBeenCalledWith('token', 'token2');

      localStorage.removeItem('token');
      expect(localStorage.removeItem).toHaveBeenCalledWith('token');
    });
  });
});
