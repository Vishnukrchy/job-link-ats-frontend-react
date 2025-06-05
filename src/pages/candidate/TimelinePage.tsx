import React from 'react';
import { Calendar, Clock, MessageSquare } from 'lucide-react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import { mockApplications } from '../../utils/mockData';

const TimelinePage: React.FC = () => {
  const timelineEvents = mockApplications.map(app => ({
    ...app,
    events: [
      {
        date: app.appliedDate,
        type: 'applied',
        title: 'Application Submitted',
        description: 'Initial application submitted for review'
      },
      {
        date: new Date(app.appliedDate.getTime() + 3 * 24 * 60 * 60 * 1000),
        type: 'screening',
        title: 'HR Screening',
        description: 'Initial screening call scheduled'
      },
      {
        date: new Date(app.appliedDate.getTime() + 7 * 24 * 60 * 60 * 1000),
        type: 'interview',
        title: 'Technical Interview',
        description: 'Technical discussion with the team'
      }
    ]
  }));

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Application Timeline</h1>
        <p className="text-gray-600">Track your application progress and important dates</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <div className="space-y-8">
              {timelineEvents.map((application) => (
                <div key={application.id} className="relative">
                  <div className="flex items-center mb-4">
                    <Calendar className="w-5 h-5 text-primary-600 mr-2" />
                    <h3 className="text-lg font-semibold">Application #{application.id}</h3>
                    <Badge variant="primary" size="sm" className="ml-3">
                      {application.status}
                    </Badge>
                  </div>

                  <div className="ml-4">
                    {application.events.map((event, index) => (
                      <div
                        key={index}
                        className="relative pb-8 last:pb-0"
                      >
                        <div className="flex items-start">
                          <div className="flex items-center justify-center w-12">
                            <div className="h-full w-0.5 bg-gray-200 absolute left-6 top-0 bottom-0" />
                            <div className="relative z-10 w-4 h-4 rounded-full bg-primary-100 border-2 border-primary-500" />
                          </div>
                          <div className="flex-grow ml-4">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 text-gray-400 mr-2" />
                              <span className="text-sm text-gray-500">
                                {event.date.toLocaleDateString()}
                              </span>
                            </div>
                            <h4 className="text-base font-medium text-gray-900 mt-1">
                              {event.title}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {event.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div>
          <Card>
            <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
            <div className="space-y-4">
              {timelineEvents.slice(0, 3).map((application) => (
                <div
                  key={application.id}
                  className="p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">
                      {application.events[0].title}
                    </span>
                    <Badge variant="accent" size="sm">
                      {application.events[0].date.toLocaleDateString()}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    {application.events[0].description}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Applications</span>
                <span className="font-medium">{timelineEvents.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">In Progress</span>
                <span className="font-medium">
                  {timelineEvents.filter(a => a.status !== 'rejected').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Completed</span>
                <span className="font-medium">
                  {timelineEvents.filter(a => a.status === 'offer' || a.status === 'rejected').length}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TimelinePage;