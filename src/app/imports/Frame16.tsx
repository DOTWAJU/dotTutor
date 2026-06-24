import imgBackpack from "figma:asset/4c87204c02e0ca465d15b37a3a55bba01017ec75.png";
import imgScholarcapScroll from "figma:asset/cd4bbb8ea95ed8cbb3f4a7091134e2df911324e6.png";
import imgBag from "figma:asset/52ad53069e29a8e8bd9cfa67300bbdd165299f4f.png";
import imgChangeColor from "figma:asset/1b25aaf148e8e13148770fb401b841cb3d08c4c5.png";
import imgBody from "figma:asset/8be26d6dc2ae5be83b790545304899541c68ae0a.png";
import imgChangeColor1 from "figma:asset/f21d9e570cd8197d26027723ff42a17e1f6543ca.png";
import imgEyeEyebrow from "figma:asset/6a475fe3d6353f3c74197e17a162fadf91ca641b.png";
import imgChangeColor2 from "figma:asset/8dbcd782db72c81c0e73ee6bccd41bd777be7986.png";
import imgFace from "figma:asset/9c95e75faa642968beab1b4c40c123c930a56133.png";
import imgChangeColor3 from "figma:asset/8e620b575436b50acb1c856d19315f3a090788c5.png";
import imgHair from "figma:asset/80ccb413a522264ee093cc53a000aec7f827d28f.png";
import imgChangeColor4 from "figma:asset/444ef08a36889a2cffd24a6a9894c5a305acf0c7.png";
import imgMouth from "figma:asset/0b9a151bfa69be741243b1a928c9e858243dee49.png";
import imgChangeColor5 from "figma:asset/1d5942b2aac8274c55a0b09f9179f18ab7705835.png";
import imgHat from "figma:asset/5df1f1a9c9c42fabfaef40a77f8c09dab4c0b0c4.png";
import imgChangeColor6 from "figma:asset/d671b25e7dbb6d5c742a96db1faefca41ea3afa2.png";

interface WelcomeBannerProps {
  userName?: string;
}

function MaskGroup() {
  return (
    <div className="absolute contents left-[973px] top-[-18px]" data-name="Mask Group">
      <div className="absolute bg-[#9e7d84] left-[973px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[274px_274px] mix-blend-overlay size-[274px] top-[-18px]" data-name="Change Color" style={{ maskImage: `url('${imgChangeColor}')` }} />
    </div>
  );
}

function Bag() {
  return (
    <div className="absolute contents left-[973px] top-[-18px]" data-name="Bag">
      <div className="absolute left-[973px] size-[274px] top-[-18px]" data-name="Bag">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgBag} />
      </div>
      <MaskGroup />
    </div>
  );
}

function MaskGroup1() {
  return (
    <div className="absolute contents left-[973px] top-[-18px]" data-name="Mask Group">
      <div className="absolute bg-[#9e7d84] left-[973px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[274px_274px] mix-blend-overlay size-[274px] top-[-18px]" data-name="Change Color" style={{ maskImage: `url('${imgChangeColor1}')` }} />
    </div>
  );
}

function Body() {
  return (
    <div className="absolute contents left-[973px] top-[-18px]" data-name="Body">
      <div className="absolute left-[973px] size-[274px] top-[-18px]" data-name="Body">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgBody} />
      </div>
      <MaskGroup1 />
    </div>
  );
}

function MaskGroup2() {
  return (
    <div className="absolute contents left-[973px] top-[-18px]" data-name="Mask Group">
      <div className="absolute bg-[#ac7080] left-[973px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[274px_274px] mix-blend-overlay size-[274px] top-[-18px]" data-name="Change Color" style={{ maskImage: `url('${imgChangeColor2}')` }} />
    </div>
  );
}

function EyeEyebrow() {
  return (
    <div className="absolute contents left-[973px] top-[-18px]" data-name="Eye & Eyebrow">
      <div className="absolute left-[973px] size-[274px] top-[-18px]" data-name="Eye & Eyebrow">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgEyeEyebrow} />
      </div>
      <MaskGroup2 />
    </div>
  );
}

function MaskGroup3() {
  return (
    <div className="absolute contents left-[973px] top-[-18px]" data-name="Mask Group">
      <div className="absolute bg-[#c2837b] left-[973px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[274px_274px] mix-blend-overlay size-[274px] top-[-18px]" data-name="Change Color" style={{ maskImage: `url('${imgChangeColor3}')` }} />
    </div>
  );
}

function Face() {
  return (
    <div className="absolute contents left-[973px] top-[-18px]" data-name="Face">
      <div className="absolute left-[973px] size-[274px] top-[-18px]" data-name="Face">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgFace} />
      </div>
      <MaskGroup3 />
    </div>
  );
}

