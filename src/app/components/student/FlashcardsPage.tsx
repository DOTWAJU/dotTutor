import React from 'react';
import { 
  CardEdit, 
  ArrowLeft2, 
  ArrowRight2, 
  Refresh, 
  TickCircle, 
  CloseCircle,
  Star1,
  Crown,
  Book1,
  Filter,
  Add,
  Eye,
  Teacher,
  Award,
  Gift,
  MedalStar,
  Flash
} from 'iconsax-react';
import { toast } from 'sonner';
import { motion } from 'motion/react';

interface FlashcardsPageProps {
  onBack?: () => void;
  bookingHistory?: any[];
}

interface Flashcard {
  id: number;
  subject: string;
  question: string;
  answer: string;
  gradient: string;
  emoji: string;
  deckName: string;
  mastered: boolean;
}

interface Deck {
  id: string;
  name: string;
  subject: string;
  color: string;
  emoji: string;
  cardCount: number;
  masteredCount: number;
}

// SVG Pattern Components
const DotsPattern = () => (
  <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <circle cx="20" cy="20" r="2" fill="white" opacity="0.6"/>
        <circle cx="5" cy="5" r="1.5" fill="white" opacity="0.4"/>
        <circle cx="35" cy="35" r="1.5" fill="white" opacity="0.4"/>
      </pattern>
    </defs>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#dots)" />
  </svg>
);

const WavesPattern = () => (
  <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="waves" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
        <path d="M0 50 Q 25 30, 50 50 T 100 50" stroke="white" strokeWidth="3" fill="none" opacity="0.5"/>
        <path d="M0 65 Q 25 45, 50 65 T 100 65" stroke="white" strokeWidth="2" fill="none" opacity="0.3"/>
      </pattern>
    </defs>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#waves)" />
  </svg>
);

const GridPattern = () => (
  <svg className="absolute inset-0 w-full h-full opacity-8 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
        <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" opacity="0.3"/>
        <circle cx="0" cy="0" r="2" fill="white" opacity="0.5"/>
      </pattern>
    </defs>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#grid)" />
  </svg>
);

const StarsPattern = () => (
  <svg className="absolute inset-0 w-full h-full opacity-12 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="stars" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
        <polygon points="40,15 43,28 56,28 46,36 50,49 40,42 30,49 34,36 24,28 37,28" fill="white" opacity="0.5"/>
        <polygon points="15,60 17,67 24,67 18,72 20,79 15,75 10,79 12,72 6,67 13,67" fill="white" opacity="0.3"/>
      </pattern>
    </defs>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#stars)" />
  </svg>
);

// All available subjects - MULTICOLORED GRADIENTS
const subjectConfigs: Record<string, { color: string; emoji: string; pattern: string }> = {
  'Mathematics': { 
    color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
    emoji: '🔢',
    pattern: 'dots'
  },
  'Physics': { 
    color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', 
    emoji: '⚡',
    pattern: 'waves'
  },
  'Chemistry': { 
    color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', 
    emoji: '🧪',
    pattern: 'grid'
  },
  'Biology': { 
    color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', 
    emoji: '🌱',
    pattern: 'dots'
  },
  'English': { 
    color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', 
    emoji: '📖',
    pattern: 'stars'
  },
  'History': { 
    color: 'linear-gradient(135deg, #a8c0ff 0%, #3f2b96 100%)', 
    emoji: '🏰',
    pattern: 'waves'
  },
  'Geography': { 
    color: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)', 
    emoji: '🌍',
    pattern: 'dots'
  },
  'Computer Science': { 
    color: 'linear-gradient(135deg, #fa8bff 0%, #2bd2ff 90%, #2bff88 100%)', 
    emoji: '💻',
    pattern: 'grid'
  },
  'Business Studies': { 
    color: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', 
    emoji: '💼',
    pattern: 'waves'
  },
  'Economics': { 
    color: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%, #ffdde1 100%)', 
    emoji: '📊',
    pattern: 'dots'
  },
};

