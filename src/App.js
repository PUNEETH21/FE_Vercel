import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Appointments from './pages/Appointments';
import HealthRecords from './pages/HealthRecords';
import PreventiveCare from './pages/PreventiveCare';
import Profile from './pages/Profile';
import Analytics from './pages/Analytics';
import Reminders from './pages/Reminders';
import PatientProfile from './pages/PatientProfile';
import PatientDashboard from './pages/PatientDashboard';
import PublicHealthInfo from './pages/PublicHealthInfo';
import GoalTracker from './pages/GoalTracker';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: { xs: 1, sm: 2 }, mb: { xs: 1, sm: 2 }, px: { xs: 1, sm: 2, md: 3 } }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <PatientDashboard />
              </PrivateRoute>
            }
          />
          <Route path="/health-info" element={<PublicHealthInfo />} />
          <Route
            path="/goal-tracker"
            element={
              <PrivateRoute>
                <GoalTracker />
              </PrivateRoute>
            }
          />
          <Route
            path="/appointments"
            element={
              <PrivateRoute>
                <Appointments />
              </PrivateRoute>
            }
          />
          <Route
            path="/health-records"
            element={
              <PrivateRoute>
                <HealthRecords />
              </PrivateRoute>
            }
          />
          <Route
            path="/preventive-care"
            element={
              <PrivateRoute>
                <PreventiveCare />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <PrivateRoute>
                <Analytics />
              </PrivateRoute>
            }
          />
          <Route
            path="/reminders"
            element={
              <PrivateRoute>
                <Reminders />
              </PrivateRoute>
            }
          />
          <Route
            path="/patient-profile"
            element={
              <PrivateRoute>
                <PatientProfile />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Container>
    </AuthProvider>
  );
}

export default App;

