import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import HRDashboardPage from './pages/hr/DashboardPage';
import CandidateDashboardPage from './pages/candidate/DashboardPage';

// Protected route component
const ProtectedRoute: React.FC<{ children: React.ReactNode; userType?: 'hr' | 'candidate' }> = ({ 
  children, 
  userType 
}) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (userType && user?.userType !== userType) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

// Placeholder components for routes we'll implement later
const HRCompanyProfile = () => <div className="min-h-screen p-8">Company Profile (Coming soon)</div>;
const CandidateProfile = () => <div className="min-h-screen p-8">Candidate Profile (Coming soon)</div>;

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              
              {/* HR routes */}
              <Route 
                path="/hr/dashboard" 
                element={
                  <ProtectedRoute userType="hr">
                    <HRDashboardPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/hr/company" 
                element={
                  <ProtectedRoute userType="hr">
                    <HRCompanyProfile />
                  </ProtectedRoute>
                } 
              />
              
              {/* Candidate routes */}
              <Route 
                path="/candidate/dashboard" 
                element={
                  <ProtectedRoute userType="candidate">
                    <CandidateDashboardPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/candidate/profile" 
                element={
                  <ProtectedRoute userType="candidate">
                    <CandidateProfile />
                  </ProtectedRoute>
                } 
              />
              
              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;