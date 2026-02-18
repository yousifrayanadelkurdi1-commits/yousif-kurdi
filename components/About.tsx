
import React from 'react';

interface AboutProps {
  bio: string;
}

const About: React.FC<AboutProps> = ({ bio }) => {
  return (
    <section id="about" className="scroll-mt-32">
      <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-emerald-50 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
          
          {/* النبذة الشخصية على اليمين */}
          <div className="flex-1 space-y-6 text-right order-2 lg:order-1">
            <h2 className="text-3xl font-extrabold text-emerald-900 border-r-4 border-emerald-600 pr-4">من أنا؟</h2>
            <p className="text-xl md:text-2xl leading-relaxed text-slate-700 font-medium">
              {bio}
            </p>
            <div className="inline-block p-4 bg-rose-50 rounded-xl border-r-4 border-rose-500 text-rose-800 font-bold shadow-sm">
              "لا للتنمر.. نعم للاحترام والتعاون"
            </div>
          </div>
          
          {/* المربعات على اليسار */}
          <div className="w-full lg:w-auto shrink-0 flex justify-center order-1 lg:order-2">
            <div className="grid grid-cols-2 gap-4 items-center">
              
              {/* المربع 1: تعاون */}
              <div className="w-28 h-28 md:w-32 md:h-32 bg-emerald-50 rounded-3xl border border-emerald-100 flex flex-col items-center justify-center shadow-sm transition-transform hover:scale-105">
                <span className="text-3xl mb-1">🤝</span>
                <span className="font-bold text-emerald-900">تعاون</span>
              </div>

              {/* المربع 2: احترام */}
              <div className="w-28 h-28 md:w-32 md:h-32 bg-cyan-50 rounded-3xl border border-cyan-100 flex flex-col items-center justify-center shadow-sm transition-transform hover:scale-105">
                <span className="text-3xl mb-1">💖</span>
                <span className="font-bold text-cyan-900">احترام</span>
              </div>

              {/* المركز: الأهلي */}
              <div className="col-span-2 bg-emerald-600 p-5 rounded-3xl shadow-lg border-4 border-white transform hover:scale-105 transition-all text-center">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl">⚽</span>
                  <span className="text-xl font-black text-white tracking-widest">الأهلي</span>
                  <span className="text-2xl">💚</span>
                </div>
              </div>

              {/* المربع 3: اجتهاد */}
              <div className="w-28 h-28 md:w-32 md:h-32 bg-blue-50 rounded-3xl border border-blue-100 flex flex-col items-center justify-center shadow-sm transition-transform hover:scale-105">
                <span className="text-3xl mb-1">📖</span>
                <span className="font-bold text-blue-900">اجتهاد</span>
              </div>

              {/* المربع 4: طموح */}
              <div className="w-28 h-28 md:w-32 md:h-32 bg-amber-50 rounded-3xl border border-amber-100 flex flex-col items-center justify-center shadow-sm transition-transform hover:scale-105">
                <span className="text-3xl mb-1">🚀</span>
                <span className="font-bold text-amber-900">طموح</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;