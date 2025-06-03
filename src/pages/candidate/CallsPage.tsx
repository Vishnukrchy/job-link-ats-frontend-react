import React from 'react';
import { Plus, Video } from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';

const CallsPage: React.FC = () => {
  const interviews = [
    {
      id: '1',
      company: 'TechCorp Solutions',
      position: 'Senior Backend Developer',
      date: '2024-01-20',
      time: '2:00 PM',
      duration: '60 minutes',
      interviewer: 'Sarah Johnson',
      role: 'Engineering Manager',
      type: 'Technical Interview',
      platform: 'Zoom Meeting',
      status: 'confirmed',
      description: 'Focus on Spring Boot, system design, and database optimization',
    },
    {
      id: '2',
      company: 'StartupXYZ',
      position: 'Full Stack Developer',
      date: '2024-01-22',
      time: '3:30 PM',
      duration: '45 minutes',
      interviewer: 'Mike Chen',
      role: 'Tech Lead',
      type: 'Initial Discussion',
      platform: 'Google Meet',
      status: 'confirmed',
      description: 'Discussion about role expectations and team culture',
    },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Interviews & Calls</h1>
          <p className="text-gray-600">Manage your interview schedule and track feedback.</p>
        </div>
        <Button
          variant="primary"
          leftIcon={<Plus size={18} />}
        >
          Add Interview
        </Button>
      </div>

      <h2 className="text-xl font-semibold mb-4">Upcoming Interviews</h2>

      <div className="space-y-6">
        {interviews.map((interview) => (
          <Card key={interview.id} className="border-l-4 border-primary-500">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{interview.company}</h3>
                <p className="text-gray-700">{interview.position}</p>
              </div>
              <Badge variant="success" size="sm">
                {interview.status}
              </Badge>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Date & Time</p>
                <p className="text-sm font-medium">
                  {interview.date} at {interview.time}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="text-sm font-medium">{interview.duration}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Platform</p>
                <p className="text-sm font-medium">{interview.platform}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-500">Interviewer</p>
              <p className="text-sm font-medium">
                {interview.interviewer} ({interview.role})
              </p>
            </div>

            <div className="bg-primary-50 p-4 rounded-lg mb-4">
              <p className="text-sm font-medium text-primary-900">{interview.type}</p>
              <p className="text-sm text-primary-700">{interview.description}</p>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                variant="primary"
                leftIcon={<Video size={18} />}
              >
                Join Call
              </Button>
              <Button variant="outline">
                Reschedule
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CallsPage;