import React from 'react';
import Card from '../../components/common/Card';

const GoalsPage: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Job Target Settings</h1>
      <Card>
        <p>Set and manage your job search goals here.</p>
      </Card>
    </div>
  );
}

export default GoalsPage;