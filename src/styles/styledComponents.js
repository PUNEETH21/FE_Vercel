import { styled } from '@mui/material/styles';
import { Box, Paper, Button, Typography, Container, Link, Toolbar, IconButton, Menu, MenuItem, Drawer, Dialog } from '@mui/material';

// Login/Register Page Styles
export const AuthPageContainer = styled(Box)(({ theme }) => ({
  minHeight: 'calc(100vh - 64px)',
  display: 'flex',
  alignItems: 'center',
  background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)',
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
}));

export const AuthPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  border: '1px solid',
  borderColor: theme.palette.divider,
  background: 'white',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
}));

export const AuthIconBox = styled(Box)(({ theme }) => ({
  width: 64,
  height: 64,
  borderRadius: theme.spacing(2),
  background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
}));

export const AuthIconText = styled(Typography)({
  color: 'white',
  fontSize: '1.75rem',
});

export const AuthHeaderBox = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(3),
}));

export const AuthTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(0.5),
}));

export const AuthButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(2),
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
  background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
  fontWeight: 600,
  fontSize: '1rem',
  '&:hover': {
    background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 100%)',
    boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.3)',
  },
}));

export const AuthLink = styled('a')(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 500,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

// Home Page Styles
export const HomeContainer = styled(Box)({
  background: 'linear-gradient(to bottom, #f8fafc 0%, #ffffff 100%)',
});

export const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
  color: 'white',
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  textAlign: 'center',
  marginBottom: theme.spacing(3),
  position: 'relative',
  overflow: 'hidden',
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 60%)',
  },
}));

export const HeroContent = styled(Container)({
  position: 'relative',
  zIndex: 1,
});

export const HeroTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(1.5),
  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
}));

export const HeroSubtitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  opacity: 0.95,
  fontWeight: 400,
}));

export const HeroButtonContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  display: 'flex',
  gap: theme.spacing(2),
  justifyContent: 'center',
  flexWrap: 'wrap',
}));

export const HeroPrimaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'white',
  color: theme.palette.primary.main,
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(5),
  paddingTop: theme.spacing(1.75),
  paddingBottom: theme.spacing(1.75),
  fontWeight: 600,
  fontSize: '1rem',
  '&:hover': {
    backgroundColor: '#f8fafc',
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  },
}));

export const HeroSecondaryButton = styled(Button)(({ theme }) => ({
  borderColor: 'white',
  borderWidth: 2,
  color: 'white',
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(5),
  paddingTop: theme.spacing(1.75),
  paddingBottom: theme.spacing(1.75),
  fontWeight: 600,
  fontSize: '1rem',
  '&:hover': {
    borderColor: 'white',
    borderWidth: 2,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
}));

export const ServicesContainer = styled(Container)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}));

export const ServicesTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(0.5),
  color: theme.palette.text.primary,
  fontWeight: 600,
}));

export const ServicesSubtitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.text.secondary,
  maxWidth: 600,
  marginLeft: 'auto',
  marginRight: 'auto',
}));

export const FeatureCard = styled(Box)(({ theme }) => ({
  height: '100%',
  textAlign: 'center',
  padding: theme.spacing(3),
  border: '1px solid',
  borderColor: theme.palette.divider,
}));

export const FeatureIconBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  display: 'flex',
  justifyContent: 'center',
}));

export const FeatureIcon = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2.5),
  borderRadius: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  display: 'inline-flex',
  fontSize: '2rem',
}));

export const FeatureTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(1),
  color: theme.palette.text.primary,
}));

// Navbar Styles
export const NavbarToolbar = styled(Toolbar)(({ theme }) => ({
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(2),
  overflow: 'visible',
  position: 'relative',
  [theme.breakpoints.up('sm')]: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
}));

export const NavbarBrand = styled(Typography)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main,
  marginRight: theme.spacing(2),
  fontWeight: 700,
  fontSize: '1.25rem',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  flexShrink: 0,
  whiteSpace: 'nowrap',
  [theme.breakpoints.up('sm')]: {
    marginRight: theme.spacing(4),
  },
}));

export const NavbarIcon = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  borderRadius: theme.spacing(1),
  padding: theme.spacing(0.75),
  display: 'inline-flex',
  fontSize: '1.25rem',
}));

export const NavbarBrandText = styled(Box)({
  fontWeight: 700,
});

export const NavbarBrandSubtext = styled(Box)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginLeft: theme.spacing(0.5),
}));

