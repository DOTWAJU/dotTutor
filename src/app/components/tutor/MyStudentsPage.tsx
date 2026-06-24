import React from 'react';
import {
  SearchNormal1,
  Filter,
  People,
  Book1,
  MessageText,
  Star1,
  Calendar,
  ArrowRight2,
  CloseCircle,
  TickCircle,
  Chart,
  DocumentText,
  ClipboardText,
} from 'iconsax-react';
import { StudentDetailsModal } from './StudentDetailsModal';

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

interface MyStudentsPageProps {
  onScheduleLesson?: () => void;
}

export function MyStudentsPage({ onScheduleLesson }: MyStudentsPageProps = {}) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState<'all' | 'active' | 'pending' | 'completed'>('all');
  const [selectedStudent, setSelectedStudent] = React.useState<Student | null>(null);
  const [showFilterMenu, setShowFilterMenu] = React.useState(false);

  // Demo student data
  const allStudents: Student[] = [
    {
      id: '1',
      name: 'John Doe',
      initials: 'JD',
      subject: 'Mathematics',
      enrolledDate: 'Jan 15, 2026',
      totalLessons: 4,
      completedLessons: 2,
      upcomingLesson: 'Tomorrow at 2:00 PM',
      rating: 5,
      status: 'active',
      progressPercentage: 50,
    },
    {
      id: '2',
      name: 'Jane Smith',
      initials: 'JS',
      subject: 'Physics',
      enrolledDate: 'Jan 20, 2026',
      totalLessons: 3,
      completedLessons: 3,
      rating: 5,
      status: 'completed',
      progressPercentage: 100,
    },
    {
      id: '3',
      name: 'Michael Brown',
      initials: 'MB',
      subject: 'Chemistry',
      enrolledDate: 'Feb 1, 2026',
      totalLessons: 2,
      completedLessons: 0,
      upcomingLesson: 'Pending confirmation',
      rating: 0,
      status: 'pending',
      progressPercentage: 0,
    },
  ];

  // Filter students based on search and status
  const filteredStudents = allStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || student.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Calculate stats
  const stats = {
    total: allStudents.length,
    active: allStudents.filter(s => s.status === 'active').length,
    avgProgress: Math.round(allStudents.reduce((acc, s) => acc + s.progressPercentage, 0) / allStudents.length),
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'completed':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <TickCircle className="w-4 h-4" variant="Bold" />;
      case 'pending':
        return <Calendar className="w-4 h-4" variant="Bold" />;
      case 'completed':
        return <Chart className="w-4 h-4" variant="Bold" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Stats Card - Single Card with All Statuses */}
      <div className="bg-white rounded-2xl p-4 md:p-6 border border-gray-200 mb-6 md:mb-8">
        <div className="grid grid-cols-3 gap-3 md:gap-6">
          <div className="text-center">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-2 md:mb-3">
              <TickCircle className="w-5 h-5 md:w-6 md:h-6 text-green-600" variant="Bold" />
            </div>
            <p className="text-xs md:text-sm text-gray-600 mb-1 font-medium">Active</p>
            <p className="text-2xl md:text-3xl font-bold text-gray-900">{stats.active}</p>
          </div>

          <div className="text-center border-x border-gray-200">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-2 md:mb-3">
              <Calendar className="w-5 h-5 md:w-6 md:h-6 text-yellow-600" variant="Bold" />
            </div>
            <p className="text-xs md:text-sm text-gray-600 mb-1 font-medium">Pending</p>
            <p className="text-2xl md:text-3xl font-bold text-gray-900">{allStudents.filter(s => s.status === 'pending').length}</p>
          </div>

          <div className="text-center">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2 md:mb-3">
              <Chart className="w-5 h-5 md:w-6 md:h-6 text-blue-600" variant="Bold" />
            </div>
            <p className="text-xs md:text-sm text-gray-600 mb-1 font-medium">Completed</p>
            <p className="text-2xl md:text-3xl font-bold text-gray-900">{allStudents.filter(s => s.status === 'completed').length}</p>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-2xl p-4 lg:p-6 border border-gray-200 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <SearchNormal1 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search students by name or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6636] focus:border-transparent"
            />
          </div>

          {/* Filter Button */}
          <div className="relative">
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className="w-full sm:w-auto flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-5 h-5 text-gray-600" variant="Linear" />
              <span className="font-medium text-gray-700">
                {filterStatus === 'all' ? 'All Students' : filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)}
              </span>
            </button>

            {/* Filter Dropdown */}
            {showFilterMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 z-20">
                <div className="p-2">
                  {(['all', 'active', 'pending', 'completed'] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setFilterStatus(status);
                        setShowFilterMenu(false);
                      }}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        filterStatus === status
                          ? 'bg-[#FF6636] text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {status === 'all' ? 'All Students' : status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Active Filters */}
        {(searchQuery || filterStatus !== 'all') && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200">
            <span className="text-sm text-gray-600">Active filters:</span>
            {searchQuery && (
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs flex items-center gap-2">
                Search: {searchQuery}
                <button onClick={() => setSearchQuery('')}>
                  <CloseCircle className="w-4 h-4" variant="Bold" />
                </button>
              </span>
            )}
            {filterStatus !== 'all' && (
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs flex items-center gap-2">
                Status: {filterStatus}
                <button onClick={() => setFilterStatus('all')}>
                  <CloseCircle className="w-4 h-4" variant="Bold" />
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Students List */}
      {filteredStudents.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200"
            >
              {/* Student Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FF6636] to-[#FF8C5A] flex items-center justify-center text-white font-bold text-lg">
                    {student.initials}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{student.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Book1 className="w-4 h-4 text-gray-400" variant="Linear" />
                      <p className="text-sm text-gray-600">{student.subject}</p>
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${getStatusColor(student.status)}`}>
                  {getStatusIcon(student.status)}
                  <span className="text-xs font-semibold capitalize">{student.status}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-600 font-medium">Lesson Progress</span>
                  <span className="text-xs font-bold text-gray-900">{student.progressPercentage}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#FF6636] to-[#FF8C5A] transition-all duration-500"
                    style={{ width: `${student.progressPercentage}%` }}
                  />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-gray-200">
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Completed</p>
                  <p className="text-lg font-bold text-gray-900">{student.completedLessons}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Total</p>
                  <p className="text-lg font-bold text-gray-900">{student.totalLessons}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Rating</p>
                  <div className="flex items-center justify-center gap-1">
                    <Star1 className="w-4 h-4 text-[#FF6636]" variant="Bold" />
                    <p className="text-lg font-bold text-gray-900">
                      {student.completedLessons === student.totalLessons && student.rating > 0 ? student.rating : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Lesson Booked:</span>
                  <span className="text-gray-900 font-medium">{student.enrolledDate}</span>
                </div>
                {student.upcomingLesson && student.status === 'active' && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Next Lesson:</span>
                    <span className="text-[#FF6636] font-medium">{student.upcomingLesson}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedStudent(student)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#FF6636] text-white rounded-xl font-semibold hover:bg-[#E55A2B] transition-all"
                >
                  View Details
                  <ArrowRight2 className="w-4 h-4" />
                </button>
                <button className="px-4 py-2.5 border-2 border-gray-200 text-gray-700 rounded-xl hover:border-[#FF6636] hover:text-[#FF6636] transition-all">
                  <MessageText className="w-5 h-5" variant="Linear" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl p-12 border border-gray-200 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
              <People className="w-10 h-10 text-gray-400" variant="Bold" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">No students found</h3>
            <p className="text-gray-600">
              {searchQuery || filterStatus !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Students who enroll in your courses will appear here'}
            </p>
          </div>
        </div>
      )}

      {/* Student Detail Modal */}
      {selectedStudent && (
        <StudentDetailsModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
          onScheduleLesson={onScheduleLesson}
        />
      )}
    </div>
  );
}