
import React from 'react';

interface FooterProps {
  onAdminClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminClick }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="space-y-2 text-center md:text-right">
          <h3 className="text-2xl font-bold text-white">يوسف</h3>
          <p>ملف إنجاز الطالب | 2024 - 2025</p>
        </div>
        
        <div className="flex gap-6">
          <button onClick={onAdminClick} className="hover:text-emerald-400 text-sm transition-colors flex items-center gap-2">
            <span>⚙️</span>
            إدارة الموقع
          </button>
        </div>
        
        <div className="text-sm">
          صُمم بكل حب لدعم رحلة النجاح 🌟
        </div>
      </div>
    </footer>
  );
};

export default Footer;
