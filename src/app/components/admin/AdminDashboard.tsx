import React from 'react';
import { 
  ArrowDown2, 
  Home2, 
  People, 
  Teacher,
  Wallet3,
  Chart,
  Setting2,
  LogoutCurve,
  HambergerMenu,
  CloseCircle,
  SearchNormal1,
  Filter,
  TickCircle,
  CloseCircle as Cancel,
  Clock,
  Eye,
  Edit2,
  Trash,
  Add,
  ArrowUp2,
  ArrowDown,
  Profile2User,
  Card,
  MoneyRecive,
  UserSquare,
  DocumentText,
  ArrowSquareLeft,
  ArrowSquareRight,
  More,
  MessageQuestion,
  Danger,
  InfoCircle,
  Calendar,
  Book1,
  Messages2,
  VideoPlay,
  Star1
} from 'iconsax-react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Logo from '../../imports/Logo-4004-36';
import { toast } from 'sonner';
import { Toaster } from '../ui/sonner';
import { IndicatedInterestPage } from './IndicatedInterestPage';

// Dot-tutor Icon Component
function DotTutorIcon() {
  return (
    <div className="h-[28px] w-[28px] flex items-center justify-center">
      <Teacher 
        size={28} 
        variant="Bold"
        color="#FF6636"
      />
    </div>
  );
}

interface AdminDashboardProps {
  adminName?: string;
  userInitials?: string;
  onLogout?: () => void;
}

// Mock data
const DEMO_STUDENTS = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    initials: 'SJ',
    joinDate: new Date('2024-01-15'),
    status: 'active',
    totalLessons: 24,
    userType: 'Student' as const
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.c@email.com',
    initials: 'MC',
    joinDate: new Date('2024-02-10'),
    status: 'active',
    totalLessons: 0,
    userType: 'Student' as const
  }
];

const DEMO_TUTORS = [
  {
    id: '3',
    name: 'James Wilson',
    email: 'james.w@email.com',
    initials: 'JW',
    subjects: ['Mathematics', 'Physics'],
    joinDate: new Date('2024-01-10'),
    status: 'approved',
    totalLessons: 156,
    earnings: 12450,
    rating: 4.9,
    type: 'Tutor' as const,
    userType: 'Tutor' as const
  },
  {
    id: '4',
    name: 'Maria Garcia',
    email: 'maria.g@email.com',
    initials: 'MG',
    subjects: ['Chemistry', 'Biology'],
    joinDate: new Date('2024-01-20'),
    status: 'approved',
    totalLessons: 89,
    earnings: 11360,
    rating: 5.0,
    type: 'Tutor' as const,
    userType: 'Tutor' as const
  }
];

const DEMO_PENDING_TUTORS = [
  {
    id: '6',
    name: 'Amara Okafor',
    email: 'amara.o@email.com',
    initials: 'AO',
    subjects: ['Mathematics', 'Further Mathematics'],
    joinDate: new Date('2024-03-18'),
    status: 'pending',
    totalLessons: 0,
    earnings: 0,
    rating: 0,
    applicationDate: new Date('2024-03-18'),
    highestDegree: "Master's Degree",
    institution: 'University of Ibadan',
    experienceYears: 8
  },
  {
    id: '7',
    name: 'Chioma Eze',
    email: 'chioma.e@email.com',
    initials: 'CE',
    subjects: ['Chemistry', 'Biology', 'Physics'],
    joinDate: new Date('2024-03-19'),
    status: 'pending',
    totalLessons: 0,
    earnings: 0,
    rating: 0,
    applicationDate: new Date('2024-03-19'),
    highestDegree: "Bachelor's Degree",
    institution: 'Covenant University',
    experienceYears: 3
  }
];

const DEMO_TRANSACTIONS = [
  {
    id: '2',
    studentName: 'Michael Chen',
    amount: 30,
    type: 'lesson_payment',
    date: new Date('2024-03-14'),
    status: 'completed'
  },
  {
    id: '4',
    studentName: 'Sarah Johnson',
    amount: 45,
    type: 'lesson_payment',
    date: new Date('2024-03-15'),
    status: 'completed'
  },
  {
    id: '5',
    studentName: 'Emma Williams',
    amount: 25,
    type: 'lesson_payment',
    date: new Date('2024-03-13'),
    status: 'pending'
  }
];

const DEMO_TUTOR_TRANSACTIONS = [
  {
    id: 'TUT001',
    tutorName: 'James Wilson',
    tutorInitials: 'JW',
    accountNumber: '0123456789',
    bankName: 'GTBank',
    lessonStatus: 'Completed',
    studentName: 'Sarah Johnson',
    subject: 'Mathematics',
    date: new Date('2024-03-15'),
    amountEarned: 5000,
    paymentStatus: 'Paid'
  },
  {
    id: 'TUT002',
    tutorName: 'James Wilson',
    tutorInitials: 'JW',
    accountNumber: '0123456789',
    bankName: 'GTBank',
    lessonStatus: 'Completed',
    studentName: 'Michael Chen',
    subject: 'Physics',
    date: new Date('2024-03-14'),
    amountEarned: 6000,
    paymentStatus: 'Paid'
  },
  {
    id: 'TUT003',
    tutorName: 'Maria Garcia',
    tutorInitials: 'MG',
    accountNumber: '9876543210',
    bankName: 'Access Bank',
    lessonStatus: 'In Progress',
    studentName: 'Emma Williams',
    subject: 'Chemistry',
    date: new Date('2024-03-16'),
    amountEarned: 5500,
    paymentStatus: 'Pending'
  },
  {
    id: 'TUT004',
    tutorName: 'James Wilson',
    tutorInitials: 'JW',
    accountNumber: '0123456789',
    bankName: 'GTBank',
    lessonStatus: 'In Progress',
    studentName: 'David Brown',
    subject: 'Mathematics',
    date: new Date('2024-03-17'),
    amountEarned: 4500,
    paymentStatus: 'Pending'
  },
  {
    id: 'TUT005',
    tutorName: 'Maria Garcia',
    tutorInitials: 'MG',
    accountNumber: '9876543210',
    bankName: 'Access Bank',
    lessonStatus: 'Completed',
    studentName: 'Lisa Anderson',
    subject: 'Biology',
    date: new Date('2024-03-13'),
    amountEarned: 5000,
    paymentStatus: 'Paid'
  },
];

// Student Lessons Data - Maps students to their lessons with tutors
const STUDENT_LESSONS_DATA: Record<string, Array<{
  tutor: { name: string; initials: string };
  subject: string;
  status: 'Active' | 'Completed';
  progress: number;
  completed: number;
  total: number;
  rating: number;
  days: string[];
  timeSlot: string;
  nextLesson?: string;
  completionDate?: string;
  review?: { rating: number; text: string };
}>> = {
  '1': [ // Sarah Johnson's lessons
    {
      tutor: { name: 'James Wilson', initials: 'JW' },
      subject: 'Mathematics',
      status: 'Active',
      progress: 60,
      completed: 6,
      total: 10,
      rating: 4.8,
      days: ['Mon', 'Wed', 'Fri'],
      timeSlot: '2:00 PM - 4:00 PM',
      nextLesson: 'Tomorrow at 2:00 PM',
      review: {
        rating: 5,
        text: 'Excellent tutor! Very patient and explains concepts clearly.'
      }
    },
    {
      tutor: { name: 'Maria Garcia', initials: 'MG' },
      subject: 'Physics',
      status: 'Completed',
      progress: 100,
      completed: 8,
      total: 8,
      rating: 5.0,
      days: ['Tue', 'Thu'],
      timeSlot: '3:00 PM - 5:00 PM',
      completionDate: 'Feb 3, 2026',
      review: {
        rating: 5,
        text: 'Amazing teacher with great teaching methods. Highly recommend!'
      }
    }
  ],
  '2': [ // Michael Chen's lessons
    {
      tutor: { name: 'Chinedu Okonkwo', initials: 'CO' },
      subject: 'Chemistry',
      status: 'Active',
      progress: 45,
      completed: 5,
      total: 11,
      rating: 4.7,
      days: ['Mon', 'Thu'],
      timeSlot: '10:00 AM - 12:00 PM',
      nextLesson: 'Monday at 10:00 AM',
      review: {
        rating: 5,
        text: 'Great tutor with deep knowledge of Chemistry.'
      }
    }
  ]
};

// Chart Data for Dashboard
const STUDENT_GROWTH_DATA = [
  { month: 'Jan', students: 8 },
  { month: 'Feb', students: 15 },
  { month: 'Mar', students: 22 },
  { month: 'Apr', students: 35 },
  { month: 'May', students: 42 },
  { month: 'Jun', students: 58 },
  { month: 'Jul', students: 68 },
  { month: 'Aug', students: 82 },
  { month: 'Sep', students: 95 },
  { month: 'Oct', students: 108 },
  { month: 'Nov', students: 122 },
  { month: 'Dec', students: 140 },
];

const REVENUE_DATA = [
  { month: 'Jan', revenue: 8500 },
  { month: 'Feb', revenue: 12200 },
  { month: 'Mar', revenue: 15800 },
  { month: 'Apr', revenue: 22400 },
  { month: 'May', revenue: 28600 },
  { month: 'Jun', revenue: 35200 },
  { month: 'Jul', revenue: 38900 },
  { month: 'Aug', revenue: 42150 },
  { month: 'Sep', revenue: 48300 },
  { month: 'Oct', revenue: 52700 },
  { month: 'Nov', revenue: 58400 },
  { month: 'Dec', revenue: 65890 },
];

const LESSONS_DATA = [
  { month: 'Jan', lessons: 12 },
  { month: 'Feb', lessons: 28 },
  { month: 'Mar', lessons: 45 },
  { month: 'Apr', lessons: 68 },
  { month: 'May', lessons: 92 },
  { month: 'Jun', lessons: 118 },
  { month: 'Jul', lessons: 142 },
  { month: 'Aug', lessons: 165 },
  { month: 'Sep', lessons: 188 },
  { month: 'Oct', lessons: 215 },
  { month: 'Nov', lessons: 245 },
  { month: 'Dec', lessons: 280 },
];

