import React from 'react';
import { Edit, MapPin, Mail } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

const ProfilePage: React.FC = () => {
  const profile = {
    name: 'Vishnu Kumar',
    role: 'Backend Developer',
    location: 'San Francisco, CA',
    email: 'vishnu.kumar@email.com',
    summary: 'Experienced Backend Developer with 3+ years of expertise in Spring Boot, Java, and PostgreSQL. Passionate about building scalable systems and writing clean, maintainable code. Strong background in REST API development, database optimization, and modern development practices.',
    skills: {
      primary: ['Spring Boot', 'Java', 'PostgreSQL', 'REST APIs', 'Microservices'],
      secondary: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Git'],
      soft: ['Team Leadership', 'Communication', 'Problem Solving']
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Profile Management</h1>
        <p className="text-gray-600">Manage your professional profile and preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <Card className="text-center p-8">
          <div className="w-32 h-32 rounded-full bg-primary-500 text-white text-4xl font-bold flex items-center justify-center mx-auto mb-4">
            {profile.name.split(' ').map(n => n[0]).join('')}
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
          <p className="text-gray-600 mb-4">{profile.role}</p>
          
          <div className="flex items-center justify-center text-gray-600 mb-2">
            <MapPin size={16} className="mr-2" />
            <span>{profile.location}</span>
          </div>
          <div className="flex items-center justify-center text-gray-600 mb-4">
            <Mail size={16} className="mr-2" />
            <span>{profile.email}</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            leftIcon={<Edit size={16} />}
          >
            Edit Photo
          </Button>
        </Card>

        {/* Professional Summary */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">Professional Summary</h3>
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<Edit size={16} />}
              >
                Edit
              </Button>
            </div>
            <p className="text-gray-700">{profile.summary}</p>
          </Card>

          {/* Skills */}
          <Card>
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-semibold">Skills</h3>
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<Edit size={16} />}
              >
                Manage Skills
              </Button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Primary Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.primary.map((skill) => (
                    <Badge key={skill} variant="primary" size="md">{skill}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Secondary Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.secondary.map((skill) => (
                    <Badge key={skill} variant="secondary" size="md">{skill}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Soft Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.soft.map((skill) => (
                    <Badge key={skill} variant="accent" size="md">{skill}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;