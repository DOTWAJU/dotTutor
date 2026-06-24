import React from 'react';
import { 
  ArrowDown2, 
  Home2, 
  SearchNormal1, 
  Book1, 
  DocumentText, 
  Video, 
  EmptyWallet, 
  LogoutCurve, 
  Menu, 
  CloseCircle,
  Notification,
  Setting2,
  Teacher,
  MessageQuestion,
  Message,
  ArrowLeft2,
  ArrowRight2,
  ArrowRight,
  ArrowLeft,
  Copyright,
  ArrowSquareLeft,
  ArrowSquareRight,
  HambergerMenu,
  CloseSquare,
  TickCircle,
  CardEdit,
  Calendar
} from 'iconsax-react';
import Logo from '../../imports/Logo-4004-36';
import svgPaths from '../../imports/svg-0cwez52s90';
import categoryPaths from '../../imports/svg-doelljkmeg';
import { ExplorePage } from './ExplorePage';
import { TutorsListPage } from './TutorsListPage';
import { TutorProfilePage } from './TutorProfilePage';
import { BookingPage } from './BookingPage';
import { PaymentPage } from './PaymentPage';
import { RequestTutorForm } from './RequestTutorForm';
import { toast } from 'sonner';
import { MyLessonsPage } from './MyLessonsPage';
import { SubscriptionsPage } from './SubscriptionsPage';
import { DashboardHome } from './DashboardHome';
import { AssignmentsPage } from './AssignmentsPage';
import { ELibraryPage } from './ELibraryPage';
import { FlashcardsPage } from './FlashcardsPage';
import { SettingsPage } from './SettingsPage';
import { HelpdeskPage } from './HelpdeskPageNew';
import { TutorsPage } from './TutorsPage';

// Dot-tutor Icon Component (just the graduation cap icon)
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

interface StudentDashboardProps {
  userName?: string;
  userInitials?: string;
  onLogout?: () => void;
  isFirstLogin?: boolean; // true if user is creating new account, false if logging in
}

export function StudentDashboard({ userName = 'Student', userInitials = 'ST', onLogout, isFirstLogin }: StudentDashboardProps) {
  const [activePage, setActivePage] = React.useState(isFirstLogin ? 'Explore' : 'Dashboard');
  const [activeTopTab, setActiveTopTab] = React.useState(isFirstLogin ? 'Explore' : 'Dashboard');
  const [activeSidebarItem, setActiveSidebarItem] = React.useState(isFirstLogin ? 'Explore' : 'Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false); // Mobile dropdown menu
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);
  const [learningDropdownOpen, setLearningDropdownOpen] = React.useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = React.useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [myLessonsTab, setMyLessonsTab] = React.useState('Live classes');
  const [filterLevel, setFilterLevel] = React.useState('Level');
  const [filterSchool, setFilterSchool] = React.useState('Secondary School');
  const [currentPage, setCurrentPage] = React.useState(1);
  const profileDropdownRef = React.useRef<HTMLDivElement>(null);
  const notificationDropdownRef = React.useRef<HTMLDivElement>(null);
  
  // Booking flow states
  const [selectedSubject, setSelectedSubject] = React.useState<string>('');
  const [selectedTutor, setSelectedTutor] = React.useState<any>(null);
  const [showTutorsListPage, setShowTutorsListPage] = React.useState(false);
  const [showRequestForm, setShowRequestForm] = React.useState(false);
  const [showTutorProfile, setShowTutorProfile] = React.useState(false);
  const [showBookingPage, setShowBookingPage] = React.useState(false);
  const [showPaymentPage, setShowPaymentPage] = React.useState(false);
  const [bookingData, setBookingData] = React.useState<any>(null);
  
  // Booking history state
  const [bookingHistory, setBookingHistory] = React.useState<any[]>([]);
  const [requestHistory, setRequestHistory] = React.useState<any[]>([]);
  const [helpdeskTickets, setHelpdeskTickets] = React.useState<any[]>([]);

  // Load booking and request history from localStorage on mount
  React.useEffect(() => {
    const savedBookings = localStorage.getItem('dottutor_bookings');
    const savedRequests = localStorage.getItem('dottutor_requests');
    
    if (savedBookings) {
      try {
        setBookingHistory(JSON.parse(savedBookings));
      } catch (e) {
        console.error('Error loading bookings:', e);
      }
    }
    
    if (savedRequests) {
      try {
        setRequestHistory(JSON.parse(savedRequests));
      } catch (e) {
        console.error('Error loading requests:', e);
      }
    }
  }, []);

  // Save booking history to localStorage whenever it changes
  React.useEffect(() => {
    if (bookingHistory.length > 0) {
      localStorage.setItem('dottutor_bookings', JSON.stringify(bookingHistory));
    }
  }, [bookingHistory]);

  // Save request history to localStorage whenever it changes
  React.useEffect(() => {
    if (requestHistory.length > 0) {
      localStorage.setItem('dottutor_requests', JSON.stringify(requestHistory));
    }
  }, [requestHistory]);

  // Subjects with no tutors - they should show request form
  const subjectsWithNoTutors = ['Art', 'Tie & Dye', 'Baking'];

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

  // If on mobile and currently on Explore page, switch to Dashboard
  React.useEffect(() => {
    if (isMobile && activePage === 'Explore') {
      setActivePage('Dashboard');
      setActiveTopTab('Live Classes');
      setActiveSidebarItem('Dashboard');
    }
  }, [isMobile]);

  // Sidebar menu items
  const menuItems = [
    { name: 'Dashboard', icon: Home2 },
    { name: 'Tutors', icon: Teacher },
    { name: 'My Lessons', icon: Video },
    { 
      name: 'Learning Resources', 
      icon: Book1,
      hasDropdown: true,
      dropdownItems: ['Assignments', 'E-library', 'Flashcards']
    },
    { name: 'My Payments', icon: EmptyWallet },
    { name: 'Helpdesk', icon: MessageQuestion },
  ];

  // Top navigation tabs - removed
  const topTabs: any[] = [];

  // Categories data matching Figma design
  const categories = [
    { name: 'Mathematics', tutors: '63,476 tutors', color: '#564FFD', icon: 'cpu' },
    { name: 'Business Studies', tutors: '52,822 tutors', color: '#23BD33', icon: 'handshake' },
    { name: 'Finance & Accounting', tutors: '33,841 tutors', color: '#FD8E1F', icon: 'creditcard' },
    { name: 'Computer Science', tutors: '22,649 tutors', color: '#E34444', icon: 'chart' },
    { name: 'Social Studies', tutors: '20,126 tutors', color: '#E51515', icon: 'bug' },
    { name: 'Book Keeping', tutors: '13,932 tutors', color: '#1D2026', icon: 'receipt' },
    { name: 'Marketing', tutors: '12,068  tutors', color: '#564FFD', icon: 'megaphone' },
    { name: 'Fine and Creative Arts', tutors: '6,196 tutors', color: '#1D2026', icon: 'camera' },
    { name: 'Health Education', tutors: '2,736 tutors', color: '#FD8E1F', icon: 'package' },
    { name: 'Design', tutors: '2,600 tutors', color: '#FF6636', icon: 'pen' },
    { name: 'Physical Education', tutors: '1,678 tutors', color: '#23BD33', icon: 'firstaid' },
    { name: 'Music', tutors: '959 tutors', color: '#FD8E1F', icon: 'headphones' },
  ];

  const totalPages = 4;

  // Recent activity data
  const recentActivity = [
    {
      id: 1,
      type: 'lesson',
      title: 'Completed Mathematics lesson',
      description: 'Quadratic equations',
      time: '2 hours ago',
      icon: TickCircle,
      color: '#23BD33'
    },
    {
      id: 2,
      type: 'tutor',
      title: 'Tutor approved',
      description: 'Coolwill Mabel has been assigned to you',
      time: '3 hours ago',
      icon: Teacher,
      color: '#4CAF50'
    },
    {
      id: 3,
      type: 'flashcard',
      title: 'Studied 15 flashcards',
      description: 'Physics - Motion',
      time: '5 hours ago',
      icon: CardEdit,
      color: '#FF6636'
    },
    {
      id: 4,
      type: 'booking',
      title: 'Booked new lesson',
      description: 'Chemistry with Dr. Brown',
      time: '1 day ago',
      icon: Calendar,
      color: '#2196F3'
    }
  ];

  // Mock program data
  const programs = [
    {
      id: 1,
      category: 'Mathematics',
      title: 'Advanced Calculus',
      description: 'Master calculus concepts from basics to advanced topics.',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop',
      tag: 'Diploma'
    },
    {
      id: 2,
      category: 'Science',
      title: 'Chemistry Fundamentals',
      description: 'Learn the building blocks of chemistry and chemical reactions.',
      image: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=400&h=250&fit=crop',
      tag: 'Diploma'
    },
    {
      id: 3,
      category: 'Language',
      title: 'English Literature',
      description: 'Explore classic and contemporary literature with expert tutors.',
      image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400&h=250&fit=crop',
      tag: 'Diploma'
    },
  ];

  // Close dropdown when clicking outside
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

  return (
    <div className="min-h-screen flex bg-orange-50/[0.20]">
      {/* Sidebar - Desktop */}
      <aside 
        className={`hidden lg:flex lg:flex-col bg-white border-r border-gray-200 transition-all duration-300 ${
          isSidebarCollapsed ? 'w-20' : 'w-72'
        }`}
      >
        {/* Logo & Toggle Button */}
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

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 py-2 mt-4">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSidebarItem === item.name;
              
              return (
                <li key={item.name}>
                  {item.hasDropdown ? (
                    <div>
                      <button
                        onClick={() => {
                          setLearningDropdownOpen(!learningDropdownOpen);
                        }}
                        className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'} gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                          isActive 
                            ? 'bg-orange-50 shadow-sm' 
                            : 'hover:bg-gray-50'
                        }`}
                        title={isSidebarCollapsed ? item.name : ''}
                      >
                        <div className={`flex items-center gap-3 ${isSidebarCollapsed ? 'justify-center' : ''}`}>
                          <Icon 
                            className="w-5 h-5 flex-shrink-0" 
                            variant={isActive ? 'Bold' : 'Linear'}
                            color={isActive ? '#FF6636' : 'rgb(100, 116, 139)'}
                          />
                          {!isSidebarCollapsed && (
                            <span className={`text-sm font-medium ${
                              isActive ? 'text-[#FF6636]' : 'text-gray-600'
                            }`}>
                              {item.name}
                            </span>
                          )}
                        </div>
                        {!isSidebarCollapsed && (
                          <ArrowDown2 
                            className={`w-4 h-4 transition-transform ${learningDropdownOpen ? 'rotate-180' : ''}`}
                            color={isActive ? '#FF6636' : 'rgb(100, 116, 139)'}
                          />
                        )}
                      </button>
                      
                      {/* Dropdown Items */}
                      {!isSidebarCollapsed && learningDropdownOpen && item.dropdownItems && (
                        <ul className="ml-4 mt-1 space-y-1">
                          {item.dropdownItems.map((dropdownItem) => (
                            <li key={dropdownItem}>
                              <button
                                onClick={() => setActivePage(dropdownItem)}
                                className={`w-full text-left px-4 py-2 text-sm rounded-lg transition-colors ${
                                  activePage === dropdownItem
                                    ? 'bg-gradient-to-r from-[#FF6636]/20 to-[#ff8659]/20 text-[#FF6636] font-semibold'
                                    : 'text-gray-600 hover:text-[#FF6636] hover:bg-orange-50'
                                }`}
                              >
                                {dropdownItem}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setActivePage(item.name);
                        setActiveSidebarItem(item.name);
                      }}
                      className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : ''} gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        isActive 
                          ? 'bg-orange-50 shadow-sm' 
                          : 'hover:bg-gray-50'
                      }`}
                      title={isSidebarCollapsed ? item.name : ''}
                    >
                      <Icon 
                        className="w-5 h-5 flex-shrink-0" 
                        variant={isActive ? 'Bold' : 'Linear'}
                        color={isActive ? '#FF6636' : 'rgb(100, 116, 139)'}
                      />
                      {!isSidebarCollapsed && (
                        <span className={`text-sm font-medium ${
                          isActive ? 'text-[#FF6636]' : 'text-gray-600'
                        }`}>
                          {item.name}
                        </span>
                      )}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Section - Copyright */}
        <div className="p-4 border-t border-gray-200">
          <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-start'} gap-2 px-2 py-2 text-gray-500`}>
            <Copyright className="w-4 h-4" variant="Linear" />
            {!isSidebarCollapsed && (
              <span className="text-xs">2026</span>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40 bg-black/40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Mobile */}
      <aside 
        className={`lg:hidden fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 flex flex-col ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ borderRight: '1px solid rgb(229, 231, 235)' }}
      >
        {/* Logo & Close Button */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <Logo />
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-1"
          >
            <CloseCircle className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 py-2">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSidebarItem === item.name;
              
              return (
                <li key={item.name}>
                  {item.hasDropdown ? (
                    <div>
                      <button
                        onClick={() => {
                          setActiveSidebarItem(item.name);
                          setLearningDropdownOpen(!learningDropdownOpen);
                        }}
                        className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                          isActive 
                            ? 'bg-orange-50 shadow-sm' 
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon 
                            className="w-5 h-5" 
                            variant={isActive ? 'Bold' : 'Linear'}
                            color={isActive ? '#FF6636' : 'rgb(100, 116, 139)'}
                          />
                          <span className={`text-sm font-medium ${
                            isActive ? 'text-[#FF6636]' : 'text-gray-600'
                          }`}>
                            {item.name}
                          </span>
                        </div>
                        <ArrowDown2 
                          className={`w-4 h-4 transition-transform ${learningDropdownOpen ? 'rotate-180' : ''}`}
                          color={isActive ? '#FF6636' : 'rgb(100, 116, 139)'}
                        />
                      </button>
                      
                      {learningDropdownOpen && item.dropdownItems && (
                        <ul className="ml-4 mt-1 space-y-1">
                          {item.dropdownItems.map((dropdownItem) => (
                            <li key={dropdownItem}>
                              <button
                                onClick={() => {
                                  setActivePage(dropdownItem);
                                  setIsSidebarOpen(false);
                                }}
                                className={`w-full text-left px-4 py-2 text-sm rounded-lg transition-colors ${
                                  activePage === dropdownItem
                                    ? 'bg-gradient-to-r from-[#FF6636]/20 to-[#ff8659]/20 text-[#FF6636] font-semibold'
                                    : 'text-gray-600 hover:text-[#FF6636] hover:bg-orange-50'
                                }`}
                              >
                                {dropdownItem}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setActivePage(item.name);
                        setActiveSidebarItem(item.name);
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
                      <span className={`text-sm font-medium ${
                        isActive ? 'text-[#FF6636]' : 'text-gray-600'
                      }`}>
                        {item.name}
                      </span>
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => onLogout && onLogout()}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 rounded-lg transition-colors text-red-500"
          >
            <LogoutCurve className="w-5 h-5" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Top Header - MOBILE */}
        <header className="lg:hidden bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="px-4 py-3.5">
            <div className="flex items-center justify-between">
              {/* Left: Hamburger/Close Menu */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-1 -ml-1"
              >
                {isMobileMenuOpen ? (
                  <CloseCircle className="w-7 h-7 text-gray-700" variant="Bold" />
                ) : (
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="6" y1="11" x2="22" y2="11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                    <line x1="6" y1="17" x2="22" y2="17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                )}
              </button>

              {/* Center-Left: Logo */}
              <div className="flex-1 ml-3">
                <Logo />
              </div>

              {/* Right: Notification & Profile */}
              <div className="flex items-center gap-3">
                {/* Notification Icon */}
                <div ref={notificationDropdownRef} className="relative">
                  <button 
                    onClick={() => setIsNotificationDropdownOpen(!isNotificationDropdownOpen)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
                  >
                    <Notification className="w-5 h-5 text-gray-600" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>

                  {/* Notification Dropdown */}
                  {isNotificationDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-xl shadow-lg border border-gray-200 py-3 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <h3 className="text-sm font-semibold text-gray-900">Recent Activity</h3>
                      </div>
                      <div className="max-h-[400px] overflow-y-auto">
                        <div className="px-2 py-2 space-y-1">
                          {recentActivity.map((activity) => {
                            const IconComponent = activity.icon;
                            return (
                              <div 
                                key={activity.id} 
                                className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                              >
                                <div 
                                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                                  style={{ backgroundColor: `${activity.color}15` }}
                                >
                                  <IconComponent size={20} variant="Bold" style={{ color: activity.color }} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-sm text-gray-900 mb-0.5">{activity.title}</p>
                                  <p className="text-xs text-[#6e7485] truncate mb-1">{activity.description}</p>
                                  <p className="text-xs text-[#8c94a3]">{activity.time}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="px-4 py-2 border-t border-gray-100 mt-1">
                        <button className="w-full py-2 text-sm font-medium text-[#FF6636] hover:text-[#E55A2B] transition-colors text-center">
                          View All Activity
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* User Profile with Dropdown */}
                <div ref={profileDropdownRef} className="relative">
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center gap-1.5"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#FF6636] flex items-center justify-center">
                      <span className="text-sm font-semibold text-white">
                        {userInitials}
                      </span>
                    </div>
                    <ArrowDown2 
                      className={`w-4 h-4 text-gray-600 transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {/* Profile Dropdown Menu */}
                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900">{userName}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Student</p>
                      </div>
                      <button 
                        onMouseDown={(e) => {
                          e.preventDefault();
                          setActivePage('Settings');
                          setActiveSidebarItem('Settings');
                          setIsProfileDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                      >
                        <Setting2 className="w-4 h-4" variant="Linear" />
                        Settings
                      </button>
                      <div className="border-t border-gray-100 mt-1 pt-1">
                        <button 
                          onMouseDown={(e) => {
                            e.preventDefault();
                            setIsProfileDropdownOpen(false);
                            onLogout && onLogout();
                          }}
                          className="w-full px-4 py-2.5 text-left text-sm text-red-500 hover:bg-red-50 flex items-center gap-3"
                        >
                          <LogoutCurve className="w-4 h-4" variant="Linear" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          {isMobileMenuOpen && (
            <div className="bg-white border-t border-gray-100 shadow-lg animate-slideDown">
              <nav className="px-4 py-4 space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSidebarItem === item.name;
                  
                  return (
                    <div key={item.name}>
                      {item.hasDropdown ? (
                        <div>
                          <button
                            onClick={() => {
                              setActiveSidebarItem(item.name);
                              setLearningDropdownOpen(!learningDropdownOpen);
                            }}
                            className={`w-full text-left px-4 py-3 rounded-lg font-medium text-[15px] flex items-center justify-between transition-all ${
                              isActive
                                ? 'bg-[#FF6636] text-white shadow-sm'
                                : 'text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <Icon 
                                className="w-5 h-5" 
                                variant={isActive ? 'Bold' : 'Linear'}
                                color={isActive ? '#FFFFFF' : undefined}
                              />
                              {item.name}
                            </div>
                            <ArrowDown2 
                              className={`w-4 h-4 transition-transform ${learningDropdownOpen ? 'rotate-180' : ''}`}
                              variant="Linear"
                              color={isActive ? '#FFFFFF' : undefined}
                            />
                          </button>

                          {/* Dropdown items */}
                          {learningDropdownOpen && item.dropdownItems && (
                            <div className="ml-9 mt-1 space-y-0.5">
                              {item.dropdownItems.map((dropdownItem) => (
                                <button
                                  key={dropdownItem}
                                  onClick={() => {
                                    setActivePage(dropdownItem);
                                    setIsMobileMenuOpen(false);
                                  }}
                                  className={`w-full text-left px-4 py-2 text-sm rounded-lg transition-colors ${
                                    activePage === dropdownItem
                                      ? 'bg-gradient-to-r from-[#FF6636]/20 to-[#ff8659]/20 text-[#FF6636] font-semibold'
                                      : 'text-gray-600 hover:text-[#FF6636] hover:bg-orange-50'
                                  }`}
                                >
                                  {dropdownItem}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setActivePage(item.name);
                            setActiveSidebarItem(item.name);
                            setIsMobileMenuOpen(false);
                          }}
                          className={`w-full text-left px-4 py-3 rounded-lg font-medium text-[15px] flex items-center gap-3 transition-all ${
                            isActive
                              ? 'bg-[#FF6636] text-white shadow-sm'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <Icon 
                            className="w-5 h-5" 
                            variant={isActive ? 'Bold' : 'Linear'}
                            color={isActive ? '#FFFFFF' : undefined}
                          />
                          {item.name}
                        </button>
                      )}
                    </div>
                  );
                })}
              </nav>
            </div>
          )}
        </header>

        {/* Top Header - DESKTOP */}
        <header className="hidden lg:block bg-white border-b border-gray-200">
          {/* Top Navigation Tabs */}
          <div className="px-4 lg:px-8 pt-4">
            <div className="flex items-center justify-between">
              {/* Left: Tabs */}
              <div className="flex items-center gap-4 flex-1 overflow-x-auto">
                {/* Tabs */}
                <nav className="flex gap-6 overflow-x-auto hide-scrollbar">
                  {topTabs.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => {
                        setActiveTopTab(tab.key);
                        setActivePage(tab.key);
                      }}
                      className={`pb-4 px-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                        activeTopTab === tab.key
                          ? 'text-[#FF6636] border-[#FF6636]'
                          : 'text-gray-500 border-transparent hover:text-gray-700'
                      }`}
                    >
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Right: User Profile & Actions */}
              <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                {/* Message Icon */}
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                  <Message className="w-5 h-5 text-gray-600" />
                </button>

                {/* Notification Icon */}
                <div ref={notificationDropdownRef} className="relative">
                  <button 
                    onClick={() => setIsNotificationDropdownOpen(!isNotificationDropdownOpen)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
                  >
                    <Notification className="w-5 h-5 text-gray-600" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>

                  {/* Notification Dropdown */}
                  {isNotificationDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-xl shadow-lg border border-gray-200 py-3 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <h3 className="text-sm font-semibold text-gray-900">Recent Activity</h3>
                      </div>
                      <div className="max-h-[400px] overflow-y-auto">
                        <div className="px-2 py-2 space-y-1">
                          {recentActivity.map((activity) => {
                            const IconComponent = activity.icon;
                            return (
                              <div 
                                key={activity.id} 
                                className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                              >
                                <div 
                                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                                  style={{ backgroundColor: `${activity.color}15` }}
                                >
                                  <IconComponent size={20} variant="Bold" style={{ color: activity.color }} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-sm text-gray-900 mb-0.5">{activity.title}</p>
                                  <p className="text-xs text-[#6e7485] truncate mb-1">{activity.description}</p>
                                  <p className="text-xs text-[#8c94a3]">{activity.time}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="px-4 py-2 border-t border-gray-100 mt-1">
                        <button className="w-full py-2 text-sm font-medium text-[#FF6636] hover:text-[#E55A2B] transition-colors text-center">
                          View All Activity
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* User Profile */}
                <div ref={profileDropdownRef} className="relative">
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center gap-2 hover:bg-gray-50 px-2 py-1.5 rounded-lg transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#FF6636] flex items-center justify-center">
                      <span className="text-xs font-semibold text-white">
                        {userInitials}
                      </span>
                    </div>
                    <span className="hidden sm:block text-sm font-medium text-gray-700 max-w-[100px] truncate">
                      {userName.split(' ')[0]}
                    </span>
                    <ArrowDown2 
                      className={`hidden sm:block w-4 h-4 text-gray-500 transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{userName}</p>
                        <p className="text-xs text-gray-500">Student</p>
                      </div>
                      <button 
                        onMouseDown={(e) => {
                          e.preventDefault();
                          setActivePage('Settings');
                          setActiveSidebarItem('Settings');
                          setIsProfileDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                      >
                        <Setting2 className="w-4 h-4" />
                        Settings
                      </button>
                      <button 
                        onMouseDown={(e) => {
                          e.preventDefault();
                          setIsProfileDropdownOpen(false);
                          onLogout && onLogout();
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-red-50 flex items-center gap-2"
                      >
                        <LogoutCurve className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Dashboard Page - Empty for now */}
            {activePage === 'Dashboard' && (
              <DashboardHome 
                userName={userName}
                upcomingLessons={bookingHistory.slice(0, 3)}
                onNavigateToExplore={() => {
                  setActivePage('Explore');
                  setActiveTopTab('Explore');
                  setActiveSidebarItem('Explore');
                }}
              />
            )}

            {/* Explore Page */}
            {activePage === 'Explore' && !showTutorsListPage && !showRequestForm && (
              <ExplorePage 
                searchQuery={searchQuery} 
                setSearchQuery={setSearchQuery}
                onCategoryClick={(category) => {
                  setSelectedSubject(category);
                  
                  // Check if subject has no tutors
                  if (subjectsWithNoTutors.includes(category)) {
                    setShowRequestForm(true);
                  } else {
                    setShowTutorsListPage(true);
                  }
                }}
              />
            )}

            {/* Tutors List Page */}
            {showTutorsListPage && !showRequestForm && !showTutorProfile && !showBookingPage && !showPaymentPage && (
              <TutorsListPage
                subject={selectedSubject}
                onBack={() => setShowTutorsListPage(false)}
                onViewProfile={(tutor) => {
                  setSelectedTutor(tutor);
                  setShowTutorProfile(true);
                }}
                onBookNow={(tutor) => {
                  setSelectedTutor(tutor);
                  setShowBookingPage(true);
                }}
              />
            )}

            {/* Request Tutor Form */}
            {showRequestForm && (
              <RequestTutorForm
                subject={selectedSubject}
                onBack={() => {
                  setShowRequestForm(false);
                  setShowTutorsListPage(false);
                }}
                onRequestSubmit={(requestData) => {
                  // Add to request history
                  const newRequest = {
                    id: Date.now(),
                    requestDate: new Date().toISOString(),
                    status: 'Pending',
                    type: 'request',
                    ...requestData
                  };
                  setRequestHistory([newRequest, ...requestHistory]);
                  
                  // Create a helpdesk ticket for this request
                  const newTicket = {
                    id: `TKT-${Date.now()}`,
                    ticketNumber: `TKT-${Date.now()}`,
                    subject: `Tutor Request: ${requestData.subject}`,
                    category: 'Tutor Request',
                    description: requestData.description,
                    level: requestData.level,
                    language: requestData.preferredLanguage,
                    lessonMode: requestData.lessonMode,
                    availability: requestData.availability,
                    status: 'Pending',
                    priority: 'High',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    responses: []
                  };
                  setHelpdeskTickets([newTicket, ...helpdeskTickets]);
                  
                  // Navigate to My Lessons after success toast
                  setTimeout(() => {
                    setActivePage('My Lessons');
                    setActiveSidebarItem('My Lessons');
                  }, 1500);
                }}
              />
            )}

            {/* Tutor Profile Page */}
            {showTutorProfile && selectedTutor && (
              <TutorProfilePage
                tutor={selectedTutor}
                onBack={() => setShowTutorProfile(false)}
                onBookNow={() => {
                  setShowTutorProfile(false);
                  setShowBookingPage(true);
                }}
              />
            )}

            {/* Booking Page */}
            {showBookingPage && selectedTutor && (
              <BookingPage
                tutor={selectedTutor}
                onBack={() => {
                  setShowBookingPage(false);
                  setShowTutorProfile(true);
                }}
                onProceedToPayment={(data) => {
                  setBookingData(data);
                  setShowBookingPage(false);
                  setShowPaymentPage(true);
                }}
              />
            )}

            {/* Payment Page */}
            {showPaymentPage && bookingData && (
              <PaymentPage
                bookingData={bookingData}
                onBack={() => {
                  setShowPaymentPage(false);
                  setShowBookingPage(true);
                }}
                onPaymentSuccess={() => {
                  // Add to booking history
                  const newBooking = {
                    id: Date.now(),
                    bookingDate: new Date().toISOString(),
                    ...bookingData
                  };
                  setBookingHistory([newBooking, ...bookingHistory]);
                  
                  // Show success toast (only one toast now)
                  toast.success('Booking Confirmed!', {
                    description: `Your lesson with ${bookingData.tutor.name} has been booked successfully!`,
                    duration: 5000,
                  });
                  
                  // Clean up and redirect to My Lessons
                  setShowPaymentPage(false);
                  setSelectedTutor(null);
                  setBookingData(null);
                  setShowTutorsListPage(false);
                  setActivePage('My Lessons');
                  setActiveSidebarItem('My Lessons');
                }}
              />
            )}

            {/* My Lessons Page */}
            {activePage === 'My Lessons' && (
              <MyLessonsPage
                bookingHistory={bookingHistory}
                requestHistory={requestHistory}
                onExploreClick={() => {
                  setActivePage('Explore');
                  setActiveTopTab('Explore');
                  setActiveSidebarItem('Explore');
                }}
              />
            )}

            {/* Tutors Page */}
            {activePage === 'Tutors' && !showTutorProfile && !showBookingPage && !showPaymentPage && (
              <TutorsPage
                onViewProfile={(tutor) => {
                  setSelectedTutor(tutor);
                  setShowTutorProfile(true);
                }}
                onBookNow={(tutor) => {
                  setSelectedTutor(tutor);
                  setShowBookingPage(true);
                }}
                onExploreClick={() => {
                  setActivePage('Explore');
                  setActiveTopTab('Explore');
                  setActiveSidebarItem('Explore');
                }}
              />
            )}

            {/* My Payments Page */}
            {activePage === 'My Payments' && (
              <SubscriptionsPage bookingHistory={bookingHistory} />
            )}

            {/* Assignments Page */}
            {activePage === 'Assignments' && (
              <AssignmentsPage
                bookingHistory={bookingHistory}
                onExploreClick={() => {
                  setActivePage('Explore');
                  setActiveTopTab('Explore');
                  setActiveSidebarItem('Explore');
                }}
              />
            )}

            {/* E-library Page */}
            {activePage === 'E-library' && (
              <ELibraryPage
                onExploreClick={() => {
                  setActivePage('Explore');
                  setActiveTopTab('Explore');
                  setActiveSidebarItem('Explore');
                }}
              />
            )}

            {/* Flashcards Page */}
            {activePage === 'Flashcards' && (
              <FlashcardsPage 
                bookingHistory={bookingHistory}
              />
            )}

            {/* Settings Page */}
            {activePage === 'Settings' && (
              <SettingsPage />
            )}

            {/* Helpdesk Page */}
            {activePage === 'Helpdesk' && (
              <HelpdeskPage 
                tickets={helpdeskTickets}
                setTickets={setHelpdeskTickets}
              />
            )}

            {/* Other Pages - Placeholder */}
            {!['Dashboard', 'Explore', 'Tutors', 'My Lessons', 'My Payments', 'Assignments', 'E-library', 'Flashcards', 'Settings', 'Helpdesk'].includes(activePage) && !showTutorsListPage && !showRequestForm && !showTutorProfile && !showBookingPage && !showPaymentPage && (
              <div className="text-center py-12">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {activePage}
                </h1>
                <p className="text-gray-500">
                  {activePage} content coming soon...
                </p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modals */}
      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}