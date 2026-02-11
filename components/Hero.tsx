
import React from 'react';

interface HeroProps {
  name: string;
}

const Hero: React.FC<HeroProps> = ({ name }) => {
  return (
    <header className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-emerald-300 rounded-full blur-3xl animate-bounce"></div>
      </div>
      
      <div className="relative text-center text-white px-4 space-y-6 z-10">
        <div className="inline-block p-1 bg-white/20 rounded-full backdrop-blur-md mb-4">
          <img 
            src="https://picsum.photos/seed/yousef/150/150" 
            alt="Yousef" 
            className="w-32 h-32 rounded-full border-4 border-white shadow-2xl"
          />
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
          ملف إنجاز <span className="text-yellow-300">{name}</span>
        </h1>
        <p className="text-xl md:text-2xl font-medium text-emerald-50 max-w-2xl mx-auto">
          طموح لا يعرف الحدود، وإبداع في كل خطوة
        </p>
        <div className="flex justify-center gap-4 mt-8">
          <span className="px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 text-sm">طالب مجتهد</span>
          <span className="px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 text-sm">شاعر المدرسة</span>
          <span className="px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 text-sm">محب للسباحة</span>
        </div>
      </div>

      <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-slate-50 to-transparent"></div>
    </header>
  );
};

export default Hero;
