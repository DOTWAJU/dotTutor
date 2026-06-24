import React from 'react';
import { RedesignedLandingPage } from './components/RedesignedLandingPage';
import { SubjectsPage } from './components/SubjectsPage';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/auth/RegisterPage';
import { StudentRegisterPage } from './components/auth/StudentRegisterPage';
import { TutorRegistrationPage } from './components/TutorRegistrationPage';
import { StudentDashboard } from './components/student';
import { TutorDashboard } from './components/tutor/TutorDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Toaster } from './components/ui/sonner';
import { authApi, tutorsApi, getStoredUser, getToken, clearAuth, ApiError } from './api';

type UserType = 'student' | 'tutor' | 'admin' | null;

const EMPTY_ACADEMIC_INFO = {
  biography: '',
  subjectsToTeach: [],
  levelsOfEducation: [],
  languages: '',
  highestDegree: '',
  lessonMode: '',
  currency: '',
  costPerLesson: '',
  courseOfStudy: '',
  institution: '',
  graduationYear: '',
  cvResume: null,
};

export default function App() {
  const [currentPage, setCurrentPage] = React.useState<'landing' | 'subjects' | 'login' | 'register' | 'student-register' | 'tutor-register' | 'student-dashboard' | 'tutor-dashboard' | 'admin-dashboard'>('landing');
  const [userData, setUserData] = React.useState<{ fullName: string; email: string; userType: UserType } | null>(null);
  const [isFirstLogin, setIsFirstLogin] = React.useState(false); // Track if it's a new registration
  const [tutorData, setTutorData] = React.useState<any>(null); // Store tutor profile data

  // Restore an existing session (token in localStorage) on mount.
  React.useEffect(() => {
    const stored = getStoredUser();
    if (!stored || !getToken()) return;

    // Validate the token against the backend before trusting the stored user.
    authApi.me()
      .then((user) => applySession(user, false))
      .catch(() => clearAuth());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Apply an authenticated session: set the user and route to the right dashboard.
  const applySession = async (
    user: { fullName: string; email: string; userType: 'student' | 'tutor' | 'admin' },
    firstLogin: boolean,
  ) => {
    setUserData({ fullName: user.fullName, email: user.email, userType: user.userType });

    if (user.userType === 'student') {
      setIsFirstLogin(firstLogin);
      setCurrentPage('student-dashboard');
      return;
    }

    if (user.userType === 'tutor') {
      try {
        const profile = await tutorsApi.getMyTutorProfile();
        setTutorData({
          ...profile,
          isActivated: profile.activated,
          academicInfo: profile.academicInfo ?? EMPTY_ACADEMIC_INFO,
          basicInfo: profile.basicInfo ?? {},
        });
      } catch {
        setTutorData({ isActivated: false, basicInfo: {}, academicInfo: EMPTY_ACADEMIC_INFO });
      }
      setCurrentPage('tutor-dashboard');
      return;
    }

    setCurrentPage('admin-dashboard');
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await authApi.login(email, password);
      await applySession(response, false);
    } catch (error) {
      const message = error instanceof ApiError
        ? error.message
        : 'Unable to reach the server. Is the backend running?';
      alert(
        `${message}\n\nDemo credentials:\n` +
        'Student: student@dot-tutor.com / student123\n' +
        'Tutor: tutor@dot-tutor.com / tutor123\n' +
        'Admin: admin@dot-tutor.com / admin123',
      );
    }
  };

  const handleStudentRegister = async (data: { fullName: string; email: string; password: string }) => {
    try {
      const response = await authApi.registerStudent(data);
      setUserData({ fullName: response.fullName, email: response.email, userType: 'student' });
      setIsFirstLogin(true);
      setCurrentPage('student-dashboard');
    } catch (error) {
      alert(error instanceof ApiError ? error.message : 'Registration failed. Please try again.');
    }
  };

  const handleTutorRegister = async (basicInfo: any, academicInfo: any) => {
    try {
      const response = await authApi.registerTutor({
        email: basicInfo.email,
        password: basicInfo.password,
        basicInfo,
        academicInfo,
      });
      setTutorData({
        fullName: response.fullName,
        email: response.email,
        basicInfo: { ...basicInfo, fullName: response.fullName },
        academicInfo,
        isActivated: false,
      });
      setUserData({ fullName: response.fullName, email: response.email, userType: 'tutor' });
      setCurrentPage('tutor-dashboard');
    } catch (error) {
      alert(error instanceof ApiError ? error.message : 'Registration failed. Please try again.');
    }
  };

  const handleLogout = () => {
    authApi.logout();
    setUserData(null);
    setTutorData(null);
    setIsFirstLogin(false);
    setCurrentPage('landing');
  };

  const getInitials = (fullName?: string, fallback = 'SU') => {
    if (!fullName) return fallback;
    const names = fullName.trim().split(' ');
    if (names.length === 1) return names[0].substring(0, 2).toUpperCase();
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };

  return (
    <>
      {currentPage === 'landing' && (
        <RedesignedLandingPage
          onGetStarted={() => setCurrentPage('register')}
          onLogin={() => setCurrentPage('login')}
          onViewSubjects={() => setCurrentPage('subjects')}
        />
      )}

      {currentPage === 'subjects' && (
        <SubjectsPage
          onBack={() => setCurrentPage('landing')}
        />
      )}

      {currentPage === 'login' && (
        <LoginPage
          onBack={() => setCurrentPage('landing')}
          onRegister={() => setCurrentPage('register')}
          onForgotPassword={() => console.log('Navigate to forgot password')}
          onSubmit={(data) => {
            handleLogin(data.email, data.password);
          }}
        />
      )}

      {currentPage === 'register' && (
        <RegisterPage
          onBack={() => setCurrentPage('landing')}
          onLogin={() => setCurrentPage('login')}
          onSubmit={(accountType) => {
            if (accountType === 'student') {
              setCurrentPage('student-register');
            } else if (accountType === 'tutor') {
              setCurrentPage('tutor-register');
            }
          }}
        />
      )}

      {currentPage === 'student-register' && (
        <StudentRegisterPage
          onBack={() => setCurrentPage('register')}
          onLogin={() => setCurrentPage('login')}
          onSubmit={(data) => {
            handleStudentRegister(data);
          }}
        />
      )}

      {currentPage === 'tutor-register' && (
        <TutorRegistrationPage
          onBackToLogin={() => setCurrentPage('login')}
          onComplete={() => {
            setCurrentPage('login');
          }}
          onAccountCreated={(basicInfo, academicInfo) => {
            handleTutorRegister(basicInfo, academicInfo);
          }}
        />
      )}

      {currentPage === 'student-dashboard' && (
        <StudentDashboard
          userName={userData?.fullName || 'Student User'}
          userInitials={getInitials(userData?.fullName, 'SU')}
          onLogout={handleLogout}
          isFirstLogin={isFirstLogin}
        />
      )}

      {currentPage === 'tutor-dashboard' && tutorData && (
        <TutorDashboard
          userName={userData?.fullName || 'Tutor'}
          userInitials={getInitials(userData?.fullName, 'TU')}
          onLogout={handleLogout}
          isActivated={tutorData.isActivated || false}
          basicInfo={tutorData.basicInfo}
          academicInfo={tutorData.academicInfo}
          setAcademicInfo={(newInfo) => {
            const updatedTutorData = { ...tutorData, academicInfo: newInfo };
            setTutorData(updatedTutorData);
            // Persist profile changes to the backend (best-effort).
            tutorsApi.updateMyTutorProfile({ academicInfo: newInfo }).catch(() => {});
          }}
          onCompleteProfile={() => {
            tutorsApi
              .updateMyTutorProfile({ academicInfo: tutorData.academicInfo })
              .catch(() => {});
          }}
        />
      )}

      {currentPage === 'tutor-dashboard' && !tutorData && (
        <TutorDashboard
          userName={userData?.fullName || 'Tutor'}
          userInitials={getInitials(userData?.fullName, 'TU')}
          onLogout={handleLogout}
          isActivated={true}
          basicInfo={{}}
          academicInfo={EMPTY_ACADEMIC_INFO}
          setAcademicInfo={() => {}}
          onCompleteProfile={() => {}}
        />
      )}

      {currentPage === 'admin-dashboard' && (
        <AdminDashboard
          adminName={userData?.fullName || 'Admin'}
          userInitials={getInitials(userData?.fullName, 'AU')}
          onLogout={handleLogout}
        />
      )}

      <Toaster />
    </>
  );
}
