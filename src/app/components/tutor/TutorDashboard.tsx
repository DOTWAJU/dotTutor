import React from 'react';
import { 
  Home2, 
  LogoutCurve, 
  Menu, 
  CloseCircle,
  Notification,
  Teacher,
  HambergerMenu,
  ArrowSquareLeft,
  ArrowSquareRight,
  User,
  Calendar,
  MoneyRecive,
  Setting2,
  People,
  MessageQuestion,
  ArrowDown2,
  ChartSquare,
  Star1,
  Book1,
  DocumentText,
  ClipboardText,
  ArrowRight2,
  Archive,
  TickCircle,
} from 'iconsax-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Logo from '../../imports/Logo-4004-36';
import { TutorRegistrationStep2 } from '../TutorRegistrationStep2New';
import { TutorProfileView } from './TutorProfileView';
import { TutorSettingsPage } from './TutorSettingsPage';
import { MyStudentsPage } from './MyStudentsPage';
import { ExploreStudentsPage } from './ExploreStudentsPage';
import { TutorEarningsPage } from './TutorEarningsPage';
import { TutorReportPage } from './TutorReportPage';
import { TutorLessonSchedulePage } from './TutorLessonSchedulePage';
import { TutorHelpdeskPage } from './TutorHelpdeskPage';

// Dot-tutor Icon Component
function DotTutorIcon() {
  return (
    <div className="w-[28px] h-[28px] flex items-center justify-center">
      <Teacher 
        size={28} 
        variant="Bold"
        color="#FF6636"
      />
    </div>
  );
}

interface TutorDashboardProps {
  userName?: string;
  userInitials?: string;
  onLogout?: () => void;
  isActivated?: boolean; // Account activation status
  basicInfo: any;
  academicInfo: any;
  setAcademicInfo: (info: any) => void;
  onCompleteProfile?: () => void;
}

