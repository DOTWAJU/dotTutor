import React from 'react';
import { DocumentText, Clock, Video, Calendar } from 'iconsax-react';
import { LiveClassPage } from './LiveClassPage';
import { LessonDetailsModal } from './LessonDetailsModal';

interface MyLessonsPageProps {
  bookingHistory: any[];
  requestHistory: any[];
  onExploreClick: () => void;
}

// Countdown Timer Component
function CountdownTimer({ targetDate, isLive }: { targetDate: Date; isLive: boolean }) {
  const [timeLeft, setTimeLeft] = React.useState('');

  React.useEffect(() => {
    if (isLive) {
      setTimeLeft('Lesson is Live!');
      return;
    }

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft('Starting soon');
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      } else if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m`);
      } else {
        setTimeLeft(`${minutes} minutes`);
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [targetDate, isLive]);

  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
      isLive 
        ? 'bg-[#23BD33]/10 border border-[#23BD33]' 
        : 'bg-[#564FFD]/10 border border-[#564FFD]'
    }`}>
      <Clock 
        size={18} 
        variant="Bold" 
        className={isLive ? 'text-[#23BD33] animate-pulse' : 'text-[#564FFD]'} 
      />
      <div>
        <p className="text-xs text-[#6e7485]">{isLive ? 'Status' : 'Starts in'}</p>
        <p className={`text-sm font-bold ${isLive ? 'text-[#23BD33]' : 'text-[#564FFD]'}`}>
          {timeLeft}
        </p>
      </div>
    </div>
  );
}

