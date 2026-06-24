import React from 'react';
import { SearchNormal1, ArrowLeft2, ArrowRight2, Book, Award, VideoPlay, Global } from 'iconsax-react';
import categoryPaths from '../../imports/svg-doelljkmeg';

interface ExplorePageProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  onCategoryClick?: (category: string) => void;
}

// Category Icon Component
function CategoryIcon({ icon, color }: { icon: string; color: string }) {
  return (
    <div className="bg-white p-2 lg:p-2 shrink-0 rounded-lg">
      <div className="w-10 h-10">
        {icon === 'cpu' && (
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
            <path d={categoryPaths.p426fe60} fill={color} opacity="0.2" />
            <path d={categoryPaths.p1ae28af0} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={categoryPaths.p2924bf00} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d="M26 13H29" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d="M26 19H29" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d="M3 13H6" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d="M3 19H6" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d="M19 26V29" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d="M13 26V29" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d="M19 3V6" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d="M13 3V6" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        )}
        {icon === 'handshake' && (
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
            <path d={categoryPaths.p39583600} fill={color} opacity="0.2" />
            <path d={categoryPaths.p1b305600} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={categoryPaths.p52fd200} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={categoryPaths.p20085840} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={categoryPaths.p225af500} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={categoryPaths.p31666a40} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={categoryPaths.p1467ba80} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        )}
        {icon === 'creditcard' && (
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
            <path d={categoryPaths.p21497700} fill={color} opacity="0.2" />
            <path d={categoryPaths.p39fe3600} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d="M20.9993 21H24.9993" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d="M14.9993 21H16.9993" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d="M2.99935 12.1065H28.9993" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        )}
        {icon === 'chart' && (
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
            <path d="M27 13H5V19H27V13Z" fill={color} opacity="0.2" />
            <path d="M5 27V5" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d="M5 7H21V13" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d="M27 13H5V19H27V13Z" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d="M17 19V25H5" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        )}
        {icon === 'bug' && (
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
            <path d={categoryPaths.p10186280} fill={color} opacity="0.2" />
            <path d={categoryPaths.p26d02600} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d="M25.9912 16H5.99121" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={categoryPaths.p35836700} fill={color} stroke={color} strokeWidth="2" />
            <path d={categoryPaths.p21f9c000} fill={color} stroke={color} strokeWidth="2" />
            <path d="M6.99121 3.5L9.53049 5.867" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d="M24.9913 3.5L22.452 5.86708" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        )}
        {icon === 'receipt' && (
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
            <path d={categoryPaths.p207fe380} fill={color} opacity="0.2" />
            <path d="M9.5 13H22.5" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d="M9.5 17H22.5" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={categoryPaths.p207fe380} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        )}
        {icon === 'megaphone' && (
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
            <path d={categoryPaths.p2ec8800} fill={color} opacity="0.2" />
            <path d={categoryPaths.p24cb6a00} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={categoryPaths.p19d8a800} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        )}
        {icon === 'camera' && (
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
            <path d={categoryPaths.p167f8080} fill={color} opacity="0.2" />
            <path d={categoryPaths.p8b52600} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={categoryPaths.pa3aa700} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        )}
        {icon === 'package' && (
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
            <path d={categoryPaths.p351d5580} fill={color} opacity="0.2" />
            <path d={categoryPaths.p25e8f5f0} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={categoryPaths.p3bde8580} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={categoryPaths.p14e71d60} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d="M16.1186 16L16.0012 29.3527" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        )}
        {icon === 'pen' && (
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
            <path d={categoryPaths.p3b02ce00} fill={color} opacity="0.2" />
            <path d={categoryPaths.p3bcd0800} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={categoryPaths.p20aec500} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={categoryPaths.p2dcdb180} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={categoryPaths.p37983980} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        )}
        {icon === 'firstaid' && (
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
            <path d={categoryPaths.pb197400} fill={color} opacity="0.2" />
            <path d="M16 14.5V21.5" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d="M19.5 18H12.5" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={categoryPaths.pb197400} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={categoryPaths.p2560d600} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        )}
        {icon === 'headphones' && (
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
            <path d={categoryPaths.p19c29500} fill={color} opacity="0.2" />
            <path d={categoryPaths.p217eaa00} fill={color} opacity="0.2" stroke={color} strokeWidth="2" />
            <path d={categoryPaths.p28bfc200} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        )}
      </div>
    </div>
  );
}

