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
import CompanyProfilePage from './pages/hr/CompanyProfilePage';
import InterviewSchedulerPage from './pages/hr/InterviewSchedulerPage';
import TagsManagementPage from './pages/hr/TagsManagementPage';
import ShortlistsPage from './pages/hr/ShortlistsPage';
import EmailTemplatesPage from './pages/hr/EmailTemplatesPage';
import CandidateDashboardPage from './pages/candidate/DashboardPage';
import ProfilePage from './pages/candidate/ProfilePage';
import ApplicationsPage from './pages/candidate/ApplicationsPage';
import GoalsPage from './pages/candidate/GoalsPage';
import CallsPage from './pages/candidate/CallsPage';
import TimelinePage from './pages/candidate/TimelinePage';
import NotesPage from './pages/candidate/NotesPage';
import InterviewCalendarPage from './pages/candidate/InterviewCalendarPage';
import ResumeFeedbackPage from './pages/candidate/ResumeFeedbackPage';
import JobDiscoveryPage from './pages/candidate/JobDiscoveryPage';
import DocumentUploadPage from './pages/candidate/DocumentUploadPage';
import NotificationsCenterPage from './pages/candidate/NotificationsCenterPage';

// Loading component
const LoadingSpinner: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
  </div>
);

const ProtectedRoute: React.FC<{ children: React.ReactNode; userType?: 'hr' | 'candidate' }> = ({ 
  children, 
  userType 
}) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login\" replace />;
  }

  if (userType && user?.userType !== userType) {
    // Redirect to appropriate dashboard based on user type
    const redirectPath = user?.userType === 'hr' ? '/hr/dashboard' : '/candidate/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

const HRLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ProtectedRoute userType="hr">
    <DashboardLayout>
      {children}
    </DashboardLayout>
  </ProtectedRoute>
);

const CandidateLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ProtectedRoute userType="candidate">
    <CandidateDashboardLayout>
      {children}
    </CandidateDashboardLayout>
  </ProtectedRoute>
);

// Public route wrapper that redirects authenticated users
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (isAuthenticated && user) {
    // Redirect authenticated users to their appropriate dashboard
    const redirectPath = user.userType === 'hr' ? '/hr/dashboard' : '/candidate/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

function AppContent() {
  const { loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Routes>
        {/* Public routes with Navbar and Footer */}
        <Route path="/" element={
          <>
            <Navbar />
            <LandingPage />
            <Footer />
          </>
        } />
        <Route path="/login" element={
          <PublicRoute>
            <>
              <Navbar />
              <LoginPage />
              <Footer />
            </>
          </PublicRoute>
        } />
        <Route path="/signup" element={
          <PublicRoute>
            <>
              <Navbar />
              <SignupPage />
              <Footer />
            </>
          </PublicRoute>
        } />
        
        {/* HR routes */}
        <Route path="/hr/dashboard" element={<HRLayout><HRDashboardPage /></HRLayout>} />
        <Route path="/hr/jobs" element={<HRLayout><JobsPage /></HRLayout>} />
        <Route path="/hr/jobs/new" element={<HRLayout><NewJobPage /></HRLayout>} />
        <Route path="/hr/candidates" element={<HRLayout><CandidatesPage /></HRLayout>} />
        <Route path="/hr/candidates/new" element={<HRLayout><NewCandidatePage /></HRLayout>} />
        <Route path="/hr/status-board" element={<HRLayout><StatusBoardPage /></HRLayout>} />
        <Route path="/hr/reports" element={<HRLayout><ReportsPage /></HRLayout>} />
        <Route path="/hr/company" element={<HRLayout><CompanyProfilePage /></HRLayout>} />
        <Route path="/hr/interviews" element={<HRLayout><InterviewSchedulerPage /></HRLayout>} />
        <Route path="/hr/tags" element={<HRLayout><TagsManagementPage /></HRLayout>} />
        <Route path="/hr/shortlists" element={<HRLayout><ShortlistsPage /></HRLayout>} />
        <Route path="/hr/templates" element={<HRLayout><EmailTemplatesPage /></HRLayout>} />
        
        {/* Candidate routes */}
        <Route path="/candidate/dashboard" element={<CandidateLayout><CandidateDashboardPage /></CandidateLayout>} />
        <Route path="/candidate/profile" element={<CandidateLayout><ProfilePage /></CandidateLayout>} />
        <Route path="/candidate/applications" element={<CandidateLayout><ApplicationsPage /></CandidateLayout>} />
        <Route path="/candidate/goals" element={<CandidateLayout><GoalsPage /></CandidateLayout>} />
        <Route path="/candidate/calls" element={<CandidateLayout><CallsPage /></CandidateLayout>} />
        <Route path="/candidate/timeline" element={<CandidateLayout><TimelinePage /></CandidateLayout>} />
        <Route path="/candidate/notes" element={<CandidateLayout><NotesPage /></CandidateLayout>} />
        <Route path="/candidate/calendar" element={<CandidateLayout><InterviewCalendarPage /></CandidateLayout>} />
        <Route path="/candidate/feedback" element={<CandidateLayout><ResumeFeedbackPage /></CandidateLayout>} />
        <Route path="/candidate/jobs" element={<CandidateLayout><JobDiscoveryPage /></CandidateLayout>} />
        <Route path="/candidate/documents" element={<CandidateLayout><DocumentUploadPage /></CandidateLayout>} />
        <Route path="/candidate/notifications" element={<CandidateLayout><NotificationsCenterPage /></CandidateLayout>} />
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/\" replace />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;