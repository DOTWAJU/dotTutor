import React from 'react';
import { DocumentText, Teacher, Clock } from 'iconsax-react';

interface ApplicationHistoryProps {
  bookingHistory: any[];
  requestHistory: any[];
  onExploreClick: () => void;
}

// Countdown Timer Component
function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = React.useState('');
  const [isLive, setIsLive] = React.useState(false);

  React.useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference <= 0) {
        setIsLive(true);
        setTimeLeft('Lesson is Live!');
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
  }, [targetDate]);

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

export function ApplicationHistory({ bookingHistory, requestHistory, onExploreClick }: ApplicationHistoryProps) {
  // Only show REQUEST history here (not bookings)
  // Bookings should only appear in My Lessons
  const allItems = [
    ...requestHistory
  ].sort((a, b) => {
    const dateA = new Date(a.requestDate).getTime();
    const dateB = new Date(b.requestDate).getTime();
    return dateB - dateA;
  });

  if (allItems.length === 0) {
    return (
      <div>
        <div className="mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            Application History
          </h1>
          <p className="text-sm text-[#6e7485]">
            View all your lesson bookings and tutor requests
          </p>
        </div>

        <div className="text-center py-12 bg-white border border-[#e9eaf0] rounded-lg">
          <DocumentText className="w-16 h-16 text-gray-300 mx-auto mb-4" variant="Bulk" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No History Yet
          </h3>
          <p className="text-gray-500 mb-4">
            Your lesson bookings and tutor requests will appear here
          </p>
          <button 
            onClick={onExploreClick}
            className="px-6 py-2 bg-[#FF6636] text-white rounded-lg hover:bg-[#E55A2B] transition-colors"
          >
            Explore Tutors
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
          Application History
        </h1>
        <p className="text-sm text-[#6e7485]">
          Track your pending tutor requests and their responses
        </p>
      </div>

      <div className="space-y-4">
        {allItems.map((item) => {
          // Render Request
          return (
            <div key={item.id} className="bg-white border border-[#e9eaf0] rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-lg text-[#1d2026]">Request for {item.subject}</h3>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      item.status === 'Pending' ? 'bg-[#FD8E1F]/10 text-[#FD8E1F]' :
                      item.status === 'Under Review' ? 'bg-[#564FFD]/10 text-[#564FFD]' :
                      item.status === 'Responded' ? 'bg-[#23BD33]/10 text-[#23BD33]' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {item.status || 'Pending'}
                    </span>
                    <span className="px-2 py-1 bg-[#FF6636]/10 text-[#FF6636] text-xs font-medium rounded">
                      REQUEST
                    </span>
                  </div>
                  <p className="text-xs text-[#8c94a3] mt-1">
                    Requested on {new Date(item.requestDate).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div className="bg-[#fff9f5] border border-[#FF6636] rounded-lg px-4 py-2 text-center">
                  <p className="text-xs text-[#6e7485]">Response in</p>
                  <p className="text-sm font-bold text-[#FF6636]">2 Days</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4 border-t border-gray-200">
                <div>
                  <p className="text-xs text-[#6e7485] mb-1">Education Level</p>
                  <p className="text-sm font-semibold text-[#1d2026]">{item.level || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-[#6e7485] mb-1">Lesson Mode</p>
                  <p className="text-sm font-semibold text-[#1d2026]">{item.lessonMode || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-[#6e7485] mb-1">Language</p>
                  <p className="text-sm font-semibold text-[#1d2026]">{item.preferredLanguage || 'N/A'}</p>
                </div>
              </div>

              {item.availability && (
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs text-[#6e7485] mb-1 font-medium">AVAILABILITY:</p>
                  <p className="text-sm text-[#1d2026]">{item.availability}</p>
                </div>
              )}

              {item.description && (
                <div className="pt-4 border-t border-gray-200 mt-4">
                  <p className="text-xs text-[#6e7485] mb-1 font-medium">LEARNING GOALS:</p>
                  <p className="text-sm text-[#1d2026]">{item.description}</p>
                </div>
              )}

              {item.feedback && (
                <div className="pt-4 border-t border-gray-200 mt-4 bg-[#f5f7fa] -m-6 mt-4 p-6 rounded-b-lg">
                  <div className="flex items-start gap-3">
                    <Teacher size={20} className="text-[#FF6636] flex-shrink-0 mt-0.5" variant="Bold" />
                    <div className="flex-1">
                      <p className="text-xs text-[#6e7485] mb-1 font-medium">ADMIN RESPONSE:</p>
                      <p className="text-sm text-[#1d2026] mb-2">{item.feedback}</p>
                      {item.recommendedTutors && item.recommendedTutors.length > 0 && (
                        <div className="mt-3">
                          <p className="text-xs text-[#6e7485] mb-2 font-medium">RECOMMENDED TUTORS:</p>
                          <div className="flex flex-wrap gap-2">
                            {item.recommendedTutors.map((tutor: string, idx: number) => (
                              <span key={idx} className="px-3 py-1.5 bg-white border border-[#FF6636] text-[#FF6636] text-xs font-medium rounded-lg hover:bg-[#fff9f5] transition-colors cursor-pointer">
                                {tutor}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}