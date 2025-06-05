import React, { useState } from 'react';
import { Plus, Search, Filter, Mail, Phone, Download } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Badge from '../../components/common/Badge';

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  experience: number;
  skills: string[];
  status: 'new' | 'screening' | 'interviewing' | 'offered' | 'hired' | 'rejected';
  appliedDate: Date;
}

const CandidatesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const candidates: Candidate[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234-567-8900',
      role: 'Senior Frontend Developer',
      experience: 5,
      skills: ['React', 'TypeScript', 'Node.js'],
      status: 'interviewing',
      appliedDate: new Date('2024-01-15'),
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1 234-567-8901',
      role: 'UX Designer',
      experience: 3,
      skills: ['Figma', 'UI Design', 'User Research'],
      status: 'screening',
      appliedDate: new Date('2024-01-18'),
    },
    // Add more candidates as needed
  ];

  const filteredCandidates = candidates.filter(candidate => 
    (candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.role.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterStatus === 'all' || candidate.status === filterStatus)
  );

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'new': return 'primary';
      case 'screening': return 'secondary';
      case 'interviewing': return 'accent';
      case 'offered': return 'success';
      case 'hired': return 'success';
      case 'rejected': return 'error';
      default: return 'neutral';
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Candidates</h1>
          <p className="text-gray-600">Manage and track candidate applications</p>
        </div>
        <Button
          variant="primary"
          leftIcon={<Plus size={18} />}
        >
          Add Candidate
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Search candidates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          leftIcon={<Search className="text-gray-400" size={20} />}
          className="max-w-xl"
        />
        <select
          className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="new">New</option>
          <option value="screening">Screening</option>
          <option value="interviewing">Interviewing</option>
          <option value="offered">Offered</option>
          <option value="hired">Hired</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredCandidates.map((candidate) => (
          <Card key={candidate.id} className="hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{candidate.name}</h3>
                <p className="text-gray-600 mt-1">{candidate.role}</p>
              </div>
              <Badge
                variant={getStatusBadgeVariant(candidate.status)}
                size="sm"
              >
                {candidate.status}
              </Badge>
            </div>

            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center">
                <Mail className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">{candidate.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">{candidate.phone}</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Experience</p>
                <p className="text-sm font-medium">{candidate.experience} years</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Applied Date</p>
                <p className="text-sm font-medium">{candidate.appliedDate.toLocaleDateString()}</p>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" size="sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Mail size={16} />}
                >
                  Contact
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Download size={16} />}
                >
                  Resume
                </Button>
              </div>
              <Button variant="primary" size="sm">
                View Profile
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CandidatesPage;