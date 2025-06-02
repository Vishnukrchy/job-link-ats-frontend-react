import React from 'react';
import Card from '../../components/common/Card';

const CallsPage: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">HR Calls & Feedback</h1>
      <Card>
        <p>Track your interviews and feedback here.</p>
      </Card>
    </div>
  );
}

export default CallsPage;