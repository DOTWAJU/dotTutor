import React from 'react';
import { CloseCircle, DocumentUpload, Trash, DocumentText } from 'iconsax-react';
import { toast } from 'sonner';

interface CreateAssignmentModalProps {
  lesson: {
    studentName: string;
    subject: string;
    topic: string;
  } | null;
  onClose: () => void;
  onSubmit?: (assignment: any) => void;
}

export function CreateAssignmentModal({ lesson, onClose, onSubmit }: CreateAssignmentModalProps) {
  const [title, setTitle] = React.useState('');
  const [instructions, setInstructions] = React.useState('');
  const [dueDate, setDueDate] = React.useState('');
  const [totalPoints, setTotalPoints] = React.useState(100);
  const [uploadedFiles, setUploadedFiles] = React.useState<File[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  if (!lesson) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      setUploadedFiles(prev => [...prev, ...newFiles]);
      toast.success(`${newFiles.length} file(s) added successfully!`);
    }
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    toast.info('File removed');
  };

  const handleSubmit = () => {
    // Validation
    if (!title.trim()) {
      toast.error('Please enter an assignment title');
      return;
    }
    if (!dueDate) {
      toast.error('Please select a due date');
      return;
    }
    if (uploadedFiles.length === 0) {
      toast.error('Please upload at least one assignment file');
      return;
    }

    const assignment = {
      id: Date.now().toString(),
      title,
      instructions,
      dueDate: new Date(dueDate),
      totalPoints,
      files: uploadedFiles,
      tutor: 'You',
      subject: lesson.subject,
      studentName: lesson.studentName,
      createdAt: new Date(),
      status: 'pending'
    };

    onSubmit && onSubmit(assignment);
    toast.success('Assignment created successfully!', {
      description: `Assignment "${title}" has been assigned to ${lesson.studentName}`,
      duration: 3000,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl z-10">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Create Assignment</h2>
              <p className="text-sm text-gray-600">
                For {lesson.studentName} - {lesson.subject}: {lesson.topic}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <CloseCircle className="w-6 h-6 text-gray-600" variant="Bold" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Assignment Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Calculus Practice Problems - Set 1"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6636] focus:border-transparent"
            />
          </div>

          {/* Instructions */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Instructions
            </label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Provide instructions for completing this assignment. Describe what the student needs to do, any special requirements, and how they should submit their work..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#FF6636] focus:border-transparent"
            />
          </div>

          {/* Due Date and Total Points */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Due Date *
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6636] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Total Points *
              </label>
              <input
                type="number"
                value={totalPoints}
                onChange={(e) => setTotalPoints(parseInt(e.target.value) || 0)}
                min="1"
                placeholder="100"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6636] focus:border-transparent"
              />
            </div>
          </div>

          {/* File Upload Section */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Upload Assignment Files *
            </label>
            <p className="text-xs text-gray-600 mb-3">
              Upload the assignment document(s) that students will need to download and complete. This can include PDFs, Word documents, worksheets, or any supporting materials.
            </p>
            
            {/* Upload Button */}
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center mb-4">
              <DocumentUpload size={40} className="text-gray-400 mx-auto mb-3" variant="Bulk" />
              <p className="text-sm font-medium text-gray-900 mb-1">Upload Assignment Documents</p>
              <p className="text-xs text-[#6e7485] mb-4">
                PDF, DOC, DOCX, images, or any file type (Max 25MB per file)
              </p>
              <label className="cursor-pointer">
                <span className="px-6 py-2.5 bg-[#FF6636] text-white rounded-lg hover:bg-[#E55A2B] transition-colors inline-block font-semibold text-sm">
                  Choose Files
                </span>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  multiple
                  onChange={handleFileUpload}
                />
              </label>
              <p className="text-xs text-gray-500 mt-3">
                You can upload multiple files
              </p>
            </div>

            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-900 mb-2">
                  Uploaded Files ({uploadedFiles.length})
                </p>
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <DocumentText size={20} className="text-green-600 shrink-0" variant="Bold" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                        <p className="text-xs text-gray-500">
                          {(file.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveFile(index)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                      title="Remove file"
                    >
                      <Trash size={18} className="text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 rounded-b-2xl flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-[#FF6636] text-white rounded-xl font-semibold hover:bg-[#E55A2B] transition-all flex items-center gap-2"
          >
            <DocumentText size={20} variant="Bold" />
            Create Assignment
          </button>
        </div>
      </div>
    </div>
  );
}
