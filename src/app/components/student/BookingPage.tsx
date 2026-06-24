import React from 'react';
import { ArrowLeft2, ArrowRight2, AttachSquare, DocumentUpload } from 'iconsax-react';
import { CustomDropdown } from './CustomDropdown';

interface BookingPageProps {
  tutor: any;
  onBack: () => void;
  onProceedToPayment: (bookingData: any) => void;
}

export function BookingPage({ tutor, onBack, onProceedToPayment }: BookingPageProps) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date(2026, 2)); // March 2026 (current year)
  const [selectedDates, setSelectedDates] = React.useState<Date[]>([]);
  const [dateTimeSlots, setDateTimeSlots] = React.useState<{[key: string]: string[]}>({});
  const [language, setLanguage] = React.useState('English');
  const [lessonTopic, setLessonTopic] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [uploadedFile, setUploadedFile] = React.useState<File | null>(null);
  const [errors, setErrors] = React.useState<{topic?: string; description?: string}>({});

  const costPerLesson = 5700; // Cost per day/lesson
  const duration = selectedDates.length; // Total days/lessons selected
  const totalCost = costPerLesson * duration;

  // Dates that are already booked (example)
  const bookedDates = [
    new Date(2026, 2, 5),
    new Date(2026, 2, 12),
    new Date(2026, 2, 19),
    new Date(2026, 2, 26),
  ];

  const morningSlots = [
    '9-10 AM', '10-11 AM', '11-12 PM'
  ];

  const eveningSlots = [
    '4-5 PM', '5-6 PM', '6-7 PM'
  ];

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

  // Check if a date is in the past
  const isDatePast = (day: number) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day
    
    // Add 2 days to today to get the minimum bookable date
    const minBookableDate = new Date(today);
    minBookableDate.setDate(today.getDate() + 2);
    
    const checkDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    checkDate.setHours(0, 0, 0, 0); // Reset time to start of day
    
    // Date must be at least 2 days from today
    return checkDate < minBookableDate;
  };

  const isDateSelected = (day: number) => {
    return selectedDates.some(
      date =>
        date.getDate() === day &&
        date.getMonth() === currentMonth.getMonth() &&
        date.getFullYear() === currentMonth.getFullYear()
    );
  };

  const isDateBooked = (day: number) => {
    return bookedDates.some(
      date =>
        date.getDate() === day &&
        date.getMonth() === currentMonth.getMonth() &&
        date.getFullYear() === currentMonth.getFullYear()
    );
  };

  const toggleDate = (day: number) => {
    // Don't allow selecting past dates
    if (isDatePast(day)) return;
    
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const dateIndex = selectedDates.findIndex(
      date =>
        date.getDate() === day &&
        date.getMonth() === currentMonth.getMonth() &&
        date.getFullYear() === currentMonth.getFullYear()
    );

    if (dateIndex > -1) {
      setSelectedDates(selectedDates.filter((_, i) => i !== dateIndex));
    } else {
      setSelectedDates([...selectedDates, newDate]);
    }
  };

  const toggleTimeSlot = (date: Date, time: string) => {
    const dateKey = date.toISOString().split('T')[0];
    const currentSlots = dateTimeSlots[dateKey] || [];
    if (currentSlots.includes(time)) {
      setDateTimeSlots({
        ...dateTimeSlots,
        [dateKey]: currentSlots.filter(t => t !== time)
      });
    } else {
      setDateTimeSlots({
        ...dateTimeSlots,
        [dateKey]: [...currentSlots, time]
      });
    }
  };

  const handleProceed = () => {
    const bookingData = {
      tutor,
      selectedDates,
      dateTimeSlots,
      language,
      lessonTopic,
      description,
      costPerLesson,
      duration,
      totalCost
    };
    onProceedToPayment(bookingData);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const validateForm = () => {
    const newErrors: {topic?: string; description?: string} = {};
    if (!lessonTopic) {
      newErrors.topic = 'Lesson topic is required';
    }
    if (!description) {
      newErrors.description = 'Description is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="pb-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[#FF6636] hover:text-[#E55A2B] mb-6"
      >
        <ArrowLeft2 size={20} />
        <span className="text-sm font-medium">Back to Profile</span>
      </button>

      {/* Page Header */}
      <div className="mb-6 flex flex-col gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
            Book Lesson with {tutor.name}
          </h1>
          <p className="text-sm text-[#6e7485]">{tutor.subject}</p>
        </div>

        {/* Tutor's Lesson Mode (Read-only) */}
        <div className="bg-[#fff9f5] border border-[#FF6636] rounded-lg px-4 py-2.5 w-full sm:w-auto sm:self-start">
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#6e7485] font-medium">LESSON MODE:</span>
            <span className="text-sm text-[#FF6636] font-semibold">{tutor.lessonMode || 'Online, In-person'}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Left: Calendar */}
        <div className="bg-white border border-[#e9eaf0] rounded-lg p-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-4 uppercase">Available Dates</h2>
          
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft2 size={18} />
            </button>
            <span className="font-semibold text-base">
              {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
            <button
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
              const booked = isDateBooked(day);
              const isPast = isDatePast(day);
              return (
                <button
                  key={day}
                  onClick={() => !booked && !isPast && toggleDate(day)}
                  disabled={booked || isPast}
                  className={`aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                    selected
                      ? 'bg-[#FF6636] text-white'
                      : booked
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : isPast
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'hover:bg-gray-100 text-gray-700'
                  }`}
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
              <div className="w-4 h-4 bg-gray-300 rounded"></div>
              <span className="text-[#6e7485]">Booked</span>
            </div>
          </div>

          {/* Selected Dates */}
          {selectedDates.length > 0 && (
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-xs font-semibold text-gray-700 mb-2 uppercase">Selected Dates ({selectedDates.length})</h3>
              <div className="max-h-32 overflow-y-auto">
                {selectedDates.map((date, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <span className="w-1.5 h-1.5 bg-[#FF6636] rounded-full"></span>
                    {date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Time Slots */}
        <div className="bg-white border border-[#e9eaf0] rounded-lg p-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-4 uppercase">Select Time Slots for Each Date</h2>
          
          {selectedDates.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-sm text-[#8c94a3]">Please select dates from the calendar first</p>
            </div>
          ) : (
            <div className="space-y-6">
              {selectedDates.map((date, idx) => {
                const dateKey = date.toISOString().split('T')[0];
                const selectedTimesForDate = dateTimeSlots[dateKey] || [];
                
                return (
                  <div key={idx} className="border border-[#e9eaf0] rounded-lg p-4">
                    <h3 className="text-xs font-semibold text-[#FF6636] mb-3 uppercase">
                      {date.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </h3>
                    
                    {/* Morning Slots */}
                    <div className="mb-4">
                      <h4 className="text-xs font-medium text-[#6e7485] mb-2">Morning</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {morningSlots.map((time) => {
                          const isSelected = selectedTimesForDate.includes(time);
                          return (
                            <button
                              key={time}
                              onClick={() => toggleTimeSlot(date, time)}
                              className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                isSelected
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
                      <h4 className="text-xs font-medium text-[#6e7485] mb-2">Evening</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {eveningSlots.map((time) => {
                          const isSelected = selectedTimesForDate.includes(time);
                          return (
                            <button
                              key={time}
                              onClick={() => toggleTimeSlot(date, time)}
                              className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                isSelected
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
                    
                    {selectedTimesForDate.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-xs text-[#6e7485] mb-1">Selected: {selectedTimesForDate.length} slot(s)</p>
                        <div className="flex flex-wrap gap-1">
                          {selectedTimesForDate.map((time, timeIdx) => (
                            <span key={timeIdx} className="px-2 py-0.5 bg-[#fff9f5] border border-[#FF6636] text-[#FF6636] text-xs font-medium rounded">
                              {time}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-white border border-[#e9eaf0] rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {/* Language */}
          <CustomDropdown
            label="Preferred Language"
            value={language}
            options={['English', 'French', 'Spanish', 'Yoruba', 'Igbo']}
            onChange={setLanguage}
          />

          {/* Cost/Lesson */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-[#6e7485] font-medium">Cost Per Lesson</label>
            <div className="px-4 py-3 border border-[#e9eaf0] rounded-lg bg-gray-50">
              <span className="text-base font-semibold text-[#FF6636]">₦{costPerLesson.toLocaleString()}</span>
            </div>
          </div>

          {/* Duration */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-[#6e7485] font-medium">Total Lessons</label>
            <div className="px-4 py-3 border border-[#e9eaf0] rounded-lg bg-gray-50">
              <span className="text-base font-semibold text-gray-900">{duration}</span>
            </div>
          </div>
        </div>

        {/* Total Cost */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#fff9f5] border border-[#FF6636] rounded-lg mb-6">
          <span className="text-base font-semibold text-gray-900">TOTAL COST</span>
          <span className="text-xl font-bold text-[#FF6636]">₦{totalCost.toLocaleString()}</span>
        </div>

        {/* Lesson Topic & Description - Grid on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {/* Lesson Topic */}
          <div>
            <label className="text-sm text-[#6e7485] font-medium block mb-2">
              What do you want to be tutored on? <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={lessonTopic}
              onChange={(e) => setLessonTopic(e.target.value)}
              placeholder="Learn Music fundamentals and fine art basics"
              className="w-full px-4 py-3 border border-[#e9eaf0] rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#FF6636]"
            />
            {errors.topic && <p className="text-red-500 text-sm mt-1">{errors.topic}</p>}
          </div>

          {/* File Upload */}
          <div>
            <label className="text-sm text-[#6e7485] font-medium block mb-2">Upload File (optional)</label>
            <div className="relative">
              <input
                type="file"
                onChange={handleFileUpload}
                className="w-full px-4 py-3 border border-[#e9eaf0] rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#FF6636] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#fff9f5] file:text-[#FF6636] hover:file:bg-[#ffe6dc]"
              />
            </div>
            {uploadedFile && (
              <p className="text-sm text-[#FF6636] mt-2">✓ {uploadedFile.name}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="text-sm text-[#6e7485] font-medium block mb-2">
            Enter description <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="I need you to teach me the fundamentals of music, musical keys...see the attach file on my expectation"
              rows={4}
              className="w-full px-4 py-3 border border-[#e9eaf0] rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#FF6636] resize-none"
            />
            <button className="absolute bottom-3 right-3 text-[#FF6636] hover:text-[#E55A2B]">
              <AttachSquare size={20} />
            </button>
          </div>
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-2xl mx-auto lg:mx-0 lg:ml-auto">
        <button
          onClick={onBack}
          className="w-full sm:w-auto px-8 lg:px-12 bg-[rgba(255,102,54,0.07)] text-[#1d2026] py-3 rounded-lg font-semibold text-base hover:bg-[rgba(255,102,54,0.12)] transition-colors touch-manipulation"
        >
          Go Back
        </button>
        <button
          onClick={() => {
            if (validateForm()) {
              handleProceed();
            }
          }}
          disabled={selectedDates.length === 0 || Object.values(dateTimeSlots).flat().length === 0}
          className="w-full sm:w-auto px-8 lg:px-12 bg-[#ff6636] text-white py-3 rounded-lg font-semibold text-base hover:bg-[#E55A2B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}