import React from 'react';
import { Teacher, Book1, Calendar, TickCircle, MessageText1, Profile2User, SearchNormal1 } from 'iconsax-react';
import { toast } from 'sonner';

interface TutorsPageProps {
  onViewProfile?: (tutor: any) => void;
  onBookNow?: (tutor: any) => void;
  onExploreClick?: () => void;
}

const DEMO_TUTORS = [
  {
    id: '1',
    name: 'Aroopo Johnson',
    initials: 'AJ',
    subject: 'English Language, French',
    description: 'Experienced English and French educator passionate about language learning',
    experience: '8 years',
    rating: 4.8,
    mode: 'Online',
    rate: '₦5,700/hr',
    price: 5700,
    availability: 'Mon, Wed, Fri',
    status: 'available',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    isOnline: true,
    reviews: 12450,
    students: 34120
  },
  {
    id: '2',
    name: 'Basida Cynthia',
    initials: 'BC',
    subject: 'Mathematics',
    description: 'Mathematics specialist with 10+ years of teaching experience',
    experience: '12 years',
    rating: 4.9,
    mode: 'Online',
    rate: '₦6,000/hr',
    price: 6000,
    availability: 'Tue, Thu, Sat',
    status: 'available',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    isOnline: true,
    reviews: 98234,
    students: 320456
  }
];

const ASSIGNED_TUTORS = [
  {
    id: '3',
    name: 'Coolwill Mabel',
    initials: 'CM',
    subject: 'Computer Science',
    description: 'Software engineer and educator specializing in programming',
    experience: '10 years',
    rating: 4.7,
    mode: 'Online',
    rate: '₦8,000/hr',
    price: 8000,
    assignedDate: 'March 20, 2026',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
    isOnline: false,
    reviews: 76543,
    students: 245789
  }
];

