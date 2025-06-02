import React, { useState } from 'react';
import { Application } from '../../types';
import Button from '../common/Button';
import Input from '../common/Input';

interface NotesSectionProps {
  selectedApplicationId: string | null;
  applications: Application[];
}

const NotesSection: React.FC<NotesSectionProps> = ({
  selectedApplicationId,
  applications,
}) => {
  const [newNote, setNewNote] = useState('');

  const selectedApplication = applications.find(
    (app) => app.id === selectedApplicationId
  );

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle adding new note
    console.log('Adding note:', newNote);
    setNewNote('');
  };

  return (
    <div>
      <form onSubmit={handleAddNote} className="mb-4">
        <Input
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add a new note..."
          className="mb-2"
        />
        <Button type="submit" variant="primary" size="sm" fullWidth>
          Add Note
        </Button>
      </form>

      <div className="space-y-4">
        {selectedApplication?.notes?.map((note, index) => (
          <div
            key={index}
            className="bg-gray-50 p-3 rounded-lg"
          >
            <p className="text-sm text-gray-600">{note}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesSection;