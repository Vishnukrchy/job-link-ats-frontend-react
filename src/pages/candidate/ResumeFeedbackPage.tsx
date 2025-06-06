import React, { useState } from 'react';
import { FileText, Star, TrendingUp, AlertCircle, CheckCircle, Download } from 'lucide-react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';

interface FeedbackItem {
  id: string;
  company: string;
  position: string;
  date: Date;
  overallRating: number;
  feedback: {
    strengths: string[];
    improvements: string[];
    suggestions: string[];
  };
  hrName: string;
  status: 'pending' | 'received';
}

const ResumeFeedbackPage: React.FC = () => {
  const [feedbackItems] = useState<FeedbackItem[]>([
    {
      id: '1',
      company: 'TechCorp Solutions',
      position: 'Senior Frontend Developer',
      date: new Date('2024-01-20'),
      overallRating: 4.2,
      feedback: {
        strengths: [
          'Strong React.js experience',
          'Good understanding of modern JavaScript',
          'Relevant project portfolio'
        ],
        improvements: [
          'Add more details about system design experience',
          'Include specific metrics and achievements',
          'Highlight leadership experience'
        ],
        suggestions: [
          'Consider adding TypeScript certification',
          'Include more backend technology exposure',
          'Add team collaboration examples'
        ]
      },
      hrName: 'Sarah Johnson',
      status: 'received'
    },
    {
      id: '2',
      company: 'StartupXYZ',
      position: 'Full Stack Developer',
      date: new Date('2024-01-18'),
      overallRating: 3.8,
      feedback: {
        strengths: [
          'Diverse technology stack',
          'Good problem-solving approach',
          'Clear project descriptions'
        ],
        improvements: [
          'More focus on scalability experience',
          'Add database optimization examples',
          'Include testing methodology details'
        ],
        suggestions: [
          'Consider cloud platform certifications',
          'Add DevOps experience',
          'Include performance optimization examples'
        ]
      },
      hrName: 'Mike Chen',
      status: 'received'
    },
    {
      id: '3',
      company: 'InnovateLabs',
      position: 'Frontend Developer',
      date: new Date('2024-01-22'),
      overallRating: 0,
      feedback: {
        strengths: [],
        improvements: [],
        suggestions: []
      },
      hrName: 'Emily Davis',
      status: 'pending'
    }
  ]);

  const averageRating = feedbackItems
    .filter(item => item.status === 'received')
    .reduce((sum, item) => sum + item.overallRating, 0) / 
    feedbackItems.filter(item => item.status === 'received').length;

  const totalFeedback = feedbackItems.filter(item => item.status === 'received').length;
  const pendingFeedback = feedbackItems.filter(item => item.status === 'pending').length;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Resume Feedback</h1>
          <p className="text-gray-600">View feedback and suggestions from HR teams</p>
        </div>
        <Button
          variant="outline"
          leftIcon={<Download size={18} />}
        >
          Download Report
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="text-center p-6">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-primary-100 text-primary-600">
              <Star size={24} />
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2">Average Rating</h3>
          <p className="text-3xl font-bold text-primary-600">
            {averageRating ? averageRating.toFixed(1) : 'N/A'}
          </p>
          <p className="text-sm text-gray-500">out of 5.0</p>
        </Card>

        <Card className="text-center p-6">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-success-50 text-success-700">
              <CheckCircle size={24} />
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2">Feedback Received</h3>
          <p className="text-3xl font-bold text-success-700">{totalFeedback}</p>
          <p className="text-sm text-gray-500">companies</p>
        </Card>

        <Card className="text-center p-6">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-warning-50 text-warning-700">
              <AlertCircle size={24} />
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2">Pending Feedback</h3>
          <p className="text-3xl font-bold text-warning-700">{pendingFeedback}</p>
          <p className="text-sm text-gray-500">awaiting response</p>
        </Card>
      </div>

      {/* Feedback Items */}
      <div className="space-y-6">
        {feedbackItems.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-start">
                <FileText className="w-5 h-5 text-gray-400 mr-3 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{item.company}</h3>
                  <p className="text-gray-600">{item.position}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {item.status === 'received' && (
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="font-medium">{item.overallRating.toFixed(1)}</span>
                  </div>
                )}
                <Badge
                  variant={item.status === 'received' ? 'success' : 'warning'}
                  size="sm"
                >
                  {item.status}
                </Badge>
              </div>
            </div>

            {item.status === 'received' ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium text-green-700 mb-3 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Strengths
                  </h4>
                  <ul className="space-y-2">
                    {item.feedback.strengths.map((strength, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-orange-700 mb-3 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Areas for Improvement
                  </h4>
                  <ul className="space-y-2">
                    {item.feedback.improvements.map((improvement, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start">
                        <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {improvement}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-blue-700 mb-3 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Suggestions
                  </h4>
                  <ul className="space-y-2">
                    {item.feedback.suggestions.map((suggestion, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Feedback pending from {item.hrName}</p>
                <p className="text-sm text-gray-500">Applied on {item.date.toLocaleDateString()}</p>
              </div>
            )}

            <div className="flex justify-between items-center pt-4 border-t border-gray-200 mt-6">
              <div className="text-sm text-gray-500">
                <span>Feedback by {item.hrName}</span>
                <span className="ml-4">{item.date.toLocaleDateString()}</span>
              </div>
              {item.status === 'received' && (
                <Button variant="outline" size="sm">
                  View Full Report
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ResumeFeedbackPage;