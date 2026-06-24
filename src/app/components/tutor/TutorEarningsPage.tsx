import React from 'react';
import {
  MoneyRecive,
  Wallet,
  Calendar,
  Clock,
  TickCircle,
  CardPos,
  SearchNormal1,
  ArrowDown2,
  Eye,
  EyeSlash,
  Printer,
  CloseCircle,
} from 'iconsax-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { toast } from 'sonner';

interface TutorEarningsPageProps {
  currency?: string;
}

export function TutorEarningsPage({ currency = '₦' }: TutorEarningsPageProps) {
  const [selectedPeriod, setSelectedPeriod] = React.useState('This Month');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('All');
  const [showStatusDropdown, setShowStatusDropdown] = React.useState(false);
  const [amountVisible, setAmountVisible] = React.useState(false);
  const [showPayslipModal, setShowPayslipModal] = React.useState(false);
  const [selectedMonth, setSelectedMonth] = React.useState('');

  // Monthly earnings data for chart
  const monthlyEarnings = [
    { month: 'Jan', earnings: 45000 },
    { month: 'Feb', earnings: 52000 },
    { month: 'Mar', earnings: 48000 },
    { month: 'Apr', earnings: 61000 },
    { month: 'May', earnings: 55000 },
    { month: 'Jun', earnings: 70000 },
    { month: 'Jul', earnings: 68000 },
    { month: 'Aug', earnings: 75000 },
    { month: 'Sep', earnings: 82000 },
    { month: 'Oct', earnings: 78000 },
    { month: 'Nov', earnings: 85000 },
    { month: 'Dec', earnings: 92000 },
  ];

  // Weekly earnings trend
  const weeklyEarnings = [
    { day: 'Mon', earnings: 12000 },
    { day: 'Tue', earnings: 15000 },
    { day: 'Wed', earnings: 18000 },
    { day: 'Thu', earnings: 14000 },
    { day: 'Fri', earnings: 20000 },
    { day: 'Sat', earnings: 22000 },
    { day: 'Sun', earnings: 16000 },
  ];

  // Transaction history
  const transactions = [
    {
      id: 'TXN001',
      student: 'Sarah Johnson',
      subject: 'Mathematics',
      date: '2026-03-15',
      time: '10:00 AM',
      amount: 5000,
      status: 'Completed',
    },
    {
      id: 'TXN002',
      student: 'Michael Chen',
      subject: 'Physics',
      date: '2026-03-14',
      time: '2:00 PM',
      amount: 6000,
      status: 'Completed',
    },
    {
      id: 'TXN003',
      student: 'Emma Wilson',
      subject: 'Chemistry',
      date: '2026-03-13',
      time: '4:00 PM',
      amount: 5500,
      status: 'Pending',
    },
  ];

  const filteredTransactions = transactions.filter(txn => {
    const matchesSearch = txn.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         txn.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         txn.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'All' || txn.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Generate available months for payslip selection
  const availableMonths = [
    { value: '2026-03', label: 'March 2026' },
    { value: '2026-02', label: 'February 2026' },
    { value: '2026-01', label: 'January 2026' },
    { value: '2025-12', label: 'December 2025' },
    { value: '2025-11', label: 'November 2025' },
    { value: '2025-10', label: 'October 2025' },
  ];

  const handlePrintPayslip = () => {
    if (!selectedMonth) {
      toast.error('Please select a month first');
      return;
    }
    
    // Get the payslip content
    const payslipContent = document.getElementById('payslip-content');
    if (!payslipContent) return;

    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Payslip - ${selectedMonth}</title>
          <style>
            body {
              font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              padding: 20px;
              max-width: 800px;
              margin: 0 auto;
            }
            @media print {
              body { padding: 0; }
            }
          </style>
        </head>
        <body>
          ${payslipContent.innerHTML}
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    
    // Small delay to ensure content is rendered before printing
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);

    toast.success('Payslip sent to printer!');
  };

  // Get payslip data based on selected month
  const getPayslipData = () => {
    const monthData = monthlyEarnings.find(m => {
      const monthIndex = availableMonths.find(am => am.value === selectedMonth)?.label.split(' ')[0];
      return m.month.toLowerCase().startsWith(monthIndex?.toLowerCase().substring(0, 3) || '');
    });

    return {
      month: availableMonths.find(m => m.value === selectedMonth)?.label || '',
      totalEarnings: monthData?.earnings || 0,
      lessonsCompleted: Math.floor((monthData?.earnings || 0) / 5000),
      hoursWorked: Math.floor((monthData?.earnings || 0) / 5000) * 2,
      deductions: Math.floor((monthData?.earnings || 0) * 0.05), // 5% platform fee
      netPay: Math.floor((monthData?.earnings || 0) * 0.95),
    };
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Earnings Overview</h1>
          <p className="text-sm lg:text-base text-[#6e7485]">
            Track your income and payment history
          </p>
        </div>
        <button 
          onClick={() => setShowPayslipModal(true)}
          className="px-6 py-3 bg-[#FF6636] text-white rounded-xl font-semibold hover:bg-[#E55A2B] transition-all flex items-center justify-center gap-2 shadow-sm"
        >
          <Printer className="w-5 h-5" variant="Bold" />
          Print Payslip
        </button>
      </div>

      {/* Stats Cards with Visibility Toggle */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => setAmountVisible(!amountVisible)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:border-[#FF6636] hover:bg-orange-50 transition-all text-sm font-medium text-gray-700"
        >
          {amountVisible ? (
            <>
              <Eye className="w-4 h-4 text-[#FF6636]" variant="Bold" />
              <span>Hide Amounts</span>
            </>
          ) : (
            <>
              <EyeSlash className="w-4 h-4 text-gray-600" variant="Bold" />
              <span>Show Amounts</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
        {/* Total Earnings */}
        <div className="bg-white rounded-2xl p-4 lg:p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs lg:text-sm text-gray-600 font-medium">Total Earnings</p>
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-green-100 flex items-center justify-center">
              <Wallet className="w-4 h-4 lg:w-5 lg:h-5 text-green-600" variant="Bold" />
            </div>
          </div>
          <p className="text-2xl lg:text-3xl font-bold text-gray-900">
            {amountVisible ? `${currency}92,500` : '••••••'}
          </p>
        </div>

        {/* This Month */}
        <div className="bg-white rounded-2xl p-4 lg:p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs lg:text-sm text-gray-600 font-medium">This Month</p>
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-orange-100 flex items-center justify-center">
              <Calendar className="w-4 h-4 lg:w-5 lg:h-5 text-[#FF6636]" variant="Bold" />
            </div>
          </div>
          <p className="text-2xl lg:text-3xl font-bold text-gray-900">
            {amountVisible ? `${currency}23,500` : '••••••'}
          </p>
        </div>

        {/* Pending Payments */}
        <div className="bg-white rounded-2xl p-4 lg:p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs lg:text-sm text-gray-600 font-medium">Pending Payments</p>
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-amber-100 flex items-center justify-center">
              <Clock className="w-4 h-4 lg:w-5 lg:h-5 text-amber-600" variant="Bold" />
            </div>
          </div>
          <p className="text-2xl lg:text-3xl font-bold text-gray-900">
            {amountVisible ? `${currency}5,500` : '••••••'}
          </p>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Transaction History</h3>
              <p className="text-sm text-gray-500">All your payment transactions</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="relative">
                <SearchNormal1 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6636]/20 focus:border-[#FF6636] transition-all text-sm w-full sm:w-64"
                />
              </div>

              {/* Filter */}
              <div className="relative">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="pl-4 pr-10 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6636]/20 focus:border-[#FF6636] transition-all text-sm bg-white appearance-none cursor-pointer"
                >
                  <option value="All">All Status</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                </select>
                <ArrowDown2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Student/Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">{txn.id}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{txn.student}</div>
                      <div className="text-xs text-gray-500">Lesson Payment</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-700">{txn.subject}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900">{new Date(txn.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                      <div className="text-xs text-gray-500">{txn.time}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-semibold ${txn.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {amountVisible 
                        ? `${txn.amount >= 0 ? '+' : ''}${currency}${Math.abs(txn.amount).toLocaleString()}`
                        : '••••••'
                      }
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {txn.status === 'Completed' ? (
                        <>
                          <TickCircle className="w-5 h-5 text-green-600" variant="Bold" />
                          <span className="text-sm font-medium text-green-600">Completed</span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-5 h-5 text-amber-600" variant="Bold" />
                          <span className="text-sm font-medium text-amber-600">Pending</span>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredTransactions.length === 0 && (
          <div className="p-12 text-center">
            <CardPos className="w-16 h-16 text-gray-300 mx-auto mb-4" variant="Bold" />
            <p className="text-gray-500 font-medium">No transactions found</p>
            <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Pagination */}
        {filteredTransactions.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold">{filteredTransactions.length}</span> of{' '}
              <span className="font-semibold">{transactions.length}</span> transactions
            </p>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                Previous
              </button>
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Payslip Modal */}
      {showPayslipModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl z-10">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">Print Payslip</h2>
                  <p className="text-sm text-gray-600">
                    Select a month to view and print your payslip
                  </p>
                </div>
                <button
                  onClick={() => setShowPayslipModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <CloseCircle className="w-6 h-6 text-gray-600" variant="Bold" />
                </button>
              </div>
            </div>

            {/* Month Selection */}
            <div className="p-6">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Select Month
              </label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6636] focus:border-transparent"
              >
                <option value="">Choose a month...</option>
                {availableMonths.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Payslip Preview */}
            {selectedMonth && (
              <div className="p-6 pt-0">
                <div id="payslip-content" className="bg-white border-2 border-gray-200 rounded-xl p-8">
                  {/* Payslip Header */}
                  <div className="text-center mb-8 pb-6 border-b-2 border-gray-200">
                    <h1 className="text-3xl font-bold text-[#FF6636] mb-2">Dot-tutor</h1>
                    <p className="text-gray-600 text-sm">Tutor Payslip</p>
                    <p className="text-lg font-bold text-gray-900 mt-2">{getPayslipData().month}</p>
                  </div>

                  {/* Tutor Information */}
                  <div className="grid grid-cols-2 gap-6 mb-8 pb-6 border-b border-gray-200">
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Tutor Name</p>
                      <p className="text-sm font-semibold text-gray-900">Your Name</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Tutor ID</p>
                      <p className="text-sm font-semibold text-gray-900">TUT-2026-001</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Payment Date</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Payment Method</p>
                      <p className="text-sm font-semibold text-gray-900">Bank Transfer</p>
                    </div>
                  </div>

                  {/* Earnings Breakdown */}
                  <div className="mb-8">
                    <h3 className="text-sm font-bold text-gray-900 uppercase mb-4">Earnings Summary</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2">
                        <span className="text-sm text-gray-600">Lessons Completed</span>
                        <span className="text-sm font-semibold text-gray-900">{getPayslipData().lessonsCompleted} lessons</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-sm text-gray-600">Total Hours Worked</span>
                        <span className="text-sm font-semibold text-gray-900">{getPayslipData().hoursWorked} hours</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-t border-gray-200 pt-3">
                        <span className="text-sm text-gray-600">Gross Earnings</span>
                        <span className="text-sm font-semibold text-gray-900">
                          {currency}{getPayslipData().totalEarnings.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Deductions */}
                  <div className="mb-8 pb-6 border-b border-gray-200">
                    <h3 className="text-sm font-bold text-gray-900 uppercase mb-4">Deductions</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2">
                        <span className="text-sm text-gray-600">Platform Fee (5%)</span>
                        <span className="text-sm font-semibold text-red-600">
                          -{currency}{getPayslipData().deductions.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Net Pay */}
                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-green-700 font-medium mb-1">Net Pay</p>
                        <p className="text-xs text-green-600">Amount to be transferred</p>
                      </div>
                      <p className="text-3xl font-bold text-green-700">
                        {currency}{getPayslipData().netPay.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                    <p className="text-xs text-gray-500">
                      This is a computer-generated payslip. No signature is required.
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      For queries, contact: support@dot-tutor.com
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 rounded-b-2xl flex justify-end gap-3">
              <button
                onClick={() => setShowPayslipModal(false)}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handlePrintPayslip}
                disabled={!selectedMonth}
                className="px-6 py-3 bg-[#FF6636] text-white rounded-xl font-semibold hover:bg-[#E55A2B] transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Printer size={20} variant="Bold" />
                Print Payslip
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
