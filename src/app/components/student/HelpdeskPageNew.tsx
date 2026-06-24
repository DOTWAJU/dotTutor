import React from 'react';
import {
  SearchNormal1,
  MessageQuestion,
  Call,
  Sms,
  Messages2,
  Book1,
  VideoPlay,
  Profile2User,
  Wallet3,
  ShieldTick,
  Setting2,
  ArrowDown2,
  TickCircle,
  CloseCircle,
  Send2,
  Danger,
  Teacher,
  DocumentText,
  Clock,
  Calendar,
} from 'iconsax-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

interface HelpdeskPageProps {
  onBack?: () => void;
  tickets?: any[];
  setTickets?: (tickets: any[]) => void;
}

export function HelpdeskPage({ onBack, tickets = [], setTickets }: HelpdeskPageProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [expandedFaq, setExpandedFaq] = React.useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = React.useState<string>('All');
  const [showContactForm, setShowContactForm] = React.useState(false);
  const [showGetInTouch, setShowGetInTouch] = React.useState(false);
  const [showFAQ, setShowFAQ] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'Medium',
    category: 'General Support'
  });

  // Quick Help Categories
  const categories = [
    { name: 'All', icon: MessageQuestion, color: '#FF6636' },
    { name: 'Getting Started', icon: Book1, color: '#2196F3' },
    { name: 'Bookings', icon: VideoPlay, color: '#FD8E1F' },
    { name: 'Account', icon: Profile2User, color: '#9C27B0' },
  ];

  // FAQ Data - Only 4 FAQs
  const faqs = [
    {
      id: 1,
      category: 'Getting Started',
      question: 'How do I book my first lesson?',
      answer: 'To book your first lesson, navigate to the Explore page, select your desired subject, browse available tutors, and click "Book Now" on your preferred tutor. Follow the booking flow to select your date, time, and complete payment.'
    },
    {
      id: 2,
      category: 'Bookings',
      question: 'How do I reschedule a booked lesson?',
      answer: 'Go to "My Lessons" page, find your booking, and click "Reschedule". Select a new date and time slot. You can reschedule up to 24 hours before the lesson without any charges.'
    },
    {
      id: 3,
      category: 'Account',
      question: 'How do I update my profile information?',
      answer: 'Click on your profile icon in the top right corner, select "Settings" from the dropdown menu. You can update your personal information, contact details, and preferences from there.'
    },
    {
      id: 4,
      category: 'Bookings',
      question: 'Can I request a specific tutor if they\'re not available?',
      answer: 'Yes! If your preferred subject doesn\'t have available tutors or if you want a specific expertise, use the "Request Tutor" feature. Fill out the form with your requirements and we\'ll match you with a suitable tutor within 24-48 hours.'
    },
  ];

  // Filter FAQs
  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Contact Methods
  const contactMethods = [
    {
      icon: Messages2,
      title: 'Live Chat',
      description: 'Chat with our support team',
      detail: 'Available 24/7',
      color: '#FF6636',
      action: 'Start Chat'
    },
    {
      icon: Sms,
      title: 'Email Support',
      description: 'Send us an email',
      detail: 'support@dottutor.com',
      color: '#2196F3',
      action: 'Send Email'
    },
    {
      icon: Call,
      title: 'Phone Support',
      description: 'Call our helpline',
      detail: '+234 800 DOT TUTOR',
      color: '#23BD33',
      action: 'Call Now'
    },
  ];

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newTicket = {
      id: `TKT-${Date.now()}`,
      ticketNumber: `TKT-${Date.now()}`,
      subject: formData.subject,
      category: formData.category,
      description: formData.message,
      status: 'Open',
      priority: formData.priority,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      responses: []
    };

    if (setTickets) {
      setTickets([newTicket, ...tickets]);
    }

    toast.success('Ticket Submitted!', {
      description: 'We\'ll respond to your ticket within 24 hours.',
      duration: 4000,
    });

    setShowContactForm(false);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      priority: 'Medium',
      category: 'General Support'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'in progress':
        return 'bg-blue-100 text-blue-700';
      case 'resolved':
      case 'closed':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'urgent':
        return 'bg-red-100 text-red-700';
      case 'high':
        return 'bg-orange-100 text-orange-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Simple Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Helpdesk
        </h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* My Tickets Section - Always visible */}
        <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 mb-6 md:mb-8 border border-gray-100 shadow-sm">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">
            My Tickets
          </h2>
          
          {tickets.length > 0 ? (
            <div className="space-y-3 md:space-y-4">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="border-2 border-gray-100 rounded-xl p-4 md:p-5 hover:border-[#FF6636]/30 transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-4 mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="font-mono text-xs text-gray-500">#{ticket.ticketNumber}</span>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(ticket.status)}`}>
                          {ticket.status}
                        </span>
                        {ticket.priority && (
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getPriorityColor(ticket.priority)}`}>
                            {ticket.priority}
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-gray-900 text-base md:text-lg mb-1">
                        {ticket.subject}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {ticket.description}
                      </p>
                      
                      {/* Additional details for Tutor Request tickets */}
                      {ticket.category === 'Tutor Request' && (
                        <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                          {ticket.level && (
                            <div className="flex items-center gap-1 text-gray-600">
                              <Book1 className="w-3.5 h-3.5" variant="Bold" />
                              <span>{ticket.level}</span>
                            </div>
                          )}
                          {ticket.language && (
                            <div className="flex items-center gap-1 text-gray-600">
                              <Messages2 className="w-3.5 h-3.5" variant="Bold" />
                              <span>{ticket.language}</span>
                            </div>
                          )}
                          {ticket.lessonMode && (
                            <div className="flex items-center gap-1 text-gray-600">
                              <VideoPlay className="w-3.5 h-3.5" variant="Bold" />
                              <span>{ticket.lessonMode}</span>
                            </div>
                          )}
                          {ticket.availability && (
                            <div className="flex items-center gap-1 text-gray-600">
                              <Calendar className="w-3.5 h-3.5" variant="Bold" />
                              <span>{new Date(ticket.availability).toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="inline-block px-3 py-1 bg-[#FF6636]/10 text-[#FF6636] rounded-lg text-xs font-semibold">
                      {ticket.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 md:py-12">
              <MessageQuestion className="w-12 h-12 md:w-16 md:h-16 text-gray-300 mx-auto mb-3 md:mb-4" variant="Bold" />
              <p className="text-gray-500 text-sm md:text-base font-semibold mb-2">No tickets yet</p>
              <p className="text-gray-400 text-xs md:text-sm">Submit a support ticket below to get started</p>
            </div>
          )}

          {/* Submit Support Ticket Button - Always visible */}
          <div className="mt-6">
            <button
              onClick={() => setShowContactForm(!showContactForm)}
              className="w-full py-3 md:py-4 bg-gradient-to-r from-[#FF6636] to-[#ff8659] text-white rounded-xl md:rounded-2xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm md:text-base"
            >
              <Send2 className="w-4 h-4 md:w-5 md:h-5" variant="Bold" />
              Submit a Support Ticket
            </button>
          </div>

          {/* General Support Ticket Form */}
          <AnimatePresence>
            {showContactForm && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <form onSubmit={handleSubmitTicket} className="mt-6 md:mt-8 border-t border-gray-200 pt-6 md:pt-8">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">
                    Submit Support Ticket
                  </h3>
                  <div className="space-y-4 md:space-y-5">
                    <div className="grid md:grid-cols-2 gap-4 md:gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Your Name
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="w-full px-4 py-2.5 md:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6636] transition-colors text-sm md:text-base"
                          placeholder="Enter your name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="w-full px-4 py-2.5 md:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6636] transition-colors text-sm md:text-base"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 md:gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Category
                        </label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full px-4 py-2.5 md:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6636] transition-colors text-sm md:text-base bg-white"
                        >
                          <option>Tutor Request</option>
                          <option>General Support</option>
                          <option>Reported Issue</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Priority
                        </label>
                        <select
                          value={formData.priority}
                          onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                          className="w-full px-4 py-2.5 md:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6636] transition-colors text-sm md:text-base bg-white"
                        >
                          <option>Low</option>
                          <option>Medium</option>
                          <option>High</option>
                          <option>Urgent</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                        className="w-full px-4 py-2.5 md:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6636] transition-colors text-sm md:text-base"
                        placeholder="What's this about?"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Message
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={5}
                        className="w-full px-4 py-2.5 md:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6636] transition-colors resize-none text-sm md:text-base"
                        placeholder="Describe your issue in detail..."
                      />
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="submit"
                        className="flex-1 py-3 md:py-3.5 bg-[#FF6636] text-white rounded-xl font-semibold hover:bg-[#E55A2B] transition-all text-sm md:text-base"
                      >
                        Submit Ticket
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowContactForm(false)}
                        className="px-6 md:px-8 py-3 md:py-3.5 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all text-sm md:text-base"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Get in Touch - Collapsible */}
        <div className="bg-white rounded-xl md:rounded-2xl border border-gray-100 shadow-sm mb-6 md:mb-8 overflow-hidden">
          <button
            onClick={() => setShowGetInTouch(!showGetInTouch)}
            className="w-full px-4 md:px-6 py-4 md:py-5 flex items-center justify-between gap-4 text-left hover:bg-gray-50 transition-colors"
          >
            <h2 className="text-lg md:text-xl font-bold text-gray-900">
              Get in Touch
            </h2>
            <ArrowDown2
              className={`w-6 h-6 text-gray-400 flex-shrink-0 transition-transform ${
                showGetInTouch ? 'rotate-180' : ''
              }`}
              variant="Bold"
            />
          </button>

          <AnimatePresence>
            {showGetInTouch && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-4 md:px-6 pb-4 md:pb-6">
                  <div className="grid md:grid-cols-3 gap-3 md:gap-4">
                    {contactMethods.map((method) => {
                      const Icon = method.icon;
                      return (
                        <div
                          key={method.title}
                          className="border-2 border-gray-100 rounded-xl md:rounded-2xl p-4 md:p-6 hover:border-[#FF6636]/30 transition-all cursor-pointer group"
                        >
                          <div
                            className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4 transition-transform group-hover:scale-110"
                            style={{ backgroundColor: `${method.color}15` }}
                          >
                            <Icon className="w-6 h-6 md:w-7 md:h-7" variant="Bold" style={{ color: method.color }} />
                          </div>
                          <h3 className="font-bold text-gray-900 mb-1 md:mb-2 text-sm md:text-base">
                            {method.title}
                          </h3>
                          <p className="text-xs md:text-sm text-gray-600 mb-1">
                            {method.description}
                          </p>
                          <p className="text-xs md:text-sm font-semibold mb-3 md:mb-4" style={{ color: method.color }}>
                            {method.detail}
                          </p>
                          <button
                            className="w-full py-2 md:py-2.5 rounded-lg md:rounded-xl font-semibold transition-all text-xs md:text-sm"
                            style={{
                              backgroundColor: `${method.color}15`,
                              color: method.color
                            }}
                          >
                            {method.action}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* FAQ Section - Collapsible */}
        <div className="bg-white rounded-xl md:rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <button
            onClick={() => setShowFAQ(!showFAQ)}
            className="w-full px-4 md:px-6 py-4 md:py-5 flex items-center justify-between gap-4 text-left hover:bg-gray-50 transition-colors"
          >
            <h2 className="text-lg md:text-xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
            <ArrowDown2
              className={`w-6 h-6 text-gray-400 flex-shrink-0 transition-transform ${
                showFAQ ? 'rotate-180' : ''
              }`}
              variant="Bold"
            />
          </button>

          <AnimatePresence>
            {showFAQ && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-4 md:px-6 pb-4 md:pb-6">
                  {/* Category Filter */}
                  <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 mb-6 md:mb-8 hide-scrollbar">
                    {categories.map((category) => {
                      const Icon = category.icon;
                      const isActive = selectedCategory === category.name;
                      return (
                        <button
                          key={category.name}
                          onClick={() => setSelectedCategory(category.name)}
                          className={`flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl font-semibold transition-all whitespace-nowrap text-xs md:text-sm ${
                            isActive
                              ? 'text-white shadow-md'
                              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                          }`}
                          style={isActive ? { backgroundColor: category.color } : {}}
                        >
                          <Icon className="w-4 h-4 md:w-5 md:h-5" variant={isActive ? 'Bold' : 'Linear'} />
                          {category.name}
                        </button>
                      );
                    })}
                  </div>

                  {/* FAQ List */}
                  <div className="space-y-3 md:space-y-4">
                    {filteredFaqs.length === 0 ? (
                      <div className="text-center py-12">
                        <Danger className="w-12 h-12 md:w-16 md:h-16 text-gray-300 mx-auto mb-3 md:mb-4" variant="Bold" />
                        <p className="text-gray-500 text-sm md:text-base">No results found for "{searchQuery}"</p>
                        <p className="text-gray-400 text-xs md:text-sm mt-2">Try a different search term or browse all FAQs</p>
                      </div>
                    ) : (
                      filteredFaqs.map((faq) => (
                        <div
                          key={faq.id}
                          className="border-2 border-gray-100 rounded-xl md:rounded-2xl overflow-hidden transition-all hover:border-[#FF6636]/30"
                        >
                          <button
                            onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                            className="w-full px-4 md:px-6 py-3 md:py-4 flex items-start justify-between gap-3 md:gap-4 text-left hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex-1">
                              <span className="inline-block px-2 md:px-3 py-1 bg-[#FF6636]/10 text-[#FF6636] rounded-lg text-[10px] md:text-xs font-semibold mb-2">
                                {faq.category}
                              </span>
                              <h3 className="font-bold text-gray-900 text-sm md:text-base">
                                {faq.question}
                              </h3>
                            </div>
                            <ArrowDown2
                              className={`w-5 h-5 md:w-6 md:h-6 text-gray-400 flex-shrink-0 transition-transform ${
                                expandedFaq === faq.id ? 'rotate-180' : ''
                              }`}
                              variant="Bold"
                            />
                          </button>

                          <AnimatePresence>
                            {expandedFaq === faq.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="px-4 md:px-6 pb-4 md:pb-5 pt-0">
                                  <div className="bg-gradient-to-r from-[#FF6636]/5 to-[#ff8659]/5 rounded-xl p-3 md:p-4 border-l-4 border-[#FF6636]">
                                    <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                                      {faq.answer}
                                    </p>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
