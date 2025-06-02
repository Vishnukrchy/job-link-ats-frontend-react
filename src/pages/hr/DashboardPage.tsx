import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Briefcase as BriefcaseBusiness, FileText, Users, Plus, Filter } from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import { mockJobs, mockApplications, mockHRAnalytics } from '../../utils/mockData';
import { Job, Application } from '../../types';
import JobPostingModal from '../../components/hr/JobPostingModal';
import CandidateKanban from '../../components/hr/CandidateKanban';
import AnalyticsPanel from '../../components/hr/AnalyticsPanel';

const DashboardPage: React.FC = () => {
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [filterDepartment, setFilterDepartment] = useState<string>('all');

  const filteredJobs = filterDepartment === 'all' 
    ? mockJobs 
    : mockJobs.filter(job => job.department === filterDepartment);

  const departments = Array.from(new Set(mockJobs.map(job => job.department)));

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-display font-bold text-gray-900">HR Dashboard</h1>
            <p className="text-gray-600">Manage your jobs and candidates</p>
          </div>
          <Button
            variant="primary"
            leftIcon={<Plus size={18} />}
            onClick={() => {
              setSelectedJob(null);
              setIsJobModalOpen(true);
            }}
          >
            Post New Job
          </Button>
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
                <BriefcaseBusiness size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Jobs</p>
                <p className="text-2xl font-semibold">{mockHRAnalytics.activeJobs}</p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card className="flex items-center p-6">
              <div className="p-3 rounded-full bg-secondary-100 text-secondary-600 mr-4">
                <Users size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Applications</p>
                <p className="text-2xl font-semibold">{mockHRAnalytics.totalApplications}</p>
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
                <FileText size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Interviews Scheduled</p>
                <p className="text-2xl font-semibold">
                  {mockHRAnalytics.applicationsByStatus.interviewed}
                </p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card className="flex items-center p-6">
              <div className="p-3 rounded-full bg-success-50 text-success-700 mr-4">
                <BarChart3 size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Offers Sent</p>
                <p className="text-2xl font-semibold">
                  {mockHRAnalytics.applicationsByStatus.offer}
                </p>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Active Jobs */}
        <Card className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Active Jobs</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Filter size={18} className="text-gray-500 mr-2" />
                <select
                  className="border border-gray-300 rounded-md px-3 py-1.5 text-sm"
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                >
                  <option value="all">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Job Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applications
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{job.title}</div>
                      <div className="text-sm text-gray-500">{job.salary}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="secondary" size="sm">
                        {job.department}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {job.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {mockApplications.filter(app => app.jobId === job.id).length} / {job.expectedApplications}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        variant={job.status === 'active' ? 'success' : 'neutral'}
                        size="sm"
                      >
                        {job.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedJob(job);
                          setIsJobModalOpen(true);
                        }}
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Candidate Kanban Board */}
        <Card className="mb-8">
          <h2 className="text-xl font-semibold mb-6">Candidate Pipeline</h2>
          <CandidateKanban applications={mockApplications} />
        </Card>

        {/* Analytics Panel */}
        <Card>
          <h2 className="text-xl font-semibold mb-6">Analytics Overview</h2>
          <AnalyticsPanel analytics={mockHRAnalytics} />
        </Card>

        {/* Job Posting Modal */}
        <JobPostingModal
          isOpen={isJobModalOpen}
          onClose={() => setIsJobModalOpen(false)}
          job={selectedJob}
        />
      </div>
    </div>
  );
};

export default DashboardPage;