export function TutorDashboard({ 
  userName = 'Tutor', 
  userInitials = 'TU', 
  onLogout,
  isActivated = false,
  basicInfo,
  academicInfo,
  setAcademicInfo,
  onCompleteProfile
}: TutorDashboardProps) {
  const [activePage, setActivePage] = React.useState('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = React.useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = React.useState(false);
  const [showProfileCompletion, setShowProfileCompletion] = React.useState(false);
  
  const profileDropdownRef = React.useRef<HTMLDivElement>(null);
  const notificationDropdownRef = React.useRef<HTMLDivElement>(null);

  // Use basicInfo.fullName or fallback to userName prop
  const displayName = basicInfo?.fullName || userName;
  const displayInitials = basicInfo?.fullName 
    ? basicInfo.fullName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    : userInitials;

  // Local state for Settings page to allow editing
  const [localBasicInfo, setLocalBasicInfo] = React.useState(basicInfo);
  const [localAcademicInfo, setLocalAcademicInfo] = React.useState(academicInfo);

  // Helpdesk tickets state
  const [helpdeskTickets, setHelpdeskTickets] = React.useState<any[]>([]);

  // Handle express interest in a student
  const handleExpressInterest = (studentId: string, studentName: string, studentSubject: string) => {
    // Create a ticket for the student interest
    const newTicket = {
      id: `TKT-${Date.now()}`,
      ticketNumber: `TKT-${Date.now()}`,
      subject: `Interest in Student: ${studentName}`,
      category: 'Student Matching',
      description: `I am interested in teaching ${studentName} for ${studentSubject}. Please review and assign this student to me if approved.`,
      status: 'Pending',
      priority: 'Medium',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      responses: [],
      studentId,
      studentName,
      studentSubject,
    };

    // Add ticket to helpdesk
    setHelpdeskTickets([newTicket, ...helpdeskTickets]);

    // Navigate to Helpdesk after a short delay
    setTimeout(() => {
      setActivePage('Helpdesk');
    }, 2000);
  };

  // Sync local state with props when they change
  React.useEffect(() => {
    setLocalBasicInfo(basicInfo);
  }, [basicInfo]);

  React.useEffect(() => {
    setLocalAcademicInfo(academicInfo);
  }, [academicInfo]);

  // Check if we're on mobile
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
      if (notificationDropdownRef.current && !notificationDropdownRef.current.contains(event.target as Node)) {
        setIsNotificationDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sidebar menu items
  const menuItems = [
    { icon: Home2, label: 'Dashboard', value: 'Dashboard' },
    { icon: People, label: 'Explore Students', value: 'Explore Students', requiresActivation: true },
    { icon: People, label: 'My Students', value: 'My Students', requiresActivation: true },
    { icon: Calendar, label: 'Lesson Schedule', value: 'Lesson Schedule', requiresActivation: true },
    { icon: MoneyRecive, label: 'Earnings', value: 'Earnings', requiresActivation: true },
    { icon: ChartSquare, label: 'Report', value: 'Report', requiresActivation: true },
    { icon: User, label: 'Profile', value: 'Profile' },
    { icon: MessageQuestion, label: 'Helpdesk', value: 'Helpdesk' },
  ];

  // Filter menu items based on activation status
  const visibleMenuItems = menuItems.filter(item => !item.requiresActivation || isActivated);

  // Profile completion check
  const isProfileComplete = academicInfo.subjectsToTeach?.length > 0 && 
                           academicInfo.levelsOfEducation?.length > 0 &&
                           academicInfo.biography?.length >= 50;

  const handleCompleteProfile = () => {
    if (onCompleteProfile) {
      onCompleteProfile();
    }
  };

  const handleSaveProfileSettings = () => {
    setAcademicInfo(localAcademicInfo);
    
    // Save both basic and academic info to localStorage
    const savedTutorProfile = localStorage.getItem('dottutor_tutor_profile');
    if (savedTutorProfile) {
      const profile = JSON.parse(savedTutorProfile);
      const updatedProfile = {
        ...profile,
        basicInfo: localBasicInfo,
        academicInfo: localAcademicInfo
      };
      localStorage.setItem('dottutor_tutor_profile', JSON.stringify(updatedProfile));
      console.log('Profile updated and saved to localStorage:', updatedProfile);
    }
  };

  // Redirect to dashboard if trying to access locked pages
  React.useEffect(() => {
    const lockedPages = ['Explore Students', 'My Students', 'Lesson Schedule', 'Earnings', 'Report'];
    if (!isActivated && lockedPages.includes(activePage)) {
      setActivePage('Dashboard');
    }
  }, [activePage, isActivated]);

  return (
    <div className="flex h-screen overflow-hidden bg-orange-50/[0.20]">
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ${isSidebarCollapsed ? 'w-20' : 'w-72'}`}>
        {/* Logo */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          {isSidebarCollapsed ? (
            <div className="mx-auto">
              <DotTutorIcon />
            </div>
          ) : (
            <>
              <div className="scale-90 origin-left">
                <Logo />
              </div>
              <button
                onClick={() => setIsSidebarCollapsed(true)}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                title="Minimize sidebar"
              >
                <ArrowSquareLeft className="w-5 h-5 text-gray-600" />
              </button>
            </>
          )}
        </div>

        {/* Expand Button when collapsed */}
        {isSidebarCollapsed && (
          <div className="px-4 py-2">
            <button
              onClick={() => setIsSidebarCollapsed(false)}
              className="w-full p-2 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-center"
              title="Expand sidebar"
            >
              <ArrowSquareRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        )}

        {/* Menu Items */}
        <nav className="flex-1 px-4 py-2 mt-4">
          <ul className="space-y-1">
            {visibleMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.value;
              return (
                <li key={item.value}>
                  <button
                    onClick={() => setActivePage(item.value)}
                    className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : ''} gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-orange-50 shadow-sm'
                        : 'hover:bg-gray-50'
                    }`}
                    title={isSidebarCollapsed ? item.label : ''}
                  >
                    <Icon
                      className="w-5 h-5"
                      variant={isActive ? 'Bold' : 'Linear'}
                      color={isActive ? '#FF6636' : 'rgb(100, 116, 139)'}
                    />
                    {!isSidebarCollapsed && (
                      <span className={`text-sm font-medium ${
                        isActive ? 'text-[#FF6636]' : 'text-gray-600'
                      }`}>
                        {item.label}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Section - Copyright */}
        <div className="p-4 border-t border-gray-200">
          <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-start'} gap-2 px-2 py-2 text-gray-500`}>
            <Teacher className="w-4 h-4" variant="Linear" />
            {!isSidebarCollapsed && (
              <span className="text-xs">© 2026</span>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 lg:hidden ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Logo */}
        <div className="h-20 flex items-center justify-between px-4 border-b border-gray-200">
          <Logo />
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <CloseCircle className="w-6 h-6 text-gray-600" variant="Linear" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="py-6 px-3">
          <div className="space-y-1">
            {visibleMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.value;
              return (
                <button
                  key={item.value}
                  onClick={() => {
                    setActivePage(item.value);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-orange-50 shadow-sm'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <Icon 
                    className="w-5 h-5" 
                    variant={isActive ? 'Bold' : 'Linear'}
                    color={isActive ? '#FF6636' : 'rgb(100, 116, 139)'}
                  />
                  <span className={`font-medium text-[15px] ${
                    isActive ? 'text-[#FF6636]' : 'text-gray-600'
                  }`}>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Logout */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200"
            >
              <LogoutCurve className="w-5 h-5" variant="Linear" />
              <span className="font-medium text-[15px]">Logout</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 shrink-0">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <HambergerMenu className="w-6 h-6 text-gray-700" variant="Linear" />
            </button>

            {/* Page Title */}
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
                {activePage}
              </h1>
            </div>
          </div>

          {/* Right Side - Notifications & Profile */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <div className="relative" ref={notificationDropdownRef}>
              <button 
                onClick={() => setIsNotificationDropdownOpen(!isNotificationDropdownOpen)}
                className="relative p-2.5 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <Notification className="w-6 h-6 text-gray-700" variant="Linear" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF6636] rounded-full" />
              </button>

              {/* Notification Dropdown */}
              {isNotificationDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 max-w-[calc(100vw-2rem)] bg-white rounded-xl shadow-xl border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="p-4 text-center text-gray-500">
                    No new notifications
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative" ref={profileDropdownRef}>
              <button 
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-2 p-2 pr-3 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-[#FF6636] flex items-center justify-center text-white font-semibold">
                  {displayInitials}
                </div>
                <span className="hidden sm:block text-sm font-semibold text-gray-900">{displayName}</span>
                <ArrowDown2 className="w-4 h-4 text-gray-500" variant="Linear" />
              </button>

              {/* Profile Dropdown */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 z-50">
                  <div className="p-2">
                    <button
                      onClick={() => {
                        setActivePage('Profile');
                        setIsProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <User className="w-4 h-4" variant="Linear" />
                      <span className="text-sm font-medium">View Profile</span>
                    </button>
                    <button
                      onClick={() => {
                        setActivePage('Bookmarked');
                        setIsProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Archive className="w-4 h-4" variant="Linear" />
                      <span className="text-sm font-medium">Bookmarked</span>
                    </button>
                    <button
                      onClick={() => {
                        setActivePage('Settings');
                        setIsProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Setting2 className="w-4 h-4" variant="Linear" />
                      <span className="text-sm font-medium">Settings</span>
                    </button>
                    <div className="my-1 border-t border-gray-200" />
                    <button
                      onClick={onLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <LogoutCurve className="w-4 h-4" variant="Linear" />
                      <span className="text-sm font-medium">Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          {/* Dashboard Content */}
          {activePage === 'Dashboard' && (
            <div className="max-w-7xl mx-auto">
              {/* Account Status Banner */}
              {!isActivated && (
                <div className="mb-6 bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-orange-200 flex items-center justify-center shrink-0">
                      <Teacher className="w-6 h-6 text-orange-600" variant="Bold" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Complete Your Profile
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        {!isProfileComplete 
                          ? "Your account is created! Complete your academic information to get your profile activated and start tutoring."
                          : "Your profile is complete and awaiting approval. You'll be notified once your account is activated."
                        }
                      </p>
                      {!isProfileComplete && (
                        <button
                          onClick={() => setShowProfileCompletion(true)}
                          className="px-6 py-2.5 bg-[#FF6636] text-white rounded-xl font-semibold hover:bg-[#E55A2B] transition-all"
                        >
                          Complete Profile Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Welcome Section */}
              <div className="mb-8">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">
                  Welcome back, {userName.split(' ')[0]}! 👋
                </h2>
                <p className="text-sm lg:text-base text-[#6e7485]">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long',
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                <div className="bg-white rounded-2xl p-5 border border-gray-200">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                      <People className="w-6 h-6 text-blue-600" variant="Bold" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 font-medium">Total Students</p>
                      <p className="text-xl font-bold text-gray-900">{isActivated ? '3' : '-'}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-gray-200">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-green-600" variant="Bold" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 font-medium">Upcoming Lessons</p>
                      <p className="text-xl font-bold text-gray-900">{isActivated ? '3' : '-'}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-gray-200">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                      <MoneyRecive className="w-6 h-6 text-purple-600" variant="Bold" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 font-medium">Earnings</p>
                      <p className="text-xl font-bold text-gray-900">
                        {isActivated ? (academicInfo.currency ? academicInfo.currency.match(/[₦$£]/)?.[0] || '₦' : '₦') + '92,500' : '-'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-gray-200">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                      <Star1 className="w-6 h-6 text-[#FF6636]" variant="Bold" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 font-medium">Reviews</p>
                      <p className="text-xl font-bold text-gray-900">{isActivated ? '5.0' : '-'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              {isActivated && (
                <div className="mb-8">
                  {/* Recent Activity Card */}
                  <div className="bg-white rounded-2xl p-6 border border-gray-200">
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
                      <p className="text-sm text-gray-500 mt-1">Latest updates</p>
                    </div>

                    {/* Activity List */}
                    <div className="space-y-4">
                      {/* Activity Item 1 - Student Assigned */}
                      <button
                        onClick={() => setActivePage('My Students')}
                        className="flex gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0 w-full text-left hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors cursor-pointer group"
                      >
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                          <TickCircle className="w-5 h-5 text-green-600" variant="Bold" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 mb-1">
                            Student assigned to you
                          </p>
                          <p className="text-xs text-gray-500 mb-1">
                            Emily Rodriguez has been assigned for Chemistry tutoring
                          </p>
                          <p className="text-xs text-gray-400">1 hour ago</p>
                        </div>
                        <div className="flex items-center">
                          <ArrowRight2 className="w-4 h-4 text-gray-400 group-hover:text-[#FF6636]" />
                        </div>
                      </button>

                      {/* Activity Item 2 */}
                      <button
                        onClick={() => setActivePage('Lesson Schedule')}
                        className="flex gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0 w-full text-left hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors cursor-pointer group"
                      >
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                          <Book1 className="w-5 h-5 text-blue-600" variant="Bold" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 mb-1">
                            New lesson scheduled
                          </p>
                          <p className="text-xs text-gray-500 mb-1">
                            Mathematics lesson with John Doe
                          </p>
                          <p className="text-xs text-gray-400">2 hours ago</p>
                        </div>
                        <div className="flex items-center">
                          <ArrowRight2 className="w-4 h-4 text-gray-400 group-hover:text-[#FF6636]" />
                        </div>
                      </button>

                      {/* Activity Item 3 */}
                      <button
                        onClick={() => setActivePage('My Students')}
                        className="flex gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0 w-full text-left hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors cursor-pointer group"
                      >
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                          <DocumentText className="w-5 h-5 text-[#FF6636]" variant="Bold" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 mb-1">
                            Assignment submitted
                          </p>
                          <p className="text-xs text-gray-500 mb-1">
                            Jane Smith submitted Algebra homework
                          </p>
                          <p className="text-xs text-gray-400">5 hours ago</p>
                        </div>
                        <div className="flex items-center">
                          <ArrowRight2 className="w-4 h-4 text-gray-400 group-hover:text-[#FF6636]" />
                        </div>
                      </button>

                      {/* Activity Item 4 */}
                      <button
                        onClick={() => setActivePage('Lesson Schedule')}
                        className="flex gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0 w-full text-left hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors cursor-pointer group"
                      >
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                          <Calendar className="w-5 h-5 text-purple-600" variant="Bold" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 mb-1">
                            Lesson completed
                          </p>
                          <p className="text-xs text-gray-500 mb-1">
                            Physics lesson with Sarah Wilson
                          </p>
                          <p className="text-xs text-gray-400">2 days ago</p>
                        </div>
                        <div className="flex items-center">
                          <ArrowRight2 className="w-4 h-4 text-gray-400 group-hover:text-[#FF6636]" />
                        </div>
                      </button>

                      {/* Activity Item 5 */}
                      <button
                        onClick={() => setActivePage('My Students')}
                        className="flex gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0 w-full text-left hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors cursor-pointer group"
                      >
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                          <People className="w-5 h-5 text-blue-600" variant="Bold" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 mb-1">
                            Student enrolled
                          </p>
                          <p className="text-xs text-gray-500 mb-1">
                            Emma Davis joined your Chemistry class
                          </p>
                          <p className="text-xs text-gray-400">3 days ago</p>
                        </div>
                        <div className="flex items-center">
                          <ArrowRight2 className="w-4 h-4 text-gray-400 group-hover:text-[#FF6636]" />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Empty State or Content */}
              {isActivated ? (
                <div className="bg-white rounded-2xl p-12 border border-gray-200 text-center">
                  <div className="max-w-md mx-auto">
                    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
                      <Teacher className="w-10 h-10 text-gray-400" variant="Bold" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      Ready to Start Teaching!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Your profile is approved! Students can now find you and book lessons. Check your schedule for upcoming sessions.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-12 border border-gray-200 text-center">
                  <div className="max-w-md mx-auto">
                    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
                      <Teacher className="w-10 h-10 text-gray-400" variant="Bold" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      Your Teaching Journey Starts Here
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Complete your profile to get started and connect with students who need your expertise.
                    </p>
                    {!isProfileComplete && (
                      <button
                        onClick={() => setShowProfileCompletion(true)}
                        className="px-8 py-3 bg-[#FF6636] text-white rounded-xl font-semibold hover:bg-[#E55A2B] transition-all"
                      >
                        Complete Your Profile
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Profile View Page */}
          {activePage === 'Profile' && (
            <TutorProfileView
              basicInfo={basicInfo}
              academicInfo={academicInfo}
              onEditProfile={() => setActivePage('Settings')}
              isActivated={isActivated}
              isProfileComplete={isProfileComplete}
            />
          )}

          {/* My Students Page */}
          {activePage === 'My Students' && (
            <MyStudentsPage onScheduleLesson={() => setActivePage('Lesson Schedule')} />
          )}

          {/* Explore Students Page */}
          {activePage === 'Explore Students' && (
            <ExploreStudentsPage 
              onNavigateToBookmarked={() => setActivePage('Bookmarked')}
              onExpressInterest={handleExpressInterest}
            />
          )}

          {/* Settings Page */}
          {activePage === 'Settings' && (
            <TutorSettingsPage
              basicInfo={localBasicInfo}
              academicInfo={localAcademicInfo}
              setBasicInfo={setLocalBasicInfo}
              setAcademicInfo={setLocalAcademicInfo}
              onSave={handleSaveProfileSettings}
            />
          )}

          {/* Earnings Page */}
          {activePage === 'Earnings' && (
            <TutorEarningsPage 
              currency={academicInfo.currency ? academicInfo.currency.match(/[₦$£]/)?.[0] || '₦' : '₦'}
            />
          )}

          {/* Report Page */}
          {activePage === 'Report' && (
            <TutorReportPage />
          )}

          {/* Lesson Schedule Page */}
          {activePage === 'Lesson Schedule' && (
            <TutorLessonSchedulePage />
          )}

          {/* Helpdesk Page */}
          {activePage === 'Helpdesk' && (
            <TutorHelpdeskPage tickets={helpdeskTickets} />
          )}

          {/* Other Pages - Placeholder */}
          {['Bookmarked'].includes(activePage) && (
            <div className="max-w-7xl mx-auto">
              <div className="bg-white rounded-2xl p-12 border border-gray-200 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{activePage}</h3>
                <p className="text-gray-600">This feature is coming soon!</p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Profile Completion Modal */}
      {showProfileCompletion && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto my-8">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
              <h2 className="text-2xl font-bold text-gray-900">Complete Your Profile</h2>
              <button
                onClick={() => setShowProfileCompletion(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <CloseCircle className="w-6 h-6 text-gray-600" variant="Bold" />
              </button>
            </div>
            <div className="p-6">
              <TutorRegistrationStep2
                academicInfo={academicInfo}
                handleChange={(field, value) => {
                  setAcademicInfo({ ...academicInfo, [field]: value });
                }}
                handleBlur={() => {}}
                setFocusedField={() => {}}
                setTouched={() => {}}
                focusedField={null}
                touched={{}}
                step2Validations={{
                  biography: academicInfo.biography?.length >= 50,
                  subjectsToTeach: academicInfo.subjectsToTeach?.length > 0,
                  levelsOfEducation: academicInfo.levelsOfEducation?.length > 0,
                  lessonMode: academicInfo.lessonMode !== '' && academicInfo.lessonMode !== 'Select lesson mode...',
                  currency: academicInfo.currency !== '' && academicInfo.currency !== 'Select currency...',
                  costPerLesson: academicInfo.costPerLesson !== '',
                  highestDegree: academicInfo.highestDegree !== '' && academicInfo.highestDegree !== 'Select degree...',
                  courseOfStudy: academicInfo.courseOfStudy?.trim().length >= 2,
                  institution: academicInfo.institution?.trim().length >= 2,
                }}
                getFieldStatus={() => 'default'}
                handleCvUpload={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setAcademicInfo({ ...academicInfo, cvResume: e.target.files[0] });
                  }
                }}
                setCurrentStep={() => {}}
                handleAcademicInfoSubmit={() => {
                  setShowProfileCompletion(false);
                  handleCompleteProfile();
                }}
                isStep2Valid={
                  academicInfo.biography?.length >= 50 &&
                  academicInfo.subjectsToTeach?.length > 0 &&
                  academicInfo.levelsOfEducation?.length > 0 &&
                  academicInfo.lessonMode !== '' &&
                  academicInfo.lessonMode !== 'Select lesson mode...' &&
                  academicInfo.currency !== '' &&
                  academicInfo.currency !== 'Select currency...' &&
                  academicInfo.costPerLesson !== '' &&
                  academicInfo.highestDegree !== '' &&
                  academicInfo.highestDegree !== 'Select degree...' &&
                  academicInfo.courseOfStudy?.trim().length >= 2 &&
                  academicInfo.institution?.trim().length >= 2
                }
                educationLevels={[
                  'Primary Education',
                  'Secondary Education',
                  'High School',
                  'Undergraduate',
                  'Postgraduate',
                ]}
                lessonModeOptions={[
                  'Select lesson mode...',
                  'Online',
                  'In-Person',
                  'Hybrid',
                ]}
                currencyOptions={[
                  'Select currency...',
                  'Dollars ($)',
                  'Pounds (£)',
                  'Naira (₦)',
                ]}
                languageOptions={[
                  'Select language...',
                  'English',
                  'Yoruba',
                  'Igbo',
                  'Hausa',
                  'French',
                  'Spanish',
                  'Arabic',
                ]}
                degreeOptions={[
                  'Select degree...',
                  'High School Diploma',
                  'Associate Degree',
                   "Bachelor's Degree",
                   "Master's Degree",
                  'PhD / Doctorate',
                ]}
                showNavigationButtons={false}
              />
              
              {/* Modal Action Buttons */}
              <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowProfileCompletion(false)}
                  className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-[#FF6636] hover:text-[#FF6636] transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (academicInfo.biography?.length >= 50 &&
                        academicInfo.subjectsToTeach?.length > 0 &&
                        academicInfo.levelsOfEducation?.length > 0 &&
                        academicInfo.lessonMode !== '' &&
                        academicInfo.lessonMode !== 'Select lesson mode...' &&
                        academicInfo.currency !== '' &&
                        academicInfo.currency !== 'Select currency...' &&
                        academicInfo.costPerLesson !== '' &&
                        academicInfo.highestDegree !== '' &&
                        academicInfo.highestDegree !== 'Select degree...' &&
                        academicInfo.courseOfStudy?.trim().length >= 2 &&
                        academicInfo.institution?.trim().length >= 2) {
                      setShowProfileCompletion(false);
                      handleCompleteProfile();
                    }
                  }}
                  disabled={!(
                    academicInfo.biography?.length >= 50 &&
                    academicInfo.subjectsToTeach?.length > 0 &&
                    academicInfo.levelsOfEducation?.length > 0 &&
                    academicInfo.lessonMode !== '' &&
                    academicInfo.lessonMode !== 'Select lesson mode...' &&
                    academicInfo.currency !== '' &&
                    academicInfo.currency !== 'Select currency...' &&
                    academicInfo.costPerLesson !== '' &&
                    academicInfo.highestDegree !== '' &&
                    academicInfo.highestDegree !== 'Select degree...' &&
                    academicInfo.courseOfStudy?.trim().length >= 2 &&
                    academicInfo.institution?.trim().length >= 2
                  )}
                  className={`px-6 py-2.5 rounded-xl font-semibold transition-all ${
                    (academicInfo.biography?.length >= 50 &&
                     academicInfo.subjectsToTeach?.length > 0 &&
                     academicInfo.levelsOfEducation?.length > 0 &&
                     academicInfo.lessonMode !== '' &&
                     academicInfo.lessonMode !== 'Select lesson mode...' &&
                     academicInfo.currency !== '' &&
                     academicInfo.currency !== 'Select currency...' &&
                     academicInfo.costPerLesson !== '' &&
                     academicInfo.highestDegree !== '' &&
                     academicInfo.highestDegree !== 'Select degree...' &&
                     academicInfo.courseOfStudy?.trim().length >= 2 &&
                     academicInfo.institution?.trim().length >= 2)
                      ? 'bg-[#FF6636] text-white hover:bg-[#E55A2B]'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}