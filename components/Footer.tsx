
import React from 'react';

interface FooterProps {
  onAdminAuth: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminAuth }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 px-4 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="space-y-2 text-center md:text-right">
          <h3 className="text-2xl font-bold text-white">يوسف</h3>
          <p>ملف إنجاز الطالب | 2024 - 2025</p>
        </div>
        
        <div className="flex gap-6">
          <a href="#" className="hover:text-emerald-400 transition-colors">عن يوسف</a>
          <a href="#achievements" className="hover:text-emerald-400 transition-colors">الإنجازات</a>
          <a href="#hobbies" className="hover:text-emerald-400 transition-colors">الهوايات</a>
        </div>
        
        <div className="flex flex-col items-center gap-3">
          <div className="text-sm">صُمم بكل حب لدعم رحلة النجاح 🌟</div>
          <button 
            onClick={(e) => {
              e.preventDefault();
              onAdminAuth();
            }}
            className="group flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all duration-300"
          >
            <span className="text-[11px] opacity-40 group-hover:opacity-100 uppercase tracking-widest font-bold">Admin Access</span>
            <span className="text-xs opacity-20 group-hover:opacity-100">🔒</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