export function ExplorePage({ searchQuery, setSearchQuery, onCategoryClick }: ExplorePageProps) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [activeCategory, setActiveCategory] = React.useState('All');

  // Main category tabs from landing page
  const mainCategories = [
    { name: 'All', icon: null },
    { name: 'Subjects', icon: Book },
    { name: 'Exam Prep', icon: Award },
    { name: 'Online Class', icon: VideoPlay },
    { name: 'Language', icon: Global }
  ];

  // All categories data - better icon mappings with maintained color variation
  const allCategories = [
    // Subjects (5 items - matching landing page)
    { name: 'Mathematics', tutors: '156 tutors', color: '#564FFD', icon: 'cpu', category: 'Subjects' },
    { name: 'Physics', tutors: '89 tutors', color: '#E34444', icon: 'bug', category: 'Subjects' },
    { name: 'Chemistry', tutors: '67 tutors', color: '#23BD33', icon: 'package', category: 'Subjects' },
    { name: 'Biology', tutors: '94 tutors', color: '#FD8E1F', icon: 'firstaid', category: 'Subjects' },
    { name: 'Music', tutors: '43 tutors', color: '#FD8E1F', icon: 'headphones', category: 'Subjects' },
    
    // Exam Prep (5 items - matching landing page)
    { name: 'GRE', tutors: '78 tutors', color: '#E51515', icon: 'receipt', category: 'Exam Prep' },
    { name: 'GMAT', tutors: '52 tutors', color: '#1D2026', icon: 'receipt', category: 'Exam Prep' },
    { name: 'SAT', tutors: '91 tutors', color: '#564FFD', icon: 'receipt', category: 'Exam Prep' },
    { name: 'IELTS', tutors: '124 tutors', color: '#FD8E1F', icon: 'megaphone', category: 'Exam Prep' },
    { name: 'TOEFL', tutors: '86 tutors', color: '#23BD33', icon: 'megaphone', category: 'Exam Prep' },
    
    // Online Class (5 items - matching landing page)
    { name: 'Baking', tutors: '02 tutors', color: '#FD8E1F', icon: 'package', category: 'Online Class' },
    { name: 'Tie & Dye', tutors: '02 tutors', color: '#564FFD', icon: 'pen', category: 'Online Class' },
    { name: 'Photography', tutors: '56 tutors', color: '#1D2026', icon: 'camera', category: 'Online Class' },
    { name: 'Cooking', tutors: '64 tutors', color: '#FF6636', icon: 'package', category: 'Online Class' },
    { name: 'Art', tutors: '71 tutors', color: '#E34444', icon: 'pen', category: 'Online Class' },
    
    // Language (5 items - matching landing page)
    { name: 'Yoruba', tutors: '02 tutors', color: '#23BD33', icon: 'megaphone', category: 'Language' },
    { name: 'Igbo', tutors: '02 tutors', color: '#E34444', icon: 'megaphone', category: 'Language' },
    { name: 'Dutch', tutors: '34 tutors', color: '#564FFD', icon: 'receipt', category: 'Language' },
    { name: 'French', tutors: '112 tutors', color: '#FD8E1F', icon: 'receipt', category: 'Language' },
    { name: 'Spanish', tutors: '98 tutors', color: '#FF6636', icon: 'receipt', category: 'Language' },
  ];

  // Filter categories based on active tab
  const filteredCategories = activeCategory === 'All' 
    ? allCategories 
    : allCategories.filter(cat => cat.category === activeCategory);

  // Pagination - 20 items per page
  const itemsPerPage = 20;
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCategories = filteredCategories.slice(startIndex, endIndex);

  // Reset to page 1 when category changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  return (
    <>
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
          Explore
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          Explore and sort by category to find the perfect tutor that can help you achieve your educational goals
        </p>

        {/* Search Bar Only */}
        <div className="bg-[rgba(255,102,54,0.04)] rounded-lg p-4 mb-6">
          <div className="relative w-full">
            <input
              type="text"
              placeholder='Search for subjects, tutors, or categories...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 border border-[#e9eaf0] rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#FF6636] focus:border-transparent bg-white transition-all"
            />
            <SearchNormal1 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6e7485]" />
          </div>
        </div>
      </div>

      {/* Main Category Tabs */}
      <div className="flex items-center gap-3 mb-6 overflow-x-auto hide-scrollbar">
        {mainCategories.map((category, index) => {
          const IconComponent = category.icon;
          return (
            <button
              key={index}
              onClick={() => setActiveCategory(category.name)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                activeCategory === category.name
                  ? 'bg-[#FF6636] text-white shadow-sm'
                  : 'bg-white text-[#1d2026] hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {IconComponent && (
                <IconComponent 
                  className="w-5 h-5" 
                  variant={activeCategory === category.name ? 'Bold' : 'Linear'}
                />
              )}
              {category.name}
            </button>
          );
        })}
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {paginatedCategories.map((category, index) => (
          <div
            key={index}
            onClick={() => onCategoryClick && onCategoryClick(category.name)}
            className="group bg-white flex items-center gap-3 p-4 rounded-xl shadow-sm hover:shadow-lg hover:border-[#FF6636] border-2 border-gray-100 transition-all duration-200 cursor-pointer active:scale-95 touch-manipulation"
          >
            <CategoryIcon icon={category.icon} color={category.color} />
            <div className="flex flex-col gap-1 min-w-0 flex-1">
              <p className="font-semibold text-[#1d2026] text-base leading-tight group-hover:text-[#FF6636] transition-colors">
                {category.name}
              </p>
              <p className="font-normal text-[#6e7485] text-sm leading-tight">
                {category.tutors}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-4">
        {/* Left Arrow */}
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="bg-[#ffeee8] p-3 rounded-full hover:bg-[#ffd4c4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
        >
          <ArrowLeft2 className="w-6 h-6 text-[#FF6636]" />
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-0 overflow-x-auto hide-scrollbar">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`min-w-[48px] py-3.5 rounded-full text-sm font-medium transition-colors touch-manipulation ${
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
          className="bg-[#ffeee8] p-3 rounded-full hover:bg-[#ffd4c4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
        >
          <ArrowRight2 className="w-6 h-6 text-[#FF6636]" />
        </button>
      </div>

      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}