import React from 'react';
import { Filter, Search } from 'lucide-react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Input from '../../components/common/Input';

const ApplicationsPage: React.FC = () => {
  const applications = [
    {
      id: '1',
      company: 'TechCorp Solutions',
      position: 'Senior Backend Developer',
      description: 'Looking for an experienced backend developer to join our core platform team.',
      status: 'Interview Scheduled',
      appliedDate: '2024-01-15',
      salary: '$120,000 - $140,000',
      location: 'San Francisco, CA',
      type: 'Full-time',
      nextStep: 'Technical Interview on Jan 20',
    },
    {
      id: '2',
      company: 'InnovateLabs',
      position: 'Full Stack Engineer',
      description: 'Join our innovative team building next-generation web applications.',
      status: 'Under Review',
      appliedDate: '2024-01-18',
      salary: '$110,000 - $130,000',
      location: 'Remote',
      type: 'Full-time',
      nextStep: 'Waiting for HR screening',
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Job Applications</h1>
        <p className="text-gray-600">Track and manage all your job applications in one place.</p>
      </div>

      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Search companies or positions..."
          className="max-w-xl"
          leftIcon={<Search className="text-gray-400\" size={20} />}
        />
        <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
          <Filter size={20} className="mr-2" />
          All Statuses
        </button>
      </div>

      <div className="space-y-4">
        {applications.map((app) => (
          <Card key={app.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{app.company}</h3>
                <p className="text-lg text-gray-700">{app.position}</p>
              </div>
              <Badge
                variant={app.status === 'Interview Scheduled' ? 'success' : 'primary'}
                size="md"
              >
                {app.status}
              </Badge>
            </div>

            <p className="text-gray-600 mb-4">{app.description}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Applied</p>
                <p className="text-sm font-medium">{app.appliedDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Salary</p>
                <p className="text-sm font-medium">{app.salary}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="text-sm font-medium">{app.location}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Type</p>
                <p className="text-sm font-medium">{app.type}</p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <div>
                <p className="text-sm font-medium">Next Step:</p>
                <p className="text-sm text-gray-600">{app.nextStep}</p>
              </div>
              <div className="space-x-2">
                <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
                  View Details
                </button>
                <button className="text-sm font-medium text-gray-600 hover:text-gray-700">
                  Add Note
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ApplicationsPage;