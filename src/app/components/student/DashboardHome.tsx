import React from 'react';
import { 
  Book1, 
  CardEdit, 
  Calendar, 
  Clock, 
  Award, 
  Chart, 
  Teacher,
  Video,
  DocumentText,
  ArrowRight2,
  Star1,
  Refresh,
  Eye,
  Edit2,
  TickCircle,
  CloseCircle,
  TrendUp,
  Activity,
  Crown,
  CardPos
} from 'iconsax-react';
import { WelcomeBanner } from '../../imports/Frame16';
import { allFlashcards } from '../../config/flashcardConfig';

interface DashboardHomeProps {
  userName?: string;
  upcomingLessons?: any[];
  onNavigateToExplore?: () => void;
}

export function DashboardHome({ userName = 'Student', upcomingLessons = [], onNavigateToExplore }: DashboardHomeProps) {
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = React.useState(0);
  const [isFlipped, setIsFlipped] = React.useState(false);
  const [studyStreak, setStudyStreak] = React.useState(7);

  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Get current date
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long',
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });

  // Use shared flashcards from config - show first 3
  const flashcards = allFlashcards.slice(0, 3);

  // Recent activity
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
      description: 'Chemistry with Basida Cynthia',
      time: '1 day ago',
      icon: Calendar,
      color: '#2196F3'
    }
  ];

  const currentFlashcard = flashcards[currentFlashcardIndex];

  const handleNextCard = () => {
    setIsFlipped(false);
    setCurrentFlashcardIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCurrentFlashcardIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="pb-8">
      {/* Simple Text Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          {getGreeting()}, {userName}!
        </h1>
        <p className="text-sm sm:text-base text-[#6e7485]">{currentDate}</p>
      </div>

      {/* Stats Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {/* Scheduled Lessons */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 border border-orange-200/50 rounded-xl p-4 sm:p-5 hover:shadow-md hover:border-[#FF6636]/50 transition-all relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-[#FF6636]/20 translate-x-8 -translate-y-8"></div>
          <div className="relative z-10">
            <p className="text-xs sm:text-sm text-orange-700 mb-2 font-medium">Scheduled Lessons</p>
            <p className="text-3xl sm:text-4xl font-bold text-orange-900">12</p>
          </div>
        </div>

        {/* New Assignment */}
        <div className="bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200/50 rounded-xl p-4 sm:p-5 hover:shadow-md hover:border-green-500/50 transition-all relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-[#4CAF50]/20 translate-x-8 -translate-y-8"></div>
          <div className="relative z-10">
            <p className="text-xs sm:text-sm text-green-700 mb-2 font-medium">New Assignment</p>
            <p className="text-3xl sm:text-4xl font-bold text-green-900">5</p>
          </div>
        </div>

        {/* Weekly Goal */}
        <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/50 rounded-xl p-4 sm:p-5 hover:shadow-md hover:border-amber-500/50 transition-all relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-[#FFC107]/20 translate-x-8 -translate-y-8"></div>
          <div className="relative z-10">
            <p className="text-xs sm:text-sm text-amber-700 mb-2 font-medium">Weekly Goal</p>
            <p className="text-3xl sm:text-4xl font-bold text-amber-900">8/10</p>
          </div>
        </div>

        {/* Overall Progress */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200/50 rounded-xl p-4 sm:p-5 hover:shadow-md hover:border-blue-500/50 transition-all relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-[#2196F3]/20 translate-x-8 -translate-y-8"></div>
          <div className="relative z-10">
            <p className="text-xs sm:text-sm text-blue-700 mb-2 font-medium">Overall Progress</p>
            <p className="text-3xl sm:text-4xl font-bold text-blue-900">87%</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="space-y-6 mb-6">
        {/* Study Flashcards and Upcoming Lessons Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Study Flashcards */}
          <div className="bg-white border border-[#e9eaf0] rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#fff9f5] flex items-center justify-center">
                  <CardEdit size={20} variant="Bold" className="text-[#FF6636]" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Study Flashcards</h2>
                  <p className="text-xs text-[#6e7485]">Review your materials</p>
                </div>
              </div>
              <span className="text-xs font-medium text-[#6e7485] bg-gray-100 px-3 py-1 rounded-full">
                {currentFlashcardIndex + 1} / {flashcards.length}
              </span>
            </div>

            {/* Flashcard */}
            <div 
              className="relative w-full aspect-[16/9] mb-4 cursor-pointer perspective-1000"
              onClick={handleFlip}
            >
              <div 
                className={`w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Front of card */}
                <div 
                  className="absolute w-full h-full backface-hidden rounded-2xl shadow-xl overflow-hidden"
                  style={{ 
                    backfaceVisibility: 'hidden',
                    backgroundImage: currentFlashcard.gradient,
                    transform: 'rotateY(0deg)'
                  }}
                >
                  {/* Decorative Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-white -translate-x-16 -translate-y-16"></div>
                    <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-white translate-x-20 translate-y-20"></div>
                    <div className="absolute top-1/2 right-10 w-24 h-24 rounded-full bg-white/50"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10 h-full p-6 sm:p-8 flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-auto">
                      <div className="flex items-center gap-2">
                        <span className="text-3xl sm:text-4xl">{currentFlashcard.emoji}</span>
                        <span className="text-xs sm:text-sm font-bold text-white/90 uppercase tracking-wider">
                          {currentFlashcard.subject}
                        </span>
                      </div>
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <span className="text-xs sm:text-sm font-bold text-white">Q</span>
                      </div>
                    </div>
                    
                    {/* Question */}
                    <div className="flex-1 flex items-center justify-center text-center px-2 sm:px-4">
                      <p className="text-lg sm:text-xl lg:text-2xl font-bold text-white leading-relaxed drop-shadow-md">
                        {currentFlashcard.question}
                      </p>
                    </div>
                    
                    {/* Footer */}
                    <div className="flex items-center justify-center gap-2 mt-auto pt-4">
                      <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse"></div>
                      <p className="text-xs sm:text-sm text-white/80 font-medium">Tap to reveal answer</p>
                      <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse"></div>
                    </div>
                  </div>
                </div>

                {/* Back of card */}
                <div 
                  className="absolute w-full h-full backface-hidden rounded-2xl shadow-xl bg-white overflow-hidden"
                  style={{ 
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  {/* Decorative Border */}
                  <div 
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      backgroundImage: currentFlashcard.gradient,
                      padding: '4px'
                    }}
                  >
                    <div className="w-full h-full bg-white rounded-2xl"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10 h-full p-6 sm:p-8 flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center"
                          style={{ backgroundImage: currentFlashcard.gradient }}
                        >
                          <span className="text-xl">{currentFlashcard.emoji}</span>
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider" style={{ 
                            backgroundImage: currentFlashcard.gradient,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                          }}>
                            Answer
                          </p>
                          <p className="text-xs text-gray-500">{currentFlashcard.subject}</p>
                        </div>
                      </div>
                      <div 
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white"
                        style={{ background: currentFlashcard.gradient }}
                      >
                        <span className="text-xs sm:text-sm font-bold">A</span>
                      </div>
                    </div>
                    
                    {/* Answer */}
                    <div className="flex-1 flex items-center justify-center text-center">
                      <p className="text-base sm:text-lg text-gray-800 leading-relaxed font-medium">
                        {currentFlashcard.answer}
                      </p>
                    </div>
                    
                    {/* Decorative Dots */}
                    <div className="flex justify-center gap-1.5 mt-auto">
                      {flashcards.map((_, index) => (
                        <div 
                          key={index}
                          className="w-2 h-2 rounded-full transition-all"
                          style={{
                            background: index === currentFlashcardIndex ? currentFlashcard.gradient : '#e5e7eb'
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Flashcard Controls */}
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={(e) => { e.stopPropagation(); handlePrevCard(); }}
                className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-sm text-gray-700 transition-colors"
              >
                <ArrowRight2 size={18} className="rotate-180" />
                Previous
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); handleFlip(); }}
                  className="p-2.5 bg-[#fff9f5] hover:bg-[#ffe6dc] rounded-lg transition-colors"
                  title="Flip card"
                >
                  <Refresh size={20} className="text-[#FF6636]" />
                </button>
                <button
                  className="p-2.5 bg-[#fff9f5] hover:bg-[#ffe6dc] rounded-lg transition-colors"
                  title="View all cards"
                >
                  <Eye size={20} className="text-[#FF6636]" />
                </button>
                <button
                  className="p-2.5 bg-[#fff9f5] hover:bg-[#ffe6dc] rounded-lg transition-colors"
                  title="Edit card"
                >
                  <Edit2 size={20} className="text-[#FF6636]" />
                </button>
              </div>

              <button
                onClick={(e) => { e.stopPropagation(); handleNextCard(); }}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#FF6636] hover:bg-[#E55A2B] text-white rounded-lg font-medium text-sm transition-colors"
              >
                Next
                <ArrowRight2 size={18} />
              </button>
            </div>
          </div>

          {/* Upcoming Lessons */}
          <div className="bg-white border border-[#e9eaf0] rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#fff9f5] flex items-center justify-center">
                  <Calendar size={20} variant="Bold" className="text-[#FF6636]" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Upcoming Lessons</h2>
                  <p className="text-xs text-[#6e7485]">Your scheduled sessions</p>
                </div>
              </div>
              {upcomingLessons.length > 0 && (
                <button className="text-sm font-medium text-[#FF6636] hover:text-[#E55A2B]">
                  View All
                </button>
              )}
            </div>

            {upcomingLessons.length === 0 ? (
              <div className="text-center py-12">
                <Calendar size={48} variant="Bulk" className="text-gray-300 mx-auto mb-4" />
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  No Upcoming Lessons
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  You haven't booked any lessons yet.
                </p>
                <button 
                  onClick={onNavigateToExplore}
                  className="px-5 py-2.5 bg-[#FF6636] text-white rounded-lg text-sm font-semibold hover:bg-[#E55A2B] transition-colors"
                >
                  Book a Lesson
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingLessons.map((lesson) => (
                  <div 
                    key={lesson.id}
                    className="flex items-center gap-4 p-4 border border-[#e9eaf0] rounded-lg hover:border-[#FF6636] hover:bg-[#fff9f5] transition-all cursor-pointer group"
                  >
                    {/* Avatar */}
                    <div className="text-3xl flex-shrink-0">
                      {lesson.avatar || '👨‍🏫'}
                    </div>

                    {/* Lesson Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-sm text-gray-900 truncate">{lesson.subject || lesson.tutor?.subject}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          lesson.type === 'Online' || lesson.lessonMode === 'Online'
                            ? 'bg-blue-50 text-blue-600' 
                            : 'bg-green-50 text-green-600'
                        }`}>
                          {lesson.type || lesson.lessonMode}
                        </span>
                      </div>
                      <p className="text-xs text-[#6e7485] truncate mb-1">{typeof lesson.tutor === 'string' ? lesson.tutor : lesson.tutor?.name}</p>
                      <div className="flex items-center gap-3 text-xs text-[#8c94a3]">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {lesson.date || lesson.selectedDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {lesson.time || lesson.selectedTime}
                        </span>
                        <span>{lesson.duration || `${lesson.selectedDuration || '60'} min`}</span>
                      </div>
                    </div>

                    {/* Join Button */}
                    {lesson.date === 'Today' && (
                      <button className="px-4 py-2 bg-[#FF6636] text-white rounded-lg text-xs font-semibold hover:bg-[#E55A2B] transition-colors opacity-0 group-hover:opacity-100">
                        Join Now
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}