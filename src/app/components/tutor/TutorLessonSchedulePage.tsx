import React from 'react';
import {
  Calendar,
  Clock,
  Video,
  Location,
  Book1,
  DocumentText,
  TickCircle,
  CloseCircle,
  Star1,
  SearchNormal1,
  Filter,
  Add,
  Edit2,
  Trash,
  ArrowRight2,
  Teacher,
  People,
  Chart,
  Message,
  Send,
} from 'iconsax-react';
import { TutorLiveClassPage } from './TutorLiveClassPage';
import { CreateAssignmentModal } from './CreateAssignmentModal';
import { GradeAssignmentModal } from './GradeAssignmentModal';
import { toast } from 'sonner';

interface Lesson {
  id: string;
  studentName: string;
  studentInitials: string;
  studentAvatar?: string;
  subject: string;
  topic: string;
  date: Date;
  time: string;
  duration: number; // in hours
  mode: 'Online' | 'In-Person';
  meetingLink?: string;
  location?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  hasAssignment?: boolean;
  assignmentTitle?: string;
  notes?: string;
  rating?: number;
  isLive?: boolean; // Add isLive property for demo
}

interface Assignment {
  id: string;
  studentName: string;
  studentInitials: string;
  subject: string;
  title: string;
  dueDate: Date;
  submittedDate?: Date;
  status: 'pending' | 'submitted' | 'graded' | 'overdue';
  grade?: number;
  totalPoints?: number;
  submittedFiles?: Array<{ name: string; size: string }>;
  submittedComment?: string;
}

export function TutorLessonSchedulePage() {
  const [activeTab, setActiveTab] = React.useState<'upcoming' | 'completed' | 'assignments'>('upcoming');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showFilterMenu, setShowFilterMenu] = React.useState(false);
  const [filterMode, setFilterMode] = React.useState<'all' | 'online' | 'in-person'>('all');
  const [selectedLesson, setSelectedLesson] = React.useState<Lesson | null>(null);
  const [activeLiveLesson, setActiveLiveLesson] = React.useState<Lesson | null>(null);
  const [showCreateAssignmentModal, setShowCreateAssignmentModal] = React.useState(false);
  const [showGradeAssignmentModal, setShowGradeAssignmentModal] = React.useState(false);
  const [selectedAssignment, setSelectedAssignment] = React.useState<Assignment | null>(null);

  // Demo upcoming lessons
  const upcomingLessons: Lesson[] = [
    {
      id: '1',
      studentName: 'John Doe',
      studentInitials: 'JD',
      subject: 'Mathematics',
      topic: 'Calculus - Derivatives & Integration',
      date: new Date(), // Today - Live now
      time: '2:00 PM - 4:00 PM',
      duration: 2,
      mode: 'Online',
      meetingLink: 'https://meet.dot-tutor.com/math-john-123',
      status: 'scheduled',
      hasAssignment: true,
      assignmentTitle: 'Practice Problems Set 5',
      notes: 'Focus on chain rule applications',
      isLive: true, // Force live status for demo
    },
    {
      id: '2',
      studentName: 'Jane Smith',
      studentInitials: 'JS',
      subject: 'Physics',
      topic: 'Quantum Mechanics - Wave Functions',
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Day after tomorrow
      time: '10:00 AM - 12:00 PM',
      duration: 2,
      mode: 'Online',
      meetingLink: 'https://meet.dot-tutor.com/physics-jane-456',
      status: 'scheduled',
      hasAssignment: false,
    },
  ];

  // Demo lesson history
  const lessonHistory: Lesson[] = [
    {
      id: '4',
      studentName: 'John Doe',
      studentInitials: 'JD',
      subject: 'Mathematics',
      topic: 'Algebra - Quadratic Equations',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      time: '2:00 PM - 4:00 PM',
      duration: 2,
      mode: 'Online',
      status: 'completed',
      rating: 5,
      notes: 'Great session! Student showed excellent progress.',
    },
    {
      id: '5',
      studentName: 'Jane Smith',
      studentInitials: 'JS',
      subject: 'Physics',
      topic: 'Mechanics - Newton\'s Laws',
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      time: '10:00 AM - 12:00 PM',
      duration: 2,
      mode: 'Online',
      status: 'completed',
      rating: 5,
    },
  ];

  // Demo assignments
  const assignments: Assignment[] = [
    {
      id: '1',
      studentName: 'John Doe',
      studentInitials: 'JD',
      subject: 'Mathematics',
      title: 'Practice Problems Set 5',
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      status: 'pending',
      totalPoints: 50,
    },
    {
      id: '2',
      studentName: 'Jane Smith',
      studentInitials: 'JS',
      subject: 'Physics',
      title: 'Wave Function Analysis Report',
      dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      submittedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      status: 'submitted',
      totalPoints: 40,
      submittedFiles: [
        { name: 'Wave_Function_Analysis.pdf', size: '2.3 MB' },
        { name: 'Quantum_Calculations.docx', size: '1.1 MB' },
      ],
      submittedComment: 'I have completed the wave function analysis with detailed calculations and supporting diagrams. Please review my work on the Schrödinger equation applications.',
    },
    {
      id: '3',
      studentName: 'Sarah Wilson',
      studentInitials: 'SW',
      subject: 'Chemistry',
      title: 'Organic Chemistry Lab Report',
      dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // Yesterday - overdue
      status: 'overdue',
      totalPoints: 30,
    },
    {
      id: '4',
      studentName: 'John Doe',
      studentInitials: 'JD',
      subject: 'Mathematics',
      title: 'Integration Worksheet',
      dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      submittedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      status: 'graded',
      grade: 95,
      totalPoints: 50,
    },
  ];

  // Filter lessons based on mode
  const filteredUpcomingLessons = upcomingLessons.filter(lesson => {
    if (filterMode === 'all') return true;
    if (filterMode === 'online') return lesson.mode === 'Online';
    if (filterMode === 'in-person') return lesson.mode === 'In-Person';
    return true;
  }).filter(lesson => 
    lesson.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lesson.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lesson.topic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCompletedLessons = lessonHistory.filter(lesson => {
    if (filterMode === 'all') return true;
    if (filterMode === 'online') return lesson.mode === 'Online';
    if (filterMode === 'in-person') return lesson.mode === 'In-Person';
    return true;
  }).filter(lesson => 
    lesson.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lesson.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lesson.topic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAssignments = assignments.filter(assignment =>
    assignment.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    assignment.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    assignment.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const dateStr = date.toDateString();
    const todayStr = today.toDateString();
    const tomorrowStr = tomorrow.toDateString();
    
    if (dateStr === todayStr) return 'Today';
    if (dateStr === tomorrowStr) return 'Tomorrow';
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined 
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">Scheduled</span>;
      case 'live':
        return (
          <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full animate-pulse flex items-center gap-1">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            LIVE NOW
          </span>
        );
      case 'completed':
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">Completed</span>;
      case 'cancelled':
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">Cancelled</span>;
      case 'pending':
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">Pending</span>;
      case 'submitted':
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">Submitted</span>;
      case 'graded':
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">Graded</span>;
      case 'overdue':
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">Overdue</span>;
      default:
        return null;
    }
  };

  // Check if lesson is live (today and within time window)
  const isLessonLive = (lesson: Lesson) => {
    const now = new Date();
    const lessonDate = new Date(lesson.date);
    
    // Check if it's the same day
    const isSameDay = 
      lessonDate.getDate() === now.getDate() &&
      lessonDate.getMonth() === now.getMonth() &&
      lessonDate.getFullYear() === now.getFullYear();
    
    if (!isSameDay) return false;
    
    // Parse lesson time (assuming format like "2:00 PM - 4:00 PM")
    const timeMatch = lesson.time.match(/(\d+):(\d+)\s*(AM|PM)/);
    if (!timeMatch) return false;
    
    let hours = parseInt(timeMatch[1]);
    const minutes = parseInt(timeMatch[2]);
    const period = timeMatch[3];
    
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    
    const lessonStartTime = new Date(lessonDate);
    lessonStartTime.setHours(hours, minutes, 0, 0);
    
    // Lesson is live if current time is within 15 minutes before start time
    const timeDiff = lessonStartTime.getTime() - now.getTime();
    const minutesDiff = timeDiff / (1000 * 60);
    
    return minutesDiff <= 15 && minutesDiff >= -lesson.duration * 60; // Can join 15 min before and during lesson
  };

  // Stats
  const stats = {
    upcoming: upcomingLessons.length,
    completed: lessonHistory.length,
    pendingAssignments: assignments.filter(a => a.status === 'pending').length,
  };

  // If viewing a live lesson
  if (activeLiveLesson) {
    return (
      <TutorLiveClassPage
        lesson={activeLiveLesson}
        onBack={() => setActiveLiveLesson(null)}
        onEndClass={() => setActiveLiveLesson(null)}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Lesson Schedule</h1>
        <p className="text-sm md:text-base text-gray-600">Manage your lessons, assignments, and teaching schedule</p>
      </div>

      {/* Stats Card - Single Card with All Statuses (like My Students) */}
      <div className="bg-white rounded-2xl p-4 md:p-6 border border-gray-200 mb-6 md:mb-8">
        <div className="grid grid-cols-3 gap-3 md:gap-6">
          <div className="text-center">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2 md:mb-3">
              <Calendar className="w-5 h-5 md:w-6 md:h-6 text-blue-600" variant="Bold" />
            </div>
            <p className="text-xs md:text-sm text-gray-600 mb-1 font-medium">Upcoming</p>
            <p className="text-2xl md:text-3xl font-bold text-gray-900">{stats.upcoming}</p>
          </div>

          <div className="text-center border-x border-gray-200">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-2 md:mb-3">
              <TickCircle className="w-5 h-5 md:w-6 md:h-6 text-green-600" variant="Bold" />
            </div>
            <p className="text-xs md:text-sm text-gray-600 mb-1 font-medium">Completed</p>
            <p className="text-2xl md:text-3xl font-bold text-gray-900">{stats.completed}</p>
          </div>

          <div className="text-center">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-2 md:mb-3">
              <DocumentText className="w-5 h-5 md:w-6 md:h-6 text-orange-600" variant="Bold" />
            </div>
            <p className="text-xs md:text-sm text-gray-600 mb-1 font-medium">Assignments</p>
            <p className="text-2xl md:text-3xl font-bold text-gray-900">{stats.pendingAssignments}</p>
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-2xl border border-gray-200">
        {/* Tabs & Actions */}
        <div className="border-b border-gray-200 p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto w-full sm:w-auto">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all whitespace-nowrap ${
                  activeTab === 'upcoming'
                    ? 'bg-[#FF6636] text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all whitespace-nowrap ${
                  activeTab === 'completed'
                    ? 'bg-[#FF6636] text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Completed
              </button>
              <button
                onClick={() => setActiveTab('assignments')}
                className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all whitespace-nowrap ${
                  activeTab === 'assignments'
                    ? 'bg-[#FF6636] text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Assignments
              </button>
            </div>

            {/* Search & Filter */}
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <SearchNormal1 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-64 h-11 pl-10 pr-4 rounded-xl border border-gray-300 text-sm focus:border-[#FF6636] focus:outline-none transition-all"
                />
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowFilterMenu(!showFilterMenu)}
                  className={`px-4 h-11 border rounded-xl transition-all ${
                    filterMode !== 'all' 
                      ? 'border-[#FF6636] bg-orange-50' 
                      : 'border-gray-300 hover:border-[#FF6636]'
                  }`}
                >
                  <Filter className={`w-5 h-5 ${filterMode !== 'all' ? 'text-[#FF6636]' : 'text-gray-600'}`} />
                </button>

                {/* Filter Dropdown */}
                {showFilterMenu && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 z-50">
                    <div className="p-2">
                      <button
                        onClick={() => {
                          setFilterMode('all');
                          setShowFilterMenu(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          filterMode === 'all' 
                            ? 'bg-[#FF6636] text-white' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        All Lessons
                      </button>
                      <button
                        onClick={() => {
                          setFilterMode('online');
                          setShowFilterMenu(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          filterMode === 'online' 
                            ? 'bg-[#FF6636] text-white' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        Online Only
                      </button>
                      <button
                        onClick={() => {
                          setFilterMode('in-person');
                          setShowFilterMenu(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          filterMode === 'in-person' 
                            ? 'bg-[#FF6636] text-white' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        In-Person Only
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Upcoming Lessons */}
          {activeTab === 'upcoming' && (
            <div>
              {filteredUpcomingLessons.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-10 h-10 text-gray-400" variant="Bold" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">No Upcoming Lessons</h3>
                  <p className="text-gray-600 mb-6">
                    {filterMode !== 'all' 
                      ? `No ${filterMode} lessons found. Try a different filter.`
                      : "You don't have any scheduled lessons yet."
                    }
                  </p>
                  {filterMode !== 'all' && (
                    <button 
                      onClick={() => setFilterMode('all')}
                      className="px-6 py-3 border-2 border-[#FF6636] text-[#FF6636] rounded-xl font-semibold hover:bg-[#FF6636] hover:text-white transition-all inline-flex items-center gap-2"
                    >
                      Clear Filter
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredUpcomingLessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="border border-gray-200 rounded-2xl p-5 hover:shadow-md hover:border-[#FF6636]/30 transition-all"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        {/* Student Avatar */}
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-14 h-14 rounded-full bg-[#FF6636] flex items-center justify-center text-white font-bold text-lg shrink-0">
                            {lesson.studentInitials}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-bold text-gray-900">{lesson.studentName}</h3>
                              {getStatusBadge(lesson.isLive ? 'live' : lesson.status)}
                            </div>
                            <p className="text-sm text-gray-600 mb-1">{lesson.subject} - {lesson.topic}</p>
                            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" variant="Linear" />
                                <span>{formatDate(lesson.date)}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" variant="Linear" />
                                <span>{lesson.time}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                {lesson.mode === 'Online' ? (
                                  <Video className="w-4 h-4" variant="Linear" />
                                ) : (
                                  <Location className="w-4 h-4" variant="Linear" />
                                )}
                                <span>{lesson.mode}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => {
                              setSelectedLesson(lesson);
                              setShowCreateAssignmentModal(true);
                            }}
                            className="px-4 py-2 border-2 border-[rgb(1,27,51)] text-[rgb(1,27,51)] rounded-xl font-semibold hover:bg-[rgb(1,27,51)] hover:text-white transition-all text-sm flex items-center gap-2"
                          >
                            <Add className="w-4 h-4" variant="Bold" />
                            Add Assignment
                          </button>
                          {lesson.isLive && lesson.mode === 'Online' && lesson.meetingLink && (
                            <button 
                              onClick={() => setActiveLiveLesson(lesson)}
                              className="px-4 py-2 bg-[#23BD33] text-white rounded-xl font-semibold hover:bg-[#1fa82b] transition-all text-sm flex items-center gap-2"
                            >
                              <Video className="w-4 h-4" variant="Bold" />
                              Join
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Completed Lessons */}
          {activeTab === 'completed' && (
            <div>
              {filteredCompletedLessons.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                    <Book1 className="w-10 h-10 text-gray-400" variant="Bold" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">No Completed Lessons</h3>
                  <p className="text-gray-600">
                    {filterMode !== 'all' 
                      ? `No ${filterMode} lessons found. Try a different filter.`
                      : "Your completed lessons will appear here."
                    }
                  </p>
                  {filterMode !== 'all' && (
                    <button 
                      onClick={() => setFilterMode('all')}
                      className="mt-6 px-6 py-3 border-2 border-[#FF6636] text-[#FF6636] rounded-xl font-semibold hover:bg-[#FF6636] hover:text-white transition-all inline-flex items-center gap-2"
                    >
                      Clear Filter
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredCompletedLessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="border border-gray-200 rounded-2xl p-5 hover:shadow-md hover:border-gray-300 transition-all"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        {/* Student Avatar */}
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-bold text-lg shrink-0">
                            {lesson.studentInitials}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-bold text-gray-900">{lesson.studentName}</h3>
                              {getStatusBadge(lesson.status)}
                            </div>
                            <p className="text-sm text-gray-600 mb-1">{lesson.subject} - {lesson.topic}</p>
                            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" variant="Linear" />
                                <span>{formatDate(lesson.date)}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" variant="Linear" />
                                <span>{lesson.time}</span>
                              </div>
                              {lesson.rating && (
                                <div className="flex items-center gap-1 text-yellow-600">
                                  <Star1 className="w-4 h-4" variant="Bold" />
                                  <span className="font-semibold">{lesson.rating}.0</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Notes */}
                        {lesson.notes && (
                          <div className="lg:max-w-xs">
                            <p className="text-xs text-gray-500 italic">"{lesson.notes}"</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Assignments */}
          {activeTab === 'assignments' && (
            <div>
              {filteredAssignments.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                    <DocumentText className="w-10 h-10 text-gray-400" variant="Bold" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">No Assignments</h3>
                  <p className="text-gray-600">Assignments you create will appear here.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredAssignments.map((assignment) => (
                    <div
                      key={assignment.id}
                      className="border border-gray-200 rounded-2xl p-5 hover:shadow-md hover:border-[#FF6636]/30 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        {/* Assignment Info */}
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
                            <DocumentText className="w-6 h-6 text-[#FF6636]" variant="Bold" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-bold text-gray-900">{assignment.title}</h3>
                              {getStatusBadge(assignment.status)}
                            </div>
                            <p className="text-sm text-gray-600 mb-1">
                              {assignment.studentName} - {assignment.subject}
                            </p>
                            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" variant="Linear" />
                                <span>Due: {formatDate(assignment.dueDate)}</span>
                              </div>
                              {assignment.submittedDate && (
                                <div className="flex items-center gap-1 text-green-600">
                                  <TickCircle className="w-4 h-4" variant="Bold" />
                                  <span>Submitted {formatDate(assignment.submittedDate)}</span>
                                </div>
                              )}
                              {assignment.grade && (
                                <div className="flex items-center gap-1 text-green-600 font-semibold">
                                  <span>Grade: {assignment.grade}%</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          {/* Show Grade button only for submitted assignments */}
                          {assignment.status === 'submitted' && (
                            <button 
                              onClick={() => {
                                setSelectedAssignment(assignment);
                                setShowGradeAssignmentModal(true);
                              }}
                              className="px-4 py-2 bg-[#FF6636] text-white rounded-xl font-semibold hover:bg-[#E55A2B] transition-all text-sm"
                            >
                              Grade Assignment
                            </button>
                          )}
                          
                          {/* Show Message icon for overdue assignments */}
                          {assignment.status === 'overdue' && (
                            <button 
                              onClick={() => toast.success(`Messaging ${assignment.studentName}...`)}
                              className="p-2.5 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Message student about overdue assignment"
                            >
                              <Message className="w-5 h-5 text-blue-600" variant="Bold" />
                            </button>
                          )}
                          
                          {/* No icon for pending and graded statuses */}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Create Assignment Modal */}
      {showCreateAssignmentModal && (
        <CreateAssignmentModal
          onClose={() => setShowCreateAssignmentModal(false)}
          lesson={selectedLesson}
        />
      )}

      {/* Grade Assignment Modal */}
      {showGradeAssignmentModal && (
        <GradeAssignmentModal
          onClose={() => setShowGradeAssignmentModal(false)}
          assignment={selectedAssignment}
        />
      )}
    </div>
  );
}