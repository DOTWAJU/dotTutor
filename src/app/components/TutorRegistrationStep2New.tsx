import React from 'react';
import { ArrowLeft2, ArrowRight2, DocumentUpload, CloseCircle, Calendar as CalendarIcon, Add, Book1, Teacher, TickCircle } from 'iconsax-react';
import { CustomDropdown } from './student/CustomDropdown';

interface AcademicFormData {
  biography: string;
  subjectsToTeach: string[];
  levelsOfEducation: string[];
  languages: string;
  highestDegree: string;
  lessonMode: string;
  currency: string;
  costPerLesson: string;
  courseOfStudy: string;
  institution: string;
  graduationYear: string;
  cvResume: File | null;
  availableDays?: string[];
  availableTimes?: { [key: string]: string[] }; // For each day, array of time slots
  availableDates?: Date[]; // Specific dates tutor is available
  dateTimeSlots?: {[key: string]: string[]}; // Time slots for specific dates
}

interface Step2Props {
  academicInfo: AcademicFormData;
  handleChange: (field: string, value: any, section: 'basic' | 'academic') => void;
  handleBlur: (field: string) => void;
  setFocusedField: (field: string | null) => void;
  setTouched: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  focusedField: string | null;
  touched: Record<string, boolean>;
  step2Validations: Record<string, boolean>;
  getFieldStatus: (field: string, validations: Record<string, boolean>) => string;
  handleCvUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setCurrentStep: (step: number) => void;
  handleAcademicInfoSubmit: () => void;
  isStep2Valid: boolean;
  availableSubjects?: string[];
  educationLevels: string[];
  lessonModeOptions: string[];
  languageOptions: string[];
  degreeOptions: string[];
  currencyOptions: string[];
  showNavigationButtons?: boolean; // Optional - defaults to true
}