const DEMO_HELPDESK_TICKETS = [
  {
    id: 'TKT-1711449123456',
    category: 'tutor_request',
    subject: 'Tutor Request: Mathematics',
    description: 'Student needs a Mathematics tutor for Advanced Calculus. Prefers online lessons with availability on weekdays.',
    status: 'Pending',
    priority: 'High Priority',
    level: 'Tertiary',
    language: 'English',
    mode: 'Online',
    availability: 'Apr 5, 2026',
    timeAgo: '2 hours ago',
  },
  {
    id: 'TKT-1711448923456',
    category: 'general_support',
    subject: 'Cannot access payment history',
    description: 'Student reports that the "My Payments" page is not loading their transaction history. They need to download receipts for recent bookings.',
    status: 'In Progress',
    priority: 'Low Priority',
    timeAgo: '5 hours ago',
    adminResponse: 'We\'re looking into this issue. Our technical team has been notified and will resolve it within 24 hours.',
  },
  {
    id: 'TKT-1711448912345',
    category: 'reported_issue',
    subject: 'Tutor unprofessional behavior',
    description: 'Student reports that tutor joined the lesson 30 minutes late without prior notice and was not prepared for the session.',
    status: 'Resolved',
    priority: 'Urgent',
    timeAgo: '1 day ago',
    resolution: 'We\'ve spoken with the tutor and issued a warning. Student has been given a full refund and a discount code for their next booking.',
  },
];

