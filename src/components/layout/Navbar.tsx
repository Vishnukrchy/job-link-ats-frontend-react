import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Briefcase } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../common/Button';

const Navbar: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

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
                  className="text-gray-600 hover:text-gray-900"
                >
                  Dashboard
                </Link>
                <Link 
                  to={user?.userType === 'hr' ? '/hr/jobs' : '/candidate/applications'}
                  className="text-gray-600 hover:text-gray-900"
                >
                  {user?.userType === 'hr' ? 'Jobs' : 'Applications'}
                </Link>
              </div>
              
              <button className="p-2 text-gray-400 hover:text-gray-500 relative">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{user?.name}</div>
                  <div className="text-xs text-gray-500">{user?.userType === 'hr' ? 'HR Manager' : 'Job Seeker'}</div>
                </div>
                <div className="h-10 w-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-medium">
                  {user?.name?.split(' ').map(n => n[0]).join('')}
                </div>
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