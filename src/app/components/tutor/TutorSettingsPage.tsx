import React from 'react';
import { Setting2, User, Lock, Notification } from 'iconsax-react';
import { TutorRegistrationStep2 } from '../TutorRegistrationStep2New';

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

interface TutorSettingsPageProps {
  basicInfo: BasicInfoData;
  academicInfo: AcademicFormData;
  setBasicInfo: (info: BasicInfoData) => void;
  setAcademicInfo: (info: AcademicFormData | ((prev: AcademicFormData) => AcademicFormData)) => void;
  onSave: () => void;
}

export function TutorSettingsPage({ 
  basicInfo, 
  academicInfo, 
  setBasicInfo, 
  setAcademicInfo,
  onSave 
}: TutorSettingsPageProps) {
  const [activeTab, setActiveTab] = React.useState<'profile' | 'account' | 'notifications'>('profile');
  const [focusedField, setFocusedField] = React.useState<string | null>(null);
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});
  const [showSaveButton, setShowSaveButton] = React.useState(false);

  const tabs = [
    { id: 'profile' as const, label: 'Profile Information', icon: User },
    { id: 'account' as const, label: 'Account Settings', icon: Lock },
    { id: 'notifications' as const, label: 'Notifications', icon: Notification },
  ];

  // Validation for step 2
  const step2Validations = {
    biography: (academicInfo.biography || '').length >= 50,
    subjectsToTeach: (academicInfo.subjectsToTeach || []).length > 0,
    levelsOfEducation: (academicInfo.levelsOfEducation || []).length > 0,
    lessonMode: (academicInfo.lessonMode || '') !== '' && academicInfo.lessonMode !== 'Select lesson mode...',
    currency: (academicInfo.currency || '') !== '' && academicInfo.currency !== 'Select currency...',
    costPerLesson: (academicInfo.costPerLesson || '') !== '',
    highestDegree: (academicInfo.highestDegree || '') !== '' && academicInfo.highestDegree !== 'Select degree...',
    courseOfStudy: (academicInfo.courseOfStudy || '').trim().length >= 2,
    institution: (academicInfo.institution || '').trim().length >= 2,
  };

  const isStep2Valid = Object.values(step2Validations).every(Boolean);

  const handleSaveChanges = () => {
    onSave();
    setShowSaveButton(false);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-gray-200 mb-6">
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto gap-2 p-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all whitespace-nowrap flex-shrink-0 ${
                    activeTab === tab.id
                      ? 'bg-[#FF6636] text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" variant={activeTab === tab.id ? 'Bold' : 'Linear'} />
                  <span className="font-medium text-sm sm:text-base">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'profile' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Information</h2>
              
              {/* Basic Info */}
              <div className="mb-8 pb-8 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={basicInfo.fullName || ''}
                      onChange={(e) => {
                        setBasicInfo({ ...basicInfo, fullName: e.target.value });
                        setShowSaveButton(true);
                      }}
                      className="w-full h-12 px-4 rounded-xl border border-gray-300 text-sm focus:border-[#FF6636] focus:outline-none transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={basicInfo.email || ''}
                      onChange={(e) => {
                        setBasicInfo({ ...basicInfo, email: e.target.value });
                        setShowSaveButton(true);
                      }}
                      className="w-full h-12 px-4 rounded-xl border border-gray-300 text-sm focus:border-[#FF6636] focus:outline-none transition-all"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={basicInfo.phoneNumber || ''}
                      onChange={(e) => {
                        setBasicInfo({ ...basicInfo, phoneNumber: e.target.value });
                        setShowSaveButton(true);
                      }}
                      className="w-full h-12 px-4 rounded-xl border border-gray-300 text-sm focus:border-[#FF6636] focus:outline-none transition-all"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
              </div>

              {/* Academic Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Academic & Teaching Information</h3>
                <TutorRegistrationStep2
                  academicInfo={academicInfo}
                  handleChange={(field, value, section) => {
                    setAcademicInfo(prev => ({ ...prev, [field]: value }));
                    setShowSaveButton(true);
                  }}
                  handleBlur={() => {}}
                  setFocusedField={setFocusedField}
                  setTouched={setTouched}
                  focusedField={focusedField}
                  touched={touched}
                  step2Validations={step2Validations}
                  getFieldStatus={() => 'default'}
                  handleCvUpload={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setAcademicInfo(prev => ({ ...prev, cvResume: file }));
                      setShowSaveButton(true);
                    }
                  }}
                  setCurrentStep={() => {}}
                  handleAcademicInfoSubmit={handleSaveChanges}
                  isStep2Valid={isStep2Valid}
                  educationLevels={[
                    'Primary Education',
                    'Secondary Education',
                    'High School',
                    'Undergraduate',
                    'Postgraduate',
                  ]}
                  lessonModeOptions={[
                    'Select lesson mode...',
                    'Online',
                    'In-Person',
                    'Hybrid',
                  ]}
                  currencyOptions={[
                    'Select currency...',
                    'Dollars ($)',
                    'Pounds (£)',
                    'Naira (₦)',
                  ]}
                  languageOptions={[
                    'Select language...',
                    'English',
                    'Yoruba',
                    'Igbo',
                    'Hausa',
                    'French',
                    'Spanish',
                    'Arabic',
                  ]}
                  degreeOptions={[
                    'Select degree...',
                    'High School Diploma',
                    'Associate Degree',
                    "Bachelor's Degree",
                    "Master's Degree",
                    'PhD / Doctorate',
                  ]}
                  showNavigationButtons={false}
                />
              </div>

              {/* Payment Information */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Add your bank account details to receive payments for your tutoring services.
                </p>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Account Number
                    </label>
                    <input
                      type="text"
                      value={academicInfo.accountNumber || ''}
                      onChange={(e) => {
                        setAcademicInfo(prev => ({ ...prev, accountNumber: e.target.value }));
                        setShowSaveButton(true);
                      }}
                      className="w-full h-12 px-4 rounded-xl border border-gray-300 text-sm focus:border-[#FF6636] focus:outline-none transition-all"
                      placeholder="Enter account number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      value={academicInfo.bankName || ''}
                      onChange={(e) => {
                        setAcademicInfo(prev => ({ ...prev, bankName: e.target.value }));
                        setShowSaveButton(true);
                      }}
                      className="w-full h-12 px-4 rounded-xl border border-gray-300 text-sm focus:border-[#FF6636] focus:outline-none transition-all"
                      placeholder="Enter bank name"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Account Name
                    </label>
                    <input
                      type="text"
                      value={academicInfo.accountName || ''}
                      onChange={(e) => {
                        setAcademicInfo(prev => ({ ...prev, accountName: e.target.value }));
                        setShowSaveButton(true);
                      }}
                      className="w-full h-12 px-4 rounded-xl border border-gray-300 text-sm focus:border-[#FF6636] focus:outline-none transition-all"
                      placeholder="Enter account name (as registered with bank)"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'account' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Account Settings</h2>
              
              <div className="space-y-6">
                {/* Change Password */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        className="w-full h-12 px-4 rounded-xl border border-gray-300 text-sm focus:border-[#FF6636] focus:outline-none transition-all"
                        placeholder="Enter current password"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="w-full h-12 px-4 rounded-xl border border-gray-300 text-sm focus:border-[#FF6636] focus:outline-none transition-all"
                        placeholder="Enter new password"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        className="w-full h-12 px-4 rounded-xl border border-gray-300 text-sm focus:border-[#FF6636] focus:outline-none transition-all"
                        placeholder="Confirm new password"
                      />
                    </div>

                    <button className="px-6 py-2.5 bg-[#FF6636] text-white rounded-xl font-semibold hover:bg-[#E55A2B] transition-all">
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Notification Preferences</h2>
              
              <div className="space-y-4">
                {[
                  { label: 'Email Notifications', desc: 'Receive email updates about your account' },
                  { label: 'Lesson Reminders', desc: 'Get notified before scheduled lessons' },
                  { label: 'New Student Requests', desc: 'Alert when a student requests a lesson' },
                  { label: 'Payment Notifications', desc: 'Updates about your earnings and payments' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-semibold text-gray-900">{item.label}</p>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={true} />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF6636]"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Save Button */}
      {showSaveButton && activeTab === 'profile' && (
        <div className="sticky bottom-6 bg-white rounded-2xl border-2 border-[#FF6636] p-4 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-sm text-gray-600">You have unsaved changes</p>
            <div className="flex gap-3 w-full sm:w-auto">
              <button
                onClick={() => setShowSaveButton(false)}
                className="flex-1 sm:flex-initial px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-[#FF6636] hover:text-[#FF6636] transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                disabled={!isStep2Valid}
                className={`flex-1 sm:flex-initial px-6 py-2.5 rounded-xl font-semibold transition-all ${
                  isStep2Valid
                    ? 'bg-[#FF6636] text-white hover:bg-[#E55A2B]'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}