export function MyLessonsPage({ bookingHistory, requestHistory, onExploreClick }: MyLessonsPageProps) {
  const [activeTab, setActiveTab] = React.useState<'upcoming' | 'history'>('upcoming');
  const [activeLiveLesson, setActiveLiveLesson] = React.useState<any>(null);
  const [selectedLesson, setSelectedLesson] = React.useState<any>(null);

  // Clean up old demo data from localStorage on mount
  React.useEffect(() => {
    try {
      const savedBookings = localStorage.getItem('dottutor_bookings');
      if (savedBookings) {
        const bookings = JSON.parse(savedBookings);
        // Remove Aroopo Johnson and other old demo bookings
        const cleanedBookings = bookings.filter((b: any) => 
          b.tutor?.name !== 'Aroopo Johnson' && !b.isDemo
        );
        if (cleanedBookings.length !== bookings.length) {
          localStorage.setItem('dottutor_bookings', JSON.stringify(cleanedBookings));
          console.log('Cleaned up old demo bookings');
        }
      }
    } catch (e) {
      console.error('Error cleaning localStorage:', e);
    }
  }, []);

  // Add demo LIVE lesson
  const demoLiveLesson = React.useMemo(() => {
    const now = new Date();
    
    // Create lesson dates
    const yesterday = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000);
    yesterday.setHours(10, 0, 0, 0);
    
    const todayLive = new Date(now);
    todayLive.setHours(now.getHours(), now.getMinutes() - 2, 0, 0); // Started 2 minutes ago
    
    const upcoming1 = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);
    upcoming1.setHours(14, 0, 0, 0);
    
    const upcoming2 = new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000);
    upcoming2.setHours(16, 0, 0, 0);
    
    const lessonDates = [yesterday, todayLive, upcoming1, upcoming2];
    
    const dateTimeSlots: any = {};
    lessonDates.forEach((date) => {
      const dateKey = date.toISOString().split('T')[0];
      const hour = date.getHours();
      const period = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
      dateTimeSlots[dateKey] = [`${displayHour}-${displayHour + 1} ${period}`];
    });
    
    const completedDates = [yesterday.toISOString().split('T')[0]];
    
    return {
      id: 'demo-live-lesson',
      tutor: {
        name: 'Jane Cooper',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
        subject: 'Chemistry',
        lessonMode: 'Online'
      },
      lessonTopic: 'Organic Chemistry - Carbon Compounds & Reactions',
      language: 'English',
      duration: 4,
      selectedDates: lessonDates,
      dateTimeSlots: dateTimeSlots,
      bookingDate: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      totalCost: 20000,
      type: 'booking',
      completedDates: completedDates,
      completedCount: 1,
      isUpcoming: true,
      isDemoLive: true,
      nextLessonDate: todayLive, // This is the current live lesson
      isLiveNow: true // Flag to indicate this lesson is live
    };
  }, []);

  // Combine demo lesson with actual bookings
  const allBookings = React.useMemo(() => {
    // Filter out any old demo bookings (like Aroopo Johnson)
    // Only keep real user bookings (those without demo flags)
    const realBookings = bookingHistory.filter(b => 
      !b.isDemo && // Filter out any old demo data
      b.tutor?.name !== 'Aroopo Johnson' // Specifically exclude Aroopo
    ).map(b => {
      // Find next upcoming lesson
      let nextLessonDate: Date | null = null;
      const completedDates = b.completedDates || [];
      
      if (b.selectedDates && b.selectedDates.length > 0) {
        const sortedDates = [...b.selectedDates].sort((a: Date, b: Date) => 
          new Date(a).getTime() - new Date(b).getTime()
        );
        
        for (const date of sortedDates) {
          const dateKey = new Date(date).toISOString().split('T')[0];
          
          if (!completedDates.includes(dateKey)) {
            nextLessonDate = new Date(date);
            break;
          }
        }
      }

      return {
        ...b,
        type: 'booking',
        nextLessonDate: nextLessonDate,
        isUpcoming: nextLessonDate !== null,
        isLiveNow: false
      };
    });

    return [demoLiveLesson, ...realBookings];
  }, [bookingHistory, demoLiveLesson]);

  const upcomingLessons = allBookings.filter(b => b.isUpcoming);
  const pastLessons = allBookings.filter(b => !b.isUpcoming);

  // If viewing a live lesson
  if (activeLiveLesson) {
    return (
      <LiveClassPage
        lesson={activeLiveLesson}
        onBack={() => setActiveLiveLesson(null)}
        onEndClass={() => setActiveLiveLesson(null)}
      />
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
          My Lessons
        </h1>
        <p className="text-sm text-[#6e7485]">
          Manage your upcoming classes and view lesson history
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`pb-3 px-1 text-sm font-semibold transition-colors relative ${
              activeTab === 'upcoming'
                ? 'text-[#FF6636]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Upcoming Classes
            {activeTab === 'upcoming' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6636]"></div>
            )}
            {upcomingLessons.length > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-[#FF6636] text-white text-xs rounded-full">
                {upcomingLessons.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`pb-3 px-1 text-sm font-semibold transition-colors relative ${
              activeTab === 'history'
                ? 'text-[#FF6636]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            History
            {activeTab === 'history' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6636]"></div>
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'upcoming' ? (
        upcomingLessons.length === 0 ? (
          <div className="text-center py-12 bg-white border border-[#e9eaf0] rounded-lg">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" variant="Bulk" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Upcoming Lessons
            </h3>
            <p className="text-gray-500 mb-4">
              You don't have any scheduled lessons yet
            </p>
            <button 
              onClick={onExploreClick}
              className="px-6 py-2 bg-[#FF6636] text-white rounded-lg hover:bg-[#E55A2B] transition-colors"
            >
              Explore Tutors
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingLessons.map((item) => {
              const totalTimeSlots = Object.values(item.dateTimeSlots || {}).reduce((total: number, slots: any) => {
                return total + (slots?.length || 0);
              }, 0);

              const isLive = item.isLiveNow || false;

              return (
                <div key={item.id} className="bg-white border border-[#e9eaf0] rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <h3 className="font-bold text-lg text-[#1d2026]">{item.tutor?.name}</h3>
                        <span className="px-3 py-1 bg-[#23BD33]/10 text-[#23BD33] text-xs font-semibold rounded-full">
                          Confirmed
                        </span>
                        {isLive && (
                          <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full animate-pulse flex items-center gap-1">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            LIVE NOW
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[#6e7485]">{item.tutor?.subject}</p>
                      {item.lessonTopic && (
                        <p className="text-sm font-medium text-gray-900 mt-1">{item.lessonTopic}</p>
                      )}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      {item.nextLessonDate && (
                        <CountdownTimer targetDate={item.nextLessonDate} isLive={isLive} />
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-t border-gray-200">
                    <div>
                      <p className="text-xs text-[#6e7485] mb-1">Lesson Mode</p>
                      <p className="text-sm font-semibold text-[#1d2026]">{item.tutor?.lessonMode || item.lessonMode || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#6e7485] mb-1">Language</p>
                      <p className="text-sm font-semibold text-[#1d2026]">{item.language || 'English'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#6e7485] mb-1">Total Lessons</p>
                      <p className="text-sm font-semibold text-[#1d2026]">{item.duration || 0}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#6e7485] mb-1">Time Slots</p>
                      <p className="text-sm font-semibold text-[#1d2026]">{totalTimeSlots}</p>
                    </div>
                  </div>

                  {item.selectedDates && item.selectedDates.length > 0 && (
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs text-[#6e7485] font-medium">SCHEDULED DATES:</p>
                        {item.completedCount !== undefined && (
                          <p className="text-xs font-semibold text-[#FF6636]">
                            Progress: {item.completedCount}/{item.duration} lessons
                          </p>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {item.selectedDates.map((date: Date, idx: number) => {
                          const dateKey = new Date(date).toISOString().split('T')[0];
                          const timeSlots = item.dateTimeSlots[dateKey] || [];
                          const isCompleted = item.completedDates?.includes(dateKey);
                          
                          return (
                            <div 
                              key={idx} 
                              className={`px-3 py-2 rounded-lg ${
                                isCompleted 
                                  ? 'bg-[#23BD33]/10 border border-[#23BD33]' 
                                  : 'bg-gray-100'
                              }`}
                            >
                              <div className="flex items-center gap-1.5">
                                <p className={`text-xs font-semibold ${
                                  isCompleted ? 'text-[#23BD33]' : 'text-gray-900'
                                }`}>
                                  {new Date(date).toLocaleDateString('en-US', { 
                                    weekday: 'short', 
                                    month: 'short', 
                                    day: 'numeric' 
                                  })}
                                </p>
                                {isCompleted && (
                                  <span className="text-[#23BD33] text-xs">✓</span>
                                )}
                              </div>
                              {timeSlots.length > 0 && (
                                <p className={`text-xs mt-0.5 ${
                                  isCompleted ? 'text-[#23BD33]' : 'text-[#6e7485]'
                                }`}>
                                  {timeSlots.join(', ')}
                                </p>
                              )}
                            </div>
                          );
                        })}</div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-gray-200 mt-4 flex flex-wrap gap-3">
                    {isLive ? (
                      <button
                        onClick={() => {
                          setActiveLiveLesson({
                            tutor: {
                              name: item.tutor?.name || 'Tutor',
                              image: item.tutor?.image || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
                              subject: item.tutor?.subject || 'Subject'
                            },
                            topic: item.lessonTopic || 'General Lesson',
                            date: new Date().toLocaleDateString('en-US', { 
                              weekday: 'long',
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            }),
                            timeSlot: `${new Date().getHours()}-${new Date().getHours() + 1}`,
                            lessonMode: item.tutor?.lessonMode || 'Online',
                            description: item.description || '',
                            sessionDuration: '1 hour'
                          });
                        }}
                        className="flex-1 sm:flex-initial px-6 py-2.5 bg-[#23BD33] text-white rounded-lg hover:bg-[#1fa82b] transition-colors flex items-center justify-center gap-2 font-semibold"
                      >
                        <Video size={20} variant="Bold" />
                        Join Lesson
                      </button>
                    ) : (
                      <>
                        <button className="flex-1 sm:flex-initial px-6 py-2.5 border-2 border-[#FF6636] text-[#FF6636] rounded-lg hover:bg-[#fff9f5] transition-colors font-semibold">
                          Reschedule
                        </button>
                        <button className="flex-1 sm:flex-initial px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
                          Cancel
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => setSelectedLesson(item)}
                      className="flex-1 sm:flex-initial px-6 py-2.5 bg-[rgb(1,27,51)] text-white rounded-lg hover:bg-[rgb(1,27,51)]/90 transition-colors font-semibold"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )
      ) : (
        // History Tab
        pastLessons.length === 0 ? (
          <div className="text-center py-12 bg-white border border-[#e9eaf0] rounded-lg">
            <DocumentText className="w-16 h-16 text-gray-300 mx-auto mb-4" variant="Bulk" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No History Yet
            </h3>
            <p className="text-gray-500 mb-4">
              Your completed lessons will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {pastLessons.map((item) => {
              const totalTimeSlots = Object.values(item.dateTimeSlots || {}).reduce((total: number, slots: any) => {
                return total + (slots?.length || 0);
              }, 0);

              return (
                <div key={item.id} className="bg-white border border-[#e9eaf0] rounded-lg p-6 hover:shadow-md transition-shadow opacity-90">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <h3 className="font-bold text-lg text-[#1d2026]">{item.tutor?.name}</h3>
                        <span className="px-3 py-1 bg-gray-200 text-gray-700 text-xs font-semibold rounded-full">
                          Completed
                        </span>
                      </div>
                      <p className="text-sm text-[#6e7485]">{item.tutor?.subject}</p>
                      {item.lessonTopic && (
                        <p className="text-sm font-medium text-gray-900 mt-1">{item.lessonTopic}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-t border-gray-200">
                    <div>
                      <p className="text-xs text-[#6e7485] mb-1">Lesson Mode</p>
                      <p className="text-sm font-semibold text-[#1d2026]">{item.tutor?.lessonMode || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#6e7485] mb-1">Total Lessons</p>
                      <p className="text-sm font-semibold text-[#1d2026]">{item.duration || 0}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#6e7485] mb-1">Time Slots</p>
                      <p className="text-sm font-semibold text-[#1d2026]">{totalTimeSlots}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#6e7485] mb-1">Total Cost</p>
                      <p className="text-sm font-semibold text-[#FF6636]">₦{(item.totalCost || 0).toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-gray-200 mt-4 flex flex-wrap gap-3">
                    <button className="flex-1 sm:flex-initial px-6 py-2.5 border-2 border-[#FF6636] text-[#FF6636] rounded-lg hover:bg-[#fff9f5] transition-colors font-semibold">
                      Leave Review
                    </button>
                    <button className="flex-1 sm:flex-initial px-6 py-2.5 bg-[#564FFD] text-white rounded-lg hover:bg-[#4940E0] transition-colors font-semibold">
                      View Recording
                    </button>
                    <button className="flex-1 sm:flex-initial px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
                      Download Notes
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )
      )}

      {/* Details Modal */}
      {selectedLesson && (
        <LessonDetailsModal
          lesson={selectedLesson}
          onClose={() => setSelectedLesson(null)}
        />
      )}
    </div>
  );
}