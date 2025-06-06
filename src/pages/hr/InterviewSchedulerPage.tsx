import React, { useState } from 'react';
import { Plus, Calendar, Clock, Video, MapPin, User, Search, Filter } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Badge from '../../components/common/Badge';

interface Interview {
  id: string;
  candidateName: string;
  candidateId: string;
  jobTitle: string;
  date: Date;
  time: string;
  duration: number;
  mode: 'video' | 'phone' | 'in-person';
  interviewer: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  notes?: string;
  meetingLink?: string;
  location?: string;
}

const InterviewSchedulerPage: React.FC = () => {
  const [interviews, setInterviews] = useState<Interview[]>([
    {
      id: '1',
      candidateName: 'John Doe',
      candidateId: 'C001',
      jobTitle: 'Senior Frontend Developer',
      date: new Date('2024-01-25'),
      time: '10:00 AM',
      duration: 60,
      mode: 'video',
      interviewer: 'Sarah Johnson',
      status: 'scheduled',
      notes: 'Technical round focusing on React and system design',
      meetingLink: 'https://zoom.us/j/123456789'
    },
    {
      id: '2',
      candidateName: 'Jane Smith',
      candidateId: 'C002',
      jobTitle: 'UX Designer',
      date: new Date('2024-01-26'),
      time: '2:00 PM',
      duration: 45,
      mode: 'in-person',
      interviewer: 'Mike Chen',
      status: 'scheduled',
      notes: 'Portfolio review and design thinking discussion',
      location: 'Conference Room A'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  const filteredInterviews = interviews.filter(interview => 
    (interview.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    interview.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterStatus === 'all' || interview.status === filterStatus)
  );

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'scheduled': return 'primary';
      case 'completed': return 'success';
      case 'cancelled': return 'error';
      case 'rescheduled': return 'warning';
      default: return 'neutral';
    }
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'video': return <Video size={16} />;
      case 'phone': return <Clock size={16} />;
      case 'in-person': return <MapPin size={16} />;
      default: return <Calendar size={16} />;
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Interview Scheduler</h1>
          <p className="text-gray-600">Schedule and manage candidate interviews</p>
        </div>
        <Button
          variant="primary"
          leftIcon={<Plus size={18} />}
          onClick={() => setIsScheduleModalOpen(true)}
        >
          Schedule Interview
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Search candidates or jobs..."
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
          <option value="scheduled">Scheduled</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
          <option value="rescheduled">Rescheduled</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredInterviews.map((interview) => (
          <Card key={interview.id} className="hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{interview.candidateName}</h3>
                <p className="text-gray-600">{interview.jobTitle}</p>
              </div>
              <Badge
                variant={getStatusBadgeVariant(interview.status)}
                size="sm"
              >
                {interview.status}
              </Badge>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">
                  {interview.date.toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">
                  {interview.time} ({interview.duration}min)
                </span>
              </div>
              <div className="flex items-center">
                {getModeIcon(interview.mode)}
                <span className="text-sm text-gray-600 ml-2 capitalize">
                  {interview.mode}
                </span>
              </div>
              <div className="flex items-center">
                <User className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">{interview.interviewer}</span>
              </div>
            </div>

            {interview.notes && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">{interview.notes}</p>
              </div>
            )}

            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <div className="flex gap-2">
                {interview.mode === 'video' && interview.meetingLink && (
                  <Button
                    variant="primary"
                    size="sm"
                    leftIcon={<Video size={16} />}
                  >
                    Join Meeting
                  </Button>
                )}
                <Button variant="outline" size="sm">
                  Reschedule
                </Button>
                <Button variant="outline" size="sm">
                  Cancel
                </Button>
              </div>
              <Button variant="ghost" size="sm">
                View Details
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Schedule Interview Modal would go here */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">Schedule New Interview</h2>
            <p className="text-gray-600 mb-4">Interview scheduling form would be implemented here.</p>
            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={() => setIsScheduleModalOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="primary">
                Schedule Interview
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewSchedulerPage;