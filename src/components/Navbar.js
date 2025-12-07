import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Typography,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../context/AuthContext';
import SearchBar from './SearchBar';
import {
  NavbarToolbar,
  NavbarBrand,
  NavbarIcon,
  NavbarBrandText,
  NavbarBrandSubtext,
  NavbarSearchContainer,
  NavbarMobileMenuButton,
  NavbarActionsContainer,
  NavbarScrollableLinks,
  NavbarLinkButton,
  NavbarUserContainer,
  NavbarUserButton,
  NavbarMenu,
  NavbarMenuItem,
  NavbarLoginButton,
  NavbarRegisterButton,
  NavbarDrawer,
  NavbarDrawerContent,
  NavbarDrawerSearch,
} from '../styles/styledComponents';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width:900px)');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/');
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navLinks = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Goal Tracker', path: '/goal-tracker' },
    { label: 'Health Info', path: '/health-info' },
    { label: 'Appointments', path: '/appointments' },
    { label: 'Records', path: '/health-records' },
    { label: 'Preventive Care', path: '/preventive-care' },
  ];

  return (
    <AppBar position="sticky" elevation={0}>
      <NavbarToolbar>
        <NavbarBrand variant="h6" component={Link} to="/">
          <NavbarIcon component="span">🏥</NavbarIcon>
          <Box>
            <NavbarBrandText component="span">Healthcare</NavbarBrandText>
            <NavbarBrandSubtext component="span">Wellness</NavbarBrandSubtext>
          </Box>
        </NavbarBrand>
        {isAuthenticated && !isMobile && (
          <NavbarSearchContainer>
            <SearchBar />
          </NavbarSearchContainer>
        )}
        {isMobile && isAuthenticated && (
          <NavbarMobileMenuButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </NavbarMobileMenuButton>
        )}
        <NavbarActionsContainer>
          {isAuthenticated ? (
            <>
              <NavbarScrollableLinks>
                {navLinks.map((link) => (
                  <NavbarLinkButton 
                    key={link.path}
                    component={Link} 
                    to={link.path}
                  >
                    {link.label}
                  </NavbarLinkButton>
                ))}
              </NavbarScrollableLinks>
              <NavbarUserContainer>
                <NavbarUserButton onClick={handleMenuOpen}>
                  {user?.name || 'User'} ▼
                </NavbarUserButton>
              </NavbarUserContainer>
              <NavbarMenu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <NavbarMenuItem 
                  component={Link} 
                  to="/profile" 
                  onClick={handleMenuClose}
                >
                  Profile
                </NavbarMenuItem>
                <NavbarMenuItem onClick={handleLogout}>
                  Logout
                </NavbarMenuItem>
              </NavbarMenu>
            </>
          ) : (
            <>
              <NavbarLoginButton component={Link} to="/login">
                Login
              </NavbarLoginButton>
              <NavbarRegisterButton variant="contained" component={Link} to="/register">
                Get Started
              </NavbarRegisterButton>
            </>
          )}
        </NavbarActionsContainer>
      </NavbarToolbar>
      <NavbarDrawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <NavbarDrawerContent>
          {isAuthenticated && (
            <NavbarDrawerSearch>
              <SearchBar />
            </NavbarDrawerSearch>
          )}
          <List>
            {isAuthenticated && navLinks.map((link) => (
              <ListItem key={link.path} disablePadding>
                <ListItemButton component={Link} to={link.path} onClick={handleDrawerToggle}>
                  <ListItemText primary={link.label} />
                </ListItemButton>
              </ListItem>
            ))}
            {!isAuthenticated && (
              <>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/login" onClick={handleDrawerToggle}>
                    <ListItemText primary="Login" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/register" onClick={handleDrawerToggle}>
                    <ListItemText primary="Get Started" />
                  </ListItemButton>
                </ListItem>
              </>
            )}
            {isAuthenticated && (
              <>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/profile" onClick={handleDrawerToggle}>
                    <ListItemText primary="Profile" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => { handleLogout(); handleDrawerToggle(); }}>
                    <ListItemText primary="Logout" />
                  </ListItemButton>
                </ListItem>
              </>
            )}
          </List>
        </NavbarDrawerContent>
      </NavbarDrawer>
    </AppBar>
  );
};

export default Navbar;

