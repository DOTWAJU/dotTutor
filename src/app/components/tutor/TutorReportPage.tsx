import React from 'react';
import {
  Chart,
  Book1,
  Star1,
  People,
  Calendar,
  Clock,
  Award,
  TrendUp,
  TrendDown,
  Activity,
  TickCircle,
  CloseCircle,
  Timer1,
  MessageText1,
  Heart,
  Video,
} from 'iconsax-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';

export function TutorReportPage() {
  const [selectedPeriod, setSelectedPeriod] = React.useState('This Month');
  
  // Demo stats
  const totalReviews = 2;
  const averageRating = 5.0;
  
  // Ratings breakdown - sync with actual 2 reviews
  const ratingsBreakdown = [
    { stars: 5, count: 2, percentage: 100 },
    { stars: 4, count: 0, percentage: 0 },
    { stars: 3, count: 0, percentage: 0 },
    { stars: 2, count: 0, percentage: 0 },
    { stars: 1, count: 0, percentage: 0 },
  ];

  // Lesson overview data
  const lessonStats = {
    totalLessons: 48,
    completedLessons: 45,
    cancelledLessons: 3,
    upcomingLessons: 8,
    totalHours: 72,
    averageRating: 4.8,
    totalStudents: 24,
    repeatStudents: 18,
  };

  // Subjects taught data
  const subjectData = [
    { subject: 'Mathematics', lessons: 18, color: '#FF6636' },
    { subject: 'Physics', lessons: 12, color: '#4CAF50' },
    { subject: 'Chemistry', lessons: 10, color: '#2196F3' },
    { subject: 'Biology', lessons: 8, color: '#FFC107' },
  ];

  // Weekly lesson distribution
  const weeklyLessons = [
    { day: 'Mon', lessons: 7, hours: 10.5 },
    { day: 'Tue', lessons: 6, hours: 9 },
    { day: 'Wed', lessons: 8, hours: 12 },
    { day: 'Thu', lessons: 5, hours: 7.5 },
    { day: 'Fri', lessons: 9, hours: 13.5 },
    { day: 'Sat', lessons: 8, hours: 12 },
    { day: 'Sun', lessons: 5, hours: 7.5 },
  ];

  // Recent reviews
  const recentReviews = [
    {
      id: 1,
      rating: 5,
      comment: 'Excellent tutor! Very patient and explains concepts clearly. My grades have improved significantly.',
      date: '2026-03-14',
    },
    {
      id: 2,
      rating: 5,
      comment: 'Great teaching style and always well-prepared for lessons. Highly recommend!',
      date: '2026-03-12',
    },
  ];

  // Performance trends (last 6 months)
  const performanceTrends = [
    { month: 'Oct', lessons: 38, rating: 4.6 },
    { month: 'Nov', lessons: 42, rating: 4.7 },
    { month: 'Dec', lessons: 45, rating: 4.7 },
    { month: 'Jan', lessons: 48, rating: 4.8 },
    { month: 'Feb', lessons: 46, rating: 4.8 },
    { month: 'Mar', lessons: 48, rating: 4.8 },
  ];

  const COLORS = ['#FF6636', '#4CAF50', '#2196F3', '#FFC107'];

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star1
            key={star}
            className={`w-4 h-4 ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
            variant={star <= rating ? 'Bold' : 'Linear'}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Performance Report</h1>
        <p className="text-sm lg:text-base text-[#6e7485]">
          Track your teaching performance and student feedback
        </p>
      </div>

      {/* Period Selector */}
      <div className="mb-6">
        <div className="inline-flex bg-white border border-gray-200 rounded-xl p-1">
          {['This Week', 'This Month', 'Last 3 Months', 'This Year'].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedPeriod === period
                  ? 'bg-[#FF6636] text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Subjects Taught Distribution */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-8">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-1">Subjects Distribution</h3>
          <p className="text-sm text-gray-500">Breakdown of lessons by subject</p>
        </div>
        <div className="h-64 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={subjectData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ subject, lessons }) => `${subject}: ${lessons}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="lessons"
              >
                {subjectData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '12px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-4">
          {subjectData.map((subject, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: subject.color }}></div>
              <span className="text-sm text-gray-700">{subject.subject}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Ratings & Reviews Section */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Ratings & Reviews</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Overall Rating Card */}
          <div className="bg-gradient-to-br from-yellow-50 to-amber-100/50 border border-amber-200/50 rounded-2xl p-6 hover:shadow-md transition-all">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-4">
                <Star1 className="w-10 h-10 text-amber-600" variant="Bold" />
              </div>
              <p className="text-5xl font-bold text-amber-900 mb-2">{averageRating.toFixed(1)}</p>
              <div className="flex items-center justify-center gap-1 mb-2">
                {renderStars(Math.round(averageRating))}
              </div>
              <p className="text-sm text-amber-700 font-medium">Based on {totalReviews} reviews</p>
              <div className="mt-4 pt-4 border-t border-amber-200">
                <p className="text-xs text-amber-700 mb-2 font-medium">Recommendation Rate</p>
                <p className="text-2xl font-bold text-amber-900">100%</p>
              </div>
            </div>
          </div>

          {/* Rating Breakdown */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4">Rating Breakdown</h3>
            <div className="space-y-3">
              {ratingsBreakdown.map((rating) => (
                <div key={rating.stars} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-20">
                    <span className="text-sm font-medium text-gray-700">{rating.stars}</span>
                    <Star1 className="w-4 h-4 text-yellow-500" variant="Bold" />
                  </div>
                  <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full transition-all"
                      style={{ width: `${rating.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-700 w-16 text-right">
                    {rating.count} ({rating.percentage}%)
                  </span>
                </div>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
              <div className="text-center">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mx-auto mb-2">
                  <TrendUp className="w-5 h-5 text-green-600" variant="Bold" />
                </div>
                <p className="text-xs text-gray-500 mb-1">Positive</p>
                <p className="text-lg font-bold text-gray-900">100%</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mx-auto mb-2">
                  <MessageText1 className="w-5 h-5 text-blue-600" variant="Bold" />
                </div>
                <p className="text-xs text-gray-500 mb-1">Feedback</p>
                <p className="text-lg font-bold text-gray-900">{totalReviews}</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mx-auto mb-2">
                  <Award className="w-5 h-5 text-purple-600" variant="Bold" />
                </div>
                <p className="text-xs text-gray-500 mb-1">Top Rated</p>
                <p className="text-lg font-bold text-gray-900">Yes</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Reviews */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-1">Recent Reviews</h3>
          <p className="text-sm text-gray-500">Latest feedback from students</p>
        </div>

        <div className="space-y-4">
          {recentReviews.map((review) => (
            <div key={review.id} className="p-4 border border-gray-200 rounded-xl hover:border-[#FF6636]/30 hover:shadow-sm transition-all">
              <div className="flex items-start justify-between gap-4 mb-3">
                {renderStars(review.rating)}
                <p className="text-xs text-gray-500">
                  {new Date(review.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
              <p className="text-sm text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}