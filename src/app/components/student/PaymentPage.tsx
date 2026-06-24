import React from 'react';
import { ArrowLeft2, TickCircle, Lock, Calendar, Clock, Book, Global, Video } from 'iconsax-react';
import { toast } from 'sonner';

interface PaymentPageProps {
  bookingData: any;
  onBack: () => void;
  onPaymentSuccess: () => void;
}

export function PaymentPage({ bookingData, onBack, onPaymentSuccess }: PaymentPageProps) {
  const [couponCode, setCouponCode] = React.useState('');

  // Calculate total time slots from dateTimeSlots
  const totalTimeSlots = React.useMemo(() => {
    if (!bookingData?.dateTimeSlots) return 0;
    return Object.values(bookingData.dateTimeSlots).reduce((total: number, slots: any) => {
      return total + (slots?.length || 0);
    }, 0);
  }, [bookingData?.dateTimeSlots]);

  const handleConfirmPayment = () => {
    // Navigate to success immediately
    onPaymentSuccess();
  };

  return (
    <div className="pb-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[#FF6636] hover:text-[#E55A2B] mb-6"
      >
        <ArrowLeft2 size={20} />
        <span className="text-sm font-medium">Back to Booking</span>
      </button>

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
          Complete Payment
        </h1>
        <p className="text-sm text-[#6e7485]">
          Review your booking details and complete payment
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Booking Details - Single Card */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-[#e9eaf0] rounded-lg p-6">
            {/* Tutor Info Header */}
            <div className="flex items-start gap-4 pb-6 border-b border-gray-200 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF6636] to-[#E55A2B] flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg">
                  {bookingData?.tutor?.name?.charAt(0) || 'T'}
                </span>
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-[#1d2026] mb-1">
                  {bookingData?.tutor?.name || 'N/A'}
                </h2>
                <p className="text-sm text-[#6e7485] mb-2">
                  {bookingData?.tutor?.subject || 'N/A'}
                </p>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-[#fff9f5] border border-[#FF6636] rounded text-xs font-semibold text-[#FF6636]">
                    {bookingData?.tutor?.lessonMode || bookingData?.lessonMode || 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            {/* Booking Details Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#f5f7fa] flex items-center justify-center flex-shrink-0">
                  <Calendar size={20} className="text-[#FF6636]" variant="Bold" />
                </div>
                <div>
                  <p className="text-xs text-[#6e7485] mb-0.5">Dates</p>
                  <p className="text-sm font-semibold text-[#1d2026]">
                    {bookingData?.selectedDates?.length || 0} day(s)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#f5f7fa] flex items-center justify-center flex-shrink-0">
                  <Clock size={20} className="text-[#FF6636]" variant="Bold" />
                </div>
                <div>
                  <p className="text-xs text-[#6e7485] mb-0.5">Time Slots</p>
                  <p className="text-sm font-semibold text-[#1d2026]">
                    {totalTimeSlots} slot(s)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#f5f7fa] flex items-center justify-center flex-shrink-0">
                  <Book size={20} className="text-[#FF6636]" variant="Bold" />
                </div>
                <div>
                  <p className="text-xs text-[#6e7485] mb-0.5">Lessons</p>
                  <p className="text-sm font-semibold text-[#1d2026]">
                    {bookingData?.duration || 0}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#f5f7fa] flex items-center justify-center flex-shrink-0">
                  <Global size={20} className="text-[#FF6636]" variant="Bold" />
                </div>
                <div>
                  <p className="text-xs text-[#6e7485] mb-0.5">Language</p>
                  <p className="text-sm font-semibold text-[#1d2026]">
                    {bookingData?.language || 'English'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:col-span-2">
                <div className="w-10 h-10 rounded-lg bg-[#f5f7fa] flex items-center justify-center flex-shrink-0">
                  <Video size={20} className="text-[#FF6636]" variant="Bold" />
                </div>
                <div>
                  <p className="text-xs text-[#6e7485] mb-0.5">Lesson Mode</p>
                  <p className="text-sm font-semibold text-[#1d2026]">
                    {bookingData?.tutor?.lessonMode || bookingData?.lessonMode || 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            {/* Lesson Topic (if exists) */}
            {bookingData?.lessonTopic && (
              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs text-[#6e7485] mb-1 font-medium">LESSON TOPIC</p>
                <p className="text-sm text-[#1d2026]">{bookingData.lessonTopic}</p>
              </div>
            )}

            {/* Coupon Section */}
            <div className="pt-6 border-t border-gray-200 mt-6">
              <label className="text-sm text-[#6e7485] font-medium block mb-3">
                Have a Coupon Code?
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                  className="flex-1 px-4 py-2.5 border border-[#e9eaf0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6636]"
                />
                <button className="bg-[#1d2026] text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#2d3036] transition-colors">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Payment Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-[#e9eaf0] rounded-lg p-6 sticky top-6">
            <h2 className="text-sm font-semibold text-[#1d2026] uppercase mb-4">Payment Summary</h2>
            
            {/* Cost Breakdown */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-[#6e7485]">Lessons ({bookingData?.duration || 0})</span>
                <span className="font-medium text-[#1d2026]">
                  ₦{((bookingData?.costPerLesson || 0) * (bookingData?.duration || 0)).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#6e7485]">Duration</span>
                <span className="font-medium text-[#1d2026]">45 min/lesson</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#6e7485]">Service Fee</span>
                <span className="font-medium text-[#1d2026]">₦0</span>
              </div>
            </div>

            {/* Total */}
            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-base font-semibold text-[#1d2026]">Total Amount</span>
                <span className="text-2xl font-bold text-[#FF6636]">
                  ₦{(bookingData?.totalCost || 0).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-[#f5f7fa] border border-[#e9eaf0] rounded-lg p-4 mb-4">
              <div className="flex items-center gap-3 mb-2">
                <TickCircle size={20} variant="Bold" className="text-[#23BD33]" />
                <span className="text-sm font-semibold text-[#1d2026]">Paystack</span>
              </div>
              <p className="text-xs text-[#8c94a3] ml-8">
                Secure payment gateway
              </p>
            </div>

            {/* Confirm Payment Button */}
            <button
              onClick={handleConfirmPayment}
              className="w-full bg-[#ff6636] text-white py-3.5 rounded-lg font-semibold text-base hover:bg-[#E55A2B] transition-colors mb-3"
            >
              Confirm & Pay ₦{(bookingData?.totalCost || 0).toLocaleString()}
            </button>

            {/* Security Note */}
            <div className="flex items-center justify-center gap-2 text-xs text-[#8c94a3]">
              <Lock size={14} className="text-[#23BD33]" variant="Bold" />
              <span>Secure & Encrypted Payment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}