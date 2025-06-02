import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';

interface JobPostingModalProps {
  isOpen: boolean;
  onClose: () => void;
  job?: {
    id: string;
    title: string;
    description: string;
    department: string;
    location: string;
    salary?: string;
    platforms: string[];
    expectedApplications: number;
  } | null;
}

const JobPostingModal: React.FC<JobPostingModalProps> = ({
  isOpen,
  onClose,
  job
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    department: '',
    location: '',
    salary: '',
    platforms: [] as string[],
    expectedApplications: 0
  });

  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title,
        description: job.description,
        department: job.department,
        location: job.location,
        salary: job.salary || '',
        platforms: job.platforms,
        expectedApplications: job.expectedApplications
      });
    } else {
      setFormData({
        title: '',
        description: '',
        department: '',
        location: '',
        salary: '',
        platforms: [],
        expectedApplications: 0
      });
    }
  }, [job]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    onClose();
  };

  const platforms = ['LinkedIn', 'Indeed', 'Naukri'];
  const departments = ['Engineering', 'Design', 'Marketing', 'Sales', 'Product'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">
              {job ? 'Edit Job Posting' : 'Create New Job Posting'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Job Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Senior Frontend Developer"
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full h-32 rounded-md border border-gray-300 shadow-sm p-3"
                placeholder="Enter detailed job description..."
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full rounded-md border border-gray-300 shadow-sm p-2"
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <Input
                label="Location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., New York, NY"
                required
              />
            </div>

            <Input
              label="Salary Range"
              value={formData.salary}
              onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
              placeholder="e.g., $100,000 - $130,000"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Posting Platforms
              </label>
              <div className="space-y-2">
                {platforms.map((platform) => (
                  <label key={platform} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.platforms.includes(platform)}
                      onChange={(e) => {
                        const newPlatforms = e.target.checked
                          ? [...formData.platforms, platform]
                          : formData.platforms.filter((p) => p !== platform);
                        setFormData({ ...formData, platforms: newPlatforms });
                      }}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{platform}</span>
                  </label>
                ))}
              </div>
            </div>

            <Input
              label="Expected Applications"
              type="number"
              value={formData.expectedApplications.toString()}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  expectedApplications: parseInt(e.target.value) || 0,
                })
              }
              placeholder="e.g., 50"
              required
            />

            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {job ? 'Update Job' : 'Post Job'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobPostingModal;