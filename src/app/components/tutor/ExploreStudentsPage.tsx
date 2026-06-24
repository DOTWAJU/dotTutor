import React from 'react';
import { SearchNormal1, Calendar, Book1, Clock, ArrowLeft2, ArrowRight2, Heart, TickCircle, CloseCircle } from 'iconsax-react';
import { toast } from 'sonner';

// Demo student data
const DEMO_STUDENTS = [
  {
    id: '1',
    name: 'Sarah Johnson',
    initials: 'SJ',
    subject: 'Mathematics',
    description: 'Need help with calculus and algebra. Preparing for university entrance exams.',
    availableDates: [
      {
        date: new Date(2026, 2, 24), // March 24, 2026
        times: ['4-5 PM', '5-6 PM']
      },
      {
        date: new Date(2026, 2, 26), // March 26, 2026
        times: ['6-7 PM']
      },
      {
        date: new Date(2026, 2, 28), // March 28, 2026
        times: ['4-5 PM', '5-6 PM', '6-7 PM']
      }
    ],
    preferredMode: 'Online'
  },
  {
    id: '2',
    name: 'Michael Chen',
    initials: 'MC',
    subject: 'Physics',
    description: 'Looking for advanced physics tutoring. Focus on mechanics and electromagnetism.',
    availableDates: [
      {
        date: new Date(2026, 2, 25), // March 25, 2026
        times: ['5-6 PM', '6-7 PM']
      },
      {
        date: new Date(2026, 2, 27), // March 27, 2026
        times: ['4-5 PM', '5-6 PM']
      }
    ],
    preferredMode: 'Hybrid'
  }
];

const ASSIGNED_STUDENTS = [
  {
    id: '3',
    name: 'Emily Rodriguez',
    initials: 'ER',
    subject: 'Chemistry',
    description: 'Assigned student working on organic chemistry. Weekly sessions scheduled.',
    preferredMode: 'Online',
    assignedDate: 'March 20, 2026'
  }
];

interface ExploreStudentsPageProps {
  onNavigateToBookmarked?: () => void;
  onExpressInterest?: (studentId: string, studentName: string, studentSubject: string) => void;
}

export function ExploreStudentsPage({ onNavigateToBookmarked, onExpressInterest }: ExploreStudentsPageProps = {}) {
  const [activeTab, setActiveTab] = React.useState<'availability' | 'assigned'>('availability');
  const [selectedSubject, setSelectedSubject] = React.useState('All Subjects');
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = React.useState(new Date(2026, 2)); // March 2026
  const [bookmarkedStudents, setBookmarkedStudents] = React.useState<string[]>([]);
  const [expressedInterest, setExpressedInterest] = React.useState<string[]>([]);
  const [rejectedStudents, setRejectedStudents] = React.useState<string[]>([]);
  const [showRejectModal, setShowRejectModal] = React.useState(false);
  const [rejectStudentId, setRejectStudentId] = React.useState<string | null>(null);
  const [rejectComment, setRejectComment] = React.useState('');

  const subjects = [
    'All Subjects',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'English',
    'Computer Science'
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);

  const isDateSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth.getMonth() &&
      selectedDate.getFullYear() === currentMonth.getFullYear()
    );
  };

  const hasStudentsAvailable = (day: number) => {
    const checkDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    
    // Filter students by subject first
    const studentsToCheck = selectedSubject === 'All Subjects' 
      ? DEMO_STUDENTS 
      : DEMO_STUDENTS.filter(student => student.subject === selectedSubject);
    
    return studentsToCheck.some(student =>
      student.availableDates.some(
        availDate =>
          availDate.date.getDate() === checkDate.getDate() &&
          availDate.date.getMonth() === checkDate.getMonth() &&
          availDate.date.getFullYear() === checkDate.getFullYear()
      )
    );
  };

  const toggleDate = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    if (selectedDate && isDateSelected(day)) {
      setSelectedDate(null);
    } else {
      setSelectedDate(newDate);
    }
  };

  // Filter students based on selected date AND selected subject
  const filteredStudents = React.useMemo(() => {
    let students = DEMO_STUDENTS;
    
    // Filter by subject
    if (selectedSubject !== 'All Subjects') {
      students = students.filter(student => student.subject === selectedSubject);
    }
    
    // Filter by selected date
    if (selectedDate) {
      students = students.filter(student =>
        student.availableDates.some(
          availDate =>
            availDate.date.getDate() === selectedDate.getDate() &&
            availDate.date.getMonth() === selectedDate.getMonth() &&
            availDate.date.getFullYear() === selectedDate.getFullYear()
        )
      );
    }
    
    return students;
  }, [selectedDate, selectedSubject]);

  // Get available times for selected date
  const getAvailableTimesForDate = (student: typeof DEMO_STUDENTS[0]) => {
    if (!selectedDate) return [];
    const dateAvailability = student.availableDates.find(
      availDate =>
        availDate.date.getDate() === selectedDate.getDate() &&
        availDate.date.getMonth() === selectedDate.getMonth() &&
        availDate.date.getFullYear() === selectedDate.getFullYear()
    );
    return dateAvailability?.times || [];
  };

  const toggleBookmark = (studentId: string) => {
    if (bookmarkedStudents.includes(studentId)) {
      setBookmarkedStudents(bookmarkedStudents.filter(id => id !== studentId));
      toast.info('Student removed from bookmarks.');
    } else {
      setBookmarkedStudents([...bookmarkedStudents, studentId]);
      toast.success('Student bookmarked successfully!');
    }
  };

  const openRejectModal = (studentId: string) => {
    setRejectStudentId(studentId);
    setShowRejectModal(true);
  };

  const handleReject = () => {
    if (rejectStudentId) {
      setRejectedStudents([...rejectedStudents, rejectStudentId]);
      toast.success('Student rejected. Admin has been notified with your comment.');
      setShowRejectModal(false);
      setRejectComment('');
      setRejectStudentId(null);
    }
  };

  const expressInterest = (studentId: string, studentName: string, studentSubject: string) => {
    setExpressedInterest([...expressedInterest, studentId]);
    toast.success(`Interest expressed for ${studentName}! A ticket has been created. Admin will get back to you soon.`, {
      duration: 5000,
    });
    if (onExpressInterest) {
      onExpressInterest(studentId, studentName, studentSubject);
    }
  };

  // Filter out rejected students
  const displayedStudents = filteredStudents.filter(student => !rejectedStudents.includes(student.id));

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Explore Students</h2>
        <p className="text-sm md:text-base text-gray-600">Find students looking for tutoring in your subjects</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-gray-200 mb-6">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('availability')}
            className={`flex-1 px-6 py-4 font-semibold text-sm transition-all ${
              activeTab === 'availability'
                ? 'text-[#FF6636] border-b-2 border-[#FF6636]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Select Date Availability
          </button>
          <button
            onClick={() => setActiveTab('assigned')}
            className={`flex-1 px-6 py-4 font-semibold text-sm transition-all ${
              activeTab === 'assigned'
                ? 'text-[#FF6636] border-b-2 border-[#FF6636]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Assigned Students ({ASSIGNED_STUDENTS.length})
          </button>
        </div>
      </div>

      {activeTab === 'availability' && (
        <>
          {/* Filters */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-6">
              {/* Subject Filter */}
              <div>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6636] focus:border-transparent appearance-none bg-white cursor-pointer"
                >
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Calendar for Date Selection */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase">Select Date to View Availability</h3>
              
              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft2 size={18} />
                </button>
                <span className="font-semibold text-base">
                  {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowRight2 size={18} />
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}
                {Array.from({ length: startingDayOfWeek }, (_, i) => (
                  <div key={`empty-${i}`} />
                ))}
                {Array.from({ length: daysInMonth }, (_, i) => {
                  const day = i + 1;
                  const selected = isDateSelected(day);
                  const hasStudents = hasStudentsAvailable(day);
                  return (
                    <button
                      key={day}
                      onClick={() => toggleDate(day)}
                      className={`aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-colors relative ${
                        selected
                          ? 'bg-[#FF6636] text-white'
                          : hasStudents
                            ? 'bg-green-50 text-gray-700 hover:bg-green-100 border border-green-200'
                            : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                      }`}
                    >
                      {day}
                      {hasStudents && !selected && (
                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full"></div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Calendar Legend */}
              <div className="flex items-center gap-4 mt-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 bg-[#FF6636] rounded"></div>
                  <span className="text-[#6e7485]">Selected</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 bg-green-50 border border-green-200 rounded"></div>
                  <span className="text-[#6e7485]">Students Available</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 bg-gray-50 rounded"></div>
                  <span className="text-[#6e7485]">Not Available</span>
                </div>
              </div>

              {selectedDate && (
                <div className="mt-4 p-3 bg-orange-50 border border-[#FF6636] rounded-lg">
                  <p className="text-sm text-[#FF6636] font-medium">
                    Showing students available on {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Students Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayedStudents.map((student) => {
              const availableTimes = getAvailableTimesForDate(student);
              const hasExpressed = expressedInterest.includes(student.id);
              
              return (
                <div
                  key={student.id}
                  className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg hover:border-[#FF6636]/30 transition-all"
                >
                  {/* Student Header with Heart Icon */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white font-bold text-lg shrink-0">
                        {student.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{student.name}</h3>
                        <div className="flex items-center gap-2">
                          <Book1 className="w-4 h-4 text-[#FF6636]" variant="Bold" />
                          <span className="text-sm text-gray-600 font-medium">{student.subject}</span>
                        </div>
                      </div>
                    </div>
                    {/* Heart Icon - Top Right */}
                    <button
                      onClick={() => {
                        toggleBookmark(student.id);
                      }}
                      className={`p-2 rounded-full shrink-0 ${
                        bookmarkedStudents.includes(student.id) ? 'bg-[#FF6636] text-white' : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      <Heart size={18} variant={bookmarkedStudents.includes(student.id) ? 'Bold' : 'Linear'} />
                    </button>
                  </div>

                  {/* Description */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 leading-relaxed">{student.description}</p>
                  </div>

                  {/* Student Details */}
                  <div className="space-y-3 mb-5">
                    {selectedDate && availableTimes.length > 0 ? (
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-green-600 shrink-0 mt-0.5" variant="Bold" />
                        <div className="flex-1">
                          <p className="text-xs text-gray-500 font-medium mb-1">Available Times on {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                          <div className="flex flex-wrap gap-2">
                            {availableTimes.map((time, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-semibold"
                              >
                                {time}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" variant="Linear" />
                        <div>
                          <p className="text-xs text-gray-500 font-medium mb-0.5">General Availability</p>
                          <p className="text-sm text-gray-600">
                            {student.availableDates.length} dates available
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="px-3 py-1 bg-orange-50 text-[#FF6636] rounded-full text-xs font-semibold">
                        {student.preferredMode}
                      </div>
                      {selectedDate && availableTimes.length > 0 && (
                        <div className="flex items-center gap-1 text-green-600">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-xs font-semibold">Available</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Buttons - Express Interest / Awaiting or Reject */}
                  {!hasExpressed ? (
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => expressInterest(student.id, student.name, student.subject)}
                        className="px-6 py-3 bg-[#FF6636] text-white rounded-xl font-semibold hover:bg-[#E55A2B] transition-all flex items-center justify-center gap-2"
                      >
                        Express Interest
                      </button>
                      <button
                        onClick={() => openRejectModal(student.id)}
                        className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-red-500 hover:text-red-500 hover:bg-red-50 transition-all"
                      >
                        Reject Student
                      </button>
                    </div>
                  ) : (
                    <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl text-center">
                      <p className="text-sm text-orange-600 font-bold">⏳ AWAITING APPROVAL</p>
                      <p className="text-xs text-orange-500 mt-1">Admin will review and get back to you soon</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {displayedStudents.length === 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <SearchNormal1 className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Students Found</h3>
              <p className="text-gray-600">
                {selectedDate 
                  ? `No students are available on ${selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}. Try selecting a different date.`
                  : 'Try adjusting your filters'
                }
              </p>
            </div>
          )}
        </>
      )}

      {activeTab === 'assigned' && (
        <div>
          {ASSIGNED_STUDENTS.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ASSIGNED_STUDENTS.map((student) => (
                <div
                  key={student.id}
                  className="bg-white rounded-2xl border border-green-200 p-6"
                >
                  <div className="mb-4 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-bold inline-flex items-center gap-1">
                    <TickCircle size={14} variant="Bold" />
                    ASSIGNED
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold text-lg">
                      {student.initials}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{student.name}</h3>
                      <div className="flex items-center gap-2">
                        <Book1 className="w-4 h-4 text-[#FF6636]" variant="Bold" />
                        <span className="text-sm text-gray-600 font-medium">{student.subject}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">{student.description}</p>

                  <div className="px-3 py-1 bg-orange-50 text-[#FF6636] rounded-full text-xs font-semibold inline-block mb-4">
                    {student.preferredMode}
                  </div>

                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-xs text-green-700 font-medium">
                      ✅ Assigned on {student.assignedDate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <TickCircle className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Assigned Students</h3>
              <p className="text-gray-600">
                You don't have any assigned students yet.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Reject Modal - Responsive without dark background */}
      {showRejectModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 sm:p-6">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 sm:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Reject Student</h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">Enter a comment for rejecting the student:</p>
            <textarea
              value={rejectComment}
              onChange={(e) => setRejectComment(e.target.value)}
              placeholder="Please provide a reason..."
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6636] focus:border-transparent text-sm sm:text-base"
              rows={4}
            />
            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3 mt-4 sm:mt-6">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectComment('');
                  setRejectStudentId(null);
                }}
                className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all text-sm sm:text-base"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}