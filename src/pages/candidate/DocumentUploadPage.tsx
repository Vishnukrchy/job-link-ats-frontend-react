import React, { useState } from 'react';
import { Upload, FileText, Download, Trash2, Eye, Plus } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

interface Document {
  id: string;
  name: string;
  type: 'resume' | 'cover-letter' | 'certificate' | 'portfolio' | 'other';
  size: string;
  uploadDate: Date;
  isShared: boolean;
  sharedWith: string[];
}

const DocumentUploadPage: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Resume_John_Doe_2024.pdf',
      type: 'resume',
      size: '245 KB',
      uploadDate: new Date('2024-01-15'),
      isShared: true,
      sharedWith: ['TechCorp Solutions', 'StartupXYZ']
    },
    {
      id: '2',
      name: 'Cover_Letter_Frontend_Developer.pdf',
      type: 'cover-letter',
      size: '180 KB',
      uploadDate: new Date('2024-01-18'),
      isShared: false,
      sharedWith: []
    },
    {
      id: '3',
      name: 'React_Developer_Certificate.pdf',
      type: 'certificate',
      size: '320 KB',
      uploadDate: new Date('2024-01-10'),
      isShared: true,
      sharedWith: ['TechCorp Solutions']
    },
    {
      id: '4',
      name: 'Portfolio_Projects_2024.pdf',
      type: 'portfolio',
      size: '1.2 MB',
      uploadDate: new Date('2024-01-20'),
      isShared: false,
      sharedWith: []
    }
  ]);

  const [dragActive, setDragActive] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('resume');

  const documentTypes = [
    { value: 'resume', label: 'Resume', color: 'primary' },
    { value: 'cover-letter', label: 'Cover Letter', color: 'secondary' },
    { value: 'certificate', label: 'Certificate', color: 'success' },
    { value: 'portfolio', label: 'Portfolio', color: 'accent' },
    { value: 'other', label: 'Other', color: 'neutral' }
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files: FileList) => {
    // Handle file upload logic here
    console.log('Files to upload:', files);
  };

  const getTypeVariant = (type: string) => {
    const typeConfig = documentTypes.find(t => t.value === type);
    return typeConfig?.color as any || 'neutral';
  };

  const handleDelete = (documentId: string) => {
    setDocuments(documents.filter(doc => doc.id !== documentId));
  };

  const toggleShare = (documentId: string) => {
    setDocuments(documents.map(doc => 
      doc.id === documentId 
        ? { ...doc, isShared: !doc.isShared }
        : doc
    ));
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Document Upload</h1>
        <p className="text-gray-600">Upload and manage your professional documents</p>
      </div>

      {/* Upload Area */}
      <Card className="mb-8">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive 
              ? 'border-primary-500 bg-primary-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Drop files here or click to upload
          </h3>
          <p className="text-gray-600 mb-4">
            Support for PDF, DOC, DOCX files up to 10MB
          </p>
          
          <div className="flex items-center justify-center gap-4 mb-4">
            <select
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {documentTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            <Button
              variant="primary"
              leftIcon={<Plus size={18} />}
              onClick={() => document.getElementById('file-input')?.click()}
            >
              Choose Files
            </Button>
          </div>
          
          <input
            id="file-input"
            type="file"
            multiple
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={(e) => e.target.files && handleFiles(e.target.files)}
          />
        </div>
      </Card>

      {/* Document List */}
      <div className="grid grid-cols-1 gap-4">
        {documents.map((document) => (
          <Card key={document.id} className="hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="w-8 h-8 text-gray-400 mr-4" />
                <div>
                  <h3 className="font-medium text-gray-900">{document.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{document.size}</span>
                    <span>Uploaded {document.uploadDate.toLocaleDateString()}</span>
                    <Badge variant={getTypeVariant(document.type)} size="sm">
                      {documentTypes.find(t => t.value === document.type)?.label}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {document.isShared && (
                  <Badge variant="success\" size="sm">
                    Shared with {document.sharedWith.length} companies
                  </Badge>
                )}
                
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<Eye size={16} />}
                >
                  Preview
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<Download size={16} />}
                >
                  Download
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleShare(document.id)}
                  className={document.isShared ? 'text-green-600' : 'text-gray-600'}
                >
                  {document.isShared ? 'Shared' : 'Share'}
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<Trash2 size={16} />}
                  onClick={() => handleDelete(document.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  Delete
                </Button>
              </div>
            </div>
            
            {document.sharedWith.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Shared with: {document.sharedWith.join(', ')}
                </p>
              </div>
            )}
          </Card>
        ))}
      </div>

      {documents.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No documents uploaded</h3>
          <p className="text-gray-600">Upload your first document to get started</p>
        </div>
      )}
    </div>
  );
};

export default DocumentUploadPage;