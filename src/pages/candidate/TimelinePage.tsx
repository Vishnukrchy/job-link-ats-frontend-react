import React from 'react';
import Card from '../../components/common/Card';

const TimelinePage: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Application Timeline</h1>
      <Card>
        <p>View your application history and progress here.</p>
      </Card>
    </div>
  );
}

export default TimelinePage;