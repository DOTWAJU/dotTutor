import React from 'react';
import { ArrowLeft, Profile2User, UserOctagon, ArrowRight2 } from 'iconsax-react';
import Logo from '../../imports/Logo-4004-36';

interface RegisterPageProps {
  onBack?: () => void;
  onLogin?: () => void;
  onSubmit?: (accountType: 'student' | 'tutor') => void;
}

export function RegisterPage({ onBack, onLogin, onSubmit }: RegisterPageProps) {
  const [hoveredCard, setHoveredCard] = React.useState<'student' | 'tutor' | null>(null);

  const handleRoleSelect = (role: 'student' | 'tutor') => {
    if (onSubmit) {
      onSubmit(role);
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Dot Pattern Background */}
      <div 
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `radial-gradient(circle, #FF6636 1.5px, transparent 1.5px)`,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 10px 10px'
        }}
      />
      
      {/* Decorative Gradients - Reduced on Mobile */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-gradient-to-br from-[#FF6636]/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] bg-gradient-to-tr from-[#FF6636]/5 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      {/* Back Button - Top Left */}
      <button
        onClick={onBack}
        className="fixed top-4 left-4 sm:top-6 sm:left-6 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#FF6636] shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 z-50"
        aria-label="Back to Homepage"
      >
        <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" variant="Bold" />
      </button>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 py-16 sm:py-20 relative z-10">
        <div className="w-full max-w-[900px]">
          <div className="animate-fade-in-up">
            {/* Logo & Header */}
            <div className="text-center mb-10 sm:mb-12">
              <div className="flex justify-center mb-6 sm:mb-8 scale-90 sm:scale-100">
                <Logo />
              </div>
              <p className="font-['Montserrat',sans-serif] text-base sm:text-lg text-[#52565c] max-w-md mx-auto px-4">
                Select your role to get started
              </p>
            </div>

            {/* Role Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-8 sm:mb-12 px-2 sm:px-0">
              {/* Student Card */}
              <button
                onClick={() => handleRoleSelect('student')}
                onMouseEnter={() => setHoveredCard('student')}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 transition-all duration-300 text-left overflow-hidden border-2 border-[#E5E7EB] hover:border-[#FF6636] active:scale-[0.98] touch-manipulation"
                style={{ 
                  boxShadow: hoveredCard === 'student' 
                    ? '0 20px 40px rgba(255, 102, 54, 0.15)' 
                    : '0 4px 12px rgba(0,0,0,0.05)' 
                }}
              >
                {/* Subtle Gradient on Hover */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br from-[#FF6636]/0 to-[#FF6636]/0 transition-all duration-500 ${
                    hoveredCard === 'student' ? 'from-[#FF6636]/5 to-[#FF6636]/10' : ''
                  }`} 
                />
                
                <div className="relative z-10 flex flex-row items-start gap-4 sm:gap-5">
                  {/* Icon */}
                  <div 
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#FFF4F0] to-[#FFE8E0] flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                      hoveredCard === 'student' ? 'scale-110 shadow-lg' : 'shadow-md'
                    }`}
                  >
                    <Profile2User 
                      className="w-7 h-7 sm:w-8 sm:h-8 text-[#FF6636]" 
                      variant="Bold"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 
                      className={`font-['Montserrat',sans-serif] text-[20px] sm:text-[22px] font-bold mb-2 transition-colors duration-300 ${
                        hoveredCard === 'student' ? 'text-[#FF6636]' : ''
                      }`}
                      style={{ color: hoveredCard === 'student' ? undefined : 'rgb(1, 27, 51)' }}
                    >
                      Student
                    </h3>
                    <p className="font-['Montserrat',sans-serif] text-[13px] sm:text-sm text-[#52565c] leading-relaxed mb-4">
                      Access personalized learning resources and connect with expert tutors
                    </p>
                    
                    {/* Arrow CTA */}
                    <div className="flex items-center gap-2 text-[#FF6636] font-['Montserrat',sans-serif] font-semibold text-[13px] sm:text-sm">
                      <span>Get Started</span>
                      <ArrowRight2 
                        className={`w-4 h-4 transition-transform duration-300 ${
                          hoveredCard === 'student' ? 'translate-x-1' : ''
                        }`}
                        variant="Bold"
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom Border Indicator */}
                <div 
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF6636] to-[#ff5522] transition-all duration-300 ${
                    hoveredCard === 'student' ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </button>

              {/* Tutor Card */}
              <button
                onClick={() => handleRoleSelect('tutor')}
                onMouseEnter={() => setHoveredCard('tutor')}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 transition-all duration-300 text-left overflow-hidden border-2 border-[#E5E7EB] hover:border-[#FF6636] active:scale-[0.98] touch-manipulation"
                style={{ 
                  boxShadow: hoveredCard === 'tutor' 
                    ? '0 20px 40px rgba(255, 102, 54, 0.15)' 
                    : '0 4px 12px rgba(0,0,0,0.05)' 
                }}
              >
                {/* Subtle Gradient on Hover */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br from-[#FF6636]/0 to-[#FF6636]/0 transition-all duration-500 ${
                    hoveredCard === 'tutor' ? 'from-[#FF6636]/5 to-[#FF6636]/10' : ''
                  }`} 
                />
                
                <div className="relative z-10 flex flex-row items-start gap-4 sm:gap-5">
                  {/* Icon */}
                  <div 
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#FFF4F0] to-[#FFE8E0] flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                      hoveredCard === 'tutor' ? 'scale-110 shadow-lg' : 'shadow-md'
                    }`}
                  >
                    <UserOctagon 
                      className="w-7 h-7 sm:w-8 sm:h-8 text-[#FF6636]" 
                      variant="Bold"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 
                      className={`font-['Montserrat',sans-serif] text-[20px] sm:text-[22px] font-bold mb-2 transition-colors duration-300 ${
                        hoveredCard === 'tutor' ? 'text-[#FF6636]' : ''
                      }`}
                      style={{ color: hoveredCard === 'tutor' ? undefined : 'rgb(1, 27, 51)' }}
                    >
                      Tutor
                    </h3>
                    <p className="font-['Montserrat',sans-serif] text-[13px] sm:text-sm text-[#52565c] leading-relaxed mb-4">
                      Share your expertise, help students succeed, and earn income
                    </p>
                    
                    {/* Arrow CTA */}
                    <div className="flex items-center gap-2 text-[#FF6636] font-['Montserrat',sans-serif] font-semibold text-[13px] sm:text-sm">
                      <span>Get Started</span>
                      <ArrowRight2 
                        className={`w-4 h-4 transition-transform duration-300 ${
                          hoveredCard === 'tutor' ? 'translate-x-1' : ''
                        }`}
                        variant="Bold"
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom Border Indicator */}
                <div 
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF6636] to-[#ff5522] transition-all duration-300 ${
                    hoveredCard === 'tutor' ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 sm:gap-4 my-8 sm:my-10 px-4">
              <div className="h-px bg-[#E5E7EB] flex-1"></div>
              <span className="font-['Montserrat',sans-serif] text-xs sm:text-sm text-[#9CA3AF]">or</span>
              <div className="h-px bg-[#E5E7EB] flex-1"></div>
            </div>

            {/* Login Link */}
            <div className="text-center px-4">
              <p className="font-['Montserrat',sans-serif] text-sm sm:text-[15px] text-[#52565c]">
                Already have an account?{' '}
                <button 
                  onClick={onLogin}
                  className="text-[#FF6636] font-semibold hover:text-[#ff5522] active:text-[#ff4411] transition-colors inline-flex items-center gap-1 underline-offset-2 hover:underline"
                >
                  Sign in
                  <ArrowRight2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" variant="Bold" />
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}