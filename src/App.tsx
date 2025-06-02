import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import DashboardLayout from './components/layout/DashboardLayout';
import CandidateDashboardLayout from './components/layout/CandidateDashboardLayout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import HRDashboardPage from './pages/hr/DashboardPage';
import JobsPage from './pages/hr/JobsPage';
import NewJobPage from './pages/hr/NewJobPage';
import CandidatesPage from './pages/hr/CandidatesPage';
import NewCandidatePage from './pages/hr/NewCandidatePage';
import StatusBoardPage from './pages/hr/StatusBoardPage';
import ReportsPage from './pages/hr/ReportsPage';
import CandidateDashboardPage from './pages/candidate/DashboardPage';
import ProfilePage from './pages/candidate/ProfilePage';
import ApplicationsPage from './pages/candidate/ApplicationsPage';
import GoalsPage from './pages/candidate/GoalsPage';
import CallsPage from './pages/candidate/CallsPage';
import TimelinePage from './pages/candidate/TimelinePage';
import NotesPage from './pages/candidate/NotesPage';

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

// HR Layout wrapper
const HRLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ProtectedRoute userType="hr">
    <DashboardLayout>
      {children}
    </DashboardLayout>
  </ProtectedRoute>
);

// Candidate Layout wrapper
const CandidateLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ProtectedRoute userType="candidate">
    <CandidateDashboardLayout>
      {children}
    </CandidateDashboardLayout>
  </ProtectedRoute>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            
            {/* HR routes */}
            <Route path="/hr/dashboard" element={<HRLayout><HRDashboardPage /></HRLayout>} />
            <Route path="/hr/jobs" element={<HRLayout><JobsPage /></HRLayout>} />
            <Route path="/hr/jobs/new" element={<HRLayout><NewJobPage /></HRLayout>} />
            <Route path="/hr/candidates" element={<HRLayout><CandidatesPage /></HRLayout>} />
            <Route path="/hr/candidates/new" element={<HRLayout><NewCandidatePage /></HRLayout>} />
            <Route path="/hr/status-board" element={<HRLayout><StatusBoardPage /></HRLayout>} />
            <Route path="/hr/reports" element={<HRLayout><ReportsPage /></HRLayout>} />
            
            {/* Candidate routes */}
            <Route path="/candidate/dashboard" element={<CandidateLayout><CandidateDashboardPage /></CandidateLayout>} />
            <Route path="/candidate/profile" element={<CandidateLayout><ProfilePage /></CandidateLayout>} />
            <Route path="/candidate/applications" element={<CandidateLayout><ApplicationsPage /></CandidateLayout>} />
            <Route path="/candidate/goals" element={<CandidateLayout><GoalsPage /></CandidateLayout>} />
            <Route path="/candidate/calls" element={<CandidateLayout><CallsPage /></CandidateLayout>} />
            <Route path="/candidate/timeline" element={<CandidateLayout><TimelinePage /></CandidateLayout>} />
            <Route path="/candidate/notes" element={<CandidateLayout><NotesPage /></CandidateLayout>} />
            
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;