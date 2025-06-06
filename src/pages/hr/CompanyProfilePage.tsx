import React, { useState } from 'react';
import { Building2, Edit, Mail, Phone, MapPin, Globe, Users, Calendar } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Badge from '../../components/common/Badge';
import { useAuth } from '../../contexts/AuthContext';

const CompanyProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  const [companyData, setCompanyData] = useState({
    name: 'TechCorp Solutions',
    industry: 'Technology',
    size: '100-500 employees',
    founded: '2015',
    website: 'https://techcorp.com',
    email: 'hr@techcorp.com',
    phone: '+1 (555) 123-4567',
    address: '123 Tech Street, San Francisco, CA 94105',
    description: 'We are a leading technology company focused on building innovative solutions that transform businesses and improve lives. Our team of passionate engineers and designers work together to create cutting-edge products.',
    departments: ['Engineering', 'Product', 'Design', 'Marketing', 'Sales', 'HR'],
    benefits: [
      'Health Insurance',
      'Dental & Vision',
      '401(k) Matching',
      'Flexible PTO',
      'Remote Work Options',
      'Professional Development',
      'Stock Options',
      'Gym Membership'
    ],
    culture: [
      'Innovation-driven',
      'Collaborative',
      'Work-life balance',
      'Continuous learning',
      'Diversity & inclusion'
    ]
  });

  const handleSave = () => {
    // In a real app, this would save to backend
    setIsEditing(false);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Company Profile</h1>
          <p className="text-gray-600">Manage your company information and branding</p>
        </div>
        <Button
          variant={isEditing ? "primary" : "outline"}
          leftIcon={isEditing ? undefined : <Edit size={18} />}
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Company Logo and Basic Info */}
        <Card className="text-center p-8">
          <div className="w-32 h-32 rounded-lg bg-primary-500 text-white text-4xl font-bold flex items-center justify-center mx-auto mb-4">
            <Building2 size={48} />
          </div>
          
          {isEditing ? (
            <div className="space-y-4">
              <Input
                value={companyData.name}
                onChange={(e) => setCompanyData({...companyData, name: e.target.value})}
                placeholder="Company Name"
              />
              <Input
                value={companyData.industry}
                onChange={(e) => setCompanyData({...companyData, industry: e.target.value})}
                placeholder="Industry"
              />
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-900">{companyData.name}</h2>
              <p className="text-gray-600 mb-4">{companyData.industry}</p>
            </>
          )}
          
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center justify-center">
              <Users size={16} className="mr-2" />
              <span>{companyData.size}</span>
            </div>
            <div className="flex items-center justify-center">
              <Calendar size={16} className="mr-2" />
              <span>Founded {companyData.founded}</span>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            leftIcon={<Edit size={16} />}
            className="mt-4"
          >
            Change Logo
          </Button>
        </Card>

        {/* Company Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <Card>
            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
            
            {isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Email"
                  value={companyData.email}
                  onChange={(e) => setCompanyData({...companyData, email: e.target.value})}
                  leftIcon={<Mail size={18} />}
                />
                <Input
                  label="Phone"
                  value={companyData.phone}
                  onChange={(e) => setCompanyData({...companyData, phone: e.target.value})}
                  leftIcon={<Phone size={18} />}
                />
                <Input
                  label="Website"
                  value={companyData.website}
                  onChange={(e) => setCompanyData({...companyData, website: e.target.value})}
                  leftIcon={<Globe size={18} />}
                  className="md:col-span-2"
                />
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea
                    value={companyData.address}
                    onChange={(e) => setCompanyData({...companyData, address: e.target.value})}
                    className="w-full rounded-md border border-gray-300 shadow-sm p-3"
                    rows={2}
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Mail size={18} className="text-gray-400 mr-3" />
                  <span>{companyData.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone size={18} className="text-gray-400 mr-3" />
                  <span>{companyData.phone}</span>
                </div>
                <div className="flex items-center">
                  <Globe size={18} className="text-gray-400 mr-3" />
                  <a href={companyData.website} className="text-primary-600 hover:underline">
                    {companyData.website}
                  </a>
                </div>
                <div className="flex items-start">
                  <MapPin size={18} className="text-gray-400 mr-3 mt-0.5" />
                  <span>{companyData.address}</span>
                </div>
              </div>
            )}
          </Card>

          {/* Company Description */}
          <Card>
            <h3 className="text-xl font-semibold mb-4">About Company</h3>
            
            {isEditing ? (
              <textarea
                value={companyData.description}
                onChange={(e) => setCompanyData({...companyData, description: e.target.value})}
                className="w-full h-32 rounded-md border border-gray-300 shadow-sm p-3"
                placeholder="Company description..."
              />
            ) : (
              <p className="text-gray-700">{companyData.description}</p>
            )}
          </Card>

          {/* Departments */}
          <Card>
            <h3 className="text-xl font-semibold mb-4">Departments</h3>
            <div className="flex flex-wrap gap-2">
              {companyData.departments.map((dept) => (
                <Badge key={dept} variant="primary" size="md">
                  {dept}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Benefits & Perks */}
          <Card>
            <h3 className="text-xl font-semibold mb-4">Benefits & Perks</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {companyData.benefits.map((benefit) => (
                <div key={benefit} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Company Culture */}
          <Card>
            <h3 className="text-xl font-semibold mb-4">Company Culture</h3>
            <div className="flex flex-wrap gap-2">
              {companyData.culture.map((value) => (
                <Badge key={value} variant="accent" size="md">
                  {value}
                </Badge>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfilePage;