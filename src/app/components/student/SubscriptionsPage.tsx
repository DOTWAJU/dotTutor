import React from 'react';
import { EmptyWallet, Receipt } from 'iconsax-react';

interface SubscriptionsPageProps {
  bookingHistory: any[];
}

export function SubscriptionsPage({ bookingHistory }: SubscriptionsPageProps) {
  // Mock payment method data
  const paymentMethod = {
    type: 'Debit Card',
    lastFour: '4242',
    expiry: '12/25',
    cardBrand: 'Visa'
  };

  // Extract payment history from bookings
  const paymentHistory = bookingHistory.map(booking => ({
    id: booking.id,
    date: booking.bookingDate,
    amount: booking.totalCost,
    status: 'Completed',
    description: `Lesson with ${booking.tutor?.name}`,
    tutorName: booking.tutor?.name,
    subject: booking.tutor?.subject,
    lessons: booking.duration
  })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const totalSpent = paymentHistory.reduce((sum, payment) => sum + payment.amount, 0);
  const totalTransactions = paymentHistory.length;

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
          My Payments
        </h1>
        <p className="text-sm text-[#6e7485]">
          View your payment history and transaction details
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* Total Spent */}
        <div className="bg-gradient-to-br from-[#FF6636] to-[#E55A2B] rounded-xl p-6 text-white">
          <EmptyWallet size={32} variant="Bold" className="mb-3" />
          <p className="text-sm text-white/80 mb-1">Total Spent</p>
          <h3 className="text-3xl font-bold">₦{totalSpent.toLocaleString()}</h3>
        </div>

        {/* Total Transactions */}
        <div className="bg-white border-2 border-[#e9eaf0] rounded-xl p-6">
          <Receipt size={32} variant="Bold" className="text-[#23BD33] mb-3" />
          <p className="text-sm text-[#6e7485] mb-1">Completed Transactions</p>
          <h3 className="text-3xl font-bold text-[#1d2026]">{totalTransactions}</h3>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white border-2 border-[#e9eaf0] rounded-xl overflow-hidden">
        <div className="border-b border-[#e9eaf0] bg-[#f5f7fa] px-6 py-4">
          <h2 className="text-lg font-bold text-[#1d2026]">Payment History</h2>
          <p className="text-sm text-[#6e7485] mt-1">All your lesson payment transactions</p>
        </div>

        {paymentHistory.length === 0 ? (
          <div className="text-center py-12">
            <EmptyWallet className="w-16 h-16 text-gray-300 mx-auto mb-4" variant="Bulk" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Payment History
            </h3>
            <p className="text-gray-500">
              Your payment transactions will appear here after booking lessons
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#e9eaf0]">
            {paymentHistory.map((payment) => (
              <div 
                key={payment.id} 
                className="px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  {/* Left: Payment Details */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-[#1d2026]">
                        {payment.description}
                      </h3>
                      <span className="px-2.5 py-0.5 bg-[#23BD33]/10 text-[#23BD33] text-xs font-semibold rounded-full">
                        {payment.status}
                      </span>
                    </div>
                    <p className="text-sm text-[#6e7485]">{payment.subject}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-[#8c94a3]">
                      <span>
                        {new Date(payment.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric'
                        })}
                      </span>
                      <span>•</span>
                      <span>{payment.lessons} {payment.lessons === 1 ? 'Lesson' : 'Lessons'}</span>
                      <span>•</span>
                      <span>{paymentMethod.cardBrand} •••• {paymentMethod.lastFour}</span>
                    </div>
                  </div>

                  {/* Right: Amount */}
                  <div className="bg-[#fff9f5] border border-[#FF6636] px-4 py-2 rounded-lg flex-shrink-0">
                    <span className="text-[#FF6636] font-bold text-lg">₦{payment.amount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}