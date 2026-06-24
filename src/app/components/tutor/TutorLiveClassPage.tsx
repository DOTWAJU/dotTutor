import React from 'react';
import { 
  ArrowLeft2, 
  Video, 
  MicrophoneSlash, 
  Microphone,
  VideoSlash,
  Monitor,
  Messages2,
  DocumentText,
  Clock,
  Call,
  User,
  Book,
  ClipboardText,
  Add,
  Send2,
  Trash,
  TickCircle,
} from 'iconsax-react';
import { toast } from 'sonner';

interface QuizQuestion {
  id: string;
  text: string;
  type: 'multiple-choice' | 'short-answer';
  options?: string[];
  correctAnswer?: string;
  isPosted: boolean;
  studentAnswer?: string;
  answeredAt?: Date;
}

interface TutorLiveClassPageProps {
  lesson: {
    studentName: string;
    studentInitials: string;
    subject: string;
    topic: string;
    date: Date;
    time: string;
    meetingLink?: string;
    duration: number;
  };
  onBack: () => void;
  onEndClass: () => void;
}

export function TutorLiveClassPage({ lesson, onBack, onEndClass }: TutorLiveClassPageProps) {
  const [isMuted, setIsMuted] = React.useState(false);
  const [isVideoOff, setIsVideoOff] = React.useState(false);
  const [isChatOpen, setIsChatOpen] = React.useState(false);
  const [isNotesOpen, setIsNotesOpen] = React.useState(false);
  const [isQuizPanelOpen, setIsQuizPanelOpen] = React.useState(false);
  const [lessonNotes, setLessonNotes] = React.useState('');
  const [quizQuestions, setQuizQuestions] = React.useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = React.useState('');
  const [currentQuestionType, setCurrentQuestionType] = React.useState<'multiple-choice' | 'short-answer'>('multiple-choice');
  const [currentOptions, setCurrentOptions] = React.useState<string[]>(['', '']);
  const [currentCorrectAnswer, setCurrentCorrectAnswer] = React.useState('');
  const [chatMessages, setChatMessages] = React.useState<{sender: string; message: string; time: string}[]>([
    { sender: 'tutor', message: 'Hello! Welcome to today\'s session. Are you ready to start?', time: '10:00 AM' }
  ]);
  const [newMessage, setNewMessage] = React.useState('');
  const [sessionTime, setSessionTime] = React.useState('00:00');
  const [isRecording, setIsRecording] = React.useState(false);

  // Session Timer
  React.useEffect(() => {
    let seconds = 0;
    const interval = setInterval(() => {
      seconds++;
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      setSessionTime(`${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const now = new Date();
      const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      
      setChatMessages([...chatMessages, {
        sender: 'tutor',
        message: newMessage,
        time
      }]);
      setNewMessage('');
    }
  };

  const handleEndClass = () => {
    if (confirm('Are you sure you want to end this class?')) {
      toast.success('Class ended successfully', {
        description: 'Your lesson notes have been saved',
        duration: 3000,
      });
      onEndClass();
    }
  };

  const handleStartRecording = () => {
    setIsRecording(!isRecording);
    toast.success(isRecording ? 'Recording stopped' : 'Recording started', {
      duration: 2000,
    });
  };

  const addOption = () => {
    setCurrentOptions([...currentOptions, '']);
  };

  const updateOption = (index: number, value: string) => {
    const updated = [...currentOptions];
    updated[index] = value;
    setCurrentOptions(updated);
  };

  const removeOption = (index: number) => {
    if (currentOptions.length > 2) {
      setCurrentOptions(currentOptions.filter((_, i) => i !== index));
    }
  };

  const handlePostQuestion = () => {
    if (!currentQuestion.trim()) {
      toast.error('Please enter a question');
      return;
    }

    if (currentQuestionType === 'multiple-choice') {
      if (currentOptions.some(opt => !opt.trim())) {
        toast.error('Please fill in all options');
        return;
      }
      if (!currentCorrectAnswer) {
        toast.error('Please select the correct answer');
        return;
      }
    }

    const newQuestion: QuizQuestion = {
      id: Date.now().toString(),
      text: currentQuestion,
      type: currentQuestionType,
      options: currentQuestionType === 'multiple-choice' ? currentOptions : undefined,
      correctAnswer: currentCorrectAnswer,
      isPosted: true,
    };

    setQuizQuestions([...quizQuestions, newQuestion]);
    
    // Reset form
    setCurrentQuestion('');
    setCurrentOptions(['', '']);
    setCurrentCorrectAnswer('');
    
    toast.success('Quiz question posted!', {
      description: 'The student can now see and answer this question',
      duration: 3000,
    });
  };

  const handleSaveDraft = () => {
    if (!currentQuestion.trim()) {
      toast.error('Please enter a question');
      return;
    }

    const newQuestion: QuizQuestion = {
      id: Date.now().toString(),
      text: currentQuestion,
      type: currentQuestionType,
      options: currentQuestionType === 'multiple-choice' ? currentOptions.filter(opt => opt.trim()) : undefined,
      correctAnswer: currentCorrectAnswer,
      isPosted: false,
    };

    setQuizQuestions([...quizQuestions, newQuestion]);
    
    // Reset form
    setCurrentQuestion('');
    setCurrentOptions(['', '']);
    setCurrentCorrectAnswer('');
    
    toast.success('Question saved as draft');
  };

  const handleDeleteQuestion = (id: string) => {
    setQuizQuestions(quizQuestions.filter(q => q.id !== id));
    toast.success('Question deleted');
  };

  const handlePostDraftQuestion = (id: string) => {
    const updated = quizQuestions.map(q => 
      q.id === id ? { ...q, isPosted: true } : q
    );
    setQuizQuestions(updated);
    toast.success('Question posted to student!');
  };

  // Simulate student answering (in real app, this would come from websocket)
  const simulateStudentAnswer = (questionId: string) => {
    const question = quizQuestions.find(q => q.id === questionId);
    if (!question) return;

    setTimeout(() => {
      const updated = quizQuestions.map(q => {
        if (q.id === questionId) {
          return {
            ...q,
            studentAnswer: q.type === 'multiple-choice' 
              ? q.options![Math.floor(Math.random() * q.options!.length)]
              : 'This is a sample student answer to demonstrate the functionality.',
            answeredAt: new Date()
          };
        }
        return q;
      });
      setQuizQuestions(updated);
      toast.success(`${lesson.studentName} answered the question!`);
    }, 3000);
  };

  return (
    <div className="pb-8 h-screen flex flex-col">
      {/* Top Header */}
      <div className="bg-white border-b border-[#e9eaf0] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#FF6636] hover:text-[#E55A2B]"
          >
            <ArrowLeft2 size={20} />
            <span className="text-sm font-medium hidden sm:block">Back</span>
          </button>

          <div className="h-6 w-px bg-gray-300"></div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FF6636]/10 flex items-center justify-center">
              <Book size={20} className="text-[#FF6636]" variant="Bold" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-900">{lesson.topic}</h2>
              <p className="text-xs text-[#6e7485]">{lesson.subject} - {lesson.studentName}</p>
            </div>
          </div>
        </div>

        {/* Session Info */}
        <div className="hidden md:flex items-center gap-4">
          {/* Session Timer */}
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
            <Clock size={18} className="text-[#6e7485]" variant="Bold" />
            <span className="text-sm font-semibold text-gray-900">{sessionTime}</span>
          </div>

          {/* Recording Status */}
          {isRecording && (
            <div className="flex items-center gap-2 px-4 py-2 bg-red-50 rounded-lg animate-pulse">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-sm font-semibold text-red-600">Recording</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Video Area */}
        <div className="flex-1 bg-gray-900 relative flex items-center justify-center">
          {/* Placeholder for video feed */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center mx-auto mb-4">
                <Video size={60} className="text-gray-400" variant="Bold" />
              </div>
              <p className="text-white text-lg font-semibold mb-2">Live Session in Progress</p>
              <p className="text-gray-400 text-sm">Teaching {lesson.studentName}</p>
            </div>
          </div>

          {/* Student Video (Small) - Top Right */}
          <div className="absolute top-4 right-4 w-48 h-36 bg-gray-800 rounded-xl border-2 border-gray-700 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#FF6636] flex items-center justify-center mx-auto mb-2 text-white font-bold text-lg">
                {lesson.studentInitials}
              </div>
              <p className="text-white text-xs font-medium">{lesson.studentName}</p>
            </div>
          </div>

          {/* Control Bar - Bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex items-center justify-center gap-3">
              {/* Mute Button */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-4 rounded-full transition-all ${
                  isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-white/20 hover:bg-white/30'
                }`}
              >
                {isMuted ? (
                  <MicrophoneSlash size={24} className="text-white" variant="Bold" />
                ) : (
                  <Microphone size={24} className="text-white" variant="Bold" />
                )}
              </button>

              {/* Video Toggle */}
              <button
                onClick={() => setIsVideoOff(!isVideoOff)}
                className={`p-4 rounded-full transition-all ${
                  isVideoOff ? 'bg-red-500 hover:bg-red-600' : 'bg-white/20 hover:bg-white/30'
                }`}
              >
                {isVideoOff ? (
                  <VideoSlash size={24} className="text-white" variant="Bold" />
                ) : (
                  <Video size={24} className="text-white" variant="Bold" />
                )}
              </button>

              {/* Screen Share */}
              <button
                onClick={() => toast.info('Screen sharing feature coming soon')}
                className="p-4 rounded-full bg-white/20 hover:bg-white/30 transition-all"
              >
                <Monitor size={24} className="text-white" variant="Bold" />
              </button>

              {/* Record */}
              <button
                onClick={handleStartRecording}
                className={`p-4 rounded-full transition-all ${
                  isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-white/20 hover:bg-white/30'
                }`}
              >
                <div className={`w-6 h-6 rounded-full ${isRecording ? 'bg-white' : 'bg-red-500'}`} />
              </button>

              {/* End Call */}
              <button
                onClick={handleEndClass}
                className="p-4 rounded-full bg-red-500 hover:bg-red-600 transition-all"
              >
                <Call size={24} className="text-white rotate-[135deg]" variant="Bold" />
              </button>

              {/* Chat Toggle */}
              <button
                onClick={() => {
                  setIsChatOpen(!isChatOpen);
                  setIsNotesOpen(false);
                  setIsQuizPanelOpen(false);
                }}
                className={`p-4 rounded-full transition-all ${
                  isChatOpen ? 'bg-[#FF6636] hover:bg-[#E55A2B]' : 'bg-white/20 hover:bg-white/30'
                }`}
              >
                <Messages2 size={24} className="text-white" variant="Bold" />
              </button>

              {/* Notes Toggle */}
              <button
                onClick={() => {
                  setIsNotesOpen(!isNotesOpen);
                  setIsChatOpen(false);
                  setIsQuizPanelOpen(false);
                }}
                className={`p-4 rounded-full transition-all ${
                  isNotesOpen ? 'bg-[#FF6636] hover:bg-[#E55A2B]' : 'bg-white/20 hover:bg-white/30'
                }`}
              >
                <DocumentText size={24} className="text-white" variant="Bold" />
              </button>

              {/* Quiz Toggle */}
              <button
                onClick={() => {
                  setIsQuizPanelOpen(!isQuizPanelOpen);
                  setIsChatOpen(false);
                  setIsNotesOpen(false);
                }}
                className={`p-4 rounded-full transition-all ${
                  isQuizPanelOpen ? 'bg-[#FF6636] hover:bg-[#E55A2B]' : 'bg-white/20 hover:bg-white/30'
                }`}
              >
                <ClipboardText size={24} className="text-white" variant="Bold" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Chat/Notes/Quiz */}
        {(isChatOpen || isNotesOpen || isQuizPanelOpen) && (
          <div className="w-80 lg:w-96 bg-white border-l border-gray-200 flex flex-col">
            {/* Chat Panel */}
            {isChatOpen && (
              <>
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900">Chat</h3>
                  <p className="text-xs text-gray-500 mt-1">Communicate with {lesson.studentName}</p>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.sender === 'tutor' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                          msg.sender === 'tutor'
                            ? 'bg-[#FF6636] text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                        <p className={`text-xs mt-1 ${
                          msg.sender === 'tutor' ? 'text-orange-100' : 'text-gray-500'
                        }`}>
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t border-gray-200">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#FF6636]"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="px-4 py-2 bg-[#FF6636] text-white rounded-xl hover:bg-[#E55A2B] transition-all"
                    >
                      <Send2 size={20} variant="Bold" />
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Notes Panel */}
            {isNotesOpen && (
              <>
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900">Lesson Notes</h3>
                  <p className="text-xs text-gray-500 mt-1">Take notes during the session</p>
                </div>

                <div className="flex-1 p-4">
                  <textarea
                    value={lessonNotes}
                    onChange={(e) => setLessonNotes(e.target.value)}
                    placeholder="Write your lesson notes here..."
                    className="w-full h-full p-4 border border-gray-300 rounded-xl resize-none focus:outline-none focus:border-[#FF6636]"
                  />
                </div>

                <div className="p-4 border-t border-gray-200">
                  <button
                    onClick={() => {
                      toast.success('Notes saved!', { duration: 2000 });
                    }}
                    className="w-full px-4 py-2 bg-[#FF6636] text-white rounded-xl font-semibold hover:bg-[#E55A2B] transition-all"
                  >
                    Save Notes
                  </button>
                </div>
              </>
            )}

            {/* Live Quiz Panel */}
            {isQuizPanelOpen && (
              <>
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900">Live Quiz</h3>
                  <p className="text-xs text-gray-500 mt-1">Post questions to {lesson.studentName} in real-time</p>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {/* Create New Question Form */}
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 bg-gray-50">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Create Question</h4>
                    
                    {/* Question Text */}
                    <div className="mb-3">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Question
                      </label>
                      <textarea
                        value={currentQuestion}
                        onChange={(e) => setCurrentQuestion(e.target.value)}
                        placeholder="Enter your question..."
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#FF6636] focus:border-transparent"
                      />
                    </div>

                    {/* Question Type */}
                    <div className="mb-3">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Type
                      </label>
                      <select
                        value={currentQuestionType}
                        onChange={(e) => {
                          setCurrentQuestionType(e.target.value as 'multiple-choice' | 'short-answer');
                          if (e.target.value === 'short-answer') {
                            setCurrentOptions(['', '']);
                          }
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6636] focus:border-transparent"
                      >
                        <option value="multiple-choice">Multiple Choice</option>
                        <option value="short-answer">Short Answer</option>
                      </select>
                    </div>

                    {/* Multiple Choice Options */}
                    {currentQuestionType === 'multiple-choice' && (
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-xs font-medium text-gray-700">
                            Options
                          </label>
                          <button
                            onClick={addOption}
                            className="text-xs px-2 py-1 border border-[#FF6636] text-[#FF6636] rounded hover:bg-[#FF6636] hover:text-white transition-all"
                          >
                            + Add
                          </button>
                        </div>
                        <div className="space-y-2">
                          {currentOptions.map((option, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <input
                                type="radio"
                                name="correctAnswer"
                                checked={currentCorrectAnswer === option && option !== ''}
                                onChange={() => setCurrentCorrectAnswer(option)}
                                className="w-4 h-4 text-[#FF6636] focus:ring-[#FF6636]"
                              />
                              <input
                                type="text"
                                value={option}
                                onChange={(e) => {
                                  updateOption(index, e.target.value);
                                  if (currentCorrectAnswer === option) {
                                    setCurrentCorrectAnswer(e.target.value);
                                  }
                                }}
                                placeholder={`Option ${String.fromCharCode(65 + index)}`}
                                className="flex-1 px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6636] focus:border-transparent"
                              />
                              {currentOptions.length > 2 && (
                                <button
                                  onClick={() => removeOption(index)}
                                  className="p-1 hover:bg-red-100 rounded transition-colors"
                                >
                                  <Trash className="w-4 h-4 text-red-600" variant="Linear" />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Select the correct answer</p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={handlePostQuestion}
                        className="flex-1 px-3 py-2 bg-[#FF6636] text-white rounded-lg font-semibold hover:bg-[#E55A2B] transition-all text-sm"
                      >
                        Post Now
                      </button>
                      <button
                        onClick={handleSaveDraft}
                        className="flex-1 px-3 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-[#FF6636] hover:text-[#FF6636] transition-all text-sm"
                      >
                        Save Draft
                      </button>
                    </div>
                  </div>

                  {/* Posted & Draft Questions */}
                  {quizQuestions.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-gray-900">Questions</h4>
                      {quizQuestions.map((question, index) => (
                        <div
                          key={question.id}
                          className={`border rounded-xl p-3 ${
                            question.isPosted 
                              ? 'border-green-200 bg-green-50' 
                              : 'border-gray-200 bg-white'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-start gap-2 flex-1">
                              <span className="flex-shrink-0 w-6 h-6 bg-[#FF6636] text-white rounded-full flex items-center justify-center text-xs font-bold">
                                {index + 1}
                              </span>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 break-words">
                                  {question.text}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {question.type === 'multiple-choice' ? 'Multiple Choice' : 'Short Answer'}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              {!question.isPosted && (
                                <button
                                  onClick={() => {
                                    handlePostDraftQuestion(question.id);
                                    simulateStudentAnswer(question.id);
                                  }}
                                  className="p-1.5 hover:bg-green-100 rounded transition-colors"
                                  title="Post question"
                                >
                                  <Send2 className="w-4 h-4 text-green-600" variant="Linear" />
                                </button>
                              )}
                              <button
                                onClick={() => handleDeleteQuestion(question.id)}
                                className="p-1.5 hover:bg-red-100 rounded transition-colors"
                              >
                                <Trash className="w-4 h-4 text-red-600" variant="Linear" />
                              </button>
                            </div>
                          </div>

                          {/* Status Badge */}
                          {question.isPosted && (
                            <div className="mt-2">
                              {question.studentAnswer ? (
                                <div className="bg-white rounded-lg p-2 border border-green-200">
                                  <div className="flex items-center gap-1 mb-1">
                                    <TickCircle className="w-4 h-4 text-green-600" variant="Bold" />
                                    <span className="text-xs font-semibold text-green-600">Answered</span>
                                  </div>
                                  <p className="text-xs text-gray-700">
                                    <span className="font-medium">Answer:</span> {question.studentAnswer}
                                  </p>
                                  {question.correctAnswer && question.studentAnswer === question.correctAnswer && (
                                    <p className="text-xs text-green-600 font-semibold mt-1">✓ Correct!</p>
                                  )}
                                  {question.correctAnswer && question.studentAnswer !== question.correctAnswer && (
                                    <p className="text-xs text-gray-600 mt-1">
                                      Correct answer: {question.correctAnswer}
                                    </p>
                                  )}
                                </div>
                              ) : (
                                <div className="flex items-center gap-1">
                                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                                  <span className="text-xs font-medium text-yellow-700">Waiting for answer...</span>
                                </div>
                              )}
                            </div>
                          )}
                          
                          {!question.isPosted && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-xs font-medium text-gray-600 mt-2">
                              Draft
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