export function FlashcardsPage({ onBack, bookingHistory = [] }: FlashcardsPageProps) {
  const [isFlipped, setIsFlipped] = React.useState(false);
  const [currentCardIndex, setCurrentCardIndex] = React.useState(0);
  const [selectedDeck, setSelectedDeck] = React.useState<string | null>(null);
  const [studyMode, setStudyMode] = React.useState<'all' | 'review' | 'mastered'>('all');
  const [showAddSubjectModal, setShowAddSubjectModal] = React.useState(false);
  const [selectedSubjects, setSelectedSubjects] = React.useState<string[]>([]);
  const [showCelebration, setShowCelebration] = React.useState(false);
  const [sessionStats, setSessionStats] = React.useState({
    studied: 0,
    mastered: 0,
    needReview: 0,
    streak: 0,
    points: 0
  });

  // Load selected subjects from localStorage on mount
  React.useEffect(() => {
    const savedSubjects = localStorage.getItem('dottutor_flashcard_subjects');
    if (savedSubjects) {
      try {
        setSelectedSubjects(JSON.parse(savedSubjects));
      } catch (e) {
        console.error('Error loading flashcard subjects:', e);
        initializeFromBookings();
      }
    } else {
      initializeFromBookings();
    }
  }, []);

  const initializeFromBookings = () => {
    if (bookingHistory && bookingHistory.length > 0) {
      const bookedSubjects = [...new Set(
        bookingHistory
          .map(booking => booking.tutor?.subject || booking.subject)
          .filter(Boolean)
      )];
      setSelectedSubjects(bookedSubjects);
      localStorage.setItem('dottutor_flashcard_subjects', JSON.stringify(bookedSubjects));
    }
  };

  React.useEffect(() => {
    if (selectedSubjects.length > 0) {
      localStorage.setItem('dottutor_flashcard_subjects', JSON.stringify(selectedSubjects));
    }
  }, [selectedSubjects]);

  const bookedSubjects = React.useMemo(() => {
    if (!bookingHistory || bookingHistory.length === 0) return [];
    const subjects = [...new Set(
      bookingHistory
        .map(booking => booking.tutor?.subject || booking.subject)
        .filter(Boolean)
    )];
    return subjects.filter(subject => !selectedSubjects.includes(subject));
  }, [bookingHistory, selectedSubjects]);

  // Sample Flashcards Data
  const allFlashcards: Flashcard[] = [
    {
      id: 1,
      subject: 'Mathematics',
      deckName: 'mathematics',
      question: 'What is the Pythagorean theorem?',
      answer: 'a² + b² = c², where c is the hypotenuse of a right triangle and a and b are the other two sides.',
      gradient: subjectConfigs['Mathematics'].color,
      emoji: subjectConfigs['Mathematics'].emoji,
      mastered: true
    },
    {
      id: 2,
      subject: 'Mathematics',
      deckName: 'mathematics',
      question: 'What is the quadratic formula?',
      answer: 'x = (-b ± √(b² - 4ac)) / 2a, used to find the roots of a quadratic equation ax² + bx + c = 0.',
      gradient: subjectConfigs['Mathematics'].color,
      emoji: subjectConfigs['Mathematics'].emoji,
      mastered: false
    },
    {
      id: 3,
      subject: 'Mathematics',
      deckName: 'mathematics',
      question: 'Define a derivative in calculus',
      answer: 'The derivative measures how a function changes as its input changes, representing the slope of the tangent line at any point.',
      gradient: subjectConfigs['Mathematics'].color,
      emoji: subjectConfigs['Mathematics'].emoji,
      mastered: true
    },
    {
      id: 4,
      subject: 'Physics',
      deckName: 'physics',
      question: 'Define Newton\'s First Law of Motion',
      answer: 'An object at rest stays at rest and an object in motion stays in motion with the same speed and direction unless acted upon by an unbalanced force.',
      gradient: subjectConfigs['Physics'].color,
      emoji: subjectConfigs['Physics'].emoji,
      mastered: false
    },
    {
      id: 5,
      subject: 'Physics',
      deckName: 'physics',
      question: 'What is the speed of light in vacuum?',
      answer: 'Approximately 299,792,458 meters per second (or about 3 × 10⁸ m/s), denoted by the constant "c".',
      gradient: subjectConfigs['Physics'].color,
      emoji: subjectConfigs['Physics'].emoji,
      mastered: true
    },
    {
      id: 6,
      subject: 'Chemistry',
      deckName: 'chemistry',
      question: 'What is the atomic number?',
      answer: 'The number of protons in the nucleus of an atom, which determines the chemical properties of an element.',
      gradient: subjectConfigs['Chemistry'].color,
      emoji: subjectConfigs['Chemistry'].emoji,
      mastered: true
    },
    {
      id: 7,
      subject: 'Chemistry',
      deckName: 'chemistry',
      question: 'Define pH scale',
      answer: 'A logarithmic scale from 0-14 that measures the acidity or basicity of a solution. pH 7 is neutral, below 7 is acidic, above 7 is basic.',
      gradient: subjectConfigs['Chemistry'].color,
      emoji: subjectConfigs['Chemistry'].emoji,
      mastered: false
    },
    {
      id: 8,
      subject: 'Biology',
      deckName: 'biology',
      question: 'What is photosynthesis?',
      answer: 'The process by which plants convert light energy into chemical energy (glucose) using carbon dioxide and water, releasing oxygen as a byproduct.',
      gradient: subjectConfigs['Biology'].color,
      emoji: subjectConfigs['Biology'].emoji,
      mastered: true
    },
    {
      id: 9,
      subject: 'Biology',
      deckName: 'biology',
      question: 'What is DNA?',
      answer: 'Deoxyribonucleic acid - a molecule that carries genetic instructions for the development, functioning, and reproduction of all living organisms.',
      gradient: subjectConfigs['Biology'].color,
      emoji: subjectConfigs['Biology'].emoji,
      mastered: false
    },
    {
      id: 10,
      subject: 'English',
      deckName: 'english',
      question: 'What is a metaphor?',
      answer: 'A figure of speech that directly compares two unlike things without using "like" or "as". Example: "Time is money."',
      gradient: subjectConfigs['English'].color,
      emoji: subjectConfigs['English'].emoji,
      mastered: false
    },
    {
      id: 11,
      subject: 'English',
      deckName: 'english',
      question: 'Define alliteration',
      answer: 'The repetition of the same sound at the beginning of closely connected words. Example: "Peter Piper picked a peck of pickled peppers."',
      gradient: subjectConfigs['English'].color,
      emoji: subjectConfigs['English'].emoji,
      mastered: true
    },
    {
      id: 12,
      subject: 'Computer Science',
      deckName: 'computerscience',
      question: 'What is an algorithm?',
      answer: 'A step-by-step procedure or formula for solving a problem or completing a task in a finite number of steps.',
      gradient: subjectConfigs['Computer Science'].color,
      emoji: subjectConfigs['Computer Science'].emoji,
      mastered: false
    },
    {
      id: 13,
      subject: 'Computer Science',
      deckName: 'computerscience',
      question: 'What is binary code?',
      answer: 'A coding system using the binary digits 0 and 1 to represent computer instructions and data.',
      gradient: subjectConfigs['Computer Science'].color,
      emoji: subjectConfigs['Computer Science'].emoji,
      mastered: true
    },
  ];

  const decks: Deck[] = React.useMemo(() => {
    return selectedSubjects.map(subject => {
      const subjectCards = allFlashcards.filter(card => card.subject === subject);
      const masteredCards = subjectCards.filter(card => card.mastered);
      const config = subjectConfigs[subject] || { color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', emoji: '📚', pattern: 'dots' };
      
      return {
        id: subject.toLowerCase().replace(/\s+/g, ''),
        name: subject,
        subject: subject,
        color: config.color,
        emoji: config.emoji,
        cardCount: subjectCards.length,
        masteredCount: masteredCards.length
      };
    });
  }, [selectedSubjects]);

  const filteredCards = React.useMemo(() => {
    let cards = allFlashcards.filter(card => selectedSubjects.includes(card.subject));
    
    if (selectedDeck) {
      cards = cards.filter(card => card.deckName === selectedDeck);
    }
    
    if (studyMode === 'review') {
      cards = cards.filter(card => !card.mastered);
    } else if (studyMode === 'mastered') {
      cards = cards.filter(card => card.mastered);
    }
    
    return cards;
  }, [selectedSubjects, selectedDeck, studyMode]);

  const currentCard = filteredCards[currentCardIndex];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (currentCardIndex < filteredCards.length - 1) {
      setIsFlipped(false);
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setShowCelebration(true);
      toast.success('Amazing! Deck Complete!', {
        description: 'You earned 100 bonus points!'
      });
      setTimeout(() => setShowCelebration(false), 3000);
    }
  };

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setIsFlipped(false);
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  const handleMarkMastered = () => {
    setSessionStats(prev => ({
      ...prev,
      mastered: prev.mastered + 1,
      studied: prev.studied + 1,
      streak: prev.streak + 1,
      points: prev.points + 10
    }));
    toast.success('Perfect! +10 points', {
      description: `${sessionStats.streak + 1} card streak!`
    });
    handleNext();
  };

  const handleNeedReview = () => {
    setSessionStats(prev => ({
      ...prev,
      needReview: prev.needReview + 1,
      studied: prev.studied + 1,
      streak: 0,
      points: prev.points + 5
    }));
    toast.info('Keep practicing! +5 points');
    handleNext();
  };

  const handleAddSubject = (subject: string) => {
    if (!selectedSubjects.includes(subject)) {
      setSelectedSubjects([...selectedSubjects, subject]);
      toast.success(`${subject} unlocked!`);
    }
  };

  const handleRemoveSubject = (subject: string) => {
    setSelectedSubjects(selectedSubjects.filter(s => s !== subject));
    toast.info(`${subject} removed`);
    if (selectedDeck && selectedDeck === subject.toLowerCase().replace(/\s+/g, '')) {
      setSelectedDeck(null);
      setCurrentCardIndex(0);
    }
  };

  const availableSubjects = Object.keys(subjectConfigs).filter(
    subject => !selectedSubjects.includes(subject)
  );

  // Get pattern component based on subject
  const getPatternComponent = (pattern: string) => {
    switch(pattern) {
      case 'dots': return <DotsPattern />;
      case 'waves': return <WavesPattern />;
      case 'grid': return <GridPattern />;
      case 'stars': return <StarsPattern />;
      default: return <DotsPattern />;
    }
  };

  return (
    <div className="space-y-4 md:space-y-6 relative pb-6">
      {/* Celebration */}
      {showCelebration && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        >
          <div className="text-center px-4">
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 10, -10, 0],
                scale: [1, 1.2, 1.2, 1.2, 1.2, 1]
              }}
              transition={{ duration: 0.6 }}
              className="text-6xl md:text-9xl mb-4"
            >
              🎉
            </motion.div>
            <h2 className="text-2xl md:text-4xl font-bold text-white bg-[rgb(1,27,51)] px-6 md:px-8 py-3 md:py-4 rounded-2xl shadow-2xl">
              Deck Complete!
            </h2>
          </div>
        </motion.div>
      )}

      {/* Header - GRADIENT WITH ORANGE AND DARK PINK */}
      <div className="bg-gradient-to-r from-[#FF6636] via-[#ff8659] to-[#d946a6] rounded-xl md:rounded-2xl p-4 md:p-6 text-white shadow-xl">
        <div className="flex items-center justify-between flex-wrap gap-3 md:gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 md:gap-3 mb-2">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
                <CardEdit className="w-5 h-5 md:w-6 md:h-6" variant="Bold" />
              </div>
              <div className="min-w-0">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold truncate">
                  FLASHCARDS
                </h1>
                {selectedSubjects.length > 0 && (
                  <p className="text-white/90 text-xs md:text-sm truncate">
                    {selectedSubjects.length} subject{selectedSubjects.length > 1 ? 's' : ''} unlocked
                  </p>
                )}
              </div>
            </div>
          </div>
          
          {/* Game Stats - NO EMOJIS */}
          <div className="flex items-center gap-2 md:gap-3">
            <div className="bg-white/10 backdrop-blur px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl flex items-center gap-1.5 md:gap-2 border border-white/20">
              <Star1 className="w-4 h-4 md:w-5 md:h-5 text-[#FF6636]" variant="Bold" />
              <div className="text-left">
                <div className="text-[10px] md:text-xs opacity-80 leading-tight">Points</div>
                <div className="text-sm md:text-lg font-bold leading-tight">{sessionStats.points}</div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl flex items-center gap-1.5 md:gap-2 border border-white/20">
              <Flash className="w-4 h-4 md:w-5 md:h-5 text-[#FF6636]" variant="Bold" />
              <div className="text-left">
                <div className="text-[10px] md:text-xs opacity-80 leading-tight">Streak</div>
                <div className="text-sm md:text-lg font-bold leading-tight">{sessionStats.streak}</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Streak Explanation */}
        <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-white/20">
          <p className="text-white/80 text-xs md:text-sm">
            <strong className="text-white">How it works:</strong> Earn +10 points and build your streak with "I Got This" • 
            Earn +5 points with "Need Practice" (resets streak) • 
            Keep your streak going for bonus rewards!
          </p>
        </div>
      </div>

      {/* Add Subject Button - NO EMOJI */}
      <div className="flex justify-end">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddSubjectModal(true)}
          className="flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-[#FF6636] text-white rounded-lg md:rounded-xl font-bold shadow-lg hover:shadow-xl transition-all text-sm md:text-base"
        >
          <Add className="w-4 h-4 md:w-5 md:h-5" />
          <span>Add Subject</span>
        </motion.button>
      </div>

      {/* Suggested subjects - NO EMOJIS */}
      {bookedSubjects.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border-2 border-gray-200 rounded-xl md:rounded-2xl p-4 md:p-5 shadow-lg"
        >
          <div className="flex items-start gap-3 md:gap-4">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-[#FF6636] rounded-xl md:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <Teacher className="w-6 h-6 md:w-7 md:h-7 text-white" variant="Bold" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1">Recommended for You</h3>
              <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3">
                Level up your learning! Add these subjects:
              </p>
              <div className="flex flex-wrap gap-2">
                {bookedSubjects.map((subject) => (
                  <motion.button
                    key={subject}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAddSubject(subject)}
                    className="px-3 md:px-4 py-1.5 md:py-2 bg-[#FF6636] text-white rounded-lg md:rounded-xl text-xs md:text-sm font-bold shadow-md hover:shadow-lg transition-all"
                  >
                    {subject}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Empty State - NO EMOJIS */}
      {selectedSubjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl md:rounded-3xl p-8 md:p-12 text-center border-4 border-dashed border-gray-300 shadow-xl"
        >
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 5, -5, 0],
              scale: [1, 1.1, 1, 1.1, 1, 1]
            }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            className="w-20 h-20 md:w-24 md:h-24 bg-[rgb(1,27,51)] rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-2xl"
          >
            <CardEdit className="w-10 h-10 md:w-12 md:h-12 text-white" variant="Bold" />
          </motion.div>
          <h2 className="text-2xl md:text-3xl font-bold text-[rgb(1,27,51)] mb-2 md:mb-3">
            No Subjects Yet
          </h2>
          <p className="text-gray-700 mb-6 md:mb-8 max-w-md mx-auto text-base md:text-lg px-4">
            Choose your adventure! Add subjects and start earning points
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddSubjectModal(true)}
            className="px-6 md:px-8 py-3 md:py-4 bg-[#FF6636] text-white rounded-xl md:rounded-2xl font-bold text-base md:text-lg shadow-xl hover:shadow-2xl transition-all inline-flex items-center gap-2 md:gap-3"
          >
            <Add className="w-5 h-5 md:w-6 md:h-6" />
            Start Your Journey
          </motion.button>
        </motion.div>
      )}

      {/* Main Content */}
      {selectedSubjects.length > 0 && (
        <>
          {/* Study Decks Grid - DASHBOARD STYLE CARDS */}
          <div>
            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
              <Book1 className="w-5 h-5 md:w-6 md:h-6 text-[rgb(1,27,51)]" variant="Bold" />
              <h2 className="text-lg md:text-xl font-bold text-gray-900">Your Deck Collection</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5">
              {decks.map((deck, index) => {
                const isActive = selectedDeck === deck.id;
                const progress = deck.cardCount > 0 ? (deck.masteredCount / deck.cardCount) * 100 : 0;
                
                return (
                  <motion.div
                    key={deck.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative group"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSelectedDeck(isActive ? null : deck.id);
                        setCurrentCardIndex(0);
                        setIsFlipped(false);
                      }}
                      className={`w-full p-4 md:p-6 rounded-xl md:rounded-2xl border transition-all relative overflow-hidden shadow-lg ${
                        isActive 
                          ? 'border-white/40 shadow-2xl' 
                          : 'border-transparent hover:border-white/30 hover:shadow-xl'
                      }`}
                      style={{
                        backgroundImage: deck.color
                      }}
                    >
                      {/* Decorative Pattern - Like Flashcards */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 left-0 w-20 h-20 rounded-full bg-white -translate-x-10 -translate-y-10"></div>
                        <div className="absolute bottom-0 right-0 w-24 h-24 rounded-full bg-white translate-x-12 translate-y-12"></div>
                        <div className="absolute top-1/2 right-6 w-16 h-16 rounded-full bg-white/50"></div>
                      </div>
                      
                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-3 md:mb-4">
                          <motion.div 
                            animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                            transition={{ duration: 0.5 }}
                            className="text-3xl md:text-5xl drop-shadow-lg"
                          >
                            {deck.emoji}
                          </motion.div>
                          {isActive && (
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              className="w-6 h-6 md:w-8 md:h-8 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
                            >
                              <Crown className="w-4 h-4 md:w-5 md:h-5 text-white" variant="Bold" />
                            </motion.div>
                          )}
                        </div>
                        
                        <h3 className="text-white font-bold text-sm md:text-lg mb-2 line-clamp-1 drop-shadow-md">
                          {deck.name}
                        </h3>
                        
                        <div className="flex items-center justify-between text-xs md:text-sm mb-3 md:mb-4 gap-2">
                          <div className="text-white/90 font-medium">
                            {deck.cardCount} cards
                          </div>
                          <div className="text-white/90 font-medium">
                            {Math.round(progress)}%
                          </div>
                        </div>
                        
                        <div className="h-2 md:h-2.5 bg-white/30 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className="h-full rounded-full shadow-inner bg-white"
                          />
                        </div>
                      </div>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveSubject(deck.subject);
                      }}
                      className="absolute -top-1.5 -right-1.5 md:-top-2 md:-right-2 w-8 h-8 md:w-10 md:h-10 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 flex items-center justify-center shadow-lg border-2 md:border-4 border-white z-20"
                      title="Remove subject"
                    >
                      <CloseCircle className="w-5 h-5 md:w-6 md:h-6" variant="Bold" />
                    </motion.button>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Study Mode Filter - NO EMOJIS */}
          {selectedDeck && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap items-center gap-2 md:gap-3 bg-white p-3 md:p-4 rounded-xl md:rounded-2xl border-2 border-gray-200 shadow-md"
            >
              <span className="text-xs md:text-sm font-bold text-gray-700 flex items-center gap-1.5 md:gap-2">
                <Filter className="w-3.5 h-3.5 md:w-4 md:h-4" />
                Study Mode:
              </span>
              <div className="flex gap-2 flex-wrap">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setStudyMode('all');
                    setCurrentCardIndex(0);
                  }}
                  className={`px-3 md:px-5 py-2 md:py-2.5 rounded-lg md:rounded-xl text-xs md:text-sm font-bold transition-all shadow-md ${
                    studyMode === 'all'
                      ? 'bg-[rgb(1,27,51)] text-white shadow-lg'
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-[rgb(1,27,51)]'
                  }`}
                >
                  All Cards
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setStudyMode('review');
                    setCurrentCardIndex(0);
                  }}
                  className={`px-3 md:px-5 py-2 md:py-2.5 rounded-lg md:rounded-xl text-xs md:text-sm font-bold transition-all shadow-md ${
                    studyMode === 'review'
                      ? 'bg-[#FF6636] text-white shadow-lg'
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-[#FF6636]'
                  }`}
                >
                  Need Practice
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setStudyMode('mastered');
                    setCurrentCardIndex(0);
                  }}
                  className={`px-3 md:px-5 py-2 md:py-2.5 rounded-lg md:rounded-xl text-xs md:text-sm font-bold transition-all shadow-md ${
                    studyMode === 'mastered'
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-green-600'
                  }`}
                >
                  Mastered
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Flashcard Display */}
          {selectedDeck && filteredCards.length > 0 && currentCard && (
            <div className="space-y-4 md:space-y-6">
              {/* Session Stats - NO EMOJIS - MOVED TO TOP */}
              <div className="grid grid-cols-3 gap-3 md:gap-5 max-w-2xl mx-auto">
                <motion.div
                  whileHover={{ scale: 1.06 }}
                  className="bg-[rgb(1,27,51)] rounded-xl md:rounded-2xl p-4 md:p-6 text-center shadow-xl border-2 md:border-4 border-white"
                >
                  <div className="text-3xl md:text-5xl font-black text-white drop-shadow-md">{sessionStats.studied}</div>
                  <div className="text-xs md:text-sm text-white/90 mt-1.5 md:mt-2 font-bold">Studied</div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.06 }}
                  className="bg-green-600 rounded-xl md:rounded-2xl p-4 md:p-6 text-center shadow-xl border-2 md:border-4 border-white"
                >
                  <div className="text-3xl md:text-5xl font-black text-white drop-shadow-md">{sessionStats.mastered}</div>
                  <div className="text-xs md:text-sm text-white/90 mt-1.5 md:mt-2 font-bold">Mastered</div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.06 }}
                  className="bg-[#FF6636] rounded-xl md:rounded-2xl p-4 md:p-6 text-center shadow-xl border-2 md:border-4 border-white"
                >
                  <div className="text-3xl md:text-5xl font-black text-white drop-shadow-md">{sessionStats.needReview}</div>
                  <div className="text-xs md:text-sm text-white/90 mt-1.5 md:mt-2 font-bold">Practice</div>
                </motion.div>
              </div>

              {/* Card Counter */}
              <div className="flex items-center justify-between bg-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-lg border-2 border-gray-100">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-[rgb(1,27,51)] rounded-lg md:rounded-xl flex items-center justify-center shadow-md">
                    <span className="text-white font-bold text-xs md:text-base">
                      {currentCardIndex + 1}/{filteredCards.length}
                    </span>
                  </div>
                  <div>
                    <p className="text-[10px] md:text-xs text-gray-500 font-semibold">Progress</p>
                    <p className="font-bold text-gray-900 text-sm md:text-lg">
                      {Math.round(((currentCardIndex + 1) / filteredCards.length) * 100)}% Complete
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 md:gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handlePrevious}
                    disabled={currentCardIndex === 0}
                    className="w-9 h-9 md:w-12 md:h-12 bg-gray-100 hover:bg-gray-200 rounded-lg md:rounded-xl flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-md"
                  >
                    <ArrowLeft2 className="w-4 h-4 md:w-6 md:h-6 text-gray-700" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleNext}
                    disabled={currentCardIndex === filteredCards.length - 1}
                    className="w-9 h-9 md:w-12 md:h-12 bg-[#FF6636] hover:bg-[#e55a2f] rounded-lg md:rounded-xl flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-md"
                  >
                    <ArrowRight2 className="w-4 h-4 md:w-6 md:h-6 text-white" />
                  </motion.button>
                </div>
              </div>

              {/* COLORFUL GRADIENT 3D FLIP CARD - SMALLER ON DESKTOP */}
              <div className="perspective-1000 mx-auto max-w-md lg:max-w-lg px-2 md:px-0">
                <motion.div
                  className="relative w-full transition-transform duration-700 transform-style-3d cursor-pointer"
                  onClick={handleFlip}
                  whileHover={{ scale: 1.02, y: -8 }}
                  style={{
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.7s cubic-bezier(0.4, 0.0, 0.2, 1)',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  }}
                >
                  {/* FRONT OF CARD - COLORFUL GRADIENT BACKGROUND */}
                  <div
                    className="w-full min-h-[320px] md:min-h-[360px] lg:min-h-[380px] rounded-2xl md:rounded-3xl shadow-2xl p-5 md:p-8 lg:p-10 flex flex-col backface-hidden relative overflow-hidden"
                    style={{
                      backgroundImage: currentCard.gradient,
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                    }}
                  >
                    {/* Decorative Pattern - Like Dashboard */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-white -translate-x-16 -translate-y-16"></div>
                      <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-white translate-x-20 translate-y-20"></div>
                      <div className="absolute top-1/2 right-10 w-24 h-24 rounded-full bg-white/50"></div>
                    </div>
                    
                    {/* Header */}
                    <div className="relative z-10 flex items-center justify-between mb-auto">
                      <div className="flex items-center gap-2 md:gap-3">
                        <span className="text-2xl md:text-3xl lg:text-4xl">{currentCard.emoji}</span>
                        <span className="text-xs md:text-sm font-bold text-white/90 uppercase tracking-wider">
                          {currentCard.subject}
                        </span>
                      </div>
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <span className="text-xs md:text-sm font-bold text-white">Q</span>
                      </div>
                    </div>
                    
                    {/* Question - Centered */}
                    <div className="relative z-10 flex-1 flex items-center justify-center text-center px-2 md:px-4">
                      <p className="text-base md:text-xl lg:text-2xl font-bold text-white leading-relaxed drop-shadow-md">
                        {currentCard.question}
                      </p>
                    </div>
                    
                    {/* Footer */}
                    <div className="relative z-10 flex items-center justify-center gap-2 mt-auto pt-4">
                      <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse"></div>
                      <p className="text-xs md:text-sm text-white/80 font-medium">Tap to reveal answer</p>
                      <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse"></div>
                    </div>
                  </div>

                  {/* BACK OF CARD - WHITE WITH GRADIENT BORDER - LIKE DASHBOARD */}
                  <div
                    className="absolute top-0 left-0 w-full min-h-[320px] md:min-h-[360px] lg:min-h-[380px] rounded-2xl md:rounded-3xl shadow-2xl backface-hidden overflow-hidden"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    {/* Gradient Border */}
                    <div 
                      className="absolute inset-0 rounded-2xl md:rounded-3xl"
                      style={{
                        backgroundImage: currentCard.gradient,
                        padding: '4px'
                      }}
                    >
                      <div className="w-full h-full bg-white rounded-2xl md:rounded-3xl"></div>
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10 h-full p-5 md:p-8 lg:p-10 flex flex-col">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-6 md:mb-8">
                        <div className="flex items-center gap-2 md:gap-3">
                          <div 
                            className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center"
                            style={{ backgroundImage: currentCard.gradient }}
                          >
                            <span className="text-xl md:text-2xl">{currentCard.emoji}</span>
                          </div>
                          <div>
                            <p className="text-xs md:text-sm font-bold uppercase tracking-wider" style={{ 
                              backgroundImage: currentCard.gradient,
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              backgroundClip: 'text'
                            }}>
                              Answer
                            </p>
                            <p className="text-xs text-gray-500">{currentCard.subject}</p>
                          </div>
                        </div>
                        <div 
                          className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white"
                          style={{ background: currentCard.gradient }}
                        >
                          <span className="text-xs md:text-sm font-bold">A</span>
                        </div>
                      </div>
                      
                      {/* Answer - Centered */}
                      <div className="flex-1 flex items-center justify-center text-center">
                        <p className="text-sm md:text-base lg:text-lg text-gray-800 leading-relaxed font-medium">
                          {currentCard.answer}
                        </p>
                      </div>
                      
                      {/* Footer - Tap to flip */}
                      <div className="flex items-center justify-center gap-2 mt-auto pt-4">
                        <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse"></div>
                        <p className="text-xs md:text-sm text-gray-500 font-medium">Tap to flip back</p>
                        <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Action Buttons - ONLY SHOW WHEN FLIPPED, NO EMOJIS */}
              {isFlipped && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 md:gap-5"
                >
                  <motion.button
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNeedReview();
                    }}
                    className="flex items-center justify-center gap-2 md:gap-3 px-6 md:px-10 py-3.5 md:py-5 bg-[#FF6636] hover:bg-[#e55a2f] text-white rounded-xl md:rounded-2xl font-bold text-base md:text-lg shadow-xl transition-all"
                  >
                    <Refresh className="w-5 h-5 md:w-7 md:h-7" variant="Bold" />
                    Need Practice
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMarkMastered();
                    }}
                    className="flex items-center justify-center gap-2 md:gap-3 px-6 md:px-10 py-3.5 md:py-5 bg-green-600 hover:bg-green-700 text-white rounded-xl md:rounded-2xl font-bold text-base md:text-lg shadow-xl transition-all"
                  >
                    <TickCircle className="w-5 h-5 md:w-7 md:h-7" variant="Bold" />
                    I Got This
                  </motion.button>
                </motion.div>
              )}
            </div>
          )}

          {/* No cards - NO EMOJIS */}
          {selectedDeck && filteredCards.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl md:rounded-2xl p-8 md:p-12 text-center border-4 border-dashed border-gray-300"
            >
              <Eye className="w-16 h-16 md:w-20 md:h-20 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                No cards here
              </h3>
              <p className="text-gray-600 text-base md:text-lg">
                Try switching to a different study mode
              </p>
            </motion.div>
          )}
        </>
      )}

      {/* Add Subject Modal - NO DARK HEADER, CLEAN DESIGN */}
      {showAddSubjectModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl md:rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
          >
            <div className="sticky top-0 bg-white px-4 md:px-6 py-4 md:py-5 flex items-center justify-between border-b border-gray-200 rounded-t-2xl md:rounded-t-3xl z-10">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Gift className="w-5 h-5 md:w-6 md:h-6 text-[#FF6636]" variant="Bold" />
                Choose Your Subjects
              </h2>
              <button
                onClick={() => setShowAddSubjectModal(false)}
                className="w-9 h-9 md:w-10 md:h-10 bg-gray-100 hover:bg-gray-200 rounded-lg md:rounded-xl transition-colors flex items-center justify-center flex-shrink-0"
              >
                <CloseCircle className="w-5 h-5 md:w-6 md:h-6 text-gray-700" variant="Bold" />
              </button>
            </div>
            
            <div className="p-4 md:p-6">
              {availableSubjects.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {availableSubjects.map((subject, index) => {
                    const config = subjectConfigs[subject];
                    return (
                      <motion.button
                        key={subject}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          handleAddSubject(subject);
                          setShowAddSubjectModal(false);
                        }}
                        className="p-4 md:p-5 border-4 border-gray-200 rounded-xl md:rounded-2xl hover:border-[#FF6636] hover:shadow-xl transition-all text-left group relative overflow-hidden bg-white"
                      >
                        <div className="flex items-center gap-3 md:gap-4">
                          <div 
                            className="w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center text-2xl md:text-3xl shadow-lg transform group-hover:scale-110 transition-transform flex-shrink-0"
                            style={{ background: config.color }}
                          >
                            {config.emoji}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-base md:text-lg text-gray-900 group-hover:text-[#FF6636] transition-colors truncate">
                              {subject}
                            </h3>
                            <p className="text-xs md:text-sm text-gray-600 font-medium">
                              {allFlashcards.filter(c => c.subject === subject).length} cards ready
                            </p>
                          </div>
                          <div className="w-9 h-9 md:w-10 md:h-10 bg-[#FF6636] rounded-lg md:rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                            <Add className="w-5 h-5 md:w-6 md:h-6 text-white" variant="Bold" />
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 md:py-12">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <MedalStar className="w-16 h-16 md:w-20 md:h-20 text-[#FF6636] mx-auto mb-4" variant="Bold" />
                  </motion.div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                    You're a Champion
                  </h3>
                  <p className="text-gray-600 text-base md:text-lg">
                    You've unlocked all subjects
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
}