export function TutorRegistrationStep2({
  academicInfo,
  handleChange,
  handleBlur,
  setFocusedField,
  setTouched,
  focusedField,
  touched,
  step2Validations,
  getFieldStatus,
  handleCvUpload,
  setCurrentStep,
  handleAcademicInfoSubmit,
  isStep2Valid,
  educationLevels,
  lessonModeOptions,
  languageOptions,
  degreeOptions,
  currencyOptions,
  showNavigationButtons = true,
}: Step2Props) {
  
  const [showSubjectModal, setShowSubjectModal] = React.useState(false);
  const [showAddCustomSubjectModal, setShowAddCustomSubjectModal] = React.useState(false);
  const [customSubjectName, setCustomSubjectName] = React.useState('');
  const [customSubjectCategory, setCustomSubjectCategory] = React.useState('');
  const [customSubjects, setCustomSubjects] = React.useState<{category: string; items: string[]}[]>([]);
  const [currentMonth, setCurrentMonth] = React.useState(new Date(2026, 2)); // March 2026
  const [selectedDates, setSelectedDates] = React.useState<Date[]>(academicInfo.availableDates || []);
  const [dateTimeSlots, setDateTimeSlots] = React.useState<{[key: string]: string[]}>(academicInfo.dateTimeSlots || {});

  // Morning and evening time slots
  const morningSlots = ['9-10 AM', '10-11 AM', '11-12 PM'];
  const eveningSlots = ['4-5 PM', '5-6 PM', '6-7 PM'];

  // Calendar helpers
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);

  const isDateSelected = (day: number) => {
    return selectedDates.some(
      date =>
        date.getDate() === day &&
        date.getMonth() === currentMonth.getMonth() &&
        date.getFullYear() === currentMonth.getFullYear()
    );
  };

  const toggleDate = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const dateIndex = selectedDates.findIndex(
      date =>
        date.getDate() === day &&
        date.getMonth() === currentMonth.getMonth() &&
        date.getFullYear() === currentMonth.getFullYear()
    );

    let updatedDates;
    if (dateIndex > -1) {
      updatedDates = selectedDates.filter((_, i) => i !== dateIndex);
      // Remove time slots for this date
      const dateKey = newDate.toISOString().split('T')[0];
      const { [dateKey]: _, ...restSlots } = dateTimeSlots;
      setDateTimeSlots(restSlots);
      handleChange('dateTimeSlots', restSlots, 'academic');
    } else {
      updatedDates = [...selectedDates, newDate];
    }
    setSelectedDates(updatedDates);
    handleChange('availableDates', updatedDates, 'academic');
  };

  const toggleTimeSlot = (date: Date, time: string) => {
    const dateKey = date.toISOString().split('T')[0];
    const currentSlots = dateTimeSlots[dateKey] || [];
    let updatedSlots;
    if (currentSlots.includes(time)) {
      updatedSlots = {
        ...dateTimeSlots,
        [dateKey]: currentSlots.filter(t => t !== time)
      };
    } else {
      updatedSlots = {
        ...dateTimeSlots,
        [dateKey]: [...currentSlots, time]
      };
    }
    setDateTimeSlots(updatedSlots);
    handleChange('dateTimeSlots', updatedSlots, 'academic');
  };

  // Subject categories from ExplorePage
  const subjectCategories = [
    {
      category: 'Subjects',
      items: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Music']
    },
    {
      category: 'Exam Prep',
      items: ['GRE', 'GMAT', 'SAT', 'IELTS', 'TOEFL']
    },
    {
      category: 'Online Class',
      items: ['Baking', 'Tie & Dye', 'Photography', 'Cooking', 'Art']
    },
    {
      category: 'Language',
      items: ['Yoruba', 'Igbo', 'Dutch', 'French', 'Spanish']
    }
  ];

  const toggleSubject = (subject: string) => {
    const currentSubjects = academicInfo.subjectsToTeach;
    if (currentSubjects.includes(subject)) {
      handleChange('subjectsToTeach', currentSubjects.filter(s => s !== subject), 'academic');
    } else {
      handleChange('subjectsToTeach', [...currentSubjects, subject], 'academic');
    }
    setTouched(prev => ({ ...prev, subjectsToTeach: true }));
  };

  const toggleEducationLevel = (level: string) => {
    const currentLevels = academicInfo.levelsOfEducation;
    if (currentLevels.includes(level)) {
      handleChange('levelsOfEducation', currentLevels.filter(l => l !== level), 'academic');
    } else {
      handleChange('levelsOfEducation', [...currentLevels, level], 'academic');
    }
    setTouched(prev => ({ ...prev, levelsOfEducation: true }));
  };

  const removeSubject = (subject: string) => {
    const currentSubjects = academicInfo.subjectsToTeach;
    handleChange('subjectsToTeach', currentSubjects.filter(s => s !== subject), 'academic');
  };

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-[26px] sm:text-[30px] lg:text-[28px] font-bold mb-2" style={{ color: 'rgb(1, 27, 51)' }}>
          Academic Information
        </h1>
        <p className="text-[14px] sm:text-[15px] text-[#52565c]">Tell us about your teaching expertise</p>
      </div>

      <form className="space-y-4 sm:space-y-5">
        {/* Biography */}
        <div className="group">
          <label
            htmlFor="biography"
            className="block text-[13px] sm:text-sm font-semibold mb-2 transition-colors duration-200"
            style={{ color: focusedField === 'biography' ? '#FF6636' : 'rgb(1, 27, 51)' }}
          >
            Biography
          </label>
          <div className="relative">
            <textarea
              id="biography"
              value={academicInfo.biography}
              onChange={(e) => handleChange('biography', e.target.value, 'academic')}
              onFocus={() => setFocusedField('biography')}
              onBlur={() => handleBlur('biography')}
              placeholder="Tell us about yourself, your teaching experience, and expertise... (Min. 50 characters)"
              rows={5}
              className={`w-full px-4 py-3 rounded-xl border text-[14px] sm:text-[15px] transition-all duration-300 outline-none bg-white/50 backdrop-blur-sm resize-none ${
                getFieldStatus('biography', step2Validations) === 'focused'
                  ? 'border-[#FF6636] shadow-lg shadow-[#FF6636]/10 bg-white'
                  : getFieldStatus('biography', step2Validations) === 'valid'
                  ? 'border-green-400 bg-white'
                  : getFieldStatus('biography', step2Validations) === 'invalid'
                  ? 'border-red-400'
                  : 'border-[#E5E7EB] hover:border-[#FF6636]/40 hover:bg-white'
              }`}
              style={{ color: 'rgb(1, 27, 51)' }}
            />
          </div>
          <div className="flex justify-between items-center mt-1.5">
            <div>
              {touched.biography && !step2Validations.biography && (
                <p className="text-[11px] sm:text-xs text-red-500 ml-1 animate-in slide-in-from-top-1 duration-200">
                  Biography must be at least 50 characters
                </p>
              )}
            </div>
            <p className="text-[11px] sm:text-xs text-gray-500">{academicInfo.biography.length} / 50 min</p>
          </div>
        </div>

        {/* Subject Selection Button */}
        <div>
          <label className="block text-[13px] sm:text-sm font-semibold mb-2" style={{ color: 'rgb(1, 27, 51)' }}>
            Subject(s) to Tutor <span className="text-red-500">*</span>
          </label>
          <button
            type="button"
            onClick={() => setShowSubjectModal(true)}
            className="w-full h-12 sm:h-14 px-4 rounded-xl border-2 border-dashed border-[#E5E7EB] hover:border-[#FF6636] transition-all duration-300 bg-white/50 backdrop-blur-sm hover:bg-white flex items-center justify-center gap-2 group"
          >
            <Add className="w-5 h-5 text-[#FF6636] group-hover:scale-110 transition-transform" variant="Bold" />
            <span className="text-[14px] sm:text-[15px] text-[#52565c] group-hover:text-[#FF6636] font-medium transition-colors">
              Select Subject(s)
            </span>
          </button>
          
          {/* Selected Subjects Display */}
          {academicInfo.subjectsToTeach.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {academicInfo.subjectsToTeach.map((subject) => (
                <div
                  key={subject}
                  className="flex items-center gap-2 px-3 py-2 bg-[#FF6636] text-white rounded-lg text-sm font-medium"
                >
                  <span>{subject}</span>
                  <button
                    type="button"
                    onClick={() => removeSubject(subject)}
                    className="hover:scale-110 transition-transform"
                  >
                    <CloseCircle size={16} variant="Bold" />
                  </button>
                </div>
              ))}
            </div>
          )}
          
          {touched.subjectsToTeach && !step2Validations.subjectsToTeach && (
            <p className="text-[11px] sm:text-xs text-red-500 mt-1.5 ml-1 animate-in slide-in-from-top-1 duration-200">
              Please select at least one subject
            </p>
          )}
        </div>

        {/* Levels of Education - Tab Style */}
        <div>
          <label className="block text-[13px] sm:text-sm font-semibold mb-3" style={{ color: 'rgb(1, 27, 51)' }}>
            Levels of Education <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {educationLevels.map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => toggleEducationLevel(level)}
                className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-[13px] sm:text-sm font-medium transition-all whitespace-nowrap ${
                  academicInfo.levelsOfEducation.includes(level)
                    ? 'bg-[#FF6636] text-white shadow-sm'
                    : 'bg-white text-[#1d2026] hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
          {touched.levelsOfEducation && !step2Validations.levelsOfEducation && (
            <p className="text-[11px] sm:text-xs text-red-500 mt-1.5 ml-1 animate-in slide-in-from-top-1 duration-200">
              Please select at least one education level
            </p>
          )}
        </div>

        {/* Language I speak & Lesson Mode */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
          {/* Language */}
          <div>
            <CustomDropdown
              label="Language I speak"
              value={academicInfo.languages}
              options={languageOptions}
              onChange={(value) => handleChange('languages', value === 'Select language...' ? '' : value, 'academic')}
            />
          </div>

          {/* Lesson Mode */}
          <div>
            <CustomDropdown
              label="Lesson Mode"
              value={academicInfo.lessonMode}
              options={lessonModeOptions}
              onChange={(value) => {
                handleChange('lessonMode', value === 'Select lesson mode...' ? '' : value, 'academic');
                setTouched(prev => ({ ...prev, lessonMode: true }));
              }}
              required
            />
            {touched.lessonMode && !step2Validations.lessonMode && (
              <p className="text-[11px] sm:text-xs text-red-500 mt-1.5 ml-1 animate-in slide-in-from-top-1 duration-200">
                Please select a lesson mode
              </p>
            )}
          </div>
        </div>

        {/* Currency & Cost Per Lesson */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
          {/* Currency */}
          <div>
            <CustomDropdown
              label="Select your currency"
              value={academicInfo.currency}
              options={currencyOptions}
              onChange={(value) => {
                handleChange('currency', value === 'Select currency...' ? '' : value, 'academic');
                setTouched(prev => ({ ...prev, currency: true }));
              }}
              required
            />
            {touched.currency && !step2Validations.currency && (
              <p className="text-[11px] sm:text-xs text-red-500 mt-1.5 ml-1 animate-in slide-in-from-top-1 duration-200">
                Please select a currency
              </p>
            )}
          </div>

          {/* Cost Per Lesson */}
          <div className="group">
            <label
              htmlFor="costPerLesson"
              className="block text-[13px] sm:text-sm font-semibold mb-2 transition-colors duration-200"
              style={{ color: focusedField === 'costPerLesson' ? '#FF6636' : 'rgb(1, 27, 51)' }}
            >
              Cost Per Lesson <span className="text-red-500">*</span>
            </label>
            <input
              id="costPerLesson"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={academicInfo.costPerLesson}
              onChange={(e) => {
                // Only allow numbers
                const value = e.target.value.replace(/[^0-9]/g, '');
                handleChange('costPerLesson', value, 'academic');
              }}
              onFocus={() => setFocusedField('costPerLesson')}
              onBlur={() => handleBlur('costPerLesson')}
              placeholder="e.g., 5000"
              className={`w-full h-12 sm:h-14 px-4 rounded-xl border text-[14px] sm:text-[15px] transition-all duration-300 outline-none bg-white/50 backdrop-blur-sm ${
                focusedField === 'costPerLesson'
                  ? 'border-[#FF6636] shadow-lg shadow-[#FF6636]/10 bg-white'
                  : 'border-[#E5E7EB] hover:border-[#FF6636]/40 hover:bg-white'
              }`}
              style={{ color: 'rgb(1, 27, 51)' }}
            />
            {touched.costPerLesson && !step2Validations.costPerLesson && (
              <p className="text-[11px] sm:text-xs text-red-500 mt-1.5 ml-1 animate-in slide-in-from-top-1 duration-200">
                Please enter cost per lesson
              </p>
            )}
          </div>
        </div>

        {/* Highest Level of Education & Course of Study */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
          {/* Highest Level of Education */}
          <div>
            <CustomDropdown
              label="Highest Level of Education"
              value={academicInfo.highestDegree}
              options={degreeOptions}
              onChange={(value) => {
                handleChange('highestDegree', value === 'Select degree...' ? '' : value, 'academic');
                setTouched(prev => ({ ...prev, highestDegree: true }));
              }}
              required
            />
            {touched.highestDegree && !step2Validations.highestDegree && (
              <p className="text-[11px] sm:text-xs text-red-500 mt-1.5 ml-1 animate-in slide-in-from-top-1 duration-200">
                Please select your highest degree
              </p>
            )}
          </div>

          {/* Course of Study */}
          <div className="group">
            <label
              htmlFor="courseOfStudy"
              className="block text-[13px] sm:text-sm font-semibold mb-2 transition-colors duration-200"
              style={{ color: focusedField === 'courseOfStudy' ? '#FF6636' : 'rgb(1, 27, 51)' }}
            >
              Course of Study <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 z-10 transition-transform duration-200 group-focus-within:scale-110">
                <Book1
                  className="w-[18px] h-[18px] sm:w-5 sm:h-5 text-[#FF6636] transition-transform duration-200"
                  variant={getFieldStatus('courseOfStudy', step2Validations) === 'focused' ? 'Bold' : 'Linear'}
                />
              </div>
              <input
                id="courseOfStudy"
                type="text"
                value={academicInfo.courseOfStudy}
                onChange={(e) => handleChange('courseOfStudy', e.target.value, 'academic')}
                onFocus={() => setFocusedField('courseOfStudy')}
                onBlur={() => handleBlur('courseOfStudy')}
                placeholder="e.g., Mathematics"
                className={`w-full h-12 sm:h-14 pl-11 sm:pl-12 pr-11 sm:pr-12 rounded-xl border text-[14px] sm:text-[15px] transition-all duration-300 outline-none bg-white/50 backdrop-blur-sm ${
                  getFieldStatus('courseOfStudy', step2Validations) === 'focused'
                    ? 'border-[#FF6636] shadow-lg shadow-[#FF6636]/10 bg-white'
                    : getFieldStatus('courseOfStudy', step2Validations) === 'valid'
                    ? 'border-green-400 bg-white'
                    : getFieldStatus('courseOfStudy', step2Validations) === 'invalid'
                    ? 'border-red-400'
                    : 'border-[#E5E7EB] hover:border-[#FF6636]/40 hover:bg-white'
                }`}
                style={{ color: 'rgb(1, 27, 51)' }}
              />
              {getFieldStatus('courseOfStudy', step2Validations) === 'valid' && (
                <div className="absolute right-3.5 sm:right-4 top-1/2 -translate-y-1/2 animate-in fade-in zoom-in duration-300">
                  <TickCircle className="w-[18px] h-[18px] sm:w-5 sm:h-5 text-green-500" variant="Bold" />
                </div>
              )}
            </div>
            {touched.courseOfStudy && !step2Validations.courseOfStudy && (
              <p className="text-[11px] sm:text-xs text-red-500 mt-1.5 ml-1 animate-in slide-in-from-top-1 duration-200">
                Course of study is required
              </p>
            )}
          </div>
        </div>

        {/* Institution & Year of Graduation */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
          {/* Institution */}
          <div className="group">
            <label
              htmlFor="institution"
              className="block text-[13px] sm:text-sm font-semibold mb-2 transition-colors duration-200"
              style={{ color: focusedField === 'institution' ? '#FF6636' : 'rgb(1, 27, 51)' }}
            >
              Institution <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 z-10 transition-transform duration-200 group-focus-within:scale-110">
                <Teacher
                  className="w-[18px] h-[18px] sm:w-5 sm:h-5 text-[#FF6636] transition-transform duration-200"
                  variant={getFieldStatus('institution', step2Validations) === 'focused' ? 'Bold' : 'Linear'}
                />
              </div>
              <input
                id="institution"
                type="text"
                value={academicInfo.institution}
                onChange={(e) => handleChange('institution', e.target.value, 'academic')}
                onFocus={() => setFocusedField('institution')}
                onBlur={() => handleBlur('institution')}
                placeholder="e.g., University of Lagos"
                className={`w-full h-12 sm:h-14 pl-11 sm:pl-12 pr-11 sm:pr-12 rounded-xl border text-[14px] sm:text-[15px] transition-all duration-300 outline-none bg-white/50 backdrop-blur-sm ${
                  getFieldStatus('institution', step2Validations) === 'focused'
                    ? 'border-[#FF6636] shadow-lg shadow-[#FF6636]/10 bg-white'
                    : getFieldStatus('institution', step2Validations) === 'valid'
                    ? 'border-green-400 bg-white'
                    : getFieldStatus('institution', step2Validations) === 'invalid'
                    ? 'border-red-400'
                    : 'border-[#E5E7EB] hover:border-[#FF6636]/40 hover:bg-white'
                }`}
                style={{ color: 'rgb(1, 27, 51)' }}
              />
              {getFieldStatus('institution', step2Validations) === 'valid' && (
                <div className="absolute right-3.5 sm:right-4 top-1/2 -translate-y-1/2 animate-in fade-in zoom-in duration-300">
                  <TickCircle className="w-[18px] h-[18px] sm:w-5 sm:h-5 text-green-500" variant="Bold" />
                </div>
              )}
            </div>
            {touched.institution && !step2Validations.institution && (
              <p className="text-[11px] sm:text-xs text-red-500 mt-1.5 ml-1 animate-in slide-in-from-top-1 duration-200">
                Institution is required
              </p>
            )}
          </div>

          {/* Year of Graduation */}
          <div className="group">
            <label
              htmlFor="graduationYear"
              className="block text-[13px] sm:text-sm font-semibold mb-2 transition-colors duration-200"
              style={{ color: focusedField === 'graduationYear' ? '#FF6636' : 'rgb(1, 27, 51)' }}
            >
              Year of Graduation
            </label>
            <input
              id="graduationYear"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={4}
              value={academicInfo.graduationYear}
              onChange={(e) => {
                // Only allow numbers
                const value = e.target.value.replace(/[^0-9]/g, '');
                handleChange('graduationYear', value, 'academic');
              }}
              onFocus={() => setFocusedField('graduationYear')}
              onBlur={() => handleBlur('graduationYear')}
              placeholder="e.g., 2020"
              className={`w-full h-12 sm:h-14 px-4 rounded-xl border text-[14px] sm:text-[15px] transition-all duration-300 outline-none bg-white/50 backdrop-blur-sm ${
                focusedField === 'graduationYear'
                  ? 'border-[#FF6636] shadow-lg shadow-[#FF6636]/10 bg-white'
                  : 'border-[#E5E7EB] hover:border-[#FF6636]/40 hover:bg-white'
              }`}
              style={{ color: 'rgb(1, 27, 51)' }}
            />
          </div>
        </div>

        {/* Availability Section */}
        <div>
          <label className="block text-[13px] sm:text-sm font-semibold mb-3" style={{ color: 'rgb(1, 27, 51)' }}>
            Availability
          </label>
          
          {/* Available Dates */}
          <div>
            <p className="text-xs text-gray-600 mb-2 font-medium">Select Available Dates</p>
            
            {/* Month Navigation */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <button
                  type="button"
                  onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1))}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <ArrowLeft2 size={18} variant="Bold" />
                </button>
                <p className="text-sm font-semibold text-[#FF6636]">
                  {currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}
                </p>
                <button
                  type="button"
                  onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1))}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <ArrowRight2 size={18} variant="Bold" />
                </button>
              </div>
              
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-xs text-gray-600 font-medium text-center py-2">
                    {day}
                  </div>
                ))}
                {Array.from({ length: startingDayOfWeek }, (_, i) => (
                  <div key={`empty-${i}`}></div>
                ))}
                {Array.from({ length: daysInMonth }, (_, i) => {
                  const day = i + 1;
                  const isCurrentDate = isDateSelected(day);
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDate(day)}
                      className={`aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all ${
                        isCurrentDate
                          ? 'bg-[#FF6636] text-white shadow-sm'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Dates Display */}
            {selectedDates.length > 0 && (
              <div className="mt-4">
                <p className="text-xs text-gray-600 font-medium mb-2">Selected Dates ({selectedDates.length})</p>
                <div className="flex flex-wrap gap-2">
                  {selectedDates.map(date => (
                    <div key={date.toISOString()} className="flex items-center gap-2 px-3 py-2 bg-[#FF6636] text-white rounded-lg text-sm font-medium">
                      <span>{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <button
                        type="button"
                        onClick={() => toggleDate(date.getDate())}
                        className="hover:scale-110 transition-transform"
                      >
                        <CloseCircle size={16} variant="Bold" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Available Time Slots for Selected Dates */}
          {selectedDates.length > 0 && (
            <div className="mt-6">
              <p className="text-xs text-gray-600 font-medium mb-3">Set Time Slots for Each Date</p>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {selectedDates.map(date => {
                  const dateKey = date.toISOString().split('T')[0];
                  const selectedTimes = dateTimeSlots[dateKey] || [];
                  
                  return (
                    <div key={dateKey} className="border border-gray-200 rounded-xl p-4">
                      <h4 className="text-sm font-semibold text-[#FF6636] mb-3">
                        {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                      </h4>
                      
                      {/* Morning Slots */}
                      <div className="mb-3">
                        <p className="text-xs text-gray-600 mb-2">Morning</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {morningSlots.map((time) => {
                            const isTimeSelected = selectedTimes.includes(time);
                            return (
                              <button
                                key={time}
                                type="button"
                                onClick={() => toggleTimeSlot(date, time)}
                                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                                  isTimeSelected
                                    ? 'bg-[#FF6636] text-white'
                                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                                }`}
                              >
                                {time}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Evening Slots */}
                      <div>
                        <p className="text-xs text-gray-600 mb-2">Evening</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {eveningSlots.map((time) => {
                            const isTimeSelected = selectedTimes.includes(time);
                            return (
                              <button
                                key={time}
                                type="button"
                                onClick={() => toggleTimeSlot(date, time)}
                                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                                  isTimeSelected
                                    ? 'bg-[#FF6636] text-white'
                                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                                }`}
                              >
                                {time}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Upload CV */}
        <div>
          <label className="block text-sm text-[#6e7485] font-medium mb-2">Upload CV or Resume (Optional)</label>
          <div className="relative">
            <input
              type="file"
              id="cvUpload"
              onChange={handleCvUpload}
              accept=".pdf,.doc,.docx"
              className="hidden"
            />
            <label
              htmlFor="cvUpload"
              className="flex items-center justify-center gap-3 w-full h-12 sm:h-14 px-4 rounded-xl border-2 border-dashed border-[#E5E7EB] hover:border-[#FF6636] transition-all duration-300 cursor-pointer bg-white/50 backdrop-blur-sm hover:bg-white group"
            >
              <DocumentUpload className="w-5 h-5 text-[#FF6636] group-hover:scale-110 transition-transform" variant="Bold" />
              <span className="text-[14px] sm:text-[15px] text-[#52565c] group-hover:text-[#FF6636] font-medium transition-colors">
                {academicInfo.cvResume ? academicInfo.cvResume.name : 'Click to upload CV/Resume'}
              </span>
            </label>
          </div>
          <p className="text-[11px] sm:text-xs text-gray-500 mt-1.5 ml-1">Supported formats: PDF, DOC, DOCX (Max 5MB)</p>
        </div>

        {/* Navigation Buttons - Small, Far Left and Far Right */}
        {showNavigationButtons && (
          <div className="flex justify-between items-center pt-4 sm:pt-6">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="w-auto px-6 sm:px-8 h-11 sm:h-12 rounded-xl font-bold text-[14px] sm:text-[15px] border-2 border-[#E5E7EB] text-[#52565c] hover:border-[#FF6636] hover:text-[#FF6636] transition-all duration-300 active:scale-[0.98]"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleAcademicInfoSubmit}
              disabled={!isStep2Valid}
              className={`w-auto px-6 sm:px-8 h-11 sm:h-12 rounded-xl font-bold text-[14px] sm:text-[15px] transition-all duration-300 ${
                isStep2Valid
                  ? 'bg-[#FF6636] text-white hover:bg-[#E55A2B] hover:shadow-lg hover:shadow-[#FF6636]/30 active:scale-[0.98]'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Continue
            </button>
          </div>
        )}
      </form>

      {/* Subject Selection Modal */}
      {showSubjectModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-bold" style={{ color: 'rgb(1, 27, 51)' }}>
                Select Subject(s) to Tutor
              </h2>
              <button
                onClick={() => setShowSubjectModal(false)}
                className="text-gray-400 hover:text-[#FF6636] transition-colors"
              >
                <CloseCircle size={28} variant="Bold" />
              </button>
            </div>

            <div className="space-y-6">
              {subjectCategories.map((category, idx) => (
                <div key={idx}>
                  <h3 className="text-base sm:text-lg font-semibold mb-3" style={{ color: 'rgb(1, 27, 51)' }}>
                    {category.category}
                  </h3>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {category.items.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleSubject(item)}
                        className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-[13px] sm:text-sm font-medium transition-all whitespace-nowrap ${
                          academicInfo.subjectsToTeach.includes(item)
                            ? 'bg-[#FF6636] text-white shadow-sm'
                            : 'bg-white text-[#1d2026] hover:bg-gray-50 border border-gray-200'
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              
              {/* Custom Subjects */}
              {customSubjects.length > 0 && customSubjects.map((category, idx) => (
                <div key={`custom-${idx}`}>
                  <h3 className="text-base sm:text-lg font-semibold mb-3 text-purple-700">
                    {category.category} (Custom)
                  </h3>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {category.items.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleSubject(item)}
                        className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-[13px] sm:text-sm font-medium transition-all whitespace-nowrap ${
                          academicInfo.subjectsToTeach.includes(item)
                            ? 'bg-[#FF6636] text-white shadow-sm'
                            : 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200'
                        }`}
                      >
                        {item}
                      </button>
                    ))}\n                  </div>
                </div>
              ))}
              
              {/* Add Custom Subject Button */}
              <button
                type="button"
                onClick={() => {
                  setShowSubjectModal(false);
                  setShowAddCustomSubjectModal(true);
                }}
                className="w-full h-12 sm:h-14 px-4 rounded-xl border-2 border-dashed border-purple-300 hover:border-purple-500 transition-all duration-300 bg-purple-50 hover:bg-purple-100 flex items-center justify-center gap-2 group"
              >
                <Add className="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform" variant="Bold" />
                <span className="text-[14px] sm:text-[15px] text-purple-700 group-hover:text-purple-800 font-semibold transition-colors">
                  Add Your Subject
                </span>
              </button>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setShowSubjectModal(false)}
                className="px-8 h-12 rounded-xl font-bold text-[15px] bg-[#FF6636] text-white hover:bg-[#E55A2B] hover:shadow-lg hover:shadow-[#FF6636]/30 transition-all duration-300 active:scale-[0.98]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Add Custom Subject Modal */}
      {showAddCustomSubjectModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl animate-in zoom-in duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-bold" style={{ color: 'rgb(1, 27, 51)' }}>
                Add Custom Subject
              </h2>
              <button
                onClick={() => {
                  setShowAddCustomSubjectModal(false);
                  setCustomSubjectName('');
                  setCustomSubjectCategory('');
                }}
                className="text-gray-400 hover:text-[#FF6636] transition-colors"
              >
                <CloseCircle size={28} variant="Bold" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Subject Name */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'rgb(1, 27, 51)' }}>
                  Subject Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={customSubjectName}
                  onChange={(e) => setCustomSubjectName(e.target.value)}
                  placeholder="e.g., Advanced Calculus"
                  className="w-full h-12 px-4 rounded-xl border border-gray-300 text-sm focus:border-[#FF6636] focus:outline-none transition-all"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'rgb(1, 27, 51)' }}>
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={customSubjectCategory}
                  onChange={(e) => setCustomSubjectCategory(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border border-gray-300 text-sm focus:border-[#FF6636] focus:outline-none transition-all bg-white"
                >
                  <option value="">Select a category...</option>
                  <option value="Subjects">Subjects</option>
                  <option value="Exam Prep">Exam Prep</option>
                  <option value="Online Class">Online Class</option>
                  <option value="Language">Language</option>
                  <option value="Custom">Custom Category</option>
                </select>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <button
                onClick={() => {
                  setShowAddCustomSubjectModal(false);
                  setShowSubjectModal(true);
                  setCustomSubjectName('');
                  setCustomSubjectCategory('');
                }}
                className="flex-1 h-12 rounded-xl font-semibold text-sm border-2 border-gray-300 text-gray-700 hover:border-[#FF6636] hover:text-[#FF6636] transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (customSubjectName && customSubjectCategory) {
                    // Check if category already exists in custom subjects
                    const categoryIndex = customSubjects.findIndex(c => c.category === customSubjectCategory);
                    
                    if (categoryIndex >= 0) {
                      // Add to existing category
                      const updatedCustomSubjects = [...customSubjects];
                      updatedCustomSubjects[categoryIndex].items.push(customSubjectName);
                      setCustomSubjects(updatedCustomSubjects);
                    } else {
                      // Create new category
                      setCustomSubjects([...customSubjects, { category: customSubjectCategory, items: [customSubjectName] }]);
                    }
                    
                    // Automatically add it to selected subjects
                    toggleSubject(customSubjectName);
                    
                    // Reset and go back to subject modal
                    setCustomSubjectName('');
                    setCustomSubjectCategory('');
                    setShowAddCustomSubjectModal(false);
                    setShowSubjectModal(true);
                  }
                }}
                disabled={!customSubjectName || !customSubjectCategory}
                className={`flex-1 h-12 rounded-xl font-bold text-sm transition-all ${
                  customSubjectName && customSubjectCategory
                    ? 'bg-[#FF6636] text-white hover:bg-[#E55A2B] shadow-sm'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Add Subject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}