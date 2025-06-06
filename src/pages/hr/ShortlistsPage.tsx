import React, { useState } from 'react';
import { Plus, Star, Users, Calendar, Search, Filter } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Badge from '../../components/common/Badge';

interface Shortlist {
  id: string;
  name: string;
  description: string;
  jobTitle: string;
  candidateCount: number;
  createdBy: string;
  createdAt: Date;
  status: 'active' | 'archived' | 'under-review';
  candidates: string[];
}

const ShortlistsPage: React.FC = () => {
  const [shortlists, setShortlists] = useState<Shortlist[]>([
    {
      id: '1',
      name: 'Frontend Developer - Final Round',
      description: 'Top candidates for senior frontend developer position after technical interviews',
      jobTitle: 'Senior Frontend Developer',
      candidateCount: 5,
      createdBy: 'Sarah Johnson',
      createdAt: new Date('2024-01-20'),
      status: 'active',
      candidates: ['C001', 'C002', 'C003', 'C004', 'C005']
    },
    {
      id: '2',
      name: 'UX Designer - Portfolio Review',
      description: 'Candidates with exceptional portfolios for UX designer role',
      jobTitle: 'UX Designer',
      candidateCount: 8,
      createdBy: 'Mike Chen',
      createdAt: new Date('2024-01-18'),
      status: 'under-review',
      candidates: ['C006', 'C007', 'C008', 'C009', 'C010', 'C011', 'C012', 'C013']
    },
    {
      id: '3',
      name: 'Product Manager - Leadership Track',
      description: 'Candidates with strong leadership experience for PM position',
      jobTitle: 'Product Manager',
      candidateCount: 3,
      createdBy: 'Emily Davis',
      createdAt: new Date('2024-01-15'),
      status: 'archived',
      candidates: ['C014', 'C015', 'C016']
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const filteredShortlists = shortlists.filter(shortlist =>
    (shortlist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shortlist.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterStatus === 'all' || shortlist.status === filterStatus)
  );

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'under-review': return 'warning';
      case 'archived': return 'neutral';
      default: return 'primary';
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Shortlists</h1>
          <p className="text-gray-600">Create and manage candidate shortlists for different positions</p>
        </div>
        <Button
          variant="primary"
          leftIcon={<Plus size={18} />}
          onClick={() => setIsCreateModalOpen(true)}
        >
          Create Shortlist
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Search shortlists..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          leftIcon={<Search className="text-gray-400\" size={20} />}
          className="max-w-xl"
        />
        <select
          className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="under-review">Under Review</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredShortlists.map((shortlist) => (
          <Card key={shortlist.id} className="hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-start">
                <Star className="w-5 h-5 text-yellow-500 mr-3 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{shortlist.name}</h3>
                  <p className="text-gray-600">{shortlist.jobTitle}</p>
                </div>
              </div>
              <Badge
                variant={getStatusBadgeVariant(shortlist.status)}
                size="sm"
              >
                {shortlist.status}
              </Badge>
            </div>

            <p className="text-gray-700 mb-4">{shortlist.description}</p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center">
                <Users className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">
                  {shortlist.candidateCount} candidates
                </span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">
                  {shortlist.createdAt.toLocaleDateString()}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Created by</p>
                <p className="text-sm font-medium">{shortlist.createdBy}</p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Add Candidates
                </Button>
                <Button variant="outline" size="sm">
                  Export List
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  View Candidates
                </Button>
                <Button variant="primary" size="sm">
                  Review
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Create Shortlist Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">Create New Shortlist</h2>
            
            <div className="space-y-4">
              <Input
                label="Shortlist Name"
                placeholder="e.g., Frontend Developer - Final Round"
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Position
                </label>
                <select className="w-full rounded-md border border-gray-300 shadow-sm p-2">
                  <option value="">Select a job position</option>
                  <option value="frontend">Senior Frontend Developer</option>
                  <option value="ux">UX Designer</option>
                  <option value="pm">Product Manager</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full rounded-md border border-gray-300 shadow-sm p-3"
                  rows={3}
                  placeholder="Describe the purpose of this shortlist..."
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <Button
                variant="outline"
                onClick={() => setIsCreateModalOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="primary">
                Create Shortlist
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShortlistsPage;