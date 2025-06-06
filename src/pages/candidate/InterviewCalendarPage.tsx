import React, { useState } from 'react';
import { Calendar, Clock, Video, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';

interface Interview {
  id: string;
  company: string;
  position: string;
  date: Date;
  time: string;
  duration: number;
  type: 'video' | 'phone' | 'in-person';
  interviewer: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  meetingLink?: string;
  location?: string;
}

const InterviewCalendarPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const interviews: Interview[] = [
    {
      id: '1',
      company: 'TechCorp Solutions',
      position: 'Senior Frontend Developer',
      date: new Date('2024-01-25'),
      time: '10:00 AM',
      duration: 60,
      type: 'video',
      interviewer: 'Sarah Johnson',
      status: 'upcoming',
      meetingLink: 'https://zoom.us/j/123456789'
    },
    {
      id: '2',
      company: 'StartupXYZ',
      position: 'Full Stack Developer',
      date: new Date('2024-01-26'),
      time: '2:00 PM',
      duration: 45,
      type: 'phone',
      interviewer: 'Mike Chen',
      status: 'upcoming'
    },
    {
      id: '3',
      company: 'DesignHub',
      position: 'UI/UX Designer',
      date: new Date('2024-01-28'),
      time: '11:00 AM',
      duration: 90,
      type: 'in-person',
      interviewer: 'Emily Davis',
      status: 'upcoming',
      location: 'Conference Room A, 123 Design St'
    }
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getInterviewsForDate = (date: Date) => {
    return interviews.filter(interview => 
      interview.date.toDateString() === date.toDateString()
    );
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const days = getDaysInMonth(currentDate);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Interview Calendar</h1>
        <p className="text-gray-600">View and manage your upcoming interviews</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateMonth('prev')}
                >
                  <ChevronLeft size={16} />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateMonth('next')}
                >
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-4">
              {dayNames.map(day => (
                <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {days.map((day, index) => {
                if (!day) {
                  return <div key={index} className="p-2 h-24"></div>;
                }

                const dayInterviews = getInterviewsForDate(day);
                const isToday = day.toDateString() === new Date().toDateString();
                const isSelected = selectedDate?.toDateString() === day.toDateString();

                return (
                  <div
                    key={day.toISOString()}
                    className={`p-2 h-24 border border-gray-200 cursor-pointer hover:bg-gray-50 ${
                      isToday ? 'bg-primary-50 border-primary-200' : ''
                    } ${isSelected ? 'bg-primary-100 border-primary-300' : ''}`}
                    onClick={() => setSelectedDate(day)}
                  >
                    <div className={`text-sm font-medium ${isToday ? 'text-primary-700' : 'text-gray-900'}`}>
                      {day.getDate()}
                    </div>
                    <div className="mt-1 space-y-1">
                      {dayInterviews.slice(0, 2).map(interview => (
                        <div
                          key={interview.id}
                          className="text-xs p-1 bg-primary-100 text-primary-700 rounded truncate"
                        >
                          {interview.time} - {interview.company}
                        </div>
                      ))}
                      {dayInterviews.length > 2 && (
                        <div className="text-xs text-gray-500">
                          +{dayInterviews.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Interview Details */}
        <div>
          <Card>
            <h3 className="text-lg font-semibold mb-4">
              {selectedDate ? `Interviews on ${selectedDate.toLocaleDateString()}` : 'Upcoming Interviews'}
            </h3>
            
            <div className="space-y-4">
              {(selectedDate ? getInterviewsForDate(selectedDate) : interviews.slice(0, 3)).map(interview => (
                <div key={interview.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">{interview.company}</h4>
                    <Badge
                      variant={interview.status === 'upcoming' ? 'primary' : 'success'}
                      size="sm"
                    >
                      {interview.status}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{interview.position}</p>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {interview.date.toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {interview.time} ({interview.duration}min)
                    </div>
                    <div className="flex items-center">
                      {interview.type === 'video' && <Video className="w-4 h-4 mr-2" />}
                      {interview.type === 'in-person' && <MapPin className="w-4 h-4 mr-2" />}
                      {interview.type === 'phone' && <Clock className="w-4 h-4 mr-2" />}
                      <span className="capitalize">{interview.type}</span>
                    </div>
                  </div>
                  
                  {interview.status === 'upcoming' && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      {interview.type === 'video' && interview.meetingLink && (
                        <Button
                          variant="primary"
                          size="sm"
                          fullWidth
                          leftIcon={<Video size={16} />}
                        >
                          Join Meeting
                        </Button>
                      )}
                      {interview.type === 'in-person' && (
                        <Button
                          variant="outline"
                          size="sm"
                          fullWidth
                          leftIcon={<MapPin size={16} />}
                        >
                          View Location
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InterviewCalendarPage;