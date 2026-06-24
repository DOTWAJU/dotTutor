import React from 'react';
import { Book1, Calendar, TickCircle, CloseCircle, SearchNormal1, Clock, More } from 'iconsax-react';
import { toast } from 'sonner';

const DEMO_REQUESTS = [
  {
    id: '1',
    tutorName: 'Aroopo Johnson',
    tutorInitials: 'AJ',
    tutorSubjects: ['English Language', 'French'],
    studentName: 'Sarah Johnson',
    studentInitials: 'SJ',
    studentSubject: 'English Language',
    requestDate: 'March 23, 2026',
    status: 'pending',
    tutorComment: null,
    preferredMode: 'Online',
    availability: 'Mon, Wed, Fri'
  },
  {
    id: '2',
    tutorName: 'Basida Cynthia',
    tutorInitials: 'BC',
    tutorSubjects: ['Mathematics'],
    studentName: 'Michael Chen',
    studentInitials: 'MC',
    studentSubject: 'Mathematics',
    requestDate: 'March 22, 2026',
    status: 'rejected',
    tutorComment: 'I had an important emergency so I can\'t tutor the student.',
    preferredMode: 'Hybrid',
    availability: 'Tue, Thu, Sat'
  }
];

export function IndicatedInterestPage() {
  const [requests, setRequests] = React.useState(DEMO_REQUESTS);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('all');
  const [openActionMenuId, setOpenActionMenuId] = React.useState<string | null>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.action-menu-container')) {
        setOpenActionMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleApprove = (requestId: string, tutorName: string, studentName: string) => {
    setRequests(requests.map(req => 
      req.id === requestId ? { ...req, status: 'approved' } : req
    ));
    toast.success(`Match approved! ${tutorName} and ${studentName} have been notified.`);
    setOpenActionMenuId(null);
  };

  const handleReject = (requestId: string, tutorName: string, studentName: string) => {
    setRequests(requests.map(req => 
      req.id === requestId ? { ...req, status: 'rejected' } : req
    ));
    toast.success(`Match rejected. ${tutorName} and ${studentName} have been notified.`);
    setOpenActionMenuId(null);
  };

  const filteredRequests = requests.filter(req => {
    const matchesSearch = 
      req.tutorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.studentSubject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || req.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const approvedCount = requests.filter(r => r.status === 'approved').length;
  const rejectedCount = requests.filter(r => r.status === 'rejected').length;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Indicated Interest
        </h2>
        <p className="text-sm md:text-base text-gray-600">
          Review and approve tutor-student match requests
        </p>
      </div>

      {/* Stats Card - Single Card with All Statuses in One Row */}
      <div className="bg-white rounded-2xl p-4 md:p-6 border border-gray-200 mb-6">
        <div className="grid grid-cols-3 gap-3 md:gap-6">
          <div className="text-center">
            <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-2 md:mb-3">
              <Clock className="w-5 h-5 md:w-7 md:h-7 text-[#FF6636]" variant="Bold" />
            </div>
            <p className="text-xs md:text-sm text-gray-600 mb-1 font-medium">Pending</p>
            <p className="text-2xl md:text-3xl font-bold text-[#FF6636]">{pendingCount}</p>
          </div>

          <div className="text-center border-x border-gray-200">
            <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-2 md:mb-3">
              <TickCircle className="w-5 h-5 md:w-7 md:h-7 text-green-600" variant="Bold" />
            </div>
            <p className="text-xs md:text-sm text-gray-600 mb-1 font-medium">Approved</p>
            <p className="text-2xl md:text-3xl font-bold text-green-600">{approvedCount}</p>
          </div>

          <div className="text-center">
            <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-2 md:mb-3">
              <CloseCircle className="w-5 h-5 md:w-7 md:h-7 text-red-600" variant="Bold" />
            </div>
            <p className="text-xs md:text-sm text-gray-600 mb-1 font-medium">Rejected</p>
            <p className="text-2xl md:text-3xl font-bold text-red-600">{rejectedCount}</p>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <SearchNormal1 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by tutor, student, or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6636]"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6636] bg-white"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Requests Cards Grid */}
      {filteredRequests.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {filteredRequests.map((request) => (
            <div
              key={request.id}
              className={`bg-white rounded-2xl border p-6 hover:shadow-lg transition-all ${
                request.status === 'pending' 
                  ? 'border-gray-200' 
                  : request.status === 'approved'
                  ? 'border-green-200 bg-green-50/30'
                  : 'border-red-200 bg-red-50/30'
              }`}
            >
              {/* Header with Status */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-xs text-gray-600">{request.requestDate}</span>
                </div>
                <div className="flex items-center gap-3">
                  {request.status === 'pending' && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-700">
                      PENDING REVIEW
                    </span>
                  )}
                  {request.status === 'approved' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                      <TickCircle size={14} variant="Bold" />
                      APPROVED
                    </span>
                  )}
                  {request.status === 'rejected' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
                      <CloseCircle size={14} variant="Bold" />
                      REJECTED
                    </span>
                  )}

                  {/* Action Menu */}
                  {request.status === 'pending' && (
                    <div className="relative action-menu-container">
                      <button
                        onClick={() => setOpenActionMenuId(openActionMenuId === request.id ? null : request.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <More className="w-5 h-5 text-gray-600 rotate-90" />
                      </button>

                      {openActionMenuId === request.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-50">
                          <ul className="py-2">
                            <li>
                              <button
                                onClick={() => handleApprove(request.id, request.tutorName, request.studentName)}
                                className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 flex items-center gap-3 transition-colors"
                              >
                                <TickCircle className="w-4 h-4 text-green-600" variant="Bold" />
                                <span className="text-gray-900">Approve Match</span>
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={() => handleReject(request.id, request.tutorName, request.studentName)}
                                className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 flex items-center gap-3 transition-colors"
                              >
                                <CloseCircle className="w-4 h-4 text-red-600" variant="Bold" />
                                <span className="text-gray-900">Reject Match</span>
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Tutor & Student Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                {/* Tutor Card */}
                <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                  <p className="text-xs font-bold text-gray-500 uppercase mb-3">Tutor</p>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold shrink-0">
                      {request.tutorInitials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 text-sm truncate">{request.tutorName}</h4>
                      <div className="flex items-center gap-1 mt-1">
                        <Book1 className="w-3 h-3 text-[#FF6636]" variant="Bold" />
                        <span className="text-xs text-gray-600 truncate">
                          {request.tutorSubjects.join(', ')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">Mode:</span>
                      <span className="px-2 py-0.5 bg-orange-50 text-[#FF6636] rounded text-xs font-semibold">
                        {request.preferredMode}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">Available:</span>
                      <span className="text-xs text-gray-700 font-medium">{request.availability}</span>
                    </div>
                  </div>
                </div>

                {/* Student Card */}
                <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                  <p className="text-xs font-bold text-gray-500 uppercase mb-3">Student</p>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white font-bold shrink-0">
                      {request.studentInitials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 text-sm truncate">{request.studentName}</h4>
                      <div className="flex items-center gap-1 mt-1">
                        <Book1 className="w-3 h-3 text-[#FF6636]" variant="Bold" />
                        <span className="text-xs text-gray-600 truncate">
                          Needs help in {request.studentSubject}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tutor Comment - Only show if comment exists (for rejected tutors) */}
              {request.tutorComment && (
                <div className={`border rounded-xl p-4 ${
                  request.status === 'rejected' 
                    ? 'bg-red-50 border-red-200' 
                    : 'bg-blue-50 border-blue-200'
                }`}>
                  <p className={`text-xs font-bold mb-2 ${
                    request.status === 'rejected' ? 'text-red-900' : 'text-blue-900'
                  }`}>
                    Tutor's Comment:
                  </p>
                  <p className={`text-sm leading-relaxed ${
                    request.status === 'rejected' ? 'text-red-800' : 'text-blue-800'
                  }`}>
                    "{request.tutorComment}"
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <SearchNormal1 className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Requests Found</h3>
          <p className="text-gray-600">
            No tutor-student interest requests match your filters
          </p>
        </div>
      )}
    </div>
  );
}