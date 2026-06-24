import React from 'react';
import { ArrowLeft, Math, Book1, MusicPlaylist, Teacher, Chart, Diagram, Edit2, Heart } from 'iconsax-react';
import Logo from '../imports/Logo-4004-36';

interface SubjectsPageProps {
  onBack?: () => void;
}

export function SubjectsPage({ onBack }: SubjectsPageProps) {
  return (
    <div className="min-h-screen bg-[#fafafb]">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Back Button */}
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="w-10 h-10 rounded-full bg-[#FF6636] shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Back to Homepage"
              >
                <ArrowLeft className="w-5 h-5 text-white" variant="Bold" />
              </button>
              <div className="scale-90 origin-left">
                <Logo />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Popular Subjects Section */}
      <section className="py-16 px-6 lg:px-20">
        <div className="max-w-[1440px] mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-[48px] font-['Montserrat',sans-serif] font-semibold text-[#1b1d1f] mb-4">
              Popular subjects
            </h1>
            <p className="text-[18px] font-['Montserrat',sans-serif] text-[#52565c]">
              Explore our most popular subjects and find the perfect tutor for your learning journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Mathematics */}
            <div className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#FF6636] cursor-pointer">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FF6636]/10 to-[#ff5522]/10 rounded-bl-full -z-0"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FFF5F2] to-[#FFE8E0] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Math variant="Bold" className="w-8 h-8 text-[#FF6636]" />
                </div>
                <h3 className="text-[24px] font-['Montserrat',sans-serif] font-bold text-[#1b1d1f] mb-2">Mathematics</h3>
                <p className="text-[16px] font-['Montserrat',sans-serif] text-[#52565c] font-medium">Over 40 tutors</p>
              </div>
            </div>

            {/* English */}
            <div className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#FF6636] cursor-pointer">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FF6636]/10 to-[#ff5522]/10 rounded-bl-full -z-0"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FFF5F2] to-[#FFE8E0] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Book1 variant="Bold" className="w-8 h-8 text-[#FF6636]" />
                </div>
                <h3 className="text-[24px] font-['Montserrat',sans-serif] font-bold text-[#1b1d1f] mb-2">English</h3>
                <p className="text-[16px] font-['Montserrat',sans-serif] text-[#52565c] font-medium">Over 70 tutors</p>
              </div>
            </div>

            {/* Music */}
            <div className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#FF6636] cursor-pointer">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FF6636]/10 to-[#ff5522]/10 rounded-bl-full -z-0"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FFF5F2] to-[#FFE8E0] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <MusicPlaylist variant="Bold" className="w-8 h-8 text-[#FF6636]" />
                </div>
                <h3 className="text-[24px] font-['Montserrat',sans-serif] font-bold text-[#1b1d1f] mb-2">Music</h3>
                <p className="text-[16px] font-['Montserrat',sans-serif] text-[#52565c] font-medium">Over 10 tutors</p>
              </div>
            </div>

            {/* Yoruba */}
            <div className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#FF6636] cursor-pointer">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FF6636]/10 to-[#ff5522]/10 rounded-bl-full -z-0"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FFF5F2] to-[#FFE8E0] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Teacher variant="Bold" className="w-8 h-8 text-[#FF6636]" />
                </div>
                <h3 className="text-[24px] font-['Montserrat',sans-serif] font-bold text-[#1b1d1f] mb-2">Yoruba</h3>
                <p className="text-[16px] font-['Montserrat',sans-serif] text-[#52565c] font-medium">Over 5 tutors</p>
              </div>
            </div>

            {/* Science */}
            <div className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#FF6636] cursor-pointer">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FF6636]/10 to-[#ff5522]/10 rounded-bl-full -z-0"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FFF5F2] to-[#FFE8E0] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Diagram variant="Bold" className="w-8 h-8 text-[#FF6636]" />
                </div>
                <h3 className="text-[24px] font-['Montserrat',sans-serif] font-bold text-[#1b1d1f] mb-2">Science</h3>
                <p className="text-[16px] font-['Montserrat',sans-serif] text-[#52565c] font-medium">Over 35 tutors</p>
              </div>
            </div>

            {/* History */}
            <div className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#FF6636] cursor-pointer">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FF6636]/10 to-[#ff5522]/10 rounded-bl-full -z-0"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FFF5F2] to-[#FFE8E0] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Chart variant="Bold" className="w-8 h-8 text-[#FF6636]" />
                </div>
                <h3 className="text-[24px] font-['Montserrat',sans-serif] font-bold text-[#1b1d1f] mb-2">History</h3>
                <p className="text-[16px] font-['Montserrat',sans-serif] text-[#52565c] font-medium">Over 15 tutors</p>
              </div>
            </div>

            {/* Art */}
            <div className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#FF6636] cursor-pointer">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FF6636]/10 to-[#ff5522]/10 rounded-bl-full -z-0"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FFF5F2] to-[#FFE8E0] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Edit2 variant="Bold" className="w-8 h-8 text-[#FF6636]" />
                </div>
                <h3 className="text-[24px] font-['Montserrat',sans-serif] font-bold text-[#1b1d1f] mb-2">Art</h3>
                <p className="text-[16px] font-['Montserrat',sans-serif] text-[#52565c] font-medium">Over 8 tutors</p>
              </div>
            </div>

            {/* Physical Education */}
            <div className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#FF6636] cursor-pointer">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FF6636]/10 to-[#ff5522]/10 rounded-bl-full -z-0"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FFF5F2] to-[#FFE8E0] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Heart variant="Bold" className="w-8 h-8 text-[#FF6636]" />
                </div>
                <h3 className="text-[24px] font-['Montserrat',sans-serif] font-bold text-[#1b1d1f] mb-2">Physical Education</h3>
                <p className="text-[16px] font-['Montserrat',sans-serif] text-[#52565c] font-medium">Over 12 tutors</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
