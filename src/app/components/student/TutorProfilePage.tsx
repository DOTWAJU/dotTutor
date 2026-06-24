import React from 'react';
import { ArrowLeft2, Star1, Profile2User, User, Book1, Level, Video, Award, MessageText } from 'iconsax-react';
import { toast } from 'sonner';

interface TutorProfilePageProps {
  tutor: any;
  onBack: () => void;
  onBookNow?: () => void;
}

export function TutorProfilePage({ tutor, onBack, onBookNow }: TutorProfilePageProps) {
  const [hasBooked, setHasBooked] = React.useState(false);

  const handleBookNow = () => {
    if (!hasBooked) {
      setHasBooked(true);
      toast.success(`Booking request sent for ${tutor.name}! Awaiting admin approval.`);
    }
  };

  return (
    <div className="pb-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[#FF6636] hover:text-[#E55A2B] mb-6"
      >
        <ArrowLeft2 size={20} />
        <span className="text-sm font-medium">Back to Tutors</span>
      </button>

      {/* Profile Card */}
      <div className="bg-white border border-[#e9eaf0] rounded-lg overflow-hidden">
        {/* Profile Header */}
        <div className="flex flex-col lg:flex-row">
          {/* Tutor Image */}
          <div className="w-full lg:w-[280px] h-[280px] flex-shrink-0 relative">
            <img
              src={tutor.image}
              alt={tutor.name}
              className="w-full h-full object-cover"
            />
            {/* Online Status */}
            <div className="absolute top-4 left-4">
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${
                tutor.isOnline ? 'bg-[#23BD33]' : 'bg-[#8c94a3]'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  tutor.isOnline ? 'bg-white' : 'bg-gray-300'
                }`} />
                <span className="text-white text-xs font-medium">
                  {tutor.isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
          </div>

          {/* Tutor Details */}
          <div className="flex-1 p-6 lg:p-8">
            {/* Name & Price */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <h1 className="text-2xl font-bold text-[#1d2026]">{tutor.name}</h1>
              <div className="bg-[#fff9f5] border border-[#FF6636] px-3 py-1 rounded">
                <span className="text-[#FF6636] font-semibold text-sm">{tutor.price}/Lesson</span>
              </div>
            </div>

            {/* Subject */}
            <p className="text-base text-[#6e7485] mb-6">{tutor.subject}</p>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-6 mb-6">
              {/* Rating */}
              <div className="flex items-center gap-2">
                <Star1 size={28} variant="Bold" className="text-[#FD8E1F]" />
                <div className="text-sm">
                  <span className="font-semibold text-[#1d2026] text-lg">{tutor.rating}</span>
                  <span className="text-[#6e7485]"> ({tutor.reviews.toLocaleString()} reviews)</span>
                </div>
              </div>

              {/* Students */}
              <div className="flex items-center gap-2">
                <Profile2User size={28} variant="Linear" className="text-[#FF6636]" />
                <div className="text-sm">
                  <span className="font-semibold text-[#1d2026] text-lg">{tutor.students.toLocaleString()}</span>
                  <span className="text-[#6e7485]"> students</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={handleBookNow}
              disabled={hasBooked}
              className={`w-full sm:w-auto px-8 py-3 rounded-lg font-semibold text-base transition-colors touch-manipulation ${
                hasBooked 
                  ? 'bg-gray-400 text-white cursor-not-allowed' 
                  : 'bg-[#FF6636] text-white hover:bg-[#E55A2B]'
              }`}
            >
              {hasBooked ? 'Request Sent' : 'Book Now'}
            </button>
          </div>
        </div>

        {/* About Me */}
        <div className="border-t border-[#e9eaf0] p-6 lg:p-8">
          <div className="flex items-center gap-2 mb-4">
            <User size={20} variant="Bold" className="text-[#FF6636]" />
            <h2 className="text-sm font-semibold text-[#1d2026] uppercase">About Me</h2>
          </div>
          <p className="text-sm text-[#6e7485] leading-relaxed">
            Experienced music educator with a degree in Music Education, passionate about helping students develop music skills and a love for fine art
          </p>
        </div>

        {/* Teaches */}
        <div className="border-t border-[#e9eaf0] p-6 lg:p-8">
          <div className="flex items-center gap-2 mb-4">
            <Book1 size={20} variant="Bold" className="text-[#FF6636]" />
            <h2 className="text-sm font-semibold text-[#1d2026] uppercase">Teaches</h2>
          </div>
          <p className="text-sm text-[#6e7485] leading-relaxed">
            Music, IELTS, Spelling, Literature in English, Web Development, Phonics/Diction, keyboard, Trumpet
          </p>
        </div>

        {/* Levels & Lesson Mode */}
        <div className="border-t border-[#e9eaf0] grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#e9eaf0]">
          {/* Levels */}
          <div className="p-6 lg:p-8">
            <div className="flex items-center gap-2 mb-4">
              <Level size={20} variant="Bold" className="text-[#FF6636]" />
              <h2 className="text-sm font-semibold text-[#1d2026] uppercase">Levels</h2>
            </div>
            <p className="text-sm text-[#6e7485]">Primary, Secondary, Tertiary</p>
          </div>

          {/* Lesson Mode */}
          <div className="p-6 lg:p-8">
            <div className="flex items-center gap-2 mb-4">
              <Video size={20} variant="Bold" className="text-[#FF6636]" />
              <h2 className="text-sm font-semibold text-[#1d2026] uppercase">Lesson Mode</h2>
            </div>
            <p className="text-sm text-[#6e7485]">Online, In-person</p>
          </div>
        </div>

        {/* Qualification */}
        <div className="border-t border-[#e9eaf0] p-6 lg:p-8">
          <div className="flex items-center gap-2 mb-4">
            <Award size={20} variant="Bold" className="text-[#FF6636]" />
            <h2 className="text-sm font-semibold text-[#1d2026] uppercase">Qualification</h2>
          </div>
          <p className="text-sm text-[#6e7485]">Bsc. Music Education, Obafemi Awolowo University, 2018.</p>
        </div>

        {/* Reviews */}
        <div className="border-t border-[#e9eaf0] p-6 lg:p-8">
          <div className="flex items-center gap-2 mb-4">
            <MessageText size={20} variant="Bold" className="text-[#FF6636]" />
            <h2 className="text-sm font-semibold text-[#1d2026] uppercase">Reviews</h2>
          </div>
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-sm text-[#8c94a3]">No reviews yet</p>
          </div>
        </div>
      </div>
    </div>
  );
}