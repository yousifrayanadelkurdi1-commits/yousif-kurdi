
import React from 'react';

interface FooterProps {
  onAdminAuth: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminAuth }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 px-4 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-right">
        {/* معلومات يوسف */}
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-white">يوسف</h3>
          <p className="text-sm opacity-70">ملف إنجاز الطالب | 2025 - 2026</p>
        </div>
        
        {/* حقوق التصميم والوصول للمسؤول */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="text-sm">صُمم بكل حب لدعم رحلة النجاح 🌟</div>
          <button 
            onClick={(e) => {
              e.preventDefault();
              onAdminAuth();
            }}
            className="group flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all duration-300"
          >
            <span className="text-[10px] opacity-30 group-hover:opacity-100 uppercase tracking-widest font-bold">Admin</span>
            <span className="text-xs opacity-20 group-hover:opacity-100">🔒</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
