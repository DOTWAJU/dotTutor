import React from 'react';
import { CloseCircle, Calendar, Clock, Teacher, DocumentText, MoneyRecive, Video, Location } from 'iconsax-react';

interface LessonDetailsModalProps {
  lesson: any;
  onClose: () => void;
}

export function LessonDetailsModal({ lesson, onClose }: LessonDetailsModalProps) {
  const totalTimeSlots = Object.values(lesson.dateTimeSlots || {}).reduce((total: number, slots: any) => {
    return total + (slots?.length || 0);
  }, 0);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Lesson Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <CloseCircle size={28} variant="Bold" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Tutor Info */}
          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#FF6636]/10 to-[#564FFD]/10 rounded-lg">
            <img 
              src={lesson.tutor?.image || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'} 
              alt={lesson.tutor?.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
            />
            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-900">{lesson.tutor?.name}</h3>
              <p className="text-sm text-[#6e7485]">{lesson.tutor?.subject}</p>
              {lesson.lessonTopic && (
                <p className="text-sm font-medium text-[#FF6636] mt-1">{lesson.lessonTopic}</p>
              )}
            </div>
            <span className="px-3 py-1 bg-[#23BD33] text-white text-xs font-semibold rounded-full">
              Confirmed
            </span>
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
                  <p className="text-sm font-semibold text-gray-900">{lesson.tutor?.lessonMode || lesson.lessonMode || 'Online'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-[#FF6636]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <DocumentText size={20} className="text-[#FF6636]" variant="Bold" />
                </div>
                <div>
                  <p className="text-xs text-[#6e7485] mb-1">Language</p>
                  <p className="text-sm font-semibold text-gray-900">{lesson.language || 'English'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-[#23BD33]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar size={20} className="text-[#23BD33]" variant="Bold" />
                </div>
                <div>
                  <p className="text-xs text-[#6e7485] mb-1">Total Lessons</p>
                  <p className="text-sm font-semibold text-gray-900">{lesson.duration || 0} lessons</p>
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
          {lesson.selectedDates && lesson.selectedDates.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wide">Scheduled Dates</h4>
                {lesson.completedCount !== undefined && (
                  <span className="text-xs font-semibold text-[#FF6636] bg-[#FF6636]/10 px-3 py-1 rounded-full">
                    {lesson.completedCount}/{lesson.duration} completed
                  </span>
                )}
              </div>
              
              <div className="space-y-2">
                {lesson.selectedDates.map((date: Date, idx: number) => {
                  const dateKey = new Date(date).toISOString().split('T')[0];
                  const timeSlots = lesson.dateTimeSlots[dateKey] || [];
                  const isCompleted = lesson.completedDates?.includes(dateKey);
                  
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
                            {new Date(date).getDate()}
                          </div>
                          <div>
                            <p className={`text-sm font-bold ${
                              isCompleted ? 'text-[#23BD33]' : 'text-gray-900'
                            }`}>
                              {new Date(date).toLocaleDateString('en-US', { 
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
                                {timeSlots.join(', ') || 'Time TBD'}
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

          {/* Payment Information */}
          <div className="space-y-3 p-4 bg-gradient-to-br from-[#FF6636]/5 to-[#564FFD]/5 rounded-lg border border-[#FF6636]/20">
            <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wide flex items-center gap-2">
              <MoneyRecive size={18} className="text-[#FF6636]" variant="Bold" />
              Payment Information
            </h4>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm text-[#6e7485]">Cost per lesson</p>
                <p className="text-sm font-semibold text-gray-900">
                  ₦{((lesson.totalCost || 0) / (lesson.duration || 1)).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-[#6e7485]">Number of lessons</p>
                <p className="text-sm font-semibold text-gray-900">× {lesson.duration || 0}</p>
              </div>
              <div className="h-px bg-gray-300"></div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-gray-900">Total Amount Paid</p>
                <p className="text-lg font-bold text-[#FF6636]">
                  ₦{(lesson.totalCost || 0).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center justify-between text-xs">
                <p className="text-[#6e7485]">Booked on</p>
                <p className="text-[#6e7485]">
                  {new Date(lesson.bookingDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Location (if physical) */}
          {(lesson.tutor?.lessonMode === 'Physical' || lesson.lessonMode === 'Physical') && lesson.location && (
            <div className="p-4 bg-[#23BD33]/5 border border-[#23BD33]/20 rounded-lg">
              <h4 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
                <Location size={18} className="text-[#23BD33]" variant="Bold" />
                Lesson Location
              </h4>
              <p className="text-sm text-gray-700">{lesson.location}</p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
          >
            Close
          </button>
          <button className="flex-1 px-6 py-3 bg-[#FF6636] text-white rounded-lg hover:bg-[#E55A2B] transition-colors font-semibold">
            Contact Tutor
          </button>
        </div>
      </div>
    </div>
  );
}