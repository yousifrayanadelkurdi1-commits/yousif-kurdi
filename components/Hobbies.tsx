
import React, { useState, useEffect } from 'react';
import { Hobby } from '../types';

interface HobbiesProps {
  items: Hobby[];
}

const Hobbies: React.FC<HobbiesProps> = ({ items }) => {
  const [selectedHobby, setSelectedHobby] = useState<Hobby | null>(null);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedHobby(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <section id="hobbies" className="scroll-mt-24">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-slate-900 mb-4">هواياتي واهتماماتي</h2>
        <p className="text-slate-500 text-lg">اضغط على أي هواية لاستكشاف المزيد من التفاصيل</p>
        <div className="h-1.5 w-24 bg-emerald-600 mx-auto rounded-full mt-4"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {(items || []).map((hobby, idx) => (
          <button 
            key={idx}
            onClick={() => setSelectedHobby(hobby)}
            className="group flex flex-col items-center p-8 bg-white rounded-3xl shadow-lg border border-slate-100 transition-all hover:scale-105 hover:shadow-2xl text-right w-full appearance-none"
          >
            <div className={`w-24 h-24 ${hobby.color} rounded-2xl flex items-center justify-center text-5xl text-white shadow-lg mb-6 group-hover:rotate-6 transition-transform`}>
              {hobby.icon}
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">{hobby.name}</h3>
            <p className="text-slate-500 text-center text-base leading-relaxed">
              {hobby.description}
            </p>
          </button>
        ))}
      </div>

      {selectedHobby && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setSelectedHobby(null)}
        >
          <div 
            className="bg-white rounded-[2.5rem] overflow-hidden max-w-2xl w-full shadow-2xl animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64 md:h-80 overflow-hidden">
              <img src={selectedHobby.imageUrl} alt={selectedHobby.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 right-8 flex items-end gap-4">
                <div className={`w-16 h-16 ${selectedHobby.color} rounded-xl flex items-center justify-center text-3xl text-white shadow-xl`}>
                  {selectedHobby.icon}
                </div>
                <h3 className="text-3xl font-bold text-white mb-1">{selectedHobby.name}</h3>
              </div>
            </div>
            <div className="p-8 space-y-6">
              <p className="text-slate-700 text-xl leading-relaxed">{selectedHobby.longDesc}</p>
              <button onClick={() => setSelectedHobby(null)} className="w-full py-4 bg-emerald-600 text-white font-bold rounded-2xl">إغلاق</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hobbies;
