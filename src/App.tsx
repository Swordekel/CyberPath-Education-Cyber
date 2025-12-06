import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { LearnPage } from './components/LearnPage';
import { QuizPage } from './components/QuizPage';
import { LeaderboardPage } from './components/LeaderboardPage';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { ProfilePage } from './components/ProfilePage';
import { EditProfilePage } from './components/EditProfilePage';
import { LessonContentPage } from './components/LessonContentPage';
import { Footer } from './components/Footer';
import { MatrixBackground } from './components/MatrixBackground';
import { motion, AnimatePresence } from 'motion/react';
import { useFavicon, createEmojiFavicon } from './hooks/useFavicon';

export type Page = 'home' | 'learn' | 'quiz' | 'leaderboard' | 'login' | 'register' | 'profile' | 'edit-profile' | 'lesson-content';

export interface UserProfile {
  name: string;
  email: string;
  bio: string;
  avatar: string;
  photoUrl: string;
  location: string;
  website: string;
  joinDate: string;
  totalPoints: number;
  quizzesCompleted: number;
  learningStreak: number;
}

interface LessonProgress {
  moduleId: number;
  completedLessons: number[];
  currentLesson: number;
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [selectedModuleId, setSelectedModuleId] = useState<number | null>(null);
  const [lessonProgress, setLessonProgress] = useState<LessonProgress[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: '',
    email: '',
    bio: 'Cyber security enthusiast passionate about learning and protecting digital assets.',
    avatar: '👨‍💻',
    photoUrl: '',
    location: 'Indonesia',
    website: 'https://cyberpath.io',
    joinDate: new Date().toISOString(),
    totalPoints: 0,
    quizzesCompleted: 0,
    learningStreak: 1,
  });

  // Set favicon - Anda bisa ganti emoji atau URL gambar di sini
  // Opsi 1: Gunakan emoji
  useFavicon(createEmojiFavicon('🛡️'));
  
  // Opsi 2: Gunakan URL gambar (uncomment untuk pakai)
  // useFavicon('https://example.com/your-favicon.png');
  
  // Opsi 3: Gunakan SVG data URL (uncomment untuk pakai)
  // useFavicon('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="0.9em" font-size="90">🛡️</text></svg>');

  const handleLogin = (name: string, email: string = '') => {
    setIsLoggedIn(true);
    setUserName(name);
    setUserProfile(prev => ({
      ...prev,
      name,
      email: email || `${name.toLowerCase()}@example.com`,
    }));
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    setCurrentPage('home');
  };

  const handleUpdateProfile = (updatedProfile: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...updatedProfile }));
    if (updatedProfile.name) {
      setUserName(updatedProfile.name);
    }
  };

  const renderPage = () => {
    const pageVariants = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 }
    };

    const pageTransition = {
      duration: 0.3,
      ease: 'easeInOut'
    };

    switch (currentPage) {
      case 'home':
        return (
          <motion.div
            key="home"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <HomePage onNavigate={setCurrentPage} isLoggedIn={isLoggedIn} />
          </motion.div>
        );
      case 'learn':
        return (
          <motion.div
            key="learn"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <LearnPage isLoggedIn={isLoggedIn} onNavigate={setCurrentPage} />
          </motion.div>
        );
      case 'quiz':
        return (
          <motion.div
            key="quiz"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <QuizPage isLoggedIn={isLoggedIn} onNavigate={setCurrentPage} userName={userName} />
          </motion.div>
        );
      case 'leaderboard':
        return (
          <motion.div
            key="leaderboard"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <LeaderboardPage />
          </motion.div>
        );
      case 'login':
        return (
          <motion.div
            key="login"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <LoginPage onLogin={handleLogin} onNavigate={setCurrentPage} />
          </motion.div>
        );
      case 'register':
        return (
          <motion.div
            key="register"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <RegisterPage onNavigate={setCurrentPage} />
          </motion.div>
        );
      case 'profile':
        return (
          <motion.div
            key="profile"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <ProfilePage 
              isLoggedIn={isLoggedIn} 
              onNavigate={setCurrentPage} 
              userProfile={userProfile}
            />
          </motion.div>
        );
      case 'edit-profile':
        return (
          <motion.div
            key="edit-profile"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <EditProfilePage 
              isLoggedIn={isLoggedIn} 
              onNavigate={setCurrentPage} 
              userProfile={userProfile}
              onUpdateProfile={handleUpdateProfile}
            />
          </motion.div>
        );
      case 'lesson-content':
        return (
          <motion.div
            key="lesson-content"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <LessonContentPage 
              moduleId={selectedModuleId || 1}
              onNavigate={setCurrentPage}
            />
          </motion.div>
        );
      default:
        return (
          <motion.div
            key="default"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <HomePage onNavigate={setCurrentPage} isLoggedIn={isLoggedIn} />
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <MatrixBackground />
      <Navbar 
        currentPage={currentPage} 
        onNavigate={setCurrentPage} 
        isLoggedIn={isLoggedIn}
        userName={userName}
        onLogout={handleLogout}
        userAvatar={userProfile.avatar}
        userPhoto={userProfile.photoUrl}
      />
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {renderPage()}
        </AnimatePresence>
      </main>
      {currentPage !== 'login' && currentPage !== 'register' && <Footer />}
    </div>
  );
}

export default App;