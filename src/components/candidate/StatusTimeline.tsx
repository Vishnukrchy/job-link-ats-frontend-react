import React from 'react';
import { Application } from '../../types';
import Badge from '../common/Badge';

interface StatusTimelineProps {
  applications: Application[];
}

const StatusTimeline: React.FC<StatusTimelineProps> = ({ applications }) => {
  const sortedApplications = [...applications].sort(
    (a, b) => b.appliedDate.getTime() - a.appliedDate.getTime()
  );

  return (
    <div className="relative">
      {sortedApplications.map((application, index) => (
        <div
          key={application.id}
          className={`relative pl-8 pb-8 ${
            index === sortedApplications.length - 1 ? '' : 'border-l-2 border-gray-200'
          }`}
        >
          <div className="absolute -left-2 w-6 h-6 bg-white border-2 border-primary-500 rounded-full"></div>
          <div className="mb-2">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Application #{application.id}
                </p>
                <p className="text-xs text-gray-500">
                  {application.appliedDate.toLocaleDateString()}
                </p>
              </div>
              <Badge
                variant={
                  application.status === 'offer'
                    ? 'success'
                    : application.status === 'interviewed'
                    ? 'accent'
                    : 'primary'
                }
                size="sm"
              >
                {application.status}
              </Badge>
            </div>
            {application.notes && application.notes.length > 0 && (
              <p className="mt-2 text-sm text-gray-600">{application.notes[0]}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatusTimeline;