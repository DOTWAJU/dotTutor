import React from 'react';
import { 
  CloseCircle, 
  Calendar, 
  Clock, 
  DocumentText, 
  Video, 
  Location,
  MessageText,
  CalendarEdit,
  Star1,
  Book1,
  TickCircle,
} from 'iconsax-react';

interface Student {
  id: string;
  name: string;
  initials: string;
  avatar?: string;
  subject: string;
  enrolledDate: string;
  totalLessons: number;
  completedLessons: number;
  upcomingLesson?: string;
  rating: number;
  status: 'active' | 'pending' | 'completed';
  progressPercentage: number;
}

interface StudentDetailsModalProps {
  student: Student;
  onClose: () => void;
  onContactStudent?: () => void;
  onScheduleLesson?: () => void;
}

export function StudentDetailsModal({ 
  student, 
  onClose, 
  onContactStudent,
  onScheduleLesson 
}: StudentDetailsModalProps) {
  // Generate lesson data based on student
  const getLessonDataForStudent = () => {
    if (student.name === 'John Doe') {
      // 4 total lessons, 2 completed
      return {
        lessonMode: 'Online',
        language: 'English',
        scheduledDates: [
          {
            date: new Date(2026, 0, 15), // Jan 15
            time: '2:00 PM - 4:00 PM',
            isCompleted: true,
          },
          {
            date: new Date(2026, 0, 22), // Jan 22
            time: '2:00 PM - 4:00 PM',
            isCompleted: true,
          },
          {
            date: new Date(2026, 2, 18), // Mar 18 (tomorrow)
            time: '2:00 PM - 4:00 PM',
            isCompleted: false,
          },
          {
            date: new Date(2026, 2, 25), // Mar 25
            time: '2:00 PM - 4:00 PM',
            isCompleted: false,
          },
        ],
      };
    } else if (student.name === 'Jane Smith') {
      // 3 total lessons, 3 completed
      return {
        lessonMode: 'Online',
        language: 'English',
        scheduledDates: [
          {
            date: new Date(2026, 0, 20), // Jan 20
            time: '3:00 PM - 5:00 PM',
            isCompleted: true,
          },
          {
            date: new Date(2026, 0, 27), // Jan 27
            time: '3:00 PM - 5:00 PM',
            isCompleted: true,
          },
          {
            date: new Date(2026, 1, 3), // Feb 3
            time: '3:00 PM - 5:00 PM',
            isCompleted: true,
          },
        ],
      };
    } else if (student.name === 'Michael Brown') {
      // 2 total lessons, 0 completed
      return {
        lessonMode: 'Online',
        language: 'English',
        scheduledDates: [
          {
            date: new Date(2026, 2, 20), // Mar 20
            time: '4:00 PM - 6:00 PM',
            isCompleted: false,
          },
          {
            date: new Date(2026, 2, 27), // Mar 27
            time: '4:00 PM - 6:00 PM',
            isCompleted: false,
          },
        ],
      };
    }
    
    // Default
    return {
      lessonMode: 'Online',
      language: 'English',
      scheduledDates: [],
    };
  };

  const lessonData = getLessonDataForStudent();

  // Calculate total time slots
  const totalTimeSlots = lessonData.scheduledDates.length;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto my-8">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 md:px-6 py-4 flex items-center justify-between z-10 rounded-t-xl">
          <h2 className="text-lg md:text-xl font-bold text-gray-900">Student Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 -mr-2"
          >
            <CloseCircle size={24} variant="Bold" className="md:w-7 md:h-7" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6 space-y-4 md:space-y-6">
          {/* Student Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-gradient-to-r from-[#FF6636]/10 to-[#564FFD]/10 rounded-lg">
            {student.avatar ? (
              <img 
                src={student.avatar} 
                alt={student.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-[#FF6636] flex items-center justify-center text-white font-bold text-xl border-2 border-white shadow-md">
                {student.initials}
              </div>
            )}
            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-900">{student.name}</h3>
              <p className="text-sm text-[#6e7485]">{student.subject}</p>
              <p className="text-sm font-medium text-[#FF6636] mt-1">
                Enrolled: {student.enrolledDate}
              </p>
            </div>
            <span className={`px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1 ${
              student.status === 'active' ? 'bg-[#23BD33] text-white' :
              student.status === 'pending' ? 'bg-yellow-500 text-white' :
              'bg-blue-500 text-white'
            }`}>
              {student.status === 'active' && <TickCircle size={14} variant="Bold" />}
              {student.status === 'pending' && <Calendar size={14} variant="Bold" />}
              {student.status === 'completed' && <Book1 size={14} variant="Bold" />}
              {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
            </span>
          </div>

          {/* Progress Overview */}
          <div className="space-y-3 p-4 bg-gradient-to-br from-[#FF6636]/5 to-[#564FFD]/5 rounded-lg border border-[#FF6636]/20">
            <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wide flex items-center gap-2">
              <Book1 size={18} className="text-[#FF6636]" variant="Bold" />
              Progress Overview
            </h4>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm text-[#6e7485]">Completed Lessons</p>
                <p className="text-sm font-semibold text-gray-900">
                  {student.completedLessons} / {student.totalLessons}
                </p>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-600">Progress</span>
                  <span className="text-xs font-bold text-[#FF6636]">{student.progressPercentage}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#FF6636] to-[#564FFD] transition-all duration-300"
                    style={{ width: `${student.progressPercentage}%` }}
                  ></div>
                </div>
              </div>

              {student.rating > 0 && (
                <div className="flex items-center justify-between pt-2 border-t border-gray-300">
                  <p className="text-sm text-[#6e7485]">Student Rating</p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star1
                        key={i}
                        size={16}
                        variant={i < student.rating ? "Bold" : "Linear"}
                        className={i < student.rating ? "text-yellow-500" : "text-gray-300"}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Lesson Information */}
          <div className="space-y-4">
            <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wide">Lesson Information</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-[#564FFD]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Video size={20} className="text-[#564FFD]" variant="Bold" />
                </div>
                <div>
                  <p className="text-xs text-[#6e7485] mb-1">Lesson Mode</p>
                  <p className="text-sm font-semibold text-gray-900">{lessonData.lessonMode}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-[#FF6636]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <DocumentText size={20} className="text-[#FF6636]" variant="Bold" />
                </div>
                <div>
                  <p className="text-xs text-[#6e7485] mb-1">Language</p>
                  <p className="text-sm font-semibold text-gray-900">{lessonData.language}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-[#23BD33]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar size={20} className="text-[#23BD33]" variant="Bold" />
                </div>
                <div>
                  <p className="text-xs text-[#6e7485] mb-1">Total Lessons</p>
                  <p className="text-sm font-semibold text-gray-900">{student.totalLessons} lessons</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-[#564FFD]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock size={20} className="text-[#564FFD]" variant="Bold" />
                </div>
                <div>
                  <p className="text-xs text-[#6e7485] mb-1">Time Slots</p>
                  <p className="text-sm font-semibold text-gray-900">{totalTimeSlots} slots</p>
                </div>
              </div>
            </div>
          </div>

          {/* Scheduled Dates */}
          {lessonData.scheduledDates && lessonData.scheduledDates.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wide">Scheduled Dates</h4>
                <span className="text-xs font-semibold text-[#FF6636] bg-[#FF6636]/10 px-3 py-1 rounded-full">
                  {student.completedLessons}/{student.totalLessons} completed
                </span>
              </div>
              
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {lessonData.scheduledDates.map((session, idx) => {
                  const isCompleted = session.isCompleted;
                  
                  return (
                    <div 
                      key={idx}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        isCompleted 
                          ? 'bg-[#23BD33]/5 border-[#23BD33]' 
                          : 'bg-white border-gray-200 hover:border-[#FF6636]/30'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold ${
                            isCompleted 
                              ? 'bg-[#23BD33] text-white' 
                              : 'bg-[#564FFD]/10 text-[#564FFD]'
                          }`}>
                            {session.date.getDate()}
                          </div>
                          <div>
                            <p className={`text-sm font-bold ${
                              isCompleted ? 'text-[#23BD33]' : 'text-gray-900'
                            }`}>
                              {session.date.toLocaleDateString('en-US', { 
                                weekday: 'long', 
                                month: 'long', 
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <Clock size={14} className={isCompleted ? 'text-[#23BD33]' : 'text-[#6e7485]'} />
                              <p className={`text-xs ${
                                isCompleted ? 'text-[#23BD33]' : 'text-[#6e7485]'
                              }`}>
                                {session.time}
                              </p>
                            </div>
                          </div>
                        </div>
                        {isCompleted && (
                          <div className="flex items-center gap-2 text-[#23BD33]">
                            <span className="text-xs font-semibold">Completed</span>
                            <div className="w-6 h-6 bg-[#23BD33] rounded-full flex items-center justify-center">
                              <span className="text-white text-sm">✓</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Upcoming Lesson */}
          {student.upcomingLesson && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
                <Calendar size={18} className="text-blue-600" variant="Bold" />
                Next Lesson
              </h4>
              <p className="text-sm text-gray-700">{student.upcomingLesson}</p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex gap-3">
          <button 
            onClick={onContactStudent}
            className="flex-1 px-6 py-3 border-2 border-[#FF6636] text-[#FF6636] rounded-lg hover:bg-[#FF6636] hover:text-white transition-all font-semibold flex items-center justify-center gap-2"
          >
            <MessageText size={20} variant="Bold" />
            Contact Student
          </button>
          <button 
            onClick={onScheduleLesson}
            className="flex-1 px-6 py-3 bg-[#FF6636] text-white rounded-lg hover:bg-[#E55A2B] transition-colors font-semibold flex items-center justify-center gap-2"
          >
            <CalendarEdit size={20} variant="Bold" />
            Lesson Updates
          </button>
        </div>
      </div>
    </div>
  );
}