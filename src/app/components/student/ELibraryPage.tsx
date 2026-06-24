import React from 'react';
import { Book, SearchNormal1, Filter, DocumentDownload, Lock, TickSquare } from 'iconsax-react';
import { toast } from 'sonner';
import { CustomDropdown } from './CustomDropdown';

interface ELibraryPageProps {
  onExploreClick: () => void;
}

interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  subject: string;
  level: string;
  type: 'free' | 'premium';
  price?: number;
  credits?: number;
  description: string;
  pages: number;
  rating: number;
  downloads: number;
  isPurchased?: boolean;
}

export function ELibraryPage({ onExploreClick }: ELibraryPageProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedSubject, setSelectedSubject] = React.useState<string>('all');
  const [selectedLevel, setSelectedLevel] = React.useState<string>('all');
  const [selectedType, setSelectedType] = React.useState<string>('all');
  const [showFilters, setShowFilters] = React.useState(false);

  // Demo books data
  const allBooks: Book[] = [
    // Free Books
    {
      id: 'book-1',
      title: 'Introduction to Organic Chemistry',
      author: 'Dr. Sarah Mitchell',
      coverImage: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400',
      subject: 'Chemistry',
      level: 'Beginner',
      type: 'free',
      description: 'A comprehensive introduction to organic chemistry covering basic concepts, nomenclature, and fundamental reactions.',
      pages: 245,
      rating: 4.7,
      downloads: 1523
    },
    {
      id: 'book-2',
      title: 'Calculus Made Simple',
      author: 'Prof. John Anderson',
      coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400',
      subject: 'Mathematics',
      level: 'Beginner',
      type: 'free',
      description: 'Master the fundamentals of calculus with easy-to-follow explanations, practice problems, and real-world applications.',
      pages: 312,
      rating: 4.8,
      downloads: 2847
    },
    // Premium Book
    {
      id: 'book-3',
      title: 'Advanced Chemical Kinetics',
      author: 'Dr. Emily Roberts',
      coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400',
      subject: 'Chemistry',
      level: 'Advanced',
      type: 'premium',
      price: 29.99,
      credits: 150,
      description: 'Deep dive into chemical kinetics, reaction mechanisms, and advanced computational methods for chemistry students.',
      pages: 428,
      rating: 4.9,
      downloads: 856,
      isPurchased: false
    }
  ];

  // Filtering logic
  const filteredBooks = React.useMemo(() => {
    return allBooks.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           book.subject.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSubject = selectedSubject === 'all' || book.subject === selectedSubject;
      const matchesLevel = selectedLevel === 'all' || book.level === selectedLevel;
      const matchesType = selectedType === 'all' || book.type === selectedType;

      return matchesSearch && matchesSubject && matchesLevel && matchesType;
    });
  }, [searchQuery, selectedSubject, selectedLevel, selectedType]);

  const subjects = ['all', 'Chemistry', 'Mathematics', 'Physics', 'Biology'];
  const levels = ['all', 'Beginner', 'Intermediate', 'Advanced'];
  const types = ['all', 'free', 'premium'];

  const handleDownload = (book: Book) => {
    if (book.type === 'free') {
      toast.success(`Downloading "${book.title}"...`);
      // Simulate download
      setTimeout(() => {
        toast.success(`"${book.title}" has been downloaded successfully!`);
      }, 1500);
    }
    // Premium books do nothing
  };

  const freeBooks = filteredBooks.filter(b => b.type === 'free');

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
          E-Library
        </h1>
        <p className="text-sm text-[#6e7485]">
          Access educational books and study materials
        </p>
      </div>

      {/* Search & Filters */}
      <div className="bg-white border border-[#e9eaf0] rounded-lg p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <SearchNormal1 size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6e7485]" />
            <input
              type="text"
              placeholder="Search books, authors, or subjects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6636] focus:border-transparent text-sm"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center justify-center gap-2 px-4 py-3 border-2 border-[#FF6636] text-[#FF6636] rounded-lg hover:bg-[#fff9f5] transition-colors font-semibold"
          >
            <Filter size={20} variant="Bold" />
            Filters
          </button>
        </div>

        {/* Filters Row */}
        <div className={`${showFilters ? 'block' : 'hidden'} lg:block mt-4 pt-4 border-t border-gray-200`}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Subject Filter */}
            <CustomDropdown
              label="SUBJECT"
              value={selectedSubject === 'all' ? 'All Subjects' : selectedSubject}
              options={subjects.map(s => s === 'all' ? 'All Subjects' : s)}
              onChange={(val) => setSelectedSubject(val === 'All Subjects' ? 'all' : val)}
            />

            {/* Level Filter */}
            <CustomDropdown
              label="LEVEL"
              value={selectedLevel === 'all' ? 'All Levels' : selectedLevel}
              options={levels.map(l => l === 'all' ? 'All Levels' : l)}
              onChange={(val) => setSelectedLevel(val === 'All Levels' ? 'all' : val)}
            />

            {/* Type Filter */}
            <CustomDropdown
              label="TYPE"
              value={selectedType === 'all' ? 'All Types' : selectedType === 'free' ? 'Free Books' : selectedType === 'premium' ? 'Premium Books' : 'All Types'}
              options={types.map(t => t === 'all' ? 'All Types' : t === 'free' ? 'Free Books' : 'Premium Books')}
              onChange={(val) => setSelectedType(val === 'All Types' ? 'all' : val === 'Free Books' ? 'free' : 'premium')}
            />
          </div>

          {/* Clear Filters */}
          {(searchQuery || selectedSubject !== 'all' || selectedLevel !== 'all' || selectedType !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedSubject('all');
                setSelectedLevel('all');
                setSelectedType('all');
              }}
              className="mt-4 text-sm text-[#FF6636] hover:text-[#E55A2B] font-semibold flex items-center gap-2"
            >
              Clear all filters
            </button>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-sm text-[#6e7485]">
          Showing <span className="font-semibold text-gray-900">{filteredBooks.length}</span> books
          {freeBooks.length > 0 && (
            <> (<span className="text-[#23BD33] font-semibold">{freeBooks.length} free</span>)</>
          )}
        </p>
      </div>

      {/* Books Grid */}
      {filteredBooks.length === 0 ? (
        <div className="text-center py-12 bg-white border border-[#e9eaf0] rounded-lg">
          <Book className="w-16 h-16 text-gray-300 mx-auto mb-4" variant="Bulk" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No Books Found
          </h3>
          <p className="text-gray-500 mb-4">
            Try adjusting your filters or search query
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedSubject('all');
              setSelectedLevel('all');
              setSelectedType('all');
            }}
            className="px-6 py-2 bg-[#FF6636] text-white rounded-lg hover:bg-[#E55A2B] transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white border border-[#e9eaf0] rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
            >
              {/* Book Cover */}
              <div className="relative h-64 bg-gray-100 overflow-hidden">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Type Badge */}
                {book.type === 'free' ? (
                  <div className="absolute top-3 right-3 px-3 py-1.5 bg-[#23BD33] text-white text-xs font-bold rounded-full flex items-center gap-1">
                    <TickSquare size={14} variant="Bold" />
                    FREE
                  </div>
                ) : (
                  <div className="absolute top-3 right-3 px-3 py-1.5 bg-[#FF6636] text-white text-xs font-bold rounded-full flex items-center gap-1">
                    <Lock size={14} variant="Bold" />
                    PREMIUM
                  </div>
                )}
              </div>

              {/* Book Details */}
              <div className="p-5">
                {/* Subject & Level */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-[#FF6636] bg-[#FF6636]/10 px-2 py-1 rounded font-semibold">
                    {book.subject}
                  </span>
                  <span className="text-xs text-[#6e7485] bg-gray-100 px-2 py-1 rounded font-semibold">
                    {book.level}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-base text-gray-900 mb-1 line-clamp-2 min-h-[3rem]">
                  {book.title}
                </h3>

                {/* Author */}
                <p className="text-sm text-[#6e7485] mb-3">by {book.author}</p>

                {/* Description */}
                <p className="text-xs text-gray-600 line-clamp-2 mb-4">
                  {book.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-[#6e7485] mb-4 pb-4 border-b border-gray-200">
                  <span>{book.pages} pages</span>
                  <span>{book.downloads.toLocaleString()} downloads</span>
                </div>

                {/* Action Button */}
                {book.type === 'free' ? (
                  <button
                    onClick={() => handleDownload(book)}
                    className="w-full px-4 py-2.5 bg-[#23BD33] text-white rounded-lg hover:bg-[#1fa82a] transition-colors font-semibold flex items-center justify-center gap-2"
                  >
                    <DocumentDownload size={18} variant="Bold" />
                    Download Free
                  </button>
                ) : (
                  <button
                    onClick={() => handleDownload(book)}
                    className="w-full px-4 py-2.5 bg-[#FF6636] text-white rounded-lg hover:bg-[#E55A2B] transition-colors font-semibold flex items-center justify-center gap-2"
                  >
                    <Lock size={18} variant="Bold" />
                    Buy Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}