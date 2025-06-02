import React from 'react';
import { motion } from 'framer-motion';
import { Application } from '../../types';
import Badge from '../common/Badge';

interface CandidateKanbanProps {
  applications: Application[];
}

const CandidateKanban: React.FC<CandidateKanbanProps> = ({ applications }) => {
  const stages = ['applied', 'screened', 'interviewed', 'offer', 'joined'] as const;

  const getApplicationsByStage = (stage: typeof stages[number]) => {
    return applications.filter(app => app.status === stage);
  };

  const getBadgeVariant = (stage: typeof stages[number]) => {
    switch (stage) {
      case 'applied':
        return 'primary';
      case 'screened':
        return 'secondary';
      case 'interviewed':
        return 'accent';
      case 'offer':
        return 'success';
      case 'joined':
        return 'neutral';
      default:
        return 'neutral';
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[1000px] grid grid-cols-5 gap-4">
        {stages.map((stage) => (
          <div key={stage} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-700 capitalize">
                {stage}
              </h3>
              <Badge variant={getBadgeVariant(stage)} size="sm">
                {getApplicationsByStage(stage).length}
              </Badge>
            </div>

            <div className="space-y-3">
              {getApplicationsByStage(stage).map((application) => (
                <motion.div
                  key={application.id}
                  layoutId={application.id}
                  className="bg-white p-4 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="text-sm font-medium text-gray-900 mb-1">
                    Candidate #{application.candidateId}
                  </div>
                  <div className="text-xs text-gray-500 mb-2">
                    Applied: {application.appliedDate.toLocaleDateString()}
                  </div>
                  {application.notes && application.notes.length > 0 && (
                    <div className="text-xs text-gray-600 line-clamp-2">
                      {application.notes[0]}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidateKanban;