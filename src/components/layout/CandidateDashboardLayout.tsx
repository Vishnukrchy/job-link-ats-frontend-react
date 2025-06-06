import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  BarChart2, 
  Calendar,
  ChevronLeft,
  ChevronRight,
  FileText,
  LayoutDashboard, 
  LogOut, 
  Menu,
  MessageSquare,
  StickyNote,
  Target,
  User,
  X
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, children, onClick }) => (
  <NavLink
    to={to}
    className={({ isActive }) => `
      flex items-center px-4 py-2.5 text-sm font-medium rounded-lg
      transition-colors duration-200
      ${isActive 
        ? 'bg-primary-50 text-primary-700' 
        : 'text-gray-700 hover:bg-gray-100'
      }
    `}
    onClick={onClick}
  >
    {icon}
    <span className="ml-3">{children}</span>
  </NavLink>
);

const CandidateDashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { logout } = useAuth();
  const location = useLocation();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-screen transition-transform duration-300
          ${isSidebarOpen ? 'w-64' : 'w-20'}
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 bg-white border-r border-gray-200
        `}
      >
        <div className="flex items-center justify-between h-16 px-4">
          <span className={`text-xl font-semibold text-gray-800 transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
            {isSidebarOpen ? 'JobLink' : ''}
          </span>
          {!isSidebarOpen && (
            <span className="text-xl font-semibold text-gray-800">JL</span>
          )}
          <button
            onClick={toggleSidebar}
            className="hidden md:block p-1 rounded-lg hover:bg-gray-100"
          >
            {isSidebarOpen ? (
              <ChevronLeft size={20} />
            ) : (
              <ChevronRight size={20} />
            )}
          </button>
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-1 rounded-lg hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-3 py-4 overflow-y-auto">
          <nav className="space-y-2">
            <NavItem 
              to="/candidate/dashboard" 
              icon={<LayoutDashboard size={20} />}
            >
              {isSidebarOpen && 'Dashboard'}
            </NavItem>
            <NavItem 
              to="/candidate/profile" 
              icon={<User size={20} />}
            >
              {isSidebarOpen && 'Profile'}
            </NavItem>
            <NavItem 
              to="/candidate/applications" 
              icon={<FileText size={20} />}
            >
              {isSidebarOpen && 'My Applications'}
            </NavItem>
            <NavItem 
              to="/candidate/goals" 
              icon={<Target size={20} />}
            >
              {isSidebarOpen && 'Set Job Target'}
            </NavItem>
            <NavItem 
              to="/candidate/calls" 
              icon={<MessageSquare size={20} />}
            >
              {isSidebarOpen && 'HR Calls & Feedback'}
            </NavItem>
            <NavItem 
              to="/candidate/timeline" 
              icon={<Calendar size={20} />}
            >
              {isSidebarOpen && 'Application Timeline'}
            </NavItem>
            <NavItem 
              to="/candidate/notes" 
              icon={<StickyNote size={20} />}
            >
              {isSidebarOpen && 'Notes & Follow-up'}
            </NavItem>
            <button
              onClick={handleLogout}
              className={`flex items-center w-full px-4 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 ${!isSidebarOpen ? 'justify-center' : ''}`}
            >
              <LogOut size={20} />
              {isSidebarOpen && <span className="ml-3">Logout</span>}
            </button>
          </nav>
        </div>
      </aside>

      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-lg bg-white shadow-lg"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Main content */}
      <div
        className={`
          transition-all duration-300
          ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'}
        `}
      >
        {children}
      </div>
    </div>
  );
};

export default CandidateDashboardLayout;