import React from 'react';
import Card from '../../components/common/Card';

const ApplicationsPage: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">My Applications</h1>
      <Card>
        <p>View and manage your job applications here.</p>
      </Card>
    </div>
  );
}

export default ApplicationsPage;