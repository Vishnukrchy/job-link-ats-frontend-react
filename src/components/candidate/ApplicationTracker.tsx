import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CandidateAnalytics } from '../../types';
import Badge from '../common/Badge';

interface ApplicationTrackerProps {
  analytics: CandidateAnalytics;
  onApplicationSelect: (id: string) => void;
}

const ApplicationTracker: React.FC<ApplicationTrackerProps> = ({ analytics, onApplicationSelect }) => {
  // Prepare data for the weekly applications chart
  const weeklyData = [
    { day: 'Mon', applications: 2 },
    { day: 'Tue', applications: 3 },
    { day: 'Wed', applications: 1 },
    { day: 'Thu', applications: 4 },
    { day: 'Fri', applications: 2 },
    { day: 'Sat', applications: 0 },
    { day: 'Sun', applications: 1 },
  ];

  return (
    <div>
      {/* Progress towards weekly goal */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Weekly Goal Progress</span>
          <span className="text-sm text-gray-600">
            {analytics.totalApplications} / {analytics.weeklyGoal} applications
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-primary-600 h-2.5 rounded-full"
            style={{
              width: `${Math.min(
                (analytics.totalApplications / analytics.weeklyGoal) * 100,
                100
              )}%`,
            }}
          ></div>
        </div>
      </div>

      {/* Weekly Applications Chart */}
      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="applications" fill="#2563EB" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Application Status Summary */}
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(analytics.applicationsByStatus).map(([status, count]) => (
          <div
            key={status}
            className="text-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
            onClick={() => onApplicationSelect(status)}
          >
            <Badge
              variant={
                status === 'offer'
                  ? 'success'
                  : status === 'interviewed'
                  ? 'accent'
                  : 'primary'
              }
              size="sm"
            >
              {count}
            </Badge>
            <p className="mt-1 text-sm text-gray-600 capitalize">{status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationTracker;