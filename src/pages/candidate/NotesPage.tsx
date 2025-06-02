import React from 'react';
import Card from '../../components/common/Card';

const NotesPage: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Notes & Follow-up</h1>
      <Card>
        <p>Manage your application notes and follow-ups here.</p>
      </Card>
    </div>
  );
}

export default NotesPage;