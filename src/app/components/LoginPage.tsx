import React from 'react';
import { ArrowLeft, Sms, Lock, Eye, EyeSlash, TickCircle } from 'iconsax-react';
import Logo from '../imports/Logo-4004-36';

interface LoginPageProps {
  onBack?: () => void;
  onRegister?: () => void;
  onForgotPassword?: () => void;
  onSubmit?: (data: { email: string; password: string }) => void;
}

export function LoginPage({ onBack, onRegister, onForgotPassword, onSubmit }: LoginPageProps) {
  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = React.useState(false);
  const [focusedField, setFocusedField] = React.useState<string | null>(null);
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Validation
  const validations = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
    password: formData.password.length >= 6
  };

  const isFormValid = Object.values(validations).every(v => v);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    setFocusedField(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (onSubmit) {
      onSubmit({
        email: formData.email,
        password: formData.password
      });
    }
    
    setIsSubmitting(false);
  };

  const getFieldStatus = (field: keyof typeof validations) => {
    if (!touched[field] && focusedField !== field) return 'default';
    if (focusedField === field) return 'focused';
    return validations[field] ? 'valid' : 'invalid';
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Dot Pattern Background */}
      <div 
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `radial-gradient(circle, #FF6636 1.5px, transparent 1.5px)`,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 10px 10px'
        }}
      />
      
      {/* Decorative Gradients */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-gradient-to-br from-[#FF6636]/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] bg-gradient-to-tr from-[#FF6636]/5 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      {/* Back Button */}
      <button
        onClick={onBack}
        className="fixed top-4 left-4 sm:top-6 sm:left-6 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 z-50 border border-[#E5E7EB]"
        aria-label="Back"
      >
        <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF6636]" variant="Bold" />
      </button>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="w-full max-w-[520px]">
          {/* Logo - Centered */}
          <div className="flex justify-center mb-10 sm:mb-12">
            <Logo />
          </div>

          {/* Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-8 shadow-sm hover:shadow-xl border border-[#E5E7EB]/50 transition-all duration-500">
            {/* Form Header */}
            <div className="mb-6 sm:mb-8">
              <h1 
                className="text-[26px] sm:text-[30px] lg:text-[28px] font-bold mb-2"
                style={{ color: 'rgb(1, 27, 51)' }}
              >
                Sign In
              </h1>
              <p className="text-[14px] sm:text-[15px] text-[#52565c]">
                Enter your credentials to access your account
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Email */}
              <div className="group">
                <label 
                  htmlFor="email" 
                  className="block text-[13px] sm:text-sm font-semibold mb-2 transition-colors duration-200"
                  style={{ color: focusedField === 'email' ? '#FF6636' : 'rgb(1, 27, 51)' }}
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 z-10 transition-transform duration-200 group-focus-within:scale-110">
                    <Sms 
                      className="w-[18px] h-[18px] sm:w-5 sm:h-5 text-[#FF6636] transition-transform duration-200"
                      variant={getFieldStatus('email') === 'focused' ? 'Bold' : 'Linear'}
                    />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => handleBlur('email')}
                    placeholder="you@example.com"
                    className={`w-full h-12 sm:h-14 pl-11 sm:pl-12 pr-11 sm:pr-12 rounded-xl border text-[14px] sm:text-[15px] transition-all duration-300 outline-none bg-white/50 backdrop-blur-sm ${ 
                      getFieldStatus('email') === 'focused' ? 'border-[#FF6636] shadow-lg shadow-[#FF6636]/10 bg-white' :
                      getFieldStatus('email') === 'valid' ? 'border-green-400 bg-white' :
                      getFieldStatus('email') === 'invalid' ? 'border-red-400' :
                      'border-[#E5E7EB] hover:border-[#FF6636]/40 hover:bg-white'
                    }`}
                    style={{ color: 'rgb(1, 27, 51)' }}
                  />
                  {getFieldStatus('email') === 'valid' && (
                    <div className="absolute right-3.5 sm:right-4 top-1/2 -translate-y-1/2 animate-in fade-in zoom-in duration-300">
                      <TickCircle className="w-[18px] h-[18px] sm:w-5 sm:h-5 text-green-500" variant="Bold" />
                    </div>
                  )}
                </div>
                {touched.email && !validations.email && (
                  <p className="text-[11px] sm:text-xs text-red-500 mt-1.5 ml-1 animate-in slide-in-from-top-1 duration-200">Please enter a valid email address</p>
                )}
              </div>

              {/* Password */}
              <div className="group">
                <label 
                  htmlFor="password" 
                  className="block text-[13px] sm:text-sm font-semibold mb-2 transition-colors duration-200"
                  style={{ color: focusedField === 'password' ? '#FF6636' : 'rgb(1, 27, 51)' }}
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 z-10 transition-transform duration-200 group-focus-within:scale-110">
                    <Lock 
                      className="w-[18px] h-[18px] sm:w-5 sm:h-5 text-[#FF6636] transition-transform duration-200"
                      variant={getFieldStatus('password') === 'focused' ? 'Bold' : 'Linear'}
                    />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => handleBlur('password')}
                    placeholder="Enter your password"
                    className={`w-full h-12 sm:h-14 pl-11 sm:pl-12 pr-11 sm:pr-12 rounded-xl border text-[14px] sm:text-[15px] transition-all duration-300 outline-none bg-white/50 backdrop-blur-sm ${ 
                      getFieldStatus('password') === 'focused' ? 'border-[#FF6636] shadow-lg shadow-[#FF6636]/10 bg-white' :
                      getFieldStatus('password') === 'valid' ? 'border-green-400 bg-white' :
                      getFieldStatus('password') === 'invalid' ? 'border-red-400' :
                      'border-[#E5E7EB] hover:border-[#FF6636]/40 hover:bg-white'
                    }`}
                    style={{ color: 'rgb(1, 27, 51)' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 sm:right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#FF6636] transition-all duration-200 hover:scale-110 active:scale-95"
                  >
                    {showPassword ? (
                      <EyeSlash className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
                    ) : (
                      <Eye className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
                    )}
                  </button>
                </div>
                {touched.password && !validations.password && (
                  <p className="text-[11px] sm:text-xs text-red-500 mt-1.5 ml-1 animate-in slide-in-from-top-1 duration-200">Password must be at least 6 characters</p>
                )}
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onForgotPassword}
                  className="text-[13px] sm:text-sm text-[#FF6636] font-semibold hover:text-[#ff5522] active:text-[#ff4411] transition-all duration-200 hover:underline underline-offset-2"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className={`w-full h-12 sm:h-14 rounded-xl font-semibold text-[14px] sm:text-base transition-all duration-300 mt-6 sm:mt-8 ${ 
                  isFormValid && !isSubmitting
                    ? 'bg-[#FF6636] text-white hover:bg-[#ff5522] hover:shadow-xl hover:shadow-[#FF6636]/40 hover:scale-[1.02] active:scale-[0.98]'
                    : 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Signing In...</span>
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5 sm:my-6">
              <div className="h-px bg-[#E5E7EB] flex-1"></div>
              <span className="text-[11px] sm:text-xs text-[#9CA3AF] font-medium">or</span>
              <div className="h-px bg-[#E5E7EB] flex-1"></div>
            </div>

            {/* Register Link */}
            <div className="text-center">
              <p className="text-[13px] sm:text-sm text-[#52565c]">
                Don't have an account?{' '}
                <button 
                  onClick={onRegister}
                  className="text-[#FF6636] font-semibold hover:text-[#ff5522] active:text-[#ff4411] transition-all duration-200 hover:underline underline-offset-2 inline-flex items-center gap-1 group"
                >
                  Create account
                  <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
