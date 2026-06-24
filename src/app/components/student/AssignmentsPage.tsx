import React from 'react';
import { DocumentText, Clock, TickSquare, CloseSquare, Star1, Teacher, Calendar1, Edit2, Send, DocumentDownload, DocumentUpload, Trash } from 'iconsax-react';
import { toast } from 'sonner';

interface AssignmentsPageProps {
  bookingHistory: any[];
  onExploreClick: () => void;
}

// Countdown Timer Component for Assignment Deadline
function DeadlineTimer({ deadline }: { deadline: Date }) {
  const [timeLeft, setTimeLeft] = React.useState('');
  const [isOverdue, setIsOverdue] = React.useState(false);

  React.useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = new Date(deadline).getTime();
      const difference = target - now;

      if (difference <= 0) {
        setIsOverdue(true);
        setTimeLeft('Overdue');
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h left`);
      } else if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m left`);
      } else {
        setTimeLeft(`${minutes} minutes left`);
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [deadline]);

  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
      isOverdue 
        ? 'bg-red-50 border border-red-500' 
        : 'bg-[#FD8E1F]/10 border border-[#FD8E1F]'
    }`}>
      <Clock 
        size={18} 
        variant="Bold" 
        className={isOverdue ? 'text-red-500' : 'text-[#FD8E1F]'} 
      />
      <div>
        <p className="text-xs text-[#6e7485]">Due in</p>
        <p className={`text-sm font-bold ${isOverdue ? 'text-red-500' : 'text-[#FD8E1F]'}`}>
          {timeLeft}
        </p>
      </div>
    </div>
  );
}

// Assignment Details Modal - File Upload Version
function AssignmentDetailsModal({ assignment, onClose, onSubmit }: any) {
  const [uploadedFiles, setUploadedFiles] = React.useState<File[]>([]);
  const [comment, setComment] = React.useState('');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

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

  const handleDownloadAssignment = () => {
    // Simulate downloading assignment file from tutor
    toast.success('Downloading assignment file...');
  };

  const handleSubmit = () => {
    if (uploadedFiles.length === 0) {
      toast.error('Please upload at least one file before submitting');
      return;
    }

    if (onSubmit) {
      onSubmit({
        assignmentId: assignment.id,
        files: uploadedFiles,
        comment: comment,
        submittedAt: new Date().toISOString()
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl z-10">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{assignment.title}</h2>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Teacher size={16} className="text-[#6e7485]" />
                  <span className="text-sm text-[#6e7485]">{assignment.tutor}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DocumentText size={16} className="text-[#6e7485]" />
                  <span className="text-sm text-[#6e7485]">{assignment.subject}</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <CloseSquare size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Download Assignment Button */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <DocumentDownload size={24} className="text-blue-600 shrink-0 mt-1" variant="Bold" />
                <div>
                  <h3 className="text-sm font-bold text-blue-900 mb-1">Assignment File</h3>
                  <p className="text-xs text-blue-700 mb-3">
                    Download the assignment document uploaded by your tutor to complete your work.
                  </p>
                  <p className="text-xs text-blue-600 font-medium">
                    📎 {assignment.title}.pdf
                  </p>
                </div>
              </div>
              <button
                onClick={handleDownloadAssignment}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm shrink-0"
              >
                Download
              </button>
            </div>
          </div>

          {/* Instructions */}
          {assignment.instructions && (
            <div className="bg-[#564FFD]/5 border border-[#564FFD]/20 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-[#564FFD] mb-2">Instructions</h3>
              <p className="text-sm text-gray-700">{assignment.instructions}</p>
            </div>
          )}

          {/* Comments Section */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Comments / Additional Notes
            </label>
            <textarea
              placeholder="Add any comments, questions, or notes about your submission..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6636] focus:border-transparent text-sm resize-none"
              rows={4}
            />
          </div>

          {/* File Upload Section */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-3">Upload Your Work</h3>
            
            {/* Upload Button */}
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center mb-4">
              <DocumentUpload size={40} className="text-gray-400 mx-auto mb-3" variant="Bulk" />
              <p className="text-sm font-medium text-gray-900 mb-1">Upload Documents and Files</p>
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
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 rounded-b-xl flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 bg-[#FF6636] text-white rounded-lg hover:bg-[#E55A2B] transition-colors font-semibold flex items-center gap-2"
          >
            <Send size={18} variant="Bold" />
            Submit Assignment
          </button>
        </div>
      </div>
    </div>
  );
}

// Completed Assignment Details Modal
function CompletedAssignmentModal({ assignment, onClose }: any) {
  const handleDownloadSubmission = () => {
    toast.success('Downloading your submission...');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl z-10">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{assignment.title}</h2>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Teacher size={16} className="text-[#6e7485]" />
                  <span className="text-sm text-[#6e7485]">{assignment.tutor}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DocumentText size={16} className="text-[#6e7485]" />
                  <span className="text-sm text-[#6e7485]">{assignment.subject}</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <CloseSquare size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Score Card */}
          <div className="bg-gradient-to-br from-[#FF6636] to-[#E55A2B] rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 mb-1">Your Score</p>
                <p className="text-4xl font-bold">{assignment.score}/{assignment.totalPoints}</p>
                <p className="text-sm opacity-90 mt-1">
                  {Math.round((assignment.score / assignment.totalPoints) * 100)}% - {assignment.grade}
                </p>
              </div>
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <Star1 size={32} variant="Bold" className="text-white" />
              </div>
            </div>
          </div>

          {/* Submission Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-[#6e7485] mb-1">Submitted On</p>
              <p className="text-sm font-semibold text-gray-900">
                {new Date(assignment.submittedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-[#6e7485] mb-1">Graded On</p>
              <p className="text-sm font-semibold text-gray-900">
                {new Date(assignment.gradedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>

          {/* Tutor Remarks/Feedback */}
          {assignment.remarks && (
            <div className="bg-[#23BD33]/5 border border-[#23BD33]/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Teacher size={20} className="text-[#23BD33]" variant="Bold" />
                <h3 className="text-sm font-semibold text-[#23BD33]">Tutor's Remarks</h3>
              </div>
              <p className="text-sm text-gray-700">{assignment.remarks}</p>
            </div>
          )}

          {/* Your Submission */}
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-3">Your Submission</h3>
            
            {/* Submitted Files */}
            {assignment.submittedFiles && assignment.submittedFiles.length > 0 && (
              <div className="space-y-2 mb-4">
                {assignment.submittedFiles.map((file: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <DocumentText size={20} className="text-[#FF6636]" variant="Bold" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{file.name}</p>
                        <p className="text-xs text-gray-500">{file.size}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleDownloadSubmission}
                      className="px-3 py-1.5 text-xs font-semibold text-[#FF6636] hover:bg-orange-50 rounded-lg transition-colors"
                    >
                      Download
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Submitted Comment */}
            {assignment.submittedComment && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-xs font-bold text-blue-900 mb-2">Your Comments:</p>
                <p className="text-sm text-blue-800">{assignment.submittedComment}</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 rounded-b-xl flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#FF6636] text-white rounded-lg hover:bg-[#E55A2B] transition-colors font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export function AssignmentsPage({ bookingHistory, onExploreClick }: AssignmentsPageProps) {
  const [activeTab, setActiveTab] = React.useState<'ongoing' | 'submitted' | 'completed'>('ongoing');
  const [selectedAssignment, setSelectedAssignment] = React.useState<any>(null);
  const [viewMode, setViewMode] = React.useState<'ongoing' | 'submitted' | 'completed' | null>(null);

  // Demo assignments tied to lessons
  const demoAssignments = React.useMemo(() => {
    const now = new Date();
    
    return {
      ongoing: [
        {
          id: 'assign-1',
          title: 'Organic Chemistry - Nomenclature & Isomerism',
          subject: 'Chemistry',
          tutor: 'Jane Cooper',
          tutorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
          topic: 'Organic Chemistry - Carbon Compounds',
          lessonDate: new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
          deadline: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
          totalPoints: 50,
          instructions: 'Download the assignment file and complete all tasks.',
          status: 'ongoing',
          assignedDate: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString()
        }
      ],
      submitted: [
        {
          id: 'assign-3',
          title: 'Chemical Bonding & Molecular Structure',
          subject: 'Chemistry',
          tutor: 'Jane Cooper',
          tutorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
          topic: 'Chemical Bonding',
          submittedAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          totalPoints: 40,
          status: 'submitted',
          assignedDate: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          instructions: 'Complete the assignment on chemical bonding concepts we covered in class.',
          submittedFiles: [
            { name: 'Chemical_Bonding_Answer.pdf', size: '2.3 MB' },
            { name: 'Lewis_Structures.jpg', size: '1.1 MB' }
          ],
          submittedComment: 'I have completed all the questions and included diagrams for the Lewis structures as requested.'
        }
      ],
      completed: [
        {
          id: 'assign-2',
          title: 'Introduction to Organic Chemistry',
          subject: 'Chemistry',
          tutor: 'Jane Cooper',
          tutorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
          topic: 'Introduction to Organic Chemistry',
          submittedAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          gradedAt: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString(),
          score: 42,
          totalPoints: 50,
          grade: 'A',
          remarks: 'Excellent work! You demonstrated a strong understanding of organic chemistry fundamentals. Your diagrams were well-labeled and your explanations were clear and concise. The structural formulas were accurately drawn. Keep up the great effort! For future assignments, try to include more real-world examples to strengthen your answers.',
          submittedFiles: [
            { name: 'Organic_Chemistry_Assignment.pdf', size: '3.2 MB' },
            { name: 'Structural_Formulas.docx', size: '856 KB' }
          ],
          submittedComment: 'I have answered all questions with diagrams and examples. Please review my structural formulas.',
          status: 'completed'
        }
      ]
    };
  }, []);

  const handleSubmitAssignment = (submission: any) => {
    console.log('Assignment submitted:', submission);
    toast.success('Assignment submitted successfully! Your tutor will grade it soon.');
  };

  const handleViewAssignment = (assignment: any, mode: 'ongoing' | 'submitted' | 'completed') => {
    setSelectedAssignment(assignment);
    setViewMode(mode);
  };

  const handleCloseModal = () => {
    setSelectedAssignment(null);
    setViewMode(null);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
          Assignments
        </h1>
        <p className="text-sm text-[#6e7485]">
          Complete your assignments and track your academic progress
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab('ongoing')}
            className={`pb-3 px-1 text-sm font-semibold transition-colors relative ${
              activeTab === 'ongoing'
                ? 'text-[#FF6636]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Ongoing Assignments
            {activeTab === 'ongoing' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6636]"></div>
            )}
            {demoAssignments.ongoing.length > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-[#FF6636] text-white text-xs rounded-full">
                {demoAssignments.ongoing.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('submitted')}
            className={`pb-3 px-1 text-sm font-semibold transition-colors relative ${
              activeTab === 'submitted'
                ? 'text-[#FF6636]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Submitted Assignments
            {activeTab === 'submitted' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6636]"></div>
            )}
            {demoAssignments.submitted.length > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-[#FF6636] text-white text-xs rounded-full">
                {demoAssignments.submitted.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('completed')}
            className={`pb-3 px-1 text-sm font-semibold transition-colors relative ${
              activeTab === 'completed'
                ? 'text-[#FF6636]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Completed Assignments
            {activeTab === 'completed' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6636]"></div>
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'ongoing' ? (
        demoAssignments.ongoing.length === 0 ? (
          <div className="text-center py-12 bg-white border border-[#e9eaf0] rounded-lg">
            <DocumentText className="w-16 h-16 text-gray-300 mx-auto mb-4" variant="Bulk" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Ongoing Assignments
            </h3>
            <p className="text-gray-500 mb-4">
              You don't have any pending assignments at the moment
            </p>
            <button 
              onClick={onExploreClick}
              className="px-6 py-2 bg-[#FF6636] text-white rounded-lg hover:bg-[#E55A2B] transition-colors"
            >
              Explore Lessons
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {demoAssignments.ongoing.map((assignment) => (
              <div key={assignment.id} className="bg-white border border-[#e9eaf0] rounded-lg p-6 hover:shadow-md transition-shadow">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h3 className="font-bold text-lg text-[#1d2026]">{assignment.title}</h3>
                      <span className="px-3 py-1 bg-[#FD8E1F]/10 text-[#FD8E1F] text-xs font-semibold rounded-full">
                        Pending
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <img 
                        src={assignment.tutorImage} 
                        alt={assignment.tutor}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <p className="text-sm text-[#6e7485]">{assignment.tutor} • {assignment.subject}</p>
                    </div>
                    <p className="text-xs text-[#8c94a3] mt-1">
                      Assigned on {new Date(assignment.assignedDate).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <DeadlineTimer deadline={assignment.deadline} />
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4 border-t border-gray-200">
                  <div>
                    <p className="text-xs text-[#6e7485] mb-1">Topic</p>
                    <p className="text-sm font-semibold text-[#1d2026]">{assignment.topic}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#6e7485] mb-1">Total Points</p>
                    <p className="text-sm font-semibold text-[#1d2026]">{assignment.totalPoints}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#6e7485] mb-1">Due Date</p>
                    <p className="text-sm font-semibold text-[#1d2026]">
                      {new Date(assignment.deadline).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>

                {/* Instructions Preview */}
                {assignment.instructions && (
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-xs text-[#6e7485] mb-1 font-medium">INSTRUCTIONS:</p>
                    <p className="text-sm text-gray-700 line-clamp-2">{assignment.instructions}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="pt-4 border-t border-gray-200 mt-4">
                  <button
                    onClick={() => handleViewAssignment(assignment, 'ongoing')}
                    className="w-full sm:w-auto px-6 py-2.5 bg-[#FF6636] text-white rounded-lg hover:bg-[#E55A2B] transition-colors font-semibold flex items-center justify-center gap-2"
                  >
                    <Edit2 size={18} variant="Bold" />
                    Start Assignment
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      ) : activeTab === 'submitted' ? (
        // Submitted Tab
        demoAssignments.submitted.length === 0 ? (
          <div className="text-center py-12 bg-white border border-[#e9eaf0] rounded-lg">
            <TickSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" variant="Bulk" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Submitted Assignments
            </h3>
            <p className="text-gray-500">
              Your submitted assignments will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {demoAssignments.submitted.map((assignment) => (
              <div key={assignment.id} className="bg-white border border-[#e9eaf0] rounded-lg p-6 hover:shadow-md transition-shadow">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h3 className="font-bold text-lg text-[#1d2026]">{assignment.title}</h3>
                      <span className="px-3 py-1 bg-[#FF6636]/10 text-[#FF6636] text-xs font-semibold rounded-full">
                        Submitted
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <img 
                        src={assignment.tutorImage} 
                        alt={assignment.tutor}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <p className="text-sm text-[#6e7485]">{assignment.tutor} • {assignment.subject}</p>
                    </div>
                    <p className="text-xs text-[#8c94a3] mt-1">
                      Submitted on {new Date(assignment.submittedAt).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  
                  {/* Awaiting Grading Badge */}
                  <div className="bg-[#FD8E1F]/10 px-4 py-3 rounded-lg border-2 border-[#FD8E1F] text-center min-w-[120px]">
                    <Clock size={24} className="text-[#FD8E1F] mx-auto mb-1" variant="Bold" />
                    <p className="text-xs text-[#FD8E1F] font-semibold">Awaiting Grade</p>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4 py-4 border-t border-gray-200">
                  <div>
                    <p className="text-xs text-[#6e7485] mb-1">Topic</p>
                    <p className="text-sm font-semibold text-[#1d2026]">{assignment.topic}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#6e7485] mb-1">Total Points</p>
                    <p className="text-sm font-semibold text-[#1d2026]">{assignment.totalPoints}</p>
                  </div>
                </div>

                {/* Submitted Files Preview */}
                {assignment.submittedFiles && assignment.submittedFiles.length > 0 && (
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-xs text-[#6e7485] mb-2 font-medium">SUBMITTED FILES:</p>
                    <div className="flex flex-wrap gap-2">
                      {assignment.submittedFiles.map((file: any, idx: number) => (
                        <div key={idx} className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs font-medium flex items-center gap-1">
                          <DocumentText size={14} variant="Bold" />
                          {file.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-200 mt-4">
                  <button
                    onClick={() => handleViewAssignment(assignment, 'submitted')}
                    className="w-full sm:w-auto px-6 py-2.5 border-2 border-[#FF6636] text-[#FF6636] rounded-lg hover:bg-orange-50 transition-colors font-semibold"
                  >
                    View Submission
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        // Completed Tab
        demoAssignments.completed.length === 0 ? (
          <div className="text-center py-12 bg-white border border-[#e9eaf0] rounded-lg">
            <Star1 className="w-16 h-16 text-gray-300 mx-auto mb-4" variant="Bulk" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Completed Assignments
            </h3>
            <p className="text-gray-500">
              Your graded assignments will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {demoAssignments.completed.map((assignment) => (
              <div key={assignment.id} className="bg-white border border-green-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h3 className="font-bold text-lg text-[#1d2026]">{assignment.title}</h3>
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full flex items-center gap-1">
                        <TickSquare size={14} variant="Bold" />
                        Graded
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <img 
                        src={assignment.tutorImage} 
                        alt={assignment.tutor}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <p className="text-sm text-[#6e7485]">{assignment.tutor} • {assignment.subject}</p>
                    </div>
                    <p className="text-xs text-[#8c94a3] mt-1">
                      Graded on {new Date(assignment.gradedAt).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  
                  {/* Score Badge */}
                  <div className="bg-gradient-to-br from-[#FF6636] to-[#E55A2B] px-6 py-3 rounded-lg text-center min-w-[120px]">
                    <p className="text-xs text-white opacity-90 mb-1">Score</p>
                    <p className="text-2xl font-bold text-white">{assignment.score}/{assignment.totalPoints}</p>
                    <p className="text-xs text-white opacity-90 mt-1">Grade: {assignment.grade}</p>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4 py-4 border-t border-gray-200">
                  <div>
                    <p className="text-xs text-[#6e7485] mb-1">Topic</p>
                    <p className="text-sm font-semibold text-[#1d2026]">{assignment.topic}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#6e7485] mb-1">Percentage</p>
                    <p className="text-sm font-semibold text-[#1d2026]">
                      {Math.round((assignment.score / assignment.totalPoints) * 100)}%
                    </p>
                  </div>
                </div>

                {/* Remarks Preview */}
                {assignment.remarks && (
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-xs text-[#6e7485] mb-1 font-medium">TUTOR'S REMARKS:</p>
                    <p className="text-sm text-gray-700 line-clamp-2">{assignment.remarks}</p>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-200 mt-4">
                  <button
                    onClick={() => handleViewAssignment(assignment, 'completed')}
                    className="w-full sm:w-auto px-6 py-2.5 bg-[#FF6636] text-white rounded-lg hover:bg-[#E55A2B] transition-colors font-semibold"
                  >
                    View Results
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {/* Modals */}
      {selectedAssignment && viewMode === 'ongoing' && (
        <AssignmentDetailsModal
          assignment={selectedAssignment}
          onClose={handleCloseModal}
          onSubmit={handleSubmitAssignment}
        />
      )}

      {selectedAssignment && (viewMode === 'submitted' || viewMode === 'completed') && (
        <CompletedAssignmentModal
          assignment={selectedAssignment}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
