import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Navbar from '../../components/Navbar';
import { AuthProvider, useAuth } from '../../context/AuthContext';
import api from '../../utils/axios';

const theme = createTheme();

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  
}));

// Mock axios
jest.mock('../../utils/axios');

// Mock Material-UI useMediaQuery
jest.mock('@mui/material', () => {
  const actual = jest.requireActual('@mui/material');
  return {
    ...actual,
    useMediaQuery: jest.fn(() => false), // Default to desktop view
  };
});

// Mock SearchBar component
jest.mock('../../components/SearchBar', () => {
  return function MockSearchBar() {
    return <div data-testid="search-bar">Search Bar</div>;
  };
});

const renderWithProviders = (component) => {
  return render(
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          {component}
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

describe('Navbar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockNavigate.mockClear();
    localStorage.clear();
    api.get.mockClear();
  });

  describe('When user is not authenticated', () => {
    beforeEach(() => {
      localStorage.getItem.mockReturnValue(null);
    });

    it('should render login and register buttons', () => {
      renderWithProviders(<Navbar />);

      expect(screen.getAllByText('Login').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Get Started').length).toBeGreaterThan(0);
    });

    it('should not render search bar', () => {
      renderWithProviders(<Navbar />);

      expect(screen.queryByTestId('search-bar')).not.toBeInTheDocument();
    });

    it('should not render navigation links', () => {
      renderWithProviders(<Navbar />);

      expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
      expect(screen.queryByText('Goal Tracker')).not.toBeInTheDocument();
    });

    it('should navigate to login when login button is clicked', () => {
      renderWithProviders(<Navbar />);

      const loginLinks = screen.getAllByText('Login');
      const loginLink = loginLinks[0].closest('a');
      expect(loginLink).toHaveAttribute('href', '/login');
    });

    it('should navigate to register when register button is clicked', () => {
      renderWithProviders(<Navbar />);

      const registerLinks = screen.getAllByText('Get Started');
      const registerLink = registerLinks[0].closest('a');
      expect(registerLink).toHaveAttribute('href', '/register');
    });
  });

  describe('When user is authenticated', () => {
    const mockUser = {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      role: 'patient',
    };

    beforeEach(() => {
      localStorage.getItem.mockReturnValue('mock-token');
      api.get.mockResolvedValue({ data: { user: mockUser } });
    });

    it('should render user name', async () => {
      renderWithProviders(<Navbar />);

      await waitFor(() => {
        expect(screen.getByText(/Test User/i)).toBeInTheDocument();
      });
    });

    it('should render navigation links', async () => {
      renderWithProviders(<Navbar />);

      await waitFor(() => {
        expect(screen.getAllByText('Dashboard').length).toBeGreaterThan(0);
        expect(screen.getAllByText('Goal Tracker').length).toBeGreaterThan(0);
        expect(screen.getAllByText('Health Info').length).toBeGreaterThan(0);
        expect(screen.getAllByText('Appointments').length).toBeGreaterThan(0);
        expect(screen.getAllByText('Records').length).toBeGreaterThan(0);
        expect(screen.getAllByText('Preventive Care').length).toBeGreaterThan(0);
      });
    });

    it('should render search bar', async () => {
      renderWithProviders(<Navbar />);

      await waitFor(() => {
        expect(screen.getAllByTestId('search-bar').length).toBeGreaterThan(0);
      });
    });

    it('should open user menu when user button is clicked', async () => {
      renderWithProviders(<Navbar />);

      await waitFor(() => {
        expect(screen.getByText(/Test User/i)).toBeInTheDocument();
      });

      const userButton = screen.getByText(/Test User/i);
      fireEvent.click(userButton);

      await waitFor(() => {
        expect(screen.getAllByText('Profile').length).toBeGreaterThan(0);
        expect(screen.getAllByText('Logout').length).toBeGreaterThan(0);
      });
    });

    it('should call logout when logout is clicked', async () => {
      renderWithProviders(<Navbar />);

      await waitFor(() => {
        expect(screen.getByText(/Test User/i)).toBeInTheDocument();
      });

      const userButton = screen.getByText(/Test User/i);
      fireEvent.click(userButton);

      await waitFor(() => {
        expect(screen.getAllByText('Logout').length).toBeGreaterThan(0);
      });

      const logoutButtons = screen.getAllByText('Logout');
      fireEvent.click(logoutButtons[0]);

      // After logout, verify user is logged out (Login button visible)
      await waitFor(() => {
        expect(screen.getAllByText('Login').length).toBeGreaterThan(0);
      });
    });

    it('should navigate to home after logout', async () => {
      renderWithProviders(<Navbar />);

      await waitFor(() => {
        expect(screen.getByText(/Test User/i)).toBeInTheDocument();
      });

      const userButton = screen.getByText(/Test User/i);
      fireEvent.click(userButton);

      await waitFor(() => {
        expect(screen.getAllByText('Logout').length).toBeGreaterThan(0);
      });

      const logoutButtons = screen.getAllByText('Logout');
      fireEvent.click(logoutButtons[0]);

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/');
      });
    });

    it('should navigate to profile when profile is clicked', async () => {
      renderWithProviders(<Navbar />);

      await waitFor(() => {
        expect(screen.getByText(/Test User/i)).toBeInTheDocument();
      });

      const userButton = screen.getByText(/Test User/i);
      fireEvent.click(userButton);

      await waitFor(() => {
        expect(screen.getAllByText('Profile').length).toBeGreaterThan(0);
      });

      const profileLinks = screen.getAllByText('Profile');
      const profileLink = profileLinks[0].closest('a');
      expect(profileLink).toHaveAttribute('href', '/profile');
    });

    it('should close menu when profile is clicked', async () => {
      renderWithProviders(<Navbar />);

      await waitFor(() => {
        expect(screen.getByText(/Test User/i)).toBeInTheDocument();
      });

      const userButton = screen.getByText(/Test User/i);
      fireEvent.click(userButton);

      await waitFor(() => {
        expect(screen.getAllByText('Profile').length).toBeGreaterThan(0);
      });

      const profileLinks = screen.getAllByText('Profile');
      fireEvent.click(profileLinks[0]);

      // Menu should close - verify the menu item is no longer visible
      // Note: This depends on Material-UI menu implementation
      await waitFor(() => {
        const menuItems = screen.queryAllByRole('menuitem');
        expect(menuItems.length === 0 || !menuItems.some(item => item.textContent === 'Profile')).toBeTruthy();
      });
    });

    it('should display default name when user name is not available', async () => {
      const userWithoutName = { id: '1', email: 'test@example.com' };
      api.get.mockResolvedValue({ data: { user: userWithoutName } });
      localStorage.getItem.mockReturnValue('mock-token');

      renderWithProviders(<Navbar />);

      await waitFor(() => {
        expect(screen.getByText(/User/i)).toBeInTheDocument();
      });
    });

    it('should have correct navigation links with proper paths', async () => {
      renderWithProviders(<Navbar />);

      await waitFor(() => {
        expect(screen.getAllByText('Dashboard').length).toBeGreaterThan(0);
      });

      const dashboardLinks = screen.getAllByText('Dashboard');
      const dashboardLink = dashboardLinks[0].closest('a');
      expect(dashboardLink).toHaveAttribute('href', '/dashboard');

      const goalTrackerLinks = screen.getAllByText('Goal Tracker');
      const goalTrackerLink = goalTrackerLinks[0].closest('a');
      expect(goalTrackerLink).toHaveAttribute('href', '/goal-tracker');

      const appointmentsLinks = screen.getAllByText('Appointments');
      const appointmentsLink = appointmentsLinks[0].closest('a');
      expect(appointmentsLink).toHaveAttribute('href', '/appointments');
    });
  });

  describe('Brand/Logo', () => {
    beforeEach(() => {
      localStorage.getItem.mockReturnValue(null);
    });

    it('should render brand logo and text', () => {
      renderWithProviders(<Navbar />);

      expect(screen.getByText('Healthcare')).toBeInTheDocument();
      expect(screen.getByText('Wellness')).toBeInTheDocument();
    });

    it('should navigate to home when brand is clicked', () => {
      renderWithProviders(<Navbar />);

      const brandLink = screen.getByText('Healthcare').closest('a');
      expect(brandLink).toHaveAttribute('href', '/');
    });
  });
});
