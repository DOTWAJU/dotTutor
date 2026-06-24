import React from 'react';
import {
  ArrowLeft,
  User,
  Sms,
  Lock,
  Eye,
  EyeSlash,
  TickCircle,
  Call,
  Location,
  ArrowDown2,
  DocumentUpload,
  ShieldTick,
  Book1,
  Teacher,
  Global,
  Moneys,
} from 'iconsax-react';
import Logo from '../imports/Logo-4004-36';
import { CustomDropdown } from './student/CustomDropdown';
import { TutorRegistrationStep2 } from './TutorRegistrationStep2New';

interface TutorRegistrationPageProps {
  onComplete?: () => void;
  onBackToLogin?: () => void;
  onAccountCreated?: (basicInfo: any, academicInfo: any) => void;
}

export function TutorRegistrationPage({ onComplete, onBackToLogin, onAccountCreated }: TutorRegistrationPageProps) {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);
  const [focusedField, setFocusedField] = React.useState<string | null>(null);
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});

  // Form Data State
  const [basicInfo, setBasicInfo] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    password: '',
    confirmPassword: '',
    gender: '',
  });

  const [academicInfo, setAcademicInfo] = React.useState({
    biography: '',
    subjectsToTeach: [] as string[],
    levelsOfEducation: [] as string[],
    languages: '',
    highestDegree: '',
    lessonMode: '',
    currency: '',
    costPerLesson: '',
    courseOfStudy: '',
    institution: '',
    graduationYear: '',
    cvResume: null as File | null,
    availableDays: [] as string[],
    availableTimes: {} as { [key: string]: string[] },
  });

  const [confirmation, setConfirmation] = React.useState({
    agreedToTerms: false,
  });

  // Validation
  const step1Validations = {
    firstName: basicInfo.firstName.trim().length >= 2,
    lastName: basicInfo.lastName.trim().length >= 2,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(basicInfo.email),
    phoneNumber: basicInfo.phoneNumber.trim().length >= 10,
    address: basicInfo.address.trim().length >= 5,
    password: basicInfo.password.length >= 8,
    confirmPassword: basicInfo.confirmPassword === basicInfo.password && basicInfo.password.length > 0,
    gender: basicInfo.gender !== '',
  };

  const step2Validations = {
    biography: academicInfo.biography.trim().length >= 50,
    subjectsToTeach: academicInfo.subjectsToTeach.length > 0,
    levelsOfEducation: academicInfo.levelsOfEducation.length > 0,
    lessonMode: academicInfo.lessonMode !== '',
    currency: academicInfo.currency !== '',
    costPerLesson: academicInfo.costPerLesson !== '',
    highestDegree: academicInfo.highestDegree !== '',
    courseOfStudy: academicInfo.courseOfStudy.trim().length >= 2,
    institution: academicInfo.institution.trim().length >= 2,
  };

  const isStep1Valid = Object.values(step1Validations).every(v => v);
  const isStep2Valid = Object.values(step2Validations).every(v => v);

  const availableSubjects = [
    'Mathematics',
    'English',
    'Physics',
    'Chemistry',
    'Biology',
    'Computer Science',
    'Economics',
    'Business Studies',
    'Literature',
    'History',
    'Geography',
    'Government',
    'Music',
    'Art',
    'French',
    'Spanish',
  ];

  const educationLevels = [
    'Primary Education',
    'Secondary Education',
    'High School',
    'Undergraduate',
    'Postgraduate',
  ];

  const lessonModeOptions = [
    'Select lesson mode...',
    'Online',
    'In-Person',
    'Hybrid',
  ];

  const currencyOptions = [
    'Select currency...',
    'Dollars ($)',
    'Pounds (£)',
    'Naira (₦)',
  ];

  const languageOptions = [
    'Select language...',
    'English',
    'Yoruba',
    'Igbo',
    'Hausa',
    'French',
    'Spanish',
    'Arabic',
  ];

  const degreeOptions = [
    'Select degree...',
    'High School Diploma',
    'Associate Degree',
    "Bachelor's Degree",
    "Master's Degree",
    'PhD / Doctorate',
  ];

  const genderOptions = ['Select gender...', 'Male', 'Female'];

  const handleChange = (field: string, value: string, section: 'basic' | 'academic') => {
    if (section === 'basic') {
      setBasicInfo(prev => ({ ...prev, [field]: value }));
    } else {
      setAcademicInfo(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    setFocusedField(null);
  };

  const getFieldStatus = (field: string, validations: any) => {
    if (!touched[field] && focusedField !== field) return 'default';
    if (focusedField === field) return 'focused';
    return validations[field] ? 'valid' : 'invalid';
  };

  const handleCvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAcademicInfo({ ...academicInfo, cvResume: e.target.files[0] });
    }
  };

  const handleBasicInfoSubmit = () => {
    // Mark all fields as touched
    const allFields = Object.keys(step1Validations);
    const newTouched: Record<string, boolean> = {};
    allFields.forEach(field => {
      newTouched[field] = true;
    });
    setTouched(newTouched);

    if (!isStep1Valid) {
      return;
    }
    
    // Create account and redirect to dashboard
    if (onAccountCreated) {
      onAccountCreated(basicInfo, academicInfo);
    }
  };

  const handleAcademicInfoSubmit = () => {
    // Mark all fields as touched
    const allFields = Object.keys(step2Validations);
    const newTouched: Record<string, boolean> = {};
    allFields.forEach(field => {
      newTouched[field] = true;
    });
    setTouched(prev => ({ ...prev, ...newTouched }));

    if (!isStep2Valid) {
      return;
    }
    setCurrentStep(3);
  };

  const handleFinalSubmit = () => {
    if (!confirmation.agreedToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }
    console.log('Registration Data:', { basicInfo, academicInfo, confirmation });
    setShowSuccessModal(true);
    if (onAccountCreated) {
      onAccountCreated(basicInfo, academicInfo);
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Dot Pattern Background */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `radial-gradient(circle, #FF6636 1.5px, transparent 1.5px)`,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 10px 10px',
        }}
      />

      {/* Decorative Gradients */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-gradient-to-br from-[#FF6636]/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] bg-gradient-to-tr from-[#FF6636]/5 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      {/* Back Button */}
      <button
        onClick={onBackToLogin}
        className="fixed top-4 left-4 sm:top-6 sm:left-6 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 z-50 border border-[#E5E7EB]"
        aria-label="Back"
      >
        <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF6636]" variant="Bold" />
      </button>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="w-full max-w-[900px]">
          {/* Logo */}
          <div className="flex justify-center mb-8 sm:mb-10">
            <Logo />
          </div>

          {/* Progress Steps */}
          <div className="mb-8 sm:mb-10">
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              {[1, 2, 3].map((step, index) => (
                <div key={step} className="flex items-center gap-2 sm:gap-3">
                  <div
                    className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full font-bold text-sm sm:text-base transition-all duration-300 ${
                      currentStep === step
                        ? 'bg-[#FF6636] text-white shadow-lg shadow-[#FF6636]/30 scale-110'
                        : currentStep > step
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {currentStep > step ? <TickCircle variant="Bold" className="w-6 h-6" /> : step}
                  </div>
                  {index < 2 && (
                    <div
                      className={`h-1 w-12 sm:w-20 rounded-full transition-all duration-300 ${
                        currentStep > step ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-3 px-2 sm:px-4">
              <p className="text-xs sm:text-sm font-semibold" style={{ color: currentStep === 1 ? '#FF6636' : currentStep > 1 ? '#22c55e' : '#9ca3af' }}>
                Basic Info
              </p>
              <p className="text-xs sm:text-sm font-semibold" style={{ color: currentStep === 2 ? '#FF6636' : currentStep > 2 ? '#22c55e' : '#9ca3af' }}>
                Academic
              </p>
              <p className="text-xs sm:text-sm font-semibold" style={{ color: currentStep === 3 ? '#FF6636' : '#9ca3af' }}>
                Review
              </p>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-8 shadow-sm hover:shadow-xl border border-[#E5E7EB]/50 transition-all duration-500">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div>
                <div className="mb-6 sm:mb-8">
                  <h1 className="text-[26px] sm:text-[30px] lg:text-[28px] font-bold mb-2" style={{ color: 'rgb(1, 27, 51)' }}>
                    Create Tutor Account
                  </h1>
                  <p className="text-[14px] sm:text-[15px] text-[#52565c]">
                    Let's start with your basic information
                  </p>
                </div>

                <form className="space-y-4 sm:space-y-5">
                  {/* First Name & Last Name */}
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                    {/* First Name */}
                    <div className="group">
                      <label
                        htmlFor="firstName"
                        className="block text-[13px] sm:text-sm font-semibold mb-2 transition-colors duration-200"
                        style={{ color: focusedField === 'firstName' ? '#FF6636' : 'rgb(1, 27, 51)' }}
                      >
                        First Name
                      </label>
                      <div className="relative">
                        <div className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 z-10 transition-transform duration-200 group-focus-within:scale-110">
                          <User
                            className="w-[18px] h-[18px] sm:w-5 sm:h-5 text-[#FF6636] transition-transform duration-200"
                            variant={getFieldStatus('firstName', step1Validations) === 'focused' ? 'Bold' : 'Linear'}
                          />
                        </div>
                        <input
                          id="firstName"
                          type="text"
                          value={basicInfo.firstName}
                          onChange={(e) => handleChange('firstName', e.target.value, 'basic')}
                          onFocus={() => setFocusedField('firstName')}
                          onBlur={() => handleBlur('firstName')}
                          placeholder="First name"
                          className={`w-full h-12 sm:h-14 pl-11 sm:pl-12 pr-11 sm:pr-12 rounded-xl border text-[14px] sm:text-[15px] transition-all duration-300 outline-none bg-white/50 backdrop-blur-sm ${
                            getFieldStatus('firstName', step1Validations) === 'focused'
                              ? 'border-[#FF6636] shadow-lg shadow-[#FF6636]/10 bg-white'
                              : getFieldStatus('firstName', step1Validations) === 'valid'
                              ? 'border-green-400 bg-white'
                              : getFieldStatus('firstName', step1Validations) === 'invalid'
                              ? 'border-red-400'
                              : 'border-[#E5E7EB] hover:border-[#FF6636]/40 hover:bg-white'
                          }`}
                          style={{ color: 'rgb(1, 27, 51)' }}
                        />
                        {getFieldStatus('firstName', step1Validations) === 'valid' && (
                          <div className="absolute right-3.5 sm:right-4 top-1/2 -translate-y-1/2 animate-in fade-in zoom-in duration-300">
                            <TickCircle className="w-[18px] h-[18px] sm:w-5 sm:h-5 text-green-500" variant="Bold" />
                          </div>
                        )}
                      </div>
                      {touched.firstName && !step1Validations.firstName && (
                        <p className="text-[11px] sm:text-xs text-red-500 mt-1.5 ml-1 animate-in slide-in-from-top-1 duration-200">
                          First name must be at least 2 characters
                        </p>
                      )}
                    </div>

                    {/* Last Name */}
                    <div className="group">
                      <label
                        htmlFor="lastName"
                        className="block text-[13px] sm:text-sm font-semibold mb-2 transition-colors duration-200"
                        style={{ color: focusedField === 'lastName' ? '#FF6636' : 'rgb(1, 27, 51)' }}
                      >
                        Last Name
                      </label>
                      <div className="relative">
                        <div className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 z-10 transition-transform duration-200 group-focus-within:scale-110">
                          <User
                            className="w-[18px] h-[18px] sm:w-5 sm:h-5 text-[#FF6636] transition-transform duration-200"
                            variant={getFieldStatus('lastName', step1Validations) === 'focused' ? 'Bold' : 'Linear'}
                          />
                        </div>
                        <input
                          id="lastName"
                          type="text"
                          value={basicInfo.lastName}
                          onChange={(e) => handleChange('lastName', e.target.value, 'basic')}
                          onFocus={() => setFocusedField('lastName')}
                          onBlur={() => handleBlur('lastName')}
                          placeholder="Last name"
                          className={`w-full h-12 sm:h-14 pl-11 sm:pl-12 pr-11 sm:pr-12 rounded-xl border text-[14px] sm:text-[15px] transition-all duration-300 outline-none bg-white/50 backdrop-blur-sm ${
                            getFieldStatus('lastName', step1Validations) === 'focused'
                              ? 'border-[#FF6636] shadow-lg shadow-[#FF6636]/10 bg-white'
                              : getFieldStatus('lastName', step1Validations) === 'valid'
                              ? 'border-green-400 bg-white'
                              : getFieldStatus('lastName', step1Validations) === 'invalid'
                              ? 'border-red-400'
                              : 'border-[#E5E7EB] hover:border-[#FF6636]/40 hover:bg-white'
                          }`}
                          style={{ color: 'rgb(1, 27, 51)' }}
                        />
                        {getFieldStatus('lastName', step1Validations) === 'valid' && (
                          <div className="absolute right-3.5 sm:right-4 top-1/2 -translate-y-1/2 animate-in fade-in zoom-in duration-300">
                            <TickCircle className="w-[18px] h-[18px] sm:w-5 sm:h-5 text-green-500" variant="Bold" />
                          </div>
                        )}
                      </div>
                      {touched.lastName && !step1Validations.lastName && (
                        <p className="text-[11px] sm:text-xs text-red-500 mt-1.5 ml-1 animate-in slide-in-from-top-1 duration-200">
                          Last name must be at least 2 characters
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email & Phone Number */}
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
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
                            variant={getFieldStatus('email', step1Validations) === 'focused' ? 'Bold' : 'Linear'}
                          />
                        </div>
                        <input
                          id="email"
                          type="email"
                          value={basicInfo.email}
                          onChange={(e) => handleChange('email', e.target.value, 'basic')}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => handleBlur('email')}
                          placeholder="you@example.com"
                          className={`w-full h-12 sm:h-14 pl-11 sm:pl-12 pr-11 sm:pr-12 rounded-xl border text-[14px] sm:text-[15px] transition-all duration-300 outline-none bg-white/50 backdrop-blur-sm ${
                            getFieldStatus('email', step1Validations) === 'focused'
                              ? 'border-[#FF6636] shadow-lg shadow-[#FF6636]/10 bg-white'
                              : getFieldStatus('email', step1Validations) === 'valid'
                              ? 'border-green-400 bg-white'
                              : getFieldStatus('email', step1Validations) === 'invalid'
                              ? 'border-red-400'
                              : 'border-[#E5E7EB] hover:border-[#FF6636]/40 hover:bg-white'
                          }`}
                          style={{ color: 'rgb(1, 27, 51)' }}
                        />
                        {getFieldStatus('email', step1Validations) === 'valid' && (
                          <div className="absolute right-3.5 sm:right-4 top-1/2 -translate-y-1/2 animate-in fade-in zoom-in duration-300">
                            <TickCircle className="w-[18px] h-[18px] sm:w-5 sm:h-5 text-green-500" variant="Bold" />
                          </div>
                        )}
                      </div>
                      {touched.email && !step1Validations.email && (
                        <p className="text-[11px] sm:text-xs text-red-500 mt-1.5 ml-1 animate-in slide-in-from-top-1 duration-200">
                          Please enter a valid email address
                        </p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div className="group">
                      <label
                        htmlFor="phoneNumber"
                        className="block text-[13px] sm:text-sm font-semibold mb-2 transition-colors duration-200"
                        style={{ color: focusedField === 'phoneNumber' ? '#FF6636' : 'rgb(1, 27, 51)' }}
                      >
                        Phone Number
                      </label>
                      <div className="relative">
                        <div className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 z-10 transition-transform duration-200 group-focus-within:scale-110">
                          <Call
                            className="w-[18px] h-[18px] sm:w-5 sm:h-5 text-[#FF6636] transition-transform duration-200"
                            variant={getFieldStatus('phoneNumber', step1Validations) === 'focused' ? 'Bold' : 'Linear'}
                          />
                        </div>
                        <input
                          id="phoneNumber"
                          type="tel"
                          value={basicInfo.phoneNumber}
                          onChange={(e) => handleChange('phoneNumber', e.target.value, 'basic')}
                          onFocus={() => setFocusedField('phoneNumber')}
                          onBlur={() => handleBlur('phoneNumber')}
                          placeholder="+234 800 000 0000"
                          className={`w-full h-12 sm:h-14 pl-11 sm:pl-12 pr-11 sm:pr-12 rounded-xl border text-[14px] sm:text-[15px] transition-all duration-300 outline-none bg-white/50 backdrop-blur-sm ${
                            getFieldStatus('phoneNumber', step1Validations) === 'focused'
                              ? 'border-[#FF6636] shadow-lg shadow-[#FF6636]/10 bg-white'
                              : getFieldStatus('phoneNumber', step1Validations) === 'valid'
                              ? 'border-green-400 bg-white'
                              : getFieldStatus('phoneNumber', step1Validations) === 'invalid'
                              ? 'border-red-400'
                              : 'border-[#E5E7EB] hover:border-[#FF6636]/40 hover:bg-white'
                          }`}
                          style={{ color: 'rgb(1, 27, 51)' }}
                        />
                        {getFieldStatus('phoneNumber', step1Validations) === 'valid' && (
                          <div className="absolute right-3.5 sm:right-4 top-1/2 -translate-y-1/2 animate-in fade-in zoom-in duration-300">
                            <TickCircle className="w-[18px] h-[18px] sm:w-5 sm:h-5 text-green-500" variant="Bold" />
                          </div>
                        )}
                      </div>
                      {touched.phoneNumber && !step1Validations.phoneNumber && (
                        <p className="text-[11px] sm:text-xs text-red-500 mt-1.5 ml-1 animate-in slide-in-from-top-1 duration-200">
                          Phone number must be at least 10 digits
                        </p>
                      )}
                    </div>

                  </div>

                  {/* Address & Gender */}
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                    {/* Address */}
                    <div className="group">
                      <label
                        htmlFor="address"
                        className="block text-[13px] sm:text-sm font-semibold mb-2 transition-colors duration-200"
                        style={{ color: focusedField === 'address' ? '#FF6636' : 'rgb(1, 27, 51)' }}
                      >
                        Address
                      </label>
                      <div className="relative">
                        <div className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 z-10 transition-transform duration-200 group-focus-within:scale-110">
                          <Location
                            className="w-[18px] h-[18px] sm:w-5 sm:h-5 text-[#FF6636] transition-transform duration-200"
                            variant={getFieldStatus('address', step1Validations) === 'focused' ? 'Bold' : 'Linear'}
                          />
                        </div>
                        <input
                          id="address"
                          type="text"
                          value={basicInfo.address}
                          onChange={(e) => handleChange('address', e.target.value, 'basic')}
                          onFocus={() => setFocusedField('address')}
                          onBlur={() => handleBlur('address')}
                          placeholder="Your address"
                          className={`w-full h-12 sm:h-14 pl-11 sm:pl-12 pr-11 sm:pr-12 rounded-xl border text-[14px] sm:text-[15px] transition-all duration-300 outline-none bg-white/50 backdrop-blur-sm ${
                            getFieldStatus('address', step1Validations) === 'focused'
                              ? 'border-[#FF6636] shadow-lg shadow-[#FF6636]/10 bg-white'
                              : getFieldStatus('address', step1Validations) === 'valid'
                              ? 'border-green-400 bg-white'
                              : getFieldStatus('address', step1Validations) === 'invalid'
                              ? 'border-red-400'
                              : 'border-[#E5E7EB] hover:border-[#FF6636]/40 hover:bg-white'
                          }`}
                          style={{ color: 'rgb(1, 27, 51)' }}
                        />
                        {getFieldStatus('address', step1Validations) === 'valid' && (
                          <div className="absolute right-3.5 sm:right-4 top-1/2 -translate-y-1/2 animate-in fade-in zoom-in duration-300">
                            <TickCircle className="w-[18px] h-[18px] sm:w-5 sm:h-5 text-green-500" variant="Bold" />
                          </div>
                        )}
                      </div>
                      {touched.address && !step1Validations.address && (
                        <p className="text-[11px] sm:text-xs text-red-500 mt-1.5 ml-1 animate-in slide-in-from-top-1 duration-200">
                          Address must be at least 5 characters
                        </p>
                      )}
                    </div>

                    {/* Gender */}
                    <div>
                      <CustomDropdown
                        label="Gender"
                        value={basicInfo.gender}
                        options={genderOptions}
                        onChange={(value) => {
                          handleChange('gender', value === 'Select gender...' ? '' : value, 'basic');
                          setTouched(prev => ({ ...prev, gender: true }));
                        }}
                        required
                      />
                      {touched.gender && !step1Validations.gender && (
                        <p className="text-[11px] sm:text-xs text-red-500 mt-1.5 ml-1 animate-in slide-in-from-top-1 duration-200">
                          Please select your gender
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Password & Confirm Password */}
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
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
                            variant={getFieldStatus('password', step1Validations) === 'focused' ? 'Bold' : 'Linear'}
                          />
                        </div>
                        <input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          value={basicInfo.password}
                          onChange={(e) => handleChange('password', e.target.value, 'basic')}
                          onFocus={() => setFocusedField('password')}
                          onBlur={() => handleBlur('password')}
                          placeholder="Min. 8 characters"
                          className={`w-full h-12 sm:h-14 pl-11 sm:pl-12 pr-11 sm:pr-12 rounded-xl border text-[14px] sm:text-[15px] transition-all duration-300 outline-none bg-white/50 backdrop-blur-sm ${
                            getFieldStatus('password', step1Validations) === 'focused'
                              ? 'border-[#FF6636] shadow-lg shadow-[#FF6636]/10 bg-white'
                              : getFieldStatus('password', step1Validations) === 'valid'
                              ? 'border-green-400 bg-white'
                              : getFieldStatus('password', step1Validations) === 'invalid'
                              ? 'border-red-400'
                              : 'border-[#E5E7EB] hover:border-[#FF6636]/40 hover:bg-white'
                          }`}
                          style={{ color: 'rgb(1, 27, 51)' }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#FF6636] transition-colors duration-200"
                        >
                          {showPassword ? (
                            <EyeSlash className="w-[18px] h-[18px] sm:w-5 sm:h-5" variant="Linear" />
                          ) : (
                            <Eye className="w-[18px] h-[18px] sm:w-5 sm:h-5" variant="Linear" />
                          )}
                        </button>
                      </div>
                      {touched.password && !step1Validations.password && (
                        <p className="text-[11px] sm:text-xs text-red-500 mt-1.5 ml-1 animate-in slide-in-from-top-1 duration-200">
                          Password must be at least 8 characters
                        </p>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div className="group">
                      <label
                        htmlFor="confirmPassword"
                        className="block text-[13px] sm:text-sm font-semibold mb-2 transition-colors duration-200"
                        style={{ color: focusedField === 'confirmPassword' ? '#FF6636' : 'rgb(1, 27, 51)' }}
                      >
                        Confirm Password
                      </label>
                      <div className="relative">
                        <div className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 z-10 transition-transform duration-200 group-focus-within:scale-110">
                          <Lock
                            className="w-[18px] h-[18px] sm:w-5 sm:h-5 text-[#FF6636] transition-transform duration-200"
                            variant={getFieldStatus('confirmPassword', step1Validations) === 'focused' ? 'Bold' : 'Linear'}
                          />
                        </div>
                        <input
                          id="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={basicInfo.confirmPassword}
                          onChange={(e) => handleChange('confirmPassword', e.target.value, 'basic')}
                          onFocus={() => setFocusedField('confirmPassword')}
                          onBlur={() => handleBlur('confirmPassword')}
                          placeholder="Re-enter password"
                          className={`w-full h-12 sm:h-14 pl-11 sm:pl-12 pr-11 sm:pr-12 rounded-xl border text-[14px] sm:text-[15px] transition-all duration-300 outline-none bg-white/50 backdrop-blur-sm ${
                            getFieldStatus('confirmPassword', step1Validations) === 'focused'
                              ? 'border-[#FF6636] shadow-lg shadow-[#FF6636]/10 bg-white'
                              : getFieldStatus('confirmPassword', step1Validations) === 'valid'
                              ? 'border-green-400 bg-white'
                              : getFieldStatus('confirmPassword', step1Validations) === 'invalid'
                              ? 'border-red-400'
                              : 'border-[#E5E7EB] hover:border-[#FF6636]/40 hover:bg-white'
                          }`}
                          style={{ color: 'rgb(1, 27, 51)' }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3.5 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#FF6636] transition-colors duration-200"
                        >
                          {showConfirmPassword ? (
                            <EyeSlash className="w-[18px] h-[18px] sm:w-5 sm:h-5" variant="Linear" />
                          ) : (
                            <Eye className="w-[18px] h-[18px] sm:w-5 sm:h-5" variant="Linear" />
                          )}
                        </button>
                      </div>
                      {touched.confirmPassword && !step1Validations.confirmPassword && (
                        <p className="text-[11px] sm:text-xs text-red-500 mt-1.5 ml-1 animate-in slide-in-from-top-1 duration-200">
                          Passwords do not match
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Create Account Button - Small, Right Aligned */}
                  <div className="pt-4 sm:pt-6 flex justify-end">
                    <button
                      type="button"
                      onClick={handleBasicInfoSubmit}
                      disabled={!isStep1Valid}
                      className={`w-auto px-6 sm:px-8 h-11 sm:h-12 rounded-xl font-bold text-[14px] sm:text-[15px] transition-all duration-300 ${
                        isStep1Valid
                          ? 'bg-[#FF6636] text-white hover:bg-[#E55A2B] hover:shadow-lg hover:shadow-[#FF6636]/30 active:scale-[0.98]'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Create Account
                    </button>
                  </div>
                </form>

                {/* Login Link */}
                {onBackToLogin && (
                  <div className="mt-6 text-center">
                    <p className="text-[13px] sm:text-sm text-[#52565c]">
                      Already have an account?{' '}
                      <button onClick={onBackToLogin} className="text-[#FF6636] font-semibold hover:underline">
                        Sign In
                      </button>
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Academic Information */}
            {currentStep === 2 && (
              <TutorRegistrationStep2
                academicInfo={academicInfo}
                handleChange={handleChange}
                handleBlur={handleBlur}
                setFocusedField={setFocusedField}
                setTouched={setTouched}
                focusedField={focusedField}
                touched={touched}
                step2Validations={step2Validations}
                getFieldStatus={getFieldStatus}
                handleCvUpload={handleCvUpload}
                setCurrentStep={setCurrentStep}
                handleAcademicInfoSubmit={handleAcademicInfoSubmit}
                isStep2Valid={isStep2Valid}
                availableSubjects={availableSubjects}
                educationLevels={educationLevels}
                lessonModeOptions={lessonModeOptions}
                currencyOptions={currencyOptions}
                languageOptions={languageOptions}
                degreeOptions={degreeOptions}
              />
            )}

            {/* Step 3: Review & Confirm */}
            {currentStep === 3 && (
              <div>
                <div className="mb-6 sm:mb-8">
                  <h1 className="text-[26px] sm:text-[30px] lg:text-[28px] font-bold mb-2" style={{ color: 'rgb(1, 27, 51)' }}>
                    Review & Confirm
                  </h1>
                  <p className="text-[14px] sm:text-[15px] text-[#52565c]">Please review your information before submitting</p>
                </div>

                {/* Summary Cards */}
                <div className="space-y-4 mb-6">
                  {/* Basic Info Summary */}
                  <div className="bg-gradient-to-br from-[#FFF5F2] to-[#FFE8E0] rounded-2xl p-5 sm:p-6 border border-[#FF6636]/20">
                    <div className="flex items-center gap-2 mb-4">
                      <User className="w-5 h-5 text-[#FF6636]" variant="Bold" />
                      <h3 className="font-bold text-[15px] sm:text-base" style={{ color: 'rgb(1, 27, 51)' }}>
                        Basic Information
                      </h3>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3 text-[13px] sm:text-sm">
                      <div>
                        <p className="text-[#6e7485] mb-1">Full Name</p>
                        <p className="font-semibold" style={{ color: 'rgb(1, 27, 51)' }}>
                          {basicInfo.firstName} {basicInfo.lastName}
                        </p>
                      </div>
                      <div>
                        <p className="text-[#6e7485] mb-1">Email</p>
                        <p className="font-semibold" style={{ color: 'rgb(1, 27, 51)' }}>
                          {basicInfo.email}
                        </p>
                      </div>
                      <div>
                        <p className="text-[#6e7485] mb-1">Phone</p>
                        <p className="font-semibold" style={{ color: 'rgb(1, 27, 51)' }}>
                          {basicInfo.phoneNumber}
                        </p>
                      </div>
                      <div>
                        <p className="text-[#6e7485] mb-1">Gender</p>
                        <p className="font-semibold" style={{ color: 'rgb(1, 27, 51)' }}>
                          {basicInfo.gender}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Academic Info Summary */}
                  <div className="bg-gradient-to-br from-[#F0F9FF] to-[#E0F2FE] rounded-2xl p-5 sm:p-6 border border-blue-200">
                    <div className="flex items-center gap-2 mb-4">
                      <Book1 className="w-5 h-5 text-blue-500" variant="Bold" />
                      <h3 className="font-bold text-[15px] sm:text-base" style={{ color: 'rgb(1, 27, 51)' }}>
                        Academic Information
                      </h3>
                    </div>
                    <div className="space-y-3 text-[13px] sm:text-sm">
                      <div>
                        <p className="text-[#6e7485] mb-1">Biography</p>
                        <p className="font-medium line-clamp-2" style={{ color: 'rgb(1, 27, 51)' }}>
                          {academicInfo.biography || 'Not provided'}
                        </p>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-[#6e7485] mb-1">Subjects to Teach</p>
                          <div className="flex flex-wrap gap-2">
                            {academicInfo.subjectsToTeach.length > 0 ? (
                              academicInfo.subjectsToTeach.map((subject) => (
                                <span
                                  key={subject}
                                  className="px-3 py-1.5 bg-[#FF6636]/10 text-[#FF6636] rounded-lg text-sm font-semibold"
                                >
                                  {subject}
                                </span>
                              ))
                            ) : (
                              <p className="font-semibold text-gray-400">Not selected</p>
                            )}
                          </div>
                        </div>
                        <div>
                          <p className="text-[#6e7485] mb-1">Levels of Education</p>
                          <div className="flex flex-wrap gap-2">
                            {academicInfo.levelsOfEducation.length > 0 ? (
                              academicInfo.levelsOfEducation.map((level) => (
                                <span
                                  key={level}
                                  className="px-3 py-1.5 bg-[#FF6636]/10 text-[#FF6636] rounded-lg text-sm font-semibold"
                                >
                                  {level}
                                </span>
                              ))
                            ) : (
                              <p className="font-semibold text-gray-400">Not selected</p>
                            )}
                          </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-3">
                          <div>
                            <p className="text-[#6e7485] mb-1">Lesson Mode</p>
                            <p className="font-semibold" style={{ color: 'rgb(1, 27, 51)' }}>
                              {academicInfo.lessonMode || 'Not selected'}
                            </p>
                          </div>
                          <div>
                            <p className="text-[#6e7485] mb-1">Cost Per Lesson</p>
                            <p className="font-semibold" style={{ color: 'rgb(1, 27, 51)' }}>
                              {academicInfo.costPerLesson ? `₦${academicInfo.costPerLesson}` : 'Not provided'}
                            </p>
                          </div>
                          <div>
                            <p className="text-[#6e7485] mb-1">Highest Degree</p>
                            <p className="font-semibold" style={{ color: 'rgb(1, 27, 51)' }}>
                              {academicInfo.highestDegree || 'Not selected'}
                            </p>
                          </div>
                          <div>
                            <p className="text-[#6e7485] mb-1">Course of Study</p>
                            <p className="font-semibold" style={{ color: 'rgb(1, 27, 51)' }}>
                              {academicInfo.courseOfStudy || 'Not provided'}
                            </p>
                          </div>
                          <div>
                            <p className="text-[#6e7485] mb-1">Institution</p>
                            <p className="font-semibold" style={{ color: 'rgb(1, 27, 51)' }}>
                              {academicInfo.institution || 'Not provided'}
                            </p>
                          </div>
                          <div>
                            <p className="text-[#6e7485] mb-1">Year of Graduation</p>
                            <p className="font-semibold" style={{ color: 'rgb(1, 27, 51)' }}>
                              {academicInfo.graduationYear || 'Not provided'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Terms & Conditions */}
                <div className="bg-gray-50 rounded-xl p-5 mb-6">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={confirmation.agreedToTerms}
                      onChange={(e) => setConfirmation({ ...confirmation, agreedToTerms: e.target.checked })}
                      className="mt-0.5 w-5 h-5 accent-[#FF6636] cursor-pointer rounded border-2 border-gray-300 focus:ring-2 focus:ring-[#FF6636] focus:ring-offset-2 transition-all"
                    />
                    <span className="text-[13px] sm:text-sm text-[#52565c] leading-relaxed">
                      I agree to the{' '}
                      <a href="#" className="text-[#FF6636] font-semibold hover:underline">
                        Terms and Conditions
                      </a>{' '}
                      and{' '}
                      <a href="#" className="text-[#FF6636] font-semibold hover:underline">
                        Privacy Policy
                      </a>
                      . I understand that my profile will be reviewed before being published on the platform.
                    </span>
                  </label>
                </div>

                {/* Navigation Buttons - Small, Far Left and Far Right */}
                <div className="flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="w-auto px-6 sm:px-8 h-11 sm:h-12 rounded-xl font-bold text-[14px] sm:text-[15px] border-2 border-[#E5E7EB] text-[#52565c] hover:border-[#FF6636] hover:text-[#FF6636] transition-all duration-300 active:scale-[0.98]"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleFinalSubmit}
                    disabled={!confirmation.agreedToTerms}
                    className={`w-auto px-6 sm:px-8 h-11 sm:h-12 rounded-xl font-bold text-[14px] sm:text-[15px] transition-all duration-300 ${
                      confirmation.agreedToTerms
                        ? 'bg-[#FF6636] text-white hover:bg-[#E55A2B] hover:shadow-lg hover:shadow-[#FF6636]/30 active:scale-[0.98]'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Submit Application
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[32px] p-8 sm:p-10 md:p-12 max-w-md w-full shadow-2xl animate-in zoom-in duration-300">
            {/* Shield Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-br from-[#FF6636] to-[#E55A2B] rounded-full flex items-center justify-center shadow-lg shadow-[#FF6636]/30 animate-in zoom-in duration-500 delay-100">
                <ShieldTick className="w-12 h-12 sm:w-14 sm:h-14 text-white" variant="Bold" />
              </div>
            </div>

            {/* Text Content */}
            <div className="text-center space-y-3 mb-6">
              <h2 className="text-xl sm:text-2xl font-bold" style={{ color: 'rgb(1, 27, 51)' }}>
                Application Awaiting Approval
              </h2>
              <p className="text-sm sm:text-base text-[#6b7280]">Thank You For Submitting Your Application.</p>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-[#6b7280] text-center mb-8 leading-relaxed">
              To get your teaching profile approved on-time on Dot-tutor, you need to book a session with our onboarding team.
            </p>

            {/* CTA Button */}
            <button
              onClick={() => {
                setShowSuccessModal(false);
                onComplete && onComplete();
              }}
              className="w-full h-12 sm:h-14 bg-[rgb(1,27,51)] text-white rounded-full font-bold text-[15px] sm:text-base hover:bg-[#2d3e50] transition-all duration-300 hover:shadow-lg active:scale-[0.98]"
            >
              Book A Slot Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}