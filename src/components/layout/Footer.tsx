import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase as BriefcaseBusiness, Github, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center">
              <BriefcaseBusiness className="h-8 w-8 text-primary-400" />
              <span className="ml-2 text-xl font-display font-bold">JobLink</span>
            </div>
            <p className="mt-2 text-sm text-gray-400">
              Connect, Apply, Succeed. The modern platform for job seekers and recruiters.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* For Candidates */}
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">
              For Candidates
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/candidate/dashboard" className="text-gray-400 hover:text-white text-sm">
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link to="/candidate/profile" className="text-gray-400 hover:text-white text-sm">
                  Create Profile
                </Link>
              </li>
              <li>
                <Link to="/candidate/applications" className="text-gray-400 hover:text-white text-sm">
                  Application Tracker
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-400 hover:text-white text-sm">
                  Career Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">
              For Employers
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/hr/dashboard" className="text-gray-400 hover:text-white text-sm">
                  Post Jobs
                </Link>
              </li>
              <li>
                <Link to="/hr/candidates" className="text-gray-400 hover:text-white text-sm">
                  Find Candidates
                </Link>
              </li>
              <li>
                <Link to="/hr/company" className="text-gray-400 hover:text-white text-sm">
                  Company Profile
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-400 hover:text-white text-sm">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-800 pt-8">
          <p className="text-sm text-gray-400 text-center">
            &copy; {new Date().getFullYear()} JobLink. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;