function MaskGroup4() {
  return (
    <div className="absolute contents left-[973px] top-[-18px]" data-name="Mask Group">
      <div className="absolute bg-[#ac7080] left-[973px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[274px_274px] mix-blend-overlay size-[274px] top-[-18px]" data-name="Change Color" style={{ maskImage: `url('${imgChangeColor4}')` }} />
    </div>
  );
}

function Hair() {
  return (
    <div className="absolute contents left-[973px] top-[-18px]" data-name="Hair">
      <div className="absolute left-[973px] size-[274px] top-[-18px]" data-name="Hair">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgHair} />
      </div>
      <MaskGroup4 />
    </div>
  );
}

function MaskGroup5() {
  return (
    <div className="absolute contents left-[973px] top-[-18px]" data-name="Mask Group">
      <div className="absolute left-[973px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[274px_274px] size-[274px] top-[-18px]" data-name="Change Color" style={{ maskImage: `url('${imgChangeColor5}')` }}>
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgMouth} />
      </div>
    </div>
  );
}

function Mouth() {
  return (
    <div className="absolute contents left-[973px] top-[-18px]" data-name="Mouth">
      <div className="absolute left-[973px] size-[274px] top-[-18px]" data-name="Mouth">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgMouth} />
      </div>
      <MaskGroup5 />
    </div>
  );
}

function MaskGroup6() {
  return (
    <div className="absolute contents left-[973px] top-[-18px]" data-name="Mask Group">
      <div className="absolute bg-[#9e7d84] left-[973px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[274px_274px] mix-blend-overlay size-[274px] top-[-18px]" data-name="Change Color" style={{ maskImage: `url('${imgChangeColor6}')` }} />
    </div>
  );
}

function Hat() {
  return (
    <div className="absolute contents left-[973px] top-[-18px]" data-name="Hat">
      <div className="absolute left-[973px] size-[274px] top-[-18px]" data-name="Hat">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgHat} />
      </div>
      <MaskGroup6 />
    </div>
  );
}

function CollegeStudent() {
  return (
    <div className="absolute contents left-[973px] top-[-18px]" data-name="College Student">
      <Bag />
      <Body />
      <EyeEyebrow />
      <Face />
      <Hair />
      <Mouth />
      <Hat />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[702px] top-[-62px]">
      <div className="absolute flex items-center justify-center left-[1125px] size-[208.953px] top-[68px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "22" } as React.CSSProperties}>
        <div className="flex-none rotate-[8.84deg]">
          <div className="relative size-[183px]" data-name="Backpack">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgBackpack} />
          </div>
        </div>
      </div>
      <div className="absolute flex items-center justify-center left-[702px] size-[441.286px] top-[-62px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "22" } as React.CSSProperties}>
        <div className="flex-none rotate-[-28.13deg]">
          <div className="relative size-[326.068px]" data-name="Scholarcap scroll">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgScholarcapScroll} />
          </div>
        </div>
      </div>
      <CollegeStudent />
    </div>
  );
}

export function WelcomeBanner({ userName = 'Student' }: WelcomeBannerProps) {
  // Get current date
  const currentDate = new Date().toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });

  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="relative w-full h-[200px] sm:h-[240px] lg:h-[280px] overflow-hidden rounded-xl shadow-lg mb-6" style={{ backgroundImage: "linear-gradient(127.648deg, rgba(255, 102, 54, 0.5) 53.124%, rgba(223, 207, 247, 0.5) 155.43%)" }}>
      {/* Date - Top Left */}
      <div className="absolute left-6 sm:left-8 top-6 sm:top-8">
        <p className="text-sm sm:text-base text-white/75 font-normal">{currentDate}</p>
      </div>

      {/* Welcome Text - Left Side */}
      <div className="absolute left-6 sm:left-8 lg:left-12 top-1/2 -translate-y-1/2 max-w-[50%] sm:max-w-[45%] lg:max-w-[40%]">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 leading-tight">
          {getGreeting()}, {userName}!
        </h1>
        <p className="text-sm sm:text-base text-white/75 font-normal">
          Always stay updated in your student portal
        </p>
      </div>

      {/* Character Illustration - Right Side (Hidden on mobile, visible on tablet+) */}
      <div className="hidden sm:block absolute right-0 top-0 h-full w-[50%] lg:w-[45%]">
        <div className="relative h-full w-full scale-[0.35] sm:scale-[0.45] lg:scale-[0.55] origin-right">
          <Group />
        </div>
      </div>

      {/* Decorative dots */}
      <div className="absolute right-[45%] top-[20%] w-3 h-3 rounded-full bg-[#4ECDC4] opacity-70 hidden sm:block"></div>
      <div className="absolute right-[35%] top-[35%] w-2 h-2 rounded-full bg-[#FF6B9D] opacity-70 hidden sm:block"></div>
      <div className="absolute right-[40%] bottom-[30%] w-2.5 h-2.5 rounded-full bg-[#4ECDC4] opacity-70 hidden sm:block"></div>
    </div>
  );
}