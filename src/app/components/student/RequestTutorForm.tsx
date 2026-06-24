import React from 'react';
import { ArrowLeft2, Teacher, ArrowRight2 } from 'iconsax-react';
import { toast } from 'sonner';
import { CustomDropdown } from './CustomDropdown';

interface RequestTutorFormProps {
  subject: string;
  onBack: () => void;
  onRequestSubmit?: (requestData: any) => void;
}

export function RequestTutorForm({ subject, onBack, onRequestSubmit }: RequestTutorFormProps) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date(2026, 2)); // March 2026
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [formData, setFormData] = React.useState({
    subject: subject,
    level: '',
    class: '',
    preferredLanguage: '',
    lessonMode: 'Online',
    description: ''
  });

  // Calculate days in month
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

  // Check if a date is in the past or less than 4 days away
  const isDateDisabled = (day: number) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Add 4 days to today to get the minimum selectable date
    const minDate = new Date(today);
    minDate.setDate(today.getDate() + 4);
    
    const checkDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    checkDate.setHours(0, 0, 0, 0);
    
    // Check if date is before minimum date
    if (checkDate < minDate) return true;
    
    // Check if date is a weekend (Sunday = 0, Saturday = 6)
    const dayOfWeek = checkDate.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) return true;
    
    return false;
  };

  const isDateSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth.getMonth() &&
      selectedDate.getFullYear() === currentMonth.getFullYear()
    );
  };

  const selectDate = (day: number) => {
    if (isDateDisabled(day)) {
      const checkDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const dayOfWeek = checkDate.getDay();
      
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        toast.error('Weekends are not available', {
          description: 'Please select a weekday (Monday - Friday)',
          duration: 3000,
        });
      }
      return;
    }
    
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(newDate);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate at least one date is selected
    if (!selectedDate) {
      toast.error('Please select an available date', {
        duration: 3000,
      });
      return;
    }
    
    // Show success toast
    toast.success('Request Submitted!', {
      description: "We'll get back to you within 2 days with available tutors.",
      duration: 5000,
    });

    // Reset form and go back
    setTimeout(() => {
      onBack();
    }, 1000);

    // Call onRequestSubmit if provided
    if (onRequestSubmit) {
      onRequestSubmit({
        ...formData,
        availability: selectedDate.toISOString().split('T')[0] // Format: YYYY-MM-DD
      });
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
        <span className="text-sm font-medium">Back to Explore</span>
      </button>

      {/* Page Header */}
      <div className="mb-6 flex flex-col gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
            Request a Tutor for {subject}
          </h1>
          <p className="text-sm text-[#6e7485]">
            Fill out this form and we'll match you with qualified tutors
          </p>
        </div>

        {/* Info Badge */}
        <div className="bg-[#fff9f5] border border-[#FF6636] rounded-lg px-4 py-2.5 w-full sm:w-auto sm:self-start">
          <div className="flex items-center gap-2">
            <Teacher size={20} className="text-[#FF6636]" variant="Bold" />
            <div className="flex flex-col">
              <span className="text-xs text-[#6e7485] font-medium">RESPONSE TIME</span>
              <span className="text-sm text-[#FF6636] font-semibold">Within 2 Days</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Form Section */}
      <form onSubmit={handleSubmit}>
        {/* Top Section - Basic Info */}
        <div className="bg-white border border-[#e9eaf0] rounded-lg p-6 mb-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-4 uppercase">Basic Information</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Subject (read-only) */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-[#6e7485] font-medium">Subject</label>
              <input
                type="text"
                value={formData.subject}
                readOnly
                className="px-4 py-3 border border-[#e9eaf0] rounded-lg text-base bg-gray-50 text-gray-900 cursor-not-allowed"
              />
            </div>

            {/* Level */}
            <CustomDropdown
              label="Education Level"
              value={formData.level}
              options={['Select Level', 'Primary', 'Secondary', 'Tertiary']}
              onChange={(value) => setFormData({ ...formData, level: value })}
              required
            />

            {/* Preferred Language */}
            <CustomDropdown
              label="Preferred Language"
              value={formData.preferredLanguage}
              options={['Select Language', 'English', 'French', 'Spanish', 'Yoruba', 'Igbo', 'Hausa']}
              onChange={(value) => setFormData({ ...formData, preferredLanguage: value })}
              required
            />
          </div>
        </div>

        {/* Middle Section - Lesson Preferences */}
        <div className="bg-white border border-[#e9eaf0] rounded-lg p-6 mb-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-4 uppercase">Lesson Preferences</h2>
          
          {/* Lesson Mode */}
          <div className="mb-4">
            <label className="text-sm text-[#6e7485] font-medium block mb-3">
              Lesson Mode <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="lessonMode"
                  value="Online"
                  checked={formData.lessonMode === 'Online'}
                  onChange={(e) => setFormData({ ...formData, lessonMode: e.target.value })}
                  className="w-5 h-5 text-[#FF6636] focus:ring-[#FF6636] accent-[#FF6636]"
                />
                <span className="text-base text-gray-700">Online</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="lessonMode"
                  value="In-Person"
                  checked={formData.lessonMode === 'In-Person'}
                  onChange={(e) => setFormData({ ...formData, lessonMode: e.target.value })}
                  className="w-5 h-5 text-[#FF6636] focus:ring-[#FF6636] accent-[#FF6636]"
                />
                <span className="text-base text-gray-700">In-Person</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="lessonMode"
                  value="Online, In-person"
                  checked={formData.lessonMode === 'Online, In-person'}
                  onChange={(e) => setFormData({ ...formData, lessonMode: e.target.value })}
                  className="w-5 h-5 text-[#FF6636] focus:ring-[#FF6636] accent-[#FF6636]"
                />
                <span className="text-base text-gray-700">Online, In-person</span>
              </label>
            </div>
          </div>

          {/* Availability */}
          <div>
            <label className="text-sm text-[#6e7485] font-medium block mb-3">
              Your Availability <span className="text-red-500">*</span>
            </label>
            
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft2 size={18} />
              </button>
              <span className="font-semibold text-base">
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
              <button
                type="button"
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowRight2 size={18} />
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
              {Array.from({ length: startingDayOfWeek }, (_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }, (_, i) => {
                const day = i + 1;
                const selected = isDateSelected(day);
                const disabled = isDateDisabled(day);
                
                let buttonClasses = 'aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-colors ';
                if (selected) {
                  buttonClasses += 'bg-[#FF6636] text-white';
                } else if (disabled) {
                  buttonClasses += 'bg-gray-100 text-gray-400 cursor-not-allowed';
                } else {
                  buttonClasses += 'hover:bg-gray-100 text-gray-700';
                }
                
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => selectDate(day)}
                    disabled={disabled}
                    className={buttonClasses}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {/* Calendar Legend */}
            <div className="flex items-center gap-4 mb-4 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 bg-[#FF6636] rounded"></div>
                <span className="text-[#6e7485]">Selected</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 bg-gray-100 rounded"></div>
                <span className="text-[#6e7485]">Unavailable</span>
              </div>
            </div>

            {/* Selected Date Display */}
            {selectedDate && (
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-xs font-semibold text-gray-700 mb-2 uppercase">Selected Date</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="w-1.5 h-1.5 bg-[#FF6636] rounded-full"></span>
                  {selectedDate.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section - Learning Goals */}
        <div className="bg-white border border-[#e9eaf0] rounded-lg p-6 mb-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-4 uppercase">Learning Goals</h2>
          
          {/* Description */}
          <div className="mb-4">
            <label className="text-sm text-[#6e7485] font-medium block mb-2">
              What do you want to learn? <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Tell us about your learning goals, specific topics you want to cover, and any other requirements..."
              required
              rows={5}
              className="w-full px-4 py-3 border border-[#e9eaf0] rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#FF6636] resize-none"
            />
            <p className="text-xs text-[#8c94a3] mt-2">
              Be as specific as possible to help us find the best match for you
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-2xl mx-auto lg:mx-0 lg:ml-auto">
          <button
            type="button"
            onClick={onBack}
            className="w-full sm:w-auto px-8 lg:px-12 border-2 border-[#FF6636] text-[#FF6636] py-2.5 rounded-lg font-semibold text-sm hover:bg-[#fff9f5] transition-colors touch-manipulation"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto px-8 lg:px-12 bg-[#FF6636] text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-[#E55A2B] transition-colors shadow-sm touch-manipulation"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
}