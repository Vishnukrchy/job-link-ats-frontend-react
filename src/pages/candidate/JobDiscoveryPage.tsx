import React, { useState } from 'react';
import { Search, MapPin, Clock, DollarSign, Building2, Filter, Heart, ExternalLink, Briefcase, Users, Star } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Badge from '../../components/common/Badge';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
  benefits: string[];
  postedDate: string;
  applicants: number;
  rating: number;
  logo: string;
  featured: boolean;
}

const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$120,000 - $160,000',
    description: 'We are looking for a passionate Senior Frontend Developer to join our dynamic team and help build the next generation of web applications.',
    requirements: ['React', 'TypeScript', 'Node.js', '5+ years experience'],
    benefits: ['Health Insurance', 'Remote Work', '401k', 'Stock Options'],
    postedDate: '2 days ago',
    applicants: 47,
    rating: 4.8,
    logo: '🚀',
    featured: true
  },
  {
    id: '2',
    title: 'UX/UI Designer',
    company: 'Design Studio Pro',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$90,000 - $120,000',
    description: 'Join our creative team to design beautiful and intuitive user experiences for cutting-edge digital products.',
    requirements: ['Figma', 'Adobe Creative Suite', 'User Research', '3+ years experience'],
    benefits: ['Flexible Hours', 'Creative Freedom', 'Learning Budget', 'Team Events'],
    postedDate: '1 day ago',
    applicants: 23,
    rating: 4.6,
    logo: '🎨',
    featured: false
  },
  {
    id: '3',
    title: 'Full Stack Engineer',
    company: 'StartupXYZ',
    location: 'Austin, TX',
    type: 'Full-time',
    salary: '$100,000 - $140,000',
    description: 'Be part of a fast-growing startup and help build scalable solutions that impact millions of users worldwide.',
    requirements: ['Python', 'React', 'AWS', 'Docker', '4+ years experience'],
    benefits: ['Equity', 'Unlimited PTO', 'Remote First', 'Learning Stipend'],
    postedDate: '3 days ago',
    applicants: 31,
    rating: 4.7,
    logo: '⚡',
    featured: true
  },
  {
    id: '4',
    title: 'Product Manager',
    company: 'InnovateLabs',
    location: 'Seattle, WA',
    type: 'Full-time',
    salary: '$130,000 - $170,000',
    description: 'Lead product strategy and drive innovation in our AI-powered platform that serves enterprise clients globally.',
    requirements: ['Product Strategy', 'Agile', 'Data Analysis', '5+ years experience'],
    benefits: ['Stock Options', 'Health & Dental', 'Gym Membership', 'Conference Budget'],
    postedDate: '1 week ago',
    applicants: 18,
    rating: 4.9,
    logo: '💡',
    featured: false
  },
  {
    id: '5',
    title: 'DevOps Engineer',
    company: 'CloudTech Solutions',
    location: 'Remote',
    type: 'Full-time',
    salary: '$110,000 - $150,000',
    description: 'Help us build and maintain robust cloud infrastructure that powers applications for millions of users.',
    requirements: ['Kubernetes', 'AWS/GCP', 'Terraform', 'CI/CD', '4+ years experience'],
    benefits: ['100% Remote', 'Equipment Allowance', 'Professional Development', 'Flexible Schedule'],
    postedDate: '5 days ago',
    applicants: 29,
    rating: 4.5,
    logo: '☁️',
    featured: false
  },
  {
    id: '6',
    title: 'Data Scientist',
    company: 'AI Dynamics',
    location: 'Boston, MA',
    type: 'Full-time',
    salary: '$125,000 - $165,000',
    description: 'Join our data science team to develop machine learning models that drive business insights and innovation.',
    requirements: ['Python', 'Machine Learning', 'SQL', 'Statistics', '3+ years experience'],
    benefits: ['Research Time', 'Conference Attendance', 'Mentorship Program', 'Innovation Bonus'],
    postedDate: '4 days ago',
    applicants: 35,
    rating: 4.8,
    logo: '📊',
    featured: true
  }
];

export default function JobDiscoveryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('');
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesType = !jobTypeFilter || job.type === jobTypeFilter;
    
    return matchesSearch && matchesLocation && matchesType;
  });

  const toggleSaveJob = (jobId: string) => {
    const newSavedJobs = new Set(savedJobs);
    if (newSavedJobs.has(jobId)) {
      newSavedJobs.delete(jobId);
    } else {
      newSavedJobs.add(jobId);
    }
    setSavedJobs(newSavedJobs);
  };

  const featuredJobs = filteredJobs.filter(job => job.featured);
  const regularJobs = filteredJobs.filter(job => !job.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Discover Your Next Opportunity
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find the perfect job that matches your skills, interests, and career goals
            </p>
          </div>

          {/* Search Section */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Job title, keywords, or company"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 text-lg"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Location"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="pl-10 h-12 text-lg"
                  />
                </div>
                <Button className="h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Search className="w-5 h-5 mr-2" />
                  Search Jobs
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </Button>
                <p className="text-sm text-gray-500">
                  {filteredJobs.length} jobs found
                </p>
              </div>

              {showFilters && (
                <div className="mt-4 pt-4 border-t">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
                      <select
                        value={jobTypeFilter}
                        onChange={(e) => setJobTypeFilter(e.target.value)}
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="">All Types</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Remote">Remote</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Jobs */}
        {featuredJobs.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Star className="w-6 h-6 text-yellow-500 fill-current" />
              <h2 className="text-2xl font-bold text-gray-900">Featured Jobs</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredJobs.map((job) => (
                <Card key={job.id} className="p-6 hover:shadow-xl transition-all duration-300 border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl">
                        {job.logo}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h3>
                        <p className="text-gray-600 font-medium">{job.company}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleSaveJob(job.id)}
                      className={`${savedJobs.has(job.id) ? 'text-red-500' : 'text-gray-400'} hover:text-red-500`}
                    >
                      <Heart className={`w-5 h-5 ${savedJobs.has(job.id) ? 'fill-current' : ''}`} />
                    </Button>
                  </div>

                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {job.type}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {job.salary}
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.requirements.slice(0, 3).map((req, index) => (
                      <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                        {req}
                      </Badge>
                    ))}
                    {job.requirements.length > 3 && (
                      <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                        +{job.requirements.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {job.applicants} applicants
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        {job.rating}
                      </div>
                      <span>{job.postedDate}</span>
                    </div>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Apply Now
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Regular Jobs */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Briefcase className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">All Jobs</h2>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {regularJobs.map((job) => (
              <Card key={job.id} className="p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center text-2xl">
                      {job.logo}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h3>
                      <p className="text-gray-600 font-medium">{job.company}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleSaveJob(job.id)}
                    className={`${savedJobs.has(job.id) ? 'text-red-500' : 'text-gray-400'} hover:text-red-500`}
                  >
                    <Heart className={`w-5 h-5 ${savedJobs.has(job.id) ? 'fill-current' : ''}`} />
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {job.type}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {job.salary}
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{job.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {job.requirements.map((req, index) => (
                        <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col justify-between">
                    <div className="space-y-3 mb-4">
                      <div className="text-sm text-gray-500">
                        <div className="flex items-center gap-1 mb-1">
                          <Users className="w-4 h-4" />
                          {job.applicants} applicants
                        </div>
                        <div className="flex items-center gap-1 mb-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          {job.rating} rating
                        </div>
                        <div>{job.postedDate}</div>
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Apply Now
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}