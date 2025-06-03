import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Briefcase } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const isPortalPage = location.pathname.includes('/candidate') || location.pathname.includes('/hr');

  if (!isPortalPage) {
    return (
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <Briefcase className="h-8 w-8 text-primary-600" />
                <span className="ml-2 text-xl font-bold">JobLink</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-600 hover:text-gray-900">
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-900">
              {user?.userType === 'hr' ? 'HR Portal' : 'Candidate Portal'}
            </Link>
          </div>
          <div className="flex items-center">
            <div className="mr-8">
              <h2 className="text-lg font-medium text-gray-900">
                Welcome back, {user?.name?.split(' ')[0]}!
              </h2>
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-500 relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="ml-4 flex items-center">
              <div className="mr-4 text-right">
                <div className="text-sm font-medium text-gray-900">{user?.name}</div>
                <div className="text-xs text-gray-500">{user?.role || 'Backend Developer'}</div>
              </div>
              <div className="h-10 w-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-medium">
                {user?.name?.split(' ').map(n => n[0]).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;