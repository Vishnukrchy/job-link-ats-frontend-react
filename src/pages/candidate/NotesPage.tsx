import React, { useState } from 'react';
import { Plus, Search, Tag, Calendar, Star } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Badge from '../../components/common/Badge';

interface Note {
  id: string;
  title: string;
  content: string;
  date: Date;
  tags: string[];
  isPinned: boolean;
  applicationId?: string;
}

const NotesPage: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Technical Interview Prep',
      content: 'Review system design patterns, practice coding problems on LeetCode, prepare questions about team structure and development process.',
      date: new Date('2024-01-15'),
      tags: ['interview', 'technical'],
      isPinned: true,
      applicationId: 'APP001'
    },
    {
      id: '2',
      title: 'Follow-up Email Draft',
      content: 'Thank you for the opportunity to interview for the Senior Developer position. I enjoyed learning more about the team's challenges and vision...',
      date: new Date('2024-01-18'),
      tags: ['follow-up', 'email'],
      isPinned: false,
      applicationId: 'APP002'
    },
    {
      id: '3',
      title: 'Company Research Notes',
      content: 'Recent product launches, tech stack includes React/Node.js, growing team size, international expansion planned for next quarter.',
      date: new Date('2024-01-20'),
      tags: ['research', 'company-info'],
      isPinned: true
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(notes.flatMap(note => note.tags)));

  const filteredNotes = notes
    .filter(note => 
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(note => !selectedTag || note.tags.includes(selectedTag));

  const pinnedNotes = filteredNotes.filter(note => note.isPinned);
  const unpinnedNotes = filteredNotes.filter(note => !note.isPinned);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notes & Follow-up</h1>
          <p className="text-gray-600">Keep track of important information and follow-ups</p>
        </div>
        <Button
          variant="primary"
          leftIcon={<Plus size={18} />}
        >
          Add Note
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="mb-6">
            <Input
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="text-gray-400" size={20} />}
            />
          </div>

          {pinnedNotes.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Star className="w-5 h-5 text-yellow-500 mr-2" />
                Pinned Notes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pinnedNotes.map(note => (
                  <Card key={note.id} className="hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-medium text-gray-900">{note.title}</h3>
                      <Star className="w-5 h-5 text-yellow-500" fill="currentColor" />
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{note.content}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {note.tags.map(tag => (
                          <Badge key={tag} variant="secondary" size="sm">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {note.date.toLocaleDateString()}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          <div>
            <h2 className="text-lg font-semibold mb-4">All Notes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {unpinnedNotes.map(note => (
                <Card key={note.id} className="hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">{note.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{note.content}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {note.tags.map(tag => (
                        <Badge key={tag} variant="secondary" size="sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {note.date.toLocaleDateString()}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div>
          <Card>
            <h3 className="text-lg font-semibold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  className={`flex items-center px-3 py-1 rounded-full text-sm ${
                    selectedTag === tag
                      ? 'bg-primary-100 text-primary-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Tag className="w-4 h-4 mr-1" />
                  {tag}
                </button>
              ))}
            </div>
          </Card>

          <Card className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Notes</span>
                <span className="font-medium">{notes.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Pinned Notes</span>
                <span className="font-medium">{notes.filter(n => n.isPinned).length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Tags Used</span>
                <span className="font-medium">{allTags.length}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NotesPage;