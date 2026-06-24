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
  VideoPlay,
  Send2,
  ClipboardText,
  TickCircle,
} from 'iconsax-react';
import { toast } from 'sonner';

interface QuizQuestion {
  id: string;
  text: string;
  type: 'multiple-choice' | 'short-answer';
  options?: string[];
  postedAt: Date;
}

interface LiveClassPageProps {
  lesson: {
    tutor: {
      name: string;
      image: string;
      subject: string;
    };
    topic: string;
    date: string;
    timeSlot: string;
    lessonMode: string;
    description: string;
    meetingLink?: string;
    sessionDuration: string;
  };
  onBack: () => void;
  onEndClass: () => void;
}

export function LiveClassPage({ lesson, onBack, onEndClass }: LiveClassPageProps) {
  const [isMuted, setIsMuted] = React.useState(false);
  const [isVideoOff, setIsVideoOff] = React.useState(false);
  const [isChatOpen, setIsChatOpen] = React.useState(false);
  const [isNotesOpen, setIsNotesOpen] = React.useState(false);
  const [isQuizOpen, setIsQuizOpen] = React.useState(false);
  const [classNotes, setClassNotes] = React.useState('');
  const [activeQuizQuestion, setActiveQuizQuestion] = React.useState<QuizQuestion | null>(null);
  const [quizAnswer, setQuizAnswer] = React.useState('');
  const [hasAnswered, setHasAnswered] = React.useState(false);
  const [answeredQuestions, setAnsweredQuestions] = React.useState<{id: string; answer: string}[]>([]);
  const [chatMessages, setChatMessages] = React.useState<{sender: string; message: string; time: string}[]>([
    { sender: 'tutor', message: 'Hello! Welcome to today\'s session. Are you ready to start?', time: '10:00 AM' }
  ]);
  const [newMessage, setNewMessage] = React.useState('');
  const [sessionTime, setSessionTime] = React.useState('00:00');
  const [isRecording, setIsRecording] = React.useState(false);
  const [showQuizNotification, setShowQuizNotification] = React.useState(false);

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
        sender: 'student',
        message: newMessage,
        time
      }]);
      setNewMessage('');
    }
  };

  const handleCopyLink = () => {
    if (lesson.meetingLink) {
      // Try clipboard API first, fallback to manual copy
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(lesson.meetingLink)
          .then(() => {
            toast.success('Meeting link copied!', {
              duration: 2000,
            });
          })
          .catch(() => {
            // Fallback: show the link instead
            toast.success('Meeting Link', {
              description: lesson.meetingLink,
              duration: 4000,
            });
          });
      } else {
        // Clipboard API not available, show the link
        toast.success('Meeting Link', {
          description: lesson.meetingLink,
          duration: 4000,
        });
      }
    }
  };

  const handleEndClass = () => {
    if (confirm('Are you sure you want to end this class?')) {
      toast.success('Class ended successfully', {
        description: 'Your session notes have been saved',
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

  const handleSubmitQuizAnswer = () => {
    if (!quizAnswer.trim()) {
      toast.error('Please provide an answer');
      return;
    }

    if (activeQuizQuestion) {
      setAnsweredQuestions([...answeredQuestions, { id: activeQuizQuestion.id, answer: quizAnswer }]);
      setHasAnswered(true);
      toast.success('Answer submitted!', {
        description: 'Your tutor can now see your response',
        duration: 3000,
      });
      
      // Reset after 3 seconds
      setTimeout(() => {
        setActiveQuizQuestion(null);
        setQuizAnswer('');
        setHasAnswered(false);
        setShowQuizNotification(false);
        setIsQuizOpen(false);
      }, 3000);
    }
  };

  // Simulate receiving a quiz question from tutor (in real app, this would come from websocket)
  React.useEffect(() => {
    const demoQuiz = setTimeout(() => {
      const newQuestion: QuizQuestion = {
        id: '1',
        text: 'What is the derivative of x²?',
        type: 'multiple-choice',
        options: ['2x', 'x', '2', 'x²'],
        postedAt: new Date(),
      };
      setActiveQuizQuestion(newQuestion);
      setShowQuizNotification(true);
      toast.info('New quiz question from your tutor!', {
        duration: 4000,
      });
    }, 10000); // Show after 10 seconds

    return () => clearTimeout(demoQuiz);
  }, []);

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
              <p className="text-xs text-[#6e7485]">{lesson.tutor.subject}</p>
            </div>
          </div>
        </div>

        {/* Session Info */}
        <div className="hidden md:flex items-center gap-4">
          {/* Session Timer */}
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
            <Clock size={16} className="text-gray-600" />
            <span className="text-sm font-semibold text-gray-900">{sessionTime}</span>
          </div>

          {/* Recording Indicator */}
          {isRecording && (
            <div className="flex items-center gap-2 px-3 py-2 bg-red-50 rounded-lg animate-pulse">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-sm font-semibold text-red-600">Recording</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 p-4 overflow-hidden">
        {/* Left Side - Video Area */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Video Display */}
          <div className="flex-1 bg-gray-900 rounded-lg relative overflow-hidden min-h-[300px] lg:min-h-0">
            {/* Tutor Video (Main) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-[#FF6636] flex items-center justify-center mx-auto mb-4">
                  <User size={48} className="text-white" variant="Bold" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-1">{lesson.tutor.name}</h3>
                <p className="text-sm text-gray-300">{lesson.tutor.subject} Tutor</p>
              </div>
            </div>

            {/* Student Video (Picture-in-Picture) */}
            <div className="absolute bottom-4 right-4 w-32 h-24 bg-gray-800 rounded-lg border-2 border-white shadow-lg">
              {isVideoOff ? (
                <div className="w-full h-full flex items-center justify-center">
                  <VideoSlash size={24} className="text-gray-400" />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#564FFD] flex items-center justify-center">
                    <User size={24} className="text-white" variant="Bold" />
                  </div>
                </div>
              )}
              <div className="absolute bottom-1 left-1 right-1 text-center">
                <span className="text-xs text-white font-medium">You</span>
              </div>
            </div>

            {/* Live Badge */}
            <div className="absolute top-4 left-4 px-3 py-1.5 bg-red-500 rounded-full flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-xs font-bold text-white">LIVE</span>
            </div>

            {/* Lesson Info Overlay */}
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2">
              <p className="text-xs text-white/80">Session Time</p>
              <p className="text-sm font-bold text-white">{lesson.timeSlot}</p>
            </div>
          </div>

          {/* Video Controls */}
          <div className="bg-white border border-[#e9eaf0] rounded-lg p-4">
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {/* Microphone Toggle */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                  isMuted 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <MicrophoneSlash size={24} /> : <Microphone size={24} />}
              </button>

              {/* Video Toggle */}
              <button
                onClick={() => setIsVideoOff(!isVideoOff)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                  isVideoOff 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
                title={isVideoOff ? 'Turn on camera' : 'Turn off camera'}
              >
                {isVideoOff ? <VideoSlash size={24} /> : <Video size={24} />}
              </button>

              {/* Screen Share */}
              <button
                className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors"
                title="Share screen"
                onClick={() => toast.info('Screen sharing feature', { duration: 2000 })}
              >
                <Monitor size={24} />
              </button>

              {/* Record */}
              <button
                onClick={handleStartRecording}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                  isRecording 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
                title={isRecording ? 'Stop recording' : 'Start recording'}
              >
                <VideoPlay size={24} />
              </button>

              {/* Chat Toggle */}
              <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                  isChatOpen 
                    ? 'bg-[#FF6636] text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
                title="Toggle chat"
              >
                <Messages2 size={24} />
              </button>

              {/* Notes Toggle */}
              <button
                onClick={() => setIsNotesOpen(!isNotesOpen)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                  isNotesOpen 
                    ? 'bg-[#564FFD] text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
                title="Toggle notes"
              >
                <DocumentText size={24} />
              </button>

              <div className="w-px h-8 bg-gray-300 mx-2"></div>

              {/* End Call */}
              <button
                onClick={handleEndClass}
                className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center gap-2 font-semibold transition-colors"
              >
                <Call size={20} />
                <span className="text-sm">End Class</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Info Panel */}
        <div className="w-full lg:w-96 flex flex-col gap-4">
          {/* Lesson Details Card */}
          <div className="bg-white border border-[#e9eaf0] rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase">Lesson Details</h3>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3 pb-3 border-b border-gray-200">
                <img 
                  src={lesson.tutor.image} 
                  alt={lesson.tutor.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-gray-900">{lesson.tutor.name}</h4>
                  <p className="text-xs text-[#6e7485]">{lesson.tutor.subject} Tutor</p>
                </div>
              </div>

              <div>
                <p className="text-xs text-[#6e7485] mb-1">Topic</p>
                <p className="text-sm font-medium text-gray-900">{lesson.topic}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-[#6e7485] mb-1">Date</p>
                  <p className="text-sm font-medium text-gray-900">{lesson.date}</p>
                </div>
                <div>
                  <p className="text-xs text-[#6e7485] mb-1">Time</p>
                  <p className="text-sm font-medium text-gray-900">{lesson.timeSlot}</p>
                </div>
              </div>

              <div>
                <p className="text-xs text-[#6e7485] mb-1">Mode</p>
                <p className="text-sm font-medium text-gray-900">{lesson.lessonMode}</p>
              </div>

              <div>
                <p className="text-xs text-[#6e7485] mb-1">Duration</p>
                <p className="text-sm font-medium text-gray-900">{lesson.sessionDuration}</p>
              </div>

              {lesson.meetingLink && (
                <div>
                  <p className="text-xs text-[#6e7485] mb-1">Meeting Link</p>
                  <button
                    onClick={handleCopyLink}
                    className="text-sm text-[#FF6636] hover:text-[#E55A2B] font-medium underline"
                  >
                    Copy Link
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Chat Panel */}
          {isChatOpen && (
            <div className="flex-1 bg-white border border-[#e9eaf0] rounded-lg flex flex-col overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900">Chat</h3>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.sender === 'student' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-3 py-2 ${
                        msg.sender === 'student'
                          ? 'bg-[#FF6636] text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{msg.message}</p>
                      <p
                        className={`text-xs mt-1 ${
                          msg.sender === 'student' ? 'text-white/80' : 'text-gray-500'
                        }`}
                      >
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-3 border-t border-gray-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6636]"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="px-4 py-2 bg-[#FF6636] text-white rounded-lg hover:bg-[#E55A2B] transition-colors"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notes Panel */}
          {isNotesOpen && (
            <div className="flex-1 bg-white border border-[#e9eaf0] rounded-lg flex flex-col overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900">Class Notes</h3>
              </div>

              <div className="flex-1 p-4">
                <textarea
                  value={classNotes}
                  onChange={(e) => setClassNotes(e.target.value)}
                  placeholder="Take notes during the class..."
                  className="w-full h-full resize-none border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#564FFD]"
                />
              </div>

              <div className="p-3 border-t border-gray-200">
                <button
                  onClick={() => toast.success('Notes saved!', { duration: 2000 })}
                  className="w-full px-4 py-2 bg-[#564FFD] text-white rounded-lg hover:bg-[#4940E0] transition-colors text-sm font-semibold"
                >
                  Save Notes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Live Quiz Notification & Answer Panel - Floating */}
      {activeQuizQuestion && showQuizNotification && (
        <div className="fixed bottom-6 right-6 w-96 bg-white rounded-2xl shadow-2xl border-2 border-[#FF6636] z-50 animate-bounce-in">
          <div className="bg-gradient-to-r from-[#FF6636] to-[#E55A2B] p-4 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ClipboardText className="w-6 h-6 text-white" variant="Bold" />
                <h3 className="text-white font-bold">Live Quiz!</h3>
              </div>
              {!hasAnswered && (
                <button
                  onClick={() => {
                    setShowQuizNotification(false);
                    setActiveQuizQuestion(null);
                  }}
                  className="text-white/80 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
            <p className="text-xs text-white/90 mt-1">Answer this question from your tutor</p>
          </div>

          <div className="p-5">
            {!hasAnswered ? (
              <>
                {/* Question */}
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-900 mb-3">
                    {activeQuizQuestion.text}
                  </p>
                </div>

                {/* Answer Input */}
                {activeQuizQuestion.type === 'multiple-choice' && activeQuizQuestion.options ? (
                  <div className="space-y-2 mb-4">
                    {activeQuizQuestion.options.map((option, index) => (
                      <label
                        key={index}
                        className={`flex items-center gap-3 p-3 border-2 rounded-xl cursor-pointer transition-all ${
                          quizAnswer === option
                            ? 'border-[#FF6636] bg-orange-50'
                            : 'border-gray-200 hover:border-[#FF6636]/50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="quiz-answer"
                          value={option}
                          checked={quizAnswer === option}
                          onChange={(e) => setQuizAnswer(e.target.value)}
                          className="w-5 h-5 text-[#FF6636] focus:ring-[#FF6636]"
                        />
                        <span className="text-sm font-medium text-gray-900">{option}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <textarea
                    value={quizAnswer}
                    onChange={(e) => setQuizAnswer(e.target.value)}
                    placeholder="Type your answer here..."
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#FF6636] focus:border-transparent text-sm mb-4"
                  />
                )}

                {/* Submit Button */}
                <button
                  onClick={handleSubmitQuizAnswer}
                  className="w-full px-4 py-3 bg-[#FF6636] text-white rounded-xl font-semibold hover:bg-[#E55A2B] transition-all flex items-center justify-center gap-2"
                >
                  <Send2 size={20} variant="Bold" />
                  Submit Answer
                </button>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TickCircle className="w-10 h-10 text-green-600" variant="Bold" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-1">Answer Submitted!</h4>
                <p className="text-sm text-gray-600">Your tutor can now see your response</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}