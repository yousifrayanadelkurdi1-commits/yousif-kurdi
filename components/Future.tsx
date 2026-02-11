
import React from 'react';

interface FutureProps {
  text: string;
}

const Future: React.FC<FutureProps> = ({ text }) => {
  return (
    <section>
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-8 md:p-16 text-white text-center shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 space-y-8">
          <div className="text-6xl mb-4">🚀</div>
          <h2 className="text-4xl font-extrabold">طموحي ورؤيتي للمستقبل</h2>
          <p className="text-2xl max-w-2xl mx-auto leading-relaxed text-emerald-50 font-medium italic">
            "{text}"
          </p>
        </div>
      </div>
    </section>
  );
};

export default Future;
