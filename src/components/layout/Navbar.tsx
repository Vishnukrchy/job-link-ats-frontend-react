import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bell, Briefcase, ChevronDown, User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../common/Button';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsProfileDropdownOpen(false);
    navigate('/');
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(false);
    if (user?.userType === 'hr') {
      navigate('/hr/company');
    } else {
      navigate('/candidate/profile');
    }
  };

  // Don't show navbar content if user is not authenticated and not on public pages
  const publicPages = ['/', '/login', '/signup'];
  const isPublicPage = publicPages.includes(location.pathname);

  if (!isAuthenticated && !isPublicPage) {
    return (
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <Briefcase className="h-8 w-8 text-primary-600" />
                <span className="ml-2 text-xl font-bold">JobLink</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                to="/login" 
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Sign In
              </Link>
              <Button
                as={Link}
                to="/signup"
                variant="primary"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Briefcase className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold">JobLink</span>
            </Link>
          </div>

          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-4">
                <Link 
                  to={user?.userType === 'hr' ? '/hr/dashboard' : '/candidate/dashboard'}
                  className="text-gray-600 hover:text-gray-900 font-medium"
                >
                  Dashboard
                </Link>
                <Link 
                  to={user?.userType === 'hr' ? '/hr/jobs' : '/candidate/applications'}
                  className="text-gray-600 hover:text-gray-900 font-medium"
                >
                  {user?.userType === 'hr' ? 'Jobs' : 'Applications'}
                </Link>
              </div>
              
              <button className="p-2 text-gray-400 hover:text-gray-500 relative">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{user?.name}</div>
                    <div className="text-xs text-gray-500">
                      {user?.userType === 'hr' ? 'HR Manager' : 'Job Seeker'}
                    </div>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-medium">
                    {user?.name?.split(' ').map(n => n[0]).join('')}
                  </div>
                  <ChevronDown 
                    size={16} 
                    className={`text-gray-400 transition-transform ${
                      isProfileDropdownOpen ? 'rotate-180' : ''
                    }`} 
                  />
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    
                    <button
                      onClick={handleProfileClick}
                      className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <User size={16} className="mr-3" />
                      Profile Settings
                    </button>
                    
                    <button
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        navigate(user?.userType === 'hr' ? '/hr/dashboard' : '/candidate/dashboard');
                      }}
                      className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <Settings size={16} className="mr-3" />
                      Dashboard
                    </button>
                    
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut size={16} className="mr-3" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link 
                to="/login" 
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Sign In
              </Link>
              <Button
                as={Link}
                to="/signup"
                variant="primary"
              >
                Get Started
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;