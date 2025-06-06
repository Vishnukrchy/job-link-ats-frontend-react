import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, userType: 'hr' | 'candidate') => Promise<void>;
  signup: (email: string, password: string, name: string, userType: 'hr' | 'candidate') => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('joblink_user');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        // Validate the user object structure
        if (parsedUser.id && parsedUser.email && parsedUser.name && parsedUser.userType) {
          setUser(parsedUser);
        } else {
          // Invalid user data, clear it
          localStorage.removeItem('joblink_user');
        }
      }
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
      localStorage.removeItem('joblink_user');
    } finally {
      setLoading(false);
    }
  }, []);

  const isAuthenticated = !!user && !loading;

  // In a real app, this would make API calls to a backend
  const login = async (email: string, password: string, userType: 'hr' | 'candidate') => {
    try {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock login validation - in a real app, this would validate with a backend
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      const mockUser: User = {
        id: `user-${Date.now()}`,
        email,
        name: email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        userType,
        createdAt: new Date(),
      };
      
      setUser(mockUser);
      localStorage.setItem('joblink_user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string, userType: 'hr' | 'candidate') => {
    try {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock signup validation - in a real app, this would create a user on the backend
      if (!email || !password || !name) {
        throw new Error('All fields are required');
      }

      const mockUser: User = {
        id: `user-${Date.now()}`,
        email,
        name,
        userType,
        createdAt: new Date(),
      };
      
      setUser(mockUser);
      localStorage.setItem('joblink_user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('joblink_user');
    // Clear any other user-related data from localStorage if needed
    localStorage.removeItem('joblink_preferences');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      login, 
      signup, 
      logout, 
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};