import React from 'react';
import { Plus, Target } from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';

const GoalsPage: React.FC = () => {
  const monthlyGoals = [
    {
      id: '1',
      title: 'Job Applications',
      description: 'Apply to quality positions that match my skills and interests',
      progress: { current: 24, total: 30, unit: 'applications' },
      dueDate: '2024-01-31',
      status: 'on track',
    },
    {
      id: '2',
      title: 'Networking Connections',
      description: 'Connect with professionals in my field and expand network',
      progress: { current: 12, total: 15, unit: 'connections' },
      dueDate: '2024-01-31',
      status: 'on track',
    },
    {
      id: '3',
      title: 'Skills Practice',
      description: 'Practice coding, learn new technologies, and improve existing skills',
      progress: { current: 18, total: 25, unit: 'hours' },
      dueDate: '2024-01-31',
      status: 'behind',
    },
    {
      id: '4',
      title: 'Interview Preparation',
      description: 'Practice technical and behavioral interview questions',
      progress: { current: 8, total: 10, unit: 'sessions' },
      dueDate: '2024-01-31',
      status: 'ahead',
    },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Goals & Targets</h1>
          <p className="text-gray-600">Set and track your job search goals to stay on target.</p>
        </div>
        <Button
          variant="primary"
          leftIcon={<Plus size={18} />}
        >
          Add Goal
        </Button>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Monthly Goals (January 2024)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {monthlyGoals.map((goal) => (
            <Card key={goal.id} className="relative">
              <div className="flex items-start mb-4">
                <div className="p-2 rounded-lg bg-primary-50 text-primary-600 mr-4">
                  <Target size={24} />
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-900">{goal.title}</h3>
                  <p className="text-sm text-gray-600">{goal.description}</p>
                </div>
                <Badge
                  variant={
                    goal.status === 'on track'
                      ? 'success'
                      : goal.status === 'behind'
                      ? 'error'
                      : 'accent'
                  }
                  size="sm"
                >
                  {goal.status}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>
                    {goal.progress.current} / {goal.progress.total} {goal.progress.unit}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full"
                    style={{
                      width: `${(goal.progress.current / goal.progress.total) * 100}%`,
                    }}
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Due: {goal.dueDate}</span>
                  <span>
                    {Math.round((goal.progress.current / goal.progress.total) * 100)}% complete
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GoalsPage;