// Shared flashcard configuration for Dot-tutor platform

export interface Flashcard {
  id: number;
  subject: string;
  question: string;
  answer: string;
  gradient: string;
  emoji: string;
  deckName: string;
  mastered: boolean;
}

// All available subjects - MULTICOLORED GRADIENTS
export const subjectConfigs: Record<string, { color: string; emoji: string; pattern: string }> = {
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

// Sample Flashcards Data - Shared across platform
export const allFlashcards: Flashcard[] = [
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
