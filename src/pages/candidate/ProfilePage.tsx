import React from 'react';
import Card from '../../components/common/Card';

const ProfilePage: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <Card>
        <p>Update your profile information here.</p>
      </Card>
    </div>
  );
}

export default ProfilePage;