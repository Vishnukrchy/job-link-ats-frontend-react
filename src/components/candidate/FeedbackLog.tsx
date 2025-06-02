import React from 'react';
import { Application } from '../../types';
import Badge from '../common/Badge';

interface FeedbackLogProps {
  applications: Application[];
}

const FeedbackLog: React.FC<FeedbackLogProps> = ({ applications }) => {
  const sortedApplications = [...applications].sort(
    (a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime()
  );

  return (
    <div className="space-y-4">
      {sortedApplications.map((application) => (
        <div
          key={application.id}
          className="border-l-4 border-primary-500 pl-4 py-2"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-900">
                Application #{application.id}
              </p>
              <p className="text-xs text-gray-500">
                {application.lastUpdated.toLocaleDateString()}
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
      ))}
    </div>
  );
};

export default FeedbackLog;