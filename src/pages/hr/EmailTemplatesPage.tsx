import React, { useState } from 'react';
import { Plus, Mail, MessageCircle, Edit, Trash2, Send, Copy } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Badge from '../../components/common/Badge';

interface Template {
  id: string;
  name: string;
  type: 'email' | 'whatsapp';
  category: 'interview' | 'offer' | 'rejection' | 'follow-up' | 'reminder';
  subject?: string;
  content: string;
  variables: string[];
  usageCount: number;
  lastUsed?: Date;
}

const EmailTemplatesPage: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: '1',
      name: 'Interview Reminder',
      type: 'email',
      category: 'reminder',
      subject: 'Interview Reminder - {{jobTitle}} Position',
      content: 'Dear {{candidateName}},\n\nThis is a friendly reminder about your upcoming interview for the {{jobTitle}} position scheduled for {{interviewDate}} at {{interviewTime}}.\n\nMeeting details:\n- Platform: {{platform}}\n- Duration: {{duration}}\n- Interviewer: {{interviewer}}\n\nPlease confirm your attendance.\n\nBest regards,\n{{hrName}}',
      variables: ['candidateName', 'jobTitle', 'interviewDate', 'interviewTime', 'platform', 'duration', 'interviewer', 'hrName'],
      usageCount: 45,
      lastUsed: new Date('2024-01-22')
    },
    {
      id: '2',
      name: 'Offer Letter Shared',
      type: 'email',
      category: 'offer',
      subject: 'Job Offer - {{jobTitle}} Position at {{companyName}}',
      content: 'Dear {{candidateName}},\n\nCongratulations! We are pleased to extend an offer for the {{jobTitle}} position at {{companyName}}.\n\nPlease find the detailed offer letter attached. We would love to have you join our team.\n\nKindly review the offer and let us know your decision by {{responseDeadline}}.\n\nWelcome to the team!\n\nBest regards,\n{{hrName}}',
      variables: ['candidateName', 'jobTitle', 'companyName', 'responseDeadline', 'hrName'],
      usageCount: 12,
      lastUsed: new Date('2024-01-20')
    },
    {
      id: '3',
      name: 'Interview Confirmation',
      type: 'whatsapp',
      category: 'interview',
      content: 'Hi {{candidateName}}! 👋\n\nYour interview for {{jobTitle}} is confirmed for {{interviewDate}} at {{interviewTime}}.\n\n📅 Date: {{interviewDate}}\n⏰ Time: {{interviewTime}}\n💻 Platform: {{platform}}\n\nGood luck! 🍀',
      variables: ['candidateName', 'jobTitle', 'interviewDate', 'interviewTime', 'platform'],
      usageCount: 28,
      lastUsed: new Date('2024-01-21')
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterType === 'all' || template.type === filterType) &&
    (filterCategory === 'all' || template.category === filterCategory)
  );

  const getCategoryBadgeVariant = (category: string) => {
    switch (category) {
      case 'interview': return 'primary';
      case 'offer': return 'success';
      case 'rejection': return 'error';
      case 'follow-up': return 'secondary';
      case 'reminder': return 'warning';
      default: return 'neutral';
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Email & WhatsApp Templates</h1>
          <p className="text-gray-600">Create and manage communication templates for candidates</p>
        </div>
        <Button
          variant="primary"
          leftIcon={<Plus size={18} />}
          onClick={() => setIsCreateModalOpen(true)}
        >
          Create Template
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Search templates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xl"
        />
        <select
          className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="email">Email</option>
          <option value="whatsapp">WhatsApp</option>
        </select>
        <select
          className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejection">Rejection</option>
          <option value="follow-up">Follow-up</option>
          <option value="reminder">Reminder</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-start">
                {template.type === 'email' ? (
                  <Mail className="w-5 h-5 text-blue-500 mr-3 mt-1" />
                ) : (
                  <MessageCircle className="w-5 h-5 text-green-500 mr-3 mt-1" />
                )}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{template.name}</h3>
                  {template.subject && (
                    <p className="text-gray-600 text-sm">Subject: {template.subject}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={getCategoryBadgeVariant(template.category)}
                  size="sm"
                >
                  {template.category}
                </Badge>
                <Badge variant="neutral" size="sm">
                  {template.type}
                </Badge>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-gray-700 whitespace-pre-line">
                {template.content.length > 200 
                  ? `${template.content.substring(0, 200)}...` 
                  : template.content
                }
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {template.variables.map((variable) => (
                <span
                  key={variable}
                  className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
                >
                  {`{{${variable}}}`}
                </span>
              ))}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                <span>Used {template.usageCount} times</span>
                {template.lastUsed && (
                  <span className="ml-4">Last used: {template.lastUsed.toLocaleDateString()}</span>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Copy size={16} />}
                >
                  Duplicate
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Edit size={16} />}
                  onClick={() => setEditingTemplate(template)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Send size={16} />}
                >
                  Use Template
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Create/Edit Template Modal */}
      {(isCreateModalOpen || editingTemplate) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingTemplate ? 'Edit Template' : 'Create New Template'}
            </h2>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <Input
                  label="Template Name"
                  placeholder="e.g., Interview Reminder"
                  defaultValue={editingTemplate?.name || ''}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type
                    </label>
                    <select 
                      className="w-full rounded-md border border-gray-300 shadow-sm p-2"
                      defaultValue={editingTemplate?.type || 'email'}
                    >
                      <option value="email">Email</option>
                      <option value="whatsapp">WhatsApp</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select 
                      className="w-full rounded-md border border-gray-300 shadow-sm p-2"
                      defaultValue={editingTemplate?.category || 'interview'}
                    >
                      <option value="interview">Interview</option>
                      <option value="offer">Offer</option>
                      <option value="rejection">Rejection</option>
                      <option value="follow-up">Follow-up</option>
                      <option value="reminder">Reminder</option>
                    </select>
                  </div>
                </div>
                
                <Input
                  label="Subject (Email only)"
                  placeholder="e.g., Interview Reminder - {{jobTitle}} Position"
                  defaultValue={editingTemplate?.subject || ''}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Available Variables
                </label>
                <div className="bg-gray-50 p-4 rounded-lg h-32 overflow-y-auto">
                  <div className="flex flex-wrap gap-2">
                    {['candidateName', 'jobTitle', 'companyName', 'interviewDate', 'interviewTime', 'platform', 'duration', 'interviewer', 'hrName', 'responseDeadline'].map((variable) => (
                      <button
                        key={variable}
                        className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full hover:bg-primary-200"
                        onClick={() => {
                          // Add variable to content
                        }}
                      >
                        {`{{${variable}}}`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Template Content
              </label>
              <textarea
                className="w-full h-64 rounded-md border border-gray-300 shadow-sm p-3"
                placeholder="Enter your template content here. Use {{variableName}} for dynamic content."
                defaultValue={editingTemplate?.content || ''}
              />
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setIsCreateModalOpen(false);
                  setEditingTemplate(null);
                }}
              >
                Cancel
              </Button>
              <Button variant="primary">
                {editingTemplate ? 'Update Template' : 'Create Template'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailTemplatesPage;