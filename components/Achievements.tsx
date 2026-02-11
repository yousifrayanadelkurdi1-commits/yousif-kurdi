
import React from 'react';

interface AchievementsProps {
  items: any[];
}

const Achievements: React.FC<AchievementsProps> = ({ items }) => {
  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-slate-900 mb-4">إنجازاتي المتميزة</h2>
        <div className="h-1.5 w-24 bg-emerald-600 mx-auto rounded-full"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {(items || []).map((item, idx) => (
          <div 
            key={idx}
            className="group relative bg-white p-8 rounded-3xl shadow-lg border border-slate-100 transition-all hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="absolute top-4 left-4 text-4xl opacity-20 group-hover:opacity-100 transition-opacity">
               {item.icon}
            </div>
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold border mb-4 ${item.color}`}>
              {item.tag}
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">{item.title}</h3>
            <p className="text-slate-600 text-lg leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Achievements;