export function AdminDashboard({ adminName = 'Admin', userInitials = 'AD', onLogout }: AdminDashboardProps) {
  const [activePage, setActivePage] = React.useState('Dashboard');
  const [activeSidebarItem, setActiveSidebarItem] = React.useState('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] = React.useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [userTypeFilter, setUserTypeFilter] = React.useState<'all' | 'students' | 'tutors'>('all');
  const [tutorStatusFilter, setTutorStatusFilter] = React.useState<'all' | 'pending' | 'approved'>('all');
  const [openActionMenuId, setOpenActionMenuId] = React.useState<string | null>(null);
  const [helpdeskFilter, setHelpdeskFilter] = React.useState<'all' | 'tutor_request' | 'general_support' | 'reported_issue'>('all');
  const [helpdeskStatusFilter, setHelpdeskStatusFilter] = React.useState<'all' | 'Pending' | 'Resolved' | 'In Progress'>('all');
  const [helpdeskSearchQuery, setHelpdeskSearchQuery] = React.useState('');
  const [viewProfileUser, setViewProfileUser] = React.useState<any | null>(null);
  const [viewProfileType, setViewProfileType] = React.useState<'Student' | 'Tutor' | null>(null);
  const [isTutorActive, setIsTutorActive] = React.useState(false);
  const [approvedTutorIds, setApprovedTutorIds] = React.useState<string[]>([]);
  const [rejectedTutorIds, setRejectedTutorIds] = React.useState<string[]>([]);
  const [openPendingActionMenuId, setOpenPendingActionMenuId] = React.useState<string | null>(null);
  const [financialTransactionTab, setFinancialTransactionTab] = React.useState<'Students' | 'Tutors'>('Students');
  const [financialSearchQuery, setFinancialSearchQuery] = React.useState('');
  const profileDropdownRef = React.useRef<HTMLDivElement>(null);

  // Sidebar menu items
  const menuItems = [
    { name: 'Dashboard', icon: Home2 },
    { name: 'Indicated Interest', icon: UserSquare },
    { name: 'Tutor Approval', icon: Teacher },
    { name: 'Helpdesk', icon: MessageQuestion },
    { name: 'Users', icon: People },
    { name: 'Financials', icon: Wallet3 },
    { name: 'Settings', icon: Setting2 },
  ];

  // Dashboard stats
  const activePendingTutors = DEMO_PENDING_TUTORS.filter(t => 
    !approvedTutorIds.includes(t.id) && !rejectedTutorIds.includes(t.id)
  ).length;
  
  const stats = {
    totalUsers: DEMO_STUDENTS.length + DEMO_TUTORS.length + approvedTutorIds.length,
    totalStudents: DEMO_STUDENTS.length,
    totalTutors: DEMO_TUTORS.length + approvedTutorIds.length,
    pendingTutors: activePendingTutors,
    monthlyRevenue: 15240,
    totalLessons: DEMO_TUTORS.reduce((sum, t) => sum + t.totalLessons, 0),
    activeUsers: DEMO_STUDENTS.filter(s => s.status === 'active').length,
    revenueGrowth: '+12.5%'
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
      // Close action menu when clicking outside
      if (openActionMenuId) {
        const target = event.target as HTMLElement;
        if (!target.closest('.action-menu-container')) {
          setOpenActionMenuId(null);
        }
      }
      // Close pending action menu when clicking outside
      if (openPendingActionMenuId) {
        const target = event.target as HTMLElement;
        if (!target.closest('.pending-action-menu-container')) {
          setOpenPendingActionMenuId(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openActionMenuId, openPendingActionMenuId]);

  // Set tutor active status based on approval when profile opens
  React.useEffect(() => {
    if (viewProfileUser && viewProfileType === 'Tutor') {
      // Check if this tutor is in approved list or is already an approved tutor from DEMO_TUTORS
      const isApproved = approvedTutorIds.includes(viewProfileUser.id) || 
                         DEMO_TUTORS.some(t => t.id === viewProfileUser.id);
      setIsTutorActive(isApproved);
    }
  }, [viewProfileUser, viewProfileType, approvedTutorIds]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Handle tutor approval
  const handleApproveTutor = (tutorId: string, tutorName: string) => {
    setApprovedTutorIds([...approvedTutorIds, tutorId]);
    setRejectedTutorIds(rejectedTutorIds.filter(id => id !== tutorId));
    setOpenPendingActionMenuId(null);
    toast.success(`${tutorName} has been approved!`, {
      description: 'The tutor can now access their dashboard and receive bookings.',
    });
  };

  // Handle tutor rejection
  const handleRejectTutor = (tutorId: string, tutorName: string) => {
    setRejectedTutorIds([...rejectedTutorIds, tutorId]);
    setApprovedTutorIds(approvedTutorIds.filter(id => id !== tutorId));
    setOpenPendingActionMenuId(null);
    toast.error(`${tutorName} has been rejected`, {
      description: 'The tutor has been notified of the decision.',
    });
  };

  // Get tutor status
  const getTutorStatus = (tutorId: string) => {
    if (approvedTutorIds.includes(tutorId)) return 'approved';
    if (rejectedTutorIds.includes(tutorId)) return 'rejected';
    return 'pending';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
      case 'approved':
      case 'completed':
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">Active</span>;
      case 'inactive':
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">Inactive</span>;
      case 'pending':
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">Pending</span>;
      case 'rejected':
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">Rejected</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex bg-orange-50/20">
      {/* Sidebar - Desktop */}
      <aside 
        className={`hidden lg:flex lg:flex-col bg-white border-r border-gray-200 transition-all duration-300 ${
          isDesktopSidebarCollapsed ? 'lg:w-20' : 'lg:w-64'
        }`}
      >
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          {isDesktopSidebarCollapsed ? (
            <div className="mx-auto">
              <DotTutorIcon />
            </div>
          ) : (
            <>
              <Logo />
              <button
                onClick={() => setIsDesktopSidebarCollapsed(true)}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                title="Minimize sidebar"
              >
                <ArrowSquareLeft className="w-5 h-5 text-gray-600" />
              </button>
            </>
          )}
        </div>

        {/* Expand Button when collapsed */}
        {isDesktopSidebarCollapsed && (
          <div className="px-4 py-2">
            <button
              onClick={() => setIsDesktopSidebarCollapsed(false)}
              className="w-full p-2 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-center"
              title="Expand sidebar"
            >
              <ArrowSquareRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        )}

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSidebarItem === item.name;
              
              return (
                <li key={item.name}>
                  <button
                    onClick={() => {
                      setActivePage(item.name);
                      setActiveSidebarItem(item.name);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive ? 'bg-orange-50 shadow-sm' : 'hover:bg-gray-50'
                    } ${isDesktopSidebarCollapsed ? 'justify-center' : ''}`}
                    title={isDesktopSidebarCollapsed ? item.name : ''}
                  >
                    <Icon 
                      className="w-5 h-5" 
                      variant={isActive ? 'Bold' : 'Linear'}
                      color={isActive ? '#FF6636' : 'rgb(100, 116, 139)'} 
                    />
                    {!isDesktopSidebarCollapsed && (
                      <span className={`text-sm font-medium ${
                        isActive ? 'text-[#FF6636]' : 'text-gray-600'
                      }`}>
                        {item.name}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => onLogout && onLogout()}
            className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 rounded-xl transition-colors ${
              isDesktopSidebarCollapsed ? 'justify-center' : ''
            }`}
            title="Logout"
          >
            <LogoutCurve className="w-5 h-5 text-red-500" />
            {!isDesktopSidebarCollapsed && (
              <span className="text-sm text-red-500 font-medium">Logout</span>
            )}
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/40 z-40 transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Mobile */}
      <aside 
        className={`lg:hidden fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 flex flex-col border-r border-gray-200 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <Logo />
          <button onClick={() => setIsSidebarOpen(false)} className="p-1 ml-2 flex-shrink-0">
            <CloseCircle className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.name;
              
              return (
                <li key={item.name}>
                  <button
                    onClick={() => {
                      setActivePage(item.name);
                      setActiveSidebarItem(item.name);
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive ? 'bg-orange-50 shadow-sm' : 'hover:bg-gray-50'
                    }`}
                  >
                    <Icon 
                      className="w-5 h-5" 
                      variant={isActive ? 'Bold' : 'Linear'}
                      color={isActive ? '#FF6636' : 'rgb(100, 116, 139)'} 
                    />
                    <span className={`text-[15px] font-semibold ${
                      isActive ? 'text-[#FF6636]' : 'text-gray-600'
                    }`}>
                      {item.name}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => onLogout && onLogout()}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 rounded-xl transition-colors"
          >
            <LogoutCurve className="w-5 h-5 text-red-500" />
            <span className="text-sm text-red-500 font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <HambergerMenu className="w-6 h-6 text-gray-500" />
            </button>

            <h1 className="text-xl font-bold text-[rgb(1,27,51)]">
              {activePage}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div ref={profileDropdownRef} className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-3 hover:bg-gray-50 px-3 py-2 rounded-xl transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-[#FF6636] flex items-center justify-center">
                  <span className="text-sm font-semibold text-white">
                    {userInitials}
                  </span>
                </div>

                <div className="hidden sm:flex flex-col items-start">
                  <span className="text-sm font-semibold text-[rgb(1,27,51)]">
                    {adminName}
                  </span>
                  <span className="text-xs text-gray-500">
                    Administrator
                  </span>
                </div>

                <ArrowDown2 
                  className={`w-4 h-4 text-gray-500 transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                  <ul className="py-2">
                    <li>
                      <button
                        onClick={() => {
                          onLogout && onLogout();
                          setIsProfileDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-3 text-left px-4 py-2.5 hover:bg-gray-50 transition-colors"
                      >
                        <LogoutCurve className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700">Logout</span>
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          {/* Dashboard Page */}
          {activePage === 'Dashboard' && (
            <div className="space-y-6">
              {/* Header */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Platform Overview</h2>
                <p className="text-sm md:text-base text-gray-600">Monitor performance and key metrics</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {/* Total Lessons */}
                <div className="bg-white rounded-2xl p-4 md:p-5 border border-gray-200 hover:shadow-md hover:border-[#FF6636]/30 transition-all relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-indigo-100/50 translate-x-8 -translate-y-8"></div>
                  <div className="relative z-10">
                    <p className="text-xs md:text-sm text-gray-600 mb-2 font-medium">Total Lessons</p>
                    <p className="text-2xl md:text-3xl font-bold text-gray-900">{stats.totalLessons}</p>
                  </div>
                </div>

                {/* Students */}
                <div className="bg-white rounded-2xl p-4 md:p-5 border border-gray-200 hover:shadow-md hover:border-[#FF6636]/30 transition-all relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-purple-100/50 translate-x-8 -translate-y-8"></div>
                  <div className="relative z-10">
                    <p className="text-xs md:text-sm text-gray-600 mb-2 font-medium">Students</p>
                    <p className="text-2xl md:text-3xl font-bold text-gray-900">{stats.totalStudents}</p>
                  </div>
                </div>

                {/* Tutors */}
                <div className="bg-white rounded-2xl p-4 md:p-5 border border-gray-200 hover:shadow-md hover:border-[#FF6636]/30 transition-all relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-orange-100/50 translate-x-8 -translate-y-8"></div>
                  <div className="relative z-10">
                    <p className="text-xs md:text-sm text-gray-600 mb-2 font-medium">Tutors</p>
                    <p className="text-2xl md:text-3xl font-bold text-gray-900">{stats.totalTutors}</p>
                  </div>
                </div>

                {/* Total Revenue */}
                <div className="bg-white rounded-2xl p-4 md:p-5 border border-gray-200 hover:shadow-md hover:border-[#FF6636]/30 transition-all relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-green-100/50 translate-x-8 -translate-y-8"></div>
                  <div className="relative z-10">
                    <p className="text-xs md:text-sm text-gray-600 mb-2 font-medium">Total Revenue</p>
                    <p className="text-2xl md:text-3xl font-bold text-gray-900">₦45,890</p>
                  </div>
                </div>
              </div>

              {/* Analytics Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Student Growth Chart */}
                <div className="bg-white rounded-2xl border border-gray-200">
                  <div className="p-4 md:p-6 border-b border-gray-200">
                    <h3 className="text-base md:text-lg font-bold text-gray-900">Student Growth</h3>
                    <p className="text-xs md:text-sm text-gray-600 mt-1">New student registrations over the year</p>
                  </div>
                  <div className="p-4 md:p-6">
                    <div className="w-full h-[250px] md:h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={STUDENT_GROWTH_DATA}>
                          <defs>
                            <linearGradient id="studentGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop key="student-stop-1" offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                              <stop key="student-stop-2" offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis dataKey="month" stroke="#9CA3AF" style={{ fontSize: '11px' }} />
                          <YAxis stroke="#9CA3AF" style={{ fontSize: '11px' }} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#fff', 
                              border: '1px solid #e5e7eb',
                              borderRadius: '8px',
                              fontSize: '12px'
                            }} 
                          />
                          <Area 
                            type="monotone" 
                            dataKey="students" 
                            stroke="#8B5CF6" 
                            strokeWidth={2}
                            fill="url(#studentGradient)" 
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Lessons Completed Chart */}
                <div className="bg-white rounded-2xl border border-gray-200">
                  <div className="p-4 md:p-6 border-b border-gray-200">
                    <h3 className="text-base md:text-lg font-bold text-gray-900">Lessons Completed</h3>
                    <p className="text-xs md:text-sm text-gray-600 mt-1">Total lessons over the year</p>
                  </div>
                  <div className="p-4 md:p-6">
                    <div className="w-full h-[250px] md:h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={LESSONS_DATA}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis dataKey="month" stroke="#9CA3AF" style={{ fontSize: '11px' }} />
                          <YAxis stroke="#9CA3AF" style={{ fontSize: '11px' }} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#fff', 
                              border: '1px solid #e5e7eb',
                              borderRadius: '8px',
                              fontSize: '12px'
                            }} 
                          />
                          <Bar dataKey="lessons" fill="#FF6636" radius={[8, 8, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Users Page */}
          {activePage === 'Users' && (() => {
            // Combine all users into one list
            const allUsers = [
              ...DEMO_STUDENTS.map(s => ({ ...s, type: 'Student' as const })),
              ...DEMO_TUTORS.filter(t => t.status === 'approved').map(t => ({ ...t, type: 'Tutor' as const }))
            ];

            // Filter based on userTypeFilter
            let filteredUsers = allUsers;
            if (userTypeFilter === 'students') {
              filteredUsers = allUsers.filter(u => u.type === 'Student');
            } else if (userTypeFilter === 'tutors') {
              filteredUsers = allUsers.filter(u => u.type === 'Tutor');
            }

            return (
              <div className="space-y-6">
                {/* Header */}
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">User Management</h2>
                  <p className="text-sm md:text-base text-gray-600">Manage all students and tutors on the platform</p>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-2xl border border-gray-200 p-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Search */}
                    <div className="relative flex-1">
                      <SearchNormal1 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-300 text-sm focus:border-[#FF6636] focus:outline-none transition-all"
                      />
                    </div>

                    {/* User Type Filter */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => setUserTypeFilter('all')}
                        className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                          userTypeFilter === 'all'
                            ? 'bg-[#FF6636] text-white shadow-sm'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        All Users
                      </button>
                      <button
                        onClick={() => setUserTypeFilter('students')}
                        className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                          userTypeFilter === 'students'
                            ? 'bg-[#FF6636] text-white shadow-sm'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        Students
                      </button>
                      <button
                        onClick={() => setUserTypeFilter('tutors')}
                        className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                          userTypeFilter === 'tutors'
                            ? 'bg-[#FF6636] text-white shadow-sm'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        Tutors
                      </button>
                    </div>
                  </div>
                </div>

                {/* Users List */}
                <div className="bg-white rounded-2xl border border-gray-200">
                  <div className="p-6">
                    {/* Desktop Table View */}
                    <div className="hidden md:block overflow-visible">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Name</th>
                            <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Date Joined</th>
                            <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Lessons</th>
                            <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Type</th>
                            <th className="text-right py-3 px-4 text-sm font-bold text-gray-700">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredUsers.map((user) => (
                            <tr 
                              key={user.id} 
                              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                            >
                              {/* Name Column */}
                              <td className="py-4 px-4">
                                <div className="flex items-center gap-3">
                                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                                    user.type === 'Student' ? 'bg-blue-100' : 'bg-orange-100'
                                  }`}>
                                    <span className={`text-sm font-bold ${
                                      user.type === 'Student' ? 'text-blue-700' : 'text-[#FF6636]'
                                    }`}>
                                      {user.initials}
                                    </span>
                                  </div>
                                  <div>
                                    <p className="font-bold text-gray-900 text-sm">{user.name}</p>
                                  </div>
                                </div>
                              </td>

                              {/* Date Joined Column */}
                              <td className="py-4 px-4">
                                <span className="text-sm text-gray-600">{formatDate(user.joinDate)}</span>
                              </td>

                              {/* Lessons Column */}
                              <td className="py-4 px-4">
                                <span className="text-sm text-gray-900 font-medium">{user.totalLessons}</span>
                              </td>

                              {/* Type Column */}
                              <td className="py-4 px-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  user.type === 'Student' 
                                    ? 'bg-blue-100 text-blue-700' 
                                    : 'bg-orange-100 text-[#FF6636]'
                                }`}>
                                  {user.type}
                                </span>
                              </td>

                              {/* Actions Column */}
                              <td className="py-4 px-4">
                                <div className="flex justify-end">
                                  <div className="relative action-menu-container">
                                    <button
                                      onClick={() => setOpenActionMenuId(openActionMenuId === user.id ? null : user.id)}
                                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                      <More className="w-5 h-5 text-gray-600 rotate-90" />
                                    </button>

                                    {/* Dropdown Menu */}
                                    {openActionMenuId === user.id && (
                                      <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-[100]">
                                        <ul className="py-2">
                                          <li>
                                            <button
                                              onClick={() => {
                                                setViewProfileUser(user);
                                                setViewProfileType(user.type);
                                                setOpenActionMenuId(null);
                                              }}
                                              className="w-full flex items-center gap-3 text-left px-4 py-2.5 hover:bg-gray-50 transition-colors"
                                            >
                                              <Eye className="w-4 h-4 text-gray-500" />
                                              <span className="text-sm text-gray-700">View Profile</span>
                                            </button>
                                          </li>
                                          <li>
                                            <button
                                              onClick={() => {
                                                // Handle edit action
                                                setOpenActionMenuId(null);
                                              }}
                                              className="w-full flex items-center gap-3 text-left px-4 py-2.5 hover:bg-gray-50 transition-colors"
                                            >
                                              <Edit2 className="w-4 h-4 text-gray-500" />
                                              <span className="text-sm text-gray-700">Edit</span>
                                            </button>
                                          </li>
                                        </ul>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="md:hidden space-y-3">
                      {filteredUsers.map((user) => (
                        <div
                          key={user.id}
                          className="border border-gray-200 rounded-xl p-3 hover:shadow-md hover:border-[#FF6636]/30 transition-all"
                        >
                          <div className="flex items-start justify-between gap-3">
                            {/* User Info - Left Side */}
                            <div className="flex items-start gap-3 flex-1 min-w-0">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                                user.type === 'Student' ? 'bg-blue-100' : 'bg-orange-100'
                              }`}>
                                <span className={`text-sm font-bold ${
                                  user.type === 'Student' ? 'text-blue-700' : 'text-[#FF6636]'
                                }`}>
                                  {user.initials}
                                </span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-bold text-gray-900 text-sm truncate">{user.name}</h4>
                                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold shrink-0 ${
                                    user.type === 'Student' 
                                      ? 'bg-blue-100 text-blue-700' 
                                      : 'bg-orange-100 text-[#FF6636]'
                                  }`}>
                                    {user.type}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                  <span className="truncate">{formatDate(user.joinDate)}</span>
                                  <span>•</span>
                                  <span className="shrink-0">{user.totalLessons} lessons</span>
                                </div>
                              </div>
                            </div>

                            {/* Actions - Right Side */}
                            <div className="relative action-menu-container shrink-0">
                              <button
                                onClick={() => setOpenActionMenuId(openActionMenuId === user.id ? null : user.id)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                              >
                                <More className="w-5 h-5 text-gray-600 rotate-90" />
                              </button>

                              {/* Dropdown Menu */}
                              {openActionMenuId === user.id && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-[100]">
                                  <ul className="py-2">
                                    <li>
                                      <button
                                        onClick={() => {
                                          setViewProfileUser(user);
                                          setViewProfileType(user.type);
                                          setOpenActionMenuId(null);
                                        }}
                                        className="w-full flex items-center gap-3 text-left px-4 py-2.5 hover:bg-gray-50 transition-colors"
                                      >
                                        <Eye className="w-4 h-4 text-gray-500" />
                                        <span className="text-sm text-gray-700">View Profile</span>
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        onClick={() => {
                                          // Handle edit action
                                          setOpenActionMenuId(null);
                                        }}
                                        className="w-full flex items-center gap-3 text-left px-4 py-2.5 hover:bg-gray-50 transition-colors"
                                      >
                                        <Edit2 className="w-4 h-4 text-gray-500" />
                                        <span className="text-sm text-gray-700">Edit</span>
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Indicated Interest Page */}
          {activePage === 'Indicated Interest' && <IndicatedInterestPage />}

          {/* Tutor Approval Page */}
          {activePage === 'Tutor Approval' && (
            <div className="space-y-6">
              {/* Header */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Tutor Approval</h2>
                <p className="text-sm md:text-base text-gray-600">Review and approve tutor applications</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-5 border border-gray-200">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-yellow-600" variant="Bold" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Review</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.pendingTutors}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-gray-200">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                      <TickCircle className="w-6 h-6 text-green-600" variant="Bold" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Approved</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalTutors}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pending Tutors List */}
              <div className="bg-white rounded-2xl border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900">Pending Applications</h3>
                </div>
                <div className="p-6">
                  {DEMO_PENDING_TUTORS.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                        <Teacher className="w-10 h-10 text-gray-400" variant="Bold" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">No Pending Applications</h3>
                      <p className="text-gray-600">All tutor applications have been reviewed</p>
                    </div>
                  ) : (
                    <>
                      {/* Desktop Table View */}
                      <div className="hidden md:block overflow-visible">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Name</th>
                              <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Subject(s)</th>
                              <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Date Applied</th>
                              <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Status</th>
                              <th className="text-right py-3 px-4 text-sm font-bold text-gray-700">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {DEMO_PENDING_TUTORS.map((tutor) => {
                              const tutorStatus = getTutorStatus(tutor.id);
                              return (
                                <tr 
                                  key={tutor.id} 
                                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                >
                                  {/* Name Column */}
                                  <td className="py-4 px-4">
                                    <div className="flex items-center gap-3">
                                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                                        <span className="font-bold text-sm text-[#FF6636]">{tutor.initials}</span>
                                      </div>
                                      <div>
                                        <p className="font-semibold text-gray-900">{tutor.name}</p>
                                        <p className="text-xs text-gray-500">{tutor.email}</p>
                                      </div>
                                    </div>
                                  </td>

                                  {/* Subject(s) Column */}
                                  <td className="py-4 px-4">
                                    <div className="flex flex-wrap gap-1.5">
                                      {tutor.subjects.slice(0, 2).map((subject, idx) => (
                                        <span key={idx} className="px-2 py-1 bg-orange-50 text-[#FF6636] rounded text-xs font-medium">
                                          {subject}
                                        </span>
                                      ))}
                                      {tutor.subjects.length > 2 && (
                                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                                          +{tutor.subjects.length - 2}
                                        </span>
                                      )}
                                    </div>
                                  </td>

                                  {/* Date Applied Column */}
                                  <td className="py-4 px-4">
                                    <p className="text-sm text-gray-700">{formatDate(tutor.applicationDate)}</p>
                                  </td>

                                  {/* Status Column */}
                                  <td className="py-4 px-4">
                                    {tutorStatus === 'approved' && (
                                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">Approved</span>
                                    )}
                                    {tutorStatus === 'rejected' && (
                                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">Rejected</span>
                                    )}
                                    {tutorStatus === 'pending' && (
                                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">Review</span>
                                    )}
                                  </td>

                                  {/* Actions Column */}
                                  <td className="py-4 px-4">
                                    <div className="flex justify-end">
                                      <div className="relative pending-action-menu-container">
                                        <button
                                          onClick={() => setOpenPendingActionMenuId(openPendingActionMenuId === tutor.id ? null : tutor.id)}
                                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                        >
                                          <More className="w-5 h-5 text-gray-600 rotate-90" />
                                        </button>

                                        {/* Dropdown Menu */}
                                        {openPendingActionMenuId === tutor.id && (
                                          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-[100]">
                                            <ul className="py-2">
                                              <li>
                                                <button
                                                  onClick={() => {
                                                    setViewProfileUser({ ...tutor, type: 'Tutor', totalLessons: 0 });
                                                    setViewProfileType('Tutor');
                                                    setOpenPendingActionMenuId(null);
                                                  }}
                                                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-3 transition-colors"
                                                >
                                                  <Eye className="w-4 h-4 text-[rgb(1,27,51)]" />
                                                  <span className="text-gray-900">Review Profile</span>
                                                </button>
                                              </li>
                                              <li>
                                                <button
                                                  onClick={() => handleApproveTutor(tutor.id, tutor.name)}
                                                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-3 transition-colors"
                                                  disabled={tutorStatus === 'approved'}
                                                >
                                                  <TickCircle className="w-4 h-4 text-green-600" variant="Bold" />
                                                  <span className="text-gray-900">Approve</span>
                                                </button>
                                              </li>
                                              <li>
                                                <button
                                                  onClick={() => handleRejectTutor(tutor.id, tutor.name)}
                                                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-3 transition-colors"
                                                  disabled={tutorStatus === 'rejected'}
                                                >
                                                  <Cancel className="w-4 h-4 text-red-600" />
                                                  <span className="text-gray-900">Reject</span>
                                                </button>
                                              </li>
                                            </ul>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>

                      {/* Mobile Card View */}
                      <div className="md:hidden space-y-4">
                        {DEMO_PENDING_TUTORS.map((tutor) => {
                          const tutorStatus = getTutorStatus(tutor.id);
                          return (
                            <div
                              key={tutor.id}
                              className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all"
                            >
                              <div className="flex items-start gap-3">
                                {/* Avatar */}
                                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                                  <span className="font-bold text-sm text-[#FF6636]">{tutor.initials}</span>
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-2 mb-2">
                                    <div className="flex-1 min-w-0">
                                      <h4 className="font-bold text-gray-900 truncate">{tutor.name}</h4>
                                      <p className="text-xs text-gray-500 truncate">{tutor.email}</p>
                                    </div>
                                    
                                    {/* Action Menu */}
                                    <div className="relative pending-action-menu-container shrink-0">
                                      <button
                                        onClick={() => setOpenPendingActionMenuId(openPendingActionMenuId === tutor.id ? null : tutor.id)}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                      >
                                        <More className="w-5 h-5 text-gray-600 rotate-90" />
                                      </button>

                                      {/* Dropdown Menu */}
                                      {openPendingActionMenuId === tutor.id && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-[100]">
                                          <ul className="py-2">
                                            <li>
                                              <button
                                                onClick={() => {
                                                  setViewProfileUser({ ...tutor, type: 'Tutor', totalLessons: 0 });
                                                  setViewProfileType('Tutor');
                                                  setOpenPendingActionMenuId(null);
                                                }}
                                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-3 transition-colors"
                                              >
                                                <Eye className="w-4 h-4 text-[rgb(1,27,51)]" />
                                                <span className="text-gray-900">Review Profile</span>
                                              </button>
                                            </li>
                                            <li>
                                              <button
                                                onClick={() => handleApproveTutor(tutor.id, tutor.name)}
                                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-3 transition-colors"
                                                disabled={tutorStatus === 'approved'}
                                              >
                                                <TickCircle className="w-4 h-4 text-green-600" variant="Bold" />
                                                <span className="text-gray-900">Approve</span>
                                              </button>
                                            </li>
                                            <li>
                                              <button
                                                onClick={() => handleRejectTutor(tutor.id, tutor.name)}
                                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-3 transition-colors"
                                                disabled={tutorStatus === 'rejected'}
                                              >
                                                <Cancel className="w-4 h-4 text-red-600" />
                                                <span className="text-gray-900">Reject</span>
                                              </button>
                                            </li>
                                          </ul>
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  {/* Subjects */}
                                  <div className="flex flex-wrap gap-1.5 mb-2">
                                    {tutor.subjects.slice(0, 2).map((subject, idx) => (
                                      <span key={idx} className="px-2 py-1 bg-orange-50 text-[#FF6636] rounded text-xs font-medium">
                                        {subject}
                                      </span>
                                    ))}
                                    {tutor.subjects.length > 2 && (
                                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                                        +{tutor.subjects.length - 2}
                                      </span>
                                    )}
                                  </div>

                                  {/* Date and Status */}
                                  <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <span className="truncate">{formatDate(tutor.applicationDate)}</span>
                                    <span>•</span>
                                    {tutorStatus === 'approved' && (
                                      <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-semibold shrink-0">Approved</span>
                                    )}
                                    {tutorStatus === 'rejected' && (
                                      <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-semibold shrink-0">Rejected</span>
                                    )}
                                    {tutorStatus === 'pending' && (
                                      <span className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 font-semibold shrink-0">Review</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Financials Page */}
          {activePage === 'Financials' && (
            <div className="space-y-6">
              {/* Header */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Financial Overview</h2>
                <p className="text-sm md:text-base text-gray-600">Monitor revenue, transactions, and payouts</p>
              </div>

              {/* Financial Stats - 50/50 Grid */}
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {/* Total Revenue */}
                <div className="bg-white rounded-2xl p-4 md:p-5 border border-gray-200 hover:shadow-md hover:border-[#FF6636]/30 transition-all relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-green-100/50 translate-x-8 -translate-y-8"></div>
                  <div className="relative z-10">
                    <p className="text-xs md:text-sm text-gray-600 mb-2 font-medium">Total Revenue</p>
                    <p className="text-2xl md:text-3xl font-bold text-gray-900">₦45,890</p>
                  </div>
                </div>

                {/* Pending Payouts */}
                <div className="bg-white rounded-2xl p-4 md:p-5 border border-gray-200 hover:shadow-md hover:border-[#FF6636]/30 transition-all relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-blue-100/50 translate-x-8 -translate-y-8"></div>
                  <div className="relative z-10">
                    <p className="text-xs md:text-sm text-gray-600 mb-2 font-medium">Pending Payouts</p>
                    <p className="text-2xl md:text-3xl font-bold text-gray-900">₦8,240</p>
                  </div>
                </div>
              </div>

              {/* Recent Transactions Table */}
              <div className="bg-white rounded-2xl border border-gray-200">
                <div className="p-4 md:p-6 border-b border-gray-200">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Recent Transactions</h3>
                      <p className="text-sm text-gray-600 mt-1">Search and filter all transactions</p>
                    </div>
                    
                    {/* Search Bar */}
                    <div className="relative w-full lg:w-80">
                      <SearchNormal1 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search by name, subject, or ID..."
                        value={financialSearchQuery}
                        onChange={(e) => setFinancialSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6636]/20 focus:border-[#FF6636] transition-all text-sm"
                      />
                    </div>
                  </div>
                  
                  {/* Tabs */}
                  <div className="flex gap-2 border-b border-gray-200 -mb-4 md:-mb-6 pb-0 overflow-x-auto">
                    <button
                      onClick={() => setFinancialTransactionTab('Students')}
                      className={`px-4 py-2 font-medium text-sm transition-all relative whitespace-nowrap ${
                        financialTransactionTab === 'Students'
                          ? 'text-[#FF6636]'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Students
                      {financialTransactionTab === 'Students' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6636]"></div>
                      )}
                    </button>
                    <button
                      onClick={() => setFinancialTransactionTab('Tutors')}
                      className={`px-4 py-2 font-medium text-sm transition-all relative whitespace-nowrap ${
                        financialTransactionTab === 'Tutors'
                          ? 'text-[#FF6636]'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Tutors
                      {financialTransactionTab === 'Tutors' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6636]"></div>
                      )}
                    </button>
                  </div>
                </div>
                <div className="p-4 md:p-6">
                  {/* Filter transactions based on search query */}
                  {(() => {
                    const filteredStudentTransactions = DEMO_TRANSACTIONS.filter(t => 
                      t.studentName.toLowerCase().includes(financialSearchQuery.toLowerCase()) ||
                      t.type.toLowerCase().includes(financialSearchQuery.toLowerCase()) ||
                      t.id.toLowerCase().includes(financialSearchQuery.toLowerCase()) ||
                      t.status.toLowerCase().includes(financialSearchQuery.toLowerCase())
                    );

                    const filteredTutorTransactions = DEMO_TUTOR_TRANSACTIONS.filter(t =>
                      t.tutorName.toLowerCase().includes(financialSearchQuery.toLowerCase()) ||
                      t.studentName.toLowerCase().includes(financialSearchQuery.toLowerCase()) ||
                      t.subject.toLowerCase().includes(financialSearchQuery.toLowerCase()) ||
                      t.id.toLowerCase().includes(financialSearchQuery.toLowerCase()) ||
                      t.bankName.toLowerCase().includes(financialSearchQuery.toLowerCase()) ||
                      t.lessonStatus.toLowerCase().includes(financialSearchQuery.toLowerCase()) ||
                      t.paymentStatus.toLowerCase().includes(financialSearchQuery.toLowerCase())
                    );

                    return (
                      <>
                  {/* Students Tab Content */}
                  {financialTransactionTab === 'Students' && (
                    <>
                      {filteredStudentTransactions.length === 0 ? (
                        <div className="text-center py-12">
                          <p className="text-gray-500 text-sm">No transactions found matching your search.</p>
                        </div>
                      ) : (
                        <>
                      {/* Desktop Table View */}
                      <div className="hidden md:block overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Student</th>
                              <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Type</th>
                              <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Amount</th>
                              <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Date</th>
                              <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredStudentTransactions.map((transaction) => (
                              <tr 
                                key={transaction.id} 
                                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                              >
                                <td className="py-4 px-4">
                                  <p className="font-bold text-gray-900 text-sm">{transaction.studentName}</p>
                                </td>
                                <td className="py-4 px-4">
                                  <span className="text-sm text-gray-600 capitalize">{transaction.type.replace('_', ' ')}</span>
                                </td>
                                <td className="py-4 px-4">
                                  <span className="font-bold text-green-600 text-sm">₦{transaction.amount}</span>
                                </td>
                                <td className="py-4 px-4">
                                  <span className="text-sm text-gray-600">{formatDate(transaction.date)}</span>
                                </td>
                                <td className="py-4 px-4">
                                  {getStatusBadge(transaction.status)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Mobile Card View */}
                      <div className="md:hidden space-y-3">
                        {filteredStudentTransactions.map((transaction) => (
                          <div
                            key={transaction.id}
                            className="border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-[#FF6636]/30 transition-all"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-green-100">
                                  <MoneyRecive className="w-5 h-5 text-green-600" variant="Bold" />
                                </div>
                                <div>
                                  <p className="font-bold text-gray-900 text-sm">{transaction.studentName}</p>
                                  <p className="text-xs text-gray-600 capitalize">{transaction.type.replace('_', ' ')}</p>
                                </div>
                              </div>
                              {getStatusBadge(transaction.status)}
                            </div>
                            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                              <span className="text-xs text-gray-500">{formatDate(transaction.date)}</span>
                              <span className="font-bold text-green-600 text-sm">₦{transaction.amount}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                        </>
                      )}
                    </>
                  )}

                  {/* Tutors Tab Content */}
                  {financialTransactionTab === 'Tutors' && (
                    <>
                      {filteredTutorTransactions.length === 0 ? (
                        <div className="text-center py-12">
                          <p className="text-gray-500 text-sm">No transactions found matching your search.</p>
                        </div>
                      ) : (
                        <>
                      {/* Desktop Table View */}
                      <div className="hidden md:block overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Tutor</th>
                              <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Account Info</th>
                              <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Lesson Status</th>
                              <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Student/Subject</th>
                              <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Amount Earned</th>
                              <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredTutorTransactions.map((transaction) => (
                              <tr 
                                key={transaction.id} 
                                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                              >
                                {/* Tutor Column */}
                                <td className="py-4 px-4">
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-[#FF6636] flex items-center justify-center text-white text-xs font-bold">
                                      {transaction.tutorInitials}
                                    </div>
                                    <p className="font-bold text-gray-900 text-sm">{transaction.tutorName}</p>
                                  </div>
                                </td>

                                {/* Account Info Column */}
                                <td className="py-4 px-4">
                                  <p className="text-sm text-gray-900 font-medium">{transaction.bankName}</p>
                                  <p className="text-xs text-gray-600">{transaction.accountNumber}</p>
                                </td>

                                {/* Lesson Status Column */}
                                <td className="py-4 px-4">
                                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                                    transaction.lessonStatus === 'Completed'
                                      ? 'bg-green-100 text-green-700'
                                      : 'bg-blue-100 text-blue-700'
                                  }`}>
                                    {transaction.lessonStatus}
                                  </span>
                                </td>

                                {/* Student/Subject Column */}
                                <td className="py-4 px-4">
                                  <p className="text-sm text-gray-900 font-medium">{transaction.studentName}</p>
                                  <p className="text-xs text-gray-600">{transaction.subject}</p>
                                </td>

                                {/* Amount Earned Column */}
                                <td className="py-4 px-4">
                                  <span className="font-bold text-green-600 text-sm">₦{transaction.amountEarned.toLocaleString()}</span>
                                </td>

                                {/* Payment Status Column */}
                                <td className="py-4 px-4">
                                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                                    transaction.paymentStatus === 'Paid'
                                      ? 'bg-green-100 text-green-700'
                                      : 'bg-amber-100 text-amber-700'
                                  }`}>
                                    {transaction.paymentStatus}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Mobile Card View */}
                      <div className="md:hidden space-y-4">
                        {filteredTutorTransactions.map((transaction) => (
                          <div
                            key={transaction.id}
                            className="border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-[#FF6636]/30 transition-all"
                          >
                            {/* Tutor Info */}
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 rounded-full bg-[#FF6636] flex items-center justify-center text-white text-sm font-bold">
                                {transaction.tutorInitials}
                              </div>
                              <div className="flex-1">
                                <p className="font-bold text-gray-900 text-sm">{transaction.tutorName}</p>
                                <p className="text-xs text-gray-600">{transaction.bankName} • {transaction.accountNumber}</p>
                              </div>
                              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                                transaction.paymentStatus === 'Paid'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-amber-100 text-amber-700'
                              }`}>
                                {transaction.paymentStatus}
                              </span>
                            </div>

                            {/* Lesson Details */}
                            <div className="space-y-2 mb-3 pb-3 border-b border-gray-100">
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-600">Student:</span>
                                <span className="text-sm font-medium text-gray-900">{transaction.studentName}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-600">Subject:</span>
                                <span className="text-sm font-medium text-gray-900">{transaction.subject}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-600">Lesson Status:</span>
                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                  transaction.lessonStatus === 'Completed'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-blue-100 text-blue-700'
                                }`}>
                                  {transaction.lessonStatus}
                                </span>
                              </div>
                            </div>

                            {/* Amount */}
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500">{formatDate(transaction.date)}</span>
                              <span className="font-bold text-green-600 text-base">₦{transaction.amountEarned.toLocaleString()}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                        </>
                      )}
                    </>
                  )}
                      </>
                    );
                  })()}
                </div>
              </div>

              {/* Revenue Trend Chart - Full Width */}
              <div className="bg-white rounded-2xl border border-gray-200">
                <div className="p-4 md:p-6 border-b border-gray-200">
                  <h3 className="text-base md:text-lg font-bold text-gray-900">Revenue Trend</h3>
                  <p className="text-xs md:text-sm text-gray-600 mt-1">Platform revenue over the year</p>
                </div>
                <div className="p-4 md:p-6">
                  <div className="w-full h-[250px] md:h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={REVENUE_DATA}>
                        <defs>
                          <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop key="revenue-stop-1" offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                            <stop key="revenue-stop-2" offset="95%" stopColor="#10B981" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" stroke="#9CA3AF" style={{ fontSize: '11px' }} />
                        <YAxis stroke="#9CA3AF" style={{ fontSize: '11px' }} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#fff', 
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            fontSize: '12px'
                          }}
                          formatter={(value: number) => `₦${value.toLocaleString()}`}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="revenue" 
                          stroke="#10B981" 
                          strokeWidth={2}
                          fill="url(#revenueGradient)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Helpdesk Page */}
          {activePage === 'Helpdesk' && (
            <div className="space-y-6">
              {/* Header */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Helpdesk & Support</h2>
                <p className="text-sm md:text-base text-gray-600">Manage support tickets and customer inquiries</p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <div className="bg-white rounded-2xl p-4 md:p-5 border border-gray-200 hover:shadow-md hover:border-[#FF6636]/30 transition-all relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-blue-100/50 translate-x-8 -translate-y-8"></div>
                  <div className="relative z-10">
                    <p className="text-xs md:text-sm text-gray-600 mb-2 font-medium">Total Tickets</p>
                    <p className="text-2xl md:text-3xl font-bold text-gray-900">{DEMO_HELPDESK_TICKETS.length}</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-4 md:p-5 border border-gray-200 hover:shadow-md hover:border-[#FF6636]/30 transition-all relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-orange-100/50 translate-x-8 -translate-y-8"></div>
                  <div className="relative z-10">
                    <p className="text-xs md:text-sm text-gray-600 mb-2 font-medium">Pending</p>
                    <p className="text-2xl md:text-3xl font-bold text-gray-900">{DEMO_HELPDESK_TICKETS.filter(t => t.status === 'Pending').length}</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-4 md:p-5 border border-gray-200 hover:shadow-md hover:border-[#FF6636]/30 transition-all relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-purple-100/50 translate-x-8 -translate-y-8"></div>
                  <div className="relative z-10">
                    <p className="text-xs md:text-sm text-gray-600 mb-2 font-medium">In Progress</p>
                    <p className="text-2xl md:text-3xl font-bold text-gray-900">{DEMO_HELPDESK_TICKETS.filter(t => t.status === 'In Progress').length}</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-4 md:p-5 border border-gray-200 hover:shadow-md hover:border-[#FF6636]/30 transition-all relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-green-100/50 translate-x-8 -translate-y-8"></div>
                  <div className="relative z-10">
                    <p className="text-xs md:text-sm text-gray-600 mb-2 font-medium">Resolved</p>
                    <p className="text-2xl md:text-3xl font-bold text-gray-900">{DEMO_HELPDESK_TICKETS.filter(t => t.status === 'Resolved').length}</p>
                  </div>
                </div>
              </div>

              {/* Filters */}
              <div className="bg-white rounded-2xl border border-gray-200 p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Search */}
                  <div className="relative flex-1">
                    <SearchNormal1 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search tickets..."
                      value={helpdeskSearchQuery}
                      onChange={(e) => setHelpdeskSearchQuery(e.target.value)}
                      className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-300 text-sm focus:border-[#FF6636] focus:outline-none transition-all"
                    />
                  </div>

                  {/* Status Filter Dropdown */}
                  <div className="relative">
                    <select
                      value={helpdeskStatusFilter}
                      onChange={(e) => setHelpdeskStatusFilter(e.target.value as any)}
                      className="w-full md:w-auto px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold focus:border-[#FF6636] focus:outline-none transition-all appearance-none bg-white pr-10"
                    >
                      <option value="all">All Status</option>
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                    <ArrowDown2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>

                  {/* Ticket Type Filter Dropdown */}
                  <div className="relative">
                    <select
                      value={helpdeskFilter}
                      onChange={(e) => setHelpdeskFilter(e.target.value as typeof helpdeskFilter)}
                      className="w-full md:w-auto px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold focus:border-[#FF6636] focus:outline-none transition-all appearance-none bg-white pr-10"
                    >
                      <option value="all">All Tickets</option>
                      <option value="tutor_request">Tutor Request</option>
                      <option value="general_support">General Support</option>
                      <option value="reported_issue">Reported Issue</option>
                    </select>
                    <ArrowDown2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Demo Tickets */}
              <div className="space-y-4">
                {DEMO_HELPDESK_TICKETS
                  .filter(ticket => 
                    (helpdeskFilter === 'all' || ticket.category === helpdeskFilter) &&
                    (helpdeskStatusFilter === 'all' || ticket.status === helpdeskStatusFilter) &&
                    (helpdeskSearchQuery === '' || 
                      ticket.subject.toLowerCase().includes(helpdeskSearchQuery.toLowerCase()) ||
                      ticket.description.toLowerCase().includes(helpdeskSearchQuery.toLowerCase()) ||
                      ticket.id.toLowerCase().includes(helpdeskSearchQuery.toLowerCase())
                    )
                  )
                  .map(ticket => {
                    const getCategoryColor = (category: string) => {
                      switch (category) {
                        case 'tutor_request': return { border: 'border-purple-200 hover:border-purple-300', bg: 'bg-purple-100', text: 'text-purple-700', label: 'Tutor Request' };
                        case 'general_support': return { border: 'border-blue-200 hover:border-blue-300', bg: 'bg-blue-100', text: 'text-blue-700', label: 'General Support' };
                        case 'reported_issue': return { border: 'border-red-200 hover:border-red-300', bg: 'bg-red-100', text: 'text-red-700', label: 'Reported Issue' };
                        default: return { border: 'border-gray-200', bg: 'bg-gray-100', text: 'text-gray-700', label: 'Unknown' };
                      }
                    };

                    const categoryStyle = getCategoryColor(ticket.category);

                    return (
                      <div key={ticket.id} className={`bg-white rounded-2xl border-2 ${categoryStyle.border} transition-all`}>
                        <div className="p-6">
                          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-3 flex-wrap">
                                <span className="font-mono text-sm text-gray-500">#{ticket.id}</span>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  ticket.status === 'Resolved' ? 'bg-green-100 text-green-700' : 
                                  ticket.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 
                                  'bg-yellow-100 text-yellow-700'
                                }`}>
                                  {ticket.status}
                                </span>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  ticket.priority === 'Urgent' ? 'bg-red-100 text-red-700' :
                                  ticket.priority === 'High Priority' ? 'bg-orange-100 text-orange-700' :
                                  'bg-green-100 text-green-700'
                                }`}>
                                  {ticket.priority}
                                </span>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryStyle.bg} ${categoryStyle.text}`}>
                                  {categoryStyle.label}
                                </span>
                              </div>
                              <h3 className="text-lg font-bold text-gray-900 mb-2">
                                {ticket.subject}
                              </h3>
                              <p className="text-sm text-gray-600 mb-3">
                                {ticket.description}
                              </p>

                              {/* Tutor Request Details */}
                              {ticket.category === 'tutor_request' && (
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 bg-purple-50 rounded-xl p-4 mb-3">
                                  <div className="flex items-center gap-2">
                                    <Book1 className="w-4 h-4 text-purple-600" variant="Bold" />
                                    <div>
                                      <p className="text-xs text-gray-500">Level</p>
                                      <p className="text-sm font-semibold text-gray-900">{ticket.level}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Messages2 className="w-4 h-4 text-purple-600" variant="Bold" />
                                    <div>
                                      <p className="text-xs text-gray-500">Language</p>
                                      <p className="text-sm font-semibold text-gray-900">{ticket.language}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <VideoPlay className="w-4 h-4 text-purple-600" variant="Bold" />
                                    <div>
                                      <p className="text-xs text-gray-500">Mode</p>
                                      <p className="text-sm font-semibold text-gray-900">{ticket.mode}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-purple-600" variant="Bold" />
                                    <div>
                                      <p className="text-xs text-gray-500">Available</p>
                                      <p className="text-sm font-semibold text-gray-900">{ticket.availability}</p>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Admin Response */}
                              {ticket.adminResponse && (
                                <div className="bg-blue-50 rounded-lg p-3 shadow-md mb-3">
                                  <p className="text-xs font-semibold text-blue-900 mb-1">Admin Response:</p>
                                  <p className="text-xs text-blue-700">{ticket.adminResponse}</p>
                                </div>
                              )}

                              {/* Resolution */}
                              {ticket.resolution && (
                                <div className="bg-green-50 rounded-lg p-3 shadow-md">
                                  <p className="text-xs font-semibold text-green-900 mb-1">Resolution:</p>
                                  <p className="text-xs text-green-700">{ticket.resolution}</p>
                                </div>
                              )}
                            </div>

                            <div className="flex flex-col items-end gap-2">
                              <span className="text-xs text-gray-500">{ticket.timeAgo}</span>
                              {ticket.category === 'tutor_request' && ticket.status === 'Pending' && (
                                <div className="flex gap-2">
                                  <button className="px-4 py-2 bg-[#FF6636] text-white rounded-lg text-sm font-semibold hover:bg-[#E55A2B] transition-colors">
                                    Assign Tutor
                                  </button>
                                  <button className="px-4 py-2 border-2 border-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
                                    View Details
                                  </button>
                                </div>
                              )}
                              {ticket.category === 'general_support' && (ticket.status === 'Pending' || ticket.status === 'In Progress') && (
                                <div className="flex gap-2">
                                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors">
                                    Mark Resolved
                                  </button>
                                  <button className="px-4 py-2 border-2 border-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
                                    Reply
                                  </button>
                                </div>
                              )}
                              {ticket.category === 'reported_issue' && (ticket.status === 'Pending' || ticket.status === 'In Progress') && (
                                <div className="flex gap-2">
                                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors">
                                    Mark Resolved
                                  </button>
                                  <button className="px-4 py-2 border-2 border-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
                                    Reply
                                  </button>
                                </div>
                              )}
                              {ticket.status === 'Resolved' && (
                                <button className="px-4 py-2 border-2 border-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
                                  View Details
                                </button>
                              )}

                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                
                {/* No results message */}
                {DEMO_HELPDESK_TICKETS.filter(ticket => 
                    (helpdeskFilter === 'all' || ticket.category === helpdeskFilter) &&
                    (helpdeskSearchQuery === '' || 
                      ticket.subject.toLowerCase().includes(helpdeskSearchQuery.toLowerCase()) ||
                      ticket.description.toLowerCase().includes(helpdeskSearchQuery.toLowerCase()) ||
                      ticket.id.toLowerCase().includes(helpdeskSearchQuery.toLowerCase())
                    )
                  ).length === 0 && (
                  <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
                    <MessageQuestion className="w-16 h-16 text-gray-300 mx-auto mb-4" variant="Bold" />
                    <p className="text-gray-600 font-semibold mb-2">No tickets found</p>
                    <p className="text-sm text-gray-500">Try adjusting your filters or search query</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Settings Page */}
          {activePage === 'Settings' && (
            <div className="space-y-6">
              {/* Header */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Settings</h2>
                <p className="text-sm md:text-base text-gray-600">Manage your account and platform settings</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Change Login Info */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <UserSquare className="w-5 h-5 text-blue-600" variant="Bold" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Change Login Info</h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Admin Email</label>
                      <input
                        type="email"
                        defaultValue={adminName.toLowerCase().replace(' ', '.') + '@dot-tutor.com'}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6636] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
                      <input
                        type="password"
                        placeholder="Enter current password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6636] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                      <input
                        type="password"
                        placeholder="Enter new password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6636] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
                      <input
                        type="password"
                        placeholder="Confirm new password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6636] focus:border-transparent"
                      />
                    </div>

                    <button className="w-full px-6 py-3 bg-[rgb(1,27,51)] text-white rounded-xl font-semibold hover:bg-[rgb(1,27,51)]/90 transition-all">
                      Update Login Info
                    </button>
                  </div>
                </div>

                {/* Notification Settings */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                      <MessageQuestion className="w-5 h-5 text-purple-600" variant="Bold" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Notification Settings</h3>
                  </div>

                  <div className="space-y-4">
                    {/* Email Notifications */}
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">Email Notifications</p>
                        <p className="text-xs text-gray-500">Receive email updates</p>
                      </div>
                      <button className="relative w-12 h-6 bg-[#FF6636] rounded-full transition-colors">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                      </button>
                    </div>

                    {/* New User Signup */}
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">New User Signups</p>
                        <p className="text-xs text-gray-500">Notify when new users register</p>
                      </div>
                      <button className="relative w-12 h-6 bg-[#FF6636] rounded-full transition-colors">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                      </button>
                    </div>

                    {/* Tutor Applications */}
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">Tutor Applications</p>
                        <p className="text-xs text-gray-500">Notify for new tutor requests</p>
                      </div>
                      <button className="relative w-12 h-6 bg-[#FF6636] rounded-full transition-colors">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                      </button>
                    </div>

                    {/* Payment Alerts */}
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">Payment Alerts</p>
                        <p className="text-xs text-gray-500">Transaction notifications</p>
                      </div>
                      <button className="relative w-12 h-6 bg-gray-300 rounded-full transition-colors">
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                      </button>
                    </div>

                    {/* Helpdesk Tickets */}
                    <div className="flex items-center justify-between py-3">
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">Helpdesk Tickets</p>
                        <p className="text-xs text-gray-500">Support ticket updates</p>
                      </div>
                      <button className="relative w-12 h-6 bg-[#FF6636] rounded-full transition-colors">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Grant Access to User */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                      <People className="w-5 h-5 text-green-600" variant="Bold" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Grant Admin Access</h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">User Email Address</label>
                      <input
                        type="email"
                        placeholder="user@email.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6636] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Access Level</label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6636] focus:border-transparent">
                        <option>Full Admin Access</option>
                        <option>Moderator (Limited)</option>
                        <option>View Only</option>
                      </select>
                    </div>

                    <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                      <div className="flex items-start gap-2">
                        <InfoCircle className="w-5 h-5 text-[#FF6636] shrink-0 mt-0.5" variant="Bold" />
                        <p className="text-xs text-gray-700">
                          The user will receive an email with login instructions and their access permissions.
                        </p>
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        toast.success('Access granted successfully!', {
                          description: 'The user has been sent an invitation email.',
                        });
                      }}
                      className="w-full px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all flex items-center justify-center gap-2"
                    >
                      <Add className="w-5 h-5" />
                      Grant Access
                    </button>
                  </div>

                  {/* Current Admins List */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="text-sm font-bold text-gray-900 mb-3">Current Admins</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#FF6636] flex items-center justify-center">
                            <span className="text-xs font-bold text-white">{userInitials}</span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{adminName}</p>
                            <p className="text-xs text-gray-500">Super Admin</p>
                          </div>
                        </div>
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* View Profile Modal */}
          {viewProfileUser && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-y-auto p-4">
              <div className="bg-gray-50 rounded-2xl w-full max-w-4xl my-8 relative">
                {/* Close Button */}
                <button
                  onClick={() => {
                    setViewProfileUser(null);
                    setViewProfileType(null);
                  }}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center shadow-lg transition-colors"
                >
                  <CloseCircle className="w-6 h-6 text-gray-600" />
                </button>

                {/* Student Profile View */}
                {viewProfileType === 'Student' && (
                  <div>
                    {/* Profile Header */}
                    <div className="bg-gradient-to-r from-[#FF6636] to-[#ff8659] rounded-t-2xl p-6 md:p-8 text-white relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
                      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />
                      
                      <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-6">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white flex items-center justify-center text-[#FF6636] font-bold text-2xl md:text-3xl shadow-xl">
                          {viewProfileUser.initials}
                        </div>
                        
                        <div className="flex-1 text-center sm:text-left">
                          <h1 className="text-2xl md:text-3xl font-bold mb-2">{viewProfileUser.name}</h1>
                          <p className="text-white/90 mb-3">Student</p>
                          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                              {viewProfileUser.totalLessons} Lessons Completed
                            </span>
                            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                              Joined {formatDate(viewProfileUser.joinDate)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Profile Content */}
                    <div className="p-6 space-y-6">
                      {/* Personal Information */}
                      <div className="bg-white rounded-2xl p-6 border border-gray-200">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                            <UserSquare className="w-5 h-5 text-blue-600" variant="Bold" />
                          </div>
                          <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
                        </div>
                        
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Full Name</p>
                            <p className="font-semibold text-gray-900">{viewProfileUser.name}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Email</p>
                            <p className="font-semibold text-gray-900">{viewProfileUser.name.toLowerCase().replace(' ', '.')}@email.com</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Phone Number</p>
                            <p className="font-semibold text-gray-900">+234 803 456 7890</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Location</p>
                            <p className="font-semibold text-gray-900">Lagos, Nigeria</p>
                          </div>
                        </div>
                      </div>

                      {/* Learning Activity */}
                      <div className="bg-white rounded-2xl p-6 border border-gray-200">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                            <DocumentText className="w-5 h-5 text-green-600" variant="Bold" />
                          </div>
                          <h2 className="text-xl font-bold text-gray-900">My Lessons</h2>
                        </div>
                        
                        {/* Lessons List */}
                        <div className="space-y-4">
                          {/* Get lessons for the current student */}
                          {(() => {
                            const studentLessons = STUDENT_LESSONS_DATA[viewProfileUser.id] || [];
                            
                            if (studentLessons.length === 0) {
                              return (
                                <div className="text-center py-8 text-gray-500">
                                  <p>No lessons found for this student.</p>
                                </div>
                              );
                            }
                            
                            return (
                              <>
                                {/* Map through each lesson */}
                                {studentLessons.map((lesson, index) => (
                                  <div key={`lesson-${index}`} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
                                    <div className="flex items-start justify-between mb-3">
                                      <div className="flex items-start gap-3">
                                        <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                                          <span className="font-bold text-sm text-[#FF6636]">{lesson.tutor.initials}</span>
                                        </div>
                                        <div>
                                          <div className="flex items-center gap-1.5">
                                            <span className="text-xs text-gray-500 font-medium">Tutor:</span>
                                            <h3 className="font-bold text-gray-900">{lesson.tutor.name}</h3>
                                          </div>
                                          <p className="text-sm text-gray-600 flex items-center gap-1.5 mt-1">
                                            <Book1 className="w-4 h-4" variant="Linear" />
                                            {lesson.subject}
                                          </p>
                                        </div>
                                      </div>
                                      <span className={`px-3 py-1 ${
                                        lesson.status === 'Active' 
                                          ? 'bg-green-100 text-green-700' 
                                          : 'bg-blue-100 text-blue-700'
                                      } rounded-full text-xs font-semibold flex items-center gap-1`}>
                                        {lesson.status === 'Active' ? (
                                          <TickCircle className="w-3 h-3" variant="Bold" />
                                        ) : (
                                          <Chart className="w-3 h-3" variant="Bold" />
                                        )}
                                        {lesson.status}
                                      </span>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="mb-3">
                                      <div className="flex items-center justify-between mb-1.5">
                                        <span className="text-xs text-gray-600 font-medium">Lesson Progress</span>
                                        <span className="text-xs font-bold text-gray-900">{lesson.progress}%</span>
                                      </div>
                                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-[#FF6636] to-[#FF8C5A] transition-all duration-500" style={{ width: `${lesson.progress}%` }} />
                                      </div>
                                    </div>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-3 gap-3 mb-3 pb-3 border-b border-gray-200">
                                      <div className="text-center">
                                        <p className="text-xs text-gray-500 mb-0.5">Completed</p>
                                        <p className="text-lg font-bold text-gray-900">{lesson.completed}</p>
                                      </div>
                                      <div className="text-center">
                                        <p className="text-xs text-gray-500 mb-0.5">Total</p>
                                        <p className="text-lg font-bold text-gray-900">{lesson.total}</p>
                                      </div>
                                      <div className="text-center">
                                        <p className="text-xs text-gray-500 mb-0.5">Rating</p>
                                        <div className="flex items-center justify-center gap-1">
                                          <Star1 className="w-4 h-4 text-[#FF6636]" variant="Bold" />
                                          <p className="text-lg font-bold text-gray-900">{lesson.rating}</p>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Schedule Info */}
                                    <div className="space-y-2 text-sm">
                                      <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Days:</span>
                                        <div className="flex gap-1.5">
                                          {lesson.days.map((day, dayIndex) => (
                                            <span key={`day-${index}-${dayIndex}`} className="px-2 py-0.5 bg-orange-100 text-[#FF6636] rounded text-xs font-medium">{day}</span>
                                          ))}
                                        </div>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Time Slot:</span>
                                        <span className="text-gray-900 font-medium">{lesson.timeSlot}</span>
                                      </div>
                                      {lesson.nextLesson && (
                                        <div className="flex items-center justify-between">
                                          <span className="text-gray-600">Next Lesson:</span>
                                          <span className="text-[#FF6636] font-medium">{lesson.nextLesson}</span>
                                        </div>
                                      )}
                                      {lesson.completionDate && (
                                        <div className="flex items-center justify-between">
                                          <span className="text-gray-600">Lesson Completed:</span>
                                          <span className="text-green-600 font-medium">{lesson.completionDate}</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                ))}

                                {/* My Reviews Section */}
                                <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <Star1 className="w-5 h-5 text-[#FF6636]" variant="Bold" />
                                    My Reviews
                                  </h3>
                                  <div className="space-y-3">
                                    {studentLessons.filter(lesson => lesson.review).map((lesson, reviewIndex) => (
                                        <div key={`review-${reviewIndex}`} className="bg-white rounded-lg p-3">
                                          <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-semibold text-gray-900">{lesson.subject} - {lesson.tutor.name}</span>
                                            <div className="flex items-center gap-1">
                                              {[...Array(5)].map((_, i) => (
                                                <Star1 
                                                  key={`review-${reviewIndex}-star-${i}`} 
                                                  size={14} 
                                                  variant="Bold" 
                                                  className={i < (lesson.review?.rating || 0) ? "text-[#FF6636]" : "text-gray-300"} 
                                                />
                                              ))}
                                            </div>
                                          </div>
                                          <p className="text-xs text-gray-600">\"{lesson.review?.text}\"</p>
                                        </div>
                                    ))}
                                  </div>
                                </div>
                              </>
                            );
                          })()}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tutor Profile View */}
                {viewProfileType === 'Tutor' && (
                  <div>
                    {/* Profile Header */}
                    <div className="bg-gradient-to-r from-[#FF6636] to-[#E55A2B] rounded-t-2xl p-6 md:p-8 text-white relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
                      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />
                      
                      <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-6">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white flex items-center justify-center text-[#FF6636] font-bold text-2xl md:text-3xl shadow-xl">
                          {viewProfileUser.initials}
                        </div>
                        
                        <div className="flex-1 text-center sm:text-left">
                          <h1 className="text-2xl md:text-3xl font-bold mb-2">{viewProfileUser.name}</h1>
                          <p className="text-white/90 mb-3">Tutor</p>
                          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                              Mathematics
                            </span>
                            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                              Physics
                            </span>
                            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                              Chemistry
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Profile Content */}
                    <div className="p-6 space-y-6">
                      {/* Personal Information */}
                      <div className="bg-white rounded-2xl p-6 border border-gray-200">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                            <UserSquare className="w-5 h-5 text-[#FF6636]" variant="Bold" />
                          </div>
                          <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
                        </div>
                        
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Full Name</p>
                            <p className="font-semibold text-gray-900">{viewProfileUser.name}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Email</p>
                            <p className="font-semibold text-gray-900">{viewProfileUser.name.toLowerCase().replace(' ', '.')}@email.com</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Phone Number</p>
                            <p className="font-semibold text-gray-900">+234 803 456 7890</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Location</p>
                            <p className="font-semibold text-gray-900">Lagos, Nigeria</p>
                          </div>
                        </div>
                      </div>

                      {/* About Me */}
                      <div className="bg-white rounded-2xl p-6 border border-gray-200">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                            <DocumentText className="w-5 h-5 text-purple-600" variant="Bold" />
                          </div>
                          <h2 className="text-xl font-bold text-gray-900">About Me</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                          Experienced educator with over 5 years of teaching experience in Mathematics, Physics, and Chemistry. 
                          Passionate about helping students achieve their academic goals through personalized learning approaches.
                        </p>
                      </div>

                      {/* Teaching Statistics */}
                      <div className="bg-white rounded-2xl p-6 border border-gray-200">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                            <Chart className="w-5 h-5 text-green-600" variant="Bold" />
                          </div>
                          <h2 className="text-xl font-bold text-gray-900">Teaching Statistics</h2>
                        </div>
                        
                        <div className="grid sm:grid-cols-3 gap-4">
                          <div className="bg-gray-50 rounded-xl p-4">
                            <p className="text-sm text-gray-600 mb-1">Total Lessons</p>
                            <p className="text-2xl font-bold text-gray-900">
                              {viewProfileUser.status === 'approved' ? viewProfileUser.totalLessons : 0}
                            </p>
                          </div>
                          <div className="bg-gray-50 rounded-xl p-4">
                            <p className="text-sm text-gray-600 mb-1">Active Students</p>
                            <p className="text-2xl font-bold text-gray-900">
                              {viewProfileUser.status === 'approved' ? 12 : 0}
                            </p>
                          </div>
                          <div className="bg-gray-50 rounded-xl p-4">
                            <p className="text-sm text-gray-600 mb-1">Rating</p>
                            <p className="text-2xl font-bold text-gray-900">
                              {viewProfileUser.status === 'approved' ? '4.8 ⭐' : '0 ⭐'}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Subjects & Education Levels */}
                      <div className="bg-white rounded-2xl p-6 border border-gray-200">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                            <Teacher className="w-5 h-5 text-blue-600" variant="Bold" />
                          </div>
                          <h2 className="text-xl font-bold text-gray-900">Teaching Expertise</h2>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">Subjects</h3>
                            <div className="flex flex-wrap gap-2">
                              <span className="px-3 py-1.5 bg-[#FF6636] text-white rounded-lg text-sm font-medium">Mathematics</span>
                              <span className="px-3 py-1.5 bg-[#FF6636] text-white rounded-lg text-sm font-medium">Physics</span>
                              <span className="px-3 py-1.5 bg-[#FF6636] text-white rounded-lg text-sm font-medium">Chemistry</span>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">Education Levels</h3>
                            <div className="flex flex-wrap gap-2">
                              <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">WAEC</span>
                              <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">JAMB</span>
                              <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">A-Level</span>
                            </div>
                          </div>

                          {/* Availability */}
                          <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">Availability</h3>
                            
                            {/* Available Days */}
                            <div className="mb-3">
                              <p className="text-xs text-gray-500 mb-2">Available Days</p>
                              <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1.5 bg-orange-100 text-[#FF6636] rounded-lg text-sm font-medium">Monday</span>
                                <span className="px-3 py-1.5 bg-orange-100 text-[#FF6636] rounded-lg text-sm font-medium">Wednesday</span>
                                <span className="px-3 py-1.5 bg-orange-100 text-[#FF6636] rounded-lg text-sm font-medium">Friday</span>
                              </div>
                            </div>

                            {/* Available Times */}
                            <div>
                              <p className="text-xs text-gray-500 mb-2">Available Times</p>
                              <div className="space-y-2">
                                <div className="bg-gray-50 rounded-lg p-3">
                                  <p className="text-xs font-semibold text-[#FF6636] mb-2">Monday</p>
                                  <div className="flex flex-wrap gap-1.5">
                                    <span className="px-2 py-1 bg-white border border-gray-200 text-gray-700 rounded text-xs font-medium">9:00 AM - 11:00 AM</span>
                                    <span className="px-2 py-1 bg-white border border-gray-200 text-gray-700 rounded text-xs font-medium">2:00 PM - 4:00 PM</span>
                                  </div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-3">
                                  <p className="text-xs font-semibold text-[#FF6636] mb-2">Wednesday</p>
                                  <div className="flex flex-wrap gap-1.5">
                                    <span className="px-2 py-1 bg-white border border-gray-200 text-gray-700 rounded text-xs font-medium">10:00 AM - 12:00 PM</span>
                                    <span className="px-2 py-1 bg-white border border-gray-200 text-gray-700 rounded text-xs font-medium">3:00 PM - 5:00 PM</span>
                                  </div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-3">
                                  <p className="text-xs font-semibold text-[#FF6636] mb-2">Friday</p>
                                  <div className="flex flex-wrap gap-1.5">
                                    <span className="px-2 py-1 bg-white border border-gray-200 text-gray-700 rounded text-xs font-medium">9:00 AM - 11:00 AM</span>
                                    <span className="px-2 py-1 bg-white border border-gray-200 text-gray-700 rounded text-xs font-medium">1:00 PM - 3:00 PM</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Payment Information - Demo Data */}
                      <div className="bg-white rounded-2xl p-6 border border-gray-200">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                            <MoneyRecive className="w-5 h-5 text-green-600" variant="Bold" />
                          </div>
                          <h2 className="text-xl font-bold text-gray-900">Payment Information</h2>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                              <MoneyRecive className="w-4 h-4 text-blue-600" variant="Bold" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-gray-500 mb-1">Account Number</p>
                              <p className="font-medium text-gray-900">0123456789</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center shrink-0">
                              <MoneyRecive className="w-4 h-4 text-purple-600" variant="Bold" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-gray-500 mb-1">Bank Name</p>
                              <p className="font-medium text-gray-900">First Bank of Nigeria</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                              <MoneyRecive className="w-4 h-4 text-green-600" variant="Bold" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-gray-500 mb-1">Account Name</p>
                              <p className="font-medium text-gray-900">{viewProfileUser.name}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Active Status Card */}
                      <div className={`bg-gradient-to-br rounded-2xl p-6 border transition-all ${
                        isTutorActive 
                          ? 'from-green-50 to-emerald-50 border-green-200' 
                          : 'from-gray-50 to-slate-50 border-gray-200'
                      }`}>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                              isTutorActive 
                                ? 'bg-green-500 animate-pulse' 
                                : 'bg-gray-400'
                            }`} />
                            <p className={`text-sm font-semibold ${
                              isTutorActive 
                                ? 'text-green-700' 
                                : 'text-gray-700'
                            }`}>Account Status</p>
                          </div>
                          
                          {/* Toggle Switch */}
                          <button
                            onClick={() => {
                              const newActiveState = !isTutorActive;
                              setIsTutorActive(newActiveState);
                              
                              // If activating, add to approved list
                              if (newActiveState && viewProfileUser) {
                                if (!approvedTutorIds.includes(viewProfileUser.id)) {
                                  setApprovedTutorIds([...approvedTutorIds, viewProfileUser.id]);
                                  setRejectedTutorIds(rejectedTutorIds.filter(id => id !== viewProfileUser.id));
                                  toast.success(`${viewProfileUser.name} has been approved!`, {
                                    description: 'The tutor can now access their dashboard and receive bookings.',
                                  });
                                }
                              } else if (!newActiveState && viewProfileUser) {
                                // If deactivating, remove from approved list
                                setApprovedTutorIds(approvedTutorIds.filter(id => id !== viewProfileUser.id));
                                toast.info(`${viewProfileUser.name}'s account has been deactivated`, {
                                  description: 'The tutor will not be able to receive new bookings.',
                                });
                              }
                            }}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              isTutorActive ? 'bg-green-500' : 'bg-gray-300'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                isTutorActive ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                        
                        <p className={`text-2xl font-bold ${
                          isTutorActive 
                            ? 'text-green-900' 
                            : 'text-gray-900'
                        }`}>
                          {isTutorActive ? 'Active' : 'Inactive'}
                        </p>
                        <p className={`text-sm mt-1 ${
                          isTutorActive 
                            ? 'text-green-600' 
                            : 'text-gray-500'
                        }`}>
                          {isTutorActive 
                            ? 'Tutor can receive lesson bookings' 
                            : 'Tutor is currently disabled'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
      <Toaster />
    </div>
  );
}