export function TutorsPage({ onViewProfile, onBookNow, onExploreClick }: TutorsPageProps) {
  const [selectedTutor, setSelectedTutor] = React.useState<string | null>(null);
  const [activeTab, setActiveTab] = React.useState<'available' | 'assigned'>('available');
  const [awaitingApproval, setAwaitingApproval] = React.useState<string[]>([]);

  const handleViewProfile = (tutor: any) => {
    if (onViewProfile) {
      onViewProfile(tutor);
    } else {
      toast.info(`Opening profile for ${tutor.name}`);
    }
  };

  const handleBookNow = (tutor: any) => {
    if (selectedTutor && selectedTutor !== tutor.id) {
      toast.error('You can only select one tutor at a time');
      return;
    }
    
    if (selectedTutor === tutor.id) {
      setSelectedTutor(null);
      toast.info(`${tutor.name} deselected`);
    } else {
      setSelectedTutor(tutor.id);
      setAwaitingApproval([...awaitingApproval, tutor.id]);
      toast.success(`Booking request sent for ${tutor.name}! Awaiting admin approval.`);
      setSelectedTutor(null);
    }
  };

  const handleGetStarted = (tutor: any) => {
    if (onBookNow) {
      onBookNow(tutor);
    } else {
      toast.info(`Starting session with ${tutor.name}`);
    }
  };

  const handleMessage = (tutorName: string) => {
    toast.info(`Messaging ${tutorName} - Feature coming soon!`);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">My Tutors</h2>
          <p className="text-sm md:text-base text-gray-600">
            Tutors who expressed interest and your assigned tutors
          </p>
        </div>
        <button
          onClick={() => {
            if (onExploreClick) {
              onExploreClick();
            }
          }}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#FF6636] text-white rounded-xl font-semibold hover:bg-[#E55A2B] transition-all text-sm"
        >
          <SearchNormal1 size={18} variant="Bold" />
          Explore Tutors
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 mb-6">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('available')}
            className={`flex-1 px-6 py-4 font-semibold text-sm transition-all ${
              activeTab === 'available'
                ? 'text-[#FF6636] border-b-2 border-[#FF6636]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Available Tutors ({DEMO_TUTORS.length})
          </button>
          <button
            onClick={() => setActiveTab('assigned')}
            className={`flex-1 px-6 py-4 font-semibold text-sm transition-all ${
              activeTab === 'assigned'
                ? 'text-[#FF6636] border-b-2 border-[#FF6636]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Assigned Tutors ({ASSIGNED_TUTORS.length})
          </button>
        </div>
      </div>

      {activeTab === 'available' && (
        <div>
          <div className="bg-orange-50 border border-[#FF6636] rounded-xl p-4 mb-6">
            <p className="text-sm text-[#FF6636] font-medium">
              ℹ️ You can select only ONE tutor. After selection, wait for admin approval.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DEMO_TUTORS.map((tutor) => {
              const isAwaiting = awaitingApproval.includes(tutor.id);
              
              return (
                <div
                  key={tutor.id}
                  className={`bg-white rounded-2xl border p-6 ${
                    isAwaiting ? 'border-orange-200' : 'border-gray-200 hover:border-[#FF6636]/30 hover:shadow-lg'
                  } transition-all`}
                >
                  {isAwaiting && (
                    <div className="mb-4 px-3 py-1.5 bg-orange-100 text-orange-600 rounded-full text-xs font-bold inline-block">
                      AWAITING APPROVAL
                    </div>
                  )}

                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                      {tutor.initials}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{tutor.name}</h3>
                      <div className="flex items-center gap-2">
                        <Book1 className="w-4 h-4 text-[#FF6636]" variant="Bold" />
                        <span className="text-sm text-gray-600 font-medium">{tutor.subject}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">{tutor.description}</p>

                  <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div>
                      <p className="text-gray-500 text-xs mb-0.5">Experience</p>
                      <p className="font-semibold text-gray-900">{tutor.experience}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-0.5">Rating</p>
                      <p className="font-semibold text-gray-900">⭐ {tutor.rating}/5.0</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-0.5">Mode</p>
                      <p className="font-semibold text-gray-900">{tutor.mode}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-0.5">Rate</p>
                      <p className="font-semibold text-[#FF6636]">{tutor.rate}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4 p-3 bg-gray-50 rounded-lg">
                    <Calendar size={16} className="text-gray-500" />
                    <span className="text-xs text-gray-600">{tutor.availability}</span>
                  </div>

                  {!isAwaiting && (
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => handleViewProfile(tutor)}
                        className="py-2.5 border-2 border-[#FF6636] text-[#FF6636] rounded-xl font-semibold hover:bg-[#fff9f5] transition-all text-sm flex items-center justify-center gap-2"
                      >
                        <Profile2User size={18} variant="Bold" />
                        View Profile
                      </button>
                      <button
                        onClick={() => handleBookNow(tutor)}
                        className="py-2.5 bg-[#FF6636] text-white rounded-xl font-semibold hover:bg-[#E55A2B] transition-all text-sm"
                      >
                        Book Now
                      </button>
                    </div>
                  )}

                  {isAwaiting && (
                    <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <p className="text-xs text-orange-600 font-medium">
                        🕒 Awaiting admin approval. You'll be notified once approved.
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'assigned' && (
        <div>
          {ASSIGNED_TUTORS.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ASSIGNED_TUTORS.map((tutor) => (
                <div
                  key={tutor.id}
                  className="bg-white rounded-2xl border border-green-200 p-6"
                >
                  <div className="mb-4 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-bold inline-flex items-center gap-1">
                    <TickCircle size={14} variant="Bold" />
                    ASSIGNED
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold text-lg">
                      {tutor.initials}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{tutor.name}</h3>
                      <div className="flex items-center gap-2">
                        <Book1 className="w-4 h-4 text-[#FF6636]" variant="Bold" />
                        <span className="text-sm text-gray-600 font-medium">{tutor.subject}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">{tutor.description}</p>

                  <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div>
                      <p className="text-gray-500 text-xs mb-0.5">Experience</p>
                      <p className="font-semibold text-gray-900">{tutor.experience}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-0.5">Rating</p>
                      <p className="font-semibold text-gray-900">⭐ {tutor.rating}/5.0</p>
                    </div>
                  </div>

                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg mb-4">
                    <p className="text-xs text-green-700 font-medium">
                      ✅ Assigned on {tutor.assignedDate}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => handleGetStarted(tutor)}
                      className="py-2.5 bg-[#FF6636] text-white rounded-xl font-semibold hover:bg-[#E55A2B] transition-all text-sm"
                    >
                      Get Started
                    </button>
                    <button 
                      onClick={() => handleMessage(tutor.name)}
                      className="py-2.5 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-[#FF6636] hover:text-[#FF6636] transition-all text-sm flex items-center justify-center gap-2"
                    >
                      <MessageText1 size={18} variant="Bold" />
                      Message
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Teacher className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Assigned Tutors</h3>
              <p className="text-gray-600">
                You don't have any assigned tutors yet.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}