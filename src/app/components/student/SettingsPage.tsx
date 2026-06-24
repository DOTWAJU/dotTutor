import React from 'react';
import { 
  User, 
  Lock, 
  Eye, 
  EyeSlash,
  Camera,
  Edit2,
  TickCircle,
  Sms,
  Call,
  Location,
  Calendar,
  Shield,
  Key,
  Notification
} from 'iconsax-react';

export function SettingsPage() {
  const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [isEditingProfile, setIsEditingProfile] = React.useState(false);
  const [isEditingPassword, setIsEditingPassword] = React.useState(false);

  // Profile state
  const [profileData, setProfileData] = React.useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    phone: '+234 803 456 7890',
    location: 'Lagos, Nigeria',
    dateOfBirth: '1998-05-15'
  });

  // Password state
  const [passwordData, setPasswordData] = React.useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleProfileSave = () => {
    // Save profile logic
    setIsEditingProfile(false);
    // Show success message
  };

  const handlePasswordSave = () => {
    // Save password logic
    setIsEditingPassword(false);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    // Show success message
  };

  return (
    <div className="pb-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Settings
        </h1>
        <p className="text-sm md:text-base text-[#6e7485]">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Main Content - Full Width */}
        <div className="space-y-6">
          {/* UPDATE PROFILE SECTION */}
          <div className="bg-white border border-[#e9eaf0] rounded-xl md:rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#FF6636] to-[#ff8659] p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                    <User size={24} variant="Bold" className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg md:text-xl font-bold text-white">Update Profile</h2>
                    <p className="text-xs md:text-sm text-white/90">Manage your personal information</p>
                  </div>
                </div>
                {!isEditingProfile && (
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur text-white rounded-lg md:rounded-xl font-semibold text-sm transition-all"
                  >
                    <Edit2 size={16} />
                    <span className="hidden sm:inline">Edit</span>
                  </button>
                )}
              </div>
            </div>

            {/* Profile Picture */}
            <div className="p-6 border-b border-[#e9eaf0]">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-[#FF6636] to-[#ff8659] flex items-center justify-center text-white text-3xl md:text-4xl font-bold shadow-lg">
                    JD
                  </div>
                  {isEditingProfile && (
                    <button className="absolute bottom-0 right-0 w-8 h-8 md:w-10 md:h-10 bg-[#FF6636] hover:bg-[#e55a2f] rounded-full flex items-center justify-center shadow-lg transition-colors">
                      <Camera size={16} variant="Bold" className="text-white" />
                    </button>
                  )}
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">
                    {profileData.firstName} {profileData.lastName}
                  </h3>
                  <p className="text-sm text-[#6e7485] mb-2">Student Account</p>
                  {isEditingProfile && (
                    <button className="text-sm text-[#FF6636] hover:text-[#e55a2f] font-semibold">
                      Upload New Photo
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Profile Form */}
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                      disabled={!isEditingProfile}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6636] focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition-all"
                      placeholder="Enter first name"
                    />
                  </div>
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                      disabled={!isEditingProfile}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6636] focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition-all"
                      placeholder="Enter last name"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <Sms size={20} className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      disabled={!isEditingProfile}
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6636] focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition-all"
                      placeholder="Enter email"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <Call size={20} className="text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      disabled={!isEditingProfile}
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6636] focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition-all"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <Location size={20} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                      disabled={!isEditingProfile}
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6636] focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition-all"
                      placeholder="Enter location"
                    />
                  </div>
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <Calendar size={20} className="text-gray-400" />
                    </div>
                    <input
                      type="date"
                      value={profileData.dateOfBirth}
                      onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
                      disabled={!isEditingProfile}
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6636] focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {isEditingProfile && (
                <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-[#e9eaf0]">
                  <button
                    onClick={() => setIsEditingProfile(false)}
                    className="flex-1 sm:flex-initial px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleProfileSave}
                    className="flex-1 sm:flex-initial px-6 py-3 bg-[#FF6636] hover:bg-[#e55a2f] text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <TickCircle size={20} variant="Bold" />
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* LOGIN INFO SECTION */}
          <div className="bg-white border border-[#e9eaf0] rounded-xl md:rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[rgb(1,27,51)] to-[rgb(10,40,70)] p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur rounded-xl flex items-center justify-center">
                    <Lock size={24} variant="Bold" className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg md:text-xl font-bold text-white">Login Information</h2>
                    <p className="text-xs md:text-sm text-white/90">Manage your security settings</p>
                  </div>
                </div>
                {!isEditingPassword && (
                  <button
                    onClick={() => setIsEditingPassword(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur text-white rounded-lg md:rounded-xl font-semibold text-sm transition-all"
                  >
                    <Key size={16} />
                    <span className="hidden sm:inline">Change</span>
                  </button>
                )}
              </div>
            </div>

            {/* Login Form */}
            <div className="p-6">
              {/* Current Email Display */}
              <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Login Email</p>
                    <p className="text-sm font-semibold text-gray-900">{profileData.email}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-green-600 bg-green-50 px-3 py-1.5 rounded-lg">
                    <TickCircle size={16} variant="Bold" />
                    Verified
                  </div>
                </div>
              </div>

              {/* Password Change */}
              {!isEditingPassword ? (
                <div className="p-6 border border-gray-200 rounded-xl bg-gradient-to-br from-gray-50 to-white">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#FF6636]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Shield size={24} className="text-[#FF6636]" variant="Bold" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-gray-900 mb-1">Password Protection</h3>
                      <p className="text-xs text-gray-600 mb-3">
                        Your password was last changed 30 days ago. For security, we recommend updating it regularly.
                      </p>
                      <button
                        onClick={() => setIsEditingPassword(true)}
                        className="text-sm font-semibold text-[#FF6636] hover:text-[#e55a2f] flex items-center gap-1"
                      >
                        Change Password
                        <Edit2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Current Password */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2">
                        <Lock size={20} className="text-gray-400" />
                      </div>
                      <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                        className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6636] focus:border-transparent transition-all"
                        placeholder="Enter current password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showCurrentPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2">
                        <Lock size={20} className="text-gray-400" />
                      </div>
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6636] focus:border-transparent transition-all"
                        placeholder="Enter new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showNewPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {/* Password Strength Indicator */}
                    {passwordData.newPassword && (
                      <div className="mt-2">
                        <div className="flex gap-1 mb-1">
                          <div className={`h-1.5 flex-1 rounded-full ${passwordData.newPassword.length >= 8 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                          <div className={`h-1.5 flex-1 rounded-full ${passwordData.newPassword.length >= 10 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                          <div className={`h-1.5 flex-1 rounded-full ${passwordData.newPassword.length >= 12 && /[A-Z]/.test(passwordData.newPassword) ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                        </div>
                        <p className="text-xs text-gray-500">
                          Password strength: {passwordData.newPassword.length < 8 ? 'Weak' : passwordData.newPassword.length < 10 ? 'Medium' : 'Strong'}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2">
                        <Lock size={20} className="text-gray-400" />
                      </div>
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6636] focus:border-transparent transition-all"
                        placeholder="Confirm new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {/* Match Indicator */}
                    {passwordData.confirmPassword && (
                      <p className={`text-xs mt-2 ${passwordData.newPassword === passwordData.confirmPassword ? 'text-green-600' : 'text-red-600'}`}>
                        {passwordData.newPassword === passwordData.confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
                      </p>
                    )}
                  </div>

                  {/* Password Requirements */}
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <p className="text-xs font-semibold text-blue-900 mb-2">Password Requirements:</p>
                    <ul className="text-xs text-blue-700 space-y-1">
                      <li className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${passwordData.newPassword.length >= 8 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        At least 8 characters long
                      </li>
                      <li className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${/[A-Z]/.test(passwordData.newPassword) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        Contains uppercase letter
                      </li>
                      <li className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${/[0-9]/.test(passwordData.newPassword) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        Contains number
                      </li>
                      <li className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${/[!@#$%^&*]/.test(passwordData.newPassword) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        Contains special character
                      </li>
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <button
                      onClick={() => {
                        setIsEditingPassword(false);
                        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                      }}
                      className="flex-1 sm:flex-initial px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handlePasswordSave}
                      disabled={!passwordData.currentPassword || !passwordData.newPassword || passwordData.newPassword !== passwordData.confirmPassword}
                      className="flex-1 sm:flex-initial px-6 py-3 bg-[rgb(1,27,51)] hover:bg-[rgb(10,40,70)] text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Shield size={20} variant="Bold" />
                      Update Password
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}