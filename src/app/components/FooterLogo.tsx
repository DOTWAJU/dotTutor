import { Teacher } from 'iconsax-react';

export default function FooterLogo() {
  return (
    <div className="flex items-center gap-0 relative" data-name="LOGO">
      <span className="font-['Inter',sans-serif] font-bold text-[#FF6636] text-[24px] tracking-[-0.5px] leading-none">
        d
      </span>
      <div className="relative w-[24px] h-[24px] flex items-center justify-center">
        <Teacher 
          size={24} 
          variant="Bold"
          color="#FF6636"
        />
      </div>
      <span className="font-['Inter',sans-serif] font-bold text-[#FF6636] text-[24px] tracking-[-0.5px] leading-none">
        t-tutor
      </span>
    </div>
  );
}
