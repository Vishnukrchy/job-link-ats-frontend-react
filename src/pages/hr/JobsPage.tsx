import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2 } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Badge from '../../components/common/Badge';
import JobPostingModal from '../../components/hr/JobPostingModal';
import { mockJobs } from '../../utils/mockData';

const JobsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');

  const departments = Array.from(new Set(mockJobs.map(job => job.department)));

  const filteredJobs = mockJobs
    .filter(job => 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(job => filterDepartment === 'all' || job.department === filterDepartment);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Job Postings</h1>
          <p className="text-gray-600">Manage and track all job postings</p>
        </div>
        <Button
          variant="primary"
          leftIcon={<Plus size={18} />}
          onClick={() => {
            setSelectedJob(null);
            setIsModalOpen(true);
          }}
        >
          Post New Job
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          leftIcon={<Search className="text-gray-400\" size={20} />}
          className="max-w-xl"
        />
        <select
          className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          value={filterDepartment}
          onChange={(e) => setFilterDepartment(e.target.value)}
        >
          <option value="all">All Departments</option>
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                <p className="text-gray-600 mt-1">{job.department} • {job.location}</p>
              </div>
              <Badge
                variant={job.status === 'active' ? 'success' : 'neutral'}
                size="sm"
              >
                {job.status}
              </Badge>
            </div>

            <p className="text-gray-700 mt-4 line-clamp-2">{job.description}</p>

            <div className="mt-4 grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Salary Range</p>
                <p className="text-sm font-medium">{job.salary}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Applications</p>
                <p className="text-sm font-medium">12 / {job.expectedApplications}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Posted Date</p>
                <p className="text-sm font-medium">{job.createdAt.toLocaleDateString()}</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
              <div className="flex gap-2">
                {job.platforms.map((platform) => (
                  <Badge key={platform} variant="secondary" size="sm">
                    {platform}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<Edit size={16} />}
                  onClick={() => {
                    setSelectedJob(job);
                    setIsModalOpen(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<Trash2 size={16} />}
                  className="text-error-600 hover:text-error-700"
                >
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <JobPostingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        job={selectedJob}
      />
    </div>
  );
};

export default JobsPage;