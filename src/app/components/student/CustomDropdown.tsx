import React, { useState, useRef, useEffect } from 'react';
import { ArrowDown2 } from 'iconsax-react';

interface CustomDropdownProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  className?: string;
  required?: boolean;
}

export function CustomDropdown({ label, value, options, onChange, className = '', required = false }: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Get display value
  const displayValue = value || options[0] || 'Select...';
  const isPlaceholder = !value || value === options[0];

  return (
    <div className={`flex flex-col gap-2 ${className}`} ref={dropdownRef}>
      <label className="text-[13px] sm:text-sm font-semibold text-[#6e7485]">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full h-12 sm:h-14 appearance-none px-4 pr-10 border border-[#e9eaf0] rounded-xl text-[14px] sm:text-[15px] bg-white/50 backdrop-blur-sm hover:bg-white hover:border-[#FF6636]/40 focus:outline-none focus:ring-2 focus:ring-[#FF6636] focus:border-[#FF6636] cursor-pointer transition-all text-left touch-manipulation ${
            isPlaceholder ? 'text-[#8c94a3]' : 'text-[#4e5566]'
          }`}
          style={{ color: isPlaceholder ? '#8c94a3' : 'rgb(1, 27, 51)' }}
        >
          {displayValue}
        </button>
        <ArrowDown2 
          className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6e7485] pointer-events-none transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
        
        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-white border-2 border-[#FF6636] rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {options.map((option, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 text-[14px] sm:text-[15px] transition-colors touch-manipulation ${
                  option === value
                    ? 'bg-[#fff9f5] text-[#FF6636] font-semibold'
                    : 'text-[#4e5566] hover:bg-[#fff9f5]'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}