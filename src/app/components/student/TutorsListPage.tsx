import React from 'react';
import { SearchNormal1, ArrowLeft2, ArrowRight2, Star1, Profile2User } from 'iconsax-react';
import { CustomDropdown } from './CustomDropdown';
import imgTutor1 from "figma:asset/b5be409fb7451384cf5209680c7549a0a539644f.png";
import imgTutor2 from "figma:asset/d29dbdd42179798f8da17a6b9fddb681c70589e3.png";
import imgTutor3 from "figma:asset/c4deaa6dea5db8d06c8043222957283584e0832d.png";
import imgTutor4 from "figma:asset/9e8bb33b3955a8969be6af6732a5ea94a8dbf55a.png";

interface TutorsListPageProps {
  subject: string;
  onBack: () => void;
  onViewProfile: (tutor: any) => void;
  onBookNow: (tutor: any) => void;
}

export function TutorsListPage({ subject, onBack, onViewProfile, onBookNow }: TutorsListPageProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filterSubject, setFilterSubject] = React.useState('All subject');
  const [filterLevel, setFilterLevel] = React.useState('All Levels');
  const [filterLessonMode, setFilterLessonMode] = React.useState('All Modes');
  const [currentPage, setCurrentPage] = React.useState(1);

  // All tutors data
  const allTutors = [
    {
      id: 1,
      name: 'Aroopo Johnson',
      subject: 'English Language',
      price: 5700,
      image: imgTutor1,
      rating: 4.8,
      reviews: 134633,
      students: 430117,
      isOnline: true,
      levels: ['Primary', 'Secondary'],
      lessonModes: ['Online', 'In-person'],
      bio: 'Experienced English educator passionate about language learning'
    },
    {
      id: 2,
      name: 'Basida Cynthia',
      subject: 'Mathematics',
      price: 6000,
      image: imgTutor2,
      rating: 4.9,
      reviews: 98234,
      students: 320456,
      isOnline: true,
      levels: ['Primary', 'Secondary', 'Tertiary'],
      lessonModes: ['Online'],
      bio: 'Mathematics specialist with 10+ years of teaching experience'
    },
    {
      id: 3,
      name: 'Coolwill Mabel',
      subject: 'Computer Science',
      price: 8000,
      image: imgTutor3,
      rating: 4.7,
      reviews: 76543,
      students: 245789,
      isOnline: false,
      levels: ['Secondary', 'Tertiary'],
      lessonModes: ['Online', 'In-Person'],
      bio: 'Software engineer and educator specializing in programming'
    },
    {
      id: 4,
      name: 'Dosinn Onyeka',
      subject: 'Music',
      price: 8700,
      image: imgTutor4,
      rating: 4.8,
      reviews: 134633,
      students: 430117,
      isOnline: false,
      levels: ['Primary', 'Secondary'],
      lessonModes: ['In-Person', 'Online, In-person'],
      bio: 'Professional musician teaching music theory and practice'
    }
  ];

  // Filter tutors based on search and filters
  const filteredTutors = allTutors.filter(tutor => {
    // Search filter
    const matchesSearch = searchQuery === '' || 
      tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutor.subject.toLowerCase().includes(searchQuery.toLowerCase());

    // Subject filter
    const matchesSubject = filterSubject === 'All subject' || 
      tutor.subject.toLowerCase().includes(filterSubject.toLowerCase());

    // Level filter
    const matchesLevel = filterLevel === 'All Levels' || 
      tutor.levels.includes(filterLevel);

    // Lesson Mode filter
    const matchesLessonMode = filterLessonMode === 'All Modes' || 
      tutor.lessonModes.includes(filterLessonMode);

    return matchesSearch && matchesSubject && matchesLevel && matchesLessonMode;
  });

  const totalPages = Math.max(1, Math.ceil(filteredTutors.length / 4));

  return (
    <div className="pb-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[#FF6636] hover:text-[#E55A2B] mb-6"
      >
        <ArrowLeft2 size={20} />
        <span className="text-sm font-medium">Back to Explore</span>
      </button>

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
          Tutors {subject && `for ${subject}`} <span className="font-normal text-gray-500">({filteredTutors.length.toString().padStart(2, '0')})</span>
        </h1>
      </div>

      {/* Filter Bar */}
      <div className="bg-[rgba(255,102,54,0.04)] rounded-lg p-4 lg:p-5 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_auto_auto] gap-4 items-end">
          {/* Search */}
          <div className="flex flex-col gap-2">
            <label className="text-xs text-[#6e7485]">Search:</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search tutors by name or subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-[#e9eaf0] rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#FF6636] focus:border-transparent bg-white"
              />
              <SearchNormal1 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1D2026]" />
            </div>
          </div>

          {/* Subjects Filter */}
          <CustomDropdown
            label="Subjects:"
            value={filterSubject}
            options={['All subject', 'Mathematics', 'English', 'Computer Science', 'Music']}
            onChange={setFilterSubject}
            className="lg:w-[200px]"
          />

          {/* Levels Filter */}
          <CustomDropdown
            label="Levels:"
            value={filterLevel}
            options={['All Levels', 'Primary', 'Secondary', 'Tertiary']}
            onChange={setFilterLevel}
            className="lg:w-[200px]"
          />

          {/* Lesson Mode Filter */}
          <CustomDropdown
            label="Lesson Mode:"
            value={filterLessonMode}
            options={['All Modes', 'Online', 'In-Person', 'Online, In-person']}
            onChange={setFilterLessonMode}
            className="lg:w-[200px]"
          />
        </div>
      </div>

      {/* Results or Empty State */}
      {filteredTutors.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg border border-[#e9eaf0]">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <SearchNormal1 size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No Tutors Found
          </h3>
          <p className="text-gray-500 mb-4">
            Try adjusting your filters or search terms
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setFilterSubject('All subject');
              setFilterLevel('All Levels');
              setFilterLessonMode('All Modes');
            }}
            className="px-6 py-2 bg-[#FF6636] text-white rounded-lg hover:bg-[#E55A2B] transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <>
          {/* Tutors List - Landscape Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
            {filteredTutors.map((tutor) => (
              <div
                key={tutor.id}
                className="bg-white border-2 border-[#e9eaf0] rounded-xl overflow-hidden hover:shadow-xl hover:border-[#FF6636] transition-all duration-300"
              >
                <div className="flex flex-row h-[200px] sm:h-[220px] lg:h-[240px]">
                  {/* Tutor Image */}
                  <div className="relative w-32 sm:w-48 lg:w-56 flex-shrink-0">
                    <img
                      src={tutor.image}
                      alt={tutor.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Online Status Badge */}
                    <div className="absolute top-3 left-3">
                      <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full shadow-md ${ tutor.isOnline ? 'bg-[#23BD33]' : 'bg-[#8c94a3]'
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

                  {/* Tutor Info */}
                  <div className="flex-1 p-4 sm:p-5 lg:p-6 flex flex-col justify-between min-w-0">
                    {/* Top Section: Name, Price, Stats */}
                    <div>
                      {/* Name & Price */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-[#1d2026] text-base sm:text-lg lg:text-xl mb-1 truncate">{tutor.name}</h3>
                        </div>
                        <div className="bg-[#fff9f5] border border-[#FF6636] px-2 sm:px-3 py-1 rounded-lg shadow-sm flex-shrink-0">
                          <span className="text-[#FF6636] font-bold text-xs sm:text-sm whitespace-nowrap">₦{tutor.price.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Stats Row */}
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-2 sm:mb-3">
                        {/* Rating */}
                        <div className="flex items-center gap-1.5">
                          <Star1 size={16} variant="Bold" className="text-[#FD8E1F] sm:w-[18px] sm:h-[18px]" />
                          <span className="font-semibold text-[#1d2026] text-xs sm:text-sm">{tutor.rating}</span>
                          <span className="text-[#8c94a3] text-xs">({tutor.reviews.toLocaleString()})</span>
                        </div>

                        {/* Students */}
                        <div className="flex items-center gap-1.5">
                          <Profile2User size={16} variant="Linear" className="text-[#FF6636] sm:w-[18px] sm:h-[18px]" />
                          <span className="font-semibold text-[#1d2026] text-xs sm:text-sm">{tutor.students.toLocaleString()}</span>
                          <span className="text-[#8c94a3] text-xs">students</span>
                        </div>
                      </div>

                      {/* Tags Row */}
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {tutor.levels.slice(0, 2).map((level) => (
                          <span
                            key={level}
                            className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                          >
                            {level}
                          </span>
                        ))}
                        {tutor.lessonModes.slice(0, 1).map((mode) => (
                          <span
                            key={mode}
                            className="px-2 py-0.5 bg-[#fff9f5] text-[#FF6636] text-xs font-medium rounded-full border border-[#FF6636]"
                          >
                            {mode}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Section: Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-3 lg:max-w-md">
                      <button
                        onClick={() => onViewProfile(tutor)}
                        className="px-3 sm:px-4 py-2 sm:py-2.5 border-2 border-[#FF6636] text-[#FF6636] rounded-lg font-semibold text-xs sm:text-sm hover:bg-[#fff9f5] transition-colors touch-manipulation"
                      >
                        View Profile
                      </button>
                      <button
                        onClick={() => onBookNow(tutor)}
                        className="px-3 sm:px-4 py-2 sm:py-2.5 bg-[#FF6636] text-white rounded-lg font-semibold text-xs sm:text-sm hover:bg-[#E55A2B] transition-colors shadow-sm touch-manipulation"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4">
              {/* Left Arrow */}
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="bg-[#ffeee8] p-3 rounded-full hover:bg-[#ffd4c4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft2 className="w-6 h-6 text-[#FF6636]" />
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-0">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-12 py-3.5 rounded-full text-sm font-medium transition-colors ${
                      currentPage === page
                        ? 'bg-[#FF6636] text-white'
                        : 'text-[#1d2026] hover:bg-gray-100'
                    }`}
                  >
                    {page.toString().padStart(2, '0')}
                  </button>
                ))}
              </div>

              {/* Right Arrow */}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="bg-[#ffeee8] p-3 rounded-full hover:bg-[#ffd4c4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowRight2 className="w-6 h-6 text-[#FF6636]" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}