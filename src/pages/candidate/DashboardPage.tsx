import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle, Clock, FileText, Target, TrendingUp } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { mockCandidateAnalytics, mockApplications } from '../../utils/mockData';
import ApplicationTracker from '../../components/candidate/ApplicationTracker';
import FeedbackLog from '../../components/candidate/FeedbackLog';
import StatusTimeline from '../../components/candidate/StatusTimeline';
import NotesSection from '../../components/candidate/NotesSection';

const DashboardPage: React.FC = () => {
  const [selectedApplication, setSelectedApplication] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-display font-bold text-gray-900">Candidate Dashboard</h1>
          <p className="text-gray-600">Track your job applications and progress</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="flex items-center p-6">
              <div className="p-3 rounded-full bg-primary-100 text-primary-600 mr-4">
                <FileText size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Applications</p>
                <p className="text-2xl font-semibold">{mockCandidateAnalytics.totalApplications}</p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card className="flex items-center p-6">
              <div className="p-3 rounded-full bg-success-50 text-success-700 mr-4">
                <Target size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Daily Goal Progress</p>
                <div className="flex items-center">
                  <p className="text-2xl font-semibold mr-2">
                    {mockApplications.length}
                  </p>
                  <p className="text-sm text-gray-500">/ {mockCandidateAnalytics.dailyGoal}</p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="flex items-center p-6">
              <div className="p-3 rounded-full bg-accent-100 text-accent-600 mr-4">
                <TrendingUp size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Current Streak</p>
                <div className="flex items-center">
                  <p className="text-2xl font-semibold mr-2">
                    {mockCandidateAnalytics.currentStreak}
                  </p>
                  <p className="text-sm text-gray-500">days</p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card className="flex items-center p-6">
              <div className="p-3 rounded-full bg-secondary-100 text-secondary-600 mr-4">
                <CheckCircle size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Response Rate</p>
                <p className="text-2xl font-semibold">
                  {Math.round((mockCandidateAnalytics.applicationsByStatus.interviewed + 
                    mockCandidateAnalytics.applicationsByStatus.offer) / 
                    mockCandidateAnalytics.totalApplications * 100)}%
                </p>
              </div>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Application Tracker */}
            <Card>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Application Tracker</h2>
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<Calendar size={16} />}
                >
                  Set Goals
                </Button>
              </div>
              <ApplicationTracker
                analytics={mockCandidateAnalytics}
                onApplicationSelect={setSelectedApplication}
              />
            </Card>

            {/* Status Timeline */}
            <Card>
              <h2 className="text-xl font-semibold mb-6">Application Timeline</h2>
              <StatusTimeline applications={mockApplications} />
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Feedback Log */}
            <Card>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">HR Interactions</h2>
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Clock size={16} />}
                >
                  Log New
                </Button>
              </div>
              <FeedbackLog applications={mockApplications} />
            </Card>

            {/* Notes Section */}
            <Card>
              <h2 className="text-xl font-semibold mb-6">Personal Notes</h2>
              <NotesSection
                selectedApplicationId={selectedApplication}
                applications={mockApplications}
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;