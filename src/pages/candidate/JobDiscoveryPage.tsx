import React, { useState } from 'react';
import { Search, Filter, MapPin, Clock, Bookmark, ExternalLink } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Badge from '../../components/common/Badge';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  salary: string;
  description: string;
  requirements: string[];
  postedDate: Date;
  isBookmarked: boolean;
  matchScore: number;
}

const JobDiscoveryPage: React.FC = () => {
  const [jobs] = useState<Job[]>([
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'TechCorp Solutions',
      location: 'San Francisco, CA',
      type: 'full-time',
      salary: '$120,000 - $150,000',
      description: 'We are looking for a Senior Frontend Developer to join our dynamic team. You will be responsible for building user-facing features using React.js and modern web technologies.',
      requirements: ['React.js', 'TypeScript', 'CSS3', 'REST APIs'],
      postedDate: new Date('2024-01-20'),
      isBookmarked: false,
      matchScore: 95
    },
    {
      id: '2',
      title: 'Full Stack Engineer',
      company: 'StartupXYZ',
      location: 'Remote',
      type: 'remote',
      salary: '$100,000 - $130,000',
      description: 'Join our innovative startup as a Full Stack Engineer. Work on cutting-edge projects using modern technologies and help shape the future of our platform.',
      requirements: ['Node.js', 'React', 'MongoDB', 'AWS'],
      postedDate: new Date('2024-01-18'),
      isBookmarked: true,
      matchScore: 88
    },
    {
      id: '3',
      title: 'Frontend Developer',
      company: 'DesignHub',
      location: 'New York, NY',
      type: 'full-time',
      salary: '$90,000 - $110,000',
      description: 'Looking for a creative Frontend Developer to work closely with our design team. Experience with modern frameworks and design systems required.',
      requirements: ['Vue.js', 'JavaScript', 'SCSS', 'Figma'],
      postedDate: new Date('2024-01-15'),
      isBookmarked: false,
      matchScore: 82
    }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterLocation, setFilterLocation] = useState('all');

  const filteredJobs = jobs.filter(job =>
    (job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterType === 'all' || job.type === filterType) &&
    (filterLocation === 'all' || job.location.toLowerCase().includes(filterLocation.toLowerCase()))
  );

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 80) return 'text-blue-600 bg-blue-50';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-gray-600 bg-gray-50';
  };

  const getTypeVariant = (type: string) => {
    switch (type) {
      case 'full-time': return 'primary';
      case 'part-time': return 'secondary';
      case 'contract': return 'warning';
      case 'remote': return 'success';
      default: return 'neutral';
    }
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Job Discovery</h1>
        <p className="text-gray-600">Discover and apply to jobs that match your skills and preferences</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          placeholder="Search jobs or companies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          leftIcon={<Search className="text-gray-400" size={20} />}
          className="flex-grow"
        />
        <select
          className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="full-time">Full Time</option>
          <option value="part-time">Part Time</option>
          <option value="contract">Contract</option>
          <option value="remote">Remote</option>
        </select>
        <select
          className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
        >
          <option value="all">All Locations</option>
          <option value="san francisco">San Francisco</option>
          <option value="new york">New York</option>
          <option value="remote">Remote</option>
        </select>
      </div>

      {/* Job Results */}
      <div className="space-y-6">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                <p className="text-gray-600">{job.company}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getMatchScoreColor(job.matchScore)}`}>
                  {job.matchScore}% match
                </div>
                <button className={`p-2 rounded-lg ${job.isBookmarked ? 'text-yellow-500 bg-yellow-50' : 'text-gray-400 hover:text-gray-600'}`}>
                  <Bookmark size={20} fill={job.isBookmarked ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {job.location}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {job.postedDate.toLocaleDateString()}
              </div>
              <Badge variant={getTypeVariant(job.type)} size="sm">
                {job.type.replace('-', ' ')}
              </Badge>
              <span className="font-medium text-gray-900">{job.salary}</span>
            </div>

            <p className="text-gray-700 mb-4">{job.description}</p>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Required Skills:</h4>
              <div className="flex flex-wrap gap-2">
                {job.requirements.map((req) => (
                  <Badge key={req} variant="secondary" size="sm">
                    {req}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<ExternalLink size={16} />}
                >
                  View Details
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Bookmark size={16} />}
                >
                  {job.isBookmarked ? 'Saved' : 'Save Job'}
                </Button>
              </div>
              <Button variant="primary" size="sm">
                Apply Now
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters</p>
        </div>
      )}
    </div>
  );
};

export default JobDiscoveryPage;