export const NavbarSearchContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  maxWidth: 300,
  marginRight: theme.spacing(2),
  flexShrink: 0,
}));

export const NavbarMobileMenuButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2),
}));

export const NavbarActionsContainer = styled(Box)(({ theme }) => ({
  display: 'none',
  alignItems: 'center',
  flex: 1,
  minWidth: 0,
  marginLeft: 'auto',
  '@media (min-width: 901px)': {
    display: 'flex',
    marginLeft: 'auto',
  },
}));

export const NavbarScrollableLinks = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(0.5),
  alignItems: 'center',
  overflowX: 'auto',
  overflowY: 'hidden',
  flex: 1,
  minWidth: 0,
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
}));

export const NavbarLinkButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 500,
  minWidth: 'auto',
  paddingLeft: theme.spacing(1.5),
  paddingRight: theme.spacing(1.5),
  fontSize: '0.875rem',
  whiteSpace: 'nowrap',
  flexShrink: 0,
  '&:hover': {
    backgroundColor: theme.palette.grey[100],
  },
}));

export const NavbarUserContainer = styled(Box)(({ theme }) => ({
  flexShrink: 0,
  marginLeft: theme.spacing(1),
}));

export const NavbarUserButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  backgroundColor: theme.palette.grey[100],
  color: theme.palette.text.primary,
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(0.75),
  paddingBottom: theme.spacing(0.75),
  fontWeight: 500,
  minWidth: 'auto',
  whiteSpace: 'nowrap',
  '&:hover': {
    backgroundColor: theme.palette.grey[200],
  },
}));

export const NavbarMenu = styled(Menu)(({ theme }) => ({
  marginTop: theme.spacing(1),
  '& .MuiPaper-root': {
    borderRadius: theme.spacing(2),
    minWidth: 180,
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  },
}));

export const NavbarMenuItem = styled(MenuItem)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  margin: theme.spacing(0.5),
}));

export const NavbarLoginButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 500,
  '&:hover': {
    backgroundColor: theme.palette.grey[100],
  },
}));

export const NavbarRegisterButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  fontWeight: 600,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export const NavbarDrawer = styled(Drawer)(({ theme }) => ({
  display: 'block',
  '@media (min-width: 901px)': {
    display: 'none',
  },
  '& .MuiDrawer-paper': {
    boxSizing: 'border-box',
    width: 280,
  },
}));

export const NavbarDrawerContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

export const NavbarDrawerSearch = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

// Common Page Styles
export const PageContainer = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}));

export const PageHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2.5),
}));

export const PageTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(0.5),
}));

export const PageSubtitle = styled(Typography)({
  // Uses default text.secondary color
});

// Public Health Info Styles
export const HealthInfoContainer = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  backgroundColor: theme.palette.background.default,
}));

export const HealthInfoNav = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  display: 'flex',
  gap: theme.spacing(2),
  justifyContent: 'center',
  flexWrap: 'wrap',
}));

export const HealthInfoHeader = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(2),
}));

export const HealthInfoSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const HealthInfoFooter = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  textAlign: 'center',
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  borderTop: '1px solid',
  borderColor: theme.palette.divider,
}));

// Form Field Wrappers
export const FormFieldWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(1.5),
}));

export const FormFieldWrapperLast = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

// Link Styles
export const AuthLinkButton = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 500,
  textDecoration: 'none',
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

// Common Responsive Components
export const ResponsivePageContainer = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  [theme.breakpoints.up('sm')]: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: 0,
    paddingRight: 0,
  },
}));

export const ResponsivePageHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2.5),
}));

export const ResponsivePageTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(0.5),
  fontSize: '1.5rem',
  [theme.breakpoints.up('sm')]: {
    fontSize: '2rem',
  },
}));

export const ResponsivePageSubtitle = styled(Typography)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('sm')]: {
    display: 'block',
  },
}));

export const ResponsiveGridContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    gap: theme.spacing(2),
  },
}));

export const ResponsiveTableContainer = styled(Box)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  overflowX: 'auto',
  '& .MuiTable-root': {
    minWidth: 600,
  },
}));

export const ResponsiveDialog = styled(Dialog)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    '& .MuiDialog-paper': {
      margin: 0,
      width: '100%',
      maxWidth: '100%',
      height: '100%',
      maxHeight: '100%',
      borderRadius: 0,
    },
  },
}));

export const ResponsiveButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    width: 'auto',
  },
}));

export const ResponsiveFormButton = styled(Button)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
    minWidth: 120,
  },
}));

