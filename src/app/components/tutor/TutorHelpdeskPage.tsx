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
  ArrowDown2,
  TickCircle,
  CloseCircle,
  Clock,
  Calendar,
  Teacher,
} from 'iconsax-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

interface TutorHelpdeskPageProps {
  tickets?: any[];
  setTickets?: (tickets: any[]) => void;
}

export function TutorHelpdeskPage({ tickets = [], setTickets }: TutorHelpdeskPageProps) {
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
    { name: 'Student Matching', icon: Teacher, color: '#FD8E1F' },
    { name: 'Account', icon: Profile2User, color: '#9C27B0' },
  ];

  // FAQ Data - Tutor specific
  const faqs = [
    {
      id: 1,
      category: 'Getting Started',
      question: 'How do I start accepting students?',
      answer: 'Complete your tutor profile by adding your subjects, qualifications, and availability. Once approved by admin, you can browse available students in the Explore Students page and express interest in teaching them.'
    },
    {
      id: 2,
      category: 'Student Matching',
      question: 'How does the student matching process work?',
      answer: 'Browse students in the Explore Students page, filter by subject and date availability. When you express interest in a student, a ticket is created and sent to admin for review. Admin will match you with the student if approved.'
    },
    {
      id: 3,
      category: 'Account',
      question: 'How do I update my teaching subjects?',
      answer: 'Click on your profile icon in the top right corner, select "Profile" or "Settings" from the dropdown menu. You can update your subjects, qualifications, and availability from there.'
    },
    {
      id: 4,
      category: 'Student Matching',
      question: 'What happens after I express interest in a student?',
      answer: 'After expressing interest, a ticket is automatically created in your Helpdesk. Admin reviews your request and either approves or rejects the match. You\'ll be notified of the decision via the ticket system.'
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
                <motion.div
                  key={ticket.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 md:p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-[#FF6636] transition-all cursor-pointer"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold text-gray-500">
                          {ticket.ticketNumber}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(ticket.status)}`}>
                          {ticket.status}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority}
                        </span>
                      </div>
                      <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1">
                        {ticket.subject}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {ticket.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{new Date(ticket.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{new Date(ticket.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>
                    <span className="text-[#FF6636] font-semibold">View Details →</span>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 md:py-12">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <MessageQuestion className="w-8 h-8 md:w-10 md:h-10 text-gray-400" />
              </div>
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">No Tickets Yet</h3>
              <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                You haven't created any support tickets yet.
              </p>
              <button
                onClick={() => setShowContactForm(true)}
                className="px-4 md:px-6 py-2 md:py-3 bg-[#FF6636] text-white rounded-xl font-semibold hover:bg-[#E55A2B] transition-all text-sm md:text-base"
              >
                Create New Ticket
              </button>
            </div>
          )}

          {tickets.length > 0 && (
            <div className="mt-4 md:mt-6">
              <button
                onClick={() => setShowContactForm(true)}
                className="w-full sm:w-auto px-4 md:px-6 py-2 md:py-3 bg-[#FF6636] text-white rounded-xl font-semibold hover:bg-[#E55A2B] transition-all text-sm md:text-base"
              >
                Create New Ticket
              </button>
            </div>
          )}
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          {/* FAQs Card */}
          <motion.div
            whileHover={{ y: -4 }}
            onClick={() => setShowFAQ(true)}
            className="bg-gradient-to-br from-[#FF6636] to-[#E55A2B] rounded-xl md:rounded-2xl p-6 md:p-8 text-white cursor-pointer shadow-lg hover:shadow-xl transition-all"
          >
            <MessageQuestion size={32} className="mb-4" variant="Bold" />
            <h3 className="text-xl md:text-2xl font-bold mb-2">FAQs</h3>
            <p className="text-white/90 text-sm md:text-base mb-4">
              Find quick answers to common questions
            </p>
            <span className="text-sm font-semibold">Browse FAQs →</span>
          </motion.div>

          {/* Get in Touch Card */}
          <motion.div
            whileHover={{ y: -4 }}
            onClick={() => setShowGetInTouch(true)}
            className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl md:rounded-2xl p-6 md:p-8 text-white cursor-pointer shadow-lg hover:shadow-xl transition-all"
          >
            <Messages2 size={32} className="mb-4" variant="Bold" />
            <h3 className="text-xl md:text-2xl font-bold mb-2">Get in Touch</h3>
            <p className="text-white/90 text-sm md:text-base mb-4">
              Multiple ways to reach our support team
            </p>
            <span className="text-sm font-semibold">Contact Us →</span>
          </motion.div>

          {/* Submit Ticket Card */}
          <motion.div
            whileHover={{ y: -4 }}
            onClick={() => setShowContactForm(true)}
            className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl md:rounded-2xl p-6 md:p-8 text-white cursor-pointer shadow-lg hover:shadow-xl transition-all"
          >
            <TickCircle size={32} className="mb-4" variant="Bold" />
            <h3 className="text-xl md:text-2xl font-bold mb-2">Submit Ticket</h3>
            <p className="text-white/90 text-sm md:text-base mb-4">
              Create a support ticket for detailed help
            </p>
            <span className="text-sm font-semibold">Create Ticket →</span>
          </motion.div>
        </div>
      </div>

      {/* FAQ Modal */}
      <AnimatePresence>
        {showFAQ && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 md:p-6 z-10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
                  <button
                    onClick={() => setShowFAQ(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <CloseCircle size={24} className="text-gray-500" />
                  </button>
                </div>

                {/* Search Bar */}
                <div className="relative mb-4">
                  <SearchNormal1 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search FAQs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6636] focus:border-transparent text-sm md:text-base"
                  />
                </div>

                {/* Category Pills */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full font-semibold transition-all text-xs md:text-sm ${
                        selectedCategory === cat.name
                          ? 'bg-[#FF6636] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 md:p-6">
                <div className="space-y-3 md:space-y-4">
                  {filteredFaqs.map((faq) => (
                    <div
                      key={faq.id}
                      className="border border-gray-200 rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                        className="w-full flex items-center justify-between p-4 md:p-5 hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-left font-semibold text-gray-900 text-sm md:text-base pr-4">
                          {faq.question}
                        </span>
                        <motion.div
                          animate={{ rotate: expandedFaq === faq.id ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowDown2 size={20} className="text-gray-500 shrink-0" />
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {expandedFaq === faq.id && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 md:p-5 pt-0 text-gray-600 text-sm md:text-base">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>

                {filteredFaqs.length === 0 && (
                  <div className="text-center py-8 md:py-12">
                    <SearchNormal1 className="w-12 h-12 md:w-16 md:h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-sm md:text-base">No FAQs found matching your search.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Get in Touch Modal */}
      <AnimatePresence>
        {showGetInTouch && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto"
            >
              <div className="p-4 md:p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">Get in Touch</h2>
                  <button
                    onClick={() => setShowGetInTouch(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <CloseCircle size={24} className="text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="p-4 md:p-6">
                <div className="grid grid-cols-1 gap-4 md:gap-6">
                  {contactMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <div
                        key={method.title}
                        className="p-4 md:p-6 border-2 border-gray-200 rounded-xl hover:border-[#FF6636] transition-all cursor-pointer"
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                            style={{ backgroundColor: `${method.color}15` }}
                          >
                            <Icon size={24} style={{ color: method.color }} variant="Bold" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1">
                              {method.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">{method.description}</p>
                            <p className="text-sm font-semibold mb-3" style={{ color: method.color }}>
                              {method.detail}
                            </p>
                            <button
                              onClick={() => toast.info(`${method.action} - Feature coming soon!`)}
                              className="text-sm font-semibold text-[#FF6636] hover:text-[#E55A2B] transition-colors"
                            >
                              {method.action} →
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Contact Form Modal */}
      <AnimatePresence>
        {showContactForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto"
            >
              <div className="p-4 md:p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">Create Support Ticket</h2>
                  <button
                    onClick={() => setShowContactForm(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <CloseCircle size={24} className="text-gray-500" />
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmitTicket} className="p-4 md:p-6">
                <div className="space-y-4 md:space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6636] focus:border-transparent text-sm md:text-base"
                        required
                      >
                        <option value="General Support">General Support</option>
                        <option value="Student Matching">Student Matching</option>
                        <option value="Account Issue">Account Issue</option>
                        <option value="Payment">Payment</option>
                        <option value="Technical">Technical</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Priority
                      </label>
                      <select
                        value={formData.priority}
                        onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6636] focus:border-transparent text-sm md:text-base"
                        required
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Urgent">Urgent</option>
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
                      placeholder="Brief description of your issue"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6636] focus:border-transparent text-sm md:text-base"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Provide detailed information about your issue..."
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6636] focus:border-transparent resize-none text-sm md:text-base"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col-reverse sm:flex-row gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowContactForm(false)}
                    className="w-full sm:w-auto px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all text-sm md:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full sm:flex-1 px-6 py-3 bg-[#FF6636] text-white rounded-xl font-semibold hover:bg-[#E55A2B] transition-all text-sm md:text-base"
                  >
                    Submit Ticket
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
