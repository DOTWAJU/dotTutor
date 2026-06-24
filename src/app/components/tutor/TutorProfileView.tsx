import React from 'react';
import { 
  User, 
  Teacher, 
  Book1, 
  DocumentText,
  Global,
  MoneyRecive,
  Calendar,
  Edit,
  ArrowLeft2,
  ArrowRight2
} from 'iconsax-react';

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
  availableTimes?: { [key: string]: string[] };
  accountNumber?: string;
  bankName?: string;
  accountName?: string;
}

interface BasicInfoData {
  fullName: string;
  email: string;
  phoneNumber: string;
}

interface TutorProfileViewProps {
  basicInfo: BasicInfoData;
  academicInfo: AcademicFormData;
  onEditProfile: () => void;
  isActivated?: boolean;
  isProfileComplete?: boolean;
}

export function TutorProfileView({ basicInfo, academicInfo, onEditProfile, isActivated = false, isProfileComplete = false }: TutorProfileViewProps) {
  const userInitials = basicInfo.fullName
    ? basicInfo.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'TU';

  return (
    <div className="max-w-6xl mx-auto">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-[#FF6636] to-[#E55A2B] rounded-2xl p-8 mb-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />
        
        <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-[#FF6636] font-bold text-3xl shadow-xl">
            {userInitials}
          </div>
          
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-3xl font-bold mb-2">{basicInfo.fullName || 'Tutor Name'}</h1>
            <p className="text-white/90 mb-4">Tutor</p>
            
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              {(academicInfo.subjectsToTeach || []).slice(0, 3).map((subject, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium"
                >
                  {subject}
                </span>
              ))}
              {(academicInfo.subjectsToTeach || []).length > 3 && (
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                  +{(academicInfo.subjectsToTeach || []).length - 3} more
                </span>
              )}
            </div>
          </div>
          
          <button
            onClick={onEditProfile}
            className="px-6 py-3 bg-white text-[#FF6636] rounded-xl font-semibold hover:bg-gray-100 transition-all flex items-center gap-2 shadow-lg"
          >
            <Edit className="w-5 h-5" variant="Bold" />
            Edit Profile
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Personal & Academic Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Biography */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <User className="w-5 h-5 text-[#FF6636]" variant="Bold" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">About Me</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              {academicInfo.biography || 'No biography added yet.'}
            </p>
          </div>

          {/* Subjects & Education Levels */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Book1 className="w-5 h-5 text-blue-600" variant="Bold" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Teaching Expertise</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Subjects</h3>
                <div className="flex flex-wrap gap-2">
                  {(academicInfo.subjectsToTeach || []).length > 0 ? (
                    (academicInfo.subjectsToTeach || []).map((subject, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-[#FF6636] text-white rounded-lg text-sm font-medium"
                      >
                        {subject}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm">No subjects added yet.</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Education Levels</h3>
                <div className="flex flex-wrap gap-2">
                  {(academicInfo.levelsOfEducation || []).length > 0 ? (
                    (academicInfo.levelsOfEducation || []).map((level, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium"
                      >
                        {level}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm">No education levels added yet.</p>
                  )}
                </div>
              </div>

              {/* Availability Section */}
              {(academicInfo.availableDays || []).length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Availability</h3>
                  
                  {/* Available Days */}
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-2">Available Days</p>
                    <div className="flex flex-wrap gap-2">
                      {(academicInfo.availableDays || []).map((day, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 bg-orange-100 text-[#FF6636] rounded-lg text-sm font-medium"
                        >
                          {day}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Available Times */}
                  {academicInfo.availableTimes && Object.keys(academicInfo.availableTimes).length > 0 && (
                    <div>
                      <p className="text-xs text-gray-500 mb-2">Available Times</p>
                      <div className="space-y-2">
                        {Object.entries(academicInfo.availableTimes).map(([day, times]) => {
                          if (times.length === 0) return null;
                          return (
                            <div key={day} className="bg-gray-50 rounded-lg p-3">
                              <p className="text-xs font-semibold text-[#FF6636] mb-2">{day}</p>
                              <div className="flex flex-wrap gap-1.5">
                                {times.map((time, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2 py-1 bg-white border border-gray-200 text-gray-700 rounded text-xs font-medium"
                                  >
                                    {time}
                                  </span>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Academic Background */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <DocumentText className="w-5 h-5 text-green-600" variant="Bold" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Academic Background</h2>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Highest Degree</p>
                <p className="font-semibold text-gray-900">{academicInfo.highestDegree || 'Not specified'}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">Course of Study</p>
                <p className="font-semibold text-gray-900">{academicInfo.courseOfStudy || 'Not specified'}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">Institution</p>
                <p className="font-semibold text-gray-900">{academicInfo.institution || 'Not specified'}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">Graduation Year</p>
                <p className="font-semibold text-gray-900">{academicInfo.graduationYear || 'Not specified'}</p>
              </div>
            </div>

            {academicInfo.cvResume && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-2">CV/Resume</p>
                <div className="flex items-center gap-2 text-[#FF6636]">
                  <DocumentText className="w-5 h-5" variant="Bold" />
                  <span className="font-medium">{academicInfo.cvResume.name}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Quick Info */}
        <div className="space-y-6">
          {/* Contact Information */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h3>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500 mb-1">Email</p>
                <p className="font-medium text-gray-900 break-all">{basicInfo.email || 'Not specified'}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">Phone</p>
                <p className="font-medium text-gray-900">{basicInfo.phoneNumber || 'Not specified'}</p>
              </div>
            </div>
          </div>

          {/* Teaching Details */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Teaching Details</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center shrink-0">
                  <Global className="w-4 h-4 text-purple-600" variant="Bold" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">Language</p>
                  <p className="font-medium text-gray-900">{academicInfo.languages || 'Not specified'}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                  <Teacher className="w-4 h-4 text-blue-600" variant="Bold" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">Lesson Mode</p>
                  <p className="font-medium text-gray-900">{academicInfo.lessonMode || 'Not specified'}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                  <MoneyRecive className="w-4 h-4 text-green-600" variant="Bold" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">Cost Per Lesson</p>
                  <p className="font-medium text-gray-900">
                    {academicInfo.currency && academicInfo.costPerLesson
                      ? `${academicInfo.currency.replace(/[()]/g, '')} ${academicInfo.costPerLesson}`
                      : 'Not specified'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          {(academicInfo.accountNumber || academicInfo.bankName || academicInfo.accountName) && (
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Payment Information</h3>
              
              <div className="space-y-4">
                {academicInfo.accountNumber && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                      <MoneyRecive className="w-4 h-4 text-blue-600" variant="Bold" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 mb-1">Account Number</p>
                      <p className="font-medium text-gray-900">{academicInfo.accountNumber}</p>
                    </div>
                  </div>
                )}
                
                {academicInfo.bankName && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center shrink-0">
                      <MoneyRecive className="w-4 h-4 text-purple-600" variant="Bold" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 mb-1">Bank Name</p>
                      <p className="font-medium text-gray-900">{academicInfo.bankName}</p>
                    </div>
                  </div>
                )}
                
                {academicInfo.accountName && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                      <MoneyRecive className="w-4 h-4 text-green-600" variant="Bold" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 mb-1">Account Name</p>
                      <p className="font-medium text-gray-900">{academicInfo.accountName}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Status Card */}
          <div className={`bg-gradient-to-br rounded-2xl p-6 border ${
            isActivated 
              ? 'from-green-50 to-emerald-50 border-green-200' 
              : isProfileComplete 
                ? 'from-yellow-50 to-amber-50 border-yellow-200'
                : 'from-gray-50 to-slate-50 border-gray-200'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-2 h-2 rounded-full ${
                isActivated 
                  ? 'bg-green-500 animate-pulse' 
                  : isProfileComplete 
                    ? 'bg-yellow-500 animate-pulse'
                    : 'bg-gray-400'
              }`} />
              <p className={`text-sm font-semibold ${
                isActivated 
                  ? 'text-green-700' 
                  : isProfileComplete 
                    ? 'text-yellow-700'
                    : 'text-gray-700'
              }`}>Account Status</p>
            </div>
            <p className={`text-2xl font-bold ${
              isActivated 
                ? 'text-green-900' 
                : isProfileComplete 
                  ? 'text-yellow-900'
                  : 'text-gray-900'
            }`}>
              {isActivated 
                ? 'Active' 
                : isProfileComplete 
                  ? 'Pending Approval'
                  : 'Inactive'
              }
            </p>
            <p className={`text-sm mt-1 ${
              isActivated 
                ? 'text-green-600' 
                : isProfileComplete 
                  ? 'text-yellow-600'
                  : 'text-gray-600'
            }`}>
              {isActivated 
                ? 'Profile approved & ready to teach' 
                : isProfileComplete 
                  ? 'Profile submitted for review'
                  : 'Complete your profile to get started'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}