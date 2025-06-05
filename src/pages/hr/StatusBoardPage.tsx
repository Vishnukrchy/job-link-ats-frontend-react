import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Badge from '../../components/common/Badge';
import CandidateKanban from '../../components/hr/CandidateKanban';
import { mockApplications } from '../../utils/mockData';

const StatusBoardPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');

  const departments = ['Engineering', 'Design', 'Marketing', 'Sales'];

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Status Board</h1>
        <p className="text-gray-600">Track candidate progress through the hiring pipeline</p>
      </div>

      <Card className="mb-6">
        <div className="flex gap-4 items-center">
          <Input
            placeholder="Search candidates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<Search className="text-gray-400" size={20} />}
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

        <div className="grid grid-cols-4 gap-4 mt-6">
          <div className="bg-primary-50 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-primary-900">Total Candidates</h3>
            <p className="text-2xl font-bold text-primary-700 mt-1">
              {mockApplications.length}
            </p>
          </div>
          <div className="bg-secondary-50 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-secondary-900">In Progress</h3>
            <p className="text-2xl font-bold text-secondary-700 mt-1">
              {mockApplications.filter(app => 
                ['screened', 'interviewed'].includes(app.status)
              ).length}
            </p>
          </div>
          <div className="bg-success-50 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-success-700">Offers Made</h3>
            <p className="text-2xl font-bold text-success-700 mt-1">
              {mockApplications.filter(app => app.status === 'offer').length}
            </p>
          </div>
          <div className="bg-accent-50 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-accent-900">Time to Hire (avg)</h3>
            <p className="text-2xl font-bold text-accent-700 mt-1">12 days</p>
          </div>
        </div>
      </Card>

      <Card>
        <CandidateKanban applications={mockApplications} />
      </Card>
    </div>
  );
};

export default StatusBoardPage;