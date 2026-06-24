import React from 'react';
import { SearchNormal1, ArrowRight2, HambergerMenu, CloseCircle, ArrowDown2, Book, Award, VideoPlay, Global, Star1, ArrowLeft2 } from 'iconsax-react';
import imgSaly45 from "figma:asset/8f50c7e8a8da5e42c42a40ed30cb67eb9beb97e3.png";
import imgSaly10 from "figma:asset/8c08e116254eca5f17b913c874afb12ee4949f89.png";
import imgTutorOnline from "figma:asset/cf7204d0b34afefedab06d9f24fcc63e4157ec77.png";
import Logo from '../imports/Logo-4004-36';
import FooterLogo from './FooterLogo';

interface RedesignedLandingPageProps {
  onGetStarted?: () => void;
  onLogin?: () => void;
  onViewSubjects?: () => void;
  isSignedIn?: boolean; // true if user is logged in
  onGoToDashboard?: () => void; // callback to navigate to dashboard
}

export function RedesignedLandingPage({ onGetStarted, onLogin, onViewSubjects, isSignedIn, onGoToDashboard }: RedesignedLandingPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [exploreDropdownOpen, setExploreDropdownOpen] = React.useState(false);
  const [mobileExploreOpen, setMobileExploreOpen] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = React.useState('English');
  const [currentTestimonial, setCurrentTestimonial] = React.useState(0);

  // Counter animation states
  const [tutorCount, setTutorCount] = React.useState(0);
  const [materialCount, setMaterialCount] = React.useState(0);
  const [subjectCount, setSubjectCount] = React.useState(0);
  const [rating, setRating] = React.useState(0);
  const [nationalityCount, setNationalityCount] = React.useState(0);

  // Counter animation effect
  React.useEffect(() => {
    const duration = 2000; // 2 seconds
    const frameRate = 1000 / 60; // 60fps
    const totalFrames = duration / frameRate;

    let frame = 0;
    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;

      setTutorCount(Math.floor(500 * progress));
      setMaterialCount(Math.floor(1000 * progress));
      setSubjectCount(Math.floor(120 * progress));
      setRating(Math.min(4.8, (4.8 * progress)));
      setNationalityCount(Math.floor(45 * progress));

      if (frame >= totalFrames) {
        clearInterval(counter);
        setTutorCount(500);
        setMaterialCount(1000);
        setSubjectCount(120);
        setRating(4.8);
        setNationalityCount(45);
      }
    }, frameRate);

    return () => clearInterval(counter);
  }, []);

  const categories = [
    'Mathematics Tutoring',
    'Science & Chemistry',
    'Online Classes',
    'Rudiment of Music',
    'Exam Prep'
  ];

  const exploreCategories = [
    {
      title: 'Subjects',
      items: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Music'],
      icon: Book,
      count: '200 Tutors'
    },
    {
      title: 'Exam Prep',
      items: ['GRE', 'GMAT', 'SAT', 'IELTS', 'TOEFL'],
      icon: Award,
      count: '150 Tutors'
    },
    {
      title: 'Online Class',
      items: ['Baking', 'Tie & Dye', 'Photography', 'Cooking', 'Art'],
      icon: VideoPlay,
      count: '180 Tutors'
    },
    {
      title: 'Language',
      items: ['Yoruba', 'Igbo', 'Dutch', 'French', 'Spanish'],
      icon: Global,
      count: '120 Tutors'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Parent',
      image: 'https://images.unsplash.com/photo-1711934049680-d4450a75a8c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJlbnQlMjBzbWlsaW5nJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3MjU1ODAxNHww&ixlib=rb-4.1.0&q=80&w=1080',
      testimonial: "Dot-tutor has been a game-changer for my daughter's education. The tutors are professional, patient, and truly care about her progress. Her grades have improved significantly!",
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Tutor',
      image: 'https://images.unsplash.com/photo-1544972917-3529b113a469?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcyNTU4MDE0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      testimonial: "As a tutor, Dot-tutor provides me with the perfect platform to connect with students who genuinely want to learn. The scheduling system is seamless and the community is amazing.",
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Student',
      image: 'https://images.unsplash.com/photo-1606589551604-86f49d5e8dbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIweW91bmclMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzcyNTU4MDE0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      testimonial: "I was struggling with calculus until I found my tutor on Dot-tutor. The one-on-one sessions helped me understand concepts I thought were impossible. I'm now confident in my abilities!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        
        * {
          font-family: 'Inter', sans-serif;
        }

        @keyframes kenburns {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
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

        .hero-image {
          animation: kenburns 20s ease-in-out infinite;
        }

        .mobile-menu {
          animation: slideDown 0.3s ease-out;
        }

        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideOut {
          from {
            opacity: 1;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            transform: translateX(-100px);
          }
        }

        .testimonial-enter {
          animation: slideIn 0.6s ease-out forwards;
        }

        .testimonial-exit {
          animation: slideOut 0.6s ease-out forwards;
        }

        .dot-pattern {
          background-image: radial-gradient(circle, #FF6636 1px, transparent 1px);
          background-size: 20px 20px;
          opacity: 0.15;
        }
      `}</style>

      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-3 lg:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Logo />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              <button className="text-[15px] font-medium text-gray-700 hover:text-[#FF6636] transition-colors">
                Find Tutors
              </button>
              <button
                onClick={() => setExploreDropdownOpen(!exploreDropdownOpen)}
                className="text-[15px] font-medium text-gray-700 hover:text-[#FF6636] transition-colors relative flex items-center gap-1"
              >
                Explore
                <ArrowDown2 size={16} className={`transition-transform ${exploreDropdownOpen ? 'rotate-180' : ''}`} />
                {exploreDropdownOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-white rounded-md border border-gray-100 shadow-lg z-10 w-[680px] p-4">
                    <div className="grid grid-cols-4 gap-6 mb-3">
                      {exploreCategories.map((category, index) => (
                        <div key={index}>
                          <h5 className="text-gray-800 text-[13px] font-semibold mb-2">{category.title}</h5>
                          <div className="space-y-1.5">
                            {category.items.map((item, itemIndex) => (
                              <button
                                key={itemIndex}
                                className="block w-full text-left px-2 py-1.5 text-[12px] text-gray-700 bg-gray-50 hover:bg-orange-50 hover:text-[#FF6636] transition-colors font-normal rounded-sm"
                                onClick={() => {
                                  setExploreDropdownOpen(false);
                                }}
                              >
                                {item}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-center pt-3 border-t border-gray-100">
                      <button
                        onClick={() => {
                          setExploreDropdownOpen(false);
                        }}
                        className="px-4 py-2 bg-[#FF6636] text-white rounded-md text-[12px] font-normal hover:bg-[#ff5522] transition-all flex items-center justify-center gap-1.5"
                      >
                        View All
                        <ArrowRight2 size={13} />
                      </button>
                    </div>
                  </div>
                )}
              </button>
              <button className="text-[15px] font-medium text-gray-700 hover:text-[#FF6636] transition-colors">
                Become a Tutor
              </button>
            </nav>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center gap-4">
              {!isSignedIn ? (
                <>
                  <button
                    onClick={onLogin}
                    className="text-[15px] font-medium text-gray-700 hover:text-gray-900 transition-colors px-4 py-2"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={onGetStarted}
                    className="px-6 py-2.5 bg-[#FF6636] text-white rounded-lg text-[15px] font-semibold hover:bg-[#ff5522] transition-all shadow-sm hover:shadow-md"
                  >
                    Join
                  </button>
                </>
              ) : (
                <button
                  onClick={onGoToDashboard}
                  className="px-6 py-2.5 bg-[#FF6636] text-white rounded-lg text-[15px] font-semibold hover:bg-[#ff5522] transition-all shadow-sm hover:shadow-md flex items-center gap-2"
                >
                  Dashboard
                  <ArrowRight2 size={16} />
                </button>
              )}
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-gray-900 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <CloseCircle size={28} variant="Bold" />
              ) : (
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="6" y1="11" x2="22" y2="11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                  <line x1="6" y1="17" x2="22" y2="17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-gray-100 pt-4 mobile-menu">
              <nav className="flex flex-col gap-2">
                <button className="text-[15px] font-medium text-gray-900 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  Find Tutors
                </button>
                <button
                  onClick={() => setMobileExploreOpen(!mobileExploreOpen)}
                  className="text-[15px] font-medium text-gray-700 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors relative flex items-center gap-1"
                >
                  Explore
                  <ArrowDown2 size={16} className={`transition-transform ${mobileExploreOpen ? 'rotate-180' : ''}`} />
                  {mobileExploreOpen && (
                    <div className="absolute left-0 top-full mt-2 bg-white rounded-md border border-gray-100 shadow-lg z-10 w-[calc(100vw-2rem)] max-w-[400px] p-4 max-h-[70vh] overflow-y-auto">
                      <div className="space-y-4 mb-4">
                        {exploreCategories.map((category, index) => (
                          <div key={index}>
                            <h5 className="text-gray-800 text-[13px] font-semibold mb-2">{category.title}</h5>
                            <div className="flex flex-wrap gap-2">
                              {category.items.map((item, itemIndex) => (
                                <button
                                  key={itemIndex}
                                  className="px-3 py-1.5 text-[12px] text-gray-700 bg-gray-50 hover:bg-orange-50 hover:text-[#FF6636] transition-colors font-normal rounded-md"
                                  onClick={() => {
                                    setMobileExploreOpen(false);
                                  }}
                                >
                                  {item}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="pt-3 border-t border-gray-100">
                        <button
                          onClick={() => {
                            setMobileExploreOpen(false);
                          }}
                          className="w-full px-3 py-2 bg-[#FF6636] text-white rounded-md text-[12px] font-normal hover:bg-[#ff5522] transition-all flex items-center justify-center gap-1.5"
                        >
                          View All
                          <ArrowRight2 size={13} />
                        </button>
                      </div>
                    </div>
                  )}
                </button>
                <button className="text-[15px] font-medium text-gray-700 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  Become a Tutor
                </button>
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100 mt-2">
                  <button 
                    onClick={onLogin} 
                    className="px-5 py-3 text-[15px] font-semibold text-gray-700 border-2 border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={onGetStarted} 
                    className="px-5 py-3 bg-[#FF6636] text-white rounded-lg text-[15px] font-semibold hover:bg-[#ff5522] transition-all shadow-sm hover:shadow-md"
                  >
                    Join
                  </button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section with Video Background */}
      <section className="relative h-[500px] sm:h-[550px] lg:h-[600px] overflow-hidden bg-black">
        {/* Animated Background Image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center opacity-60 sm:opacity-70 hero-image"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1753613648191-4771cf76f034?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHN0dWR5aW5nJTIwb25saW5lJTIwbGFwdG9wfGVufDF8fHx8MTc3MjU0NTEzNnww&ixlib=rb-4.1.0&q=80&w=1080')"
          }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60"></div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
            {/* Hero Text */}
            <h1 className="text-white text-[32px] sm:text-[42px] lg:text-[52px] font-normal leading-[1.2] mb-6 sm:mb-8 max-w-[900px]">
              Find expert tutors<br />
              for every subject
            </h1>

            {/* Search Bar and Category Pills Container */}
            <div className="max-w-[900px]">
              {/* Search Bar */}
              <div className="mb-4 sm:mb-5">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for subjects, tutors, and more..."
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 pr-12 sm:pr-14 rounded-lg text-[15px] sm:text-[16px] text-gray-900 placeholder-gray-500 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF6636] focus:border-transparent transition-all bg-white shadow-lg"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 bg-[#FF6636] rounded-md flex items-center justify-center hover:bg-[#ff5522] active:scale-95 transition-all shadow-md">
                    <SearchNormal1 size={20} className="text-white" />
                  </button>
                </div>
              </div>

              {/* Category Pills - Square shape with horizontal scroll on mobile */}
              <div className="flex lg:flex-wrap gap-2 overflow-x-auto hide-scrollbar pb-2">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    className="px-3 sm:px-4 py-2 sm:py-2.5 bg-white/10 backdrop-blur-sm border border-white/30 rounded-md text-white text-[13px] sm:text-[14px] font-medium hover:bg-gradient-to-r hover:from-[#FF6636] hover:to-[#ff8855] hover:border-[#FF6636] active:scale-95 transition-all flex items-center gap-2 whitespace-nowrap"
                  >
                    {category}
                    <ArrowRight2 size={14} className="flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter & Categories Section */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats Counter */}
          <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-8 lg:gap-12 mb-12 sm:mb-16">
            {/* Stat 1 - Learning materials */}
            <div className="flex flex-col items-center">
              <div className="text-gray-900 text-[20px] sm:text-[32px] lg:text-[36px] font-bold mb-1 sm:mb-2">
                {materialCount.toLocaleString()}+
              </div>
              <p className="text-gray-600 text-[11px] sm:text-[15px] font-medium text-center">
                Learning materials
              </p>
            </div>

            {/* Stat 2 - Subjects taught */}
            <div className="flex flex-col items-center">
              <div className="text-gray-900 text-[20px] sm:text-[32px] lg:text-[36px] font-bold mb-1 sm:mb-2">
                {subjectCount}+
              </div>
              <p className="text-gray-600 text-[11px] sm:text-[15px] font-medium text-center">
                Subjects taught
              </p>
            </div>

            {/* Stat 3 - Experienced tutors */}
            <div className="flex flex-col items-center">
              <div className="text-gray-900 text-[20px] sm:text-[32px] lg:text-[36px] font-bold mb-1 sm:mb-2">
                {tutorCount}+
              </div>
              <p className="text-gray-600 text-[11px] sm:text-[15px] font-medium text-center">
                Experienced tutors
              </p>
            </div>

            {/* Stat 4 - Satisfaction (hidden on mobile) */}
            <div className="hidden sm:flex flex-col items-center">
              <div className="text-gray-900 text-[28px] sm:text-[32px] lg:text-[36px] font-bold mb-2">
                {rating.toFixed(1)}
              </div>
              <p className="text-gray-600 text-[14px] sm:text-[15px] font-medium text-center">
                Satisfaction
              </p>
            </div>

            {/* Stat 5 - Nationalities (hidden on mobile) */}
            <div className="hidden lg:flex flex-col items-center">
              <div className="text-gray-900 text-[28px] sm:text-[32px] lg:text-[36px] font-bold mb-2">
                {nationalityCount}+
              </div>
              <p className="text-gray-600 text-[14px] sm:text-[15px] font-medium text-center">
                Nationalities
              </p>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-6 sm:mb-8">
            {exploreCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={index}
                  className="group bg-white border border-gray-200 rounded-lg p-3 sm:p-4 hover:border-orange-200 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <IconComponent size={24} variant="Bold" className="sm:w-7 sm:h-7 text-[#FF6636] group-hover:text-gray-700 transition-colors flex-shrink-0" />
                    <div className="flex-1 text-left">
                      <h3 className="text-[15px] sm:text-[16px] font-semibold text-gray-900 mb-0.5">
                        {category.title}
                      </h3>
                      <p className="text-[12px] sm:text-[13px] text-gray-500">
                        {category.count}
                      </p>
                    </div>
                    <ArrowRight2 size={18} className="sm:w-5 sm:h-5 text-gray-400 group-hover:text-gray-700 transition-colors flex-shrink-0" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* View All Link */}
          <div className="text-left">
            <button className="text-[15px] text-gray-700 hover:text-[#FF6636] transition-colors font-medium inline-flex items-center gap-2">
              <span className="text-[18px]">+</span> View all
            </button>
          </div>
        </div>
      </section>

      {/* Become A Tutor CTA Card */}
      <section className="bg-white py-16 sm:py-20 lg:py-24 relative overflow-hidden">
        {/* Dot Pattern Background */}
        <div className="absolute inset-0 dot-pattern"></div>
        
        {/* Decorative elements - reduced opacity */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#FF6636]/2 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#FF6636]/2 to-transparent rounded-full blur-3xl"></div>
        
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* CTA Card - Horizontal Landscape Design */}
          <div className="max-w-5xl mx-auto rounded-2xl shadow-xl overflow-hidden border-2 border-[#FF6636]/30">
            <div className="grid grid-cols-1 md:grid-cols-2 items-stretch">
              {/* Left Image */}
              <div className="relative h-full min-h-[280px] md:min-h-[320px] order-1 md:order-1 bg-gray-100">
                <img
                  src={imgTutorOnline}
                  alt="Online teaching"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* Right Content with White Background & Dots */}
              <div className="relative p-8 sm:p-10 lg:p-12 order-2 md:order-2 bg-white">
                {/* Dot Pattern on white background */}
                <div className="absolute inset-0 dot-pattern opacity-40"></div>
                
                <div className="relative z-10">
                  <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] font-bold mb-3 text-gray-900">
                    Become A Tutor
                  </h2>
                  <p className="text-[15px] sm:text-[16px] leading-relaxed mb-6 text-gray-700">
                    Transform your expertise into income. Connect with motivated students and make a real impact while earning on your schedule.
                  </p>
                  
                  {/* Features List */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#FF6636]/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z" fill="#FF6636"/>
                        </svg>
                      </div>
                      <span className="text-[14px] sm:text-[15px] font-medium text-gray-800">Set Your Own Rates</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#FF6636]/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.35 15.57C16.21 15.81 15.96 15.94 15.7 15.94C15.57 15.94 15.44 15.91 15.32 15.83L12.22 13.98C11.45 13.52 10.88 12.51 10.88 11.62V7.52C10.88 7.11 11.22 6.77 11.63 6.77C12.04 6.77 12.38 7.11 12.38 7.52V11.62C12.38 11.98 12.68 12.51 12.99 12.69L16.09 14.54C16.45 14.75 16.57 15.21 16.35 15.57Z" fill="#FF6636"/>
                        </svg>
                      </div>
                      <span className="text-[14px] sm:text-[15px] font-medium text-gray-800">Work Your Schedule</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#FF6636]/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2C9.38 2 7.25 4.13 7.25 6.75C7.25 9.32 9.26 11.4 11.88 11.49C11.96 11.48 12.04 11.48 12.1 11.49C12.12 11.49 12.13 11.49 12.15 11.49C12.16 11.49 12.16 11.49 12.17 11.49C14.73 11.4 16.74 9.32 16.75 6.75C16.75 4.13 14.62 2 12 2Z" fill="#FF6636"/>
                          <path d="M17.08 14.15C14.29 12.29 9.74 12.29 6.93 14.15C5.66 15 4.96 16.15 4.96 17.38C4.96 18.61 5.66 19.75 6.92 20.59C8.32 21.53 10.16 22 12 22C13.84 22 15.68 21.53 17.08 20.59C18.34 19.74 19.04 18.6 19.04 17.36C19.03 16.13 18.34 14.99 17.08 14.15Z" fill="#FF6636"/>
                        </svg>
                      </div>
                      <span className="text-[14px] sm:text-[15px] font-medium text-gray-800">Secure & Supported</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button className="group bg-[#FF6636] text-white px-6 py-3 rounded-lg text-[15px] font-bold hover:bg-[#ff5522] transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
                    Start Teaching Today
                    <ArrowRight2 size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-16 sm:py-20 lg:py-24 relative overflow-hidden">
        {/* Dot Pattern Background */}
        <div className="absolute inset-0 dot-pattern"></div>
        
        {/* Decorative elements - reduced opacity */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#FF6636]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#FF6636]/5 to-transparent rounded-full blur-3xl"></div>
        
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 text-[28px] sm:text-[32px] lg:text-[38px] font-bold mb-3">
              Testimonials
            </h2>
            <p className="text-gray-600 text-[15px] sm:text-[16px] max-w-2xl mx-auto">
              Hear from parents, tutors and students amazing feedbacks and overall rating
            </p>
          </div>

          {/* Carousel Container */}
          <div className="relative max-w-5xl mx-auto">
            {/* Main Testimonial Card */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10 lg:p-12 border border-gray-100">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Image Section */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <img
                      src={testimonials[currentTestimonial].image}
                      alt={testimonials[currentTestimonial].name}
                      className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-2xl object-cover shadow-lg ring-4 ring-[#FF6636]/20"
                    />
                    {/* Quote Icon Overlay */}
                    <div className="absolute -top-3 -right-3 w-12 h-12 bg-[#FF6636] rounded-full flex items-center justify-center shadow-lg">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8V10C6 11.1046 6.89543 12 8 12C9.10457 12 10 11.1046 10 10V8Z" fill="white"/>
                        <path d="M8 12C8 13.6569 6.65685 15 5 15C4.44772 15 4 15.4477 4 16C4 16.5523 4.44772 17 5 17C7.76142 17 10 14.7614 10 12H8Z" fill="white"/>
                        <path d="M18 8C18 6.89543 17.1046 6 16 6C14.8954 6 14 6.89543 14 8V10C14 11.1046 14.8954 12 16 12C17.1046 12 18 11.1046 18 10V8Z" fill="white"/>
                        <path d="M16 12C16 13.6569 14.6569 15 13 15C12.4477 15 12 15.4477 12 16C12 16.5523 12.4477 17 13 17C15.7614 17 18 14.7614 18 12H16Z" fill="white"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 text-center lg:text-left">
                  {/* Stars */}
                  <div className="flex items-center justify-center lg:justify-start gap-1 mb-4">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star1 key={i} size={20} className="text-[#FF6636]" variant="Bold" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-700 text-[16px] sm:text-[18px] lg:text-[20px] leading-relaxed mb-6 font-normal italic">
                    "{testimonials[currentTestimonial].testimonial}"
                  </p>

                  {/* Author Info */}
                  <div>
                    <h4 className="text-gray-900 text-[18px] sm:text-[20px] font-bold mb-1">
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p className="text-[#FF6636] text-[14px] sm:text-[15px] font-semibold">
                      {testimonials[currentTestimonial].role}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 lg:-translate-x-16 w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#FF6636] hover:text-white transition-all group border border-gray-200"
              aria-label="Previous testimonial"
            >
              <ArrowLeft2 size={24} className="text-gray-700 group-hover:text-white" />
            </button>

            <button
              onClick={() => setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 lg:translate-x-16 w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#FF6636] hover:text-white transition-all group border border-gray-200"
              aria-label="Next testimonial"
            >
              <ArrowRight2 size={24} className="text-gray-700 group-hover:text-white" />
            </button>

            {/* Dots Indicator */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`transition-all ${
                    index === currentTestimonial
                      ? 'w-8 h-2 bg-[#FF6636] rounded-full'
                      : 'w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Small Thumbnail Preview (Desktop Only) */}
          <div className="hidden lg:flex items-center justify-center gap-4 mt-12">
            {testimonials.map((testimonial, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`relative transition-all ${
                  index === currentTestimonial
                    ? 'scale-100 opacity-100'
                    : 'scale-90 opacity-40 hover:opacity-70'
                }`}
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-white shadow-md"
                />
                {index === currentTestimonial && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#FF6636] rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-16">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Column 1 */}
            <div>
              <div className="mb-6">
                <FooterLogo />
              </div>
              <p className="text-gray-400 text-[15px] leading-[1.6] mb-4">
                Personalized tutoring that helps you excel and succeed in your educational & Co-curricular journey.
              </p>
              <a href="mailto:info@dot-tutor.co.uk" className="text-[#FF6636] text-[15px] hover:text-[#ff5522] transition-colors">
                info@dot-tutor.co.uk
              </a>
            </div>

            {/* Column 2 */}
            <div>
              <h4 className="text-white text-[16px] font-semibold mb-6">
                Quick Links
              </h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-400 text-[15px] hover:text-white transition-colors">Subject</a></li>
                <li><a href="#" className="text-gray-400 text-[15px] hover:text-white transition-colors">Find A tutor</a></li>
                <li><a href="#" className="text-gray-400 text-[15px] hover:text-white transition-colors">Become a tutor</a></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h4 className="text-white text-[16px] font-semibold mb-6">
                Support
              </h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-400 text-[15px] hover:text-white transition-colors">FAQs</a></li>
                <li><a href="#" className="text-gray-400 text-[15px] hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="text-gray-400 text-[15px] hover:text-white transition-colors">Get in touch</a></li>
              </ul>
            </div>

            {/* Column 4 */}
            <div>
              <h4 className="text-white text-[16px] font-semibold mb-6">
                Download Our App
              </h4>
              <div className="space-y-3">
                <a href="#" className="block bg-gray-800 rounded-lg p-3 hover:bg-gray-700 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="text-white">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-400 text-[11px]">Download on the</p>
                      <p className="text-white text-[14px] font-semibold">App Store</p>
                    </div>
                  </div>
                </a>
                <a href="#" className="block bg-gray-800 rounded-lg p-3 hover:bg-gray-700 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="text-white">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.11-1.217l-.002.003V3.03a1.001 1.001 0 0 1 .112-1.218l-.001.002zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.303 2.303-8.635-8.635z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-400 text-[11px]">Get it on</p>
                      <p className="text-white text-[14px] font-semibold">Play Store</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-gray-400 text-[14px] text-center sm:text-left">
                ©2026, Dot-tutor is one of Dotwaju's Product. All right reserved
              </p>
              
              {/* Language Selector */}
              <div className="flex items-center gap-2">
                <Global size={18} className="text-gray-400" />
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="bg-gray-800 text-gray-300 text-[14px] px-3 py-1.5 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF6636] focus:border-transparent hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                  <option value="Chinese">Chinese</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}