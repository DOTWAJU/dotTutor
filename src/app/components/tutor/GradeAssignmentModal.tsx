import React from 'react';
import { CloseCircle, DocumentText, DocumentDownload, Star1, Teacher } from 'iconsax-react';
import { toast } from 'sonner';

interface GradeAssignmentModalProps {
  assignment: {
    id: string;
    title: string;
    studentName: string;
    subject: string;
    submittedDate?: Date;
    totalPoints?: number;
    submittedFiles?: Array<{ name: string; size: string }>;
    submittedComment?: string;
  } | null;
  onClose: () => void;
  onSubmit?: (grading: any) => void;
}

export function GradeAssignmentModal({ assignment, onClose, onSubmit }: GradeAssignmentModalProps) {
  const [score, setScore] = React.useState(0);
  const [remarks, setRemarks] = React.useState('');

  if (!assignment) return null;

  const totalPoints = assignment.totalPoints ?? 100;

  const handleDownloadFile = (fileName: string) => {
    toast.success(`Downloading ${fileName}...`);
  };

  const calculateGrade = () => {
    const percentage = (score / totalPoints) * 100;
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
  };

  const handleSubmit = () => {
    if (score < 0 || score > totalPoints) {
      toast.error(`Score must be between 0 and ${totalPoints}`);
      return;
    }
    if (!remarks.trim()) {
      toast.error('Please provide remarks/feedback for the student');
      return;
    }

    const grading = {
      assignmentId: assignment.id,
      score,
      totalPoints: totalPoints,
      grade: calculateGrade(),
      remarks,
      gradedAt: new Date().toISOString(),
    };

    onSubmit && onSubmit(grading);
    toast.success('Assignment graded successfully!', {
      description: `${assignment.studentName} has been notified of their grade`,
      duration: 3000,
    });
    onClose();
  };

  const percentage = (score / totalPoints) * 100;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl z-10">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Grade Assignment</h2>
              <p className="text-sm text-gray-600">
                {assignment.studentName} - {assignment.subject}
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
          {/* Assignment Info */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <h3 className="font-bold text-gray-900 mb-3">{assignment.title}</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600 mb-1">Submitted On</p>
                <p className="font-semibold text-gray-900">
                  {new Date(assignment.submittedDate ?? Date.now()).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Total Points</p>
                <p className="font-semibold text-gray-900">{totalPoints} pts</p>
              </div>
            </div>
          </div>

          {/* Student's Submission */}
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-3">Student's Submission</h3>

            {/* Submitted Files */}
            {assignment.submittedFiles && assignment.submittedFiles.length > 0 && (
              <div className="space-y-2 mb-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">Submitted Files:</p>
                {assignment.submittedFiles.map((file, index) => (
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
                      onClick={() => handleDownloadFile(file.name)}
                      className="px-3 py-1.5 text-xs font-semibold text-[#FF6636] hover:bg-orange-50 rounded-lg transition-colors flex items-center gap-1"
                    >
                      <DocumentDownload size={16} />
                      Download
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Student's Comment */}
            {assignment.submittedComment && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-xs font-bold text-blue-900 mb-2">Student's Comments:</p>
                <p className="text-sm text-blue-800">{assignment.submittedComment}</p>
              </div>
            )}
          </div>

          {/* Grading Section */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Grade This Assignment</h3>

            {/* Score Input */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Score (out of {totalPoints} points) *
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  value={score}
                  onChange={(e) => setScore(Math.max(0, Math.min(totalPoints, parseInt(e.target.value) || 0)))}
                  min="0"
                  max={totalPoints}
                  className="w-32 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6636] focus:border-transparent text-center text-lg font-bold"
                />
                <span className="text-gray-600 text-lg font-medium">/ {totalPoints}</span>
                
                {/* Live Grade Preview */}
                {score > 0 && (
                  <div className="flex items-center gap-3 ml-4 px-4 py-2 bg-gradient-to-r from-[#FF6636] to-[#E55A2B] rounded-lg text-white">
                    <div>
                      <p className="text-xs opacity-90">Grade</p>
                      <p className="text-xl font-bold">{calculateGrade()}</p>
                    </div>
                    <div className="border-l border-white/30 pl-3">
                      <p className="text-xs opacity-90">Percentage</p>
                      <p className="text-xl font-bold">{percentage.toFixed(1)}%</p>
                    </div>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Enter the points earned by the student
              </p>
            </div>

            {/* Remarks/Feedback */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Remarks / Feedback *
              </label>
              <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Provide detailed feedback about the student's work. Mention what they did well and areas for improvement..."
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#FF6636] focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-2">
                This feedback will be visible to the student
              </p>
            </div>
          </div>

          {/* Preview Card */}
          {score > 0 && remarks.trim() && (
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Star1 size={20} className="text-green-600" variant="Bold" />
                <p className="text-sm font-bold text-green-900">Preview: How the student will see this</p>
              </div>
              <div className="bg-white rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600">Score</p>
                    <p className="text-2xl font-bold text-[#FF6636]">{score}/{totalPoints}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-600">Grade</p>
                    <p className="text-2xl font-bold text-[#FF6636]">{calculateGrade()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-600">Percentage</p>
                    <p className="text-2xl font-bold text-[#FF6636]">{percentage.toFixed(1)}%</p>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Teacher size={16} className="text-green-600" variant="Bold" />
                    <p className="text-xs font-bold text-green-900">Tutor's Remarks:</p>
                  </div>
                  <p className="text-sm text-gray-700">{remarks}</p>
                </div>
              </div>
            </div>
          )}
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
            <Star1 size={20} variant="Bold" />
            Submit Grade
          </button>
        </div>
      </div>
    </div>
  );
}
