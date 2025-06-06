import React, { useState } from 'react';
import { Plus, Edit, Trash2, Tag, Search } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Badge from '../../components/common/Badge';

interface CandidateTag {
  id: string;
  name: string;
  color: string;
  description: string;
  candidateCount: number;
  createdAt: Date;
}

const TagsManagementPage: React.FC = () => {
  const [tags, setTags] = useState<CandidateTag[]>([
    {
      id: '1',
      name: 'Star Performer',
      color: 'success',
      description: 'Exceptional candidates with outstanding performance',
      candidateCount: 12,
      createdAt: new Date('2024-01-15')
    },
    {
      id: '2',
      name: 'Tech Round Cleared',
      color: 'primary',
      description: 'Candidates who have successfully passed technical interviews',
      candidateCount: 28,
      createdAt: new Date('2024-01-10')
    },
    {
      id: '3',
      name: 'Cultural Fit',
      color: 'accent',
      description: 'Candidates who align well with company culture',
      candidateCount: 15,
      createdAt: new Date('2024-01-08')
    },
    {
      id: '4',
      name: 'Immediate Joiner',
      color: 'warning',
      description: 'Candidates available to join immediately',
      candidateCount: 8,
      createdAt: new Date('2024-01-05')
    },
    {
      id: '5',
      name: 'Remote Preferred',
      color: 'secondary',
      description: 'Candidates who prefer remote work arrangements',
      candidateCount: 22,
      createdAt: new Date('2024-01-03')
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<CandidateTag | null>(null);

  const filteredTags = tags.filter(tag =>
    tag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tag.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteTag = (tagId: string) => {
    setTags(tags.filter(tag => tag.id !== tagId));
  };

  const colorOptions = [
    { value: 'primary', label: 'Blue', class: 'bg-primary-500' },
    { value: 'secondary', label: 'Cyan', class: 'bg-secondary-500' },
    { value: 'accent', label: 'Yellow', class: 'bg-accent-500' },
    { value: 'success', label: 'Green', class: 'bg-success-500' },
    { value: 'warning', label: 'Orange', class: 'bg-warning-500' },
    { value: 'error', label: 'Red', class: 'bg-error-500' }
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tags Management</h1>
          <p className="text-gray-600">Create and manage custom tags for candidate organization</p>
        </div>
        <Button
          variant="primary"
          leftIcon={<Plus size={18} />}
          onClick={() => setIsCreateModalOpen(true)}
        >
          Create Tag
        </Button>
      </div>

      <div className="mb-6">
        <Input
          placeholder="Search tags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          leftIcon={<Search className="text-gray-400\" size={20} />}
          className="max-w-xl"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTags.map((tag) => (
          <Card key={tag.id} className="hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <Tag className="w-5 h-5 text-gray-400 mr-2" />
                <Badge variant={tag.color as any} size="md">
                  {tag.name}
                </Badge>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingTag(tag)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDeleteTag(tag.id)}
                  className="p-1 text-gray-400 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4">{tag.description}</p>

            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>{tag.candidateCount} candidates</span>
              <span>Created {tag.createdAt.toLocaleDateString()}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Create/Edit Tag Modal */}
      {(isCreateModalOpen || editingTag) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingTag ? 'Edit Tag' : 'Create New Tag'}
            </h2>
            
            <div className="space-y-4">
              <Input
                label="Tag Name"
                placeholder="e.g., Star Performer"
                defaultValue={editingTag?.name || ''}
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tag Color
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      className={`p-3 rounded-lg border-2 ${
                        (editingTag?.color || 'primary') === color.value
                          ? 'border-gray-400'
                          : 'border-gray-200'
                      } hover:border-gray-300`}
                    >
                      <div className={`w-6 h-6 rounded-full ${color.class} mx-auto mb-1`}></div>
                      <span className="text-xs text-gray-600">{color.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full rounded-md border border-gray-300 shadow-sm p-3"
                  rows={3}
                  placeholder="Describe when to use this tag..."
                  defaultValue={editingTag?.description || ''}
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setIsCreateModalOpen(false);
                  setEditingTag(null);
                }}
              >
                Cancel
              </Button>
              <Button variant="primary">
                {editingTag ? 'Update Tag' : 'Create Tag'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TagsManagementPage;