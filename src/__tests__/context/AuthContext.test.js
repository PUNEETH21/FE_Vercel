import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../../context/AuthContext';
import api from '../../utils/axios';
import { toast } from 'react-toastify';

// Mock dependencies
jest.mock('../../utils/axios');
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
  },
}));

// Test component that uses AuthContext
const TestComponent = () => {
  const { user, loading, login, register, logout, isAuthenticated } = useAuth();

  return (
    <div>
      <div data-testid="loading">{loading ? 'Loading' : 'Not Loading'}</div>
      <div data-testid="user">{user ? user.name : 'No User'}</div>
      <div data-testid="isAuthenticated">{isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</div>
      <button data-testid="login-btn" onClick={() => login('test@example.com', 'password')}>
        Login
      </button>
      <button data-testid="register-btn" onClick={() => register({ name: 'Test', email: 'test@example.com', password: 'password' })}>
        Register
      </button>
      <button data-testid="logout-btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Clear localStorage store
    localStorage.clear();
  });

  it('should provide initial state without token', async () => {
    // Ensure no token in localStorage
    localStorage.getItem.mockReturnValue(null);
    
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('Not Loading');
      expect(screen.getByTestId('user')).toHaveTextContent('No User');
      expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('Not Authenticated');
    });
  });

  it('should fetch user when token exists', async () => {
    const mockUser = { id: '1', name: 'Test User', email: 'test@example.com', role: 'patient' };
    // Set up localStorage mock to return token
    localStorage.getItem.mockReturnValue('mock-token');
    api.get.mockResolvedValue({ data: { user: mockUser } });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith('/api/auth/me');
      expect(screen.getByTestId('user')).toHaveTextContent('Test User');
      expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('Authenticated');
    });
  });

  it('should handle login successfully', async () => {
    const mockUser = { id: '1', name: 'Test User', email: 'test@example.com', role: 'patient' };
    // Start with no token
    localStorage.getItem.mockReturnValue(null);
    api.post.mockResolvedValue({
      data: {
        token: 'new-token',
        user: mockUser
      }
    });
    // Also mock the /api/auth/me endpoint that fetchUser calls after token is set
    api.get.mockResolvedValue({ data: { user: mockUser } });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('Not Loading');
    });

    const loginButton = screen.getByTestId('login-btn');
    await act(async () => {
      loginButton.click();
    });

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/api/auth/login', {
        email: 'test@example.com',
        password: 'password'
      });
      expect(localStorage.setItem).toHaveBeenCalledWith('token', 'new-token');
      expect(toast.success).toHaveBeenCalledWith('Login successful!');
      expect(screen.getByTestId('user')).toHaveTextContent('Test User');
    });
  });

  it('should handle login failure', async () => {
    // Start with no token
    localStorage.getItem.mockReturnValue(null);
    api.post.mockRejectedValue({
      response: {
        data: {
          message: 'Invalid credentials'
        }
      }
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('Not Loading');
    });

    const loginButton = screen.getByTestId('login-btn');
    await act(async () => {
      loginButton.click();
    });

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Invalid credentials');
      expect(screen.getByTestId('user')).toHaveTextContent('No User');
    });
  });

  it('should handle register successfully', async () => {
    const mockUser = { id: '1', name: 'Test User', email: 'test@example.com', role: 'patient' };
    // Start with no token
    localStorage.getItem.mockReturnValue(null);
    api.post.mockResolvedValue({
      data: {
        token: 'new-token',
        user: mockUser
      }
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('Not Loading');
    });

    const registerButton = screen.getByTestId('register-btn');
    await act(async () => {
      registerButton.click();
    });

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/api/auth/register', {
        name: 'Test',
        email: 'test@example.com',
        password: 'password'
      });
      expect(localStorage.setItem).toHaveBeenCalledWith('token', 'new-token');
      expect(toast.success).toHaveBeenCalledWith('Registration successful!');
    });
  });

  it('should handle logout', async () => {
    const mockUser = { id: '1', name: 'Test User', email: 'test@example.com', role: 'patient' };
    // Set up localStorage mock to return token
    localStorage.getItem.mockReturnValue('mock-token');
    api.get.mockResolvedValue({ data: { user: mockUser } });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('Test User');
    });

    const logoutButton = screen.getByTestId('logout-btn');
    await act(async () => {
      logoutButton.click();
    });

    await waitFor(() => {
      expect(localStorage.removeItem).toHaveBeenCalledWith('token');
      expect(toast.info).toHaveBeenCalledWith('Logged out successfully');
      expect(screen.getByTestId('user')).toHaveTextContent('No User');
      expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('Not Authenticated');
    });
  });

  it('should handle fetch user error and logout', async () => {
    // Set up localStorage mock to return token
    localStorage.getItem.mockReturnValue('mock-token');
    api.get.mockRejectedValue(new Error('Network error'));

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(localStorage.removeItem).toHaveBeenCalledWith('token');
      expect(screen.getByTestId('user')).toHaveTextContent('No User');
    });
  });

  it('should throw error when useAuth is used outside provider', () => {
    // Start with no token
    localStorage.getItem.mockReturnValue(null);
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useAuth must be used within an AuthProvider');

    consoleSpy.mockRestore();
  });
});
